import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@uiw-admin/models'
import { ProTable, useTable } from '@uiw-admin/components'
import { FormCol } from '@uiw-admin/components/lib/ProTable/types'
import { Notify } from 'uiw'
import formatter from '@uiw/formatter'
import { columns } from './item'
import './style.css'
export default function Index() {
  const dispatch = useDispatch<Dispatch>()

  const {
    shopCharges: { shopNoList, projectList },
  }: any = useSelector((state: RootState) => state)

  // 获取  所需商铺  常规收费项类
  useEffect(() => {
    dispatch({ type: 'shopCharges/shopSelectPage' })
    dispatch({ type: 'shopCharges/selectProject' })
  }, [dispatch])

  // table 显示查询
  const table = useTable('/api/buShopChargeData/selectPage', {
    query: (pageIndex, pageSize, searchValues) => {
      const payload = {
        ...searchValues,
        deadline: searchValues?.deadline,
        payment: searchValues?.payment,
        page: pageIndex,
        pageSize,
        deadlineBeginTime:
          searchValues?.deadline.length === 2
            ? formatter('YYYY-MM-DD', searchValues?.deadline[0])
            : '',
        deadlineEndTime:
          searchValues?.deadline.length === 2
            ? formatter('YYYY-MM-DD', searchValues?.deadline[1])
            : '',
        paymentBeginTime:
          searchValues?.payment.length === 2
            ? formatter('YYYY-MM-DD', searchValues?.payment[0])
            : '',
        paymentEndTime:
          searchValues?.payment.length === 2
            ? formatter('YYYY-MM-DD', searchValues?.payment[1])
            : '',
      }

      delete payload.deadline
      delete payload.payment
      return payload
    },
    formatData: (data) => {
      return {
        total: data?.data?.total || 0,
        data: data?.data?.rows || [],
      }
    },
  })

  // 查询
  const search = () => {
    const searchParms = table?.form?.current?.getFieldValues()
    // 时间判断是否填写完整
    if (
      Array.isArray(searchParms?.deadline) &&
      searchParms.deadline.length === 1
    )
      return Notify.warning({ title: '请填写截止时间！' })
    if (
      Array.isArray(searchParms?.deadline) &&
      searchParms.deadline.length === 2 &&
      new Date(formatter('YYYY-MM-DD', searchParms?.deadline[0])).getTime() >=
        new Date(formatter('YYYY-MM-DD', searchParms?.deadline[1])).getTime()
    )
      return Notify.warning({
        title: '请输入正确时间,开始时间不能小于等于结束时间',
      })
    if (Array.isArray(searchParms?.payment) && searchParms.payment.length === 1)
      return Notify.warning({ title: '请填写缴费时间！' })

    if (
      Array.isArray(searchParms?.payment) &&
      searchParms.payment.length === 2 &&
      new Date(formatter('YYYY-MM-DD', searchParms?.payment[0])).getTime() >=
        new Date(formatter('YYYY-MM-DD', searchParms?.payment[1])).getTime()
    )
      return Notify.warning({
        title: '请输入正确时间,开始时间不能小于等于结束时间',
      })
    table?.onSearch()
  }

  return (
    <div className="proTableBox">
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
            onClick: search,
          },
          {
            label: '重置',
            onClick: () => table?.onReset(),
          },
        ]}
        columns={columns(shopNoList, projectList) as FormCol<any>[]}
      />
    </div>
  )
}
