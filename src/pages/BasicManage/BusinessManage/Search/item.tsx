import { Button } from 'uiw'
import { Change } from '@/servers/BasicManage/BusinessManage'

export const columnsSearch = (
  handleEditTable: (tableType: string, obj: Change) => void
) => {
  return [
    {
      title: '社区编号',
      align: 'center',
      key: 'zoneNo',
      ellipsis: true,
      props: {
        widget: 'input',
        widgetProps: {
          placeholder: '请输入社区编号',
        },
      },
    },
    {
      title: '社区名称',
      key: 'zoneName',
      align: 'center',
      props: {
        widget: 'input',
        widgetProps: {
          placeholder: '请输入社区名称',
        },
      },
    },
    {
      title: '省',
      key: 'provinceName',
      align: 'center',
    },
    {
      title: '市',
      key: 'cityName',
      align: 'center',
    },
    {
      title: '区',
      key: 'areaName',
      align: 'center',
    },
    {
      title: '社区地址',
      key: 'address',
      align: 'center',
      width: 230,
    },
    {
      title: '备注',
      key: 'zoneRemark',
      align: 'center',
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
}
