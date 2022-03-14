import { request } from '@uiw-admin/utils'

export interface Change {
  id?: string
  nickName?: string
  password?: string
}

/**
 * 停车场管理-停车场管理-查询
 * @param {Object} params
 */
function selectById(params: Change) {
  return request('/api/buDeposit/selectById', {
    method: 'POST',
    body: { ...params },
  })
}

const selectPage = '/api/innerAccount/selectPage'

const update = '/api/buDeposit/update'

const insert = '/api/innerAccount/add'

const deleteData = '/api/parkingArea/delete'

export { selectById, selectPage, update, insert, deleteData }
