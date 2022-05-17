import Vue from 'vue'


import home from '../../src/pages/home/home'

import login from '../../src/pages/login/login'
import Router from 'vue-router'
Vue.use(Router)
const router = new Router({
    routes: [
        { path: '/', redirect: '/login' },
        { path: '/login', component: login,
            meta: {
                title: '',
                auth: true
            }
        },
        // { path: '/aside', component: MyAside },
        { path: '/home', component: home,},


        // { path: '/aside', component: MyAside },
        // { path: '/header', component: MyHeader },
        /*{
            path: '/home',
            redirect: '/home/users',
            component: MyHome,
            children: [
                { path: 'users', component: MyUsers },
                { path: 'rights', component: MyRights },
                { path: 'goods', component: MyGoods },
                { path: 'orders', component: MyOrders },
                { path: 'settings', component: MySettings },
                { path: 'userinfo/:id', component: MyUserDetail, props: true }
            ]
        }*/
    ]
})

// 导出路由
export default router
