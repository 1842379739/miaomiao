<!--
    $ git merge createComponents --no-ff
    表示合并分支 
    --no-ff 这个参数表示记录一下该分支提交的 “历史记录”
    不加这个参数，就只能记录最后一次的提交记录

    git常用命令：
    $ git checkout -b setData // 创建分支并且切换到该分支 【setData】
    $ git branch // 查看分支
    $ git status // 查看当前状态【例如：修改文件】


    touchstart事件：是在用户触摸设备屏幕时触发的事件。它可以用于检测用户触摸屏幕的起始点，并执行相应的操作。【在触摸屏幕或者点击的时候触发该事件】

    关于 “tap” 事件：它是指在移动设备上，用户用手指轻触（或点击）屏幕时触发的一种交互事件。当用户在屏幕上轻触时，设备会检测到这个动作，并将其转化为相应的"tap事件"。

    千峰老师：
    监听触摸屏幕和点击事件：
    touchstart

    滚动条滑动：
    tap：zepto vue-touch better-scroll
    better-scroll 是对 iscroll 的二次封装

    better-scroll的触发原理：
    首先需要满足几个条件：
    1. 数据内容的长度，必须大于容器的长度
    2. 数据渲染完毕后，再触发better-scroll，才会正常的生效

    zepto.js框架：简单来说 zepto 是一个轻量级的针对现代高级浏览器的 JavaScript 库， 它与 jquery 有着类似的 api，可以理解为 jquery 的精简版
    click和tap：
    相同点：
        click是js自带库的点击事件
        tap的 zepto.js 库的自带点击事件
    区别：
        click 在 pc 和移动端都可以使用
        而 tap 只能在移动端使用
        但是在移动端中，click 会有 200-300ms 的延时     
-->
<template>
  <!-- 缓存处理 -->
  <keep-alive>
    <router-view />
  </keep-alive>
</template>