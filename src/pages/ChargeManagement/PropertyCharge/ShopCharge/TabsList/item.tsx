import { searchValue } from '@/servers/ChargeManagement/ShopCharge'
// 常规收费
export const columnsRout = (
  option: searchValue[],
  setValue: (e: any) => void
) => {
  return [
    {
      title: '收费项名称',
      align: 'center',
      key: 'saleName',
      ellipsis: true,
      props: [
        {
          label: '商铺',
          key: 'code',
          widget: 'searchSelect',
          option,
          widgetProps: {
            mode: 'single',
            showSearch: true,
            maxTagCount: 6,
            allowClear: true,
            disabled: false,
            placeholder: '请输入选择',
            onSearch: (value: String) => setValue(value),
          },
        },
      ],
    },
    {
      align: 'center',
      title: '起收日期',
      key: 'startTime',
      ellipsis: true,
      width: 200,
    },
    {
      align: 'center',
      title: '到期日期',
      key: 'endTime',
      ellipsis: true,
      width: 200,
    },
    {
      align: 'center',
      title: '缴费日期',
      key: 'deadlineTime',
      ellipsis: true,
      width: 200,
    },
    {
      title: '单价',
      align: 'center',
      key: 'chargePrice',
      ellipsis: true,
    },
    {
      title: '数量',
      align: 'center',
      key: 'number',
      ellipsis: true,
    },
    {
      title: '金额',
      align: 'center',
      key: 'price',
      ellipsis: true,
    },
  ]
}
// 临时收费
export const columnsTem = (
  option: searchValue[],
  setValue: (e: any) => void
) => {
  return [
    {
      title: '客户姓名',
      align: 'center',
      key: 'name',
      ellipsis: true,
      props: [
        {
          label: '商铺',
          key: 'code',
          widget: 'searchSelect',
          option,
          widgetProps: {
            mode: 'single',
            showSearch: true,
            maxTagCount: 6,
            allowClear: true,
            disabled: false,
            placeholder: '请输入选择',
            onSearch: (value: String) => setValue(value),
          },
        },
      ],
    },
    {
      align: 'center',
      title: '收费项目',
      key: 'payService',
      ellipsis: true,
    },
    {
      align: 'center',
      title: '付款方式',
      key: 'payType',
      ellipsis: true,
    },
    {
      align: 'center',
      title: '收费金额',
      key: 'price',
      ellipsis: true,
    },
    {
      align: 'center',
      title: '收款人',
      key: 'collectionName',
      ellipsis: true,
    },
    {
      align: 'center',
      title: '收款时间',
      key: 'collectionTime',
      ellipsis: true,
      width: 200,
    },
    {
      align: 'center',
      title: '状态',
      key: 'status',
      ellipsis: true,
      render: (text: any) => (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {text === '1' ? '已付款' : '未付款'}
        </div>
      ),
    },
    {
      align: 'center',
      title: '备注',
      key: 'remark',
      ellipsis: true,
    },
    {
      title: '操作',
      key: 'edit',
      align: 'center',
      width: 150,
      render: () => (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        ></div>
      ),
    },
  ]
}
// 收取押金
export const columnsDeposit = (
  option: searchValue[],
  setValue: (e: any) => void
) => [
  {
    title: '客户姓名',
    align: 'center',
    key: 'name',
    ellipsis: true,
    props: [
      {
        label: '商铺',
        key: 'code',
        widget: 'searchSelect',
        option,
        widgetProps: {
          mode: 'single',
          showSearch: true,
          maxTagCount: 6,
          allowClear: true,
          disabled: false,
          placeholder: '请输入选择',
          onSearch: (value: String) => setValue(value),
        },
      },
    ],
  },
  {
    title: '客户姓名',
    align: 'center',
    key: 'shouName',
    ellipsis: true,
  },
  {
    align: 'center',
    title: '收费项目',
    key: 'startingTime',
    ellipsis: true,
  },
  {
    align: 'center',
    title: '付款方式',
    key: 'endTime',
    ellipsis: true,
  },
  {
    title: '收费金额',
    align: 'center',
    key: 'fee',
    ellipsis: true,
  },
  {
    title: '收款人',
    align: 'center',
    key: 'num',
    ellipsis: true,
  },
  {
    align: 'center',
    title: '收款时间',
    key: 'feeTime',
    ellipsis: true,
  },
  {
    title: '退款人',
    align: 'center',
    key: 'num',
    ellipsis: true,
  },
  {
    align: 'center',
    title: '退款时间',
    key: 'feeTime',
    ellipsis: true,
  },
  {
    title: '状态',
    align: 'center',
    key: 'money',
    ellipsis: true,
  },
  {
    title: '备注',
    align: 'center',
    key: 'ramker',
    ellipsis: true,
  },
  {
    title: '操作',
    key: 'edit',
    align: 'center',
    ellipsis: true,
    width: 150,
    render: () => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      ></div>
    ),
  },
]
