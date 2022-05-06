import { request } from '@uiw-admin/utils'
//个人资料
function getProfile(params: any) {
  return request('/api/account/getProfile', {
    method: 'POST',
    body: { ...params },
  })
}

//个人信息修改
function modifyProfile(params: any) {
  return request('/api/account/modifyProfile', {
    method: 'POST',
    body: { ...params },
  })
}

//文件上传
function fileUpload(params: any) {
  return request('/api/file/upload', {
    method: 'POST',
    requestType: 'form',
    body: params,
  })
}

//修改密码
function modifyPassword(params: any) {
  return request('/api/account/modifyPassword', {
    method: 'POST',
    body: { ...params },
  })
}
//查看文件图片信息
function getFilePath(params: any) {
  return request(`/api/file/selectFilePathByUuid/${params.uuid}`, {
    method: 'POST',
    requestType: 'urlencoded',
    body: { ...params },
  })
}
//
export { getProfile, modifyProfile, fileUpload, modifyPassword, getFilePath }
