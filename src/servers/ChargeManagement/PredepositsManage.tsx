import { request } from '@uiw-admin/utils'

export interface Change {
  id?: string
  chargeItem?: string
  code?: string
  name?: string
  payService?: string
  payServiceName?: string
  paymentMethod?: string
  paymentMethodName?: string
  chargeAmount?: string
  chargingTime?: string
  refundWay?: string
  refundTime?: string
  chargeName?: string
}
export interface RefundAmount {
  chargeAmount?: number
  code?: string
  id?: number
  payService?: string
  payServiceName?: string
  refundAmount?: string
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

// 商铺管理列表
function selectShopList(params: Change) {
  return request('/api/buShop/selectShopList', {
    method: 'POST',
    body: { ...params },
  })
}
// 商铺编号查收费项余额
function selectAdvanceDepostAmountByCode(params: Change) {
  return request('/api/buAdvanceDeposit/selectAdvanceDepostAmountByCode', {
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
  selectShopList,
  selectAdvanceDepostAmountByCode,
}
