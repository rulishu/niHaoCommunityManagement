import { request } from '@uiw-admin/utils'

export interface Change {
  id?: string
  shopName?: string
  shopNo?: string
  shopFloor?: string
  areaCovered?: number
  areaUsable?: number
  shopRent?: number
  status?: number
  remark?: string
}

function selectById(params: Change) {
  return request('/api/buShop/selectById', {
    method: 'POST',
    body: { ...params },
  })
}

const selectPage = '/api/buShop/selectPage'

const update = '/api/buShop/edit'

const insert = '/api/buShop/add'

const deleteData = '/api/buShop/delete'

export { selectById, selectPage, update, insert, deleteData }
