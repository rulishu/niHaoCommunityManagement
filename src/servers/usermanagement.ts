import { request } from '@uiw-admin/utils'
export interface Usermanagement {
  id?: string
  uapAccountNickName?: string
  uapUserRealName?: string
  createTime?: string
  uapRoleName?: string
}

function selectById(params: Usermanagement) {
  return request('/api/test/select', {
    method: 'POST',
    body: { ...params },
  })
}

const selectPage = '/api/test/select'

const update = '/api/test/select'

// const insert = '/api/test/select'

const deleteData = '/api/test/select'

export { selectById, selectPage, update, deleteData }
