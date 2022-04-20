import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@uiw-admin/models'
import { ProTable, useTable } from '@uiw-admin/components'
import { FormCol } from '@uiw-admin/components/lib/ProTable/types'
import { Notify } from 'uiw'
import { columns } from './item'
export default function Index() {
  const dispatch = useDispatch<Dispatch>()

  const {
    shopCharges: { shopNoList },
  }: any = useSelector((state: RootState) => state)

  // 获取查询所需商铺
  useEffect(() => {
    dispatch({ type: 'shopCharges/shopSelectPage' })
  }, [dispatch])

  // table 显示查询
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
              // 时间判断是否填写完整
              if (
                Array.isArray(searchParms?.dateInputsecond) &&
                searchParms.dateInputsecond.length === 1
              )
                return Notify.warning({ title: '请填写截止时间！' })
              if (
                Array.isArray(searchParms?.dateInputsecond1) &&
                searchParms.dateInputsecond1.length === 1
              )
                return Notify.warning({ title: '请填写缴费时间！' })

              console.log(searchParms, 'searchParms')
              table?.onSearch()
            },
          },
          {
            label: '重置',
            onClick: () => table?.onReset(),
          },
        ]}
        columns={columns(shopNoList) as FormCol<any>[]}
      />
    </>
  )
}
