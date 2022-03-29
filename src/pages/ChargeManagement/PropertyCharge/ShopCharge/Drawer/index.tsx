import { ProDrawer, ProForm, useForm } from '@uiw-admin/components'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@uiw-admin/models'
import { Notify } from 'uiw'
import { searchValue } from '@/servers/ChargeManagement/ShopCharge'
import TableList from '../TableList'
import { drawerTitle, matching } from './item'
import { changeTimeFormat } from '@/utils'
interface DetailProps {
  updateData?: any
  option?: searchValue[]
}
const Drawer = ({ updateData, option }: DetailProps) => {
  const dispatch = useDispatch<Dispatch>()

  const form = useForm()

  const {
    shopCharge: { drawerVisible, queryInfo, drawerType, payment, payService },
  }: any = useSelector((state: RootState) => state)

  const onClose = () => dispatch({ type: 'shopCharge/clean' })

  // 验证
  const verification = (current: any) => {
    const errorObj: any = {}
    const arr = Object.keys(current)
    arr.forEach((element: any) => {
      if (
        !current[element] ||
        (Array.isArray(current[element]) && current[element].length === 0)
          ? true
          : false
      ) {
        errorObj[element] = '此项不能为空'
      }
    })
    if (Object.keys(errorObj).length > 0) {
      const err: any = new Error()
      err.filed = errorObj
      throw err
    }
  }

  // 提交
  const onSubmit = (current: any) => {
    verification(current)
    // 添加零时收费
    if (drawerType === 'temAdd')
      (
        dispatch({
          type: 'shopCharge/buTemporaryCharges',
          payload: {
            ...current,
            code: current?.code[0]?.value,
            payService: current?.payService[0]?.value,
            payType: current?.payType[0]?.value,
            collectionTime: changeTimeFormat(current?.collectionTime),
          },
        }) as any
      ).then((data: any) => {
        if (data?.code === 1) {
          onClose()
          Notify.success({ titdescriptionle: data?.message || '' })
        } else {
          Notify.error({ description: data?.message || '' })
        }
      })

    // 添加押金
    if (drawerType === 'depositAdd')
      (
        dispatch({
          type: 'shopCharge/getBuDeposit',
          payload: {
            name: current?.name || '',
            code: current?.code[0]?.value,
            project: current?.payService[0]?.value,
            paymentMethod: current?.payType[0]?.value,
            price: current?.price || '',
            collectionTime: changeTimeFormat(current?.collectionTime),
          },
        }) as any
      ).then((data: any) => {
        if (data?.code === 1) {
          onClose()
          Notify.success({ titdescriptionle: data?.message || '' })
        } else {
          Notify.error({ description: data?.message || '' })
        }
      })
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
          onClick: () => {
            form.submitvalidate()
          },
        },
      ]}
    >
      {(drawerType === 'charge' ||
        drawerType === 'history' ||
        drawerType === 'return') && (
        <>
          <TableList />
          <div style={{ marginTop: 24 }}></div>
        </>
      )}
      {drawerType !== 'history' && (
        <ProForm
          form={form}
          formType="card"
          onSubmit={(_, current: Record<string, any>) => onSubmit(current)}
          // 更新表单的值
          onChange={(_, current: Record<string, any>) =>
            updateData({ queryInfo: { ...queryInfo, ...current } })
          }
          buttonsContainer={{ justifyContent: 'flex-start' }}
          formDatas={
            matching(drawerType, queryInfo, option, payment, payService) as any
          }
        />
      )}
    </ProDrawer>
  )
}

export default Drawer
