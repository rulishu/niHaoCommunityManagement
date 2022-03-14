import { request } from '@uiw-admin/utils'

export interface Change {
  id?: string
  zoneName?: string
  zoneNo?: number
  zoneRemark?: string
}

function selectById(params: Change) {
  return request('/api/test/select', {
    method: 'POST',
    body: { ...params },
  })
}
function detailData(params: Change) {
  return request('/api/buCharge/selectPage', {
    method: 'POST',
    body: { ...params },
  })
}

const selectPage = '/api/SaleShops/selectPage'

const update = '/api/test/select'

const insert = '/api/test/select'

const deleteData = '/api/test/select'

const detailSelectPage = '/api/buCharge/selectPage'

const detailAdd = '/api/SaleShops/add'

export {
  selectById,
  detailData,
  selectPage,
  update,
  insert,
  deleteData,
  detailSelectPage,
  detailAdd,
}
