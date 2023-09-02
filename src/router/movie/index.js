export default {
    path: '/movie',
    // 因为文件夹下默认引入的是index文件，所以可以省略不写index.vue，同样是引入index.vue
    component: () => import('@/views/Movie'),
    // 二级路由
    children: [
        {
            // 路径加 / 表示绝对路径，不加 / 则表示相对路径，相对于父级的路径，所以 path: 'city'  === path: '@/views/Movie/city'  
            path: 'city',
            // 懒加载写法，按需引入文件
            component: () => import('@/components/City')
        },
        {
            path: 'nowPlaying',
            component: () => import('@/components/NowPlaying')
        },
        {
            path: 'commingSoon',
            component: () => import('@/components/CommingSoon')
        },
        {
            path: 'search',
            component: () => import('@/components/Search')
        },
        // {
        //     path: 'detail',
        //     // 确保命名视图的正确性，components记得带上s
        //     components: {
        //         detail: () => import('@/views/Movie/detail')
        //     }
        // },
        // 这个路由是nowPlaying组件
        {
            // 动态路由
            name: 'MyDetail_1',
            path: 'detail/1/:movieId',
            components: {
                // 默认指向没有name的组件【可以作用于多个组件切换时的过渡效果，页面突然消失的问题，拥有默认指向的组件，在其他组件完全切换之前，就还是会显示默认指向的组件，让过渡不会显得那么生硬】
                default: ()=> import('@/components/NowPlaying'),
                detail: () => import('@/views/Movie/detail')
            },
            // 路由组件传参【 props 是设置为 Boolean 的数据类型】
            // 知识：当 props 设置为 true 时，route.params 将被设置为组件的 props。
            // 设置为true后，其他组件直接可以通过props接收路由传递过来的参数
            props: {
                detail: true
            }
        },
        // 这个路由是CommingSoon组件
        {
            name: 'MyDetail_2',
            path: 'detail/2/:movieId',
            components: {
                // 默认指向 CommingSoon
                default: ()=> import('@/components/CommingSoon'),
                detail: () => import('@/views/Movie/detail')
            },
            props: {
                detail: true
            }
        },
        {
            path: '/movie',
            // 路径重写
            redirect: '/movie/nowPlaying'
        },
    ]
}