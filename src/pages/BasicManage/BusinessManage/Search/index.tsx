import { Fragment } from 'react'
import { ProTable, useTable } from '@uiw-admin/components'
import { FormCol } from '@uiw-admin/components/lib/ProTable/types'
import { columnsSearch } from './item'
import { useDispatch } from 'react-redux'
import { Dispatch } from '@uiw-admin/models'
import { selectPage, Change } from '@/servers/BasicManage/BusinessManage'
import Drawer from '../Detail'
import Modals from '../Modals'
import { handleAddTable, searchFun } from '@/utils'

interface State {
  drawerVisible?: boolean
  tableType?: string
  queryInfo?: object
  isView?: boolean
  delectVisible?: boolean
  id?: string
}

export default function Demo() {
  const dispatch = useDispatch<Dispatch>()

  const updateData = (payload: State) => {
    dispatch({
      type: 'BusinessManage/updateState',
      payload,
    })
  }

  const table = useTable(selectPage, {
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
      dispatch({
        type: 'models/updateState',
        payload: {
          txtInfo: type,
        },
      })
      dispatch({
        type: 'BusinessManage/selectByCityCodeList',
        payload: {
          areaCode: obj?.provinceCode,
        },
      })
      dispatch({
        type: 'BusinessManage/selectByAreaCodeList',
        payload: {
          areaCode: obj?.cityCode,
        },
      })
      delete obj.createCode
      delete obj.createName
      delete obj.createTime
      delete obj.updateCode
      delete obj.updateName
      delete obj.updateTime
      updateData({ drawerVisible: true, queryInfo: obj })
    }
    if (type === 'del') {
      updateData({ delectVisible: true, id: obj?.id })
    }
  }
  return (
    <Fragment>
      <ProTable
        bordered
        operateButtons={handleAddTable(handleEditTable) as any}
        searchBtns={searchFun(table) as any}
        table={table}
        columns={columnsSearch(handleEditTable) as FormCol[]}
      />
      <Drawer updateData={updateData} onSearch={table.onSearch} />
      <Modals onSearch={table.onSearch} />
    </Fragment>
  )
}
