import React from 'react'
import { ProDrawer, ProForm, useForm } from '@uiw-admin/components'
import { Notify } from 'uiw'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@uiw-admin/models'
import { update } from '@/servers/usermanagement'
import { items } from './items'
import useSWR from 'swr'

interface State {
  drawerVisible?: boolean
  tableType?: string
  queryInfo?: object
  isView?: boolean
}

const Drawers = (props: {
  updateData: (payload: State) => void
  onSearch: () => void
}) => {
  const baseRef = useForm()
  const dispatch = useDispatch<Dispatch>()
  const {
    usermanagement: { drawerVisible, tableType, queryInfo, isView },
  } = useSelector((usermanagement: RootState) => usermanagement)

  // const onClose = () => dispatch({ type: 'usermanagement/clean' });
  const onClose = () => {
    dispatch({
      type: 'usermanagement/updateState',
      payload: {
        drawerVisible: false,
        isView: false,
      },
    })
  }

  const { mutate } = useSWR(
    [tableType === 'edit' && update, { method: 'POST', body: queryInfo }],
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
      title="编辑"
      visible={drawerVisible}
      onClose={onClose}
      buttons={[
        {
          label: '保存',
          type: 'danger',
          style: { width: 80 },
          show: !isView,
          onClick: () => baseRef.submitvalidate(),
        },
      ]}>
      <ProForm
        title="基础信息"
        formType={isView ? 'pure' : 'card'}
        form={baseRef}
        readOnly={isView}
        onSubmit={(initial, current) => {
          initial
          current
          mutate()
        }}
        buttonsContainer={{ justifyContent: 'flex-start' }}
        // 更新表单的值
        onChange={(initial, current) =>
          props.updateData({ queryInfo: { ...queryInfo, ...current } })
        }
        formDatas={items(queryInfo)}
      />
    </ProDrawer>
  )
}

export default Drawers
