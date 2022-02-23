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
