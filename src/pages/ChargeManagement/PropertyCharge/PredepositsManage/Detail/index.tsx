import React from 'react'
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
    },
  } = useSelector((state: RootState) => state)

  const {
    models: { paysList },
  } = useSelector((state: RootState) => state)

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
      { method: 'POST', body: queryInfo },
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
          Notify.error({ title: '提交失败！' })
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
    props.updateData({
      queryInfo: {
        ...queryInfo,
        ...current,
        chargingTime: formatter('YYYY-MM-DD HH:mm:ss', current?.chargingTime),
        refundTime:
          tableType === 'edit'
            ? formatter('YYYY-MM-DD HH:mm:ss', current?.refundTime)
            : null,
      },
    })
  }
  const onChangeItem = async (text: React.ChangeEvent<HTMLInputElement>) => {
    // console.log('text.target.value', text.target.value)
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
        // 更新表单的值
        onChange={(initial, current) => onChange(initial, current)}
        formDatas={items(
          queryInfo,
          tableType,
          baseRef,
          code,
          buChargesList,
          paysList,
          dataList
        )}
      />

      {tableType === 'edit' && (
        <Table
          bordered
          columns={backList(onChangeItem) as FormCol[]}
          data={dataList && dataList[0]?.chargeList}
        />
      )}
    </ProDrawer>
  )
}

export default Drawer
