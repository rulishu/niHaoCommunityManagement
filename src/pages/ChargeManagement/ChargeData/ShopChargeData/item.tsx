import { Button, Divider } from 'uiw'

export const columns = (shopNoList: Array<any>, projectListt: Array<any>) => {
  return [
    {
      title: '商铺',
      align: 'name',
      key: 'saleTypeName',
      ellipsis: true,
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
      title: '缴费单号',
      key: 'name',
      props: {
        widget: 'input',
        initialValue: '',
        widgetProps: {
          placeholder: '输入用缴费单号',
        },
      },
    },
    {
      title: '收费项目',
      align: 'name1',
      key: 'saleTypeName',
      ellipsis: true,
      props: [
        {
          label: '收费项目',
          key: 'code1',
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
      title: '截止时间',
      key: 'startTime',
      ellipsis: true,
      align: 'center',
      props: {
        initialValue: [],
        label: '截止时间',
        key: 'dateInputsecond',
        widget: 'dateInputRange',
        allowclear: 'true',
        widgetProps: {
          format: 'YYYY-MM-DD',
        },
      },
    },
    {
      title: '缴费时间',
      key: 'startTime1',
      ellipsis: true,
      align: 'center',
      props: {
        initialValue: [],
        label: '缴费时间',
        key: 'dateInputsecond1',
        widget: 'dateInputRange',
        allowclear: 'true',
        widgetProps: {
          format: 'YYYY-MM-DD',
        },
      },
    },
    {
      title: '付款状态',
      align: 'name11',
      key: 'saleTypeName',
      ellipsis: true,
      props: {
        widget: 'searchSelect',
        option: [],
        widgetProps: {
          mode: 'single',
          showSearch: true,
          placeholder: '请选择收付款状态',
        },
      },
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
          <Button> 编辑</Button>
          <Divider type="vertical" />
          <Button> 删除</Button>
        </div>
      ),
    },
  ]
}
