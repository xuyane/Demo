import createApi from './http.js'

/** api */

// 网站模板分类管理
export const websitetTemplatetypeList = createApi({ // 网站模板分类列表
  url: '/website/templatetype/list',
  type: 'post'
})
export const websitetTemplatetypeAdd = createApi({ // 新增网站模板分类
  url: '/website/templatetype/add',
  type: 'post'
})
export const websitetTemplatetypeEdit = createApi({ // 修改网站模板分类
  url: '/website/templatetype/edit',
  type: 'post'
})
export const websitetTemplatetypeDisable = createApi({ // 禁用网站模板分类
  url: '/website/templatetype/disable',
  type: 'post'
})
export const websitetTemplatetypeEnable = createApi({ // 启用网站模板分类
  url: '/website/templatetype/enable',
  type: 'post'
})
export const websitetTemplatetypeAddUnique = createApi({ // 新增名称唯一性校验
  url: '/website/templatetype/add_check_uniqueness',
  type: 'post'
})
export const websitetTemplatetypeEditUnique = createApi({ // 编辑名称唯一性校验
  url: '/website/templatetype/edit_check_uniqueness',
  type: 'post'
})

// 网站模板管理
export const websiteTemplateList = createApi({ // 获取网站模板列表
  url: '/website/template/list',
  type: 'post'
})
export const websiteTemplateAdd = createApi({ // 新增网站模板
  url: '/website/template/add',
  type: 'post'
})
export const websiteTemplateDisable = createApi({ // 禁用网站模板
  url: '/website/template/disable',
  type: 'post'
})
export const websiteTemplateEnable = createApi({ // 启用网站模板
  url: '/website/template/enable',
  type: 'post'
})
export const websiteTemplateEditPage = createApi({ // 编辑网站模板
  url: '/website/template/edit_page',
  type: 'post'
})
export const websiteTemplateEdit = createApi({ // 编辑网站模板
  url: '/website/template/edit',
  type: 'post'
})
export const websiteTemplateSelect = createApi({ // 下拉选择网站模板分类
  url: '/website/templatetype/templatetype_select',
  type: 'post'
})
export const websitetTemplateAddUniqueness = createApi({ // 新增名称唯一性校验
  url: '/website/template/add_check_uniqueness',
  type: 'post'
})
export const websitetTemplateEditUniqueness = createApi({ // 编辑名称唯一性校验
  url: '/website/template/edit_check_uniqueness',
  type: 'post'
})
export const websitetTemplateEditPage = createApi({ // 根据id查询名称
  url: '/website/template/edit_page',
  type: 'post'
})

// 标签管理
export const websiteLabelList = createApi({ // 获取标签表信息列表
  url: '/website/label/list',
  type: 'post'
})
export const websiteLabelDisable = createApi({ // 根据id禁用标签表
  url: '/website/label/disable',
  type: 'post'
})
export const websiteLabelEnable = createApi({ // 根据id启用标签表
  url: '/website/label/enable',
  type: 'post'
})
export const websiteLabelDetail = createApi({ // 根据id获取标签表信息
  url: '/website/label/detail',
  type: 'post'
})
export const websiteSelectInforUnit = createApi({ // 分页选择信息单元
  url: '/website/select/information_unit',
  type: 'post'
})
export const informationTaskList = createApi({ // 下拉选择信息单元
  url: '/website/select/information_unit_page',
  type: 'post'
})
export const websiteSelectSite = createApi({ // 下拉选择站点
  url: '/website/select/site',
  type: 'post'
})
export const websiteLabelAdd = createApi({ // 新增标签表信息
  url: '/website/label/add',
  type: 'post'
})
export const websiteLabelEdit = createApi({ // 修改标签表信息
  url: '/website/label/edit',
  type: 'post'
})
export const websiteLabelAddcheck = createApi({ // 新增校验标签名称唯一性
  url: '/website/label/check_name',
  type: 'post'
})
export const websiteLabelEditcheck = createApi({ // 编辑校验标签名称唯一性
  url: '/website/label/check_edit_name',
  type: 'post'
})
// 网站栏目管理
export const websiteColumnList = createApi({ // 获取网站栏目列表
  url: '/website/column/list',
  type: 'post'
})
export const websiteColumnAdd = createApi({ // 新增网站栏目列表
  url: '/website/column/add',
  type: 'post'
})
export const websiteColumnDetail = createApi({ // 查看网站栏目列表
  url: '/website/column/detail',
  type: 'post'
})
export const websiteColumnType = createApi({ // 获取栏目类型
  url: '/website/select/column_type',
  type: 'post'
})
export const websiteColumnEdit = createApi({ // 修改网站栏目列表
  url: '/website/column/edit',
  type: 'post'
})
export const websiteColumnUnique = createApi({ // 栏目名称校验唯一性
  url: '/website/column/unique',
  type: 'post'
})
export const websiteColumnEditStatus = createApi({ // 根据id启用禁用栏目表信息
  url: '/website/column/editStatus',
  type: 'post'
})
// 频道管理
export const websiteChannelTree = createApi({ // 获取频道树
  url: '/website/channel/tree',
  type: 'post'
})
export const websiteChannelList = createApi({ // 获取频道列表
  url: '/website/channel/list',
  type: 'post'
})
export const websiteChannelDetail = createApi({ // 获取频道详情
  url: '/website/channel/detail',
  type: 'post'
})
export const websiteChannelDisable = createApi({ // 禁用频道
  url: '/website/channel/disable',
  type: 'post'
})
export const websiteChannelEnable = createApi({ // 启用频道
  url: '/website/channel/enable',
  type: 'post'
})
export const websiteChannelBreed = createApi({ // 查询品种下拉内容
  url: '/website/select/breed',
  type: 'post'
})
export const websiteChannelBreedPage = createApi({ // 分页查询品种列表
  url: '/website/select/breed_page',
  type: 'post'
})
export const websiteChannelInforType = createApi({ // 下拉选择信息分类
  url: '/website/select/information_type',
  type: 'post'
})
export const websiteChannelInforTypePage = createApi({ // 下拉选择信息分类
  url: '/website/select/information_type_page',
  type: 'post'
})
export const websiteChannelSite = createApi({ // 查询站点
  url: '/website/select/site',
  type: 'post'
})
export const websiteChannelAdd = createApi({ // 新增频道
  url: '/website/channel/add',
  type: 'post'
})
export const websiteChannelEdit = createApi({ // 编辑频道
  url: '/website/channel/edit',
  type: 'post'
})
export const websiteChannelAddUnique = createApi({ // 新增频道唯一性校验
  url: '/website/channel/check_add_name',
  type: 'post'
})
export const websiteChannelEditUnique = createApi({ // 编辑频道唯一性校验
  url: '/website/channel/check_edit_name',
  type: 'post'
})
// 网站模板分类-获取网站模板分类子节点
export const websiteChildrenNodes = createApi({ // 编辑频道唯一性校验
  url: '/website/templatetype/childrenNodes',
  type: 'post'
})
// 网站模板分类-获取网站模板分类子节点
export const websiteTypePathByCode = createApi({ // 编辑频道唯一性校验
  url: '/website/template/typePathByCode',
  type: 'post'
})

// 网站模板分类-获取网站模板分类子节点
export const websiteNodesOpen = createApi({ // 编辑频道唯一性校验
  url: '/website/templatetype/nodesOpen',
  type: 'post'
})
// 判断顺序数的唯一性
export const websiteUniqueRecordNum = createApi({ // 编辑频道唯一性校验
  url: '/website/column/uniqueRecordNum',
  type: 'post'
})
export const websiteUpdateAppNumber = createApi({ // 编辑频道唯一性校验
  url: '/website/column/updateAppNumber',
  type: 'post'
})
