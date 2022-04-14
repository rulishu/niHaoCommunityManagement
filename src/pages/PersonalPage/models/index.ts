import { Dispatch } from '@uiw-admin/models'
import { createModel, RematchDispatch } from '@rematch/core'
interface State {
  title: string
  index: string
}
const userInfo = createModel()({
  name: 'userInfo',
  state: {
    title: '基本信息',
    index: '1',
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
      dph.userInfo.updateState({
        title: '基本信息',
        index: '1',
      })
    },
  }),
})

export default userInfo
