import { Fragment } from 'react'
import { useDispatch } from 'react-redux'
import { Dispatch } from '@uiw-admin/models'
import { ProTable, useTable } from '@uiw-admin/components'
import { Button } from 'uiw'
import Drawers from './Drawer'
import { searchFun } from '@/utils'
export default function Index() {
  const dispatch = useDispatch<Dispatch>()

  // 查询
  const table = useTable('/api/buOwnerManage/selectInfo', {
    query: (pageIndex, pageSize, searchValues) => {
      return {
        page: pageIndex,
        pageSize: 10,
        ...searchValues,
      }
    },

    formatData: (data) => {
      return {
        total: data?.data?.total || 0,
        data: data?.data?.rows || [],
      }
    },
  })
  const handleEditTable = (data: any) => {
    dispatch({
      type: 'ownerInformation/getSelectInfo',
      payload: { id: data?.id || '' },
    })
    dispatch({
      type: 'ownerInformation/updateState',
      payload: { drawerVisible: true, queryInfo: { ...data } },
    })
  }

  return (
    <Fragment>
      <div className="proTableBox">
        <ProTable
          bordered
          table={table}
          searchBtns={searchFun(table) as any}
          columns={[
            {
              title: '姓名',
              key: 'userName',
              width: 180,
              align: 'center',
              ellipsis: true,
              props: {
                widget: 'input',
                widgetProps: {
                  placeholder: '请输入姓名',
                },
              },
            },
            {
              title: '身份证号',
              key: 'cardId',
              width: 180,
              align: 'center',
              ellipsis: true,
              props: {
                widget: 'input',
                widgetProps: {
                  placeholder: '请输入身份证号',
                },
              },
            },
            {
              title: '手机号',
              key: 'phoneNumber',
              width: 180,
              align: 'center',
              ellipsis: true,
              props: {
                widget: 'input',
                widgetProps: {
                  placeholder: '请输入手机号',
                },
              },
            },
            {
              title: '性别',
              key: 'gender',
              width: 180,
              align: 'center',
              ellipsis: true,
              render: (text: any) => (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {text === 1 ? '男' : text === 2 ? '女' : ''}
                </div>
              ),
            },
            {
              title: '账号状态',
              key: 'status',
              width: 180,
              align: 'center',
              ellipsis: true,
              render: (text: any) => (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {text === 1 ? '正常' : text === 2 ? '停用' : ''}
                </div>
              ),
            },
            {
              title: '操作',
              key: 'edit',
              align: 'center',
              ellipsis: true,
              width: 150,
              render: (text: any, type: string, data: any) => (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Button onClick={() => handleEditTable(data)} icon="eye">
                    详情
                  </Button>
                </div>
              ),
            },
          ]}
        />
      </div>
      <Drawers />
    </Fragment>
  )
}
