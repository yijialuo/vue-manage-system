<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i>项目实施进度报表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="el-icon-circle-plus" class="handle-del mr10" @click="download">下载
                </el-button>
            </div>
            <el-table
                    ref="multipleTable"
                    :data="list"
                    border
                    stripe
                    class="table">
                <el-table-column label="项目实施进度报表" align="center">
                    <el-table-column label="序号" align="center" sortable prop="id" min-width="300">
                    </el-table-column>
                    <el-table-column label="项目计划号" align="center" prop="projectNo" width="120">
                    </el-table-column>
                    <el-table-column label="项目名称" align="center" prop="projectNam" min-width="320">
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
                list:null
            }
        },
        created() {
            this.getList()
        },
        methods:{
            getList(){
                axios.get('http://10.197.41.100:8080/sgjdb/getAllSgjdb', {

                }).then(res => {
                    this.list=res.data
                })
            },
            download(row){
                window.location.href='http://10.197.41.100:8080/Bb/downloadXMSSJDB'
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
</style>
