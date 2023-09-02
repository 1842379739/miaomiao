import Vue from 'vue'
import VueRouter from 'vue-router'
import movieRouter from './movie'
import cinemaRouter from './cinema'
import mineRouter from './mine'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL, // 默认路由根路径
  base: 'miaomiao', // 表示从这个根路径下面，进行访问【注意：修改默认路由的根路径后，也是修改静态资源的根路径 -- assets  -- 在根目录下 vue.config.js 内配置】
  routes: [
    movieRouter,
    mineRouter,
    cinemaRouter,
    // 重定向
    {
      path: '*',
      redirect: '/movie'
    }
  ]
})

export default router
