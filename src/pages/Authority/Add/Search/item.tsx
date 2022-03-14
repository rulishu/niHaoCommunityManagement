import { Button } from 'uiw'
import React from 'react'
import { Change } from '@/servers/Authority/Add'

export const columnsSearch = (
  handleEditTable: (tableType: string, obj: Change) => void
) => [
  {
    title: '昵称',
    key: 'nickName',
    align: 'center',
    props: {
      widget: 'input',
      widgetProps: {
        placeholder: '请输入昵称',
      },
    },
  },
  {
    title: '状态',
    key: 'status',
    align: 'center',
    props: {
      label: '状态',
      widget: 'select',
      option: [
        { label: '正常', value: '1' },
        { label: '停用', value: '2' },
      ],
    },
    render: (status: number) => (
      <div style={{ textAlign: 'center' }}>
        <span>{status === 1 ? '正常' : '停用'}</span>
      </div>
    ),
  },
  {
    title: '创建人名称',
    key: 'createName',
    align: 'center',
  },
  {
    title: '创建时间',
    key: 'createTime',
    align: 'center',
  },
  {
    title: '操作',
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
