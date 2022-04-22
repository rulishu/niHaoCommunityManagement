import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@uiw-admin/models'
import { ProTable, useTable } from '@uiw-admin/components'
import { FormCol } from '@uiw-admin/components/lib/ProTable/types'
import { Notify, Alert, Button, Icon, Divider } from 'uiw'
import formatter from '@uiw/formatter'
import Drawer from './Drawer'
import { columns } from './item'
import './style.css'
export default function Index() {
  const dispatch = useDispatch<Dispatch>()

  const {
    shopCharges: { shopNoList, projectList, visible, queryInfo, loading },
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

  // 关闭 Alert
  const closeAlert = () => dispatch({ type: 'shopCharges/clean' })

  // 确定 Alert
  const onOk = () =>
    (
      dispatch({
        type: 'shopCharges/buShopChargeDataDelete',
        payload: { id: queryInfo?.id },
      }) as any
    ).then((data: any) => {
      if (data.code === 1) {
        closeAlert()
        table?.onSearch()
        Notify.success({ title: data?.message || '' })
      } else {
        dispatch({
          type: 'shopCharges/updateState',
          payload: { loading: false },
        })
        Notify.error({ title: data?.message || '' })
      }
    })

  return (
    <div className="proTableBox">
      <ProTable
        table={table}
        bordered
        operateButtons={[
          {
            label: '新增',
            type: 'primary',
            onClick: () => {
              dispatch({
                type: 'shopCharges/updateState',
                payload: { drawerVisible: true, drawerType: 'add', table },
              })
            },
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
        columns={columns(shopNoList, projectList, dispatch) as FormCol<any>[]}
      />
      <Alert
        isOpen={visible}
        type="danger"
        useButton={false}
        maskClosable={false}
        onClose={closeAlert}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          <Icon type="delete" style={{ marginRight: 12, color: 'red' }} />
          <div>是否确认删除 ～</div>
        </div>
        <div style={{ marginTop: 24 }}>
          <Button type="danger" onClick={onOk} loading={loading}>
            确定
          </Button>
          <Divider type="vertical" />
          <Button onClick={closeAlert} loading={loading}>
            取消
          </Button>
        </div>
      </Alert>
      <Drawer />
    </div>
  )
}
