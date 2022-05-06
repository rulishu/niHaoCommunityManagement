import { ProDrawer, ProForm } from '@uiw-admin/components'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@uiw-admin/models'
import Tabs from '../TabsList'
import { matching } from './item'
export default function Index() {
  const dispatch = useDispatch<Dispatch>()
  const {
    ownerInformation: { drawerVisible, queryInfo },
  }: any = useSelector((state: RootState) => state)
  const onClose = () => dispatch({ type: 'ownerInformation/clean' })
  return (
    <div>
      <ProDrawer
        width={1000}
        title={'明细'}
        visible={drawerVisible}
        onClose={onClose}
        buttons={[
          {
            label: '关闭',
            type: 'primary',
            style: { width: 80 },
            onClick: () => onClose(),
          },
        ]}
      >
        <ProForm
          readOnly={true}
          formType="pure"
          buttonsContainer={{ justifyContent: 'flex-start' }}
          formDatas={matching(queryInfo) as any}
        />
        <div style={{ marginTop: 24 }} />

        <Tabs />
      </ProDrawer>
    </div>
  )
}
