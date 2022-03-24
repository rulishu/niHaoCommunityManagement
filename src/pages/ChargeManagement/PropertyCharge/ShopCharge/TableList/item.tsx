import { Input, Tag } from 'uiw'
export const columnsList = () => {
  return [
    {
      title: '收费项名称',
      align: 'center',
      key: 'shouName',
    },
    {
      align: 'center',
      title: '费用开始时间',
      key: 'startingTime',
      ellipsis: true,
    },
    {
      align: 'center',
      title: '费用结束时间',
      key: 'endTime',
      ellipsis: true,
    },

    {
      title: '金额',
      align: 'center',
      key: 'fee',
    },
    {
      title: '优惠金额',
      align: 'center',
      key: 'money',
      render: () => (
        <Input
          placeholder="请输入金额"
          style={{ maxWidth: 200 }}
          addonAfter={<div style={{ marginRight: 5 }}>元</div>}
        />
      ),
    },
    {
      title: '滞纳金',
      align: 'center',
      key: 'lateFee',
    },
    {
      title: '应收金额',
      align: 'center',
      key: 'moneyAmount',
    },
  ]
}
// 历史数据
export const columnsHistory = () => [
  {
    title: '打印',
    key: 'print',
    align: 'center',
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
    with: 230,
  },
  {
    title: '费用结束时间',
    align: 'center',
    key: 'feeEndTime',
    ellipsis: true,
    with: 230,
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
