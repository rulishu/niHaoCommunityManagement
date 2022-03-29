import React from 'react'
import { ProTable, useTable } from '@uiw-admin/components'
import { Notify } from 'uiw'
import { FormCol } from '@uiw-admin/components/lib/ProTable/types'
import { selectPage, searchValue } from '@/servers/ChargeManagement/ShopCharge'
import FormSelect from '../FormSelect'
import { columnsRout } from './item'

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
        total: data?.data?.total || 0,
        data: data?.data?.rows || [],
      }
    },
  })

  // 操作
  const handleEditTable = (type: string) => {
    if (
      type === 'charge' &&
      Array.isArray(table?.selection?.selected) &&
      table.selection.selected.length === 0
    )
      return Notify.warning({ description: '请选择要缴费的数据 !' })
    updateData({ drawerType: type, drawerVisible: true })
  }

  console.log(table, '[拥抱]')
  return (
    <React.Fragment>
      <ProTable
        table={table}
        bordered
        operateButtons={[
          {
            render: <FormSelect />,
          },
          {
            label: '收费',
            type: 'primary',
            onClick: () => handleEditTable('charge'),
          },
          {
            label: '历史信息',
            type: 'primary',
            onClick: () => handleEditTable('history'),
          },
        ]}
        searchBtns={[
          {
            label: '查询',
            type: 'primary',
            onClick: async () => {
              table.onSearch()
              // updateData({
              //   // @ts-ignorets-ignore
              //   searchValue: { ...table.form.current.getFieldValues() },
              // })
            },
          },
          {
            label: '重置',
            onClick: () => {
              table?.onReset()
            },
          },
        ]}
        rowSelection={{
          type: 'checkbox',
          selectKey: 'id',
        }}
        columns={columnsRout(option, setValue) as FormCol[]}
      />
    </React.Fragment>
  )
}
