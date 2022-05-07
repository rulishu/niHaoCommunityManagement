import { Button } from 'uiw'
import { Change } from '@/servers/ChargeManagement/temporaryCharges'
// import { State } from '../../../../../models/models'

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
    key: 'payService',
    props: {
      widget: 'select',
      option: buChargesList,
    },
    align: 'center',
    render: (text: any, key: any, rowData: Change) => (
      <div style={{ textAlign: 'center' }}>
        <span>{rowData?.payServiceName}</span>
      </div>
    ),
  },
  {
    title: '付款方式',
    key: 'payType',
    props: {
      widget: 'select',
      option: paysList,
    },
    align: 'center',
    render: (text: any, key: any, rowData: Change) => (
      <div style={{ textAlign: 'center' }}>
        <span>{rowData?.payTypeName}</span>
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
        { label: '已付款', value: '1' },
        { label: '已退款', value: '2' },
      ],
    },
    align: 'center',
    render: (status: string) => (
      <div style={{ textAlign: 'center' }}>
        <span>
          {status === '1' ? '已付款' : status === '2' ? '已退款' : ''}
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
            onClick={() => handleEditTable('edit', rowData)}
          >
            退款
          </Button>
        ) : rowData.status === '2' ? (
          <Button
            size="small"
            icon="eye"
            onClick={() => handleEditTable('view', rowData)}
          >
            退款详情
          </Button>
        ) : (
          ''
        )}
        {/* <Button
          size="small"
          // icon="print"
          onClick={() => handleEditTable('print', rowData)}
        >
          打印
        </Button> */}
        <Button
          size="small"
          icon="delete"
          onClick={() => handleEditTable('del', rowData)}
        >
          删除
        </Button>
      </div>
    ),
  },
]
