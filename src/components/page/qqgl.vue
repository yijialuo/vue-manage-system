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
                    <el-button v-if="groupId==='doman'||groupId==='jsb_doman'" type="primary" icon="el-icon-circle-plus" class="handle-del mr10" @click="xjxmlxd">
                        新建项目立项单
                    </el-button>
                    <el-input  required v-model="select_xmmc" placeholder="项目名称" class="handle-input mr10"></el-input>
                    <el-button type="primary" icon="el-icon-search" @click="xmmcSearch">搜索</el-button>
                    <el-input v-model="select_code" placeholder="项目编号" style="margin-left: 20px"
                              class="handle-input mr10"></el-input>
                    <el-button type="primary" icon="el-icon-search" @click="xmbhSearch">搜索</el-button>
                    <el-button type="success" icon="el-icon-tickets" style="float:right" @click="getProjects(1)">全部</el-button>
                </div>
                <el-table height="550" stripe :data="projects" border class="table" ref="multipleTable">
                    <el-table-column prop="projectNo" sortable label="项目编号" width="120">
                    </el-table-column>
                    <el-table-column prop="projectNam" label="项目名称" >
                    </el-table-column>
                    <el-table-column prop="declarationDep"  sortable label="立项部门">
                    </el-table-column>
                    <el-table-column prop="personInCharge" label="负责人">
                    </el-table-column>
                    <el-table-column prop="projectType" sortable label="项目类别">
                    </el-table-column>
                    <el-table-column prop="engTechAuditOpinion" sortable label="创建时间" >
                    </el-table-column>
                    <el-table-column prop="dqjd" label="当前节点"  >
                    </el-table-column>
                    <el-table-column label="操作" width="250" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" icon="el-icon-tickets" @click="xmxq(scope.$index, scope.row)">详情</el-button>
                            <el-button type="text" icon="el-icon-star-on" @click="zt(scope.row)">状态</el-button>
                            <el-button type="text" icon="el-icon-star-on" v-if="isSqs.get(scope.row.id)" @click="kssq(scope.$index, scope.row)">申请</el-button>
                            <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div style="text-align: center">
                    <el-pagination
                            background
                            @current-change="currentChange"
                            layout="prev, pager, next"
                            :total="count">
                    </el-pagination>
                </div>
            </div>


            <!-- 编辑弹出框 -->
            <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
                <el-form ref="form" :model="form" label-width="50px">
                    <el-form-item label="日期">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.date" value-format="yyyy-MM-dd"
                                        style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="姓名">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="地址">
                        <el-input v-model="form.address"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
            </el-dialog>

            <!-- 删除提示框 -->
            <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
                <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
            </el-dialog>

            <!-- 新建项目项目立项单弹窗 -->
            <el-dialog title="申请项目" :visible.sync="show_xjxmlxd" width="680px">


                <el-form  ref="form" style="margin-top: 10px" :model="project" label-width="100px">
                    <el-form-item label="项目编号">
                        <el-input
                                v-model="project.projectNo"
                                clearable>
                        </el-input>
                    </el-form-item>
                    <el-form-item  label="项目名称">
                        <el-input v-model="project.projectNam"></el-input>
                    </el-form-item>
                    <el-form-item label="立项时间">
                        <el-date-picker
                                v-model="project.applicationDte"
                                type="date"
                                value-format="yyyy-MM-dd"
                                placeholder="选择日期">
                        </el-date-picker>
                        &nbsp&nbsp&nbsp&nbsp立项部门&nbsp&nbsp&nbsp&nbsp
                        <el-select v-model="project.declarationDep" placeholder="请选择">
                            <el-option
                                    v-for="item in department_options"
                                    :key="item.label"
                                    :label="item.label"
                                    :value="item.label">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="项目大类">
                        <el-select v-model="project.depAuditOpinion" placeholder="请选择">
                            <el-option
                                    v-for="item in xmdl"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                        &nbsp&nbsp&nbsp&nbsp&nbsp项目类别&nbsp&nbsp&nbsp&nbsp
                        <el-select v-model="project.projectType" placeholder="请选择">
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
                                  v-model="project.investmentEstimate"></el-input>
                        项目负责人
                        <el-input style="width: 215px" v-model="project.personInCharge"></el-input>
                    </el-form-item>
                    <el-form-item label="预计工期">
                        <el-input v-model="project.techAuditOpinion" style="width: 215px;padding-right: 20px"></el-input>
                        &nbsp项目分类&nbsp&nbsp&nbsp
                        <el-select v-model="project.reviser" placeholder="请选择">
                            <el-option
                                    v-for="item in xmfl"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="立项背景理由">
                        <el-input v-model="project.establishReason" type="textarea"
                                  :autosize="{ minRows: 2, maxRows: 4}"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="立项内容规模">
                        <el-input v-model="project.scale" type="textarea"
                                  :autosize="{ minRows: 2, maxRows: 4}"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="投资概算说明">
                        <el-input v-model="project.illustration" type="textarea"
                                  :autosize="{ minRows: 2, maxRows: 4}"
                        ></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="show_xjxmlxd = false">取 消</el-button>
                <el-button type="primary" @click="qdxj">确 定</el-button>
            </span>
            </el-dialog>

            <!-- 项目详情弹窗 -->
            <el-dialog :show-close="false" title="项目详情" :visible.sync="show_xq"width="680px">
                <el-form ref="form" :model="project" label-width="100px">
                    <el-form-item label="项目名称">
                        <el-input v-model="project.projectNam"></el-input>
                    </el-form-item>
                    <el-form-item label="立项时间">
                        <el-date-picker
                                v-model="project.applicationDte"
                                type="date"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                placeholder="选择日期">
                        </el-date-picker>
                        &nbsp&nbsp&nbsp&nbsp立项部门&nbsp&nbsp&nbsp&nbsp
                        <el-select v-model="project.declarationDep" placeholder="请选择">
                            <el-option
                                    v-for="item in department_options"
                                    :key="item.label"
                                    :label="item.label"
                                    :value="item.label">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="项目大类">
                        <el-select v-model="project.depAuditOpinion" placeholder="请选择">
                            <el-option
                                    v-for="item in xmdl"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                        &nbsp&nbsp&nbsp&nbsp&nbsp项目类别&nbsp&nbsp&nbsp&nbsp
                        <el-select v-model="project.projectType" placeholder="请选择">
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
                                  v-model="project.investmentEstimate"></el-input>
                        项目负责人
                        <el-input style="width: 215px" v-model="project.personInCharge"></el-input>
                    </el-form-item>
                    <el-form-item label="预计工期">
                        <el-input v-model="project.techAuditOpinion" style="width: 215px;padding-right: 20px"></el-input>
                        &nbsp项目分类&nbsp&nbsp&nbsp
                        <el-select v-model="project.reviser" placeholder="请选择">
                            <el-option
                                    v-for="item in xmfl"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="立项背景理由">
                        <el-input v-model="project.establishReason" type="textarea"
                                  :autosize="{ minRows: 2, maxRows: 4}"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="立项内容规模">
                        <el-input v-model="project.scale" type="textarea"
                                  :autosize="{ minRows: 2, maxRows: 4}"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="投资概算说明">
                        <el-input v-model="project.illustration" type="textarea"
                                  :autosize="{ minRows: 2, maxRows: 4}"
                        ></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="()=>{show_xq=false;project=[]}">取消</el-button>
                <el-button type="primary" @click="qdxg">确定修改</el-button>
            </span>
            </el-dialog>
            <el-dialog title="状态" :visible.sync="show_zt" width="920px">
                <img :src='src'/>
                <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="show_zt=false">确 定</el-button>
            </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        inject:['reload'],
        name: 'basetable',
        data() {
            return {
                groupId:localStorage.getItem("groupId"),
                //新建项目立项单
                show_xjxmlxd: false,
                //是否可编辑
                isEdit: false,
                bm: '',
                projects: [],
                show_xq: false,
                ip: 'http://localhost:8080',
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
                //项目大类
                xmdl: [{
                    id: '股份项目',
                    name: '股份项目'
                }, {
                    id: '内部项目',
                    name: '内部项目'
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
                //项目分类
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
                url: './vuetable.json',
                tableData: [],
                multipleSelection: [],
                select_cate: '',
                select_xmmc: '',
                select_code: '',
                del_list: [],
                is_search: false,
                editVisible: false,
                delVisible: false,
                src:'',
                show_zt:false,
                user: {},
                form: {
                    name: '',
                    date: '',
                    address: ''
                },
                idx: -1,
                //项目数
                count:0,

            }
        },
        created() {
            this.getDepartment_optins()
            this.getProjects(1)
            this.getcounts()
        },
        computed: {
            data() {
                return this.tableData.filter((d) => {
                    let is_del = false;
                    for (let i = 0; i < this.del_list.length; i++) {
                        if (d.name === this.del_list[i].name) {
                            is_del = true;
                            break;
                        }
                    }
                    if (!is_del) {
                        if (d.address.indexOf(this.select_cate) > -1 &&
                            (d.name.indexOf(this.select_word) > -1 ||
                                d.address.indexOf(this.select_word) > -1)
                        ) {
                            return d;
                        }
                    }
                })
            }
        },
        methods: {
            //分页请求
            currentChange(pageNum){
                this.getProjects(pageNum)
            },
            getcounts(){
                axios.get(this.ip+'/projectApplication/AllCounts')
                    .then(res=>{
                        this.count=res.data
                    })
            },
            //状态
            zt(row) {
                if(row.pid!=null&&row.pid!=''){
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
                }else {
                    this.$message.info("该项目还未开始申请！")
                }
            },
            //项目编号
            xmbhSearch() {
                axios.get(this.ip+'/projectApplication/xmbhss',{
                    params:{
                        projectNo:this.select_code
                    }
                })
                    .then(res=>{
                        if(res.data.length==0)
                            this.$message.error("没搜索到相关项目！")
                        else{
                            this.projects=res.data
                            //拿到当前项目的节点
                            for(let i=0;i<this.projects.length;i++){
                                if(this.projects[i].pid==''||this.projects[i].pid==null){
                                    this.projects[i].dqjd="未申请！"
                                    this.$set(this.projects, i, this.projects[i]);
                                }else {
                                    //请求
                                    axios.get(this.ip+'/projectApplication/getPidNode',{
                                        params:{
                                            pid:this.projects[i].pid
                                        }
                                    })
                                        .then(res=>{
                                            this.projects[i].dqjd=res.data
                                            this.$set(this.projects, i, this.projects[i]);
                                        })
                                }
                            }
                        }
                    })
            },
            //项目名称搜索
            xmmcSearch() {
                axios.get(this.ip + '/projectApplication/xmmcss', {
                    params: {
                        projectName: this.select_xmmc
                    }
                })
                    .then(res => {
                        if (res.data.length == 0)
                            this.$message.error("没找到相关项目")
                        else {
                            this.projects = res.data
                            //拿到当前项目的节点
                            for (let i = 0; i < this.projects.length; i++) {
                                if (this.projects[i].pid == '' || this.projects[i].pid == null) {
                                    this.projects[i].dqjd = "未申请！"
                                    this.$set(this.projects, i, this.projects[i]);
                                } else {
                                    //请求
                                    axios.get(this.ip + '/projectApplication/getPidNode', {
                                        params: {
                                            pid: this.projects[i].pid
                                        }
                                    })
                                        .then(res => {
                                            this.projects[i].dqjd = res.data
                                            this.$set(this.projects, i, this.projects[i]);
                                        })
                                }
                            }
                        }
                    })
            },
            //判断是否可申请
            isSq(row) {
                if (localStorage.getItem('groupId') !== 'doman') {
                    return false
                } else {
                    axios.get(this.ip + '/projectApplication/isSq', {
                        params: {
                            projectId: row.id
                        }
                    })
                        .then(res => {
                            return res.data
                        })
                }
            },
            //新建项目立项单
            xjxmlxd() {
                if (localStorage.getItem('groupId') === 'doman' || localStorage.getItem('groupId') === 'jsb_doman') {
                    this.project = {proposer: localStorage.getItem('userName')}
                    this.show_xjxmlxd = true
                } else {
                    this.$message.error("当前账号非办事员！不能新建！")
                }

            },
            //开始申请
            kssq(index, row) {
                axios.post(this.ip + '/projectApplication/qqglStartSq', row)
                    .then(res => {
                        this.$message.success("申请成功！")
                        //申请成功，重新请求
                       // this.getProjects()
                        this.reload()
                    })


            // axios.get(this.ip + '/projectApplication/qdsqr', {//确定申请人
            //         params: {
            //             projectId: row.id,
            //             userId: localStorage.getItem('userId')
            //         }
            //     })
            //         .then(res => {
            //             if (res.data) {//确实是否可申请
            //                 axios.get(this.ip + '/projectApplication/isSq', {
            //                     params: {
            //                         projectId: row.id
            //                     }
            //                 })
            //                     .then(res => {
            //                         if (res.data) {
            //                             this.idx = index
            //                             axios.post(this.ip + '/projectApplication/qqglStartSq', row)
            //                                 .then(res => {
            //                                     if (!res.data === '') {
            //                                         this.projects[this.idx].pid = res.data;
            //                                     }
            //                                     this.$message.success("申请成功！")
            //                                     //申请成功，重新请求
            //                                     this.getProjects()
            //                                 })
            //                         } else {
            //                             this.$message.error("该项目现在不可申请！")
            //                         }
            //                     })
            //             } else {
            //                 this.$message.error("该账号非申请人！申请失败！")
            //             }
            //         })

            },
            //确认修改
            qdxg() {
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
                                        this.getProjects(1)
                                    }
                                })
                        } else {
                            this.$message.error("修改失败！该账号非申请人！")
                            this.getProjects(1)
                        }
                    })
                this.show_xq = false
            },
            //拿到所有项目
            getProjects(pageNum) {
                this.projects = []
                this.isSqs = new Map()
                axios.get(this.ip + '/projectApplication/getAllProject',{
                    params:{
                        pageNum:pageNum,
                        userId:localStorage.getItem('userId')
                    }
                })
                    .then(res => {
                        if (localStorage.getItem('groupId') != 'doman'&&localStorage.getItem('groupId') != 'jsb_doman') {//如果不是办事员或者技术部办事员，不可申请
                            for (let i = 0; i < res.data.length; i++) {
                                this.isSqs.set(res.data[i].id, false)
                            }
                            this.projects = res.data
                            //拿到当前项目的节点
                            for(let i=0;i<this.projects.length;i++){
                                if(this.projects[i].pid==''||this.projects[i].pid==null){
                                    this.projects[i].dqjd="未申请！"
                                    this.$set(this.projects, i, this.projects[i]);
                                }else {
                                    //请求
                                    axios.get(this.ip+'/projectApplication/getPidNode',{
                                        params:{
                                            pid:this.projects[i].pid
                                        }
                                    })
                                        .then(res=>{
                                            this.projects[i].dqjd=res.data
                                            this.$set(this.projects, i, this.projects[i]);
                                        })
                                }
                            }
                        } else {
                            let qq = []
                            for (let i = 0; i < res.data.length; i++) {
                                qq.push(axios.get(this.ip + '/projectApplication/isSq', {
                                    params: {
                                        projectId: res.data[i].id
                                    }
                                })
                                    .then(xxx => {
                                        this.isSqs.set(res.data[i].id, xxx.data)
                                    }))

                            }
                            axios.all(qq)
                                .then(axios.spread((acct, perms)=>{
                                    this.projects=res.data
                                    //拿到当前项目的节点
                                    for(let i=0;i<this.projects.length;i++){
                                        if(this.projects[i].pid==''||this.projects[i].pid==null){
                                            this.projects[i].dqjd="未申请！"
                                            this.$set(this.projects, i, this.projects[i]);
                                        }else {
                                            //请求
                                            axios.get(this.ip+'/projectApplication/getPidNode',{
                                                params:{
                                                    pid:this.projects[i].pid
                                                }
                                            })
                                                .then(res=>{
                                                    this.projects[i].dqjd=res.data
                                                    this.$set(this.projects, i, this.projects[i]);
                                                })
                                        }
                                    }
                                }))
                        }

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
            isnull(data){
                if(data==''||data==null)
                    return true;
                return false;
            },
            //确定新建
            qdxj() {
                if(this.isnull(this.project.projectNam)||this.isnull(this.project.reviser)||this.isnull(this.project.projectType)||this.isnull(this.project.declarationDep)){
                    this.$message.error("请填写详细信息！")
                    return
                }

                axios.post(this.ip + '/projectApplication/insertXm', this.project)
                    .then(res => {
                        if (res.data) {
                            this.$message.success('新建成功！')
                            this.reload()
                            // this.projects.push(this.project)
                            // this.project = {}
                        } else {
                            this.$message.error('新建失败！')
                        }
                    })
                this.show_xjxmlxd = false
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            //项目详情
            xmxq(index, row) {
                this.project = row
                this.show_xq = true
                // this.idx = index;
                // const item = this.tableData[index];
                // this.form = {
                //     name: item.name,
                //     date: item.date,
                //     address: item.address
                // }
                // this.editVisible = true;
            },
            //删除按钮
            handleDelete(index, row) {
                this.idx = index;
                this.delVisible = true;
            },
            delAll() {
                const length = this.multipleSelection.length;
                let str = '';
                this.del_list = this.del_list.concat(this.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += this.multipleSelection[i].name + ' ';
                }
                this.$message.error('删除了' + str);
                this.multipleSelection = [];
            },
            // 保存编辑
            saveEdit() {
                this.$set(this.tableData, this.idx, this.form);
                this.editVisible = false;
                this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            },
            // 确定删除
            deleteRow() {
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
                                    if (res.data) {
                                        this.projects.splice(this.idx, 1);
                                        this.$message.success('删除成功');
                                    } else {
                                        this.$message.error('该项目正在审核中,删除失败！');
                                    }
                                })
                        } else {
                            this.$message.error('该账号非申请人账号，删除失败！');
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