import { RootModel } from '@uiw-admin/models'
import { createModel } from '@rematch/core'
import { buChargesList, paysList } from '../servers/models'

export interface State {
  buChargesList: any
  paysList: any
}

const models = createModel<RootModel>()({
  name: 'models',
  state: {
    buChargesList: [],
    paysList: [],
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
            value: itm.chargeName,
          })),
        })
      }
    },
    async paysList(payload: any) {
      const dph = dispatch
      const data = await paysList(payload)
      console.log('data', data.data)

      if (data.code === 1) {
        dph.models.updateState({
          paysList:
            data.data &&
            data.data.map((itm: any) => ({
              label: itm.chargeName,
              value: itm.chargeName,
            })),
        })
      }
    },
  }),
})
export default models
