import React from 'react'
import { useDispatch } from 'react-redux'
import { Dispatch } from '@uiw-admin/models'
import { SearchSelect, Descriptions, Button } from 'uiw'
import './index.css'

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
          <Button type="primary">查询</Button>
        </div>
        <Descriptions title="商品信息" bordered>
          <Descriptions.Item label="编号">调调</Descriptions.Item>
          <Descriptions.Item label="商品状态">1360000000</Descriptions.Item>
          <Descriptions.Item label="到期日期">上海市，青浦区</Descriptions.Item>
          <Descriptions.Item label="占地面积">-</Descriptions.Item>
          <Descriptions.Item label="使用面积">-</Descriptions.Item>
          <Descriptions.Item label="行业">-</Descriptions.Item>
          <Descriptions.Item label="客户姓名">-</Descriptions.Item>
          <Descriptions.Item label="联系方式">-</Descriptions.Item>
          <Descriptions.Item label="入住时间">-</Descriptions.Item>
        </Descriptions>
      </div>

      {props.keyType === 'rout' && (
        <div className="uiw-SearchSelect-btn">
          <Button type="primary">收费</Button>
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
