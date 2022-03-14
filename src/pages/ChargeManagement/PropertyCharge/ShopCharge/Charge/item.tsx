import * as React from 'react'
import { Input } from 'uiw'

export const columnsList = (
  onChange: (text: React.ChangeEvent<HTMLInputElement>) => void
) => {
  return [
    {
      title: '收费项名称',
      align: 'center',
      key: 'shouName',
    },
    {
      align: 'center',
      title: '费用开始时间',
      key: 'startingTime',
      ellipsis: true,
    },
    {
      align: 'center',
      title: '费用结束时间',
      key: 'endTime',
      ellipsis: true,
    },

    {
      title: '金额',
      align: 'center',
      key: 'fee',
    },
    {
      title: '优惠金额',
      align: 'center',
      key: 'money',
      render: () => (
        <Input
          placeholder="请输入金额"
          style={{ maxWidth: 200 }}
          onChange={onChange}
          addonAfter={<div style={{ marginRight: 5 }}>元</div>}
        />
      ),
    },
    {
      title: '滞纳金',
      align: 'center',
      key: 'lateFee',
    },
    {
      title: '应收金额',
      align: 'center',
      key: 'moneyAmount',
    },
  ]
}

export const cardOne = (queryInfo: any) => [
  {
    label: '滞纳金：',
    key: 'lateFee',
    widget: 'input',
    initialValue: queryInfo?.lateFee,
    disabled: true,
    inline: true,
    span: '24',
    placeholder: '请输入滞纳金',
    rules: [
      {
        pattern: new RegExp(/(^[1-9](\d+)?(\.\d{1,2})?$)|(^\d\.\d{1,2}$)/),
        message: '请正确输入',
      },
    ],
    widgetProps: {
      addonAfter: <div style={{ color: '#A6A6A6', marginRight: 5 }}>元</div>,
    },
  },
  {
    label: '可用预存款：',
    key: 'uapRight',
    widget: 'input',
    initialValue: queryInfo?.uapRight,
    disabled: true,
    inline: true,
    span: '24',
    placeholder: '请输入可用预存款',
    rules: [
      {
        pattern: new RegExp(/(^[1-9](\d+)?(\.\d{1,2})?$)|(^\d\.\d{1,2}$)/),
        message: '请正确输入',
      },
    ],
    widgetProps: {
      addonAfter: <div style={{ color: '#A6A6A6', marginRight: 5 }}>元</div>,
    },
  },
  {
    label: '找零金额：',
    key: 'uapRightName',
    widget: 'input',
    initialValue: queryInfo?.uapRightName,
    disabled: true,
    inline: true,
    span: '24',
    placeholder: '请输入找零金额',
    rules: [
      {
        pattern: new RegExp(/(^[1-9](\d+)?(\.\d{1,2})?$)|(^\d\.\d{1,2}$)/),
        message: '请正确输入',
      },
    ],
    widgetProps: {
      addonAfter: <div style={{ color: '#A6A6A6', marginRight: 5 }}>元</div>,
    },
  },
  {
    label: '收款金额：',
    key: 'moneyAmount',
    widget: 'input',
    initialValue: queryInfo?.uapRightUrl,
    required: true,
    inline: true,
    span: '24',
    placeholder: '请输入收款金额',
    rules: [
      {
        pattern: new RegExp(/(^[1-9](\d+)?(\.\d{1,2})?$)|(^\d\.\d{1,2}$)/),
        message: '请正确输入金额,例9.99',
      },
    ],
    widgetProps: {
      addonAfter: <div style={{ marginRight: 5 }}>元</div>,
    },
  },
]
export const cardTow = (queryInfo: any) => [
  {
    label: '优惠金额',
    key: 'lateFee',
    widget: 'input',
    initialValue: queryInfo?.lateFee,
    disabled: true,
    inline: true,
    span: '24',
    placeholder: '请输入优惠金额',
    rules: [
      {
        pattern: new RegExp(/(^[1-9](\d+)?(\.\d{1,2})?$)|(^\d\.\d{1,2}$)/),
        message: '请正确输入',
      },
    ],
    widgetProps: {
      addonAfter: <div style={{ color: '#A6A6A6', marginRight: 5 }}>元</div>,
    },
  },
  {
    label: '预存款付款',
    key: 'uapRight',
    widget: 'input',
    initialValue: queryInfo?.uapRight,
    disabled: true,
    inline: true,
    span: '24',
    placeholder: '请输入预存款付款',
    rules: [
      {
        pattern: new RegExp(/(^[1-9](\d+)?(\.\d{1,2})?$)|(^\d\.\d{1,2}$)/),
        message: '请正确输入',
      },
    ],
    widgetProps: {
      addonAfter: <div style={{ color: '#A6A6A6', marginRight: 5 }}>元</div>,
    },
  },
  {
    label: '',
    key: '',
    widget: 'onCus',
    span: '24',
  },
  {
    label: '付款方式',
    key: 'select',
    widget: 'select',
    option: [
      { value: 1, label: '现金' },
      { value: 2, label: '微信' },
      { value: 3, label: 'app' },
    ],
    initialValue: queryInfo.select,
    required: true,
    rules: [{ required: true, message: '请选择付款方式' }],
    inline: true,
    span: '24',
    placeholder: '请选择付款方式',
  },
]
export const cardThree = (queryInfo: any) => [
  {
    label: '实际应收',
    key: 'lateFee',
    widget: 'input',
    initialValue: queryInfo?.lateFee,
    disabled: true,
    inline: true,
    span: '24',
    placeholder: '请输入实际应收',
    rules: [
      {
        pattern: new RegExp(/(^[1-9](\d+)?(\.\d{1,2})?$)|(^\d\.\d{1,2}$)/),
        message: '请正确输入',
      },
    ],
    widgetProps: {
      addonAfter: <div style={{ color: '#A6A6A6', marginRight: 5 }}>元</div>,
    },
  },
  {
    label: '找零结存',
    key: 'uapRight',
    widget: 'input',
    initialValue: queryInfo?.uapRight,
    disabled: true,
    inline: true,
    span: '24',
    placeholder: '请输入找零结存',
    rules: [
      {
        pattern: new RegExp(/(^[1-9](\d+)?(\.\d{1,2})?$)|(^\d\.\d{1,2}$)/),
        message: '请正确输入',
      },
    ],
    widgetProps: {
      addonAfter: <div style={{ color: '#A6A6A6', marginRight: 5 }}>元</div>,
    },
  },
  {
    label: '',
    key: '',
    widget: 'onCus',
    span: '24',
  },
  {
    label: '',
    key: 'radio',
    widget: 'radio',
    option: [
      { value: 1, label: '使用预付款' },
      { value: 2, label: '找零结存' },
    ],
    initialValue: queryInfo.radio,
    required: true,
    rules: [{ required: true, message: '请选择' }],
    inline: true,
    span: '24',
    placeholder: '请选择付款方式',
  },
]

export const cardBack = (queryInfo: any) => [
  {
    label: '编号',
    key: 'id',
    widget: 'onBtn',
    // inline: true,
    span: '12',
  },
  {
    label: '客户姓名',
    key: 'name',
    widget: 'input',
    initialValue: queryInfo?.name,
    disabled: true,
    placeholder: '请输入客户姓名',
    span: '12',
  },
  {
    label: '退还方式',
    key: 'tui',
    widget: 'select',
    initialValue: queryInfo?.tui,
    option: [
      { value: 1, label: '现金' },
      { value: 2, label: '微信' },
      { value: 3, label: 'app' },
    ],
    required: true,
    rules: [{ required: true, message: '请选择' }],
    placeholder: '请选择退还方式',
    span: '12',
  },
  {
    label: '退还时间',
    key: 'tuiTime',
    widget: 'dateInput',
    widgetProps: {
      format: 'YYYY-MM-DD HH:mm:ss',
    },
    required: true,
    rules: [{ required: true, message: '请选择退还时间' }],
    placeholder: '请选择退还时间',
    span: '12',
  },
]

export const backList = (
  onChange: (text: React.ChangeEvent<HTMLInputElement>) => void
) => {
  return [
    {
      title: '收费项',
      align: 'center',
      key: 'shouName',
    },
    {
      title: '账户金额',
      align: 'center',
      key: 'fee',
    },
    {
      title: '退还金额',
      align: 'center',
      key: 'tuiMoney',
      render: () => (
        <Input
          placeholder="请输入内容"
          style={{ maxWidth: 150 }}
          onChange={onChange}
        />
      ),
    },
  ]
}
