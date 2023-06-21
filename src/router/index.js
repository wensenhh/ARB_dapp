import { createRouter, createWebHashHistory } from 'vue-router'

//路由数组
const routes = [
    {
        path: "/",
        redirect: '/home'
    }, {
        path: "/home",
        name: "首页",
        redirect: '/home/index',
        component: () => import('../pages/home/homemain.vue'),
        meta: {
            keepAlive: true
        },
        children: [{
            path: "/home/index",
            name: "首页",
            component: () => import('../pages/home/index.vue'),
        },{
            path: "/pledge/detail",
            name: "质押记录",
            component: () => import('../pages/pledge/detail.vue'),
        },{
            path: "/home/wallet",
            name: "钱包",
            component: () => import('../pages/home/wallet.vue'),
        },{
            path: "/pledge/exchange",
            name: "兑换",
            component: () => import('../pages/pledge/exchange.vue'),
        },{
            path: "/home/myteam",
            name: "我的团队",
            component: () => import('../pages/home/myteam.vue'),
        },{
            path: "/home/sharetotal",
            name: "分红统计",
            component: () => import('../pages/home/sharetotal.vue'),
        },{
            path: "/pledge/withdraw",
            name: "提现",
            component: () => import('../pages/pledge/withdraw.vue'),
        },{
            path: "/home/noticeList",
            name: "公告列表",
            component: () => import('../pages/home/noticeList.vue'),
        },{
            path: "/home/noticeDetail",
            name: "公告详情",
            component: () => import('../pages/home/noticeDetail.vue'),
        }
        
       ]
    }
]

//路由对象
const router = createRouter({
    history: createWebHashHistory(),// process.env.BASE_URL
    routes //上面的路由数组
})

router.beforeEach((to, from, next) => {
    // 1. 每个条件执行后都要跟上 next() 或 使用路由跳转 api 否则页面就会停留一动不动
    // 2. 要合理的搭配条件语句，避免出现路由死循环。
    // const token = cookies.get('token')
    // if (to.meta.auth) {
    //     if (!token) {
    //         return router.replace({
    //             path: '/home'
    //         })
    //     }
    //     next()
    // } else {
    //     next()
    // }
    to.meta.keepAlive = true;
    next()
})

//导出路由对象，在main.js中引用
export default router