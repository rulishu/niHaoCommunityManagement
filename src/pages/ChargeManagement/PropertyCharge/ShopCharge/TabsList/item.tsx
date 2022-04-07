import { searchValue } from '@/servers/ChargeManagement/ShopCharge'
import { Button } from 'uiw'
// 常规收费
export const columnsRout = (
  option: searchValue[],
  setValue: (e: any) => void,
  searchParms: any
) => {
  return [
    {
      title: '收费项名称',
      align: 'center',
      key: 'saleType',
      ellipsis: true,
      props: [
        {
          label: '商铺',
          key: 'code',
          widget: 'searchSelect',
          initialValue: [searchParms?.code],
          option,
          widgetProps: {
            mode: 'single',
            showSearch: true,
            maxTagCount: 6,
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
      key: 'deadline',
      ellipsis: true,
      width: 200,
    },
    {
      title: '单价',
      align: 'center',
      key: 'price',
      ellipsis: true,
    },
    {
      title: '数量',
      align: 'center',
      key: 'quantity',
      ellipsis: true,
    },
    {
      title: '金额',
      align: 'center',
      key: 'money',
      ellipsis: true,
    },
  ]
}
// 临时收费
export const columnsTem = (
  option: searchValue[],
  setValue: (e: any) => void,
  searchParms: any,
  handleEditTable: any
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
          initialValue: [searchParms?.code],
          option,
          widgetProps: {
            mode: 'single',
            showSearch: true,
            maxTagCount: 6,
            placeholder: '请输入选择',
            onSearch: (value: String) => setValue(value),
          },
        },
      ],
    },
    {
      align: 'center',
      title: '收费项目',
      key: 'payServiceName',
      ellipsis: true,
    },
    {
      align: 'center',
      title: '付款方式',
      key: 'payTypeName',
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
          {text === '1' ? '已付款' : '已退款'}
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
      render: (text: any, type: string, data: any) => (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {data?.status === '1' ? (
            <Button
              onClick={() =>
                handleEditTable('details', {
                  ...data,
                  refundTime: '',
                  chargingTime: data?.collectionTime,
                  refundType: '',
                })
              }
            >
              退款
            </Button>
          ) : (
            <Button
              onClick={() =>
                handleEditTable('see', {
                  ...data,
                  chargingTime: data?.collectionTime,
                })
              }
            >
              退款详情
            </Button>
          )}
        </div>
      ),
    },
  ]
}
// 收取押金
export const columnsDeposit = (
  option: searchValue[],
  setValue: (e: any) => void,
  searchParms: any,
  handleEditTable: Function
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
        initialValue: [searchParms?.code],
        option,
        widgetProps: {
          mode: 'single',
          showSearch: true,
          maxTagCount: 6,
          placeholder: '请输入选择',
          onSearch: (value: String) => setValue(value),
        },
      },
    ],
  },
  {
    align: 'center',
    title: '收费项目',
    key: 'projectName',
    ellipsis: true,
  },
  {
    align: 'center',
    title: '付款方式',
    key: 'paymentMethodName',
    ellipsis: true,
  },
  {
    align: 'center',
    title: '退款方式',
    key: 'refundMethodName',
    ellipsis: true,
  },
  {
    title: '收费金额',
    align: 'center',
    key: 'price',
    ellipsis: true,
  },
  // {
  //   title: '收款人',
  //   align: 'center',
  //   key: 'collectionName',
  //   ellipsis: true,
  // },
  // {
  //   title: '退款人',
  //   align: 'center',
  //   key: 'refundName',
  //   ellipsis: true,
  // },
  {
    align: 'center',
    title: '收款时间',
    key: 'collectionTime',
    ellipsis: true,
    width: 200,
  },

  {
    align: 'center',
    title: '退款时间',
    key: 'refundTime',
    ellipsis: true,
    width: 200,
  },
  {
    title: '状态',
    align: 'center',
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
        {text === '1' ? '已付款' : '已退款'}
      </div>
    ),
  },
  {
    title: '备注',
    align: 'center',
    key: 'remark',
    ellipsis: true,
  },
  {
    title: '操作',
    key: 'edit',
    align: 'center',
    ellipsis: true,
    width: 150,
    render: (text: any, type: string, data: any) => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {data?.status === '1' && (
          <Button
            onClick={() =>
              handleEditTable('returnMoney', {
                ...data,
                payService: data?.project,
                payType: data?.paymentMethod,
                chargingTime: data?.collectionTime,
                refundTime: '',
                refundType: '',
                remark: '',
              })
            }
          >
            退还
          </Button>
        )}
      </div>
    ),
  },
]

// 预存款
export const columnsAdvance = (
  option: searchValue[],
  setValue: (e: any) => void,
  searchParms: any
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
        initialValue: [searchParms?.code],
        option,
        widgetProps: {
          mode: 'single',
          showSearch: true,
          maxTagCount: 6,
          placeholder: '请输入选择',
          onSearch: (value: String) => setValue(value),
        },
      },
    ],
  },
  {
    title: '状态',
    align: 'center',
    key: 'status',
    ellipsis: true,
  },
  {
    title: '收费项目',
    align: 'center',
    key: 'payService',
    ellipsis: true,
  },
  {
    title: '付款方式',
    align: 'center',
    key: 'paymentMethod',
    ellipsis: true,
  },
  {
    title: '金额',
    align: 'center',
    key: 'chargeAmount',
    ellipsis: true,
  },
  {
    title: '收款人',
    align: 'center',
    key: 'chargeName',
    ellipsis: true,
  },
  {
    title: '收款时间',
    align: 'center',
    key: 'chargingTime',
    ellipsis: true,
  },
  {
    title: '单号',
    align: 'center',
    key: 'oddNumbers',
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
