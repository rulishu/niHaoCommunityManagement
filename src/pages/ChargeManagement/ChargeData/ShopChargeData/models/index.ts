import { Dispatch, RootModel } from '@uiw-admin/models'
import { createModel, RematchDispatch } from '@rematch/core'
import {
  shopSelectPage,
  selectProject,
  buShopChargeDataDelete,
} from '@/servers/ChargeManagement/shopCharges'

interface State {
  drawerVisible: boolean
  drawerType: string
  queryInfo: any
  shopNoList: Array<any>
  projectList: Array<any>
  visible: boolean
  loading: boolean
}

const shopCharges = createModel<RootModel>()({
  name: 'shopCharges',
  state: {
    // drawer 显示
    drawerVisible: false,
    drawerType: '',
    // 单条数据
    queryInfo: {},
    // 商铺
    shopNoList: [],
    // 常规收费项类
    projectList: [],
    //  Alert 显示
    visible: false,
    // loading
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
      dph.shopCharges.updateState({
        drawerVisible: false,
        drawerType: '',
        queryInfo: {},
        visible: false,
        loading: false,
      })
    },

    // 查询所有商铺
    async shopSelectPage(payload: any) {
      const dph = dispatch as Dispatch
      const data = await shopSelectPage(payload)
      if (data.code === 1) {
        dph.shopCharges.updateState({
          shopNoList: Array.isArray(data?.data)
            ? data?.data.map((item: any) => {
                return {
                  value: item?.shopNo,
                  label: item?.shopName,
                }
              })
            : [],
        })
      }
    },

    // 获取常规收费项类
    async selectProject(payload: any) {
      const dph = dispatch as Dispatch
      const data = await selectProject(payload)
      if (data.code === 1) {
        dph.shopCharges.updateState({
          projectList: Array.isArray(data?.data)
            ? data?.data.map((item: any) => {
                return {
                  value: item?.id,
                  label: item?.chargeName,
                  chargePrice: item?.chargePrice,
                }
              })
            : [],
        })
      }
    },

    // 获取常规收费项类
    async buShopChargeDataDelete(payload: any) {
      const dph = dispatch as Dispatch
      dph.shopCharges.updateState({
        loading: true,
      })
      return await buShopChargeDataDelete(payload)
    },
  }),
})

export default shopCharges
