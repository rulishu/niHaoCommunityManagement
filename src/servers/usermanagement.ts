export interface Usermanagement {
  id?: string
  createName?: string
  userName?: string
  phoneNumber?: string
  gender?: string
  status?: number
  createTime?: string
  remark?: string
}

const update = '/api/user/edit'

/**
 * 用户管理-删除
 * @param {Object} params
 */
const deleteData = '/api/user/delete'

export { update, deleteData }
