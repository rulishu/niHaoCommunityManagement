import { Dispatch, RootModel } from '@uiw-admin/models'
import { createModel, RematchDispatch } from '@rematch/core'
import {
  shopSelectPage,
  selectProject,
  buShopChargeDataDelete,
  buShopChargeDataAdd,
  selectProjectTable,
  buShopChargeDataUpdate,
  // selectProjectAllShop,
  selectProjectByCode,
  gitBatchAdd,
} from '@/servers/ChargeManagement/shopCharges'

interface State {
  drawerVisible: boolean
  drawerType: string
  queryInfo: any
  shopNoList: Array<any>
  projectList: Array<any>
  shopList: Array<any>
  codeList: Array<any>
  visible: boolean
  loading: boolean
  table: any
  clientList: Array<any>
  usernameCodes?: Array<any>
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
    shopList: [],
    //  Alert 显示
    visible: false,
    // loading
    loading: false,
    // table
    table: {},
    codeList: [],
    clientList: [],
    usernameCodes: [],
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
        table: {},
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
                  username: item?.username,
                  chargePrice: item?.id,
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

    // 获取所有按表走常规收费项
    async selectProjectTable(payload: any) {
      const dph = dispatch as Dispatch
      const data = await selectProjectTable(payload)
      if (data.code === 1) {
        dph.shopCharges.updateState({
          shopList: Array.isArray(data?.data)
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
    //  获取所有已租售商铺编号-编号查询
    // async selectProjectAllShop(payload: any) {
    //   const dph = dispatch as Dispatch
    //   const data = await selectProjectAllShop(payload)
    //   if (data.code === 1) {
    //     dph.shopCharges.updateState({
    //       codeList: Array.isArray(data?.data)
    //         ? data?.data.map((item: any) => {
    //             return {
    //               value: item?.shopNo,
    //               label: item?.shopName,
    //               chargePrice: item?.id,
    //               username: item?.username,
    //             }
    //           })
    //         : [],
    //     })
    //   }
    // },
    //  商铺收费数据-通过code批量获取数据
    async selectProjectByCode(payload: any) {
      const dph = dispatch as Dispatch
      const data = await selectProjectByCode(payload)
      if (data.code === 1) {
        dph.shopCharges.updateState({
          clientList: Array.isArray(data?.data)
            ? data?.data.map((item: any) => ({
                username: item?.username || '',
              }))
            : [],
        })
      }
    },
    //  批量新增
    async gitBatchAdd(payload: any, shopCharges: any) {
      console.log('payload', payload)
      const dph = dispatch as Dispatch
      const data = await gitBatchAdd(payload)
      if (data.code === 1) {
        dph.shopCharges.updateState({
          drawerVisible: false,
          drawerType: '',
        })
        shopCharges.shopCharges.table.onSearch()
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

    // 新增
    async buShopChargeDataAdd(payload: any) {
      const dph = dispatch as Dispatch
      dph.shopCharges.updateState({
        loading: true,
      })
      return await buShopChargeDataAdd(payload)
    },

    // 编辑
    async getbuShopChargeDataUpdate(payload: any) {
      const dph = dispatch as Dispatch
      dph.shopCharges.updateState({
        loading: true,
      })
      return await buShopChargeDataUpdate(payload)
    },
  }),
})

export default shopCharges
