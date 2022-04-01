export const drawerTitle = (type: string) => {
  switch (type) {
    case 'charge':
      return '常规收费'
    case 'history':
      return '历史数据'
    case 'temAdd':
      return '新建临时收费'
    case 'depositAdd':
      return '新增押金'
    case 'storage':
      return '预存'
    case 'return':
      return '退还'
    case 'details':
      return '临时收费退款'
    case 'returnMoney':
      return '押金退还'
    default:
      return ''
  }
}

export const matching = (
  type: string,
  queryInfo: any,
  option: any,
  payment: any,
  payService: any,
  searchParms: any,
  detailed: any,
  show: boolean,
  setShow: any
) => {
  switch (type) {
    case 'charge':
      return items(queryInfo)
    case 'temAdd':
    case 'depositAdd':
      return temAddItems(
        queryInfo,
        option,
        payment,
        payService,
        searchParms,
        detailed
      )
    case 'storage':
      return storageItem(
        queryInfo,
        option,
        searchParms,
        detailed,
        show,
        setShow,
        payment,
        payService
      )
    case 'return':
      return returnItem(queryInfo, option, searchParms, detailed, payment)
    case 'details':
    case 'returnMoney':
      return details(
        queryInfo,
        option,
        searchParms,
        detailed,
        payment,
        payService,
        type
      )
    default:
      return []
  }
}

const items = (queryInfo: any) => [
  {
    label: '滞纳金',
    key: 'name',
    widget: 'input',
    required: true,
    span: 6,
    disabled: true,
    initialValue: queryInfo?.name,
  },
  {
    label: '优惠金额',
    key: 'phone',
    widget: 'input',
    span: 6,
    required: true,
    disabled: true,
    initialValue: queryInfo?.phone,
  },
  {
    label: '可用预存款',
    key: 'name6',
    widget: 'input',
    required: true,
    disabled: true,
    span: 6,
    initialValue: queryInfo?.name,
  },
  {
    label: '预存款付款',
    key: 'name5',
    widget: 'input',
    required: true,
    disabled: true,
    span: 6,
    initialValue: queryInfo?.name,
  },
  {
    label: '找零结存',
    key: 'name4',
    widget: 'input',
    required: true,
    span: 6,
    disabled: true,
    initialValue: queryInfo?.name,
  },
  {
    label: '找零金额',
    key: 'name3',
    widget: 'input',
    span: 6,
    required: true,
    disabled: true,
    initialValue: queryInfo?.name,
  },
  {
    label: '实际应收',
    key: 'name7',
    span: 6,
    widget: 'input',
    required: true,
    disabled: true,
    initialValue: queryInfo?.name,
  },
  {
    label: '收款金额',
    key: 'name2',
    widget: 'input',
    required: true,
    span: 6,
    initialValue: queryInfo?.name,
  },
  {
    label: '付款方式',
    key: 'name1',
    widget: 'input',
    required: true,
    span: 6,
    initialValue: queryInfo?.name,
  },
  {
    label: '额外付款',
    widget: 'checkbox',
    key: 'checkbox',
    span: 6,
    option: [
      { label: '使用预付款', value: 'sichuan' },
      { label: '找零结存', value: 'hubei' },
    ],
  },
]

const temAddItems = (
  queryInfo: any,
  option: any,
  payment: any,
  payService: any,
  searchParms: any,
  detailed: any
) => {
  return [
    {
      label: '商铺',
      key: 'code',
      widget: 'searchSelect',
      option,
      required: true,
      span: 8,
      disabled: true,
      initialValue: [searchParms?.code || ''],
      widgetProps: {
        placeholder: '请选择商铺',
        mode: 'single',
        allowClear: false,
      },
    },
    {
      label: '客户姓名',
      key: 'name',
      widget: 'input',
      required: true,
      span: 8,
      disabled: true,
      initialValue: detailed?.userName || '',
      widgetProps: { placeholder: '请填写客户姓名' },
    },
    {
      label: '收费项目',
      key: 'payService',
      widget: 'searchSelect',
      option: payService,
      required: true,
      span: 8,
      widgetProps: {
        placeholder: '请选择收费项目',
        labelInValue: true,
        mode: 'single',
        allowClear: true,
      },
      initialValue: queryInfo?.name,
    },
    {
      label: '付款方式',
      key: 'payType',
      widget: 'searchSelect',
      option: payment,
      required: true,
      span: 8,
      widgetProps: {
        placeholder: '请选择付款方式',
        labelInValue: true,
        mode: 'single',
        allowClear: true,
      },
      initialValue: queryInfo?.name,
    },
    {
      label: '收费金额',
      key: 'price',
      widget: 'input',
      required: true,
      span: 8,
      initialValue: queryInfo?.name,
    },
    {
      label: '收费时间',
      key: 'collectionTime',
      widget: 'dateInput',
      widgetProps: { allowClear: false, format: 'YYYY-MM-DD HH:mm:ss' },
    },
  ]
}

const storageItem = (
  queryInfo: any,
  option: any,
  searchParms: any,
  detailed: any,
  show: boolean,
  setShow: any,
  payment: any,
  payService: any
) => [
  {
    label: '商铺',
    key: 'code',
    widget: 'searchSelect',
    option,
    required: true,
    span: 8,
    initialValue: [searchParms?.code || ''],
    widgetProps: {
      placeholder: '请选择商铺',
      mode: 'single',
    },
  },
  {
    label: '客户姓名',
    key: 'name',
    widget: 'input',
    required: true,
    disabled: true,
    span: 8,
    initialValue: detailed?.userName || '',
    widgetProps: { placeholder: '请填写用户姓名' },
  },
  {
    label: '付款方式',
    key: 'paymentMethod',
    widget: 'searchSelect',
    option: payment,
    required: true,
    span: 8,
    widgetProps: {
      placeholder: '请选择付款方式',
      mode: 'single',
    },
    initialValue: queryInfo?.name,
  },
  {
    label: '收费金额',
    key: 'chargeAmount',
    widget: 'input',
    required: true,
    span: 8,
    initialValue: queryInfo?.name,
  },
  {
    label: '收费时间',
    key: 'chargingTime',
    widget: 'dateInput',
    widgetProps: { format: 'YYYY-MM-DD HH:mm:ss' },
  },
  {
    label: '可用收费项',
    widget: 'radio',
    key: 'chargeltem',
    option: [
      { label: '指定收费项', value: '1' },
      { label: '所有收费项', value: '2' },
    ],
    widgetProps: {
      onChange: (value: any) => {
        if (value?.target?.value !== '1') {
          setShow(true)
        } else {
          setShow(false)
        }
      },
    },
  },
  {
    label: '收费项目',
    key: 'payService',
    widget: 'searchSelect',
    option: payService,
    required: true,
    hide: show,
    span: 8,
    widgetProps: {
      placeholder: '请选择收费项目',
      mode: 'single',
    },
    initialValue: queryInfo?.name,
  },
]

const returnItem = (
  queryInfo: any,
  option: any,
  searchParms: any,
  detailed: any,
  payment: any
) => [
  {
    label: '商铺',
    key: 'name',
    widget: 'searchSelect',
    option,
    required: true,
    span: 8,
    initialValue: [searchParms?.code || ''],
    widgetProps: {
      placeholder: '请选择商铺',
      mode: 'single',
    },
  },
  {
    label: '客户姓名',
    key: 'name1',
    widget: 'input',
    required: true,
    disabled: true,
    span: 8,
    initialValue: detailed?.userName || '',
    widgetProps: { placeholder: '请填写用户姓名' },
  },
  {
    label: '付款方式',
    key: 'payType',
    widget: 'searchSelect',
    option: payment,
    required: true,
    span: 8,
    widgetProps: { placeholder: '请选择付款方式', mode: 'single' },
    initialValue: queryInfo?.name,
  },
  {
    label: '退还时间',
    key: 'dateInputsecond',
    widget: 'dateInput',
    widgetProps: { format: 'YYYY-MM-DD HH:mm:ss' },
  },
]

const details = (
  queryInfo: any,
  option: any,
  searchParms: any,
  detailed: any,
  payment: any,
  payService: any,
  type: string
) => [
  {
    label: '商铺',
    key: 'name',
    widget: 'searchSelect',
    option,
    required: true,
    disabled: true,
    span: 8,
    initialValue: [searchParms?.code || ''],
    widgetProps: {
      placeholder: '请选择商铺',
      mode: 'single',
    },
  },
  {
    label: '客户姓名',
    key: 'name1',
    widget: 'input',
    required: true,
    disabled: true,
    span: 8,
    initialValue: detailed?.userName || '',
    widgetProps: { placeholder: '请填写用户姓名' },
  },
  {
    label: '收费项目',
    key: 'payService',
    widget: 'searchSelect',
    option: payService,
    required: true,
    disabled: true,
    span: 8,
    widgetProps: {
      placeholder: '请选择收费项目',
      mode: 'single',
    },
    initialValue: queryInfo?.name,
  },
  {
    label: '付款方式',
    key: 'payType',
    widget: 'searchSelect',
    option: payment,
    disabled: true,
    required: true,
    span: 8,
    widgetProps: { placeholder: '请选择付款方式', mode: 'single' },
    initialValue: queryInfo?.name,
  },
  {
    label: '收费金额',
    key: 'chargeAmount',
    widget: 'input',
    disabled: true,
    required: true,
    span: 8,
    initialValue: queryInfo?.name,
  },
  {
    label: '收费时间',
    key: 'chargingTime',
    widget: 'dateInput',
    required: true,
    disabled: true,
    widgetProps: { format: 'YYYY-MM-DD HH:mm:ss' },
  },
  {
    label: '退款时间',
    key: 'chargingTime1',
    widget: 'dateInput',
    required: true,
    disabled: type !== 'returnMoney',
    widgetProps: { format: 'YYYY-MM-DD HH:mm:ss' },
  },
  {
    label: '退款方式',
    key: 'payType1',
    widget: 'searchSelect',
    option: payment,
    required: true,
    disabled: type !== 'returnMoney',
    span: 8,
    widgetProps: {
      placeholder: '请选择付款方式',
      mode: 'single',
    },
    initialValue: queryInfo?.name,
  },
  {
    label: '备注',
    disabled: type !== 'returnMoney',
    key: 'chargeAmount1',
    widget: 'input',
    required: true,
    span: 8,
    initialValue: queryInfo?.name,
  },
]
