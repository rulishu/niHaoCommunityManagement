import * as React from 'react'
import { Notify } from 'uiw'
import { ProTable, useTable } from '@uiw-admin/components'
import { FormCol } from '@uiw-admin/components/lib/ProTable/types'
import { searchValue } from '@/servers/ChargeManagement/ShopCharge'
import FormSelect from '../FormSelect'
import { columnsDeposit } from './item'

export default function Demo(props: {
  option: searchValue[]
  setValue: (e: any) => void
  updateData: (payload: any) => void
  onSearch: (payload: any) => void
}) {
  const { option, setValue, updateData, onSearch } = props

  const table = useTable('api/buDeposit/selectPage', {
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
    if (type === 'depositAdd' && !table?.searchValues?.code)
      return Notify.warning({ description: '请先输入商铺进行搜索 !' })
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
            onClick: () => onSearch(table),
          },
          {
            label: '重置',
            onClick: () => {
              table.onReset()
            },
          },
        ]}
        table={table}
        columns={columnsDeposit(option, setValue) as FormCol[]}
      />
    </React.Fragment>
  )
}
