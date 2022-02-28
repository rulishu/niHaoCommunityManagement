// import React from 'react';
// import { Change } from '@/servers/ParkingLot/CarParkManagement';

export const items = (queryInfo: any) => [
  {
    label: '小区id',
    key: 'communityId',
    widget: 'input',
    widgetProps: {},
    initialValue: queryInfo?.communityId,
    required: true,
    rules: [{ required: true, message: '请输入小区id' }],
    placeholder: '请输入小区id',
  },
  {
    label: '停车场类型',
    key: 'typeCd',
    initialValue: queryInfo?.typeCd,
    widget: 'select',
    option: [
      { label: '地上停车场', value: '地上停车场' },
      { label: '地下停车场', value: '地下停车场' },
    ],
    required: true,
    rules: [{ required: true, message: '请选择停车场类型' }],
    placeholder: '请选择停车场类型',
  },
  {
    label: '备注',
    initialValue: queryInfo?.remark,
    key: 'remark',
    placeholder: '请输入备注',
    widget: 'textarea',
    widgetProps: {},
  },
]
