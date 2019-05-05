import createApi from '../../../../components/axios/http'

// 登录信息
export const workbenchLoginInfo = createApi({
  url: '/cmsworkbench/workbench/logindetail',
  type: 'post'
})
// 本日任务
export const workbenchDaytaskcount = createApi({
  url: '/cmsworkbench/workbench/daytaskcount',
  type: 'post'
})
// 本周任务
export const workbenchWeektaskcount = createApi({
  url: '/cmsworkbench/workbench/weektaskcount',
  type: 'post'
})
// 本月任务
export const workbenchMonthtaskcount = createApi({
  url: '/cmsworkbench/workbench/monthtaskcount',
  type: 'post'
})
// 本日通话
export const workbenchDaycallcount = createApi({
  url: '/cmsworkbench/workbench/daycallcount',
  type: 'post'
})
// 本周通话
export const workbenchWeekcallcount = createApi({
  url: '/cmsworkbench/workbench/weekcallcount',
  type: 'post'
})
// 本月通话
export const workbenchMonthcallcount = createApi({
  url: '/cmsworkbench/workbench/monthcallcount',
  type: 'post'
})
// 获取不超过半小时任务列表
export const workbenchHalfhourtaskwarning = createApi({
  url: '/cmsworkbench/workbench/halfhourtaskwarning',
  type: 'post'
})
// 获取不超过一小时任务列表
export const workbenchHourtaskwarning = createApi({
  url: '/cmsworkbench/workbench/hourtaskwarning',
  type: 'post'
})
// 部门任务达标统计
export const deptmentcount = createApi({
  url: '/cmsworkbench/workbench/deptmentcount',
  type: 'post'
})
// 待审核信息源
export const audittaskcontacts = createApi({
  url: '/cmsworkbench/workbench/audittaskcontacts',
  type: 'post'
})
// 部门达标统计
export const alldeptmentcount = createApi({
  url: '/cmsworkbench/workbench/alldeptmentcount',
  type: 'post'
})
// 超时任务提醒任务名称跳转参数获取接口
export const taskwarningurl = createApi({
  url: '/cmsworkbench/workbench/taskwarningurl',
  type: 'post'
})
// 审核详情接口
export const detailContactsAudit = createApi({
  url: '/information/contacts_audit/detail',
  type: 'post'
})
// 审核操作接口
export const editContactsAudit = createApi({
  url: '/information/contacts_audit/edit',
  type: 'post'
})
export const toDistribution = createApi({
  url: '/information/task/to_distribution',
  type: 'post'
})
// 企业类型
export const enterpeiseType = createApi({
  url: '/information/select/enterpeise_type',
  type: 'post'
})
// 企业性质
export const enterpeiseNature = createApi({
  url: '/information/select/enterpeise_nature',
  type: 'post'
})
// 根据企业ID匹配对应的字段
export const detailEnterprise = createApi({
  url: '/information/select/detail_enterprise',
  type: 'post'
})
