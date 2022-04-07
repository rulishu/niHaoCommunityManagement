import React from 'react'
import { ProTable, useTable } from '@uiw-admin/components'
import { Dispatch } from '@uiw-admin/models'
import { useDispatch } from 'react-redux'
import {
  selectPage,
  Change,
} from '@/servers/ChargeManagement/PredepositsManage'
import Drawer from '../Detail/index'
import Modals from '../Modals/index'
import { columnsSearch } from './item'
import { FormCol } from '@uiw-admin/components/lib/ProTable/types'
interface State {
  drawerVisible?: boolean
  tableType?: string
  queryInfo?: object
  isView?: boolean
  delectVisible?: boolean
  id?: string
}

const Search = () => {
  const dispatch = useDispatch<Dispatch>()
  const updateData = (payload: State) => {
    dispatch({
      type: 'PredepositsManage/updateState',
      payload,
    })
  }

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
        ...searchValues,
      }
    },
  })
  // 操作
  function handleEditTable(type: string, obj: Change) {
    updateData({
      isView: type === 'view' || type === 'refundview',
      tableType: type,
    })
    if (type === 'add') {
      updateData({ drawerVisible: true, queryInfo: {} })
    }
    if (type === 'edit' || type === 'view' || type === 'refundview') {
      updateData({ drawerVisible: true, queryInfo: obj })
    }
    if (type === 'del') {
      updateData({ delectVisible: true, id: obj?.id })
    }
  }

  return (
    <React.Fragment>
      <ProTable
        bordered
        // 操作栏按钮
        operateButtons={[
          {
            label: '预存',
            type: 'primary',
            onClick: () => {
              handleEditTable('add', {})
            },
          },
          {
            label: '退还',
            type: 'primary',
            onClick: () => {
              handleEditTable('edit', {})
            },
          },
        ]}
        // 搜索栏按钮
        searchBtns={[
          {
            label: '查询',
            type: 'primary',
            htmlType: 'submit',
            onClick: () => {
              search.onSearch()
            },
          },
          {
            label: '重置',
            onClick: () => search.onReset(),
          },
        ]}
        table={search}
        columns={columnsSearch(handleEditTable) as FormCol[]}
      />
      <Drawer updateData={updateData} onSearch={search.onSearch} />
      <Modals onSearch={search.onSearch} />
    </React.Fragment>
  )
}

export default Search
