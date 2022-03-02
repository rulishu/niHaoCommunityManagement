import { Change } from '@/servers/Authority/Role'

export const items = (queryInfo: Change) => [
  {
    label: '姓名',
    key: 'uapRoleName',
    widget: 'input',
    initialValue: queryInfo.roleName,
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
    initialValue: queryInfo.roleName,
    required: true,
    rules: [{ required: true, message: '请选择权限' }],
  },
]
