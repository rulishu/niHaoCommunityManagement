import { request } from '@uiw-admin/utils'
//个人资料
function getProfile(params: any) {
  return request('/api/account/getProfile', {
    method: 'POST',
    body: { ...params },
  })
}
export { getProfile }
