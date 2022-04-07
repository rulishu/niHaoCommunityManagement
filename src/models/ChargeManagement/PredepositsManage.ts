import { Dispatch, RootModel } from '@uiw-admin/models'
import { createModel, RematchDispatch } from '@rematch/core'
import {
  selectById,
  Change,
  selectAdvanceDepositeByCode,
} from '../../servers/ChargeManagement/PredepositsManage'

interface State {
  drawerVisible: boolean
  tableType: string
  queryInfo: object
  isView: boolean
  id: string
  delectVisible: boolean
  loading: boolean
  preDepositeData: object
  itemList: []
}

const PredepositsManage = createModel<RootModel>()({
  name: 'PredepositsManage',
  state: {
    drawerVisible: false,
    tableType: '',
    queryInfo: {},
    id: '',
    isView: false,
    delectVisible: false,
    loading: false,
    preDepositeData: {},
    itemList: [],
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
        dph.PredepositsManage.updateState({
          drawerVisible: true,
          queryInfo: data.data || {},
        })
      }
    },

    async selectAdvanceDepositeByCode(payload: Change) {
      // const { code } = payload
      const dph = dispatch as Dispatch
      const data = await selectAdvanceDepositeByCode(payload)
      if (data.code === 1) {
        dph.PredepositsManage.updateState({
          preDepositeData: data.data || {},
          itemList: data.data.rows.map((itm: any) => ({
            label: itm.code,
            value: itm.id,
          })),
        })
      }
    },

    clean() {
      const dph = dispatch as Dispatch
      dph.PredepositsManage.updateState({
        drawerVisible: false,
        tableType: '',
        queryInfo: {},
        isView: false,
        delectVisible: false,
      })
    },
  }),
})

export default PredepositsManage
