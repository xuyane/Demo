import createApi from '../../../../components/axios/http'
// 根据任务id和信息单元i的查询信息指标
export const getTaskQuotaRelation = createApi({
  url: '/information/task/quota_detail',
  type: 'post'
})

// 保存关联指标
export const saveTaskQuotaRelation = createApi({
  url: '/information/task/quota_save',
  type: 'post'
})

// 查看基本信息
export const toInfromationDetail = createApi({
  url: '/information/task/detail',
  type: 'post'
})
// 关联信息单元查看
export const toRelationDetail = createApi({
  url: '/information/task/relation_detail',
  type: 'post'
})

// 根据任务id和信息单元id的查询关联信息单元
export const getRelationTaskDetail = createApi({
  url: '/information/task/relation_detail',
  type: 'post'
})

// 根据任务名称
export const taskSelect = createApi({
  url: '/information/select/select_task',
  type: 'post'
})
//下拉选择信息单元 排除自己
export const taskSelectOther = createApi({
  url: '/information/select/select_task_other',
  type: 'post'
})
// 保存任务关联关系
export const saveTaskSelect = createApi({
  url: '/information/task/relation_add',
  type: 'post'
})

// 通过信息单元id查询信息单元类型
export const findInformationType = createApi({
  url: '/information/unit/find_findormation_type',
  type: 'post'
})
// 根据员工名字查询员工
export const getEmployee = createApi({
  url: '/information/select/employee',
  type: 'post'
})
// 修改文章是否展示
export const doDelete = createApi({
  url: '/information/task/delete',
  type: 'post'
})