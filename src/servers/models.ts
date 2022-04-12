import { request } from '@uiw-admin/utils'

// 付款方式字典
function paysList(params: { id: string }) {
  return request('/api/dictionary/selectDictList', {
    method: 'POST',
    body: { ...params },
  })
}

// 收费项目字典
function buChargesList(params: { id: string }) {
  return request('/api/buCharge/selectList', {
    method: 'POST',
    body: { ...params },
  })
}

// 类型字典
function statusList(params: { id: string }) {
  return request('/api/dictionary/selectDictList', {
    method: 'POST',
    body: { ...params },
  })
}

// 收费标准字典
function standardList(params: { id: string }) {
  return request('/api/dictionary/selectDictList', {
    method: 'POST',
    body: { ...params },
  })
}

export { paysList, buChargesList, statusList, standardList }
