import { Button, Tooltip } from 'uiw'
import { Change } from '@/servers/Authority/Application'

export const columnsSearch = (
  getTrim: (tableType: string, obj: Change) => void
) => {
  return [
    {
      title: '菜单名称',
      key: 'menuName',
      ellipsis: true,
      align: 'center',
      className: 'table-center',
      props: {
        widget: 'input',
        initialValue: '',
        // 组件属性
        widgetProps: {
          preIcon: 'user',
          placeholder: '输入菜单名称',
        },
      },
      render: (text: string) => {
        return (
          <Tooltip placement="top" content={text}>
            {text}
          </Tooltip>
        )
      },
    },
    {
      title: '路由地址',
      key: 'path',
      align: 'center',
      ellipsis: false,
      width: 400,
    },
    {
      title: '菜单类型',
      key: 'menuType',
      align: 'center',
      ellipsis: true,
      render: (text: any) => (
        <div style={{ textAlign: 'center' }}>
          {text === 1 ? '目录' : text === 2 ? '菜单' : '按钮'}
        </div>
      ),
    },
    {
      title: '显示顺序',
      key: 'orderNum',
      align: 'center',
      ellipsis: false,
    },
    {
      title: '操作',
      key: 'edit',
      align: 'center',
      width: 255,
      render: (text: any, key: any, rowData: Change) => (
        <div>
          <Button
            size="small"
            icon="plus-circle-o"
            onClick={getTrim.bind(this, 'addSecond', rowData)}
          >
            添加
          </Button>
          <Button
            size="small"
            icon="edit"
            onClick={getTrim.bind(this, 'edit', rowData)}
          >
            编辑
          </Button>
          <Button
            size="small"
            icon="eye"
            onClick={getTrim.bind(this, 'view', rowData)}
          >
            查看
          </Button>
          <Button
            size="small"
            icon="delete"
            onClick={() => getTrim('del', rowData)}
          >
            删除
          </Button>
        </div>
      ),
    },
  ]
}
