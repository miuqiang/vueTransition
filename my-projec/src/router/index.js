import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/login',
            component: resolve => require(['@/views/Login'], resolve),
            name: '',
            hidden: true
        },
        {
            path: '/404',
            component: resolve => require(['@/views/404'], resolve),
            name: '',
            hidden: true
        },
        {
            path: '/',
            component: Home,
            name: '',
            iconCls: 'el-icon-menu',
            leaf: true,
            redirect:'/start',
            children: [
                { path: '/start', component: resolve => require(['@/components/Start'], resolve), name: '启动' }
            ]
        },
        {
            path: '/',
            component: Home,
            name: '',
            iconCls: 'el-icon-star-off',
            leaf: true,
            children: [
                { path: '/checkgateway', component: resolve => require(['@/components/GateCheck'], resolve), name: '网关检测' }
            ]
        },
        {
            path: '/',
            component: Home,
            name: '门锁检测',
            iconCls: 'el-icon-tickets',
            children: [
                { path: '/online_check', component: resolve => require(['@/components/Start'], resolve), name: '在线检测' },
                { path: '/check_pwd', component: resolve => require(['@/components/Start'], resolve), name: '密码校验' }
            ]
        },
        {
            path: '*',
            hidden: true,
            redirect: { path: '/404' }
        }
    ]
})
