import { Button } from 'uiw'
import React from 'react'
import { Change } from '@/servers/BasicManage/ChargeManage'

export const columnsSearch = (
  handleEditTable: (tableType: string, obj: Change) => void
) => {
  return [
    {
      title: '投诉单号',
      align: 'center',
      key: 'id',
      ellipsis: true,
      props: {
        widget: 'input',
        widgetProps: {
          placeholder: '请输入投诉单号',
        },
      },
    },
    {
      title: '投诉标题',
      align: 'center',
      key: 'type',
      ellipsis: true,
    },
    {
      title: '投诉电话',
      align: 'center',
      key: 'type',
      ellipsis: true,
      props: {
        widget: 'input',
        widgetProps: {
          placeholder: '请输入投诉标题',
        },
      },
    },
    {
      title: '分类',
      align: 'center',
      key: 'classification',
      ellipsis: true,
      props: {
        label: '分类',
        widget: 'select',
        option: [
          { label: '设施设备', value: '设施设备' },
          { label: '突发事件', value: '突发事件' },
          { label: '物业服务', value: '物业服务' },
          { label: '物业收费', value: '物业收费' },
        ],
      },
    },
    {
      title: '商户编号',
      align: 'center',
      key: 'number',
      ellipsis: true,
      props: {
        widget: 'input',
        widgetProps: {
          placeholder: '请输入商户编号',
        },
      },
    },
    {
      title: '投诉者姓名',
      align: 'center',
      key: 'type',  
      ellipsis: true,
    },
    {
      title: '投诉时间',
      align: 'center',
      key: 'type',  
      ellipsis: true,
    },
    {
      title: '流程状态',
      align: 'center',
      key: 'status',
      ellipsis: true,
      props: {
        label: '流程状态',
        widget: 'select',
        option: [
          { label: '待受理', value: '待受理' },
          { label: '处理中', value: '处理中' },
          { label: '待评价', value: '待评价' },
          { label: '完成', value: '完成' },
          { label: '已撤销', value: '已撤销' },
        ],
      },
    },
    {
      title: '数据来源',
      align: 'center',
      key: 'types',
      ellipsis: true,
      props: {
        label: '数据来源',
        widget: 'select',
        option: [
          { label: '公司派遣', value: '公司派遣' },
          { label: '业主报修', value: '业主报修' },
          { label: '小程序报修', value: '小程序报修' },
        ],
      },
    },
    {
      title: '操作',
      key: 'edit',
      align: 'center',
      width: 200,
      render: (text: any, key: any, rowData: Change) => (
        <div>
          {/* <Button
            size="small"
            icon="edit"
            onClick={handleEditTable.bind(this, 'edit', rowData)}
          >
            编辑
          </Button> */}
          <Button
            size="small"
            icon="eye"
            onClick={handleEditTable.bind(this, 'view', rowData)}
          >
            详情
          </Button>
          {/* <Button
            size="small"
            icon="delete"
            onClick={() => handleEditTable('del', rowData)}
          >
            删除
          </Button> */}
        </div>
      ),
    },
  ]
}
