import React from 'react'
import { Button } from 'uiw'
import { useDispatch } from 'react-redux'
import { Dispatch } from '@uiw-admin/models'

interface State {
  chargeVisible?: boolean
  historyVisible?: boolean
  btnStatus?: string
}

export default function ButtonGroup(props: { keyType: string }) {
  const dispatch = useDispatch<Dispatch>()
  const updateData = (payload: State) => {
    dispatch({
      type: 'shopCharge/updateState',
      payload,
    })
  }
  // 操作
  const handleEditTable = (type: string) => {
    updateData({
      btnStatus: type,
    })
    if (type === 'char') {
      updateData({ chargeVisible: true })
    }
    if (type === 'hty') {
      updateData({ historyVisible: true })
    }
  }

  return (
    <React.Fragment>
      {props.keyType === 'rout' && (
        <div className="uiw-SearchSelect-btn">
          <Button type="primary" onClick={() => handleEditTable('char')}>
            收费
          </Button>
          <Button type="primary" onClick={() => handleEditTable('hty')}>
            历史信息
          </Button>
        </div>
      )}

      {(props.keyType === 'tem' || props.keyType === 'dep') && (
        <div className="uiw-SearchSelect-btn">
          <Button type="primary">新增</Button>
        </div>
      )}

      {props.keyType === 'AdDep' && (
        <div className="uiw-SearchSelect-btn">
          <Button type="primary">预存</Button>
          <Button type="primary">退还</Button>
        </div>
      )}
    </React.Fragment>
  )
}
