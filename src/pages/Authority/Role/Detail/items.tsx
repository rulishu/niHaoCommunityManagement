import { Change } from '@/servers/Authority/Role'

export const items = (queryInfo: Change) => [
  {
    label: '姓名',
    key: 'uapRoleName',
    widget: 'input',
    initialValue: queryInfo.uapRoleName,
    widgetProps: {},
    required: true,
    rules: [{ required: true, message: '请输入姓名' }],
  },
  {
    label: '权限',
    key: 'jurisdiction',
    widget: 'select',
    option: [
      { label: '管理员', value: 20 },
      { label: '超级管理员', value: 10 },
    ],
    initialValue: queryInfo.jurisdiction,
    required: true,
    rules: [{ required: true, message: '请选择权限' }],
  },
  {
    label: '更新人名称',
    key: 'updateName',
    widget: 'input',
    initialValue: queryInfo.updateName,
    widgetProps: {},
    required: true,
    rules: [{ required: true, message: '请输入更新人名称' }],
  },
  {
    label: '居住地址',
    key: 'textarea',
    widget: 'textarea',
    initialValue: queryInfo.textarea,
    required: true,
    rules: [{ required: true, message: '请输入居住地址' }],
  },
]
