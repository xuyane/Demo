import createApi from './http.js'

/** api */

// 判断状态的status 为0 的话就跳到登录页面
export function statusZero (data) {
  var baseUrl = 'https://mgt.oilchem.net'
  if (data === 502) {
    window.location.href = baseUrl + '/#/502'
  } else if (data === 500) {
    window.location.href = baseUrl + '/#/500'
  } else if (data === 404) {
    window.location.href = baseUrl + '/#/404'
  } else if (data === 502) {
    window.location.href = baseUrl + '/#/502'
  } 
  if (data === 0) {
    window.location.href = baseUrl + '/login/login.htm'
  }
}

// 增加流程接口
export const addInstance = createApi({
  url: '/mysteel/workflow/instance/add',
  type: 'post'
})

// 接收任务接口
// export const receiveRequest = createApi({
//   url: '/mysteel/workflow/task/receive',
//   type: 'get'
// })

// // 挂起任务接口
// export const hangUpRequest = createApi({
//   url: '/mysteel/workflow/instance/disable',
//   type: 'post'
// })

// // 作废任务接口
// export const cancelRequest = createApi({
//   url: '/mysteel/workflow/instance/cancel',
//   type: 'post'
// })

// // 启用任务接口
// export const enableRequest = createApi({
//   url: '/mysteel/workflow/instance/enable',
//   type: 'post'
// })

// // 流程实例
// export const getListRequest = createApi({
//   url: '/mysteel/workflow/instance/list',
//   type: 'get'
// })
