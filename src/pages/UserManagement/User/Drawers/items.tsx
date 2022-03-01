import { Usermanagement } from '@/servers/usermanagement'

export const items = (queryInfo: Usermanagement) => [
  {
    label: '账号名称',
    key: 'uapAccountNickName',
    widget: 'input',
    initialValue: queryInfo?.uapAccountNickName,
    required: true,
    rules: [{ required: true, message: '请输入账号名称' }],
    widgetProps: {},
    placeholder: '请输入账号名称',
  },
  {
    label: '用户真实姓名',
    key: 'uapUserRealName',
    widget: 'input',
    initialValue: queryInfo?.uapUserRealName,
    required: true,
    rules: [{ required: true, message: '请输入用户真实姓名' }],
    placeholder: '请输入用户真实姓名',
  },
  {
    label: '角色名称',
    key: 'uapRoleName',
    widget: 'input',
    initialValue: queryInfo?.uapRoleName,
    required: true,
    rules: [{ required: true, message: '请输入角色名称' }],
    placeholder: '请输入角色名称',
  },
]
