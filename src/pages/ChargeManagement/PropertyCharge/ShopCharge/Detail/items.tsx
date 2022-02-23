// import React from 'react';
import { Change } from '@/servers/ChargeManagement/ShopCharge'

export const items = (queryInfo: Change) => [
  {
    label: '小区id',
    key: 'id',
    widget: 'input',
    widgetProps: {},
    initialValue: queryInfo?.id,
    required: true,
    rules: [{ required: true, message: '请输入小区id' }],
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
  },
]
