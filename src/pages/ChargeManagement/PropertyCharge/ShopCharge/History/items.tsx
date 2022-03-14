import { Tag } from 'uiw'
import '../index.css'
// import { Change } from '@/servers/ChargeManagement/ShopCharge'

export const columns = (onClick: () => void) => [
  {
    title: '打印',
    key: 'print',
    align: 'center',
    render: (text: string) => {
      return (
        <div onClick={onClick} className="input-Print">
          {text}
        </div>
      )
    },
  },
  {
    title: '编号',
    key: 'number',
    align: 'center',
    with: 200,
  },
  {
    title: '收费项名',
    key: 'phone',
    align: 'center',
  },
  {
    title: '客户姓名',
    key: 'name',
    align: 'center',
  },
  {
    title: '费用开始时间',
    align: 'center',
    key: 'feeStartTime',
    ellipsis: true,
    with: 200,
  },
  {
    title: '费用结束时间',
    align: 'center',
    key: 'feeEndTime',
    ellipsis: true,
    with: 200,
  },
  {
    title: '金额',
    key: 'fee',
    align: 'center',
  },
  {
    title: '滞纳金',
    key: 'lateFee',
    align: 'center',
  },
  {
    title: '优惠金额',
    key: 'center',
    align: 'center',
  },
  {
    title: '实收金额',
    align: 'center',
    key: 'moneyAmount',
  },
  {
    title: '付款状态',
    align: 'center',
    key: 'money',
    render: (createName: string) => (
      <div style={{ textAlign: 'center' }}>
        {createName === '已付款' ? (
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
    key: 'feeTime',
    ellipsis: true,
    with: 200,
  },
]
