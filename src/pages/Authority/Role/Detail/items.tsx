import { Change } from '@/servers/Authority/Role'

export const itemsAdd = (queryInfo: Change, isView: boolean) => [
  {
    label: '角色名称',
    key: 'roleName',
    widget: 'input',
    initialValue: queryInfo?.roleName,
    required: true,
    rules: [{ required: true, message: '请输入角色名称' }],
    span: '24',
  },
  {
    label: '角色状态',
    key: 'status',
    widget: 'input',
    initialValue: queryInfo?.status,
    hide: !isView,
  },
  {
    label: '创建人',
    key: 'createName',
    widget: 'input',
    initialValue: queryInfo?.createName,
    hide: !isView,
  },
  {
    label: '创建时间',
    key: 'createTime',
    widget: 'input',
    initialValue: queryInfo?.createTime,
    hide: !isView,
  },
  {
    label: '更新时间',
    key: 'updateTime',
    widget: 'input',
    initialValue: queryInfo?.updateTime,
    hide: !isView,
  },
  {
    label: '备注',
    initialValue: queryInfo?.remark,
    key: 'remark',
    placeholder: '请输入备注',
    widget: 'textarea',
    widgetProps: {},
    span: '24',
  },
]
