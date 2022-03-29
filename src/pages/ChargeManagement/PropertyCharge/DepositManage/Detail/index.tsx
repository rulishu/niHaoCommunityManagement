import React from 'react'
import { ProDrawer, ProForm, useForm } from '@uiw-admin/components'
import { Dispatch, RootState } from '@uiw-admin/models'
import { useDispatch, useSelector } from 'react-redux'
import { Notify } from 'uiw'
import useSWR from 'swr'
import { insert, update } from '@/servers/ChargeManagement/DepositManage'
import { items } from './items'
import formatter from '@uiw/formatter'

interface State {
  drawerVisible?: boolean
  tableType?: string
  queryInfo?: object
  isView?: boolean
}

const Drawer = (props: {
  updateData: (payload: State) => void
  onSearch: () => void
}) => {
  const baseRef = useForm()
  const dispatch = useDispatch<Dispatch>()
  const {
    DepositManage: { drawerVisible, tableType, queryInfo, isView },
  } = useSelector((state: RootState) => state)
  const [value, getValue] = React.useState(false)

  const onClose = () => {
    dispatch({
      type: 'DepositManage/updateState',
      payload: {
        drawerVisible: false,
        isView: false,
      },
    })
  }
  const { mutate } = useSWR(
    [
      (tableType === 'add' && insert) || (tableType === 'paied' && update),
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
        } else {
          Notify.error({ title: '提交失败！' })
        }
      },
    }
  )
  const onChange = (initial: any, current: any) => {
    if (current?.customerType === '1') {
      getValue(true)
    }
    if (current?.customerType === '2') {
      getValue(false)
    }
    props.updateData({
      queryInfo: {
        ...queryInfo,
        ...current,
        collectionTime:
          tableType === 'add'
            ? formatter('YYYY-MM-DD HH:mm:ss', current?.collectionTime)
            : null,
        refundTime:
          current?.refundTime &&
          formatter('YYYY-MM-DD HH:mm:ss', current?.refundTime),
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
          onClick: async () => {
            await baseRef?.submitvalidate?.()
            const errors = baseRef.getError()
            if (errors && Object.keys(errors).length > 0) return
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
        formDatas={items(queryInfo, value, tableType)}
      />
    </ProDrawer>
  )
}

export default Drawer
