<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="hover" class="mgb20" style="height:252px;">
                    <div class="user-info">
                        <img src="../../assets/img/img.jpg" class="user-avator" alt="">
                        <div class="user-info-cont">
                            <div class="user-info-name">{{user.userName}}</div>
                        </div>
                    </div>
                    <div class="user-info-list">{{user.groupName}}<span>{{user.departmentName}}</span></div>
                </el-card>
                <el-card shadow="hover" style="height:252px;">
                    <div slot="header" class="clearfix">
                        <span>项目占比</span>
                    </div>
                    固定资产
                    <el-progress :percentage="71.3" color="#42b983"></el-progress>
                    维修
                    <el-progress :percentage="24.1" color="#f1e05a"></el-progress>
                    物资采购
                    <el-progress :percentage="30.7"></el-progress>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-lx-people grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">1234</div>
                                    <div>总项目</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-lx-notice grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">321</div>
                                    <div>已完结</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-lx-goods grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">500</div>
                                    <div>未完结</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-card shadow="hover" style="height:403px;">
                    <div slot="header" class="clearfix">
                        <span>我的项目</span>
                        <el-button style="float: right; padding: 3px 0" type="text" @click="show_xjsq=true">新建申请
                        </el-button>
                    </div>
                    <el-table :data="xmList" :show-header="false" height="304" style="width: 100%;font-size:14px;">
                        <el-table-column label="项目名称">
                            <template slot-scope="scope">
                                <div class="todo-item">{{scope.row.projectNam}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column label="申请时间">
                            <template slot-scope="scope">
                                <div class="todo-item">{{scope.row.applicationDte}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column width="130">
                            <template slot-scope="scope">
                                <el-button type="text" @click="zt(scope.row)" icon="el-icon-edit">状态</el-button>
                                <el-button type="text" @click="xq(scope.row)" icon="el-icon-edit">详情</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-card shadow="hover">
                    <schart ref="bar" class="schart" canvasId="bar" :data="data" type="bar" :options="options"></schart>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="hover">
                    <schart ref="line" class="schart" canvasId="line" :data="data" type="line"
                            :options="options2"></schart>
                </el-card>
            </el-col>
        </el-row>

        <el-dialog title="状态" :visible.sync="show_zt" width="70%">
            <img :src='src'/>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="show_zt=false">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 新建申请弹窗 -->
        <el-dialog title="申请项目" :visible.sync="show_xjsq" width="50%">
            <el-form ref="form" :model="sqb" label-width="100px">
                <el-form-item label="项目名称">
                    <el-input v-model="sqb.project_name"></el-input>
                </el-form-item>
                <el-form-item label="项目类别">
                    <el-select v-model="sqb.project_type" placeholder="请选择">
                        <el-option
                                v-for="item in xmlb"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="投资概算">
                    <el-input v-model="sqb.investment_establish"></el-input>
                </el-form-item>
                <el-form-item label="项目负责人">
                    <el-input v-model="sqb.person_in_charge"></el-input>
                </el-form-item>
                <el-form-item label="立项背景理由">
                    <el-input v-model="sqb.establish_reason" type="textarea"
                              placeholder="立项背景理由"
                              :autosize="{ minRows: 2, maxRows: 4}"
                    ></el-input>
                </el-form-item>
                <el-form-item label="立项内容规模">
                    <el-input v-model="sqb.scale" type="textarea"
                              placeholder="立项内容规模"
                              :autosize="{ minRows: 2, maxRows: 4}"
                    ></el-input>
                </el-form-item>
                <el-form-item label="投资概算说明">
                    <el-input v-model="sqb.illustration" type="textarea"
                              placeholder="投资概算说明"
                              :autosize="{ minRows: 2, maxRows: 4}"
                    ></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="show_xjsq = false">取 消</el-button>
                <el-button type="primary" @click="qdsq">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="项目详情" :visible.sync="show_xq" width="50%" center>
            <el-form label-width="100px">
                <el-form-item label="项目名称">
                    <el-input :disabled="true" v-model="xm.projectNam"></el-input>
                </el-form-item>
                <el-form-item label="申报部门">
                    <el-input :disabled="true" v-model="xm.declarationDep"></el-input>
                </el-form-item>
                <el-form-item label="项目类别">
                    <el-input :disabled="true" v-model="xm.projectType"></el-input>
                </el-form-item>
                <el-form-item label="投资概算">
                    <el-input :disabled="true" v-model="xm.investmentEstimate"></el-input>
                </el-form-item>
                <el-form-item label="项目负责人">
                    <el-input :disabled="true" v-model="xm.personInCharge"></el-input>
                </el-form-item>
                <el-form-item label="立项背景理由">
                    <el-input :disabled="true" v-model="xm.establishReason" type="textarea"
                              placeholder="立项背景理由"
                              :autosize="{ minRows: 2, maxRows: 4}"
                    ></el-input>
                </el-form-item>
                <el-form-item label="立项内容规模">
                    <el-input :disabled="true" v-model="xm.scale" type="textarea"
                              placeholder="立项内容规模"
                              :autosize="{ minRows: 2, maxRows: 4}"
                    ></el-input>
                </el-form-item>
                <el-form-item label="投资概算说明">
                    <el-input :disabled="true" v-model="xm.illustration" type="textarea"
                              placeholder="投资概算说明"
                              :autosize="{ minRows: 2, maxRows: 4}"
                    ></el-input>
                </el-form-item>
                <el-table
                        :data="commentList"
                        style="width: 100%">
                    <el-table-column
                            prop="time"
                            label="日期"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="usernam"
                            label="姓名"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="comment"
                            label="审批">
                    </el-table-column>
                </el-table>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="show_xq=false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import axios from 'axios';
    import Schart from 'vue-schart';
    import bus from '../common/bus';

    export default {
        name: 'dashboard',

        data() {
            return {
                src: '',
                show_xq:false,
                show_xjsq: false,
                show_zt: false,
                commentList:[],
                xm:{},
                ip: 'http://192.168.0.154:8080',
                xmlb: [{
                    value: '固定资产',
                    label: '固定资产'
                }, {
                    value: '维修',
                    label: '维修'
                }, {
                    value: '物资采购',
                    label: '物资采购'
                }],
                sqb: {//申请表
                    userId: localStorage.getItem('userId'), //用户id
                    project_name: "",  //项目名称
                    project_type: '',  //项目类型
                    person_in_charge: '', //     负责人
                    investment_establish: '',//     投资概算
                    establish_reason: '',//      立项理由
                    scale: '', //      内容规模
                    illustration: ''//         概要说明
                },
                user: {},
                //项目列表
                xmList: [],
                xmDetails: {},
                data: [{
                    name: '2018/09/04',
                    value: 1083
                },
                    {
                        name: '2018/09/05',
                        value: 941
                    },
                    {
                        name: '2018/09/06',
                        value: 1139
                    },
                    {
                        name: '2018/09/07',
                        value: 816
                    },
                    {
                        name: '2018/09/08',
                        value: 327
                    },
                    {
                        name: '2018/09/09',
                        value: 228
                    },
                    {
                        name: '2018/09/10',
                        value: 1065
                    }
                ],
                options: {
                    title: '最近七天每天的用户访问量',
                    showValue: false,
                    fillColor: 'rgb(45, 140, 240)',
                    bottomPadding: 30,
                    topPadding: 30
                },
                options2: {
                    title: '最近七天用户访问趋势',
                    fillColor: '#FC6FA1',
                    axisColor: '#008ACD',
                    contentColor: '#EEEEEE',
                    bgColor: '#F5F8FD',
                    bottomPadding: 30,
                    topPadding: 30
                }
            }
        },
        components: {
            Schart
        },
        computed: {
            role() {
                return this.user.groupName
            }
        },
        created() {
            this.handleListener();
            this.changeDate();
            this.getuser();
            this.getxmList();
        },

        activated() {
            this.handleListener();
        },
        deactivated() {
            window.removeEventListener('resize', this.renderChart);
            bus.$off('collapse', this.handleBus);
        },
        methods: {
            //得到该用户下的项目
            getxmList() {
                axios.get(this.ip + '/projectApplication/getallproject', {
                    params: {
                        userId: localStorage.getItem('userId')
                    }
                })
                    .then(res => {
                        console.log(res.data)
                        if (res.data) {
                           this.xmList=res.data;
                        }
                    })
            },
            //详情
            xq(row) {
                this.xm=row
                //领取评论
                    axios.get(this.ip + '/projectApplication/projecttocomment', {
                        params: {
                            pid: row.pid
                        }
                    })
                        .then(res => {
                            if (res.data) {
                                this.commentList = res.data
                                this.show_xq=true
                            }
                        })
                },
            //状态
            zt(row) {
                axios.get(this.ip + '/projectApplication/zt', {
                    params: {
                        pi: row.pid
                    }
                })
                    .then(res => {
                        //得到图片流
                        this.src = 'data:image/png;base64,' + res.data;
                        this.show_zt = true
                    })
            },

            //确定申请
            qdsq() {
                axios.post(this.ip + '/projectApplication/startapplication', this.sqb)
                    .then(res => {
                        if (res.data) {
                            console.log(res.data)
                            this.show_xjsq = false;
                            this.getxmList();
                            alert("已经开始申请流程，转到主管经理！")
                        }
                    })
            },
            getuser() {
                axios.get(this.ip + '/user/getuser', {
                    params: {
                        userId: localStorage.getItem('userId'),
                        passWord: localStorage.getItem('passWord')
                    }
                }).then(res => {
                    this.user = res.data;
                })
            },
            changeDate() {
                const now = new Date().getTime();
                this.data.forEach((item, index) => {
                    const date = new Date(now - (6 - index) * 86400000);
                    item.name = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
                })
            },
            handleListener() {
                bus.$on('collapse', this.handleBus);
                // 调用renderChart方法对图表进行重新渲染
                window.addEventListener('resize', this.renderChart)
            },
            handleBus(msg) {
                setTimeout(() => {
                    this.renderChart()
                }, 300);
            },
            renderChart() {
                this.$refs.bar.renderChart();
                this.$refs.line.renderChart();
            }
        }
    }

</script>


<style scoped>
    .el-row {
        margin-bottom: 20px;
    }

    .grid-content {
        display: flex;
        align-items: center;
        height: 100px;
    }

    .grid-cont-right {
        flex: 1;
        text-align: center;
        font-size: 14px;
        color: #999;
    }

    .grid-num {
        font-size: 30px;
        font-weight: bold;
    }

    .grid-con-icon {
        font-size: 50px;
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        color: #fff;
    }

    .grid-con-1 .grid-con-icon {
        background: rgb(45, 140, 240);
    }

    .grid-con-1 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-2 .grid-con-icon {
        background: rgb(100, 213, 114);
    }

    .grid-con-2 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-3 .grid-con-icon {
        background: rgb(242, 94, 67);
    }

    .grid-con-3 .grid-num {
        color: rgb(242, 94, 67);
    }

    .user-info {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        border-bottom: 2px solid #ccc;
        margin-bottom: 20px;
    }

    .user-avator {
        width: 120px;
        height: 120px;
        border-radius: 50%;
    }

    .user-info-cont {
        padding-left: 50px;
        flex: 1;
        font-size: 14px;
        color: #999;
    }

    .user-info-cont div:first-child {
        font-size: 30px;
        color: #222;
    }

    .user-info-list {
        font-size: 14px;
        color: #999;
        line-height: 25px;
    }

    .user-info-list span {
        margin-left: 70px;
    }

    .mgb20 {
        margin-bottom: 20px;
    }

    .todo-item {
        font-size: 14px;
    }

    .schart {
        width: 100%;
        height: 300px;
    }

</style>
