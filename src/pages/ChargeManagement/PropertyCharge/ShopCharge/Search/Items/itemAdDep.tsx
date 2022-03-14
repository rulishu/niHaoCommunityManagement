export const columnsPre = (queryInfo: any) => [
  {
    label: '编号',
    key: 'id',
    widget: 'input',
    widgetProps: {},
    initialValue: queryInfo?.id,
    disabled: true,
    placeholder: '请输入编号',
  },
  {
    label: '客户姓名',
    key: 'name',
    widget: 'input',
    widgetProps: {},
    initialValue: queryInfo?.name,
    disabled: true,
    placeholder: '请输入客户姓名',
  },
  {
    label: '可用收费项',
    key: 'feeType',
    initialValue: queryInfo?.feeType,
    widget: 'radio',
    option: [
      { label: '指定收费项', value: '指定收费项' },
      { label: '所有收费项', value: '所有收费项' },
    ],
    required: true,
    rules: [{ required: true, message: '请选择可用收费项' }],
  },
  {
    label: '付款方式',
    key: 'select',
    widget: 'select',
    initialValue: queryInfo?.select,
    option: [
      { value: 1, label: '现金' },
      { value: 2, label: '微信' },
      { value: 3, label: 'app' },
    ],
    required: true,
    rules: [{ required: true, message: '请选择付款方式' }],
  },
  {
    label: '收费金额',
    key: 'fee',
    widget: 'input',
    initialValue: queryInfo?.fee,
    required: true,
    rules: [
      {
        pattern: new RegExp(/(^[1-9](\d+)?(\.\d{1,2})?$)|(^\d\.\d{1,2}$)/),
        message: '请正确输入',
      },
    ],
    widgetProps: {
      addonAfter: <div style={{ marginRight: 5 }}>元</div>,
    },
    placeholder: '请输入收费金额',
  },
  {
    label: '收费时间',
    key: 'dateInputsecond',
    widget: 'dateInput',
    widgetProps: {
      format: 'YYYY-MM-DD HH:mm:ss',
    },
    required: true,
    rules: [{ required: true, message: '请选择收费时间' }],
    placeholder: '请选择收费时间',
  },
]
