import { Dispatch } from '@uiw-admin/models'
import { createModel, RematchDispatch } from '@rematch/core'
import {
  shopSelectPage,
  Change,
  searchValue,
} from '../../servers/ChargeManagement/ShopCharge'

interface State {
  drawerType: string
  drawerVisible: boolean
  shopNoList: Array<searchValue>
  queryInfo: object
}

const shopCharge = createModel()({
  name: 'shopCharge',
  state: {
    drawerVisible: false, //新增、预存弹框
    drawerType: '',
    shopNoList: [], //商铺查询
    queryInfo: {}, //表单信息
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
    clean() {
      const dph = dispatch as Dispatch
      dph.shopCharge.updateState({
        drawerVisible: false,
        drawerType: '',
      })
    },
  }),
})

export default shopCharge
