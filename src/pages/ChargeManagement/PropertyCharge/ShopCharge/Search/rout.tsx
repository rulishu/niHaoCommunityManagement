import React from 'react'
import { ProTable, useTable } from '@uiw-admin/components'
import { FormCol } from '@uiw-admin/components/lib/ProTable/types'
// import { columnsRout } from './item'
import { selectPage } from '@/servers/ChargeManagement/ShopCharge'
import FormSelect from './FormSelect'
import Charge from '../Charge'
import History from '../History'
import { columnsRout } from '../Search/Items/itemTable'

export default function Demo() {
  const table = useTable(selectPage, {
    // 格式化接口返回的数据，必须返回{total 总数, data: 列表数据}的格式
    formatData: (data) => {
      return {
        total: data?.data?.total,
        data: data?.data?.rows || [],
      }
    },
    // 格式化查询参数 会接收到pageIndex 当前页  searchValues 表单数据
    query: (pageIndex, pageSize, searchValues) => {
      return {
        page: pageIndex,
        pageSize: 10,
        ...searchValues,
      }
    },
  })

  return (
    <React.Fragment>
      <ProTable
        bordered
        // 操作栏按钮
        operateButtons={[
          {
            render: <FormSelect />,
          },
        ]}
        table={table}
        rowSelection={{
          // 多选 checkbox 单选radio
          type: 'checkbox',
          // 选中的键名 column里的key
          selectKey: 'shouName',
          // 默认值
          defaultSelected: [],
        }}
        // 取消全部选择
        onPageChange={() => {
          table.selection.unSelectAll()
        }}
        columns={columnsRout() as FormCol[]}
      />

      <Charge onSearch={table.onSearch} />
      <History />
    </React.Fragment>
  )
}
