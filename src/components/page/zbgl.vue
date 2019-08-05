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
                    <el-button v-if="equalsJs(groupId,'jsb_doman')" type="primary" icon="el-icon-circle-plus"
                               class="handle-del mr10"
                               @click="xjzblc">
                        新建招标流程
                    </el-button>

                    <el-input style="margin-top: 10px" required v-model="select_xmmc" placeholder="项目名称"
                              class="handle-input mr10"></el-input>
                    <el-select
                            clearable
                            style="margin-left: 10px;width: 150px"
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
                    <el-input style="margin-left: 10px;margin-top: 10px" required v-model="select_sqr" placeholder="申请人"
                              class="handle-input mr10"></el-input>
                    <el-input style="margin-left: 10px;margin-top: 10px" required v-model="select_zbr" placeholder="中标人"
                              class="handle-input mr10"></el-input>
                    <el-button style="margin-left: 10px" type="primary" icon="el-icon-search" @click="Search">搜索
                    </el-button>

                    <el-button type="success" icon="el-icon-tickets" style="float:right" @click="qb">全部</el-button>
                </div>
                <el-table stripe :data="clzhaobiaos.slice((currentPage-1)*10,currentPage*10)" border
                          class="table">
                    <el-table-column prop="xmNo" align="center" label="项目编号" width="140">
                    </el-table-column>
                    <el-table-column prop="xmName" label="项目名称" min-width="160">
                    </el-table-column>
                    <el-table-column prop="userName" align="center" label="申请人" width="140">
                    </el-table-column>
                    <el-table-column prop="zbr" align="center" label="中标人" width="140">
                    </el-table-column>
                    <el-table-column prop="zbje" align="center" label="中标金额(元)" width="140">
                    </el-table-column>
                    <el-table-column prop="fbsj" align="center" label="发标时间" width="140">
                    </el-table-column>
                    <el-table-column prop="dbsj" align="center" label="定标时间" width="140">
                    </el-table-column>
                    <!--<el-table-column prop="jsyq" label="技术要求">-->
                    <!--</el-table-column>-->
                    <el-table-column prop="cjsj" align="center" sortable label="创建时间" width="160">
                    </el-table-column>
                    <el-table-column prop="dqjd" align="center" label="当前节点" width="160">
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="200">
                        <template slot-scope="scope">
                            <el-button type="text" icon="el-icon-star-on"
                                       v-if="scope.row.sqr===userId&&(scope.row.dqjd==='立项部门提出技术要求'||scope.row.dqjd==='未申请')"
                                       @click="sq(scope.$index,scope.row)">申请
                            </el-button>
                            <el-button type="text" icon="el-icon-upload" @click="fj(scope.row)">附件
                            </el-button>
                            <el-button type="text" icon="el-icon-star-on" @click="zt(scope.row)">状态
                            </el-button>
                            <el-button type="text" icon="el-icon-tickets" @click="xq(scope.row)">详情
                            </el-button>
                            <el-button type="text" icon="el-icon-edit" v-if="scope.row.sqr===userId"
                                       @click="bj(scope.$index,scope.row)">编辑
                            </el-button>
                            <el-button type="text" class="red" icon="el-icon-delete" v-if="scope.row.sqr===userId"
                                       @click="sc(scope.row)">删除
                            </el-button>

                        </template>
                    </el-table-column>
                </el-table>
                <div style="text-align: center">
                    <el-pagination
                            background
                            :current-page="currentPage"
                            layout="total,prev, pager, next"
                            @current-change="currentChange"
                            :total="clzhaobiaos.length">
                    </el-pagination>
                </div>
            </div>
        </div>

        <!--上传附件弹窗 -->
        <el-dialog :close-on-click-modal="false" title="上传附件" :visible.sync="showfj" width="1000px">

            <el-table :data="bcwjs" border style="margin-top: 20px">
                <el-table-column prop="jd" label="节点" width="110px">
                </el-table-column>
                <el-table-column prop="wjmc" label="文件名称" width="100px">
                </el-table-column>
                <el-table-column label="操作">
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

        <el-dialog :close-on-click-modal="false" title="状态" :visible.sync="show_zt" width="750px">
            <img :src='src'/>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="show_zt=false">确 定</el-button>
            </span>
        </el-dialog>

        <!--新建招标流程弹窗 -->
        <el-dialog :close-on-click-modal="false" title="新建招标流程" :visible.sync="show_xjzblc" width="690px">
            <el-form ref="form" :rules="zbRules" :model="zhaobiao" label-width="100px">
                <el-form-item label="项目">
                    <el-select
                            v-model="zhaobiao.xmid"
                            filterable
                            placeholder="请输入或选择项目"
                    >
                        <el-option
                                v-for="item in xms"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="备注" prop="jsyq">
                    <el-input v-model="zhaobiao.jsyq" rows="4" type="textarea" placeholder="最多1000字"></el-input>
                </el-form-item>

            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="show_xjzblc = false">取 消</el-button>
                <el-button type="primary" @click="ks">确 定</el-button>
            </span>
        </el-dialog>

        <!--编辑招标流程弹窗 -->
        <el-dialog :close-on-click-modal="false" title="编辑招标流程" :visible.sync="show_bj" width="690px">
            <el-form ref="form" :rules="zbRules" :model="zhaobiao" label-width="100px">
                <el-form-item label="项目">
                    <el-select
                            v-model="zhaobiao.xmid"
                            filterable
                            placeholder="请输入或选择项目"
                    >
                        <el-option
                                v-for="item in xms"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="备注" prop="jsyq">
                    <el-input v-model="zhaobiao.jsyq" rows="4" type="textarea" placeholder="最多1000字"></el-input>
                </el-form-item>

            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="show_bj = false">取 消</el-button>
                <el-button type="primary" @click="qd_bj">确 定</el-button>
            </span>
        </el-dialog>

        <!--点击详情弹窗 -->
        <el-dialog :close-on-click-modal="false" title="招标流程审批" :visible.sync="show_xq" width="690px">
            <el-form ref="form" label-width="100px">
                <el-form-item label="项目">
                    <el-input readonly style="color:#FF0000;" v-model="zhaobiao.xmName" rows="6"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input readonly v-model="zhaobiao.jsyq" rows="6" type="textarea"></el-input>
                </el-form-item>
                <el-form-item label="发标时间">
                    <el-date-picker readonly v-model="zhaobiao.fbsj" type="date" placeholder="选择日期"
                                    value-format="yyyy-MM-dd"
                                    style="width: 205px"></el-date-picker>
                    &nbsp&nbsp&nbsp&nbsp定标时间&nbsp&nbsp&nbsp&nbsp
                    <el-date-picker readonly v-model="zhaobiao.dbsj" type="date" placeholder="选择日期"
                                    value-format="yyyy-MM-dd"
                                    style="width: 205px"></el-date-picker>
                </el-form-item>
                <el-form-item label="中标单位">
                    <el-input readonly v-model="zhaobiao.zbr"></el-input>
                </el-form-item>
                <el-form-item label="中标金额(元)">
                    <el-input readonly v-model="zhaobiao.zbje"></el-input>
                </el-form-item>
                <el-form-item label="工期">
                    <el-input readonly v-model="zhaobiao.tbjzsj"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-table
                            :data="bzs"
                    >
                        <el-table-column
                                prop="usernam"
                                label="姓名"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="time"
                                label="时间"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="comment"
                                label="备注"
                                width="180">
                        </el-table-column>
                    </el-table>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="lxxq(zhaobiao.xmid)">立项详情
                    </el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!--立项详情-->
        <el-dialog title="立项详情" :visible.sync="lxxqShow" width="50%">
            <el-form :model="project" label-position="left" label-width="120px">
                <el-form-item label="项目编号">
                    <el-input v-model="project.projectNo" readonly/>
                </el-form-item>
                <el-form-item label="项目名称">
                    <el-input v-model="project.projectNam" readonly/>
                </el-form-item>
                <el-form-item style="margin-left: -120px;">
                    <el-col :span="11">
                        <el-form-item label="立项时间">
                            <el-input v-model="project.applicationDte" readonly/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="2">
                        <el-form-item label="立项部门">
                            <el-input v-model="project.declarationDep" readonly/>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item style="margin-left: -120px;">
                    <el-col :span="11">
                        <el-form-item label="立项类别">
                            <el-input v-model="project.depAuditOpinion" readonly/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="2">
                        <el-form-item label="项目类别">
                            <el-input v-model="project.projectType" readonly/>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item style="margin-left: -120px;">
                    <el-col :span="11">
                        <el-form-item label="投资预算">
                            <el-input v-model="project.investmentEstimate" readonly/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="2">
                        <el-form-item label="项目负责人">
                            <el-input v-model="project.personInCharge" readonly/>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item style="margin-left: -120px;">
                    <el-col :span="11">
                        <el-form-item label="预计工期">
                            <el-input v-model="project.techAuditOpinion" readonly/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="2">
                        <el-form-item label="项目大类">
                            <el-input v-model="project.reviser" readonly/>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item style="margin-left: -120px;">
                    <el-col :span="11">
                        <el-form-item label="两会时间">
                            <el-input v-model="project.lhsj" readonly/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="2">
                        <el-form-item label="总经会时间">
                            <el-input v-model="project.zjhsj" readonly/>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="立项背景理由">
                    <el-input v-model="project.establishReason" readonly type="textarea"
                              :autosize="{ minRows: 4, maxRows: 10}"></el-input>
                </el-form-item>

                <el-form-item label="立项内容规模">
                    <el-input v-model="project.scale" readonly type="textarea"
                              :autosize="{ minRows: 4, maxRows: 10}"></el-input>
                </el-form-item>
                <el-form-item label="投资概算说明">
                    <el-input v-model="project.illustration" readonly type="textarea"
                              :autosize="{ minRows: 4, maxRows: 10}"></el-input>
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
            <div slot="footer" class="dialog-footer">
                <el-button @click="lxxqShow = false">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        inject: ['reload'],
        name: 'zbgl',
        data() {
            return {
                jds: [{
                    value: '未申请',
                    label: '未申请'
                },
                    {
                        value: '技术部经办人',
                        label: '技术部经办人',
                    }, {
                        value: '主管经理',
                        label: '技术部主管经理'
                    }, {
                        value: '经理',
                        label: '技术部经理'
                    }, {
                        value: '定标',
                        label: '定标'
                    }, {
                        value: '招标结束',
                        label: '招标结束'
                    }],
                select_jd: '',
                //编辑弹窗
                show_bj: false,
                //部门搜索第一次
                bmssdyc: true,
                bms: [],
                select_dptnm: '',
                //项目名称搜索
                select_xmmc: '',
                //申请人搜索
                select_sqr: '',
                //中标人搜索
                select_zbr: '',
                //默认当前页
                currentPage: 1,
                bzs: [],
                userId: localStorage.getItem('userId'),
                groupId: localStorage.getItem('groupId'),
                departmentName: localStorage.getItem('departmentName'),
                //投标单位
                dw: '',
                src: '',
                clzhaobiaos: [],
                //储存最开始的所有，搜索要用
                zjzhaobiaos: [],
                //第一次搜索
                dycss: true,
                message: 'first',
                url: '',
                projectId: '',
                show_zt: false,
                //新建招标弹窗
                show_xjzblc: false,
                //详情弹窗
                show_xq: false,
                xms: [],
                loading: false,
                ip: 'http://10.197.41.100:8080',
                fileList: [],
                list: [],
                zhaobiao: {
                    id: '',
                    xmid: '',
                    jsyq: '',
                    fbsj: '',
                    pbsj: '',
                    tbjzsj: '',
                    sqr: '',
                    zbpid: ''
                },
                zhaobiaos: [],
                //投标单位
                tbdws: [],
                //中标
                zhongbiao: {
                    id: '',
                    zbid: '',
                    xmid: '',
                    zhongbiaodw: '',
                    zhongbiaojg: ''
                },
                //中标单位
                zhongbiaos: [],
                showfj: false,
                // //发标时间
                // fbsj:'',
                // //评标时间
                // pbsj:'',
                // //投标截止时间
                // tbjzsj:''
                // 招标新建验证规则
                zbRules: {
                    jsyq: [
                        {max: 1000, message: '最多1000字', trigger: 'change'}
                    ]
                },
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
                    lhsj: '',
                    zjhsj: '',
                    pid: ''
                },
                lxxqShow: false,
                bcwjs: [],
                idx: -1,
                //立项详情的审批列表
                commentList: []
            }
        },
        created() {
            //this.lqzhaobiao()
            this.getAllzhaobiao()
            this.getAllDptName()
            //拿必传文件列表
            this.getBcwjs()
        },
        methods: {
            recordCurrentRow(row) {
                this.currentRow = row;
                var index = this.url.indexOf("&bcwjid=")
                if (index != -1) {
                    this.url = this.url.substring(0, index + 8) + this.currentRow.id;
                } else {
                    this.url = this.url + "&bcwjid=" + this.currentRow.id
                }
            },

            //拿前期必传文件列表
            getBcwjs() {
                axios.get(this.ip + '/bcwj/select', {
                    params: {
                        lc: '招标'
                    }
                }).then(res => {
                    this.bcwjs = res.data
                    // this.bcwjs.push()
                })
            },

            //确定编辑
            qd_bj() {
                axios.get(this.ip + '/zhaobiao/updata', {
                    params: {
                        id: this.zhaobiao.id,
                        xmid: this.zhaobiao.xmid,
                        jsyq: this.zhaobiao.jsyq
                    }
                }).then(res => {
                    if (res.data) {
                        this.$message.success("修改成功！")
                        //项目编号和项目名称
                        axios.get(this.ip + '/projectApplication/selectNameAndNo', {
                            params: {
                                xmid: this.zhaobiao.xmid
                            }
                        }).then(res => {
                            this.zhaobiao.xmNo = res.data.project_no
                            this.zhaobiao.xmName = res.data.project_nam
                            //更新数组
                            this.clzhaobiaos.splice(this.idx, 1, this.zhaobiao)
                        })
                        this.show_bj = false
                        // this.reload()
                    } else {
                        this.$message.error("修改失败！")
                    }
                })
            },

            //点击编辑事件
            bj(index, row) {
                this.idx = index
                //判断是否可以编辑
                if (row.dqjd == '未申请' || row.dqjd == '立项部门提出技术要求') {
                    //可以编辑
                    this.zhaobiao = row
                    axios.get(this.ip + '/projectApplication/getSelfWzzXmidAndXmname', {
                        params: {
                            userName: localStorage.getItem('userName')
                        }
                    })
                        .then(res => {
                            this.xms = res.data
                            //当前项目也得加进去
                            this.xms.push({
                                value: row.xmid,
                                label: row.xmName
                            })
                        })
                    this.show_bj = true
                } else {
                    if (row.dqjd == '技术部经办人') {
                        axios.get(this.ip + '/user/isJsb', {
                            params: {
                                userId: row.sqr
                            }
                        }).then(res => {
                            if (res.data) {
                                //可以编辑
                                this.zhaobiao = row
                                axios.get(this.ip + '/projectApplication/getSelfWzzXmidAndXmname', {
                                    params: {
                                        userName: localStorage.getItem('userName')
                                    }
                                })
                                    .then(res => {
                                        this.xms = res.data
                                        //当前项目也得加进去
                                        this.xms.push({
                                            value: row.xmid,
                                            label: row.xmName
                                        })
                                    })
                                this.show_bj = true
                            } else {
                                this.$message.error("正在审批！无法编辑！")
                                return
                            }
                        })
                    } else {
                        this.$message.error("正在审批！无法编辑！")
                        return
                    }
                }
            },

            //删除事件
            sc(row) {
                this.$confirm('删除不可逆, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    if (row.dqjd == '未申请' || row.dqjd == '立项部门提出技术要求') {
                        axios.get(this.ip + '/zhaobiao/delete', {
                            params: {
                                id: row.id
                            }
                        }).then(res => {
                            if (res.data) {
                                this.$message.success("删除成功！")
                                this.removeByValue(this.clzhaobiaos, row)
                                return
                            } else {
                                this.$message.error("删除失败！")
                                return
                            }
                        })
                    } else {
                        if (row.dqjd == '技术部经办人') {
                            axios.get(this.ip + '/user/isJsb', {
                                params: {
                                    userId: row.sqr
                                }
                            }).then(res => {
                                if (res.data) {
                                    axios.get(this.ip + '/zhaobiao/delete', {
                                        params: {
                                            id: row.id
                                        }
                                    }).then(res => {
                                        if (res.data) {
                                            this.$message.success("删除成功！")
                                            this.removeByValue(this.clzhaobiaos, row)
                                            return
                                        } else {
                                            this.$message.error("删除失败！")
                                            return
                                        }
                                    })
                                } else {
                                    this.$message.error("正在审批！无法删除！")
                                    return
                                }
                            })
                        } else {
                            this.$message.error("正在审批！无法删除！")
                            return
                        }
                    }
                })
                    .catch(() => {
                    })
            },

            //全部按钮
            qb() {
                if (this.zjzhaobiaos.length == 0) {
                    this.getAllzhaobiao()
                } else {
                    this.clzhaobiaos = this.zjzhaobiaos
                }
                this.dycss = true
            },

            Search() {
                if (this.dycss) {//第一次搜索
                    this.zjzhaobiaos = this.clzhaobiaos.concat()
                    this.dycss = false
                } else {
                    this.clzhaobiaos = this.zjzhaobiaos.concat()
                }
                //名称的过滤
                if (this.select_xmmc != null && this.select_xmmc != '') {
                    for (let i = 0; i < this.clzhaobiaos.length; i++) {
                        if (String(this.clzhaobiaos[i].xmName).indexOf(this.select_xmmc) == -1) {//不包含删除
                            this.clzhaobiaos.splice(i, 1)
                            i--;
                        }
                    }
                }
                //节点的过滤
                if (this.select_jd != null && this.select_jd != '') {
                    for (let i = 0; i < this.clzhaobiaos.length; i++) {
                        if (String(this.clzhaobiaos[i].dqjd) != this.select_jd) {
                            this.clzhaobiaos.splice(i, 1)
                            i--;
                        }
                    }
                }
                //申请人的过滤
                if (this.select_sqr != null && this.select_sqr != '') {
                    for (let i = 0; i < this.clzhaobiaos.length; i++) {
                        if (String(this.clzhaobiaos[i].userName).indexOf(this.select_sqr) == -1) {
                            this.clzhaobiaos.splice(i, 1)
                            i--;
                        }
                    }
                }
                //中标人的过滤
                if (this.select_zbr != null && this.select_zbr != '') {
                    for (let i = 0; i < this.clzhaobiaos.length; i++) {
                        if (String(this.clzhaobiaos[i].zbr).indexOf(this.select_zbr) == -1) {
                            this.clzhaobiaos.splice(i, 1)
                            i--;
                        }
                    }
                }
                this.currentPage = 1
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

            //上一页下一页事件
            currentChange(currentPage) {
                this.currentPage = currentPage;
            },

            //完工招标
            wczb() {
                this.cl('', '')
            },

            //删除中标单位
            sczbdw(row) {
                axios.get(this.ip + '/zhongbiao/deletZhongbiao', {
                    params: {
                        id: row.id
                    }
                }).then(res => {
                    if (res.data) {
                        this.getZhongbiaodw()
                    }
                })
            },

            //添加中标单位
            tjzbdw() {
                this.zhongbiao.zbid = this.zhaobiao.id
                this.zhongbiao.xmid = this.zhaobiao.xmid
                axios.post(this.ip + '/zhongbiao/addZhongbiao', this.zhongbiao)
                    .then(res => {
                        if (res.data) {
                            this.$message.success("新建成功！")
                            this.zhongbiao.zhongbiaodw = ''
                            this.zhongbiao.zhongbiaojg = ''
                            this.getZhongbiaodw()
                        } else {
                            this.$message.error("失败！")
                        }

                    })
            },

            //拿到中标单位
            getZhongbiaodw() {
                axios.get(this.ip + '/zhongbiao/getZhongbiaoByZbid', {
                    params: {
                        zbid: this.zhaobiao.id
                    }
                }).then(res => {
                    this.zhongbiaos = res.data
                })
            },

            //点击附件事件
            fj(row) {
                //判定当前账号是否为改项目的处理人之一
                axios.get(this.ip + '/user/isClr', {
                    params: {
                        xmid: row.xmid,
                        userId: localStorage.getItem('userId')
                    }
                }).then(res => {
                    if (res.data) {
                        this.zhaobiao = row
                        if (row.zbpid == '' || row.zbpid == null) {//未申请
                            this.url = 'http://10.197.41.100:8080/contract/uploadHtfj?id=' + row.id + '&userId=' + localStorage.getItem('userId')
                        } else {//已经申请
                            this.url = 'http://10.197.41.100:8080/zhaobiao/uploadFile?zbpid=' + row.zbpid + '&userId=' + localStorage.getItem('userId')
                        }
                        //拿附件信息
                        for (let i = 0; i < this.bcwjs.length; i++) {
                            axios.get(this.ip + '/Attachment/getattachment2', {
                                params: {
                                    id: row.id,
                                    bcwjid: this.bcwjs[i].id
                                }
                            })
                                .then(res => {
                                    this.fileList.splice(i, 1, [])
                                    if (res.data) {
                                        for (let j = 0; j < res.data.length; j++) {
                                            this.fileList[i].push({
                                                name: res.data[j].attachment_nam,
                                                id: res.data[j].attachment_id,
                                                scr: res.data[j].scr,
                                                scsj: res.data[j].scsj
                                            })
                                        }
                                    }
                                })
                        }
                        this.showfj = true
                    } else {
                        this.$message.error("您没权限！")
                    }
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

            //详情
            xq(row) {
                this.zhaobiao = row
                this.getZhongbiaodw()
                this.getbzs()
                this.show_xq = true
            },

            lxxq(xmid) {// 立项详情
                this.lxxqShow = true
                axios.get('http://10.197.41.100:8080/projectApplication/getXmById', {
                    params: {
                        xmid: xmid
                    }
                }).then(res => {
                    this.project = res.data
                })

                //领取前期评论
                axios.get(this.ip + '/projectApplication/projectIdTocomment', {
                    params: {
                        projectId: xmid
                    }
                })
                    .then(res => {
                        if (res.data) {
                            this.commentList = res.data
                        }
                    })

            },

            //拿备注
            getbzs() {
                axios.get(this.ip + '/zhaobiao/getComment', {
                    params: {
                        zbpid: this.zhaobiao.zbpid
                    }
                }).then(res => {
                    this.bzs = res.data
                })
            },

            //删除请求
            handleBeforeRemove(file, fileList) {
                if (this.zhaobiao.zbpid != '' && this.zhaobiao.zbpid != null) {
                    fileList.push(file)
                    this.$message.error("删除失败！附件只能在处理节点删除！")
                } else {
                    this.$confirm('此操作将永久删除该附件,是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        axios.get(this.ip + '/contract/deletFj', {
                            params: {
                                fid: file.id,
                                fname: file.name,
                                jlid: this.zhaobiao.id
                            }
                        })
                            .then(res => {
                                this.$message.success("删除成功！")
                            })
                    }).catch(() => {
                        fileList.push(file)
                    })
                }
            },

            //拿到招标
            getAllzhaobiao() {
                if (this.departmentName !== '办公室.' && (this.equalsJs(this.groupId, 'zgjl') || this.equalsJs(this.groupId, 'jl') || this.equalsJs(this.groupId, 'doman'))) {
                    //如果是主管经理或者经理拿到自己部门所有的招标信息
                    axios.get(this.ip + '/zhaobiao/getselfDptZb', {
                        params: {
                            departmentId: localStorage.getItem('departmentId')
                        }
                    }).then(res => {
                        if (res.data.length != 0) {
                            this.clzhaobiaos = res.data
                            //填充项目名称、用户名、中标人、中标金额
                            //for (let i = 0; i < this.clzhaobiaos.length; i++) {
                            // //填充节点
                            // if (this.clzhaobiaos[i].zbpid == null || this.clzhaobiaos[i].zbpid == '') {
                            //     this.clzhaobiaos[i].dqjd = '未申请'
                            //     this.$set(this.clzhaobiaos, i, this.clzhaobiaos[i])
                            // } else {
                            //     axios.get(this.ip + '/zhaobiao/getZhaobiaoNode', {
                            //         params: {
                            //             zbpid: this.clzhaobiaos[i].zbpid
                            //         }
                            //     }).then(res => {
                            //         this.clzhaobiaos[i].dqjd = res.data
                            //         this.$set(this.clzhaobiaos, i, this.clzhaobiaos[i])
                            //     })
                            // }

                            //填充中标人,中标金额
                            // axios.get(this.ip + '/zhongbiao/getZhongbiaoByZbid', {
                            //     params: {
                            //         zbid: this.clzhaobiaos[i].id
                            //     }
                            // }).then(res => {
                            //     if (res.data.length != 0) {
                            //         this.clzhaobiaos[i].zbr = res.data[0].zhongbiaodw
                            //         this.clzhaobiaos[i].zbje = res.data[0].zhongbiaojg
                            //         this.$set(this.clzhaobiaos, i, this.clzhaobiaos[i]);
                            //     }
                            // })

                            //项目编号和项目名称
                            // axios.get(this.ip + '/projectApplication/selectNameAndNo', {
                            //     params: {
                            //         xmid: this.clzhaobiaos[i].xmid
                            //     }
                            // }).then(res => {
                            //     this.clzhaobiaos[i].xmNo = res.data.project_no
                            //     this.clzhaobiaos[i].xmName = res.data.project_nam
                            //     this.$set(this.clzhaobiaos, i, this.clzhaobiaos[i]);
                            // })
                            //填充申请人
                            // axios.get(this.ip + '/user/userIdTouserName', {
                            //     params: {
                            //         userId: this.clzhaobiaos[i].sqr
                            //     }
                            // }).then(res => {
                            //     this.clzhaobiaos[i].userName = res.data
                            //     this.$set(this.clzhaobiaos, i, this.clzhaobiaos[i])
                            // })

                            // }
                        }
                    })
                } //else if (this.groupId === 'jsb_jl' || this.groupId === 'jsb_zgjl'||this.groupId==='jsb_doman'||this.groupId==='bgs') {//技术部经理和技术部主管看所有招标信息
                else {
                    axios.get(this.ip + '/zhaobiao/jsbjlGetAllZhaobiao')
                        .then(res => {
                            if (res.data.length != 0) {
                                this.clzhaobiaos = res.data
                                //填充项目名称、用户名、中标人、中标金额
                                //for (let i = 0; i < this.clzhaobiaos.length; i++) {

                                //填充节点
                                // if (this.clzhaobiaos[i].zbpid == null || this.clzhaobiaos[i].zbpid == '') {
                                //     this.clzhaobiaos[i].dqjd = '未申请'
                                //     this.$set(this.clzhaobiaos, i, this.clzhaobiaos[i])
                                // } else {
                                //     axios.get(this.ip + '/zhaobiao/getZhaobiaoNode', {
                                //         params: {
                                //             zbpid: this.clzhaobiaos[i].zbpid
                                //         }
                                //     }).then(res => {
                                //         this.clzhaobiaos[i].dqjd = res.data
                                //         this.$set(this.clzhaobiaos, i, this.clzhaobiaos[i])
                                //     })
                                // }

                                //填充中标人,中标金额
                                // axios.get(this.ip + '/zhongbiao/getZhongbiaoByZbid', {
                                //     params: {
                                //         zbid: this.clzhaobiaos[i].id
                                //     }
                                // }).then(res => {
                                //     if (res.data.length != 0) {
                                //         this.clzhaobiaos[i].zbr = res.data[0].zhongbiaodw
                                //         this.clzhaobiaos[i].zbje = res.data[0].zhongbiaojg
                                //         this.$set(this.clzhaobiaos, i, this.clzhaobiaos[i]);
                                //     }
                                // })

                                //项目编号和项目名称
                                // axios.get(this.ip + '/projectApplication/selectNameAndNo', {
                                //     params: {
                                //         xmid: this.clzhaobiaos[i].xmid
                                //     }
                                // }).then(res => {
                                //     this.clzhaobiaos[i].xmNo = res.data.project_no
                                //     this.clzhaobiaos[i].xmName = res.data.project_nam
                                //     this.$set(this.clzhaobiaos, i, this.clzhaobiaos[i]);
                                // })


                                //填充申请人
                                // axios.get(this.ip + '/user/userIdTouserName', {
                                //     params: {
                                //         userId: this.clzhaobiaos[i].sqr
                                //     }
                                // }).then(res => {
                                //     this.clzhaobiaos[i].userName = res.data
                                //     this.$set(this.clzhaobiaos, i, this.clzhaobiaos[i]);
                                // })
                                // }
                            }
                        })
                }
            },

            //状态
            zt(row) {
                if (row.dqjd === '未申请') {
                    this.$message.info("当前项目还未招标申请！无状态！")
                    return
                }
                //请求是否工程技术部项目
                axios.get(this.ip + '/user/isJsb', {
                    params: {
                        userId: row.sqr
                    }
                }).then(res => {
                    if (res.data) {//是工程技术部
                        if (row.dqjd === '技术部经办人') {
                            this.src = require('@/assets/img/j_jsbjbr.png')
                        } else if (row.dqjd === '主管经理') {
                            this.src = require('@/assets/img/j_zgjl.png')
                        } else if (row.dqjd === '经理') {
                            this.src = require('@/assets/img/j_jl.png')
                        } else if (row.dqjd === '定标') {
                            this.src = require('@/assets/img/j_db.png')
                        } else if (row.dqjd === '招标结束') {
                            this.src = require('@/assets/img/j_zbjs.png')
                        }
                    } else {
                        if (row.dqjd === '立项部门提出技术要求') {
                            this.src = require('@/assets/img/lxbmtcjsyq.png')
                        } else if (row.dqjd === '技术部经办人') {
                            this.src = require('@/assets/img/jsbjbr.png')
                        } else if (row.dqjd === '主管经理') {
                            this.src = require('@/assets/img/zgjl.png')
                        } else if (row.dqjd === '经理') {
                            this.src = require('@/assets/img/jl.png')
                        } else if (row.dqjd === '定标') {
                            this.src = require('@/assets/img/db.png')
                        } else if (row.dqjd === '招标结束') {
                            this.src = require('@/assets/img/zbjs.png')
                        }
                    }
                    this.show_zt = true
                })
            },

            //申请
            sq(index, row) {
                const loading = this.$loading({
                    lock: true,
                    text: '处理中……',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                })
                //检查文件
                axios.get(this.ip + "/bcwj/jcwj", {
                    params: {
                        id: row.id,
                        lc: '招标',
                        dqjd: '技术部经办人'
                    }
                }).then(res => {
                    //有文件
                    if (res.data) {
                        //判断该项目是否可进行招标申请
                        axios.get(this.ip + "/zhaobiao/canZhaobiaoSq", {
                            params: {
                                projectId: row.xmid
                            }
                        }).then(res => {
                            if (res.data) {//可以申请
                                axios.get(this.ip + '/zhaobiao/startZhaobiao', {
                                    params: {
                                        id: row.id
                                    }
                                }).then(res => {
                                    if (res.data != '') {
                                        this.$message.success("申请成功！")
                                        row.dqjd = '主管经理'
                                        row.zbpid = res.data
                                        this.clzhaobiaos.splice(index, 1, row)
                                        loading.close()
                                    } else {
                                        this.$message.error("申请失败！")
                                        loading.close()
                                    }
                                })
                            } else {
                                loading.close()
                                this.$message.error("该项目还未进行到两会！不能进行招标！")
                            }
                        })
                    } else {//没文件
                        axios.get(this.ip + '/bcwj/bcwjm', {
                            params: {
                                lc: '招标',
                                dqjd: '技术部经办人'
                            }
                        }).then(res => {
                            let filenames = ''
                            for (let i = 0; i < res.data.length; i++) {
                                filenames = filenames + res.data[i].wjmc + ","
                            }
                            //去后面,
                            filenames = filenames.substring(0, filenames.length - 1)
                            loading.close()
                            this.$message.error("申请前，请上传文件：" + filenames)
                        })
                    }
                })
            },

            //开始
            ks() {
                if (this.zhaobiao.xmid == null || this.zhaobiao.xmid == '' || this.zhaobiao.jsyq == null || this.zhaobiao.jsyq == '') {
                    this.$message.error("请填写信息！")
                    return
                }
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        axios.post(this.ip + '/zhaobiao/insertZhaobiao', this.zhaobiao)
                            .then(res => {
                                if (res.data) {
                                    this.$message.success('创建成功！')
                                    this.zhaobiao.id = res.data.split(':')[0]
                                    this.zhaobiao.sqr = localStorage.getItem('userId')
                                    this.zhaobiao.userName = localStorage.getItem('userName')
                                    this.zhaobiao.dqjd = '未申请'
                                    this.zhaobiao.cjsj = res.data.split(':')[1]
                                    //项目编号和项目名称
                                    axios.get(this.ip + '/projectApplication/selectNameAndNo', {
                                        params: {
                                            xmid: this.zhaobiao.xmid
                                        }
                                    }).then(res => {
                                        this.zhaobiao.xmNo = res.data.project_no
                                        this.zhaobiao.xmName = res.data.project_nam
                                        this.clzhaobiaos.splice(0, 0, this.zhaobiao);
                                    })
                                    this.show_xjzblc = false
                                } else {
                                    this.$message.error("创建失败！")
                                }
                            })
                    }
                })
            },

            //点击文件下载
            handlePreview(file) {
                window.open(this.ip + '/Attachment/Download?fid=' + file.id + '&fname=' + encodeURIComponent(file.name))
            },


            //上传成功，重新请求
            handleSuccess() {
                this.fj(this.zhaobiao)
            },

            //新建招标流程
            xjzblc() {
                this.zhaobiao = {}
                this.getXms()
                this.zhaobiao.sqr = localStorage.getItem('userId')
                this.show_xjzblc = true
            },

            //拿到自己部门项目下拉框数据（只能申请一次）
            //拿到是自己经办人的能招标的项目
            getXms() {
                axios.get(this.ip + '/projectApplication/getSelfWzzXmidAndXmname', {
                    params: {
                        // dpt: localStorage.getItem('departmentName'),
                        userName: localStorage.getItem('userName')
                    }
                })
                    .then(res => {
                        this.xms = res.data
                    })
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
