<template>
  <div class="city_body">
    <div class="city_list">
      <div class="city_hot">
        <h2>热门城市</h2>
        <ul class="clearfix">
          <li v-for="item in hotList" :key="item.id">
            {{ item.name }}
          </li>
        </ul>
      </div>
      <div class="city_sort" ref="city_sort">
        <!-- 注意：这里的item代表的是cityList的每一项【包括 index 和 list】 -->
        <div v-for="item in cityList" :key="item.index">
          <h2>{{ item.index }}</h2>
          <ul>
            <!-- 而这里的 item.list，则表示每一个城市 list：{name, id}-->
            <li v-for="itemList in item.list" :key="itemList.id">
              {{ itemList.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="city_index">
      <ul>
        <!-- @touchstart 是一个 JavaScript 事件，它在用户触摸设备的屏幕时触发。它主要用于响应触摸开始时的操作。 -->
        <li v-for="(item, index) in cityList" :key="item.index" @touchstart="handleToIndex(index)">
          {{ item.index }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
export default {
  name: "City",
  data() {
    return {
      cityList: [],
      hotList: [],
    };
  },
  mounted() {
    // 本地文件不可用，后期使用线上api
    // axios('public/libs/city_list.json').then((res)=>{
    //   console.log(res.data)
    // })

    // 获取 城市 地址
    this.axios({
      method: "GET",
      url: "/gateway?cityId=110100&ticketFlag=1&k=8209617",
      headers: {
        "X-Client-Info":
          '{"a":"3000","ch":"1002","v":"5.2.1","e":"1688980404728701331308545","bc":"110100"}',
        "X-Host": "mall.film-ticket.city.list",
      },
    }).then((res) => {
      // console.log(res.data.msg)
      let msg = res.data.msg;
      if (msg === "ok") {
        let cities = res.data.data.cities;
        // 将得到的数据，整理成如下数据类型
        // [
        //   {
        //     index: 'A',
        //     list: [
        //       {
        //         name: '阿城',
        //         id: 123
        //       }
        //     ]
        //   }
        // ]
        // console.log(cities);
        // 调用函数 【进行数据格式化】
        // 定义一个对象，里面两个属性，cityList, hotList，刚好存在于函数返回值的大对象中的两个属性
        var { cityList, hotList } = this.formatCityList(cities);
        // 将拿到的值，赋值给状态
        this.cityList = cityList;
        this.hotList = hotList;
      }
      // console.log(res.data.data.cities)
      // 循环遍历出所有的城市数据
      // for(let v in res.data.data.cities){
      //   console.log(res.data.data.cities[v].name)
      // }
    });

    // 测试影院地址
    // axios({
    //   method: "GET",
    //   url:"/tao?cityId=110100&ticketFlag=1&k=8209617",
    //   headers:{
    //     'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"1688980404728701331308545","bc":"110100"}',
    //     'X-Host': 'mall.film-ticket.cinema.list'
    //   }
    // }).then((res)=>{
    //   // console.log(res)
    //   console.log(res.data)
    // })

    // axios({
    //   method: 'GET',
    //   url: 'https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=1&k=7406298',
    //   headers: {
    //     'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"1688980404728701331308545","bc":"110100"}',
    //     'X-Host': 'mall.film-ticket.film.list'
    //   }
    // }).then((res) => {
    //   // console.log(res.data.data.film)
    //   console.log(res.data.data.films)
    // })
  },
  methods: {
    // 做一个数据处理的方法
    formatCityList(cities) {
      var cityList = [];
      var hotList = [];

      for (var i = 0; i < cities.length; i++) {
        // 首先找出每个城市的拼音首字母
        // substring() 方法用于提取字符串中介于两个指定下标之间的字符。
        var firstLetter = cities[i].pinyin.substring(0, 1).toUpperCase();

        // 判断调用函数，拿到函数返回值，
        if (toCom(firstLetter)) {
          // 判断为真，说明数组中，没有该数组，所以添加到该数组中
          // 新添加 index
          // 注意这里的数据结构，一个大对象里有两个属性，一个是index，一个是list，而list是一个数组，每一个数组中，包含两个元素，分别是 name, id
          cityList.push({
            index: firstLetter,
            list: [
              {
                name: cities[i].name,
                id: cities[i].cityId,
              },
            ],
          });
        } else {
          // 判断为假，说明已经存在，添加到已有的数组中
          // 累加到已有 index 中
          for (var j = 0; j < cityList.length; j++) {
            // 判断：如果相同，表示找到相同字母的数组对象中
            if (cityList[j].index === firstLetter) {
              cityList[j].list.push({
                name: cities[i].name,
                id: cities[i].cityId,
              });
            }
          }
        }
      }

      // 字母判断函数 【两个字母进行比较】
      function toCom(firstLetter) {
        for (var i = 0; i < cityList.length; i++) {
          if (cityList[i].index === firstLetter) {
            return false;
          }
        }
        return true;
      }

      // 按照字母顺序排序【判断两个首字母的大小】
      // sort() 方法用于对数组的元素进行排序
      // sort() 携带两个参数，如果返回值大于 0，则位置互换。如果返回值小于 0，则位置不变。
      cityList.sort((n1, n2) => {
        if (n1.index > n2.index) {
          return 1;
        } else if (n1.index < n2.index) {
          return -1;
        } else {
          return 0;
        }
      });

      // 整理 hotList 的数据，进行格式化
      for (var i = 0; i < cities.length; i++) {
        if (cities[i].isHot === 1) {
          hotList.push(cities[i]);
        }
      }

      console.log(cityList);
      // console.log(hotList);
      // 最后将格式化后的数据，通过函数返回出去【返回一个对象出去】
      return {
        cityList,
        hotList,
      };
    },
    handleToIndex(index){
      // 触发屏幕响应的事件后，获取对应的首字母列表
      var h2 = this.$refs.city_sort.getElementsByTagName('h2')
      // console.log(h2[index].offsetTop);
      // h2[index].offsetTop 表示该元素的当前高度
      // parentNode可以获取某个属性的元素的父节点。
      // 注意，parentNode返回的是一个原生的DOM对象，而不是Vue实例。这意味着你无法通过parentNode直接访问到Vue实例中定义的属性或方法。如果需要在组件中访问父组件的属性或方法，可以使用$parent属性来获取父组件的实例。
      // console.log(this.$refs.city_sort.parentNode);
      // 此句代码的功能就是：将当前选中的元素的浏览器高度赋值给当前元素的父节点
      this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop
    }
  },
};
</script>

<style>
#content .city_body {
  margin-top: 45px;
  display: flex;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
}
.city_body .city_list {
  flex: 1;
  overflow: auto;
  background: #fff5f0;
}
.city_body .city_list::-webkit-scrollbar {
  background-color: transparent;
  width: 0;
}
.city_body .city_hot {
  margin-top: 20px;
}
.city_body .city_hot h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}
.city_body .city_hot ul li {
  float: left;
  background: #fff;
  width: 29%;
  height: 33px;
  margin-top: 15px;
  margin-left: 3%;
  padding: 0 4px;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
  line-height: 33px;
  text-align: center;
  box-sizing: border-box;
}
.city_body .city_sort div {
  margin-top: 20px;
}
.city_body .city_sort h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}
.city_body .city_sort ul {
  padding-left: 10px;
  margin-top: 10px;
}
.city_body .city_sort ul li {
  line-height: 30px;
  line-height: 30px;
}
.city_body .city_index {
  width: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  border-left: 1px #e6e6e6 solid;
}
</style>