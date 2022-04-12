import {
  selectById,
  Change,
  buChargesList,
} from '../../servers/BasicManage/ChargeManage'
import { Dispatch, RootModel } from '@uiw-admin/models'
import { createModel, RematchDispatch } from '@rematch/core'

interface State {
  drawerVisible: boolean
  tableType: string
  queryInfo: object
  isView: boolean
  id: string
  delectVisible: boolean
  loading: boolean
  buChargesList: any
}

const ChargeManage = createModel<RootModel>()({
  name: 'ChargeManage',
  state: {
    drawerVisible: false,
    tableType: '',
    queryInfo: {},
    id: '',
    isView: false,
    delectVisible: false,
    loading: false,
    buChargesList: [],
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
        dph.ChargeManage.updateState({
          drawerVisible: true,
          queryInfo: data.data || {},
        })
      }
    },

    async buChargesList(payload: any) {
      const dph = dispatch
      const data = await buChargesList(payload)
      console.log('data', data)

      if (data.code === 1) {
        dph.ChargeManage.updateState({
          buChargesList: data.data.map((itm: any) => ({
            label: itm.chargeName,
            value: itm.chargeName,
          })),
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
      })
    },
  }),
})

export default ChargeManage
