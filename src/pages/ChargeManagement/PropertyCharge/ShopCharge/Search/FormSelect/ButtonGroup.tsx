import React from 'react'
import { Button } from 'uiw'
import { useDispatch } from 'react-redux'
import { Dispatch } from '@uiw-admin/models'

export default function ButtonGroup(props: { keyType: string }) {
  const dispatch = useDispatch<Dispatch>()

  const onCharge = () => {
    dispatch({
      type: 'shopCharge/updateState',
      payload: {
        chargeVisible: true,
      },
    })
  }

  return (
    <React.Fragment>
      {props.keyType === 'rout' && (
        <div className="uiw-SearchSelect-btn">
          <Button type="primary" onClick={onCharge}>
            收费
          </Button>
          <Button type="primary">历史信息</Button>
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
