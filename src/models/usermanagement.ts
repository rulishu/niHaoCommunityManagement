import { Dispatch, RootModel } from '@uiw-admin/models'
import { createModel, RematchDispatch } from '@rematch/core'

interface State {
  systemId: string
  drawerVisible: boolean
  delectVisible: boolean
  tableType: string
  queryInfo: object
  isView: boolean
  loading: boolean
}

const usermanagement = createModel<RootModel>()({
  name: 'usermanagement',
  state: {
    drawerVisible: false,
    tableType: '',
    queryInfo: {},
    isView: false,
    delectVisible: false,
    systemId: '',
    loading: false,
  } as State,
  reducers: {
    updateState: (state: State, payload: Partial<State>) => ({
      ...state,
      ...payload,
    }),
  },
  effects: (dispatch: RematchDispatch<RootModel>) => ({
    clean() {
      const dph = dispatch as Dispatch
      dph.usermanagement.updateState({
        drawerVisible: false,
        tableType: '',
        queryInfo: {},
        isView: false,
        delectVisible: false,
      })
    },
  }),
})

export default usermanagement
