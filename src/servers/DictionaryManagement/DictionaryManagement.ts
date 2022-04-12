import { request } from '@uiw-admin/utils'

export interface Change {
  id?: string
  dictType?: string
  remark?: string
  level?: string
}

const selectPage = '/api/dictionary/selectPage'
const deleteData = '/api/dictionary/delete'
//新增字典类型
const addType = '/api/dictionary/addType'
//新增字典数据项
const addDictValue = '/api/dictionary/addDictValue'
//编辑字典类型
const editType = '/api/dictionary/editType'
//编辑字典数据项
const editDict = '/api/dictionary/editDict'

//字典类型列表
function selectDictTypeList(params: Change) {
  return request('/api/dictionary/selectDictTypeList', {
    method: 'POST',
    body: { ...params },
  })
}

export {
  selectPage,
  deleteData,
  selectDictTypeList,
  addType,
  addDictValue,
  editType,
  editDict,
}
