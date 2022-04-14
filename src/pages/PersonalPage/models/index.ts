import { Dispatch } from '@uiw-admin/models'
import { createModel, RematchDispatch } from '@rematch/core'
import { Notify } from 'uiw'
import { getProfile } from '@/servers/PersonalPage'
interface State {
  title: string
  index: string
  userInfoData: any
}
const userInfo = createModel()({
  name: 'userInfo',
  state: {
    title: '基本信息',
    index: '1',
    userInfoData: {},
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

    //个人资料
    async getProfileFun() {
      const dph = dispatch as Dispatch
      const data = await getProfile(null)
      if (data.code === 1) {
        dph.userInfo.updateState({
          userInfoData: data?.data?.user || {},
        })
      } else {
        Notify.warning({ title: data?.message || '' })
      }
    },
  }),
})

export default userInfo
