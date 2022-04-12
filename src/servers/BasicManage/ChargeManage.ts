import { request } from '@uiw-admin/utils'

export interface Change {
  id?: string
  chargeType?: string
  chargeName?: string
  chargeTypeName?: string
  chargePrice?: number
  chargeNumType?: string
  chargeNumTypeName?: string
  chargeFormula?: string
  chargeMonth?: number
  chargeDay?: number
  chargeLateProportion?: number
  chargeLateType?: number
}

function selectById(params: Change) {
  return request('/api/buCharge/selectById', {
    method: 'POST',
    body: { ...params },
  })
}

const selectPage = '/api/buCharge/selectPage'

const update = '/api/buCharge/update'

const insert = '/api/buCharge/add'

const deleteData = '/api/buCharge/delete'

export { selectById, selectPage, update, insert, deleteData }
