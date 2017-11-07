import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Index',
            component: resolve => require(['@/components/Index'], resolve),
        },
        {
            path: '/detail',
            name: 'Detail',
            component: resolve => require(['@/components/Detail'], resolve),
            redirect: '/detail/foo',
            children: [
                { path: 'foo', component: resolve => require(['@/components/Foo'], resolve) },
                { path: 'bar', component: resolve => require(['@/components/Bar'], resolve) }
            ]
        }
    ]
})
