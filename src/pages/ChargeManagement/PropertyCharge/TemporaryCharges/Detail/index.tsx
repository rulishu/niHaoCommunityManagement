import React from 'react';
import { ProDrawer, ProForm, useForm } from '@uiw-admin/components';
import { Dispatch, RootState } from '@uiw-admin/models';
import { useDispatch, useSelector } from 'react-redux'
import { Notify } from 'uiw';
import useSWR from 'swr';
import { insert, update } from '@/servers/ChargeManagement/temporaryCharges'
import { items } from './items';
interface State {
  drawerVisible?: boolean;
  tableType?: string;
  queryInfo?: object;
  isView?: boolean;
}

const Drawer = (props: { updateData: (payload: State) => void }) => {
  const baseRef = useForm();
  const dispatch = useDispatch<Dispatch>();
  const {
    temporaryCharges: { drawerVisible, tableType, queryInfo, isView },
  } = useSelector((state: RootState) => state);

  const onClose = () => {
    dispatch({
      type: 'temporaryCharges/updateState',
      payload: {
        drawerVisible: false,
        isView: false,
      },
    });
  }
  const { mutate } = useSWR(
    [(tableType === 'add' && insert) || (tableType === 'edit' && update), { method: 'POST', body: queryInfo }],
    {
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
    },
  );
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
          show: !isView
        },
        {
          label: '保存',
          type: "primary",
          onClick: () => baseRef.submitvalidate(),
          show: !isView
        },
      ]}
    >
      <ProForm
        title="基础信息"
        formType={isView ? 'pure' : 'card'}
        form={baseRef}
        readOnly={isView}
        onSubmit={(initial, current) => {
          initial;
          current;
          mutate();
        }}
        buttonsContainer={{ justifyContent: 'flex-start' }}
        // 更新表单的值
        onChange={(initial: any, current: any) => props.updateData({ queryInfo: { ...queryInfo, ...current } })}
        formDatas={items(queryInfo)}
      />
    </ProDrawer>
  )
}

export default Drawer