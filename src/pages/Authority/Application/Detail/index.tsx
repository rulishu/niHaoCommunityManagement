import { ProDrawer, ProForm, useForm } from '@uiw-admin/components'
import { Notify } from 'uiw'
import { useSelector } from 'react-redux'
import { RootState } from '@uiw-admin/models'
import { insert, update } from '@/servers/Authority/Application'
import { items } from './items'
import useSWR from 'swr'

interface State {
  drawerVisible?: boolean
  tableType?: string
  queryInfo?: object
  isView?: boolean
  tableVisible?: boolean
  thirdVisible?: boolean
  loading?: boolean
}

const Detail = (props: {
  updateData: (payload: State) => void
  onSearch: () => void
}) => {
  const baseRef = useForm()
  const {
    Application: {
      drawerVisible,
      tableType,
      queryInfo,
      isView,
      tableLevel,
      loading,
    },
  } = useSelector((Application: RootState) => Application)

  const onClose = () => {
    if (tableLevel === '1') {
      props.updateData({
        isView: false,
        drawerVisible: false,
        tableVisible: true,
      })
    } else if (tableLevel === '2') {
      props.updateData({
        isView: false,
        drawerVisible: false,
        thirdVisible: true,
      })
    } else {
      props.updateData({
        isView: false,
        drawerVisible: false,
      })
    }
  }

  const { mutate } = useSWR(
    [
      ((tableType === 'add' || tableType === 'addSecond') && insert) ||
        (tableType === 'edit' && update),
      { method: 'POST', body: queryInfo },
    ],
    {
      revalidateOnMount: false,
      revalidateOnFocus: false,
      onSuccess: (data) => {
        if (data && data.code === 1) {
          Notify.success({ title: data.message })
          props.updateData({
            drawerVisible: false,
            isView: false,
            tableVisible: false,
            thirdVisible: false,
          })
          props.onSearch()
          props.updateData({
            loading: false,
          })
        } else {
          Notify.error({ title: '提交失败！' })
          props.updateData({
            loading: false,
          })
        }
      },
    }
  )

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
          loading: loading,
          style: { textAlign: 'right' },
          show: !isView,
          onClick: async () => {
            props.updateData({
              loading: true,
            })
            await baseRef?.submitvalidate?.()
            const errors = baseRef.getError()
            if (errors && Object.keys(errors).length > 0) {
              props.updateData({
                loading: false,
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
        readOnlyProps={{ column: 2 }}
        buttonsContainer={{ justifyContent: 'flex-start' }}
        // 更新表单的值
        onChange={(initial, current) =>
          props.updateData({ queryInfo: { ...queryInfo, ...current } })
        }
        formDatas={items(queryInfo, isView)}
      />
    </ProDrawer>
  )
}

export default Detail
