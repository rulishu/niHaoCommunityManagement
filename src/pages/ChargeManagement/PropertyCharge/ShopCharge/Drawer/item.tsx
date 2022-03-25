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
    default:
      return ''
  }
}
export const matching = (type: string, queryInfo: any) => {
  switch (type) {
    case 'charge':
      return items(queryInfo)
    case 'temAdd':
    case 'depositAdd':
      return temAddItems(queryInfo)
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

const temAddItems = (queryInfo: any) => {
  return [
    {
      label: '商铺',
      key: 'name',
      widget: 'input',
      required: true,
      span: 8,
      initialValue: queryInfo?.name,
    },
    {
      label: '客户姓名',
      key: 'name1',
      widget: 'input',
      required: true,
      span: 8,
      initialValue: queryInfo?.name,
    },
    {
      label: '收费项目',
      key: 'name2',
      widget: 'input',
      required: true,
      span: 8,
      initialValue: queryInfo?.name,
    },
    {
      label: '付款方式',
      key: 'name3',
      widget: 'input',
      required: true,
      span: 8,
      initialValue: queryInfo?.name,
    },
    {
      label: '收费金额',
      key: 'name4',
      widget: 'input',
      required: true,
      span: 8,
      initialValue: queryInfo?.name,
    },
    {
      label: '收费时间',
      key: 'name5',
      widget: 'input',
      required: true,
      span: 8,
      initialValue: queryInfo?.name,
    },
  ]
}
