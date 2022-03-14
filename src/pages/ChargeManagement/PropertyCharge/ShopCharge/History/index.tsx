import { ProDrawer, ProTable, useTable } from '@uiw-admin/components'
// import { Table } from 'uiw'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@uiw-admin/models'
import { columns } from './items'
import { FormCol } from '@uiw-admin/components/lib/ProTable/types'
import { selectPage } from '@/servers/ChargeManagement/ShopCharge'

const Detail = () => {
  const dispatch = useDispatch<Dispatch>()
  const {
    shopCharge: { historyVisible, historyList },
  } = useSelector((shopCharge: RootState) => shopCharge)

  const table = useTable(selectPage, {
    // 格式化接口返回的数据，必须返回{total 总数, data: 列表数据}的格式
    formatData: (data) => {
      return {
        total: data?.data?.total,
        data: data?.data?.rows || historyList,
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

  const onClose = () => {
    dispatch({
      type: 'shopCharge/updateState',
      payload: {
        historyVisible: false,
      },
    })
  }
  const onClick = () => {
    console.log('打印')
  }

  return (
    <ProDrawer
      width={1000}
      title={'历史数据'}
      visible={historyVisible}
      onClose={onClose}
    >
      <ProTable
        // 搜索栏按钮
        bordered
        paginationProps={{
          pageSizeOptions: [10, 20, 30],
          pageSize: 10,
        }}
        table={table}
        columns={columns(onClick) as FormCol[]}
        scroll={{ x: 1300 }}
      />
      {/* <Table
        columns={columns()}
        data={historyList}
      /> */}
    </ProDrawer>
  )
}

export default Detail
