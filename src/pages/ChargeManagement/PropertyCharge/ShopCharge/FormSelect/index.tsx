import { Fragment } from 'react'
import { Descriptions } from 'uiw'
import { useSelector } from 'react-redux'
import { RootState } from '@uiw-admin/models'
export default function Details() {
  const {
    shopCharge: { queryInfo },
  }: any = useSelector((shopCharge: RootState) => shopCharge)
  return (
    <Fragment>
      <Descriptions title="商品信息" bordered>
        <Descriptions.Item label="编号">
          {queryInfo?.shopNo || ''}
        </Descriptions.Item>
        <Descriptions.Item label="商品状态">
          {queryInfo?.status === 1
            ? '空置'
            : queryInfo?.status === 2
            ? '已出售'
            : queryInfo?.status === 3
            ? '已出租'
            : ''}
        </Descriptions.Item>
        <Descriptions.Item label="到期日期">
          {queryInfo?.endTime || ''}
        </Descriptions.Item>
        <Descriptions.Item label="占地面积">
          {queryInfo?.areaCovered || ''}
        </Descriptions.Item>
        <Descriptions.Item label="使用面积">
          {queryInfo?.areaUsable || ''}
        </Descriptions.Item>
        <Descriptions.Item label="行业">
          {queryInfo?.industry || ''}
        </Descriptions.Item>
        <Descriptions.Item label="客户姓名">
          {queryInfo?.userName || ''}
        </Descriptions.Item>
        <Descriptions.Item label="联系方式">
          {queryInfo?.phone}
        </Descriptions.Item>
        <Descriptions.Item label="入住时间">
          {queryInfo?.startTime || ''}
        </Descriptions.Item>
      </Descriptions>
      <div style={{ marginBottom: 10 }}></div>
    </Fragment>
  )
}
