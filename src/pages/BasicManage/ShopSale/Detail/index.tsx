import {
  ProDrawer,
  ProTable,
  useTable,
  ProForm,
  useForm,
} from '@uiw-admin/components'
import { Notify, Button } from 'uiw'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@uiw-admin/models'
import { insert, update } from '@/servers/BasicManage/ShopSale'
import useSWR from 'swr'
import { detailSelectPage, Change } from '@/servers/BasicManage/ShopSale'
import { items } from './items'
import DetailAdd from './detailAdd/Index'

interface State {
  drawerDetailVisible?: boolean

  delectVisible?: boolean
  tableType?: string
  queryInfo?: object
  isView?: boolean
  id?: string
}

const Detail = (props: {
  updateData: (payload: State) => void
  onSearch: () => void
}) => {
  const baseRef = useForm()
  const dispatch = useDispatch<Dispatch>()
  const {
    ShopSale: { drawerVisible, tableType, queryInfo },
  } = useSelector((ShopSale: RootState) => ShopSale)

  const onClose = () => {
    dispatch({
      type: 'ShopSale/updateState',
      payload: {
        drawerVisible: false,
        // isView: false,
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
        } else {
          Notify.error({ title: '提交失败！' })
        }
      },
    }
  )
  const deatailTable = useTable(detailSelectPage, {
    // 格式化接口返回的数据，必须返回{total 总数, data: 列表数据}的格式
    formatData: (data) => {
      return {
        total: data?.data?.total,
        data: data?.data?.rows || [],
      }
    },
    // 格式化查询参数 会接收到pageIndex 当前页  searchValues 表单数据
    query: (pageIndex, pageSize, searchValues) => {
      return {
        page: pageIndex,
        pageSize: 10,
        ...searchValues,
      }
    },
  })

  const updateData = (payload: State) => {
    dispatch({
      type: 'ShopSale/updateState',
      payload,
    })
  }

  function handleEditTable(detailType: string, obj: Change) {
    updateData({
      // isView: detailType === 'deAdd',
      tableType: detailType,
    })
    if (detailType === 'deAdd') {
      dispatch({
        type: 'ShopSale/detailData',
        payload: { page: 1, pageSize: 200 },
      })
      updateData({ drawerDetailVisible: true, queryInfo: {} })
    }
    if (detailType === 'deDel') {
      updateData({ delectVisible: true, id: obj?.id })
    }
  }

  return (
    <ProDrawer
      width={800}
      title={'新增'}
      visible={drawerVisible}
      onClose={onClose}
      buttons={[
        {
          label: '取消',
          onClick: onClose,
          // show: !isView,
        },
        {
          label: '保存',
          type: 'primary',
          style: { textAlign: 'right' },
          // show: !isView,
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
        formType={'pure'}
        form={baseRef}
        // readOnly={isView}
        buttonsContainer={{ justifyContent: 'flex-start' }}
        // 更新表单的值
        onChange={(initial, current) =>
          props.updateData({ queryInfo: { ...queryInfo, ...current } })
        }
        formDatas={items(queryInfo)}
      />

      <ProTable
        // searchBtns={[
        //   {
        //     label: '搜索',
        //     type: 'primary',
        //     onClick: () => {
        //       deatailTable.onSearch()
        //     },
        //   },
        //   {
        //     label: '重置',
        //     onClick: () => {
        //       deatailTable.onReset()
        //     },
        //   },
        // ]}
        operateButtons={[
          {
            label: '新增',
            type: 'primary',
            onClick: () => {
              handleEditTable('deAdd', {})
            },
          },
        ]}
        paginationProps={{
          pageSizeOptions: [10, 20, 30],
          pageSize: 10,
        }}
        table={deatailTable}
        columns={[
          {
            title: '关键词',
            key: 'name',
            props: {
              widget: 'input',
              initialValue: '',
              widgetProps: {
                preIcon: 'user',
                placeholder: '输入关键词',
              },
            },
          },
          {
            title: '收费项目名',
            align: 'center',
            key: 'chargeName',
            ellipsis: true,
          },
          {
            title: '单价',
            align: 'center',
            key: 'chargePrice',
            ellipsis: true,
          },
          {
            title: '操作',
            key: 'edit',
            align: 'center',
            width: 80,
            render: (text: any, key: any, rowData: Change) => (
              <div>
                <Button
                  size="small"
                  icon="delete"
                  onClick={() => handleEditTable('deDel', rowData)}
                >
                  删除
                </Button>
              </div>
            ),
          },
        ]}
      />

      <DetailAdd onSearch={deatailTable.onSearch} />
    </ProDrawer>
  )
}

export default Detail
