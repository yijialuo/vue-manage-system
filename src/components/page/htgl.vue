<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i>合同表单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button @click="xjht" type="primary" icon="el-icon-circle-plus" class="handle-del mr10">
                    新建合同
                </el-button>
                <el-input placeholder="合同编号" v-model="contractNo" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search"  @click="htSearch">搜索</el-button>
                <el-select
                        style="margin-left: 20px"
                        filterable
                        v-model="xmId"
                        placeholder="输入或选择项目"
                >
                    <el-option
                            v-for="item in xms"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-search" style="margin-left: 10px" @click="xmIdSS">搜索</el-button>
                <el-button type="success" icon="el-icon-tickets" style="float:right" @click="getAllht(1),ssss=false">全部</el-button>
            </div>
            <el-table height="600"  :data="contracts" style="width: 100%">
                <el-table-column  type="expand">
                    <template slot-scope="props">
                        <el-form style="color: #99a9bf;"  label-position="left" inline class="demo-table-expand">
                            <el-form-item label="合同经办人:">
                                <span>{{ props.row.jbr }}</span>
                            </el-form-item>
                            <el-form-item label="主办单位意见:">
                                <span>{{ props.row.zbdwyj }}</span>
                            </el-form-item>
                            <el-form-item label="对方资质审查:">
                                <span>{{ props.row.zzsc }}</span>
                            </el-form-item>
                            <!--<el-form-item label="单位意见:">-->
                                <!--<span>{{ props.row.dwyj }}</span>-->
                            <!--</el-form-item>-->
                            <!--<el-form-item label="财务部门意见:">-->
                                <!--<span>{{ props.row.cwbmyj }}</span>-->
                            <!--</el-form-item>-->
                            <!--<el-form-item label="分管领导意见:">-->
                                <!--<span>{{ props.row.fgldyj }}</span>-->
                            <!--</el-form-item>-->
                            <!--<el-form-item label="总经理意见:">-->
                                <!--<span>{{ props.row.zjlyj }}</span>-->
                            <!--</el-form-item>-->
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column prop="contractNo" sortable label="合同编号" >
                </el-table-column>
                <el-table-column prop="projectName" label="合同项目" >
                </el-table-column>
                <el-table-column prop="rq" sortable  label="合同日期">
                </el-table-column>
                <el-table-column prop="dfdsr" label="对方当事人">
                </el-table-column>
                <el-table-column prop="tzwh" label="投资文号">
                </el-table-column>
                <el-table-column prop="price" label="合同价款(元)">
                </el-table-column>
                <el-table-column prop="psjl" label="评审结论">
                </el-table-column>
                <el-table-column prop="dqjd" label="当前节点">
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click="djfj(scope.row),isgd=scope.row.gd">附件</el-button>
                        <el-button type="text" v-if="scope.row.canSp" @click="htsq(scope.row.id)">审批</el-button>
                        <el-button type="text" @click="zt(scope.row)">状态</el-button>
                        <el-button type="text" :disabled="scope.row.gd=='1'"  @click="bjht(scope.row)">编辑</el-button>
                        <el-button type="text" @click="xz(scope.row)">下载</el-button>
                        <el-button type="text" :disabled="scope.row.gd=='1'"  @click="gd(scope.row)">归档</el-button>
                        <el-button type="text" :disabled="scope.row.gd=='1'"  @click="scht(scope.row.id)"  v-bind:class="{red:scope.row.gd!='1'}">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div v-if="!ssss" style="text-align: center">
                <el-pagination
                        background
                        @current-change="currentChange"
                        layout="total,prev, pager, next"
                        :total="hts">
                </el-pagination>
            </div>
        </div>

        <!--上传附件弹窗 -->
        <el-dialog title="上传附件" :close-on-click-modal="false" :visible.sync="show_scfj" width="408px">
            <el-upload
                    :disabled="isgd=='1'"
                    class="upload-demo"
                    drag
                    :action="url"
                    :on-preview="handlePreview"
                    :before-remove="handleBeforeRemove"
                    :on-success="handleSuccess"
                    multiple
                    :file-list="fileList"
            >
                <i class="el-icon-upload" ></i>
                <div class="el-upload__text" >将文件拖到此处，或<em>点击上传</em></div>
            </el-upload>
        </el-dialog>

        <!--添加合同弹窗 -->
        <el-dialog title="新建合同" :close-on-click-modal="false" :visible.sync="show_xjht" width="688px">
            <el-form  ref="form"  label-width="100px">
                <!--<el-form-item label="合同编号">-->
                    <!--<el-input v-model="contract.contractNo"></el-input>-->
                <!--</el-form-item>-->
                <el-form-item label="合同项目">
                    <el-select
                            filterable
                            v-model="contract.projectId"
                      >
                        <el-option
                                v-for="item in xms"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    &nbsp&nbsp&nbsp&nbsp&nbsp合同日期&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                    <el-date-picker style="width: 205px" type="date" placeholder="选择日期" v-model="contract.rq" value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
                <el-form-item label="对方当事人">
                    <el-input v-model="contract.dfdsr" style="width: 210px"></el-input>
                    &nbsp&nbsp&nbsp&nbsp&nbsp投资文号&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                    <el-input v-model="contract.tzwh" style="width: 210px"></el-input>
                </el-form-item>
                <el-form-item label="合同价款(元)">
                    <el-input v-model="contract.price" type="number" style="width: 210px" ></el-input>
                    &nbsp&nbsp&nbsp&nbsp&nbsp合同经办人&nbsp&nbsp&nbsp&nbsp
                    <el-input v-model="contract.jbr" style="width: 210px"></el-input>
                </el-form-item>
                <!--<el-form-item label="主办单位意见">-->
                    <!--<el-input v-model="contract.zbdwyj" type="textarea"></el-input>-->
                <!--</el-form-item>-->
                <el-form-item label="对方资质审查">
                    <el-checkbox-group v-model="zzsc">
                        <el-checkbox label="营业执照" ></el-checkbox><br/>
                        <el-checkbox label="法定代表人身份证明或授权委托书" ></el-checkbox><br/>
                        <el-checkbox label="企业登记证书" ></el-checkbox><br/>
                        <el-checkbox label="安全生产许可证" ></el-checkbox><br/>
                        <el-checkbox label="其他" ></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="评审结论">
                    <el-radio-group  v-model="contract.psjl">
                        <el-radio style="margin-top: 8px" label="评审合格，同意签订此合同"></el-radio><br/>
                        <el-radio style="margin-top: 10px" label="存在缺陷，完善后再次评审"></el-radio><br/>
                        <el-radio style="margin-top: 10px" label="评审不合格，不能签订此合同"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <!--<el-form-item label="单位意见">-->
                    <!--<el-input type="textarea" v-model="contract.dwyj"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="财务部门意见">-->
                    <!--<el-input type="textarea" v-model="contract.cwbmyj"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="分管领导意见">-->
                    <!--<el-input type="textarea" v-model="contract.fgldyj"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="总经理意见">-->
                    <!--<el-input type="textarea" v-model="contract.zjlyj"></el-input>-->
                <!--</el-form-item>-->
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="show_xjht = false">取 消</el-button>
                <el-button type="primary" @click="qdxjht">确 定</el-button>
            </span>
        </el-dialog>

        <!--编辑合同弹窗 -->
        <el-dialog title="编辑合同" :close-on-click-modal="false" :visible.sync="show_bjht" width="685px">
            <el-form   ref="form"  label-width="100px">
                <el-form-item label="合同项目">
                    <el-select
                            :readonly="true"
                            v-model="contract.projectId"
                            filterable
                            remote
                            reserve-keyword
                            placeholder="请输入关键词"
                            :remote-method="remoteMethod"
                            :loading="loading">
                        <el-option
                                v-for="item in xms"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    &nbsp&nbsp&nbsp&nbsp&nbsp合同日期&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                    <el-date-picker type="date" placeholder="选择日期" v-model="contract.rq" value-format="yyyy-MM-dd"
                                    style="width: 205px" ></el-date-picker>
                </el-form-item>
                <el-form-item label="对方当事人">
                    <el-input v-model="contract.dfdsr" style="width: 210px"></el-input>
                    &nbsp&nbsp&nbsp&nbsp&nbsp投资文号&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                    <el-input v-model="contract.tzwh" style="width: 210px"></el-input>
                </el-form-item>
                <el-form-item label="合同价款(元)">
                    <el-input v-model="contract.price" type="number" style="width: 210px" ></el-input>
                    &nbsp&nbsp&nbsp&nbsp&nbsp合同经办人&nbsp&nbsp&nbsp&nbsp
                    <el-input v-model="contract.jbr" style="width: 210px"></el-input>
                </el-form-item>
                <!--<el-form-item label="主办单位意见">-->
                    <!--<el-input v-model="contract.zbdwyj" type="textarea"></el-input>-->
                <!--</el-form-item>-->
                <el-form-item label="对方资质审查">
                    <el-checkbox-group v-model="zzsc">
                        <el-checkbox label="营业执照" ></el-checkbox><br/>
                        <el-checkbox label="法定代表人身份证明或授权委托书" ></el-checkbox><br/>
                        <el-checkbox label="企业登记证书" ></el-checkbox><br/>
                        <el-checkbox label="安全生产许可证" ></el-checkbox><br/>
                        <el-checkbox label="其他" ></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="评审结论">
                    <el-radio-group  v-model="contract.psjl">
                        <el-radio style="margin-top: 8px" label="评审合格，同意签订此合同"></el-radio><br/>
                        <el-radio style="margin-top: 10px" label="存在缺陷，完善后再次评审"></el-radio><br/>
                        <el-radio style="margin-top: 10px" label="评审不合格，不能签订此合同"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <!--<el-form-item label="单位意见">-->
                    <!--<el-input type="textarea" v-model="contract.dwyj"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="财务部门意见">-->
                    <!--<el-input type="textarea" v-model="contract.cwbmyj"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="分管领导意见">-->
                    <!--<el-input type="textarea" v-model="contract.fgldyj"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="总经理意见">-->
                    <!--<el-input type="textarea" v-model="contract.zjlyj"></el-input>-->
                <!--</el-form-item>-->
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="qxbj">取 消</el-button>
                <el-button type="primary" @click="qdbj">确定编辑</el-button>
            </span>
        </el-dialog>

        <el-dialog title="状态" :close-on-click-modal="false" :visible.sync="show_zt" width="750px">
            <img :src="src"/>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="show_zt=false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        inject:['reload'],
        name: 'htgl',
        data() {
            return {
                src:'',
                show_zt:false,
                fileList:[],
                //新建合同
                show_xjht:false,
                //编辑合同
                show_bjht:false,
                //上传附件
                show_scfj:false,
                contracts: [],
                contract:{
                    id:'',
                    contractNo:'',
                    projectName:'',
                    projectId:'',
                    dfdsr:'',
                    tzwh:'',
                    price:'',
                    jbr:'',
                    zbdwyj:'',
                    zzsc:'',
                    psjl:'',
                    dwyj:'',
                    cwbmyj:'',
                    fgldyj:'',
                    zjlyj:'',
                    rq:'',
                    gd:''
                },
                //对方资质审查,数组
                zzsc:[],
                xms:[],
                ip: 'http://10.197.33.115:8080',
                loading: false,
                list: [],
                url: '',
                cid:'',
                contractNo:'',
                //是否归档
                isgd:'',
                //合同数
                hts:0,
                xmId:'',
                ssss:false
            }
        },
        created() {
            this.getAllht(1)
            this.getXms()
            //合同总条数
            this.AllCounts()
        },
        methods: {
            //合同下载
            xz(row){
                window.open('http://10.197.33.115:8080/print/ht?id='+row.id)
            },
            //状态
            zt(row){
                console.log(row.dqjd)
                if(row.dqjd==='未申请'){
                    this.src=require('@/assets/img/htwsq.png')
                }else if(row.dqjd==='填写合同表单'){
                    this.src=require('@/assets/img/txhtbd.png')
                }else if(row.dqjd==='技术部经理审批'){
                    this.src=require('@/assets/img/htjsbjlsp.png')
                }else if(row.dqjd==='办公室确认'){
                    this.src=require('@/assets/img/bgsqr.png')
                }else if(row.dqjd==='合同审批结束'){
                    this.src=require('@/assets/img/htspjs.png')
                }
                this.show_zt=true
            },
            //合同审批
            htsq(id){
                const loading = this.$loading({
                    lock: true,
                    text: '处理中……',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                })
                axios.get(this.ip+'/contract/startHtsp',{
                    params:{
                        htid:id
                    }
                }).then(res=>{
                    loading.close()
                    if(res.data){
                        this.$message.success("申请成功！")
                        this.reload()
                    }else {
                        this.$message.error("申请失败！")
                    }
                })
            },
            currentChange(pageNum){
                this.getAllht(pageNum)
            },
            //根据项目id搜索
            xmIdSS(){
                axios.get(this.ip+'/contract/xmIdSS',{
                    params:{
                        xmId:this.xmId
                    }
                }).then(res=>{
                    if(res.data!=""&&res.data!=null){
                        this.contracts=[]
                        this.ssss=true
                        this.contracts.push(res.data)
                        if(this.contracts[0].dwyj===''||this.contracts[0].dwyj==null){
                            this.contracts[0].canSp=true
                            this.contracts[0].dqjd='未申请'
                            this.$set(this.contracts, 0, this.contracts[0])
                        }else {
                            axios.get(this.ip+'/contract/getHtNode',{
                                params:{
                                    dwyj:this.contracts[0].dwyj
                                }
                            }).then(res=>{
                                this.contracts[0].dqjd=res.data
                                if(res.data==='填写合同表单'){
                                    this.contracts[0].canSp=true
                                }else {
                                    this.contracts[0].canSp=false
                                }
                                this.$set(this.contracts, 0, this.contracts[0])
                            })
                        }

                    }else {
                        this.$message.error("没找到数据！")
                    }
                })
            },
            //拿总条数
            AllCounts(){
                axios.get(this.ip+'/contract/AllCounts')
                    .then(res=>{
                        this.hts=res.data
                    })
            },
            //归档，不能操作此记录
            gd(row){
                if(row.dwyj==null||row.dwyj===''){
                    this.$message.error("合同还未审批，禁止归档！")
                    return
                }
                //请求当前合同节点
                axios.get(this.ip+'/contract/getHtNode',{
                    params:{
                        dwyj:row.dwyj
                    }
                }).then(res=>{
                    if(res.data!='合同审批结束'){
                        this.$message.error('该合同审批还未结束！禁止归档！')
                        return
                    }else {//节点等于合同审批结束
                        //检查附件
                        axios.get(this.ip + '/Attachment/getattachment', {
                            params: {
                                pid: row.dwyj
                            }
                        })
                            .then(xxx => {
                                console.log(xxx.data.length==0)
                                if (xxx.data.length == 0) {
                                    this.$message.error("该记录还未上传附件！禁止归档！")
                                    return
                                }else {//有附件
                                    this.$confirm('归档后将无法操作该记录,是否继续?', '提示', {
                                        confirmButtonText: '确定',
                                        cancelButtonText: '取消',
                                        type: 'warning'
                                    }).then(()=>{
                                        axios.get(this.ip+'/contract/guidang',{
                                            params:{
                                                id:row.id
                                            }
                                        }).then(res=>{
                                            if(res.data)
                                                this.$message.success("归档成功！")
                                            this.reload()
                                        })
                                    }).catch(()=>{})
                                }
                            })
                    }
                })
            },
            //取消编辑
            qxbj(){
                    this.show_bjht = false,
                    this.contract={}
                  //  this.reload()
            },
            //合同搜索
            htSearch(){
                axios.get(this.ip+'/contract/contractNoss',{
                    params:{
                        contractNo:this.contractNo
                    }
                })
                    .then(res=>{
                        if(res.data.length==0)
                            this.$message.error("没有查询到相关数据！")
                        else{
                            this.ssss=true
                            this.contracts=res.data
                            //请求合同节点
                            for(let i=0;i<this.contracts.length;i++){
                                if(this.contracts[i].dwyj===''||this.contracts[i].dwyj==null){
                                    this.contracts[i].canSp=true
                                    this.contracts[i].dqjd='未申请'
                                    this.$set(this.contracts, i, this.contracts[i])
                                }else {
                                    axios.get(this.ip+'/contract/getHtNode',{
                                        params:{
                                            dwyj:this.contracts[i].dwyj
                                        }
                                    }).then(res=>{
                                        this.contracts[i].dqjd=res.data
                                        if(res.data==='填写合同表单'){
                                            this.contracts[i].canSp=true
                                        }else {
                                            this.contracts[i].canSp=false
                                        }
                                        this.$set(this.contracts, i, this.contracts[i])
                                    })
                                }
                            }
                        }

                    })
            },

            //删除合同
            scht(id){
                this.$confirm('此操作将永久删除该合同, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    axios.get(this.ip+'/contract/deleteContract',{
                        params:{
                            cid:id
                        }
                    })
                        .then(res=>{
                            if(res.data){
                                this.$message.success("删除成功")
                                this.getAllht(1)
                            }
                            else
                                this.$message.error("删除失败！")
                        })
                }).catch(()=>{this.$message.info("已取消删除")})
            },

            //删除附件
            handleBeforeRemove(file, fileList){
                if (this.contract.dwyj != '' && this.contract.dwyj != null) {
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
                                    this.$message.error("删除失败！您可能没有权限！")
                                    //重新请求
                                    this.djfj(this.contract)
                                }
                            })
                    })
                        .catch(() => {
                            //重新请求
                            this.djfj(this.contract)
                        })
                } else {
                    this.$confirm('此操作将永久删除该附件,是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        axios.get(this.ip + '/contract/deletFj', {
                            params: {
                                Fjid: file.id
                            }
                        })
                            .then(res => {
                                this.$message.success("删除成功！")
                            })
                    }).catch(() => {
                        //重新请求
                        this.djfj(this.contract)
                    })
                }

                    // this.$confirm('此操作将永久删除该附件,是否继续?', '提示', {
                    //     confirmButtonText: '确定',
                    //     cancelButtonText: '取消',
                    //     type: 'warning'
                    // }).then(()=>{
                    //     axios.get(this.ip+'/contract/deletFj',{
                    //         params:{
                    //             fid:file.id
                    //         }
                    //     })
                    //         .then(res=>{
                    //             if(res.data){
                    //                 this.$message.success("删除成功！")
                    //             }else{
                    //                 this.$message.error("删除失败！")
                    //             }
                    //             this.djfj(this.contract)
                    //         })
                    // })
                    //     .catch(()=>{
                    //         this.djfj(this.contract)
                    //     })
            },

            //编辑合同
            bjht(row){
                this.remoteMethod(row.projectName)
                this.contract=row
                this.zzsc=row.zzsc.split('、')
                this.show_bjht=true
            },

            //确定编辑
            qdbj(){
                this.contract.zzsc=''
                for(let i=0;i<this.zzsc.length;i++){
                    if(i<this.zzsc.length-1)
                        this.contract.zzsc=this.contract.zzsc+this.zzsc[i]+'、'
                    else
                        this.contract.zzsc=this.contract.zzsc+this.zzsc[i]
                }
                axios.post(this.ip+'/contract/updateContract',this.contract)
                    .then(res=>{
                        if(res.data){
                            this.$message.success("修改成功！")
                        }else {
                            this.$message.error("修改失败！")
                        }
                        this.getAllht(1)
                    })
                this.show_bjht=false
            },

            //删除请求
            handleRemove(file, fileList) {
                if (this.contract.dwyj != '' && this.contract.dwyj != null) {
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
                                    this.$message.info("删除成功！")
                                } else {
                                    this.$message.info("删除失败！您可能没有权限！")
                                    //重新请求
                                    this.djfj(this.contract)
                                }
                            })
                    })
                        .catch(() => {
                            //重新请求
                            this.djfj(this.contract)
                        })
                } else {
                    this.$confirm('此操作将永久删除该附件,是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        axios.get(this.ip + '/contract/deletFj', {
                            params: {
                                Fjid: file.id
                            }
                        })
                            .then(res => {
                                this.$message.info("删除成功！")
                            })
                    }).catch(() => {
                        this.djfj(this.contract)
                    })
                }
                // this.$confirm('此操作将永久删除该附件,是否继续?', '提示', {
                //     confirmButtonText: '确定',
                //     cancelButtonText: '取消',
                //     type: 'warning'
                // }).then(() => {
                //     axios.get(this.ip + '/contract/deletFj', {
                //         params: {
                //             Fjid: file.id
                //         }
                //     })
                //         .then(res => {
                //             this.$message.info("删除成功！")
                //         })
                // })
            },
            //上传成功，重新请求
            handleSuccess() {
                this.djfj(this.contract)
            },
            //点击文件下载
            handlePreview(file){
                if (this.contract.dwyj == '' || this.contract.dwyj == null) {//未申请
                    window.open(this.ip + '/contract/getFj?fid=' + file.id + '&fname=' + encodeURIComponent(file.name))
                } else {
                    window.open(this.ip + '/Attachment/getattachment1?attachment_id=' + file.id)
                }
            },
            //点击附件
            djfj(row){
                this.contract=row
                this.cid=row.id
                //this.getFileList()
               // this.url = 'http://10.197.33.115:8080/contract/uploadHtfj?id=' + row.id
                if (row.dwyj == '' || row.dwyj == null) {//未申请
                    this.url = 'http://10.197.33.115:8080/contract/uploadHtfj?id=' + row.id
                    //拿附件信息
                    axios.get(this.ip + '/contract/getFjs', {
                        params: {
                            cid: row.id
                        }
                    }).then(res => {
                        this.fileList = []
                        for (let i = 0; i < res.data.length; i++) {
                            this.fileList.push({
                                name: res.data[i].fname,
                                id: res.data[i].fid
                            })
                        }
                    })
                } else {//已经申请、拿附件信息
                    this.url = 'http://10.197.33.115:8080/projectApplication/uploadFile?pId=' + row.dwyj + '&userId=' + localStorage.getItem('userId')
                    axios.get(this.ip + '/Attachment/getattachment', {
                        params: {
                            pid: row.dwyj
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
                }
                this.show_scfj=true
            },
            //填充附件列表
            getFileList(){
                //请求附件名
                axios.get(this.ip+'/contract/getFjs',{
                    params:{
                        cid:this.cid
                    }
                })
                    .then(res=>{
                        this.fileList=[]
                        for(let i=0;i<res.data.length;i++){
                            this.fileList.push({
                                name:res.data[i].fname,
                                id:res.data[i].fid
                            })
                        }
                    })
            },
            //确定新建合同
            qdxjht(){
                if(this.contract.projectId==''||this.contract.projectId==null||this.contract.price<=0||this.contract.price==null)
                {
                    this.$message.error("项目名称、合同价款等重要信息！")
                    return
                }
                this.contract.zzsc=''
                for(let i=0;i<this.zzsc.length;i++){
                    if(i<this.zzsc.length-1)
                        this.contract.zzsc=this.contract.zzsc+this.zzsc[i]+'、'
                    else
                        this.contract.zzsc=this.contract.zzsc+this.zzsc[i]
                }
                axios.post(this.ip+'/contract/addContract',this.contract)
                    .then(res=>{
                        if(res.data)
                            this.$message.success("添加成功！")
                        else
                            this.$message.success("添加失败！")
                        this.reload()
                    })
                this.show_xjht = false
            },
            //新建合同
            xjht(){
                this.getXms()
                this.contract={}
                this.zzsc=[]
                this.show_xjht=true
            },
            //拿到项目下拉框数据
            getXms(){
              axios.get(this.ip+'/projectApplication/getAllXmIdAndXmname')
                  .then(res=>{
                      this.xms=res.data
                  })
            },
            //拿到所有合同
            getAllht(pageNum) {
                this.zzsc=[]
                this.contract={}
                axios.get(this.ip+'/contract/getAllContracts',{
                    params:{
                        pageNum:pageNum
                    }
                })
                    .then(res=>{
                        this.contracts=res.data
                        //请求合同节点
                        for(let i=0;i<this.contracts.length;i++){
                            if(this.contracts[i].dwyj===''||this.contracts[i].dwyj==null){
                                this.contracts[i].canSp=true
                                this.contracts[i].dqjd='未申请'
                                this.$set(this.contracts, i, this.contracts[i])
                            }else {
                                axios.get(this.ip+'/contract/getHtNode',{
                                    params:{
                                        dwyj:this.contracts[i].dwyj
                                    }
                                }).then(res=>{
                                    this.contracts[i].dqjd=res.data
                                    if(res.data==='填写合同表单'){
                                        this.contracts[i].canSp=true
                                    }else {
                                        this.contracts[i].canSp=false
                                    }
                                    this.$set(this.contracts, i, this.contracts[i])
                                })
                            }
                        }
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
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
</style>
