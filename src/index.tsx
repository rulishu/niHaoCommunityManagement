import ReactDOM from 'react-dom'
import Control from '@uiw-admin/router-control'
import { SWRConfig } from 'swr'
import { request } from '@uiw-admin/utils'
import '@uiw/reset.css'
import './index.css'
import { Notify } from 'uiw'
import axios from 'axios'

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Notify.error({
      title: '错误通知',
      description: error.response.statusText,
    })
  }
)
ReactDOM.render(
  <SWRConfig
    value={{
      // revalidateOnFocus: false,
      fetcher: (resource, init) => {
        return request(resource, init)
      },
      provider: () => new Map(),
    }}
  >
    <Control
      routeType="hash"
      // addModels={(path) => import(`${path}`)}
    />
  </SWRConfig>,
  document.getElementById('root')
)
