import { request } from '@uiw-admin/utils';

export interface Change {
  id: string;
  communityId: string;
  typeCd: string;
}

/**
 * 停车场管理-停车场管理-查询
 * @param {Object} params
 */
function selectById(params: Change) {
  return request('/api/parkingArea/selectPage', {
    method: 'POST',
    body: { ...params },
  });
}

const selectPage = '/api/parkingArea/selectPage';

const update = '/api/parkingArea/update';

const insert = '/api/parkingArea/insert';

const deleteData = '/api/parkingArea/delete';

export { selectById, selectPage, update, insert, deleteData };
