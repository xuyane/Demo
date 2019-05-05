import Main from '@/view/main.vue'
import Error from '@/view/errorMain.vue'

export const loginRouter = {}

export const otherRouter = {
  // 默认显示页面
  path: '/',
  redirect: '/memberIndex'
}
export const usermsg = {
  // 默认显示页面
  path: '/productCenterWorkBench',
  name: 'productCenterWorkBench',
  component: resolve => {
    require(['@/view/productCenter/productCenterWorkBench.vue'], resolve)
  },
  children: []
}
export const GMWorkBench = {
  // 默认显示页面 总经理
  path: '/GMWorkBench',
  name: 'GMWorkBench',
  component: resolve => {
    require(['@/view/CRM/CRMWorkBench/GMWorkBench/GMWorkBench.vue'], resolve)
  },
  children: []
}
export const MDWorkBench = {
  // 默认显示页面 营销总监
  path: '/MDWorkBench',
  name: 'MDWorkBench',
  component: resolve => {
    require(['@/view/CRM/CRMWorkBench/MDWorkBench/MDWorkBench.vue'], resolve)
  },
  children: []
}
export const GLWorkBench = {
  // 默认显示页面 组长
  path: '/GLWorkBench',
  name: 'GLWorkBench',
  component: resolve => {
    require(['@/view/CRM/CRMWorkBench/GLWorkBench/GLWorkBench.vue'], resolve)
  },
  children: []
}
export const SMWorkBench = {
  // 默认显示页面 业务员
  path: '/SMWorkBench',
  name: 'SMWorkBench',
  component: resolve => {
    require(['@/view/CRM/CRMWorkBench/SMWorkBench/SMWorkBench.vue'], resolve)
  },
  children: []
}
export const CSWorkBench = {
  // 默认显示页面 客服
  path: '/CSWorkBench',
  name: 'CSWorkBench',
  component: resolve => {
    require(['@/view/CRM/CRMWorkBench/CSWorkBench/CSWorkBench.vue'], resolve)
  },
  children: []
}
export const MMWorkBench = {
  // 默认显示页面 经理
  path: '/MMWorkBench',
  name: 'MMWorkBench',
  component: resolve => {
    require(['@/view/CRM/CRMWorkBench/MMWorkBench/MMWorkBench.vue'], resolve)
  },
  children: []
}
export const CSMWorkBench = {
  // 默认显示页面 客服部经理
  path: '/CSMWorkBench',
  name: 'CSMWorkBench',
  component: resolve => {
    require(['@/view/CRM/CRMWorkBench/CSMWorkBench/CSMWorkBench.vue'], resolve)
  },
  children: []
}
export const CMSworkBench = {
  // 工作台(业务员)
  path: '/CMSWorkBench',
  name: 'CMSWorkBench',
  component: resolve => {
    require(['@/view/CMS/CMSWorkBench/SMWorkBench.vue'], resolve)
  },
  children: []
}
export const errorRouter = [{
  path: '/',
  name: 'errorPage',
  component: Error,
  children: [
    {
      path: '/404',
      name: '404',
      meta: {
        name: 'error'
      },
      component: resolve => {
        require(['@/view/error/404.vue'], resolve)
      },
      children: []
    },
    {
      path: '/500',
      name: '500',
      meta: {
        name: 'error'
      },
      component: resolve => {
        require(['@/view/error/500.vue'], resolve)
      },
      children: []
    },
    {
      path: '/502',
      name: '502',
      meta: {
        name: 'error'
      },
      component: resolve => {
        require(['@/view/error/502.vue'], resolve)
      },
      children: []
    },
    {
      path: '/error',
      name: 'error',
      meta: {
        name: 'error'
      },
      component: resolve => {
        require(['@/view/error/error.vue'], resolve)
      },
      children: []
    }
  ]
}]
export const appRouter = [
  {
    path: '/',
    name: 'home',
    component: Main,
    children: []
  },
  {
    path: '/main',
    name: 'main',
    component: Main,
    children: [
      {
        path: '/plantIndex',
        name: 'plantIndex',
        meta: {
          type: 'plant'
        },
        component: resolve => {
          require(['@/view/index.vue'], resolve)
        }
      },
      {
        path: '/memberIndex',
        name: 'memberIndex',
        meta: {
          type: 'member'
        },
        component: resolve => {
          require(['@/view/index.vue'], resolve)
        }
      },
      {
        path: '/systemIndex',
        name: 'systemIndex',
        meta: {
          type: 'system'
        },
        component: resolve => {
          require(['@/view/index.vue'], resolve)
        }
      },
      {
        path: '/financeIndex',
        name: 'financeIndex',
        meta: {
          type: 'finance'
        },
        component: resolve => {
          require(['@/view/index.vue'], resolve)
        }
      },
      {
        path: '/achievementsIndex',
        name: 'achievementsIndex',
        meta: {
          type: 'achievements'
        },
        component: resolve => {
          require(['@/view/index.vue'], resolve)
        }
      },
      {
        path: '/dataCenterIndex',
        name: 'dataCenterIndex',
        meta: {
          type: 'dataCenter'
        },
        component: resolve => {
          require(['@/view/index.vue'], resolve)
        }
      },
      {
        path: '/reportIndex',
        name: 'reportIndex',
        meta: {
          type: 'report'
        },
        component: resolve => {
          require(['@/view/index.vue'], resolve)
        }
      },
      {
        path: '/workflowIndex',
        name: 'workflowIndex',
        meta: {
          type: 'workflow'
        },
        component: resolve => {
          require(['@/view/index.vue'], resolve)
        }
      },
      {
        path: '/processing',
        name: 'processing',
        meta: {
          name: 'workflow'
        },
        component: resolve => {
          require(['@/view/workflow/processing/processing.vue'], resolve)
        }
      }, {
        path: '/processed',
        name: 'processed',
        meta: {
          name: 'workflow'
        },
        component: resolve => {
          require(['@/view/workflow/processing/processed.vue'], resolve)
        }
      }, {
        path: '/processDetail',
        name: 'processDetail',
        meta: {
          name: 'workflow',
          activeName: 'processing'
        },
        component: resolve => {
          require(['@/view/workflow/processing/processDetail.vue'], resolve)
        }
      }, {
        path: '/userInfoQuery',
        name: 'userInfoQuery',
        meta: {
          name: 'workflow'
        },
        component: resolve => {
          require(['@/view/workflow/user/list.vue'], resolve)
        }
      }, {
        path: '/systemPlatform',
        name: 'systemPlatform',
        meta: {
          name: 'workflow'
        },
        component: resolve => {
          require(['@/view/workflow/systemPlatform/group.vue'], resolve)
        }
      }, {
        path: '/domainRule',
        name: 'domainRule',
        meta: {
          name: 'workflow'
        },
        component: resolve => {
          require(['@/view/workflow/systemPlatform/domain.vue'], resolve)
        }
      },
      {
        path: '/deploy',
        name: 'deploy',
        meta: {
          name: 'workflow'
        },
        component: resolve => {
          require(['@/view/workflow/deploy/deploy.vue'], resolve)
        }
      },
      {
        path: '/defign',
        name: 'defign',
        meta: {
          name: 'workflow'
        },
        component: resolve => {
          require(['@/view/workflow/defign/defign.vue'], resolve)
        }
      },
      {
        path: '/defignDetail/:id',
        name: 'defignDetail',
        meta: {
          name: 'workflow'
        },
        component: resolve => {
          require(['@/view/workflow/defign/defignDetail.vue'], resolve)
        }
      },
      {
        path: '/devise',
        name: 'devise',
        meta: {
          name: 'workflow'
        },
        component: resolve => {
          require(['@/view/workflow/devise/devise.vue'], resolve)
        }
      }, {
        path: '/chart',
        name: 'chart',
        meta: {
          name: 'workflow'
        },
        component: resolve => {
          require(['@/view/workflow/chart/chart.vue'], resolve)
        }
      },
      {
        path: '/instanceList',
        name: 'instanceList',
        meta: {
          name: 'workflow'
        },
        component: resolve => {
          require(['@/view/workflow/instance/list.vue'], resolve)
        }
      },
      {
        path: '/addInstance',
        name: 'addInstance',
        meta: {
          name: 'workflow'
        },
        component: resolve => {
          require(['@/view/workflow/instance/add.vue'], resolve)
        }
      },
      {
        path: '/instanceDetail/',
        name: 'instanceDetail',
        meta: {
          name: 'workflow'
        },
        component: resolve => {
          require(['@/view/workflow/instance/detail.vue'], resolve)
        }
      },
      {
        path: '/processDetailInfo',
        name: 'processDetailInfo',
        meta: {
          name: 'workflow'
        },
        component: resolve => {
          require(['@/view/workflow/process/detail.vue'], resolve)
        }
      },
      {
        path: '/processDetailDevise',
        name: 'processDetailDevise',
        meta: {
          name: 'workflow'
        },
        component: resolve => {
          require(['@/view/workflow/process/devise.vue'], resolve)
        }
      },
      {
        path: '/processDetailBPMN',
        name: 'processDetailBPMN',
        meta: {
          name: 'workflow'
        },
        component: resolve => {
          require(['@/view/workflow/process/bpmn.vue'], resolve)
        }
      },
      {
        path: '/productManager',
        name: 'productManager',
        meta: {
          name: 'product'
        },
        component: resolve => {
          require(['@/view/productCenter/productManager.vue'], resolve)
        }
      },
      {
        path: '/addProduct',
        name: 'addProduct',
        meta: {
          name: 'product',
          activeName: 'productManager'
        },
        component: resolve => {
          require(['@/view/productCenter/addProduct.vue'], resolve)
        }
      },
      {
        path: '/changeLog',
        name: 'changeLog',
        meta: {
          name: 'product'
        },
        component: resolve => {
          require(['@/view/productCenter/changeLog.vue'], resolve)
        }
      },
      {
        path: '/logDetails',
        name: 'logDetails',
        meta: {
          name: 'product',
          activeName: 'changeLog'
        },
        component: resolve => {
          require(['@/view/productCenter/logDetails.vue'], resolve)
        }
      },
      {
        path: '/productEdition',
        name: 'productEdition',
        meta: {
          name: 'product',
          activeName: 'productManager'
        },
        component: resolve => {
          require(['@/view/productCenter/productEdition.vue'], resolve)
        }
      },
      {
        path: '/productDetail',
        name: 'productDetail',
        meta: {
          name: 'product',
          activeName: 'productManager'
        },
        component: resolve => {
          require(['@/view/productCenter/productDetail.vue'], resolve)
        }
      },
      {
        path: '/userAuth',
        name: 'userAuth',
        meta: {
          name: 'product',
          activeName: 'productManager'
        },
        component: resolve => {
          require(['@/view/productCenter/userAuth.vue'], resolve)
        }
      },
      {
        path: '/preferentialStrategy/list',
        name: 'preferentialStrategyList',
        meta: {
          name: 'product'
        },
        component: resolve => {
          require(['@/view/productCenter/preferentialStrategy/list.vue'], resolve)
        }
      },
      {
        path: '/preferentialStrategy/addStrategy',
        name: 'addStrategy',
        meta: {
          name: 'product'
        },
        component: resolve => {
          require(['@/view/productCenter/preferentialStrategy/addStrategy/addStrategy.vue'], resolve)
        }
      },
      {
        path: '/preferentialStrategy/editStrategy',
        name: 'editStrategy',
        meta: {
          name: 'product',
          activeName: 'preferentialStrategyList'
        },
        component: resolve => {
          require(['@/view/productCenter/preferentialStrategy/editStrategy/editStrategy.vue'], resolve)
        }
      },
      {
        path: '/preferentialStrategy/strategyDetail',
        name: 'strategyDetail',
        meta: {
          name: 'product',
          activeName: 'preferentialStrategyList'
        },
        component: resolve => {
          require(['@/view/productCenter/preferentialStrategy/strategyDetail.vue'], resolve)
        }
      },
      {
        path: '/departmentAndBreed/list',
        name: 'departmentAndBreed',
        meta: {
          name: 'product'
        },
        component: resolve => {
          require(['@/view/productCenter/departmentAndBreed/list.vue'], resolve)
        }
      },
      {
        path: '/smsManager',
        name: 'smsManager',
        meta: {
          name: 'product'
        },
        component: resolve => {
          require(['@/view/SMS/smsManager.vue'], resolve)
        }
      },
      {
        path: '/smsDetail',
        name: 'smsDetail',
        meta: {
          name: 'product',
          activeName: 'smsManager'
        },
        component: resolve => {
          require(['@/view/SMS/smsDetail.vue'], resolve)
        }
      },
      {
        path: '/addSms',
        name: 'addSms',
        meta: {
          name: 'product'
        },
        component: resolve => {
          require(['@/view/SMS/addSms.vue'], resolve)
        }
      },
      {
        path: '/updateSms',
        name: 'updateSms',
        meta: {
          name: 'product',
          activeName: 'smsManager'
        },
        component: resolve => {
          require(['@/view/SMS/updateSms.vue'], resolve)
        }
      },
      {
        path: '/phoneCenter',
        name: 'phoneCenter',
        meta: {
          name: 'phoneCenter'
        },
        component: resolve => {
          require(['@/view/phoneCenter/phoneCenter.vue'], resolve)
        }
      },
      {
        path: '/blackList',
        name: 'blackList',
        meta: {
          name: 'phoneCenter'
        },
        component: resolve => {
          require(['@/view/phoneCenter/blackList.vue'], resolve)
        }
      },
      {
        path: '/phoneMap',
        name: 'phoneMap',
        meta: {
          name: 'phoneCenter'
        },
        component: resolve => {
          require(['@/view/phoneCenter/phoneMap.vue'], resolve)
        }
      },
      {
        path: '/addPhone',
        name: 'addPhone',
        meta: {
          name: 'phoneCenter'
        },
        component: resolve => {
          require(['@/view/phoneCenter/addPhone.vue'], resolve)
        }
      },
      {
        path: '/personnelTelephoneManagement',
        name: 'personnelTelephoneManagement',
        meta: {
          name: 'phoneCenter'
        },
        component: resolve => {
          require(['@/view/phoneCenter/personnelTelephoneManagement.vue'], resolve)
        }
      },
      {
        path: '/callLog',
        name: 'callLog',
        meta: {
          name: 'management'
        },
        component: resolve => {
          require(['@/view/CRM/systemConfiguration/timeLimit/callLog.vue'], resolve)
        }
      },
      {
        path: '/userRegister',
        name: 'userRegister',
        meta: {
          name: 'management'
        },
        component: resolve => {
          require(['@/view/CRM/userRegister.vue'], resolve)
        }
      },
      {
        path: '/allUser',
        name: 'allUser',
        meta: {
          name: 'management',
          keepAlive: true, // 此组件需要被缓存
          isBack: true // 用于判断上一个页面是哪个
        },
        component: resolve => {
          require(['@/view/CRM/myCustomer/user/allUser.vue'], resolve)
        }
      },
      {
        path: '/officalUser',
        name: 'officalUser',
        meta: {
          name: 'management',
          activeName: 'allUser'
        },
        component: resolve => {
          require(['@/view/CRM/myCustomer/user/officalUser.vue'], resolve)
        }
      },
      {
        path: '/purposeUser',
        name: 'purposeUser',
        meta: {
          name: 'management',
          activeName: 'allUser'
        },
        component: resolve => {
          require(['@/view/CRM/myCustomer/user/purposeUser.vue'], resolve)
        }
      },
      {
        path: '/followUser',
        name: 'followUser',
        meta: {
          name: 'management',
          activeName: 'allUser'
        },
        component: resolve => {
          require(['@/view/CRM/myCustomer/user/followUser.vue'], resolve)
        }
      },
      {
        path: '/testUser',
        name: 'testUser',
        meta: {
          name: 'management',
          activeName: 'allUser'
        },
        component: resolve => {
          require(['@/view/CRM/myCustomer/user/testUser.vue'], resolve)
        }
      },
      {
        path: '/continuedUser',
        name: 'continuedUser',
        meta: {
          name: 'management',
          activeName: 'allUser'
        },
        component: resolve => {
          require(['@/view/CRM/myCustomer/user/continuedUser.vue'], resolve)
        }
      },
      {
        path: '/recentContactUser',
        name: 'recentContactUser',
        meta: {
          name: 'management',
          activeName: 'allUser'
        },
        component: resolve => {
          require(['@/view/CRM/myCustomer/user/recentContactUser.vue'], resolve)
        }
      },
      {
        path: '/recentLoginUser',
        name: 'recentLoginUser',
        meta: {
          name: 'management',
          activeName: 'allUser'
        },
        component: resolve => {
          require(['@/view/CRM/myCustomer/user/recentLoginUser.vue'], resolve)
        }
      },
      {
        path: '/runOffUser',
        name: 'runOffUser',
        meta: {
          name: 'management',
          activeName: 'allUser'
        },
        component: resolve => {
          require(['@/view/CRM/myCustomer/user/runOffUser.vue'], resolve)
        }
      },
      {
        path: '/competitorUser',
        name: 'competitorUser',
        meta: {
          name: 'management',
          activeName: 'allUser'
        },
        component: resolve => {
          require(['@/view/CRM/myCustomer/user/competitorUser.vue'], resolve)
        }
      },
      {
        path: '/contactedUser',
        name: 'contactedUser',
        meta: {
          name: 'management',
          activeName: 'allUser'
        },
        component: resolve => {
          require(['@/view/CRM/myCustomer/user/contactedUser.vue'], resolve)
        }
      },
      {
        path: '/basicInfo',
        name: 'basicInfo',
        meta: {
          name: 'management'
        },
        component: resolve => {
          require(['@/view/CRM/myCustomer/userEdit/basicInfo.vue'], resolve)
        }
      },
      {
        path: '/aptitudeInfo',
        name: 'aptitudeInfo',
        meta: {
          name: 'management'
        },
        component: resolve => {
          require(['@/view/CRM/myCustomer/userEdit/aptitudeInfo.vue'], resolve)
        }
      },
      {
        path: '/callRecord',
        name: 'callRecord',
        meta: {
          name: 'management'
        },
        component: resolve => {
          require(['@/view/CRM/myCustomer/userEdit/callRecord.vue'], resolve)
        }
      },
      {
        path: '/contractInfo',
        name: 'contractInfo',
        meta: {
          name: 'management'
        },
        component: resolve => {
          require(['@/view/CRM/myCustomer/userEdit/contractInfo.vue'], resolve)
        }
      },
      {
        path: '/privilegeManagement',
        name: 'privilegeManagement',
        meta: {
          name: 'management'
        },
        component: resolve => {
          require(['@/view/CRM/myCustomer/userEdit/privilegeManagement.vue'], resolve)
        }
      },
      {
        path: '/followRecord',
        name: 'followRecord',
        meta: {
          name: 'management'
        },
        component: resolve => {
          require(['@/view/CRM/myCustomer/userEdit/followRecord.vue'], resolve)
        }
      },
      {
        path: '/noteRecord',
        name: 'noteRecord',
        meta: {
          name: 'management'
        },
        component: resolve => {
          require(['@/view/CRM/myCustomer/userEdit/noteRecord.vue'], resolve)
        }
      },
      {
        path: '/userInfo',
        name: 'userInfo',
        meta: {
          name: 'management'
        },
        component: resolve => {
          require(['@/view/CRM/myCustomer/userEdit/userInfo.vue'], resolve)
        }
      },
      {
        path: '/userDistribute',
        name: 'userDistribute',
        meta: {
          name: 'management',
          subMenuName: 'userManage'
        },
        component: resolve => {
          require(['@/view/CRM/userManager/userDistribute/userDistribute.vue'], resolve)
        }
      },
      {
        path: '/companyMerge',
        name: 'companyMerge',
        meta: {
          name: 'management',
          subMenuName: 'userManage'
        },
        component: resolve => {
          require(['@/view/CRM/userManager/companyMerge/companyMerge.vue'], resolve)
        }
      },
      {
        path: '/companyList',
        name: 'companyList',
        meta: {
          name: 'management',
          subMenuName: 'userManage'
        },
        component: resolve => {
          require(['@/view/CRM/companyList/companyList.vue'], resolve)
        }
      },
      {
        path: '/normalMerge',
        name: 'normalMerge',
        meta: {
          name: 'management',
          activeName: 'companyMerge'
        },
        component: resolve => {
          require(['@/view/CRM/userManager/companyMerge/normalMerge.vue'], resolve)
        }
      },
      {
        path: '/mergeDetail',
        name: 'mergeDetail',
        meta: {
          name: 'management',
          activeName: 'companyMerge'
        },
        component: resolve => {
          require(['@/view/CRM/userManager/companyMerge/mergeDetail.vue'], resolve)
        }
      },
      {
        path: '/autoMergeDetail',
        name: 'autoMergeDetail',
        meta: {
          name: 'management',
          activeName: 'companyMerge'
        },
        component: resolve => {
          require(['@/view/CRM/userManager/companyMerge/autoMergeDetail.vue'], resolve)
        }
      },
      {
        path: '/recordMerge',
        name: 'recordMerge',
        meta: {
          name: 'management',
          activeName: 'companyMerge'
        },
        component: resolve => {
          require(['@/view/CRM/userManager/companyMerge/recordMerge.vue'], resolve)
        }
      },
      {
        path: '/recordMergeDetail',
        name: 'recordMergeDetail',
        meta: {
          name: 'management',
          activeName: 'companyMerge'
        },
        component: resolve => {
          require(['@/view/CRM/userManager/companyMerge/recordMergeDetail.vue'], resolve)
        }
      },
      {
        path: '/userSearch',
        name: 'userSearch',
        meta: {
          name: 'management',
          subMenuName: 'userManage'
        },
        component: resolve => {
          require(['@/view/CRM/userManager/userSearch/userSearch.vue'], resolve)
        }
      },
      {
        path: '/userTransfer',
        name: 'userTransfer',
        meta: {
          name: 'management',
          subMenuName: 'userManage'
        },
        component: resolve => {
          require(['@/view/CRM/userManager/userTransfer/userTransfer.vue'], resolve)
        }
      },
      {
        path: '/benchMarking',
        name: 'benchMarking',
        meta: {
          name: 'management',
          subMenuName: 'userManage'
        },
        component: resolve => {
          require(['@/view/CRM/userManager/benchMarking/benchMarking.vue'], resolve)
        }
      },
      {
        path: '/addBench',
        name: 'addBench',
        meta: {
          name: 'management',
          activeName: 'benchMarking'
        },
        component: resolve => {
          require(['@/view/CRM/userManager/benchMarking/addBench.vue'], resolve)
        }
      },
      {
        path: '/commonResource',
        name: 'commonResource',
        meta: {
          name: 'management',
          activeName: 'userDistribute'
        },
        component: resolve => {
          require(['@/view/CRM/userManager/userDistribute/commonResource.vue'], resolve)
        }
      },
      {
        path: '/historyDistribute',
        name: 'historyDistribute',
        meta: {
          name: 'management',
          activeName: 'userDistribute'
        },
        component: resolve => {
          require(['@/view/CRM/userManager/userDistribute/historyDistribute.vue'], resolve)
        }
      },
      {
        path: '/accountRank',
        name: 'accountRank',
        meta: {
          name: 'management'
        },
        component: resolve => {
          require(['@/view/CRM/userManager/userDistribute/accountRank.vue'], resolve)
        }
      },
      {
        path: '/meetingRank',
        name: 'meetingRank',
        meta: {
          name: 'management'
        },
        component: resolve => {
          require(['@/view/CRM/userManager/userDistribute/meetingRank.vue'], resolve)
        }
      },
      {
        path: '/phoneRank',
        name: 'phoneRank',
        meta: {
          name: 'management'
        },
        component: resolve => {
          require(['@/view/CRM/userManager/userDistribute/phoneRank.vue'], resolve)
        }
      },
      {
        path: '/devCustomer',
        name: 'devCustomer',
        meta: {
          name: 'management'
        },
        component: resolve => {
          require(['@/view/CRM/userManager/userDistribute/devCustomer.vue'], resolve)
        }
      },
      {
        path: '/sendMessage',
        name: 'sendMessage',
        meta: {
          name: 'management'
        },
        component: resolve => {
          require(['@/view/CRM/userNotice/sendMessage.vue'], resolve)
        }
      },
      {
        path: '/templet',
        name: 'templet',
        meta: {
          name: 'management',
          activeName: 'sendMessage'
        },
        component: resolve => {
          require(['@/view/CRM/userNotice/templet.vue'], resolve)
        }
      },
      {
        path: '/addTemplet',
        name: 'addTemplet',
        meta: {
          name: 'management',
          activeName: 'sendMessage'
        },
        component: resolve => {
          require(['@/view/CRM/userNotice/addTemplet.vue'], resolve)
        }
      },
      {
        path: '/sendRecord',
        name: 'sendRecord',
        meta: {
          name: 'management',
          activeName: 'sendMessage'
        },
        component: resolve => {
          require(['@/view/CRM/userNotice/sendRecord.vue'], resolve)
        }
      },
      {
        path: '/replyRecord',
        name: 'replyRecord',
        meta: {
          name: 'management',
          activeName: 'sendMessage'
        },
        component: resolve => {
          require(['@/view/CRM/userNotice/replyRecord.vue'], resolve)
        }
      },
      {
        path: '/blacklistUser',
        name: 'blacklistUser',
        meta: {
          name: 'management',
          activeName: 'sendMessage'
        },
        component: resolve => {
          require(['@/view/CRM/userNotice/blacklistUser.vue'], resolve)
        }
      },
      {
        path: '/interfaceSet',
        name: 'interfaceSet',
        meta: {
          name: 'management',
          activeName: 'sendMessage'
        },
        component: resolve => {
          require(['@/view/CRM/userNotice/interfaceSet.vue'], resolve)
        }
      },
      {
        path: '/filterRule',
        name: 'filterRule',
        meta: {
          name: 'management',
          activeName: 'sendMessage'
        },
        component: resolve => {
          require(['@/view/CRM/userNotice/filterRule.vue'], resolve)
        }
      },
      {
        path: '/myAgreement',
        name: 'myAgreement',
        meta: {
          name: 'management',
          keepAlive: true, // 此组件需要被缓存
          isBack: true // 用于判断上一个页面是哪个
        },
        component: resolve => {
          require(['@/view/CRM/myAgreement/myAgreement.vue'], resolve)
        }
      },
      {
        path: '/creatAgreement',
        name: 'creatAgreement',
        meta: {
          name: 'management',
          activeName: 'myAgreement'
        },
        component: resolve => {
          require(['@/view/CRM/myAgreement/creatAgreement.vue'], resolve)
        }
      },
      {
        path: '/copyContact',
        name: 'copyContact',
        meta: {
          name: 'management',
          activeName: 'myAgreement'
        },
        component: resolve => {
          require(['@/view/CRM/myAgreement/copyContact.vue'], resolve)
        }
      },
      {
        path: '/supplementaryContract',
        name: 'supplementaryContract',
        meta: {
          name: 'management',
          activeName: 'myAgreement'
        },
        component: resolve => {
          require(['@/view/CRM/myAgreement/supplementaryContract.vue'], resolve)
        }
      },
      {
        path: '/waittingCheck',
        name: 'waittingCheck',
        meta: {
          name: 'management',
          activeName: 'contractManagement'
        },
        component: resolve => {
          require(['@/view/CRM/myAgreement/waittingCheck.vue'], resolve)
        }
      },
      {
        path: '/checkContact',
        name: 'checkContact',
        meta: {
          name: 'management',
          activeName: 'myAgreement'
        },
        component: resolve => {
          require(['@/view/CRM/myAgreement/checkContact.vue'], resolve)
        }
      },
      {
        path: '/myRefundAudit',
        name: 'myRefundAudit',
        meta: {
          name: 'management'
        },
        component: resolve => {
          require(['@/view/CRM/myAgreement/myRefundAudit.vue'], resolve)
        }
      },
      {
        path: '/myRefundDetial',
        name: 'myRefundDetial',
        meta: {
          name: 'management',
          activeName: 'myRefundAudit'
        },
        component: resolve => {
          require(['@/view/CRM/myAgreement/myRefundDetial.vue'], resolve)
        }
      },
      {
        path: '/pdfView',
        name: 'pdfView',
        meta: {
          name: 'management'
        },
        component: resolve => {
          require(['@/view/CRM/myAgreement/pdfView.vue'], resolve)
        }
      },
      {
        path: '/newRulers',
        name: 'newRulers',
        meta: {
          name: 'management',
          activeName: 'distributionSalesman'
        },
        component: resolve => {
          require(['@/view/CRM/systemConfiguration/distributionSalesman/newRulers.vue'], resolve)
        }
      },
      {
        path: '/refundsContract',
        name: 'refundsContract',
        meta: {
          name: 'management'
        },
        component: resolve => {
          require(['@/view/CRM/myAgreement/refundsContract.vue'], resolve)
        }
      },
      {
        path: '/serviceRecord',
        name: 'serviceRecord',
        meta: {
          name: 'management'
        },
        component: resolve => {
          require(['@/view/CRM/serviceRecord.vue'], resolve)
        }
      },
      {
        path: '/callBarring',
        name: 'callBarring',
        meta: {
          name: 'management'
        },
        component: resolve => {
          require(['@/view/CRM/systemConfiguration/callBarring.vue'], resolve)
        }
      },
      {
        path: '/customerConfig',
        name: 'customerConfig',
        meta: {
          name: 'management'
        },
        component: resolve => {
          require(['@/view/CRM/systemConfiguration/customerConfig/customerConfig.vue'], resolve)
        }
      },
      {
        path: '/contractTemplet',
        name: 'contractTemplet',
        meta: {
          name: 'management'
        },
        component: resolve => {
          require(['@/view/CRM/systemConfiguration/contractTemplet/contractTemplet.vue'], resolve)
        }
      },
      {
        path: '/editContractTemplet',
        name: 'editContractTemplet',
        meta: {
          name: 'management',
          activeName: 'contractTemplet'
        },
        component: resolve => {
          require(['@/view/CRM/systemConfiguration/contractTemplet/editContractTemplet.vue'], resolve)
        }
      },
      {
        path: '/templetDetail',
        name: 'templetDetail',
        meta: {
          name: 'management',
          activeName: 'contractTemplet'
        },
        component: resolve => {
          require(['@/view/CRM/systemConfiguration/contractTemplet/templetDetail.vue'], resolve)
        }
      },
      {
        path: '/tabManager',
        name: 'tabManager',
        meta: {
          name: 'management'
        },
        component: resolve => {
          require(['@/view/CRM/systemConfiguration/tabManager/tabManager.vue'], resolve)
        }
      },
      {
        path: '/distributionSalesman',
        name: 'distributionSalesman',
        meta: {
          name: 'management'
        },
        component: resolve => {
          require(['@/view/CRM/systemConfiguration/distributionSalesman/distributionSalesman.vue'], resolve)
        }
      },
      {
        path: '/checkPending',
        name: 'checkPending',
        meta: {
          name: 'management'
        },
        component: resolve => {
          require(['@/view/CRM/systemConfiguration/distributionSalesman/checkPending.vue'], resolve)
        }
      },
      {
        path: '/customService',
        name: 'customService',
        meta: {
          name: 'management'
        },
        component: resolve => {
          require(['@/view/CRM/systemConfiguration/customService.vue'], resolve)
        }
      },
      {
        path: '/benchmarkFacilitator',
        name: 'benchmarkFacilitator',
        meta: {
          name: 'management'
        },
        component: resolve => {
          require(['@/view/CRM/systemConfiguration/benchmarkFacilitator.vue'], resolve)
        }
      },
      {
        path: '/autoAssign',
        name: 'autoAssign',
        meta: {
          name: 'management',
          subMenuName: 'userApproval'
        },
        component: resolve => {
          require(['@/view/CRM/examinationApprovalMatters/autoAssign.vue'], resolve)
        }
      },
      {
        path: '/contractManagement',
        name: 'contractManagement',
        meta: {
          name: 'management',
          subMenuName: 'userApproval'
        },
        component: resolve => {
          require(['@/view/CRM/examinationApprovalMatters/contractManagement.vue'], resolve)
        }
      },
      {
        path: '/refundAudit',
        name: 'refundAudit',
        meta: {
          name: 'management',
          subMenuName: 'userApproval'
        },
        component: resolve => {
          require(['@/view/CRM/examinationApprovalMatters/refundAudit.vue'], resolve)
        }
      },
      {
        path: '/refundDetial',
        name: 'refundDetial',
        meta: {
          name: 'management'
        },
        component: resolve => {
          require(['@/view/CRM/examinationApprovalMatters/refundDetial.vue'], resolve)
        }
      },
      {
        path: '/trackingDelay',
        name: 'trackingDelay',
        meta: {
          name: 'management',
          subMenuName: 'userApproval'
        },
        component: resolve => {
          require(['@/view/CRM/examinationApprovalMatters/trackingDelay.vue'], resolve)
        }
      },
      {
        path: '/trialDelay',
        name: 'trialDelay',
        meta: {
          name: 'management',
          subMenuName: 'userApproval'
        },
        component: resolve => {
          require(['@/view/CRM/examinationApprovalMatters/trialDelay.vue'], resolve)
        }
      },
      {
        path: '/callHistory',
        name: 'callHistory',
        meta: {
          name: 'management'
        },
        component: resolve => {
          require(['@/view/CRM/callHistory/callHistory.vue'], resolve)
        }
      },
      {
        path: '/reservationRemind',
        name: 'reservationRemind',
        meta: {
          name: 'management',
          activeName: 'callHistory'
        },
        component: resolve => {
          require(['@/view/CRM/callHistory/reservationRemind.vue'], resolve)
        }
      },
      {
        path: '/announcementManage',
        name: 'announcementManage',
        meta: {
          name: 'management'
        },
        component: resolve => {
          require(['@/view/CRM/announcementManage/announcementManage.vue'], resolve)
        }
      },
      {
        path: '/addAnnouncement',
        name: 'addAnnouncement',
        meta: {
          name: 'management',
          activeName: 'announcementManage'
        },
        component: resolve => {
          require(['@/view/CRM/announcementManage/addAnnouncement.vue'], resolve)
        }
      },
      {
        path: '/internalCommunicate',
        name: 'internalCommunicate',
        meta: {
          name: 'management'
        },
        component: resolve => {
          require(['@/view/CRM/internalCommunicate.vue'], resolve)
        }
      },
      {
        path: '/customerComplaint',
        name: 'customerComplaint',
        meta: {
          name: 'management'
        },
        component: resolve => {
          require(['@/view/CRM/otherItem/customerComplaint.vue'], resolve)
        }
      },
      {
        path: '/addCustomerComplaint',
        name: 'addCustomerComplaint',
        meta: {
          name: 'management',
          activeName: 'customerComplaint'
        },
        component: resolve => {
          require(['@/view/CRM/otherItem/addCustomerComplaint.vue'], resolve)
        }
      },
      {
        path: '/handledComplain',
        name: 'handledComplain',
        meta: {
          name: 'management',
          activeName: 'customerComplaint'
        },
        component: resolve => {
          require(['@/view/CRM/otherItem/handledComplain.vue'], resolve)
        }
      },
      {
        path: '/remittanceInformation',
        name: 'remittanceInformation',
        meta: {
          name: 'management'
        },
        component: resolve => {
          require(['@/view/CRM/otherItem/remittanceInformation.vue'], resolve)
        }
      },
      {
        path: '/allSalemen',
        name: 'allSalemen',
        meta: {
          name: 'management'
        },
        component: resolve => {
          require(['@/view/CRM/userManager/userDistribute/allSalemen.vue'], resolve)
        }
      },
      {
        path: '/searchResult',
        name: 'searchResult',
        meta: {
          name: 'management'
        },
        component: resolve => {
          require(['@/view/CRM/userManager/userSearch/searchResult.vue'], resolve)
        }
      },
      {
        path: '/continueSalesman',
        name: 'continueSalesman',
        meta: {
          name: 'management'
        },
        component: resolve => {
          require(['@/view/CRM/systemConfiguration/continueSalesman.vue'], resolve)
        }
      },
      {
        path: '/renewalContract',
        name: 'renewalContract',
        meta: {
          name: 'management'
        },
        component: resolve => {
          require(['@/view/CRM/renewalContract/renewalContract.vue'], resolve)
        }
      },
      {
        path: '/retentionCheck',
        name: 'retentionCheck',
        meta: {
          name: 'management',
          retentionCheck: 'retentionCheck'
        },
        component: resolve => {
          require(['@/view/CRM/examinationApprovalMatters/retentionCheck.vue'], resolve)
        }
      },
      {
        path: '/allocationRecord',
        name: 'allocationRecord',
        meta: {
          name: 'management',
          activeName: 'retentionCheck'
        },
        component: resolve => {
          require(['@/view/CRM/examinationApprovalMatters/allocationRecord.vue'], resolve)
        }
      },
      {
        path: '/recordList',
        name: 'recordList',
        meta: {
          name: 'management',
          activeName: 'renewalContract'
        },
        component: resolve => {
          require(['@/view/CRM/renewalContract/recordList.vue'], resolve)
        }
      },
      {
        path: '/automaticAllocation',
        name: 'automaticAllocation',
        meta: {
          name: 'management',
          activeName: 'renewalContract'
        },
        component: resolve => {
          require(['@/view/CRM/renewalContract/automaticAllocation.vue'], resolve)
        }
      },
      {
        path: '/automaticPreview',
        name: 'automaticPreview',
        meta: {
          name: 'management',
          activeName: 'renewalContract'
        },
        component: resolve => {
          require(['@/view/CRM/renewalContract/automaticPreview.vue'], resolve)
        }
      },
      {
        path: '/enterpriseList',
        name: 'enterpriseList',
        meta: {
          name: 'basicData'
        },
        component: resolve => {
          require(['@/view/CMS/enterpriseLibrary/enterpriseList.vue'], resolve)
        }
      },
      {
        path: '/enterpriseDetail',
        name: 'enterpriseDetail',
        meta: {
          name: 'basicData',
          activeName: 'enterpriseList'
        },
        component: resolve => {
          require(['@/view/CMS/enterpriseLibrary/enterpriseDetail.vue'], resolve)
        }
      },
      {
        path: '/updateEnterpriseInfo',
        name: 'updateEnterpriseInfo',
        meta: {
          name: 'basicData',
          activeName: 'enterpriseList'
        },
        component: resolve => {
          require(['@/view/CMS/enterpriseLibrary/updateEnterpriseInfo.vue'], resolve)
        }
      },
      {
        path: '/createEnterpriseInfo',
        name: 'createEnterpriseInfo',
        meta: {
          name: 'basicData'
        },
        component: resolve => {
          require(['@/view/CMS/enterpriseLibrary/createEnterpriseInfo.vue'], resolve)
        }
      },
      {
        path: '/enterpriseRelationship',
        name: 'enterpriseRelationship',
        meta: {
          name: 'basicData',
          activeName: 'enterpriseList'
        },
        component: resolve => {
          require(['@/view/CMS/enterpriseLibrary/enterpriseRelationship.vue'], resolve)
        }
      },
      {
        path: '/enterpriseBreedRelationship',
        name: 'enterpriseBreedRelationship',
        meta: {
          name: 'basicData',
          activeName: 'enterpriseList'
        },
        component: resolve => {
          require(['@/view/CMS/enterpriseLibrary/enterpriseBreedRelationship.vue'], resolve)
        }
      },
      {
        path: '/enterpriseContact',
        name: 'enterpriseContact',
        meta: {
          name: 'basicData',
          activeName: 'enterpriseList'
        },
        component: resolve => {
          require(['@/view/CMS/enterpriseLibrary/enterpriseContact.vue'], resolve)
        }
      },
      {
        path: '/addEnterpriseRelationship',
        name: 'addEnterpriseRelationship',
        component: resolve => {
          require(['@/view/CMS/enterpriseLibrary/addEnterpriseRelationship.vue'], resolve)
        }
      },
      {
        path: '/addEnterpriseContact',
        name: 'addEnterpriseContact',
        meta: {
          name: 'basicData'
        },
        component: resolve => {
          require(['@/view/CMS/enterpriseLibrary/addEnterpriseContact.vue'], resolve)
        }
      },
      {
        path: '/productOpening',
        name: 'productOpening',
        meta: {
          name: 'finance'
        },
        component: resolve => {
          require(['@/view/finance/productOpening/productOpening.vue'], resolve)
        }
      },
      {
        path: '/accountTop',
        name: 'accountTop',
        meta: {
          name: 'finance'
        },
        component: resolve => {
          require(['@/view/finance/accountCenter/accountTop.vue'], resolve)
        }
      },
      {
        path: '/accountDetail',
        name: 'accountDetail',
        meta: {
          name: 'finance',
          activeName: 'accountTop'
        },
        component: resolve => {
          require(['@/view/finance/accountCenter/accountDetail.vue'], resolve)
        }
      },
      {
        path: '/addAccount',
        name: 'addAccount',
        meta: {
          name: 'finance',
          activeName: 'accountTop'
        },
        component: resolve => {
          require(['@/view/finance/accountCenter/addAccount.vue'], resolve)
        }
      },
      {
        path: '/saleTicketListManager',
        name: 'saleTicketListManager',
        meta: {
          name: 'finance'
        },
        component: resolve => {
          require(['@/view/finance/saleTicketList/saleTicketListManager.vue'], resolve)
        }
      },
      {
        path: '/saleTicketListDetail',
        name: 'saleTicketListDetail',
        meta: {
          name: 'finance',
          activeName: 'saleTicketListManager'
        },
        component: resolve => {
          require(['@/view/finance/saleTicketList/saleTicketListDetail.vue'], resolve)
        }
      },
      {
        path: '/ticketRefound',
        name: 'ticketRefound',
        meta: {
          name: 'finance',
          activeName: 'saleTicketListManager'
        },
        component: resolve => {
          require(['@/view/finance/saleTicketList/ticketRefound.vue'], resolve)
        }
      },
      {
        path: '/informationSort',
        name: 'informationSort',
        meta: {
          name: 'basicData'
        },
        component: resolve => {
          require(['@/view/CMS/informationSort/informationSort.vue'], resolve)
        }
      },
      {
        path: '/varietyCategoryManagement',
        name: 'varietyCategoryManagement',
        meta: {
          name: 'basicData'
        },
        component: resolve => {
          require(['@/view/CMS/breedTypeManagement/varietyCategoryManagement.vue'], resolve)
        }
      },
      {
        path: '/varietyManagement',
        name: 'varietyManagement',
        meta: {
          name: 'basicData'
        },
        component: resolve => {
          require(['@/view/CMS/varietyManagement/varietyManagement.vue'], resolve)
        }
      },
      {
        path: '/specificationType',
        name: 'specificationType',
        meta: {
          name: 'basicData'
        },
        component: resolve => {
          require(['@/view/CMS/specificationModelManagement/specificationType.vue'], resolve)
        }
      },
      {
        path: '/standardManagement',
        name: 'standardManagement',
        meta: {
          name: 'basicData'
        },
        component: resolve => {
          require(['@/view/CMS/standardManagement/standardManagement.vue'], resolve)
        }
      },
      {
        path: '/useManagement',
        name: 'useManagement',
        meta: {
          name: 'basicData'
        },
        component: resolve => {
          require(['@/view/CMS/useManagement/useManagement.vue'], resolve)
        }
      },
      {
        path: '/technicalIndicators',
        name: 'technicalIndicators',
        meta: {
          name: 'basicData'
        },
        component: resolve => {
          require(['@/view/CMS/technicalModelManagement/technicalIndicators.vue'], resolve)
        }
      },
      {
        path: '/productOpeningDetail',
        name: 'productOpeningDetail',
        meta: {
          name: 'finance',
          activeName: 'productOpening'
        },
        component: resolve => {
          require(['@/view/finance/productOpening/productOpeningDetail.vue'], resolve)
        }
      },
      {
        path: '/costReport/direct',
        name: 'direct',
        meta: {
          name: 'finance'
        },
        component: resolve => {
          require(['@/view/finance/costReport/direct.vue'], resolve)
        }
      },
      {
        path: '/costReport/indirect',
        name: 'indirect',
        meta: {
          name: 'finance'
        },
        component: resolve => {
          require(['@/view/finance/costReport/indirect.vue'], resolve)
        }
      },
      {
        path: '/arrivaCheck',
        name: 'arrivaCheck',
        meta: {
          name: 'finance'
        },
        component: resolve => {
          require(['@/view/finance/arrivaCheck.vue'], resolve)
        }
      },
      {
        path: '/goldRefund',
        name: 'goldRefund',
        meta: {
          name: 'finance'
        },
        component: resolve => {
          require(['@/view/finance/goldRefund/goldRefund.vue'], resolve)
        }
      },
      {
        path: '/goldRefundDetail/:applyId',
        name: 'goldRefundDetail',
        meta: {
          name: 'finance'
        },
        props: true,
        component: resolve => {
          require(['@/view/finance/goldRefund/goldRefundDetail.vue'], resolve)
        }
      },
      {
        path: '/invoiceList',
        name: 'invoiceList',
        meta: {
          name: 'finance'
        },
        component: resolve => {
          require(['@/view/finance/invoiceList.vue'], resolve)
        }
      },
      {
        path: '/addInvoice',
        name: 'addInvoice',
        meta: {
          name: 'finance',
          activeName: 'invoiceList'
        },
        component: resolve => {
          require(['@/view/finance/addInvoice.vue'], resolve)
        }
      },
      {
        path: '/saleRecord',
        name: 'saleRecord',
        meta: {
          name: 'finance'
        },
        component: resolve => {
          require(['@/view/finance/saleRecord.vue'], resolve)
        }
      },
      {
        path: '/postManager',
        name: 'postManager',
        meta: {
          name: 'finance'
        },
        component: resolve => {
          require(['@/view/finance/postManager.vue'], resolve)
        }
      },
      {
        path: '/billManager',
        name: 'billManager',
        meta: {
          name: 'finance'
        },
        component: resolve => {
          require(['@/view/finance/billManager.vue'], resolve)
        }
      },
      {
        path: '/applyDetail',
        name: 'applyDetail',
        meta: {
          name: 'finance',
          activeName: 'billManager'
        },
        component: resolve => {
          require(['@/view/finance/applyDetail.vue'], resolve)
        }
      },
      {
        path: '/billDetail',
        name: 'billDetail',
        meta: {
          name: 'finance',
          activeName: 'billManager'
        },
        component: resolve => {
          require(['@/view/finance/billDetail.vue'], resolve)
        }
      },
      {
        path: '/accountAuditsList',
        name: 'accountAuditsList',
        meta: {
          name: 'finance',
          activeName: 'confirmcontractList'
        },
        component: resolve => {
          require(['@/view/finance/confirmFinance/accountAuditsList.vue'], resolve)
        }
      },
      {
        path: '/confirmcontractList',
        name: 'confirmcontractList',
        meta: {
          name: 'finance'
        },
        component: resolve => {
          require(['@/view/finance/confirmFinance/confirmcontractList.vue'], resolve)
        }
      },
      {
        path: '/cancelAccount',
        name: 'cancelAccount',
        meta: {
          name: 'finance',
          activeName: 'confirmcontractList'
        },
        component: resolve => {
          require(['@/view/finance/confirmFinance/cancelAccount.vue'], resolve)
        }
      },

      {
        path: '/cancelAccountDetail',
        name: 'cancelAccountDetail',
        meta: {
          name: 'finance',
          activeName: 'confirmcontractList'
        },
        component: resolve => {
          require(['@/view/finance/confirmFinance/cancelAccountDetail.vue'], resolve)
        }
      },
      {
        path: '/confirmContractDetail',
        name: 'confirmContractDetail',
        meta: {
          name: 'finance',
          activeName: 'confirmcontractList'
        },
        component: resolve => {
          require(['@/view/finance/confirmFinance/confirmContractDetail.vue'], resolve)
        }
      },
      {
        path: '/unitMangement',
        name: 'unitMangement',
        meta: {
          name: 'message'
        },
        component: resolve => {
          require(['@/view/information/unitmangement/unitmangement.vue'], resolve)
        }
      },
      {
        path: '/taskPlant',
        name: 'taskPlant',
        meta: {
          name: 'message'
        },
        component: resolve => {
          require(['@/view/information/taskplant/taskplant.vue'], resolve)
        }
      },
      {
        path: '/taskplantDetail',
        name: 'taskplantDetail',
        meta: {
          name: 'message',
          activeName: 'taskPlant'
        },
        component: resolve => {
          require(['@/view/information/taskplant/taskplantDetail.vue'], resolve)
        }
      },
      {
        path: '/mytaskCollection',
        name: 'mytaskCollection',
        meta: {
          name: 'message',
          activeName: 'mytaskTotal'
        },
        component: resolve => {
          require(['@/view/information/mytaskReach/mytaskCollection.vue'], resolve)
        }
      },
      {
        path: '/mytaskReach',
        name: 'mytaskReach',
        meta: {
          name: 'message',
          activeName: 'mytaskTotal'
        },
        component: resolve => {
          require(['@/view/information/mytaskReach/mytaskReach.vue'], resolve)
        }
      },
      {
        path: '/mytaskTotal',
        name: 'mytaskTotal',
        meta: {
          name: 'message'
        },
        component: resolve => {
          require(['@/view/information/mytaskReach/mytaskTotal.vue'], resolve)
        }
      },
      {
        path: '/mytaskTotalOne',
        name: 'mytaskTotalOne',
        meta: {
          name: 'message'
        },
        component: resolve => {
          require(['@/view/information/mytaskReach/mytaskTotalOne.vue'], resolve)
        }
      },
      {
        path: '/mesUnitList',
        name: 'mesUnitList',
        meta: {
          name: 'message',
          activeName: 'unitMangement'
        },
        component: resolve => {
          require(['@/view/information/unitmangement/mesUnitList/mesUnitList.vue'], resolve)
        }
      },
      {
        path: '/mesUnitListDetail',
        name: 'mesUnitListDetail',
        meta: {
          name: 'message',
          activeName: 'unitMangement'
        },
        component: resolve => {
          require(['@/view/information/unitmangement/mesUnitList/mesUnitListDetail.vue'], resolve)
        }
      },
      {
        path: '/myphoneRecords',
        name: 'myphoneRecords',
        meta: {
          name: 'message'
        },
        component: resolve => {
          require(['@/view/information/myphoneRecords/myphoneRecords.vue'], resolve)
        }
      },
      {
        path: '/telDurationSet',
        name: 'telDurationSet',
        meta: {
          name: 'message'
        },
        component: resolve => {
          require(['@/view/information/telDurationSet/telDurationSet.vue'], resolve)
        }
      },
      {
        path: '/contacts',
        name: 'contacts',
        meta: {
          name: 'message'
        },
        component: resolve => {
          require(['@/view/information/contacts/contacts.vue'], resolve)
        }
      },
      {
        path: '/toAudit',
        name: 'toAudit',
        meta: {
          name: 'message'
        },
        component: resolve => {
          require(['@/view/information/contactReview/toAudit.vue'], resolve)
        }
      },
      {
        path: '/moduleManagement',
        name: 'moduleManagement',
        meta: {
          name: 'eac'
        },
        component: resolve => {
          require(['@/view/EAC/moduleManagement/moduleManagement.vue'], resolve)
        }
      },
      {
        path: '/rightsManagement',
        name: 'rightsManagement',
        meta: {
          name: 'eac'
        },
        component: resolve => {
          require(['@/view/EAC/rightsManagement/rightsManagement.vue'], resolve)
        }
      },
      {
        path: '/addInformationSettings',
        name: 'addInformationSettings',
        meta: {
          name: 'message',
          activeName: 'unitMangement'
        },
        component: resolve => {
          require(['@/view/information/unitmangement/addInformationSettings.vue'], resolve)
        }
      },
      {
        path: '/collocatedFunctions',
        name: 'collocatedFunctions',
        meta: {
          name: 'eac'
        },
        component: resolve => {
          require(['@/view/EAC/collocatedFunctions/collocatedFunctions.vue'], resolve)
        }
      },
      {
        path: '/informationSource',
        name: 'informationSource',
        meta: {
          name: 'message'
        },
        component: resolve => {
          require(['@/view/information/unitmangement/informationSource.vue'], resolve)
        }
      },
      {
        path: '/EditInfoUnit',
        name: 'EditInfoUnit',
        meta: {
          name: 'message',
          activeName: 'unitMangement'
        },
        component: resolve => {
          require(['@/view/information/unitmangement/EditInfoUnit.vue'], resolve)
        }
      },
      {
        path: '/unitCorrelation',
        name: 'unitCorrelation',
        meta: {
          name: 'message'
        },
        component: resolve => {
          require(['@/view/information/unitmangement/unitCorrelation.vue'], resolve)
        }
      }, {
        path: '/collocatedFunctionsDetail',
        name: 'collocatedFunctionsDetail',
        meta: {
          name: 'eac'
        },
        component: resolve => {
          require(['@/view/EAC/collocatedFunctions/collocatedFunctionsDetail.vue'], resolve)
        }
      },
      {
        path: '/CheckUnit',
        name: 'CheckUnit',
        meta: {
          name: 'message',
          activeName: 'unitMangement'
        },
        component: resolve => {
          require(['@/view/information/unitmangement/CheckUnit.vue'], resolve)
        }
      },
      {
        path: '/myInformationUnit',
        name: 'myInformationUnit',
        meta: {
          name: 'message'
        },
        component: resolve => {
          require(['@/view/information/infoDiffusion/myInformationUnit.vue'], resolve)
        }
      },
      {
        path: '/postedMessage',
        name: 'postedMessage',
        meta: {
          name: 'message',
          activeName: 'myInformationUnit'
        },
        component: resolve => {
          require(['@/view/information/infoDiffusion/postedMessage.vue'], resolve)
        }
      },
      {
        path: '/smsMessage',
        name: 'smsMessage',
        meta: {
          name: 'message'
        },
        component: resolve => {
          require(['@/view/information/infoDiffusion/smsMessage.vue'], resolve)
        }
      },
      {
        path: '/flashMessage',
        name: 'flashMessage',
        meta: {
          name: 'message'
        },
        component: resolve => {
          require(['@/view/information/infoDiffusion/flashMessage.vue'], resolve)
        }
      },
      {
        path: '/formStyle',
        name: 'formStyle',
        meta: {
          name: 'message',
          activeName: 'myInformationUnit'
        },
        component: resolve => {
          require(['@/view/information/infoDiffusion/formStyle.vue'], resolve)
        }
      },
      {
        path: '/textEditStyle',
        name: 'textEditStyle',
        meta: {
          name: 'message'
        },
        component: resolve => {
          require(['@/view/information/infoDiffusion/textEditStyle.vue'], resolve)
        }
      },
      {
        path: '/previewList',
        name: 'previewList',
        meta: {
          name: 'message'
        },
        component: resolve => {
          require(['@/view/information/infoDiffusion/previewList.vue'], resolve)
        }
      },
      {
        path: '/editList',
        name: 'editList',
        meta: {
          name: 'message'
        },
        component: resolve => {
          require(['@/view/information/infoDiffusion/editList.vue'], resolve)
        }
      },
      {
        path: '/authorityQuery',
        name: 'authorityQuery',
        meta: {
          name: 'eac',
          activeName: 'rightsManagement'
        },
        component: resolve => {
          require(['@/view/EAC/rightsManagement/authorityQuery.vue'], resolve)
        }
      },
      {
        path: '/accountAuthority',
        name: 'accountAuthority',
        meta: {
          name: 'eac'
        },
        component: resolve => {
          require(['@/view/EAC/accountAuthority/accountAuthority.vue'], resolve)
        }
      },
      {
        path: '/accountAuthorityDetail',
        name: 'accountAuthorityDetail',
        meta: {
          name: 'eac',
          activeName: 'accountAuthority'
        },
        component: resolve => {
          require(['@/view/EAC/accountAuthority/accountAuthorityDetail.vue'], resolve)
        }
      },
      {
        path: '/menuConfiguration',
        name: 'menuConfiguration',
        meta: {
          name: 'eac'
        },
        component: resolve => {
          require(['@/view/EAC/menuConfiguration/menuConfiguration.vue'], resolve)
        }
      },
      {
        path: '/menuConfigurationDetail',
        name: 'menuConfigurationDetail',
        meta: {
          name: 'eac'
        },
        component: resolve => {
          require(['@/view/EAC/menuConfiguration/menuConfigurationDetail.vue'], resolve)
        }
      },
      {
        path: '/roleQueryList',
        name: 'roleQueryList',
        meta: {
          name: 'eac'
        },
        component: resolve => {
          require(['@/view/EAC/roleManagement/roleQueryList.vue'], resolve)
        }
      },
      {
        path: '/roleManagementDetail',
        name: 'roleManagementDetail',
        meta: {
          name: 'eac',
          activeName: 'roleQueryList'
        },
        component: resolve => {
          require(['@/view/EAC/roleManagement/roleManagementDetail.vue'], resolve)
        }
      },
      {
        path: '/accountAssignment',
        name: 'accountAssignment',
        meta: {
          name: 'eac',
          activeName: 'roleQueryList'
        },
        component: resolve => {
          require(['@/view/EAC/roleManagement/accountAssignment.vue'], resolve)
        }
      },
      {
        path: '/roleAuthorization',
        name: 'roleAuthorization',
        meta: {
          name: 'eac',
          activeName: 'roleQueryList'
        },
        component: resolve => {
          require(['@/view/EAC/roleManagement/roleAuthorization.vue'], resolve)
        }
      },
      {
        path: '/associationMenu',
        name: 'associationMenu',
        meta: {
          name: 'eac'
        },
        component: resolve => {
          require(['@/view/EAC/roleManagement/associationMenu.vue'], resolve)
        }
      },
      {
        path: '/administratorSettings',
        name: 'administratorSettings',
        meta: {
          name: 'eac'
        },
        component: resolve => {
          require(['@/view/EAC/administratorSettings/administratorSettings.vue'], resolve)
        }
      },
      {
        path: '/administratorSettingsDetail',
        name: 'administratorSettingsDetail',
        meta: {
          name: 'eac',
          activeName: 'administratorSettings'
        },
        component: resolve => {
          require(['@/view/EAC/administratorSettings/administratorSettingsDetail.vue'], resolve)
        }
      },
      {
        path: '/workbenchManagement',
        name: 'workbenchManagement',
        meta: {
          name: 'eac'
        },
        component: resolve => {
          require(['@/view/EAC/workbenchManagement/workbenchManagement.vue'], resolve)
        }
      },
      {
        path: '/workbenchManagementDetail',
        name: 'workbenchManagementDetail',
        meta: {
          name: 'eac',
          activeName: 'workbenchManagement'
        },
        component: resolve => {
          require(['@/view/EAC/workbenchManagement/workbenchManagementDetail.vue'], resolve)
        }
      }, {
        path: '/addAuthority',
        name: 'addAuthority',
        meta: {
          name: 'eac',
          activeName: 'rightsManagement'
        },
        component: resolve => {
          require(['@/view/EAC/rightsManagement/addAuthority.vue'], resolve)
        }
      },
      {
        path: '/authorityEdit',
        name: 'authorityEdit',
        meta: {
          name: 'eac',
          activeName: 'rightsManagement'
        },
        component: resolve => {
          require(['@/view/EAC/rightsManagement/authorityEdit.vue'], resolve)
        }
      },
      {
        path: '/departmentTaskReach',
        name: 'departmentTaskReach',
        meta: {
          name: 'message'
        },
        component: resolve => {
          require(['@/view/information/departmentTaskReach/departmentTaskReach.vue'], resolve)
        }
      },
      {
        path: '/personalTaskReach',
        name: 'personalTaskReach',
        meta: {
          name: 'message',
          activeName: 'departmentTaskReach'
        },
        component: resolve => {
          require(['@/view/information/departmentTaskReach/personalTaskReach.vue'], resolve)
        }
      },
      {
        path: '/performanceEvaluation',
        name: 'performanceEvaluation',
        meta: {
          name: 'achievements'
        },
        component: resolve => {
          require(['@/view/achievements/performanceEvaluation/performanceEvaluation.vue'], resolve)
        }
      },
      {
        path: '/performanceStatusSearch',
        name: 'performanceStatusSearch',
        meta: {
          name: 'achievements'
        },
        component: resolve => {
          require(['@/view/achievements/performanceEvaluation/performanceStatusSearch.vue'], resolve)
        }
      },
      {
        path: '/assessmentTemplatedetail',
        name: 'assessmentTemplatedetail',
        meta: {
          name: 'achievements',
          activeName: 'checkTemplate'
        },
        component: resolve => {
          require(['@/view/achievements/checkTemplate/assessmentTemplatedetail.vue'], resolve)
        }
      },
      {
        path: '/checkTemplate',
        name: 'checkTemplate',
        meta: {
          name: 'achievements'
        },
        component: resolve => {
          require(['@/view/achievements/checkTemplate/checkTemplate.vue'], resolve)
        }
      },
      {
        path: '/myAchievementshanded',
        name: 'myAchievementshanded',
        meta: {
          name: 'achievements'
        },
        component: resolve => {
          require(['@/view/achievements/performanceEvaluation/myAchievementshanded.vue'], resolve)
        }
      },
      {
        path: '/performanceReview',
        name: 'performanceReview',
        meta: {
          name: 'achievements'
        },
        component: resolve => {
          require(['@/view/achievements/performanceReview/performanceReview.vue'], resolve)
        }
      },
      {
        path: '/indexConfig',
        name: 'indexConfig',
        meta: {
          name: 'achievements',
          activeName: 'checkTemplate'
        },
        component: resolve => {
          require(['@/view/achievements/checkTemplate/indexConfig.vue'], resolve)
        }
      },
      {
        path: '/staffing',
        name: 'staffing',
        meta: {
          name: 'achievements',
          activeName: 'checkTemplate'
        },
        component: resolve => {
          require(['@/view/achievements/checkTemplate/staffing.vue'], resolve)
        }
      },
      {
        path: '/performanceeQuery',
        name: 'performanceeQuery',
        meta: {
          name: 'achievements'
        },
        component: resolve => {
          require(['@/view/achievements/performanceeQuery/performanceeQuery.vue'], resolve)
        }
      },

      {
        path: '/proportionalMaintenance',
        name: 'proportionalMaintenance',
        meta: {
          name: 'achievements'
        },
        component: resolve => {
          require(['@/view/achievements/royaltyRatio/proportionalMaintenance.vue'], resolve)
        }
      },
      {
        path: '/personnelCommission',
        name: 'personnelCommission',
        meta: {
          name: 'achievements'
        },
        component: resolve => {
          require(['@/view/achievements/royaltyRatio/personnelCommission.vue'], resolve)
        }
      },

      {
        path: '/abnormalStatistics',
        name: 'abnormalStatistics',
        meta: {
          name: 'achievements'
        },
        component: resolve => {
          require(['@/view/achievements/abnormalStatistics/abnormalStatistics.vue'], resolve)
        }
      },
      {
        path: '/templateUsed',
        name: 'templateUsed',
        meta: {
          name: 'achievements'
        },
        component: resolve => {
          require(['@/view/achievements/abnormalStatistics/templateUsed.vue'], resolve)
        }
      },
      {
        path: '/TemplateFile',
        name: 'TemplateFile',
        meta: {
          name: 'message'
        },
        component: resolve => {
          require(['@/view/information/unitmangement/TemplateClass/TemplateFile.vue'], resolve)
        }
      },
      {
        path: '/ContrabandWords',
        name: 'ContrabandWords',
        meta: {
          name: 'message'
        },
        component: resolve => {
          require(['@/view/information/unitmangement/TemplateClass/ContrabandWords.vue'], resolve)
        }
      },
      {
        path: '/TemplateManagement',
        name: 'TemplateManagement',
        meta: {
          name: 'message'
        },
        component: resolve => {
          require(['@/view/information/unitmangement/TemplateClass/TemplateManagement.vue'], resolve)
        }
      },
      {
        path: '/AddTemplateManag',
        name: 'AddTemplateManag',
        meta: {
          name: 'message',
          activeName: 'TemplateManagement'
        },
        component: resolve => {
          require(['@/view/information/unitmangement/TemplateClass/AddTemplateManag.vue'], resolve)
        }
      },
      {
        path: '/editTemplateManag',
        name: 'editTemplateManag',
        meta: {
          name: 'message',
          activeName: 'TemplateManagement'
        },
        component: resolve => {
          require(['@/view/information/unitmangement/TemplateClass/editTemplateManag.vue'], resolve)
        }

      },
      {
        path: '/marketingTaskSet',
        name: 'marketingTaskSet',
        meta: {
          name: 'achievements'
        },
        component: resolve => {
          require(['@/view/achievements/achievementTaskSet/marketingTaskSet.vue'], resolve)
        }
      },
      {
        path: '/mouthTaskSet',
        name: 'mouthTaskSet',
        meta: {
          name: 'achievements'
        },
        component: resolve => {
          require(['@/view/achievements/achievementTaskSet/mouthTaskSet.vue'], resolve)
        }
      },
      {
        path: '/personalTaskSet',
        name: 'personalTaskSet',
        meta: {
          name: 'achievements',
          activeName: 'marketingTaskSet'
        },
        component: resolve => {
          require(['@/view/achievements/achievementTaskSet/personalTaskSet.vue'], resolve)
        }
      },
      {
        path: '/productTaskSet',
        name: 'productTaskSet',
        meta: {
          name: 'achievements',
          activeName: 'productTaskSet'
        },
        component: resolve => {
          require(['@/view/achievements/achievementTaskSet/productTaskSet.vue'], resolve)
        }
      },
      {
        path: '/personalProTaskSet',
        name: 'personalProTaskSet',
        meta: {
          name: 'achievements'
        },
        component: resolve => {
          require(['@/view/achievements/achievementTaskSet/personalProTaskSet.vue'], resolve)
        }
      },
      {
        path: '/productMouthTaskSet',
        name: 'productMouthTaskSet',
        meta: {
          name: 'achievements'
        },
        component: resolve => {
          require(['@/view/achievements/achievementTaskSet/productMouthTaskSet.vue'], resolve)
        }
      },

      {
        path: '/productMouthTaskCheck',
        name: 'productMouthTaskCheck',
        meta: {
          name: 'achievements'
        },
        component: resolve => {
          require(['@/view/achievements/achievementTaskSet/productMouthTaskCheck.vue'], resolve)
        }
      },

      {
        path: '/proContinueMouthTaskSet',
        name: 'proContinueMouthTaskSet',
        meta: {
          name: 'achievements'
        },
        component: resolve => {
          require(['@/view/achievements/achievementTaskSet/proContinueMouthTaskSet.vue'], resolve)
        }
      },
      {
        path: '/qualityTestReport',
        name: 'qualityTestReport',
        meta: {
          name: 'achievements'
        },
        component: resolve => {
          require(['@/view/achievements/qualityTestReport/qualityTestReport.vue'], resolve)
        }
      },
      {
        path: '/contributeReport',
        name: 'contributeReport',
        meta: {
          name: 'achievements'
        },
        component: resolve => {
          require(['@/view/achievements/contributeReport/contributeReport.vue'], resolve)
        }
      },
      {
        path: '/achievementsCount',
        name: 'achievementsCount',
        meta: {
          name: 'achievements'
        },
        component: resolve => {
          require(['@/view/achievements/achievementsCount/achievementsCount.vue'], resolve)
        }
      },
      {
        path: '/industryChain',
        name: 'industryChain',
        meta: {
          name: 'achievements',
          activeName: 'achievementsCount'
        },
        component: resolve => {
          require(['@/view/achievements/achievementsCount/industryChain.vue'], resolve)
        }
      },
      {
        path: '/performTempleta',
        name: 'performTempleta',
        meta: {
          name: 'achievements'
        },
        component: resolve => {
          require(['@/view/achievements/performanceEvaluation/performTempleta.vue'], resolve)
        }
      },
      {
        path: '/selfConfirmTemlate',
        name: 'selfConfirmTemlate',
        meta: {
          name: 'achievements'
        },
        component: resolve => {
          require(['@/view/achievements/performanceEvaluation/selfConfirmTemlate.vue'], resolve)
        }
      },
      {
        path: '/mouthTaskSetCheck',
        name: 'mouthTaskSetCheck',
        meta: {
          name: 'achievements'
        },
        component: resolve => {
          require(['@/view/achievements/achievementTaskSet/mouthTaskSetCheck.vue'], resolve)
        }
      },
      {
        path: '/conMouthTaskSetCheck',
        name: 'conMouthTaskSetCheck',
        meta: {
          name: 'achievements'
        },
        component: resolve => {
          require(['@/view/achievements/achievementTaskSet/conMouthTaskSetCheck.vue'], resolve)
        }
      },
      {
        path: '/mesUnitListDetailOne',
        name: 'mesUnitListDetailOne',
        meta: {
          name: 'message'
        },
        component: resolve => {
          require(['@/view/information/mesUnitList/mesUnitListDetailOne.vue'], resolve)
        }
      },
      {
        path: '/contactSeting',
        name: 'contactSeting',
        meta: {
          name: 'message'
        },
        component: resolve => {
          require(['@/view/information/unitmangement/contactSeting.vue'], resolve)
        }
      },
      {
        path: '/detailConfirmation',
        name: 'detailConfirmation',
        meta: {
          name: 'achievements'
        },
        component: resolve => {
          require(['@/view/achievements/achievementsCount/detailConfirmation.vue'], resolve)
        }
      },
      {
        path: '/websiteTemplateClassification',
        name: 'websiteTemplateClassification',
        meta: {
          name: 'siteManagement'
        },
        component: resolve => {
          require(['@/view/siteManagement/websiteTemplateClassification/websiteTemplateClassification.vue'], resolve)
        }
      },
      {
        path: '/updateFrequencyManagement',
        name: 'updateFrequencyManagement',
        meta: {
          name: 'siteManagement',
          activeName: 'frequencyManagement'
        },
        component: resolve => {
          require(['@/view/siteManagement/frequencyManagement/updateFrequencyManagement.vue'], resolve)
        }
      },
      {
        path: '/websiteManagementTemplate',
        name: 'websiteManagementTemplate',
        meta: {
          name: 'siteManagement'
        },
        component: resolve => {
          require(['@/view/siteManagement/websiteManagementTemplate/websiteManagementTemplate.vue'], resolve)
        }
      },
      {
        path: '/addWebsiteTemplate',
        name: 'addWebsiteTemplate',
        meta: {
          name: 'siteManagement',
          activeName: 'websiteManagementTemplate'
        },
        component: resolve => {
          require(['@/view/siteManagement/websiteManagementTemplate/addWebsiteTemplate.vue'], resolve)
        }
      },
      {
        path: '/editWebsiteTemplate',
        name: 'editWebsiteTemplate',
        meta: {
          name: 'siteManagement',
          activeName: 'websiteManagementTemplate'
        },
        component: resolve => {
          require(['@/view/siteManagement/websiteManagementTemplate/editWebsiteTemplate.vue'], resolve)
        }
      },
      {
        path: '/continueMouthTaskSet',
        name: 'continueMouthTaskSet',
        meta: {
          name: 'siteManagement'
        },
        component: resolve => {
          require(['@/view/achievements/achievementTaskSet/continueMouthTaskSet.vue'], resolve)
        }
      },
      {
        path: '/columnManagement',
        name: 'columnManagement',
        meta: {
          name: 'siteManagement'
        },
        component: resolve => {
          require(['@/view/SiteManagement/columnManagement/columnManagement.vue'], resolve)
        }
      },
      {
        path: '/frequencyManagement',
        name: 'frequencyManagement',
        meta: {
          name: 'siteManagement'
        },
        component: resolve => {
          require(['@/view/SiteManagement/frequencyManagement/frequencyManagement.vue'], resolve)
        }
      },
      {
        path: '/labelManagement',
        name: 'labelManagement',
        meta: {
          name: 'siteManagement'
        },
        component: resolve => {
          require(['@/view/SiteManagement/labelManagement/labelManagement.vue'], resolve)
        }
      },
      {
        path: '/topicList',
        name: 'topicList',
        meta: {
          name: 'thematicManagement'
        },
        component: resolve => {
          require(['@/view/ThematicManagement/topicList.vue'], resolve)
        }
      },
      {
        path: '/createTopic',
        name: 'createTopic',
        meta: {
          name: 'thematicManagement'
        },
        component: resolve => {
          require(['@/view/ThematicManagement/createTopic.vue'], resolve)
        }
      },
      {
        path: '/articleTopic',
        name: 'articleTopic',
        meta: {
          name: 'thematicManagement',
          activeName: 'topicList'
        },
        component: resolve => {
          require(['@/view/ThematicManagement/articleTopic.vue'], resolve)
        }
      },
      {
        path: '/editColumn',
        name: 'editColumn',
        meta: {
          name: 'thematicManagement',
          activeName: 'topicList'
        },
        component: resolve => {
          require(['@/view/ThematicManagement/editColumn.vue'], resolve)
        }
      },
      {
        path: '/seeColumn',
        name: 'seeColumn',
        meta: {
          name: 'thematicManagement',
          activeName: 'topicList'
        },
        component: resolve => {
          require(['@/view/ThematicManagement/seeColumn.vue'], resolve)
        }
      },
      {
        path: '/editTopic',
        name: 'editTopic',
        meta: {
          name: 'thematicManagement',
          activeName: 'topicList'
        },
        component: resolve => {
          require(['@/view/ThematicManagement/editTopic.vue'], resolve)
        }
      },
      {
        path: '/seeTopic',
        name: 'seeTopic',
        meta: {
          name: 'thematicManagement',
          activeName: 'topicList'
        },
        component: resolve => {
          require(['@/view/ThematicManagement/seeTopic.vue'], resolve)
        }
      },
      {
        path: '/listOfRelatedTopic',
        name: 'listOfRelatedTopic',
        meta: {
          name: 'thematicManagement',
          activeName: 'topicList'
        },
        component: resolve => {
          require(['@/view/ThematicManagement/listOfRelatedTopic.vue'], resolve)
        }
      },
      {
        path: '/columnList',
        name: 'columnList',
        meta: {
          name: 'thematicManagement',
          activeName: 'topicList'
        },
        component: resolve => {
          require(['@/view/ThematicManagement/columnList.vue'], resolve)
        }
      },
      {
        path: '/createColumn',
        name: 'createColumn',
        meta: {
          name: 'thematicManagement'
        },
        component: resolve => {
          require(['@/view/ThematicManagement/createColumn.vue'], resolve)
        }
      },
      {
        path: '/factoryPriceChina',
        name: 'factoryPriceChina',
        meta: {
          name: 'dataCenter'
        },
        component: resolve => {
          require(['@/view/dataCenter/priceCenter/factoryPriceChina.vue'], resolve)
        }
      },
      {
        path: '/marketPriceChina',
        name: 'marketPriceChina',
        meta: {
          name: 'dataCenter'
        },
        component: resolve => {
          require(['@/view/dataCenter/priceCenter/marketPriceChina.vue'], resolve)
        }
      },
      {
        path: '/marketPriceInternational',
        name: 'marketPriceInternational',
        meta: {
          name: 'dataCenter'
        },
        component: resolve => {
          require(['@/view/dataCenter/priceCenter/marketPriceInternational.vue'], resolve)
        }
      },
      {
        path: '/oilProductTradePrice',
        name: 'oilProductTradePrice',
        meta: {
          name: 'dataCenter'
        },
        component: resolve => {
          require(['@/view/dataCenter/priceCenter/oilProductTradePrice.vue'], resolve)
        }
      },
      {
        path: '/oilProductRetailPrice',
        name: 'oilProductRetailPrice',
        meta: {
          name: 'dataCenter'
        },
        component: resolve => {
          require(['@/view/dataCenter/priceCenter/oilProductRetailPrice.vue'], resolve)
        }
      },
      {
        path: '/internationalOil',
        name: 'internationalOil',
        meta: {
          name: 'dataCenter'
        },
        component: resolve => {
          require(['@/view/dataCenter/priceCenter/internationalOil.vue'], resolve)
        }
      },
      {
        path: '/benchmarkPrice',
        name: 'benchmarkPrice',
        meta: {
          name: 'dataCenter'
        },
        component: resolve => {
          require(['@/view/dataCenter/priceCenter/benchmarkPrice.vue'], resolve)
        }
      },
      {
        path: '/lzIndexManage',
        name: 'lzIndexManage',
        meta: {
          name: 'dataCenter'
        },
        component: resolve => {
          require(['@/view/dataCenter/lzIndex/lzIndexManage.vue'], resolve)
        }
      },
      {
        path: '/oilChangeControl',
        name: 'oilChangeControl',
        meta: {
          name: 'dataCenter'
        },
        component: resolve => {
          require(['@/view/dataCenter/oilPoint/oilChangeControl.vue'], resolve)
        }
      },
      {
        path: '/oilNumberOffer',
        name: 'oilNumberOffer',
        meta: {
          name: 'dataCenter'
        },
        component: resolve => {
          require(['@/view/dataCenter/oilPoint/oilNumberOffer.vue'], resolve)
        }
      },
      {
        path: '/dataManagerIndex',
        name: 'dataManagerIndex',
        meta: {
          name: 'dataCenter',
          keepAlive: true
        },
        component: resolve => {
          require(['@/view/dataCenter/dataManager/dataManagerIndex.vue'], resolve)
        }
      },
      {
        path: '/fillVacancy',
        name: 'fillVacancy',
        meta: {
          name: 'dataCenter'
        },
        component: resolve => {
          require(['@/view/dataCenter/dataManager/fillVacancy.vue'], resolve)
        }
      },
      {
        path: '/historyData',
        name: 'historyData',
        meta: {
          name: 'dataCenter'
        },
        component: resolve => {
          require(['@/view/dataCenter/dataManager/historyData.vue'], resolve)
        }
      },
      {
        path: '/editExtractReport',
        name: 'editExtractReport',
        meta: {
          name: 'financeReport'
        },
        component: resolve => {
          require(['@/view/report/financeReport/editExtractReport.vue'], resolve)
        }
      },
      {
        path: '/contractExecutionReport',
        name: 'contractExecutionReport',
        meta: {
          name: 'financeReport'
        },
        component: resolve => {
          require(['@/view/report/financeReport/contractExecution/contractExecutionReport.vue'], resolve)
        }
      },
      {
        path: '/contractConfirmReport',
        name: 'contractConfirmReport',
        meta: {
          name: 'financeReport',
          activeName: 'contractExecutionReport'
        },
        component: resolve => {
          require(['@/view/report/financeReport/contractExecution/contractConfirmReport.vue'], resolve)
        }
      },
      {
        path: '/contractInvoiceReport',
        name: 'contractInvoiceReport',
        meta: {
          name: 'financeReport',
          activeName: 'contractExecutionReport'
        },
        component: resolve => {
          require(['@/view/report/financeReport/contractExecution/contractInvoiceReport.vue'], resolve)
        }
      },
      {
        path: '/productCategoryList',
        name: 'productCategoryList',
        meta: {
          name: 'financeReport'
        },
        component: resolve => {
          require(['@/view/report/financeReport/productCategoryList.vue'], resolve)
        }
      },
      {
        path: '/receiptAndPaymentList',
        name: 'receiptAndPaymentList',
        meta: {
          name: 'financeReport'
        },
        component: resolve => {
          require(['@/view/report/financeReport/receiptAndPaymentList.vue'], resolve)
        }
      },
      {
        path: '/reportOrgProductYear',
        name: 'reportOrgProductYear',
        meta: {
          name: 'financeReport'
        },
        component: resolve => {
          require(['@/view/report/financeReport/reportOrgProductYear.vue'], resolve)
        }
      },
      {
        path: '/dailyAccounts',
        name: 'dailyAccounts',
        meta: {
          name: 'financeReport'
        },
        component: resolve => {
          require(['@/view/report/financeReport/accountStatistics/dailyAccounts.vue'], resolve)
        }
      },
      {
        path: '/dailyAccountDetail',
        name: 'dailyAccountDetail',
        meta: {
          name: 'financeReport'
        },
        component: resolve => {
          require(['@/view/report/financeReport/accountStatistics/dailyAccountDetail.vue'], resolve)
        }
      },
      {
        path: '/departAccountRanking',
        name: 'departAccountRanking',
        meta: {
          name: 'financeReport'
        },
        component: resolve => {
          require(['@/view/report/financeReport/accountStatistics/departAccountRanking.vue'], resolve)
        }
      },
      {
        path: '/salerAccountRanking',
        name: 'salerAccountRanking',
        meta: {
          name: 'financeReport'
        },
        component: resolve => {
          require(['@/view/report/financeReport/accountStatistics/salerAccountRanking.vue'], resolve)
        }
      },
      {
        path: '/marketingRevenue',
        name: 'marketingRevenue',
        meta: {
          name: 'financeReport'
        },
        component: resolve => {
          require(['@/view/report/financeReport/marketingRevenue.vue'], resolve)
        }
      },
      {
        path: '/apiUserManagement',
        name: 'apiUserManagement',
        meta: {
          name: 'apiManagement'
        },
        component: resolve => {
          require(['@/view/apiManagement/apiUserManagement.vue'], resolve)
        }
      },
      {
        path: '/addReviseApiUser',
        name: 'addReviseApiUser',
        meta: {
          name: 'apiManagement'
        },
        component: resolve => {
          require(['@/view/apiManagement/addReviseApiUser.vue'], resolve)
        }
      },
      {
        path: '/informationConfig',
        name: 'informationConfig',
        meta: {
          name: 'apiManagement'
        },
        component: resolve => {
          require(['@/view/apiManagement/informationConfig.vue'], resolve)
        }
      },
      {
        path: '/homeMarketPrice',
        name: 'homeMarketPrice',
        meta: {
          name: 'apiManagement'
        },
        component: resolve => {
          require(['@/view/apiManagement/homeMarketPrice.vue'], resolve)
        }
      },
      {
        path: '/internationalMarketPrice',
        name: 'internationalMarketPrice',
        meta: {
          name: 'apiManagement'
        },
        component: resolve => {
          require(['@/view/apiManagement/internationalMarketPrice.vue'], resolve)
        }
      },
      {
        path: '/priceConfig',
        name: 'priceConfig',
        meta: {
          name: 'apiManagement'
        },
        component: resolve => {
          require(['@/view/apiManagement/priceConfig.vue'], resolve)
        }
      },
      {
        path: '/DomesticExFactoryPrice',
        name: 'DomesticExFactoryPrice',
        meta: {
          name: 'apiManagement'
        },
        component: resolve => {
          require(['@/view/apiManagement/DomesticExFactoryPrice.vue'], resolve)
        }
      },
      {
        path: '/internationalCrudeOilPrice',
        name: 'internationalCrudeOilPrice',
        meta: {
          name: 'apiManagement'
        },
        component: resolve => {
          require(['@/view/apiManagement/internationalCrudeOilPrice.vue'], resolve)
        }
      },
      {
        path: '/wholesalePrice',
        name: 'wholesalePrice',
        meta: {
          name: 'apiManagement'
        },
        component: resolve => {
          require(['@/view/apiManagement/wholesalePrice.vue'], resolve)
        }
      },
      {
        path: '/retailPriceOfRefinedOil',
        name: 'retailPriceOfRefinedOil',
        meta: {
          name: 'apiManagement'
        },
        component: resolve => {
          require(['@/view/apiManagement/retailPriceOfRefinedOil.vue'], resolve)
        }
      },
      {
        path: '/basePrice',
        name: 'basePrice',
        meta: {
          name: 'apiManagement'
        },
        component: resolve => {
          require(['@/view/apiManagement/basePrice.vue'], resolve)
        }
      },
      {
        path: '/newPriceAllocation',
        name: 'newPriceAllocation',
        meta: {
          name: 'apiManagement'
        },
        component: resolve => {
          require(['@/view/apiManagement/newPriceAllocation.vue'], resolve)
        }
      },
      {
        path: '/infoDeptDiffusionReport',
        name: 'infoDeptDiffusionReport',
        meta: {
          name: 'productReport'
        },
        component: resolve => {
          require(['@/view/report/productReport/infoDeptDiffusionReport.vue'], resolve)
        }
      },
      {
        path: '/infoDeptCollectionReport',
        name: 'infoDeptCollectionReport',
        meta: {
          name: 'productReport'
        },
        component: resolve => {
          require(['@/view/report/productReport/infoDeptCollectionReport.vue'], resolve)
        }
      },
      {
        path: '/infoDeptOtherReport',
        name: 'infoDeptOtherReport',
        meta: {
          name: 'productReport'
        },
        component: resolve => {
          require(['@/view/report/productReport/infoDeptOtherReport.vue'], resolve)
        }
      },
      {
        path: '/sectoralIndicatorsTab',
        name: 'sectoralIndicatorsTab',
        meta: {
          name: 'productReport'
        },
        component: resolve => {
          require(['@/view/report/productReport/sectoralIndicatorsTab.vue'], resolve)
        }
      },
      {
        path: '/infoPersonDiffusionReport',
        name: 'infoPersonDiffusionReport',
        meta: {
          name: 'productReport'
        },
        component: resolve => {
          require(['@/view/report/productReport/infoPersonDiffusionReport.vue'], resolve)
        }
      },
      {
        path: '/infoPersonCollectionReport',
        name: 'infoPersonCollectionReport',
        meta: {
          name: 'productReport'
        },
        component: resolve => {
          require(['@/view/report/productReport/infoPersonCollectionReport.vue'], resolve)
        }
      },
      {
        path: '/infoPersonOtherReport',
        name: 'infoPersonOtherReport',
        meta: {
          name: 'productReport'
        },
        component: resolve => {
          require(['@/view/report/productReport/infoPersonOtherReport.vue'], resolve)
        }
      },
      {
        path: '/personalIndicatorsTab',
        name: 'personalIndicatorsTab',
        meta: {
          name: 'productReport'
        },
        component: resolve => {
          require(['@/view/report/productReport/personalIndicatorsTab.vue'], resolve)
        }
      },
      {
        path: '/industrialChainRanking',
        name: 'industrialChainRanking',
        meta: {
          name: 'productReport'
        },
        component: resolve => {
          require(['@/view/report/productReport/industrialChainRanking.vue'], resolve)
        }
      },
      {
        path: '/personRanking',
        name: 'personRanking',
        meta: {
          name: 'productReport'
        },
        component: resolve => {
          require(['@/view/report/productReport/personRanking.vue'], resolve)
        }
      },
      {
        path: '/orgRankingTab',
        name: 'orgRankingTab',
        meta: {
          name: 'productReport'
        },
        component: resolve => {
          require(['@/view/report/productReport/orgRankingTab.vue'], resolve)
        }
      },
      {
        path: '/telephoneStatistics',
        name: 'telephoneStatistics',
        meta: {
          name: 'productReport'
        },
        component: resolve => {
          require(['@/view/report/productReport/telephoneStatistics.vue'], resolve)
        }
      },
      {
        path: '/telephoneStatisticsInfo',
        name: 'telephoneStatisticsInfo',
        meta: {
          name: 'productReport'
        },
        component: resolve => {
          require(['@/view/report/productReport/telephoneStatisticsInfo.vue'], resolve)
        }
      },
      {
        path: '/marketingTargetsTab',
        name: 'marketingTargetsTab',
        meta: {
          name: 'saleReport'
        },
        component: resolve => {
          require(['@/view/report/saleReport/marketingTargetsTab.vue'], resolve)
        }
      },
      {
        path: '/achievementsStatisticalOrgReport',
        name: 'achievementsStatisticalOrgReport',
        meta: {
          name: 'saleReport'
        },
        component: resolve => {
          require(['@/view/report/saleReport/achievementsStatisticalOrgReport.vue'], resolve)
        }
      },
      {
        path: '/productCategoryOrgReport',
        name: 'productCategoryOrgReport',
        meta: {
          name: 'saleReport'
        },
        component: resolve => {
          require(['@/view/report/saleReport/productCategoryOrgReport.vue'], resolve)
        }
      },
      {
        path: '/customerManagementOrgReport',
        name: 'customerManagementOrgReport',
        meta: {
          name: 'saleReport'
        },
        component: resolve => {
          require(['@/view/report/saleReport/customerManagementOrgReport.vue'], resolve)
        }
      },
      {
        path: '/callOrgReport',
        name: 'callOrgReport',
        meta: {
          name: 'saleReport'
        },
        component: resolve => {
          require(['@/view/report/saleReport/callOrgReport.vue'], resolve)
        }
      },
      {
        path: '/marketingPersonTab',
        name: 'marketingPersonTab',
        meta: {
          name: 'saleReport'
        },
        component: resolve => {
          require(['@/view/report/saleReport/marketingPersonTab.vue'], resolve)
        }
      },
      {
        path: '/achievementsStatisticalPersonReport',
        name: 'achievementsStatisticalPersonReport',
        meta: {
          name: 'saleReport'
        },
        component: resolve => {
          require(['@/view/report/saleReport/achievementsStatisticalPersonReport.vue'], resolve)
        }
      },
      {
        path: '/productCategoryPersonReport',
        name: 'productCategoryPersonReport',
        meta: {
          name: 'saleReport'
        },
        component: resolve => {
          require(['@/view/report/saleReport/productCategoryPersonReport.vue'], resolve)
        }
      },
      {
        path: '/customerManagementPersonReport',
        name: 'customerManagementPersonReport',
        meta: {
          name: 'saleReport'
        },
        component: resolve => {
          require(['@/view/report/saleReport/customerManagementPersonReport.vue'], resolve)
        }
      },
      {
        path: '/callPersonReport',
        name: 'callPersonReport',
        meta: {
          name: 'saleReport'
        },
        component: resolve => {
          require(['@/view/report/saleReport/callPersonReport.vue'], resolve)
        }
      },
      {
        path: '/markingRankingTab',
        name: 'markingRankingTab',
        meta: {
          name: 'saleReport'
        },
        component: resolve => {
          require(['@/view/report/saleReport/markingRankingTab.vue'], resolve)
        }
      },
      {
        path: '/marketingPersonRanking',
        name: 'marketingPersonRanking',
        meta: {
          name: 'saleReport'
        },
        component: resolve => {
          require(['@/view/report/saleReport/marketingPersonRanking.vue'], resolve)
        }
      },
      {
        path: '/markingOrgRanking',
        name: 'markingOrgRanking',
        meta: {
          name: 'saleReport'
        },
        component: resolve => {
          require(['@/view/report/saleReport/markingOrgRanking.vue'], resolve)
        }
      },
      {
        path: '/unPublishList',
        name: 'unPublishList',
        meta: {
          name: 'message',
          activeName: 'myInformationUnit'
        },
        component: resolve => {
          require(['@/view/information/infoDiffusion/unPublishList.vue'], resolve)
        }
      },
      {
        path: '/publishList',
        name: 'publishList',
        meta: {
          name: 'message',
          activeName: 'myInformationUnit'
        },
        component: resolve => {
          require(['@/view/information/infoDiffusion/publishList.vue'], resolve)
        }
      },
      {
        path: '/viewLog',
        name: 'viewLog',
        meta: {
          name: 'message',
          activeName: 'myInformationUnit'
        },
        component: resolve => {
          require(['@/view/information/infoDiffusion/viewLog.vue'], resolve)
        }
      }, {
        path: '/dataPower',
        name: 'dataPower',
        meta: {
          name: 'management',
        },
        component: resolve => {
          require(['@/view/CRM/myCustomer/userEdit/dataPower.vue'], resolve)
        }
      }
    ]
  }
]

export const routers = [
  otherRouter,
  ...appRouter,
  usermsg,
  CMSworkBench,
  ...errorRouter,
  GMWorkBench, // 总经理
  SMWorkBench, // 业务员
  CSWorkBench, // 客服
  MMWorkBench, // 经理
  GLWorkBench, // 组长
  MDWorkBench, // 营销总监
  CSMWorkBench // 客服部经理
]
