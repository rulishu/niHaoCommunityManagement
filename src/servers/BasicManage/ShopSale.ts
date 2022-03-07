import { request } from '@uiw-admin/utils'

export interface Change {
  id?: string
  types?: string
  detailType?: string
  chargeName?: string
  univalent?: string
  num?: number
  Formula?: string
  calculationCycle?: string
  lateFee?: string
  lateFeeRatio?: string
  lateFeeDays?: string
  page?:number
  pageSize?:number
}

function selectById(params: Change) {
  return request('/api/test/select', {
    method: 'POST',
    body: { ...params },
  })
}

const selectPage = '/api/SaleShops/selectPage'

const update = '/api/test/select'

const insert = '/api/test/select'

const deleteData = '/api/test/select'

function detailData(params: Change) {
  return request('/api/buCharge/selectPage', {
    method: 'POST',
    body: { ...params },
  })
}
function detailAdd(params: Change) {
  return request('/api/SaleShops/add', {
    method: 'POST',
    body: { ...params },
  })
}

export {
  selectById, selectPage, update, insert, deleteData,
  detailData, detailAdd
}
