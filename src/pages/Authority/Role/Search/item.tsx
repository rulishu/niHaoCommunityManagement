import { Button, Tooltip } from 'uiw'
import React from 'react'
import { Change } from '@/servers/Authority/Role'

export const columnsSearch = (
  handleEditTable: (tableType: string, obj: Change) => void
) => {
  return [
    {
      title: 'id',
      key: 'id',
      ellipsis: true,
      align: 'center',
      width: 200,
      render: (uapRoleName: string) => (
        <div style={{ textAlign: 'center' }}>
          <Tooltip placement="bottomRight" content={uapRoleName}>
            <span>{uapRoleName}</span>
          </Tooltip>
        </div>
      ),
    },
    {
      title: '姓名',
      key: 'uapRoleName',
      ellipsis: true,
      align: 'center',
      width: 120,
      props: {
        widget: 'input',
        initialValue: '',
        // 组件属性
        widgetProps: {
          preIcon: 'user',
          placeholder: '输入用户名',
        },
      },
      render: (uapRoleName: string) => (
        <div style={{ textAlign: 'center' }}>
          <Tooltip placement="bottomRight" content={uapRoleName}>
            <span>{uapRoleName}</span>
          </Tooltip>
        </div>
      ),
    },
    {
      title: '权限',
      key: 'jurisdiction',
      align: 'center',
      ellipsis: true,
      props: {
        widget: 'select',
        option: [
          { label: '管理员', value: 20 },
          { label: '超级管理员', value: 10 },
        ],
      },
    },
    {
      title: '更新人名称',
      key: 'updateName',
      ellipsis: true,
      align: 'center',
      width: 120,
      props: {
        widget: 'input',
        initialValue: '',
        // 组件属性
        widgetProps: {
          preIcon: 'user',
          placeholder: '输入更新人名称',
        },
      },
    },
    {
      title: '更新时间',
      key: 'updateTime',
      ellipsis: true,
      align: 'center',
      render: (updateTime: string) => (
        <div style={{ textAlign: 'center' }}>
          <Tooltip placement="leftTop" content={updateTime}>
            <span>{updateTime}</span>
          </Tooltip>
        </div>
      ),
    },
    {
      title: '创建时间',
      key: 'createTime',
      ellipsis: true,
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
