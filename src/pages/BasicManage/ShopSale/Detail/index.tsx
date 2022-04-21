import {
  ProDrawer,
  // ProTable,
  useTable,
  ProForm,
  useForm,
} from '@uiw-admin/components'
import { Notify, Table, Button } from 'uiw'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@uiw-admin/models'
import { update, seraAdd, insert } from '@/servers/BasicManage/ShopSale'
import useSWR from 'swr'
import { seraSelectPage, Change } from '@/servers/BasicManage/ShopSale'
import { items, itemsList } from './items'
import DetailAdd from './detailAdd/Index'
import DeatailModals from '../Modals/detailModals/index'
import { FormCol } from '@uiw-admin/components/lib/ProTable/types'
import { useEffect } from 'react'
import formatter from '@uiw/formatter'

interface State {
  drawerDetailVisible?: boolean
  tableType?: string
  detailtableType?: string
  delectDetailVisible?: boolean
  queryInfo?: object
  deteilId?: string
  drawerVisible?: boolean
}

const Detail = (props: {
  updateData: (payload: State) => void
  onSearch: () => void
}) => {
  const baseRef = useForm()
  const dispatch = useDispatch<Dispatch>()

  useEffect(() => {
    dispatch({
      type: 'ShopSale/selectDictList',
      payload: {
        dictType: '从事行业',
      },
    })
    dispatch({
      type: 'ShopSale/selectUserByRole',
    })
  }, [dispatch])

  const {
    ShopSale: {
      drawerVisible,
      tableType,
      queryInfo,
      queryInfoList,
      industryList,
      tableList,
      userNameList,
      userList,
    },
  } = useSelector((ShopSale: RootState) => ShopSale)

  let totalList = tableList.concat(queryInfoList)

  const { mutate } = useSWR(
    [
      ((tableType === 'rent' || tableType === 'sale') && seraAdd) ||
        (tableType === 'edit' && update) ||
        (tableType === 'add' && insert),
      {
        method: 'POST',
        body:
          tableType === 'rent' || tableType === 'sale'
            ? { chargeList: queryInfoList, type: tableType === 'rent' ? 2 : 1 }
            : tableType === 'edit'
            ? { ...queryInfo, chargeList: queryInfoList }
            : tableType === 'add' && {
                ...queryInfo,
                chargeList: queryInfoList,
              },
      },
    ],
    {
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
    }
  )
  const deatailTable = useTable(seraSelectPage, {
    // 格式化接口返回的数据，必须返回{total 总数, data: 列表数据}的格式
    formatData: (data) => {
      return {
        total: data?.data?.total || 0,
        data: data?.data || [],
      }
    },
    // 格式化查询参数 会接收到pageIndex 当前页  searchValues 表单数据
    query: (pageIndex, pageSize, searchValues) => {
      return {
        type: tableType === 'rent' ? 2 : 1,
      }
    },
  })

  const updateData = (payload: State) => {
    dispatch({
      type: 'ShopSale/updateState',
      payload,
    })
  }

  const onClose = () => {
    updateData({ drawerVisible: false })
  }

  function handleEditTable(detailType: string, obj: Change) {
    updateData({
      detailtableType: detailType,
    })
    if (detailType === 'deAdd') {
      updateData({ drawerDetailVisible: true })
    }
    if (detailType === 'deDel') {
      updateData({ delectDetailVisible: true, deteilId: obj?.id })
    }
  }
  const Change = (initial: any, current: any) => {
    props.updateData({
      queryInfo: {
        ...queryInfo,
        ...current,
        startTime:
          current?.startTime &&
          formatter('YYYY-MM-DD HH:mm:ss', current?.startTime),
        endTime:
          current?.endTime &&
          formatter('YYYY-MM-DD HH:mm:ss', current?.endTime),
      },
    })
  }
  return (
    <ProDrawer
      width={800}
      title={
        tableType === 'rent'
          ? '默认收费项(出租)'
          : tableType === 'sale'
          ? '默认收费项(出售)'
          : ''
      }
      visible={drawerVisible}
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
      {(tableType === 'edit' || tableType === 'add') && (
        <ProForm
          title="基础信息"
          formType={'pure'}
          form={baseRef}
          buttonsContainer={{ justifyContent: 'flex-start' }}
          // 更新表单的值
          onChange={(initial, current) => Change(initial, current)}
          formDatas={items(
            queryInfo,
            industryList,
            userNameList,
            userList,
            baseRef,
            tableType
          )}
        />
      )}

      <Table
        title={
          <Button
            type="primary"
            onClick={() => handleEditTable('deAdd', { chargeList: [] })}
          >
            新增收费项
          </Button>
        }
        columns={itemsList(handleEditTable) as FormCol[]}
        data={totalList}
      />

      <DetailAdd onSearch={deatailTable.onSearch} updateData={updateData} />
      <DeatailModals onSearch={deatailTable.onSearch} updateData={updateData} />
    </ProDrawer>
  )
}

export default Detail
