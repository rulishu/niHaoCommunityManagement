import { ProTable, useTable } from '@uiw-admin/components'
import { useSelector } from 'react-redux'
import { RootState } from '@uiw-admin/models'
import { selectHistoryPayList } from '@/servers/ChargeManagement/ShopCharge'
import { matching } from './item'
export default function Index() {
  const {
    shopCharge: { drawerType, searchParms },
  } = useSelector((shopCharge: RootState) => shopCharge) as any

  const table = useTable(
    `${
      drawerType === 'history'
        ? selectHistoryPayList
        : drawerType === 'charge'
        ? '11'
        : '/api'
    }`,
    {
      query: (pageIndex, pageSize) => {
        return {
          code: searchParms?.code || '',
          page: pageIndex,
          pageSize,
        }
      },
      formatData: (data) => {
        return {
          total: data?.data?.total || 0,
          data: data?.data?.rows || [],
        }
      },
    }
  )
  return (
    <ProTable
      table={table}
      bordered
      paginationProps={{
        pageSizeOptions: [10, 20, 30],
        pageSize: 10,
      }}
      columns={matching(drawerType) as any}
      scroll={{ x: drawerType === 'return' ? '100%' : 1700 }}
    />
  )
}
