import React from 'react'
import { ProTable, useTable } from '@uiw-admin/components'
import { FormCol } from '@uiw-admin/components/lib/ProTable/types'
import { inColumns } from './item'
import { useDispatch } from 'react-redux'
import { Dispatch } from '@uiw-admin/models'
import { inSelectPage, Change } from '@/servers/Authority/User'
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
}

export default function Demo() {
  const dispatch = useDispatch<Dispatch>()

  const updateData = (payload: State) => {
    dispatch({
      type: 'User/updateState',
      payload,
    })
  }

  const table = useTable(inSelectPage, {
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
    if (type === 'edit') {
      dispatch({
        type: 'User/inSelectRoleList',
        payload: { id: obj?.id },
      })
      updateData({ queryInfo: { accountId: obj?.id } })
    }
    if (type === 'view') {
      let status = obj.status === 1 ? '正常' : obj.status === 2 ? '停用' : ''
      updateData({ drawerVisible: true, queryInfo: { ...obj, status: status } })
    }
  }

  // const getRowSpan = (text: any, key: any, rowData: Change, rowNum: number) => {
  //   // console.log('text', text);
  //   // console.log('key', key);
  //   // console.log('rowData', rowData);
  //   // console.log('rowNum', rowNum);

  //   const props: columnsRowSpan = {};
  //   const obj = {
  //     children: text,
  //     props
  //   }

  //   obj.props.rowSpan = 1;
  //   // const content = (<div>{text}</div>)
  //   return obj;
  // }
  return (
    <React.Fragment>
      <ProTable
        bordered
        searchBtns={searchFun(table) as any}
        table={table}
        columns={inColumns(handleEditTable) as FormCol[]}
      />
      <Drawer updateData={updateData} onSearch={table.onSearch} />
      <Modals onSearch={table.onSearch} />
    </React.Fragment>
  )
}
