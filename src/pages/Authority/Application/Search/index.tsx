import { Fragment } from 'react'
import { ProTable, useTable } from '@uiw-admin/components'
import { FormCol } from '@uiw-admin/components/lib/ProTable/types'
import { columnsSearch } from './item'
import { useDispatch } from 'react-redux'
import { Dispatch } from '@uiw-admin/models'
import { selectPage, Change } from '@/servers/Authority/Application'
import Detail from '../Detail'
import Modals from '../Modals'
import { searchFun } from '@/utils'
interface State {
  drawerVisible?: boolean
  tableType?: string
  queryInfo?: object
  isView?: boolean
  delectVisible?: boolean
  id?: string
  tableVisible?: boolean
  thirdVisible?: boolean
  tableLevel?: string
}

export default function Demo() {
  const dispatch = useDispatch<Dispatch>()
  const updateData = (payload: State) => {
    dispatch({
      type: 'Application/updateState',
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
        pageSize: pageSize,
        ...searchValues,
      }
    },
  })

  //增删改查操作
  const getTrim = (type: string, obj: Change) => {
    updateData({
      isView: type === 'view',
      tableType: type,
    })
    if (type === 'add') {
      updateData({
        drawerVisible: true,
        queryInfo: { parentId: '0' },
      })
    }
    if (type === 'addSecond') {
      updateData({ drawerVisible: true, queryInfo: { parentId: obj?.id } })
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
        expandable={{
          indentSize: 8,
        }}
        operateButtons={[
          {
            label: '添加根菜单',
            type: 'primary',
            icon: 'plus-circle-o',
            onClick: () => {
              getTrim('add', {})
            },
          },
        ]}
        searchBtns={searchFun(table) as any}
        table={table}
        columns={columnsSearch(getTrim) as FormCol[]}
      />
      <Detail updateData={updateData} onSearch={table.onSearch} />
      <Modals onSearch={table.onSearch} />
    </Fragment>
  )
}
