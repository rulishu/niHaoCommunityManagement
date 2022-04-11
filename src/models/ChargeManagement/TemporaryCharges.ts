import { Dispatch, RootModel } from '@uiw-admin/models'
import { createModel, RematchDispatch } from '@rematch/core'
import {
  selectById,
  Change,
} from '../../servers/ChargeManagement/temporaryCharges'

interface State {
  drawerVisible: boolean
  tableType: string
  queryInfo: object
  isView: boolean
  id: string
  delectVisible: boolean
  loading: boolean
}

const temporaryCharges = createModel<RootModel>()({
  name: 'temporaryCharges',
  state: {
    drawerVisible: false,
    tableType: '',
    queryInfo: {},
    id: '',
    isView: false,
    delectVisible: false,
    loading: false,
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
        dph.temporaryCharges.updateState({
          drawerVisible: true,
          queryInfo: data.data || {},
        })
      }
    },

    clean() {
      const dph = dispatch as Dispatch
      dph.temporaryCharges.updateState({
        drawerVisible: false,
        tableType: '',
        queryInfo: {},
        isView: false,
        delectVisible: false,
      })
    },
  }),
})

export default temporaryCharges
