/* eslint-disable max-lines */
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
    case 'see':
      return '退款详情'
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
  form: any,
  tyoeList: any,
  setTyoeList: any,
  shopChargeList: any
) => {
  switch (type) {
    case 'charge':
      return items(queryInfo, payment, form, tyoeList, setTyoeList)
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
        payment,
        payService,
        shopChargeList
      )
    case 'return':
      return returnItem(queryInfo, option, searchParms, detailed, payment)
    case 'details':
    case 'returnMoney':
    case 'see':
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

const items = (
  queryInfo: any,
  payment: any,
  form: any,
  tyoeList: any,
  setTyoeList: any
) => {
  return [
    {
      label: '实际应收',
      key: 'shouldPaySum',
      span: 6,
      widget: 'input',
      disabled: true,
      required: true,
      initialValue: queryInfo?.shouldPaySum,
    },
    {
      label: '找零金额',
      key: 'sumByZero',
      widget: 'input',
      span: 6,
      disabled: true,
      initialValue: queryInfo?.sumByZero,
    },
    {
      label: '可用预存款',
      key: 'preBunt',
      widget: 'input',
      disabled: true,
      span: 6,
      initialValue: queryInfo?.preBunt,
    },
    {
      label: '预存款付款',
      key: 'preBuntPaySum',
      widget: 'input',
      disabled: true,
      span: 6,
      initialValue: queryInfo?.preBuntPaySum,
    },
    {
      label: '找零结存',
      key: 'balanceByZero',
      widget: 'input',
      disabled: true,
      span: 6,
      initialValue: queryInfo?.balanceByZero,
    },
    {
      label: '收款金额',
      key: 'fund',
      widget: 'input',
      span: 6,
      initialValue: queryInfo?.name,
      widgetProps: {
        onBlur: (e: any) => {
          const fromData = form.getFieldValues()
          if (tyoeList.length === 0) {
            form.setFields({
              ...fromData,
              sumByZero:
                -fromData?.shouldPaySum + Number(e?.target?.value || 0),
            })
            return
          }
          if (tyoeList.includes(1) && tyoeList.includes(2)) {
            form.setFields({
              ...fromData,
              balanceByZero:
                -fromData?.shouldPaySum +
                (fromData?.preBunt || 0) +
                Number(e?.target?.value || 0),
            })
            return
          }
          if (tyoeList.includes(1)) {
            form.setFields({
              ...fromData,
              sumByZero:
                -fromData?.shouldPaySum +
                (fromData?.preBunt || 0) +
                Number(e?.target?.value || 0),
            })
            return
          }
          if (tyoeList.includes(2)) {
            form.setFields({
              ...fromData,
              balanceByZero:
                -fromData?.shouldPaySum + Number(e?.target?.value || 0),
            })
            return
          }
        },
      },
    },
    {
      label: '付款方式',
      key: 'payMode',
      widget: 'searchSelect',
      option: payment,
      required: true,
      span: 6,
      widgetProps: {
        placeholder: '请选择付款方式',
        mode: 'single',
      },
      initialValue: queryInfo?.name,
    },

    {
      label: '额外付款',
      key: 'type',
      widget: 'searchSelect',
      span: 6,
      option: [
        { label: '使用预付款', value: 1 },
        { label: '找零结存', value: 2 },
      ],
      widgetProps: {
        mode: 'multiple',
        onChange: (value: any) => {
          const fromData = form.getFieldValues()
          setTyoeList(value)
          if (value.length === 0) {
            form.setFields({
              ...fromData,
              preBuntPaySum: 0,
              balanceByZero: 0,
              sumByZero:
                -fromData?.shouldPaySum + (Number(fromData?.fund) || 0),
              type: [],
            })
            return
          }
          if (value.includes(1) && value.includes(2)) {
            form.setFields({
              ...fromData,
              preBuntPaySum: fromData?.preBunt,
              balanceByZero:
                -fromData?.shouldPaySum +
                fromData?.preBunt +
                (Number(fromData?.fund) || 0),
              sumByZero: 0,
              type: [1, 2],
            })
            return
          }
          if (value.includes(1)) {
            form.setFields({
              ...fromData,
              preBuntPaySum: fromData?.preBunt,
              sumByZero:
                -fromData?.shouldPaySum +
                fromData?.preBunt +
                Number(fromData?.fund || 0),
              balanceByZero: 0,
              type: [1],
            })
            return
          }
          if (value.includes(2)) {
            form.setFields({
              ...fromData,
              balanceByZero:
                -fromData?.shouldPaySum + (Number(fromData?.fund) || 0),
              sumByZero: 0,
              preBuntPaySum: 0,
              type: [2],
            })
            return
          }
        },
        allowClear: true,
        // style: { width: '100%' },
      },
    },
  ]
}
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
  payment: any,
  payService: any,
  shopChargeList: any
) => [
  {
    label: '商铺',
    key: 'code',
    widget: 'searchSelect',
    option,
    required: true,
    span: 8,
    initialValue: searchParms?.code || '',
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
    initialValue: queryInfo?.paymentMethod,
  },
  {
    label: '收费金额',
    key: 'chargeAmount',
    widget: 'input',
    required: true,
    span: 8,
    initialValue: queryInfo?.chargeAmount,
  },
  {
    label: '收费时间',
    key: 'chargingTime',
    widget: 'dateInput',
    widgetProps: { format: 'YYYY-MM-DD HH:mm:ss' },
  },
  {
    label: '收费项目',
    key: 'payService',
    widget: 'searchSelect',
    option: shopChargeList,
    required: true,
    span: 8,
    widgetProps: {
      placeholder: '请选择收费项目',
      mode: 'single',
    },
    initialValue: queryInfo?.payService,
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
    key: 'code',
    widget: 'searchSelect',
    option,
    required: true,
    disabled: true,
    span: 8,
    initialValue: searchParms?.code,
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
    initialValue: Number(queryInfo?.payService),
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
    initialValue: Number(queryInfo?.payType),
  },
  {
    label: '收费金额',
    key: 'price',
    widget: 'input',
    disabled: true,
    required: true,
    span: 8,
    initialValue: queryInfo?.price,
  },
  {
    label: '收费时间',
    key: 'chargingTime',
    widget: 'dateInput',
    required: true,
    disabled: true,
    initialValue: queryInfo?.chargingTime,
    widgetProps: { format: 'YYYY-MM-DD HH:mm:ss' },
  },
  {
    label: '退款时间',
    key: 'refundTime',
    widget: 'dateInput',
    required: true,
    disabled: type === 'see',
    initialValue: queryInfo?.refundTime,
    widgetProps: { format: 'YYYY-MM-DD HH:mm:ss' },
  },
  {
    label: '退款方式',
    key: 'refundType',
    widget: 'searchSelect',
    option: payment,
    required: true,
    disabled: type === 'see',
    span: 8,
    widgetProps: {
      placeholder: '请选择付款方式',
      mode: 'single',
    },
    initialValue: Number(queryInfo?.refundType),
  },
  {
    label: '备注',
    disabled: type === 'see',
    key: 'remark',
    widget: 'textarea',
    required: true,
    span: 24,
    initialValue: queryInfo?.remark,
  },
]
