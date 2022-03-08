import { selectById, Change, detailData } from '../../servers/BasicManage/ShopSale'
import { Dispatch, RootModel } from '@uiw-admin/models'
import { createModel, RematchDispatch } from '@rematch/core'

interface State {
  drawerVisible: boolean
  drawerDetailVisible: boolean
  tableType: string
  detailType: string
  queryInfo: object
  dataSource: any[]
  detailDataSource: any
  isView: boolean
  id: string
  delectVisible: boolean
}

const ShopSale = createModel<RootModel>()({
  name: 'ShopSale',
  state: {
    drawerVisible: false,
    drawerDetailVisible: false,
    tableType: '',
    detailType: '',
    queryInfo: {},
    dataSource: [],
    detailDataSource: {},
    id: '',
    isView: false,
    delectVisible: false,
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
        dph.ShopSale.updateState({
          drawerVisible: true,
          drawerDetailVisible: true,
          queryInfo: data.data || {},
        })
      }
    },
    async detailData(payload: Change) {
      const dph = dispatch as Dispatch
      const data = await detailData(payload)
      if (data.code === 1) {
        dph.ShopSale.updateState({
          drawerDetailVisible: true,
          dataSource: data.data.rows,
        })
      }
    },

    clean() {
      const dph = dispatch as Dispatch
      dph.ShopSale.updateState({
        drawerVisible: false,
        drawerDetailVisible: false,
        tableType: '',
        detailType: '',
        queryInfo: {},
        dataSource: [],
        isView: false,
      })
    },
  }),
})

export default ShopSale
