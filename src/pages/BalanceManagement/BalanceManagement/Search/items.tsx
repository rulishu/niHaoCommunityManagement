import { Button } from 'uiw'

export const columnsSearch = (
  handleEditTable: (type: string, obj: any) => void
) => {
  return [
    {
      title: '商铺编码',
      align: 'center',
      key: 'code',
      ellipsis: true,
      props: {
        widget: 'input',
        widgetProps: {
          placeholder: '请输入商铺编码',
        },
      },
    },
    {
      title: '商铺名称',
      key: 'shopName',
      align: 'center',
      props: {
        widget: 'input',
        widgetProps: {
          placeholder: '请输入商铺名称',
        },
      },
    },
    {
      title: '商铺状态',
      key: 'shopStatus',
      align: 'center',
      render: (shopStatus: number) => (
        <div style={{ textAlign: 'center' }}>
          <span>
            {shopStatus === 1 ? '空置' : shopStatus === 2 ? '出售' : '出租'}
          </span>
        </div>
      ),
    },
    {
      title: '用户名称',
      key: 'userName',
      align: 'center',
    },
    {
      title: '余额',
      key: 'amount',
      align: 'center',
    },
    {
      title: '操作',
      key: 'edit',
      align: 'center',
      width: 150,
      render: (text: any, key: any, rowData: any) => (
        <div>
          <Button
            size="small"
            icon="edit"
            onClick={() => handleEditTable('refund', rowData)}
          >
            退还
          </Button>
          {/* <Button
            size="small"
            icon="edit"
            onClick={() => handleEditTable('view', rowData)}
          >
            查看
          </Button> */}
          {/* <Button
                        size="small"
                        icon="edit"
                        onClick={() => handleEditTable('del', rowData)}
                    >
                        删除
                    </Button> */}
        </div>
      ),
    },
  ]
}
