import { Button } from 'uiw'
import { Change } from '@/servers/ChargeManagement/DepositManage'

// const option = [
//   { label: '打印收款单', value: 1 },
//   { label: '打印退还单', value: 2 },
// ]

export const columnsSearch = (
  handleEditTable: (tableType: string, obj: Change) => void,
  buChargesList: any,
  paysList: any
) => [
  {
    title: '编号',
    key: 'code',
    props: {
      widget: 'input',
      widgetProps: {
        placeholder: '请输入编号',
      },
    },
    align: 'center',
  },
  {
    title: '客户姓名',
    key: 'name',
    props: {
      widget: 'input',
      widgetProps: {
        placeholder: '请输入客户姓名',
      },
    },
    align: 'center',
  },
  {
    title: '收费项目',
    key: 'project',
    props: {
      widget: 'select',
      option: buChargesList,
    },
    align: 'center',
    render: (text: any, key: any, rowData: Change) => (
      <div style={{ textAlign: 'center' }}>
        <span>{rowData?.projectName}</span>
      </div>
    ),
  },
  {
    title: '付款方式',
    key: 'paymentMethod',
    props: {
      widget: 'select',
      option: paysList,
    },
    align: 'center',
    render: (text: any, key: any, rowData: Change) => (
      <div style={{ textAlign: 'center' }}>
        <span>{rowData?.paymentMethodName}</span>
      </div>
    ),
  },
  {
    title: '收款金额(元)',
    key: 'price',
    align: 'center',
    render: (price: number) => {
      return <div>¥{price}元</div>
    },
  },
  {
    title: '收款人',
    key: 'collectionName',
    align: 'center',
  },
  {
    title: '收款时间',
    key: 'collectionTime',
    align: 'center',
  },
  {
    title: '状态',
    key: 'status',
    props: {
      widget: 'select',
      option: [
        { label: '未退款', value: '1' },
        { label: '已退款', value: '2' },
      ],
    },
    align: 'center',
    render: (status: string) => (
      <div style={{ textAlign: 'center' }}>
        <span>
          {status === '1' ? '未退款' : status === '2' ? '已退款' : ''}
        </span>
      </div>
    ),
  },
  {
    title: '备注',
    key: 'remark',
    align: 'center',
  },
  {
    title: '操作',
    key: 'edit',
    width: 200,
    align: 'center',
    render: (text: any, key: any, rowData: any) => (
      <div>
        {rowData.status === '1' ? (
          <Button
            size="small"
            icon="edit"
            onClick={() => handleEditTable('paied', rowData)}
          >
            退款
          </Button>
        ) : rowData.status === '2' ? (
          <Button
            size="small"
            icon="eye"
            onClick={() => handleEditTable('refunded', rowData)}
          >
            已退款详情
          </Button>
        ) : (
          ''
        )}
        <Button
          size="small"
          icon="delete"
          onClick={() => handleEditTable('del', rowData)}
        >
          删除
        </Button>
        {/* <Dropdown
          trigger="click"
          // onVisibleChange={}
          isOpen={true}
          menu={
            <div>
              <Menu bordered style={{ minWidth: 120 }}>
                {option.map((item, idx) => {
                  return (
                    <Menu.Item
                      key={idx}
                      text={item.label}
                      onClick={(e) => {
                        console.log('e', e)
                      }}
                    />
                  )
                })}
              </Menu>
            </div>
          }
        >
          <Button
            size="small"
            icon="down"
            onClick={() => handleEditTable('print', rowData)}
          >
            打印
          </Button>
        </Dropdown> */}
      </div>
    ),
  },
]
