import React from 'react'
import { ProDrawer } from '@uiw-admin/components'
import { Descriptions } from 'uiw'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@uiw-admin/models'

// interface State {
//   drawerVisible?: boolean;
//   tableType?: string;
//   printInfo?: object;
// }

const Detail = () => {
  const dispatch = useDispatch<Dispatch>()
  const {
    shopCharge: { printVisible },
  } = useSelector((shopCharge: RootState) => shopCharge)

  const onClose = () => {
    dispatch({
      type: 'shopCharge/updateState',
      payload: {
        printVisible: false,
        printInfo: {},
      },
    })
  }

  return (
    <ProDrawer
      width={1000}
      title={'打印'}
      visible={printVisible}
      onClose={onClose}
      buttons={[
        {
          label: '打印',
          style: { width: 80 },
          type: 'primary',
          // onClick: onClose,
        },
        {
          label: '导出',
          style: { width: 80 },
          type: 'primary',
          // onClick: onClose,
        },
        {
          label: '取消',
          style: { width: 80 },
          onClick: onClose,
        },
      ]}
    >
      <Descriptions bordered title="收款数据">
        <Descriptions.Item label="打印日期" span={2}>
          2019-04-24 18:00:00
        </Descriptions.Item>
        <Descriptions.Item label="操作人">xx物业</Descriptions.Item>
        <Descriptions.Item label="收款日期" span={2}>
          2019-04-21 18:00:00
        </Descriptions.Item>
        <Descriptions.Item label="商铺号">01-001</Descriptions.Item>
        <Descriptions.Item label="姓名">张三</Descriptions.Item>
        <Descriptions.Item label="经手人">xx物业</Descriptions.Item>
        <Descriptions.Item label="费用类型">广告费</Descriptions.Item>
        <Descriptions.Item label="金额">500.00</Descriptions.Item>
      </Descriptions>
    </ProDrawer>
  )
}

export default Detail
