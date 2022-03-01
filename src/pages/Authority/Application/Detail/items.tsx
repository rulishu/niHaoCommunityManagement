import { Change } from '@/servers/Authority/Application'

export const items = (queryInfo: Change) => [
  {
    label: '菜单名称',
    key: 'menuName',
    widget: 'input',
    initialValue: queryInfo?.menuName,
    widgetProps: {},
    required: true,
    rules: [{ required: true, message: '请输入菜单名称' }],
  },
  {
    label: '菜单图标',
    key: 'icon',
    widget: 'input',
    initialValue: queryInfo?.icon,
    required: true,
    rules: [{ required: true, message: '请输入菜单图标' }],
  },
  {
    label: '菜单类型',
    key: 'menuType',
    widget: 'select',
    option: [
      { value: 1, label: '目录' },
      { value: 2, label: '菜单' },
      { value: 3, label: '按钮 ' },
    ],
    initialValue: queryInfo.menuType,
    required: true,
    rules: [{ required: true, message: '请选择菜单类型' }],
  },
  {
    label: '菜单URL',
    key: 'path',
    widget: 'input',
    initialValue: queryInfo?.path,
    span: '24',
    required: true,
    rules: [{ required: true, message: '请输入菜单URL' }],
  },
  {
    label: '父菜单ID',
    key: 'parentId',
    widget: 'input',
    initialValue: queryInfo?.parentId,
    width: 200,
    disabled: true,
    // required: true,
    // rules: [{ required: true, message: '请输入父菜单ID' }],
  },
  {
    label: '显示顺序',
    key: 'orderNum',
    widget: 'input',
    initialValue: queryInfo?.orderNum,
    required: true,
    rules: [{ required: true, message: '显示顺序' }],
  },
  {
    label: '备注',
    key: 'remark',
    widget: 'input',
    initialValue: queryInfo?.remark,
    required: true,
    rules: [{ required: true, message: '备注' }],
  },
]
