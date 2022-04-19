import { Button } from 'uiw'
import { Change } from '@/servers/BasicManage/ShopManage'

export const columnsSearch = (
  handleEditTable: (tableType: string, obj: Change) => void,
  selectZoneList: any
) => {
  return [
    {
      title: '社区名称',
      align: 'center',
      key: 'zoneId',
      props: {
        widget: 'select',
        option: selectZoneList,
        widgetProps: {
          placeholder: '请输入社区名称',
        },
      },
      render: (text: any, key: any, rowData: Change) => (
        <div style={{ textAlign: 'center' }}>
          <span>{rowData?.zoneName}</span>
        </div>
      ),
    },
    {
      title: '商铺编号',
      align: 'center',
      key: 'shopNo',
      props: {
        widget: 'input',
        widgetProps: {
          placeholder: '请输入商铺编号',
        },
      },
    },
    {
      title: '商铺名称',
      align: 'center',
      key: 'shopName',
      width: 180,
      props: {
        widget: 'input',
        widgetProps: {
          placeholder: '请输入商铺名称',
        },
      },
    },
    {
      title: '楼层',
      align: 'center',
      key: 'shopFloor',
    },
    {
      title: '占地面积',
      align: 'center',
      key: 'areaCovered',
    },
    {
      title: '使用面积',
      align: 'center',
      key: 'areaUsable',
    },
    {
      title: '租金',
      align: 'center',
      key: 'shopRent',
    },
    {
      title: '使用状态',
      align: 'center',
      key: 'status',
      props: {
        label: '使用状态',
        widget: 'select',
        option: [
          { label: '空置', value: 1 },
          { label: '已出售', value: 2 },
          { label: '已出租', value: 3 },
        ],
      },
      render: (status: number) => (
        <div style={{ textAlign: 'center' }}>
          <span>
            {status === 1 ? '空置' : status === 2 ? '已出售' : '已出租'}
          </span>
        </div>
      ),
    },
    {
      title: '操作',
      key: 'edit',
      align: 'center',
      width: 200,
      render: (text: any, key: any, rowData: Change) => (
        <div>
          <Button
            size="small"
            icon="edit"
            onClick={() => handleEditTable('edit', rowData)}
          >
            编辑
          </Button>
          <Button
            size="small"
            icon="eye"
            onClick={() => handleEditTable('view', rowData)}
          >
            查看
          </Button>
          {rowData.status === 1 && (
            <Button
              size="small"
              icon="delete"
              onClick={() => handleEditTable('del', rowData)}
            >
              删除
            </Button>
          )}
        </div>
      ),
    },
  ]
}
