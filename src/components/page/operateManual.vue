<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i>操作手册</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button  v-if="userId=='admin'" type="primary" icon="el-icon-circle-plus" class="handle-del mr10" @click="add">增加
                </el-button>
            </div>
            <el-table
                    ref="multipleTable"
                    :data="list"
                    border
                    stripe
                    class="table">
                <el-table-column label="编号" align="center" sortable prop="id" width="140">
                </el-table-column>
                <el-table-column label="名称" align="center" prop="name" min-width="140">
                </el-table-column>
                <el-table-column label="上传者" align="center" prop="uploader" width="140">
                </el-table-column>
                <el-table-column label="描述" align="center" prop="description" min-width="140">
                </el-table-column>
                <el-table-column label="创建时间" align="center" sortable prop="createTime" width="160">
                </el-table-column>
                <el-table-column fixed="right" label="操作" align="center" width="140">
                    <template slot-scope="scope">
                        <el-button type="text" size="mini" v-if="userId=='admin'" @click="update(scope.row)">修改</el-button>
                        <el-button type="text" size="mini" @click="download(scope.row)">下载</el-button>
                        <el-button type="text" style="color: #ff0000;" size="mini" v-if="userId=='admin'" @click="deleteData(new Array().concat(scope.row.id))">删除</el-button>
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
                    background
                    style="text-align: center">
            </el-pagination>
            <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="50%" >
                <el-form ref="dataForm" :model="temp" :rules="dialogRules" label-position="left" label-width="120px">
                    <el-form-item label="名称" prop="name">
                        <el-input v-model="temp.name"/>
                    </el-form-item>
                    <el-form-item label="描述" prop="description">
                        <el-input v-model="temp.description" type="textarea" :autosize="{ minRows: 6, maxRows: 10}" placeholder="最多255字"/>
                    </el-form-item>
                    <el-form-item label="附件">
                        <el-upload
                                class="upload-demo"
                                ref="upload"
                                :auto-upload="false"
                                :limit="1"
                                action=""
                                :on-exceed="handleExceed"
                                name="file"
                                style="text-align: center">
                            <i class="el-icon-plus">点击上传</i>
                            <div slot="tip" class="el-upload__tip">附件列表</div>
                        </el-upload>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="addUpdateDialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="dialogTitle==='增加'?addData():updateData()">确定</el-button>
                </div>
            </el-dialog>
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
                list:null,
                total:0,
                listQuery: {
                    offset: 1,
                    limit: 10
                },
                userId:localStorage.getItem('userId'),
                addUpdateDialogVisible:false,
                addUpdateDialogTitle: '',
                dialogRules: {// 对话框表单验证规则
                    name: [{  required: true, message: '名称不可为空', trigger: 'blur' }],
                    description: [{  required: false,max:255, message: '最多255个字', trigger: 'change' }],
                },
                temp:{
                    id:'',
                    name:'',
                    address:'',
                    uploader:'',
                    description:'',
                    createTime:''
                }
            }
        },
        created() {
            this.getList()
        },
        methods:{
            getList(){
                var _this=this
                axios.get('http://10.197.41.100:8080/operateManual/get', {
                    params: {
                        page: _this.listQuery.offset,
                        size: _this.listQuery.limit
                    }
                }).then(res => {
                    this.list=res.data
                    this.total=parseInt(res.headers.allcount)
                })
            },
            add(){
                this.temp={
                    id:'',
                    name:'',
                    address:'',
                    uploader:'',
                    description:'',
                    createTime:''
                }
                this.dialogVisible=true;// 对话框可见
                this.dialogTitle="增加"// 修改标题
                this.$nextTick(() => {
                    this.$refs['dataForm'].clearValidate()
                    this.$refs.upload.uploadFiles=[]
                })
            },
            addData(){
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        let files = this.$refs.upload.uploadFiles
                        let form = new FormData()  // 创建form对象

                        let file
                        if(files&&files.length>0){
                            file=files[0].raw
                        }
                        if(file){
                            form.append('file', file, file.name)
                        }else{
                            this.$message.info("请选择附件！")
                            return
                        }

                        form.append('json', JSON.stringify({// 添加form表单中其他数据
                            "name":this.temp.name,
                            "uploader":localStorage.getItem('userName'),
                            "description":this.temp.description
                        }))

                        let config = {
                            headers: {'Content-Type': 'multipart/form-data'}
                        }

                        axios.post('http://10.197.41.100:8080/operateManual/add', form, config)
                            .then((res => {
                                this.$message.success("上传成功!")
                                this.dialogVisible = false
                                this.getList()
                            }))
                    }
                })
            },
            deleteData(row){
                console.log(row)
                console.log(typeof row)
                this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {// 弹出确认框
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.request({
                        url: 'http://10.197.41.100:8080/operateManual/delete',
                        method: 'delete',
                        data:row
                    }).then(res=>{
                        this.listQuery.offset=1;
                        this.getList()
                    })
                }).catch(() => {
                    this.$message.info('已取消删除');
                })
            },
            update(row){
                this.temp=row
                this.dialogVisible=true;
                this.dialogTitle="修改"
                this.$nextTick(() => {
                    this.$refs['dataForm'].clearValidate()
                    this.$refs.upload.uploadFiles=[]
                })
            },
            updateData(){
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        let files = this.$refs.upload.uploadFiles
                        let form = new FormData()  // 创建form对象

                        let file
                        if(files&&files.length>0){
                            file=files[0].raw
                        }
                        if(file){
                            form.append('file', file, file.name)
                        }else{
                            this.$message.info("请选择附件！")
                            return
                        }

                        form.append('json', JSON.stringify({
                            "id":this.temp.id,
                            "name":this.temp.name,
                            "uploader":localStorage.getItem('userName'),
                            "address":this.temp.address,
                            "description":this.temp.description,
                            "createTime":this.temp.createTime
                        }))

                        let config = {
                            headers: {'Content-Type': 'multipart/form-data'}
                        }

                        axios.put('http://10.197.41.100:8080/operateManual/update',form, config)
                            .then(res=>{
                                this.$message.success("修改成功!")
                                this.dialogVisible = false
                                this.getList()
                            })
                    }
                })
            },
            download(row){
                window.location.href='http://10.197.41.100:8080/operateManual/download?id='+row.id
            },
            handleCurrentChange(val) {
                this.listQuery.offset=val;
                this.getList()
            },
            handleExceed(){// 上传超出规定文件个数的处理
                this.$message.info("只能上传一个附件！")
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
