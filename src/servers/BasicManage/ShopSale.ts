import { request } from '@uiw-admin/utils'

export interface State {
  drawerVisible: boolean
  drawerDetailVisible: boolean
  tableType: string
  detailType: string
  detailtableType: string
  queryInfo: Change
  dataSource: Array<[]>
  detailDataSource: any
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
}

function selectById(params: Change) {
  return request('/api/SaleShops/selectById', {
    method: 'POST',
    body: { ...params },
  })
}
function detailData(params: Change) {
  return request('/api/buCharge/selectPage', {
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
// 商铺租售与收费项关联-添加
const detailAdd = '/api/buShopsCharge/add'

// 商铺租售与收费项关联-添加
const buChargeAdd = '/api/buCharge/add'

// 添加默认收费项
const seraAdd = '/api/sera/add'

// 租售和收费相关接口
const contactSelectPage = '/api/buShopsCharge/selectPage'

// 默认收费项-查询列表
const seraSelectPage = '/api/sera/selectPage'

const contactDelete = '/api/buShopsCharge/delete'

export {
  selectById,
  detailData,
  selectPage,
  update,
  insert,
  deleteData,
  detailSelectPage,
  detailAdd,
  contactSelectPage,
  contactDelete,
  seraSelectPage,
  seraAdd,
  buChargeAdd,
  selectDictList,
}
