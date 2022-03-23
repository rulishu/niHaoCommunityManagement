import { Fragment } from 'react'
import { ProTable, useTable } from '@uiw-admin/components'
import { FormCol } from '@uiw-admin/components/lib/ProTable/types'
import { columnsSearch } from './item'
import { useDispatch } from 'react-redux'
import { Dispatch } from '@uiw-admin/models'
import { selectPage, Change } from '@/servers/BasicManage/ShopSale'
import Drawer from '../Detail'
import Modals from '../Modals'
interface State {
  drawerVisible?: boolean
  tableType?: string
  queryInfo?: object
  isView?: boolean
  delectVisible?: boolean
  id?: string
  shopsId?: string
}

export default function Demo() {
  const dispatch = useDispatch<Dispatch>()

  const updateData = (payload: State) => {
    dispatch({
      type: 'ShopSale/updateState',
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
    if (type === 'rent' || type === 'sale') {
      updateData({ drawerVisible: true, queryInfo: {} })
    }
    if (type === 'edit') {
      updateData({
        drawerVisible: true,
        queryInfo: obj,
        shopsId: obj?.id,
      })
    }
    if (type === 'del') {
      updateData({ delectVisible: true, id: obj?.id })
    }
  }
  return (
    <Fragment>
      <ProTable
        bordered
        operateButtons={[
          {
            label: '默认收费项(出租)',
            type: 'primary',
            onClick: () => {
              handleEditTable('rent', {})
            },
          },
          {
            label: '默认收费项(出售)',
            type: 'primary',
            onClick: () => {
              handleEditTable('sale', {})
            },
          },
        ]}
        searchBtns={[
          {
            label: '查询',
            type: 'primary',
            htmlType: 'submit',
            onClick: () => {
              table.onSearch()
            },
          },
          {
            label: '重置',
            onClick: () => table.onReset(),
          },
        ]}
        table={table}
        columns={columnsSearch(handleEditTable) as FormCol[]}
      />
      <Drawer updateData={updateData} onSearch={table.onSearch} />
      <Modals onSearch={table.onSearch} />
    </Fragment>
  )
}
