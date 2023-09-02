<template>
  <div id="detailContainer" class="slide-enter-active">
    <Header title="影片详情">
      <i class="iconfont icon-right" @click="handleToBack"></i>
    </Header>
    <loading v-if="isLoading"></loading>
    <div id="content" class="contentDetail">
      <div class="detail_list">
        <div class="detail_list_bg"></div>
        <div class="detail_list_filter"></div>
        <div class="detail_list_content">
          <div class="detail_list_img">
            <img :src="detailMovie.poster" alt="" />
          </div>
          <div class="detail_list_info">
            <h2>{{ detailMovie.name }}</h2>
            <!-- <p>A Cool Fish</p> -->
            <p>评分：{{ detailMovie.grade }}分</p>
            <p>{{ detailMovie.category }}</p>
            <p>{{ detailMovie.nation }} / {{ detailMovie.runtime }}分钟</p>
            <p>{{ detailMovie.premiereAt | filterTime }}上映</p>
          </div>
        </div>
      </div>
      <div class="detail_intro">
        <p>{{ detailMovie.synopsis }}</p>
      </div>
      <div class="detail_player swiper-container" ref="detail_player">
        <ul class="swiper-wrapper">
          <!-- 因为这里没有Key属性，所以我们添加 index 索引值，作为 key 值 -->
          <li
            class="swiper-slide"
            v-for="(item, index) in detailMovie.photos"
            :key="index"
          >
            <div>
              <img :src="item" alt="" />
            </div>
            <p>剧照</p>
            <p>演员详情</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
// 使用moment进行格式转换
import moment from "moment";
export default {
  name: "Detail",
  components: {
    Header,
  },
  data() {
    // 在 vue 组件中即使没有任何参数也需要添加 return{} 返回值，如果不加上则当前组件的数据会变成全局可视，则造成变量污染。加上 return{} 则组件数据只能当前组件可视，不会影响到其他组件
    return {
      detailMovie: {},
      isLoading: true,
    };
  },
  // 接收路由传递过来的参数值
  props: ["movieId"],
  methods: {
    handleToBack() {
      // 返回上次进入的路由路径
      this.$router.back();
    },
  },
  mounted() {
    // console.log();
    // console.log(this.movieId);
    this.axios({
      mothed: "GET",
      url: `/gateway?filmId=${this.movieId}&k=5949621`,
      headers: {
        "X-Client-Info":
          '{"a":"3000","ch":"1002","v":"5.2.1","e":"16934030736237821522149377"}',
        "X-Host": "mall.film-ticket.film.info",
      },
    }).then((res) => {
      let msg = res.data.msg;
      if (msg === "ok") {
        console.log(res.data.data.film);
        this.detailMovie = res.data.data.film;
        this.isLoading = false;
        this.$nextTick(() => {
          new Swiper(this.$refs.detail_player, {
            slidesPerView: "auto",
            freeMode: true,
            freeModeSticky: true,
          });
        });
      }
    });
  },
  filters: {
    filterTime(data) {
      // 这里的api给的单位是毫秒，而我们需要的单位是秒，所以需要 * 1000
      return moment(parseInt(data * 1000)).format("YYYY-MM-DD");
    },
  },
};
</script>
 
<style scoped>
#detailContainer {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100;
  width: 100%;
  /* 设置最小高度 */
  min-height: 100%;
  background: white;
}
/* 设置跳转的过渡动画效果 */
#detailContainer.slide-enter-active {
  animation: 0.4s slideMove;
}
@keyframes slideMove {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}
/* 添加轮播图的样式 */
#content .detail_player .swiper-wrapper .swiper-slide > div {
  width: 85px;
  height: 55px;
  overflow: hidden;
}
#content .detail_player .swiper-wrapper .swiper-slide > div > img {
  width: 100%;
  height: 100%;
  /* 覆盖显示 */
  object-fit: cover;
}

#content.contentDetail {
  display: block;
  margin-bottom: 0;
}
#content .detail_list {
  height: 200px;
  width: 100%;
  position: relative;
  overflow: hidden;
}
.detail_list .detail_list_bg {
  width: 100%;
  height: 100%;
  background: url() 0 40%;
  filter: blur(20px);
  background-size: cover;
  position: absolute;
  left: 0;
  top: 0;
}
.detail_list .detail_list_filter {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #40454d;
  opacity: 0.55;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
}
.detail_list .detail_list_content {
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
}
.detail_list .detail_list_img {
  width: 108px;
  height: 150px;
  border: solid 1px #f0f2f3;
  margin: 20px;
}
.detail_list .detail_list_img img {
  width: 100%;
  height: 100%;
}
.detail_list .detail_list_info {
  margin-top: 20px;
}
.detail_list .detail_list_info h2 {
  font-size: 20px;
  color: white;
  font-weight: normal;
  line-height: 40px;
}
.detail_list .detail_list_info p {
  color: white;
  line-height: 20px;
  font-size: 14px;
  color: #ccc;
}
#content .detail_intro {
  padding: 10px;
}
#content .detail_player {
  margin: 20px;
}
.detail_player .swiper-slide {
  width: 70px;
  margin-right: 20px;
  text-align: center;
  font-size: 14px;
}
.detail_player .swiper-slide img {
  width: 100%;
  margin-bottom: 5px;
}
.detail_player .swiper-slide p:nth-of-type(2) {
  color: #999;
}
</style>