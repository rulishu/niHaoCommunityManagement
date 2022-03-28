import { ProTable, useTable } from '@uiw-admin/components'
import { useSelector } from 'react-redux'
import { RootState } from '@uiw-admin/models'
import { matching } from './item'
export default function Index() {
  const {
    shopCharge: { drawerType },
  } = useSelector((shopCharge: RootState) => shopCharge)

  const table = useTable('./add', {
    query: (pageIndex, pageSize, searchValues) => {
      return {
        page: pageIndex,
        pageSize,
        id: searchValues?.code || 0,
      }
    },
    formatData: (data) => {
      return {
        total: data?.data?.total,
        data: data?.data?.rows || [],
      }
    },
  })
  return (
    <ProTable
      table={table}
      bordered
      paginationProps={{
        pageSizeOptions: [10, 20, 30],
        pageSize: 10,
      }}
      columns={matching(drawerType) as any}
      scroll={{ x: drawerType === 'return' ? '100%' : 1600 }}
    />
  )
}
