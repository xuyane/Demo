import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import directives from './directives'
import filters from './filters'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import 'normalize.css/normalize.css'
import '@/assets/styles/resetIview.less'

Vue.config.productionTip = false
Vue.use(ViewUI)

/* 自定义指令 */
directives(Vue)

/* 自定义过滤器 */
filters(Vue)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
