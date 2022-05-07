import { Tag, Input } from 'uiw'
export const matching = (type: string, table: any, obtain: any) => {
  switch (type) {
    case 'charge':
      return columnsList()
    case 'history':
      return columnsHistory()
    case 'return':
      return columnsReturn(table, obtain)
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
      render: (money: number) => {
        return <div>¥{money}元</div>
      },
    },
  ]
}
// 历史数据
const columnsHistory = () => [
  {
    title: '收费项名',
    key: 'saleTypeName',
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
    title: '金额(元)',
    key: 'money',
    align: 'center',
    render: (money: number) => {
      return <div>¥{money}元</div>
    },
  },
  {
    title: '实收金额(元)',
    align: 'center',
    key: 'paidMoney',
    render: (paidMoney: number) => {
      return <div>¥{paidMoney}元</div>
    },
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
const columnsReturn = (table: any, obtain: any) => [
  {
    title: '收费项',
    key: 'payServiceName',
    align: 'center',
  },
  {
    title: '账户金额(元)',
    key: 'chargeAmount',
    align: 'center',
    render: (chargeAmount: number) => {
      return <div>¥{chargeAmount}元</div>
    },
  },
  {
    title: '退还金额(元)',
    key: 'refundAmount',
    align: 'center',
    render: (text: any, type: any, data: any, index: number) => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Input
          placeholder="请输入退还金额"
          style={{ width: 200 }}
          onBlur={async (e) => {
            const value = e?.target?.value || ''
            table.data[index].refundAmount = value
            obtain.current = table?.data || []
          }}
        />
      </div>
    ),
  },
]
