import { Change } from '@/servers/ChargeManagement/DepositManage'

export const items = (
  queryInfo: Change,
  value: boolean,
  tableType: string,
  buChargesList: any,
  paysList: any
) => {
  return [
    {
      label: '客户类型',
      key: 'customerType',
      widget: 'radio',
      initialValue: queryInfo?.customerType,
      option: [
        { label: '商铺客户', value: '1' },
        { label: '非商铺客户', value: '2' },
      ],
      span: '24',
      hide: tableType === 'refunded' || tableType === 'paied' ? true : false,
      rules: [{ required: true, message: '请输入客户类型' }],
    },
    {
      label: '编号',
      key: 'code',
      widget: 'input',
      initialValue: queryInfo?.code,
      placeholder: '请输入编号',
      hide: queryInfo?.customerType === '2' ? true : false,
      // tableType === 'add' && !value,
      // || (tableType === 'paied' || tableType === 'refunded') ?  false: true,
      disabled:
        tableType === 'paied' || tableType === 'refunded' ? true : false,
      rules: [{ message: '请输入编号' }],
    },
    {
      label: '客户姓名',
      key: 'name',
      widget: 'input',
      initialValue: queryInfo?.name,
      required: true,
      placeholder: '请输入客户姓名',
      disabled: tableType === 'paied' ? true : false,
      rules: [{ required: true, message: '请输入客户姓名' }],
    },
    {
      label: '收费项目',
      key: 'project',
      initialValue: queryInfo?.project,
      widget: 'select',
      required: true,
      option: buChargesList,
      disabled: tableType === 'paied' ? true : false,
      rules: [{ required: true, message: '请输入收费项目' }],
    },
    {
      label: '付款方式',
      key: 'paymentMethod',
      initialValue: queryInfo?.paymentMethod,
      widget: 'select',
      required: true,
      option: paysList,
      disabled: tableType === 'paied' ? true : false,
      rules: [{ required: true, message: '请输入付款方式' }],
    },
    {
      label: '收款人',
      key: 'collectionName',
      widget: 'input',
      initialValue: queryInfo?.collectionName,
      required: true,
      placeholder: '请输入收款人',
      disabled: tableType === 'paied' ? true : false,
      rules: [{ required: true, message: '请输入收款人' }],
    },
    {
      label: '收款金额',
      key: 'price',
      widget: 'input',
      initialValue: `${queryInfo?.price || ''}${
        tableType === 'refunded' ? '元' : ''
      }`,
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
      disabled: tableType === 'paied' ? true : false,
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
      disabled: tableType === 'paied' ? true : false,
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
      hide: tableType === 'paied' || tableType === 'refunded' ? false : true,
      rules: [{ required: true, message: '请选择退款时间' }],
      placeholder: '请选择退款时间',
    },
    {
      label: '退款方式',
      key: 'refundMethod',
      initialValue: queryInfo?.refundMethod,
      widget: 'select',
      option: paysList,
      required: true,
      hide: tableType === 'paied' || tableType === 'refunded' ? false : true,
      rules: [{ required: true, message: '请选择退款方式' }],
    },
    {
      label: '备注',
      key: 'remark',
      initialValue: queryInfo?.remark,
      placeholder: '请输入备注',
      widget: 'textarea',
      widgetProps: {},
      hide: tableType === 'paied' || tableType === 'refunded' ? false : true,
    },
  ]
}
