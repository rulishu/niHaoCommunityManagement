import { request } from '@uiw-admin/utils';

export interface Login {
  username: string;
  password: string;
}
export interface Register {
  uapAccountNickName: string;
  uapAccountPassword: string;
}
export interface LoginParams {
  idCard: string;
  nickName: string;
  password: string;
  realName: string;
}
// 注册
export function register(params: LoginParams) {
  return request('/api/account/outRegister', {
    method: 'POST',
    body: { ...params },
  });
}

/**
 * 提交登录
 * @param {Object} params
 */
export function login(params: Login) {
  return request('/api/login', {
    method: 'POST',
    body: { ...params },
  });
}

/**
 * 刷新权限
 * @param {Object} params
 */
export function reloadAuth() {
  return request('/api/reloadAuth', {
    method: 'POST',
  });
}
