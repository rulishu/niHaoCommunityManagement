import * as React from 'react'
import { ProTable, useTable } from '@uiw-admin/components'
import { FormCol } from '@uiw-admin/components/lib/ProTable/types'
import { selectPage, searchValue } from '@/servers/ChargeManagement/ShopCharge'
import FormSelect from './FormSelect'
import Charge from '../Charge'
import History from '../History'
import { columnsRout } from '../Search/Items/itemTable'

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
    // if (type === 'charge') {
    //   updateData({
    //     drawerVisible: true,
    //     queryInfo: {},
    //   })
    // }
    // if (type === 'edit') {
    //   updateData({
    //     drawerVisible: true,
    //     queryInfo: { ...data },
    //   })
    // }
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
            label: '收费',
            type: 'primary',
            onClick: () => handleEditTable('charge'),
          },
          {
            label: '历史信息',
            type: 'primary',
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
        columns={columnsRout(option, setValue) as FormCol[]}
      />

      <Charge onSearch={table.onSearch} />
      <History />
    </React.Fragment>
  )
}
