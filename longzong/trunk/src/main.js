// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import '../static/UE/UE/ueditor.config.js'
import '../static/UE/UE/ueditor.all.min.js'
import '../static/UE/UE/ueditor.parse.min.js'
import '../static/UE/UE/lang/zh-cn/zh-cn.js'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import store from './store'
import { router } from './router/index'
import VueClipboard from 'vue-clipboard2'
import "@babel/polyfill";

import './view/components/user-tool-tip';
import './view/components/next-line';


Vue.use(VueClipboard)

Vue.use(iView)

Vue.config.productionTip = false

Vue.prototype.$escapeHTMLString = function (str) {
  str = str.replace(/</g, '&lt;')
  str = str.replace(/>/g, '&gt;')
  return str
}

Vue.prototype.$deleteTag = function (str) {
  var regx = /<[^>]*>|<\/[^>]*>/gm
  var result = str.replace(regx, '')
  return result
}

Vue.prototype.$replaceWordTag = function (html) {
  html = html.replace(/<style>[\s\S]*?<\/style>/ig, '')
  html = html.replace(/<\/?spanyes[^>]*>/gi, '')
  html = html.replace(/<xml>[\s\S]*?<\/xml>/ig, '')
  html = html.replace(/<o:p>[\s\S]*?<\/o:p>/ig, '')
  html = html.replace(/<font>[\s\S]*?<\/font>/ig, '')
  html = html.replace(/\s+style="[^"]*"/, '')
  html = html.replace(/<p><!--[\s\S]*?--><\/p>/ig, '')
  html = html.replace(/&nbsp;/g, '')
  html = html.replace(/\n\n\n/g, '')
  return html
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: store,
  render: h => h(App),
  components: { App },
  template: '<App/>'
})
