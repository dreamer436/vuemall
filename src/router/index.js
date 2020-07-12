import Vue from 'vue'
import VueRouter from 'vue-router'

//1.安装插件
Vue.use(VueRouter)

//2.创建路由对象
const router = new VueRouter({
    routes:[
        {
            path:'',
            redirect:'/home'
        },
        {
            path:'/home',
            component: () => import('views/home/Home'),
            meta:{
                title:'首页',
            }
        },
        {
            path:'/list',
            component: () => import('views/category/List'),
            meta:{
                title:'分类'
            }
        },
        {
            path:"/shoppingcar",
            component:() => import('views/shoppingcar/Car'),
            meta:{
              title:'购物车'
            }
        },
        {
            path:"/my",
            component:() => import('views/profile/My'),
            meta:{
              title:'我的'
            }
        },
        {
            path:"/detail/:iid",
            component:() => import('views/detail/Detail'),
            meta:{
              title:'详情页',
              
            }
        },
    ],
    mode:'history',

})

export default router