import { Fragment } from 'react'
import { useDispatch } from 'react-redux'
import { Dispatch } from '@uiw-admin/models'
import { ProTable, useTable } from '@uiw-admin/components'
import Drawers from '../Drawer'
import { searchFun } from '@/utils'
import { columnsSearch } from './items'
import { FormCol } from '@uiw-admin/components/lib/ProTable/types'

export default function Index() {
  const dispatch = useDispatch<Dispatch>()

  const updateData = (payload: any) => {
    dispatch({
      type: 'balanceManagement/updateState',
      payload,
    })
  }

  // 查询
  const table = useTable('/api/shopAmount/selectPage', {
    query: (pageIndex, pageSize, searchValues) => {
      return {
        page: pageIndex,
        pageSize: 10,
        ...searchValues,
      }
    },

    formatData: (data) => {
      return {
        total: data?.data?.total || 0,
        data: data?.data?.rows || [],
      }
    },
  })
  const handleEditTable = (type: string, data: any) => {
    updateData({
      isView: type === 'view',
      tableType: type,
    })
    if (type === 'view' || type === 'refund') {
      updateData({ drawerVisible: true, queryInfo: { ...data } })
    }
    if (type === 'del') {
      updateData({ drawerVisible: true, id: data?.id })
    }
  }

  return (
    <Fragment>
      <div className="proTableBox">
        <ProTable
          bordered
          table={table}
          searchBtns={searchFun(table) as any}
          columns={columnsSearch(handleEditTable) as FormCol[]}
        />
      </div>
      <Drawers />
    </Fragment>
  )
}
