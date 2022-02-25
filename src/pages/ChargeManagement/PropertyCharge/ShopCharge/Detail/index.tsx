import React from 'react'
import { ProDrawer, ProForm, useForm } from '@uiw-admin/components'
import { Notify } from 'uiw'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@uiw-admin/models'
import { insert, update } from '@/servers/ChargeManagement/ShopCharge'
import useSWR from 'swr'

interface State {
  drawerVisible?: boolean
  tableType?: string
  queryInfo?: object
  isView?: boolean
}

const Detail = (props: {
  updateData: (payload: State) => void
  onSearch: () => void
  title?: string
  formDatas: Array<any>
}) => {
  const baseRef = useForm()
  const dispatch = useDispatch<Dispatch>()
  const {
    shopCharge: { drawerVisible, tableType, queryInfo },
  } = useSelector((shopCharge: RootState) => shopCharge)

  const onClose = () => {
    dispatch({
      type: 'shopCharge/updateState',
      payload: {
        drawerVisible: false,
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
          onClose()
          props.onSearch()
        } else {
          Notify.error({ title: '提交失败！' })
        }
      },
    }
  )

  return (
    <ProDrawer
      width={800}
      title={props.title}
      visible={drawerVisible}
      onClose={onClose}
      buttons={[
        {
          label: '保存',
          type: 'primary',
          style: { textAlign: 'right' },
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
        formType={'pure'}
        form={baseRef}
        buttonsContainer={{ justifyContent: 'flex-start' }}
        // 更新表单的值
        onChange={(initial, current) =>
          props.updateData({ queryInfo: { ...queryInfo, ...current } })
        }
        formDatas={props.formDatas}
      />
    </ProDrawer>
  )
}

export default Detail
