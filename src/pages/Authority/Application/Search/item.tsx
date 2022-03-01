import { Button } from 'uiw'
import React from 'react'
import { Change } from '@/servers/Authority/Application'

export const columnsSearch = (
  getTrim: (tableType: string, obj: Change) => void,
  updateData: (payload: Change) => void
) => {
  return [
    {
      title: '菜单名称',
      key: 'menuName',
      ellipsis: true,
      align: 'center',
      props: {
        widget: 'input',
        initialValue: '',
        // 组件属性
        widgetProps: {
          preIcon: 'user',
          placeholder: '输入菜单名称',
        },
      },
      render: (text: any, key: any, rowData: Change) => (
        <div style={{ textAlign: 'center' }}>
          {rowData?.children && rowData?.children.length > 0 ? (
            <Button
              basic
              icon="plus-square-o"
              type="dark"
              onClick={() =>
                updateData({
                  tableVisible: true,
                  tableLevel: '1',
                  secondMenu: rowData?.children,
                })
              }
            >
              {text}
            </Button>
          ) : (
            text
          )}
        </div>
      ),
    },
    {
      title: '路由地址',
      key: 'path',
      align: 'center',
      ellipsis: false,
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
      title: '顺序',
      key: 'orderNum',
      align: 'center',
      ellipsis: true,
    },
    {
      title: '更新时间',
      key: 'updateTime',
      width: 200,
      align: 'center',
    },
    {
      title: '创建时间',
      key: 'createTime',
      width: 200,
      align: 'center',
    },
    {
      title: '更新人',
      key: 'updateName',
      align: 'center',
      ellipsis: true,
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

export const columnsEnd = (
  getTrim: (tableType: string, obj: Change) => void,
  tableLevel: string,
  updateData: (payload: Change) => void
) => {
  return [
    {
      title: '菜单名称',
      key: 'menuName',
      ellipsis: true,
      style: { textAlign: 'center' },
      render: (text: any, key: any, rowData: Change) => (
        <div style={{ textAlign: 'center' }}>
          {tableLevel === '1' &&
          rowData?.children &&
          rowData?.children.length > 0 ? (
            <Button
              basic
              icon="plus-square-o"
              type="dark"
              onClick={() => {
                updateData({
                  thirdVisible: true,
                  tableLevel: '2',
                  thirdMenu: rowData?.children,
                })
              }}
            >
              {text}
            </Button>
          ) : (
            text
          )}
        </div>
      ),
    },
    {
      title: '路由地址',
      key: 'path',
      ellipsis: false,
      style: { textAlign: 'center' },
      render: (text: string) => (
        <div style={{ textAlign: 'center' }}>{text}</div>
      ),
    },
    {
      title: '菜单类型',
      key: 'menuType',
      align: 'center',
      ellipsis: true,
      style: { textAlign: 'center' },
      render: (text: any) => (
        <div style={{ textAlign: 'center' }}>
          {text === 1 ? '目录' : text === 2 ? '菜单' : '按钮'}
        </div>
      ),
    },
    {
      title: '顺序',
      key: 'orderNum',
      ellipsis: true,
      style: { textAlign: 'center' },
      render: (text: string) => (
        <div style={{ textAlign: 'center' }}>{text}</div>
      ),
    },
    {
      title: '更新时间',
      key: 'updateTime',
      width: 200,
      style: { textAlign: 'center' },
      render: (text: string) => (
        <div style={{ textAlign: 'center' }}>{text}</div>
      ),
    },
    {
      title: '创建时间',
      key: 'createTime',
      width: 200,
      style: { textAlign: 'center' },
      render: (text: string) => (
        <div style={{ textAlign: 'center' }}>{text}</div>
      ),
    },
    {
      title: '更新人',
      key: 'updateName',
      style: { textAlign: 'center' },
      render: (text: string) => (
        <div style={{ textAlign: 'center' }}>{text}</div>
      ),
      ellipsis: true,
    },
    {
      title: '操作',
      key: 'edit',
      width: 255,
      style: { textAlign: 'center' },
      render: (text: any, key: any, rowData: Change) => (
        <div style={{ textAlign: 'center' }}>
          {tableLevel !== '2' && (
            <Button
              size="small"
              icon="plus-circle-o"
              onClick={getTrim.bind(this, 'addSecond', rowData)}
            >
              添加
            </Button>
          )}

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
