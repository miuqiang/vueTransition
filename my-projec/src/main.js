// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import * as custom from './util/filters';

Vue.use(ElementUI)

Object.keys(custom).forEach(key => {
    Vue.filter(key, custom[key])
})

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://dz.ickkey.com:8085/'
Vue.prototype.$http = axios

// 添加一个请求拦截器
axios.interceptors.request.use(
    config => {
        if (localStorage.getItem('token')) {
            config.headers.token =  localStorage.getItem('token');
        }
        return config;
    },
    err => {
        return Promise.reject(err);
});

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
        if (localStorage.getItem('token')) {
            next();
        }
        else {
            next({
                path: '/login',
                // query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    }
    else {
        next();
    }
})

/*
// 添加一个响应拦截器
axios.interceptors.response.use(function (response){
    // 处理响应数据

    return response;
    }, function (error){
    // 处理响应失败
    console.log(error.response)
    if(response.data.code === 501){
        //token失效，重新登录
        router.replace({path:'/login'});
    }
    return Promise.reject(error);
});
*/

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
