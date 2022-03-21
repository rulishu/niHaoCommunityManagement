import { Button } from 'uiw'
import { Change } from '@/servers/Authority/User'

export const columnsSearch = (
  handleEditTable: (tableType: string, obj: Change) => void
  // getRowSpan: (text: any, key: any, rowData: Change, rowNum: number) => {
  //   children: any;
  //   props: columnsRowSpan;
  // }
) => {
  return [
    {
      title: '角色名称',
      key: 'roleName',
      ellipsis: true,
      align: 'center',
    },
    {
      title: '账号昵称',
      key: 'nickName',
      align: 'center',
      props: {
        widget: 'input',
        initialValue: '',
        // 组件属性
        widgetProps: {
          preIcon: 'user',
          placeholder: '输入用户名',
        },
      },
      // render: (text: any, key: any, rowData: Change, rowNum: number) => {
      //   const obj = getRowSpan(text, key, rowData, rowNum)
      //   return obj;
      // }
    },
    {
      title: '用户姓名',
      key: 'userName',
      align: 'center',
    },
    {
      title: '用户性别',
      key: 'gender',
      align: 'center',
      render: (status: number) => (
        <div style={{ textAlign: 'center' }}>
          <span>{status === 0 ? '男' : status === 1 ? '女' : ''}</span>
        </div>
      ),
    },
    {
      title: '手机号',
      key: 'phoneNumber',
      align: 'center',
      ellipsis: true,
      props: {
        widget: 'input',
        widgetProps: {
          placeholder: '请输入手机号',
        },
      },
    },
    {
      title: '帐号状态',
      key: 'status',
      align: 'center',
      ellipsis: true,
      render: (status: number) => (
        <div style={{ textAlign: 'center' }}>
          <span>{status === 1 ? '正常' : status === 2 ? '停用' : ''}</span>
        </div>
      ),
    },

    {
      title: '操作',
      key: 'edit',
      align: 'center',
      width: 200,
      render: (text: any, key: any, rowData: Change) => (
        <div style={{ textAlign: 'center' }}>
          <Button
            size="small"
            icon="edit"
            onClick={handleEditTable.bind(this, 'edit', rowData)}
          >
            角色授权
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

export const inColumns = (
  handleEditTable: (tableType: string, obj: Change) => void
  // getRowSpan: (text: any, key: any, rowData: Change, rowNum: number) => {
  //   children: any;
  //   props: columnsRowSpan;
  // }
) => {
  return [
    {
      title: '账号昵称',
      key: 'nickName',
      align: 'center',

      props: {
        widget: 'input',
        initialValue: '',
        // 组件属性
        widgetProps: {
          preIcon: 'user',
          placeholder: '输入用户名',
        },
      },
      // render: (text: any, key: any, rowData: Change, rowNum: number) => {
      //   const obj = getRowSpan(text, key, rowData, rowNum)
      //   return obj;
      // }
    },
    {
      title: '角色名称',
      key: 'roleName',
      align: 'center',
      ellipsis: true,
    },
    {
      title: '帐号状态',
      key: 'status',
      align: 'center',
      ellipsis: true,
      render: (status: number) => (
        <div style={{ textAlign: 'center' }}>
          <span>{status === 1 ? '正常' : status === 2 ? '禁用' : ''}</span>
        </div>
      ),
    },

    {
      title: '操作',
      key: 'edit',
      align: 'center',
      width: 250,
      render: (text: any, key: any, rowData: Change) => (
        <div style={{ textAlign: 'center' }}>
          <Button
            size="small"
            icon="edit"
            onClick={handleEditTable.bind(this, 'edit', rowData)}
          >
            角色授权
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
