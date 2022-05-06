import { Fragment, useEffect } from 'react'
import { ProTable, useTable } from '@uiw-admin/components'
import { FormCol } from '@uiw-admin/components/lib/ProTable/types'
import { columnsSearch } from './item'
import { useDispatch } from 'react-redux'
import { Dispatch } from '@uiw-admin/models'
import {
  selectPage,
  Change,
} from '@/servers/DictionaryManagement/DictionaryManagement'
import Drawer from '../Detail'
import Modals from '../Modals'
import { searchFun } from '@/utils'

interface State {
  drawerVisible?: boolean
  tableType?: string
  queryInfo?: object
  isView?: boolean
  delectVisible?: boolean
  id?: string
  level?: number
}

export default function Demo() {
  const dispatch = useDispatch<Dispatch>()

  useEffect(() => {
    dispatch({
      type: 'DictionaryManagement/selectDictTypeList',
    })
  }, [dispatch])

  const updateData = (payload: State) => {
    dispatch({
      type: 'DictionaryManagement/updateState',
      payload,
    })
  }

  const table = useTable(selectPage, {
    // 格式化接口返回的数据，必须返回{total 总数, data: 列表数据}的格式
    formatData: (data) => {
      const dataSource = data?.data?.rows
      const datas = JSON.parse(
        JSON.stringify(dataSource).replace(/"dictValueList"/g, '"children"')
      )
      return {
        total: data?.data?.total,
        data: datas || [],
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
    if (type === 'addType' || type === 'addValue') {
      type === 'addValue' &&
        dispatch({
          type: 'DictionaryManagement/selectDictTypeList',
        })
      updateData({ drawerVisible: true, queryInfo: {} })
    }
    if (type === 'editType' || type === 'editValue' || type === 'view') {
      updateData({ drawerVisible: true, queryInfo: obj })
    }
    if (type === 'del') {
      updateData({ delectVisible: true, id: obj?.id, level: obj?.level })
    }
  }
  return (
    <Fragment>
      <ProTable
        bordered
        operateButtons={[
          {
            label: '新增字典类型',
            type: 'primary',
            icon: 'plus-circle-o',
            onClick: () => handleEditTable('addType', {}),
          },
          {
            label: '新增字典项',
            type: 'primary',
            icon: 'plus-circle-o',
            onClick: () => handleEditTable('addValue', {}),
          },
        ]}
        searchBtns={searchFun(table) as any}
        table={table}
        // paginationProps={{
        //   pageSizeOptions: [10, 20, 30],
        //   pageSize: 10,
        //   onShowSizeChange: (current, pageSize) => {
        //     window.console.log(current, pageSize)
        //   },
        // }}
        columns={columnsSearch(handleEditTable) as FormCol[]}
      />
      <Drawer updateData={updateData} onSearch={table.onSearch} />
      <Modals onSearch={table.onSearch} />
    </Fragment>
  )
}
