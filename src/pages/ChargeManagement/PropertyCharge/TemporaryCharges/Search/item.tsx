import { Button } from 'uiw'
import { Change } from '@/servers/ChargeManagement/temporaryCharges'

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
    key: 'payService',
    props: {
      widget: 'select',
      option: [
        { label: '测试暖气费', value: '1' },
        { label: '测试临时收费项', value: '2' },
        { label: '测试楼宇广告费', value: '3' },
        { label: '广告费用(公共区域)', value: '4' },
        { label: '物业违章罚款', value: '5' },
        { label: '装修违章罚款', value: '6' },
        { label: '装修垃圾清运费', value: '7' },
        { label: '场地占用费', value: '8' },
      ],
    },
    align: 'center',
    //ellipsis: true,
    render: (payService: string) => (
      <div style={{ textAlign: 'center' }}>
        <span>
          {payService === '1'
            ? '测试暖气费'
            : payService === '2'
            ? '测试临时收费项'
            : payService === '3'
            ? '测试楼宇广告费'
            : payService === '4'
            ? '广告费用(公共区域)'
            : payService === '5'
            ? '物业违章罚款'
            : payService === '6'
            ? '装修违章罚款'
            : payService === '7'
            ? '装修垃圾清运费'
            : '场地占用费'}
        </span>
      </div>
    ),
  },
  {
    title: '付款方式',
    key: 'payType',
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
    render: (payType: string) => (
      <div style={{ textAlign: 'center' }}>
        <span>
          {payType === '1'
            ? '现金'
            : payType === '2'
            ? '微信支付'
            : payType === '3'
            ? '支付宝支付'
            : payType === '4'
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
        { label: '已付款', value: '1' },
        { label: '已退款', value: '2' },
      ],
    },
    align: 'center',
    //ellipsis: true,
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
        <Button
          size="small"
          // icon="print"
          onClick={() => handleEditTable('print', rowData)}
        >
          打印
        </Button>
      </div>
    ),
  },
]
