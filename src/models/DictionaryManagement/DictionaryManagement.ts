import {
  selectById,
  Change,
} from '../../servers/DictionaryManagement/DictionaryManagement'
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
}

const DictionaryManagement = createModel<RootModel>()({
  name: 'DictionaryManagement',
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
        dph.DictionaryManagement.updateState({
          drawerVisible: true,
          queryInfo: data.data || {},
        })
      }
    },

    clean() {
      const dph = dispatch as Dispatch
      dph.DictionaryManagement.updateState({
        drawerVisible: false,
        tableType: '',
        queryInfo: {},
        isView: false,
      })
    },
  }),
})

export default DictionaryManagement
