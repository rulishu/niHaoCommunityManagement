import React from 'react'
import { ProTable, useTable } from '@uiw-admin/components'
import { FormCol } from '@uiw-admin/components/lib/ProTable/types'
import { columnsTem } from './item'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@uiw-admin/models'
import { selectPage, Change } from '@/servers/ChargeManagement/ShopCharge'
import FormSelect from './FormSelect'
import Detail from '../Detail'
import { columnsAdd } from '../Detail/items'
import { insert, update } from '@/servers/ChargeManagement/ShopCharge'

interface State {
  drawerVisible?: boolean
  tableType?: string
  queryInfo?: object
  isView?: boolean
  delectVisible?: boolean
  id?: string
}

const arr = [
  {
    shouName: '1',
    startingTime: '1',
    endTime: '1',
    feeTime: '1',
    money: '已付款',
  },
  {
    shouName: '1',
    startingTime: '1',
    endTime: '1',
    feeTime: '1',
    money: '已退款',
  },
]
export default function Demo() {
  const dispatch = useDispatch<Dispatch>()
  const {
    shopCharge: { queryInfo },
  } = useSelector((shopCharge: RootState) => shopCharge)

  const updateData = (payload: State) => {
    dispatch({
      type: 'shopCharge/updateState',
      payload,
    })
  }

  const table = useTable(selectPage, {
    // 格式化接口返回的数据，必须返回{total 总数, data: 列表数据}的格式
    formatData: (data) => {
      return {
        total: data?.data?.total,
        data: data?.data?.rows || arr,
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
    <React.Fragment>
      <ProTable
        bordered
        // 操作栏按钮
        operateButtons={[
          {
            render: <FormSelect keyType="tem" />,
          },
        ]}
        table={table}
        columns={columnsTem(handleEditTable) as FormCol[]}
      />
      <Detail
        updateData={updateData}
        onSearch={table.onSearch}
        formDatas={columnsAdd(queryInfo)}
        title={'新建临时收费'}
        insert={insert}
        update={update}
      />
    </React.Fragment>
  )
}
