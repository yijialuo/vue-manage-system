<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i>项目实施进度报表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div>
                <el-input v-model="selectObject.projectNo" class="search-item" placeholder="项目计划号">
                </el-input>
                <el-input v-model="selectObject.projectNam" class="search-item" placeholder="项目名称">
                </el-input>
                <el-select
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
                <el-date-picker
                        v-model="selectObject.jsbjlsj"
                        class="search-item"
                        type="datetime"
                        placeholder="技术部经理审批时间"
                        value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
                <el-date-picker
                        v-model="selectObject.lhsj"
                        class="search-item"
                        type="date"
                        placeholder="过会时间"
                        value-format="yyyy-MM-dd">
                </el-date-picker>
            </div>
            <div>
                <el-date-picker
                        v-model="selectObject.zjhsj"
                        class="search-item"
                        type="date"
                        placeholder="过总经办时间"
                        value-format="yyyy-MM-dd">
                </el-date-picker>
                <el-date-picker
                        v-model="selectObject.dbsj"
                        class="search-item"
                        type="date"
                        placeholder="定标时间"
                        value-format="yyyy-MM-dd">
                </el-date-picker>
                <el-date-picker
                        v-model="selectObject.httjpssj"
                        class="search-item"
                        type="datetime"
                        placeholder="合同提交评审时间"
                        value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
                <el-date-picker
                        v-model="selectObject.htqdsj"
                        class="search-item"
                        type="datetime"
                        placeholder="合同签订时间"
                        value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
                <el-input v-model="selectObject.htje" class="search-item" placeholder="合同金额（万元）">
                </el-input>
                <el-date-picker
                        v-model="selectObject.kgsj"
                        class="search-item"
                        type="datetime"
                        placeholder="开工时间"
                        value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
                <el-date-picker
                        v-model="selectObject.ysrq"
                        class="search-item"
                        type="datetime"
                        placeholder="验收时间"
                        value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
                <el-input v-model="selectObject.zjsjd" class="search-item" placeholder="总结算进度（万元）">
                </el-input>
            </div>
            <div>
                <el-date-picker
                        v-model="selectObject.wcjsjs"
                        class="search-item"
                        type="date"
                        placeholder="完成结算时间"
                        value-format="yyyy-MM-dd">
                </el-date-picker>
                <el-input v-model="selectObject.jsbjbr" class="search-item" placeholder="技术部经办人">
                </el-input>
                <el-input v-model="selectObject.sgdw" class="search-item" placeholder="施工单位">
                </el-input>
                <el-button type="primary" icon="el-icon-circle-plus" class="search-item" @click="download">查询
                </el-button>
                <el-button type="primary" icon="el-icon-circle-plus" class="search-item" @click="download">下载
                </el-button>
            </div>
            <h3 style="text-align: center">项目实施进度报表</h3>
            <el-table
                    max-height="780"
                    ref="multipleTable"
                    :data="list"
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
                    <el-table-column label="过会时间" align="center" prop="lhsj" width="120">
                    </el-table-column>
                    <el-table-column label="过总经办时间" align="center" prop="zjhsj" width="120">
                    </el-table-column>
                    <el-table-column label="定标时间" align="center" prop="dbsj" width="120">
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
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "operateManual",
        inject: ['reload'],
        data(){
            return{
                list:[],
                selectObject:{
                    projectNo:'',
                    projectNam:'',
                    investmentEstimate:'',
                    declarationDep:'',
                    lxlb:'',
                    xmlb:'',
                    xmdl:'',
                    jsbjlsj:'',
                    lhsj:'',
                    zjhsj:'',
                    dbsj:'',
                    httjpssj:'',
                    htqdsj:'',
                    htje:'',
                    kgsj:'',
                    ysrq:'',
                    bndjsjd:'',
                    zjsjd:'',
                    wcjsjs:'',
                    jsbzgjl:'',
                    jsbjbr:'',
                    sgdw:'',
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
                    },{
                        value:'股份项目',
                        label:'股份项目'
                    },{
                        value:'内部项目',
                        label:'内部项目'
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
            }
        },
        created() {
            this.getList()
            this.getAllDptName()
        },
        methods:{
            getList(){
                axios.get('http://10.197.41.100:8080/sgjdb/getAllSgjdb', {

                }).then(res => {
                    console.log(res.data[0])
                    this.list=res.data
                })
            },
            download(row){
                window.location.href='http://10.197.41.100:8080/Bb/downloadXMSSJDB'
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
        }
    }
</script>

<style scoped>
    .table {
        width: 100%;
        font-size: 14px;
        margin-top: 20px;
    }
    .search-item:first-child{
        width: 150px;
    }
    .search-item:nth-child(n+2){
        width: 170px;
        margin-left: 20px;
        margin-bottom: 10px;
    }
</style>
