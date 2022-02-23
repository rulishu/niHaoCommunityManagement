import { Dispatch, RootModel } from '@uiw-admin/models'
import { createModel, RematchDispatch } from '@rematch/core'
import { selectById, Change } from '../../servers/ChargeManagement/ShopCharge'

// interface chargProps {
//   shouName?: string
//   startingTime?: string
//   endTime?: string
//   fee?: number
//   money?: number
// }
interface State {
  drawerVisible: boolean
  tableType: string
  queryInfo: object
  isView: boolean
  id: string
  delectVisible: boolean
  keys: string
  chargeVisible: boolean
  chargeDataList: Array<any>
}

const shopCharge = createModel<RootModel>()({
  name: 'shopCharge',
  state: {
    drawerVisible: false,
    tableType: '1',
    queryInfo: {},
    id: '',
    isView: false,
    delectVisible: false,
    keys: 'rout',
    chargeVisible: false,
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
