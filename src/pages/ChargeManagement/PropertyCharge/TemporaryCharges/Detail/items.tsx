import { Change } from '@/servers/ChargeManagement/temporaryCharges'

export const items = (queryInfo: Change, value: boolean, tableType: string) => {
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
      hide: tableType === 'view' || tableType === 'edit' ? true : false,
      rules: [{ required: true, message: '请输入客户类型' }],
    },
    {
      label: '编号',
      key: 'code',
      widget: 'input',
      initialValue: queryInfo?.code,
      placeholder: '请输入编号',
      hide: tableType === 'add' && !value,
      // || (tableType === 'edit' || tableType === 'view') ?  false: true,
      disabled: tableType === 'edit' || tableType === 'view' ? true : false,
      rules: [{ required: true, message: '请输入编号' }],
    },
    {
      label: '客户姓名',
      key: 'name',
      widget: 'input',
      initialValue: queryInfo?.name,
      required: true,
      placeholder: '请输入客户姓名',
      disabled: tableType === 'edit' ? true : false,
      rules: [{ required: true, message: '请输入客户姓名' }],
    },
    {
      label: '收费项目',
      key: 'payService',
      initialValue: queryInfo?.payService,
      widget: 'select',
      required: true,
      option: [
        { label: '测试暖气费', value: '1' },
        { label: '测试临时收费项', value: '2' },
      ],
      disabled: tableType === 'edit' ? true : false,
      rules: [{ required: true, message: '请输入收费项目' }],
    },
    {
      label: '付款方式',
      key: 'payType',
      initialValue: queryInfo?.payType,
      widget: 'select',
      required: true,
      option: [
        { label: '现金', value: '1' },
        { label: '微信支付', value: '2' },
        { label: '支付宝支付', value: '3' },
        { label: '刷卡', value: '4' },
        { label: '转账', value: '5' },
      ],
      disabled: tableType === 'edit' ? true : false,
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
      disabled: tableType === 'edit' ? true : false,
      placeholder: '请输入收款金额',
    },
    {
      label: '收款时间',
      key: 'collectionTime',
      widget: 'dateInput',
      widgetProps: {
        format: 'YYYY-MM-DD HH:mm:ss',
      },
      initialValue: queryInfo?.collectionTime,
      required: true,
      disabled: tableType === 'edit' ? true : false,
      rules: [{ required: true, message: '请选择收款时间' }],
      placeholder: '请选择收款时间',
    },
    {
      label: '退款时间',
      key: 'refundTime',
      widget: 'dateInput',
      widgetProps: {
        format: 'YYYY-MM-DD HH:mm:ss',
      },
      initialValue: queryInfo?.refundTime,
      required: true,
      hide: tableType === 'edit' || tableType === 'view' ? false : true,
      rules: [{ required: true, message: '请选择退款时间' }],
      placeholder: '请选择退款时间',
    },
    {
      label: '退款方式',
      key: 'refundType',
      initialValue: queryInfo?.refundType,
      widget: 'select',
      option: [
        { label: '现金', value: '1' },
        { label: '微信支付', value: '2' },
        { label: '支付宝支付', value: '3' },
        { label: '刷卡', value: '4' },
        { label: '转账', value: '5' },
      ],
      required: true,
      hide: tableType === 'edit' || tableType === 'view' ? false : true,
      rules: [{ required: true, message: '请选择退款方式' }],
    },
    {
      label: '备注',
      key: 'remark',
      initialValue: queryInfo?.remark,
      placeholder: '请输入备注',
      widget: 'textarea',
      widgetProps: {},
      hide: tableType === 'edit' || tableType === 'view' ? false : true,
    },
  ]
}
