import { Change } from '@/servers/ChargeManagement/PredepositsManage'

export const items = (queryInfo: Change, value: boolean, tableType: string) => {
  return [
    {
      label: '可用收费项',
      key: 'chargeItem',
      widget: 'radio',
      initialValue: queryInfo?.chargeItem,
      option: [
        { label: '指定收费项', value: '1' },
        { label: '所有收费项', value: '2' },
      ],
      span: '24',
      rules: [{ required: true, message: '请输入可用收费项' }],
    },
    {
      label: '编号',
      key: 'code',
      widget: 'input',
      initialValue: queryInfo?.code,
      placeholder: '请输入编号',
      required: true,
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
        { label: '电费', value: '1' },
        { label: '天然气费', value: '2' },
        { label: '卫生费', value: '3' },
        { label: '单位租金', value: '4' },
      ],
      hide: queryInfo?.chargeItem === '2' ? true : false,
      rules: [{ required: true, message: '请输入收费项目' }],
    },
    {
      label: '付款方式',
      key: 'paymentMethod',
      initialValue: queryInfo?.paymentMethod,
      widget: 'select',
      required: true,
      option: [
        { label: '现金', value: '1' },
        { label: '微信支付', value: '2' },
        { label: '支付宝支付', value: '3' },
        { label: '刷卡', value: '4' },
        { label: '转账', value: '5' },
      ],
      hide: queryInfo?.chargeItem === '2' ? true : false,
      rules: [{ required: true, message: '请输入付款方式' }],
    },
    {
      label: '收费金额',
      key: 'chargeAmount',
      widget: 'input',
      initialValue: queryInfo?.chargeAmount,
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
      placeholder: '请输入收费金额',
    },
    {
      label: '收费时间',
      key: 'chargingTime',
      widget: 'dateInput',
      widgetProps: {
        format: 'YYYY-MM-DD HH:mm:ss',
      },
      initialValue: queryInfo?.chargingTime,
      required: true,
      rules: [{ required: true, message: '请选择收费时间' }],
      placeholder: '请选择收费时间',
    },
  ]
}
