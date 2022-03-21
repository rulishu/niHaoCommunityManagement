import { Button, Dropdown, Menu } from 'uiw'
import { Change } from '@/servers/ChargeManagement/PredepositsManage'

const option = [
  { label: '打印收款单', value: 1 },
  { label: '打印退还单', value: 2 },
]

export const columnsSearch = (
  handleEditTable: (tableType: string, obj: Change) => void
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
    //ellipsis: true,
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
    //ellipsis: true,
  },
  {
    title: '收费项目',
    key: 'project',
    props: {
      widget: 'select',
      option: [
        { label: '押金2押1付', value: '1' },
        { label: '测试装修押金', value: '2' },
        { label: '装修保证金', value: '3' },
        { label: '履约保证金', value: '4' },
      ],
    },
    align: 'center',
    //ellipsis: true,
    render: (project: string) => (
      <div style={{ textAlign: 'center' }}>
        <span>
          {project === '1'
            ? '押金2押1付'
            : project === '2'
            ? '测试装修押金'
            : project === '3'
            ? '装修保证金'
            : '履约保证金'}
        </span>
      </div>
    ),
  },
  {
    title: '付款方式',
    key: 'paymentMethod',
    props: {
      widget: 'select',
      option: [
        { label: '现金', value: '1' },
        { label: '微信支付', value: '2' },
        { label: '支付宝支付', value: '3' },
        { label: '刷卡', value: '4' },
        { label: '转账', value: '5' },
      ],
    },
    align: 'center',
    //ellipsis: true,
    render: (paymentMethod: string) => (
      <div style={{ textAlign: 'center' }}>
        <span>
          {paymentMethod === '1'
            ? '现金'
            : paymentMethod === '2'
            ? '微信支付'
            : paymentMethod === '3'
            ? '支付宝支付'
            : paymentMethod === '4'
            ? '刷卡'
            : '转账'}
        </span>
      </div>
    ),
  },
  {
    title: '收款金额',
    key: 'price',
    align: 'center',
    //ellipsis: true,
  },
  {
    title: '收款人',
    key: 'collectionName',
    align: 'center',
    //ellipsis: true,
  },
  {
    title: '收款时间',
    key: 'collectionTime',
    align: 'center',
    //ellipsis: true,
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
    //ellipsis: true,
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
    //ellipsis: true,
  },
  {
    title: '操作',
    key: 'edit',
    width: 200,
    align: 'center',
    //ellipsis: true,
    render: (text: any, key: any, rowData: any) => (
      <div>
        {rowData.status === '1' ? (
          <Button
            size="small"
            icon="edit"
            onClick={() => handleEditTable('paied', rowData)}
          >
            退还
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
        {/* <Button
            size="small"
            icon="down"
            onClick={() => handleEditTable('print', rowData)}
          >
            打印
          </Button> */}
        <Dropdown
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
        </Dropdown>
      </div>
    ),
  },
]
