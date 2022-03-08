import { Change } from '@/servers/ChargeManagement/temporaryCharges'
import React from 'react';

export const items = (queryInfo: Change, value: boolean) => {
  
return [
  {
    label: '客户类型',
    key: 'customerType',
    widget: 'radio',
    initialValue: queryInfo?.customerType,
    required: true,
    option: [
      { label: '商铺客户', value: '1' },
      { label: '非商铺客户', value: '2' },
    ],
    span: '24',
    rules: [{ required: true, message: '请输入客户类型' }],
  },
  {
    label: '编号',
    key: 'code',
    widget: 'input',
    initialValue: queryInfo?.code,
    required: true,
    placeholder: '请输入编号',
    hide: !value,
    rules: [{ required: true, message: '请输入编号' }],
  },
  {
    label: '客户姓名',
    key: 'name',
    widget: 'input',
    initialValue: queryInfo?.name,
    required: true,
    placeholder: '请输入客户姓名',
    rules: [{ required: true, message: '请输入客户姓名' }],
  },
  {
    label: '收费项目',
    key: 'payService',
    initialValue: queryInfo?.payService,
    widget: 'select',
    required: true,
    option: [
      { label: '测试暖气费', value: '测试暖气费' },
      { label: '测试临时收费项', value: '测试临时收费项' },
    ],
    rules: [{ required: true, message: '请输入收费项目' }],
  },
  {
    label: '付款方式',
    key: 'payType',
    initialValue: queryInfo?.payType,
    widget: 'select',
    required: true,
    option: [
      { label: '现金', value: '现金' },
      { label: '转账', value: '转账' },
    ],
    rules: [{ required: true, message: '请输入付款方式' }],
  },
  {
    label: '收款金额',
    key: 'price',
    widget: 'input',
    initialValue: queryInfo?.price,
    required: true,
    rules: [
      {
        required: true,
        pattern: new RegExp(/(^[1-9](\d+)?(\.\d{1,2})?$)|(^\d\.\d{1,2}$)/),
        message: '请正确输入',
      },
    ],  
    widgetProps: {
      addonAfter: <div style={{ color: '#A6A6A6', marginRight: 5 }}>元</div>,
    },
    placeholder: '请输入收款金额',
  },
  // {
  //   label: '收款人',
  //   key: 'collectionName',
  //   widget: 'input',
  //   widgetProps: {},
  //   initialValue: queryInfo?.collectionName,
  //   required: true,
  //   placeholder: '请输入收款人',
  // },
  {
    label: '收款时间',
    key: 'collectionTime',
    widget: 'dateInput',
    widgetProps: {
      format: 'YYYY-MM-DD HH:mm:ss',
    },
    initialValue: queryInfo?.collectionTime,
    required: true,
    rules: [{ required: true, message: '请选择收款时间' }],
    placeholder: '请选择收款时间',
  },
  // {
  //   label: '状态',
  //   key: 'status',
  //   initialValue: queryInfo?.status,
  //   widget: 'select',
  //   option: [
  //     { label: '已付款', value: '已付款' },
  //     { label: '已退款', value: '已退款' },
  //   ],
  // },
  // {
  //   label: '备注',
  //   key: 'remark',
  //   initialValue: queryInfo?.remark,
  //   placeholder: '请输入备注',
  //   widget: 'textarea',
  //   widgetProps: {},
  //   required: true,
  // },
];
}