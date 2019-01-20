<template>
    <div class="">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-copy"></i> 消息任务</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-tabs v-model="message">
                <el-tab-pane :label="`待办的任务(${Tasks.length})`" name="first">
                    <el-table :data="Tasks" :show-header="false" style="width: 100%">
                        <el-table-column>
                            <template slot-scope="scope">
                                <span class="message-title">{{scope.row.xmmc}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column width="120">
                            <template slot-scope="scope">
                                <el-button size="small" @click="lqrw(scope.$index)">领取任务</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="handle-row">
                        <el-button type="primary">全部标为已读</el-button>
                    </div>
                </el-tab-pane>
                <el-tab-pane :label="`受理的任务(${lqTasks.length})`" name="second">
                    <template v-if="message === 'second'">
                        <el-table :data="lqTasks" :show-header="false" style="width: 100%">
                            <el-table-column>
                                <template slot-scope="scope">
                                    <span class="message-title">{{scope.row.xmmc}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column width="120">
                                <template slot-scope="scope">
                                    <el-button  @click="bl(scope.$index)">办理</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="handle-row">
                            <el-button type="danger">删除全部</el-button>
                        </div>
                    </template>
                </el-tab-pane>
                <el-tab-pane :label="`回收站(${recycle.length})`" name="third">
                    <template v-if="message === 'third'">
                        <el-table :data="recycle" :show-header="false" style="width: 100%">
                            <el-table-column>
                                <template slot-scope="scope">
                                    <span class="message-title">{{scope.row.xmmc}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column width="120">
                                <template slot-scope="scope">
                                    <el-button @click="handleRestore(scope.$index)">还原</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="handle-row">
                            <el-button type="danger">清空回收站</el-button>
                        </div>
                    </template>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'tabs',
        created(){
            this.getTask()
        },
        data() {
            return {
                show_bl:false,
                ip: 'http://192.168.0.154:8080',
                message: 'first',
                showHeader: false,
                //组任务
                Tasks: [],
                //领取的任务
                lqTasks: [],
                recycle: []
            }
        },
        methods: {
            //领取任务
            lqrw(index){
                axios.get(this.ip+'/sqb/lqrw',{
                    params:{
                        userId:localStorage.getItem('userId'),
                        pi:this.Tasks[index].pi
                    }
                }).then(res=>{
                    if(res.data){
                        this.lqTasks.push()
                    }
                })
            },
            bl(){

            },
            //找用户组下的任务
            getTask(){
                axios.get(this.ip+'/sqb/getsq',{
                    params:{
                        userId:localStorage.getItem('userId')
                    }
                }).then(res=>{
                    this.Tasks=res.data
                    // for(let i=0;i<res.data.length;i++){
                    //     this.Tasks.push({
                    //         date:'2018-04-19 20:00:00',
                    //         xmmc:res.data[i].xmmc
                    //     })
                    // }
                })
            },
            handleRead(index) {

                const item = this.Tasks.splice(index, 1);
                console.log(item);
                this.lqTasks = item.concat(this.lqTasks);
            },
            handleDel(index) {
                const item = this.lqTasks.splice(index, 1);
                this.recycle = item.concat(this.recycle);
            },
            handleRestore(index) {
                const item = this.recycle.splice(index, 1);
                this.lqTasks = item.concat(this.lqTasks);
            }
        },
        computed: {
            TasksNum(){
                return this.Tasks.length;
            }
        }
    }

</script>

<style>
.message-title{
    cursor: pointer;
}
.handle-row{
    margin-top: 30px;
}
</style>

