import { request } from '@uiw-admin/utils'

export interface Change {
  id?: string
  types?: string
  chargeName?: string
  univalent?: string
  num?: number
  Formula?: string
  calculationCycle?: string
  lateFee?: string
  lateFeeRatio?: string
  lateFeeDays?: string
}

function selectById(params: Change) {
  return request('/api/test/select', {
    method: 'POST',
    body: { ...params },
  })
}

const selectPage = '/api/test/select'

const update = '/api/test/select'

const insert = '/api/test/select'

const deleteData = '/api/test/select'

export { selectById, selectPage, update, insert, deleteData }
