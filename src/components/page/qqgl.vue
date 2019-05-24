<template>
    <div>
        <div class="table">
            <div class="crumbs">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item><i class="el-icon-lx-cascades"></i>项目表单</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="container">
                <div class="handle-box">
                    <el-button v-if="groupId==='doman'||groupId==='jsb_doman'" type="primary" icon="el-icon-circle-plus"
                               class="handle-del mr10" @click="xjxmlxd">新建项目立项单
                    </el-button>
                    <el-button type="success" icon="el-icon-tickets" style="float:right" @click="qb">全部</el-button>
                    <br/>
                    <el-input v-model="select_code" placeholder="项目编号" style=""
                              class="handle-input mr10">
                    </el-input>
                    <el-input style="margin-top: 10px;" required v-model="select_xmmc" placeholder="项目名称"
                              class="handle-input mr10">
                    </el-input>

                    <el-select
                            clearable
                            style="margin-left: 10px;width: 150px"
                            v-if="groupId!='doman'&&groupId!='zgjl'&&groupId!='jl'||departmentName==='办公室.'"
                            v-model="select_dptnm"
                            placeholder="立项部门">
                        <el-option
                                v-for="item in bms"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>

                    <el-select
                            clearable
                            filterable
                            multiple
                            style="margin-left: 20px;width: 150px"
                            v-model="select_fqr"
                            placeholder="发起人">
                        <el-option
                                clearable
                                v-for="item in fqrs"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>

                    <el-select
                            clearable
                            filterable
                            multiple
                            style="margin-left: 20px;width: 150px"
                            v-model="select_jbr"
                            placeholder="经办人">
                        <el-option
                                clearable
                                v-for="item in jbrs"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>

                    <el-select
                            clearable
                            style="margin-left: 20px;width: 150px"
                            v-model="select_jd"
                            placeholder="节点">
                        <el-option
                                clearable
                                v-for="item in jds"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>

                    <el-select
                            clearable
                            multiple
                            style="margin-left: 20px;width: 150px"
                            v-model="select_xmfl"
                            placeholder="分类">
                        <el-option
                                v-for="item in xmfl"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>

                    <el-select
                            clearable
                            multiple
                            style="margin-left: 20px;width: 150px"
                            v-model="select_xmlb"
                            placeholder="类别">
                        <el-option
                                v-for="item in xmlb"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <el-button style="margin-left: 10px" type="primary" icon="el-icon-search" @click="zhSearch">搜索
                    </el-button>
                </div>

                <el-table stripe :data="projects" border class="table" ref="multipleTable">
                    <el-table-column prop="projectNo" align="center" sortable label="项目编号" width="140">
                    </el-table-column>
                    <el-table-column prop="projectNam" label="项目名称" min-width="160">
                    </el-table-column>
                    <el-table-column prop="declarationDep" align="center" sortable label="立项部门" width="140">
                    </el-table-column>
                    <el-table-column prop="proposer" align="center" label="发起人" width="140">
                    </el-table-column>
                    <el-table-column prop="bider" align="center" label="经办人" width="140">
                    </el-table-column>
                    <el-table-column prop="projectType" align="center" sortable label="项目类别" width="140">
                    </el-table-column>
                    <el-table-column prop="engTechAuditOpinion" align="center" sortable label="创建时间" width="160">
                    </el-table-column>
                    <el-table-column prop="dqjd" align="center" label="当前节点" width="140">
                    </el-table-column>
                    <el-table-column label="操作" width="180" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" icon="el-icon-tickets" @click="xmxq(scope.$index, scope.row)">详情
                            </el-button>
                            <el-button type="text" icon="el-icon-tickets" @click="fj(scope.row)">附件</el-button>
                            <el-button type="text" icon="el-icon-star-on" @click="zt(scope.row)">状态</el-button>
                            <!--v-if="isSqs.get(scope.row.id)"-->
                            <el-button type="text" icon="el-icon-star-on" v-if="scope.row.canSq"
                                       @click="kssq(scope.$index, scope.row)">申请
                            </el-button>
                            <el-button type="text" icon="el-icon-download" @click="xz(scope.row)">下载</el-button>
                            <el-button  v-if="scope.row.proposer===userName" type="text" icon="el-icon-delete"
                                       class="red" @click="handleDelete(scope.$index, scope.row)">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!--所有项目，分批请求-->
                <div v-if="!ss" style="text-align: center">
                    <el-pagination
                            background
                            @current-change="currentChange"
                            layout="total,prev,pager,next"
                            :total="count">
                    </el-pagination>
                </div>

            </div>


            <!-- 删除提示框 -->
            <el-dialog title="提示" :close-on-click-modal="false" :visible.sync="delVisible" width="300px" center>
                <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
            </el-dialog>

            <!-- 新建项目项目立项单弹窗 -->
            <el-dialog title="申请项目" :close-on-click-modal="false" :visible.sync="show_xjxmlxd" width="680px">
                <el-form ref="form" :rules="applyRules" style="margin-top: 10px" :model="project" label-width="100px">
                    <el-form-item label="项目编号">
                        <el-input
                                v-model="project.projectNo"
                                clearable>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="项目名称">
                        <el-input v-model="project.projectNam"></el-input>
                    </el-form-item>
                    <el-form-item label="立项时间">
                        <el-date-picker
                                style="width: 215px;padding-right: 20px"
                                v-model="project.applicationDte"
                                type="date"
                                value-format="yyyy-MM-dd"
                                placeholder="选择日期">
                        </el-date-picker>
                        <span>立项部门</span>
                        <el-input readonly style="width: 215px;margin-left: 15px"
                                  v-model="project.declarationDep"></el-input>
                    </el-form-item>
                    <el-form-item label="立项类别">
                        <el-select style="width: 215px;padding-right: 20px" v-model="project.depAuditOpinion"
                                   placeholder="请选择">
                            <el-option
                                    v-for="item in xmdl"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                        <span>项目类别</span>
                        <el-select style="width: 215px;margin-left: 15px" v-model="project.projectType"
                                   placeholder="请选择">
                            <el-option
                                    v-for="item in xmlb"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="投资概算(万)">
                        <el-input type="number" style="width: 215px;padding-right: 15px"
                                  v-model="project.investmentEstimate"></el-input>
                        项目负责人
                        <el-input style="width: 215px" v-model="project.personInCharge"></el-input>
                    </el-form-item>
                    <el-form-item label="预计工期">
                        <el-input v-model="project.techAuditOpinion"
                                  style="width: 215px;padding-right: 15px"></el-input>
                        项目大类
                        <el-select style="width: 215px;margin-left: 15px" v-model="project.reviser" placeholder="请选择">
                            <el-option
                                    v-for="item in xmfl"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="立项背景理由" prop="establishReason">
                        <el-input v-model="project.establishReason" type="textarea"
                                  :autosize="{ minRows: 4, maxRows: 10}" placeholder="最多600字"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="立项内容规模" prop="scale">
                        <el-input v-model="project.scale" type="textarea"
                                  :autosize="{ minRows: 4, maxRows: 10}" placeholder="最多600字"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="投资概算说明" prop="illustration">
                        <el-input v-model="project.illustration" type="textarea"
                                  :autosize="{ minRows: 4, maxRows: 10}" placeholder="最多600字"
                        ></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="show_xjxmlxd = false">取 消</el-button>
                <el-button type="primary" @click="qdxj">确 定</el-button>
            </span>
            </el-dialog>

            <!-- 项目详情弹窗 -->
            <el-dialog title="申请项目" :close-on-click-modal="false" :visible.sync="show_xq" width="680px">
                <el-form ref="form" style="margin-top: 10px" :model="project" label-width="100px">
                    <el-form-item label="项目编号">
                        <el-input
                                :readonly="!issqr"
                                v-model="project.projectNo"
                                clearable>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="项目名称">
                        <el-input :readonly="!issqr" v-model="project.projectNam"></el-input>
                    </el-form-item>
                    <el-form-item label="立项时间">
                        <el-date-picker
                                :readonly="!issqr"
                                style="width: 215px;padding-right: 20px"
                                v-model="project.applicationDte"
                                type="date"
                                value-format="yyyy-MM-dd"
                                placeholder="选择日期">
                        </el-date-picker>
                        <span>立项部门</span>
                        <el-input readonly style="width: 215px;margin-left: 15px"
                                  v-model="project.declarationDep"></el-input>
                    </el-form-item>
                    <el-form-item label="立项类别">
                        <el-select :disabled="!issqr" style="width: 215px;padding-right: 20px"
                                   v-model="project.depAuditOpinion"
                                   placeholder="请选择">
                            <el-option
                                    v-for="item in xmdl"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                        <span>项目类别</span>
                        <el-select :disabled="!issqr" style="width: 215px;margin-left: 15px"
                                   v-model="project.projectType"
                                   placeholder="请选择">
                            <el-option
                                    v-for="item in xmlb"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="投资概算(万)">
                        <el-input :readonly="!issqr" type="number" style="width: 215px;padding-right: 15px"
                                  v-model="project.investmentEstimate"></el-input>
                        项目负责人
                        <el-input style="width: 215px" :readonly="!issqr" v-model="project.personInCharge"></el-input>
                    </el-form-item>
                    <el-form-item label="预计工期">
                        <el-input :readonly="!issqr" v-model="project.techAuditOpinion"
                                  style="width: 215px;padding-right: 15px"></el-input>
                        项目大类
                        <el-select :disabled="!issqr" style="width: 215px;margin-left: 15px" v-model="project.reviser"
                                   placeholder="请选择">
                            <el-option
                                    v-for="item in xmfl"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="两会时间">
                        <el-input :readonly="true" v-model="project.lhsj"
                                  style="width: 215px;padding-right: 15px"></el-input>
                        总经会时间
                        <el-input :readonly="true" v-model="project.zjhsj"
                                  style="width: 215px;padding-right: 15px"></el-input>
                    </el-form-item>
                    <el-form-item label="立项背景理由">
                        <el-input :readonly="!issqr" v-model="project.establishReason" type="textarea"
                                  :autosize="{ minRows: 4, maxRows: 10}"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="立项内容规模">
                        <el-input :readonly="!issqr" v-model="project.scale" type="textarea"
                                  :autosize="{ minRows: 4, maxRows: 10}"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="投资概算说明">
                        <el-input :readonly="!issqr" v-model="project.illustration" type="textarea"
                                  :autosize="{ minRows: 4, maxRows: 10}"
                        ></el-input>
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
                                    width="80">
                            </el-table-column>
                            <el-table-column
                                    prop="groupName"
                                    label="职位"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="comment"
                                    label="审批">
                            </el-table-column>
                        </el-table>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="()=>{show_xq=false;project={}}">取消</el-button>
                <el-button v-if="issqr" type="primary" @click="qdxg">确定修改</el-button>
            </span>
            </el-dialog>

            <el-dialog title="状态" :close-on-click-modal="false" :visible.sync="show_zt" width="830px">
                <img :src="src"/>
                <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="show_zt=false">确 定</el-button>
            </span>
            </el-dialog>

            <!--上传附件弹窗 -->
            <el-dialog title="附件" :close-on-click-modal="false" :visible.sync="showfj" width="1000px">
                <!--<el-upload
                        class="upload-demo"
                        drag
                        :action="url"
                        :on-preview="handlePreview"
                        :before-remove="handleBeforeRemove"
                        :on-success="handleSuccess"
                        multiple
                        :file-list="fileList"
                        style="width: 100%;">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>上传文件</em></div>
                </el-upload>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="showfj=false">确 定</el-button>
                </span>-->


                <el-table :data="bcwjs" border style="margin-top: 20px">
                    <el-table-column prop="jd" label="节点" width="130px">
                    </el-table-column>
                    <el-table-column prop="wjmc" label="文件名称" width="180px">
                    </el-table-column>
                    <el-table-column label="操作" >
                        <template slot-scope="scope">
                            <el-upload
                                    class="upload-demo"
                                    :action="url"
                                    :on-preview="handlePreview"
                                    :before-remove="handleBeforeRemove"
                                    :on-success="handleSuccess"
                                    multiple
                                    :file-list="fileList[scope.$index]">
                                <el-button size="small" type="primary" @click="recordCurrentRow(scope.row)">点击上传</el-button>
                            </el-upload>
                        </template>
                    </el-table-column>
                </el-table>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import {Loading} from 'element-ui';

    export default {
        inject: ['reload'],
        name: 'qqgl',
        data() {
            return {
                userName:localStorage.getItem('userName'),
                showfj: false,
                url: '',
                fileList: [],
                commentList: [],
                //当前项目是否搜索出来的
                ss: false,
                //搜索部门
                select_dptnm: '',
                //搜索发起人
                select_fqr: [],
                //搜索经办人
                select_jbr: [],
                //搜索节点
                select_jd: '',
                //搜索项目大类
                select_xmfl: [],
                //项目类别搜索
                select_xmlb: [],
                jds: [{
                    value: '未申请',
                    label: '未申请',
                }, {
                    value: '填写申请表',
                    label: '填写申请表'
                }, {
                    value: '主管经理审批',
                    label: '主管经理审批'
                }, {
                    value: '经理审批',
                    label: '经理审批',
                }, {
                    value: '经办人',
                    label: '经办人'
                }, {
                    value: '技术部主管经理',
                    label: '技术部主管经理'
                }, {
                    value: '技术部经理',
                    label: '技术部经理'
                }, {
                    value: '两会',
                    label: '两会'
                }, {
                    value: '总经理办公会',
                    label: '总经理办公会'
                }, {
                    value: '备案',
                    label: '备案',
                }, {
                    value: '申请结束',
                    label: '申请结束'
                }],
                fqrs: [],
                jbrs: [],
                bms: [],
                groupId: localStorage.getItem("groupId"),
                departmentName: localStorage.getItem("departmentName"),
                //新建项目立项单
                show_xjxmlxd: false,
                projects: [],
                show_xq: false,
                ip: 'http://10.197.41.100:8080',
                project: {
                    id: '',
                    projectNo: '',
                    projectType: '',
                    projectNam: '',
                    declarationDep: '',
                    personInCharge: '',
                    investmentEstimate: '',
                    establishReason: '',
                    scale: '',
                    depAuditOpinion: '',
                    techAuditOpinion: '',
                    engTechAuditOpinion: '',
                    bider: '',
                    finishDte: '',
                    proposer: '',
                    applicationDte: '',
                    reviser: '',
                    reviseDte: '',
                    illustration: '',
                    pid: ''
                },
                //立项类别
                xmdl: [{
                        id: '临时立项',
                        name: '临时立项'
                    }, {
                        id: '年度计划',
                        name: '年度计划'
                    }, {
                        id: '年度维保',
                        name: '年度维保'
                    }, {
                        id: '股份项目',
                        name: '股份项目'
                    }],
                //项目类别
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
                //项目大类
                xmfl: [{
                    value: '土建',
                    label: '土建'
                }, {
                    value: '设备',
                    label: '设备'
                }, {
                    value: '信息',
                    label: '信息'
                }, {
                    value: '物资',
                    label: '物资'
                }
                ],
                isSqs: new Map(),
                department_options: [],
                multipleSelection: [],
                select_xmmc: '',
                select_code: '',
                src: '',
                show_zt: false,
                user: {},
                idx: -1,
                //项目数
                count: 0,
                delVisible: false,
                //是否申请人、决定修改按钮的显示与否
                issqr: false,
                // 立项申请验证规则
                applyRules: {
                    establishReason: [
                        {max: 600, message: '最多600字', trigger: 'change'}
                    ],
                    scale: [
                        {max: 600, message: '最多600字', trigger: 'change'}
                    ],
                    illustration: [
                        {max: 600, message: '最多600字', trigger: 'change'}
                    ]
                },
                //必传文件
                bcwjs:[],
                currentRow:'',
            }
        },
        watch: {
            investmentEstimate(newValue, oldValue) {
                if (Number(newValue) < 0) {
                    this.$alert('中标金额只能填写大于等于0!', '提示', {
                        confirmButtonText: '确定',
                        type: 'error'
                    })
                    this.project.investmentEstimate = 1
                }
            }
        },
        computed: {
            investmentEstimate() {
                return this.project.investmentEstimate
            },
        },
        created() {
            this.getDepartment_optins()
            this.getProjects(1)
            this.getcounts()
            this.getAllDptName()
            this.getAllFQR()
            this.getAllJBR()
            //拿必传文件列表
            this.getBcwjs()
        },
        methods: {

            //拿前期必传文件列表
            getBcwjs(){
                axios.get(this.ip+'/bcwj/select',{
                    params:{
                        lc:'前期'
                    }
                }).then(res=>{
                    this.bcwjs=res.data
                   // this.bcwjs.push()
                })
            },

            //下载
            xz(row) {
                window.open('http://10.197.41.100:8080/print/sqb?id=' + row.id)
            },

            //上传成功，重新请求
            handleSuccess() {
                this.fj(this.project)
            },

            recordCurrentRow(row){
                this.currentRow=row;
                var index=this.url.indexOf("&bcwjid=")
                if(index!=-1){
                    this.url=this.url.substring(0,index+8)+this.currentRow.id;
                }else{
                    this.url=this.url+"&bcwjid="+this.currentRow.id
                }
            },

            //删除请求
            handleBeforeRemove(file, fileList) {
                if (this.project.pid != '' && this.project.pid != null) {
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
                                } else {
                                    this.$message.info("删除失败！您可能没有权限！")
                                    //重新请求
                                    this.fj(this.project)
                                }
                            })
                    })
                        .catch(() => {
                            //重新请求
                            //this.fj(this.project)
                            fileList.push(file)
                        })
                } else {
                    this.$confirm('此操作将永久删除该附件,是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        axios.get(this.ip + '/contract/deletFj', {
                            params: {
                                fid: file.id,
                                fname:file.name,
                                jlid:this.project.id
                            }
                        })
                            .then(res => {
                                this.$message.info("删除成功！")
                            })
                    }).catch(() => {
                        //this.fj(this.project)
                        fileList.push(file)
                    })
                }
            },

            //点击文件下载
            handlePreview(file) {
                if (this.project.pid == '' || this.project.pid == null) {//未申请
                    window.open(this.ip + '/contract/getFj?fid=' + file.id + '&fname=' + encodeURIComponent(file.name))
                } else {
                    window.open(this.ip + '/Attachment/getattachment1?attachment_id=' + file.id)
                }
            },

            //点击附件事件
            fj(row) {
                this.project = row
                if (row.pid == '' || row.pid == null) {//未申请
                    this.url = 'http://10.197.41.100:8080/contract/uploadHtfj?id=' + row.id+'&userId='+localStorage.getItem('userId')
                } else {//已经申请
                    this.url = 'http://10.197.41.100:8080/projectApplication/uploadFile?pId=' + row.pid + '&userId=' + localStorage.getItem('userId')
                }
                //拿附件信息
                for(let i=0;i<this.bcwjs.length;i++){
                    axios.get(this.ip + '/Attachment/getattachment2', {
                        params: {
                            id: row.id,
                            bcwjid:this.bcwjs[i].id
                        }
                    })
                        .then(res => {
                            // items.splice(indexOfItem, 1, newValue)
                            // this.fileList[i] = []
                            this.fileList.splice(i,1,[])
                            if (res.data) {
                                for (let j = 0; j < res.data.length; j++) {
                                    this.fileList[i].push({
                                        name: res.data[j].attachment_nam,
                                        id: res.data[j].attachment_id
                                    })
                                }
                            }
                        })
                }
                this.showfj=true
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

            //请求当前项目节点
            getNode() {
                for (let i = 0; i < this.projects.length; i++) {
                    if (this.projects[i].pid == '' || this.projects[i].pid == null) {
                        this.projects[i].dqjd = "未申请！"
                        this.$set(this.projects, i, this.projects[i]);
                    } else {
                        //请求当前节点
                        axios.get(this.ip + '/projectApplication/getPidNode', {
                            params: {
                                pid: this.projects[i].pid
                            }
                        })
                            .then(res => {
                                this.projects[i].dqjd = res.data
                                this.$set(this.projects, i, this.projects[i])
                            })
                    }
                }
            },

            //申请按钮的显示与否
            isSq() {
                for (let i = 0; i < this.projects.length; i++) {
                    if (localStorage.getItem("userName") != this.projects[i].proposer) {
                        this.projects[i].canSq = false
                        this.$set(this.projects, i, this.projects[i])
                    } else {
                        //请求是否可申请
                        axios.get(this.ip + '/projectApplication/isSq', {
                            params: {
                                projectId: this.projects[i].id
                            }
                        })
                            .then(xxx => {
                                this.projects[i].canSq = xxx.data
                                this.$set(this.projects, i, this.projects[i])
                            })
                    }
                }
            },

            //综合搜索
            zhSearch() {
                var params = {
                    select_code: this.select_code,
                    select_xmmc: this.select_xmmc,
                    select_dptnm: this.select_dptnm,
                    select_fqr: this.select_fqr,
                    select_jbr: this.select_jbr,
                    select_jd: this.select_jd,
                    select_xmfl: this.select_xmfl,
                    select_xmlb: this.select_xmlb,
                }
                // 如果当前账号不是工程技术部且不是办公室且不是办公室.，select_dptnmt填充当前账号部门
                if (localStorage.getItem('departmentId') != '20190123022801622' && localStorage.getItem('departmentId') != '20190125102616787' && localStorage.getItem('departmentId') != '103a990b-a59a-40bc-8ac9-a505076ca0ae') {
                    params.select_dptnm = localStorage.getItem('departmentName')
                }
                this.ss = true
                axios.get(this.ip + '/projectApplication/search', {
                        params: params
                    }
                ).then(res => {
                    this.projects = res.data
                    //拿节点
                    this.getNode()
                    //申请按钮的显示
                    this.isSq()
                })
            },

            //全部按钮事件
            qb() {
                this.getProjects(1)
                this.ss = false
                this.select_code = ''
                this.select_xmmc = ''
                this.select_dptnm = ''
                this.select_fqr = []
                this.select_jbr = []
                this.select_jd = ''
                this.select_xmfl = []
                this.select_xmlb = []
            },

            //拿到搜索部门的名称
            getAllDptName() {
                axios.get(this.ip + '/department/getAllDptName')
                    .then(res => {
                        if (res.data != null) {
                            for (let i = 0; i < res.data.length; i++) {
                                this.bms.push({
                                    value: res.data[i],
                                    label: res.data[i],
                                })
                            }
                        }
                    })
            },

            //获取所有发起人
            getAllFQR() {
                axios.get(this.ip + '/user/getDepartmentDoman', {
                    params: {
                        departmentId: localStorage.getItem('departmentId')
                    }
                }).then(res => {
                    if (res.data != null) {
                        for (let i = 0; i < res.data.length; i++) {
                            this.fqrs.push({
                                value: res.data[i].userName,
                                label: res.data[i].userName,
                            })
                        }
                    }
                })
            },

            //获取所有经办人
            getAllJBR() {
                axios.get(this.ip + '/user/getDepartmentjbr', {
                    params: {
                        departmentName: localStorage.getItem('departmentName')
                    }
                }).then(res => {
                    if (res.data != null) {
                        for (let i = 0; i < res.data.length; i++) {
                            this.jbrs.push({
                                value: res.data[i].userName,
                                label: res.data[i].userName,
                            })
                        }
                    }
                })
            },

            //分页请求
            currentChange(pageNum) {
                this.getProjects(pageNum)
            },

            //拿项目总数
            getcounts() {
                axios.get(this.ip + '/projectApplication/AllCounts', {
                    params: {
                        dpt: localStorage.getItem("departmentName")
                    }
                })
                    .then(res => {
                        this.count = res.data
                    })
            },

            //状态
            zt(row) {
                if(row.depAuditOpinion=='股份项目'){
                    if (row.pid != null && row.pid != '') {
                        if (row.dqjd === '填写申请表') {
                            this.src = require('@/assets/img/g_txsqb.png')
                        } else if (row.dqjd === '主管经理审批') {
                            this.src = require('@/assets/img/g_zgjlsp.png')
                        } else if (row.dqjd === '经理审批') {
                            this.src = require('@/assets/img/g_jlsp.png')
                        } else if (row.dqjd === '经办人') {
                            this.src = require('@/assets/img/g_jbr.png')
                        } else if (row.dqjd === '技术部主管经理') {
                            this.src = require('@/assets/img/g_jsbzgjl.png')
                        } else if (row.dqjd === '技术部经理') {
                            this.src = require('@/assets/img/g_jsbjl.png')
                        } else if (row.dqjd === '总经理办公会') {
                            this.src = require('@/assets/img/g_zjlbgh.png')
                        } else if (row.dqjd === '备案') {
                            this.src = require('@/assets/img/g_ba.png')
                        } else if (row.dqjd === '申请结束') {
                            this.src = require('@/assets/img/g_js.png')
                        }
                    }else {
                        this.src = require('@/assets/img/g_wsq.png')
                    }
                }else {
                    if (row.pid != null && row.pid != '') {
                        if (Number(row.investmentEstimate) > 10) {
                            if (row.dqjd === '填写申请表') {
                                this.src = require('@/assets/img/s_txsqb.png')
                            } else if (row.dqjd === '主管经理审批') {
                                this.src = require('@/assets/img/s_zgjlsp.png')
                            } else if (row.dqjd === '经理审批') {
                                this.src = require('@/assets/img/s_jlsp.png')
                            } else if (row.dqjd === '经办人') {
                                this.src = require('@/assets/img/s_jbr.png')
                            } else if (row.dqjd === '技术部主管经理') {
                                this.src = require('@/assets/img/s_jsbzgjl.png')
                            } else if (row.dqjd === '技术部经理') {
                                this.src = require('@/assets/img/s_jsbjl.png')
                            } else if (row.dqjd === '两会') {
                                this.src = require('@/assets/img/s_lh.png')
                            } else if (row.dqjd === '总经理办公会') {
                                this.src = require('@/assets/img/s_zjlbgh.png')
                            } else if (row.dqjd === '备案') {
                                this.src = require('@/assets/img/s_ba.png')
                            } else if (row.dqjd === '申请结束') {
                                this.src = require('@/assets/img/s_js.png')
                            }
                        } else {
                            if (row.dqjd === '填写申请表') {
                                this.src = require('@/assets/img/x_txsqb.png')
                            } else if (row.dqjd === '主管经理审批') {
                                this.src = require('@/assets/img/x_zgjlsp.png')
                            } else if (row.dqjd === '经理审批') {
                                this.src = require('@/assets/img/x_jlsp.png')
                            } else if (row.dqjd === '经办人') {
                                this.src = require('@/assets/img/x_jbr.png')
                            } else if (row.dqjd === '技术部主管经理') {
                                this.src = require('@/assets/img/x_jsbzgjl.png')
                            } else if (row.dqjd === '技术部经理') {
                                this.src = require('@/assets/img/x_jsbjl.png')
                            } else if (row.dqjd === '两会') {
                                this.src = require('@/assets/img/x_lh.png')
                            } else if (row.dqjd === '申请结束') {
                                this.src = require('@/assets/img/x_js.png')
                            }
                        }
                    } else {
                        this.src = require('@/assets/img/wsq.png')
                    }
                }
                this.show_zt = true
            },

            //新建项目立项单
            xjxmlxd() {
                this.project = {
                    proposer: localStorage.getItem('userName'),
                    declarationDep: localStorage.getItem('departmentName')
                }
                this.show_xjxmlxd = true
            },

            //开始申请
            kssq(index, row) {
                // if(this.fileList[1]==null||this.fileList[1].length==0||this.fileList[2]==null||this.fileList[2].length==0){
                //     this.$message.error("请在相应的文件分类中上传技术要求和可行性报告，再申请！")
                //     return
                // }


                let loadingInstance = Loading.service({fullscreen: true});
                axios.get(this.ip+"/bcwj/jcwj",{
                    params:{
                        id:row.id,
                        lc:'前期',
                        dqjd:'填写申请表'
                    }
                }).then(res=>{
                    if(res.data){
                        axios.post(this.ip + '/projectApplication/qqglStartSq', row)
                            .then(res => {
                                loadingInstance.close()
                                if (res.data) {
                                    this.$message.success("申请成功！")
                                    //申请成功，刷新
                                    this.reload()
                                } else {
                                    this.$message.error("申请失败！")
                                }
                            })
                    }else {//没有，请求需要什么文件
                        axios.get(this.ip+'/bcwj/bcwjm',{
                            params:{
                                lc:'前期',
                                dqjd:'填写申请表'
                            }
                        }).then(res=>{
                            let filenames=''
                            for(let i=0;i<res.data.length;i++){
                                filenames=filenames+res.data[i].wjmc+","
                            }
                            //去后面,
                            filenames=filenames.substring(0,filenames.length-1)
                            loadingInstance.close()
                            this.$message.error("申请前，请上传文件："+filenames)
                        })
                    }
                })

            },

            //确认修改
            qdxg() {
                if (this.isnull(this.project.projectNam) || this.isnull(this.project.reviser) || this.isnull(this.project.projectType) || this.isnull(this.project.declarationDep)||this.isnull(this.project.depAuditOpinion)) {
                    this.$message.error("请填写详细信息！")
                    return
                }

                axios.get(this.ip + '/projectApplication/qdsqr', {//确定申请人
                    params: {
                        projectId: this.project.id,
                        userId: localStorage.getItem('userId')
                    }
                })
                    .then(res => {
                        if (res.data) {
                            axios.post(this.ip + '/projectApplication/updataXm', this.project)
                                .then(res => {
                                    if (res.data) {
                                        this.$message.success("修改成功!")
                                    } else {
                                        this.$message.error("修改失败!该项目正在申请中！")
                                        //this.getProjects(1)
                                        this.reload()
                                    }
                                })
                        } else {
                            this.$message.error("修改失败!该项目正在申请中！")
                            this.reload()
                        }
                    })
                this.show_xq = false
            },

            //拿到所有项目
            getProjects(pageNum) {
                this.projects = []
                this.isSqs = new Map()
                axios.get(this.ip + '/projectApplication/getAllProject', {
                    params: {
                        pageNum: pageNum,
                        userId: localStorage.getItem('userId')
                    }
                })
                    .then(res => {
                        this.projects = res.data
                        this.getNode()
                        this.isSq()
                    })
            },

            //拿到部门
            getDepartment_optins() {
                axios.get(this.ip + '/department/getAllDepartment')
                    .then(res => {
                        if (res.data) {
                            for (let i = 0; i < res.data.length; i++) {
                                this.department_options.push({
                                    value: res.data[i].id,
                                    label: res.data[i].dNam
                                })
                            }
                        }
                    })
            },

            //是否空
            isnull(data) {
                if (data == '' || data == null)
                    return true;
                return false;
            },

            //确定新建
            qdxj() {
                if (this.isnull(this.project.projectNam) || this.isnull(this.project.reviser) || this.isnull(this.project.projectType) || this.isnull(this.project.declarationDep)||this.isnull(this.project.investmentEstimate)) {
                    this.$message.error("请填写详细信息！")
                    return
                }
                // if (this.groupId === 'jsb_doman')//技术部经办人新建的项目，直接设置经办人为当前用户
                //     this.project.bider = localStorage.getItem('userName')
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        axios.post(this.ip + '/projectApplication/insertXm', this.project)
                            .then(res => {
                                if (res.data) {
                                    this.$message.success('新建成功！')
                                    this.reload()
                                } else {
                                    this.$message.error('新建失败！')
                                }
                            })
                        this.show_xjxmlxd = false
                    }
                })
            },

            filterTag(value, row) {
                return row.tag === value;
            },

            //项目详情
            xmxq(index, row) {
                this.project = row
                //拿审批列表
                if (this.project.pid == null || this.project.pid === '')
                    this.commentList = []
                else {
                    this.lqpl(this.project.pid)
                }
                this.show_xq = true

                //判断是否申请人
                axios.get(this.ip + '/projectApplication/qdsqr', {//确定申请人
                    params: {
                        projectId: this.project.id,
                        userId: localStorage.getItem('userId')
                    }
                })
                    .then(res => {
                        this.issqr = res.data
                    })
            },

            //删除按钮
            handleDelete(index, row) {
                this.idx = index;
                this.delVisible = true;
            },

            // 确定删除
            deleteRow() {
                const loading = this.$loading({
                    lock: true,
                    text: '处理中……',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                axios.get(this.ip + '/projectApplication/qdsqr', {//确定申请人
                    params: {
                        projectId: this.projects[this.idx].id,
                        userId: localStorage.getItem('userId')
                    }
                })
                    .then(res => {
                        if (res.data) {
                            axios.post(this.ip + '/projectApplication/deletXm', this.projects[this.idx])
                                .then(res => {
                                    loading.close()
                                    if (res.data) {
                                        this.$message.success('删除成功');
                                        this.reload()
                                    } else {
                                        this.$message.error('该项目正在进行其他操作,删除失败！');
                                    }
                                })
                        } else {
                            loading.close()
                            this.$message.error('该项目正在进行其他操作,删除失败！');
                        }
                    })
                this.delVisible = false;
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
