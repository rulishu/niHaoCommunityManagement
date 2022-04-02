import { Tabs, Steps, Row, Col, Table } from 'uiw'
import { ProDrawer, ProForm, useForm } from '@uiw-admin/components'
import { Notify, Button } from 'uiw'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@uiw-admin/models'
import { insert, update } from '@/servers/Coordination/Complaint'
import { items, viewItems, columns } from './items'
import useSWR from 'swr'

interface State {
  drawerVisible?: boolean
  tableType?: string
  queryInfo?: object
  isView?: boolean
  tabKeys?: string
}

const Detail = (props: {
  updateData: (payload: State) => void
  onSearch: () => void
}) => {
  const baseRef = useForm()
  const dispatch = useDispatch<Dispatch>()
  const {
    Complaint: {
      drawerVisible,
      tableType,
      queryInfo,
      isView,
      butType,
      loading,
    },
  } = useSelector((Complaint: RootState) => Complaint)

  const onClose = () => {
    dispatch({
      type: 'Complaint/updateState',
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
          onClose()
          props.onSearch()
          dispatch({
            type: 'Complaint/updateState',
            payload: {
              loading: false,
            },
          })
        } else {
          Notify.error({ title: '提交失败！' })
          dispatch({
            type: 'Complaint/updateState',
            payload: {
              loading: false,
            },
          })
        }
      },
    }
  )

  const onEdit = (butType: string) => {
    dispatch({
      type: 'Complaint/updateState',
      payload: {
        butType,
      },
    })
  }

  const Btns = () => {
    return (
      <div>
        {butType === '1' ? (
          <Button type="primary" onClick={() => onEdit('1')}>
            公司派遣
          </Button>
        ) : (
          <Button onClick={() => onEdit('1')}>公司派遣</Button>
        )}
        {butType === '2' ? (
          <Button type="primary" onClick={() => onEdit('2')}>
            业主报修
          </Button>
        ) : (
          <Button onClick={() => onEdit('2')}>业主报修</Button>
        )}
        {butType === '3' ? (
          <Button type="primary" onClick={() => onEdit('3')}>
            小程序报修
          </Button>
        ) : (
          <Button onClick={() => onEdit('3')}>小程序报修</Button>
        )}
      </div>
    )
  }
  const updateData = (payload: State) => {
    dispatch({
      type: 'Complaint/updateState',
      payload,
    })
  }
  return (
    <ProDrawer
      width={800}
      title={''}
      visible={drawerVisible}
      onClose={onClose}
      buttons={[
        {
          label: '取消',
          onClick: onClose,
          show: !isView,
        },
        {
          label: '保存',
          type: 'primary',
          style: { textAlign: 'right' },
          show: !isView,
          loading: loading,
          onClick: async () => {
            dispatch({
              type: 'Complaint/updateState',
              payload: {
                loading: true,
              },
            })
            await baseRef?.submitvalidate?.()
            const errors = baseRef.getError()
            if (errors && Object.keys(errors).length > 0) {
              dispatch({
                type: 'Complaint/updateState',
                payload: {
                  loading: false,
                },
              })
              return
            }
            mutate()
          },
        },
      ]}
    >
      <Tabs
        type="card"
        activeKey="workOrder"
        onTabClick={(tab) => {
          updateData({ tabKeys: tab })
          console.log('tab', tab)
        }}
      >
        <Tabs.Pane
          label={tableType === 'view' ? '工单信息' : '新增'}
          key="workOrder"
        >
          <ProForm
            title="基础信息"
            formType={'card'}
            form={baseRef}
            readOnly={isView}
            customWidgetsList={{
              btns: Btns,
            }}
            buttonsContainer={{ justifyContent: 'flex-start' }}
            // 更新表单的值
            onChange={(initial, current) =>
              props.updateData({ queryInfo: { ...queryInfo, ...current } })
            }
            formDatas={
              tableType === 'view'
                ? viewItems(queryInfo)
                : items(queryInfo, butType)
            }
          />
        </Tabs.Pane>
        {tableType === 'view' && (
          <Tabs.Pane label="流程信息" key="process">
            <Row gutter={20}>
              <Col>
                <Steps
                  direction="vertical"
                  progressDot
                  status="error"
                  current={2}
                  style={{ padding: '20px 0' }}
                >
                  <Steps.Step
                    title="步骤一"
                    description="这里是步骤一的说明，可以很长很长哦。"
                  />
                  <Steps.Step
                    title="步骤二"
                    description="这里是步骤一的说明，可以很长很长哦。"
                  />
                  <Steps.Step
                    title="步骤三"
                    description="这里是步骤一的说明，可以很长很长哦。"
                  />
                  <Steps.Step
                    title="步骤四"
                    description="这里是步骤一的说明，可以很长很长哦。"
                  />
                </Steps>
              </Col>
            </Row>
          </Tabs.Pane>
        )}
        {tableType === 'view' && (
          <Tabs.Pane label="流转记录" key="move">
            <Table columns={columns} data={[{ age: '1' }]} />
          </Tabs.Pane>
        )}
      </Tabs>
    </ProDrawer>
  )
}

export default Detail
