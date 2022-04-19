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
              ? '已出租'
              : useStatus === '3'
              ? '已出售'
              : ''}
          </span>
        </div>
      ),
    },
    {
      title: '客户姓名',
      align: 'center',
      key: 'userName',
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
      width: 130,
    },
    {
      title: '租金',
      align: 'center',
      key: 'sale',
    },
    {
      title: '行业',
      align: 'center',
      key: 'industry',
    },
    {
      title: '开始时间',
      align: 'center',
      key: 'startTime',
    },
    {
      title: '结束时间',
      align: 'center',
      key: 'endTime',
    },
    {
      title: '操作',
      key: 'edit',
      align: 'center',
      render: (text: any, key: any, rowData: Change) => (
        <div>
          {rowData.useStatus === '1' && (
            <Button
              size="small"
              icon="eye"
              onClick={() => handleEditTable('add', rowData)}
            >
              绑定客户
            </Button>
          )}
          {rowData.useStatus !== '1' && (
            <Button
              size="small"
              icon="edit"
              onClick={() => handleEditTable('edit', rowData)}
            >
              编辑客户信息
            </Button>
          )}
          {/* <Button
            size="small"
            icon="eye"
            onClick={() => handleEditTable('view', rowData)}
          >
            查看
          </Button> */}
          {rowData.useStatus !== '1' && (
            <Button
              size="small"
              icon="delete"
              onClick={() => handleEditTable('del', rowData)}
            >
              删除客户信息
            </Button>
          )}
        </div>
      ),
    },
  ]
}
