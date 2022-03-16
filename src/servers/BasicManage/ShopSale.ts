import { request } from '@uiw-admin/utils'

export interface Change {
  id?: string
  zoneName?: string
  code?: string
  useStatus?: string
  userName?: string
  card?: string
  gender?: string
  phone?: string
  startTime?: string
  rentalMonth?: number
  sale?: string
  industry?: string
  remark?: string
}

function selectById(params: Change) {
  return request('/api/SaleShops/selectById', {
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

// 商铺租售接口
const selectPage = '/api/SaleShops/selectPage'

const update = '/api/SaleShops/update'

const insert = '/api/test/select'

const deleteData = '/api/SaleShops/delete'

// 收费项接口
const detailSelectPage = '/api/buCharge/selectPage'

const detailAdd = '/api/buShopsCharge/add'

// 租售和收费相关接口

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
