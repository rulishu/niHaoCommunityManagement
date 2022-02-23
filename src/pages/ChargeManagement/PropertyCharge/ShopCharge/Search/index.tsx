import React from 'react'
import { Tabs } from 'uiw'
import { useDispatch } from 'react-redux'
import { Dispatch } from '@uiw-admin/models'
import Rout from './rout'
import Tem from './tem'
import Dep from './dep'
import AdDep from './AdDep'
// import Drawer from '../Detail'
// import Modals from '../Modals'

interface State {
  drawerVisible?: boolean
  tableType?: string
  queryInfo?: object
  isView?: boolean
  keys?: string
}

export default function Demo() {
  const dispatch = useDispatch<Dispatch>()

  const updateData = (payload: State) => {
    dispatch({
      type: 'shopCharge/updateState',
      payload,
    })
  }
  return (
    <React.Fragment>
      <Tabs
        type="card"
        activeKey="rout"
        onTabClick={(tab) => {
          updateData({ keys: tab })
        }}
      >
        <Tabs.Pane label="常规收费" key="rout">
          <Rout />
        </Tabs.Pane>
        <Tabs.Pane label="临时收费" key="tem">
          <Tem />
        </Tabs.Pane>
        <Tabs.Pane label="收取押金" key="dep">
          <Dep />
        </Tabs.Pane>
        <Tabs.Pane label="预存款" key="AdDep">
          <AdDep />
        </Tabs.Pane>
      </Tabs>

      {/* <Drawer updateData={updateData} onSearch={table.onSearch} />
      <Modals onSearch={table.onSearch} /> */}
    </React.Fragment>
  )
}
