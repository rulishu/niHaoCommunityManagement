import { Fragment } from 'react'
import { Descriptions } from 'uiw'

export default function details() {
  return (
    <Fragment>
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
      <div style={{ marginBottom: 10 }}></div>
    </Fragment>
  )
}
