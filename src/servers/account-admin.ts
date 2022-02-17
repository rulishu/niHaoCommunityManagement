import { request } from '@uiw-admin/utils';

export interface Params {
  id?: number;
  uapAccountNickName?: string;
  uapAccountPassword?: string;
  uapAccountPhoto?: string;
  uapRoleId?: number;
  uapUserRealId?: number;
}

function handel(api: string, params: Params) {
  return request(api, {
    method: 'POST',
    body: params,
  });
}

const add = '/api/account/register';

const edit = '/api/account/edit';

export { handel, add, edit };
