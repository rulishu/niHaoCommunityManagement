import { ProDrawer, ProForm } from '@uiw-admin/components'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@uiw-admin/models'
import { items } from './items'
import { useEffect } from 'react'
// import { FormCol } from '@uiw-admin/components/lib/ProTable/types'
// import { Table } from 'uiw'

export default function Index() {
  const dispatch = useDispatch<Dispatch>()

  useEffect(() => {
    dispatch({
      type: 'models/paysList',
      payload: {
        dictType: '付款方式',
      },
    })
  }, [dispatch])

  const {
    balanceManagement: { drawerVisible, queryInfo, isView, tableType },
  }: any = useSelector((state: RootState) => state)

  const {
    models: { paysList },
  } = useSelector((state: RootState) => state)

  const onClose = () => dispatch({ type: 'balanceManagement/clean' })

  return (
    <div>
      <ProDrawer
        width={800}
        title={tableType === 'refund' ? '退还' : '查看'}
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
          title="基础信息"
          readOnly={isView}
          formType={isView ? 'pure' : 'card'}
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
