import { navRoutes } from '@/router'
import { loopRenderNav } from 'utils'

const navList = loopRenderNav(navRoutes)

const state = {
  navList
}

const mutations = {
  SET_NAV_LIST: (state, list) => {
    state.navList = list
  }
}

const actions = {
  // 设置路由导航菜单
  setNavList ({ commit }) {
    /* 组装路由数据 */
    const nextNav = loopRenderNav(navRoutes)
    commit('SET_NAV_LIST', nextNav)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
