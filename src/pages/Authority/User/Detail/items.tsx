import { Change } from '@/servers/Authority/User'

export const items = (queryInfo: Change) => [
  {
    label: '角色名称',
    key: 'roleName',
    widget: 'input',
    initialValue: queryInfo?.roleName,
  },
  {
    label: '账号昵称',
    key: 'nickName',
    widget: 'input',
    initialValue: queryInfo?.nickName,
  },
  {
    label: '用户姓名',
    key: 'userName',
    widget: 'input',
    initialValue: queryInfo?.userName,
  },
  {
    label: '用户性别',
    key: 'gender',
    widget: 'input',
    initialValue: queryInfo?.gender,
  },
  {
    label: '手机号',
    key: 'phoneNumber',
    widget: 'input',
    initialValue: queryInfo?.phoneNumber,
  },
  {
    label: '帐号状态',
    key: 'status',
    widget: 'input',
    initialValue: queryInfo?.status,
  },
]
