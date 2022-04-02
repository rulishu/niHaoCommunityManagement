import React from 'react'
import { ProTable, useTable } from '@uiw-admin/components'
import { useDispatch } from 'react-redux'
import { Dispatch } from '@uiw-admin/models'
import { Notify } from 'uiw'
import { FormCol } from '@uiw-admin/components/lib/ProTable/types'
import { selectPage, searchValue } from '@/servers/ChargeManagement/ShopCharge'
import FormSelect from '../FormSelect'
import { columnsRout } from './item'

export default function Demo(props: {
  option: searchValue[]
  setValue: (e: any) => void
  updateData: (payload: any) => void
  onSearch: (e: any) => void
  searchParms: any
}) {
  const dispatch = useDispatch<Dispatch>()

  const { option, setValue, updateData, onSearch, searchParms } = props

  const table = useTable(selectPage, {
    query: (pageIndex, pageSize, searchValues) => {
      return {
        page: pageIndex,
        pageSize,
        code: searchValues.code || 0,
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
    if (!searchParms?.code)
      return Notify.warning({ description: '请先输入商铺进行搜索 !' })
    if (
      type === 'charge' &&
      Array.isArray(table?.selection?.selected) &&
      table.selection.selected.length === 0
    )
      return Notify.warning({ description: '请选择要缴费的数据 !' })
    if (type === 'charge') {
      const selected = table?.selection?.selected || []
      const ids = []
      const data = table?.data || []
      for (let i of selected) {
        const itemJson = data.find((item) => {
          return item.id === i
        })
        if (itemJson) ids.push(itemJson)
      }
      dispatch({
        type: 'shopCharge/getBuShopChargeData',
        payload: { ids: ids.map((item) => item?.id) },
      })
      updateData({ selectedList: ids })
    }
    updateData({ drawerType: type, drawerVisible: true, table })
  }

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
            onClick: () => onSearch(table),
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
        columns={columnsRout(option, setValue, searchParms) as FormCol[]}
      />
    </React.Fragment>
  )
}
