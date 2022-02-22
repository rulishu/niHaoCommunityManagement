import React from 'react';
import { Modal } from 'uiw';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, Dispatch } from '@uiw-admin/models';
import { deleteData } from '@/servers/ChargeManagement/ShopCharge';
import { Notify } from 'uiw';
import useSWR from 'swr';

const Modals = () => {
  const dispatch = useDispatch<Dispatch>();
  const {
    shopCharge: { delectVisible, id, tableType },
  } = useSelector((state: RootState) => state);

  const onClose = () => {
    dispatch({
      type: 'shopCharge/updateState',
      payload: {
        delectVisible: false,
      },
    });
  };

  const { mutate } = useSWR([deleteData, { method: 'POST', body: { id } }], {
    revalidateOnMount: false,
    revalidateOnFocus: false,
    onSuccess: (data) => {
      if (data && data.code === 1) {
        Notify.success({ title: data.message });
        onClose();
      } else {
        Notify.error({ title: '提交失败！' });
      }
    },
  });

  return (
    <>
      {(tableType === '2' || tableType === '3') ?
        <Modal
          title="单条删除"
          isOpen={delectVisible}
          confirmText="确定按钮"
          cancelText="取消按钮"
          icon="information"
          type="primary"
          onConfirm={() => mutate()}
          onCancel={() => onClose()}
          onClosed={onClose}
        >
          <p>是否确认删除此条数据</p>
        </Modal>
        : ''}
    </>

  );
};
export default Modals;
