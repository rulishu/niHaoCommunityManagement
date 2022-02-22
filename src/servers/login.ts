import { request } from '@uiw-admin/utils'

export interface Login {
  nickName: string
  password: string
}
export interface Register {
  uapAccountNickName: string
  uapAccountPassword: string
}
export interface LoginParams {
  cardId: string
  nickName: string
  password: string
  userName: string
  gender: string | number
  phoneNumber: string
}
// 注册
export function register(params: LoginParams) {
  return request('/api/account/register', {
    method: 'POST',
    body: { ...params },
  })
}

/**
 * 提交登录
 * @param {Object} params
 */
export function login(params: Login) {
  return request('/api/account/pcLogin', {
    method: 'POST',
    body: { ...params },
  })
}

/**
 * 刷新权限
 * @param {Object} params
 */
export function reloadAuth() {
  return request('/api/reloadAuth', {
    method: 'POST',
  })
}
