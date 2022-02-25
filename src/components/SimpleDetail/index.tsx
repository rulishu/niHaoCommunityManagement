import React from 'react'
import { ProDrawer, ProForm, useForm } from '@uiw-admin/components'
import { Notify } from 'uiw'
import { useSelector } from 'react-redux'
import { RootState } from '@uiw-admin/models'
import useSWR from 'swr'

const Detail = (props: {
  // 更新表单的值
  onChange: (initial: Record<string, any>, current: Record<string, any>) => void
  //ProTable更新
  onSearch: () => void
  //抽屉标题
  title?: string
  //表单数据
  formDatas?: Array<any>
  //新增接口地址
  insert?: string
  //更新接口地址
  update?: string
  //表单是否只读
  readOnly: boolean
  //关闭抽屉
  onClose: () => void
}) => {
  const baseRef = useForm()
  const {
    shopCharge: { drawerVisible, btnStatus, queryInfo },
  } = useSelector((shopCharge: RootState) => shopCharge)

  const {
    onChange,
    onSearch,
    onClose,
    title = '',
    formDatas = [],
    insert = '',
    update = '',
    readOnly = false,
  } = props

  //btnStatus判断接口地址
  const { mutate } = useSWR(
    [
      (btnStatus === 'add' && insert) || (btnStatus === 'edit' && update),
      { method: 'POST', body: queryInfo },
    ],
    {
      revalidateOnMount: false,
      revalidateOnFocus: false,
      onSuccess: (data) => {
        if (data && data.code === 1) {
          Notify.success({ title: data.message })
          onClose()
          onSearch()
        } else {
          Notify.error({ title: '提交失败！' })
        }
      },
    }
  )

  return (
    <ProDrawer
      width={800}
      title={title}
      visible={drawerVisible}
      onClose={onClose}
      buttons={[
        {
          label: '保存',
          type: 'primary',
          style: { textAlign: 'right' },
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
        formType={!readOnly ? 'card' : 'pure'}
        form={baseRef}
        buttonsContainer={{ justifyContent: 'flex-start' }}
        readOnly={readOnly}
        onChange={(initial, current) => onChange(initial, current)}
        formDatas={formDatas}
      />
    </ProDrawer>
  )
}

export default Detail
