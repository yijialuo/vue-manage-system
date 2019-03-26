import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/qqgl',
                    component: resolve => require(['../components/page/qqgl.vue'], resolve),
                    meta: { title: '前期管理' }
                },
                {
                    path: '/zbgl',
                    component: resolve => require(['../components/page/zbgl.vue'], resolve),
                    meta: { title: '招标管理' }
                },
                {
                    path: '/htgl',
                    component: resolve => require(['../components/page/htgl.vue'], resolve),
                    meta: { title: '合同管理' }
                },
                {
                    path: '/sggl',
                    component: resolve => require(['../components/page/sggl.vue'], resolve),
                    meta: { title: '施工管理' }
                },
                {
                    path: '/ysgl',
                    component: resolve => require(['../components/page/ysgl.vue'], resolve),
                    meta: { title: '验收管理' }
                },
                {
                    path: '/jsgl',
                    component: resolve => require(['../components/page/jsgl.vue'], resolve),
                    meta: { title: '结算管理' }
                },
                {
                    path:'/gysgl',
                    component:resolve => require(['../components/page/gysgl.vue'], resolve),
                    meta:{title:'供应商管理'}
                },
                {
                    path: '/qxgl',
                    component: resolve => require(['../components/page/qxgl.vue'], resolve),
                    meta: { title: '权限管理' ,permission: true}
                },
                {
                    path: '/lxsp',
                    component: resolve => require(['../components/page/lxsp.vue'], resolve),
                    meta: { title: '立项审批' }
                },
                {
                    path: '/zbsp',
                    component: resolve => require(['../components/page/zbsp.vue'], resolve),
                    meta: { title: '招标审批' }
                },
                {
                    path: '/htsp',
                    component: resolve => require(['../components/page/htsp.vue'], resolve),
                    meta: { title: '合同审批' }
                },
                {
                    path: '/ndlxb',
                    component: resolve => require(['../components/page/ndlxb.vue'], resolve),
                    meta: { title: '年度立项表' }
                },
                {
                    path: '/dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/news',
                    component: resolve => require(['../components/page/News.vue'], resolve),
                    meta: { title: '消息' }
                },
                {
                    // 权限页面
                    path: '/account',
                    component: resolve => require(['../components/page/Account.vue'], resolve),
                    meta: { title: '账号管理', permission: true }
                },
                {
                    path: '/setting',
                    component: resolve => require(['../components/page/Setting.vue'], resolve),
                    meta: { title: '设置页面',permission:true }
                },
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
