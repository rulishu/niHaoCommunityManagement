import { Button, Tag } from 'uiw' //Tooltip
import React from 'react'
import { Change } from '@/servers/ChargeManagement/ShopCharge'

export const columnsRout = () => {
  return [
    {
      title: '收费项名称',
      align: 'center',
      key: 'shouName',
    },
    {
      align: 'center',
      title: '起收日期',
      key: 'startingTime',
      ellipsis: true,
    },
    {
      align: 'center',
      title: '到期日期',
      key: 'endTime',
      ellipsis: true,
    },
    {
      align: 'center',
      title: '缴费日期',
      key: 'feeTime',
      ellipsis: true,
    },
    {
      title: '单价',
      align: 'center',
      key: 'fee',
    },
    {
      title: '数量',
      align: 'center',
      key: 'num',
    },
    {
      title: '金额',
      align: 'center',
      key: 'money',
    },
  ]
}

export const columnsTem = (
  handleEditTable: (tableType: string, obj: Change) => void
) => {
  return [
    {
      title: '客户姓名',
      align: 'center',
      key: 'shouName',
    },
    {
      align: 'center',
      title: '收费项目',
      key: 'startingTime',
    },
    {
      align: 'center',
      title: '付款方式',
      key: 'endTime',
    },

    {
      title: '收费金额',
      align: 'center',
      key: 'fee',
    },
    {
      title: '收款人',
      align: 'center',
      key: 'num',
    },
    {
      align: 'center',
      title: '收款时间',
      key: 'feeTime',
      ellipsis: true,
    },
    {
      title: '状态',
      align: 'center',
      key: 'money',
      render: (createName: string) => (
        <div style={{ textAlign: 'center' }}>
          {createName === '已付款' ? (
            <Tag disabled title="已付款" color="#28a745" />
          ) : (
            <Tag disabled title="未付款" color="#ffc107" />
          )}
        </div>
      ),
    },
    {
      title: '备注',
      align: 'center',
      key: 'ramker',
    },
    {
      title: '操作',
      align: 'center',
      key: 'edit',
      width: 250,
      render: (text: string, key: string, rowData: Change) => (
        <div style={{ textAlign: 'center' }}>
          <Button
            size="small"
            icon="edit"
            onClick={() => handleEditTable('edit', rowData)}
          >
            退款
          </Button>
          <Button
            size="small"
            icon="eye-o"
            onClick={() => handleEditTable('view', rowData)}
          >
            退款详情
          </Button>
          <Button
            size="small"
            icon="delete"
            onClick={() => handleEditTable('del', rowData)}
          >
            打印
          </Button>
        </div>
      ),
    },
  ]
}

export const columnsDep = (
  handleEditTable: (tableType: string, obj: Change) => void
) => {
  return [
    {
      title: '客户姓名',
      align: 'center',
      key: 'shouName',
    },
    {
      align: 'center',
      title: '收费项目',
      key: 'startingTime',
    },
    {
      align: 'center',
      title: '付款方式',
      key: 'endTime',
    },
    {
      title: '收费金额',
      align: 'center',
      key: 'fee',
    },
    {
      title: '收款人',
      align: 'center',
      key: 'num',
    },
    {
      align: 'center',
      title: '收款时间',
      key: 'feeTime',
      ellipsis: true,
    },
    {
      title: '退款人',
      align: 'center',
      key: 'num',
    },
    {
      align: 'center',
      title: '退款时间',
      key: 'feeTime',
      ellipsis: true,
    },
    {
      title: '状态',
      align: 'center',
      key: 'money',
      render: (createName: string) => (
        <div style={{ textAlign: 'center' }}>
          {createName === '已付款' ? (
            <Tag disabled title="已退款" color="#28a745" />
          ) : (
            <Tag disabled title="未退款" color="#ffc107" />
          )}
        </div>
      ),
    },
    {
      title: '备注',
      align: 'center',
      key: 'ramker',
    },
    {
      title: '操作',
      align: 'center',
      key: 'edit',
      width: 200,
      render: (text: string, key: string, rowData: Change) => (
        <div style={{ textAlign: 'center' }}>
          <Button
            size="small"
            icon="edit"
            onClick={() => handleEditTable('edit', rowData)}
          >
            退还
          </Button>
          <Button
            size="small"
            icon="delete"
            onClick={() => handleEditTable('del', rowData)}
          >
            打印
          </Button>
        </div>
      ),
    },
  ]
}

export const columnsAdDep = (
  handleEditTable: (tableType: string, obj: Change) => void
) => {
  return [
    {
      title: '客户姓名',
      align: 'center',
      key: 'shouName',
    },
    {
      title: '状态',
      align: 'center',
      key: 'money',
      render: (createName: string) => (
        <div style={{ textAlign: 'center' }}>
          {createName === '支付' ? (
            <Tag disabled title="支付" color="#28a745" />
          ) : (
            <Tag disabled title="未支付" color="#ffc107" />
          )}
        </div>
      ),
    },
    {
      align: 'center',
      title: '收费项目',
      key: 'startingTime',
    },
    {
      align: 'center',
      title: '付款方式',
      key: 'endTime',
    },
    {
      title: '收费金额',
      align: 'center',
      key: 'fee',
    },
    {
      align: 'center',
      title: '金额',
      key: 'moneys',
    },
    {
      title: '收款人',
      align: 'center',
      key: 'num',
    },
    {
      align: 'center',
      title: '收款时间',
      key: 'feeTime',
      ellipsis: true,
    },
    {
      title: '单号',
      align: 'center',
      key: 'id',
    },
    {
      title: '操作',
      align: 'center',
      key: 'edit',
      width: 200,
      render: (text: string, key: string, rowData: Change) => (
        <div style={{ textAlign: 'center' }}>
          <Button
            size="small"
            icon="edit"
            onClick={() => handleEditTable('edit', rowData)}
          >
            打印退款单
          </Button>
          {/* <Button size="small" icon="delete" onClick={() => handleEditTable('del', rowData)}>
            打印
          </Button> */}
        </div>
      ),
    },
  ]
}
