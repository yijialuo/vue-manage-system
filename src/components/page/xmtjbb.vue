<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i>项目统计报表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-date-picker
                        v-model="dateSelect"
                        type="date"
                        class="handle-del mr10"
                        placeholder="选择日期"
                        clearable
                        format="yyyy-MM"
                        value-format="yyyy-MM"
                        @change="dateSelectChange">
                </el-date-picker>
                <el-button type="primary" icon="el-icon-circle-plus" class="handle-del mr10" @click="download">下载
                </el-button>
            </div>
            <el-table
                    ref="multipleTable"
                    :data="list"
                    border
                    stripe
                    class="table">
                <el-table-column label="年度" align="center" width="120">
                </el-table-column>
                <el-table-column label="维修" align="center">
                    <el-table-column label="设备" align="center" min-width="150">
                        <el-table-column label="发标数量（项）"  align="center" min-width="150">
                        </el-table-column>
                        <el-table-column label="结算数量（项）" align="center" min-width="150">
                        </el-table-column>
                        <el-table-column label="结算金额（万元）" align="center" min-width="150">
                        </el-table-column>
                    </el-table-column>
                    <el-table-column label="基建" align="center" min-width="150">
                        <el-table-column label="发标数量（项）"  align="center" min-width="150">
                        </el-table-column>
                        <el-table-column label="结算数量（项）" align="center" min-width="150">
                        </el-table-column>
                        <el-table-column label="结算金额（万元）" align="center" min-width="150">
                        </el-table-column>
                    </el-table-column>
                    <el-table-column label="信息" align="center" min-width="150">
                        <el-table-column label="发标数量（项）"  align="center" min-width="150">
                        </el-table-column>
                        <el-table-column label="结算数量（项）" align="center" min-width="150">
                        </el-table-column>
                        <el-table-column label="结算金额（万元）" align="center" min-width="150">
                        </el-table-column>
                    </el-table-column>
                </el-table-column>
                <el-table-column label="物资" align="center" min-width="150">
                    <el-table-column label="发标数量（项）"  align="center" min-width="150">
                    </el-table-column>
                    <el-table-column label="结算数量（项）" align="center" min-width="150">
                    </el-table-column>
                    <el-table-column label="结算金额（万元）" align="center" min-width="150">
                    </el-table-column>
                </el-table-column>
                <el-table-column label="固定资产（设备）" align="center" min-width="150">
                    <el-table-column label="发标数量（项）"  align="center" min-width="150">
                    </el-table-column>
                    <el-table-column label="结算数量（项）" align="center" min-width="150">
                    </el-table-column>
                    <el-table-column label="结算金额（万元）" align="center" min-width="150">
                    </el-table-column>
                </el-table-column>
                <el-table-column label="总金额（万元）" align="center" width="150">
                    <el-table-column label="发标数量（项）"  align="center" min-width="150">
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
                list:null
            }
        },
        methods:{
            download(row){
                window.location.href='http://10.197.41.100:8080/operateManual/download?id='+row.id
            },
            dateSelectChange(){
                var dates=this.dateSelect.split('-')
                var year=dates[0]
                var month=dates[1]
                axios.get('http://10.197.41.100:8080/Bb/get', {
                    params: {
                        year: year,
                        month:month
                    }
                }).then(res => {
                    this.list=res.data
                })
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
