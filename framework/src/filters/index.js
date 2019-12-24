import * as filters from './filters'

const combineFilters = Vue => {
  Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
  })
}

export default combineFilters
