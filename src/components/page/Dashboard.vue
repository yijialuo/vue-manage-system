<template>
    <div style="width: 100%;height: 100%">
        <div>
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-card shadow="hover" class="mgb20" style="height:252px;">
                        <div class="user-info">
                            <div class="user-info-cont">
                                <div class="user-info-name" style="margin-top: 30px">{{user.userName}}</div>
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
                                        <div class="grid-num">{{allNum}}</div>
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
                                        <div class="grid-num">{{doNum}}</div>
                                        <div>已处理</div>
                                    </div>
                                </div>
                            </el-card>
                        </el-col>
                        <el-col :span="8">
                            <el-card shadow="hover" :body-style="{padding: '0px'}">
                                <div class="grid-content grid-con-3">
                                    <i class="el-icon-lx-goods grid-con-icon"></i>
                                    <div class="grid-cont-right">
                                        <div class="grid-num">{{unDoNum}}</div>
                                        <div>未处理</div>
                                    </div>
                                </div>
                            </el-card>
                        </el-col>
                    </el-row>
                    <el-card shadow="hover" style="height:403px;">
                        <div slot="header" class="clearfix">
                            <span>我的消息</span>
                            <el-button style="float: right; padding: 3px 0"
                                       v-show="user.groupName=='办事员'||user.groupName=='技术部办事员'" type="text"
                                       @click="show_xjsq=true">新建申请
                            </el-button>

                        </div>
                        <el-tabs v-model="message">
                            <!--待办项目-->
                            <el-tab-pane v-if="user.groupId!='doman'" :label="`待办项目(${Xms.length})`" name="first">
                                <el-table :data="Xms" :show-header="true" style="width: 100%">
                                    <el-table-column label="项目名称">
                                        <template slot-scope="scope">
                                            <span class="message-title">{{scope.row.projectNam}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="申请人">
                                        <template slot-scope="scope">
                                            <span class="message-title">{{scope.row.proposer}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="申请时间">
                                        <template slot-scope="scope">
                                            <span class="message-title">{{scope.row.applicationDte}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="操作">
                                        <template slot-scope="scope">
                                            <el-button size="small" @click="xmxq(scope.row)">项目详情</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-tab-pane>
                            <!--待备案项目-->
                            <el-tab-pane v-if="user.groupId=='jsb_doman'" :label="`待备案项目(${baXms.length})`" name="second">
                                <el-table :data="baXms" :show-header="true" style="width: 100%">
                                    <el-table-column label="项目名称">
                                        <template slot-scope="scope">
                                            <span class="message-title">{{scope.row.projectNam}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="申请人">
                                        <template slot-scope="scope">
                                            <span class="message-title">{{scope.row.proposer}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="申请时间">
                                        <template slot-scope="scope">
                                            <span class="message-title">{{scope.row.applicationDte}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="操作">
                                        <template slot-scope="scope">
                                            <el-button size="small" @click="xmxq(scope.row)">项目详情</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-tab-pane>
                            <!--驳回的项目-->
                            <el-tab-pane v-if="user.groupId=='doman'" :label="`驳回的项目(${bhXms.length})`" name="third">
                                <el-table :data="bhXms" :show-header="true" style="width: 100%">
                                    <el-table-column label="项目名称">
                                        <template slot-scope="scope">
                                            <span class="message-title">{{scope.row.projectNam}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="申请人">
                                        <template slot-scope="scope">
                                            <span class="message-title">{{scope.row.proposer}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="申请时间">
                                        <template slot-scope="scope">
                                            <span class="message-title">{{scope.row.applicationDte}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="操作">
                                        <template slot-scope="scope">
                                            <el-button size="small" @click="xmxq(scope.row)">项目详情</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-tab-pane>

                        </el-tabs>
                    </el-card>
                </el-col>
            </el-row>
            <el-dialog title="状态" :visible.sync="show_zt" width="80%">
                <img :src='src'/>
                <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="show_zt=false">确 定</el-button>
            </span>
            </el-dialog>
            <!-- 新建申请弹窗 -->
            <el-dialog title="申请项目" :visible.sync="show_xjsq" width="50%">
                <el-input
                        placeholder="项目编号"
                        v-model="sqb.projectNo"
                        style="margin-left: 30px;width: 150px"
                        clearable>
                </el-input>
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
                    <el-form-item label="投资概算(万)">
                        <el-input type="number" style="width: 215px;padding-right: 20px"
                                  v-model="sqb.investment_establish"></el-input>
                        项目负责人
                        <el-input style="width: 215px" v-model="sqb.person_in_charge"></el-input>
                    </el-form-item>
                    <el-form-item label="立项背景理由">
                        <el-input v-model="sqb.establish_reason" type="textarea"
                                  :autosize="{ minRows: 2, maxRows: 4}"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="立项内容规模">
                        <el-input v-model="sqb.scale" type="textarea"
                                  :autosize="{ minRows: 2, maxRows: 4}"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="投资概算说明">
                        <el-input v-model="sqb.illustration" type="textarea"
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
                        <el-input style="width: 215px;padding-right: 15px" :disabled="true"
                                  v-model="xm.investmentEstimate"></el-input>
                        项目负责人
                        <el-input style="width: 215px" :disabled="true" v-model="xm.personInCharge"></el-input>
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
                    <el-form-item>
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
                    </el-form-item>
                    <el-form-item>
                        <el-upload
                                class="upload-demo"
                                drag
                                :action="url"
                                :on-preview="handlePreview"
                                :before-remove="handleBeforeRemove"
                                :on-success="handleSuccess"
                                multiple
                                :file-list="fileList"
                        >
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        </el-upload>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="show_xq=false">确 定</el-button>
            </span>
            </el-dialog>
        </div>
        <div class="">
            <div class="crumbs">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item><i class="el-icon-lx-copy"></i>项目列表</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="container">
                <el-table :data="xmList" :show-header="true" height="280" style="width: 100%;font-size:14px;">
                    <el-table-column label="项目编号">
                        <template slot-scope="scope">
                            <div class="todo-item">{{scope.row.projectNo}}</div>
                        </template>
                    </el-table-column>
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
                    <el-table-column label="项目类型">
                        <template slot-scope="scope">
                            <div class="todo-item">{{scope.row.projectType}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="负责人">
                        <template slot-scope="scope">
                            <div class="todo-item">{{scope.row.personInCharge}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column width="130">
                        <template slot-scope="scope">
                            <el-button type="text" @click="zt(scope.row)">状态</el-button>
                            <el-button type="text" @click="xq(scope.row)">详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>

            </div>


            <!-- 项目详情框 -->
            <el-dialog title="项目详情" :visible.sync="show_xq" width="50%" center>
                <el-form label-width="100px">
                    <el-form-item label="项目名称">
                        <el-input :disabled="user.groupId!='doman'" v-model="xm.projectNam"></el-input>
                    </el-form-item>
                    <el-form-item label="申报部门">
                        <el-input :disabled="user.groupId!='doman'" v-model="xm.declarationDep"></el-input>
                    </el-form-item>
                    <el-form-item label="项目类别">
                        <el-input :disabled="user.groupId!='doman'" v-model="xm.projectType"></el-input>
                    </el-form-item>
                    <el-form-item label="投资概算">
                        <el-input style="width: 215px;padding-right: 15px" :disabled="user.groupId!='doman'"
                                  v-model="xm.investmentEstimate"></el-input>
                        项目负责人
                        <el-input style="width: 215px" :disabled="user.groupId!='doman'"
                                  v-model="xm.personInCharge"></el-input>
                    </el-form-item>
                    <el-form-item label="立项背景理由">
                        <el-input :disabled="user.groupId!='doman'" v-model="xm.establishReason" type="textarea"
                                  placeholder="立项背景理由"
                                  :autosize="{ minRows: 2, maxRows: 4}"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="立项内容规模">
                        <el-input :disabled="user.groupId!='doman'" v-model="xm.scale" type="textarea"
                                  placeholder="立项内容规模"
                                  :autosize="{ minRows: 2, maxRows: 4}"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="投资概算说明">
                        <el-input :disabled="user.groupId!='doman'" v-model="xm.illustration" type="textarea"
                                  placeholder="投资概算说明"
                                  :autosize="{ minRows: 2, maxRows: 4}"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="文件列表">
                        <el-upload
                                class="upload-demo"
                                drag
                                :action="url"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :on-success="handleSuccess"
                                multiple
                                :file-list="fileList"
                        >
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="审批列表">
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
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="show_xq = false">取 消</el-button>
                <el-button v-if="NodeId=='备案'" type="primary" @click="wcba">完成备案</el-button>
                    <!--<div v-else>-->
                    <el-button type="warning" v-if="NodeId=='两会'" @click="bh">未通过两会</el-button>
                    <el-button type="warning" v-else-if="NodeId=='总经理办公会'" @click="bh">未通过总经会</el-button>
                    <el-button type="warning" v-else-if="user.groupId!='doman'" @click="bh">驳 回</el-button>
                    <el-button type="primary" v-if="NodeId=='两会'" @click="ty">通过两会</el-button>
                    <el-button type="primary" v-else-if="NodeId=='总经理办公会'" @click="ty">通过总经会</el-button>
                    <el-button type="primary" v-else-if="user.groupId=='doman'" @click="cxsq">重新申请</el-button>
                    <el-button type="primary" v-else @click="ty">同 意</el-button>
                    <!--</div>-->
            </span>
            </el-dialog>

            <!--驳回弹窗-->
            <el-dialog title="审批意见" :visible.sync="show_bh">
                <el-form>
                    <el-form-item label="审批意见：">
                        <el-input v-model="comment" type="textarea"
                                  placeholder="审批意见："
                                  :autosize="{ minRows: 2, maxRows: 4}"
                        ></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
            <el-button @click="show_bh=false">取 消</el-button>
            <el-button type="primary" @click="qd_bh">确 定</el-button>
            </span>
            </el-dialog>

            <!--同意弹窗-->
            <el-dialog title="审批意见" :visible.sync="show_ty">
                <el-form>
                    <el-form-item label="审批意见：">
                        <el-input style="margin-top: 5px" v-model="comment" type="textarea"
                                  :autosize="{ minRows: 2, maxRows: 4}"
                        ></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
            <el-button @click="show_ty=false">取 消</el-button>
            <el-button type="primary" @click="qd_ty">确 定</el-button>
            </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import Schart from 'vue-schart';
    import bus from '../common/bus';

    export default {
        name: 'dashboard',
        inject:['reload'],
        data() {
            return {
                options: [{
                    value: '同意',
                    label: '同意'
                }, {
                    value: '已阅',
                    label: '已阅'
                }, {
                    value: '安计划进行',
                    label: '安计划进行'
                }],
                //驳回弹窗
                show_bh: false,
                //同意弹窗
                show_ty: false,
                url: '',
                fileList: [],
                commentList: [],
                //详情弹窗
                show_xq: false,
                comment: '',
                user: {},
                xm: {},
                ip: 'http://localhost:8080',
                message: 'first',
                //项目
                Xms: [],
                //备案项目
                baXms: [],
                //驳回项目
                bhXms: [],
                NodeId: '',


                src: '',
                cur_page: 1,
                show_xq: false,
                show_xjsq: false,
                show_zt: false,
                commentList: [],
                xm: {},
                fileList: [],
                ip: 'http://localhost:8080',
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
                    projectNo:'',
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
            }
        },
        components: {
            Schart
        },
        computed: {
            role() {
                return this.user.groupName
            },
            allNum() {
                if (localStorage.getItem('groupId') === 'jsb_doman')
                    return this.xmList.length + this.Xms.length + this.baXms.length
                return this.xmList.length + this.Xms.length
            },
            doNum() {
                if (localStorage.getItem('groupId') === 'doman')
                    return this.xmList.length - this.bhXms.length
                return this.xmList.length
            },
            unDoNum() {
                if (localStorage.getItem('groupId') === 'doman')
                    return this.bhXms.length
                if (localStorage.getItem('groupId') === 'jsb_doman')
                    return this.baXms.length + this.Xms.length
                return this.Xms.length
            }
        },
        created() {
            this.getuser();
            this.getxmList();
            //领取项目
            this.lqxm()
            if (localStorage.getItem('groupId') === 'doman'){//如果是办事员，定位到驳回项目
                this.message = 'third'
            } else{
                this.message='first'
            }
        },

        activated() {
            this.handleListener();
        },
        deactivated() {
            bus.$off('collapse', this.handleBus);
        },
        methods: {
            //重新申请
            cxsq() {
                axios.post(this.ip + '/projectApplication/cxsq', this.xm)
                    .then(res => {
                        this.show_xq = false
                        this.reload()
                    })
            },
            //完成备案
            wcba() {
                axios.get(this.ip + '/projectApplication/wcba', {
                    params: {
                        pid: this.xm.pid,
                        userId: this.user.userId
                    }
                })
                this.show_xq = false
            },
            //拿到当前节点名字
            getNodeId(pid) {
                axios.get(this.ip + '/projectApplication/getPidNode', {
                    params: {
                        pid: pid
                    }
                })
                    .then(res => {
                        this.NodeId = res.data
                    })
            },
            //确定驳回
            qd_bh() {
                if (this.comment == '' || this.comment == null)
                    this.$message.info("请填写驳回理由")
                else {
                    if (this.user.groupId == 'zgjl') {//主管经理驳回
                        this.cl('zgjl', false)
                    } else if (this.user.groupId == 'jl') {//经理驳回
                        this.cl('jl', false)
                    } else if (this.user.groupId == 'jsb_doman') {//经办人驳回
                        this.cl('jbr', false)
                    } else if (this.user.groupId == 'jsb_zgjl') {
                        this.cl('jszgjl', false)
                    } else if (this.user.groupId == 'jsb_jl') {
                        this.cl('jsjl', false)
                    } else if (this.user.groupId == 'bgs') {
                        axios.get(this.ip + '/projectApplication/getPidNode', {
                            params: {
                                pid: this.xm.pid
                            }
                        })
                            .then(res => {
                                if (res.data == '两会') {
                                    this.cl('lh', 2)
                                } else {
                                    this.cl('zgl', 1)
                                }
                            })
                    }
                }
            },
            //确定同意
            qd_ty() {
                if (this.user.groupId == 'zgjl') {//主管经理同意
                    this.cl('zgjl', true)
                } else if (this.user.groupId == 'jl') {
                    this.cl('jl', true)
                } else if (this.user.groupId == 'jsb_doman') {
                    this.cl('jbr', true)
                } else if (this.user.groupId == 'jsb_zgjl') {
                    this.cl('jszgjl', true)
                } else if (this.user.groupId == 'jsb_jl') {
                    this.cl('jsjl', true)
                } else if (this.user.groupId == 'bgs') {
                    if (this.NodeId == '两会') {//两会节点
                        if (Number(this.xm.investmentEstimate) >= 10)//大于10万，总经理办公会
                            this.cl('lh', 0)
                        else
                            this.cl('lh', 1) //结束
                    } else {//总经理节点
                        this.$confirm('是否备案', '提示', {
                            confirmButtonText: '是',
                            cancelButtonText: '否',
                            type: 'warning'
                        }).then(() => {
                            this.cl('zjl', 0)//备案
                        }).catch(() => {
                            this.cl('zjl', 2)
                        });
                    }
                }
            },


            //驳回
            bh() {
                this.comment = ''
                this.show_bh = true
            },
            //同意
            ty() {
                this.comment = '同意'
                this.show_ty = true
            },
            //用户信息
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
            //删除数组中指定元素
            removeByValue(arr, val) {
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].id === val.id) {
                        arr.splice(i, 1);
                        break;
                    }
                }
            },
            //处理
            cl(varName, value) {
                axios.get(this.ip + '/projectApplication/doNode', {
                    params: {
                        pid: this.xm.pid,
                        userId: localStorage.getItem('userId'),
                        comment: this.comment,
                        varName: varName,
                        value: value
                    }
                })
                    .then(res => {
                        this.reload()//刷新
                    })
            },
            //上传成功，重新请求
            handleSuccess() {
                //重新请求
                axios.get(this.ip + '/Attachment/getattachment', {
                    params: {
                        pid: this.xm.pid
                    }
                })
                    .then(res => {
                        if (res.data) {
                            this.fileList = []
                            for (let i = 0; i < res.data.length; i++) {
                                this.fileList.push({
                                    name: res.data[i].attachment_nam,
                                    id: res.data[i].attachment_id
                                })
                            }
                        }
                    })
            },
            //删除请求
            handleRemove(file, fileList) {
                this.$confirm('此操作将永久删除该附件,是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.get(this.ip + '/Attachment/deletAttachment', {
                        params: {
                            userId: localStorage.getItem('userId'),
                            attachment_id: file.id
                        }
                    })
                        .then(res => {
                            this.$message.info("删除成功！")
                        })
                })
                    .catch(() => {
                        //重新请求
                        axios.get(this.ip + '/Attachment/getattachment', {
                            params: {
                                pid: this.xm.pid
                            }
                        })
                            .then(res => {
                                if (res.data) {
                                    this.fileList = []
                                    for (let i = 0; i < res.data.length; i++) {
                                        this.fileList.push({
                                            name: res.data[i].attachment_nam,
                                            id: res.data[i].attachment_id
                                        })
                                    }
                                }
                            })
                    })
            },
            //点击文件下载
            handlePreview(file) {
                axios.get(this.ip + '/Attachment/getrank', {
                    params: {
                        userId: localStorage.getItem('userId'),
                        attachment_id: file.id
                    }
                })
                    .then(res => {
                        if (res.data)
                            window.open(this.ip + '/Attachment/getattachment1?attachment_id=' + file.id)
                        else
                            this.$message.info("没有下载权限")
                    })
            },
            //领取评论
            lqpl(pid) {
                axios.get(this.ip + '/projectApplication/projecttocomment', {
                    params: {
                        pid: pid
                    }
                })
                    .then(res => {
                        if (res.data) {
                            this.commentList = res.data
                        }
                    })
            },
            //审批
            sp() {
                if (!this.comment) {
                    this.$confirm('你没有填写审批意见 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        axios.get(this.ip + '/projectApplication/addComment', {
                            params: {
                                pid: this.xm.pid,
                                userId: localStorage.getItem('userId'),
                                comment: this.comment
                            }
                        })
                            .then(res => {
                                if (res.data) {
                                    this.show_xq = false
                                    this.lqslxm()
                                }
                            })
                        this.reload()
                        this.$message.info("处理完成")
                    }).catch(() => {
                    })
                } else {
                    axios.get(this.ip + '/projectApplication/addComment', {
                        params: {
                            pid: this.xm.pid,
                            userId: localStorage.getItem('userId'),
                            comment: this.comment
                        }
                    })
                        .then(res => {
                            if (res.data) {
                                this.show_xq = false
                                this.lqslxm()
                            }
                        })
                    this.reload()
                    this.$message.info("处理完成")
                }
            },
            //项目详情
            xmxq(row) {
                this.show_xq = true
                this.xm = row
                //领取评论
                this.lqpl(row.pid)
                //领取附件
                this.lqfj(row.pid)
                //查询当前节点
                this.getNodeId(row.pid)
                this.url = 'http://localhost:8080/projectApplication/uploadFile?pId=' + row.pid + '&userId=' + localStorage.getItem('userId')
            },
            //领取附件
            lqfj(pid) {
                axios.get(this.ip + '/Attachment/getattachment', {
                    params: {
                        pid: pid
                    }
                })
                    .then(res => {
                        if (res.data) {
                            this.fileList = []
                            for (let i = 0; i < res.data.length; i++) {
                                this.fileList.push({
                                    name: res.data[i].attachment_nam,
                                    id: res.data[i].attachment_id
                                })
                            }
                        }
                    })
            },
            //领取项目
            lqxm() {
                axios.get(this.ip + '/projectApplication/lqxm', {
                    params: {
                        userId: localStorage.getItem('userId'),
                    }
                }).then(res => {
                    if (res.data) {
                        if (this.user.groupId == 'doman')//如果是办事员，收到的项目为驳回项目
                        {
                            this.bhXms = res.data
                        } else
                            this.Xms = res.data
                        if (this.user.groupId == 'jsb_doman') {//如果是经办人，还要拿到备案的项目
                            axios.get(this.ip + '/projectApplication/getBaXm', {
                                params: {
                                    userId: this.user.userId
                                }
                            })
                                .then(res => {
                                    if (res.data) {//判断当前项目是否进行到备案，如果是填充到备案项目数组
                                        this.baXms = res.data
                                        for (let i = 0; i < this.baXms.length; i++) {//删除备办项目
                                            this.removeByValue(this.Xms, this.baXms[i])
                                        }
                                    } else {
                                        this.baXms = []
                                    }
                                })
                        }
                    } else {
                        Xms = []
                    }
                })
            },
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            //上传成功，重新请求
            handleSuccess() {
                //重新请求
                axios.get(this.ip + '/Attachment/getattachment', {
                    params: {
                        pid: this.xm.pid
                    }
                })
                    .then(res => {
                        if (res.data) {
                            this.fileList = []
                            for (let i = 0; i < res.data.length; i++) {
                                this.fileList.push({
                                    name: res.data[i].attachment_nam,
                                    id: res.data[i].attachment_id
                                })
                            }
                        }
                        //    return false
                    })
            },

            //删除请求
            handleBeforeRemove(file, fileList) {
                this.$confirm('此操作将永久删除该附件,是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.get(this.ip + '/Attachment/deletAttachment', {
                        params: {
                            userId: localStorage.getItem('userId'),
                            attachment_id: file.id
                        }
                    })
                        .then(res => {
                            if (res.data) {
                                this.$message.info("删除成功！")
                                //重新请求
                                axios.get(this.ip + '/Attachment/getattachment', {
                                    params: {
                                        pid: this.xm.pid
                                    }
                                })
                                    .then(res => {
                                        if (res.data) {
                                            this.fileList = []
                                            for (let i = 0; i < res.data.length; i++) {
                                                this.fileList.push({
                                                    name: res.data[i].attachment_nam,
                                                    id: res.data[i].attachment_id
                                                })
                                            }
                                        }
                                        //      return true
                                    })
                            } else {
                                this.$message.info("删除失败！您可能没有权限！")
                                //重新请求
                                axios.get(this.ip + '/Attachment/getattachment', {
                                    params: {
                                        pid: this.xm.pid
                                    }
                                })
                                    .then(res => {
                                        if (res.data) {
                                            this.fileList = []
                                            for (let i = 0; i < res.data.length; i++) {
                                                this.fileList.push({
                                                    name: res.data[i].attachment_nam,
                                                    id: res.data[i].attachment_id
                                                })
                                            }
                                        }
                                        //    return false
                                    })
                            }
                        })
                })
                    .catch(() => {
                        //重新请求
                        axios.get(this.ip + '/Attachment/getattachment', {
                            params: {
                                pid: this.xm.pid
                            }
                        })
                            .then(res => {
                                if (res.data) {
                                    this.fileList = []
                                    for (let i = 0; i < res.data.length; i++) {
                                        this.fileList.push({
                                            name: res.data[i].attachment_nam,
                                            id: res.data[i].attachment_id
                                        })
                                    }
                                }
                            })
                    })
            },
            //得到该用户下的项目
            getxmList() {
                axios.get(this.ip + '/projectApplication/getallproject', {
                    params: {
                        userId: localStorage.getItem('userId')
                    }
                })
                    .then(res => {
                        if (res.data) {
                            for (let i = 0; i < res.data.length; i++) {
                                res.data[i].applicationDte = res.data[i].applicationDte.substr(0, 10)
                            }
                            this.xmList = res.data;
                        }
                    })
            },
            //详情
            xq(row) {
                this.xm = row
                //领取评论
                axios.get(this.ip + '/projectApplication/projecttocomment', {
                    params: {
                        pid: row.pid
                    }
                })
                    .then(res => {
                        if (res.data) {
                            this.commentList = res.data
                            this.show_xq = true
                        }
                    })
                //领取附件
                this.lqfj(row.pid)
                this.url = 'http://localhost:8080/projectApplication/uploadFile?pId=' + row.pid + '&userId=' + localStorage.getItem('userId')
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
                        this.src = 'data:image/png;base64,' + res.data
                        this.show_zt = true
                    })
            },

            //点击文件下载
            handlePreview(file) {
                axios.get(this.ip + '/Attachment/getrank', {
                    params: {
                        userId: localStorage.getItem('userId'),
                        attachment_id: file.id
                    }
                })
                    .then(res => {
                        if (res.data)
                            window.open(this.ip + '/Attachment/getattachment1?attachment_id=' + file.id)
                        else
                            this.$message.info("没有下载权限")
                    })
            },

            //确定申请
            qdsq() {
                axios.post(this.ip + '/projectApplication/startApplication', this.sqb)
                    .then(res => {
                        if (res.data) {
                            this.show_xjsq = false;
                            this.getxmList();
                            if (this.role == '办事员')
                                alert("已经开始申请流程，转到主管经理！")
                            else
                                alert("已经开始申请流程，转到技术部主管！")
                        }
                    })
            },
            //领取附件
            lqfj(pid) {
                axios.get(this.ip + '/Attachment/getattachment', {
                    params: {
                        pid: pid
                    }
                })
                    .then(res => {
                        if (res.data) {
                            this.fileList = []
                            for (let i = 0; i < res.data.length; i++) {
                                this.fileList.push({
                                    name: res.data[i].attachment_nam,
                                    id: res.data[i].attachment_id
                                })
                            }
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
            handleListener() {
                bus.$on('collapse', this.handleBus);

            },


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

    .message-title {
        cursor: pointer;
    }

    .handle-row {
        margin-top: 30px;
    }

</style>
