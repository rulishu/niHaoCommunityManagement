import { Dispatch, RootModel } from '@uiw-admin/models'
import { createModel, RematchDispatch } from '@rematch/core'
import {
  shopSelectPage,
  Change,
  searchValue,
} from '../../servers/ChargeManagement/ShopCharge'

interface State {
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

const shopCharge = createModel<RootModel>()({
  name: 'shopCharge',
  state: {
    tableType: '1',
    drawerVisible: false, //新增、预存弹框
    queryInfo: {}, //新增、预存
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

    shopNoList: [], //商铺查询
  } as State,
  reducers: {
    updateState: (state: State, payload: Partial<State>) => ({
      ...state,
      ...payload,
    }),
  },
  effects: (dispatch: RematchDispatch<RootModel>) => ({
    async shopSelectPage(payload: Change) {
      const dph = dispatch as Dispatch
      const data = await shopSelectPage(payload)
      if (data.code === 1) {
        let newList: any[] = data.data.rows
        let arr: searchValue[] = []
        if (newList.length > 0) {
          newList.forEach((item: any) => {
            arr.push({
              value: item.shopNo,
              label: item.shopNo,
            })
          })
        }

        dph.shopCharge.updateState({
          shopNoList: arr,
        })
      }
    },

    clean() {
      const dph = dispatch as Dispatch
      dph.users.updateState({
        drawerVisible: false,
        tableType: '',
        queryInfo: {},
        isView: false,
        delectVisible: false,
      })
    },
  }),
})

export default shopCharge
