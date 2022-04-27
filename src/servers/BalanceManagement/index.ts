import { request } from '@uiw-admin/utils'
function refund(params: any) {
  return request('/api/shopAmount/refund', {
    method: 'POST',
    body: { ...params },
  })
}
export { refund }
