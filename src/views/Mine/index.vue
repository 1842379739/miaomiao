<template>
  <div id="main">
    <Header title="我的喵喵"></Header>
    <div id="conten">
      <!-- 渲染组件 -->
      <Login></Login>
    </div>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Tabbar from "@/components/Tabbar";
import Login from "@/components/Login";
export default {
  // 加上组件的name属性，在浏览器的vue插件中，调试时，会出现你自定义的组件名，方便调试使用
  name: "Mine",
  components: {
    Header,
    Tabbar,
    Login,
  },
};
</script>

<style>
</style>