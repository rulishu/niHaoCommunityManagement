import { request } from '@uiw-admin/utils'

export interface Change {
  id?: string
  zoneNo?: string
  zoneName?: string
  zoneRemark?: string
  provinceCode?: string
  cityCode?: string
  areaCode?: string
  address?: string
}

function selectById(params: Change) {
  return request('/api/buZone/selectById', {
    method: 'POST',
    body: { ...params },
  })
}

function selectByParentCode(params: Change) {
  return request('/api/area/selectByParentCode', {
    method: 'POST',
    body: { ...params },
  })
}

const selectPage = '/api/buZone/selectPage'

const update = '/api/buZone/update'

const insert = '/api/buZone/add'

const deleteData = '/api/buZone/delete'

export {
  selectById,
  selectPage,
  update,
  insert,
  deleteData,
  selectByParentCode,
}
