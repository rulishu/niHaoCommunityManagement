import React from 'react'
import { Form, Row, Col, SearchSelect, Button } from 'uiw'
import { Card } from 'uiw'
import Table from '../Table/index'
import { useDispatch } from 'react-redux'
import { Dispatch } from '@uiw-admin/models'
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

export default function Demo() {
  const dispatch = useDispatch<Dispatch>()

  const updateData = (payload: State) => {
    dispatch({
      type: 'ShopCharge/updateState',
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
    <Card>
      <Form
        onSubmit={({ initial, current }) => {
          console.log('-->>', initial, current)
          updateData({ drawerVisible: true, queryInfo: current })
        }}
        fields={{
          selectField: {
            labelClassName: 'fieldLabel',
            labelStyle: { width: '100%' },
            label: '商铺编号',
            inline: true,
            children: (
              <SearchSelect
                showSearch={true}
                allowClear
                disabled={false}
                placeholder="请选择商铺编号"
                onSearch={handleSearch}
                onChange={(v) => {
                  console.log('onChange', v)
                }}
                option={option}
                loading={loading}
              />
            ),
          },
        }}
      >
        {({ fields, state, canSubmit }) => {
          console.log('fields:', state)
          return (
            <div className="uiw-form">
              <Row gutter={10} style={{ paddingTop: 10 }}>
                <Col>{fields.selectField}</Col>
              </Row>
              <Row gutter={10}>
                <Col />
                <Col fixed align="bottom">
                  <Button
                    disabled={!canSubmit()}
                    type="primary"
                    htmlType="submit"
                  >
                    提交
                  </Button>
                </Col>
              </Row>
            </div>
          )
        }}
      </Form>

      <Table updateData={updateData} />
    </Card>
  )
}
