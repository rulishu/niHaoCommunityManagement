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
  return request('/api/test/select', {
    method: 'POST',
    body: { ...params },
  })
}

const selectPage = '/api/buAdvanceDeposit/selectPage'

const update = '/api/test/select'

const insert = '/api/test/select'

const deleteData = '/api/test/select'

export { selectById, selectPage, update, insert, deleteData }
