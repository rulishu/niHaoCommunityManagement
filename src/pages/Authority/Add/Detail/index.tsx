import { ProDrawer, ProForm, useForm } from '@uiw-admin/components'
import { Dispatch, RootState } from '@uiw-admin/models'
import { useDispatch, useSelector } from 'react-redux'
import { Notify } from 'uiw'
import useSWR from 'swr'
import { insert, update } from '@/servers/Authority/Add'
import { items } from './items'
import { TitleInfo } from '@/utils'
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
    Add: { drawerVisible, tableType, queryInfo, isView, loading },
    models: { txtInfo },
  } = useSelector((state: RootState) => state)

  const onClose = () => {
    dispatch({
      type: 'Add/updateState',
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
          props.onSearch()
          onClose()
          dispatch({
            type: 'Add/updateState',
            payload: {
              loading: false,
            },
          })
        } else {
          Notify.error({ title: '提交失败！' })
          dispatch({
            type: 'Add/updateState',
            payload: {
              loading: false,
            },
          })
        }
      },
    }
  )
  const onChange = (initial: any, current: any) => {
    props.updateData({
      queryInfo: {
        ...queryInfo,
        ...current,
      },
    })
  }

  return (
    <ProDrawer
      title={TitleInfo(txtInfo)}
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
          loading: loading,
          onClick: async () => {
            dispatch({
              type: 'Add/updateState',
              payload: {
                loading: true,
              },
            })
            await baseRef?.submitvalidate?.()
            const errors = baseRef.getError()
            if (errors && Object.keys(errors).length > 0) {
              dispatch({
                type: 'Add/updateState',
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
        onChange={(initial, current) => onChange(initial, current)}
        formDatas={items(queryInfo)}
      />
    </ProDrawer>
  )
}

export default Drawer
