import { Modal } from 'uiw'
import { ProTable, useTable } from '@uiw-admin/components'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@uiw-admin/models'
import {
  detailSelectPage,
  listProps,
  Change,
} from '@/servers/BasicManage/ShopSale'
import { FormCol } from '@uiw-admin/components/lib/ProTable/types'

interface State {
  drawerDetailVisible?: boolean
  tableType?: string
  detailtableType?: string
  delectDetailVisible?: boolean
  queryInfo?: Change
  id?: string
  drawerVisible?: boolean
  queryInfoList?: listProps[]
}
const Modals = (props: {
  onSearch: () => void
  updateData: (payload: State) => void
}) => {
  const dispatch = useDispatch<Dispatch>()

  const {
    ShopSale: { drawerDetailVisible, queryInfoList },
  } = useSelector((state: RootState) => state)

  const updateData = (payload: State) => {
    dispatch({
      type: 'ShopSale/updateState',
      payload,
    })
  }

  const onClose = () => {
    updateData({ drawerDetailVisible: false })
  }

  const table = useTable(detailSelectPage, {
    // 格式化接口返回的数据，必须返回{total 总数, data: 列表数据}的格式
    formatData: (data) => {
      return {
        total: data?.data?.total || 0,
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

  // const { mutate } = useSWR(
  //   [
  //     seraAdd,
  //     {
  //       method: 'POST',
  //       body: { chargeList: arrData, type: tableType === 'rent' ? 2 : 1 },
  //     },
  //   ],
  //   {
  //     revalidateOnMount: false,
  //     revalidateOnFocus: false,
  //     onSuccess: (data) => {
  //       if (data && data.code === 1) {
  //         onClose()
  //         props.onSearch()
  //       } else {
  //         Notify.error({ title: '提交失败！' })
  //       }
  //     },
  //   }
  // )

  const columns = [
    {
      title: '收费项目名',
      key: 'chargeName',
      align: 'center',
      props: {
        widget: 'input',
        widgetProps: {
          placeholder: '请输入收费项目名',
        },
      },
      ellipsis: true,
      render: (text: string) => (
        <div style={{ textAlign: 'center' }}> {text} </div>
      ),
    },
    {
      title: '单价',
      key: 'chargePrice',
      align: 'center',
      ellipsis: true,
      render: (text: string) => (
        <div style={{ textAlign: 'center' }}> {text} </div>
      ),
    },
    {
      title: '数量',
      key: 'chargeNumType',
      align: 'center',
      ellipsis: true,
      render: (chargeNumType: string) => (
        <div style={{ textAlign: 'center' }}>
          <span>
            {chargeNumType === '1'
              ? '按户数收费'
              : chargeNumType === '2'
              ? '按人口数收费'
              : chargeNumType === '3'
              ? '按楼层收费'
              : chargeNumType === '4'
              ? '按占地面积收费'
              : chargeNumType === '5'
              ? '按使用面积收费'
              : chargeNumType === '6'
              ? '按走表数量'
              : chargeNumType === '7'
              ? '按租金收费'
              : ''}
          </span>
        </div>
      ),
    },
    {
      title: '计算公式',
      key: 'chargeFormula',
      align: 'center',
      ellipsis: true,
      render: (chargeFormula: string) => (
        <div style={{ textAlign: 'center' }}>
          <span>
            {chargeFormula === '1'
              ? '单价*数量'
              : chargeFormula === '2'
              ? '自定义'
              : ''}
          </span>
        </div>
      ),
    },
    {
      title: '计算周期',
      key: 'chargeMonth',
      align: 'center',
      ellipsis: true,
      render: (chargeMonth: any) => (
        <div style={{ textAlign: 'center' }}>
          <span>
            {chargeMonth === 1
              ? '1个月'
              : chargeMonth === 2
              ? '2个月'
              : chargeMonth === 3
              ? '3个月'
              : chargeMonth === 4
              ? '4个月'
              : chargeMonth === 5
              ? '6个月'
              : chargeMonth === 6
              ? '12个月'
              : ''}
          </span>
        </div>
      ),
    },
  ]

  return (
    <Modal
      title="选择收费项"
      isOpen={drawerDetailVisible}
      confirmText="确认"
      cancelText="取消"
      icon="information"
      type="primary"
      maxWidth={800}
      onConfirm={() => {
        let arr = table.selection.selected

        if (arr.length > 0) {
          let listData: Record<string, string | number | JSX.Element>[] =
            table.data
          let newArr: any = []
          arr.forEach((item) => {
            listData.forEach((val) => {
              if (item === val.id) {
                newArr.push(val)
              }
            })
          })

          updateData({
            queryInfoList: (queryInfoList || []).concat(newArr),
          })
        }
        // mutate()
      }}
      onCancel={() => {
        onClose()
      }}
      onClosed={onClose}
    >
      <div style={{ whiteSpace: 'break-spaces' }}>
        选中的值{JSON.stringify(table && table.selection.selected)}
      </div>
      <ProTable
        table={table}
        bordered
        searchBtns={[
          {
            label: '查询',
            type: 'primary',
            htmlType: 'submit',
            onClick: () => {
              table.onSearch()
            },
          },
          {
            label: '重置',
            onClick: () => table.onReset(),
          },
        ]}
        paginationProps={{
          pageSizeOptions: [10, 20, 30],
          pageSize: 10,
        }}
        columns={columns as FormCol[]}
        rowSelection={{
          // 多选 checkbox 单选radio
          type: 'checkbox',
          // 选中的键名 column里的key
          selectKey: 'id',
          // 默认值
          defaultSelected: [],
        }}
        // 取消全部选择
        onPageChange={() => {
          table.selection.unSelectAll()
        }}
      />
    </Modal>
  )
}
export default Modals
