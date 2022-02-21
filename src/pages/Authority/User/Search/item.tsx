import { Button, Tooltip } from 'uiw'
import React from 'react'
import { Change } from '@/servers/Authority/User'

export const columnsSearch = (
  handleEditTable: (tableType: string, obj: Change) => void
) => {
  return [
    {
      title: '用户',
      key: 'createName',
      ellipsis: true,
      width: 120,
      align: 'center',
      props: {
        widget: 'input',
        widgetProps: {
          placeholder: '请输入用户名',
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
      width: 130,
      key: 'uapRightName',
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
      render: (uapRightUrl: string) => (
        <div style={{ textAlign: 'center' }}>
          <Tooltip placement="topLeft" content={uapRightUrl}>
            <span>{uapRightUrl}</span>
          </Tooltip>
        </div>
      ),
    },
    {
      title: '更新时间',
      key: 'updateTime',
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
      width: 130,
      key: 'updateName',
      align: 'center',
    },
    {
      title: '操作',
      key: 'edit',
      align: 'center',
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
