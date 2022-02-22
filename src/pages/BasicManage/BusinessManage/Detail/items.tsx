import { Change } from '@/servers/BasicManage/ChargeManage'

export const items = (queryInfo: Change, tableType: string) => [
  {
    label: '商业区编号',
    key: 'charge',
    widget: 'input',
    initialValue: queryInfo?.chargeName,
    required: true,
    rules: [{ required: true, message: '请输入商业区编号' }],
  },
  {
    label: '商业区名',
    key: 'chargeName',
    widget: 'input',
    initialValue: queryInfo?.chargeName,
    required: true,
    rules: [{ required: true, message: '请输入商业区名' }],
  },
  {
    label: '备注',
    key: 'univalent',
    widget: 'textarea',
    initialValue: queryInfo?.univalent,
    hide: tableType === 'view' ? true : false,
  },
]
