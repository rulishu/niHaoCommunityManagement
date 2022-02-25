import { Button } from 'uiw'
import React from 'react'
import { Change } from '@/servers/BasicManage/ChargeManage'

export const columnsSearch = (
  handleEditTable: (tableType: string, obj: Change) => void
) => {
  return [
    {
      title: '商铺编号',
      align: 'center',
      key: 'type',
      ellipsis: true,
      props: {
        widget: 'input',
        widgetProps: {
          placeholder: '请输入商铺编号',
        },
      },
    },
    {
      title: '楼层',
      align: 'center',
      key: 'type',
      ellipsis: true,
    },
    {
      title: '占地面积',
      align: 'center',
      key: 'type',
      ellipsis: true,
    },
    {
      title: '使用面积',
      align: 'center',
      key: 'type',
      ellipsis: true,
    },
    {
      title: '租金',
      align: 'center',
      key: 'type',
      ellipsis: true,
    },
    {
      title: '使用状态',
      align: 'center',
      key: 'types',
      ellipsis: true,
      props: {
        label: '使用状态',
        widget: 'select',
        option: [
          { label: '空置', value: '空置' },
          { label: '已出租', value: '已出租' },
          { label: '已出售', value: '已出售' },
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
