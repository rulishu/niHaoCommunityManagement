import {
  selectById,
  selectByParentCode,
  Change,
} from '../../servers/BasicManage/BusinessManage'
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
  parentDivCodeList: any
  cityCodeList: any
  areaCodeList: any
}

const BusinessManage = createModel<RootModel>()({
  name: 'BusinessManage',
  state: {
    drawerVisible: false,
    tableType: '',
    queryInfo: {},
    id: '',
    isView: false,
    delectVisible: false,
    loading: false,
    parentDivCodeList: [],
    cityCodeList: [],
    areaCodeList: [],
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
        dph.BusinessManage.updateState({
          drawerVisible: true,
          queryInfo: data.data || {},
        })
      }
    },
    // 省列表
    async selectByParentCode(payload: Change) {
      const dph = dispatch as Dispatch
      const data = await selectByParentCode(payload)

      let parentDivCodeList = data.data.map((itm: any) => ({
        label: itm.divName,
        value: itm.divCode,
      }))
      if (data.code === 1) {
        dph.BusinessManage.updateState({
          parentDivCodeList: parentDivCodeList,
        })
      }
    },
    // 市列表
    async selectByCityCodeList(payload: Change) {
      const dph = dispatch as Dispatch
      const data = await selectByParentCode(payload)

      let cityCodeList = data.data.map((itm: any) => ({
        label: itm.divName,
        value: itm.divCode,
      }))
      if (data.code === 1) {
        dph.BusinessManage.updateState({
          cityCodeList: cityCodeList,
        })
      }
    },
    // 区列表
    async selectByAreaCodeList(payload: Change) {
      const dph = dispatch as Dispatch
      const data = await selectByParentCode(payload)

      let areaCodeList = data.data.map((itm: any) => ({
        label: itm.divName,
        value: itm.divCode,
      }))
      if (data.code === 1) {
        dph.BusinessManage.updateState({
          areaCodeList: areaCodeList,
        })
      }
    },

    clean() {
      const dph = dispatch as Dispatch
      dph.BusinessManage.updateState({
        drawerVisible: false,
        tableType: '',
        queryInfo: {},
        isView: false,
      })
    },
  }),
})

export default BusinessManage
