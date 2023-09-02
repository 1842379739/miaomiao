<template>
  <div class="movie_body" ref="movie_body">
    <Loading v-if="isLoading" />
    <!-- 通过父子通信，传递两个函数 -->
    <Scroller
      :handleToScroll="handleToScroll"
      :handleToTouchEnd="handleToTouchEnd"
      :flag="false"
    >
      <ul>
        <li class="pullDownMsg">{{ pullDownMsg }}</li>
        <li v-for="item in movieList" :key="item.filmId">
          <div class="pic_show" @click="handleToDetail(item.filmId)">
            <img :src="item.poster" alt="" />
          </div>
          <div class="info_list">
            <h2 @click="handleToDetail(item.filmId)">{{ item.name }}</h2>
            <p>
              观众评<span class="grade">{{ item.grade }}</span>
            </p>
            <p>主演：{{ item.actors | filterActors }}</p>
            <p>{{ item.nation }} | {{ item.runtime }}分钟</p>
          </div>
          <div class="btn_mall">购票</div>
        </li>
      </ul>
    </Scroller>
  </div>
</template>

<script>
// import { computed } from 'vue';
// import BScroll from "better-scroll";

export default {
  name: "Nowplaying",
  data() {
    return {
      movieList: [],
      pullDownMsg: "",
      isLoading: true,
      prevCityId: -1, // 定义变量，保存之前的城市 ID
      flag: false,
    };
  },
  mounted() {
    console.log("111");
  },
  // 需求：我们在走缓存的时候，不会发起ajax，但是切换城市的时候，就要发起ajax，所以我们这里定义一个变量，用来存储城市的id，然后判断 与之前的城市id是否相同，如果相同，则不会继续向下执行，否则，就发起ajax

  // 注意：当我们使用缓存的信息时，是不会触发mounted生命周期的，因为mounted是节点数据更新完成后，进行触发，而缓存不会进行数据更新
  // 补充：生命周期：activated -- 若组件实例是 <KeepAlive> 缓存树的一部分，当组件被插入到 DOM 中时调用。【也就是走缓存的信息时，调用 activated】
  activated() {
    // 然后这里获取当前的城市ID，与之前的进行比较
    var cityId = this.$store.state.city.id;
    // 如果前后城市的ID相同，则结束activeted生命周期，否则就继续执行后续代码，启动加载图标，发起ajax请求
    if (this.prevCityId === cityId) {
      return;
    }

    // 前后城市的ID不同，重新发起ajax请求
    this.isLoading = true;

    // console.log("走缓存，依然刷新，再次更新数据！");
    this.axios({
      // method: "GET",
      // 需要注意的是，这里的城市id，使我们动态获取的变量
      url: `/gateway?cityId=${cityId}&pageNum=1&pageSize=10&type=1&k=7406298`,
      headers: {
        "X-Client-Info":
          '{"a":"3000","ch":"1002","v":"5.2.1","e":"1688980404728701331308545","bc":"110100"}',
        "X-Host": "mall.film-ticket.film.list",
      },
    }).then((res) => {
      console.log(res.data.data.films);
      // for(let i=0; i<res.data.data.films.length; i++){
      //   // console.log(i);
      //   console.log(res.data.data.films[i].actors[i+1]);

      // }
      var msg = res.data.msg;
      if (msg === "ok") {
        // console.log('成功');
        this.movieList = res.data.data.films;
        // 将加载图标设置为false，就可以消失
        this.isLoading = false;
        // 修改当前城市ID值，替换之前的城市ID值【方便下次id值，进行比较】
        this.prevCityId = cityId;
        this.flag = true;

        // nextTick 方法是 Vue.js 提供的一个异步更新队列的工具。它可以将回调函数推迟到下次 DOM 更新循环之后执行，这样可以确保在更新 DOM 之后再进行一些操作。

        // this.$nextTick(() => {
        //   // better-scroll：具有两个参数，第一个是包裹内容的父容器，第二个是 better-scroll 的配置信息
        //   // console.log("nextTick");
        //   var scroll = new BScroll(this.$refs.movie_body, {
        //     click: true,
        //     tap: true,
        //     // 触发滚动事件，可携带参数1，2，3【具体请查阅文档】
        //     probeType: 1,
        //   });
        //   // 当滚动的时候，触发scroll事件【scroll：滚动事件】【例如：下拉刷新功能】
        //   scroll.on("scroll", (pos) => {
        //     // pos是接收一个参数，如果是x，表示x轴的当前位置，如果是y，则是y轴的当前位置
        //     if (pos.y > 30) {
        //       this.pullDownMsg = "刷新中…";
        //     }
        //     // console.log("scroll");
        //   });
        //   // 当滚动结束的时候，触发touchEnd事件【touchEnd：滚动结束事件】
        //   scroll.on("touchEnd", (pos) => {
        //     if (pos.y > 30) {
        //       this.axios({
        //         url: "/gateway?cityId=110100&pageNum=1&pageSize=10&type=2&k=8273581",
        //         headers: {
        //           "X-Client-Info":
        //             '{"a":"3000","ch":"1002","v":"5.2.1","e":"1688980404728701331308545","bc":"110100"}',
        //           "X-Host": "mall.film-ticket.film.list",
        //         },
        //       }).then((res) => {
        //         var msg = res.data.msg;
        //         if (msg === "ok") {
        //           this.pullDownMsg = "刷新成功";
        //           // 特意将数据延迟 1s 后发送
        //           setTimeout(()=>{
        //             this.movieList = res.data.data.films
        //             this.pullDownMsg = ''
        //           },1000)
        //         }
        //       });

        //     }
        //     // console.log("touchend");
        //   });
        // });
      }
    });
  },
  methods: {
    // 错误日志：通过路由跳转页面正常，但是控制台报错：http://localhost:8080/movie/nowPlaying 404 (Not Found)
    handleToDetail(movieId) {
      // 路由跳转，name指定跳转路径，params指定携带参数
      // this.$router.push({
      //   name: "MyDetail",
      //   params: {
      //     movieId,
      //   },
      // });

      // 1. 通过路径跳转
      // this.$router.push(`detail/1/${movieId}`)
      // 2. 携带参数跳转
      this.$router.push({
        name: "MyDetail_1",
        params: {
          movieId,
        },
      });
      // 3. 携带参数并与地址相拼接
      // this.$router.push('detail/1/' + movieId)
    },
    handleToScroll(pos) {
      if (pos.y > 30) {
        this.pullDownMsg = "刷新中…";
      }
    },
    handleToTouchEnd(pos) {
      if (pos.y > 30) {
        this.axios({
          url: "/gateway?cityId=110100&pageNum=1&pageSize=10&type=2&k=8273581",
          headers: {
            "X-Client-Info":
              '{"a":"3000","ch":"1002","v":"5.2.1","e":"1688980404728701331308545","bc":"110100"}',
            "X-Host": "mall.film-ticket.film.list",
          },
        }).then((res) => {
          var msg = res.data.msg;
          if (msg === "ok") {
            console.log("数据回调成功");
            this.pullDownMsg = "刷新成功";
            // 特意将数据延迟 1s 后发送
            setTimeout(() => {
              this.pullDownMsg = "";
              this.movieList = res.data.data.films;
            }, 800);
          }
        });
      }
    },
  },
  filters: {
    filterActors(data) {
      // console.log(data)
      // slice:是截取用的【不会改变原数组】
      // splice:是做删除 插入用的【会改变原数组】
      // map：不会改变原始数组，对满足条件的list，映射到一个新的数组中
      // 该代码的功能：将元素下标从1开始到最后的元素，全部截取，利用map映射出所需要的项，赋值给str
      let str = data.map((item) => item.name).slice(1);
      // join()：数组中的所有元素转换一个字符串。【元素可以通过指定的分隔符进行分隔的。】
      return str.join("，");
    },
  },
};
</script>

<style scoped>
#content .movie_body {
  flex: 1;
  overflow: auto;
}
.movie_body ul {
  margin: 0 12px;
  overflow: hidden;
}
.movie_body ul li {
  margin-top: 12px;
  display: flex;
  align-items: center;
  border-bottom: 1px #e6e6e6 solid;
  padding-bottom: 10px;
}
.movie_body .pic_show {
  width: 64px;
  height: 90px;
}
.movie_body .pic_show img {
  width: 100%;
}
.movie_body .info_list {
  margin-left: 10px;
  flex: 1;
  position: relative;
}
.movie_body .info_list h2 {
  font-size: 17px;
  line-height: 24px;
  width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie_body .info_list p {
  font-size: 13px;
  color: #666;
  line-height: 22px;
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie_body .info_list .grade {
  font-weight: 700;
  color: #faaf00;
  font-size: 15px;
}
.movie_body .info_list img {
  width: 50px;
  position: absolute;
  right: 10px;
  top: 5px;
}
.movie_body .btn_mall,
.movie_body .btn_pre {
  width: 47px;
  height: 27px;
  line-height: 28px;
  text-align: center;
  background-color: #f03d37;
  color: #fff;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}
.movie_body .btn_pre {
  background-color: #3c9fe6;
}
.movie_body .pullDownMsg {
  margin: 0;
  padding: 0;
  border: none;
  display: flex;
  justify-content: center;
}
</style>