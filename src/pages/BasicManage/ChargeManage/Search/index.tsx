import { Fragment, useEffect } from 'react'
import { ProTable, useTable } from '@uiw-admin/components'
import { FormCol } from '@uiw-admin/components/lib/ProTable/types'
import { columnsSearch } from './item'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch, RootState } from '@uiw-admin/models'
import { selectPage, Change } from '@/servers/BasicManage/ChargeManage'
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

  useEffect(() => {
    dispatch({
      type: 'models/statusList',
      payload: {
        dictType: '收费项类型',
      },
    })
    dispatch({
      type: 'models/standardList',
      payload: {
        dictType: '收费标准',
      },
    })
  }, [dispatch])

  const {
    models: { statusList },
  } = useSelector((state: RootState) => state)

  const updateData = (payload: State) => {
    dispatch({
      type: 'ChargeManage/updateState',
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
      isView: type === 'view',
      tableType: type,
    })
    if (type === 'add') {
      updateData({ drawerVisible: true, queryInfo: {} })
    }
    if (type === 'edit' || type === 'view') {
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
        columns={columnsSearch(handleEditTable, statusList) as FormCol[]}
      />
      <Drawer updateData={updateData} onSearch={table.onSearch} />
      <Modals onSearch={table.onSearch} />
    </Fragment>
  )
}
