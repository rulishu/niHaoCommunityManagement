import React from 'react'
import { ProTable, useTable } from '@uiw-admin/components'
import { FormCol } from '@uiw-admin/components/lib/ProTable/types'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@uiw-admin/models'
import {
  selectPage,
  Change,
  insert,
  update,
} from '@/servers/ChargeManagement/ShopCharge'
import FormSelect from './FormSelect'
import Detail from '@/components/SimpleDetail/index'
import Charge from '../Charge'
import { columnsPre } from '../Search/Items//itemAdDep'
import { columnsAdDep } from '../Search/Items/itemTable'
import Print from '../Print'

// interface State {
//   drawerVisible?: boolean
//   tableType?: string
//   queryInfo?: object
//   isView?: boolean
//   delectVisible?: boolean
//   id?: string
// }

export default function Demo() {
  const dispatch = useDispatch<Dispatch>()

  const {
    shopCharge: { queryInfo, drawerVisible },
  } = useSelector((shopCharge: RootState) => shopCharge)

  const updateData = (payload: any) => {
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
    if (type === 'print') {
      updateData({ printVisible: true, printInfo: obj })
    }
  }
  // 更新表单
  const onChange = (
    initial: Record<string, any>,
    current: Record<string, any>
  ) => {
    updateData({ queryInfo: { ...queryInfo, ...current } })
  }
  //关闭抽屉
  const onClose = () => {
    dispatch({
      type: 'shopCharge/updateState',
      payload: {
        drawerVisible: false,
        btnStatus: '',
        queryInfo: {},
      },
    })
  }
  return (
    <React.Fragment>
      <ProTable
        bordered
        // 操作栏按钮
        operateButtons={[
          {
            render: <FormSelect />,
          },
        ]}
        table={table}
        columns={columnsAdDep(handleEditTable) as FormCol[]}
      />
      <Detail
        onSearch={table.onSearch}
        formDatas={columnsPre(queryInfo)}
        title={'预存'}
        insert={insert}
        update={update}
        readOnly={false}
        onChange={onChange}
        onClose={onClose}
        queryInfo={queryInfo}
        drawerVisible={drawerVisible}
        tableType={'add'}
      />

      <Charge onSearch={table.onSearch} />

      {/* 打印弹框 */}
      <Print />
    </React.Fragment>
  )
}
