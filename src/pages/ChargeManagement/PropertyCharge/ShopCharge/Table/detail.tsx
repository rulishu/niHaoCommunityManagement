import React from 'react';
import { Button } from 'uiw';

// 常规收费
export const regularColumns = () => [
    {
        title: '收费项名称',
        key: 'age',
    },
    {
        title: '起收日期',
        key: 'age',
    },
    {
        title: '到期日期',
        key: 'age',
    },
    {
        title: '缴费限期',
        key: 'age',
    },
    {
        title: '单价',
        key: 'age',
    },
    {
        title: '数量',
        key: 'age',
    },
    {
        title: '金额',
        key: 'age',
    },
]
// 临时收费
export const temporaryColumns = () => [
    {
        title: '序号',
        key: 'age',
    },
    {
        title: '客户姓名',
        key: 'age',
    },
    {
        title: '收费项目',
        key: 'age',
    },
    {
        title: '付款方式',
        key: 'age',
    },
    {
        title: '收费金额',
        key: 'age',
    },
    {
        title: '收款人',
        key: 'age',
    },
    {
        title: '收款时间',
        key: 'age',
    },
    {
        title: '状态',
        key: 'age',
    },
    {
        title: '备注',
        key: 'age',
    },
    {
        title: '操作',
        key: 'edit',
        width: 98,
        render: () => (
          <div>
            <Button size="small" type="danger">删除</Button>
            <Button size="small" type="success">修改</Button>
          </div>
        ),
      }
]
// 收取押金
export const depositColumns = () => [
    {
        title: '序号',
        key: 'age',
    },
    {
        title: '客户姓名',
        key: 'age',
    },
    {
        title: '收费项目',
        key: 'age',
    },
    {
        title: '付款方式',
        key: 'age',
    },
    {
        title: '收费金额',
        key: 'age',
    },
    {
        title: '收款人',
        key: 'age',
    },
    {
        title: '收款时间',
        key: 'age',
    },
    {
        title: '退款人',
        key: 'age',
    },
    {
        title: '退款时间',
        key: 'age',
    },
    {
        title: '状态',
        key: 'age',
    },
    {
        title: '备注',
        key: 'age',
    },
    {
        title: '操作',
        key: 'edit',
        width: 98,
        render: () => (
          <div>
            <Button size="small" type="danger">删除</Button>
            <Button size="small" type="success">修改</Button>
          </div>
        ),
      }
]
// 预存款
export const advanceColumns = () => [
    {
        title: '序号',
        key: 'age',
    },
    {
        title: '客户姓名',
        key: 'age',
    },
    {
        title: '状态',
        key: 'age',
    },
    {
        title: '收费项目',
        key: 'age',
    },
    {
        title: '付款方式',
        key: 'age',
    },
    {
        title: '金额',
        key: 'age',
    },
    {
        title: '收款人',
        key: 'age',
    },
    {
        title: '收款时间',
        key: 'age',
    },
  
    {
        title: '单号',
        key: 'age',
    },
    {
        title: '操作',
        key: 'edit',
        width: 98,
        render: () => (
          <div>
            <Button size="small" type="danger">删除</Button>
            <Button size="small" type="success">修改</Button>
          </div>
        ),
      }
]