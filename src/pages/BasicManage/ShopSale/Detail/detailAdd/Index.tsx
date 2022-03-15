import { useState } from 'react'
import { Modal, Checkbox } from 'uiw'
import { ProTable, useTable } from '@uiw-admin/components'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@uiw-admin/models'
import { detailAdd, detailSelectPage } from '@/servers/BasicManage/ShopSale'
import { Notify } from 'uiw'
import useSWR from 'swr'
import { FormCol } from '@uiw-admin/components/lib/ProTable/types'

const Modals = (props: { onSearch: () => void }) => {
  const dispatch = useDispatch<Dispatch>()

  const {
    ShopSale: { drawerDetailVisible, dataSource },
  } = useSelector((state: RootState) => state)
  const [checkList, setCheckList] = useState<any[]>([])

  const onClose = () => {
    dispatch({
      type: 'ShopSale/updateState',
      payload: {
        drawerDetailVisible: false,
      },
    })
  }

  let chargeIds = checkList.toString()
  const { mutate } = useSWR(
    [detailAdd, { method: 'POST', body: { chargeIds: chargeIds } }],
    {
      revalidateOnMount: false,
      revalidateOnFocus: false,
      onSuccess: (data) => {
        if (data && data.code === 1) {
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

  const columns = [
    {
      title: () => {
        return (
          <Checkbox
            onChange={(itm) => {
              if (itm && itm.target.checked) {
                setCheckList(dataSource.map((item: any) => item.id))
              } else {
                setCheckList([])
              }
            }}
          />
        )
      },
      key: 'checked',
      render: (text: any, key: any, rowData: any) => {
        return (
          <Checkbox
            checked={checkList.includes(rowData.id)}
            onChange={(item) => {
              if (item && item.target.checked) {
                setCheckList((pre) => pre.concat([rowData.id]))
              } else {
                setCheckList((pre) => pre.filter((item) => item !== rowData.id))
              }
            }}
          />
        )
      },
    },
    {
      title: '序号',
      key: 'id',
      ellipsis: true,
      render: (text: string) => (
        <div style={{ textAlign: 'center' }}> {text} </div>
      ),
    },
    {
      title: '收费项目名',
      key: 'chargeName',
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
      ellipsis: true,
      render: (text: string) => (
        <div style={{ textAlign: 'center' }}> {text} </div>
      ),
    },
    {
      title: '数量',
      key: 'chargeNumType',
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
      title="默认收费项"
      isOpen={drawerDetailVisible}
      confirmText="确认"
      cancelText="取消"
      icon="information"
      type="primary"
      maxWidth={800}
      onConfirm={() => {
        mutate()
      }}
      onCancel={() => {
        onClose()
      }}
      onClosed={onClose}
    >
      <ProTable
        bordered
        searchBtns={[
          {
            label: '查询',
            type: 'primary',
            htmlType: 'submit',
            onClick: () => {
              deatailTable.onSearch()
            },
          },
          {
            label: '重置',
            onClick: () => deatailTable.onReset(),
          },
        ]}
        paginationProps={{
          pageSizeOptions: [10, 20, 30],
          pageSize: 10,
        }}
        table={deatailTable}
        columns={columns as FormCol[]}
      />
    </Modal>
  )
}
export default Modals
