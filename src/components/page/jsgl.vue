<template>
    <div>
        <div class="table">
            <div class="crumbs">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item><i class="el-icon-lx-cascades"></i>结算表单</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="container">
                <div class="handle-box">
                    <el-button v-if="groupId!='bgs'" type="primary" @click="xzjs" icon="el-icon-circle-plus" class="handle-del mr10">
                        新增结算
                    </el-button>

                    <el-input placeholder="项目编号" clearable v-model="projectNo" class="handle-input mr10"></el-input>
                    <el-input placeholder="项目名" clearable v-model="projectName" class="handle-input mr10"></el-input>
                    <el-input placeholder="合同号" clearable v-model="contractNo" class="handle-input mr10"></el-input>
                    <el-date-picker
                            class="handle-input mr10"
                            v-model="rq"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="创建日期">
                    </el-date-picker>
                    <el-input placeholder="经办部门" clearable v-model="jbbm" class="handle-input mr10"></el-input>
                    <el-input placeholder="经办人" clearable v-model="jbr" class="handle-input mr10"></el-input>
                    <el-input placeholder="验收证明人" clearable v-model="yszmr" class="handle-input mr10"></el-input>
                    <el-input placeholder="收款单位" clearable v-model="skdw" class="handle-input mr10"></el-input>
                    <el-button style="margin-left: 10px" type="primary" @click="ss" icon="el-icon-search">搜索</el-button>

                    <el-button type="success" icon="el-icon-tickets" style="float:right" @click="getALLJsjl">全部
                    </el-button>
                </div>
                <el-table height="600" class="table" border  style="width: 100%" :data="jss.slice((currentPage-1)*10,currentPage*10)">
                    <el-table-column type="expand" min-width="160">
                        <template slot-scope="props">
                            <el-form style="color: #99a9bf;"  label-position="left" inline class="demo-table-expand">
                                <el-form-item label="发票号码:">
                                    <span>{{ props.row.invoice_no }}</span>
                                </el-form-item>
                                <el-form-item label="银行账号:">
                                    <span>{{ props.row.account }}</span>
                                </el-form-item>
                                <el-form-item label="开户银行:">
                                    <span>{{ props.row.bank }}</span>
                                </el-form-item>
                                <el-form-item label="经办部门负责人:">
                                    <span>{{ props.row.jbbmfzr }}</span>
                                </el-form-item>
                                <!--<el-form-item label="主管部门负责人:">-->
                                    <!--<span>{{ props.row.zgbmfzr }}</span>-->
                                <!--</el-form-item>-->
                                <!--<el-form-item label="财务总监:">-->
                                    <!--<span>{{ props.row.cwzj }}</span>-->
                                <!--</el-form-item>-->
                                <!--<el-form-item label="分管领导:">-->
                                    <!--<span>{{ props.row.fgld }}</span>-->
                                <!--</el-form-item>-->
                                <!--<el-form-item label="公司总经理:">-->
                                    <!--<span>{{ props.row.gszjl }}</span>-->
                                <!--</el-form-item>-->
                                <!--<el-form-item label="分管领导:">-->
                                    <!--<span>{{ props.row.fgld }}</span>-->
                                <!--</el-form-item>-->
                                <el-form-item label="合同日期:">
                                    <span>{{ props.row.htrq }}</span>
                                </el-form-item>
                                <el-form-item label="合同金额:">
                                    <span>{{ props.row.htje }}</span>
                                </el-form-item>
                                <el-form-item label="未支付金额:">
                                    <span>{{ props.row.wfje }}</span>
                                </el-form-item>
                                <el-form-item label="已支付金额:">
                                    <span>{{ props.row.yzfje }}</span>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column prop="gszjl" sortable label="付款顺序" width="110">
                    </el-table-column>
                    <el-table-column prop="xmNo" label="项目编号" width="160">
                    </el-table-column>
                    <el-table-column prop="project_name" label="项目名" min-width="220">
                    </el-table-column>
                    <el-table-column prop="contract_no" align="center" sortable label="合同号" min-width="180">
                    </el-table-column>
                    <el-table-column prop="rq" align="center" sortable label="创建日期" width="160">
                    </el-table-column>
                    <el-table-column prop="fgld"  align="center" sortable label="结算类型" width="110" >
                    </el-table-column>
                    <el-table-column prop="jbbm" align="center" label="经办部门" width="120">
                    </el-table-column>
                    <el-table-column prop="jbr" align="center" label="经办人" width="120">
                    </el-table-column>
                    <el-table-column prop="yszmr" align="center" label="验收证明人" width="120">
                    </el-table-column>
                    <el-table-column prop="skdw" align="center" label="收款单位" width="180">
                    </el-table-column>
                    <el-table-column prop="bqyf" align="center" label="本期已付" width="120">
                    </el-table-column>

                    <el-table-column label="操作" width="140" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" icon="el-icon-upload" @click="fj(scope.row.id)">附件
                            </el-button>
                            <el-button type="text" icon="el-icon-download" @click="xz(scope.row)">下载
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div style="text-align: center">
                    <el-pagination
                            background
                            @current-change="currentChange"
                            layout="total,prev, pager, next"
                            :total="jss.length">
                    </el-pagination>
                </div>
            </div>
        </div>

        <!--添加结算弹窗 -->
        <el-dialog title="新增结算" :close-on-click-modal="false" :visible.sync="show_xzjs" width="680px">
            <el-form label-width="100px" label-position='left'>
                <el-form-item style="margin-top:15px" label="合同号">
                    <el-select
                            v-model="Payable.contract_id"
                            filterable
                            placeholder="请输入或选择合同号"
                         >
                        <el-option
                                v-for="item in hts"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    &nbsp&nbsp&nbsp&nbsp&nbsp经办部门&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                    <el-input style="width: 200px" v-model="Payable.jbbm"></el-input>
                </el-form-item>
                <el-form-item style="margin-top: 15px" label="经办人">
                    <el-input v-model="Payable.jbr" style="width: 215px;margin-right: 20px"></el-input>
                    验收证明人&nbsp&nbsp
                    <el-input style="width: 200px" v-model="Payable.yszmr"></el-input>
                </el-form-item>

                <el-form-item label="发票号码">
                    <el-input v-model="Payable.invoice_no"></el-input>
                </el-form-item>
                <el-form-item label="收款单位">
                    <el-input :readonly="true" v-model="skdw"></el-input>
                </el-form-item>
                <el-form-item label="银行账号">
                    <el-input v-model="Payable.account"></el-input>
                </el-form-item>
                <el-form-item label="开户银行">
                    <el-input v-model="Payable.bank"></el-input>
                </el-form-item>
                <el-form-item label="支付项目">
                    <el-input :readonly="true" v-model="zfxm"></el-input>
                </el-form-item>
                <el-form-item label="合同签订时间">
                    <el-input v-model="htrq" :readonly="true"></el-input>
                </el-form-item>

                <el-form-item style="margin-top: 15px" label="合同总额(元)">
                    <el-input v-model="htzje" :readonly="true" style="width: 215px;margin-right:15px"></el-input>
                    已支付金额(元)&nbsp&nbsp
                    <el-input v-model="yzfje" :readonly="true" style="width: 190px;"></el-input>
                </el-form-item>

                <el-form-item style="margin-top: 15px" label="未付金额(元)">
                    <el-input v-model="wzfje" :readonly="true" style="width: 215px;margin-right: 15px"></el-input>
                    本期应支付金额(元)
                    <el-input v-model="Payable.bqyf" type="number" style="width: 170px"></el-input>
                </el-form-item>
                <el-form-item style="margin-top:15px" label="结算类型">
                    <el-select
                            v-model="Payable.fgld"
                            placeholder="请输入或选择结算类型"
                    >
                        <el-option
                                v-for="item in jslx"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    &nbsp&nbsp&nbsp&nbsp&nbsp付款次数&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                    <el-input :readonly="true" style="width: 200px" v-model="Payable.gszjl"></el-input>
                </el-form-item>
                <!--<el-form-item style="margin-top: 10px" label="经办部门负责人">-->
                    <!--<el-input type="textarea" v-model="Payable.jbbmfzr" :rows="2"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="主管部门负责人">-->
                    <!--<el-input type="textarea" v-model="Payable.zgbmfzr" :rows="2"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="财务总监">-->
                    <!--<el-input type="textarea" v-model="Payable.cwzj" :rows="2"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="分管领导">-->
                    <!--<el-input type="textarea" v-model="Payable.fgld" :rows="2"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="公司总经理">-->
                    <!--<el-input type="textarea" v-model="Payable.gszjl" :rows="2"></el-input>-->
                <!--</el-form-item>-->
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="show_xzjs=false">取消</el-button>
                 <el-button type="primary" @click="ljcj">立即创建</el-button>
            </span>
        </el-dialog>

        <!--上传附件弹窗 -->
        <el-dialog title="上传附件" :close-on-click-modal="false" :visible.sync="show_scfj" width="40%">
            <el-upload
                    class="upload-demo"
                    drag
                    :action="url"
                    :on-preview="handlePreview"
                    :before-remove="handleBeforeRemove"
                    :on-success="handleSuccess"
                    multiple
                    :file-list="fileList"
                    style="width: 100%;"
            >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload>
        </el-dialog>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        inject:['reload'],
        name: 'jsgl',
        data() {
            return {
                groupId:localStorage.getItem('groupId'),
                currentPage:1,//默认开始页面
                //合同id
                contractId:'',
                jslx:[{
                    value:'预付款',
                    lable:'预付款'
                },{
                    value:'质保金',
                    lable:'质保金'
                }],
                Payable: {
                    jbbm: '',
                    jbr: '',
                    yszmr: '',
                    invoice_no: '',
                    account: '',
                    bank: '',
                    project: '',
                    contract_id: '',
                    bqyf: 0,
                    jbbmfzr: '',
                    zgbmfzr: '',
                    cwzj: '',
                    fgld: '',
                    gszjl: '',
                    rq: '',
                },
                //上传附件弹窗
                show_scfj: false,
                //付款单位
                skdw: '',
                //付款项目
                zfxm: '',
                url: '',
                //合同日期
                htrq: '',
                //合同总金额
                htzje: '',
                //已支付金额
                yzfje: 0.00,
                //未支付金额
                wzfje: 0.00,
                projectId: '',
                cid: '',
                htid: '',
                hts: [],
                show_xzjs: false,
                list: [],
                list2: [],
                ip: 'http://10.197.41.100:8080',
                loading: false,
                loading2: false,
                //结算数组
                jss: [],
                fileList: [],
                xms: [],
                projectNo:'',
                projectName:'',
                contractNo:'',
                rq:'',
                jbbm:'',
                jbr:'',
                yszmr:'',
                skdw:''
            }
        },
        computed: {
            contract_id() {
                return this.Payable.contract_id
            },
            bqyf() {
                return this.Payable.bqyf
            }
        },
        watch: {
            bqyf(newValue, oldValue) {
                if (newValue > this.wzfje) {
                    this.$message.error("已支付金额不能大于未支付金额")
                    this.Payable.bqyf = 0
                    return
                }
                if (newValue < 0) {
                    this.Payable.bqyf = 1
                    return
                }
            },
            contract_id(newValue, oldValue) {
                if (newValue != '' && newValue != null) {
                    //拿到付款单位
                    axios.get(this.ip + '/contract/getDfdsr', {
                        params: {
                            contractId: newValue
                        }
                    }).then(res => {
                        this.skdw = res.data
                    })
                    //拿到付款项目
                    axios.get(this.ip + '/contract/cidToPnam', {
                        params: {
                            cid: newValue
                        }
                    }).then(res => {
                        this.zfxm = res.data
                    })

                    //拿到合同
                    axios.get(this.ip + '/contract/selectContract', {
                        params: {
                            contractId: newValue
                        }
                    }).then(res => {
                        this.htrq = res.data.rq
                        this.htzje = res.data.price
                        this.Payable.project = res.data.projectId
                    })

                    //拿到未支付
                    axios.get(this.ip + '/payable/cidToWf', {
                        params: {
                            cid: newValue
                        }
                    })
                        .then(res => {
                            this.wzfje = res.data
                        })

                    //拿到已支付
                    axios.get(this.ip + '/payable/cidToYf', {
                        params: {
                            cid: newValue
                        }
                    })
                        .then(res => {
                            this.yzfje = res.data
                        })

                    //拿到改合同已经支付的次数
                    axios.get(this.ip+'/payable/count',{
                        params:{
                            contractId:newValue
                        }
                    }).then(res=>{
                        this.Payable.gszjl=res.data+1;
                    })
                }
            }
        },
        created() {
            this.getALLJsjl()
            this.getXms()
            this.getHts()
        },
        methods: {
            //下载
            xz(row){
                window.open("http://10.197.41.100:8080/print/zfspd?id="+row.id)
            },

            currentChange(currentPage){
                this.currentPage = currentPage;
            },
            //合同搜索
            htss(){
                axios.get(this.ip + '/payable/htidToPaybles', {
                    params: {
                        contractId: this.contractId
                    }
                }).then(res => {
                    if (res.data.length != 0){
                        this.jss = res.data
                    }
                    else
                        this.$message.error("没找到相关数据！")
                })
            },
            //项目搜索
            xmss() {
                axios.get(this.ip + '/payable/pidToPaybles', {
                    params: {
                        projectId: this.projectId
                    }
                }).then(res => {
                    if (res.data.length != 0)
                        this.jss = res.data
                    else
                        this.$message.error("没找到相关数据！")
                })
            },
            ss(){
                axios.get(this.ip + '/payable/search', {
                    params: {
                        projectNo:this.projectNo,
                        projectName:this.projectName,
                        contractNo:this.contractNo,
                        rq:this.rq,
                        jbbm:this.jbbm,
                        jbr:this.jbr,
                        yszmr:this.yszmr,
                        skdw:this.skdw
                    }
                }).then(res => {
                    if (res.data.length != 0)
                        this.jss = res.data
                    else
                        this.$message.error("没找到相关数据！")
                })
            },
            //拿到项目下拉框数据
            getXms() {
                axios.get(this.ip + '/projectApplication/getAllXmIdAndXmname')
                    .then(res => {
                        this.xms = res.data
                    })
            },
            //点击文件下载
            handlePreview(file) {
                window.open(this.ip + '/contract/getFj?fid=' + file.id + '&fname=' + file.name)
            },
            //上传成功，重新请求
            handleSuccess() {
                this.fj(this.cid)
            },
            //删除请求
            handleRemove(file, fileList) {
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
                })
            },
            //删除附件
            handleBeforeRemove(file, fileList) {
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
                            if (res.data) {
                                this.$message.success("删除成功！")
                            } else {
                                this.$message.error("删除失败！")
                            }
                            this.getFileList(this.cid)
                        })
                })
                    .catch(() => {
                        this.getFileList(this.cid)
                    })
            },
            //点击附件
            fj(id) {
                this.cid = id
                this.getFileList()
                this.url = 'http://10.197.41.100:8080/contract/uploadHtfj?id=' + id
                this.show_scfj = true
            },
            //拿所有的结算记录
            getALLJsjl() {
                axios.get(this.ip + '/payable/getAllPayble')
                    .then(res => {
                        this.jss = res.data;
                    })
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
            //新增结算
            xzjs() {
                this.getHts()
                this.Payable = {}
                this.projectId = ''
                this.skdw = ''
                this.zfxm = ''
                this.htzje = ''
                this.htrq=''
                this.yzfje = 0.00
                this.wzfje = 0.00
                this.show_xzjs = true
            },
            //拿到项目下拉框数据
            getHts() {
                axios.get(this.ip + '/contract/getAllHtidAndHtno')
                    .then(res => {
                        this.hts = res.data
                    })
            },
            //根据合同id拿到对方当事人(收款单位)
            getskdw() {
                axios.get(this.ip + '/contract/getDfdsr', {
                    params: {
                        htId: this.htId
                    }
                }).then(res => {

                })
            },
            //立即创建
            ljcj() {
                if(this.Payable.bqyf==null||this.Payable.bqyf==0||this.Payable.contract_id==""||this.Payable.contract_id==null){
                    this.$message.error("请填写应付金额和合同！")
                    return;
                }
                axios.post(this.ip + '/payable/addPayable', this.Payable)
                    .then(res => {
                        if (res.data) {
                            this.$message.success("新建成功！")
                            this.getALLJsjl()
                        } else
                            this.$message.error("新建失败！")
                    })
                this.show_xzjs = false
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

    .demo-table-expand {
        font-size: 0;
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
        margin-right: 0px;
        margin-bottom: 0;
        width: 50%;
    }
</style>
