import { Button } from 'uiw'
import React from 'react'
import { Usermanagement } from '@/servers/usermanagement'

export const item = (
  handleEditTable: (tableType: string, obj: Usermanagement) => void
) => {
  return [
    {
      title: '账号名称',
      key: 'uapAccountNickName',
      align: 'center',
      props: {
        widget: 'input',
        widgetProps: {
          placeholder: '请输入账号名称',
        },
      },
    },
    {
      title: '用户真实姓名',
      key: 'uapUserRealName',
      align: 'center',
      props: {
        widget: 'input',
        widgetProps: {
          placeholder: '请输入用户真实姓名',
        },
      },
    },
    {
      title: '用户状态',
      key: 'cc',
      align: 'center',
      // props: {
      //   widget: 'input',
      //   widgetProps: {
      //     placeholder: '请输入用户状态',
      //   },
      // },
    },
    {
      title: '用户头像',
      key: 'dd',
      align: 'center',
      // props: {
      //   widget: 'input',
      //   widgetProps: {
      //     placeholder: '请输入用户头像',
      //   },
      // },
    },
    {
      title: '角色名称',
      align: 'center',
      key: 'uapRoleName',
      ellipsis: true,
      props: {
        label: '角色名称',
        widget: 'select',
        option: [
          { label: '角色1', value: '角色1' },
          { label: '角色2', value: '角色2' },
        ],
      },
    },
    {
      title: '注册时间',
      key: 'createTime',
      align: 'center',
      ellipsis: true,
      props: {
        label: '注册开始时间',
        key: 'beginTime',
        widget: 'dateInput',
        widgetProps: {
          datePickerProps: { showTime: true },
          format: 'YYYY-MM-DD HH:mm:ss',
        },
      },
    },
    {
      title: '操作',
      align: 'center',
      key: 'id',
      width: 140,
      props: {
        label: '注册结束时间',
        key: 'endTime',
        widget: 'dateInput',
        widgetProps: {
          datePickerProps: { showTime: true },
          format: 'YYYY-MM-DD HH:mm:ss',
        },
      },
      render: (text: any, key: any, rowData: Usermanagement) => (
        <div>
          <Button
            size="small"
            icon="delete"
            onClick={() => handleEditTable('del', rowData)}>
            删除
          </Button>
          <Button
            size="small"
            icon="edit"
            onClick={() => handleEditTable('edit', rowData)}>
            编辑
          </Button>
        </div>
      ),
    },
  ]
}
