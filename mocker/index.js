const { getData, getCity } = require('./selectPage')
const { login, verify, logout, reloadAuth } = require('./login')
const { insert, update, selectById, upload } = require('./demo')

const proxy = {
  _proxy: {
    proxy: {
      '/api/(.*)': 'http://192.168.188.222:33702/',
    },
    changeHost: true,
  },

  'GET /api/user': { id: 1, nickName: 'kenny', sex: 6 },
  'POST /api/user': { id: 1, nickName: 'kenny', sex: 6 },
  'POST /api/login': login,
  'POST /api/logout': logout,
  'GET /api/user/verify': verify,
  'GET /api/city': getCity,
  'POST /api/getData': getData,
  'POST /api/reloadAuth': reloadAuth,
  'POST /api/demo/selectById': selectById,
  'POST /api/demo/insert': insert,
  'POST /api/demo/update': update,
  'POST /api/demo/upload': upload,
}

module.exports = proxy
