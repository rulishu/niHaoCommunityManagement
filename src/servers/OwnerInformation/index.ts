import { request } from '@uiw-admin/utils'
function selectInfo(params: any) {
  return request('/api/buOwnerManage/selectDetail', {
    method: 'POST',
    body: { ...params },
  })
}
export { selectInfo }
