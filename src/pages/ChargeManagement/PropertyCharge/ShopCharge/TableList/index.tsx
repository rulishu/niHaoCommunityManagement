import { ProTable, useTable } from '@uiw-admin/components'
import { useSelector } from 'react-redux'
import { RootState } from '@uiw-admin/models'
import {
  selectHistoryPayList,
  selectAdvanceDepostAmountByCode,
} from '@/servers/ChargeManagement/ShopCharge'
import { matching } from './item'
import '../style.css'
export default function Index(props: any) {
  const { obtain } = props

  const {
    shopCharge: { drawerType, searchParms, selectedList },
  } = useSelector((shopCharge: RootState) => shopCharge) as any
  const table = useTable(
    `${
      drawerType === 'history'
        ? selectHistoryPayList
        : drawerType === 'return'
        ? selectAdvanceDepostAmountByCode
        : '/api/111'
    }`,
    {
      query: (pageIndex, pageSize) => {
        const payload =
          drawerType === 'return'
            ? { code: String(searchParms?.code || '') }
            : {
                code: String(searchParms?.code || ''),
                page: pageIndex,
                pageSize,
              }
        return payload
      },
      formatData: (data) => {
        return {
          total:
            drawerType === 'charge'
              ? selectedList.length
              : data?.data?.total || 0,
          data:
            drawerType === 'charge'
              ? selectedList
              : drawerType === 'return'
              ? data?.data || []
              : data?.data?.rows || [],
        }
      },
    }
  )
  return (
    <div className={drawerType === 'return' ? 'proTableBox' : ''}>
      <ProTable
        table={table}
        bordered
        paginationProps={{
          pageSizeOptions: [10, 20, 30],
          pageSize: 10,
        }}
        columns={matching(drawerType, table, obtain) as any}
        scroll={{
          x: drawerType === 'return' || drawerType === 'charge' ? '100%' : 1700,
        }}
      />
    </div>
  )
}
