<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i>小项目管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="el-icon-circle-plus" class="handle-del mr10" @click="add">增加
                </el-button>
            </div>
            <el-table
                    ref="multipleTable"
                    :data="list"
                    border
                    stripe
                    class="table">
                <el-table-column label="项目编号" align="center" sortable prop="xmbh" width="180">
                </el-table-column>
                <el-table-column label="项目名称" align="center" prop="xmmc" min-width="180">
                </el-table-column>
                <el-table-column label="立项部门" align="center" prop="lxbm" width="180">
                </el-table-column>
                <el-table-column label="申请人" align="center" prop="sqr" width="180">
                </el-table-column>
                <el-table-column label="创建时间" align="center" sortable prop="cjsj" width="200">
                </el-table-column>
                <el-table-column fixed="right" label="操作" align="center" width="240">
                    <template slot-scope="scope">
                        <el-button type="text" size="mini" @click="update(scope.row)">修改</el-button>
                        <el-button type="text" size="mini" @click="download(scope.row)">小项目管理</el-button>
                        <el-button type="text" style="color: #ff0000;" size="mini" @click="deleteData(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    v-show="total>0"
                    @current-change="handleCurrentChange"
                    :current-page="listQuery.offset"
                    :page-size="listQuery.limit"
                    layout="total,prev,pager,next"
                    :total="total"
                    style="text-align: center">
            </el-pagination>
            <el-dialog :title="addUpdateDialogTitle" :visible.sync="addUpdateDialogVisible" width="50%" >
                <el-form ref="dataForm" :model="temp"label-position="left" label-width="120px">
                    <el-form-item label="项目编号">
                        <el-input v-model="temp.xmbh"/>
                    </el-form-item>
                    <el-form-item label="项目名称">
                        <el-input v-model="temp.xmmc"/>
                    </el-form-item>
                    <el-form-item label="立项部门">
                        <el-input v-model="temp.lxbm"/>
                    </el-form-item>
                    <el-form-item label="申请人">
                        <el-input v-model="temp.sqr"/>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="addUpdateDialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="addUpdateDialogTitle==='增加'?addData():updateData()">确定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "xxmgl",
        inject: ['reload'],
        data(){
            return{
                list:null,
                total:0,
                listQuery: {
                    offset: 1,
                    limit: 10
                },
                addUpdateDialogVisible:false,
                addUpdateDialogTitle: '',
                temp:{
                    id:'',
                    xmbh:'',
                    xmmc:'',
                    lxbm:'',
                    sqr:''
                }
            }
        },
        created() {
            this.getList()
        },
        methods:{
            getList(){
                var _this=this
                axios.get('http://10.197.41.100:8080/xxmgl/selectAll', {
                    params: {
                        pageNum: _this.listQuery.offset
                    }
                }).then(res => {
                    this.list=res.data
                    this.total=parseInt(res.headers.allcount)
                })
            },
            add(){
                this.temp={
                    id:'',
                    xmbh:'',
                    xmmc:'',
                    lxbm:'',
                    sqr:''
                }
                this.addUpdateDialogVisible=true;// 对话框可见
                this.addUpdateDialogTitle="增加"// 修改标题
                this.$nextTick(() => {
                    this.$refs['dataForm'].clearValidate()
                })
            },
            addData(){
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        axios.get('http://10.197.41.100:8080/xxmgl/insert', {
                            params: {
                                xmbh:this.temp.xmbh,
                                xmmc:this.temp.xmmc,
                                lxbm:this.temp.lxbm,
                                sqr:this.temp.sqr
                            }
                        }).then(res => {
                            this.addUpdateDialogVisible = false
                            this.getList()
                        })
                    }
                })
            },
            deleteData(row){
                this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {// 弹出确认框
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.get('http://10.197.41.100:8080/xxmgl/delete', {
                        params: {
                            id: row
                        }
                    }).then(res => {
                        this.listQuery.offset=1;
                        this.getList()
                    })
                }).catch(() => {
                    this.$message.info('已取消删除');
                })
            },
            update(row){
                this.temp=row
                this.addUpdateDialogVisible=true;
                this.addUpdateDialogTitle="修改"
                this.$nextTick(() => {
                    this.$refs['dataForm'].clearValidate()
                })
            },
            updateData(){
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        axios.get('http://10.197.41.100:8080/xxmgl/updata', {
                            params: {
                                id:this.temp.id,
                                xmbh:this.temp.xmbh,
                                xmmc:this.temp.xmmc,
                                lxbm:this.temp.lxbm,
                                sqr:this.temp.sqr
                            }
                        }).then(res => {
                            this.addUpdateDialogVisible=false
                            this.getList()
                        })
                    }
                })
            },
            handleCurrentChange(val) {
                this.listQuery.offset=val;
                this.getList()
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
</style>
