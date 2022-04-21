import { Modal } from 'uiw'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@uiw-admin/models'
import { listProps } from '@/servers/BasicManage/ShopSale'
// import { Notify } from 'uiw'
// import useSWR from 'swr'
// import { seraDelete } from '@/servers/BasicManage/ShopSale'

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
    ShopSale: { delectDetailVisible, deteilId, queryInfoList },
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
        if (queryInfoList) {
          let dataList: any = queryInfoList
          if (queryInfoList.findIndex((item) => item.id === deteilId) > -1) {
            dataList.splice(
              queryInfoList.findIndex((item) => item.id === deteilId),
              1
            )
            updateData({
              queryInfoList: dataList,
            })
          }
        }
        // if (id) {
        //   dispatch({
        //     type: 'ShopSale/seraDelete',
        //     payload: {
        //       id: id
        //     }
        //   })
        //   dispatch({
        //     type: 'ShopSale/seraSelectPageList',
        //     payload: {
        //       page: 1,
        //       pageSize: 20,
        //       type: tableType === 'rent' ? 2 : 1,
        //     }
        //   })
        // }
      }}
      onCancel={() => onClose()}
      onClosed={onClose}
    >
      <p>是否确认删除此条数据</p>
    </Modal>
  )
}
export default Modals
