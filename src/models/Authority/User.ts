import {
  selectRoleList,
  Change,
  inSelectRoleList,
} from '../../servers/Authority/User'
import { Dispatch, RootModel } from '@uiw-admin/models'
import { createModel, RematchDispatch } from '@rematch/core'

interface State {
  drawerVisible: boolean
  tableType: string
  queryInfo: object
  isView: boolean
  id: string
  delectVisible: boolean
  roleList: any[]
  keys: string
}

const User = createModel<RootModel>()({
  name: 'User',
  state: {
    drawerVisible: false,
    tableType: '',
    queryInfo: {},
    id: '',
    isView: false,
    delectVisible: false,
    roleList: [],
    keys: 'outside',
  } as State,
  reducers: {
    updateState: (state: State, payload: Partial<State>) => ({
      ...state,
      ...payload,
    }),
  },
  effects: (dispatch: RematchDispatch<RootModel>) => ({
    async selectRoleList(payload: Change) {
      const dph = dispatch as Dispatch
      const data = await selectRoleList(payload)
      if (data.code === 1) {
        dph.User.updateState({
          drawerVisible: true,
          roleList: data.data.roleList || [],
        })
      }
    },

    async inSelectRoleList(payload: Change) {
      const dph = dispatch as Dispatch
      const data = await inSelectRoleList(payload)
      if (data.code === 1) {
        dph.User.updateState({
          drawerVisible: true,
          roleList: data.data || [],
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
      })
    },
  }),
})

export default User
