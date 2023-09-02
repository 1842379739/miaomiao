<template>
  <div id="main">
    <Header title="喵喵电影"></Header>
    <div id="content">
      <div class="movie_menu">
        <router-link tag="div" to="/movie/city" class="city_name">
          <span>{{ $store.state.city.name }}</span
          ><i class="iconfont icon-lower-triangle"></i>
        </router-link>
        <div class="hot_swtich">
          <router-link tag="div" to="/movie/nowPlaying" class="hot_item"
            >正在热映</router-link
          >
          <router-link tag="div" to="/movie/commingSoon" class="hot_item"
            >即将上映</router-link
          >
        </div>
        <router-link tag="div" to="/movie/search" class="search_entry">
          <i class="iconfont icon-sousuo"></i>
        </router-link>
      </div>
      <!-- 保留缓存处理 -->
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <Tabbar></Tabbar>
    <!-- 添加新的路由【同级路由 - 这是路由的命名视图】 -->
    <router-view name="detail" />
  </div>
</template>

<script>
import Header from "@/components/Header";
import Tabbar from "@/components/Tabbar";
import { messageBox } from "@/components/Js";
export default {
  // 加上组件的name属性，在浏览器的vue插件中，调试时，会出现你自定义的组件名，方便调试使用
  name: "Movie",
  components: {
    Header,
    Tabbar,
  },
  // data(){
  //   return{
  //     stateId: -1
  //   }
  // },
  mounted() {
    setTimeout(() => {
      this.axios({
        url: "/gateway?k=5217186",
        headers: {
          "X-Client-Info":
            '{"a":"3000","ch":"1002","v":"5.2.1","e":"1688980404728701331308545"}',
          "X-Host": "mall.film-ticket.city.locate",
        },
      }).then((res) => {
        let msg = res.data.msg;
        if (msg === "ok") {
          let name = res.data.data.city.name;
          let cityId = res.data.data.city.cityId;
          // 将获取到的字符串解析为对象【转换为number类型】
          let stateId = JSON.parse(this.$store.state.city.id);
          // console.log(typeof(stateId));
          // console.log(cityId);
          // console.log(typeof(JSON.parse(this.$store.state.city.id));

          // 判断，如果已经切换好城市后，就不需要加载弹窗
          if (stateId === cityId) return;

          messageBox({
            title: "当前定位：",
            content: name,
            cancel: "取消",
            ok: "切换定位",
            // 取消就直接删除元素即可
            // handleCancel: function name(params) {
            //   console.log("handleCancel");
            // },
            // 这是上述的函数的简写方式，省略function的写法
            handleOk() {
              // 这里切换城市的功能有两种，一种是切换Vuex,切换状态管理，一种是修改本地存储
              // console.log("handleOk");
              window.localStorage.setItem("nowName", name);
              window.localStorage.setItem("nowId", cityId);
              // 选择好城市以后，重新加载页面
              window.location.reload();
            },
          });
        }
      });
    }, 2000);

    // messageBox({
    //   title: '定位',
    //   content: "沈阳",
    //   cancel:'取消',
    //   ok: '切换定位',
    //   handleCancel: function name(params) {
    //     console.log('handleCancel');
    //   },
    //   // 这是上述的函数的简写方式，省略function的写法
    //   handleOk() {
    //     console.log('handleOk');
    //   },
    // })
  },
};
</script>

<style scoped>
#content .movie_menu {
  width: 100%;
  height: 45px;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  z-index: 10;
}
.movie_menu .city_name {
  margin-left: 20px;
  height: 100%;
  line-height: 45px;
}
.movie_menu .city_name.active {
  color: #ef4238;
  border-bottom: 2px #ef4238 solid;
}
/* router-link-active是vue自带的 选中 样式 */
.movie_menu .city_name.router-link-active {
  color: #ef4238;
  border-bottom: 2px #ef4238 solid;
}
.movie_menu .hot_swtich {
  display: flex;
  height: 100%;
  line-height: 45px;
}
.movie_menu .hot_item {
  font-size: 15px;
  color: #666;
  width: 80px;
  text-align: center;
  margin: 0 12px;
  font-weight: 700;
}
.movie_menu .hot_item.active {
  color: #ef4238;
  border-bottom: 2px #ef4238 solid;
}
/* router-link-active是vue自带的 选中 样式 */
.movie_menu .hot_item.router-link-active {
  color: #ef4238;
  border-bottom: 2px #ef4238 solid;
}
.movie_menu .search_entry {
  margin-right: 20px;
  height: 100%;
  line-height: 45px;
}
.movie_menu .search_entry.active {
  color: #ef4238;
  border-bottom: 2px #ef4238 solid;
}
/* router-link-active是vue自带的 选中 样式 */
.movie_menu .search_entry.router-link-active {
  color: #ef4238;
  border-bottom: 2px #ef4238 solid;
}
.movie_menu .search_entry i {
  font-size: 24px;
  color: red;
}
</style>