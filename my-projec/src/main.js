// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

Vue.config.productionTip = false

axios.defaults.baseURL = '';
Vue.prototype.$http = axios


// 添加一个请求拦截器
axios.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});


// 添加一个响应拦截器
axios.interceptors.response.use(function (config) {
    return config;
}, function (error) {
    // Do something with request error
    console.log(error.response.data.message);
    return Promise.reject(error.response.data.message);
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
