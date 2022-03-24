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
  tableType: string
  queryInfo: object
  isView: boolean
  id: string
  delectVisible: boolean
  keys: string
  btnStatus: string
  chargeVisible: boolean
  chargeDataList: Array<any>
  historyVisible: boolean
  historyList: Array<any>
  backVisible: boolean
  printVisible: boolean
  printDropdown: number
  isOpen: boolean
  shopNoList: Array<searchValue>
}

const shopCharge = createModel()({
  name: 'shopCharge',
  state: {
    drawerVisible: false, //新增、预存弹框
    drawerType: '',
    shopNoList: [], //商铺查询
    queryInfo: {}, //表单信息

    tableType: '1',
    id: '',
    isView: false,
    delectVisible: false,
    keys: 'rout', //标签页
    btnStatus: '', //按钮标签
    chargeVisible: false, //收费弹框
    chargeDataList: [
      {
        shouName: '1',
        startingTime: '1',
        endTime: '1',
        fee: 0,
        lateFee: 0,
        moneyAmount: 2990,
      },
    ],
    historyVisible: false, //历史信息弹框
    historyList: [{ print: '打印', name: '1', money: '已付款' }],
    backVisible: false, //退还弹框
    printVisible: false, //打印弹框
    printInfo: {}, //打印数据
    printDropdown: 1, //打印下拉
    isOpen: false, //打印下拉菜单
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
