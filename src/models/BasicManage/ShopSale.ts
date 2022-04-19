import {
  selectById,
  Change,
  detailData,
  listProps,
  selectDictList,
} from '../../servers/BasicManage/ShopSale'
import { Dispatch, RootModel } from '@uiw-admin/models'
import { createModel, RematchDispatch } from '@rematch/core'

export interface State {
  drawerVisible: boolean
  drawerDetailVisible: boolean
  tableType: string
  detailType: string
  detailtableType: string
  queryInfo: Change
  dataSource: Array<[]>
  detailDataSource: any
  isView: boolean
  id?: number
  shopsId: string
  delectVisible: boolean
  delectDetailVisible: boolean
  arrData: listProps[]
  queryInfoList: listProps[]
  industryList: any
}

const ShopSale = createModel<RootModel>()({
  name: 'ShopSale',
  state: {
    drawerVisible: false,
    drawerDetailVisible: false,
    tableType: '',
    detailType: '',
    detailtableType: '',
    queryInfo: { chargeList: [] },
    dataSource: [],
    detailDataSource: {},
    id: undefined,
    shopsId: '',
    isView: false,
    delectVisible: false,
    delectDetailVisible: false,
    arrData: [],
    queryInfoList: [],
    industryList: [],
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
          queryInfo: data.data.rows || {},
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
    async selectDictList(payload: Change) {
      const dph = dispatch as Dispatch
      const data = await selectDictList(payload)

      if (data.code === 1) {
        let industryList = data.data.map((itm: any) => ({
          label: itm.dictName,
          value: itm.dictCode.toString(),
        }))
        dph.ShopSale.updateState({
          industryList: industryList,
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
        queryInfo: { chargeList: [] },
        dataSource: [],
        isView: false,
      })
    },
  }),
})

export default ShopSale
