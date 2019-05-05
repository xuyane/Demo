'use strict'

import axios from 'axios'
import {
  Message,
  Spin
} from 'iview'
import '../../../router/index.js'
import 'url-search-params-polyfill'
axios.defaults.withCredentials = true
// 请求时的拦截
axios.interceptors.request.use(function (config) {

  return config;
}, function (error) {
  // 当请求异常时做一些处理
  return Promise.reject(error)
})

// 响应时拦截
axios.interceptors.response.use(function (response) {
  // 返回响应时做一些处理
  // console.log('response', response);
  Spin.hide()
  return response
}, function (error) {
  // 当响应异常时做一些处理
  return Promise.reject(error)
})

const common = options => {
  return new Promise((resolve, reject) => {
    if (options.method !== 'post') {
      options.params = options.data
      delete options.data
    }
    const baseUrl = 'https://mgt.oilchem.net'
    axios({
      ...options
    }).then(res => {
      if (res.status === 502) {
        window.location.href = baseUrl + '/#/502'
      } else if (res.status === 500) {
        window.location.href = baseUrl + '/#/500'
      } else if (res.status === 404) {
        window.location.href = baseUrl + '/#/404'
      } else if (res.status === 200) {
        const data = res.data
        // console.log("options",options.url);
        if (data.message === 'OK' || data.status === '200') {
          resolve(data)
        } else if (data.status === 0) {
          window.location.href = baseUrl + '/login/login.htm'
        } else if (data.status === 2) {
          window.location.href = baseUrl + '/#/error?message=' + data.message;
        } else if (data.status === 3) {
          Message.error({
            content: data.message,
            duration: 3
          });
        } else if (data.status === '500') {
          Message.error({
            content: data.message,
            duration: 3
          });
        } else if (data.status === '502') {
          window.location.href = baseUrl + '/#/502'
        } else {
          Spin.hide()
          Message.error({
            content: data.message,
            duration: 3
          });
          reject(data)
        }
      }
    }).catch(err => {
      Spin.hide()
      Message.error({
        content: err,
        duration: 3
      });
      reject(err)
    })
  })
}

const createApi = opt => {
  return data => {
    if ((opt.type === 'get') && ((typeof data === 'number') || (typeof data === 'string'))) {
      return common({
        url: opt.url + '/' + data,
        method: opt.type || 'GET'
      })
    } else {
      return common({
        url: opt.url,
        method: opt.type || 'GET',
        data
      })
    }
  }
}

export default createApi
/** api */
// 获取发票邮寄管理列表
export const getInvoicePostList = createApi({
  url: '/finance/invoicePost/list_page',
  type: 'post'
})

// 新增发票邮寄
export const insertInvoicePost = createApi({
  url: '/finance/invoicePost/insert',
  type: 'post'
})

// 删除发票邮寄
export const deleteInvoicePost = createApi({
  url: '/finance/invoicePost/delete',
  type: 'post'
})

// 获取待开票分页数据
export const getInvoiceapply = createApi({
  url: '/finance/finance/invoiceapply/listPage',
  type: 'post'
})

// 获取开票申请详情页数据
export const getInvoiceapplyDetail = createApi({
  url: '/finance/finance/invoiceapply/details',
  type: 'get'
})

// 保存开票申请详情数据
export const saveInvoiceapplyDetail = createApi({
  url: '/finance/finance/invoiceapply/save',
  type: 'post'
})

// 获取票据审核分页数据
export const getInvoiceAudit = createApi({
  url: '/finance/finance/invoiceAudit/listPage',
  type: 'post'
})

// 获取合同信息分页数据
export const getContractInfoList = createApi({
  url: '/finance/finance/invoiceAudit/contractInfoListPage',
  type: 'post'
})

// 填写票号列表数据
export const invoiceNoList = createApi({
  url: '/finance/finance/invoiceAudit/invoiceNoList',
  type: 'post'
})

// 保存填写票号数据
export const saveInvoiceNoList = createApi({
  url: '/finance/finance/invoiceAudit/saveInvoiceNoList',
  type: 'post'
})

// 获取部门数结构数据
export const getDepartList = createApi({
  url: '/finance/common/selectDept',
  type: 'get'
})

// 获取常规下拉框数据
export const getCommonSelect = createApi({
  url: '/finance/common/select',
  type: 'get'
})



// 钢炼呼叫中心初始化
export const glPhoneCenterInit = createApi({
  url: '/json/reply/MQSendInitRequest',
  type: 'get'
})

// 钢炼呼叫中心拨号
export const glPhoneCenterCallOut = createApi({
  url: '/json/reply/MQSendCallRequest',
  type: 'get'
})