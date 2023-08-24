<template>
  <div class="movie_body">
    <ul>
      <li v-for="item in commingList" :key="item.filmId">
        <div class="pic_show"><img :src="item.poster" alt="" /></div>
        <div class="info_list">
          <h2>{{item.name}}</h2>
          <p>
            主演：
            {{ item.actors[1].name }} 
            {{ item.actors[2].name }} 
            {{ item.actors[3].name }}
          </p>
          <p>{{ item.nation }} | {{ item.runtime }}分钟</p>
          <p>类型：<span class="grade">{{ item.category }}</span></p>
        </div>
        <div class="btn_mall">购票</div>
      </li>
    </ul>
  </div>
</template>

<script>
import vue from 'vue';
export default {
  name: "CommingSoon",
  data(){
    return {
      commingList: []
    }
  },
  mounted(){
    this.axios({
      method: "GET",
      url: "/gateway?cityId=110100&pageNum=1&pageSize=10&type=2&k=8273581",
      headers: {
        "X-Client-Info":
          '{"a":"3000","ch":"1002","v":"5.2.1","e":"1688980404728701331308545","bc":"110100"}',
        "X-Host": "mall.film-ticket.film.list",
      },
    }).then((res) => {
      console.log(res.data.data.films);
      var msg = res.data.msg
      if(msg === 'ok'){
        // console.log('成功');
        this.commingList = res.data.data.films
      }
    });
  }
};
</script>

<style scoped>
#content .movie_body{ flex:1; overflow:auto;}
.movie_body ul{ margin:0 12px; overflow: hidden;}
.movie_body ul li{ margin-top:12px; display: flex; align-items:center; border-bottom: 1px #e6e6e6 solid; padding-bottom: 10px;}
.movie_body .pic_show{ width:64px; height: 90px;}
.movie_body .pic_show img{ width:100%;}
.movie_body .info_list { margin-left: 10px; flex:1; position: relative;}
.movie_body .info_list h2{ font-size: 17px; line-height: 24px; width:150px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list p{ font-size: 13px; color:#666; line-height: 22px; width:200px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list .grade{ font-weight: 700; color: #faaf00; font-size: 15px;}
.movie_body .info_list img{ width:50px; position: absolute; right:10px; top: 5px;}
.movie_body .btn_mall , .movie_body .btn_pre{ width:47px; height:27px; line-height: 28px; text-align: center; background-color: #f03d37; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;}
.movie_body .btn_pre{ background-color: #3c9fe6;}
</style>