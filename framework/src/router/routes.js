import Layout from '@/views/public/layout'

/*
  静态路由
*/
export const constantRoutes = [
  {
    path: '/',
    redirect: '/dashboard',
    component: Layout,
    meta: {
      hideInMenu: true
    },
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        meta: {
          title: '导航',
          keepAlive: true
        },
        component: () => import('@/views/public/dashboard')
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    meta: {
      hideInMenu: true,
      keepAlive: true
    },
    component: () => import('@/views/public/error-page/404')
  },
  {
    path: '/403',
    name: '403',
    meta: {
      hideInMenu: true,
      keepAlive: true
    },
    component: () => import('@/views/public/error-page/403')
  }
]

/*
  导航路由
*/
export const navRoutes = [
  {
    path: '/dataSource',
    name: 'dataSource',
    component: Layout,
    meta: {
      hideInNav: true
    },
    children: [
      {
        path: 'manage',
        name: 'manage',
        meta: {
          icon: 'md-cube',
          title: '数据源'
        },
        component: () => import('@/views/pages/dataSource/manage')
      }
    ]
  },
  {
    path: '/dataMeta',
    name: 'dataMeta',
    component: Layout,
    meta: {
      hideInNav: true
    },
    children: [
      {
        path: 'definition',
        name: 'definition',
        meta: {
          icon: 'ios-list-box',
          title: '数据定义'
        },
        component: () => import('@/views/pages/dataMeta/definition')
      }
    ]
  },
  {
    path: '/service',
    name: 'service',
    component: Layout,
    meta: {
      hideInNav: true
    },
    children: [
      {
        path: 'control',
        name: 'control',
        meta: {
          icon: 'md-planet',
          title: '服务中心'
        },
        component: () => import('@/views/pages/service/control')
      }
    ]
  },
  {
    path: '/task',
    name: 'task',
    component: Layout,
    meta: {
      hideInNav: true
    },
    children: [
      {
        path: 'listing',
        name: 'listing',
        meta: {
          icon: 'ios-timer',
          title: '任务列表'
        },
        component: () => import('@/views/pages/task/listing')
      }
    ]
  },
  {
    path: '/undeterminted',
    name: 'undeterminted',
    component: Layout,
    meta: {
      icon: 'md-water',
      title: '待定'
    },
    children: [
      {
        path: 'table',
        name: 'table',
        meta: {
          icon: 'logo-xbox',
          title: '表格'
        },
        component: () => import('@/views/pages/undeterminted/table')
      },
      {
        path: 'tabs',
        name: 'tabs',
        meta: {
          icon: 'ios-photos',
          title: '选项卡'
        },
        component: () => import('@/views/pages/undeterminted/tabs')
      }
    ]
  }
]

/*
  404放在最后
*/
const otherRoutes = [
  {
    path: '*',
    redirect: '/404',
    meta: {
      hideInMenu: true
    }
  }
]

const routes = [
  ...constantRoutes,
  ...navRoutes,
  ...otherRoutes
]

export default routes
