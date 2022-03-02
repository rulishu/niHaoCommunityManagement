import { Change } from '@/servers/Authority/Role'

export const items = (queryInfo: Change) => [
  {
    label: '角色名称',
    key: 'roleName',
    widget: 'input',
    initialValue: queryInfo?.roleName,
    required: true,
    rules: [{ required: true, message: '请输入角色名称' }],
  },
  // {
  //   label: '角色状态',
  //   key: 'status',
  //   widget: 'select',
  //   option: [
  //     { label: '正常', value: 1 },
  //     { label: '停用', value: 2 },
  //   ],
  //   initialValue: queryInfo?.status,
  //   required: true,
  //   rules: [{ required: true, message: '请选择角色状态' }],
  // },
  // {
  //   label: '备注',
  //   key: 'remark',
  //   widget: 'textarea',
  //   initialValue: queryInfo?.remark,
  //   required: true,
  //   rules: [{ required: true, message: '请输入备注' }],
  // },
]
