const state = {
  breadcrumbList: [],
  isShrink: !!eval(localStorage.getItem('isShrink'))
}

const mutations = {
  CHANGE_BREADCRUMB_LIST: (state, list) => {
    state.breadcrumbList = list
  },
  TOGGLE_SIDEBAR: (state) => {
    state.isShrink = !state.isShrink
    localStorage.setItem('isShrink', state.isShrink)
  }
}

const actions = {
  // 更新面包屑
  changeBreadcrumbList ({ commit }, list) {
    commit('CHANGE_BREADCRUMB_LIST', list)
  },
  // 切换sidebar
  toggleSidebar ({ commit }) {
    commit('TOGGLE_SIDEBAR')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
