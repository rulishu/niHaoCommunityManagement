import { Button } from 'uiw'
import { Change } from '@/servers/DictionaryManagement/DictionaryManagement'

export const columnsSearch = (
  handleEditTable: (tableType: string, obj: Change) => void
) => {
  return [
    {
      title: '商业区编号',
      align: 'center',
      key: 'zoneNo',
      ellipsis: true,
      props: {
        widget: 'input',
        widgetProps: {
          placeholder: '请输入商业区编号',
        },
      },
    },
    {
      title: '商业区名',
      key: 'zoneName',
      align: 'center',
      props: {
        widget: 'input',
        widgetProps: {
          placeholder: '请输入商业区名',
        },
      },
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
