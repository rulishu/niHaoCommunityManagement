import { Dispatch, RootModel } from '@uiw-admin/models'
import { createModel, RematchDispatch } from '@rematch/core'
import { selectById, Change } from '../../servers/ChargeManagement/ShopCharge'

interface State {
  drawerVisible: boolean
  tableType: string
  queryInfo: object
  isView: boolean
  id: string
  delectVisible: boolean
  keys: string
  btnStatus: string
  chargeVisible: boolean
  chargeDataList: Array<any>
  historyVisible: boolean
  historyList: Array<any>
}

const shopCharge = createModel<RootModel>()({
  name: 'shopCharge',
  state: {
    tableType: '1',
    drawerVisible: false, //新增、预存弹框
    queryInfo: {}, //新增、预存
    id: '',
    isView: false,
    delectVisible: false,
    keys: 'rout', //标签页
    btnStatus: '', //按钮标签
    chargeVisible: false, //收费弹框
    chargeDataList: [
      {
        shouName: '1',
        startingTime: '1',
        endTime: '1',
        fee: 0,
        lateFee: 0,
        moneyAmount: 2990,
      },
    ],
    historyVisible: false, //历史信息弹框
    historyList: [{ print: '打印', name: '1', money: '已付款' }],
  } as State,
  reducers: {
    updateState: (state: State, payload: Partial<State>) => ({
      ...state,
      ...payload,
    }),
  },
  effects: (dispatch: RematchDispatch<RootModel>) => ({
    async selectById(payload: Change) {
      const dph = dispatch as Dispatch
      const data = await selectById(payload)
      if (data.code === 1) {
        dph.users.updateState({
          drawerVisible: true,
          queryInfo: data.data || {},
        })
      }
    },

    clean() {
      const dph = dispatch as Dispatch
      dph.users.updateState({
        drawerVisible: false,
        tableType: '',
        queryInfo: {},
        isView: false,
        delectVisible: false,
      })
    },
  }),
})

export default shopCharge
