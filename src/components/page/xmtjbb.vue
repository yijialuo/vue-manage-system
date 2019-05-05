<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i>项目统计报表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container111">
            <div class="handle-box">
                <el-date-picker
                        v-model="dateSelect"
                        type="month"
                        class="handle-del mr10"
                        placeholder="选择日期"
                        clearable
                        format="yyyy-MM"
                        value-format="yyyy-MM"
                        @change="dateSelectChange">
                </el-date-picker>
                <el-button type="primary" icon="el-icon-circle-plus" class="handle-del mr10" style="margin-left: 10px;" @click="download">下载
                </el-button>
            </div>
            <el-table
                    :data="list"
                    border
                    stripe
                    class="table">
                <el-table-column label="项目统计报表" align="center">
                    <el-table-column label="年度" align="center" width="140">
                        <template slot-scope="scope">
                            <ul style="display: flex;">
                                <li style="flex: 1;text-align: center;list-style: none;">{{ scope.row[0] }}</li>
                            </ul>
                        </template>
                    </el-table-column>
                    <el-table-column label="维修" align="center" >
                        <el-table-column label="设备" align="center"  width="420">
                            <template slot-scope="scope">
                                <ul style="display: flex;">
                                    <li style="flex: 1;text-align: center;border-right: 1px solid #ebeef5;list-style: none;">{{ scope.row[1] }}</li>
                                    <li style="flex: 1;text-align: center;border-right: 1px solid #ebeef5;list-style: none;">{{ scope.row[2] }}</li>
                                    <li style="flex: 1;text-align: center;list-style: none;">{{ scope.row[3] }}</li>
                                </ul>
                            </template>
                        </el-table-column>
                        <el-table-column label="基建" align="center"  width="420">
                            <template slot-scope="scope">
                                <ul style="display: flex;">
                                    <li style="flex: 1;text-align: center;border-right: 1px solid #ebeef5;list-style: none;">{{ scope.row[4] }}</li>
                                    <li style="flex: 1;text-align: center;border-right: 1px solid #ebeef5;list-style: none;">{{ scope.row[5] }}</li>
                                    <li style="flex: 1;text-align: center;list-style: none;">{{ scope.row[6] }}</li>
                                </ul>
                            </template>
                        </el-table-column>
                        <el-table-column label="信息" align="center"  width="420">
                            <template slot-scope="scope">
                                <ul style="display: flex;">
                                    <li style="flex: 1;text-align: center;border-right: 1px solid #ebeef5;list-style: none;">{{ scope.row[7] }}</li>
                                    <li style="flex: 1;text-align: center;border-right: 1px solid #ebeef5;list-style: none;">{{ scope.row[8] }}</li>
                                    <li style="flex: 1;text-align: center;list-style: none;">{{ scope.row[9] }}</li>
                                </ul>
                            </template>
                        </el-table-column>
                    </el-table-column>
                    <el-table-column label="物资" align="center"  width="420">
                        <template slot-scope="scope">
                            <ul style="display: flex;">
                                <li style="flex: 1;text-align: center;border-right: 1px solid #ebeef5;list-style: none;">{{ scope.row[10] }}</li>
                                <li style="flex: 1;text-align: center;border-right: 1px solid #ebeef5;list-style: none;">{{ scope.row[11] }}</li>
                                <li style="flex: 1;text-align: center;list-style: none;">{{ scope.row[12] }}</li>
                            </ul>
                        </template>
                    </el-table-column>
                    <el-table-column label="固定资产（设备）" align="center"  width="420">
                        <template slot-scope="scope">
                            <ul style="display: flex;">
                                <li style="flex: 1;text-align: center;border-right: 1px solid #ebeef5;list-style: none;">{{ scope.row[13] }}</li>
                                <li style="flex: 1;text-align: center;border-right: 1px solid #ebeef5;list-style: none;">{{ scope.row[14] }}</li>
                                <li style="flex: 1;text-align: center;list-style: none;">{{ scope.row[15] }}</li>
                            </ul>
                        </template>
                    </el-table-column>
                    <el-table-column label="总金额（万元）" align="center" width="150">
                        <template slot-scope="scope">
                            <ul style="display: flex;">
                                <li style="flex: 1;text-align: center;list-style: none;">{{ scope.row[16] }}</li>
                            </ul>
                        </template>
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
                dateSelect:'',
                list:null,
            }
        },
        methods:{
            download(row){
                if(this.dateSelect==null||this.dateSelect==''){
                    this.$message.warning("请选择日期！")
                    return
                }
                var dates=this.dateSelect.split('-')
                var year=dates[0]
                var month=dates[1]
                window.location.href='http://10.197.41.100:8080/Bb/downloadXMTJBB?year='+year+'&month='+month
            },
            dateSelectChange(){
                if(this.dateSelect==null){
                    this.list=null
                    return
                }
                var dates=this.dateSelect.split('-')
                var year=dates[0]
                var month=dates[1]
                var _this=this
                axios.get('http://10.197.41.100:8080/Bb/get', {
                    params: {
                        year: year,
                        month:month
                    }
                }).then(res => {
                    this.list=res.data
                    console.log(this.list)
                })
            },
        }
    }
</script>

<style>
    .table {
        width: 100%;
        font-size: 14px;
        margin-top: 20px;
    }
    .container111 .el-table--small td{
        padding: 0;
    }
</style>
