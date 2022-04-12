import { Button } from 'uiw'
import { Usermanagement } from '@/servers/usermanagement'

export const item = (
  handleEditTable: (tableType: string, obj: Usermanagement) => void
) => {
  return [
    {
      title: '用户姓名',
      key: 'userName',
      align: 'center',
      props: {
        widget: 'input',
        widgetProps: {
          placeholder: '请输入用户真实姓名',
        },
      },
    },
    {
      title: '联系方式',
      key: 'phoneNumber',
      align: 'center',
      props: {
        widget: 'input',
        widgetProps: {
          placeholder: '请输入联系方式',
        },
        rules: [
          {
            pattern: new RegExp(/^1[3|4|5|6|7|8|9][0-9]\d{8}$/),
            message: '请正确输入手机号',
          },
        ],
      },
    },
    {
      title: '用户状态',
      key: 'status',
      align: 'center',
      render: (text: number) => (
        <div style={{ textAlign: 'center' }}>
          {text === 1 ? '正常' : '禁用'}
        </div>
      ),
    },
    {
      title: '备注',
      key: 'remark',
      align: 'center',
    },
    {
      title: '操作',
      align: 'center',
      key: 'id',
      width: 200,
      render: (text: any, key: any, rowData: Usermanagement) => (
        <div style={{ textAlign: 'center' }}>
          <Button
            size="small"
            icon="delete"
            onClick={() => handleEditTable('del', rowData)}
          >
            删除
          </Button>
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
            onClick={handleEditTable.bind(this, 'view', rowData)}
          >
            查看
          </Button>
        </div>
      ),
    },
  ]
}
