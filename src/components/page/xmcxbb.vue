<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i>项目查询报表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div>
                <el-input clearable v-model="selectObject.xmbh" class="search-item" placeholder="项目编号">
                </el-input>
                <el-input clearable v-model="selectObject.xmmc" class="search-item" placeholder="项目名称">
                </el-input>
                <el-select
                        clearable
                        v-if="departmentName=='工程技术部'||departmentName=='办公室'||departmentName=='办公室.'"
                        multiple
                        class="search-item"
                        v-model="selectObject.lxbm"
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
                        multiple
                        class="search-item"
                        v-model="selectObject.xmdl"
                        placeholder="项目大类">
                    <el-option
                            v-for="item in xmdl"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-select
                        clearable
                        multiple
                        class="search-item"
                        v-model="selectObject.lxlb"
                        placeholder="立项类别">
                    <el-option
                            v-for="item in lxlb"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-select
                        clearable
                        multiple
                        class="search-item"
                        v-model="selectObject.xmlb"
                        placeholder="项目类别">
                    <el-option
                            v-for="item in xmlb"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-select
                        clearable
                        class="search-item"
                        v-model="selectObject.spzt"
                        placeholder="审批状态">
                    <el-option
                            v-for="item in spzt"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-select
                        clearable
                        multiple
                        class="search-item"
                        v-model="selectObject.htzt"
                        placeholder="合同状态">
                    <el-option
                            v-for="item in htzt"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div>
                <el-select
                        clearable
                        multiple
                        class="search-item"
                        v-model="selectObject.sgzt"
                        placeholder="施工状态">
                    <el-option
                            v-for="item in sgzt"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-select
                        clearable
                        multiple
                        class="search-item"
                        v-model="selectObject.jszt"
                        placeholder="结算状态">
                    <el-option
                            v-for="item in jszt"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-input clearable v-model="selectObject.zjsjd" class="search-item" placeholder="总结算进度">
                </el-input>
                <el-input clearable v-model="selectObject.jnjsjd" class="search-item" placeholder="今年结算进度">
                </el-input>
                <el-input clearable v-model="selectObject.cbdw" class="search-item" placeholder="承包单位">
                </el-input>
                <el-select
                        clearable
                        multiple
                        class="search-item"
                        v-model="selectObject.xmfqr"
                        placeholder="项目发起人">
                    <el-option
                            v-for="item in xmfqr"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-select
                        clearable
                        multiple
                        class="search-item"
                        v-model="selectObject.xmjbr"
                        placeholder="项目经办人">
                    <el-option
                            v-for="item in xmjbr"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div>
                <el-date-picker
                        v-model="selectObject.kslxsj"
                        class="search-item"
                        type="date"
                        placeholder="开始立项时间"
                        value-format="yyyy-MM-dd">
                </el-date-picker>
                <el-date-picker
                        v-model="selectObject.kskgsj"
                        class="search-item"
                        type="datetime"
                        placeholder="开始开工时间"
                        value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
                <el-date-picker
                        v-model="selectObject.kswgsj"
                        class="search-item"
                        type="datetime"
                        placeholder="开始完工时间"
                        value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
                <el-date-picker
                        v-model="selectObject.ksxmghsj"
                        class="search-item"
                        type="date"
                        placeholder="开始项目过会时间"
                        value-format="yyyy-MM-dd">
                </el-date-picker>
                <el-date-picker
                        v-model="selectObject.kslhzbwjsj"
                        class="search-item"
                        type="date"
                        placeholder="开始两会招标时间"
                        value-format="yyyy-MM-dd">
                </el-date-picker>
                <el-date-picker
                        v-model="selectObject.ksdbsj"
                        class="search-item"
                        type="date"
                        placeholder="开始定标时间"
                        value-format="yyyy-MM-dd">
                </el-date-picker>
                <el-date-picker
                        v-model="selectObject.kshtqdsj"
                        class="search-item"
                        type="date"
                        placeholder="开始合同签订时间"
                        value-format="yyyy-MM-dd">
                </el-date-picker>
                <el-date-picker
                        v-model="selectObject.ksjssj"
                        class="search-item"
                        type="date"
                        placeholder="开始结算时间"
                        value-format="yyyy-MM-dd">
                </el-date-picker>
            </div>
            <div>
                <el-date-picker
                        v-model="selectObject.jslxsj"
                        class="search-item"
                        type="date"
                        placeholder="结束立项时间"
                        value-format="yyyy-MM-dd">
                </el-date-picker>
                <el-date-picker
                        v-model="selectObject.jskgsj"
                        class="search-item"
                        type="datetime"
                        placeholder="结束开工时间"
                        value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
                <el-date-picker
                        v-model="selectObject.jswgsj"
                        class="search-item"
                        type="datetime"
                        placeholder="结束完工时间"
                        value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
                <el-date-picker
                        v-model="selectObject.jsxmghsj"
                        class="search-item"
                        type="date"
                        placeholder="结束项目过会时间"
                        value-format="yyyy-MM-dd">
                </el-date-picker>
                <el-date-picker
                        v-model="selectObject.jslhzbwjsj"
                        class="search-item"
                        type="date"
                        placeholder="结束两会招标时间"
                        value-format="yyyy-MM-dd">
                </el-date-picker>
                <el-date-picker
                        v-model="selectObject.jsdbsj"
                        class="search-item"
                        type="date"
                        placeholder="结束定标时间"
                        value-format="yyyy-MM-dd">
                </el-date-picker>
                <el-date-picker
                        v-model="selectObject.jsjshtqdsj"
                        class="search-item"
                        type="date"
                        placeholder="结束合同签订时间"
                        value-format="yyyy-MM-dd">
                </el-date-picker>
                <el-date-picker
                        v-model="selectObject.jsjssj"
                        class="search-item"
                        type="date"
                        placeholder="结束结算时间"
                        value-format="yyyy-MM-dd">
                </el-date-picker>
            </div>
            <div>
                <el-button type="primary" icon="el-icon-circle-plus" class="search-item" @click="getList">查询
                </el-button>
                <el-button type="primary" icon="el-icon-circle-plus" class="search-item" @click="download">下载
                </el-button>
            </div>
            <h3 style="text-align: center">项目查询报表</h3>
            <el-table
                    ref="multipleTable"
                    :data="list.slice((currentPage-1)*10,currentPage*10)"
                    border
                    stripe
                    class="table">
                <el-table-column label="项目编号" fixed align="center" sortable prop="xmbh" min-width="120">
                </el-table-column>
                <el-table-column label="项目名称" fixed align="center" sortable prop="xmmc" min-width="250">
                </el-table-column>
                <el-table-column label="立项时间" align="center" prop="lxsj" width="120">
                </el-table-column>
                <el-table-column label="立项部门" align="center" prop="lxbm" min-width="120">
                </el-table-column>
                <el-table-column label="项目大类" align="center" prop="xmdl" width="120">
                </el-table-column>
                <el-table-column label="立项类别" align="center" prop="lxlb" width="120">
                </el-table-column>
                <el-table-column label="项目类别" align="center" prop="xmlb" width="120">
                </el-table-column>
                <el-table-column label="计划金额（万元）" align="center" prop="jhje" width="140">
                </el-table-column>
                <el-table-column label="合同金额（万元）" align="center" prop="htje" width="140">
                </el-table-column>
                <el-table-column label="审批状态" align="center" prop="spzt" width="160">
                </el-table-column>
                <el-table-column label="合同状态" align="center" prop="htzt" width="120">
                </el-table-column>
                <el-table-column label="施工状态" align="center" prop="sgzt" width="120">
                </el-table-column>
                <el-table-column label="结算状态" align="center" prop="jszt" width="120">
                </el-table-column>
                <el-table-column label="开工时间" align="center" prop="kgsj" width="160">
                </el-table-column>
                <el-table-column label="完工时间" align="center" prop="wgsj" width="120">
                </el-table-column>
                <el-table-column label="总结算进度(万元)" align="center" prop="zjsjd" width="140">
                </el-table-column>
                <el-table-column label="今年结算进度(万元)" align="center" prop="jnjsjd" width="160">
                </el-table-column>
                <el-table-column label="定标时间" align="center" prop="dbsj" width="180">
                </el-table-column>
                <el-table-column label="项目过会时间" align="center" prop="xmghsj" width="120">
                </el-table-column>
                <el-table-column label="两会招标文件时间" align="center" prop="lhzbwjsj" width="180">
                </el-table-column>
                <el-table-column label="合同签订时间" align="center" prop="htqdsj" width="120">
                </el-table-column>
                <el-table-column label="结算时间" align="center" prop="jssj" width="120">
                </el-table-column>
                <el-table-column label="承包单位" align="center" prop="cbdw" width="120">
                </el-table-column>
                <el-table-column label="项目发起人" align="center" prop="xmfqr" width="120">
                </el-table-column>
                <el-table-column label="项目经办人" align="center" prop="xmjbr" width="120">
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-upload" @click="fj(scope.row)">附件</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    v-show="list.length>0"
                    @current-change="handleCurrentChange"
                    layout="total,prev,pager,next"
                    :total="list.length"
                    background
                    style="text-align: center">
            </el-pagination>
        </div>
        <el-dialog title="附件" :close-on-click-modal="false" :visible.sync="showfj" width="1000px">
            <el-table :data="hjs" border style="margin-top: 20px">
                <el-table-column prop="hj" label="环节" width="100px">
                </el-table-column>
                <el-table-column  label="附件" >
                    <template slot-scope="scope">
                        <el-upload
                                action=""
                                :disabled="true"
                                class="upload-demo"
                                :on-preview="handlePreview"
                                multiple
                                :file-list="fileList[scope.$index]">
                            <!--<el-button size="small" type="primary" @click="recordCurrentRow(scope.row)">点击上传-->
                            <!--</el-button>-->
                        </el-upload>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "xmcxbb",
        data() {
            return {
                hjs:[{
                    hj:'前期附件'
                },{
                    hj:'招标附件'
                },{
                    hj:'小项目附件'
                },{
                    hj:'合同附件'
                },{
                    hj:'验收附件'
                },{
                    hj:'结算附件'
                }],
                departmentName: localStorage.getItem('departmentName'),
                list: [],
                currentPage: 1,
                total: 0,
                listQuery: {
                    offset: 1,
                    limit: 10
                },
                ip: 'http://10.197.41.100:8080',
                selectObject: {
                    xmbh: '',
                    xmmc: '',
                    kslxsj: '',
                    jslxsj: '',
                    lxbm: [],
                    xmdl: [],
                    lxlb: [],
                    xmlb: [],
                    jhje: '',
                    htje: '',
                    spzt: [],
                    htzt: [],
                    sgzt: [],
                    jszt: [],
                    kskgsj: '',
                    jskgsj: '',
                    kswgsj: '',
                    jswgsj: '',
                    zjsjd: '',
                    jnjsjd: '',
                    ksxmghsj: '',
                    jsxmghsj: '',
                    kslhzbwjsj: '',
                    jslhzbwjsj: '',
                    ksdbsj: '',
                    jsdbsj: '',
                    kshtqdsj: '',
                    jshtqdsj: '',
                    ksjssj: '',
                    jsjssj: '',
                    cbdw: '',
                    xmfqr: [],
                    xmjbr: [],
                },
                bms: [],
                xmdl: [
                    {
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
                    }, {
                        value: '绿化',
                        label: '绿化'
                    }
                ],
                lxlb: [
                    {
                        value: '临时立项',
                        label: '临时立项'
                    }, {
                        value: '年度计划',
                        label: '年度计划'
                    }, {
                        value: '年度维保',
                        label: '年度维保'
                    }, {
                        value: '股份项目',
                        label: '股份项目'
                    }, {
                        value: '内部项目',
                        label: '内部项目'
                    }
                ],
                xmlb: [
                    {
                        value: '固定资产',
                        label: '固定资产'
                    }, {
                        value: '维修',
                        label: '维修'
                    }, {
                        value: '物资采购',
                        label: '物资采购'
                    }
                ],
                spzt: [
                    {
                        value: '未申请',
                        label: '未申请'
                    }, {
                        value: '填写申请表',
                        label: '填写申请表'
                    }, {
                        value: '主管经理审批',
                        label: '主管经理审批'
                    }, {
                        value: '经理审批',
                        label: '经理审批'
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
                        label: '备案'
                    }, {
                        value: '申请结束',
                        label: '申请结束'
                    }
                ],
                htzt: [
                    {
                        value: '未申请',
                        label: '未申请'
                    }, {
                        value: '填写合同表',
                        label: '填写合同表'
                    }, {
                        value: '技术部经理审批',
                        label: '技术部经理审批'
                    }, {
                        value: '办公室确认',
                        label: '办公室确认'
                    }, {
                        value: '合同审批结束',
                        label: '合同审批结束'
                    }
                ],
                sgzt: [
                    {
                        value: '已完工',
                        label: '已完工'
                    }, {
                        value: '未开工',
                        label: '未开工'
                    }, {
                        value: '施工进行中',
                        label: '施工进行中'
                    }
                ],
                jszt: [
                    {
                        value: '未支付',
                        label: '未支付'
                    }, {
                        value: '支付完成',
                        label: '支付完成'
                    }, {
                        value: '支付进行中',
                        label: '支付进行中'
                    }
                ],
                xmfqr: [],
                xmjbr: [],
                showfj:false,
                fileList:[]
            }
        },
        created() {
            this.getList()
            this.getAllDptName()
            this.getAllJBRS()
            this.getAllFQRS()
        },
        methods: {
            //点击文件下载
            handlePreview(file) {
                window.open(this.ip + '/Attachment/Download?fid=' + file.id + '&fname=' + encodeURIComponent(file.name))
            },

            //点击附件事件
            fj(row) {
                axios.get(this.ip+'/user/isClr',{
                    params:{
                        xmid:row.xmid,
                        userId:localStorage.getItem('userId')
                    }
                }).then(res=>{
                    if(res.data){
                        //拿前期附件
                        axios.get(this.ip+'/Attachment/getHjFj',{
                            params:{
                                xmid:row.xmid,
                                hj:'前期'
                            }
                        }).then(res=>{
                            this.fileList.splice(0,1,[])
                            for (let j = 0; j < res.data.length; j++) {
                                this.fileList[0].push({
                                    name: res.data[j].attachment_nam,
                                    id: res.data[j].attachment_id,
                                    scr: res.data[j].scr,
                                    scsj: res.data[j].scsj
                                })
                            }
                        })
                        //拿招标附件
                        axios.get(this.ip+'/Attachment/getHjFj',{
                            params:{
                                xmid:row.xmid,
                                hj:'招标'
                            }
                        }).then(res=>{
                            this.fileList.splice(1,1,[])
                            for (let j = 0; j < res.data.length; j++) {
                                this.fileList[1].push({
                                    name: res.data[j].attachment_nam,
                                    id: res.data[j].attachment_id,
                                    scr: res.data[j].scr,
                                    scsj: res.data[j].scsj
                                })
                            }
                        })
                        //拿小项目附件
                        axios.get(this.ip+'/Attachment/getXxmfj',{
                            params:{
                                xmid:row.xmid,
                            }
                        }).then(res=>{
                            this.fileList.splice(2,1,[])
                            for (let j = 0; j < res.data.length; j++) {
                                this.fileList[2].push({
                                    name: res.data[j].attachment_nam,
                                    id: res.data[j].attachment_id,
                                    scr: res.data[j].scr,
                                    scsj: res.data[j].scsj
                                })
                            }
                        })
                        //拿合同附件
                        axios.get(this.ip+'/Attachment/getHjFj',{
                            params:{
                                xmid:row.xmid,
                                hj:'合同'
                            }
                        }).then(res=>{
                            this.fileList.splice(3,1,[])
                            for (let j = 0; j < res.data.length; j++) {
                                this.fileList[3].push({
                                    name: res.data[j].attachment_nam,
                                    id: res.data[j].attachment_id,
                                    scr: res.data[j].scr,
                                    scsj: res.data[j].scsj
                                })
                            }
                        })
                        //拿验收附件
                        axios.get(this.ip+'/Attachment/getYsfj',{
                            params:{
                                xmid:row.xmid,
                            }
                        }).then(res=>{
                            this.fileList.splice(4,1,[])
                            for (let j = 0; j < res.data.length; j++) {
                                this.fileList[4].push({
                                    name: res.data[j].attachment_nam,
                                    id: res.data[j].attachment_id,
                                    scr: res.data[j].scr,
                                    scsj: res.data[j].scsj
                                })
                            }
                        })
                        //拿结算附件
                        axios.get(this.ip+'/Attachment/getJsfj',{
                            params:{
                                xmid:row.xmid,
                            }
                        }).then(res=>{
                            this.fileList.splice(5,1,[])
                            for (let j = 0; j < res.data.length; j++) {
                                this.fileList[5].push({
                                    name: res.data[j].attachment_nam,
                                    id: res.data[j].attachment_id,
                                    scr: res.data[j].scr,
                                    scsj: res.data[j].scsj
                                })
                            }
                        })
                        this.showfj=true
                    }else {
                        this.$message.error("您没有权限！")
                    }
                })
            },
            getList() {
                const loading = this.$loading({
                    lock: true,
                    text: '加载中……',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });

                this.formatSelecrObject()

                axios.post('http://10.197.41.100:8080/xmcxb/select?pageNum=' + this.listQuery.offset, this.selectObject)
                    .then(res => {
                        this.list = res.data
                        this.total = parseInt(res.headers.allcount)
                        loading.close()
                    })
            },
            download() {
                window.location.href = 'http://10.197.41.100:8080/Bb/downloadXMCXBB?param=' + JSON.stringify(this.selectObject)
            },
            getAllDptName() {
                axios.get('http://10.197.41.100:8080/department/getAllDptName')
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
            getAllJBRS() {
                axios.get('http://10.197.41.100:8080/user/jsbjbr', {}).then(res => {
                    if (res.data != null) {
                        for (let i = 0; i < res.data.length; i++) {
                            this.xmjbr.push({
                                value: res.data[i],
                                label: res.data[i],
                            })
                        }
                    }
                })
            },
            getAllFQRS() {
                axios.get('http://10.197.41.100:8080/user/fqr', {}).then(res => {
                    if (res.data != null) {
                        for (let i = 0; i < res.data.length; i++) {
                            this.xmfqr.push({
                                value: res.data[i],
                                label: res.data[i],
                            })
                        }
                    }
                })
            },
            handleCurrentChange(currentPage) {
                this.currentPage = currentPage;
            },
            formatSelecrObject() {
                if (this.selectObject.kslxsj == null) {
                    this.selectObject.kslxsj = ''
                }
                if (this.selectObject.kskgsj == null) {
                    this.selectObject.kskgsj = ''
                }
                if (this.selectObject.kswgsj == null) {
                    this.selectObject.kswgsj = ''
                }
                if (this.selectObject.ksxmghsj == null) {
                    this.selectObject.ksxmghsj = ''
                }
                if (this.selectObject.kslhzbwjsj == null) {
                    this.selectObject.kslhzbwjsj = ''
                }
                if (this.selectObject.ksdbsj == null) {
                    this.selectObject.ksdbsj = ''
                }
                if (this.selectObject.kshtqdsj == null) {
                    this.selectObject.kshtqdsj = ''
                }
                if (this.selectObject.ksjssj == null) {
                    this.selectObject.ksjssj = ''
                }

                if (this.selectObject.jslxsj == null) {
                    this.selectObject.jslxsj = ''
                }
                if (this.selectObject.jskgsj == null) {
                    this.selectObject.jskgsj = ''
                }
                if (this.selectObject.jswgsj == null) {
                    this.selectObject.jswgsj = ''
                }
                if (this.selectObject.jsxmghsj == null) {
                    this.selectObject.jsxmghsj = ''
                }
                if (this.selectObject.jslhzbwjsj == null) {
                    this.selectObject.jslhzbwjsj = ''
                }
                if (this.selectObject.jsdbsj == null) {
                    this.selectObject.jsdbsj = ''
                }
                if (this.selectObject.jshtqdsj == null) {
                    this.selectObject.jshtqdsj = ''
                }
                if (this.selectObject.jsjssj == null) {
                    this.selectObject.jsjssj = ''
                }

                if (this.departmentName != '工程技术部' && this.departmentName != '办公室' && this.departmentName != '办公室.') {
                    this.selectObject.lxbm.splice(0, this.selectObject.lxbm.length)
                    this.selectObject.lxbm.push(this.departmentName)
                }
            }
        }
    }
</script>

<style scoped>
    .table {
        width: 100%;
        font-size: 14px;
        margin-top: 20px;
    }

    .search-item:first-child {
        width: 150px;
    }

    .search-item:nth-child(n+2) {
        width: 180px;
        margin-left: 20px;
        margin-bottom: 10px;
    }
</style>
