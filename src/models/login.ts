import { history, navigate } from '@uiw-admin/router-control'
import { RootModel } from '@uiw-admin/models'
import { createModel } from '@rematch/core'
import { Notify } from 'uiw'
import { register, LoginParams } from '@/servers/login'

export interface LoginState {
  token?: string | null
  userData?: {
    nickName: string
  } | null
}

const login = createModel<RootModel>()({
  name: 'login',
  state: {
    userData: null,
    token: null,
  },
  reducers: {
    updateState: (state: any, payload: LoginState) => ({
      ...state,
      ...payload,
    }),
  },
  effects: (dispatch: any) => ({
    // 注册
    async register(payload: LoginParams) {
      const data = await register(payload)
      if (data && data.code === 1) {
        Notify.success({ title: data.message })
        navigate('/login', { replace: true })
      } else {
        Notify.error({ title: data?.message || '' })
      }
      history.push('')
    },
    async submit() {
      dispatch.login.updateState({ token: '测试2' })
      sessionStorage.setItem('auth', JSON.stringify(['/home', '/dac']))
      history.push('/home')
    },
  }),
})

export default login
