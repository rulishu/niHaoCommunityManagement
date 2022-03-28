import { Modal } from 'uiw'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@uiw-admin/models'
import { listProps } from '@/servers/BasicManage/ShopSale'

interface State {
  delectDetailVisible?: boolean
  queryInfoList?: listProps[]
}
const Modals = (props: {
  onSearch: () => void
  updateData: (payload: State) => void
}) => {
  const dispatch = useDispatch<Dispatch>()
  const {
    ShopSale: { delectDetailVisible, id, queryInfoList },
  } = useSelector((state: RootState) => state)

  const updateData = (payload: State) => {
    dispatch({
      type: 'ShopSale/updateState',
      payload,
    })
  }

  const onClose = () => {
    updateData({ delectDetailVisible: false })
  }

  return (
    <Modal
      title="删除"
      isOpen={delectDetailVisible}
      confirmText="确定"
      cancelText="取消"
      icon="information"
      type="primary"
      onConfirm={() => {
        let dataList: any = queryInfoList
        if (queryInfoList.findIndex((item) => item.id === id) > -1) {
          dataList.splice(
            queryInfoList.findIndex((item) => item.id === id),
            1
          )
          updateData({
            queryInfoList: dataList,
          })
        }
      }}
      onCancel={() => onClose()}
      onClosed={onClose}
    >
      <p>是否确认删除此条数据</p>
    </Modal>
  )
}
export default Modals
