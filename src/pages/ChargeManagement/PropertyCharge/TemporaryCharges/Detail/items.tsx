// import React from 'react';
// import { Params } from '@/servers/account-admin';

export const items = (params: any = {}) => [
    {
      label: '小区id',
      key: 'communityId',
      widget: 'input',
      widgetProps: {},
      initialValue: params?.communityId,
      required: true,
      placeholder: '请输入小区id',
    },
    {
      label: '停车场类型',
      key: 'typeCd',
      initialValue: params?.typeCd,
      widget: 'select',
      option: [
        { label: '地上停车场', value: '地上停车场' },
        { label: '地下停车场', value: '地下停车场' },
      ],
    },
    {
      label: '备注',
      initialValue: params?.remark,
      key: 'remark',
      placeholder: '请输入备注',
      widget: 'textarea',
      widgetProps: {},
      required: true,
    },
  ];
  