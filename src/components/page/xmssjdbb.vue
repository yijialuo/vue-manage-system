<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i>项目实施进度报表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div>
                <el-input clearable v-model="selectObject.projectNo" class="search-item" placeholder="项目计划号">
                </el-input>
                <el-input clearable v-model="selectObject.projectNam" class="search-item" placeholder="项目名称">
                </el-input>
                <el-select
                        v-if="departmentName=='工程技术部'||departmentName=='办公室'||departmentName=='办公室.'"
                        clearable
                        multiple
                        class="search-item"
                        v-model="selectObject.declarationDep"
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
                        v-model="selectObject.jsbjbr"
                        placeholder="技术部经办人">
                    <el-option
                            v-for="item in jsbjbr"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-select
                        clearable
                        multiple
                        class="search-item"
                        v-model="selectObject.jz"
                        placeholder="机种">
                    <el-option
                            v-for="item in jzs"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-input clearable v-model="selectObject.sgdw" class="search-item" placeholder="施工单位">
                </el-input>
            </div>
            <div>
                <el-date-picker
                        v-model="selectObject.ksjsbjlsj"
                        class="search-item"
                        type="datetime"
                        placeholder="开始技术部经理审批时间"
                        value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
                <el-date-picker
                        v-model="selectObject.kslhsj"
                        class="search-item"
                        type="date"
                        placeholder="开始过会时间"
                        value-format="yyyy-MM-dd">
                </el-date-picker>
                <el-date-picker
                        v-model="selectObject.kszjhsj"
                        class="search-item"
                        type="date"
                        placeholder="开始过总经办时间"
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
                        v-model="selectObject.kshttjpssj"
                        class="search-item"
                        type="datetime"
                        placeholder="开始合同提交评审时间"
                        value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
                <el-date-picker
                        v-model="selectObject.kshtqdsj"
                        class="search-item"
                        type="datetime"
                        placeholder="开始合同签订时间"
                        value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
                <el-date-picker
                        v-model="selectObject.kskgsj"
                        class="search-item"
                        type="datetime"
                        placeholder="开始开工时间"
                        value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
                <el-date-picker
                        v-model="selectObject.ksysrq"
                        class="search-item"
                        type="datetime"
                        placeholder="开始验收时间"
                        value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
                <el-date-picker
                        v-model="selectObject.kswcjsjs"
                        class="search-item"
                        type="date"
                        placeholder="开始完成结算时间"
                        value-format="yyyy-MM-dd">
                </el-date-picker>
            </div>
            <div>
                <el-date-picker
                        v-model="selectObject.jsjsbjlsj"
                        class="search-item"
                        type="datetime"
                        placeholder="结束技术部经理审批时间"
                        value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
                <el-date-picker
                        v-model="selectObject.jslhsj"
                        class="search-item"
                        type="date"
                        placeholder="结束过会时间"
                        value-format="yyyy-MM-dd">
                </el-date-picker>
                <el-date-picker
                        v-model="selectObject.jszjhsj"
                        class="search-item"
                        type="date"
                        placeholder="结束过总经办时间"
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
                        v-model="selectObject.jshttjpssj"
                        class="search-item"
                        type="datetime"
                        placeholder="结束合同提交评审时间"
                        value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
                <el-date-picker
                        v-model="selectObject.jshtqdsj"
                        class="search-item"
                        type="datetime"
                        placeholder="结束合同签订时间"
                        value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
                <el-date-picker
                        v-model="selectObject.jskgsj"
                        class="search-item"
                        type="datetime"
                        placeholder="结束开工时间"
                        value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
                <el-date-picker
                        v-model="selectObject.jsysrq"
                        class="search-item"
                        type="datetime"
                        placeholder="结束验收时间"
                        value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
                <el-date-picker
                        v-model="selectObject.jswcjsjs"
                        class="search-item"
                        type="date"
                        placeholder="结束完成结算时间"
                        value-format="yyyy-MM-dd">
                </el-date-picker>
            </div>
            <div>
                <el-button type="primary" icon="el-icon-circle-plus" class="search-item" @click="getList">查询
                </el-button>
                <el-button type="primary" icon="el-icon-circle-plus" class="search-item" @click="download">下载
                </el-button>
            </div>
            <h3 style="text-align: center">项目实施进度报表</h3>
            <el-table

                    ref="multipleTable"
                    :data="list.slice((currentPage-1)*10,currentPage*10)"
                    border
                    stripe
                    class="table">
                <el-table-column fixed label="序号" align="center" sortable prop="id" min-width="80">
                </el-table-column>
                <el-table-column fixed label="项目计划号" align="center" prop="projectNo" width="120">
                </el-table-column>
                <el-table-column fixed label="项目名称" align="center" prop="projectNam" min-width="320">
                </el-table-column>
                <el-table-column label="计划金额(万元)" align="center" prop="investmentEstimate" width="120">
                </el-table-column>
                <el-table-column label="立项部门" align="center" prop="declarationDep" width="120">
                </el-table-column>
                <el-table-column label="立项类别" align="center" prop="lxlb" width="120">
                </el-table-column>
                <el-table-column label="项目类别" align="center" prop="xmlb" width="120">
                </el-table-column>
                <el-table-column label="项目大类" align="center" prop="xmdl" width="120">
                </el-table-column>
                <el-table-column label="技术部经理审批时间" align="center" prop="jsbjlsj" width="160">
                </el-table-column>
                <el-table-column label="定标时间" align="center" prop="dbsj" width="120">
                </el-table-column>
                <el-table-column label="过会时间" align="center" prop="lhsj" width="120">
                </el-table-column>
                <el-table-column label="过总经办时间" align="center" prop="zjhsj" width="120">
                </el-table-column>
                <el-table-column label="合同提交评审时间" align="center" prop="httjpssj" width="160">
                </el-table-column>
                <el-table-column label="合同签订时间" align="center" prop="htqdsj" width="120">
                </el-table-column>
                <el-table-column label="合同金额（万元）" align="center" prop="htje" width="140">
                </el-table-column>
                <el-table-column label="开工时间" align="center" prop="kgsj" width="160">
                </el-table-column>
                <el-table-column label="验收时间" align="center" prop="ysrq" width="120">
                </el-table-column>
                <el-table-column label="本年度结算进度（万元）" align="center" prop="bndjsjd" width="180">
                </el-table-column>
                <el-table-column label="总结算进度（万元）" align="center" prop="zjsjd" width="180">
                </el-table-column>
                <el-table-column label="完成结算时间" align="center" prop="wcjsjs" width="120">
                </el-table-column>
                <el-table-column label="技术部经办人" align="center" prop="jsbjbr" width="120">
                </el-table-column>
                <el-table-column label="施工单位" align="center" prop="sgdw" width="120">
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
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "operateManual",
        inject: ['reload'],
        data() {
            return {
                departmentName:localStorage.getItem('departmentName'),
                list: [],
                currentPage: 1,
                total: 0,
                listQuery: {
                    offset: 1,
                    limit: 10
                },
                jzs: [
                    {
                        value: '门机',
                        label: '门机'
                    },
                    {
                        value: '装载机',
                        label: '装载机'
                    }, {
                        value: '推耙机',
                        label: '推耙机'
                    }, {
                        value: '推土机',
                        label: '推土机'
                    }, {
                        value: '挖掘机',
                        label: '挖掘机'
                    }, {
                        value: '叉拖板',
                        label: '叉拖板'
                    }, {
                        value: '散粮装船系统',
                        label: '散粮装船系统'
                    },{
                        value: '车间设备',
                        label: '车间设备'
                    }, {
                        value: '卸油设备',
                        label: '卸油设备'
                    }
                ],
                selectObject: {
                    jz:'',
                    projectNo: '',
                    projectNam: '',
                    investmentEstimate: '',
                    declarationDep: [],
                    lxlb: [],
                    xmlb: [],
                    xmdl: [],
                    ksjsbjlsj: '', jsjsbjlsj: '',
                    kslhsj: '', jslhsj: '',
                    kszjhsj: '', jszjhsj: '',
                    ksdbsj: '', jsdbsj: '',
                    kshttjpssj: '', jshttjpssj: '',
                    kshtqdsj: '', jshtqdsj: '',
                    htje: '',
                    kskgsj: '', jskgsj: '',
                    ksysrq: '', jsysrq: '',
                    bndjsjd: '',
                    zjsjd: '',
                    kswcjsjs: '', jswcjsjs: '',
                    jsbzgjl: '',
                    jsbjbr: [],
                    sgdw: '',
                },
                bms: [],
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
                jsbjbr: [],
            }
        },
        created() {
            this.getList()
            this.getAllDptName()
            this.getAllJSBJBRS()
        },
        methods: {
            getList() {
                const loading = this.$loading({
                    lock: true,
                    text: '加载中……',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });

                this.formatSelecrObject()

                axios.post('http://10.197.41.100:8080/sgjdb/select?pageNum=' + this.listQuery.offset, this.selectObject)
                    .then(res => {
                        this.list = res.data
                        this.total = parseInt(res.headers.allcount)
                        loading.close()
                    })
            },
            download() {
                window.location.href = 'http://10.197.41.100:8080/Bb/downloadXMSSJDB?param=' + JSON.stringify(this.selectObject)
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
            getAllJSBJBRS() {
                axios.get('http://10.197.41.100:8080/user/jsbjbr', {}).then(res => {
                    if (res.data != null) {
                        for (let i = 0; i < res.data.length; i++) {
                            this.jsbjbr.push({
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
                if (this.selectObject.ksjsbjlsj == null) {
                    this.selectObject.ksjsbjlsj = ''
                }
                if (this.selectObject.jsjsbjlsj == null) {
                    this.selectObject.jsjsbjlsj = ''
                }
                if (this.selectObject.kslhsj == null) {
                    this.selectObject.kslhsj = ''
                }
                if (this.selectObject.jslhsj == null) {
                    this.selectObject.jslhsj = ''
                }
                if (this.selectObject.kszjhsj == null) {
                    this.selectObject.kszjhsj = ''
                }
                if (this.selectObject.jszjhsj == null) {
                    this.selectObject.jszjhsj = ''
                }
                if (this.selectObject.ksdbsj == null) {
                    this.selectObject.ksdbsj = ''
                }
                if (this.selectObject.jsdbsj == null) {
                    this.selectObject.jsdbsj = ''
                }
                if (this.selectObject.kshttjpssj == null) {
                    this.selectObject.kshttjpssj == ''
                }
                if (this.selectObject.jshttjpssj == null) {
                    this.selectObject.jshttjpssj == ''
                }
                if (this.selectObject.kshtqdsj == null) {
                    this.selectObject.kshtqdsj = ''
                }
                if (this.selectObject.jshtqdsj == null) {
                    this.selectObject.jshtqdsj = ''
                }
                if (this.selectObject.kskgsj == null) {
                    this.selectObject.kskgsj = ''
                }
                if (this.selectObject.jskgsj == null) {
                    this.selectObject.jskgsj = ''
                }

                if (this.selectObject.ksysrq == null) {
                    this.selectObject.ksysrq = ''
                }
                if (this.selectObject.jsysrq == null) {
                    this.selectObject.jsysrq = ''
                }
                if (this.selectObject.kswcjsjs == null) {
                    this.selectObject.kswcjsjs = ''
                }
                if (this.selectObject.jswcjsjs == null) {
                    this.selectObject.jswcjsjs = ''
                }

                if(this.departmentName!='工程技术部'&&this.departmentName!='办公室'&&this.departmentName!='办公室.'){
                    this.selectObject.declarationDep.splice(0,this.selectObject.declarationDep.length)
                    this.selectObject.declarationDep.push(this.departmentName)
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
        width: 210px;
    }

    .search-item:nth-child(2) {
        width: 140px;
        margin-left: 20px;
        margin-bottom: 10px;
    }

    .search-item:nth-child(3) {
        width: 170px;
        margin-left: 20px;
        margin-bottom: 10px;
    }

    .search-item:nth-child(4) {
        width: 140px;
        margin-left: 20px;
        margin-bottom: 10px;
    }

    .search-item:nth-child(5) {
        width: 200px;
        margin-left: 20px;
        margin-bottom: 10px;
    }

    .search-item:nth-child(6) {
        width: 170px;
        margin-left: 20px;
        margin-bottom: 10px;
    }

    .search-item:nth-child(7) {
        width: 140px;
        margin-left: 20px;
        margin-bottom: 10px;
    }

    .search-item:nth-child(8) {
        width: 140px;
        margin-left: 20px;
        margin-bottom: 10px;
    }

    .search-item:nth-child(n+9) {
        width: 170px;
        margin-left: 20px;
        margin-bottom: 10px;
    }
</style>
