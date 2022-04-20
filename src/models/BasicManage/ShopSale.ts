import {
  selectById,
  Change,
  listProps,
  selectDictList,
  seraSelectPageList,
  seraDelete,
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
  isView: boolean
  id?: number
  shopsId: string
  delectVisible: boolean
  delectDetailVisible: boolean
  arrData: listProps[]
  queryInfoList: listProps[]
  tableList: listProps[]
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
    id: undefined,
    shopsId: '',
    isView: false,
    delectVisible: false,
    delectDetailVisible: false,
    arrData: [],
    queryInfoList: [],
    industryList: [],
    tableList: [],
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

    // 从事行业字典接口
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

    // 默认收费项-查询列表
    async seraSelectPageList(payload: Change) {
      const dph = dispatch as Dispatch
      const data = await seraSelectPageList(payload)
      if (data.code === 1) {
        dph.ShopSale.updateState({
          tableList: data.data.rows,
        })
      }
    },

    // 默认收费项删除
    async seraDelete(payload: Change) {
      const dph = dispatch as Dispatch
      const data = await seraDelete(payload)
      if (data.code === 1) {
        dph.ShopSale.updateState({
          drawerDetailVisible: false,
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
        isView: false,
      })
    },
  }),
})

export default ShopSale
