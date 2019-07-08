<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i>合同表单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button @click="xjht" type="primary" icon="el-icon-circle-plus" class="handle-del mr10">
                    新建合同
                </el-button>
                <el-input placeholder="合同编号" clearable v-model="contractNo" class="handle-input mr10"></el-input>
                <el-input placeholder="合同项目" clearable v-model="projectName" class="handle-input mr10"></el-input>
                <el-date-picker
                        class="handle-input mr10"
                        v-model="ContractDate"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="合同日期">
                </el-date-picker>
                <el-input placeholder="对方当事人" clearable v-model="dfdsr" class="handle-input mr10"></el-input>
                <el-input placeholder="投资文号" clearable v-model="tzwh" class="handle-input mr10"></el-input>
                <el-select
                        clearable
                        class="handle-input mr10"
                        v-model="dqjd"
                        placeholder="节点">
                    <el-option
                            clearable
                            v-for="item in jds"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-search" style="margin-left: 10px" @click="handleSearch">搜索
                </el-button>
            </div>
            <el-table height="600" :data="contracts" border class="table">
                <el-table-column type="expand" width="40">
                    <template slot-scope="props">
                        <el-form style="color: #99a9bf;" label-position="left" inline class="demo-table-expand">
                            <el-form-item label="合同经办人:">
                                <span>{{ props.row.jbr }}</span>
                            </el-form-item>
                            <el-form-item label="主办单位意见:">
                                <span>{{ props.row.zbdwyj }}</span>
                            </el-form-item>
                            <el-form-item label="对方资质审查:">
                                <span>{{ props.row.zzsc }}</span>
                            </el-form-item>
                            <el-form-item label="中标单位:">
                                <span>{{ props.row.dfdsr }}</span>
                            </el-form-item>
                            <el-form-item label="中标金额:">
                                <span>{{ props.row.price }}</span>
                            </el-form-item>
                            <!--<el-form-item label="单位意见:">-->
                            <!--<span>{{ props.row.dwyj }}</span>-->
                            <!--</el-form-item>-->
                            <!--<el-form-item label="财务部门意见:">-->
                            <!--<span>{{ props.row.cwbmyj }}</span>-->
                            <!--</el-form-item>-->
                            <!--<el-form-item label="分管领导意见:">-->
                            <!--<span>{{ props.row.fgldyj }}</span>-->
                            <!--</el-form-item>-->
                            <!--<el-form-item label="总经理意见:">-->
                            <!--<span>{{ props.row.zjlyj }}</span>-->
                            <!--</el-form-item>-->
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column prop="contractNo" align="center" sortable label="合同编号" width="140">
                </el-table-column>
                <el-table-column prop="projectName" label="合同项目" min-width="160">
                </el-table-column>
                <el-table-column prop="xmNo" align="center" label="项目编号" min-width="160">
                </el-table-column>
                <el-table-column prop="rq" sortable align="center" label="合同日期" width="120">
                </el-table-column>
                <el-table-column prop="dfdsr" align="center" label="对方当事人" width="120">
                </el-table-column>
                <el-table-column prop="tzwh" align="center" label="投资文号" sortable width="120">
                </el-table-column>
                <el-table-column prop="price" align="center" label="合同价款(元)" width="120">
                </el-table-column>
                <el-table-column prop="psjl" align="center" label="评审结论" min-width="160">
                </el-table-column>
                <el-table-column prop="dqjd" align="center" label="当前节点" width="140">
                </el-table-column>
                <el-table-column label="操作" width="160" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click="djfj(scope.row),isgd=scope.row.gd">附件</el-button>
                        <el-button type="text" v-if="scope.row.canSp" @click="htsq(scope.row.id)">审批</el-button>
                        <el-button type="text" @click="zt(scope.row)">状态</el-button>
                        <el-button type="text" :disabled="scope.row.gd=='1'" @click="bjht(scope.row)">编辑</el-button>
                        <el-button type="text" @click="xz(scope.row)">下载</el-button>
                        <el-button type="text" :disabled="scope.row.gd=='1'" @click="gd(scope.row)">归档</el-button>
                        <el-button type="text" :disabled="scope.row.gd=='1'" @click="scht(scope.row)"
                                   v-bind:class="{red:scope.row.gd!='1'}">删除
                        </el-button>
                        <el-button type="text" @click="lxxq(scope.row)">立项详情
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div v-if="!ssss" style="text-align: center">
                <el-pagination
                        background
                        @current-change="currentChange"
                        layout="total,prev, pager, next"
                        :total="hts">
                </el-pagination>
            </div>
        </div>

        <!--上传附件弹窗 -->
        <el-dialog title="上传附件" :close-on-click-modal="false" :visible.sync="show_scfj" width="1000px">
            <el-table :data="bcwjs" border style="margin-top: 20px">
                <el-table-column prop="jd" label="节点" width="100px">
                </el-table-column>
                <el-table-column prop="wjmc" label="文件名称" width="110px">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-upload
                                class="upload-demo"
                                :disabled="isgd=='1'"
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
            <!--<el-upload-->
            <!--:disabled="isgd=='1'"-->
            <!--class="upload-demo"-->
            <!--drag-->
            <!--:action="url"-->
            <!--:on-preview="handlePreview"-->
            <!--:before-remove="handleBeforeRemove"-->
            <!--:on-success="handleSuccess"-->
            <!--multiple-->
            <!--:file-list="fileList"-->
            <!--style="width: 100%;"-->
            <!--&gt;-->
            <!--<i class="el-icon-upload" ></i>-->
            <!--<div class="el-upload__text" >将文件拖到此处，或<em>点击上传</em></div>-->
            <!--</el-upload>-->
        </el-dialog>

        <!--添加合同弹窗 -->
        <el-dialog title="新建合同" :close-on-click-modal="false" :visible.sync="show_xjht" width="688px">
            <el-form ref="form" label-width="100px">
                <!--<el-form-item label="合同编号">-->
                <!--<el-input v-model="contract.contractNo"></el-input>-->
                <!--</el-form-item>-->
                <el-form-item label="合同项目">
                    <el-select
                            filterable
                            v-model="contract.projectId"
                    >
                        <el-option
                                v-for="item in xms"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    &nbsp&nbsp&nbsp&nbsp&nbsp合同日期&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                    <el-date-picker style="width: 205px" type="date" placeholder="选择日期" v-model="contract.rq"
                                    value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
                <el-form-item label="有效期合同">
                    <el-switch
                            v-model="isValidContract"
                            active-text="是"
                            inactive-text="否">
                    </el-switch>
                    <el-date-picker
                            v-if="isValidContract"
                            v-model="validDateScope"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            style="width: 70%;float: right;margin-right: 17px;">
                    </el-date-picker>
                    <div v-else style="display: inline;width: 70%;float: right;margin-right: 17px;">有效期：{{ validDateNumber }}</div>

                </el-form-item>
                <el-form-item label="对方当事人">
                    <el-input v-model="contract.dfdsr" style="width: 210px"></el-input>
                    &nbsp&nbsp&nbsp&nbsp&nbsp投资文号&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                    <el-input v-model="contract.tzwh" style="width: 210px"></el-input>
                </el-form-item>
                <el-form-item label="合同价款(元)">
                    <el-input v-model="contract.price" type="number" style="width: 210px"></el-input>
                    &nbsp&nbsp&nbsp&nbsp&nbsp合同经办人&nbsp&nbsp&nbsp&nbsp
                    <el-input v-model="contract.jbr" style="width: 210px"></el-input>
                </el-form-item>
                <!--<el-form-item label="主办单位意见">-->
                <!--<el-input v-model="contract.zbdwyj" type="textarea"></el-input>-->
                <!--</el-form-item>-->
                <el-form-item label="对方资质审查">
                    <el-checkbox-group v-model="zzsc">
                        <el-checkbox label="营业执照"></el-checkbox>
                        <br/>
                        <el-checkbox label="法定代表人身份证明或授权委托书"></el-checkbox>
                        <br/>
                        <el-checkbox label="企业登记证书"></el-checkbox>
                        <br/>
                        <el-checkbox label="安全生产许可证"></el-checkbox>
                        <br/>
                        <el-checkbox label="其他"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="评审结论">
                    <el-radio-group v-model="contract.psjl">
                        <el-radio style="margin-top: 8px" label="评审合格，同意签订此合同"></el-radio>
                        <br/>
                        <el-radio style="margin-top: 10px" label="存在缺陷，完善后再次评审"></el-radio>
                        <br/>
                        <el-radio style="margin-top: 10px" label="评审不合格，不能签订此合同"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <!--<el-form-item label="单位意见">-->
                <!--<el-input type="textarea" v-model="contract.dwyj"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="财务部门意见">-->
                <!--<el-input type="textarea" v-model="contract.cwbmyj"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="分管领导意见">-->
                <!--<el-input type="textarea" v-model="contract.fgldyj"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="总经理意见">-->
                <!--<el-input type="textarea" v-model="contract.zjlyj"></el-input>-->
                <!--</el-form-item>-->
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="show_xjht = false">取 消</el-button>
                <el-button type="primary" @click="qdxjht">确 定</el-button>
            </span>
        </el-dialog>

        <!--编辑合同弹窗 -->
        <el-dialog title="编辑合同" :close-on-click-modal="false" :visible.sync="show_bjht" width="685px">
            <el-form ref="form" label-width="100px">
                <el-form-item label="合同项目">
                    <el-input v-model="contract.projectName" readonly style="width: 210px"></el-input>
                    &nbsp&nbsp&nbsp&nbsp&nbsp合同日期&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                    <el-date-picker type="date" placeholder="选择日期" v-model="contract.rq" value-format="yyyy-MM-dd"
                                    style="width: 205px"></el-date-picker>
                </el-form-item>
                <el-form-item label="有效期合同">
                    <el-switch
                            v-model="isValidContract"
                            active-text="是"
                            inactive-text="否">
                    </el-switch>
                    <el-date-picker
                            v-if="isValidContract"
                            v-model="validDateScope"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            style="width: 70%;float: right;margin-right: 17px;">
                    </el-date-picker>
                    <div v-else style="display: inline;width: 70%;float: right;margin-right: 17px;">有效期：{{ validDateNumber }}</div>

                </el-form-item>
                <el-form-item label="对方当事人">
                    <el-input v-model="contract.dfdsr" style="width: 210px"></el-input>
                    &nbsp&nbsp&nbsp&nbsp&nbsp投资文号&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                    <el-input v-model="contract.tzwh" style="width: 210px"></el-input>
                </el-form-item>
                <el-form-item label="合同价款(元)">
                    <el-input v-model="contract.price" type="number" style="width: 210px"></el-input>
                    &nbsp&nbsp&nbsp&nbsp&nbsp合同经办人&nbsp&nbsp&nbsp&nbsp
                    <el-input v-model="contract.jbr" style="width: 210px"></el-input>
                </el-form-item>
                <el-form-item label="对方资质审查">
                    <el-checkbox-group v-model="zzsc">
                        <el-checkbox label="营业执照"></el-checkbox>
                        <br/>
                        <el-checkbox label="法定代表人身份证明或授权委托书"></el-checkbox>
                        <br/>
                        <el-checkbox label="企业登记证书"></el-checkbox>
                        <br/>
                        <el-checkbox label="安全生产许可证"></el-checkbox>
                        <br/>
                        <el-checkbox label="其他"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="评审结论">
                    <el-radio-group v-model="contract.psjl">
                        <el-radio style="margin-top: 8px" label="评审合格，同意签订此合同"></el-radio>
                        <br/>
                        <el-radio style="margin-top: 10px" label="存在缺陷，完善后再次评审"></el-radio>
                        <br/>
                        <el-radio style="margin-top: 10px" label="评审不合格，不能签订此合同"></el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="qxbj">取 消</el-button>
                <el-button type="primary" @click="qdbj">确定编辑</el-button>
            </span>
        </el-dialog>

        <el-dialog title="状态" :close-on-click-modal="false" :visible.sync="show_zt" width="750px">
            <img :src="src"/>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="show_zt=false">确 定</el-button>
            </span>
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
        name: 'htgl',
        data() {
            return {
                bcwjs: [],
                src: '',
                show_zt: false,
                fileList: [],
                //新建合同
                show_xjht: false,
                //编辑合同
                show_bjht: false,
                //上传附件
                show_scfj: false,
                contracts: [],
                contract: {
                    id: '',
                    contractNo: '',
                    projectName: '',
                    projectId: '',
                    dfdsr: '',
                    tzwh: '',
                    price: '',
                    jbr: '',
                    zbdwyj: '',
                    zzsc: '',
                    psjl: '',
                    dwyj: '',
                    cwbmyj: localStorage.getItem('userId'),
                    fgldyj: '',
                    zjlyj: '',
                    rq: '',
                    gd: '',
                    ksyxq:'',
                    jsyxq:''
                },
                jds: [
                    {
                    value: '未申请',
                    label: '未申请',
                }, {
                    value: '填写合同表单',
                    label: '填写合同表单'
                }, {
                    value: '技术部经理审批',
                    label: '技术部经理审批'
                }, {
                    value: '办公室确认',
                    label: '办公室确认',
                }, {
                    value: '合同审批结束',
                    label: '合同审批结束'
                }],
                //对方资质审查,数组
                zzsc: [],
                xms: [],
                ip: 'http://10.197.41.100:8080',
                loading: false,
                list: [],
                url: '',
                cid: '',
                contractNo: '',
                projectName: '',
                ContractDate: '',
                dfdsr: '',
                tzwh: '',
                dqjd: '',
                //是否归档
                isgd: '',
                //合同数
                hts: 0,
                xmId: '',
                ssss: false,
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
                isValidContract:true,// 是否有效期合同
                validDateScope:'',// 有效期范围
                validDateNumber:'',// 有效期数字
            }
        },
        //监听新建合同表项目id的改变,请求关联的数据
        computed: {
            projectId() {
                return this.contract.projectId
            }
        },
        watch: {
            projectId(newValue, oldValue) {
                if (newValue != null && newValue != ''&&this.show_bjht==false) {
                    axios.get(this.ip + '/contract/fillContractByXmid', {
                        params: {
                            projectId: newValue
                        }
                    }).then(res => {
                        this.$set(this.contract, 'dfdsr', '')
                        this.$set(this.contract, 'tzwh', '')
                        this.$set(this.contract, 'jbr', '')
                        let sz = res.data.split('/')
                        if (sz.length == 3) {
                            if (sz[0] != null && sz[0] != 'null')
                                this.$set(this.contract, 'dfdsr', sz[0])
                            if (sz[1] != null && sz[1] != 'null')
                                this.$set(this.contract, 'tzwh', sz[1])
                            if (sz[2] != null && sz[2] != 'null')
                                this.$set(this.contract, 'jbr', sz[2])
                        } else {
                            if (sz[0] != null && sz[0] != 'null')
                                this.$set(this.contract, 'tzwh', sz[0])
                            if (sz[1] != null && sz[1] != 'null')
                                this.$set(this.contract, 'jbr', sz[1])
                        }
                    })

                    // 需要获取合同的有效期
                    axios.get(this.ip + '/contract/getGq', {
                        params: {
                            projectId: newValue
                        }
                    }).then(res => {
                        this.validDateNumber=res.data
                    })
                }
            },
            isValidContract(newValue,oldValue){
                console.log(newValue)
                /*if (newValue==false){// 如果不是有效期合同
                    // 需要获取合同的有效期
                    axios.get(this.ip + '/contract/getGq', {
                        params: {
                            projectId: this.contract.projectId
                        }
                    }).then(res => {
                        this.validDate=res.data
                    })
                }*/
            }
        },
        created() {
            this.getAllht(1)
            this.getXms()
            //合同总条数
            this.AllCounts()
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
                        lc: '合同'
                    }
                }).then(res => {
                    this.bcwjs = res.data
                    // this.bcwjs.push()
                })
            },

            //合同下载
            xz(row) {
                window.open('http://10.197.41.100:8080/print/ht?id=' + row.id)
            },
            //状态
            zt(row) {
                if (row.dqjd === '未申请') {
                    this.src = require('@/assets/img/htwsq.png')
                } else if (row.dqjd === '填写合同表单') {
                    this.src = require('@/assets/img/txhtbd.png')
                } else if (row.dqjd === '技术部经理审批') {
                    this.src = require('@/assets/img/htjsbjlsp.png')
                } else if (row.dqjd === '办公室确认') {
                    this.src = require('@/assets/img/bgsqr.png')
                } else if (row.dqjd === '合同审批结束') {
                    this.src = require('@/assets/img/htspjs.png')
                }
                this.show_zt = true
            },
            //合同审批
            htsq(id) {
                const loading = this.$loading({
                    lock: true,
                    text: '处理中……',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                })
                axios.get(this.ip + "/bcwj/jcwj", {
                    params: {
                        id: id,
                        lc: '合同',
                        dqjd: '填写合同表单'
                    }
                }).then(res => {
                    if (res.data) {
                        axios.get(this.ip + '/contract/startHtsp', {
                            params: {
                                htid: id
                            }
                        }).then(res => {
                            loading.close()
                            if (res.data) {
                                this.$message.success("申请成功！")
                                this.reload()
                            } else {
                                this.$message.error("申请失败！")
                            }
                        })
                    } else {
                        axios.get(this.ip + '/bcwj/bcwjm', {
                            params: {
                                lc: '合同',
                                dqjd: '填写合同表单'
                            }
                        }).then(res => {
                            loading.close()
                            let filenames = ''
                            for (let i = 0; i < res.data.length; i++) {
                                filenames = filenames + res.data[i].wjmc + ","
                            }
                            //去后面,
                            filenames = filenames.substring(0, filenames.length - 1)
                            this.$message.error("申请前，请上传文件：" + filenames)
                        })
                    }
                })


            },
            currentChange(pageNum) {
                this.getAllht(pageNum)
            },
            //根据项目id搜索
            xmIdSS() {
                axios.get(this.ip + '/contract/xmIdSS', {
                    params: {
                        xmId: this.xmId
                    }
                }).then(res => {
                    if (res.data != "" && res.data != null) {
                        this.contracts = []
                        this.ssss = true
                        this.contracts.push(res.data)
                        if (this.contracts[0].dwyj === '' || this.contracts[0].dwyj == null) {
                            this.contracts[0].canSp = true
                            this.contracts[0].dqjd = '未申请'
                            this.$set(this.contracts, 0, this.contracts[0])
                        } else {
                            axios.get(this.ip + '/contract/getHtNode', {
                                params: {
                                    dwyj: this.contracts[0].dwyj
                                }
                            }).then(res => {
                                this.contracts[0].dqjd = res.data
                                if (res.data === '填写合同表单') {
                                    this.contracts[0].canSp = true
                                } else {
                                    this.contracts[0].canSp = false
                                }
                                this.$set(this.contracts, 0, this.contracts[0])
                            })
                        }

                    } else {
                        this.$message.error("没找到数据！")
                    }
                })
            },

            //合同搜索
            htSearch() {
                axios.get(this.ip + '/contract/contractNoss', {
                    params: {
                        contractNo: this.contractNo
                    }
                })
                    .then(res => {
                        if (res.data.length == 0)
                            this.$message.error("没有查询到相关数据！")
                        else {
                            this.ssss = true
                            this.contracts = res.data
                            //请求合同节点
                            for (let i = 0; i < this.contracts.length; i++) {
                                if (this.contracts[i].dwyj === '' || this.contracts[i].dwyj == null) {
                                    this.contracts[i].canSp = true
                                    this.contracts[i].dqjd = '未申请'
                                    this.$set(this.contracts, i, this.contracts[i])
                                } else {
                                    axios.get(this.ip + '/contract/getHtNode', {
                                        params: {
                                            dwyj: this.contracts[i].dwyj
                                        }
                                    }).then(res => {
                                        this.contracts[i].dqjd = res.data
                                        if (res.data === '填写合同表单') {
                                            this.contracts[i].canSp = true
                                        } else {
                                            this.contracts[i].canSp = false
                                        }
                                        this.$set(this.contracts, i, this.contracts[i])
                                    })
                                }
                            }
                        }

                    })
            },

            handleSearch() {
                var params = {
                    contractNo: this.contractNo,
                    projectName: this.projectName,
                    ContractDate: this.ContractDate,
                    dfdsr: this.dfdsr,
                    tzwh: this.tzwh,
                    dqjd: this.dqjd

                }
                axios.get(this.ip + '/contract/search', {
                    params: params
                }).then(res => {
                    this.ssss = true
                    this.contracts = res.data
                    //请求合同节点
                    for (let i = 0; i < this.contracts.length; i++) {
                        if (this.contracts[i].dwyj === '' || this.contracts[i].dwyj == null) {
                            this.contracts[i].canSp = true
                            this.contracts[i].dqjd = '未申请'
                            this.$set(this.contracts, i, this.contracts[i])
                        } else {
                            axios.get(this.ip + '/contract/getHtNode', {
                                params: {
                                    dwyj: this.contracts[i].dwyj
                                }
                            }).then(res => {
                                this.contracts[i].dqjd = res.data
                                if (res.data === '填写合同表单') {
                                    this.contracts[i].canSp = true
                                } else {
                                    this.contracts[i].canSp = false
                                }
                                this.$set(this.contracts, i, this.contracts[i])
                            })
                        }
                    }
                })
            },

            //拿总条数
            AllCounts() {
                axios.get(this.ip + '/contract/AllCounts')
                    .then(res => {
                        this.hts = res.data
                    })
            },

            //归档，不能操作此记录
            gd(row) {
                if (row.dwyj == null || row.dwyj === '') {
                    this.$message.error("合同还未审批，禁止归档！")
                    return
                }
                //请求当前合同节点
                axios.get(this.ip + '/contract/getHtNode', {
                    params: {
                        dwyj: row.dwyj
                    }
                }).then(res => {
                    if (res.data != '合同审批结束') {
                        this.$message.error('该合同审批还未结束！禁止归档！')
                        return
                    } else {//节点等于合同审批结束
                        //检查附件
                        axios.get(this.ip + '/Attachment/checkLcFj', {
                            params: {
                                pid: row.dwyj
                            }
                        })
                            .then(xxx => {
                                if (!xxx.data) {
                                    this.$message.error("该记录还未上传附件！禁止归档！")
                                    return
                                } else {//有附件
                                    this.$confirm('归档后将无法操作该记录,是否继续?', '提示', {
                                        confirmButtonText: '确定',
                                        cancelButtonText: '取消',
                                        type: 'warning'
                                    }).then(() => {
                                        axios.get(this.ip + '/contract/guidang', {
                                            params: {
                                                id: row.id
                                            }
                                        }).then(res => {
                                            if (res.data)
                                                this.$message.success("归档成功！")
                                            this.reload()
                                        })
                                    }).catch(() => {
                                    })
                                }
                            })
                    }
                })
            },

            //取消编辑
            qxbj() {
                this.show_bjht = false,
                    this.contract = {}
            },

            //删除合同
            scht(row) {
                if (row.dqjd != '未申请' && row.dqjd != '填写合同表单') {
                    this.$message.error("当前合同正在审批！不能删除！")
                    return
                }
                this.$confirm('此操作将永久删除该合同, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.get(this.ip + '/contract/deleteContract', {
                        params: {
                            cid: row.id
                        }
                    })
                        .then(res => {
                            if (res.data) {
                                this.$message.success("删除成功")
                                this.getAllht(1)
                            } else
                                this.$message.error("删除失败！")
                        })
                }).catch(() => {
                    this.$message.info("已取消删除")
                })
            },

            //删除附件
            handleBeforeRemove(file, fileList) {
                if (this.contract.dwyj != '' && this.contract.dwyj != null) {
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
                                fid: file.id
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

            //编辑合同
            bjht(row) {
                this.contract = row
                this.zzsc = row.zzsc.split('、')
                this.show_bjht = true

                if(this.contract.ksyxq||this.contract.jsyxq){// 有开始有效期或结束有效期，则为有效期合同
                    this.isValidContract=true
                    this.validDateScope=[
                        this.contract.ksyxq,
                        this.contract.jsyxq
                    ]
                }else{
                    this.isValidContract=false
                    axios.get(this.ip + '/contract/getGq', {
                        params: {
                            projectId: this.contract.projectId
                        }
                    }).then(res => {
                        this.validDateNumber=res.data
                    })
                }
            },

            //确定编辑
            qdbj() {
                this.contract.zzsc = ''
                for (let i = 0; i < this.zzsc.length; i++) {
                    if (i < this.zzsc.length - 1)
                        this.contract.zzsc = this.contract.zzsc + this.zzsc[i] + '、'
                    else
                        this.contract.zzsc = this.contract.zzsc + this.zzsc[i]
                }

                if(this.isValidContract){// 如果是有效期合同
                    if(!this.validDateScope){
                        this.$message.error("有效期合同需要填写有效期范围")
                        return
                    }else{
                        this.contract.ksyxq=this.validDateScope[0]
                        this.contract.jsyxq=this.validDateScope[1]
                    }
                }else{
                    this.contract.ksyxq=''
                    this.contract.jsyxq=''
                }

                axios.post(this.ip + '/contract/updateContract', this.contract)
                    .then(res => {
                        if (res.data) {
                            this.$message.success("修改成功！")
                        } else {
                            this.$message.error("修改失败！")
                        }
                        this.getAllht(1)
                    })
                this.show_bjht = false
            },

            //删除请求
            handleRemove(file, fileList) {
                if (this.contract.dwyj != '' && this.contract.dwyj != null) {
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
                                    //this.djfj(this.contract)
                                    fileList.push(file)
                                }
                            })
                    })
                        .catch(() => {
                            //重新请求
                            //this.djfj(this.contract)
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
                                fid: file.id
                            }
                        })
                            .then(res => {
                                this.$message.info("删除成功！")
                            })
                    }).catch(() => {
                        //this.djfj(this.contract)
                        fileList.push(file)
                    })
                }
            },

            //上传成功，重新请求
            handleSuccess() {
                this.djfj(this.contract)
            },

            //点击文件下载
            handlePreview(file) {
                window.open(this.ip + '/Attachment/Download?fid=' + file.id + '&fname=' + encodeURIComponent(file.name))

            },

            //点击附件
            djfj(row) {
                this.contract = row
                this.cid = row.id
                if (row.dwyj == '' || row.dwyj == null) {//未申请
                    this.url = 'http://10.197.41.100:8080/contract/uploadHtfj?id=' + row.id + '&userId=' + localStorage.getItem('userId')
                } else {//已经申请的上传地址
                    this.url = 'http://10.197.41.100:8080/contract/uploadFile?dwyj=' + row.dwyj + '&userId=' + localStorage.getItem('userId')
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
                            // items.splice(indexOfItem, 1, newValue)
                            // this.fileList[i] = []
                            this.fileList.splice(i, 1, [])
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
                this.show_scfj = true
            },

            //填充附件列表
            getFileList() {
                //请求附件名
                axios.get(this.ip + '/contract/getFjs', {
                    params: {
                        cid: this.cid
                    }
                })
                    .then(res => {
                        this.fileList = []
                        for (let i = 0; i < res.data.length; i++) {
                            this.fileList.push({
                                name: res.data[i].fname,
                                id: res.data[i].fid
                            })
                        }
                    })
            },

            //确定新建合同
            qdxjht() {
                if (this.contract.projectId == '' || this.contract.projectId == null || this.contract.price <= 0 || this.contract.price == null) {
                    this.$message.error("项目名称、合同价款等重要信息！")
                    return
                }
                this.contract.zzsc = ''
                for (let i = 0; i < this.zzsc.length; i++) {
                    if (i < this.zzsc.length - 1)
                        this.contract.zzsc = this.contract.zzsc + this.zzsc[i] + '、'
                    else
                        this.contract.zzsc = this.contract.zzsc + this.zzsc[i]
                }
                this.contract.cwbmyj = localStorage.getItem('userId')

                if(this.isValidContract){// 如果是有效期合同
                    if(!this.validDateScope){
                        this.$message.error("有效期合同需要填写有效期范围")
                        return
                    }else{
                        this.contract.ksyxq=this.validDateScope[0]
                        this.contract.jsyxq=this.validDateScope[1]
                    }
                }
                axios.post(this.ip + '/contract/addContract', this.contract)
                    .then(res => {
                        if (res.data)
                            this.$message.success("添加成功！")
                        else
                            this.$message.success("添加失败！")
                        this.reload()
                    })
                this.show_xjht = false
            },

            //新建合同
            xjht() {
                this.getXms()
                this.contract = {}
                this.zzsc = []
                this.show_xjht = true

                this.isValidContract=true
                this.validDateScope=''
                this.validDateNumber=''
            },

            //拿到项目下拉框数据
            getXms() {
                axios.get(this.ip + '/projectApplication/getCanHtXmIdAndXmname', {
                    params: {
                        userName: localStorage.getItem('userName')
                    }
                })
                    .then(res => {
                        this.xms = res.data
                    })
            },

            //拿到所有合同
            getAllht(pageNum) {
                this.zzsc = []
                this.contract = {}
                axios.get(this.ip + '/contract/getAllContracts', {
                    params: {
                        pageNum: pageNum
                    }
                })
                    .then(res => {
                        this.contracts = res.data
                        //请求合同节点
                        for (let i = 0; i < this.contracts.length; i++) {

                            if (this.contracts[i].dwyj === '' || this.contracts[i].dwyj == null) {
                                this.contracts[i].canSp = true
                                this.contracts[i].dqjd = '未申请'
                                this.$set(this.contracts, i, this.contracts[i])
                            } else {
                                axios.get(this.ip + '/contract/getHtNode', {
                                    params: {
                                        dwyj: this.contracts[i].dwyj
                                    }
                                }).then(res => {
                                    this.contracts[i].dqjd = res.data
                                    if (res.data === '填写合同表单') {
                                        this.contracts[i].canSp = true
                                    } else {
                                        this.contracts[i].canSp = false
                                    }
                                    this.$set(this.contracts, i, this.contracts[i])
                                })
                            }
                        }
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
            },

            lxxq(row) {// 立项详情
                this.lxxqShow = true
                axios.get('http://10.197.41.100:8080/projectApplication/getXmById', {
                    params: {
                        xmid: row.projectId
                    }
                }).then(res => {
                    this.project = res.data
                })
            },
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

    .demo-table-expand {
        font-size: 0;
    }

    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }

    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
</style>
