import { ProDrawer, ProForm, useForm } from '@uiw-admin/components'
import { Notify } from 'uiw'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@uiw-admin/models'
import { insert, update } from '@/servers/BasicManage/ChargeManage'
import { items } from './items'
import useSWR from 'swr'
import { useState } from 'react'

interface State {
  drawerVisible?: boolean
  tableType?: string
  queryInfo?: object
  isView?: boolean
}

const Detail = (props: {
  updateData: (payload: State) => void
  onSearch: () => void
}) => {
  const baseRef = useForm()
  const dispatch = useDispatch<Dispatch>()
  const {
    ChargeManage: { drawerVisible, tableType, queryInfo, isView, loading },
  } = useSelector((ChargeManage: RootState) => ChargeManage)

  const {
    models: { statusList, standardList },
  } = useSelector((state: RootState) => state)

  const [hide, setHide] = useState(false)
  const onClose = () => {
    dispatch({
      type: 'ChargeManage/updateState',
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
          onClose()
          props.onSearch()
          dispatch({
            type: 'ChargeManage/updateState',
            payload: {
              loading: false,
            },
          })
        } else {
          Notify.error({ title: '提交失败！' })
          dispatch({
            type: 'ChargeManage/updateState',
            payload: {
              loading: false,
            },
          })
        }
      },
    }
  )
  const Change = (initial: any, current: any) => {
    if (current?.chargeType === '2' || current?.chargeType === '3') {
      setHide(true)
    }
    if (current?.chargeType === '1') {
      setHide(false)
    }

    props.updateData({
      queryInfo: {
        ...queryInfo,
        ...current,
        chargeType: current?.chargeType,
      },
    })
  }

  return (
    <ProDrawer
      width={800}
      title={
        tableType === 'add' ? '新增' : tableType === 'edit' ? '编辑' : '查看'
      }
      visible={drawerVisible}
      onClose={onClose}
      buttons={[
        {
          label: '取消',
          onClick: onClose,
          show: !isView,
        },
        {
          label: '保存',
          type: 'primary',
          style: { textAlign: 'right' },
          show: !isView,
          loading: loading,
          onClick: async () => {
            dispatch({
              type: 'ChargeManage/updateState',
              payload: {
                loading: true,
              },
            })
            await baseRef?.submitvalidate?.()
            const errors = baseRef.getError()
            if (errors && Object.keys(errors).length > 0) {
              dispatch({
                type: 'ChargeManage/updateState',
                payload: {
                  loading: false,
                },
              })
              const err: any = new Error()
              err.filed = errors
              // Notify.error({ title: '提交失败！' });
              throw err
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
        onChange={(initial, current) => {
          Change(initial, current)
        }}
        formDatas={items(queryInfo, tableType, statusList, standardList, hide)}
      />
    </ProDrawer>
  )
}

export default Detail
