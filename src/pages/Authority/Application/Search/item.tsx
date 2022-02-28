import { Button, Tooltip } from 'uiw'
import React from 'react'
import { Change } from '@/servers/Authority/Application'

export const columnsSearch = (
  handleEditTable: (tableType: string, obj: Change) => void
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
      render: (createName: string) => (
        <div style={{ textAlign: 'center' }}>
          <Tooltip placement="topLeft" content={createName}>
            <span>{createName}</span>
          </Tooltip>
        </div>
      ),
    },
    {
      title: '路由地址',
      key: 'path',
      align: 'center',
      ellipsis: false,
      props: {
        widget: 'input',
        initialValue: '',
        // 组件属性
        widgetProps: {
          preIcon: 'user',
          placeholder: '请输入路由地址',
        },
      },
      render: (tag: string) => (
        <div style={{ textAlign: 'center' }}>
          <Tooltip placement="topLeft" content={tag}>
            <span>{tag}</span>
          </Tooltip>
        </div>
      ),
    },
    {
      title: '菜单类型',
      key: 'menuType',
      align: 'center',
      ellipsis: true,
      props: {
        widget: 'select',
        option: [
          { value: 0, label: '目录' },
          { value: 1, label: '菜单' },
          { value: 2, label: '按钮 ' },
        ],
      },
      render: (tag: number) => (
        <div style={{ textAlign: 'center' }}>
          {tag === 0 ? '目录' : tag === 1 ? '菜单' : '按钮'}
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
      props: {
        widget: 'dateInput',
        // 组件属性
        widgetProps: {
          format: 'YYYY-MM-DD HH:mm:ss',
          datePickerProps: {
            showTime: true,
            todayButton: '今天',
          },
          placeholder: '选择更新时间',
        },
      },
      align: 'center',
    },
    {
      title: '创建时间',
      key: 'createTime',
      width: 200,
      props: {
        widget: 'dateInput',
        // 组件属性
        widgetProps: {
          format: 'YYYY-MM-DD HH:mm:ss',
          datePickerProps: {
            showTime: true,
            todayButton: '今天',
          },
          placeholder: '选择创建时间',
        },
      },
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
            onClick={handleEditTable.bind(this, 'addSecond', rowData)}
          >
            添加
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
