import { Change } from '@/servers/Authority/User'

export const items = (queryInfo: Change, keys: string) => [
  {
    label: '角色名称',
    key: 'roleName',
    widget: 'input',
    initialValue: queryInfo?.roleName,
    hide: keys === 'outside' ? false : true,
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
    hide: keys === 'outside' ? false : true,
  },
  {
    label: '用户性别',
    key: 'gender',
    widget: 'input',
    initialValue:
      queryInfo?.gender === 1 ? '男' : queryInfo?.gender === 2 ? '女' : '',
    hide: keys === 'outside' ? false : true,
  },
  {
    label: '手机号',
    key: 'phoneNumber',
    widget: 'input',
    initialValue: queryInfo?.phoneNumber,
    hide: keys === 'outside' ? false : true,
  },
  {
    label: '帐号状态',
    key: 'status',
    widget: 'input',
    initialValue: queryInfo?.status,
  },
]
