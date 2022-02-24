import React from 'react'
import { Table } from 'uiw'
import { ProDrawer, ProForm, useForm } from '@uiw-admin/components'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@uiw-admin/models'
import { deleteData } from '@/servers/ChargeManagement/ShopCharge'
import { Notify } from 'uiw'
import useSWR from 'swr'
import { columnsList, cardOne, cardTow, cardThree } from './item'
import { FormCol } from '@uiw-admin/components/lib/ProTable/types'
import '../index.css'

interface State {
  drawerVisible?: boolean
  tableType?: string
  queryInfo?: object
  isView?: boolean
  delectVisible?: boolean
  id?: string
  chargeVisible?: boolean
}

const Charge = (props: { onSearch: () => void }) => {
  const dispatch = useDispatch<Dispatch>()
  const updateData = (payload: State) => {
    dispatch({
      type: 'shopCharge/updateState',
      payload,
    })
  }
  const baseRef = useForm()

  const {
    shopCharge: { chargeVisible, id, queryInfo, chargeDataList },
  } = useSelector((state: RootState) => state)

  const onClose = () => {
    updateData({ chargeVisible: false })
  }

  const { mutate } = useSWR([deleteData, { method: 'POST', body: { id } }], {
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
  })
  // 操作
  const onChange = (text: React.ChangeEvent<HTMLInputElement>) => {
    window.console.log('text.target.value', text.target.value)
  }

  const onCus = () => {
    return <div style={{ marginTop: 30 }}></div>
  }

  return (
    <ProDrawer
      width={1000}
      title="常规收费"
      visible={chargeVisible}
      onClose={onClose}
      buttons={[
        {
          label: '取消',
          onClick: onClose,
        },
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
      <Table
        bordered
        columns={columnsList(onChange) as FormCol[]}
        data={chargeDataList}
      />

      <div className="ProForm-body">
        <div className="ProForm-card">
          <ProForm
            formType={'card'}
            form={baseRef}
            buttonsContainer={{ justifyContent: 'flex-start' }}
            // 更新表单的值
            onChange={(initial, current) =>
              updateData({ queryInfo: { ...queryInfo, ...current } })
            }
            formDatas={cardOne(queryInfo)}
          />
        </div>
        <div className="ProForm-card">
          <ProForm
            formType={'card'}
            form={baseRef}
            buttonsContainer={{ justifyContent: 'flex-start' }}
            // 更新表单的值
            onChange={(initial, current) =>
              updateData({ queryInfo: { ...queryInfo, ...current } })
            }
            formDatas={cardTow(queryInfo)}
            customWidgetsList={{
              onCus: onCus,
            }}
          />
        </div>
        <div className="ProForm-card-end">
          <ProForm
            formType={'card'}
            form={baseRef}
            buttonsContainer={{ justifyContent: 'flex-start' }}
            // 更新表单的值
            onChange={(initial, current) =>
              updateData({ queryInfo: { ...queryInfo, ...current } })
            }
            formDatas={cardThree(queryInfo)}
            customWidgetsList={{
              onCus: onCus,
            }}
          />
        </div>
      </div>
    </ProDrawer>
  )
}
export default Charge
