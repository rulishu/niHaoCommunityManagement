import { ProDrawer, ProForm, useForm } from '@uiw-admin/components'
import { Notify, TreeChecked } from 'uiw'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@uiw-admin/models'
import { insert, update, assignMenu } from '@/servers/Authority/Role'
import { itemsAdd } from './items'
import useSWR from 'swr'
import { TreeData } from '@uiw/react-tree'

interface State {
  drawerVisible?: boolean
  tableType?: string
  queryInfo?: object
  isView?: boolean
}

const Detail = (props: {
  updateData: (payload: State) => void
  onSearch: () => void
}) => {
  const baseRef = useForm()
  const dispatch = useDispatch<Dispatch>()
  const {
    Role: { drawerVisible, tableType, queryInfo, isView, menuList, selectMenu },
  } = useSelector((Role: RootState) => Role)

  const onClose = () => {
    dispatch({
      type: 'Role/updateState',
      payload: {
        drawerVisible: false,
        isView: false,
      },
    })
  }

  const { mutate } = useSWR(
    [
      (tableType === 'add' && insert) ||
        (tableType === 'edit' && update) ||
        (tableType === 'aut' && assignMenu),
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

  const onChecked = (keys: TreeData['key'][]) => {
    // console.log('keys:', keys);
    props.updateData({ queryInfo: { ...queryInfo, menuIdList: keys } })
  }

  return (
    <ProDrawer
      width={!isView ? 500 : 800}
      title={
        tableType === 'add'
          ? '新增'
          : tableType === 'aut'
          ? '授权'
          : tableType === 'edit'
          ? '编辑'
          : '查看'
      }
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
          onClick: async () => {
            await baseRef?.submitvalidate?.()
            const errors = baseRef.getError()
            if (errors && Object.keys(errors).length > 0) return
            mutate()
          },
        },
      ]}
    >
      {tableType === 'aut' ? (
        <TreeChecked
          data={menuList}
          selectedKeys={selectMenu}
          onSelected={(keys) => {
            onChecked(keys)
          }}
        />
      ) : (
        <ProForm
          title="基础信息"
          formType={isView ? 'pure' : 'card'}
          form={baseRef}
          readOnly={isView}
          buttonsContainer={{ justifyContent: 'flex-start' }}
          // 更新表单的值
          onChange={(initial, current) =>
            props.updateData({ queryInfo: { ...queryInfo, ...current } })
          }
          formDatas={itemsAdd(queryInfo, isView)}
          readOnlyProps={{ column: 2 }}
        />
      )}
    </ProDrawer>
  )
}

export default Detail
