import { Button } from 'uiw'
import { Change } from '@/servers/DictionaryManagement/DictionaryManagement'

export const columnsSearch = (
  handleEditTable: (tableType: string, obj: Change) => void
) => {
  return [
    {
      title: '字典类型',
      align: 'center',
      key: 'dictType',
      props: {
        widget: 'input',
        widgetProps: {
          placeholder: '输入字典类型',
        },
      },
    },
    {
      title: '字典名称',
      align: 'center',
      key: 'dictName',
      props: {
        widget: 'input',
        widgetProps: {
          placeholder: '输入字典名称',
        },
      },
    },

    {
      title: '层级',
      align: 'center',
      key: 'level',
      render: (text: any, key: any, rowData: any) => (
        <div>
          {rowData.level === 1
            ? '字典类型'
            : rowData.level === 2
            ? '字典值'
            : ''}
        </div>
      ),
    },
    {
      title: '是否有效',
      align: 'center',
      key: 'dataValid',
      render: (text: any, key: any, rowData: any) => (
        <div>
          {rowData.dataValid === 1
            ? '有效'
            : rowData.dataValid === 2
            ? '无效'
            : ''}
        </div>
      ),
    },
    {
      title: '备注',
      key: 'remark',
      ellipsis: true,
      align: 'center',
    },
    {
      title: '操作',
      key: 'edit',
      align: 'center',
      width: 350,
      render: (text: any, key: any, rowData: Change) => (
        <div
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
          }}
        >
          <Button
            size="small"
            icon="edit"
            onClick={() => handleEditTable('editType', rowData)}
          >
            编辑字典类型
          </Button>
          <Button
            size="small"
            icon="edit"
            onClick={() => handleEditTable('editValue', rowData)}
          >
            编辑字典项
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
