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
                    <el-button v-if="groupId==='doman'||groupId==='jsb_doman'" type="primary" icon="el-icon-circle-plus"
                               class="handle-del mr10"
                               @click="xjzblc">
                        新建招标流程
                    </el-button>

                    <el-input style="margin-top: 10px" required v-model="select_xmmc" placeholder="项目名称"
                              class="handle-input mr10"></el-input>
                    <el-button style="margin-left: 10px" type="primary" icon="el-icon-search" @click="xmmcSearch">搜索
                    </el-button>

                    <!--<el-select-->
                            <!--clearable-->
                            <!--style="margin-left: 20px;width: 130px"-->
                            <!--v-if="groupId!='doman'&&groupId!='gzjl'&&groupId!='jl'"-->
                            <!--v-model="select_dptnm"-->
                            <!--placeholder="立项部门搜索"-->
                    <!--&gt;-->
                        <!--<el-option-->
                                <!--v-for="item in bms"-->
                                <!--:key="item.value"-->
                                <!--:label="item.label"-->
                                <!--:value="item.value">-->
                        <!--</el-option>-->
                    <!--</el-select>-->
                    <el-button type="success" icon="el-icon-tickets" style="float:right" @click="qb">全部</el-button>
                    <!--<el-button style="margin-left: 25px" type="primary" icon="el-icon-search" @click="Search">搜索-->
                    <!--</el-button>-->
                </div>
                <el-table height="600px" stripe :data="clzhaobiaos.slice((currentPage-1)*10,currentPage*10)" border
                          class="table">
                    <el-table-column prop="xmName" label="项目名称">
                    </el-table-column>
                    <el-table-column prop="userName" label="申请人">
                    </el-table-column>
                    <el-table-column prop="zbr" label="中标人">
                    </el-table-column>
                    <el-table-column prop="zbje" label="中标金额">
                    </el-table-column>
                    <el-table-column prop="fbsj" label="发标时间">
                    </el-table-column>
                    <el-table-column prop="dbsj" label="定标时间">
                    </el-table-column>
                    <!--<el-table-column prop="jsyq" label="技术要求">-->
                    <!--</el-table-column>-->
                    <el-table-column prop="cjsj" sortable label="创建时间">
                    </el-table-column>
                    <el-table-column label="操作" width="180" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" icon="el-icon-upload" @click="fj(scope.row)">附件
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
                            layout="total,prev, pager, next"
                            @current-change="currentChange"
                            :total="clzhaobiaos.length">
                    </el-pagination>
                </div>
            </div>
        </div>

        <!--上传附件弹窗 -->
        <el-dialog :close-on-click-modal="false" title="上传附件" :visible.sync="showfj" width="408px">
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

        <el-dialog :close-on-click-modal="false" title="状态" :visible.sync="show_zt" width="1000px">
            <img :src='src'/>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="show_zt=false">确 定</el-button>
            </span>
        </el-dialog>

        <!--新建招标流程弹窗 -->
        <el-dialog :close-on-click-modal="false" title="新建招标流程" :visible.sync="show_xjzblc" width="680px">
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
        <el-dialog :close-on-click-modal="false" title="招标流程审批" :visible.sync="show_xq" width="680px">
            <el-form ref="form" label-width="100px">
                <el-form-item label="项目">
                    <el-input readonly style="color:#FF0000;"  v-model="zhaobiao.xmName" rows="6"></el-input>
                </el-form-item>
                <el-form-item label="技术要求备注">
                    <el-input readonly v-model="zhaobiao.jsyq" rows="6" type="textarea"></el-input>
                </el-form-item>
                <el-form-item label="发标时间">
                    <el-date-picker readonly v-model="zhaobiao.fbsj" type="date" placeholder="选择日期"
                                    value-format="yyyy-MM-dd"
                                    style="width: 205px"></el-date-picker>
                    &nbsp&nbsp&nbsp&nbsp定标时间&nbsp&nbsp&nbsp&nbsp
                    <el-date-picker readonly v-model="zhaobiao.dbsj" type="date" placeholder="选择日期"
                                    value-format="yyyy-MM-dd"
                                    style="width: 205px"></el-date-picker>
                </el-form-item>
                <el-form-item label="中标单位">
                    <el-input readonly v-model="zhaobiao.zbr"></el-input>
                </el-form-item>
                <el-form-item label="中标金额">
                    <el-input readonly v-model="zhaobiao.zbje"></el-input>
                </el-form-item>
                <el-form-item label="工期">
                    <el-input readonly v-model="zhaobiao.tbjzsj"></el-input>
                </el-form-item>
                <el-form-item>
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
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        inject: ['reload'],
        name: 'zbgl',
        watch:{
            select_dptnm(){
                if(this.bmssdyc){
                    this.zjzhaobiaos2=this.clzhaobiaos
                    this.bmssdyc=false
                }
                this.clzhaobiaos=this.zjzhaobiaos2
                //部门的搜索
                if (this.select_dptnm != null && this.select_dptnm != '') {
                    let qq = []
                    let ssZhaobiaos=[]
                    for (let i = 0; i < this.clzhaobiaos.length; i++) {
                        qq.push(axios.get(this.ip + '/projectApplication/xmidTosqbm', {
                            params: {
                                xmid: this.clzhaobiaos[i].xmid
                            }
                        }).then(res => {
                            if (res.data === this.select_dptnm)
                                ssZhaobiaos.push(this.clzhaobiaos[i])
                        }))
                    }

                    axios.all(qq)
                        .then(axios.spread((acct, perms) => {
                            if (ssZhaobiaos.length === 0) {
                                this.$message.error("没搜索到相关信息")
                                return
                            }
                            this.clzhaobiaos = ssZhaobiaos;
                        }))
                }
            }
        },
        data() {
            return {
                //部门搜索第一次
                bmssdyc:true,
                zjzhaobiaos2:[],
                bms: [],
                select_dptnm: '',
                //项目名称搜索
                select_xmmc: '',
                //默认当前页
                currentPage: 1,
                bzs: [],
                groupId: localStorage.getItem('groupId'),
                //投标单位
                dw: '',
                src: '',
                clzhaobiaos: [],
                //储存最开始的所有，搜索要用
                zjzhaobiaos: [],
                //第一次搜索
                dycss: true,
                message: 'first',
                url: '',
                projectId: '',
                show_zt: false,
                //新建招标弹窗
                show_xjzblc: false,
                //详情弹窗
                show_xq: false,
                xms: [],
                loading: false,
                ip: 'http://localhost:8080',
                fileList: [],
                list: [],
                zhaobiao: {
                    id: '',
                    xmid: '',
                    jsyq: '',
                    fbsj: '',
                    pbsj: '',
                    tbjzsj: '',
                    sqr: '',
                    zbpid: ''
                },
                zhaobiaos: [],
                //投标单位
                tbdws: [],
                //中标
                zhongbiao: {
                    id: '',
                    zbid: '',
                    xmid: '',
                    zhongbiaodw: '',
                    zhongbiaojg: ''
                },
                //中标单位
                zhongbiaos: [],
                showfj: false
                // //发标时间
                // fbsj:'',
                // //评标时间
                // pbsj:'',
                // //投标截止时间
                // tbjzsj:''
            }
        },
        created() {
            //this.lqzhaobiao()
            this.getAllzhaobiao()
            this.getAllDptName()
        },
        methods: {
            //全部按钮
            qb(){
                this.getAllzhaobiao()
                this.dycss=true
            },

            xmmcSearch() {
                //名称的搜索
                if (this.select_xmmc != null && this.select_xmmc != '') {
                    if (this.dycss) {//第一次搜索
                        this.zjzhaobiaos = this.clzhaobiaos
                        this.dycss = false
                    }
                    this.clzhaobiaos = this.zjzhaobiaos
                    let ssZhaobiaos = []
                    for (let i = 0; i < this.clzhaobiaos.length; i++) {
                        if (String(this.clzhaobiaos[i].xmName).indexOf(this.select_xmmc) != -1) {//包含
                            ssZhaobiaos.push(this.clzhaobiaos[i])
                        }
                    }
                    if(ssZhaobiaos.length==0){
                        this.$message.error("没找到相关数据！")
                        return;
                    }
                    this.clzhaobiaos = ssZhaobiaos
                }
            },

            //拿到搜索部门的名称
            getAllDptName() {
                axios.get(this.ip + '/department/getAllDptName')
                    .then(res => {
                        if (res.data != null) {
                            for (let i = 0; i < res.data.length; i++) {
                                this.bms.push({
                                    value: res.data[i],
                                    label: res.data[i],
                                })
                            }
                        }
                    })
            },

            //搜索
            Search() {
                if (this.dycss) {//第一次搜索
                    this.zjzhaobiaos = this.clzhaobiaos
                    this.dycss = false
                }
                this.clzhaobiaos = this.zjzhaobiaos
                let ssZhaobiaos = []
                //名称的搜索
                if (this.select_xmmc != null && this.select_xmmc != '') {
                    for (let i = 0; i < this.clzhaobiaos.length; i++) {
                        if (String(this.clzhaobiaos[i].xmName).indexOf(this.select_xmmc) != -1) {//包含
                            ssZhaobiaos.push(this.clzhaobiaos[i])
                        }
                    }
                }
                //部门的搜索
                let qq = []
                if (this.groupId != 'doman' && this.groupId != 'zgjl' && this.groupId != 'jl' && this.select_dptnm != null && this.select_dptnm != '') {
                    for (let i = 0; i < this.clzhaobiaos.length; i++) {
                        qq.push(axios.get(this.ip + '/projectApplication/xmidTosqbm', {
                            params: {
                                xmid: this.clzhaobiaos[i].xmid
                            }
                        }).then(res => {
                            if (res.data === this.select_dptnm)
                                ssZhaobiaos.push(this.clzhaobiaos[i])
                        }))
                    }
                }
                axios.all(qq)
                    .then(axios.spread((acct, perms) => {
                        if (ssZhaobiaos.length === 0) {
                            this.$message.error("没搜索到相关信息")
                            return
                        }
                        this.clzhaobiaos = ssZhaobiaos;
                    }))
            },

            //上一页下一页事件
            currentChange(currentPage) {
                this.currentPage = currentPage;
            },

            //完工招标
            wczb() {
                this.cl('', '')
            },

            //删除中标单位
            sczbdw(row) {
                axios.get(this.ip + '/zhongbiao/deletZhongbiao', {
                    params: {
                        id: row.id
                    }
                }).then(res => {
                    if (res.data) {
                        this.getZhongbiaodw()
                    }
                })
            },
            //添加中标单位
            tjzbdw() {
                this.zhongbiao.zbid = this.zhaobiao.id
                this.zhongbiao.xmid = this.zhaobiao.xmid
                axios.post(this.ip + '/zhongbiao/addZhongbiao', this.zhongbiao)
                    .then(res => {
                        if (res.data) {
                            this.$message.success("新建成功！")
                            this.zhongbiao.zhongbiaodw = ''
                            this.zhongbiao.zhongbiaojg = ''
                            this.getZhongbiaodw()
                        } else {
                            this.$message.error("失败！")
                        }

                    })
            },
            //拿到中标单位
            getZhongbiaodw() {
                axios.get(this.ip + '/zhongbiao/getZhongbiaoByZbid', {
                    params: {
                        zbid: this.zhaobiao.id
                    }
                }).then(res => {
                    this.zhongbiaos = res.data
                })
            },
            //附件
            fj(row) {
                console.log(row)
                this.zhaobiao = row
                this.showfj = true
                this.url = 'http://localhost:8080/zhaobiao/uploadFile?zbpid=' + row.zbpid + '&userId=' + localStorage.getItem('userId')
                this.lqfj(row.zbpid)
            },
            //详情
            xq(row) {
                this.zhaobiao = row
                this.getZhongbiaodw()
                this.getbzs()
                this.show_xq = true
            },

            //拿备注
            getbzs() {
                axios.get(this.ip + '/zhaobiao/getComment', {
                    params: {
                        zbpid: this.zhaobiao.zbpid
                    }
                }).then(res => {
                    this.bzs = res.data
                })
            },

            //发起标书
            fqbs() {
                axios.get(this.ip + '/zhaobiao/bsfq', {
                    params: {
                        id: this.zhaobiao.id,
                        fbsj: this.zhaobiao.fbsj,
                        pbsj: this.zhaobiao.pbsj,
                        tbjzsj: this.zhaobiao.tbjzsj,
                        userId: localStorage.getItem('userId')
                    }
                }).then((res) => {
                    if (res.data) {
                        this.$message.success("招标流程已发往主管经理！")
                        this.reload()
                    } else {
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
                    }).then(res => {
                        if (res.data) {
                            this.$message.success("删除成功！")
                        } else {
                            this.$message.error("你没有权限！")
                        }
                        this.lqfj(this.zhaobiao.zbpid)
                    })
                }).catch(() => {
                    this.lqfj(this.zhaobiao.zbpid)
                })
            },

            //拿到自己经手的招标
            getAllzhaobiao() {
                if (this.groupId === 'zgjl' || this.groupId === 'jl') {//如果是主管经理或者经理拿到自己部门所有的招标信息
                    axios.get(this.ip + '/zhaobiao/getselfDptZb', {
                        params: {
                            userId: localStorage.getItem('userId')
                        }
                    }).then(res => {
                        if (res.data.length != 0) {
                            this.clzhaobiaos = res.data
                            //填充项目名称、用户名、中标人、中标金额
                            for (let i = 0; i < this.clzhaobiaos.length; i++) {
                                //填充中标人,中标金额
                                axios.get(this.ip + '/zhongbiao/getZhongbiaoByZbid', {
                                    params: {
                                        zbid: this.clzhaobiaos[i].id
                                    }
                                }).then(res => {
                                    if (res.data.length != 0) {
                                        this.clzhaobiaos[i].zbr = res.data[0].zhongbiaodw
                                        this.clzhaobiaos[i].zbje = res.data[0].zhongbiaojg
                                        this.$set(this.clzhaobiaos, i, this.clzhaobiaos[i]);
                                    }
                                })

                                //填充项目名
                                axios.get(this.ip + '/projectApplication/xmIdToxmName', {
                                    params: {
                                        xmId: this.clzhaobiaos[i].xmid
                                    }
                                }).then(res => {
                                    this.clzhaobiaos[i].xmName = res.data
                                    this.$set(this.clzhaobiaos, i, this.clzhaobiaos[i]);
                                })
                                axios.get(this.ip + '/user/userIdTouserName', {//填充申请人
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
                } else if (this.groupId === 'jsb_jl' || this.groupId === 'jsb_zgjl') {//技术部经理和技术部主管看所有招标信息
                    axios.get(this.ip + '/zhaobiao/jsbjlGetAllZhaobiao')
                        .then(res => {
                            if (res.data.length != 0) {
                                this.clzhaobiaos = res.data
                                //填充项目名称、用户名、中标人、中标金额
                                for (let i = 0; i < this.clzhaobiaos.length; i++) {
                                    //填充中标人,中标金额
                                    axios.get(this.ip + '/zhongbiao/getZhongbiaoByZbid', {
                                        params: {
                                            zbid: this.clzhaobiaos[i].id
                                        }
                                    }).then(res => {
                                        if (res.data.length != 0) {
                                            this.clzhaobiaos[i].zbr = res.data[0].zhongbiaodw
                                            this.clzhaobiaos[i].zbje = res.data[0].zhongbiaojg
                                            this.$set(this.clzhaobiaos, i, this.clzhaobiaos[i]);
                                        }
                                    })

                                    //填充项目名
                                    axios.get(this.ip + '/projectApplication/xmIdToxmName', {
                                        params: {
                                            xmId: this.clzhaobiaos[i].xmid
                                        }
                                    }).then(res => {
                                        this.clzhaobiaos[i].xmName = res.data
                                        this.$set(this.clzhaobiaos, i, this.clzhaobiaos[i]);
                                    })
                                    axios.get(this.ip + '/user/userIdTouserName', {//填充申请人
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
                }
                else {
                    axios.get(this.ip + '/zhaobiao/getAllzhaobiao', {
                        params: {
                            userId: localStorage.getItem('userId')
                        }
                    }).then(res => {
                        if (res.data.length != 0) {
                            this.clzhaobiaos = res.data
                            //填充项目名称、用户名、中标人、中标金额
                            for (let i = 0; i < this.clzhaobiaos.length; i++) {
                                //填充中标人,中标金额
                                axios.get(this.ip + '/zhongbiao/getZhongbiaoByZbid', {
                                    params: {
                                        zbid: this.clzhaobiaos[i].id
                                    }
                                }).then(res => {
                                    if (res.data.length != 0) {
                                        this.clzhaobiaos[i].zbr = res.data[0].zhongbiaodw
                                        this.clzhaobiaos[i].zbje = res.data[0].zhongbiaojg
                                        this.$set(this.clzhaobiaos, i, this.clzhaobiaos[i]);
                                    }
                                })

                                //填充项目名
                                axios.get(this.ip + '/projectApplication/xmIdToxmName', {
                                    params: {
                                        xmId: this.clzhaobiaos[i].xmid
                                    }
                                }).then(res => {
                                    this.clzhaobiaos[i].xmName = res.data
                                    this.$set(this.clzhaobiaos, i, this.clzhaobiaos[i]);
                                })
                                axios.get(this.ip + '/user/userIdTouserName', {//填充申请人
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
                }
            },
            //状态
            zt(row) {
                const loading = this.$loading({
                    lock: true,
                    text: '处理中……',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                axios.get(this.ip + '/projectApplication/zt', {
                    params: {
                        pi: row.zbpid
                    }
                })
                    .then(res => {
                        loading.close()
                        //得到图片流
                        this.src = 'data:image/png;base64,' + res.data
                        this.show_zt = true
                    })
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
            //领取招标
            // lqzhaobiao() {
            //     axios.get(this.ip + '/zhaobiao/lqzhaobiao', {
            //         params: {
            //             userId: localStorage.getItem('userId')
            //         }
            //     }).then(res => {
            //         if (res.data.length != 0) {
            //             this.zhaobiaos = res.data
            //             //填充项目名称和用户名
            //             for (let i = 0; i < this.zhaobiaos.length; i++) {
            //                 axios.get(this.ip + '/projectApplication/xmIdToxmName', {
            //                     params: {
            //                         xmId: this.zhaobiaos[i].xmid
            //                     }
            //                 }).then(res => {
            //                     this.zhaobiaos[i].xmName = res.data
            //                     this.$set(this.zhaobiaos, i, this.zhaobiaos[i]);
            //                 })
            //                 axios.get(this.ip + '/user/userIdTouserName', {
            //                     params: {
            //                         userId: this.zhaobiaos[i].sqr
            //                     }
            //                 }).then(res => {
            //                     this.zhaobiaos[i].userName = res.data
            //                     this.$set(this.zhaobiaos, i, this.zhaobiaos[i]);
            //                 })
            //             }
            //         }
            //     })
            // },


            //开始
            ks() {
                if (this.zhaobiao.xmid == null || this.zhaobiao.xmid == '' || this.zhaobiao.jsyq == null || this.zhaobiao.jsyq == '') {
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
                this.zhaobiao = {}
                this.getXms()
                this.zhaobiao.sqr = localStorage.getItem('userId')
                this.show_xjzblc = true
            },

            //拿到自己部门项目下拉框数据（只能申请一次）
            getXms() {
                axios.get(this.ip + '/projectApplication/getSelfWzzXmidAndXmname', {
                    params: {
                        dpt: localStorage.getItem('departmentName')
                    }
                })
                    .then(res => {
                        this.xms = res.data
                    })
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
