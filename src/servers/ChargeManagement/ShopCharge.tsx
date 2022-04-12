import { request } from '@uiw-admin/utils'

export interface Change {
  id?: string
  typeCd?: string
  shopNo?: string
  code?: string
}
export interface searchValue {
  value: string
  label: string
}

function selectById(params: Change) {
  return request('/api/test/select', {
    method: 'POST',
    body: { ...params },
  })
}

/**
 * 商铺-分页查询
 * @param {Object} params
 */

function shopSelectPage(params: Change) {
  return request('/api/buShop/selectPage', {
    method: 'POST',
    body: { ...params },
  })
}

/**
 * 商铺-分页查询
 * @param {Object} params
 */

/**
 * 商铺综合收费-分页查询
 * @param {Object} params
 */

const selectPage = 'api/buShopChargeData/selectPayList'

const update = '/api/test/select'

const insert = '/api/test/select'

const deleteData = '/api/test/select'

//支付方式
function dictionary(params: any) {
  return request('/api/dictionary/selectDictList', {
    method: 'POST',
    body: { ...params },
  })
}

//收费项目
function buCharge(params: any) {
  return request('/api/buCharge/selectList', {
    method: 'POST',
    body: { ...params },
  })
}

// 添加零食收费
function buTemporaryCharges(params: any) {
  return request('/api/buTemporaryCharges/addByCode', {
    method: 'POST',
    body: { ...params },
  })
}

// 添加押金
function buDeposit(params: any) {
  return request('/api/buDeposit/addByCode', {
    method: 'POST',
    body: { ...params },
  })
}

// 商铺-编号查已出租或出售商铺信息
function buShop(params: any) {
  return request('/api/buShop/selectByCode', {
    method: 'POST',
    body: { ...params },
  })
}

// 商铺收费数据-历史收费数据
const selectHistoryPayList = '/api/buShopChargeData/selectHistoryPayList'

// 预存款-添加
function buAdvanceDeposit(params: any) {
  return request('/api/buAdvanceDeposit/add', {
    method: 'POST',
    body: { ...params },
  })
}

// 商铺收费数据-收费计算
function buShopChargeData(params: any) {
  return request('/api/buShopChargeData/normalCalcPay', {
    method: 'POST',
    body: { ...params },
  })
}

// 商铺收费数据-收费保存
function buShopChargeDatapay(params: any) {
  return request('/api/buShopChargeData/pay', {
    method: 'POST',
    body: { ...params },
  })
}

// 临时收费-修改
function buTemporaryChargesUpdate(params: any) {
  return request('/api/buTemporaryCharges/update', {
    method: 'POST',
    body: { ...params },
  })
}

// 临时收费-修改
function buDepositUpdate(params: any) {
  return request('/api/buDeposit/update', {
    method: 'POST',
    body: { ...params },
  })
}

// 商铺租售-根据编号查商铺租售收费信息
function selectShopChargeByCode(params: any) {
  return request('/api/SaleShops/selectShopChargeByCode', {
    method: 'POST',
    body: { ...params },
  })
}

const selectAdvanceDepostAmountByCode =
  '/api/buAdvanceDeposit/selectAdvanceDepostAmountByCode'
export {
  selectById,
  selectPage,
  update,
  insert,
  deleteData,
  shopSelectPage,
  buCharge,
  dictionary,
  buTemporaryCharges,
  buDeposit,
  buShop,
  selectHistoryPayList,
  buAdvanceDeposit,
  buShopChargeData,
  buShopChargeDatapay,
  buTemporaryChargesUpdate,
  buDepositUpdate,
  selectShopChargeByCode,
  selectAdvanceDepostAmountByCode,
}
