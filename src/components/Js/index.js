/*
    Vue.extend()实现 MessageBox 弹窗，可参考CSDN网址：
    https://blog.csdn.net/qq_40431896/article/details/121466800?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522169339561116800192244642%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=169339561116800192244642&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduend~default-3-121466800-null-null.142^v93^chatgptT3_2&utm_term=Vue.extend%28%29%E5%AE%9E%E7%8E%B0MessageBox%E5%BC%B9%E7%AA%97&spm=1018.2226.3001.4187
*/
import Vue from 'vue'
import MessageBox from './MessageBox/index.vue'

export var messageBox = (function () { // 默认值
    var defaults = {
        title: '',
        content: '',
        cancel: '',
        ok: '',
        handleCancel: null,
        handleOk: null
    }

    /*
        Vue中的 extend方法：
            --概述：使用基础 Vue 构造器创建一个 “子类”，其参数是一个包含 “组件选项” 的对象。【data选项是特例，在Vue.extend（）中，它必须是函数。】
            --作用：Vue.extend的作用是创建一个子类，所以可以创建一个子类，然后让它继承Vue身上的一些功能。
    */
    var MyComponent = Vue.extend(MessageBox)

    return function (opts) { // 配置参数
        // 这里的功能，将封住好的所有参数，全部转移到defaults中，作为局部数据来使用
        for (var attr in opts) {
            defaults[attr] = opts[attr]
        }

        var vm = new MyComponent({
            // template模板，会覆盖掉div元素，所以不用担心这个div元素会影响到页面的渲染
            // 详细解释可参考vue.js官方文档，vue2中的生命周期图示【关于template的解释】
            el: document.createElement('div'),
            data: {
                title: defaults.title,
                content: defaults.content,
                cancel: defaults.cancel,
                ok: defaults.ok
            },
            methods: {
                handleCancel() {
                    // 这里首先判断是否存在defaults.handleCancel，如果存在，则使用bind(this)，来获取vm这个对象（也就是父级元素的对象）
                    // defaults.handleCancel && defaults.handleCancel.bind(this) // bind更改指向之后，需要二次调用，才可以触发，所以我们替换成call 
                    defaults.handleCancel && defaults.handleCancel.call(this)
                    // 点击选择后，选出该弹窗
                    document.body.removeChild(vm.$el)
                },
                handleOk() {
                    // 与上同理
                    /*
                        call()函数介绍：
                            拥有多个参数：
                                第一个参数表示：想让this指向的对象（obj）
                                第二个以及后续的参数表示，传进去的参数
                        功能：
                            1. 让函数立即执行
                            2. 可以改变 this 的指向
                            3. 可以实现继承的问题
                    */
                    defaults.handleOk && defaults.handleOk.call(this)
                    // 与上同理
                    document.body.removeChild(vm.$el)
                }
            }
        })
        // 最后添加到body中
        document.body.appendChild(vm.$el)
    }
})()
// 注意格式 export var messageBox = (function () { ... })()