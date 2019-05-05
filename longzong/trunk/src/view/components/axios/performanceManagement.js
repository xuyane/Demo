import createApi from './http.js'
// ---------------绩效公用接口Start---------------
// 绩效人员信息select2
export const employeeSelect = createApi({
  url: '/report/PfCommonTree/employeeSelect',
  type: 'get'
})

// 绩效考核模板select2
export const modelSelect = createApi({
  url: '/report/PfCommonTree/modelSelect',
  type: 'get'
})

// 绩效组织架构树
export const orgTree = createApi({
  url: '/report/PfCommonTree/orgTree',
  type: 'get'
})
// 绩效部门树
export const deptTree = createApi({
  url: '/report/PfCommonTree/deptTree',
  type: 'get'
})

// 绩效营销、生产部门select2
export const pfDeptSelect = createApi({
  url: '/report/PfCommonTree/pfDeptSelect',
  type: 'get'
})
// 信息分类枚举
export const messTypeList = createApi({
  url: '/report/PfCommonTree/pfInformationType',
  type: 'get'
})

// ---------------绩效公用接口End---------------


// ---------------绩效点评Start---------------
// 绩效点评:批量通过
export const pfReviewDoBatchPfReview = createApi({
  url: '/report/pfReview/doBatchPfReview',
  type: 'get'
})

// 绩效点评：考核点评
export const pfReviewDoPfReview = createApi({
  url: '/report/pfReview/doPfReview',
  type: 'post'
})

// 绩效点评：查看分值明细
export const pfReviewListItemPage = createApi({
  url: '/report/pfReview/listItem_page',
  type: 'post'
})

// 绩效点评：查看审核流程
export const pfReviewListWorkflow = createApi({
  url: '/report/pfReview/listWorkflow',
  type: 'get'
})

// 绩效点评：列表查询
export const pfReviewListPage = createApi({
  url: '/report/pfReview/list_page',
  type: 'post'
})
// ---------------绩效点评End---------------

// ---------------绩效提成比例Start---------------

// 绩效提成比例列表

// 获取产品分类列表
export const proCategoryList = createApi({
  url: '/report/PfCommonTree/proCategoryList',
  type: 'get'
})

export const pfRateList = createApi({
  url: '/report/percentageRate/list',
  type: 'post'
})
// 新增列表
export const pfAddRate = createApi({
  url: '/report/percentageRate/add',
  type: 'post'
})
// 删除列表
export const pfDelRate = createApi({
  url: '/report/percentageRate/delete',
  type: 'post'
})
// 修改数据详情
export const pfEditDetail = createApi({
  url: '/report/percentageRate/detail',
  type: 'post'
})
// 修改列表
export const pfEditRate = createApi({
  url: '/report/percentageRate/edit',
  type: 'post'
})

// 部门人员提成列表
export const pfAdminList = createApi({
  url: '/report/percentageRate/adminList',
  type: 'post'
})
// 部门人员提成总计
export const pfAdminListCount = createApi({
  url: '/report/percentageRate/adminListCount',
  type: 'post'
})
// 部门人员提成查看明细
export const pfAdminListItem = createApi({
  url: '/report/percentageRate/adminListItem',
  type: 'post'
})
// 部门人员提成查看明细总计
export const pfAdminListItemCount = createApi({
url: '/report/percentageRate/adminListItemCount',
  type: 'post'
})

// ---------------绩效提成比例End---------------

// ================绩效查询start==================
// 绩效查询列表
export const pfListPage = createApi({
  url: '/report/pfList/list_page',
  type: 'post'
})
// 绩效分值明细分页
export const scoreItemPage = createApi({
  url: '/report/pfList/score_item_page',
  type: 'post'
})
// 绩效考核评语
export const assessmentCommentsList = createApi({
  url: '/report/pfList/assessment_comments_list',
  type: 'get'
})
// 绩效考核导出
export const pfExport = createApi({
  url: '/report/pfList/export',
  type: 'get'
})
// ================绩效查询end====================

// -----------------异常统计start-------------------------

export const queryPageExc = createApi({
  url: 'report/pfexcpapply/list_page',
  type: 'post'
})
export const update = createApi({
  url: '/report/pfexcpapply/update',
  type: 'post'
})

// -----------------异常统计end-------------------------

// **********************考核模板start************************
// 考核模板：模板列表
export const PfModelListPage = createApi({
  url: '/report/PfModel/list_page',
  type: 'post'
})

// 考核模板：新增模板
export const PfModelInsert = createApi({
  url: '/report/PfModel/insert',
  type: 'post'
})

// 考核模板：启用禁用
export const PfModelEnable = createApi({
  url: '/report/PfModel/enable',
  type: 'post'
})

// 考核模板：通过id获取模板信息
export const PfModelGetById = createApi({
  url: '/report/PfModel/detail_head',
  type: 'get'
})

// 考核模板：编辑模板
export const PfModelUpdate = createApi({
  url: '/report/PfModel/modify',
  type: 'post'
})

// 考核模板：通过id获取模板审核流信息
export const PfModelWorkFlowGetById = createApi({
  url: '/report/PfModel/getWorkFlowInfoById',
  type: 'get'
})

// 考核模板：审核流配置
export const PfModelWorkflowOperate = createApi({
  url: '/report/PfModel/workflow_operate',
  type: 'post'
})

// 考核模板：模板所有考核指标集合
export const PfModelDetailIndexList = createApi({
  url: '/report/PfModel/detail_index',
  type: 'get'
})

// 考核模板：该考核指标下分级方案集合及详情
export const PfModelDetailIndexItemList = createApi({
  url: '/report/PfModel/detail_index_item',
  type: 'get'
})

// 考核模板：待选区-人员分配分页列表查询
export const PfModelPositionListPage = createApi({
  url: '/report/PfModel/position_list_page',
  type: 'post'
})

// 考核模板：已选区-该模板下人员分配分页列表
export const PfModelSelectedPositionListPage = createApi({
  url: '/report/PfModel/selected_position_list_page',
  type: 'post'
})

// 考核模板：新增人员配置
export const PfModelPositionOperate = createApi({
  url: '/report/PfModel/position_operate',
  type: 'post'
})

// 考核模板：删除人员配置
export const PfModelPositionOperateDelete = createApi({
  url: '/report/PfModel/delete_position_operate',
  type: 'post'
})

// 考核模板：添加指标时指标分页列表查询
export const PfModelindexListPage = createApi({
  url: '/report/PfModel/index_list_page',
  type: 'post'
})

// 考核模板：新增模板配置指标
export const PfModelInsertIndexOperate = createApi({
  url: '/report/PfModel/insert_index_operate',
  type: 'post'
})

// 考核模板：删除指标配置以及分级方案
export const PfModelDeleteIndexAndItem = createApi({
  url: '/report/PfModel/delete_index_and_item',
  type: 'get'
})

// 考核模板：新增指标配置分级方案
export const PfModelInsertIndexOperateItem = createApi({
  url: '/report/PfModel/insert_index_operate_item',
  type: 'post'
})

// 考核模板：查询模板关联的指标分段分级
export const PfModelIndexList = createApi({
  url: '/report/PfModel/model_index_list',
  type: 'get'
})

// **********************考核模板end************************

// -----------任务设定Start-----------------

// 营销业绩：部门任务-年列表(根据年份获取营销业绩部门任务列表)
export const listOrgSalesYear = createApi({
  url: '/report/pfObject/listOrgSalesYear',
  type: 'get'
})

// 营销业绩：部门任务-年新入任务设定(保存营销业绩部门年新入目标)
export const saveOrgNewSalesYear = createApi({
  url: '/report/pfObject/saveOrgNewSalesYear',
  type: 'post'
})



// 营销业绩：部门任务-年续入任务设定(保存营销业绩部门年续入目标)
export const saveOrgOldSalesYear = createApi({

  url: '/report/pfObject/saveOrgOldSalesYear',
  type: 'post'
})

// 营销业绩：部门任务-重置(根据年份、类型和部门编码重置营销业绩部门任务)
export const resetOrgSalesYear = createApi({
  url: '/report/pfObject/resetOrgSalesYear',
  type: 'get'
})

// 营销业绩：部门任务-新入月分摊列表(根据年份获取营销业绩部门新入月分摊列表)
export const listOrgNewSalesMonth = createApi({
  url: '/report/pfObject/listOrgNewSalesMonth',
  type: 'get'
})

// 营销业绩：部门任务-新入月分摊保存(保存营销业绩部门新入月分摊)
export const saveOrgNewSalesMonth = createApi({
  url: '/report/pfObject/saveOrgNewSalesMonth',
  type: 'post'
})

// 营销业绩：部门任务-续入月分摊列表(根据年份获取营销业绩部门续入月分摊列表)
export const listOrgOldSalesMonth = createApi({
  url: '/report/pfObject/listOrgOldSalesMonth',
  type: 'get'
})

// 营销业绩：部门任务-续入月分摊保存(保存营销业绩部门续入月分摊)
export const saveOrgOldSalesMonth = createApi({
  url: '/report/pfObject/saveOrgOldSalesMonth',
  type: 'post'
})

// 营销业绩：个人分摊-月分摊列表(根据年份获取营销业绩个人月分摊列表)
export const listAdminSalesMonth = createApi({
  url: '/report/pfObject/listAdminSalesMonth',
  type: 'get'
})

// 营销业绩：个人分摊-月分摊保存(保存营销业绩个人月分摊)
export const saveAdminSalesMonth = createApi({
  url: '/report/pfObject/saveAdminSalesMonth',
  type: 'post'
})

// 产品业绩：部门任务-年列表(根据年份获取产品业绩部门任务列表)
export const listOrgProductYear = createApi({
  url: '/report/pfObject/listOrgProductYear',
  type: 'get'
})

// 产品业绩：部门任务-月分摊列表(根据年份获取产品业绩部门月分摊列表)
export const listOrgProductMonth = createApi({
  url: '/report/pfObject/listOrgProductMonth',
  type: 'get'
})

// 产品业绩：个人分摊-月分摊列表(根据年份获取产品业绩个人月分摊列表)
export const listAdminProductMonth = createApi({
  url: '/report/pfObject/listAdminProductMonth',
  type: 'get'
})

// 产品业绩：部门任务-重置(根据年份和部门编码重置产品业绩部门任务)
export const resetOrgProductYear = createApi({
  url: '/report/pfObject/resetOrgProductYear',
  type: 'get'
})

// 产品业绩：个人分摊-月分摊保存(保存产品业绩个人月分摊)
export const saveAdminProductMonth = createApi({
  url: '/report/pfObject/saveAdminProductMonth',
  type: 'post'
})

// 产品业绩：部门任务-月分摊保存(保存产品业绩部门月分摊)
export const saveOrgProductMonth = createApi({
  url: '/report/pfObject/saveOrgProductMonth',
  type: 'post'
})

// 产品业绩：部门任务-年任务设定(保存产品业绩部门年目标)
export const saveOrgProductYear = createApi({
  url: '/report/pfObject/saveOrgProductYear?time=' + new Date().getTime(),
  type: 'post'
})

// -----------任务设定End-----------------

// --------我的绩效start--------
// 我的绩效查询
export const querymyPf = createApi({
  url: '/report/pfapply/myinfo',
  type: 'get'
})

// 我的绩效确认
export const confireMyPf = createApi({
  url: '/report/pfapply/doMyInfo',
  type: 'post'
})

// 异常提报
export const MyPfException = createApi({
  url: '/report/pfapply/doExcpApply',
  type: 'post'
})
// --------我的绩效结束--------

/********* 质检异常上报 报告贡献  hhj *************/
//质检异常上报 测试是否可以编辑
export const yesOrNoEdits = createApi({
  url: '/report/zxBjqa/judge',
  type: 'get'
})
//质检异常上报 自动带出部门
export const autoputDept = createApi({
  url: '/report/zxBjqa/getAuto',
  type: 'get'
})
//质检异常上报  查询api
export const testUpReport = createApi({
  url: '/report/zxBjqa/list_page',
  type: 'post'
})
// 质检异常上报 新增质检异常记录
export const newAddLogs = createApi({
  url: '/report/zxBjqa/create',
  type: 'post'
})
// 质检异常上报 删除质检异常记录
export const delAbnormalLogs = createApi({
  url: '/report/zxBjqa/delete',
  type: 'post'
})
// 质检异常上报 明细导出
export const detailOutput = createApi({
  url: '/report/zxBjqa/export',
  type: 'post'
})
// 质检异常上报 上报信息
export const uploadMes = createApi({
  url: '/report/zxBjqa/info',
  type: 'get'
})

// 质检异常上报 修改异常上报
export const editUploadData = createApi({
  url: '/report/zxBjqa/update',
  type: 'post'
})

// ----------------------------------------
// 报告贡献度上报：列表查询
export const powerUp = createApi({
  url: '/report/zxBjbg/list_page',
  type: 'post'
})
// 报告贡献度上报：批量添加/编辑-自动带出信息
export const autoArr = createApi({
  url: '/report/zxBjbg/get_auto',
  type: 'get'
})
// 报告贡献度上报：自动带出部门
export const autoDeptId = createApi({
  url: '/report/zxBjbg/get_deptName',
  type: 'get'
})

// 报告贡献度上报：编辑 获取报告贡献度
export const getReportEdit = createApi({
  url: '/report/zxBjbg/get_zxBjbg',
  type: 'get'
})

// 报告贡献度上报：编辑 执行保存api
export const saveEditUp = createApi({
  url: '/report/zxBjbg/edit_zxBjbg',
  type: 'post'
})

// 报告贡献度上报：删除
export const delReportUp = createApi({
  url: '/report/zxBjbg/delete_zxBjbg',
  type: 'get'
})

// 报告贡献度上报：比例配置请求
export const getPartDatas = createApi({
  url: '/report/zxBjbg/get_proportions',
  type: 'get'
})

// 报告贡献度上报：比例配置 保存
export const dePentSave = createApi({
  url: '/report/zxBjbg/proportions',
  type: 'post'
})

// 报告贡献度上报：明细导出
export const exportDetails = createApi({
  url: '/report/zxBjbg/export',
  type: 'get'
})

// 报告贡献度上报：批量添加
export const addBatchIn = createApi({
  url: '/report/zxBjbg/add_batch',
  type: 'post'
})
/** ********************hhj end****************/
/** ******* 明细确认  fanmm start************ */

// 明细确认列表
export const selectMember = createApi({
  url: '/report/PfAccountDetailAdmin/selectMember',
  type: 'get'
})

// 明细确认列表
export const checkListPage = createApi({
  url: '/report/PfAccountDetailAdmin/check_list_page',
  type: 'post'
})

// 营销列表
export const listPage = createApi({
  url: '/report/PfAccountDetailAdmin/list_page',
  type: 'post'
})

// 营销明细列表
export const listItemPage = createApi({
  url: '/report/PfAccountDetailAdmin/list_item_page',
  type: 'post'
})

// 营销明细列表统计
export const listTotalPage = createApi({
  url: '/report/PfAccountDetailAdmin/list_total_page',
  type: 'post'
})

// 明细确认列表导出
export const itemExport = createApi({
  url: '/report/PfAccountDetailAdmin/item_export',
  type: 'get'
})

// 营销收入列表导出
export const yxsrExport = createApi({
  url: '/report/PfAccountDetailAdmin/yxsr_export',
  type: 'get'
})

// 确认明细列表-修改
export const modify = createApi({
  url: '/report/PfAccountDetailAdmin/modify',
  type: 'get'
})

// 确认明细列表-删除
export const remove = createApi({
  url: '/report/PfAccountDetailAdmin/remove',
  type: 'post'
})

// 产业链列表-删除
export const cylListPage = createApi({
  url: '/report/PfAccountDetailScorg/list_page',
  type: 'post'
})

// 产业链明细列表-删除
export const cylListItemPage = createApi({
  url: '/report/PfAccountDetailScorg/list_item_page',
  type: 'post'
})

// 产业链列表- 统计
export const cylListTotal = createApi({
  url: '/report/PfAccountDetailScorg/list_total_page',
  type: 'post'
})

// 产业链列表-导出
export const cylExport = createApi({
  url: '/report/PfAccountDetailScorg/export',
  type: 'get'
})
/** ********************fanmm end****************/
