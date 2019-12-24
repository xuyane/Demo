import directives from './directives'

const combineDirective = Vue => {
  // 图片预加载
  Vue.directive('lazyLoad', directives.lazyLoad)
}

export default combineDirective
