import { ProDrawer, ProForm, useForm } from '@uiw-admin/components'
import { Notify } from 'uiw'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@uiw-admin/models'
import {
  addType,
  addDictValue,
  editType,
  editDict,
} from '@/servers/DictionaryManagement/DictionaryManagement'
import { items, items2 } from './items'
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
    DictionaryManagement: {
      drawerVisible,
      tableType,
      queryInfo,
      isView,
      loading,
      addTypeList,
    },
  } = useSelector((DictionaryManagement: RootState) => DictionaryManagement)

  const onClose = () => {
    dispatch({
      type: 'DictionaryManagement/updateState',
      payload: {
        drawerVisible: false,
        isView: false,
      },
    })
  }

  const { mutate } = useSWR(
    [
      (tableType === 'addType' && addType) ||
        (tableType === 'addValue' && addDictValue) ||
        (tableType === 'editType' && editType) ||
        (tableType === 'editValue' && editDict),
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
            type: 'DictionaryManagement/updateState',
            payload: {
              loading: false,
            },
          })
        } else {
          Notify.error({ title: '提交失败！' })
          dispatch({
            type: 'DictionaryManagement/updateState',
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
      title={
        tableType === 'addType'
          ? '新增字典类型'
          : tableType === 'addValue'
          ? '新增字典项'
          : tableType === 'editType'
          ? '编辑字典类型'
          : tableType === 'editValue'
          ? '编辑字典项'
          : '查看'
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
              type: 'DictionaryManagement/updateState',
              payload: {
                loading: true,
              },
            })
            await baseRef?.submitvalidate?.()
            const errors = baseRef.getError()
            if (errors && Object.keys(errors).length > 0) {
              dispatch({
                type: 'DictionaryManagement/updateState',
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
        formDatas={
          tableType === 'addType'
            ? items(queryInfo, tableType)
            : tableType === 'editType'
            ? items(queryInfo, tableType)
            : items2(queryInfo, addTypeList, tableType)
        }
      />
    </ProDrawer>
  )
}

export default Detail
