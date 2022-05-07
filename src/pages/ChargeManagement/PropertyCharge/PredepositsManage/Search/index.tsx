import React, { useEffect } from 'react'
import { ProTable, useTable } from '@uiw-admin/components'
import { Dispatch, RootState } from '@uiw-admin/models'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectPage,
  Change,
} from '@/servers/ChargeManagement/PredepositsManage'
import Drawer from '../Detail/index'
import Modals from '../Modals/index'
import { columnsSearch } from './item'
import { FormCol } from '@uiw-admin/components/lib/ProTable/types'
import { searchFun } from '@/utils'
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

  useEffect(() => {
    dispatch({
      type: 'models/buChargesList',
    })
    dispatch({
      type: 'models/paysList',
      payload: {
        dictType: '付款方式',
      },
    })
  }, [dispatch])

  const updateData = (payload: State) => {
    dispatch({
      type: 'PredepositsManage/updateState',
      payload,
    })
  }

  const {
    models: { buChargesList, paysList },
  } = useSelector((state: RootState) => state)

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
      isView: type === 'view',
      tableType: type,
    })
    if (type === 'add') {
      updateData({ drawerVisible: true, queryInfo: {} })
      dispatch({
        type: 'models/updateState',
        payload: {
          txtInfo: 'yucun',
        },
      })
    }
    if (type === 'edit') {
      updateData({ drawerVisible: true, queryInfo: obj })
    }
    if (type === 'view') {
      updateData({ drawerVisible: true, queryInfo: obj })
      dispatch({
        type: 'models/updateState',
        payload: {
          txtInfo: 'look',
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
        // scroll={{ x: 1700 }}
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
              dispatch({
                type: 'models/updateState',
                payload: {
                  txtInfo: 'back',
                },
              })
            },
          },
        ]}
        // 搜索栏按钮
        searchBtns={searchFun(search) as any}
        table={search}
        columns={
          columnsSearch(handleEditTable, buChargesList, paysList) as FormCol[]
        }
      />
      <Drawer updateData={updateData} onSearch={search.onSearch} />
      <Modals onSearch={search.onSearch} />
    </React.Fragment>
  )
}

export default Search
