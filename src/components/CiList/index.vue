<template>
  <!-- <div id="content">
    <div class="cinema_menu">
      <div class="city_switch">
        全城 <i class="iconfont icon-lower-triangle"></i>
      </div>
      <div class="brand_swtich">
        品牌 <i class="iconfont icon-lower-triangle"></i>
      </div>
      <div class="feature_switch">
        特色 <i class="iconfont icon-lower-triangle"></i>
      </div>
    </div> -->
  <div class="cinema_body">
    <ul>
      <!-- <li>
        <div>
          <span>大地影院(澳东世纪店)</span>
          <span class="q"><span class="price">22.9</span> 元起</span>
        </div>
        <div class="address">
          <span>金州区大连经济技术开发区澳东世纪3层</span>
          <span>1763.5km</span>
        </div>
        <div class="card">
          <div>小吃</div>
          <div>折扣卡</div>
        </div>
      </li> -->
      <li v-for="item in cinemaList" :key="item.cinemaId">
        <div>
          <span style="margin-right: 10px;">{{ item.name }}</span>
          <span class="q"><span class="price">￥{{ item.lowPrice | filterLowPrice }}</span>
            元起</span
          >
        </div>
        <div class="address">
          <span>{{ item.address }}</span>
          <span>距离{{ item.Distance | filterDistance}}km</span>
        </div>
        <div class="card">
          <!-- <div>小吃</div>
          <div>折扣卡</div> -->

          <!--【注意：】
            vue中可以遍历对象，对象一般是为键值对的形式出现，比如：【数据结构如下】
            "cinemas": [
              "district": {
                "districtId": 110102,
                "name": "西城区"
              },
            ]
            在使用v-for循环时：包含两个参数，第一个参数为对象的值val，第二个参数为对象的键key，如下：【注意：遍历的是对象:cinemas.district】
            <li v-for="(val, key) in cinemas.district" :key="key">
              {{ val }}
            </li>
            val：表示对象的值；
            key：表示对象的键；
          -->
          <div>联系方式：{{ item.phone }}</div>
        </div>
      </li>
    </ul>
  </div>
  <!-- </div> -->
</template>

<script>
export default {
  name: "CiList",
  data() {
    return {
      cinemaList: [],
    };
  },
  // this.axios.get('url').then((res)=>{}) //这是标准的get写法
  // this.axios({}).then((res)=>{}) //这是携带请求头信息的写法
  mounted() {
    this.axios({
      method: "GET",
      url: "/gateway?cityId=110100&ticketFlag=1&k=8859004",
      headers: {
        "X-Client-Info":
          '{"a":"3000","ch":"1002","v":"5.2.1","e":"1688980404728701331308545","bc":"110100"}',
        "X-Host": "mall.film-ticket.cinema.list",
      },
    }).then((res) => {
      let msg = res.data.msg;
      if (msg === "ok") {
        console.log(res.data.data.cinemas);
        this.cinemaList = res.data.data.cinemas;
      }
    });
  },
  // computed:{ // 计算属性默认不能携带参数
  //   computedLowPrice(data){
  //     return data
  //   }
  // }
  filters: {
    // 过滤器携带当前参数
    filterLowPrice(data) {
      return data / 100;
    },
    filterDistance(data){
      return data.toString().substring(0, 4)
    }
  },
};
</script>

<style scoped>
#content .cinema_menu {
  width: 100%;
  height: 45px;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: white;
}

#content .cinema_body {
  flex: 1;
  overflow: auto;
}
.cinema_body ul {
  padding: 20px;
}
.cinema_body li {
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 20px;
}
.cinema_body div {
  margin-bottom: 10px;
}
.cinema_body .q {
  font-size: 6px;
  color: #f03d37;
}
.cinema_body .price {
  font-size: 18px;
}
.cinema_body .address {
  font-size: 13px;
  color: #666;
  display: flex;
  justify-content: space-between;
}
.cinema_body .address span:nth-of-type(1) {
  /* width: 260px; */
  /* background: red; */
  flex: 7;
}
.cinema_body .address span:nth-of-type(2) {
  /* float: right; */
  flex: 3;
  /* margin-left: 10px; */
  text-align: right;
}
.cinema_body .card {
  display: flex;
}
.cinema_body .card div {
  padding: 0 3px;
  height: 15px;
  line-height: 15px;
  border-radius: 2px;
  color: #f90;
  /* border: 1px solid #f90; */
  font-size: 13px;
  margin-right: 5px;
}
.cinema_body .card div.or {
  color: #f90;
  border: 1px solid #f90;
}
.cinema_body .card div.bl {
  color: #589daf;
  border: 1px solid #589daf;
}
</style>