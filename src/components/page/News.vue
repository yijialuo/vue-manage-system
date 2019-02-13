<template>
    <div class="">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-copy"></i> 消息任务</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-tabs v-model="message">
                <el-tab-pane :label="`待办的任务(${undoXm.length})`" name="first">
                    <el-table :data="undoXm" :show-header="true" style="width: 100%">
                        <el-table-column label="项目名称">
                            <template slot-scope="scope">
                                <span class="message-title">{{scope.row.projectNam}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="申请人">
                            <template slot-scope="scope">
                                <span class="message-title">{{scope.row.proposer}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="申请时间">
                            <template slot-scope="scope">
                                <span class="message-title">{{scope.row.applicationDte}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button size="small" @click="xmxq(scope.row)">项目详情</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="handle-row">
                        <el-button type="primary">全部标为已读</el-button>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <!-- 项目详情框 -->
        <el-dialog title="项目详情" :visible.sync="show_xq" width="50%" center>
            <el-form label-width="100px">
                <el-form-item label="项目名称">
                    <el-input :disabled="true" v-model="xm.projectNam"></el-input>
                </el-form-item>
                <el-form-item label="申报部门">
                    <el-input :disabled="true" v-model="xm.declarationDep"></el-input>
                </el-form-item>
                <el-form-item label="项目类别">
                    <el-input :disabled="true" v-model="xm.projectType"></el-input>
                </el-form-item>
                <el-form-item label="投资概算">
                    <el-input :disabled="true" v-model="xm.investmentEstimate"></el-input>
                </el-form-item>
                <el-form-item label="项目负责人">
                    <el-input :disabled="true" v-model="xm.personInCharge"></el-input>
                </el-form-item>
                <el-form-item label="立项背景理由">
                    <el-input :disabled="true" v-model="xm.establishReason" type="textarea"
                              placeholder="立项背景理由"
                              :autosize="{ minRows: 2, maxRows: 4}"
                    ></el-input>
                </el-form-item>
                <el-form-item label="立项内容规模">
                    <el-input :disabled="true" v-model="xm.scale" type="textarea"
                              placeholder="立项内容规模"
                              :autosize="{ minRows: 2, maxRows: 4}"
                    ></el-input>
                </el-form-item>
                <el-form-item label="投资概算说明">
                    <el-input :disabled="true" v-model="xm.illustration" type="textarea"
                              placeholder="投资概算说明"
                              :autosize="{ minRows: 2, maxRows: 4}"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-table
                            :data="commentList"
                            style="width: 100%">
                        <el-table-column
                                prop="time"
                                label="日期"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="usernam"
                                label="姓名"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="comment"
                                label="审批">
                        </el-table-column>
                    </el-table>
                </el-form-item>
                <el-form-item label="审批意见：">
                    <el-input v-model="comment" type="textarea"
                              placeholder="审批意见："
                              :autosize="{ minRows: 2, maxRows: 4}"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-upload
                            class="upload-demo"
                            drag
                            :action="url"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :on-success="handleSuccess"
                            multiple
                            :file-list="fileList"
                    >
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="show_xq = false">取 消</el-button>
                <el-button type="primary" @click="sp">审 批</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'news',
        created() {
            //领取项目
            this.lqxm()
        },
        data() {
            return {
                url: '',
                fileList: [],
                commentList: [],
                show_xq: false,
                show_bl: false,
                comment: '',
                xm: {},
                ip: 'http://localhost:8080',
                message: 'first',
                //没有处理的项目
                undoXm: []
            }
        },
        methods: {
            // onProgress(event, file, fileList) {
            //     if (this.somename)
            //         file.name = file.name.split(".")[0] + "副本." + file.name.split(".")[1]
            // },
            // //上传前判断文件名是否重复
            // handleBeforeupload(file) {
            //     this.somename = false
            //     for (var i = 0; i < this.fileList.length; i++) {
            //         if (this.fileList[i].name == file.name) {
            //             this.$message.warning("存在相同文件名称，已修改文件名！");
            //             this.somename = true
            //         }
            //     }
            // },


            //删除数组中指定元素
            removeByValue(arr, val) {
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] == val) {
                        arr.splice(i, 1);
                        break;
                    }
                }
            },

            //上传成功，重新请求
            handleSuccess(){
                console.log('handleSuccess')
                //重新请求
                axios.get(this.ip+'/Attachment/getattachment',{
                    params:{
                        pid:this.xm.pid
                    }
                })
                    .then(res=>{
                        if(res.data){
                            this.fileList=[]
                            for(let i=0;i<res.data.length;i++){
                                this.fileList.push({
                                    name:res.data[i].attachment_nam,
                                    id:res.data[i].attachment_id
                                })
                            }
                        }
                        //    return false
                    })
            },
            //删除请求
            handleRemove(file, fileList) {
                this.$confirm('此操作将永久删除该附件,是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    axios.get(this.ip+'/Attachment/deletAttachment',{
                        params:{
                            userId:localStorage.getItem('userId'),
                            attachment_id:file.id
                        }
                    })
                        .then(res=>{
                                this.$message.info("删除成功！")
                        })
                })
                    .catch(()=>{
                        //重新请求
                        axios.get(this.ip+'/Attachment/getattachment',{
                            params:{
                                pid:this.xm.pid
                            }
                        })
                            .then(res=>{
                                if(res.data){
                                    this.fileList=[]
                                    for(let i=0;i<res.data.length;i++){
                                        this.fileList.push({
                                            name:res.data[i].attachment_nam,
                                            id:res.data[i].attachment_id
                                        })
                                    }
                                }
                                //    return false
                            })
                    })
            },




            //点击文件下载
            handlePreview(file) {
                window.open(this.ip+'/Attachment/getattachment1?attachment_id='+file.id)
            },


            //领取评论
            lqpl(pid) {
                axios.get(this.ip + '/projectApplication/projecttocomment', {
                    params: {
                        pid: pid
                    }
                })
                    .then(res => {
                        if (res.data) {
                            this.commentList = res.data
                        }
                    })
            },
            //审批
            sp() {
                if (!this.comment) {
                    this.$confirm('你没有填写审批意见 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        axios.get(this.ip + '/projectApplication/addComment', {
                            params: {
                                pid: this.xm.pid,
                                userId: localStorage.getItem('userId'),
                                comment: this.comment
                            }
                        })
                            .then(res => {
                                if (res.data) {
                                    this.show_xq = false
                                    this.lqxm()
                                }
                            })
                        location.reload()
                        this.$message.info("处理完成")
                    }).catch(() => {
                    })
                } else {
                    axios.get(this.ip + '/projectApplication/addComment', {
                        params: {
                            pid: this.xm.pid,
                            userId: localStorage.getItem('userId'),
                            comment: this.comment
                        }
                    })
                        .then(res => {
                            if (res.data) {
                                this.show_xq = false
                                this.lqxm()
                            }
                        })
                    location.reload()
                    this.$message.info("处理完成")
                }
            },
            //项目详情
            xmxq(row) {
                this.show_xq = true
                this.xm = row
                //领取评论
                this.lqpl(row.pid)
                //领取附件
                this.lqfj(row.pid)
                this.url='http://localhost:8080/projectApplication/uploadFile?pId='+row.pid+'&userId='+localStorage.getItem('userId')
            },
            //领取附件
            lqfj(pid){
                axios.get(this.ip+'/Attachment/getattachment',{
                    params:{
                        pid:pid
                    }
                })
                    .then(res=>{
                        if(res.data){
                            this.fileList=[]
                            for(let i=0;i<res.data.length;i++){
                                this.fileList.push({
                                    name:res.data[i].attachment_nam,
                                    id:res.data[i].attachment_id
                                })
                            }
                        }
                    })
            },
            //领取需要自己处理的项目
            lqxm() {
                axios.get(this.ip + '/projectApplication/lqxm', {
                    params: {
                        userId: localStorage.getItem('userId'),
                    }
                }).then(res => {
                    if (res.data) {
                        this.undoXm = res.data;
                    } else {
                        undoXm = []
                    }
                })
            },
        }
    }

</script>

<style>
    .message-title {
        cursor: pointer;
    }

    .handle-row {
        margin-top: 30px;
    }
</style>

