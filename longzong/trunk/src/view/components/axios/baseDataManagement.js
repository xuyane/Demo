import createApi from './http.js'

/** api */
/** 企业库管理 */
// 校验企业名称唯一性
export const getEnterpriseNameRepeat = createApi({
  url: '/basedata/spec/check_name', 
  type: 'post'
})
/** 品种规格表接口 */

// 品种规格分页列
export const getSpecList = createApi({
  url: '/basedata/spec/list', 
  type: 'post'
})
  
// 保存品种规格
export const getSpecAdd = createApi({
  url: '/basedata/spec/add', 
  type: 'post'
})
// 编辑品种规格
export const getSpecDetail = createApi({
  url: '/basedata/spec/edit_detail', 
  type: 'post'
})
// 修改品种规格
export const getSpecEdit = createApi({
  url: '/basedata/spec/edit', 
  type: 'post'
})
// 校验品种规格唯一性
export const getBreedNameRepeat = createApi({
  url: '/basedata/spec/name_repeat', 
  type: 'post'
})

/** 品种用途接口 */
// 品种用途分页列
export const getPurposeList = createApi({
  url: '/basedata/purpose/list', 
  type: 'post'
})
  
// 保存品种用途
export const getPurposeAdd = createApi({
  url: '/basedata/purpose/add', 
  type: 'post'
})
// 编辑品种用途
export const getPurposeDetail = createApi({
  url: '/basedata/purpose/edit_detail', 
  type: 'post'
})
// 修改品种用途
export const getPurposeEdit = createApi({
  url: '/basedata/purpose/edit', 
  type: 'post'
})
// 品种用途重复性检测
export const getPurposeRepeat = createApi({
  url: '/basedata/purpose/name_repeat', 
  type: 'post'
})
/** 品种标准接口 */
// 品种标准分页
export const getBreedStandardList = createApi({
  url: '/basedata/breedStandard/list', 
  type: 'post'
})
  
// 保存品种标准
export const getBreedStandardAdd = createApi({
  url: '/basedata/breedStandard/add', 
  type: 'post'
})
// 编辑品种标准
export const getBreedStandardDetail = createApi({
  url: '/basedata/breedStandard/detail', 
  type: 'post'
})
// 修改品种标准
export const getBreedStandardEdit = createApi({
  url: '/basedata/breedStandard/edit', 
  type: 'post'
})
// 校验品种标准唯一性
export const getBreedStandardRepeat = createApi({
  url: '/basedata/breedStandard/name_repeat', 
  type: 'post'
})

/** 品种指标接口 */
// 技术指标分页
export const getBreedTechnologyList = createApi({
  url: '/basedata/breedTechnology/list', 
  type: 'post'
})
  
// 保存指标技术
export const getBreedTechnologyAdd = createApi({
  url: '/basedata/breedTechnology/add', 
  type: 'post'
})
// 编辑指标技术
export const getBreedTechnologyDetail = createApi({
  url: '/basedata/breedTechnology/detail', 
  type: 'post'
})
// 修改指标技术
export const getBreedTechnologyEdit = createApi({
  url: '/basedata/breedTechnology/edit', 
  type: 'post'
})
// 校验技术指标唯一性
export const getBreedTechnologyRepeat = createApi({
  url: '/basedata/breedTechnology/name_repeat', 
  type: 'post'
})

/** 提供下拉选择插件使用 */
// 下拉选择品种标准
export const getBreedStandardSelect = createApi({
  url: '/basedata/select/breed_standard', 
  type: 'post'
})

// 下拉选择用途
export const getBreedPurposeSelect = createApi({
  url: '/basedata/select/breed_purpose', 
  type: 'post'
})

// 下拉选择规格
export const getBreedSpecSelect = createApi({
  url: '/basedata/select/breed_spec', 
  type: 'post'
})
  
// 下拉选择技术指标
export const getBreedTechnologySelect = createApi({
  url: '/basedata/select/breed_technology', 
  type: 'post'
})
// 下拉选择形态
export const getBreedShapeSelect = createApi({
  url: '/basedata/enum/shape', 
  type: 'get'
})
// 信息分类列表
// 校验品种规格唯一性
export const getInfomationsortRepeat = createApi({
  url: '/information/informationtype/unique', 
  type: 'post'
})
// 品种分类列表
// 检验品种分类唯一性
export const getUniqueRepeat = createApi({
  url: '/basedata/breedType/unique', 
  type: 'post'
})
// 校验品种名字
export const getBreedRepeat = createApi({
  url: '/basedata/breed/breed_name_repeat', 
  type: 'post'
})
// 校验企业名称
export const getEnterprisenameRepeat = createApi({
  url: '/basedata/enterprise/check_name', 
  type: 'post'
})
// 校验社会信用代码
export const getCreditcodeRepeat = createApi({
  url: '/basedata/enterprise/add_check_credit_code', 
  type: 'post'
})
export const editCheckCreditCode = createApi({
  url: '/basedata/enterprise/edit_check_credit_code',
  type: 'post'
})
// 校验证照编号 唯一性
export const getLicenseNoRepeat = createApi({
  url: '/basedata/enterprise/add_check_license_no',
  type: 'post'
})
export const editCheckLicenseNo = createApi({
  url: '/basedata/enterprise/edit_check_license_no',
  type: 'post'
})

// 新增企业关联关系 校验是否已存在
export const getEnterprisenameRelationRepeat = createApi({
  url: '/basedata/enterprise/check_add_enterprise_relation',
  type: 'post'
})

// 品种分类分页显示
export const getBreedList = createApi({
  url: '/basedata/breed/list',
  type: 'post'
})

// 编辑校验企业名称唯一性
export const checkEditName = createApi({
  url: '/basedata/enterprise/check_edit_name',
  type: 'post'
})

// 下拉选择企业联系人状态
export const enterpriseContactsStatus = createApi({
  url: '/basedata/enum/enterprise_contacts_status',
  type: 'get'
})
// 新增企业品种关联关系 校验是否已存在 check_add_enterprise_breed
export const checkAddEnterpriseBreed = createApi({
  url: '/basedata/enterprise/check_add_enterprise_breed',
  type: 'post'
})
// 判断同一用户是否有主联系人
export const checkIsMain = createApi({
  url: '/basedata/enterprise/check_is_Main',
  type: 'post'
})
// 根据企业ID下拉选择品种
export const getEnterpriseBreed = createApi({
  url: '/basedata/select/enterprise_breed',
  type: 'post'
})

// 根据企业ID下拉选择品种 relevance_breed_list
export const getRelevanceBreedList = createApi({
  url: '/basedata/enterprise/relevance_breed_list',
  type: 'post'
})
//

// 新增品种参数
export const saveParamsAdd = createApi({
  url: '/basedata/breed/params_add',
  type: 'post'
})


//信息分类 --根据InformationTypePageParam获取信息分类信息列表
export const getInfomationsortList = createApi({
  url: '/information/informationtype/list', 
  type: 'post'
})

//信息分类 --查询站点集合
export const getInfomationsortSite = createApi({
  url: '/information/informationtype/site', 
  type: 'post'
})

//信息分类 --查询站点集合
export const getInfomationsortTree = createApi({
  url: '/information/informationtype/tree', 
  type: 'post'
})

//信息分类 --根据信息分类ID查询表信息
export const getInfomationsortDetail = createApi({
  url: '/information/informationtype/detail', 
  type: 'post'
})

//信息分类 --保存信息分类
export const addInfomationsort = createApi({
  url: '/information/informationtype/add', 
  type: 'post'
})

//信息分类 --保存信息分类
export const editInfomationsort = createApi({
  url: '/information/informationtype/edit', 
  type: 'post'
})

//信息分类 --导入信息分类
export const importInfomationsort = createApi({
  url: '/information/informationtype/import', 
  type: 'post'
})

//信息分类 --新增页面全路径
export const infomationsortRoad = createApi({
  url: '/information/informationtype/road', 
  type: 'post'
})

//信息分类 --状态下拉
export const statusSelect = createApi({
  url: "/information/enum/status",
  type: 'get'
})