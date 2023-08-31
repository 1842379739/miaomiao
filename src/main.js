import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

/*
来自csdn的GPT：
Vue.prototype.axios = axios; 这一行代码的作用是将 axios 这个库挂载到 Vue 实例的原型上，以便在整个项目中都可以使用 axios 进行网络请求。

通过这样的挂载，我们可以在 Vue 组件中通过 this.axios 来访问 axios 的各种方法，比如发送 GET、POST 请求等。这样做的好处是可以方便地在组件中使用 axios，而不需要每次都引入和实例化 axios。

需要注意的是，Vue.prototype 是 Vue 实例的原型，通过挂载到原型上的属性和方法可以在所有组件中共享使用。
*/

// 直接在根节点添加引入axios模块，就不需要再一个个的去组件里面引入了
import axios from "axios";
// 原型挂载axios，通过this调用【缺点：不利于接口维护】
Vue.prototype.axios = axios;
// 调用方式
// this.$axios.get('请求路径')

// 全局定义过滤器，作用：将wh，替换成功对应的参数值
// replace用来替换字符串
Vue.filter('setWH', (url, arg) => {
  return url.replace(/w\.h/, arg)
})

// 全局注册 Scroller，便于各个组件使用
import Scroller from '@/components/Scroller/index.vue'
Vue.component('Scroller', Scroller)
// 全局注册 Loading，便于各个组件使用
import Loading from '@/components/Loading'
Vue.component('Loading', Loading)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
