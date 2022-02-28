import { request } from '@uiw-admin/utils'

export interface Change {
  id?: string
  roleName?: string
  userName?: string
  gender?: string
  cardId?: string
  avatar?: string
  nickName?: string
  status?: number
  phoneNumber?: number
  password?: number

  uapRoleName?: string
  jurisdiction?: string
  updateName?: string
  textarea?: string
}

function selectById(params: Change) {
  return request('/api/test/select', {
    method: 'POST',
    body: { ...params },
  })
} 

const selectPage = '/api/account/selectPage'

const update = '/api/test/select'

const insert = '/api/account/register'

const deleteData = '/api/test/select'

export { selectById, selectPage, update, insert, deleteData }
