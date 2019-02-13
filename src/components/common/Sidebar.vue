<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">
                                    {{ threeItem.title }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">
                                {{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '../common/bus';
    export default {
        data() {
            return {
                collapse: false,
                items: [
                    {
                        icon: 'el-icon-lx-home',
                        index: 'dashboard',
                        title: '工程管理',
                        subs: [
                            {
                                index: '/qqgl',
                                title: '前期管理'
                            },
                            {
                                index: '/zbgl',
                                title: '招标管理'
                            },
                            {
                                index: '/htgl',
                                title: '合同管理'
                            },
                            {
                                index: '/sggl',
                                title: '施工管理'
                            },
                            {
                                index: '/ysgl',
                                title: '验收管理'
                            },
                            {
                                index: '/jsgl',
                                title: '结算管理'
                            }
                            ]
                    },
                    {
                        icon: 'el-icon-lx-cascades',
                        index: 'table',
                        title: '系统管理',
                        subs:[
                            {
                                index: '/qxgl',
                                title: '权限管理'
                            },
                            {
                                //index:'/#',
                                title:'工作流管理',
                                subs:[
                                    {
                                        index:'/lxsp',
                                        title:'立项审批'
                                    },
                                    {
                                        index:'/zbsp',
                                        title:'招标审批'
                                    },
                                    {
                                        index:'/htsp',
                                        title:'合同审批'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-lx-calendar',
                        index: '3',
                        title: '统计报表',
                        subs: [
                            {
                                index: '/ndlxb',
                                title: '年度立项表'
                            },
                            // {
                            //     index: '3-2',
                            //     title: '三级菜单',
                            //     subs: [
                            //         {
                            //             index: 'editor',
                            //             title: '富文本编辑器'
                            //         },
                            //         {
                            //             index: 'markdown',
                            //             title: 'markdown编辑器'
                            //         },
                            //     ]
                            // },
                            // {
                            //     index: 'upload',
                            //     title: '文件上传'
                            // }
                        ]
                    },
                    {
                        icon: 'el-icon-lx-copy',
                        index: 'news',
                        title: '消息'
                    },
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 250px;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
