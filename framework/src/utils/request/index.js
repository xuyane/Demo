import axios from 'axios'
import { baseURL } from '@/config'
import transfer from './transfer'
import { cancelLoading } from './globalLoading'
import createError from './createError'

axios.defaults.baseURL = baseURL
axios.defaults.timeout = 20000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
const ajax = {}

// 请求拦截器
axios.interceptors.request.use(function (config) {
  transfer(config)
  return config
},
undefined
)

// 响应拦截器
axios.interceptors.response.use(function (response) {
  cancelLoading()
  // 导出文件
  if (response.headers && response.headers['content-type'] === 'application/octet-stream') {
    return {
      data: response.data,
      headers: response.headers
    }
  }
  // 其他数据直接返回
  if (response.data && response.data.status === 200) {
    return response.data.data
  }
  return Promise.reject({ msg: (response.data && response.data.msg) || '' })
}, function (error) {
  cancelLoading()
  createError(error)
  return Promise.reject(error)
});

['head', 'delete', 'get', 'put', 'patch', 'post'].forEach((type, key) => {
  ajax[type] = (...rest) => {
    return axios[type].apply(null, rest)
  }
})

export default ajax
