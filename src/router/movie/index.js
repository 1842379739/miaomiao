export default {
    path: '/movie',
    // 因为文件夹下默认引入的是index文件，所以可以省略不写index.vue，同样是引入index.vue
    component:()=>import('@/views/Movie'),
    // 二级路由
    children:[
        {
            // 路径加 / 表示绝对路径，不加 / 则表示相对路径，相对于父级的路径，所以 path: 'city'  === path: '@/views/Movie/city'  
            path: 'city',
            // 懒加载写法，按需引入文件
            component:()=>import('@/components/City')
        },
        {
            path: 'nowPlaying',
            component:()=>import('@/components/NowPlaying')
        },
        {
            path: 'commingSoon',
            component:()=>import('@/components/CommingSoon')
        },
        {
            path: 'search',
            component:()=>import('@/components/Search')
        },
        {
            path: '/movie',
            // 路径重写
            redirect: '/movie/nowPlaying'
        },
    ]
}