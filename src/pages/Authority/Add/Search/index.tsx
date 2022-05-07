import React from 'react'
import { ProTable, useTable } from '@uiw-admin/components'
import { Dispatch } from '@uiw-admin/models'
import { useDispatch } from 'react-redux'
import { selectPage, Change } from '@/servers/Authority/Add'
import Drawer from '../Detail/index'
import Modals from '../Modals/index'
import { columnsSearch } from './item'
import { FormCol } from '@uiw-admin/components/lib/ProTable/types'
import { handleAddTable, searchFun } from '@/utils'
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
      type: 'Add/updateState',
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
      isView: type === 'look',
      tableType: type,
    })
    if (type === 'add') {
      updateData({ drawerVisible: true, queryInfo: {} })
      dispatch({
        type: 'models/updateState',
        payload: {
          txtInfo: type,
        },
      })
    }
    if (type === 'edit' || type === 'look') {
      updateData({ drawerVisible: true, queryInfo: obj })
      dispatch({
        type: 'models/updateState',
        payload: {
          txtInfo: type,
        },
      })
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
        operateButtons={handleAddTable(handleEditTable) as any}
        searchBtns={searchFun(search) as any}
        table={search}
        columns={columnsSearch(handleEditTable) as FormCol[]}
      />
      <Drawer updateData={updateData} onSearch={search.onSearch} />
      <Modals onSearch={search.onSearch} />
    </React.Fragment>
  )
}

export default Search
