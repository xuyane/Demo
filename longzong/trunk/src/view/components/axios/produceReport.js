import createApi from './http'
// 生产报表-编辑排行-部门排行-信息发布
export const queryOrgMsgOrderFb = createApi({
    url: '/report/zxbjxxfb/queryOrgMsgOrderFb',
    type: 'post'
})

// 生产报表-编辑指标-部门排行-电话量
export const queryOrgMsgOrderCj = createApi({
    url: '/report/zxbjxxfb/queryOrgMsgOrderCj',
    type: 'post'
})

// 生产报表-编辑指标-部门排行-贡献度
export const queryOrgMsgOrderQt = createApi({
    url: '/report/zxbjxxfb/queryOrgMsgOrderQt',
    type: 'post'
})

// 生产报表-编辑排行-个人排行-信息发布
export const querySinglMsgOrderFb = createApi({
    url: '/report/zxbjxxfb/querySinglMsgOrderFb',
    type: 'post'

})

// 生产报表-编辑指标-个人排名-贡献度
export const querySinglMsgOrderQt = createApi({
    url: '/report/zxbjxxfb/querySinglMsgOrderQt',
    type: 'post'
})

// 生产报表-编辑指标-个人排名-电话量
export const querySinglMsgOrderCj = createApi({
        url: '/report/zxbjxxfb/querySinglMsgOrderCj',
        type: 'post'
    })
    //生产报表-编辑指标-个人指标-其他
export const querySinglMsgOthers = createApi({
    url: '/report/zxbjxxfb/querySinglMsgOthers',
    type: 'post'
})

// 生产报表-编辑指标-部门指标-信息发布
export const queryOrgMsgPublish = createApi({
    url: '/report/zxbjxxfb/queryOrgMsgPublish',
    type: 'post'
})


// 生产报表-编辑指标-个人指标-信息发布
export const querySingleMsgPublish = createApi({
    url: '/report/zxbjxxfb/querySingleMsgPublish',
    type: 'post'
})

// 生产报表-编辑指标-个人指标-信息采集
export const querySinglMsgCollect = createApi({
    url: '/report/zxbjxxfb/querySinglMsgCollect',
    type: 'post'
})

// 生产报表-编辑指标-部门指标-信息采集
export const queryOrgMsgCollect = createApi({
    url: '/report/zxbjxxfb/queryOrgMsgCollect',
    type: 'post'
})

// 生产报表-编辑指标-部门指标-其他
export const queryOrgMsgOthers = createApi({
    url: '/report/zxbjxxfb/queryOrgMsgOthers',
    type: 'post'
})

export const getBranchTreeList = createApi({
    url: '/report/PfCommonTree/orgTree',
    type: 'get'
})

//营销指标 - 个人指标 - 产品分类 - 列表
export const listAdminCategory = createApi({
    url: '/report/marketingTargets/listAdminCategory',
    type: 'post'
})

//营销指标 - 部门指标 - 产品分类 - 列表
export const listOrgCategory = createApi({
    url: '/report/marketingTargets/listOrgCategory',
    type: 'post'
})

//营销指标 - 部门指标 -  业绩统计 - 列表
export const listOrgPerformance = createApi({
    url: '/report/marketingTargets/listOrgPerformance',
    type: 'post'
})

//营销指标 - 部门指标 - 业绩统计 - 汇总
export const sumOrgPerformance = createApi({
    url: '/report/marketingTargets/sumOrgPerformance',
    type: 'post'
})

//营销指标 - 部门指标 - 客户管理 - 列表
export const listOrgCustomer = createApi({
    url: '/report/marketingTargets/listOrgCustomer',
    type: 'post'
})

//营销指标 - 部门/个人指标 - 客户管理 - 汇总
export const sumCustomer = createApi({
    url: '/report/marketingTargets/sumCustomer',
    type: 'post'
})

//营销指标 - 个人指标 - 客户管理 - 列表
export const listAdminCustomer = createApi({
    url: '/report/marketingTargets/listAdminCustomer',
    type: 'post'
})

//营销指标 - 部门指标 - 通话量
export const orgCall = createApi({
    url: '/report/marketingTargets/orgCall',
    type: 'post'
})

//营销指标 - 个人指标 - 业绩统计 - 列表
export const listAdminPerformance = createApi({
    url: '/report/marketingTargets/listAdminPerformance',
    type: 'post'
})

//营销指标 - 个人指标 - 业绩统计 - 汇总
export const sumAdminPerformance = createApi({
    url: '/report/marketingTargets/sumAdminPerformance',
    type: 'post'
})

//营销指标 - 个人指标 - 通话量
export const adminCall = createApi({
    url: '/report/marketingTargets/adminCall',
    type: 'post'
})

//营销指标 - 部门/个人指标 - 产品分类 - 汇总
export const sumCategory = createApi({
    url: '/report/marketingTargets/sumCategory',
    type: 'post'
})

//营销排名 - 个人排行 - 通话量排行
export const listAdminCallRank = createApi({
    url: '/report/marketingRank/listAdminCall',
    type: 'post'
})

//营销排名 - 个人排行 - 客户管理排行
export const listAdminCustomerRank = createApi({
    url: '/report/marketingRank/listAdminCustomer',
    type: 'post'
})

//营销排名 - 个人排行 - 任务完成率排行（新入）
export const listAdminNewRank = createApi({
        url: '/report/marketingRank/listAdminNew',
        type: 'post'
    })
    //营销排名 - 个人排行 - 任务完成率排行（续入）
export const listAdminOldRank = createApi({
        url: '/report/marketingRank/listAdminOld',
        type: 'post'
    })
    //营销排名 - 部门排行 - 客户管理排行
export const listOrgCustomerRank = createApi({
        url: '/report/marketingRank/listOrgCustomer',
        type: 'post'
    })
    //营销排名 - 部门排行 - 任务完成率排行（新入）
export const listOrgNewRank = createApi({
        url: '/report/marketingRank/listOrgNew',
        type: 'post'
    })
    //营销排名 - 部门排行 - 任务完成率排行（续入）
export const listOrgOldRank = createApi({
    url: '/report/marketingRank/listOrgOld',
    type: 'post'
})

//生产报表 > 编辑指标 > 部门指标-查询列表-异常次数
export const list_page = createApi({
    url: '/report/zxbjxxfbdetail/list_page',
    type: 'post'
})

//营销排名 - 产品分类
export const proCategoryList = createApi({
        url: '/report/PfCommonTree/proCategoryList',
        type: 'get'
    })
    //个人信息发布导出
export const singleFbExcept = createApi({
        url: '/report/zxbjxxfb/singleFbExcept',
        type: 'post'
    })
    //个人信息采集列表导出
export const singleCjExcept = createApi({
        url: '/report/zxbjxxfb/singleCjExcept',
        type: 'post'
    })
    //个人其他信息列表导出
export const singleQtExcept = createApi({
        url: '/report/zxbjxxfb/singleQtExcept',
        type: 'post'
    })
    //部门信息采集列表导出
export const orgCjExcept = createApi({
        url: '/report/zxbjxxfb/orgCjExcept',
        type: 'post'
    })
    //部门信息发布导出
export const orgFbExcept = createApi({
        url: '/report/zxbjxxfb/orgFbExcept',
        type: 'post'
    })
    //部门信息其他列表导出
export const orgQtExcept = createApi({
    url: '/report/zxbjxxfb/orgQtExcept',
    type: 'post'
})

//营销指标 - 个人指标 - 业绩统计 - 导出
export const exportAdminPerformance = createApi({
    url: '/report/marketingTargets/exportAdminPerformance',
    type: 'post'
})

//营销指标 - 个人指标 - 产品分类 - 导出
export const exportAdminCategory = createApi({
    url: '/report/marketingTargets/exportAdminCategory',
    type: 'post'
})

//营销指标 - 个人指标 - 客户管理 - 导出
export const exportAdminCustomer = createApi({
    url: '/report/marketingTargets/exportAdminCustomer',
    type: 'post'
})

//营销指标 - 个人指标 - 通话量 - 导出
export const exportAdminCall = createApi({
    url: '/report/marketingTargets/exportAdminCall',
    type: 'post'
})

//生产报表 > 编辑指标 > 部门指标-查询列表-客户投诉次数
export const list_page_org_khtscs = createApi({
    url: '/report/zxBjqa/list_page_org_khtscs',
    type: 'post'
})

//生产报表 > 编辑指标 > 部门指标-查询列表-质量错误次数
export const list_page_org_zjcwcs = createApi({
    url: '/report/zxBjqa/list_page_org_zjcwcs',
    type: 'post'
})

// 生产报表 > 编辑指标 > 个人指标-查询列表-异常次数
export const list_page_single = createApi({
    url: '/report/zxbjxxfbdetail/list_page_single',
    type: 'post'
})

//营销指标 - 部门指标 - 业绩统计 - 导出
export const exportOrgPerformance = createApi({
    url: '/report/marketingTargets/exportOrgPerformance',
    type: 'post'
})

//营销指标 - 部门指标 - 产品分类 - 导出
export const exportOrgCategory = createApi({
    url: '/report/marketingTargets/exportOrgCategory',
    type: 'post'
})

//营销指标 - 部门指标 - 客户管理 - 导出
export const exportOrgCustomer = createApi({
    url: '/report/marketingTargets/exportOrgCustomer',
    type: 'post'
})

//营销指标 - 部门指标 - 通话量 - 导出
export const exportOrgCall = createApi({
    url: '/report/marketingTargets/exportOrgCall',
    type: 'post'
})

//生产报表 > 编辑指标 > 个人指标-查询列表-客户投诉次数
export const list_page_single_khtscs = createApi({
    url: '/report/zxBjqa/list_page_single_khtscs',
    type: 'post'
})



//生产报表 > 编辑指标 > 个人指标-查询列表-质量错误次数
export const list_page_single_zjcwcs = createApi({
    url: '/report/zxBjqa/list_page_single_zjcwcs',
    type: 'post'
})

//生产报表 > 编辑指标 > 部门指标-查询列表 -累计贡献度
export const list_page_org_bg = createApi({
    url: '/report/zxBjbg/list_page_org_bg',
    type: 'post'
})

//生产报表 > 编辑指标 > 个人指标-查询列表 -累计贡献度
export const list_page_single_bg = createApi({
    url: '/report/zxBjbg/list_page_single_bg',
    type: 'post'
})

//生产报表-电话量统计-查询
export const queryTelNumberPage = createApi({
        url: '/report/zxbjxxfb/queryTelNumberPage',
        type: 'post'
    })
    //电话量列表导出
export const telNumberExcept = createApi({
    url: '/report/zxbjxxfb/telNumberExcept',
    type: 'post'
})
//生产报表-电话量统计-
export const detailQueryTelNumberPage = createApi({
    url: '/report/zxbjxxfb/detailQueryTelNumberPage',
    type: 'post'
})

//生产报表-电话量统计-详情总计
export const detailQueryTelNumberTable = createApi({
    url: '/report/zxbjxxfb/detailQueryTelNumberTable',
    type: 'post'
})