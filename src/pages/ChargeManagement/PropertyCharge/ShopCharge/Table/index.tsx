import React from 'react'
import { Tabs, Card } from 'uiw'
import { useSelector } from 'react-redux'
import { RootState } from '@uiw-admin/models'
import Regular from './Regular'

interface State {
  drawerVisible?: boolean
  tableType?: string
  queryInfo?: object
  isView?: boolean
  keys?: string
}

const Demo = (props: { updateData: (payload: State) => void }) => {
  const {
    ShopCharge: { keys },
  } = useSelector((ShopCharge: RootState) => ShopCharge)

  return (
    <Card style={{ marginTop: 10 }}>
      <Tabs
        type="line"
        activeKey="1"
        onTabClick={(tab) => {
          props.updateData({ keys: tab })
        }}
      >
        <Tabs.Pane label="常规收费" key="1">
          <Regular key={keys} />
        </Tabs.Pane>
        <Tabs.Pane label="临时收费" key="2">
          <Regular key={keys} />
        </Tabs.Pane>
        <Tabs.Pane label="收取押金" key="3">
          <Regular key={keys} />
        </Tabs.Pane>
        <Tabs.Pane label="预存款" key="4">
          <Regular key={keys} />
        </Tabs.Pane>
      </Tabs>
    </Card>
  )
}

export default Demo
