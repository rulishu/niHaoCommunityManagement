import { Button } from 'uiw'
import { Change } from '@/servers/ChargeManagement/PredepositsManage'

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
    title: '收款金额',
    key: 'chargeAmount',
    align: 'center',
  },
  {
    title: '收款人',
    key: 'chargeName',
    align: 'center',
    width: 90,
  },
  {
    title: '收款时间',
    key: 'chargingTime',
    align: 'center',
    width: 180,
  },
  {
    title: '状态',
    key: 'status',
    props: {
      widget: 'select',
      option: [
        { label: '预存', value: '1' },
        { label: '退还', value: '2' },
      ],
    },
    width: 50,
    align: 'center',
    render: (status: string) => (
      <div style={{ textAlign: 'center' }}>
        <span>{status === '1' ? '预存' : status === '2' ? '退还' : ''}</span>
      </div>
    ),
  },
  {
    title: '单号',
    key: 'oddNumbers',
    align: 'center',
    // width: 300,
  },
  {
    title: '操作',
    key: 'edit',
    width: 200,
    align: 'center',
    render: (text: any, key: any, rowData: any) => (
      <div>
        {/* <Button
            size="small"
            icon="edit"
            onClick={() => handleEditTable('edit', rowData)}
          >
            退还
          </Button> */}

        {/* {rowData.status === '1' ? (
            <Button
              size="small"
              icon="eye"
              // disabled={rowData.status === '1' ? false : true}
              onClick={() => handleEditTable('view', rowData)}
            >
              打印收款单
            </Button>
          ) : (
            <Button
              size="small"
              icon="eye"
              // disabled={rowData.status === '2' ? false : true}
              onClick={() => handleEditTable('refundview', rowData)}
            >
              打印退款单
            </Button>
          )} */}

        <Button
          size="small"
          icon="eye"
          onClick={() => handleEditTable('view', rowData)}
        >
          查看
        </Button>
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
