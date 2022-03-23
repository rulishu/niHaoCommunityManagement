import { request } from '@uiw-admin/utils'

export interface Change {
  id?: string
  chargeItem?: string
  code?: string
  name?: string
  payService?: string
  paymentMethod?: string
  chargeAmount?: string
  chargingTime?: string
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

const insert = '/api/buAdvanceDeposit/add'

const deleteData = '/api/test/select'

export { selectById, selectPage, update, insert, deleteData }
