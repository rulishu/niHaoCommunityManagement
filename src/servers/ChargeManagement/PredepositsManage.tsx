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
  refundWay?: string
  refundTime?: string
  chargeName?: string
}

/**
 * 停车场管理-停车场管理-查询
 * @param {Object} params
 */
function selectById(params: Change) {
  return request('/api/buAdvanceDeposit/selectById', {
    method: 'POST',
    body: { ...params },
  })
}

const selectPage = '/api/buAdvanceDeposit/selectPage'

const update = '/api/buAdvanceDeposit/refund'

const insert = '/api/buAdvanceDeposit/add'

const deleteData = '/api/buAdvanceDeposit/delete'

// const selectAdvanceDepositeByCode =
//   '/api/buAdvanceDeposit/selectAdvanceDepositeByCode'

function selectAdvanceDepositeByCode(params: Change) {
  return request('/api/buAdvanceDeposit/selectAdvanceDepositeByCode', {
    method: 'POST',
    body: { ...params },
  })
}

export {
  selectById,
  selectPage,
  update,
  insert,
  deleteData,
  selectAdvanceDepositeByCode,
}
