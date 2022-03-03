import React from 'react'
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
}

const Detail = (props: {
  updateData: (payload: State) => void
  onSearch: () => void
}) => {
  const baseRef = useForm()
  const {
    Application: { drawerVisible, tableType, queryInfo, isView, tableLevel },
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
      props.updateData({ isView: false, drawerVisible: false })
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
        } else {
          Notify.error({ title: '提交失败！' })
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
