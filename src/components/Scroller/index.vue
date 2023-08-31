<template>
  <!-- Scroller 组件的功能是 渲染 better-scroll -->
  <div class="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroller",
  props: {
    // 父子通信，传递两个函数
    handleToScroll: {
      type: Function,
      default: function () {}, // 默认为空函数
    },
    handleToTouchEnd: {
      type: Function,
      default: function () {},
    },
  },
  mounted() {
    // this.$nextTick(() => {
    setTimeout(() => {
      // 设置延迟器，等待数据完成后，才使用better-scroll
      var scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        tap: true,
        // 触发滚动事件，可携带参数1，2，3【具体请查阅文档】
        probeType: 1,
        touchstart: true,
      });

      // 将局部变量(对象) 设置为 属性
      this.scroll = scroll;

      // 这里将参数传递，并且通过回调函数，调用props中的函数
      scroll.on("scroll", (pos) => {
        this.handleToScroll(pos);
      });

      scroll.on("touchEnd", (pos) => {
        this.handleToTouchEnd(pos);
      });
    }, 1200);
    // });
  },
  methods: {
    // 跳转拥有两个参数，分别是x、y轴的参数
    toScrollTop(y) {
      this.scroll.scrollTo(0, y);
      console.log("调用toScrollTop方法");
    },
  },
};
</script>

<style scoped>
.wrapper {
  height: 100%;
}
</style>