import { request } from '@uiw-admin/utils'

export interface Change {
  id?: string,
  zoneNo?: string
  zoneName?: string
  zoneRemark?: string
}

function selectById(params: Change) {
  return request('/uap/bu-zone/update', {
    method: 'POST',
    body: { ...params },
  })
}


const selectPage = '/uap/bu-zone/selectPage'

const update = '/uap/bu-zone/update'

const insert = '/uap/bu-zone/add'

const deleteData = '/uap/bu-zone/delete'

export { selectById, selectPage, update, insert, deleteData }
