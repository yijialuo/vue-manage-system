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
                    path: '/icon',
                    component: resolve => require(['../components/page/Icon.vue'], resolve),
                    meta: { title: '自定义图标' }
                },
                {
                    path: '/table',
                    component: resolve => require(['../components/page/BaseTable.vue'], resolve),
                    meta: { title: '基础表格' }
                },
                {
                    path: '/news',
                    component: resolve => require(['../components/page/News.vue'], resolve),
                    meta: { title: '消息' }
                },
                {
                    path: '/form',
                    component: resolve => require(['../components/page/BaseForm.vue'], resolve),
                    meta: { title: '基本表单' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: resolve => require(['../components/page/VueEditor.vue'], resolve),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: resolve => require(['../components/page/Markdown.vue'], resolve),
                    meta: { title: 'markdown编辑器' }    
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve),
                    meta: { title: '文件上传' }   
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: resolve => require(['../components/page/BaseCharts.vue'], resolve),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: resolve => require(['../components/page/DragList.vue'], resolve),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: resolve => require(['../components/page/DragDialog.vue'], resolve),
                    meta: { title: '拖拽弹框' }
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
                {
                    path: '/403',
                    component: resolve => require(['../components/page/403.vue'], resolve),
                    meta: { title: '403' }
                }
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
