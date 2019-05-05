import createApi from './http'

// 绩效公用树-绩效部门树
export const pfCommonTreeDeptTree = createApi({
  url: '/report/PfCommonTree/deptTree',
  type: 'get'
})

// 绩效公用树-绩效人员信息
export const pfCommonTreeEmployeeSelect = createApi({
  url: '/report/PfCommonTree/employeeSelect',
  type: 'get'
})

// 绩效公用树-会员下拉框数据
export const pfCommonTreeMemberSelect = createApi({
  url: '/report/PfCommonTree/memberSelect',
  type: 'get'
})


// 财务部门树
export const pfCommonTreeOrgTree = createApi({
  url: '/report/PfCommonTree/orgTree',
  type: 'get'
})



// 编辑报告提成-明细累计查询
export const bjbgExtractDetailTotal = createApi({
  url: '/report/bjbgExtract/detail_total',
  type: 'post'
})

// 编辑报告提成-汇总列表查询
export const bjbgExtractListPage = createApi({
  url: '/report/bjbgExtract/list_page',
  type: 'post'
})

// 编辑报告提成-明细列表查询
export const bjbgExtractListPageDetail = createApi({
  url: '/report/bjbgExtract/list_page_detail',
  type: 'post'
})

// 合同执行情况-认账明细列表
export const efcontractexecutionAckList = createApi({
  url: '/report/efcontractexecution/ackList',
  type: 'get'
})

// 合同执行情况-查询金额统计
export const efcontractexecutionListAmountCount = createApi({
  url: '/report/efcontractexecution/listAmountCount',
  type: 'post'
})

// 合同执行情况-分页查询
export const efcontractexecutionListPage = createApi({
  url: '/report/efcontractexecution/listPage',
  type: 'post'
})

// 合同执行情况-产品信息
export const efcontractexecutionProductList = createApi({
  url: '/report/efcontractexecution/productList',
  type: 'get'
})

// 合同执行情况-开票明细列表
export const efcontractexecutionInvoiceItemsList = createApi({
  url: '/report/efcontractexecution/invoiceItemsList',
  type: 'get'
})
// 任务完成率-年列表
export const reportOrgProductYearList = createApi({
  url: '/report/reportIndustryChainAmount/reportOrgProductYear',
  type: 'post'
})
// 任务完成率-月列表
export const reportOrgProductMonthList = createApi({
  url: '/report/reportIndustryChainAmount/reportOrgProductMonth',
  type: 'get'
})
// 任务完成率-列表汇总
export const reportOrgProductYearCount = createApi({
  url: '/report/reportIndustryChainAmount/reportOrgProductYearCount',
  type: 'post'
})

// 财务报表-产业链收入统计-产品分类收入占比
// 产品分类收入占比列表查询
export const reportICAProductCategoryList = createApi({
  url: '/report/reportIndustryChainAmount/productCategoryList',
  type: 'post'
})

export const reportICAReceiptAndPaymentList = createApi({
  url: '/report/reportIndustryChainAmount/receiptAndPaymentList',
  type: 'post'
})

//到账统计-每日账务详情列表
export const efaccounttransferList = createApi({
  url: '/report/efaccounttransfer/transfer_list_page',
  type: 'post'
})

//到账统计-每日到账详情-数据统计
export const efaccounttransferListTotal = createApi({
  url: '/report/efaccounttransfer/transfer_list_page_total',
  type: 'post'
})

//到账统计-每日到账详情-认账明细
export const efaccounttransferListAckItem = createApi({
  url: '/report/efaccounttransfer/transfer_list_ack_item',
  type: 'get'
})


//到账统计-每日到账详情-未认账明细
export const efaccounttransferListUnAckItem = createApi({
  url: '/report/efaccounttransfer/transfer_list_un_ack_item',
  type: 'get'
})

//到账统计-每日到账详情-到账明细
export const efaccounttransferListItem = createApi({
  url: '/report/efaccounttransfer/transfer_list_item',
  type: 'get'
})

//到账统计-每日到账详情-退款明细
export const efaccounttransferListRefundItem = createApi({
  url: '/report/efaccounttransfer/transfer_list_refund_item',
  type: 'get'
})

//到账统计-每日到账详情-当日退款明细
export const efaccounttransferListRefundItemRelation = createApi({
  url: '/report/efaccounttransfer/transfer_list_relation_refund_item',
  type: 'get'
})

//到账统计-业务员到账排行
export const efaccounttransferAdminList = createApi({
  url: '/report/efaccounttransfer/admin_list_page',
  type: 'post'
})

//到账统计-业务员到账排行-统计
export const efaccounttransferAdminListTotal = createApi({
  url: '/report/efaccounttransfer/admin_list_page_total',
  type: 'post'
})

//到账统计-部门到账排行
export const efaccounttransferOrgList = createApi({
  url: '/report/efaccounttransfer/org_list_page',
  type: 'post'
})

//到账统计-部门到账排行-统计
export const efaccounttransferOrgListTotal = createApi({
  url: '/report/efaccounttransfer/org_list_page_total',
  type: 'post'
})

// 财务报表-营销收入统计
// 年统计报表查询
export const marketingRevenueYearList = createApi({
  url: '/report/report/marketingRevenue/yearStatistics',
  type: 'get'
})
// 月统计报表查询
export const marketingRevenueMonthList = createApi({
  url: '/report/report/marketingRevenue/monthStatistics',
  type: 'get'
})
// 周统计报表查询
export const marketingRevenueWeekList = createApi({
  url: '/report/report/marketingRevenue/weekStatistics',
  type: 'get'
})


// 每日到账统计交易流水详情
export const efaccounttransferDetail = createApi({
  url: '/report/efaccounttransfer/transfer_static_list_page',
  type: 'post'
})


