import { Fragment } from 'react'
import { Descriptions } from 'uiw'
import { useSelector } from 'react-redux'
import { RootState } from '@uiw-admin/models'
export default function Details() {
  const {
    shopCharge: { detailed },
  }: any = useSelector((shopCharge: RootState) => shopCharge)
  return (
    <Fragment>
      <Descriptions title="商品信息" bordered>
        <Descriptions.Item label="编号">
          {detailed?.shopNo || ''}
        </Descriptions.Item>
        <Descriptions.Item label="商品状态">
          {detailed?.status === 1
            ? '空置'
            : detailed?.status === 2
            ? '已出售'
            : detailed?.status === 3
            ? '已出租'
            : ''}
        </Descriptions.Item>
        <Descriptions.Item label="到期日期">
          {detailed?.endTime || ''}
        </Descriptions.Item>
        <Descriptions.Item label="占地面积">
          {detailed?.areaCovered || ''}
        </Descriptions.Item>
        <Descriptions.Item label="使用面积">
          {detailed?.areaUsable || ''}
        </Descriptions.Item>
        <Descriptions.Item label="行业">
          {detailed?.industry || ''}
        </Descriptions.Item>
        <Descriptions.Item label="客户姓名">
          {detailed?.userName || ''}
        </Descriptions.Item>
        <Descriptions.Item label="联系方式">
          {detailed?.phone}
        </Descriptions.Item>
        <Descriptions.Item label="入住时间">
          {detailed?.startTime || ''}
        </Descriptions.Item>
      </Descriptions>
      <div style={{ marginBottom: 10 }}></div>
    </Fragment>
  )
}
