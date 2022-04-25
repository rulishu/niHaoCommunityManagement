import { ProDrawer, ProForm, useForm } from '@uiw-admin/components'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@uiw-admin/models'
import { Notify } from 'uiw'
import formatter from '@uiw/formatter'
import { changeTimeFormat } from '@/utils'
import { drawerTitle, matching, batchMatching } from './item'
export default function Index() {
  const dispatch = useDispatch<Dispatch>()

  const form = useForm()

  const {
    shopCharges: {
      drawerVisible,
      queryInfo,
      drawerType,
      shopNoList,
      shopList,
      table,
      loading,
      codeList,
    },
  }: any = useSelector((state: RootState) => state)

  const onClose = () => dispatch({ type: 'shopCharges/clean' })

  // 执行成功返回的信息
  const information = (data: any) => {
    if (data.code === 1) {
      onClose()
      table?.onSearch()
      Notify.success({ title: data?.message || '' })
    } else {
      dispatch({
        type: 'shopCharges/updateState',
        payload: { loading: false },
      })
      Notify.error({ title: data?.message || '' })
    }
  }
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
      if (!/^[0-9]{1}\d*?$/g.test(current?.quantity)) {
        errorObj.quantity = '请输入正整数'
      }
      if ((current?.money || 0) <= 0) {
        errorObj.money = '金额必须大于 0'
      }
      if (
        current?.startTime &&
        current?.endTime &&
        (current?.startTime && new Date(current?.startTime)) >=
          (current?.endTime && new Date(current?.endTime))
      ) {
        errorObj.startTime = '开始时间不能大于结束时间'
        errorObj.endTime = '结束时间不能少于开始时间'
      }
    })
    if (Object.is(drawerType, 'batchAdd')) {
      const payload = current?.code?.map((item: any) => ({
        ...current,
        startTime: formatter('YYYY-MM-DD HH:mm:ss', current?.startTime),
        endTime: formatter('YYYY-MM-DD HH:mm:ss', current?.endTime),
        code: item,
      }))
      ;(
        dispatch({
          type: 'shopCharges/gitBatchAdd',
          payload,
        }) as any
      ).then((data: any) => information(data))
      //
    }

    if (Object.keys(errorObj).length > 0) {
      const err: any = new Error()
      err.filed = errorObj
      throw err
    }
    // 新增
    if (drawerType === 'add') {
      const payload = {
        ...current,
        startTime: formatter('YYYY-MM-DD HH:mm:ss', current?.startTime),
        endTime: formatter('YYYY-MM-DD HH:mm:ss', current?.endTime),
        deadline: formatter('YYYY-MM-DD HH:mm:ss', current?.deadline),
      }
      ;(
        dispatch({
          type: 'shopCharges/buShopChargeDataAdd',
          payload,
        }) as any
      ).then((data: any) => information(data))
      return
    }
    // 编辑
    if (drawerType === 'edit') {
      const payload = {
        ...current,
        id: queryInfo?.id || '',
        startTime: changeTimeFormat(current?.startTime),
        endTime: changeTimeFormat(current?.endTime),
        deadline: changeTimeFormat(current?.deadline),
      }
      ;(
        dispatch({
          type: 'shopCharges/getbuShopChargeDataUpdate',
          payload,
        }) as any
      ).then((data: any) => information(data))
    }
  }
  return (
    <ProDrawer
      width={1000}
      title={drawerTitle(drawerType)}
      visible={drawerVisible}
      onClose={onClose}
      buttons={[
        {
          label: '保存',
          type: 'primary',
          style: { width: 80 },
          loading,
          onClick: () => form.submitvalidate(),
        },
      ]}
    >
      <ProForm
        form={form}
        formType="card"
        onSubmit={(_, current: Record<string, any>) => onSubmit(current)}
        // 更新表单的值
        onChange={(_, current: Record<string, any>) =>
          dispatch({
            type: 'shopCharges/updateData',
            payload: { ...queryInfo, ...current },
          })
        }
        buttonsContainer={{ justifyContent: 'flex-start' }}
        formDatas={
          drawerType !== 'batchAdd'
            ? (matching(
                drawerType,
                shopNoList,
                form,
                shopList,
                queryInfo
              ) as any)
            : (batchMatching(
                drawerType,
                codeList,
                form,
                shopList,
                queryInfo
              ) as any)
        }
      />
    </ProDrawer>
  )
}
