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
    usermanagement: { drawerVisible, tableType, queryInfo, isView, loading },
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
          dispatch({
            type: 'usermanagement/updateState',
            payload: {
              loading: false,
            },
          })
        } else {
          Notify.error({ title: '提交失败！' })
          dispatch({
            type: 'usermanagement/updateState',
            payload: {
              loading: false,
            },
          })
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
          label: isView ? '关闭' : '取消',
          onClick: onClose,
          style: { width: 80 },
          show: !isView,
        },
        {
          label: '保存',
          type: 'primary',
          style: { width: 80 },
          show: !isView,
          loading: loading,
          onClick: async () => {
            dispatch({
              type: 'usermanagement/updateState',
              payload: {
                loading: true,
              },
            })
            await baseRef?.submitvalidate?.()
            const errors = baseRef.getError()
            if (errors && Object.keys(errors).length > 0) {
              dispatch({
                type: 'usermanagement/updateState',
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
        onChange={(initial, current) =>
          props.updateData({ queryInfo: { ...queryInfo, ...current } })
        }
        formDatas={items(queryInfo, isView)}
        readOnlyProps={{ column: 2 }}
      />
    </ProDrawer>
  )
}

export default Drawers
