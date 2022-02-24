import React from 'react'
import { Button, Table, Input } from 'uiw'
import { ProDrawer, useForm, ProForm } from '@uiw-admin/components'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@uiw-admin/models'
import { deleteData } from '@/servers/ChargeManagement/ShopCharge'
import { Notify } from 'uiw'
import useSWR from 'swr'
import { columnsList, cardBack, backList } from './item'
import { FormCol } from '@uiw-admin/components/lib/ProTable/types'
import '../index.css'
import FormCar from './formCar'

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
    shopCharge: { chargeVisible, id, queryInfo, chargeDataList, btnStatus },
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
  const onBtn = () => {
    return (
      <div className="form-onBtn">
        <div className="form-onBtn-Input">
          <Input style={{ marginRight: 10 }} />
        </div>
        <Button type="primary">搜索</Button>
      </div>
    )
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
      {btnStatus === 'Bak' && (
        <ProForm
          formType={'pure'}
          form={baseRef}
          buttonsContainer={{ justifyContent: 'flex-start' }}
          // 更新表单的值
          onChange={(initial, current) =>
            updateData({ queryInfo: { ...queryInfo, ...current } })
          }
          formDatas={cardBack(queryInfo)}
          customWidgetsList={{
            onBtn: onBtn,
          }}
        />
      )}

      <Table
        bordered
        columns={
          btnStatus === 'Bak'
            ? (backList(onChange) as FormCol[])
            : (columnsList(onChange) as FormCol[])
        }
        data={chargeDataList}
        // style={{ margin: 2 }}
      />
      {btnStatus === 'char' && (
        <FormCar queryInfo={queryInfo} updateData={updateData} />
      )}
    </ProDrawer>
  )
}
export default Charge
