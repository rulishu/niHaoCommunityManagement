export interface Usermanagement {
  id?: string
  createName?: string
  userName?: string
  phoneNumber?: string
  gender?: string
  status?: number
  createTime?: string
  remark?: string
}

const update = '/api/user/edit'

const deleteData = '/api/test/select'

export { update, deleteData }
