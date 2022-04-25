import { request } from '@uiw-admin/utils'
// 查询商铺
function shopSelectPage(params: any) {
  return request('/api/buShopChargeData/selectAllShopUser', {
    method: 'POST',
    body: { ...params },
  })
}

// 获取常规收费项类
function selectProject(params: any) {
  return request('/api/buShopChargeData/selectProject', {
    method: 'POST',
    body: { ...params },
  })
}

// 商铺收费数据-删除
function buShopChargeDataDelete(params: any) {
  return request('/api/buShopChargeData/delete', {
    method: 'POST',
    body: { ...params },
  })
}

// 商铺收费数据-删除
function buShopChargeDataAdd(params: any) {
  return request('/api/buShopChargeData/add', {
    method: 'POST',
    body: { ...params },
  })
}

// 获取所有按表走常规收费项
function selectProjectTable(params: any) {
  return request('/api/buShopChargeData/selectProjectTable', {
    method: 'POST',
    body: { ...params },
  })
}
// 获取所有已租售商铺编号-编号查询
function selectProjectAllShop(params: any) {
  return request('/api/buShopChargeData/selectAllShop', {
    method: 'POST',
    body: { ...params },
  })
}
// 商铺收费数据-通过code批量获取数据
function selectProjectByCode(params: any) {
  return request('/api/buShopChargeData/selectCodeUser', {
    method: 'POST',
    body: { ...params },
  })
}
// 编辑
function buShopChargeDataUpdate(params: any) {
  return request('/api/buShopChargeData/update', {
    method: 'POST',
    body: { ...params },
  })
}
//
// 批量新增
function gitBatchAdd(params: any) {
  return request('/api/buShopChargeData/batchAdd', {
    method: 'POST',
    body: params,
  })
}
export {
  shopSelectPage,
  selectProject,
  buShopChargeDataDelete,
  buShopChargeDataAdd,
  selectProjectTable,
  buShopChargeDataUpdate,
  selectProjectAllShop,
  gitBatchAdd,
  selectProjectByCode,
}
