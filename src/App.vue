<!--
    $ git merge createComponents --no-ff
    表示合并分支 
    --no-ff 这个参数表示记录一下该分支提交的 “历史记录”
    不加这个参数，就只能记录最后一次的提交记录

    git常用命令：
    $ git checkout -b setData // 创建分支并且切换到该分支 【setData】
    $ git branch // 查看分支
    $ git status // 查看当前状态【例如：修改文件】


-->
<template>
    <!-- 缓存处理 -->
    <keep-alive>
        <router-view/>
    </keep-alive>
</template>

