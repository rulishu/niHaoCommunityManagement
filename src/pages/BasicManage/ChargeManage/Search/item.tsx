import { Button } from 'uiw'
import React from 'react'
import { Change } from '@/servers/BasicManage/ChargeManage'

export const columnsSearch = (
  handleEditTable: (tableType: string, obj: Change) => void
) => {
  return [
    {
      title: '类型',
      align: 'center',
      key: 'types',
      ellipsis: true,
      props: {
        label: '类型',
        widget: 'select',
        option: [
          { label: '常规收费项(商铺)', value: '常规收费项(商铺)' },
          { label: '临时收费项', value: '临时收费项' },
          { label: '押金类收费项', value: '押金类收费项' },
        ],
      },
    },
    {
      title: '收费项目名',
      key: 'chargeName',
      align: 'center',
      props: {
        widget: 'input',
        widgetProps: {
          placeholder: '请输入收费项目名',
        },
      },
    },
    {
      title: '单价',
      key: 'univalent',
      align: 'center',
    },
    {
      title: '数量',
      key: 'num',
      align: 'center',
    },
    {
      title: '计算公式',
      key: 'Formula',
      align: 'center',
    },
    {
      title: '计算周期',
      key: 'calculationCycle',
      align: 'center',
    },
    {
      title: '滞纳金',
      key: 'lateFee',
      align: 'center',
    },
    {
      title: '滞纳金比例',
      key: 'lateFeeRatio',
      align: 'center',
    },
    {
      title: '滞纳金天数',
      key: 'lateFeeDays',
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
