<template>
    <div>
        <div class="table">
            <div class="crumbs">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item><i class="el-icon-lx-cascades"></i>招标管理</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="container">
                <div class="handle-box">
                    <el-button type="primary" icon="el-icon-circle-plus" class="handle-del mr10"
                               @click="xjzblc">
                        新建招标流程
                    </el-button>
                </div>
                <el-table height="500px" stripe :data="clzhaobiaos" border class="table" ref="multipleTable">
                    <el-table-column prop="xmName" label="项目名称" width="150">
                    </el-table-column>
                    <el-table-column prop="userName" label="申请人" width="120">
                    </el-table-column>
                    <el-table-column prop="jsyq" label="技术要求">
                    </el-table-column>
                    <el-table-column prop="cjsj" sortable label="创建时间">
                    </el-table-column>
                    <el-table-column label="操作" width="180" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" icon="el-icon-upload"  @click="fj(scope.row)">附件
                            </el-button>
                            <el-button type="text" icon="el-icon-star-on" @click="zt(scope.row)">状态
                            </el-button>
                            <el-button type="text" icon="el-icon-tickets" @click="xq(scope.row)">详情
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div style="text-align: center">
                    <el-pagination
                            background
                            layout="prev, pager, next"
                            :total="clzhaobiaos.length">
                    </el-pagination>
                </div>
            </div>
        </div>


        <!--上传附件弹窗 -->
        <el-dialog title="上传附件" :visible.sync="showfj" width="408px">
                <el-upload
                        class="upload-demo"
                        drag
                        :action="url"
                        :on-preview="handlePreview"
                        :before-remove="handleBeforeRemove"
                        :on-success="handleSuccess"
                        multiple
                        :file-list="fileList"
                >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>上传文件</em></div>
                </el-upload>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="showfj=false">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="状态" :visible.sync="show_zt"width="1000px">
            <img :src='src'/>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="show_zt=false">确 定</el-button>
            </span>
        </el-dialog>

        <!--新建招标流程弹窗 -->
        <el-dialog title="新建招标流程" :visible.sync="show_xjzblc" width="680px">
            <el-form ref="form" label-width="100px">
                <el-form-item label="项目">
                    <el-select
                            v-model="zhaobiao.xmid"
                            filterable
                            placeholder="请输入或选择项目"
                     >
                        <el-option
                                v-for="item in xms"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="技术要求备注">
                    <el-input v-model="zhaobiao.jsyq" rows="4" type="textarea"></el-input>
                </el-form-item>

            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="show_xjzblc = false">取 消</el-button>
                <el-button type="primary" @click="ks">开 始</el-button>
            </span>
        </el-dialog>



        <!--点击详情弹窗 -->
        <el-dialog title="招标流程审批" :visible.sync="show_xq" width="680px">
            <el-form ref="form" label-width="100px">
                <el-form-item label="项目">
                    <el-input :disabled="true" v-model="zhaobiao.xmName" rows="6"></el-input>
                </el-form-item>
                <el-form-item label="技术要求备注">
                    <el-input :disabled="true" v-model="zhaobiao.jsyq" rows="6" type="textarea"></el-input>
                </el-form-item>
                <el-form-item label="发标时间">
                    <el-date-picker :disabled="true" v-model="zhaobiao.fbsj" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"
                                    style="width: 205px"></el-date-picker>
                    &nbsp&nbsp&nbsp&nbsp定标时间&nbsp&nbsp&nbsp&nbsp
                    <el-date-picker :disabled="true" v-model="zhaobiao.dbsj" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"
                                    style="width: 205px"></el-date-picker>
                </el-form-item>
                <el-form-item >
                    <el-table
                            :data="zhongbiaos"
                    >
                        <el-table-column
                                prop="zhongbiaodw"
                                label="中标单位"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="zhongbiaojg"
                                label="中标价格"
                                width="180">
                        </el-table-column>
                    </el-table>
                </el-form-item>
                <el-form-item label="工期">
                    <el-input :disabled="true" v-model="zhaobiao.tbjzsj" ></el-input>
                </el-form-item>
                <el-form-item >
                    <el-table
                            :data="bzs"
                    >
                        <el-table-column
                                prop="usernam"
                                label="姓名"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="time"
                                label="时间"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="comment"
                                label="备注"
                                width="180">
                        </el-table-column>
                    </el-table>
                </el-form-item>

            </el-form>
        </el-dialog>


        <!--点击处理弹窗 -->
        <el-dialog title="招标流程审批" :visible.sync="show_zbxq" width="680px">
            <el-form ref="form" label-width="100px">
                <el-form-item label="项目">
                    <el-input :disabled="true" v-model="zhaobiao.xmName" rows="6"></el-input>
                </el-form-item>
                <el-form-item label="技术要求">
                    <el-input :disabled="groupId!='doman'" v-model="zhaobiao.jsyq" rows="6" type="textarea"></el-input>
                </el-form-item>
                <el-form-item label="发标时间">
                    <el-date-picker :disabled="groupId!='jsb_doman'" v-model="zhaobiao.fbsj" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"
                                    style="width: 205px"></el-date-picker>
                    &nbsp&nbsp&nbsp&nbsp评标时间&nbsp&nbsp&nbsp&nbsp
                    <el-date-picker  :disabled="groupId!='jsb_doman'" v-model="zhaobiao.pbsj" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"
                                    style="width: 205px"></el-date-picker>
                </el-form-item>
                <el-form-item label="投标截止时间">
                    <el-date-picker  :disabled="groupId!='jsb_doman'" v-model="zhaobiao.tbjzsj" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"
                                    style="width: 205px"></el-date-picker>
                </el-form-item>
                <el-form-item v-if="groupId==='jsb_doman'">
                    <el-input placeholder="单位" v-model="dw" style="width: 205px"></el-input>
                    <el-button type="primary" @click="tjtbdw" style="margin-left: 10px" icon="el-icon-circle-plus">
                        添加投标单位
                    </el-button>
                </el-form-item>
                <el-form-item>
                    <el-table
                            :data="tbdws"
                    >
                        <el-table-column
                                prop="dw"
                                label="投标单位"
                                width="180">
                        </el-table-column>
                        <el-table-column label="操作" v-if="groupId==='jsb_doman'">
                            <template slot-scope="scope" >
                                <el-button type="text" icon="el-icon-delete" style="color: red"
                                           @click="scdw(scope.row)">删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form-item>
                <el-form-item label="中标单位" v-if="groupId==='bgs'">
                    <el-input  placeholder="单位" :disabled="isTjzbs"  v-model="zhongbiao.zhongbiaodw" style="width: 200px"></el-input>
                    <el-input placeholder="中标价格" :disabled="isTjzbs" v-model="zhongbiao.zhongbiaojg" type="number" style="width: 200px"></el-input>
                    <el-button @click="tjzbdw" type="primary"  :disabled="isTjzbs" style="margin-left: 10px" icon="el-icon-circle-plus">
                        添加中标单位
                    </el-button>
                </el-form-item>
                <el-form-item v-if="groupId==='bgs'">
                    <el-table
                            :data="zhongbiaos"
                    >
                        <el-table-column
                                prop="zhongbiaodw"
                                label="中标单位"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="zhongbiaojg"
                                label="中标价格"
                                width="180">
                        </el-table-column>
                        <el-table-column label="操作" >
                            <template slot-scope="scope" >
                                <el-button type="text" @click="sczbdw(scope.row)" icon="el-icon-delete" style="color: red">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form-item>
                <el-form-item>
                    <el-upload
                            class="upload-demo"
                            drag
                            :action="url"
                            :on-preview="handlePreview"
                            :before-remove="handleBeforeRemove"
                            :on-success="handleSuccess"
                            multiple
                            :file-list="fileList"
                    >
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>上传文件</em></div>
                    </el-upload>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="show_zbxq = false">取 消</el-button>
                <el-button v-if="groupId==='doman'" type="warning" @click="zf">作废</el-button>
                <el-button v-else-if="groupId!='bgs'" type="warning" @click="bh">驳 回</el-button>
                <el-button v-if="groupId==='doman'" type="primary">重新审批</el-button>
                <el-button v-else-if="groupId==='jsb_doman'" type="primary" @click="fqbs" >发起标书</el-button>
                <el-button v-else-if="groupId==='bgs'" type="primary" @click="wczb" >完成招标</el-button>
                <el-button v-else type="primary" @click="ty" >同意</el-button>
            </span>
        </el-dialog>

        <!--备注弹窗-->
        <el-dialog title="备注" :visible.sync="show_bz">
            <el-form>
                <el-form-item label="备注：">
                    <el-input style="margin-top: 5px" v-model="comment" type="textarea"
                              :autosize="{ minRows: 2, maxRows: 4}"
                    ></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="show_bz=false">取 消</el-button>
            <el-button type="primary" @click="ks">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        inject:['reload'],
        name: 'zbgl',
        computed:{
          isTjzbs(){
              return this.zhongbiaos.length===1
          }
        },
        data() {
            return {
                bzs:[],
                //备注
                comment:'',
                groupId:localStorage.getItem('groupId'),
                //投标单位
                dw: '',
                src: '',
                clzhaobiaos: [],
                message: 'first',
                url: '',
                projectId: '',
                show_zt: false,
                //新建招标弹窗
                show_xjzblc: false,
                //处理弹窗
                show_zbxq: false,
                //详情弹窗
                show_xq:false,
                //备注弹窗
                show_bz:false,
                xms: [],
                loading: false,
                ip: 'http://localhost:8080',
                fileList: [],
                list: [],
                zhaobiao: {
                    id: '',
                    xmid: '',
                    jsyq: '',
                    fbsj:'',
                    pbsj:'',
                    tbjzsj:'',
                    sqr: '',
                    zbpid: ''
                },

                zhaobiaos: [],
                //投标单位
                tbdws: [],
                //中标
                zhongbiao:{
                    id:'',
                    zbid:'',
                    xmid:'',
                    zhongbiaodw:'',
                    zhongbiaojg:''
                },
                //中标单位
                zhongbiaos:[],
                showfj:false
                // //发标时间
                // fbsj:'',
                // //评标时间
                // pbsj:'',
                // //投标截止时间
                // tbjzsj:''
            }
        },
        created() {
            this.lqzhaobiao()
            this.getAllzhaobiao()
        },
        methods: {
            //完工招标
            wczb(){
                this.cl('','')
            },
            //删除中标单位
            sczbdw(row){
                axios.get(this.ip+'/zhongbiao/deletZhongbiao',{
                    params:{
                        id:row.id
                    }
                }).then(res=>{
                    if(res.data){
                        this.getZhongbiaodw()
                    }
                })
            },
            //添加中标单位
            tjzbdw(){
                this.zhongbiao.zbid=this.zhaobiao.id
                this.zhongbiao.xmid=this.zhaobiao.xmid
                axios.post(this.ip+'/zhongbiao/addZhongbiao',this.zhongbiao)
                    .then(res=>{
                        if(res.data){
                            this.$message.success("新建成功！")
                            this.zhongbiao.zhongbiaodw=''
                            this.zhongbiao.zhongbiaojg=''
                            this.getZhongbiaodw()
                        }else {
                            this.$message.error("失败！")
                        }

                    })
            },
            //拿到中标单位
            getZhongbiaodw(){
                axios.get(this.ip+'/zhongbiao/getZhongbiaoByZbid',{
                    params:{
                        zbid:this.zhaobiao.id
                    }
                }).then(res=>{
                    this.zhongbiaos=res.data
                })
            },
            //附件
            fj(row){
                console.log(row)
                this.zhaobiao=row
                this.showfj=true
                this.url = 'http://localhost:8080/zhaobiao/uploadFile?zbpid=' + row.zbpid + '&userId=' + localStorage.getItem('userId')
                this.lqfj(row.zbpid)
            },
            //详情
            xq(row){
                this.zhaobiao=row
                this.getAlltbdw()
                this.getZhongbiaodw()
                this.getbzs()
                this.show_xq=true
            },
            //拿备注
            getbzs(){
              axios.get(this.ip+'/zhaobiao/getComment',{
                  params:{
                      zbpid:this.zhaobiao.zbpid
                  }
              }).then(res=>{
                  this.bzs=res.data
              })
            },
            //作废招标审批
            zf(){
                this.$confirm("该操作将作废该条审批，是非确定","提示")
                    .then(()=>{
                        axios.get(this.ip+'/zhaobiao/zfzb',{
                            params:{
                                id:this.zhaobiao.id,
                                zbpid:this.zhaobiao.zbpid
                            }
                        }).then(res=>{
                            if(res.data){
                                this.$message.success("已作废！")
                            }else {
                                this.$message.error("作废失败！")
                            }
                            this.reload()
                        })
                    })
                    .catch(()=>{})
            },
            //发起标书
            fqbs(){
                axios.get(this.ip+'/zhaobiao/bsfq',{
                    params:{
                        id:this.zhaobiao.id,
                        fbsj:this.zhaobiao.fbsj,
                        pbsj:this.zhaobiao.pbsj,
                        tbjzsj:this.zhaobiao.tbjzsj,
                        userId:localStorage.getItem('userId')
                    }
                }).then((res)=>{
                    if(res.data){
                        this.$message.success("招标流程已发往主管经理！")
                        this.reload()
                    }else {
                        this.$message.error("发起失败！")
                    }
                })
            },
            //删除请求
            handleBeforeRemove(file, fileList) {
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
                    }) .then(res => {
                        if (res.data) {
                            this.$message.success("删除成功！")
                        }else {
                            this.$message.error("你没有权限！")
                        }
                        this.lqfj(this.zhaobiao.zbpid)
                    })
                }).catch(()=>{this.lqfj(this.zhaobiao.zbpid)})
            },
            //删除单位
            scdw(row) {
                axios.get(this.ip + '/zhaobiao/deletTbdw', {
                    params: {
                        id: row.id
                    }
                }).then(res => {
                    this.getAlltbdw()
                })
            },
            //添加投标单位
            tjtbdw() {
                axios.get(this.ip + '/zhaobiao/addTbdw', {
                    params: {
                        zbid: this.zhaobiao.id,
                        dw: this.dw
                    }
                }).then(res => {
                    this.dw=''
                    this.getAlltbdw()
                })
            },
            //同意
            ty() {
                if (localStorage.getItem('groupId') === 'jsb_doman')
                    this.cl("jbr", true)
                else if (localStorage.getItem('groupId') === 'jsb_zgjl')
                    this.cl('zgjl', true)
                else if (localStorage.getItem('groupId') === 'jsb_jl')
                    this.cl('jl', true)
                // this.show_zbxq = false
                // this.zhaobiao = {}
            },
            //驳回
            bh() {
                if(localStorage.getItem('groupId')==='jsb_doman')
                    this.cl('jbr',false)
                else if(localStorage.getItem('groupId')==='jsb_zgjl')
                    this.cl('zgjl',false)
                else if(localStorage.getItem('groupId')==='jsb_jl')
                    this.cl('jl',false)
            },
            //拿到所有投标单位
            getAlltbdw() {
                axios.get(this.ip + '/zhaobiao/getAllTbdw', {
                    params: {
                        zbid: this.zhaobiao.id
                    }
                }).then(res => {
                        this.tbdws = res.data
                })
            },
            //拿到自己经手的招标
            getAllzhaobiao() {
                axios.get(this.ip + '/zhaobiao/getAllzhaobiao', {
                    params: {
                        userId: localStorage.getItem('userId')
                    }
                }).then(res => {
                    if (res.data.length != 0) {
                        this.clzhaobiaos = res.data
                        //填充项目名称和用户名
                        for (let i = 0; i < this.clzhaobiaos.length; i++) {
                            axios.get(this.ip + '/projectApplication/xmIdToxmName', {
                                params: {
                                    xmId: this.clzhaobiaos[i].xmid
                                }
                            }).then(res => {
                                this.clzhaobiaos[i].xmName = res.data
                                this.$set(this.clzhaobiaos, i, this.clzhaobiaos[i]);
                            })
                            axios.get(this.ip + '/user/userIdTouserName', {
                                params: {
                                    userId: this.clzhaobiaos[i].sqr
                                }
                            }).then(res => {
                                this.clzhaobiaos[i].userName = res.data
                                this.$set(this.clzhaobiaos, i, this.clzhaobiaos[i]);
                            })
                        }
                    }
                })
            },
            //状态
            zt(row) {
                axios.get(this.ip + '/projectApplication/zt', {
                    params: {
                        pi: row.zbpid
                    }
                })
                    .then(res => {
                        //得到图片流
                        this.src = 'data:image/png;base64,' + res.data
                        this.show_zt = true
                    })
            },
            //点击处理
            zbcl(row) {
                this.zhaobiao = row
                this.getAlltbdw()
                this.lqfj(row.zbpid)
                this.getZhongbiaodw()
                this.url = 'http://localhost:8080/zhaobiao/uploadFile?zbpid=' + row.zbpid + '&userId=' + localStorage.getItem('userId')
                this.show_zbxq = true
            },
            //领取附件
            lqfj(zbpId) {
                axios.get(this.ip + '/Attachment/getattachment', {
                    params: {
                        pid: zbpId
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
            //处理
            cl(varName, value) {
                axios.get(this.ip + '/zhaobiao/doNode', {
                    params: {
                        zbpid: this.zhaobiao.zbpid,
                        userId: localStorage.getItem('userId'),
                        varName: varName,
                        value: value,
                        comment:this.comment
                    }
                })
                    .then(res => {
                        this.reload()//刷新
                    })
            },
            //领取招标
            lqzhaobiao() {
                axios.get(this.ip + '/zhaobiao/lqzhaobiao', {
                    params: {
                        userId: localStorage.getItem('userId')
                    }
                }).then(res => {
                    if (res.data.length != 0) {
                        this.zhaobiaos = res.data
                        //填充项目名称和用户名
                        for (let i = 0; i < this.zhaobiaos.length; i++) {
                            axios.get(this.ip + '/projectApplication/xmIdToxmName', {
                                params: {
                                    xmId: this.zhaobiaos[i].xmid
                                }
                            }).then(res => {
                                this.zhaobiaos[i].xmName = res.data
                                this.$set(this.zhaobiaos, i, this.zhaobiaos[i]);
                            })
                            axios.get(this.ip + '/user/userIdTouserName', {
                                params: {
                                    userId: this.zhaobiaos[i].sqr
                                }
                            }).then(res => {
                                this.zhaobiaos[i].userName = res.data
                                this.$set(this.zhaobiaos, i, this.zhaobiaos[i]);
                            })
                        }
                    }
                })
            },
            //开始
            ks() {
                console.log(this.zhaobiao)
                if(this.zhaobiao.xmid==null||this.zhaobiao.xmid==''||this.zhaobiao.jsyq==null||this.zhaobiao.jsyq==''){
                    this.$message.error("请填写信息！")
                    console.log("请填写信息！")
                    return
                }
                axios.post(this.ip + '/zhaobiao/startZhaobiao', this.zhaobiao)
                    .then(res => {
                        if (res.data) {
                            this.$message.success("申请开始！已转到工程技术部！")
                            this.reload()
                        }
                    })
            },
            //点击文件下载
            handlePreview(file) {

                window.open(this.ip + '/Attachment/getattachment1?attachment_id=' + file.id)
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
                            if (res.data) {
                                this.$message.success("删除成功！")
                            } else {
                                this.$message.error("删除失败！")
                            }
                            this.lqfj(this.zhaobiao.zbpid)
                        })
                }).catch(() => {
                    this.lqfj(this.zhaobiao.zbpid)
                })
            },
            //上传成功，重新请求
            handleSuccess() {
                this.lqfj(this.zhaobiao.zbpid)
            },
            //新建招标流程
            xjzblc() {
                this.zhaobiao={}
                this.getXms()
                this.zhaobiao.sqr = localStorage.getItem('userId')
                this.show_xjzblc = true
            },
            //拿到项目下拉框数据
            getXms() {
                axios.get(this.ip + '/projectApplication/getAllXmIdAndXmname')
                    .then(res => {
                        this.xms = res.data
                    })
            },
            remoteMethod(query) {
                if (query !== '') {
                    this.loading = true;
                    setTimeout(() => {
                        this.loading = false;
                        this.xms = this.list.filter(item => {
                            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
                        });
                    }, 200);
                } else {
                    this.xms = [];
                }
            }
        }
    }
</script>


<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 150px;
        display: inline-block;
    }

    .del-dialog-cnt {
        font-size: 16px;
        text-align: center
    }

    .table {
        width: 100%;
        font-size: 14px;
    }

    .red {
        color: #ff0000;
    }

    .mr10 {
        margin-right: 10px;
    }
</style>
