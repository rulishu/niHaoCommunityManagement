import * as React from 'react'
import { Notify } from 'uiw'
import { ProTable, useTable } from '@uiw-admin/components'
import { FormCol } from '@uiw-admin/components/lib/ProTable/types'
import { searchValue } from '@/servers/ChargeManagement/ShopCharge'
import FormSelect from '../FormSelect'
import { columnsAdvance } from './item'

export default function Demo(props: {
  option: searchValue[]
  setValue: (e: any) => void
  updateData: (payload: any) => void
  onSearch: (payload: any) => void
  searchParms: any
}) {
  const { option, setValue, updateData, onSearch, searchParms } = props

  const table = useTable('api/buAdvanceDeposit/selectPage', {
    query: (pageIndex, pageSize, searchValues) => {
      return {
        page: pageIndex,
        pageSize,
        id: String(searchValues.code || ''),
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
    if (!searchParms?.code || !String(searchParms?.code))
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
            label: '预存',
            type: 'primary',
            onClick: () => handleEditTable('storage'),
          },
          {
            label: '退还',
            type: 'primary',
            onClick: () => handleEditTable('return'),
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
        rowSelection={{
          type: 'checkbox',
          selectKey: 'id',
        }}
        columns={columnsAdvance(option, setValue, searchParms) as FormCol[]}
      />
    </React.Fragment>
  )
}
