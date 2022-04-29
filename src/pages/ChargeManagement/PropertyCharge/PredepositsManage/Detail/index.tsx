import { ProDrawer, ProForm, useForm } from '@uiw-admin/components'
import { Dispatch, RootState } from '@uiw-admin/models'
import { useDispatch, useSelector } from 'react-redux'
import { Notify, Table } from 'uiw'
import useSWR from 'swr'
import { insert, update } from '@/servers/ChargeManagement/PredepositsManage'
import { items, backList } from './items'
import { FormCol } from '@uiw-admin/components/lib/ProTable/types'
import formatter from '@uiw/formatter'
import { useEffect } from 'react'

export interface State {
  drawerVisible?: boolean
  tableType?: string
  queryInfo?: object
  isView?: boolean
  code?: string
  refundAmountList?: any
  buChargesList?: any
}

const Drawer = (props: {
  updateData: (payload: State) => void
  onSearch: () => void
}) => {
  const baseRef = useForm()
  const dispatch = useDispatch<Dispatch>()

  useEffect(() => {
    dispatch({
      type: 'PredepositsManage/selectShopList',
    })
  }, [dispatch])

  const {
    PredepositsManage: {
      drawerVisible,
      tableType,
      queryInfo,
      isView,
      loading,
      code,
      buChargesList,
      dataList,
      refundAmountList,
    },
  } = useSelector((state: RootState) => state)

  const {
    models: { paysList },
  } = useSelector((state: RootState) => state)

  const setValue = (value: string) => {
    tableType === 'edit' &&
      dispatch({
        type: 'PredepositsManage/selectAdvanceDepostAmountByCode',
        payload: {
          code: value,
        },
      })
  }
  const onClose = () => {
    dispatch({
      type: 'PredepositsManage/updateState',
      payload: {
        drawerVisible: false,
        isView: false,
      },
    })
  }

  const { mutate } = useSWR(
    [
      (tableType === 'add' && insert) || (tableType === 'edit' && update),
      {
        method: 'POST',
        body:
          tableType === 'add'
            ? queryInfo
            : { ...queryInfo, refundAmount: refundAmountList },
      },
    ],
    {
      revalidateOnMount: false,
      revalidateOnFocus: false,
      onSuccess: (data) => {
        if (data && data.code === 1) {
          Notify.success({ title: data.message })
          props.onSearch()
          onClose()
          dispatch({
            type: 'PredepositsManage/updateState',
            payload: {
              loading: false,
            },
          })
        } else {
          Notify.error({ title: data.message })
          dispatch({
            type: 'PredepositsManage/updateState',
            payload: {
              loading: false,
            },
          })
        }
      },
    }
  )

  const onChange = (initial: any, current: any) => {
    dataList &&
      dataList.forEach((itm: any) => {
        let buChargesList: any = []
        if (itm?.code === current?.code) {
          current.name = itm?.userName
          buChargesList = itm.chargeList.map((itm: any) => ({
            label: itm.chargeName,
            value: itm.id.toString(),
          }))
          props.updateData({
            buChargesList: buChargesList,
          })
        }
      })
    props.updateData({
      queryInfo: {
        ...queryInfo,
        ...current,
        chargingTime:
          tableType === 'add'
            ? formatter('YYYY-MM-DD HH:mm:ss', current?.chargingTime)
            : null,
        refundTime:
          tableType === 'edit'
            ? formatter('YYYY-MM-DD HH:mm:ss', current?.refundTime)
            : null,
      },
    })
  }

  return (
    <ProDrawer
      title="基础信息"
      visible={drawerVisible}
      onClose={onClose}
      width={800}
      buttons={[
        {
          label: '取消',
          onClick: onClose,
          show: !isView,
        },
        {
          label: '保存',
          type: 'primary',
          show: !isView,
          loading: loading,
          onClick: async () => {
            dispatch({
              type: 'PredepositsManage/updateState',
              payload: {
                loading: true,
              },
            })
            await baseRef?.submitvalidate?.()
            const errors = baseRef.getError()
            if (errors && Object.keys(errors).length > 0) {
              dispatch({
                type: 'PredepositsManage/updateState',
                payload: {
                  loading: false,
                },
              })
              return
            }
            mutate()
          },
        },
      ]}
    >
      <ProForm
        title="基础信息"
        formType={isView ? 'pure' : 'card'}
        form={baseRef}
        readOnly={isView}
        buttonsContainer={{ justifyContent: 'flex-start' }}
        onSubmit={(_, current: Record<string, any>) => {
          const errorObj: Partial<any> = {}
          if (tableType === 'add') {
            if (!current?.code) {
              errorObj.code = '此项不能为空'
            } else if (!current?.name) {
              errorObj.name = '此项不能为空'
            } else if (!current?.payService) {
              errorObj.payService = '此项不能为空'
            } else if (!current?.paymentMethod) {
              errorObj.paymentMethod = '此项不能为空'
            } else if (!current?.chargeName) {
              errorObj.chargeName = '此项不能为空'
            } else if (!current?.chargeAmount) {
              errorObj.chargeAmount = '此项不能为空'
            } else if (!current?.chargingTime) {
              errorObj.chargingTime = '此项不能为空'
            }
          }

          if (tableType === 'edit') {
            if (!current?.code) {
              errorObj.code = '此项不能为空'
            } else if (!current?.name) {
              errorObj.name = '此项不能为空'
            } else if (!current?.refundWay) {
              errorObj.refundWay = '此项不能为空'
            } else if (!current?.refundTime) {
              errorObj.refundTime = '此项不能为空'
            }
          }

          if (Object.keys(errorObj).length > 0) {
            const err: any = new Error()
            err.filed = errorObj
            throw err
          }
        }}
        // 更新表单的值
        onChange={(initial, current) => onChange(initial, current)}
        formDatas={items(
          queryInfo,
          tableType,
          baseRef,
          code,
          buChargesList,
          paysList,
          dataList,
          setValue
        )}
      />

      {tableType === 'edit' && (
        <Table
          bordered
          columns={backList() as FormCol[]}
          data={refundAmountList}
        />
      )}
    </ProDrawer>
  )
}

export default Drawer
