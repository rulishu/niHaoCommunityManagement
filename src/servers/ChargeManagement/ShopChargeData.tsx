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
  return request('', {
    method: 'POST',
    body: { ...params },
  })
}

const selectPage = ''

const update = ''

const insert = ''

const deleteData = ''

export { selectById, selectPage, update, insert, deleteData }
