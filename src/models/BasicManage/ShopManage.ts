import {
  selectById,
  Change,
  selectZoneList,
} from '../../servers/BasicManage/ShopManage'
import { Dispatch, RootModel } from '@uiw-admin/models'
import { createModel, RematchDispatch } from '@rematch/core'

interface State {
  drawerVisible: boolean
  tableType: string
  queryInfo: object
  isView: boolean
  id: string
  delectVisible: boolean
  loading: boolean
  selectZoneList: any
}

const ShopManage = createModel<RootModel>()({
  name: 'ShopManage',
  state: {
    drawerVisible: false,
    tableType: '',
    queryInfo: {},
    id: '',
    isView: false,
    delectVisible: false,
    loading: false,
    selectZoneList: [],
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
        dph.ShopManage.updateState({
          drawerVisible: true,
          queryInfo: data.data || {},
        })
      }
    },
    async selectZoneList(payload: Change) {
      const dph = dispatch as Dispatch
      const data = await selectZoneList(payload)

      if (data.code === 1) {
        let selectZoneList = data.data.map((itm: any) => ({
          label: itm.zoneName,
          value: itm.zoneName,
        }))

        dph.ShopManage.updateState({
          selectZoneList: selectZoneList,
        })
      }
    },

    clean() {
      const dph = dispatch as Dispatch
      dph.ShopManage.updateState({
        drawerVisible: false,
        tableType: '',
        queryInfo: {},
        isView: false,
      })
    },
  }),
})

export default ShopManage
