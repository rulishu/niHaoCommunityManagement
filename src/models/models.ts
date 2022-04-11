import { RootModel } from '@uiw-admin/models'
import { createModel } from '@rematch/core'
import { buChargesList, paysList, statusList } from '../servers/models'

export interface State {
  buChargesList: any
  paysList: any
  statusList: any
}

const models = createModel<RootModel>()({
  name: 'models',
  state: {
    buChargesList: [],
    paysList: [],
    statusList: [],
  },
  reducers: {
    updateState: (state: State, payload: Partial<State>) => ({
      ...state,
      ...payload,
    }),
  },
  effects: (dispatch) => ({
    async buChargesList(payload: any) {
      const dph = dispatch
      const data = await buChargesList(payload)

      if (data.code === 1) {
        dph.models.updateState({
          buChargesList: data.data.map((itm: any) => ({
            label: itm.chargeName,
            value: itm.id,
          })),
        })
      }
    },
    async paysList(payload: any) {
      const dph = dispatch
      const data = await paysList(payload)

      if (data.code === 1) {
        dph.models.updateState({
          paysList:
            data.data &&
            data.data.map((itm: any) => ({
              label: itm.dictName,
              value: itm.dictCode.toString(),
            })),
        })
      }
    },
    async statusList(payload: any) {
      const dph = dispatch
      const data = await statusList(payload)

      if (data.code === 1) {
        dph.models.updateState({
          statusList:
            data.data &&
            data.data.map((itm: any) => ({
              label: itm.dictName,
              value: itm.dictCode.toString(),
            })),
        })
      }
    },
  }),
})
export default models
