import * as React from 'react'
import { ProTable, useTable } from '@uiw-admin/components'
import { FormCol } from '@uiw-admin/components/lib/ProTable/types'
import { selectPage, searchValue } from '@/servers/ChargeManagement/ShopCharge'
import FormSelect from '../Search/FormSelect'
import { columnsDeposit } from './item'

export default function Demo(props: {
  option: searchValue[]
  setValue: (e: any) => void
  updateData: (payload: any) => void
}) {
  const { option, setValue, updateData } = props

  const table = useTable(selectPage, {
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

  // 操作
  const handleEditTable = (type: string, data?: any) => {
    updateData({ drawerType: type, drawerVisible: true })
  }
  return (
    <React.Fragment>
      <ProTable
        bordered
        operateButtons={[
          {
            render: <FormSelect />,
          },
          {
            label: '新增',
            type: 'primary',
            onClick: () => handleEditTable('depositAdd'),
          },
        ]}
        searchBtns={[
          {
            label: '查询',
            type: 'primary',
            onClick: () => {
              table.onSearch()
            },
          },
          {
            label: '重置',
            onClick: () => {
              table.onReset()
            },
          },
        ]}
        table={table}
        rowSelection={{
          type: 'checkbox',
          selectKey: 'id',
        }}
        // 取消全部选择
        onPageChange={() => {
          table.selection.unSelectAll()
        }}
        columns={columnsDeposit(option, setValue) as FormCol[]}
      />
    </React.Fragment>
  )
}
