export default {
    path: '/mine',
    component:()=>import('@/views/Mine') // 因为文件夹下默认引入的是index文件，所以可以省略不写index.vue，同样是引入index.vue
}