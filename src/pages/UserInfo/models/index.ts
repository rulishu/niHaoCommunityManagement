import { Dispatch } from '@uiw-admin/models'
import { createModel, RematchDispatch } from '@rematch/core'
import { Notify } from 'uiw'
import {
  getProfile,
  modifyProfile,
  fileUpload,
  modifyPassword,
} from '@/servers/PersonalPage'
interface State {
  title: string
  index: string
  userInfoData: any
  roleList: []
}
const userInfo = createModel()({
  name: 'userInfo',
  state: {
    title: '基本信息',
    index: '1',
    userInfoData: {},
    roleList: [],
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
        let roleList = []
        if (Array.isArray(data?.data?.roleList)) {
          roleList = data?.data?.roleList.map((item: any) => {
            return {
              value: item.roleId,
              label: item.roleName,
            }
          })
        }
        dph.userInfo.updateState({
          userInfoData: data?.data || {},
          roleList,
        })
      } else {
        Notify.error({ title: data?.message || '' })
      }
    },

    //个人信息修改
    async getdifyProfile(payload) {
      return await modifyProfile({ ...payload })
    },

    //文件上传
    async getFileUpload(payload) {
      return await fileUpload({ ...payload })
    },

    //修改密码
    async getModifyPassword(payload) {
      return await modifyPassword({ ...payload })
    },
  }),
})

export default userInfo
