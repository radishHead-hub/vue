module.exports = {
  // publicPath: '/ele/dist/', // 打包文件相对路径
  devServer: {
    open: true,
      // host: 'localhost',
    host: '192.168.1.7',
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: {
      // 配置跨域
      '/api': {
        target: 'https://ele-interface.herokuapp.com/api/',
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    before: app => {}
  }
};
