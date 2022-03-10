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
 * 商铺综合收费-分页查询
 * @param {Object} params
 */

const selectPage = '/api/buComprehensiveSale/selectPage'

const update = '/api/test/select'

const insert = '/api/test/select'

const deleteData = '/api/test/select'

export { selectById, selectPage, update, insert, deleteData, shopSelectPage }
