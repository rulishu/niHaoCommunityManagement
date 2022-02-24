import React from 'react'
import { useDispatch } from 'react-redux'
import { Dispatch } from '@uiw-admin/models'
import { SearchSelect, Button } from 'uiw'
import './index.css'
import DetailsList from './details'
import ButtonGroup from './ButtonGroup'

interface State {
  drawerVisible?: boolean
  tableType?: string
  queryInfo?: object
  isView?: boolean
  delectVisible?: boolean
  id?: string
}

const selectOption = [
  { label: 'a', value: 2 },
  { label: 'aa', value: 3 },
  { label: 'aaa', value: 4 },
]

export default function FormSelect(props: { keyType: string }) {
  const dispatch = useDispatch<Dispatch>()

  const updateData = (payload: State) => {
    dispatch({
      type: 'shopCharge/updateState',
      payload,
    })
  }

  const [option] = React.useState(selectOption)
  const [loading, setLoading] = React.useState(false)
  const handleSearch = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }

  return (
    <React.Fragment>
      <div className="uiw-SearchSelect-body">
        <div className="uiw-SearchSelect">
          <a style={{ marginRight: 10 }}>商品编号:</a>
          <SearchSelect
            showSearch={true}
            allowClear
            disabled={false}
            style={{ width: 300 }}
            placeholder="请选择商铺编号"
            onSearch={handleSearch}
            onChange={(v) => {
              console.log('onChange', v)
              updateData({ queryInfo: { shopNumber: v } })
            }}
            option={option}
            loading={loading}
          />
          <Button type="primary" style={{ marginLeft: 10 }}>
            查询
          </Button>
        </div>

        <DetailsList />
      </div>

      <ButtonGroup keyType={props.keyType} />
    </React.Fragment>
  )
}
