import { ProDrawer, ProForm, useForm } from '@uiw-admin/components'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@uiw-admin/models'
import { drawerTitle, matching } from './item'
export default function Index() {
  const dispatch = useDispatch<Dispatch>()

  const form = useForm()

  const {
    shopCharges: {
      drawerVisible,
      queryInfo,
      drawerType,
      shopNoList,
      projectList,
    },
  }: any = useSelector((state: RootState) => state)

  const onClose = () => dispatch({ type: 'shopCharges/clean' })

  const onSubmit = (current: any) => {
    const errorObj: any = {}
    const arr = Object.keys(current)
    arr.forEach((element: any) => {
      if (
        !current[element] ||
        (Array.isArray(current[element]) && current[element].length === 0)
      ) {
        errorObj[element] = '此项不能为空'
      }
    })
    if (Object.keys(errorObj).length > 0) {
      const err: any = new Error()
      err.filed = errorObj
      throw err
    }
    console.log(current, 'current')
  }

  return (
    <ProDrawer
      width={1000}
      title={drawerTitle(drawerType)}
      visible={drawerVisible}
      onClose={onClose}
      buttons={[
        {
          label: '保存',
          type: 'primary',
          style: { width: 80 },
          onClick: () => form.submitvalidate(),
        },
      ]}
    >
      <ProForm
        form={form}
        formType="card"
        onSubmit={(_, current: Record<string, any>) => onSubmit(current)}
        // 更新表单的值
        onChange={(_, current: Record<string, any>) =>
          dispatch({
            type: 'shopCharges/updateData',
            payload: { ...queryInfo, ...current },
          })
        }
        buttonsContainer={{ justifyContent: 'flex-start' }}
        formDatas={matching(drawerType, shopNoList, form, projectList) as any}
      />
    </ProDrawer>
  )
}
