import { Dispatch } from '@uiw-admin/models'
import { Notify } from 'uiw'
import { createModel, RematchDispatch } from '@rematch/core'
import {
  shopSelectPage,
  Change,
  searchValue,
  dictionary,
  buCharge,
  buTemporaryCharges,
  buDeposit,
  buShop,
  buAdvanceDeposit,
  buShopChargeData,
  buShopChargeDatapay,
  buTemporaryChargesUpdate,
  buDepositUpdate,
} from '@/servers/ChargeManagement/ShopCharge'

interface State {
  drawerType: string
  drawerVisible: boolean
  queryInfo: object
  searchParms: object
  detailed: object
  selectedList: Array<any>
  shopNoList: Array<searchValue>
  payment: Array<searchValue>
  payService: Array<searchValue>
  table: any
}

const shopCharge = createModel()({
  name: 'shopCharge',
  state: {
    drawerVisible: false, //新增、预存弹框
    drawerType: '',
    queryInfo: {}, //表单信息
    detailed: {},
    searchParms: {},
    selectedList: [], // 勾选项
    table: {},

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
    clean() {
      const dph = dispatch as Dispatch
      dph.shopCharge.updateState({
        drawerVisible: false,
        drawerType: '',
        queryInfo: {},
        selectedList: [],
        table: {},
      })
    },

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
    async pay() {
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

    // 添加零时收费
    async buTemporaryCharges(payload: any) {
      return await buTemporaryCharges({ ...payload })
    },

    // 添加押金
    async getBuDeposit(payload: any) {
      return await buDeposit({ ...payload })
    },

    // 商铺-编号查已出租或出售商铺信息
    async buShop(payload: any) {
      const dph = dispatch as Dispatch
      const data = await buShop({ ...payload })
      if (data?.code === 1) {
        dph.shopCharge.updateState({
          detailed: data?.data || {},
        })
      } else {
        Notify.warning({ title: data?.message || '' })
      }
    },

    // 预存款-添加
    async getBuAdvanceDeposit(payload: any) {
      return await buAdvanceDeposit({ ...payload })
    },

    async getBuShopChargeData(payload: any) {
      const dph = dispatch as Dispatch
      const data = await buShopChargeData({ ...payload })
      if (data?.code === 1) {
        dph.shopCharge.updateState({
          queryInfo: data?.data || {},
        })
      } else {
        Notify.warning({ title: data?.message || '' })
      }
    },

    // 预存款-添加
    async getBuShopChargeDatapay(payload: any) {
      return await buShopChargeDatapay({ ...payload })
    },

    // 临时收费-修改
    async getBuTemporaryChargesUpdate(payload: any) {
      return await buTemporaryChargesUpdate({ ...payload })
    },

    // 押金管理-修改
    async getBuDepositUpdate(payload: any) {
      return await buDepositUpdate({ ...payload })
    },
  }),
})

export default shopCharge
