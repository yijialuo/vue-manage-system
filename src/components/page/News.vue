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
                            action="http://localhost:8080/sqb/upload?pId=5&userId=000"
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
            //查找审批评论
        },
        data() {
            return {
                url: '',
                fileList: [{
                    name: '附件一',
                    url:'xxxx'
                }, {
                    name: '附件二',
                    url:'xxx'
                }, {
                    name: '附件三',
                    url:'xxx'
                }],
                commentList: [],
                show_xq: false,
                show_bl: false,
                comment: '',
                xm: {},
                ip: 'http://192.168.0.154:8080',
                message: 'first',
                //没有处理的项目
                undoXm: []
            }
        },
        methods: {
            onProgress(event, file, fileList) {
                if (this.somename)
                    file.name = file.name.split(".")[0] + "副本." + file.name.split(".")[1]
            },
            //上传前判断文件名是否重复
            handleBeforeupload(file) {
                console.log("handleBeforeupload")
                this.somename = false
                for (var i = 0; i < this.fileList.length; i++) {
                    if (this.fileList[i].name == file.name) {
                        this.$message.warning("存在相同文件名称，已修改文件名！");
                        this.somename = true
                    }
                }
            },
            //删除前确认
            handleBeforeRemove(file, fileList) {
                console.log("handleBeforeRemove")
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            //删除数组中指定元素
            removeByValue(arr, val) {
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] == val) {
                        arr.splice(i, 1);
                        break;
                    }
                }
            },
            //删除请求
            handleRemove(file, fileList) {
                console.log("handleRemove")
                axios.get("http://localhost:8080/fj/deletFj", {
                    params: {
                        fjid: file.fjid
                    }
                })
                    .then(res => {
                        this.removeByValue(this.fileList, file)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            //上传成功
            handleSuccess(response, file, fileList) {
                console.log("handleSuccess")
                console.log("file:")
                console.log(file)
                axios.get('http://localhost:8080/fj/save', {
                    params: {
                        xmid: this.project.xmid,
                        fjmc: file.name,
                    }
                })
                    .then(res => {
                        var file = new Object()
                        file.name = res.data.fjmc
                        file.url = res.data.fjurl
                        file.fjid = res.data.fjid
                        this.fileList.push(file)
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            //预览文件
            handlePreview(file) {
                console.log("handlePreview")
                console.log(file);
                window.open(file.url, top)
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
                            console.log(res.data)
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
                                    this.$message.info("处理完成")
                                    this.show_xq = false
                                    this.lqxm()
                                }
                            })
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
                                this.$message.info("处理完成")
                                this.show_xq = false
                                this.lqxm()
                            }
                        })
                }


            },
            //项目详情
            xmxq(row) {
                this.show_xq = true
                this.xm = row
                this.lqpl(row.pid)
                console.log(row)
            },
            //领取需要自己处理的项目
            lqxm() {
                axios.get(this.ip + '/projectApplication/lqxm', {
                    params: {
                        userId: localStorage.getItem('userId'),
                    }
                }).then(res => {
                    if (res.data) {
                        //console.log(res.data)
                        this.undoXm = res.data;
                    } else {
                        undoXm = []
                    }
                })
            },
            bl() {

            },
        },
        computed: {
            xmNum() {
                return this.undoXm.length;
            }
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

