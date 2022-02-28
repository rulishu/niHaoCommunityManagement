import React from 'react'
import { Button } from 'uiw'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, Dispatch } from '@uiw-admin/models'

interface State {
  chargeVisible?: boolean
  historyVisible?: boolean
  btnStatus?: string
  drawerVisible?: boolean
  queryInfo?: object
}

export default function ButtonGroup() {
  const dispatch = useDispatch<Dispatch>()

  const {
    shopCharge: { keys },
  } = useSelector((shopCharge: RootState) => shopCharge)

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
    if (type === 'char' || type === 'Bak') {
      updateData({ chargeVisible: true })
    } else if (type === 'hty') {
      updateData({ historyVisible: true })
    } else {
      updateData({ drawerVisible: true, queryInfo: {} })
    }
  }

  return (
    <React.Fragment>
      {keys === 'rout' && (
        <div className="uiw-SearchSelect-btn">
          <Button type="primary" onClick={() => handleEditTable('char')}>
            收费
          </Button>
          <Button type="primary" onClick={() => handleEditTable('hty')}>
            历史信息
          </Button>
        </div>
      )}

      {(keys === 'tem' || keys === 'dep') && (
        <div className="uiw-SearchSelect-btn">
          <Button type="primary" onClick={() => handleEditTable(keys)}>
            新增
          </Button>
        </div>
      )}

      {keys === 'AdDep' && (
        <div className="uiw-SearchSelect-btn">
          <Button type="primary" onClick={() => handleEditTable('Pre')}>
            预存
          </Button>
          <Button type="primary" onClick={() => handleEditTable('Bak')}>
            退还
          </Button>
        </div>
      )}
    </React.Fragment>
  )
}
