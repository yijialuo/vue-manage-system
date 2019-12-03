import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
//import '../static/css/theme-green/index.css';       // 浅绿色主题
import './assets/css/icon.css';
import './components/common/directives';
import "babel-polyfill";
import './assets/css/custom.css'
import {Message} from 'element-ui';
import VCharts from 'v-charts'

Vue.use(VCharts)

Vue.config.productionTip = false
Vue.use(ElementUI, {
    size: 'small'
});
Vue.prototype.$axios = axios;

//请求拦截器 加token
axios.interceptors.request.use(
    config => {
        if (localStorage.getItem("token")) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.authorization = localStorage.getItem("token");
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// http response 响应拦截器

axios.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response) {
        switch (error.response.status) {
            // 返回401，清除localstorage信息并跳转到登录页面
            case 401:
                localStorage.removeItem('userId')
                localStorage.removeItem('token')
                localStorage.removeItem('passWord')
                localStorage.removeItem('groupId')
                localStorage.removeItem('groupName')
                localStorage.removeItem('userName')
                localStorage.removeItem('departmentName')
                localStorage.removeItem('departmentId')
                Message.error('身份验证信息失效，重新登录!');
                router.push('/login');
                break;
        }
        // 返回接口返回的错误信息
        return Promise.reject(error.response.data);
    }
});


//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    //没有token而且去的页面还不是登录页
    if (!token && to.path !== '/login') {
        next('/login');
    } else {
        next();
    }
})


//驳回样式
Vue.prototype.tableRowClassName = function ({row, rowIndex}) {
    if (row.comment.indexOf("驳回：") != -1) {
        return 'warning-row';
    }
    return '';
},

    //
    // Vue.prototype.hasqx = function (zjid) {
    //     console.log((localStorage.getItem("qxs") || "").split(",").indexOf(zjid) != -1)
    //     return (localStorage.getItem("qxs") || "").split(",").indexOf(zjid) != -1;
    // }



    Vue.prototype.equalsJs = function (groupIds, groupId) {
        return (groupIds || "").split(",").indexOf(groupId) != -1;
    }


new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
