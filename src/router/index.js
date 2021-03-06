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
                    path:'/xxmgl',
                    component:resolve => require(['../components/page/xxmgl.vue'], resolve),
                    meta:{title:'股份项目管理'}
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
                    meta: { title: '权限管理' }
                },
                {
                    path: '/operateManual',
                    component: resolve => require(['../components/page/operateManual.vue'], resolve),
                    meta: { title: '操作手册'}
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
                    path: '/xmssjdbb',
                    component: resolve => require(['../components/page/xmssjdbb.vue'], resolve),
                    meta: {title: '项目实施进度报表'}
                },
                {
                    path: '/xmtjbb',
                    component: resolve => require(['../components/page/xmtjbb.vue'], resolve),
                    meta: {title: '项目统计报表'}
                },
                {
                    path:'/xmcxbb',
                    component:resolve => require(['../components/page/xmcxbb.vue'], resolve),
                    meta:{title:'项目查询报表'}
                },
                {
                    path:'/txhtj',
                    component:resolve => require(['../components/page/txhtj.vue'], resolve),
                    meta:{title:'图形化统计'}
                },
                {
                    path: '/dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '系统首页' }
                },
                {
                    // 权限页面
                    path: '/account',
                    component: resolve => require(['../components/page/Account.vue'], resolve),
                    meta: { title: '账号管理'}
                },
                {
                    path: '/setting',
                    component: resolve => require(['../components/page/Setting.vue'], resolve),
                    meta: { title: '设置页面'}
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
