import { Button } from 'uiw'
import React from 'react'
import { Change } from '@/servers/Authority/Add'

export const columnsSearch = (
  handleEditTable: (tableType: string, obj: Change) => void
) => [
  {
    title: '用户账号',
    key: 'price',
    align: 'center',
  },
  {
    title: '电话',
    key: 'code',
    props: {
      widget: 'input',
      widgetProps: {
        placeholder: '请输入电话',
      },
    },
    align: 'center',
  },
  {
    title: '创建时间',
    key: 'collectionName',
    align: 'center',
  },
  {
    title: '更新时间',
    key: 'collectionTime',
    align: 'center',
  },
  {
    title: '修改密码',
    key: 'edit',
    width: 200,
    align: 'center',
    render: (text: any, key: any, rowData: any) => (
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
