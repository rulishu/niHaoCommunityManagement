import { request } from '@uiw-admin/utils'

export interface State {
  drawerVisible: boolean
  drawerDetailVisible: boolean
  tableType: string
  detailType: string
  detailtableType: string
  queryInfo: Change
  isView: boolean
  id: string
  shopsId: string
  delectVisible: boolean
  delectDetailVisible: boolean
  arrData: listProps[]
  queryInfoList: listProps[]
}

export interface Change {
  id?: string
  shopsId?: string
  zoneName?: string
  code?: string
  useStatus?: number
  userName?: string
  card?: string
  gender?: string
  phone?: string
  startTime?: string
  endTime?: string
  rentalMonth?: number
  sale?: string
  industry?: string
  remark?: string
  chargeList: listProps[]
  industryName?: string
}

export interface listProps {
  chargeDay?: number
  chargeFormula?: string
  chargeLateProportion?: number
  chargeLateType?: number
  chargeMonth?: number
  chargeName?: string
  chargeNumType?: string
  chargePrice?: number
  chargeType?: string
  id?: number
  chargeId?: string
  chargeNumTypeName?: string
}

function selectById(params: Change) {
  return request('/api/SaleShops/selectById', {
    method: 'POST',
    body: { ...params },
  })
}
// 从事行业字典
function selectDictList(params: Change) {
  return request('/api/dictionary/selectDictList', {
    method: 'POST',
    body: { ...params },
  })
}

// 商铺租售接口
const selectPage = '/api/SaleShops/selectPage'

const update = '/api/SaleShops/update'

const insert = '/api/test/select'

const deleteData = '/api/SaleShops/delete'

// 收费项管理-收费项-翻页查询
const detailSelectPage = '/api/buCharge/selectPage'

// 添加默认收费项
const seraAdd = '/api/sera/add'
// 默认收费项-查询列表
const seraSelectPage = '/api/sera/selectPage'
// 默认收费项-查询列表
function seraSelectPageList(params: Change) {
  return request('/api/sera/selectPage', {
    method: 'POST',
    body: { ...params },
  })
}
// 默认收费项删除
// const seraDelete = '/api/sera/delete'
function seraDelete(params: Change) {
  return request('/api/sera/delete', {
    method: 'POST',
    body: { ...params },
  })
}
// 用户管理-查业主用户信息
function selectUserByRole(params: Change) {
  return request('/api/user/selectUserByRole', {
    method: 'POST',
    body: { ...params },
  })
}

export {
  selectById,
  selectPage,
  update,
  insert,
  deleteData,
  detailSelectPage,
  seraSelectPage,
  seraSelectPageList,
  seraAdd,
  selectDictList,
  seraDelete,
  selectUserByRole,
}
