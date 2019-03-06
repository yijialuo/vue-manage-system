<template>
    <div class="">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-copy"></i> 项目消息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-tabs v-model="message">
                <!--待办项目-->
                <el-tab-pane v-if="user.groupId!='doman'" :label="`待办项目(${Xms.length})`" name="first">
                    <el-table :data="Xms" :show-header="true" style="width: 100%">
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
                </el-tab-pane>
                <!--待备案项目-->
                <el-tab-pane v-if="user.groupId=='jsb_doman'" :label="`待备案项目(${baXms.length})`" name="second">
                    <el-table :data="baXms" :show-header="true" style="width: 100%">
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
                </el-tab-pane>
                <!--驳回的项目-->
                <el-tab-pane v-if="user.groupId=='doman'" :label="`驳回的项目(${bhXms.length})`" name="third">
                    <el-table :data="bhXms" :show-header="true" style="width: 100%">
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
                </el-tab-pane>
            </el-tabs>
        </div>


        <!-- 项目详情框 -->
        <el-dialog title="项目详情" :visible.sync="show_xq" width="50%" center>
            <el-form label-width="100px">
                <el-form-item label="项目名称">
                    <el-input :disabled="user.groupId!='doman'" v-model="xm.projectNam"></el-input>
                </el-form-item>
                <el-form-item label="申报部门">
                    <el-input :disabled="user.groupId!='doman'" v-model="xm.declarationDep"></el-input>
                </el-form-item>
                <el-form-item label="项目类别">
                    <el-input :disabled="user.groupId!='doman'" v-model="xm.projectType"></el-input>
                </el-form-item>
                <el-form-item label="投资概算">
                    <el-input style="width: 215px;padding-right: 15px"  :disabled="user.groupId!='doman'" v-model="xm.investmentEstimate"></el-input>
                    项目负责人 <el-input style="width: 215px"  :disabled="user.groupId!='doman'" v-model="xm.personInCharge"></el-input>
                </el-form-item>
                <el-form-item label="立项背景理由">
                    <el-input :disabled="user.groupId!='doman'" v-model="xm.establishReason" type="textarea"
                              placeholder="立项背景理由"
                              :autosize="{ minRows: 2, maxRows: 4}"
                    ></el-input>
                </el-form-item>
                <el-form-item label="立项内容规模">
                    <el-input :disabled="user.groupId!='doman'" v-model="xm.scale" type="textarea"
                              placeholder="立项内容规模"
                              :autosize="{ minRows: 2, maxRows: 4}"
                    ></el-input>
                </el-form-item>
                <el-form-item label="投资概算说明">
                    <el-input :disabled="user.groupId!='doman'" v-model="xm.illustration" type="textarea"
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
                <el-button v-if="NodeId=='备案'" type="primary" @click="wcba">完成备案</el-button>
                <!--<div v-else>-->
                    <el-button  type="warning" v-if="NodeId=='两会'" @click="bh">未通过两会</el-button>
                    <el-button  type="warning" v-else-if="NodeId=='总经理办公会'" @click="bh">未通过总经会</el-button>
                    <el-button  type="warning" v-else-if="user.groupId!='doman'" @click="bh">驳 回</el-button>
                    <el-button  type="primary" v-if="NodeId=='两会'" @click="ty">通过两会</el-button>
                    <el-button  type="primary" v-else-if="NodeId=='总经理办公会'" @click="ty">通过总经会</el-button>
                    <el-button   type="primary" v-else-if="user.groupId=='doman'" @click="cxsq">重新申请</el-button>
                    <el-button   type="primary" v-else  @click="ty">同 意</el-button>
                <!--</div>-->
            </span>
        </el-dialog>

        <!--驳回弹窗-->
        <el-dialog title="审批意见" :visible.sync="show_bh">
            <el-form>
                <el-form-item label="审批意见：">
                    <el-input v-model="comment" type="textarea"
                              placeholder="审批意见："
                              :autosize="{ minRows: 2, maxRows: 4}"
                    ></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="show_bh=false">取 消</el-button>
            <el-button type="primary" @click="qd_bh">确 定</el-button>
            </span>
        </el-dialog>

        <!--同意弹窗-->
        <el-dialog title="审批意见" :visible.sync="show_ty">
            <el-form>
                <el-form-item label="审批意见：">
                    <!--<el-select v-model="comment" clearable placeholder="常用词汇">-->
                        <!--<el-option-->
                                <!--v-for="item in options"-->
                                <!--:key="item.value"-->
                                <!--:label="item.label"-->
                                <!--:value="item.value">-->
                        <!--</el-option>-->
                    <!--</el-select>-->
                    <el-input style="margin-top: 5px" v-model="comment" type="textarea"
                              :autosize="{ minRows: 2, maxRows: 4}"
                    ></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="show_ty=false">取 消</el-button>
            <el-button type="primary" @click="qd_ty">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        inject:['reload'],
        name: 'news',
        created() {
            this.getuser()
            //领取项目
            this.lqxm()

        },
        data() {
            return {
                options: [{
                    value: '同意',
                    label: '同意'
                }, {
                    value: '已阅',
                    label: '已阅'
                }, {
                    value: '安计划进行',
                    label: '安计划进行'
                }],
                //驳回弹窗
                show_bh:false,
                //同意弹窗
                show_ty: false,
                url: '',
                fileList: [],
                commentList: [],
                //详情弹窗
                show_xq: false,
                comment: '',
                user: {},
                xm: {},
                ip: 'http://localhost:8080',
                message: 'first',
                //项目
                Xms: [],
                //备案项目
                baXms:[],
                //驳回项目
                bhXms:[],
                NodeId:''
            }
        },
        methods: {
            //重新申请
            cxsq(){
              axios.post(this.ip+'/projectApplication/cxsq',this.xm)
                  .then(res=>{
                      this.show_xq=false
                      this.reload()
                  })
            },
            //完成备案
            wcba(){
                axios.get(this.ip+'/projectApplication/wcba',{
                    params:{
                        pid:this.xm.pid,
                        userId:this.user.userId
                    }
                })
                this.show_xq=false
            },
            //拿到当前节点名字
            getNodeId(pid){
                axios.get(this.ip+'/projectApplication/getPidNode',{
                    params:{
                        pid:pid
                    }
                })
                    .then(res=> {
                        this.NodeId = res.data
                    })
            },
            //确定驳回
            qd_bh(){
                if(this.comment==''||this.comment==null)
                    this.$message.info("请填写驳回理由")
                else {
                    if(this.user.groupId=='zgjl') {//主管经理驳回
                        this.cl('zgjl',false)
                    }else if(this.user.groupId=='jl'){//经理驳回
                        this.cl('jl',false)
                    }else if (this.user.groupId=='jsb_doman'){//经办人驳回
                        this.cl('jbr',false)
                    }else if(this.user.groupId=='jsb_zgjl') {
                        this.cl('jszgjl',false)
                    }else if(this.user.groupId=='jsb_jl'){
                        this.cl('jsjl',false)
                    }else if(this.user.groupId=='bgs'){
                        axios.get(this.ip+'/projectApplication/getPidNode',{
                            params:{
                                pid:this.xm.pid
                            }
                        })
                            .then(res=>{
                                if(res.data=='两会'){
                                    this.cl('lh',2)
                                }
                                else {
                                    this.cl('zgl',1)
                                }
                            })
                    }
                }
            },
            //确定同意
            qd_ty(){
                if(this.user.groupId=='zgjl') {//主管经理同意
                    this.cl('zgjl',true)
                }else if(this.user.groupId=='jl'){
                    this.cl('jl',true)
                }else if (this.user.groupId=='jsb_doman'){
                    this.cl('jbr',true)
                } else if(this.user.groupId=='jsb_zgjl'){
                    this.cl('jszgjl',true)
                }else if(this.user.groupId=='jsb_jl'){
                    this.cl('jsjl',true)
                }else if (this.user.groupId=='bgs'){
                    if(this.NodeId=='两会'){//两会节点
                        if(Number(this.xm.investmentEstimate)>=10)//大于10万，总经理办公会
                            this.cl('lh',0)
                        else
                            this.cl('lh',1) //结束
                    }else {//总经理节点
                        this.$confirm('是否备案', '提示', {
                            confirmButtonText: '是',
                            cancelButtonText: '否',
                            type: 'warning'
                        }).then(() => {
                            this.cl('zjl',0)//备案
                        }).catch(() => {
                            this.cl('zjl',2)
                        });
                    }
                }
            },


            //驳回
            bh(){
                this.comment=''
                this.show_bh=true
            },
            //同意
            ty(){
                this.comment='同意'
                this.show_ty=true
            },
            //用户信息
            getuser() {
                axios.get(this.ip + '/user/getuser', {
                    params: {
                        userId: localStorage.getItem('userId'),
                        passWord: localStorage.getItem('passWord')
                    }
                }).then(res => {
                    this.user = res.data;
                    if(this.user.groupId=='doman')//如果是办事员，定位到驳回项目
                        this.message='third'
                })
            },
            //删除数组中指定元素
            removeByValue(arr, val) {
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].id===val.id) {
                        arr.splice(i, 1);
                        break;
                    }
                }
            },
            //处理
            cl(varName, value) {
                axios.get(this.ip + '/projectApplication/doNode', {
                    params: {
                        pid: this.xm.pid,
                        userId: localStorage.getItem('userId'),
                        comment: this.comment,
                        varName: varName,
                        value: value
                    }
                })
                    .then(res => {
                        this.reload()//刷新
                    })
            },
            //上传成功，重新请求
            handleSuccess() {
                //重新请求
                axios.get(this.ip + '/Attachment/getattachment', {
                    params: {
                        pid: this.xm.pid
                    }
                })
                    .then(res => {
                        if (res.data) {
                            this.fileList = []
                            for (let i = 0; i < res.data.length; i++) {
                                this.fileList.push({
                                    name: res.data[i].attachment_nam,
                                    id: res.data[i].attachment_id
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
                }).then(() => {
                    axios.get(this.ip + '/Attachment/deletAttachment', {
                        params: {
                            userId: localStorage.getItem('userId'),
                            attachment_id: file.id
                        }
                    })
                        .then(res => {
                            this.$message.info("删除成功！")
                        })
                })
                    .catch(() => {
                        //重新请求
                        axios.get(this.ip + '/Attachment/getattachment', {
                            params: {
                                pid: this.xm.pid
                            }
                        })
                            .then(res => {
                                if (res.data) {
                                    this.fileList = []
                                    for (let i = 0; i < res.data.length; i++) {
                                        this.fileList.push({
                                            name: res.data[i].attachment_nam,
                                            id: res.data[i].attachment_id
                                        })
                                    }
                                }
                                //    return false
                            })
                    })
            },
            //点击文件下载
            handlePreview(file) {
                axios.get(this.ip+'/Attachment/getrank',{
                    params:{
                        userId:localStorage.getItem('userId'),
                        attachment_id:file.id
                    }
                })
                    .then(res=>{
                        if(res.data)
                            window.open(this.ip+'/Attachment/getattachment1?attachment_id='+file.id)
                        else
                            this.$message.info("没有下载权限")
                    })
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
                                    this.lqslxm()
                                }
                            })
                        this.reload()
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
                                this.lqslxm()
                            }
                        })
                    this.reload()
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
                //查询当前节点
                this.getNodeId(row.pid)
                this.url = 'http://localhost:8080/projectApplication/uploadFile?pId=' + row.pid + '&userId=' + localStorage.getItem('userId')
            },
            //领取附件
            lqfj(pid) {
                axios.get(this.ip + '/Attachment/getattachment', {
                    params: {
                        pid: pid
                    }
                })
                    .then(res => {
                        if (res.data) {
                            this.fileList = []
                            for (let i = 0; i < res.data.length; i++) {
                                this.fileList.push({
                                    name: res.data[i].attachment_nam,
                                    id: res.data[i].attachment_id
                                })
                            }
                        }
                    })
            },
            //领取项目
            lqxm() {
                axios.get(this.ip + '/projectApplication/lqxm', {
                    params: {
                        userId: localStorage.getItem('userId'),
                    }
                }).then(res => {
                    if (res.data) {
                        if(this.user.groupId=='doman')//如果是办事员，收到的项目为驳回项目
                        {
                            this.bhXms = res.data
                        }
                        else
                            this.Xms = res.data
                        if(this.user.groupId=='jsb_doman'){//如果是经办人，还要拿到备案的项目
                            axios.get(this.ip+'/projectApplication/getBaXm',{
                                params:{
                                        userId:this.user.userId
                                }
                            })
                                .then(res=>{
                                    if(res.data){//判断当前项目是否进行到备案，如果是填充到备案项目数组
                                        this.baXms=res.data
                                        for(let i=0;i<this.baXms.length;i++){//删除备办项目
                                            this.removeByValue(this.Xms,this.baXms[i])
                                        }
                                    }
                                    else {
                                        this.baXms=[]
                                    }
                                })

                        }
                    } else {
                        Xms = []
                    }
                })
            },
        },

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

