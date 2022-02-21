import { Button, Tooltip } from 'uiw'
import React from 'react'
import { Change } from '@/servers/Authority/Application'

export const columnsSearch = (
  handleEditTable: (tableType: string, obj: Change) => void
) => {
  return [
    {
      title: '姓名',
      key: 'createName',
      ellipsis: true,
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
      render: (createName: string) => (
        <div style={{ textAlign: 'center' }}>
          <Tooltip placement="topLeft" content={createName}>
            <span>{createName}</span>
          </Tooltip>
        </div>
      ),
    },
    {
      title: '权限名称',
      key: 'uapRightName',
      align: 'center',
      ellipsis: false,
      props: {
        widget: 'input',
        initialValue: '',
        // 组件属性
        widgetProps: {
          preIcon: 'user',
          placeholder: '输入权限名称',
        },
      },
      render: (uapRightName: string) => (
        <div style={{ textAlign: 'center' }}>
          <Tooltip placement="topLeft" content={uapRightName}>
            <span>{uapRightName}</span>
          </Tooltip>
        </div>
      ),
    },
    {
      title: '路径',
      key: 'uapRightUrl',
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
      width: 200,
      render: (text: any, key: any, rowData: Change) => (
        <div>
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
