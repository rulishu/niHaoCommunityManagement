import React from 'react'
import { ProTable, useTable } from '@uiw-admin/components'
import { Dispatch } from '@uiw-admin/models'
import { useDispatch } from 'react-redux'
import { Button } from 'uiw'
import { selectPage } from '@/servers/ChargeManagement/temporaryCharges'

const Search = () => {
  const dispatch = useDispatch<Dispatch>()

  const search = useTable(selectPage, {
    // 格式化接口返回的数据，必须返回{total 总数, data: 列表数据}的格式
    formatData: (data) => {
      return {
        total: data?.data?.total,
        data: data?.data?.rows || [],
      }
    },
    // 格式化查询参数 会接收到pageIndex 当前页  searchValues 表单数据
    query: (pageIndex, pageSize, searchValues) => {
      return {
        page: pageIndex,
        pageSize: 10,
        id: searchValues.id,
        communityId: searchValues.communityId,
        typeCd: searchValues.typeCd,
      }
    },
  })
  const onAdd = () => {
    dispatch({
      type: 'temporaryCharges/updateState',
      payload: {
        drawerVisible: true,
        tableType: 'add',
        queryInfo: {},
      },
    })
  }
  const onRefund = () => {
    dispatch({
      type: 'temporaryCharges/updateState',
      payload: {
        drawerVisible: true,
      },
    })
  }
  const onPrint = () => {
    dispatch({
      type: 'temporaryCharges/updateState',
      payload: {
        drawerVisible: true,
      },
    })
  }

  return (
    <React.Fragment>
      <ProTable
        // 操作栏按钮
        operateButtons={[
          {
            label: '新增',
            type: 'primary',
            onClick: onAdd,
          },
        ]}
        // 搜索栏按钮
        searchBtns={[
          {
            label: '查询',
            type: 'primary',
            htmlType: 'submit',
          },
          {
            label: '重置',
            onClick: () => search.onSearch,
          },
        ]}
        table={search}
        columns={[
          {
            title: '编号',
            key: 'code',
            props: {
              widget: 'input',
              widgetProps: {
                placeholder: '请输入编号',
              },
            },
          },
          {
            title: '客户姓名',
            key: 'name',
            props: {
              widget: 'input',
              widgetProps: {
                placeholder: '请输入客户姓名',
              },
            },
          },
          {
            title: '收费项目',
            key: 'payService',
            props: {
              widget: 'select',
              option: [
                { label: '测试暖气费', value: '测试暖气费' },
                { label: '测试临时收费项', value: '测试临时收费项' },
                { label: '测试楼宇广告费', value: '测试楼宇广告费' },
                { label: '广告费用(公共区域)', value: '广告费用(公共区域)' },
                { label: '物业违章罚款', value: '物业违章罚款' },
                { label: '装修违章罚款', value: '装修违章罚款' },
                { label: '装修垃圾清运费', value: '装修垃圾清运费' },
                { label: '场地占用费', value: '场地占用费' },
              ],
            },
          },
          {
            title: '付款方式',
            key: 'payType',
            props: {
              widget: 'select',
              option: [
                { label: '现金', value: '现金' },
                { label: '微信支付', value: '微信支付' },
                { label: '支付宝支付', value: '支付宝支付' },
                { label: '刷卡', value: '刷卡' },
                { label: '转账', value: '转账' },
              ],
            },
          },
          {
            title: '收款金额',
            key: 'price',
          },
          {
            title: '收款人',
            key: 'collectionName',
          },
          {
            title: '收款时间',
            key: 'collectionTime',
          },
          {
            title: '状态',
            key: 'status',
            props: {
              widget: 'select',
              option: [
                { label: '已付款', value: '已付款' },
                { label: '已退款', value: '已退款' },
              ],
            },
          },
          {
            title: '备注',
            key: 'remark',
          },
          {
            title: '操作',
            key: 'edit',
            width: 200,
            render: (text: any, key: any, rowData: any) => (
              <div>
                <Button
                  size="small"
                  icon="edit"
                  onClick={onRefund.bind('refund', rowData)}
                >
                  退款
                </Button>
                <Button
                  size="small"
                  icon="delete"
                  onClick={onPrint.bind('print', rowData)}
                >
                  打印
                </Button>
              </div>
            ),
          },
        ]}
      />
    </React.Fragment>
  )
}

export default Search
