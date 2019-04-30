<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i>小项目管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="el-icon-circle-plus" class="handle-del mr10" @click="addProject">增加
                </el-button>
            </div>
            <el-table
                    ref="multipleTable"
                    :data="projectList"
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
                        <el-button type="text" size="mini" @click="updateProject(scope.row)">修改</el-button>
                        <el-button type="text" size="mini" @click="openSmallProject(scope.row)">小项目管理</el-button>
                        <el-button type="text" style="color: #ff0000;" size="mini" @click="deleteProjectData(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    background
                    v-show="projectTotal>0"
                    @current-change="handleCurrentChange"
                    :current-page="listQuery.offset"
                    :page-size="listQuery.limit"
                    layout="total,prev,pager,next"
                    :total="projectTotal"
                    style="text-align: center">
            </el-pagination>
            <el-dialog :title="addUpdateDialogTitle" :close-on-click-modal="false" :visible.sync="addUpdateDialogVisible" width="50%" >
                <el-form ref="projectDataForm" :model="projectTemp" label-position="left" label-width="120px">
                    <el-form-item label="项目编号">
                        <el-select
                                clearable
                                filterable
                                v-model="projectTemp.xmbh"
                                style="width: 100%"
                                placeholder="项目编号"
                                value-key="xmbh"
                                @change="xmbhSelectChange">
                            <el-option
                                    clearable
                                    v-for="(item, index) in projects"
                                    :key="index"
                                    :label="item.xmbh"
                                    :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="项目名称">
                        <el-select
                                clearable
                                filterable
                                style="width: 100%"
                                v-model="projectTemp.xmmc"
                                placeholder="项目名称"
                                value-key="xmmc"
                                @change="xmmcSelectChange">
                            <el-option
                                    clearable
                                    v-for="(item, index) in projects"
                                    :key="index"
                                    :label="item.xmmc"
                                    :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="立项部门">
                        <el-input v-model="projectTemp.lxbm" readonly/>
                    </el-form-item>
                    <el-form-item label="申请人">
                        <el-input v-model="projectTemp.sqr" readonly/>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="addUpdateDialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="addUpdateDialogTitle==='增加'?addProjectData():updateProjectData()">确定</el-button>
                </div>
            </el-dialog>
            <el-dialog title="小项目管理" :close-on-click-modal="false" :visible.sync="smallProjectDialogVisible" width="80%" >
                <el-button type="primary" icon="el-icon-circle-plus" @click="addSmallProject">增加
                </el-button>
                <el-table
                        :data="smallProjectList"
                        border
                        stripe
                        class="table">
                    <el-table-column label="序号" align="center" sortable prop="xh" width="180">
                    </el-table-column>
                    <el-table-column label="小项目编号" align="center" sortable prop="xxmbh" width="180">
                    </el-table-column>
                    <el-table-column label="工作步骤名称" align="center" prop="gzbzmc" min-width="180">
                    </el-table-column>
                    <el-table-column label="施工单位" align="center" prop="sgdw" width="180">
                    </el-table-column>
                    <el-table-column label="合同金额" align="center" prop="htje" width="120">
                    </el-table-column>
                    <el-table-column label="合同签订时间时间" align="center" prop="htqdsj" width="160">
                    </el-table-column>
                    <el-table-column label="备注" align="center" prop="bz" width="160">
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" align="center" width="160">
                        <template slot-scope="scope">
                            <el-button type="text" size="mini" @click="updateSmallProject(scope.row)">修改</el-button>
                            <el-button type="text" size="mini" @click="attachment(scope.row)">附件</el-button>
                            <el-button type="text" style="color: #ff0000;" size="mini" @click="deleteSmallProjectData(scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="closeSmallProject">确定</el-button>
                </div>
            </el-dialog>
            <el-dialog :title="addUpdateSmallProjectDialogTitle" :close-on-click-modal="false" :visible.sync="addUpdateSmallProjectDialogVisible" width="50%" >
                <el-form ref="smallProjectDataForm" :model="smallProjectTemp" label-position="left" label-width="120px">
                    <el-form-item label="小项目编号">
                        <el-input v-model="smallProjectTemp.xxmbh"/>
                    </el-form-item>
                    <el-form-item label="工作步骤名称">
                        <el-input v-model="smallProjectTemp.gzbzmc"/>
                    </el-form-item>
                    <el-form-item label="施工单位">
                        <el-input v-model="smallProjectTemp.sgdw"/>
                    </el-form-item>
                    <el-form-item label="合同金额">
                        <el-input type="number" v-model="smallProjectTemp.htje"/>
                    </el-form-item>
                    <el-form-item label="合同签订时间">
                        <el-date-picker
                                v-model="smallProjectTemp.htqdsj"
                                type="datetime"
                                placeholder="选择日期时间"
                                value-format="yyyy-MM-dd HH:mm:ss"
                        style="width: 100%;">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input v-model="smallProjectTemp.bz"/>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="addUpdateSmallProjectDialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="addUpdateSmallProjectDialogTitle==='增加'?addSmallProjectData():updateSmallProjectData()">确定</el-button>
                </div>
            </el-dialog>
            <el-dialog title="附件" :close-on-click-modal="false" :visible.sync="attachmentVisiable" width="50%">
                <el-upload
                        class="upload-demo"
                        drag
                        :action="attachmentUrl"
                        :on-preview="handlePreview"
                        :before-remove="handleBeforeRemove"
                        :on-success="handleSuccess"
                        multiple
                        :file-list="attachmentFileList"
                        style="width: 100%;">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>上传文件</em></div>
                </el-upload>
                <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="attachmentVisiable=false">确 定</el-button>
            </span>
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
                projectList:null,
                smallProjectList:null,
                projectTotal:0,
                listQuery: {
                    offset: 1,
                    limit: 10
                },
                addUpdateDialogVisible:false,
                smallProjectDialogVisible:false,
                addUpdateSmallProjectDialogVisible:false,
                attachmentVisiable:false,
                addUpdateDialogTitle: '',
                addUpdateSmallProjectDialogTitle:'',
                projectTemp:{
                    id:'',
                    xmbh:'',
                    xmmc:'',
                    lxbm:'',
                    sqr:'',
                    y1:''
                },
                smallProjectTemp:{
                    id:'',
                    xxmid:"" ,// 小项目id，外部id=内部xxmid
                    xh:'',
                    xxmbh:'',
                    gzbzmc:'',
                    sgdw:'',
                    htje:'',
                    htqdsj:'',
                    bz:''
                },
                attachmentUrl:'',
                attachmentFileList: [],
                projects:[]
            }
        },
        created() {
            this.getProjectList()
        },
        methods:{
            getProjectList(){
                var _this=this
                axios.get('http://10.197.33.115:8080/xxmgl/selectAll', {
                    params: {
                        pageNum: _this.listQuery.offset
                    }
                }).then(res => {
                    this.projectList=res.data
                    this.projectTotal=parseInt(res.headers.allcount)
                })
            },
            addProject(){
                this.projectTemp={
                    id:'',
                    xmbh:'',
                    xmmc:'',
                    lxbm:'',
                    sqr:'',
                    y1:''
                }
                this.addUpdateDialogVisible=true;// 对话框可见
                this.addUpdateDialogTitle="增加"// 修改标题
                this.$nextTick(() => {
                    this.$refs['projectDataForm'].clearValidate()
                })
            },
            addProjectData(){
                this.$refs['projectDataForm'].validate((valid) => {
                    if (valid) {
                        axios.get('http://10.197.33.115:8080/xxmgl/insert', {
                            params: {
                                xmbh:this.projectTemp.xmbh,
                                xmmc:this.projectTemp.xmmc,
                                lxbm:this.projectTemp.lxbm,
                                sqr:this.projectTemp.sqr,
                                y1:this.projectTemp.y1
                            }
                        }).then(res => {
                            this.addUpdateDialogVisible = false
                            this.getProjectList()
                        })
                    }
                })
            },
            deleteProjectData(row){
                this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {// 弹出确认框
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.get('http://10.197.33.115:8080/xxmgl/delete', {
                        params: {
                            id: row
                        }
                    }).then(res => {
                        this.listQuery.offset=1;
                        this.getProjectList()
                    })
                }).catch(() => {
                    this.$message.info('已取消删除');
                })
            },
            updateProject(row){
                this.projectTemp=row
                this.addUpdateDialogVisible=true;
                this.addUpdateDialogTitle="修改"
                this.$nextTick(() => {
                    this.$refs['projectDataForm'].clearValidate()
                })
            },
            updateProjectData(){
                this.$refs['projectDataForm'].validate((valid) => {
                    if (valid) {
                        axios.get('http://10.197.33.115:8080/xxmgl/updata', {
                            params: {
                                id:this.projectTemp.id,
                                xmbh:this.projectTemp.xmbh,
                                xmmc:this.projectTemp.xmmc,
                                lxbm:this.projectTemp.lxbm,
                                sqr:this.projectTemp.sqr,
                                y1:this.projectTemp.y1
                            }
                        }).then(res => {
                            this.addUpdateDialogVisible=false
                            this.getProjectList()
                        })
                    }
                })
            },
            handleCurrentChange(val) {
                this.listQuery.offset=val;
                this.getProjectList()
            },
            xmbhSelectChange(item){
                this.projectTemp.xmbh=item.xmbh
                this.projectTemp.xmmc=item.xmmc
                this.projectTemp.lxbm=item.lxbm
                this.projectTemp.sqr=item.sqr
                this.projectTemp.y1=item.y1
            },
            xmmcSelectChange(item){
                this.projectTemp.xmbh=item.xmbh
                this.projectTemp.xmmc=item.xmmc
                this.projectTemp.lxbm=item.lxbm
                this.projectTemp.sqr=item.sqr
                this.projectTemp.y1=item.y1
            },

            openSmallProject(row){
                this.smallProjectTemp.xxmid=row.id
                this.smallProjectDialogVisible=true
                this.getSmallProjectList()
            },
            closeSmallProject(){
                this.smallProjectTemp.xxmid=''
                this.smallProjectDialogVisible=false
            },
            getSmallProjectList(){
                var _this=this
                axios.get('http://10.197.33.115:8080/xxmcb/select', {
                    params: {
                        xxmid: _this.smallProjectTemp.xxmid
                    }
                }).then(res => {
                    this.smallProjectList=res.data
                })
            },
            addSmallProject(){
                this.smallProjectTemp={
                    id:'',
                    xxmid:this.smallProjectTemp.xxmid,// 不需要重置
                    xh:'',
                    xxmbh:'',
                    gzbzmc:'',
                    sgdw:'',
                    htje:'',
                    htqdsj:'',
                    bz:''
                }
                this.addUpdateSmallProjectDialogVisible=true;// 对话框可见
                this.addUpdateSmallProjectDialogTitle="增加"// 修改标题
                this.$nextTick(() => {
                    this.$refs['smallProjectDataForm'].clearValidate()
                })
            },
            addSmallProjectData(){
                this.$refs['smallProjectDataForm'].validate((valid) => {
                    if (valid) {
                        console.log(this.smallProjectTemp.xxmid)
                        axios.get('http://10.197.33.115:8080/xxmcb/insert', {
                            params: {
                                xxmid:this.smallProjectTemp.xxmid,
                                xxmbh:this.smallProjectTemp.xxmbh,
                                gzbzmc:this.smallProjectTemp.gzbzmc,
                                sgdw:this.smallProjectTemp.sgdw,
                                htje:this.smallProjectTemp.htje,
                                htqdsj:this.smallProjectTemp.htqdsj,
                                bz:this.smallProjectTemp.bz
                            }
                        }).then(res => {
                            this.addUpdateSmallProjectDialogVisible = false
                            this.getSmallProjectList()
                        })
                    }
                })
            },
            deleteSmallProjectData(row){
                this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {// 弹出确认框
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.get('http://10.197.33.115:8080/xxmcb/delete', {
                        params: {
                            id: row
                        }
                    }).then(res => {
                        this.getSmallProjectList()
                    })
                }).catch(() => {
                    this.$message.info('已取消删除');
                })
            },
            updateSmallProject(row){
                this.smallProjectTemp=row
                this.addUpdateSmallProjectDialogVisible=true;
                this.addUpdateSmallProjectDialogTitle="修改"
                this.$nextTick(() => {
                    this.$refs['smallProjectDataForm'].clearValidate()
                })
            },
            updateSmallProjectData(){
                this.$refs['smallProjectDataForm'].validate((valid) => {
                    if (valid) {
                        axios.get('http://10.197.33.115:8080/xxmcb/updata', {
                            params: {
                                id:this.smallProjectTemp.id,
                                xh:this.smallProjectTemp.xh,// 非必填
                                xxmbh:this.smallProjectTemp.xxmbh,
                                gzbzmc:this.smallProjectTemp.gzbzmc,
                                sgdw:this.smallProjectTemp.sgdw,
                                htje:this.smallProjectTemp.htje,
                                htqdsj:this.smallProjectTemp.htqdsj,
                                bz:this.smallProjectTemp.bz
                            }
                        }).then(res => {
                            this.addUpdateSmallProjectDialogVisible=false
                            this.getSmallProjectList()
                        })
                    }
                })
            },
            attachment(row){
                this.smallProjectTemp=row
                this.attachmentVisiable=true
                this.attachmentUrl='http://10.197.33.115:8080/contract/uploadHtfj?id='+this.smallProjectTemp.id

                axios.get('http://10.197.33.115:8080/contract/getFjs', {
                    params: {
                        cid: this.smallProjectTemp.id
                    }
                }).then(res => {
                    this.attachmentFileList = []
                    for (let i = 0; i < res.data.length; i++) {
                        this.attachmentFileList.push({
                            name: res.data[i].fname,
                            id: res.data[i].fid
                        })
                    }
                })
            },
            handlePreview(file) {
                window.open('http://10.197.33.115:8080/contract/getFj?fid='+file.id+'&fname='+file.name)
            },
            handleBeforeRemove(file, fileList) {
                this.$confirm('此操作将永久删除该附件,是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.get('http://10.197.33.115:8080/contract/deletFj', {
                        params: {
                            fid: file.id
                        }
                    })
                        .then(res => {
                            this.$message.info("删除成功！")
                        })
                }).catch(() => {
                    this.attachment(this.smallProjectTemp)
                })
            },
            handleSuccess(response, file, fileList){
                this.attachment(this.smallProjectTemp)
            },
        },
        watch: {
            addUpdateDialogVisible(newValue, oldValue) {
                if (newValue==true) {
                    axios.get('http://10.197.33.115:8080/xxmgl/getProjects', {
                        params: {
                            userName: localStorage.getItem('userName')
                        }
                    }).then(res => {
                        if (res.data != null) {
                            for (let i = 0; i < res.data.length; i++) {
                                this.projects.push({
                                    xmbh:res.data[i].xmbh,
                                    xmmc:res.data[i].xmmc,
                                    lxbm:res.data[i].lxbm,
                                    sqr:res.data[i].sqr,
                                    y1:res.data[i].y1
                                })
                            }
                        }
                    })
                }else{
                    this.projects=[]
                }
            }
        },
    }
</script>

<style scoped>
    .table {
        width: 100%;
        font-size: 14px;
        margin-top: 20px;
    }
</style>
