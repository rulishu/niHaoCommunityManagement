import { Change } from '@/servers/DictionaryManagement/DictionaryManagement'

export const items = (queryInfo: Change, tableType: string) => [
  {
    label: '字典类型',
    key: 'dictType',
    span: '24',
    initialValue: queryInfo?.dictType,
    widget: 'input',
    placeholder: '请输入字典类型',
    required: true,
    rules: [{ required: true, message: '请选择字典类型' }],
  },
  {
    label: '备注',
    span: '24',
    key: 'remark',
    widget: 'textarea',
    placeholder: '请输入备注',
    initialValue: queryInfo?.remark,
  },
]

export const items2 = (queryInfo: any, addTypeList: any, tableType: string) => [
  {
    label: '字典名称',
    key: 'dictName',
    required: true,
    placeholder: '请输入字典名称',
    span: '24',
    widget: 'input',
    initialValue: queryInfo?.dictName,
    widgetProps: {},
    rules: [{ required: true, message: '请输入字典名称' }],
  },
  {
    label: '字典编码',
    key: 'dictCode',
    placeholder: '请输入字典编码',
    widget: 'input',
    span: '24',
    required: true,
    initialValue: queryInfo?.dictCode,
    widgetProps: {},
    rules: [{ required: true, message: '请输入字典编码' }],
  },
  {
    label: '字典类型',
    key: 'dictType',
    span: '24',
    initialValue: queryInfo?.dictType,
    widget: 'select',
    placeholder: '请输入字典类型',
    required: true,
    option: addTypeList,
    rules: [{ required: true, message: '请选择字典类型' }],
  },
  {
    label: '备注',
    span: '24',
    key: 'remark',
    widget: 'textarea',
    placeholder: '请输入备注',
    initialValue: queryInfo?.remark,
  },
]
