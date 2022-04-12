import {
  Change,
  selectDictTypeList,
} from '../../servers/DictionaryManagement/DictionaryManagement'
import { Dispatch, RootModel } from '@uiw-admin/models'
import { createModel, RematchDispatch } from '@rematch/core'
import { Notify } from 'uiw'

interface State {
  drawerVisible: boolean
  tableType: string
  queryInfo: object
  isView: boolean
  id: string
  level: string
  delectVisible: boolean
  loading: boolean
  addTypeList: any
}

const DictionaryManagement = createModel<RootModel>()({
  name: 'DictionaryManagement',
  state: {
    drawerVisible: false,
    tableType: '',
    queryInfo: {},
    id: '',
    level: '',
    isView: false,
    delectVisible: false,
    loading: false,
    addTypeList: [],
  } as State,
  reducers: {
    updateState: (state: State, payload: Partial<State>) => ({
      ...state,
      ...payload,
    }),
  },
  effects: (dispatch: RematchDispatch<RootModel>) => ({
    async selectDictTypeList(payload: Change) {
      const dph = dispatch as Dispatch
      const data = await selectDictTypeList(payload)

      if (data.code === 1) {
        dph.DictionaryManagement.updateState({
          addTypeList: data.data.map((itm: any) => ({
            label: itm.dictType,
            value: itm.dictType,
          })),
        })
      } else {
        Notify.error({ title: data.message })
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
