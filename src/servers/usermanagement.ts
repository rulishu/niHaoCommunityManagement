import { request } from '@uiw-admin/utils';

export interface Params {
  id?: number;
  uapUserAddress?: string;
  uapUserEmail?: string;
  uapUserIdCard?: string;
  uapUserMobile?: string;
  uapUserNation?: string;
  uapUserNationPlace?: string;
  uapUserNativeAddress?: string;
  uapUserPolitical?: string;
  uapUserRealName?: string;
  uapUserTel?: string;
  uapUserId?: number;
  uapUserAge?: number;
  uapUserGender?: number;
}

function handel(api: string, params: Params) {
  return request(api, {
    method: 'POST',
    body: params,
  });
}

const add = '/api/uapUser/add';

const edit = '/api/uapUser/edit';

const delect1 = '/api/account/delete';

export { handel, add, edit, delect1 };
