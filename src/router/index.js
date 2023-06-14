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
            path: "/home/nft",
            name: "NFT",
            component: () => import('../pages/home/nft.vue'),
        },{
            path: "/home/swap",
            name: "SWAP",
            component: () => import('../pages/home/swap.vue'),
        },{
            path: "/home/pool",
            name: "矿池",
            component: () => import('../pages/home/pool.vue'),
        },{
            path: "/home/asset",
            name: "资产",
            component: () => import('../pages/home/asset.vue'),
        },{
            path: "/home/invite",
            name: "邀请",
            component: () => import('../pages/home/invite.vue'),
        },{
            path: "/home/poolinfo",
            name: "矿池记录",
            component: () => import('../pages/home/poolinfo.vue'),
        },{
            path: "/home/myteam",
            name: "社区",
            component: () => import('../pages/home/myteam.vue'),
        }]
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