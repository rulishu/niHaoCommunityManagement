import React from 'react'
import { Modal } from 'uiw'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@uiw-admin/models'
import { deleteById } from '@/servers/usermanagement'
import { Notify } from 'uiw'
import useSWR from 'swr'

const Modals = (props: { onSearch: () => void }) => {
  const dispatch = useDispatch<Dispatch>()
  const {
    usermanagement: { delectVisible, systemId },
  } = useSelector((state: RootState) => state)

  const onClose = () => {
    dispatch({
      type: 'usermanagement/updateState',
      payload: {
        delectVisible: false,
      },
    })
  }

  const { mutate } = useSWR(
    [deleteById, { method: 'POST', body: { id: systemId } }],
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
    <Modal
      title="删除"
      isOpen={delectVisible}
      confirmText="确定按钮"
      cancelText="取消按钮"
      icon="information"
      type="primary"
      onConfirm={() => mutate()}
      onCancel={() => onClose()}
      onClosed={onClose}>
      <p>是否确认删除此条数据</p>
    </Modal>
  )
}
export default Modals
