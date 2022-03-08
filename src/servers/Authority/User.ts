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

const assignRole = '/api/account/assignRole'

const insert = '/api/account/register'

const deleteData = '/api/account/delete'

export { selectRoleList, selectPage, assignRole, insert, deleteData }
