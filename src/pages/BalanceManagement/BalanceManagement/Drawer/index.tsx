import { ProDrawer, ProForm, useForm } from '@uiw-admin/components'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@uiw-admin/models'
import { items } from './items'
import { useEffect } from 'react'
// import { FormCol } from '@uiw-admin/components/lib/ProTable/types'
// import { Notify } from 'uiw'

export default function Index(props: { onSearch: () => void }) {
  const dispatch = useDispatch<Dispatch>()
  const form = useForm()

  useEffect(() => {
    dispatch({
      type: 'models/paysList',
      payload: {
        dictType: '付款方式',
      },
    })
  }, [dispatch])

  const {
    balanceManagement: { drawerVisible, queryInfo, isView, tableType, loading },
  }: any = useSelector((state: RootState) => state)

  const {
    models: { paysList },
  } = useSelector((state: RootState) => state)

  const onClose = () => dispatch({ type: 'balanceManagement/clean' })

  // 执行成功返回的信息
  // const information = (data: any) => {
  //   if (data.code === 1) {
  //     onClose()
  //     props?.onSearch()
  //     Notify.success({ title: data?.message || '' })
  //   } else {
  //     dispatch({
  //       type: 'balanceManagement/updateState',
  //       payload: { loading: false },
  //     })
  //     Notify.error({ title: data?.message || '' })
  //   }
  // }

  const onSubmit = (current: any) => {
    //  验证
    const errorObj: any = {}
    const arr = Object.keys(current)
    arr.forEach((element: any) => {
      if (
        !current[element] ||
        (Array.isArray(current[element]) && current[element].length === 0)
      ) {
        errorObj[element] = '此项不能为空'
      }
    })

    if (Object.keys(errorObj).length > 0) {
      const err: any = new Error()
      err.filed = errorObj
      throw err
    }

    console.log('tableType', tableType)

    // 退还
    if (tableType === 'refund') {
      const payload = {
        ...current,
        id: queryInfo?.id || '',
      }
      ;(
        dispatch({
          type: 'balanceManagement/refund',
          payload,
        }) as any
      ).then((data: any) => console.log('data', data))
    }
  }
  return (
    <div>
      <ProDrawer
        width={800}
        title={tableType === 'refund' ? '退还' : '查看'}
        visible={drawerVisible}
        onClose={onClose}
        buttons={[
          {
            label: '取消',
            // style: { width: 80 },
            onClick: () => onClose(),
          },
          {
            label: '保存',
            type: 'primary',
            loading,
            onClick: () => {
              form.submitvalidate()
            },
          },
        ]}
      >
        <ProForm
          title="基础信息"
          form={form}
          readOnly={isView}
          formType={isView ? 'pure' : 'card'}
          onSubmit={(_, current: Record<string, any>) => onSubmit(current)}
          // 更新表单的值
          onChange={(_, current: Record<string, any>) =>
            dispatch({
              type: 'balanceManagement/updateData',
              payload: { ...queryInfo, ...current },
            })
          }
          buttonsContainer={{ justifyContent: 'flex-start' }}
          formDatas={items(queryInfo, paysList) as any}
        />
        {/* <Table
                    bordered
                    columns={backList() as FormCol[]}
                    data={queryInfo.chargeList && queryInfo.chargeList}
                /> */}
        <div style={{ marginTop: 24 }} />
      </ProDrawer>
    </div>
  )
}
