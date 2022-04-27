import { Dispatch } from '@uiw-admin/models'
// import { Notify } from 'uiw'
import { createModel, RematchDispatch } from '@rematch/core'
import { refund } from '@/servers/BalanceManagement/index'
export interface State {
  drawerVisible: boolean
  queryInfo: object
  dataList: any
  tableType: string
  isView: boolean
  loading: boolean
}

const balanceManagement = createModel()({
  name: 'balanceManagement',
  state: {
    drawerVisible: false, //新增、预存弹框
    queryInfo: {}, //表单信息
    dataList: {},
    tableType: '',
    isView: false,
    loading: false,
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
        tableType: '',
        isView: false,
        loading: false,
      })
    },
    async refund(payload: State) {
      const dph = dispatch as Dispatch
      dph.BusinessManage.updateState({
        loading: true,
      })
      return await refund(payload)
    },
  }),
})

export default balanceManagement
