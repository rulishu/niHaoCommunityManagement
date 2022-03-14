import { request } from '@uiw-admin/utils'

export interface Change {
  id?: string
  roleName?: string
  userName?: string
  gender?: number | string
  cardId?: number
  avatar?: string
  nickName?: string
  status?: number
  phoneNumber?: number
  password?: number
}

export interface State {
  drawerVisible?: boolean
  tableType?: string
  queryInfo?: object
  isView?: boolean
  delectVisible?: boolean
  id?: string
  keys?: string
}

export interface columnsRowSpan {
  rowSpan?: number
}
/**
 * 角色管理-角色列表
 * @param {Object} params
 */
function selectRoleList(params: Change) {
  return request('/api/role/selectRoleList', {
    method: 'POST',
    body: { ...params },
  })
}

const selectPage = '/api/account/selectPage'
/**
 * 账号管理-分配角色
 * @param {Object} params
 */
const assignRole = '/api/account/assignRole'

const insert = '/api/account/register'

const deleteData = '/api/account/delete'

/**
 * 内部账号-分页查询
 * @param {Object} params
 */
const inSelectPage = '/api/innerAccount/selectPage'

/**
 * 内部账号-授权
 * @param {Object} params
 */
const inAssignRole = '/api/innerAccount/assignRole'

/**
 * 内部账号-角色列表
 * @param {Object} params
 */
function inSelectRoleList(params: Change) {
  return request('/api/innerAccount/selectRoleList', {
    method: 'POST',
    body: { ...params },
  })
}

export {
  selectRoleList,
  selectPage,
  assignRole,
  insert,
  deleteData,
  inSelectPage,
  inSelectRoleList,
  inAssignRole,
}
