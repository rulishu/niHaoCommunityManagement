import { Fragment } from 'react'
import { Tabs } from 'uiw'
import { useDispatch } from 'react-redux'
import { Dispatch } from '@uiw-admin/models'
import { State } from '@/servers/Authority/User'
import Outside from './out'
import Inside from './inside'

export default function Demo() {
  const dispatch = useDispatch<Dispatch>()

  const updateData = (payload: State) => {
    dispatch({
      type: 'User/updateState',
      payload,
    })
  }

  return (
    <Fragment>
      <Tabs
        type="card"
        activeKey="outside"
        onTabClick={(tab) => {
          updateData({ keys: tab })
        }}
      >
        <Tabs.Pane label="外部账号" key="outside">
          <Outside />
        </Tabs.Pane>
        <Tabs.Pane label="内部账号" key="inside">
          <Inside />
        </Tabs.Pane>
      </Tabs>
    </Fragment>
  )
}
