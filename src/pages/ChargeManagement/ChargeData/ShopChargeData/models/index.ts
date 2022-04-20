import { Dispatch, RootModel } from '@uiw-admin/models'
import { createModel, RematchDispatch } from '@rematch/core'
import {
  shopSelectPage,
  selectProject,
} from '@/servers/ChargeManagement/shopCharges'

interface State {
  drawerVisible: boolean
  drawerType: string
  queryInfo: any
  shopNoList: Array<any>
  projectList: Array<any>
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
  }),
})

export default shopCharges
