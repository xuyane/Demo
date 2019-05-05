import createApi from './http.js'

/** api */

// 获取客户名称搜索列表
export const getMemberList = createApi({
  url: '/finance/common/selectMember',
  type: 'get'
})

// 获取会员名称搜索列表
export const getMemberAdminList = createApi({
  url: '/finance/common/selectMemberByAdmin',
  type: 'get'
})
// 获取登录人id
export const getLoginData = createApi({
  url: '/finance/common/getLoginData',
  type: 'get'
})
// 获取部门树
export const getDeptList = createApi({
  url: '/finance/common/selectDept',
  type: 'get'
})
// 获取下拉框内容
export const getSelectAllList = createApi({
  url: '/finance/common/select',
  type: 'get'
})

// 到账管理列表
export const getAccountManager = createApi({
  url: '/finance/account_transfer/list_page',
  type: 'get'
})
// 到账查询列表
export const checkManager = createApi({
  url: '/finance/account_transfer/list_user_page',
  type: 'get'
})

// 销项票列表
export const getSaleTicketList = createApi({
  url: '/finance/invoiceinfo/listPage',
  type: 'post'
})

// 销项票领用记录列表
export const getSaleRecord = createApi({
  url: '/finance/invoiceReceive/list_page',
  type: 'post'
})

// 直接成本列表
export const getDirectList = createApi({
  url: '/finance/directCost/list_page',
  type: 'post'
})

// 间接成本列表
export const getinDirectList = createApi({
  url: '/finance/inDirectCost/list_page',
  type: 'post'
})

// 获取产品开通列表
export const getProductOpeningList = createApi({
  url: '/finance/contractOpen/list_page',
  type: 'post'
})

// 获取产品开通列表
export const getInvoiceapplyList = createApi({
  url: '/finance/finance/invoiceapply/listPage',
  type: 'post'
})
// 获取认账管理列表
export const getAccountackcontractList = createApi({
  url: '/finance/accountackcontract/list',
  type: 'post'
})
// 获取认账审核列表
export const getCancelAccountAckList = createApi({
  url: '/finance/accountackcontract/listCancelAccountAck',
  type: 'post'
})

// 获取关联产品详情
export const getContactProductDetail = createApi({
  url: '/finance/accountackcontract/detailContactProduct',
  type: 'get'
})

// 获取关联到账详情
export const getAccountTransferByCancelList = createApi({
  url: '/finance/accountackcontract/listAccountTransferByCancel',
  type: 'get'
})

// 获取认账审核详情
export const getCancelAccountAckDetail = createApi({
  url: '/finance/accountackcontract/detailCancelAccountAck',
  type: 'get'
})
// 认账审核（批量）通过/驳回
export const auditCancelAccountAck = createApi({
  url: '/finance/accountackcontract/auditCancelAccountAck',
  type: 'post'
})
// 获取会员开票基础信息信息列表分页数据
export const memberBasicInfo = createApi({
  url: '/finance/memberinvoiceinfo/listPage',
  type: 'post'
})
// 获取开票申请详情页数据
export const invoiceapplyDetails = createApi({
  url: '/finance/finance/invoiceapply/details',
  type: 'get'
})
// 获取开票申请合同集合关联的产品明细信息数据
export const invoiceapplyProductList = createApi({
  url: '/finance/finance/invoiceapply/productList',
  type: 'get'
})
// 开票
export const saveInvoiceapply = createApi({
  url: '/finance/finance/invoiceapply/save',
  type: 'post'
})
// 填写票号列表数据
export const writeTicketDataList = createApi({
  url: '/finance/finance/invoiceAudit/invoiceNoList',
  type: 'post'
})
// 票据审核详情数据
export const ticketDetailData = createApi({
  url: '/finance/finance/invoiceAudit/invoiceAuditDetail',
  type: 'post'
})
// 新增会员开票信息
export const addInsert = createApi({
  url: '/finance/memberinvoiceinfo/insert',
  type: 'post'
})
// 修改会员开票信息
export const editInsert = createApi({
  url: '/finance/memberinvoiceinfo/postMemberInvoiceInfo',
  type: 'post'
})
// 获取会员开票信息
export const insertDetail = createApi({
  url: '/finance/memberinvoiceinfo/detail',
  type: 'post'
})
// 票据审核单个和批量通过/驳回
export const auditInvoiceApply = createApi({
  url: '/finance/finance/invoiceAudit/auditInvoiceApply',
  type: 'post'
})
// 获取票据审核详情数据
export const getInvoiceAuditDetail = createApi({
  url: '/finance/finance/invoiceAudit/invoiceAuditDetail',
  type: 'post'
})
// 获取票据审核详情数据
export const invoiceinfoDetail = createApi({
  url: '/finance/invoiceinfo/detail',
  type: 'get'
})


// 到账退款列表
export const getRefundList = createApi({
  url: '/finance/account_transfer/list_refund_page',
  type: 'get'
})

// 到账退款详情
export const getRefundDetail = createApi({
  url: '/finance/account_transfer/transfer_refund_audit_info',
  type: 'get'
})


// 到账退款审核流程
export const getRefundProcess = createApi({
  url: '/finance/account_transfer/audit_flow',
  type: 'get'
})

// 到账退款审核记录
export const getRefundRecords = createApi({
  url: '/finance/account_transfer/audit_log',
  type: 'get'
})

// 到账退款审核或驳回
export const refundOperate = createApi({
  url: '/finance/account_transfer/transfer_refund_audit',
  type: 'get'
})


// 判断是否是开票专员
export const iskpzy = createApi({
  url: '/finance/finance/invoiceAudit/iskpzy',
  type: 'post'
})


/*// 直接成本数据导出
export const directExport = createApi({
  url: '/finance/directCost/directCostDownload',
  type: 'get'
})

// 间接成本数据导出
export const inDirectExport = createApi({
  url: '/finance/inDirectCost/indirectCostDownload',
  type: 'get'
})*/
