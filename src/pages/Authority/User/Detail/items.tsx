import { Change } from '@/servers/Authority/Role'

export const items = (queryInfo: Change) => [
  {
    label: '用户名',
    key: 'createName',
    widget: 'input',
    initialValue: queryInfo?.createName,
    widgetProps: {},
    required: true,
    rules: [{ required: true, message: '请输入用户名' }],
  },
  {
    label: '权限名称',
    key: 'uapRightName',
    widget: 'input',
    initialValue: queryInfo?.uapRightName,
    required: true,
    rules: [{ required: true, message: '请输入权限名称' }],
  },
  {
    label: '选择器',
    key: 'select',
    widget: 'select',
    width: 200,
    option: [
      { value: 1, label: '小程序' },
      { value: 2, label: 'pc' },
      { value: 3, label: 'app' },
    ],
    initialValue: queryInfo.select,
    required: true,
    rules: [{ required: true, message: '请选择选择器' }],
  },
  {
    label: '路径',
    key: 'uapRightUrl',
    widget: 'input',
    initialValue: queryInfo?.uapRightUrl,
    required: true,
    rules: [{ required: true, message: '请输入路径' }],
  },
]
