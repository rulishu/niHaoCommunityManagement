import { request } from '@uiw-admin/utils';

export interface Change {
  id?: string;
  code?: string;
  name?: string;
  payService?: string;
  payType?: string;
  price?: number;
  collectionName?: string;
  collectionTime?: string;
  status?: string;
  remark?: string;
  customerType?: string;
  refundTime?:string,
  refundType?:string
}

/**
 * 停车场管理-停车场管理-查询
 * @param {Object} params
 */
function selectById(params: Change) {
  return request('/api/buTemporaryCharges/selectPage', {
    method: 'POST',
    body: { ...params },
  });
}

const selectPage = '/api/buTemporaryCharges/selectPage';

const update = '/api/buTemporaryCharges/update';

const insert = '/api/buTemporaryCharges/add';

const deleteData = '/api/parkingArea/delete';

export { selectById, selectPage, update, insert, deleteData };
