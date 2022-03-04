import { Button } from 'uiw'
import React from 'react'
import { Change } from '@/servers/Authority/Role'

export const columnsSearch = (
  handleEditTable: (tableType: string, obj: Change) => void
) => {
  return [
    {
      title: '角色名称',
      key: 'roleName',
      ellipsis: true,
      align: 'center',
      props: {
        widget: 'input',
        widgetProps: {
          placeholder: '输入角色名称',
        },
      },
      render: (roleName: string) => (
        <div style={{ textAlign: 'center' }}>
          <span>{roleName}</span>
        </div>
      ),
    },
    {
      title: '创建人',
      key: 'createName',
      ellipsis: true,
      align: 'center',
      props: {
        widget: 'input',
        widgetProps: {
          preIcon: 'user',
          placeholder: '输入创建人',
        },
      },
      render: (createName: string) => (
        <div style={{ textAlign: 'center' }}>
          <span>{createName}</span>
        </div>
      ),
    },
    {
      title: '角色状态',
      key: 'status',
      ellipsis: true,
      align: 'center',
      render: (status: number) => (
        <div style={{ textAlign: 'center' }}>
          <span>{status === 1 ? '正常' : status === 2 ? '停用' : ''}</span>
        </div>
      ),
    },
    {
      title: '备注',
      key: 'remark',
      ellipsis: true,
      align: 'center',
      render: (remark: string) => (
        <div style={{ textAlign: 'center' }}>
          <span>{remark}</span>
        </div>
      ),
    },
    {
      title: '操作',
      key: 'edit',
      align: 'center',
      width: 300,
      render: (text: any, key: any, rowData: Change) => (
        <div style={{ textAlign: 'center' }}>
          <Button
            size="small"
            icon="file-add"
            onClick={handleEditTable.bind(this, 'aut', rowData)}
          >
            授权
          </Button>
          <Button
            size="small"
            icon="edit"
            onClick={handleEditTable.bind(this, 'edit', rowData)}
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
