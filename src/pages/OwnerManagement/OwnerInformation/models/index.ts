import { Dispatch } from '@uiw-admin/models'
import { createModel, RematchDispatch } from '@rematch/core'

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
      })
    },
  }),
})

export default ownerInformation
