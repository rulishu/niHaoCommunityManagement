import {
  Change,
  RefundAmount,
} from '@/servers/ChargeManagement/PredepositsManage'
import { Input } from 'uiw'
import { UseFormProps } from '@uiw-admin/components/src/ProForm/type'

export const items = (
  queryInfo: Change,
  tableType: string,
  baseRef: UseFormProps,
  code: [],
  buChargesList: any,
  paysList: any,
  dataList: any,
  setValue: (value: string) => void
) => {
  return [
    {
      label: '编号',
      key: 'code',
      widget: 'select',
      initialValue: queryInfo?.code,
      placeholder: '请输入编号',
      required: true,
      option: code,
      widgetProps: {
        mode: 'single',
        placeholder: '请输入选择',
        onChange: (e: any) => {
          setValue(e.target.value)

          if (dataList[0].code === e.target.value) {
            baseRef.setFields &&
              baseRef.setFields({
                name: dataList[0].userName,
              })
          }
        },
        // onSelect: (value: string) => {},
        // onSearch: (value: string) => {}
      },
      rules: [{ required: true, message: '请输入编号' }],
    },
    {
      label: '客户姓名',
      key: 'name',
      widget: 'input',
      initialValue: queryInfo?.name,
      required: true,
      placeholder: '请输入客户姓名',
      disabled: true,
      rules: [{ required: true, message: '请输入客户姓名' }],
    },
    {
      label: '收费项目',
      key: 'payService',
      initialValue: queryInfo?.payService,
      widget: 'select',
      required: true,
      option: buChargesList,
      hide: tableType === 'edit' ? true : false,
      rules: [{ required: true, message: '请输入收费项目' }],
    },
    {
      label: '付款方式',
      key: 'paymentMethod',
      initialValue: queryInfo?.paymentMethod,
      widget: 'select',
      required: true,
      option: paysList,
      hide: tableType === 'edit' ? true : false,
      rules: [{ required: true, message: '请输入付款方式' }],
    },
    {
      label: '收款人',
      key: 'chargeName',
      widget: 'input',
      initialValue: queryInfo?.chargeName,
      required: true,
      placeholder: '请输入收款人',
      hide: tableType === 'edit' ? true : false,
      rules: [{ required: true, message: '请输入收款人' }],
    },
    {
      label: '金额',
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
      hide: tableType === 'edit' ? true : false,
      placeholder: '请输入金额',
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
      hide: tableType === 'edit' ? true : false,
      rules: [{ required: true, message: '请选择收费时间' }],
      placeholder: '请选择收费时间',
    },
    {
      label: '退还方式',
      key: 'refundWay',
      initialValue: queryInfo?.refundWay,
      widget: 'select',
      option: paysList,
      required: true,
      hide: tableType === 'edit' ? false : true,
      rules: [{ required: true, message: '请选择退款方式' }],
    },
    {
      label: '退还时间',
      key: 'refundTime',
      widget: 'dateInput',
      widgetProps: {
        format: 'YYYY-MM-DD HH:mm:ss',
      },
      initialValue: queryInfo?.refundTime,
      required: true,
      hide: tableType === 'edit' ? false : true,
      rules: [{ required: true, message: '请选择退还时间' }],
      placeholder: '请选择退还时间',
    },
  ]
}

export const backList = () => {
  return [
    {
      title: '收费项',
      align: 'center',
      key: 'payServiceName',
    },
    {
      title: '账户金额',
      align: 'center',
      key: 'chargeAmount',
    },
    {
      title: '退还金额',
      align: 'center',
      key: 'refundAmount',
      required: true,
      render: (text: string, key: string, rowData: RefundAmount) => {
        return (
          <Input
            placeholder="请输入内容"
            style={{ maxWidth: 150 }}
            // value={value}
            onBlur={async (e) => {
              const value = e?.target?.value || ''
              rowData.refundAmount = value
            }}
          />
        )
      },
    },
  ]
}
