import { ProTable, useTable } from '@uiw-admin/components'
import { useSelector } from 'react-redux'
import { RootState } from '@uiw-admin/models'
import {
  selectHistoryPayList,
  buShopChargeData,
} from '@/servers/ChargeManagement/ShopCharge'
import { matching } from './item'
export default function Index() {
  const {
    shopCharge: { drawerType, searchParms, selectedList },
  } = useSelector((shopCharge: RootState) => shopCharge) as any

  const table = useTable(
    `${
      drawerType === 'history'
        ? selectHistoryPayList
        : drawerType === 'charge'
        ? buShopChargeData
        : '/api'
    }`,
    {
      query: (pageIndex, pageSize) => {
        const data =
          drawerType === 'charge'
            ? { ids: selectedList }
            : {
                code: searchParms?.code || '',
                page: pageIndex,
                pageSize,
              }
        return data
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
