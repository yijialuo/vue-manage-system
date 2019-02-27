<template>
    <div>
        <div class="table">
            <div class="crumbs">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item><i class="el-icon-lx-cascades"></i>招标管理</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="container">
                <div class="handle-box">
                    <el-button type="primary" icon="el-icon-circle-plus" class="handle-del mr10"
                               @click="xjzblc">
                        新建招标流程
                    </el-button>
                </div>
            </div>
        </div>

        <!--添加供应商弹窗 -->
        <el-dialog title="新建招标流程" :visible.sync="show_xjzblc" width="50%">
            <el-form ref="form" label-width="100px">
                <el-form-item label="项目">
                    <el-select
                            v-model="zhaobiao.xmid"
                            filterable
                            remote
                            reserve-keyword
                            placeholder="请输入关键词"
                            :remote-method="remoteMethod"
                            :loading="loading">
                        <el-option
                                v-for="item in xms"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="技术要求">
                    <el-input v-model="zhaobiao.jsyq"  rows="6" type="textarea"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="show_xjzblc = false">取 消</el-button>
                <el-button type="primary" @click="ks">开 始</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'gzgl',
        data() {
            return {
                projectId:'',
                show_xjzblc: false,
                xms: [],
                loading: false,
                ip: 'http://localhost:8080',
                list:[],
                zhaobiao:{
                    id:'',
                    xmid:'',
                    jsyq:'',
                    sqr:localStorage.getItem('userId'),
                    zbpid:''
                }
            }
        },
        methods: {
            //开始
            ks(){
                axios.post(this.ip+'/zhaobiao/startZhaobiao',this.zhaobiao)
                    .then(res=>{
                        console.log(res.data)
                    })
            },
            //新建招标流程
            xjzblc(){
                this.getXms()
                this.show_xjzblc=true
            },
            //拿到项目下拉框数据
            getXms() {
                axios.get(this.ip + '/projectApplication/getAllXmIdAndXmname')
                    .then(res => {
                        this.list = res.data
                    })
            },
            remoteMethod(query) {
                if (query !== '') {
                    this.loading = true;
                    setTimeout(() => {
                        this.loading = false;
                        this.xms = this.list.filter(item => {
                            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
                        });
                    }, 200);
                } else {
                    this.xms = [];
                }
            }
        }
    }
</script>


<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 150px;
        display: inline-block;
    }

    .del-dialog-cnt {
        font-size: 16px;
        text-align: center
    }

    .table {
        width: 100%;
        font-size: 14px;
    }

    .red {
        color: #ff0000;
    }

    .mr10 {
        margin-right: 10px;
    }
</style>
