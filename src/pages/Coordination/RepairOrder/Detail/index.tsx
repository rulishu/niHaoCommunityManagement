import React from 'react'
import { ProDrawer, ProForm, useForm } from '@uiw-admin/components'
import { Notify, Button } from 'uiw'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@uiw-admin/models'
import { insert, update } from '@/servers/Coordination/RepairOrder'
import { items } from './items'
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
}) => {
  const baseRef = useForm()
  const dispatch = useDispatch<Dispatch>()
  const {
    RepairOrder: { drawerVisible, tableType, queryInfo, isView, butType },
  } = useSelector((RepairOrder: RootState) => RepairOrder)

  const onClose = () => {
    dispatch({
      type: 'RepairOrder/updateState',
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
        } else {
          Notify.error({ title: '提交失败！' })
        }
      },
    }
  )

  const onEdit = (butType: string) => {
    dispatch({
      type: 'RepairOrder/updateState',
      payload: {
        butType,
      },
    })
  }

  const Btns = () => {
    return (
      <div>
        {butType === '1' ? <Button type="primary" onClick={() => onEdit('1')}>公司派遣</Button> : <Button onClick={() => onEdit('1')}>公司派遣</Button>}
        {butType === '2' ? <Button type='primary' onClick={() => onEdit('2')}>业主报修</Button> : <Button onClick={() => onEdit('2')}>业主报修</Button>}
        {butType === '3' ? <Button type='primary' onClick={() => onEdit('3')}>小程序报修</Button> : <Button onClick={() => onEdit('3')}>小程序报修</Button>}
      </div>
    )
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
        formType={'card'}
        form={baseRef}
        readOnly={isView}
        customWidgetsList={{
          btns: Btns,
        }}
        buttonsContainer={{ justifyContent: 'flex-start' }}
        // 更新表单的值
        onChange={(initial, current) =>
          props.updateData({ queryInfo: { ...queryInfo, ...current } })
        }
        formDatas={items(queryInfo, butType)}
      />
    </ProDrawer>
  )
}

export default Detail
