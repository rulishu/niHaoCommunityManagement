import { request } from '@uiw-admin/utils'

export interface Change {
  id?: string
  roleName?: string
  createName?: string
  status?: number
  remark?: string
}

function selectById(params: Change) {
  return request('/api/test/select', {
    method: 'POST',
    body: { ...params },
  })
}

const selectPage = '/api/role/selectPage'

const update = '/api/test/select'

const insert = '/api/test/select'

const deleteData = '/api/test/select'

export { selectById, selectPage, update, insert, deleteData }
