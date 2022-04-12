import { Tag } from 'uiw'
export const matching = (type: string) => {
  switch (type) {
    case 'charge':
      return columnsList()
    case 'history':
      return columnsHistory()
    case 'return':
      return columnsReturn()
    default:
      return []
  }
}
const columnsList = () => {
  return [
    {
      title: '收费项名称',
      align: 'center',
      key: 'saleType',
    },
    {
      align: 'center',
      title: '费用开始时间',
      key: 'startTime',
      ellipsis: true,
    },
    {
      align: 'center',
      title: '费用结束时间',
      key: 'endTime',
      ellipsis: true,
    },
    {
      title: '应收金额',
      align: 'center',
      key: 'money',
    },
  ]
}
// 历史数据
const columnsHistory = () => [
  {
    title: '收费项名',
    key: 'saleType',
    align: 'center',
  },
  {
    title: '客户姓名',
    key: 'username',
    align: 'center',
  },
  {
    title: '费用开始时间',
    align: 'center',
    key: 'startTime',
    ellipsis: true,
    with: 230,
  },
  {
    title: '费用结束时间',
    align: 'center',
    key: 'endTime',
    ellipsis: true,
    with: 230,
  },
  {
    title: '金额',
    key: 'money',
    align: 'center',
  },
  {
    title: '实收金额',
    align: 'center',
    key: 'paidMoney',
  },
  {
    title: '付款状态',
    align: 'center',
    key: 'status',
    render: (text: number) => (
      <div style={{ textAlign: 'center' }}>
        {text === 1 ? (
          <Tag disabled title="已付款" color="#28a745" />
        ) : (
          <Tag disabled title="未付款" color="#ffc107" />
        )}
      </div>
    ),
  },
  {
    title: '缴费时间',
    align: 'center',
    key: 'paymentTime',
    ellipsis: true,
    with: 200,
  },
]

// 退还
const columnsReturn = () => [
  {
    title: '收费项',
    key: 'payServiceName',
    align: 'center',
  },
  {
    title: '账户金额',
    key: 'chargeAmount',
    align: 'center',
  },
  {
    title: '退还金额',
    key: 'refundAmount',
    align: 'center',
  },
]
