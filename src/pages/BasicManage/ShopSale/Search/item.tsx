import { Button } from 'uiw'
import { Change } from '@/servers/BasicManage/ShopSale'

export const columnsSearch = (
  handleEditTable: (tableType: string, obj: Change) => void
) => {
  return [
    {
      title: '商铺编号',
      align: 'center',
      key: 'code',
      ellipsis: true,
      props: {
        widget: 'input',
        widgetProps: {
          placeholder: '请输入商铺编号',
        },
      },
    },
    {
      title: '使用状态',
      align: 'center',
      key: 'useStatus',
      ellipsis: true,
      props: {
        label: '使用状态',
        widget: 'select',
        option: [
          { label: '空置', value: '1' },
          { label: '已出租', value: '2' },
          { label: '已出售', value: '3' },
        ],
      },
      render: (useStatus: string) => (
        <div style={{ textAlign: 'center' }}>
          <span>
            {useStatus === '1'
              ? '空置'
              : useStatus === '2'
              ? '已出售'
              : '已出租'}
          </span>
        </div>
      ),
    },
    {
      title: '客户姓名',
      align: 'center',
      key: 'userName',
      ellipsis: true,
      props: {
        widget: 'input',
        widgetProps: {
          placeholder: '请输入客户姓名',
        },
      },
    },
    {
      title: '电话',
      align: 'center',
      key: 'phone',
      ellipsis: true,
    },
    {
      title: '租金',
      align: 'center',
      key: 'sale',
      ellipsis: true,
    },
    {
      title: '行业',
      align: 'center',
      key: 'industry',
      ellipsis: true,
    },
    {
      title: '开始时间',
      align: 'center',
      key: 'startTime',
      ellipsis: true,
    },
    {
      title: '结束时间',
      align: 'center',
      key: 'endTime',
      ellipsis: true,
    },
    {
      title: '操作',
      key: 'edit',
      align: 'center',
      width: 300,
      render: (text: any, key: any, rowData: Change) => (
        <div>
          <Button
            size="small"
            icon="edit"
            onClick={handleEditTable.bind(this, 'edit', rowData)}
          >
            编辑客户信息
          </Button>
          <Button
            size="small"
            icon="delete"
            onClick={() => handleEditTable('del', rowData)}
          >
            删除客户信息
          </Button>
        </div>
      ),
    },
  ]
}
