import { request } from '@uiw-admin/utils'

export interface Change {
  id?: string
  roleName?: string
  userName?: string
  gender?: number
  cardId?: number
  avatar?: string
  nickName?: string
  status?: number
  phoneNumber?: number
  password?: number
}

function selectById(params: Change) {
  return request('/api/account/selectAccountDetail', {
    method: 'POST',
    body: { ...params },
  })
} 

const selectPage = '/api/account/selectPage'

const update = '/api/account/edit'

const insert = '/api/account/register'

const deleteData = '/api/test/select'

export { selectById, selectPage, update, insert, deleteData }
