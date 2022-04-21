import { useState, useEffect, useRef } from 'react'
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

  const [tyoeList, setTyoeList] = useState([])

  let dataList: any = useRef([])

  const {
    shopCharge: {
      drawerVisible,
      queryInfo,
      drawerType,
      payment,
      searchParms,
      detailed,
      selectedList,
      table,
      shopChargeList,
    },
  }: any = useSelector((state: RootState) => state)

  const onClose = () => {
    dispatch({ type: 'shopCharge/clean' })
    setTyoeList([])
    dataList.current = []
  }

  const rule = /(^[0-9]{1,100}$)|(^[0-9]{1,100}[\\.]{1}[0-9]{1,2}$)/

  const errorInfo = (errorObj: any, current: any) => {
    const arr = Object.keys(current)
    arr.forEach((element: any) => {
      if (
        !current[element] ||
        (Array.isArray(current[element]) && current[element].length === 0)
      ) {
        errorObj[element] = '此项不能为空'
      }
    })
  }
  // 验证
  const verification = (current: any) => {
    const errorObj: any = {}
    if (drawerType === 'charge') {
      if (!current?.shouldPaySum) errorObj.shouldPaySum = '实际应收不能为空'

      if (!current?.payMode) errorObj.payMode = '付款方式不能为空'

      if (current?.fund && !rule.test(current?.fund)) {
        errorObj.fund = '金额只能整数或保留2位小数'
      }
    } else if (drawerType === 'temAdd' || drawerType === 'depositAdd') {
      errorInfo(errorObj, current)
      if (current?.price && !rule.test(current?.price)) {
        errorObj.price = '金额只能整数或保留2位小数'
      }
    } else if (drawerType === 'storage') {
      errorInfo(errorObj, current)
      if (current?.chargeAmount && !rule.test(current?.chargeAmount)) {
        errorObj.chargeAmount = '金额只能整数或保留2位小数'
      }
    } else {
      errorInfo(errorObj, current)
    }
    if (Object.keys(errorObj).length > 0) {
      const err: any = new Error()
      err.filed = errorObj
      throw err
    }
  }

  const sendOut = (type: string, payload: any) =>
    (
      dispatch({
        type,
        payload,
      }) as any
    ).then((data: any) => {
      if (data?.code === 1) {
        onClose()
        typeof table?.onSearch === 'function' && table.onSearch()
        typeof table?.selection?.unSelectAll === 'function' &&
          table.selection.unSelectAll()
        Notify.success({ title: data?.message || '' })
      } else {
        Notify.error({ title: data?.message || '' })
      }
    })

  // 提交
  const onSubmit = (current: any) => {
    verification(current)
    // 添加零时收费
    if (drawerType === 'temAdd') {
      const payload = {
        ...current,
        code: String(current?.code),
        collectionTime: changeTimeFormat(current?.collectionTime),
      }
      sendOut('shopCharge/buTemporaryCharges', payload)
    }

    // 添加押金
    if (drawerType === 'depositAdd') {
      const payload = {
        code: String(current?.code),
        name: current?.name,
        collectionTime: changeTimeFormat(current?.collectionTime),
        project: current?.payService,
        paymentMethod: current?.payType,
        price: current?.price,
      }
      sendOut('shopCharge/getBuDeposit', payload)
    }

    // 预存
    if (drawerType === 'storage') {
      const payload = {
        ...current,
        code: String(current?.code),
        chargingTime: changeTimeFormat(current?.chargingTime),
      }
      sendOut('shopCharge/getBuAdvanceDeposit', payload)
    }

    if (drawerType === 'charge') {
      const payload = {
        fund: 0,
        chargeList: selectedList.map((item: any) => item?.id),
        type: tyoeList,
        ...current,
      }
      if (Number(payload?.sumByZero || 0) < 0)
        return Notify.warning({ title: '找零金额不能小于0' })

      if (Number(payload?.balanceByZero || 0) < 0)
        return Notify.warning({ title: '找零结转金额不能小于0' })
      console.log(payload, 'payload')
      // sendOut('shopCharge/getBuShopChargeDatapay', payload)
    }

    // 临时收费退款
    if (drawerType === 'details') {
      const payload = {
        ...current,
        refundTime: changeTimeFormat(current?.refundTime),
        id: queryInfo?.id,
        code: String(current?.code),
      }
      sendOut('shopCharge/getBuTemporaryChargesUpdate', payload)
    }

    if (drawerType === 'returnMoney') {
      const payload = {
        ...queryInfo,
        ...current,
        refundMethod: current?.refundType,
        refundTime: changeTimeFormat(current?.refundTime),
      }
      sendOut('shopCharge/getBuDepositUpdate', payload)
    }

    if (drawerType === 'return') {
      if (dataList.current.length === 0)
        return Notify.error({ title: '请填写退还金额' })
      if (
        dataList.current.some(
          (item: any) =>
            item?.refundAmount === null || item?.refundAmount === ''
        )
      ) {
        return Notify.error({ title: '请填写退还金额' })
      }
      if (
        dataList.current.some((item: any) => !rule.test(item?.refundAmount))
      ) {
        return Notify.error({ title: '金额只能整数或保留2位小数' })
      }

      if (
        dataList.current.some(
          (item: any) => Number(item?.refundAmount) > Number(item?.chargeAmount)
        )
      ) {
        return Notify.error({ title: '退还金额不可大于账户金额' })
      }
      const payload = {
        ...current,
        code: String(current?.code),
        refundTime: changeTimeFormat(current?.refundTime),
        refundAmount: dataList.current,
      }
      sendOut('shopCharge/getBuAdvanceDepositRefund', payload)
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
          <TableList obtain={dataList} />
          <div style={{ marginTop: 24 }}></div>
        </>
      )}
      {drawerType !== 'history' && (
        <ProForm
          form={form}
          formType="card"
          onSubmit={(_, current: Record<string, any>) => onSubmit(current)}
          // 更新表单的值
          onChange={(_, current: Record<string, any>) => {
            if (drawerType !== 'charge')
              updateData({ queryInfo: { ...queryInfo, ...current } })
          }}
          buttonsContainer={{ justifyContent: 'flex-start' }}
          formDatas={
            matching(
              drawerType,
              queryInfo,
              option,
              payment,
              searchParms,
              detailed,
              form,
              tyoeList,
              setTyoeList,
              shopChargeList
            ) as any
          }
        />
      )}
    </ProDrawer>
  )
}

export default Drawer
