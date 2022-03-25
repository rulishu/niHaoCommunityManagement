import { ProDrawer, ProForm, useForm } from '@uiw-admin/components'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@uiw-admin/models'
import { searchValue } from '@/servers/ChargeManagement/ShopCharge'
import TableList from '../TableList'
import { drawerTitle, matching } from './item'
interface DetailProps {
  updateData?: any
  option?: searchValue[]
}
const Drawer = ({ updateData, option }: DetailProps) => {
  const dispatch = useDispatch<Dispatch>()

  const form = useForm()

  const {
    shopCharge: { drawerVisible, queryInfo, drawerType },
  }: any = useSelector((state: RootState) => state)

  const onClose = () => dispatch({ type: 'shopCharge/clean' })

  return (
    <ProDrawer
      width={drawerType === 'temAdd' ? 800 : 1000}
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
          onSubmit={(_, current: Record<string, any>) => {
            console.log(current, 'current')
          }}
          // 更新表单的值
          onChange={(_, current: Record<string, any>) =>
            updateData({ queryInfo: { ...queryInfo, ...current } })
          }
          buttonsContainer={{ justifyContent: 'flex-start' }}
          formDatas={matching(drawerType, queryInfo, option) as any}
        />
      )}
    </ProDrawer>
  )
}

export default Drawer
