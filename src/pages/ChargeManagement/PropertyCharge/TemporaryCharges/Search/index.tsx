import { Fragment, useEffect } from 'react'
import { ProTable, useTable } from '@uiw-admin/components'
import { Dispatch, RootState } from '@uiw-admin/models'
import { useDispatch, useSelector } from 'react-redux'
import { selectPage, Change } from '@/servers/ChargeManagement/temporaryCharges'
import Drawer from '../Detail/index'
import Modals from '../Modals/index'
import { columnsSearch } from './item'
import { FormCol } from '@uiw-admin/components/lib/ProTable/types'
interface State {
  drawerVisible?: boolean
  tableType?: string
  queryInfo?: object
  isView?: boolean
  delectVisible?: boolean
  id?: string
}

const Search = () => {
  const dispatch = useDispatch<Dispatch>()

  useEffect(() => {
    dispatch({
      type: 'models/buChargesList',
      payload: {
        type: 10,
      },
    })
    dispatch({
      type: 'models/paysList',
      payload: {
        dictType: '付款方式',
      },
    })
  }, [dispatch])

  const {
    models: { buChargesList, paysList },
  } = useSelector((state: RootState) => state)

  const updateData = (payload: State) => {
    dispatch({
      type: 'temporaryCharges/updateState',
      payload,
    })
  }

  const search = useTable(selectPage, {
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
  // 操作
  function handleEditTable(type: string, obj: Change) {
    updateData({
      isView: type === 'view',
      tableType: type,
    })
    if (type === 'add') {
      updateData({ drawerVisible: true, queryInfo: {} })
    }
    if (type === 'edit' || type === 'view') {
      updateData({ drawerVisible: true, queryInfo: { ...obj, status: '2' } })
    }
    if (type === 'del') {
      updateData({ delectVisible: true, id: obj?.id })
    }
  }

  return (
    <Fragment>
      <ProTable
        bordered
        // 操作栏按钮
        operateButtons={[
          {
            label: '新增',
            type: 'primary',
            onClick: () => {
              handleEditTable('add', {})
            },
          },
        ]}
        // 搜索栏按钮
        searchBtns={[
          {
            label: '查询',
            type: 'primary',
            htmlType: 'submit',
            onClick: () => {
              search.onSearch()
            },
          },
          {
            label: '重置',
            onClick: () => search.onReset(),
          },
        ]}
        table={search}
        columns={
          columnsSearch(handleEditTable, buChargesList, paysList) as FormCol[]
        }
      />
      <Drawer updateData={updateData} onSearch={search.onSearch} />
      <Modals onSearch={search.onSearch} />
    </Fragment>
  )
}

export default Search
