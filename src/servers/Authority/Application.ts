import { request } from '@uiw-admin/utils'

export interface Change {
  id?: string
  menuName?: string
  icon?: string
  path?: string
  menuType?: number
  parentId?: string
  orderNum?: string
  remark?: string
  updateTime?: string
  createTime?: string
  updateName?: string
  tableVisible?: boolean
  secondMenu?: any[]
  thirdVisible?: boolean
  thirdMenu?: any[]
  children?: any
  tableLevel?: string
}

function selectById(params: Change) {
  return request('/api/menu/selectPage', {
    method: 'POST',
    body: { ...params },
  })
}

const selectPage = '/api/menu/selectPage'

const update = '/api/menu/edit'

const insert = '/api/menu/add'

const deleteData = '/api/menu/delete'

export { selectById, selectPage, update, insert, deleteData }
