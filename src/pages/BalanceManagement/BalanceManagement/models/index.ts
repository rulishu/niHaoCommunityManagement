import { Dispatch } from '@uiw-admin/models'
// import { Notify } from 'uiw'
import { createModel, RematchDispatch } from '@rematch/core'

export interface State {
  drawerVisible: boolean
  queryInfo: object
  dataList: any
  tableType: string
  isView: boolean
}

const balanceManagement = createModel()({
  name: 'balanceManagement',
  state: {
    drawerVisible: false, //新增、预存弹框
    queryInfo: {}, //表单信息
    dataList: {},
    tableType: '',
    isView: false,
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
      dph.balanceManagement.updateState({
        drawerVisible: false,
        queryInfo: {},
        dataList: {},
        isView: false,
      })
    },
  }),
})

export default balanceManagement
