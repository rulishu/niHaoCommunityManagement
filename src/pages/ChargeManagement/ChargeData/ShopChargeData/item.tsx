import { Button, Divider } from 'uiw'

export const columns = (
  shopNoList: Array<any>,
  projectListt: Array<any>,
  dispatch: any
) => {
  return [
    {
      title: '商铺',
      align: 'center',
      key: 'shopName',
      ellipsis: true,
      width: 170,
      fixed: 'left',
      props: [
        {
          label: '商铺',
          key: 'code',
          initialValue: '',
          widget: 'searchSelect',
          option: shopNoList,
          widgetProps: {
            allowClear: true,
            mode: 'single',
            showSearch: true,
            placeholder: '请选择商铺',
          },
        },
      ],
    },
    {
      title: '收费项目',
      align: 'center',
      key: 'chargeName',
      ellipsis: true,
      width: 150,
      fixed: 'left',
      props: [
        {
          label: '收费项目',
          key: 'saleType',
          initialValue: '',
          widget: 'searchSelect',
          option: projectListt,
          widgetProps: {
            mode: 'single',
            showSearch: true,
            placeholder: '请选择收费项目',
          },
        },
      ],
    },
    {
      title: '客户姓名',
      key: 'username',
      align: 'center',
      ellipsis: true,
      width: 150,
    },
    {
      title: '截止时间',
      key: 'startTime',
      ellipsis: true,
      align: 'center',
      width: 250,
      props: {
        initialValue: [],
        label: '截止时间',
        key: 'deadline',
        widget: 'dateInputRange',
        allowclear: 'true',
        widgetProps: {
          format: 'YYYY-MM-DD',
        },
      },
      render: (text: any, type: string, data: any) => (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexFlow: 'column',
          }}
        >
          <div>开始 : {data?.startTime || ''}</div>
          <div>结束 : {data?.endTime || ''}</div>
        </div>
      ),
    },
    {
      title: '缴费时间',
      key: 'paymentTime',
      ellipsis: true,
      align: 'center',
      width: 200,
      props: {
        initialValue: [],
        label: '缴费时间',
        key: 'payment',
        widget: 'dateInputRange',
        allowclear: 'true',
        widgetProps: {
          format: 'YYYY-MM-DD',
        },
      },
    },
    {
      title: '付款状态',
      align: 'center',
      key: 'status',
      ellipsis: true,
      width: 150,
      props: {
        widget: 'searchSelect',
        option: [
          { value: 1, label: '已付款' },
          { value: 2, label: '未付款' },
        ],
        widgetProps: {
          mode: 'single',
          allowClear: true,
          placeholder: '请选择收付款状态',
        },
      },
      render: (text: any) => (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {text === 1 ? '已付款' : text === 2 ? '未付款' : ''}
        </div>
      ),
    },
    {
      title: '数量',
      key: 'quantity',
      align: 'center',
      ellipsis: true,
      width: 120,
    },
    {
      title: '单价',
      key: 'price',
      align: 'center',
      ellipsis: true,
      width: 120,
    },
    {
      title: '金额',
      key: 'money',
      align: 'center',
      ellipsis: true,
      width: 120,
    },
    {
      title: '上次读数',
      key: 'lastReading',
      align: 'center',
      ellipsis: true,
      width: 120,
    },
    {
      title: '本次读数',
      key: 'thisReading',
      align: 'center',
      ellipsis: true,
      width: 120,
    },
    {
      title: '操作',
      key: 'edit',
      align: 'center',
      width: 150,
      fixed: 'right',
      render: (text: any, type: string, data: any) => (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Button type="warning"> 编辑</Button>
          <Divider type="vertical" />
          <Button
            type="danger"
            onClick={() =>
              dispatch({
                type: 'shopCharges/updateState',
                payload: { queryInfo: { ...data }, visible: true },
              })
            }
          >
            删除
          </Button>
        </div>
      ),
    },
  ]
}
