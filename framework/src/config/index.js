const isProd = process.env.NODE_ENV === 'production'

// 开发环境地址
let baseURL = ''
let mockURL = '/mock'
let apiURL = '/api'

// 生产环境地址
if (isProd) {
  baseURL = 'http://www.baidu.com/api'
  mockURL = ''
  apiURL = ''
}

export { baseURL, mockURL, apiURL }
