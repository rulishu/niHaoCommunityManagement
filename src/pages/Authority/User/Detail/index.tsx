import React from 'react'
import { ProDrawer, ProForm, useForm } from '@uiw-admin/components'
import { Notify, List, Switch } from 'uiw'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@uiw-admin/models'
import { update } from '@/servers/Authority/User'
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
    User: { drawerVisible, tableType, queryInfo, isView, roleList },
  } = useSelector((User: RootState) => User)

  const onClose = () => {
    dispatch({
      type: 'User/updateState',
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
  // const onChange = (value: React.ChangeEvent<HTMLInputElement>, item: any) => {
  //   console.log('onChange--->checked', value.target.checked);
  //   console.log('item', item);
  // }

  return (
    <ProDrawer
      width={tableType === 'edit' ? 500 : 800}
      title={tableType === 'edit' ? '角色授权' : '查看'}
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
      {tableType === 'view' ? (
        <ProForm
          title="基础信息"
          formType={isView ? 'pure' : 'card'}
          form={baseRef}
          readOnly={isView}
          buttonsContainer={{ justifyContent: 'flex-start' }}
          // 更新表单的值
          onChange={(initial, current) =>
            props.updateData({ queryInfo: { ...queryInfo, ...current } })
          }
          formDatas={items(queryInfo)}
        />
      ) : (
        <List>
          {roleList.map((item, index) => {
            return (
              <List.Item key={index} extra={<Switch />}>
                {item.roleName}
              </List.Item>
            )
          })}
        </List>
      )}
    </ProDrawer>
  )
}

export default Detail
