<template>
  <header id="header">
    <!-- 利用插槽，返回detail组件的左上角的iconfont，小图标 -->
    <slot></slot>
    <h1>
      {{ title }}
    </h1>
  </header>
</template>

<script>
export default {
  // 加上组件的name属性，在浏览器的vue插件中，调试时，会出现你自定义的组件名，方便调试使用
  name: "Header",
  // 父子通信
  props: {
    title: {
      type: String,
      default: "喵喵影院",
    },
  },
};
</script>

<style scoped>
#header {
  width: 100%;
  height: 50px;
  color: #fff;
  background: #e54847;
  border-bottom: 1px solid #e54847;
  position: relative;
}
#header h1 {
  font-size: 18px;
  text-align: center;
  line-height: 50px;
  font-weight: normal;
}
#header i {
  position: absolute;
  left: 5px;
  top: 50%;
  margin-top: -13px;
  font-size: 26px;
}
</style>