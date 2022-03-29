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

const selectPage = 'api/buComprehensiveSale/selectPage'

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
  return request('/api/buTemporaryCharges/add', {
    method: 'POST',
    body: { ...params },
  })
}

// 添加押金
function buDeposit(params: any) {
  return request('/api/buDeposit/add', {
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
  shopSelectPage,
  buCharge,
  dictionary,
  buTemporaryCharges,
  buDeposit,
}
