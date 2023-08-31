## 喵喵电影项目源码及接口文档


### 接口文档
```
正在热映
http://39.97.33.178/api/movieOnInfoList?cityId=10

即将上映
http://39.97.33.178/api/movieComingList?cityId=10

搜索
http://39.97.33.178/api/searchList?cityId=10&kw=a

城市
http://39.97.33.178/api/cityList

电影详情
http://39.97.33.178/api/detailmovie?movieId=345808

影院
http://39.97.33.178/api/cinemaList?city=10

城市定位
http://39.97.33.178/api/getLocation
```
### 卖座电影接口
正在热映【城市统一为：北京】
https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=1&k=7406298
需要携带参数：
X-Client-Info: {"a":"3000","ch":"1002","v":"5.2.1","e":"1688980404728701331308545","bc":"110100"}
X-Host: mall.film-ticket.film.list

影院
https://m.maizuo.com/gateway?cityId=110100&ticketFlag=1&k=8209617
需要携带参数：
X-Client-Info: {"a":"3000","ch":"1002","v":"5.2.1","e":"1688980404728701331308545","bc":"110100"}
X-Host: mall.film-ticket.cinema.list

城市
https://m.maizuo.com/gateway?cityId=110100&ticketFlag=1&k=8209617
X-Client-Info: {"a":"3000","ch":"1002","v":"5.2.1","e":"1688980404728701331308545","bc":"110100"}
X-Host: mall.film-ticket.city.list

搜索地址
https://m.maizuo.com/gateway?cityId=110100&k=6480924
X-Client-Info: {"a":"3000","ch":"1002","v":"5.2.1","e":"1688980404728701331308545","bc":"110100"}
X-Host: mall.film-ticket.cinema.recommend

城市定位反馈
https://m.maizuo.com/gateway?k=5217186
X-Client-Info:  {"a":"3000","ch":"1002","v":"5.2.1","e":"1688980404728701331308545"}
X-Host: mall.film-ticket.city.locate