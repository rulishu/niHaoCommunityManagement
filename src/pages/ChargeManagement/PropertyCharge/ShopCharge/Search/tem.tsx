import React from 'react'
import { ProTable, useTable } from '@uiw-admin/components'
import { FormCol } from '@uiw-admin/components/lib/ProTable/types'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@uiw-admin/models'
import {
  selectPage,
  insert,
  update,
} from '@/servers/ChargeManagement/ShopCharge'
import FormSelect from './FormSelect'
import Detail from '@/components/SimpleDetail/index'
import {
  columnsAdd,
  columnsRefund,
  columnsRefundView,
} from '../Search/Items/itemsTem' //弹框表单
import { columnsTem } from '../Search/Items/itemTable' //Table
import Print from '../Print'

// interface State {
//   drawerVisible?: boolean
//   tableType?: string
//   queryInfo?: object
//   isView?: boolean
//   delectVisible?: boolean
//   id?: string
// }

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
    shopCharge: { queryInfo, drawerVisible, btnStatus },
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
  function handleEditTable(type: string, obj: any) {
    updateData({
      btnStatus: type,
    })
    if (type === 'refund') {
      updateData({ drawerVisible: true, queryInfo: obj })
    }
    if (type === 'refundView') {
      updateData({ drawerVisible: true, queryInfo: obj })
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
        columns={columnsTem(handleEditTable) as FormCol[]}
      />
      {/* 弹框 */}
      <Detail
        onSearch={table.onSearch}
        formDatas={
          btnStatus === 'refund'
            ? columnsRefund(queryInfo)
            : btnStatus === 'refundView'
            ? columnsRefundView(queryInfo)
            : columnsAdd(queryInfo)
        }
        title={btnStatus === '临时收费退款' ? '' : '新建临时收费'}
        insert={insert}
        update={update}
        readOnly={btnStatus === 'refundView' ? true : false}
        onChange={onChange}
        onClose={onClose}
        queryInfo={queryInfo}
        drawerVisible={drawerVisible}
        tableType={'add'}
      />

      {/* 打印弹框 */}
      <Print />
    </React.Fragment>
  )
}
