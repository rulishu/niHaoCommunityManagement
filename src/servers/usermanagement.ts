export interface Usermanagement {
  id?: string
  uapAccountNickName?: string
  uapUserRealName?: string
  createTime?: string
  uapRoleName?: string
}

const selectPage = '/api/account/selectPage'

const update = '/api/uapUser/edit'

const deleteById = '/api/account/delete'

export { deleteById, selectPage, update }
