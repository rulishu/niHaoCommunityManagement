// import React from 'react';
// import { Params } from '@/servers/account-admin';

export const items = (params: any = {}) => [
    {
      label: '编号',
      key: '1',
      widget: 'input',
      widgetProps: {},
      initialValue: params?.communityId,
      required: true,
      placeholder: '请输入编号',
    },
    {
      label: '客户姓名',
      key: '2',
      widget: 'input',
      widgetProps: {},
      initialValue: params?.communityId,
      required: true,
      placeholder: '请输入客户姓名',
    },
    {
      label: '收费项目',
      key: '3',
      initialValue: params?.typeCd,
      widget: 'select',
      option: [
        { label: '测试暖气费', value: '测试暖气费' },
        { label: '测试临时收费项', value: '测试临时收费项' },
      ],
    },
    {
      label: '付款方式',
      key: '4',
      initialValue: params?.typeCd,
      widget: 'select',
      option: [
        { label: '现金', value: '现金' },
        { label: '转账', value: '转账' },
      ],
    },
    {
      label: '收款金额',
      key: '5',
      widget: 'input',
      widgetProps: {},
      initialValue: params?.communityId,
      required: true,
      placeholder: '请输入收款金额',
    },
    {
      label: '收款人',
      key: '6',
      widget: 'input',
      widgetProps: {},
      initialValue: params?.communityId,
      required: true,
      placeholder: '请输入收款人',
    },
    {
      label: '收款时间',
      key: 'createTime',
      widget: 'input',
      initialValue: params?.createTime,
      widgetProps: {},
      required: true,
      placeholder: '选择收款时间',
      // hide: tableType !== 'view',
    },
    {
      label: '状态',
      key: '7',
      initialValue: params?.typeCd,
      widget: 'select',
      option: [
        { label: '已付款', value: '已付款' },
        { label: '已退款', value: '已退款' },
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
  