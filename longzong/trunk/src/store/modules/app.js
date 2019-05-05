// import Cookies from 'js-cookie'
// import Vue from 'vue'
import promise from 'es6-promise'
// 兼容 Promise
promise.polyfill()

const app = {
  state: {
    baseUrl: '', // baseurl
    testUrl: 'http://192.168.202.23:7911', // 呼叫中心测试baseurl
    tagsList: [],
    cachePage: ''
  },
  mutations: {
    tagChange (state, item) {
      // console
    }
  }
}

export default app
