<template>
  <div class="search_body">
    <div class="search_input">
      <div class="search_input_wrapper">
        <i class="iconfont icon-sousuo"></i>
        <input type="text" v-model="message" />
      </div>
    </div>
    <div class="search_result">
      <h3>电影/电视剧/综艺</h3>
      <ul>
        <li v-for="item in moviesList" :key="item.filmId">
          <div class="img"><img :src="item.poster" /></div>
          <div class="info">
            <p>
              <span>{{ item.name }}</span
              ><span>{{ item.grade }}</span>
            </p>
            <!-- <p>A Cool Fish</p> -->
            <p>
              主演：{{ item.actors[1].name }}
              {{ item.actors[2].name }}
              {{ item.actors[3].name }}
            </p>
            <p>类型：{{ item.category }}</p>
            <p>2018-11-16</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import moment from 'moment'
export default {
  // momentlocale('zh-cn'), // 设置成中文的时间
  name: "Search",
  data() {
    return {
      message: "",
      moviesList: [],
    };
  },
  // 函数防抖策略【目前看不懂，可以以后再慢慢理解】
  methods: {
    cancelRequest() {
      if (typeof this.source === "function") {
        this.source("终止请求");
      }
    },
  },
  watch: {
    // 注意：因为我们的接口和项目中的接口不一致，所以有些功能无法做到与教程中的一模一样
    message(newval) {
      var cityId = this.$store.state.city.id;
      var that = this;
      this.cancelRequest();
      // console.log(newval);
      this.axios(
        {
          method: "GET",
          url: `/gateway?cityId=${cityId}&pageNum=1&pageSize=10&type=1&k=5135879`,
          headers: {
            "X-Client-Info":
              '{"a":"3000","ch":"1002","v":"5.2.1","e":"1688980404728701331308545","bc":"110100"}',
            "X-Host": " mall.film-ticket.film.list",
          },
        },
        {
          cancelToken: new this.axios.CancelToken(function (c) {
            console.log("1111");
            that.source = c;
          }),
        }
      )
        .then((res) => {
          // console.log(res.data.data);
          let msg = res.data.msg;
          let films = res.data.data;
          // 这里的判断的作用就是，第一：数据请求成功；第二：有能够搜索的数据
          if (msg && films) {
            // console.log('成功');
            this.moviesList = res.data.data.films;
            // console.log('函数执行了1次');
            // 函数防抖策略：函数防抖中的抖动就是执行的意思，这种抖动一般都是持续的、多次的、频繁的执行某一段代码。函数防抖就是某函数持续多次执行，刚开始时不执行，当你结束后去执行，就是当持续触发事件的时候，函数是完全不执行的，等最后一次触发结束的一段时间之后，再去执行。在前端开发中经常会遇到这种频繁的事件触发，比如：window 的 scroll，mousemove ,mousehover事件
            // 【注意：我们这里的函数防抖策略并没有执行成功，以后再行学习】
          }
        })
        .catch((err) => {
          if (this.axios.isCancel(err)) {
            console.log("Rquest canceled", err.message); // 请求如果被取消，这里是返回的 message
          } else {
            // handle error
            console.log(err);
          }
        });
    },
  },
};
</script>

<style>
#content .search_body {
  flex: 1;
  overflow: auto;
}
.search_body .search_input {
  padding: 8px 10px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #e5e5e5;
}
.search_body .search_input_wrapper {
  padding: 0 10px;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  background-color: #fff;
  display: flex;
  line-height: 20px;
}
.search_body .search_input_wrapper i {
  font-size: 16px;
  padding: 4px 0;
}
.search_body .search_input_wrapper input {
  border: none;
  font-size: 13px;
  color: #333;
  padding: 4px 0;
  outline: none;
  margin-left: 5px;
  width: 100%;
}
.search_body .search_result h3 {
  font-size: 15px;
  color: #999;
  padding: 9px 15px;
  border-bottom: 1px solid #e6e6e6;
}
.search_body .search_result li {
  border-bottom: 1px #c9c9c9 dashed;
  padding: 10px 15px;
  box-sizing: border-box;
  display: flex;
}
.search_body .search_result .img {
  width: 60px;
  float: left;
}
.search_body .search_result .img img {
  width: 100%;
}
.search_body .search_result .info {
  float: left;
  margin-left: 15px;
  flex: 1;
}
.search_body .search_result .info p {
  height: 22px;
  display: flex;
  line-height: 22px;
  font-size: 12px;
}
.search_body .search_result .info p:nth-of-type(1) span:nth-of-type(1) {
  font-size: 18px;
  flex: 1;
}
.search_body .search_result .info p:nth-of-type(1) span:nth-of-type(2) {
  font-size: 16px;
  color: #fc7103;
}
</style>