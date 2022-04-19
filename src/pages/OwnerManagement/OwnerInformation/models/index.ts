import { Dispatch } from '@uiw-admin/models'
import { Notify } from 'uiw'
import { createModel, RematchDispatch } from '@rematch/core'
import { selectInfo } from '@/servers/OwnerInformation'

interface State {
  drawerVisible: boolean
  queryInfo: object
  dataList: any
}

const ownerInformation = createModel()({
  name: 'ownerInformation',
  state: {
    drawerVisible: false, //新增、预存弹框
    queryInfo: {}, //表单信息
    dataList: {},
  } as State,
  reducers: {
    updateState: (state: State, payload: Partial<State>) => ({
      ...state,
      ...payload,
    }),
  },
  effects: (dispatch: RematchDispatch<any>) => ({
    clean() {
      const dph = dispatch as Dispatch
      dph.ownerInformation.updateState({
        drawerVisible: false,
        queryInfo: {},
        dataList: {},
      })
    },
    // 详情
    async getSelectInfo(payload: any) {
      const dph = dispatch as Dispatch
      const data = await selectInfo({ ...payload })
      if (data?.code === 1) {
        dph.ownerInformation.updateState({
          dataList: data?.data || {},
        })
      } else {
        Notify.warning({ title: data?.message || '' })
      }
    },
  }),
})

export default ownerInformation
