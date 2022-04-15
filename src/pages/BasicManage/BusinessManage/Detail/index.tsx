import { ProDrawer, ProForm, useForm } from '@uiw-admin/components'
import { Notify } from 'uiw'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@uiw-admin/models'
import { insert, update } from '@/servers/BasicManage/BusinessManage'
import { items } from './items'
import useSWR from 'swr'
import { useEffect } from 'react'
import formatter from '@uiw/formatter'

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
    BusinessManage: {
      drawerVisible,
      tableType,
      queryInfo,
      isView,
      loading,
      parentDivCodeList,
      cityCodeList,
      areaCodeList,
    },
  } = useSelector((BusinessManage: RootState) => BusinessManage)

  useEffect(() => {
    dispatch({
      type: 'BusinessManage/selectByParentCode',
      payload: {},
    })
  }, [dispatch])

  const onClose = () => {
    dispatch({
      type: 'BusinessManage/updateState',
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
          dispatch({
            type: 'BusinessManage/updateState',
            payload: {
              loading: false,
            },
          })
        } else {
          Notify.error({ title: '提交失败！' })
          dispatch({
            type: 'BusinessManage/updateState',
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
        createTime:
          current?.createTime &&
          formatter('YYYY-MM-DD HH:mm:ss', current?.createTime),
        updateTime:
          current?.createTime &&
          formatter('YYYY-MM-DD HH:mm:ss', current?.updateTime),
      },
    })
  }

  const setProvinceCodeValue = (value: string) => {
    dispatch({
      type: 'BusinessManage/selectByCityCodeList',
      payload: {
        areaCode: value,
      },
    })
  }
  const setCityCodeValue = (value: string) => {
    dispatch({
      type: 'BusinessManage/selectByAreaCodeList',
      payload: {
        areaCode: value,
      },
    })
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
          loading: loading,
          onClick: async () => {
            dispatch({
              type: 'BusinessManage/updateState',
              payload: {
                loading: true,
              },
            })
            await baseRef?.submitvalidate?.()
            const errors = baseRef.getError()
            if (errors && Object.keys(errors).length > 0) {
              dispatch({
                type: 'BusinessManage/updateState',
                payload: {
                  loading: true,
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
        formDatas={items(
          queryInfo,
          parentDivCodeList,
          cityCodeList,
          areaCodeList,
          setProvinceCodeValue,
          setCityCodeValue,
          dispatch
        )}
      />
    </ProDrawer>
  )
}

export default Detail
