import { Usermanagement } from '@/servers/usermanagement'

export const items = (queryInfo: Usermanagement, isView: boolean) => [
  {
    label: '账号名称',
    key: 'createName',
    widget: 'input',
    initialValue: queryInfo?.createName,
    hide: !isView,
  },
  {
    label: '用户姓名',
    key: 'userName',
    widget: 'input',
    initialValue: queryInfo?.userName,
    required: true,
    rules: [{ required: true, message: '请输入用户真实姓名' }],
    placeholder: '请输入用户真实姓名',
  },
  {
    label: '联系方式',
    key: 'phoneNumber',
    widget: 'input',
    initialValue: queryInfo?.phoneNumber,
    required: true,
    placeholder: '请输入角色名称',
    rules: [
      {
        pattern: new RegExp(
          /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/
        ),
        message: '请正确输入手机号',
      },
    ],
  },
  {
    label: '用户性别',
    key: 'gender',
    widget: 'select',
    initialValue: queryInfo?.gender,
    hide: !isView,
    option: [
      { value: 0, label: '男' },
      { value: 1, label: '女' },
    ],
  },
  {
    label: '用户状态',
    key: 'status',
    widget: 'select',
    option: [
      { value: 1, label: '正常' },
      { value: 2, label: '停用' },
    ],
    required: true,
    rules: [{ required: true, message: '请选择用户状态' }],
    placeholder: '请选择用户状态',
    initialValue: queryInfo?.status,
  },
  {
    label: '注册时间',
    key: 'createTime',
    widget: 'input',
    initialValue: queryInfo?.createTime,
    hide: !isView,
  },
  {
    label: '备注',
    key: 'remark',
    widget: 'input',
    initialValue: queryInfo?.remark,
    placeholder: '请输入备注',
  },
]
