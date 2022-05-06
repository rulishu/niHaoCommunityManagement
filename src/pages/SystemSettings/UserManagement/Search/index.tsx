import { Fragment } from 'react'
import { useDispatch } from 'react-redux'
import { Dispatch } from '@uiw-admin/models'
import { ProTable, useTable } from '@uiw-admin/components'
import { Usermanagement } from '@/servers/usermanagement'
import { item } from './item'
import { FormCol } from '@uiw-admin/components/lib/ProTable/types'
import Drawer from '../Drawers'
import Modals from '../Modals'
import { searchFun } from '@/utils'

interface State {
  drawerVisible?: boolean
  tableType?: string
  queryInfo?: object
  isView?: boolean
  delectVisible?: boolean
  systemId?: string
}
export default function Search() {
  const dispatch = useDispatch<Dispatch>()

  const updateData = (payload: State) => {
    dispatch({
      type: 'usermanagement/updateState',
      payload,
    })
  }

  const table = useTable('/api/user/selectPage', {
    // 格式化接口返回的数据，必须返回{total 总数, data: 列表数据}的格式
    formatData: (data) => {
      return {
        total: data?.data?.total,
        data: data?.data?.rows || [],
      }
    },
    // 格式化查询参数 会接收到pageIndex 当前页  pageSize 页码
    query: (pageIndex, pageSize, searchValues) => {
      // function timestampToTime(timestamp: string) {
      //   let d = new Date(timestamp)
      //   let month =
      //     d.getMonth() > 8 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)
      //   let date = d.getFullYear() + '-' + month + '-' + d.getDate()
      //   let hour = d.getHours() > 9 ? d.getHours() : '0' + d.getHours()
      //   let minute = d.getMinutes() > 9 ? d.getMinutes() : '0' + d.getMinutes()
      //   let ss = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds()
      //   let time = date + ' ' + hour + ':' + minute + ':' + ss
      //   return time
      // }
      return {
        page: pageIndex,
        pageSize: pageSize,
        userName: searchValues.userName,
        phoneNumber: searchValues.phoneNumber,
        gender: searchValues.gender,
        // beginTime: searchValues.beginTime
        //   ? timestampToTime(searchValues.beginTime)
        //   : '',
        // endTime: searchValues.endTime
        //   ? timestampToTime(searchValues.endTime)
        //   : '',
      }
    },
  })
  // 操作
  function handleEditTable(type: string, obj: Usermanagement) {
    updateData({
      isView: type === 'view',
      tableType: type,
    })
    if (type === 'edit' || type === 'view') {
      updateData({ drawerVisible: true, queryInfo: obj })
    }
    if (type === 'del') {
      updateData({ delectVisible: true, systemId: obj?.id })
    }
  }

  return (
    <Fragment>
      <ProTable
        bordered
        searchBtns={searchFun(table) as any}
        columns={item(handleEditTable) as FormCol[]}
        table={table}
      />
      <Drawer updateData={updateData} onSearch={table.onSearch} />
      <Modals onSearch={table.onSearch} />
    </Fragment>
  )
}
