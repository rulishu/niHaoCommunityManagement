import { Dispatch, RootModel } from '@uiw-admin/models'
import { createModel, RematchDispatch } from '@rematch/core'
import {
  selectById,
  Change,
  selectShopList,
  selectAdvanceDepostAmountByCode,
} from '../../servers/ChargeManagement/PredepositsManage'

interface State {
  drawerVisible: boolean
  tableType: string
  queryInfo: object
  isView: boolean
  id: string
  delectVisible: boolean
  loading: boolean
  code: []
  buChargesList: []
  dataList: any
  refundAmountList: any
}

const PredepositsManage = createModel<RootModel>()({
  name: 'PredepositsManage',
  state: {
    drawerVisible: false,
    tableType: '',
    queryInfo: {},
    id: '',
    isView: false,
    delectVisible: false,
    loading: false,
    code: [],
    buChargesList: [],
    dataList: [],
    refundAmountList: [],
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
        dph.PredepositsManage.updateState({
          drawerVisible: true,
          queryInfo: data.data || {},
        })
      }
    },

    async selectShopList(payload: Change) {
      const dph = dispatch as Dispatch
      const data = await selectShopList(payload)

      if (data.code === 1) {
        let code = data.data.map((itm: any) => ({
          label: itm.code,
          value: itm.code,
        }))

        // let itmChargeList: any = [];
        // data.data && data.data.forEach((itm: any) => {
        //   itmChargeList = itm.chargeList
        // })
        // let buChargesList = itmChargeList && itmChargeList.map((itm: any) => ({
        //   label: itm.chargeName,
        //   value: itm.chargeId,
        // }))

        dph.PredepositsManage.updateState({
          dataList: data.data || [],
          code: code,
          // buChargesList: buChargesList
        })
      }
    },

    async selectAdvanceDepostAmountByCode(payload: Change) {
      const dph = dispatch as Dispatch
      const data = await selectAdvanceDepostAmountByCode(payload)

      if (data.code === 1) {
        dph.PredepositsManage.updateState({
          refundAmountList: data.data,
        })
      }
    },

    clean() {
      const dph = dispatch as Dispatch
      dph.PredepositsManage.updateState({
        drawerVisible: false,
        tableType: '',
        queryInfo: {},
        isView: false,
        delectVisible: false,
      })
    },
  }),
})

export default PredepositsManage
