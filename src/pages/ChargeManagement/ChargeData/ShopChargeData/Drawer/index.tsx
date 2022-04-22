import { ProDrawer, ProForm, useForm } from '@uiw-admin/components'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@uiw-admin/models'
import { Notify } from 'uiw'
import formatter from '@uiw/formatter'
import { drawerTitle, matching } from './item'
export default function Index() {
  const dispatch = useDispatch<Dispatch>()

  const form = useForm()

  const {
    shopCharges: {
      drawerVisible,
      queryInfo,
      drawerType,
      shopNoList,
      projectList,
      table,
      loading,
    },
  }: any = useSelector((state: RootState) => state)

  const onClose = () => dispatch({ type: 'shopCharges/clean' })

  const onSubmit = (current: any) => {
    const errorObj: any = {}
    const arr = Object.keys(current)
    arr.forEach((element: any) => {
      if (!/^[0-9]{1}\d*?$/g.test(current?.quantity))
        errorObj.quantity = '请输入正整数'
      if (
        current?.startTime &&
        new Date(formatter('YYYY-MM-DD', current?.startTime)).getTime() >=
          current?.endTime &&
        new Date(formatter('YYYY-MM-DD', current?.endTime)).getTime()
      ) {
        errorObj.startTime = '开始时间不能大于结束时间'
        errorObj.endTime = '结束时间不能少于开始时间'
      }
      if (
        !current[element] ||
        (Array.isArray(current[element]) && current[element].length === 0)
      )
        errorObj[element] = '此项不能为空'
    })
    if (Object.keys(errorObj).length > 0) {
      const err: any = new Error()
      err.filed = errorObj
      throw err
    }
    if (drawerType === 'add') {
      const payload = {
        ...current,
        startTime: formatter('YYYY-MM-DD HH:mm:ss', current?.startTime),
        endTime: formatter('YYYY-MM-DD HH:mm:ss', current?.endTime),
        deadline: formatter('YYYY-MM-DD HH:mm:ss', current?.deadline),
      }
      if ((payload?.money || 0) <= 0)
        return Notify.error({ title: '金额不能小于 0' })
      ;(
        dispatch({
          type: 'shopCharges/buShopChargeDataAdd',
          payload,
        }) as any
      ).then((data: any) => {
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
      })
      return
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
        formDatas={matching(drawerType, shopNoList, form, projectList) as any}
      />
    </ProDrawer>
  )
}
