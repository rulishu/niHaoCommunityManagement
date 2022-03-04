import { request } from '@uiw-admin/utils'

export interface Change {
  id?: string
  roleName?: string
  createName?: string
  status?: number | string
  remark?: string
  roleId?: string
  updateTime?: string
  createTime?: string
}

/**
 * 角色管理-菜单列表
 * @param {Object} params
 */
function selectById(params: Change) {
  return request('/api/menu/selectList', {
    method: 'POST',
    body: { ...params },
  })
}

/**
 * 角色管理-分页查询
 * @param {Object} params
 */
const selectPage = '/api/role/selectPage'
/**
 * 角色管理-配置菜单
 * @param {Object} params
 */
const assignMenu = '/api/role/assignMenu'

const update = '/api/role/edit'

const insert = '/api/role/add'

const deleteData = '/api/role/delete'

export { selectById, selectPage, update, insert, deleteData, assignMenu }
