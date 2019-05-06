<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i>项目查询报表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="el-icon-circle-plus" class="handle-del mr10" @click="download">下载
                </el-button>
            </div>
            <h3 style="text-align: center">项目查询报表</h3>
            <el-table
                    max-height="780"
                    ref="multipleTable"
                    :data="list"
                    border
                    stripe
                    class="table">
                    <el-table-column label="项目编号"  fixed align="center" sortable prop="xmbh" min-width="150">
                    </el-table-column>
                    <el-table-column label="项目名称" fixed   align="center" sortable prop="xmmc" min-width="250">
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
                    <el-table-column label="计划金额（万元）" align="center" prop="jhje" width="120">
                    </el-table-column>
                    <el-table-column label="合同金额" align="center" prop="htje" width="120">
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
                    <el-table-column label="总结算进度" align="center" prop="zjsjd" width="140">
                    </el-table-column>
                    <el-table-column label="今年结算进度" align="center" prop="jnjsjd" width="160">
                    </el-table-column>
                    <el-table-column label="项目过会时间" align="center" prop="xmghsj" width="120">
                    </el-table-column>
                    <el-table-column label="两会招标文件时间" align="center" prop="lhzbwjsj" width="180">
                    </el-table-column>
                    <el-table-column label="定标时间" align="center" prop="dbsj" width="180">
                    </el-table-column>
                    <el-table-column label="合同签订时间" align="center" prop="htqdsj" width="120">
                    </el-table-column>
                    <el-table-column label="结算时间" align="center" prop="jssj" width="120">
                    </el-table-column>
                    <el-table-column label="承包单位" align="center" prop="cbdw" width="120">
                    </el-table-column>
                    <el-table-column label="项目发起人"  align="center" prop="xmfqr" width="120">
                    </el-table-column>
                    <el-table-column label="项目经办人" align="center" prop="xmjbr" width="120">
                    </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "xmcxbb",
        data(){
            return{
                list:null,
                ip:'http://10.197.41.100:8080'
            }
        },
        created() {
            this.getList()
        },
        methods:{
            getList(){
                axios.get(this.ip+'/xmcxb/selectAll')
                    .then(res=>{
                        this.list=res.data
                    })
            },

            //下载报表
            download(){

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