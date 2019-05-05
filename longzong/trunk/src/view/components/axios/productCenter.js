import createApi from './http.js'

/** api */

// 获取客户名称搜索列表
export const getStrategyList = createApi({
  url: '/product/strategy/listPage',
  type: 'post'
})

// 变更用户权限 版本调整
export const postAuthorityChange = createApi({
  url: '/product/product/postAuthorityChange',
  type: 'post'
})

// 变更用户权限 获取信息
export const getAuthorityDetail = createApi({
  url: '/product/product/changeAuthority',
  type: 'get'
})

// 变更用户权限 产品版本禁用、启用
export const enableOrDis = createApi({
  url: '/product/product/enableOrDis',
  type: 'post'
})

// 变更用户权限 产品版本删除
export const deleteVersion = createApi({
  url: '/product/product/deleteVersion',
  type: 'post'
})

// 获取品种树
export const getProductTreeList = createApi({
  url: '/product/product/breedList',
  type: 'get'
})
//
export const checkName = createApi({
  url: '/product/strategy/checkName',
  type: 'get'
})
// 新增策略
export const addStrategy = createApi({
  url: '/product/strategy/add',
  type: 'post'
})
// 修改策略
export const editStrategy = createApi({
  url: '/product/strategy/modify',
  type: 'post'
})
// 获取优惠政策详情
export const strategyDetail = createApi({
  url: '/product/strategy/detail',
  type: 'get'
})
// 优惠政策上架
export const onUpStrategy = createApi({
  url: '/product/strategy/on',
  type: 'post'
})
// 优惠政策下架
export const offStrategy = createApi({
  url: '/product/strategy/off',
  type: 'post'
})
// 优惠政策删除
export const deleteStrategyApi = createApi({
  url: '/product/strategy/delete',
  type: 'post'
})
// 部门树
export const deptTree = createApi({
  url: '/product/orgbreed/selectDeptTree',
  type: 'post'
})
// 部门树
export const orgbreedList = createApi({
  url: '/product/orgbreed/listPage',
  type: 'post'
})
// 获取产品管理数据
export const proRelData = createApi({
  url: '/product/product/listProRelData',
  type: 'post'
})

// 获取产品管理列表
export const productListPage = createApi({
  url: '/product/product/newListPage',
  type: 'post'
})

// 获取产品管理列表（老）
export const productListPageOld = createApi({
  url: '/product/product/listPage',
  type: 'post'
})

// 获取产品分类列表
export const proCategoryList = createApi({
  url: '/product/product/proCategoryList',
  type: 'get'
})
// 产品管理上下架
export const proOnOrOff = createApi({
  url: '/product/product/onOrOff',
  type: 'post'
})

// 查询产品状态列表
export const proStatusList = createApi({
  url: '/product/product/statusList',
  type: 'get'
})
// 获取产品详情
export const proSmsdetail = createApi({
  url: '/product/product/detail',
  type: 'get'
})
// 产品修改展示页 获取产品详情
export const getAlterProduct = createApi({
  url: '/product/product/getAlterProduct',
  type: 'get'
})
// 获取源产品
export const sourceProList = createApi({
  url: '/product/product/sourceProList',
  type: 'post'
})
// 短信套餐修改
export const postAlterProduct = createApi({
  url: '/product/product/postAlterProduct',
  type: 'post'
})
// 企业类型数据列表
export const enterPriseList = createApi({
  url: '/product/product/enterPriseList',
  type: 'get'
})
// 新增短信套餐提交功能
export const proSmsInsert = createApi({
  url: '/product/product/insert',
  type: 'post'
})
// 获取日志详情
export const productLogListPage = createApi({
  url: '/product/productLog/listPage',
  type: 'post'
})
// 获取日志详情
export const getProductLog = createApi({
  url: '/product/productLog/getProductLogById',
  type: 'get'
})
// 获取版本信息
export const versionCompare = createApi({
  url: '/product/product/versionCompare',
  type: 'post'
})
// 获取版本号
export const selectCompareProductVersion = createApi({
  url: '/product/product/selectCompareProductVersion',
  type: 'get'
})
// 获取信息分类
export const msgCategoryList = createApi({
  url: '/product/product/msgCategoryList',
  type: 'get'
})
// 获取城市信息
export const selectAreaList = createApi({
  url: '/product/product/selectAreaList',
  type: 'get'
})
// 搜索企业
export const memberList = createApi({
  url: '/product/product/memberList',
  type: 'get'
})
// 产品列表导出
export const proExport = createApi({
  url: '/product/product/export',
  type: 'get'
})
// 根据选择的源产品查询出去重复的关联数据
export const fourdimension = createApi({
  url: '/product/product/fourdimension',
  type: 'get'
})
// 获取新增关联列表数据 品种
export const getBreed = createApi({
  url: '/product/orgbreed/breedPage',
  type: 'post'
})
// 品种下拉选择框select2
export const deleteOrgBreed = createApi({
  url: '/product/orgbreed/deleteOrgBreed',
  type: 'post'
})
// 品种下拉选择框select2
export const addOrgBreed = createApi({
  url: '/product/orgbreed/addOrgBreed',
  type: 'post'
})
// 品种下拉选择框select2
export const breedTypeList = createApi({
  url: '/product/product/breedTypeList',
  type: 'post'
})
// 查询站点列表
export const selectSiteList = createApi({
  url: '/product/product/selectSiteList',
  type: 'get'
})
// 查询频道列表
export const selectChannelList = createApi({
  url: '/product/product/selectChannelList',
  type: 'get'
})
// 查询栏目列表
export const selectColumnList = createApi({
  url: '/product/product/selectColumnList',
  type: 'get'
})
// 品种select2查询
export const selectBreed = createApi({
  url: '/product/orgbreed/selectBreed',
  type: 'post'
})
