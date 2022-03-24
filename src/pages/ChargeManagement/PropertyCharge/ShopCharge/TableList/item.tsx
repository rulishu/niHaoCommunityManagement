import { Input } from 'uiw'
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
