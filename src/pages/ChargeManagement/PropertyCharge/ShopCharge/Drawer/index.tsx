import { ProDrawer, ProForm, useForm } from '@uiw-admin/components'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@uiw-admin/models'
import TableList from '../TableList'
import { items } from './item'
interface DetailProps {
  updateData?: any
}
const Drawer = ({ updateData }: DetailProps) => {
  const dispatch = useDispatch<Dispatch>()

  const form = useForm()

  const {
    shopCharge: { drawerVisible, queryInfo, drawerType },
  }: any = useSelector((state: RootState) => state)

  const onClose = () => dispatch({ type: 'shopCharge/clean' })

  return (
    <ProDrawer
      width={1000}
      title="常规收费"
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
      <TableList />
      <div style={{ marginTop: 24 }}></div>
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
        formDatas={items(queryInfo, drawerType) as any}
      />
    </ProDrawer>
  )
}

export default Drawer
