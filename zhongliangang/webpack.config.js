module.exports = {
  mode: 'development',
  entry: './js/coreList_data.js',
  devServer: {
    proxy: {
      // 'https://www.layui.com/demo/table/user/?page=1&limit=30'
      '/demo': {
        target: 'https://www.layui.com',
        changeOrigin: true,
        secure: true
      },
      // http://cgmn.custeel.com/cgnews.mv?method=getCgCompnyAlls&pageNum=1&pageSize=20
      '/api': {
        target: 'http://cgmn.custeel.com',
        changeOrigin: true,
        pathRewrite: {
          '/api': ''
        },
      }
    }
  }
}