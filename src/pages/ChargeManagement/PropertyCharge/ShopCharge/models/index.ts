import { Dispatch } from '@uiw-admin/models'
import { createModel, RematchDispatch } from '@rematch/core'
import {
  shopSelectPage,
  Change,
  searchValue,
  dictionary,
  buCharge,
} from '@/servers/ChargeManagement/ShopCharge'

interface State {
  drawerType: string
  drawerVisible: boolean
  queryInfo: object
  shopNoList: Array<searchValue>
  payment: Array<searchValue>
  payService: Array<searchValue>
}

const shopCharge = createModel()({
  name: 'shopCharge',
  state: {
    drawerVisible: false, //新增、预存弹框
    drawerType: '',
    queryInfo: {}, //表单信息

    shopNoList: [], //商铺查询
    payment: [], //支付方式
    payService: [], // 收费项目
  } as State,
  reducers: {
    updateState: (state: State, payload: Partial<State>) => ({
      ...state,
      ...payload,
    }),
  },
  effects: (dispatch: RematchDispatch<any>) => ({
    // 查询所有商铺
    async shopSelectPage(payload: Change) {
      const dph = dispatch as Dispatch
      const data = await shopSelectPage(payload)
      if (data.code === 1) {
        dph.shopCharge.updateState({
          shopNoList: Array.isArray(data?.data?.rows)
            ? data?.data?.rows.map((item: any) => {
                return {
                  value: item.shopNo,
                  label: item.shopName,
                }
              })
            : [],
        })
      }
    },

    // 支付方式
    async pay(payload: any) {
      const dph = dispatch as Dispatch
      const data = await dictionary({ dictType: '付款方式' })
      if (data.code === 1) {
        dph.shopCharge.updateState({
          payment: Array.isArray(data?.data)
            ? data?.data.map((item: any) => {
                return {
                  value: item.dictCode,
                  label: item.dictName,
                }
              })
            : [],
        })
      }
    },

    // 收费项目
    async service(payload: any) {
      const dph = dispatch as Dispatch
      const data = await buCharge(payload)
      if (data.code === 1) {
        dph.shopCharge.updateState({
          payService: Array.isArray(data?.data)
            ? data?.data?.map((item: any) => {
                return {
                  value: item.id,
                  label: item.chargeName,
                }
              })
            : [],
        })
      }
    },
    clean() {
      const dph = dispatch as Dispatch
      dph.shopCharge.updateState({
        drawerVisible: false,
        drawerType: '',
        queryInfo: {},
      })
    },
  }),
})

export default shopCharge
