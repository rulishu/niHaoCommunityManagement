import React from 'react'
import { ProForm, useForm } from '@uiw-admin/components'
import { cardOne, cardTow, cardThree } from './item'

interface State {
  drawerVisible?: boolean
  tableType?: string
  queryInfo?: object
  isView?: boolean
  delectVisible?: boolean
  id?: string
  chargeVisible?: boolean
}

export default function details(props: {
  queryInfo: any
  updateData: (payload: State) => void
}) {
  const baseRef = useForm()

  const onCus = () => {
    return <div style={{ marginTop: 30 }}></div>
  }
  return (
    <React.Fragment>
      <div className="ProForm-body">
        <div className="ProForm-card">
          <ProForm
            formType={'card'}
            form={baseRef}
            buttonsContainer={{ justifyContent: 'flex-start' }}
            // 更新表单的值
            onChange={(initial, current) =>
              props.updateData({
                queryInfo: { ...props.queryInfo, ...current },
              })
            }
            formDatas={cardOne(props.queryInfo)}
          />
        </div>
        <div className="ProForm-card">
          <ProForm
            formType={'card'}
            form={baseRef}
            buttonsContainer={{ justifyContent: 'flex-start' }}
            // 更新表单的值
            onChange={(initial, current) =>
              props.updateData({
                queryInfo: { ...props.queryInfo, ...current },
              })
            }
            formDatas={cardTow(props.queryInfo)}
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
              props.updateData({
                queryInfo: { ...props.queryInfo, ...current },
              })
            }
            formDatas={cardThree(props.queryInfo)}
            customWidgetsList={{
              onCus: onCus,
            }}
          />
        </div>
      </div>
    </React.Fragment>
  )
}
