import { request } from '@uiw-admin/utils'

export interface Change {
  id?: string
  code?: string
  name?: string
  project?: string
  paymentMethod?: string
  price?: number
  collectionName?: string
  collectionTime?: string
  status?: string
  remark?: string
  customerType?: string
  refundTime?: string
  refundMethod?: string
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

const selectPage = '/api/buDeposit/selectPage'

const update = '/api/buDeposit/update'

const insert = '/api/buDeposit/add'

const deleteData = '/api/parkingArea/delete'

export { selectById, selectPage, update, insert, deleteData }
