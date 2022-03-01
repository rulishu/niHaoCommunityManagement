import { Button, Tooltip } from 'uiw'
import React from 'react'
import { Change } from '@/servers/Authority/User'

export const columnsSearch = (
  handleEditTable: (tableType: string, obj: Change) => void
) => {
  return [
    {
      title: '角色名称',
      key: 'roleName',
      ellipsis: true,
      align: 'center',
      render: (roleName: string) => (
        <div style={{ textAlign: 'center' }}>
          <Tooltip placement="topLeft" content={roleName}>
            <span>{roleName}</span>
          </Tooltip>
        </div>
      ),
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
      render: (nickName: string) => (
        <div style={{ textAlign: 'center' }}>
          <Tooltip placement="topLeft" content={nickName}>
            <span>{nickName}</span>
          </Tooltip>
        </div>
      ),
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
      render: (gender: number) => (
        <div style={{ textAlign: 'center' }}>
          <Tooltip placement="topLeft" content={gender}>
            <span>{gender === 1? '男':gender === 2?'女':''}</span>
          </Tooltip>
        </div>
      ),
    },
    {
      title: '身份证',
      key: 'cardId',
      align: 'center',
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
      render: (phoneNumber: string) => (
        <div style={{ textAlign: 'center' }}>
          <Tooltip placement="topLeft" content={phoneNumber}>
            <span>{phoneNumber}</span>
          </Tooltip>
        </div>
      ),
    },
    {
      title: '头像地址',
      key: 'avatar',
      align: 'center',
    },
    {
      title: '帐号状态',
      key: 'status',
      align: 'center',
      ellipsis: true,
      render: (status: number) => (
        <div style={{ textAlign: 'center' }}>
          <Tooltip placement="topLeft" content={status}>
            <span>{status === 1? '正常':'停用' }</span>
          </Tooltip>
        </div>
      ),
    },
    {
      title: '注册时间',
      key: 'createTime',
      width: 200,
      align: 'center',
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
