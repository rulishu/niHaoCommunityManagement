import { Button } from 'uiw'
import { Change } from '@/servers/ChargeManagement/PredepositsManage'

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
      option: [
        { label: '电费', value: '1' },
        { label: '天然气费', value: '2' },
        { label: '卫生费', value: '3' },
        { label: '单元租金', value: '4' },
      ],
    },
    align: 'center',
    render: (payService: string) => (
      <div style={{ textAlign: 'center' }}>
        <span>
          {payService === '1'
            ? '电费'
            : payService === '2'
            ? '天然气费'
            : payService === '3'
            ? '卫生费'
            : '单元租金'}
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
    key: 'chargeAmount',
    align: 'center',
  },
  {
    title: '收款人',
    key: 'chargeName',
    align: 'center',
  },
  {
    title: '收款时间',
    key: 'chargingTime',
    align: 'center',
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
  },
  {
    title: '操作',
    key: 'edit',
    width: 280,
    align: 'center',
    render: (text: any, key: any, rowData: any) => (
      <div>
        <Button
          size="small"
          icon="edit"
          onClick={() => handleEditTable('edit', rowData)}
        >
          退还
        </Button>

        {rowData.status === '1' ? (
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
        )}
        <Button
          size="small"
          icon="eye"
          onClick={() => handleEditTable('del', rowData)}
        >
          删除
        </Button>
      </div>
    ),
  },
]
