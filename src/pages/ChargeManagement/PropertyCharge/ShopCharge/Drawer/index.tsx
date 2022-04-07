import { useState, useEffect } from 'react'
import {} from 'uiw'
import { ProDrawer, ProForm, useForm } from '@uiw-admin/components'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@uiw-admin/models'
import { Notify } from 'uiw'
import { searchValue } from '@/servers/ChargeManagement/ShopCharge'
import TableList from '../TableList'
import { drawerTitle, matching } from './item'
import { changeTimeFormat } from '@/utils'
interface DetailProps {
  updateData?: any
  option?: searchValue[]
}
const Drawer = ({ updateData, option }: DetailProps) => {
  const dispatch = useDispatch<Dispatch>()

  const form: any = useForm()

  const [show, setShow] = useState(false)
  const [tyoeList, setTyoeList] = useState([])

  const {
    shopCharge: {
      drawerVisible,
      queryInfo,
      drawerType,
      payment,
      payService,
      searchParms,
      detailed,
      selectedList,
      table,
    },
  }: any = useSelector((state: RootState) => state)

  const onClose = () => {
    dispatch({ type: 'shopCharge/clean' })
    setShow(false)
    setTyoeList([])
  }

  // 验证
  const verification = (current: any) => {
    if (current?.chargeltem === '2') {
      delete current.payService
    }
    const errorObj: any = {}
    const arr = Object.keys(current)
    arr.forEach((element: any) => {
      if (drawerType === 'charge') {
        if (!current?.shouldPaySum) {
          errorObj.shouldPaySum = '实际应收不能为空'
        }
        if (!current?.payMode) {
          errorObj.payMode = '付款方式不能为空'
        }
        if (Number(current?.sumByZero < 0)) {
          errorObj.sumByZero = '找零金额不能小于0'
        }
        if (Number(current?.balanceByZero < 0)) {
          errorObj.balanceByZero = '找零结转金额不能小于0'
        }
      } else if (
        !current[element] ||
        (Array.isArray(current[element]) && current[element].length === 0)
      ) {
        errorObj[element] = '此项不能为空'
      }
    })
    if (Object.keys(errorObj).length > 0) {
      const err: any = new Error()
      err.filed = errorObj
      throw err
    }
  }
  // 提交
  const onSubmit = (current: any) => {
    verification(current)
    // 添加零时收费
    if (drawerType === 'temAdd')
      (
        dispatch({
          type: 'shopCharge/buTemporaryCharges',
          payload: {
            ...current,
            code: current?.code[0],
            payService: current?.payService[0]?.value,
            payType: current?.payType[0]?.value,
            collectionTime: changeTimeFormat(current?.collectionTime),
          },
        }) as any
      ).then((data: any) => {
        if (data?.code === 1) {
          onClose()
          table.onSearch()
          Notify.success({ title: data?.message || '' })
        } else {
          Notify.error({ title: data?.message || '' })
        }
      })

    // 添加押金
    if (drawerType === 'depositAdd')
      (
        dispatch({
          type: 'shopCharge/getBuDeposit',
          payload: {
            code: current?.code[0],
            name: current?.name,
            collectionTime: changeTimeFormat(current?.collectionTime),
            project: current?.payService[0]?.value,
            paymentMethod: current?.payType[0]?.value,
            price: current?.price,
          },
        }) as any
      ).then((data: any) => {
        if (data?.code === 1) {
          onClose()
          table.onSearch()
          Notify.success({ title: data?.message || '' })
        } else {
          Notify.error({ title: data?.message || '' })
        }
      })

    // 预存
    if (drawerType === 'storage') {
      const payload = {
        ...current,
        code: current?.code[0],
        chargeltem: Number(current?.chargeltem),
        chargingTime: changeTimeFormat(current?.chargingTime),
      }
      if (payload.chargeltem === 2) {
        delete payload.payService
      }
      ;(
        dispatch({
          type: 'shopCharge/getBuAdvanceDeposit',
          payload,
        }) as any
      ).then((data: any) => {
        if (data?.code === 1) {
          onClose()
          Notify.success({ title: data?.message || '' })
        } else {
          Notify.error({ title: data?.message || '' })
        }
      })
    }

    if (drawerType === 'charge') {
      const payload = {
        fund: 0,
        chargeList: selectedList.map((item: any) => item?.id),
        type: tyoeList,
        ...current,
      }
      ;(
        dispatch({
          type: 'shopCharge/getBuShopChargeDatapay',
          payload,
        }) as any
      ).then((data: any) => {
        if (data?.code === 1) {
          onClose()
          table.onSearch()
          table.selection.unSelectAll()
          Notify.success({ title: data?.message || '' })
        } else {
          Notify.error({ title: data?.message || '' })
        }
      })
    }

    // 临时收费退款
    if (drawerType === 'details') {
      const payload = {
        ...current,
        refundTime: changeTimeFormat(current?.refundTime),
        id: queryInfo?.id,
        code: String(current?.code),
      }
      ;(
        dispatch({
          type: 'shopCharge/getBuTemporaryChargesUpdate',
          payload,
        }) as any
      ).then((data: any) => {
        if (data?.code === 1) {
          onClose()
          table.onSearch()
          table.selection.unSelectAll()
          Notify.success({ title: data?.message || '' })
        } else {
          Notify.error({ title: data?.message || '' })
        }
      })
    }
    if (drawerType === 'returnMoney') {
      const payload = {
        ...queryInfo,
        ...current,
        refundMethod: current?.refundType,
        refundTime: changeTimeFormat(current?.refundTime),
      }
      ;(
        dispatch({
          type: 'shopCharge/getBuDepositUpdate',
          payload,
        }) as any
      ).then((data: any) => {
        if (data?.code === 1) {
          onClose()
          table.onSearch()
          table.selection.unSelectAll()
          Notify.success({ title: data?.message || '' })
        } else {
          Notify.error({ title: data?.message || '' })
        }
      })
    }
  }
  useEffect(() => {
    if (drawerType === 'charge') {
      if (
        queryInfo?.shouldPaySum &&
        !queryInfo?.type &&
        !queryInfo?.fund &&
        !queryInfo?.payType &&
        !queryInfo?.payMode
      ) {
        if (typeof form.setFields === 'function') {
          form.setFields({
            preBunt: queryInfo?.preBunt,
            shouldPaySum: queryInfo?.shouldPaySum,
            sumByZero: 0 - queryInfo?.shouldPaySum,
          })
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryInfo])
  return (
    <ProDrawer
      width={1000}
      title={drawerTitle(drawerType)}
      visible={drawerVisible}
      onClose={onClose}
      buttons={[
        {
          label:
            drawerType === 'history' || drawerType === 'see' ? '关闭' : '保存',
          type: 'primary',
          style: { width: 80 },
          onClick: () => {
            if (drawerType === 'history' || drawerType === 'see')
              return onClose()
            form.submitvalidate()
          },
        },
      ]}
    >
      {(drawerType === 'charge' ||
        drawerType === 'history' ||
        drawerType === 'return') && (
        <>
          <TableList />
          <div style={{ marginTop: 24 }}></div>
        </>
      )}
      {drawerType !== 'history' && (
        <ProForm
          form={form}
          formType="card"
          onSubmit={(_, current: Record<string, any>) => onSubmit(current)}
          // 更新表单的值
          onChange={async (_, current: Record<string, any>) => {
            updateData({ queryInfo: { ...queryInfo, ...current } })
          }}
          buttonsContainer={{ justifyContent: 'flex-start' }}
          formDatas={
            matching(
              drawerType,
              queryInfo,
              option,
              payment,
              payService,
              searchParms,
              detailed,
              show,
              setShow,
              form,
              tyoeList,
              setTyoeList
            ) as any
          }
        />
      )}
    </ProDrawer>
  )
}

export default Drawer
