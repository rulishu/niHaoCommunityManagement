import React from 'react'
import { ProTable, useTable } from '@uiw-admin/components'
import { Notify } from 'uiw'
import { FormCol } from '@uiw-admin/components/lib/ProTable/types'
import { searchValue } from '@/servers/ChargeManagement/ShopCharge'
import FormSelect from '../FormSelect'
import { columnsTem } from './item'

export default function Demo(props: {
  option: searchValue[]
  setValue: (e: any) => void
  updateData: (payload: any) => void
  onSearch: (payload: any) => void
  searchParms: any
}) {
  const { option, setValue, updateData, onSearch, searchParms } = props

  const table = useTable('/api/buTemporaryCharges/selectPage', {
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
  const handleEditTable = (type: string) => {
    if (!table?.searchValues?.code)
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
            onClick: () => handleEditTable('temAdd'),
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
        columns={columnsTem(option, setValue, searchParms) as FormCol[]}
      />
    </React.Fragment>
  )
}
