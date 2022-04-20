import { ProTable, useTable } from '@uiw-admin/components'
import { FormCol } from '@uiw-admin/components/lib/ProTable/types'
import { columns } from './item'
export default function Index() {
  const table = useTable('/add', {
    query: (pageIndex, pageSize, searchValues) => {
      return {
        page: pageIndex,
        pageSize,
        code: String(searchValues?.code || ''),
      }
    },
    formatData: (data) => {
      return {
        total: data?.data?.total || 0,
        data: data?.data?.rows || [],
      }
    },
  })

  return (
    <>
      <ProTable
        table={table}
        bordered
        operateButtons={[
          {
            label: '新增',
            type: 'primary',
          },
          {
            label: '批量新增',
            type: 'primary',
          },
        ]}
        searchBtns={[
          {
            label: '查询',
            type: 'primary',
            onClick: () => {
              const searchParms = table?.form?.current?.getFieldValues()
              console.log(searchParms, 'searchParms')
              table?.onSearch()
            },
          },
          {
            label: '重置',
            onClick: () => table?.onReset(),
          },
        ]}
        columns={columns() as FormCol<any>[]}
      />
    </>
  )
}
