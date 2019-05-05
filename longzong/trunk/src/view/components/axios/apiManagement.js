import createApi from './http.js'

/** api */
/** 用户基本信息接口 */
//查询所有的的价格数据
export const userList = createApi({
  url: '/openapi/user/list', 
  type: 'post'
})
//信息或价格接口启用禁用
export const setConfigStatus = createApi({
  url: '/openapi/user/setConfigStatus', 
  type: 'post'
})
//删除价格数据
export const deletePriceConfig = createApi({
  url: '/openapi/price/deletePriceConfig', 
  type: 'get'
})
export const insertUser = createApi({
  url: '/openapi/user/insertUser', 
  type: 'post'
})
//编辑用户反选
export const selectUserByUserId = createApi({
  url: '/openapi/user/selectUserByUserId', 
  type: 'get'
})
//获得已经配置好的价格配置
export const getPriceConfig = createApi({
  url: '/openapi/price/getPriceConfig', 
  type: 'post'
})
//查询所有的的价格数据
export const getPriceData = createApi({
  url: '/openapi/price/getPriceData', 
  type: 'post'
})
//企业名称select2
export const enterpriseNameSelectTO = createApi({
  url: '/openapi/common/enterpriseNameSelectTO', 
  type: 'post'
})
//品种分页信息查询
export const queryPageBreedName = createApi({
  url: '/openapi/common/queryPageBreedName', 
  type: 'get'
})
//保存配置好的价格产品数据
export const savePriceConfig = createApi({
  url: '/openapi/price/savePriceConfig', 
  type: 'post'
})
//保存用户资讯配置
export const saveInformationConfig = createApi({
  url: '/openapi/news/saveInformationConfig', 
  type: 'post'
})
//下拉选择品种select2
export const breedNameSelectTO = createApi({
  url: '/openapi/common/breedNameSelectTO', 
  type: 'post'
})
//编辑用户
export const modifyUser = createApi({
  url: '/openapi/user/modifyUser', 
  type: 'post'
})
//获取所有的价格类型
export const queryPriceType = createApi({
  url: '/openapi/price/queryPriceType', 
  type: 'get'
})
//资讯配置反选返回JSON
export const selectInformationConfig = createApi({
  url: '/openapi/news/selectInformationConfig', 
  type: 'get'
})

//接口启用禁用时弹出时间框
export const timeOpen = createApi({
  url: '/openapi/user/timeOpen', 
  type: 'post'
})
// 获取信息单元列表状态
export const getStateS = createApi({
  url: '/information/enum/status_all',
  type: 'get'
})
//信息单元分页信息查询
export const queryPageInformationUnit = createApi({
  url: '/openapi/common/queryPageInformationUnit',
  type: 'post'
})