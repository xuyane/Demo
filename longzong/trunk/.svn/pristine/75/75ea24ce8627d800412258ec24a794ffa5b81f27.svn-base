import createApi from './http'

// 获取所有用户类型，用于前端下拉框选择
export const getUserType = createApi({
  url: '/crm/my-user-list/query-all-user-type',
  type: 'get'
})

// 获取所有用户来源，用于前端下拉框选择
export const getUserResource = createApi({
  url: '/crm/my-user-list/query-all-user-resource',
  type: 'get'
})

// 查询我的用户列表汇总
export const getAllUser = createApi({
  url: '/crm/my-user-list/sum',
  type: 'post'
})
// 根据用户id,查询用户订阅的产品
export const userProductList = createApi({
  url: '/crm/my-user-list/user-product-list',
  type: 'post'
})
//根据会员id，查询会员关注的品种
export const memberBreedsList = createApi({
  url: '/crm/user-allot/member-breeds-list',
  type: 'post'
})
// 根据用户id获取其及其关联子用户手机号
export const queryUserMobile = createApi({
  url: '/crm/my-user-list/query-user-mobile',
  type: 'get'
})

// 分页查询我的用户列表
export const getUserList = createApi({
  url: '/crm/my-user-list/list',
  type: 'post'
})

// 根据会员id、用户id获取会员的基础信息
export const getUserDetail = createApi({
  url: '/crm/user-detail/member-base-info',
  type: 'get'
})

// 根据会员id获取会员的所有联系人信息
export const getContactsList = createApi({
  url: '/crm/user-detail/contacts-all',
  type: 'get'
})

// 根据memberContactsVO对象保存会员的联系人信息
export const addContact = createApi({
  url: '/crm/user-detail/save',
  type: 'post'
})

// 根据联系人Id删除会员的联系人信息
export const deleteContact = createApi({
  url: '/crm/user-detail/delete',
  type: 'post'
})

// 根据联系人Id获取会员下的某个联系人信息
export const getContactInfo = createApi({
  url: '/crm/user-detail/contact-info',
  type: 'get'
})

// 根据会员id获取企业营业执照信息表信息
export const getMemberLicense = createApi({
  url: '/crm/memberlicense/query-license',
  type: 'get'
})

// 根据memberContactsVO对象修改联系人信息
export const updateContactInfo = createApi({
  url: '/crm/user-detail/update-contact-info',
  type: 'post'
})
// 根据memberBaseVO对象修改会员的基础信息
export const updateBaseInfo = createApi({
  url: '/crm/user-detail/update-base-info',
  type: 'post'
})
/** 注册相关 */
// 获取重置密码的验证码
export const getCaptcha = createApi({
  url: '/crm/register/get-reset-password-captcha',
  type: 'post'
})

// 重置密码
export const resetPassword = createApi({
  url: '/crm/register/reset-password-by-userId',
  type: 'post'
})
// 重置密码
export const resetPasswordByUserId = createApi({
  url: '/crm/register/reset-password-by-userId',
  type: 'post'
})
/** 危化品许可证 */
// 根据会员id获取企业经营许可证信息表信息
export const getBusinessLicense = createApi({
  url: '/crm/memberbusinesslicense/query-business-license',
  type: 'get'
})

// 保存企业经营许可证信息表（会员表与之一对多），比如危化品许可证等
export const saveBusinessLicense = createApi({
  url: '/crm/memberbusinesslicense/save',
  type: 'post'
})

// 根据id获取企业经营许可证信息表（会员表与之一对多），比如危化品许可证等信息
export const getBusinessLicenseInfo = createApi({
  url: '/crm/memberbusinesslicense/info',
  type: 'get'
})

// 根据id删除企业经营许可证信息表（会员表与之一对多），比如危化品许可证等
export const deleteBusinessLicense = createApi({
  url: '/crm/memberbusinesslicense/delete',
  type: 'post'
})

// 保存企业营业执照信息表（会员表与之一对一）
export const saveMemberLicense = createApi({
  url: '/crm/memberlicense/save',
  type: 'post'
})

// 修改企业营业执照信息表（会员表与之一对一）
export const updateMemberLicense = createApi({
  url: '/crm/memberlicense/update',
  type: 'post'
})

// 根据memberBusinessLicense对象修改企业经营许可证信息表（会员表与之一对多），比如危化品许可证等信息
export const updateBusinessLicense = createApi({
  url: '/crm//memberbusinesslicense/update',
  type: 'post'
})

// 获取通话记录信息列表
export const getCallRecords = createApi({
  url: '/crm/crm-callRecords/list',
  type: 'post'
})

/** 用户信息 */
// 用户信息列表
export const getUserbaseList = createApi({
  url: '/crm/userbase/user_list',       
  type: 'post'   
})

// 根据id来启用禁用
export const disabledUser = createApi({
  url: '/crm/userbase/disabled',
  type: 'get'
})

// 根据UserBaseAndProfileVO对象添加账户信息表信息
export const editUserbase = createApi({
  url: '/crm/userbase/modify_user',
  type: 'post'
})

// 根据用户ID将某个主用户变更为另一个主用户的子用户
export const changeMainUserToSubUser = createApi({
  url: '/crm/userbase/change_to_sub_user',
  type: 'post'
})

// 分页查询我的合同信息列表
export const getContractInfoList = createApi({
  url: '/crm/contract-info/list',
  type: 'post'
})

// 根据contractCode,查询发票信息
export const getInvoiceInfoList = createApi({
  url: '/crm/contract-info/query-invoice-list',
  type: 'get'
})
// 获取业务员下拉搜索
export const getAdminList = createApi({
  url: '/crm/common/query-adminList-by-name',
  type: 'get'
})
// 获取用户名下拉搜索
export const getDepartmentList = createApi({
  url: '/crm/common/query-org-tree',
  type: 'get'
})
/** 用户划转 */
// 查询用户划转记录列表
export const getTransferList = createApi({
  url: '/crm/usertransfer/query-tranferList',
  type: 'post'
})

// 查询可划转公司和用户的数量
export const getTransferCount = createApi({
  url: '/crm/usertransfer/query-transferCount',
  type: 'get'
})

// 获取划转类型下拉列表数据
export const getTransferType = createApi({
  url: '/crm/usertransfer/queryAllTransferType',
  type: 'get'
})

// 添加普通划转
export const addUserTransfer = createApi({
  url: '/crm/usertransfer/add-userTransfer',
  type: 'post'
})

// 批量划转模板下载
export const getTransferExcel = createApi({
  url: '/crm/usertransfer/get-excel',
  type: 'get'
})

// 批量划转
export const transferBatch = createApi({
  url: '/crm/usertransfer/transferBatch',
  type: 'post'
})

/** 用户对标 */
// 获取用户对标信息列表
export const getUserCompareList = createApi({
  url: '/crm/usercompare/list',
  type: 'post'
})

// 采纳用户对标信息
export const adoptUserCompare = createApi({
  url: '/crm/usercompare/adopt',
  type: 'post'
})

// 作废用户对标信息
export const cancelUserCompare = createApi({
  url: '/crm/usercompare/cancel',
  type: 'post'
})

// 用户对标信息附件下载
export const downloadUserCompare = createApi({
  url: '/crm/usercompare/download',
  type: 'get'
})

// 获取所有用户对标优点
export const getAllAdvantage = createApi({
  url: '/crm/usercompare/query-all-advantage',
  type: 'get'
})

// 获取所有用户对标缺点
export const getAllDisadvantage = createApi({
  url: '/crm/usercompare/query-all-disadvantage',
  type: 'get'
})

// 获取所有用户对标服务商
export const getAllSevers = createApi({
  url: '/crm/usercompare/query-all-markserviceprovider',
  type: 'get'
})

// 获取所有用户对标服务年限
export const getAllYears = createApi({
  url: '/crm/usercompare/query-all-serviceyear',
  type: 'get'
})

// 保存用户对标信息
export const saveUserCompare = createApi({
  url: '/crm/usercompare/save',
  type: 'post'
})

// 上传附件
export const uploadUserCompare = createApi({
  url: '/crm/usercompare/upload',
  type: 'post'
})

// 根据会员id获取用户信息列表
export const getUserById = createApi({
  url: '/crm/usermember/query-user-by-memberid',
  type: 'get'
})

/** api */

/** 公司合并 */
// 自动合并-根据会员id获取其可以合并的会员信息
export const getAutoMergeDetail = createApi({
  url: '/crm/company-merger/auto-merge-detail',
  type: 'post'
})

// 自动合并列表
export const getAutoMergeList = createApi({
  url: '/crm/company-merger/auto-merge-list',
  type: 'post'
})

// 根据id获取合并详情信息
export const getMergeRecordDetail = createApi({
  url: '/crm/company-merger/merge-record-detail',
  type: 'get'
})

// 合并记录列表
export const getMergeRecordList = createApi({
  url: '/crm/company-merger/merge-record-list',
  type: 'post'
})

// 合并提交操作
export const getMergeSubmit = createApi({
  url: '/crm/company-merger/merge-submit',
  type: 'post'
})

// 普通合并-根据会员id获取其可以合并的会员信息
export const getOrdinaryMergeDetail = createApi({
  url: '/crm/company-merger/ordinary-merge-detail',
  type: 'post'
})

// 普通合并列表
export const getOrdinaryMergeList = createApi({
  url: '/crm/company-merger/ordinary-merge-list',
  type: 'post'
})

// 用户产品试用申请表操作接口
export const getUserproductdelayapply = createApi({
  url: '/crm/userproductdelayapply/list',
  type: 'post'
})
// 用户产品试用申请表操作接口
export const updateUserproductdelayapply = createApi({
  url: '/crm/userproductdelayapply/update',
  type: 'post'
})

// 我的合同

// 分页查询我的合同信息列表
export const getmyAgreementAuditList = createApi({
  url: '/crm/contract-info/audit-list',
  type: 'post'
})

// 分页查询我的合同信息列表
export const getmyAgreementList = createApi({
  url: '/crm/contract-info/list',
  type: 'post'
})
// 根据合同编号或者产品id数组获取选购产品信息
export const getProductInfo = createApi({
  url: '/crm/contract-info/product-info',
  type: 'get'
})
// 获取合同状态
export const getStatus = createApi({
  url: '/crm/contract-info/query-all-audit-status',
  type: 'get'
})
// 获取合同状态
export const getContractAuditStatus = createApi({
  url: '/crm/contract-info/query-contract-audit-status',
  type: 'get'
})
// 获取合同状态
export const getContractStatus = createApi({
  url: '/crm/contract-info/query-contract-status',
  type: 'get'
})
// 根据合同编号获取合同基本信息
export const getMsgByContractCode = createApi({
  url: '/crm/contract-info/contract-info',
  type: 'get'
})
// 用于部门选择
export const orgTree = createApi({
  url: '/crm/common/query-org-tree',
  type: 'get'
})
// 根据部门code查询该部门所有员工的信息
export const queryAdminListByOrgCode = createApi({
  url: '/crm/common/query-adminList-by-orgCode',
  type: 'get'
})
// 根据产品名称模糊搜索
export const queryProductSelectList = createApi({
  url: '/crm/common/query-product-select-list',
  type: 'get'
})
// 根据用户id、会员id查询甲方信息
export const queryPartaInfo = createApi({
  url: '/crm/contract-info/query-parta-info',
  type: 'get'
})

// 创建合同
// 点击选购产品，弹出产品列表
export const productList = createApi({
  url: '/crm/contract-info/product-list',
  type: 'post'
})
// 获取所有品种
export const listBreedAssociateVO = createApi({
  url: '/crm/userproduct/list_breedAssociateVO',
  type: 'get'
})
// 获取所有产品树
export const listProductTreeVOAll = createApi({
  url: '/crm/userproduct/list_productTreeVOAll',
  type: 'get'
})
// 获取所有产品分类
export const listProductLevelVO = createApi({
  url: '/crm/userproduct/list_productLevelVO',
  type: 'get'
})
// 选购产品列表中，关联多个用户号码
export const relationPhone = createApi({
  url: '/crm/contract-info/info/relation-phone',
  type: 'get'
})
// 点击关联号码，弹出关联号码列表
export const queryUserList = createApi({
  url: '/crm/contract-info/info/query-user-list',
  type: 'get'
})
// 根据contractBaseInfoVO对象创建合同基本信息表信息
export const saveAgreement = createApi({
  url: '/crm/contract-info/save',
  type: 'post'
})
// 联想获取用户名
export const userSelectList = createApi({
  url: '/crm/common/query-user-select-list',
  type: 'get'
})
// 优惠策略
export const contractSaleStrategy = createApi({
  url: '/crm/contract-info/contract_sale_strategy',
  type: 'post'
})
// 根据合同id,用户把草稿的合同改为已提交的合同
export const contractInfoCommit = createApi({
  url: '/crm/contract-info/commit',
  type: 'post'
})
// 短信套餐下，产品明细
export const sourceList = createApi({
  url: '/crm/contract-info/source-list',
  type: 'post'
})

// 合同审核
// 查询合同下的乙方信息
export const getContractAudiQueryPartbInfo = createApi({
  url: '/crm/contract-info/query-partb-info',
  type: 'get'
})

// 根据合同code,判断当前合同在何节点
export const getContractAudiIsChecked = createApi({
  url: '/crm/contract-info/query-contract-is-checked',
  type: 'get'
})
// 查询合同下的工作流节点信息
export const queryWorkFlowInfo = createApi({
  url: '/crm/contract-info/query-work-flow-info',
  type: 'get'
})
// 查询退款产品
export const contractApplyInfo = createApi({
  url: '/crm/contract-info/contract-apply-info',
  type: 'get'
})

// 合同审核
// 获取审批详情
export const getContractAuditDetail = createApi({
  url: '/crm/contract-info/info/get-contract-audit-detail',
  type: 'get'
})
// 审核页面客户上传合同,变更流程
export const uploadContractChange = createApi({
  url: '/crm/contract-info/upload_contract_change',
  type: 'post'
})
// 合同作废
export const closeContract = createApi({
  url: '/crm/contract-info/close-contract',
  type: 'get'
})
// 根据合同Id,查询优惠策略的相关信息
export const querySaleStrategy = createApi({
  url: '/crm/contract-info/query-sale-strategy',
  type: 'get'
})
// 归档
export const archivalContract = createApi({
  url: '/crm/contract-info/archival',
  type: 'get'
})

// 系统配置
// 通话限制
// 获取用户白名单信息列表
export const userCallWhite = createApi({
  url: '/crm/usercallwhite/list',
  type: 'post'
})
// 保存用户白名单
export const saveUserCallwhite = createApi({
  url: '/crm/usercallwhite/save',
  type: 'post'
})
// 修改用户白名单信息
export const editWhiteMsg = createApi({
  url: '/crm/usercallwhite/update',
  type: 'post'
})
// 根据id作废用户白名单

export const cancelWhiteMsg = createApi({
  url: '/crm/usercallwhite/cancel',
  type: 'post'
})
// 根据id生效用户白名单消息
export const effectWhiteMsg = createApi({
  url: '/crm/usercallwhite/effect',
  type: 'post'
})
// 白名单 根据业务员，管理员，手机号判断能否呼出
export const iscalloutWhiteMsg = createApi({
  url: '/crm/usercallwhite/could-be-call-out',
  type: 'post'
})
// 根据会员id获取用户信息列表
export const getUsersByMemberId = createApi({
  url: '/crm/usermember/query-user-by-memberid',
  type: 'get'
})
// 获取会员基本信息表信息列表
export const memberbaseList = createApi({
  url: '/crm/memberbase/list',
  type: 'get'
})

// 限时配置
// 获取系统限时配置信息列表
export const listTimeConfig = createApi({
  url: '/crm/sysconfiglimit/listTimeConfig',
  type: 'post'
})
// 根据id激活系统限时配置
export const activateTimeConfig = createApi({
  url: '/crm/sysconfiglimit/activateTimeConfig',
  type: 'post'
})
// 根据id禁用系统限时配置
export const forbiddenTimeConfig = createApi({
  url: '/crm/sysconfiglimit/forbiddenTimeConfig',
  type: 'post'
})
// 根据sysConfigLimit对象创建系统限时配置信息
export const saveTimeConfig = createApi({
  url: '/crm/sysconfiglimit/saveTimeConfig',
  type: 'post'
})
// 根据sysConfigLimit对象修改系统限时配置信息
export const updateTimeConfig = createApi({
  url: '/crm/sysconfiglimit/updateTimeConfig',
  type: 'post'
})

// 客户数配置
// 根据sysConfigLimit对象创建客户数配置信息
export const saveCustomer = createApi({
  url: '/crm/sysconfiglimit/saveCustomer',
  type: 'post'
})
// 获取客户数配置信息列表
export const listCustomer = createApi({
  url: '/crm/sysconfiglimit/listCustomer',
  type: 'post'
})
// 修改客户数配置
export const updateCustomer = createApi({
  url: '/crm/sysconfiglimit/updateCustomer',
  type: 'post'
})
// 根据id激活系统客户数配置
export const activateeCustomerLimit = createApi({
  url: '/crm/sysconfiglimit/activateeCustomerLimit',
  type: 'post'
})
// 根据id激活系统客户数配置
export const forbiddeneCustomerLimit = createApi({
  url: '/crm/sysconfiglimit/forbiddeneCustomerLimit',
  type: 'post'
})
// 根据部门Id查询该部门所有员工的信息
export const queryAdminListByOrgId = createApi({
  url: '/crm/common/query-adminList-by-orgId',
  type: 'get'
})

// 自动分配业务员
// 获取自动分配业务员配置信息列表
export const saleManList = createApi({
  url: '/crm/sysconfigadmin/list',
  type: 'get'
})
// 禁用指定规则
export const disableOne = createApi({
  url: '/crm/sysconfigadmin/disable-one',
  type: 'get'
})
// 新增自动分配业务员规则
export const newRulerApi = createApi({
  url: '/crm/sysconfigadmin/add',
  type: 'get'
})
// 获取重复类型数据
export const queryAllDistributeRepeatType = createApi({
  url: '/crm/sysconfigadmin/queryAllDistributeRepeatType',
  type: 'get'
})
// 根据规则id获取规则信息
export const queryRuleById = createApi({
  url: '/crm/sysconfigadmin/query-rule-by-id',
  type: 'get'
})
// 禁用全部规则
export const disableAll = createApi({
  url: '/crm/sysconfigadmin/disable-all',
  type: 'get'
})
// 激活全部规则
export const activateAll = createApi({
  url: '/crm/sysconfigadmin/activate-all',
  type: 'get'
})
// 激活指定规则
export const activateOne = createApi({
  url: '/crm/sysconfigadmin/activate-one',
  type: 'get'
})

// 自动分配客服
// 获取自动分配客服配置信息列表
export const customList = createApi({
  url: '/crm/sysconfigcustomer/list',
  type: 'get'
})
// 用于前端（业务员）下拉选择
export const adminListName = createApi({
  url: '/crm/common/query-adminList-by-name',
  type: 'get'
})
// 保存自动分配客服配置
export const saveConfigCustomer = createApi({
  url: '/crm/sysconfigcustomer/save',
  type: 'post'
})
// 根据id激活自动分配客服配置
export const activateCustomer = createApi({
  url: '/crm/sysconfigcustomer/activateCustomer',
  type: 'post'
})
// 根据id禁用自动分配客服配置
export const forbiddenConfigCustomer = createApi({
  url: '/crm/sysconfigcustomer/forbiddenConfigCustomer',
  type: 'post'
})
// 批量禁用自动分配客服配置
export const forbiddenPageCustomer = createApi({
  url: '/crm/sysconfigcustomer/forbiddenPageCustomer',
  type: 'post'
})
// 批量激活自动分配客服配置
export const activatePageCustomer = createApi({
  url: '/crm/sysconfigcustomer/activatePageCustomer',
  type: 'post'
})

// 通话记录
// 获取通话记录信息列表
// export const callRecordList = createApi({
//   url: '/crm/crm-callRecords/list',
//   type: 'post'
// })
// guilf获取发送短信记录 发送短信记录信息列表
export const getUsersmstemplateListPage = createApi({
  url: '/crm/usersmstemplate/list_page',
  type: 'post'
})
// guilf获取发送短信记录 发送短信记录信息列表
export const getUsersmstemplateList = createApi({
  url: '/crm/usersmstemplate/list',
  type: 'get'
})
// guilf获取发送短信记录 发送短信记录信息列表
export const getUsersmstemplateListStatus = createApi({
  url: '/crm/usersmstemplate/list_status',
  type: 'get'
})
// 根据id来启用禁用操作
export const getUsersmstemplateDelete = createApi({
  url: '/crm/usersmstemplate/delete',
  type: 'get'
})
// 保存发送短信记录 发送短信记录
export const getUsersmstemplateSave = createApi({
  url: '/crm/usersmstemplate/save',
  type: 'post'
})
// 保存发送短信记录 发送短信记录
export const getUsersmstemplateUpdate = createApi({
  url: '/crm/usersmstemplate/update',
  type: 'post'
})

// 获取发送短信记录信息列表
export const getUsersmssendList = createApi({
  url: '/crm/usersmssend/list',
  type: 'post'
})
// 保存发送短信记录
export const getUsersmssendSave = createApi({
  url: '/crm/usersmssend/save',
  type: 'post'
})
// 选择用户列表
export const getUsersmssendListUser = createApi({
  url: '/crm/usersmssend/list_user',
  type: 'post'
})
// 获取所有省级区域
export const getAllProvice = createApi({
  url: '/crm/common/query-all-province',
  type: 'get'
})
// 根据父级区域code查询子级区域code列表
export const getSelectList = createApi({
  url: 'crm/common/query-area-select-list',
  type: 'get'
})
// 获取用户回复短信记录信息列表
export const getUsersmsreplyList = createApi({
  url: '/crm/usersmsreply/list',
  type: 'post'
})

// 获取用户短信黑名单信息列表
export const getUsersmsblackList = createApi({
  url: '/crm/usersmsblack/list',
  type: 'post'
})
// 根据id删除用户短信黑名单
export const getUsersmsblackDelete = createApi({
  url: '/crm/usersmsblack/delete',
  type: 'get'
})
// 保存用户短信黑名单
export const getUsersmsblackSave = createApi({
  url: '/crm/usersmsblack/save',
  type: 'post'
})
// 根据电话获取公司名称和用户名
export const getUsersmsblackInfoByMobile = createApi({
  url: '/crm/usersmsblack/info_by_mobile',
  type: 'get'
})

// 获取用户短信网关信息列表
export const getUsersmsgatewayList = createApi({
  url: '/crm/usersmsgateway/list',
  type: 'post'
})
// 根据id删除用户短信网关
export const getUsersmsgatewayDelete = createApi({
  url: '/crm/usersmsgateway/delete',
  type: 'get'
})
// 保存用户短信网关
export const getUsersmsgatewaySave = createApi({
  url: '/crm/usersmsgateway/save',
  type: 'post'
})
// 修改用户短信网关
export const getUsersmsgatewayUpdate = createApi({
  url: '/crm/usersmsgateway/update',
  type: 'post'
})
// 获取所有第三方接口枚举
export const getUsersmsgatewayEnum = createApi({
  url: '/crm/usersmsgateway/sms_passageway_enum',
  type: 'get'
})

// 获取用户过滤规则表信息列表
export const getUserfilterruleList = createApi({
  url: '/crm/userfilterrule/list',
  type: 'post'
})
// 根据id删除用户过滤规则表
export const getUserfilterruleDelete = createApi({
  url: '/crm/userfilterrule/delete',
  type: 'get'
})
// 保存用户过滤规则表
export const getUserfilterruleSave = createApi({
  url: '/crm/userfilterrule/save',
  type: 'post'
})
// 修改用户过滤规则表
export const getUserfilterruleUpdate = createApi({
  url: '/crm/userfilterrule/update',
  type: 'post'
})
// 用于前端（过滤规则）下拉框选择
export const getUserfilterruleEnum = createApi({
  url: '/crm/userfilterrule/user_filter_rule_enum',
  type: 'get'
})

// 获取产品分页列表
export const getUserproductListQuery = createApi({
  url: '/crm/userproduct/list_query',
  type: 'post'
})
// 获取用户试用次数
export const getUserproductGetCount = createApi({
  url: '/crm/userproduct/get_count',
  type: 'get'
})
// 获取所有产品分类
export const getUserproductListProductCategoryVO = createApi({
  url: '/crm/userproduct/list_productCategoryVO',
  type: 'get'
})

// 获取所有产品分类
export const getUserproductListProductTreeVO = createApi({
  url: '/crm/userproduct/list_productTreeVO',
  type: 'get'
})
// 获取所有产品分类
export const getAllProductTreeVO = createApi({
  url: '/crm/userproduct/list_productTreeVOAll',
  type: 'get'
})
// 获取所有品种
export const getUserproductListBreedAssociateVO = createApi({
  url: '/crm/userproduct/list_breedAssociateVO',
  type: 'get'
})
// 获取所有品种
export const crmTryVarieties = createApi({
  url: '/crm/common/query-breed-select-list',
  type: 'get'
})
// 获取用户产品订阅信息表 试用 正式信息列表(已选的)
export const getUserproductList = createApi({
  url: '/crm/userproduct/list',
  type: 'get'
})
// 停用
export const getUserproductUpdateState = createApi({
  url: '/crm/userproduct/update_state',
  type: 'get'
})
// 保存用户产品订阅信息表 试用 正式
export const getUserproductSaveList = createApi({
  url: '/crm/userproduct/save_list',
  type: 'post'
})

// 审批事项-合同审核
// 获取审批结果
export const getContractAuditResult = createApi({
  url: '/crm/contract-info/info/get-contract-audit-result',
  type: 'get'
})

// 试用延期
// 获取用户产品试用申请表信息列表
export const delayApplygList = createApi({
  url: '/crm/userproductdelayapply/list',
  type: 'get'
})

// 跟踪延期
// 获取延期跟踪用户-申请表信息列表
export const managerDelayApplygList = createApi({
  url: '/crm/usermanagerdelayapply/list',
  type: 'post'
})
// 延期跟踪申请-通过
export const passApply = createApi({
  url: '/crm/usermanagerdelayapply/pass',
  type: 'post'
})
// 延期跟踪申请-驳回
export const rejectApply = createApi({
  url: '/crm/usermanagerdelayapply/reject',
  type: 'post'
})

// 保存延期跟踪用户信息
export const saveDelayApply = createApi({
  url: '/crm/usermanagerdelayapply/save',
  type: 'post'
})

// 服务记录
// 分页查询服务记录
export const userServiceLogList = createApi({
  url: '/crm/userservicelog/list',
  type: 'post'
})
// 获取所有跟踪状态数据
export const queryServiceStatusList = createApi({
  url: '/crm/userservicelog/query-service-status-list',
  type: 'get'
})

// 预约提醒
// 获取预约表信息列表
export const userreServationList = createApi({
  url: '/crm/userreservation/list',
  type: 'get'
})
// 根据userReservation对象创建预约表信息
export const userReservationSave = createApi({
  url: '/crm/userreservation/save',
  type: 'post'
})

// 公共管理
// 获取公告信息信息列表
export const sysnoticeinfoList = createApi({
  url: '/crm/sysnoticeinfo/list',
  type: 'post'
})

// 公告信息附件下载
export const downloadInfo = createApi({
  url: '/crm/sysnoticeinfo/download',
  type: 'get'
})
// 根据sysNoticeInfo对象创建公告信息信息
export const sysnoticeinfoSave = createApi({
  url: '/crm/sysnoticeinfo/save',
  type: 'post'
})

// 新增公告信息
export const saveSysnoticeInfo = createApi({
  url: '/crm/sysnoticeinfo/save',
  type: 'post'
})

// 用户管理-用户分配
// 根据登录人获取其可分配用户数和最大可分配数
export const isQueryMax = createApi({
  url: '/crm/user-allot/query-login-allot-records',
  type: 'get'
})
// 根据业务员id获取其可分配用户数和最大可分配数
export const queryMax = createApi({
  url: '/crm/user-allot/query-allot-records',
  type: 'get'
})
// 检测自动分配是否开启
export const checkAutomatic = createApi({
  url: '/crm/user-allot/check-automatic-open',
  type: 'get'
})
// 检测设置代办是否开启
export const checkHelp = createApi({
  url: '/crm//user-allot/check-setUp-Admin',
  type: 'get'
})
// 获取新注册用户分配列表
export const getNewUserAllotList = createApi({
  url: '/crm/user-allot/new-user',
  type: 'post'
})
// 获取单个分配
export const getOneDestribute = createApi({
  url: '/crm/user-allot/single-allot-user',
  type: 'post'
})
// 获取批量分配
export const getMoreDestribute = createApi({
  url: '/crm/user-allot/batch-allot-user',
  type: 'post'
})
// 获取我要跟踪
export const getFollow = createApi({
  url: '/crm/user-allot/track-user',
  type: 'post'
})
// 获取客服代办
export const getSetup = createApi({
  url: '/crm/user-allot/setup-backup-admin',
  type: 'get'
})
// 获取客服取消代办
export const getCancel = createApi({
  url: '/crm/user-allot/cancel-backup-admin',
  type: 'get'
})
// 获取到账排名列表信息
export const getAccountRank = createApi({
  url: '/crm/user-allot/account-ranking',
  type: 'post'
})
// 获取会议排名列表信息
export const getMeetingRank = createApi({
  url: '/crm/user-allot/meeting-ranking',
  type: 'post'
})
// 获取电话排名列表信息
export const getCallRank = createApi({
  url: '/crm/user-allot/call-ranking',
  type: 'post'
})
// 获取开发客户排名列表信息
export const getDevelopRank = createApi({
  url: '/crm/user-allot/develop-user-ranking',
  type: 'post'
})
// 获取公共资源分配列表
export const getPublicResourceAllotList = createApi({
  url: '/crm/user-allot/public-resource',
  type: 'post'
})

// 获取历史分配记录列表
export const getHistoricalRecordsList = createApi({
  url: '/crm/user-allot/historical-records',
  type: 'post'
})
// 用户搜索
// 根据用户搜索条件查询用户分页列表
export const getUserSearch = createApi({
  url: '/crm/user/user-search',
  type: 'post'
})
// 根据产品名称模糊搜索
export const queryProduct = createApi({
  url: '/crm/common/query-product-select-list',
  type: 'get'
})
// 获取省
export const getProvice = createApi({
  url: '/crm/common/query-all-province',
  type: 'get'
})
// 获取市
export const getCity = createApi({
  url: '/crm/common/query-area-select-list',
  type: 'get'
})
// 获取区
export const getArea = createApi({
  url: '/crm/common/query-area-select-list',
  type: 'get'
})

// 用户投诉
// 获取用户投诉信息列表
export const userComplainList = createApi({
  url: '/crm/usercomplain/list',
  type: 'get'
})
// 新增投诉
export const userComplainSave = createApi({
  url: '/crm/usercomplain/save',
  type: 'post'
})
// 严重等级下拉列表 
export const userComplainqueryAllSeriouslevel = createApi({
  url: '/crm/usercomplain/query-all-serious-level',
  type: 'get'
})
// 用户投诉撤销 
export const userComplainCancel = createApi({
  url: '/crm/usercomplain/cancel',
  type: 'post'
})
// 用户投诉指派
export const userComplainAppoint = createApi({
  url: '/crm/usercomplain/appoint',
  type: 'post'
})
// 用户投诉处理
export const userComplainHandle = createApi({
  url: '/crm/usercomplain/handle',
  type: 'post'
})

// 用户注册
// 根据会员名称模糊匹配下拉选择列表（注册专用）
export const queryMemberSelectListRegister = createApi({
  url: '/crm/common/query-member-select-list-register',
  type: 'get'
})
// 查询该会员是否注册
export const isRegister = createApi({
  url: '/crm/register/check-member-register',
  type: 'get'
})
// 根据会员名称模糊匹配下拉选择列表
export const memberSelectList = createApi({
  url: '/crm/common/query-member-select-list',
  type: 'get'
})
// 根据父级区域code查询子级区域code列表
export const areaSelectList = createApi({
  url: '/crm/common/query-area-select-list',
  type: 'get'
})
// 逐级获取品种树
export const queryBreedTree = createApi({
  url: '/crm/common/query-breed-tree',
  type: 'get'
})
// 获取所有公司性质下拉列表数据
export const queryCompanyNatureSelectList = createApi({
  url: '/crm/common/query-companyNature-select-list',
  type: 'get'
})
// 获取所有公司类型下拉列表数据
export const queryCompanyTypeSelectList = createApi({
  url: '/crm/common/query-companyType-select-list',
  type: 'get'
})
// 获取所有省级区域
export const queryAllProvince = createApi({
  url: '/crm/common/query-all-province',
  type: 'get'
})
// 获取所有公司类型下拉列表数据
export const getCompanyTypeEnum = createApi({
  url: '/crm/common/query-companyType-select-list',
  type: 'get'
})

// 用户跟踪
// 新增用户跟踪
export const saveUserServiceLog = createApi({
  url: '/crm/userservicelog/save',
  type: 'post'
})
// 放弃用户
export const giveUpUser = createApi({
  url: '/crm/userservicelog/give-up-user',
  type: 'get'
})
// 根据产品id获取用户服务信息信息
export const getUserServeice = createApi({
  url: '/crm/userservicelog/find-by-productId',
  type: 'post'
})
// 添加跟踪人
export const addNewAdmin = createApi({
  url: '/crm/userservicelog/add-new-admin',
  type: 'post'
})
// 判断登录人是否是业务员，业务团队长、营销部门经理中的一个
export const checkIsAdmin = createApi({
  url: '/crm/userservicelog/check-is-admin',
  type: 'post'
})
// 判断登录人是否是客服人员、客服部门经理中的一个
export const checkIsCustomer = createApi({
  url: '/crm/userservicelog/check-is-customer',
  type: 'post'
})
// 将用户转移跟踪人
export const userTransferAdmin = createApi({
  url: '/crm/userservicelog/user-transfer-admin',
  type: 'post'
})
// 获取所有业务员列表信息
export const queryAllAdmin = createApi({
  url: '/crm/user-allot/query-all-admin',
  type: 'post'
})

// 退款
// 根据contractChangeApply对象创建合同变更申请表信息
export const contractchangeapplySave = createApi({
  url: '/crm/contractchangeapply/save',
  type: 'post'
})

// 退款审核
// 获取合同变更申请表信息列表
export const contractChangeapplyMyList = createApi({
  url: '/crm/contractchangeapply/my_list',
  type: 'post'
})
// 获取合同变更申请表信息列表
export const contractChangeapplyList = createApi({
  url: '/crm/contractchangeapply/list',
  type: 'post'
})
// 退款审核
// 获取合同变更申请表信息列表
export const contractChangeapplyInfoAll = createApi({
  url: '/crm/contractchangeapply/info_all',
  type: 'get'
})
// 退款审核
// 获取合同变更申请表信息列表
export const contractChangeapplyInfoContractApplyAudit = createApi({
  url: '/crm/contractchangeapply/info/contract_apply_audit',
  type: 'post'
})
// 退款审核
// 获取合同变更申请表信息列表
export const contractChangeapplyWorkflow = createApi({
  url: '/crm/contractchangeapply/query_workflow',
  type: 'get'
})

// 自动分配
// 获取已审核/未审核规则列表
export const queryAuditRules = createApi({
  url: '/crm/sysconfigadmin/query-audit-rules',
  type: 'get'
})
// 审核某个规则
export const auditRuleById = createApi({
  url: '/crm/sysconfigadmin/audit-rule-by-id',
  type: 'get'
})

// 工作台接口
// 客户维护
export const workbenchUserManager = createApi({
  url: '/workbench/workbench-sales/user-manager',
  type: 'get'
})
// 部门事项
export const workbenchDeptItems = createApi({
  url: '/workbench/workbench-sales/department-items',
  type: 'get'
})
// 通话事项
export const workbenchPhoneItems = createApi({
  url: '/workbench/workbench-sales/phone-items',
  type: 'get'
})
// 财务事项
export const workbenchFinancialItem = createApi({
  url: '/workbench/workbench-sales/financial-item',
  type: 'get'
})
// 业绩目标
export const workbenchPerformanceTarget = createApi({
  url: '/workbench/workbench-sales/performance-target',
  type: 'get'
})
// 登录人信息
export const queryLoginInfo = createApi({
  url: '/workbench/workbench-sales/query-login-info',
  type: 'get'
})

// 合同模板
// 获取合同模板信息列表
export const getContractTempletList = createApi({
  url: '/crm/contract-template/list',
  type: 'get'
})

// 保存合同模板
export const saveContractTemplet = createApi({
  url: '/crm/contract-template/save',
  type: 'post'
})

// 修改合同模板
export const updateContractTemplet = createApi({
  url: '/crm/contract-template/update',
  type: 'post'
})

// 根据id删除合同模板
export const deleteContractTemplet = createApi({
  url: '/crm/contract-template/delete',
  type: 'post'
})

// 根据id禁用合同模板信息
export const disabledContractTemplet = createApi({
  url: '/crm/contract-template/disable-template',
  type: 'get'
})

// 根据id激活合同模板信息
export const enableContractTemplet = createApi({
  url: '/crm/contract-template/enable-template',
  type: 'get'
})

// 根据id获取合同模板信息
export const getContractTempletInfo = createApi({
  url: '/crm/contract-template/info',
  type: 'get'
})

// 标签管理操作接口
// 获取标签管理信息分页列表
export const getConfigList = createApi({
  url: '/crm/sys-config-lable/list',
  type: 'post'
})

// 获取标签管理信息列表
export const getAllConfigList = createApi({
  url: '/crm/sys-config-lable/query-list',
  type: 'get'
})

// 保存标签管理
export const saveConfig = createApi({
  url: '/crm/sys-config-lable/save',
  type: 'post'
})

// 修改标签管理
export const updateConfig = createApi({
  url: '/crm/sys-config-lable/update',
  type: 'post'
})

// 根据id删除标签管理
export const deleteConfig = createApi({
  url: '/crm/sys-config-lable/delete',
  type: 'post'
})

// 根据id禁用标签管理信息
export const disabledConfig = createApi({
  url: '/crm/sys-config-lable/disabled-label',
  type: 'get'
})

// 根据id激活标签管理信息
export const enableConfig = createApi({
  url: '/crm/sys-config-lable/enabled-label',
  type: 'get'
})

// 根据id获取标签管理信息
export const getConfigInfo = createApi({
  url: '/crm/sys-config-lable/info',
  type: 'get'
})
// 根据父级区域id查询子级区域id列表
export const queryAreaTree = createApi({
  url: '/crm/common/query-area-tree',
  type: 'get'
})

// 公司列表
export const crmCompanyList = createApi({
  url: '/crm/company-list/query-page',
  type: 'post'
})

// 公司名称模糊查询
export const crmCompanyNameSearch = createApi({
  url: '/crm/common/query-member-select-list',
  type: 'get'
})

// 查询站点列表
export const selectSiteList = createApi({
  url: '/crm/common/query-site-list',
  type: 'get'
})
// 查询频道列表
export const selectChannelList = createApi({
  url: '/crm/common/query-channel-list',
  type: 'get'
})
// 查询栏目列表
export const selectColumnList = createApi({
  url: '/crm/common/query-column-list',
  type: 'get'
})

// 续入业务员
// 获取续入业务员配置信息列表
export const continuedSalemenList = createApi({
  url: '/crm/continued/salemen_list',
  type: 'get'
})
// 根据业务员名称模糊查询启用状态的续入业务员集合
export const queryContinuedSalemenList = createApi({
  url: '/crm/continued/query-continued-salemen-list',
  type: 'get'
})
// 根据id删除续入业务员配置消息
export const continuedDelete = createApi({
  url: '/crm/continued/delete',
  type: 'post'
})
// 根据sysConfigContinue对象创建续入业务员配置信息
export const salemenAddOperate = createApi({
  url: '/crm/continued/salemen/add_operate',
  type: 'post'
})
// 根据id激活或禁用续入业务员配置
export const salemenActiveorDisabled = createApi({
  url: '/crm/continued/salemen/activeordisabled',
  type: 'post'
})
// 获取待续入合同自留申请记录表信息列表
export const contractretentionrecordList = createApi({
  url: '/crm/contractretentionrecord/list',
  type: 'get'
})
// 待续入合同分配列表
export const continuedContractList = createApi({
  url: '/crm/continued/contract_list',
  type: 'post'
})
// 根据id审批通过待续入合同
export const passContractRetentionRecord = createApi({
  url: '/crm/contractretentionrecord/passContractRetentionRecord',
  type: 'post'
})
// 根据id驳回待续入合同
export const overruleContractRetentionRecord = createApi({
  url: '/crm/contractretentionrecord/overruleContractRetentionRecord',
  type: 'post'
})
// 获取待续入合同分配记录列表
export const contractallocationrecordList = createApi({
  url: '/crm/contractallocationrecord/list',
  type: 'get'
})
// 合同单个分配
export const singleAllocation = createApi({
  url: '/crm/continued/single-allocation',
  type: 'post'
})
// 获取待续入合同分配记录详情列表
export const recordDetailsList = createApi({
  url: '/crm/contractallocationrecord/detailsList',
  type: 'get'
})
// 自动预分配
export const automaticPreviewAllot = createApi({
  url: '/crm/continued/automatic-preview-allot',
  type: 'get'
})
// 判断是否进行了自动分配
export const checkIsAutomaticAllot = createApi({
  url: '/crm/continued/check-is-automatic-allot',
  type: 'get'
})
// 合同批量分配
export const batchAllocation = createApi({
  url: '/crm/continued/batch-allocation',
  type: 'get'
})
// 自动分配预览
export const automaticAllotPreviewList = createApi({
  url: '/crm/continued/automatic-allot-preview-list',
  type: 'post'
})
// 自动分配确认
export const automaticAllotConfirm = createApi({
  url: '/crm/continued/automatic-allot-confirm',
  type: 'post'
})
// 获取具体分配详情
export const distributionInfo = createApi({
  url: '/crm/contractallocationrecord/distributionInfo',
  type: 'get'
})
// 修改待续入合同自留申请记录表
export const contractretentionrecordUpdate = createApi({
  url: '/crm/contractretentionrecord/update',
  type: 'post'
})
// 新增待续入合同自留申请记录表
export const contractretentionrecordSave = createApi({
  url: '/crm/contractretentionrecord/save',
  type: 'get'
})
// 修改密码
export const updatePasswordByUserId = createApi({
  url: '/crm/register/update-password-by-userId',
  type: 'post'
})
// 重新生成合同附件
export const generateContractFileAgain = createApi({
  url: '/crm/contract-info/generate-contract-file-again',
  type: 'get'
})
// 分页查询服务记录(无数据权限)
export const userServiceLoglistNoPower = createApi({
  url: '/crm/userservicelog/list-no-power',
  type: 'post'
})
// 获取通话记录信息列表
export const crmCallRecordsListNoPower = createApi({
  url: '/crm/crm-callRecords/list-no-power',
  type: 'post'
})
// 判断用户是否是公共资源用户(true：是公共资源用户)
export const queryUserIsPublic = createApi({
  url: '/crm/company-list/query-user-is-public',
  type: 'post'
})
// 复制权限
export const userIdCopyProduct = createApi({
  url: '/crm/userbase/userId_copy_product',
  type: 'get'
})
// 点击复制试用产品权限，返回复制的产品权限列表
export const copyProductList = createApi({
  url: '/crm/contract-info/copy-product-list',
  type: 'post'
})
// 点击复制正式产品权限，返回复制的产品权限列表
export const copyFormalProductList = createApi({
  url: '/crm/contract-info/copy-formal-product-list',
  type: 'post'
})

// 权限试用
// 根据会员id获取权限分页列表
// 点击复制产品权限，返回复制的产品权限列表
export const queryProductByMemberId = createApi({
  url: '/crm/userproduct/query_product_by_memberId',
  type: 'post'
})

// 查询下次联系时间相关信息
export const queryRlNextTimeInfo = createApi({
  url: '/crm/userservicelog/query_rl_next_time_info',
  type: 'get'
})
// 禁用用户产品订阅信息
export const disableUserProduct = createApi({
  url: '/crm/userproduct/disable_user_product',
  type: 'get'
})
// 激活用户产品订阅信息byId
export const activateUserProductById = createApi({
  url: '/crm/userproduct/activate_user_product_by_id',
  type: 'get'
})
// 延期选定权限
export const delayUserProduct = createApi({
  url: '/crm/userproduct/delay_user_product',
  type: 'post'
})
// 查询是否存在第二跟踪人
export const checkExistSecondUserManager = createApi({
  url: '/crm/userservicelog/check-exist-second-userManager',
  type: 'get'
})
// 删除跟踪人
export const removeUserManager = createApi({
  url: '/crm/userservicelog/remove-userManager',
  type: 'get'
})
// 根据条件查询频道
export const userAppRefList = createApi({
  url: '/crm/userbase/quary/user_app_ref_list',
  type: 'post'
})
// 批量保存频道
export const createUserAppRef = createApi({
  url: '/crm/userbase/create/user_app_ref_list',
  type: 'post'
})
// 删除频道
export const deleteUserAppRef = createApi({
  url: '/crm/userbase/delete/user_app_ref',
  type: 'post'
})
// 保存修改排序
export const updateUserAppRefList = createApi({
  url: '/crm/userbase/update/user_app_ref_list',
  type: 'post'
})
// 根据产品和站点模糊搜索
export const queryChannel = createApi({
  url: '/crm/common/query-channel',
  type: 'post'
})

// 批量禁用权限
export const batchDisable = createApi({
  url: 'crm/userproduct/disable_batch_user_product',
  type: 'post'
})

// 批量激活权限
export const batchActivation = createApi({
  url: 'crm/userproduct/activate_batch_user_product_by_id',
  type: 'get'
})

// 获取数据权限
export const getDatapermissions = createApi({
  url: 'crm/datapermissions/list',
  type: 'get'
})
// 获取数据权限
export const updateDatapermissions = createApi({
  url: 'crm/datapermissions/update',
  type: 'post'
})
