'use strict'
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

// dev 启动端口
const port = process.env.port || 8080

// 启动打包配置项
module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: false, // 关闭eslint配置项
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warning: false,
      error: true
    },
    // 本地代理
    proxy: {
      '/api': {
        target: 'http://api.map.baidu.com/telematics/v3/', // 接口地址
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    after: require('./mock/server/mock-server.js')
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
        'api': resolve('src/api'),
        'utils': resolve('src/utils'),
        'config': resolve('src/config'),
        'filters': resolve('src/filters'),
        'directives': resolve('src/directives'),
        'components': resolve('src/components')
      }
    }
  }
}
