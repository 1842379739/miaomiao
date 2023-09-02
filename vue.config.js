const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // 修改静态资源的路由根路径【记得修改后重启项目】
  publicPath: '/miaomiao',
  transpileDependencies: true,
  // 反向代理
  // 因为我们没有用到公网的api，所有我们这里不使用反向代理【该反向代理的代码，只是用来学习】
  // devServer: {
  //   proxy: {
  //     'api':{
  //       target: 'https://192.168.1.1',
  //       // 是否需要改变地址
  //       changeOrigin: true
  //     }
  //   }
  // }
})

// 反向代理
module.exports = {
  devServer: {
    proxy: {
      '/gateway': {
        target: 'https://m.maizuo.com',
        // 是否需要改变地址
        changeOrigin: true
        // 将字符串 kerwin 替换成空字符串【支持 正则表达式 写法 ^】
        // pathRewrite:{
        //   '^/gateway': ''
        // }
      },
      '/tao': {
        target: 'https://m.maizuo.com',
        changeOrigin: true,
        // 路径重写
        pathRewrite: {
          // 注意：不知道什么原因，这里无法替换成空字符串，也就是无法写成'^/tao': ''，所以我们需要将请求的地址做一点点的改变，再使用ajax请求的地址中，把 /gateway 改成 /tao，最后通过我们反向代理的路径重写，写成正确的路径即可 
          // 最后注意：在我们更改了反向代理的时候，我们一定要重启项目，不然程序无法生效
          '^/tao': '/gateway'
        }
      }
    }
  }
}