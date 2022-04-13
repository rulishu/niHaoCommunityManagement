import { Dispatch, RootModel } from '@uiw-admin/models'
import { createModel, RematchDispatch } from '@rematch/core'
import {
  selectById,
  Change,
  selectShopList,
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
  dataList: []
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
        // console.log('data',data.data[0].code);
        // console.log('data',data.data[0].userName);
        console.log('data', data.data[0].chargeList)

        let buChargesList = data.data[0].chargeList.map((itm: any) => ({
          label: itm.chargeName,
          value: itm.chargeId,
        }))
        let code = data.data.map((itm: any) => ({
          label: itm.code,
          value: itm.code,
        }))

        dph.PredepositsManage.updateState({
          dataList: data.data || [],
          code: code,
          buChargesList: buChargesList,
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
