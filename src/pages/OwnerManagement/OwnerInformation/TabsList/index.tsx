import { Fragment } from 'react'
import { Tabs, Table } from 'uiw'
import { columns, columnsTwo, columnsThree } from './item'
import { useSelector } from 'react-redux'
import { RootState } from '@uiw-admin/models'

export default function Index() {
  const {
    ownerInformation: { dataList },
  } = useSelector((shopCharge: RootState) => shopCharge)
  return (
    <Fragment>
      <Tabs type="card" activeKey="rout">
        <Tabs.Pane label="商铺信息" key="rout">
          <Table
            columns={columns as any}
            data={[dataList?.buSaleShop || {}]}
            bordered
          />
        </Tabs.Pane>
        <Tabs.Pane label="待缴费信息" key="dep">
          <Table
            columns={columnsTwo as any}
            data={dataList?.waitDate || []}
            bordered
          />
        </Tabs.Pane>
        <Tabs.Pane label="历史缴费信息" key="adv">
          <Table
            columns={columnsThree as any}
            data={dataList?.histroyData || []}
            bordered
          />
        </Tabs.Pane>
      </Tabs>
    </Fragment>
  )
}
