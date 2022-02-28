import { Change } from '@/servers/BasicManage/BusinessManage'

export const items = (queryInfo: Change,) => [
  {
    label: '商业区编号',
    key: 'zoneNo',
    widget: 'input',
    initialValue: queryInfo?.zoneNo,
    required: true,
    rules: [{ required: true, message: '请输入商业区编号' }],
  },
  {
    label: '商业区名',
    key: 'zoneName',
    widget: 'input',
    initialValue: queryInfo?.zoneName,
    required: true,
    rules: [{ required: true, message: '请输入商业区名' }],
  },
  {
    label: '备注',
    key: 'zoneRemark',
    widget: 'textarea',
    initialValue: queryInfo?.zoneRemark,
    rules: [{ required: true, message: '备注' }],
  },
]
