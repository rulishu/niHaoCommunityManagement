import React from 'react'
import { ProDrawer, ProForm, useForm } from '@uiw-admin/components'
import { Dispatch, RootState } from '@uiw-admin/models'
import { useDispatch, useSelector } from 'react-redux'
import { Notify, Table } from 'uiw'
import useSWR from 'swr'
import { insert, update } from '@/servers/ChargeManagement/PredepositsManage'
import { items, backList } from './items'
import { FormCol } from '@uiw-admin/components/lib/ProTable/types'
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
    PredepositsManage: { drawerVisible, tableType, queryInfo, isView },
  } = useSelector((state: RootState) => state)
  const [value] = React.useState(false)

  const onClose = () => {
    dispatch({
      type: 'PredepositsManage/updateState',
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
        } else {
          Notify.error({ title: '提交失败！' })
        }
      },
    }
  )
  const onChange = (initial: any, current: any) => {
    function checkTime(i: any) {
      if (i < 10) {
        i = '0' + i
      }
      return i
    }
    let date = new Date(current.chargingTime)
    if (tableType === 'add') {
      props.updateData({
        queryInfo: {
          ...queryInfo,
          ...current,
          chargingTime:
            date.getFullYear() +
            '-' +
            (date.getMonth() + 1) +
            '-' +
            date.getDate() +
            ' ' +
            checkTime(date.getHours()) +
            ':' +
            checkTime(date.getMinutes()) +
            ':' +
            checkTime(date.getSeconds()),
        },
      })
    }
    let refundTime = new Date(current?.refundTime)
    if (tableType === 'edit') {
      props.updateData({
        queryInfo: {
          // ...current,
          code: current?.code,
          name: current?.name,
          refundWay: current?.refundWay,
          refundTime:
            refundTime.getFullYear() +
            '-' +
            (refundTime.getMonth() + 1) +
            '-' +
            refundTime.getDate() +
            ' ' +
            checkTime(refundTime.getHours()) +
            ':' +
            checkTime(refundTime.getMinutes()) +
            ':' +
            checkTime(refundTime.getSeconds()),
        },
      })
    }
  }
  const onChangeItem = async (text: React.ChangeEvent<HTMLInputElement>) => {
    // console.log('text.target.value', text.target.value)
  }
  let chargeDataList = [{ payService: queryInfo, chargeAmount: queryInfo }]
  return (
    <ProDrawer
      title="基础信息"
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
          onClick: () => baseRef.submitvalidate(),
          show: !isView,
        },
      ]}
    >
      <ProForm
        title="基础信息"
        formType={'pure'}
        form={baseRef}
        readOnly={isView}
        onSubmit={() => {
          mutate()
        }}
        buttonsContainer={{ justifyContent: 'flex-start' }}
        // 更新表单的值
        onChange={(initial, current) => onChange(initial, current)}
        formDatas={items(queryInfo, value, tableType)}
      />

      {tableType === 'edit' && (
        <Table
          bordered
          columns={backList(onChangeItem) as FormCol[]}
          data={chargeDataList}
        />
      )}
    </ProDrawer>
  )
}

export default Drawer
