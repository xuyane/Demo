import jsonp from './jsonp.js' 
import {commonParams, options} from './config'

export function rts (url, data) {
  let params = Object.assign({}, commonParams, data)
  return jsonp(url, params, options)
}
