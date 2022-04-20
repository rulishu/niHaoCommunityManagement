import { request } from '@uiw-admin/utils'
// 查询商铺
function shopSelectPage(params: any) {
  return request('/api/buShopChargeData/selectAllShop', {
    method: 'POST',
    body: { ...params },
  })
}
export { shopSelectPage }
