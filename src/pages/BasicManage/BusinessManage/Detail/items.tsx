import { Change } from '@/servers/BasicManage/BusinessManage'

export const items = (queryInfo: Change) => [
  {
    label: '社区编号',
    key: 'zoneNo',
    widget: 'input',
    initialValue: queryInfo?.zoneNo,
    required: true,
    span: '12',
    rules: [{ required: true, message: '请输入社区编号' }],
  },
  {
    label: '社区名',
    key: 'zoneName',
    widget: 'input',
    initialValue: queryInfo?.zoneName,
    required: true,
    span: '12',
    rules: [{ required: true, message: '请输入社区名' }],
  },
  {
    label: '社区地址',
    key: 'zoneAdress',
    widget: 'textarea',
    initialValue: queryInfo?.zoneName,
    required: true,
    span: '12',
    rules: [
      {
        required: true,
        message: '请输入社区地址',
      },
    ],
  },
  {
    label: '备注',
    key: 'zoneRemark',
    span: '12',
    widget: 'textarea',
    initialValue: queryInfo?.zoneRemark,
    rules: [{ message: '备注' }],
  },
]
