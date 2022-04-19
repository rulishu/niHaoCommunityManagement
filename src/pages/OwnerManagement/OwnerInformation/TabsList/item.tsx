export const columns = [
  {
    title: '商铺',
    key: 'shopName',
    ellipsis: true,
    align: 'center',
  },
  {
    title: '类型',
    key: 'useStatus',
    ellipsis: true,
    align: 'center',
    rerender: (text: any) => (
      <div>
        {Number(text) === 2 ? '已出售' : Number(text) === 3 ? '已出租' : ''}
      </div>
    ),
  },
  {
    title: '开始时间',
    key: 'startTime',
    ellipsis: true,
    align: 'center',
  },
  {
    title: '结束时间',
    key: 'endTime',
    ellipsis: true,
    align: 'center',
  },
]

export const columnsTwo = [
  {
    title: '收费项名称',
    key: 'saleTypeName',
    ellipsis: true,
    align: 'center',
    width: 150,
  },
  {
    title: '起收日期',
    key: 'startTime',
    ellipsis: true,
    align: 'center',
    width: 190,
  },
  {
    title: '到期日期',
    key: 'endTime',
    ellipsis: true,
    align: 'center',
    width: 190,
  },
  {
    title: '缴费限期',
    key: 'deadline',
    ellipsis: true,
    align: 'center',
    width: 190,
  },
  {
    title: '单价',
    key: 'price',
    ellipsis: true,
    align: 'center',
  },
  {
    title: '数量',
    key: 'quantity',
    ellipsis: true,
    align: 'center',
  },
  {
    title: '金额',
    key: 'money',
    ellipsis: true,
    align: 'center',
  },
]
export const columnsThree = [
  {
    title: '收费项名称',
    key: 'saleTypeName',
    ellipsis: true,
    width: 150,
    align: 'center',
  },
  {
    title: '起收日期',
    key: 'startTime',
    ellipsis: true,
    width: 190,
    align: 'center',
  },
  {
    title: '到期日期',
    key: 'endTime',
    ellipsis: true,
    width: 190,
    align: 'center',
  },
  {
    title: '实收金额',
    key: 'paidMoney',
    ellipsis: true,
    align: 'center',
  },
  {
    title: '缴费时间',
    key: 'paymentTime',
    ellipsis: true,
    width: 190,
    align: 'center',
  },
  {
    title: '退款金额',
    key: 'refundMoney',
    ellipsis: true,
    align: 'center',
  },
]
