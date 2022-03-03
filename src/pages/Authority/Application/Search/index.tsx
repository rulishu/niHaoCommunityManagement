import React from 'react'
import { ProTable, useTable } from '@uiw-admin/components'
import { FormCol } from '@uiw-admin/components/lib/ProTable/types'
import { columnsSearch, columnsEnd } from './item'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch, RootState } from '@uiw-admin/models'
import { selectPage, Change } from '@/servers/Authority/Application'
import Detail from '../Detail'
import Modals from '../Modals'
import TreeTable from '@/components/TreeTable/index'

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
  const {
    Application: {
      drawerVisible,
      delectVisible,
      tableVisible,
      secondMenu,
      thirdVisible,
      thirdMenu,
      tableLevel,
    },
  } = useSelector((state: RootState) => state)

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

  const seconClose = () => {
    updateData({ tableVisible: false })
  }
  const thirClose = () => {
    if (drawerVisible === true || delectVisible === true) {
      updateData({ thirdVisible: false })
    } else {
      updateData({ thirdVisible: false, tableVisible: true, tableLevel: '1' })
    }
  }

  //增删改查操作
  const getTrim = (type: string, obj: Change) => {
    updateData({
      isView: type === 'view',
      tableType: type,
    })
    if (type === 'add') {
      updateData({
        drawerVisible: true,
        tableLevel: '0',
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
    // 嵌套表格关闭判断
    if (tableLevel === '1') {
      updateData({ tableVisible: false })
    }
    if (tableLevel === '2') {
      updateData({ tableVisible: false, thirdVisible: false })
    }
  }

  return (
    <React.Fragment>
      <ProTable
        bordered
        operateButtons={[
          {
            label: '添加根菜单',
            type: 'primary',
            onClick: () => {
              getTrim('add', {})
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
        columns={columnsSearch(getTrim, updateData) as FormCol[]}
      />
      <Detail updateData={updateData} onSearch={table.onSearch} />
      <Modals onSearch={table.onSearch} />

      {/* 二级菜单弹框*/}
      <TreeTable
        formDates={columnsEnd(getTrim, tableLevel, updateData) as FormCol[]}
        dataSource={secondMenu}
        isOpen={tableVisible}
        maxWidth={1100}
        title={'二级菜单'}
        onClose={seconClose}
      />
      {/* 三级菜单弹框*/}
      <TreeTable
        formDates={columnsEnd(getTrim, tableLevel, updateData) as FormCol[]}
        dataSource={thirdMenu}
        isOpen={thirdVisible}
        maxWidth={1100}
        title={'三级菜单'}
        onClose={thirClose}
      />
    </React.Fragment>
  )
}
