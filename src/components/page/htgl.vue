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
            </div>
            <el-table height="500"  :data="contracts" style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="合同经办人:">
                                <span>{{ props.row.jbr }}</span>
                            </el-form-item>
                            <el-form-item label="主办单位意见:">
                                <span>{{ props.row.zbdwyj }}</span>
                            </el-form-item>
                            <el-form-item label="对方资质审查:">
                                <span>{{ props.row.zzsc }}</span>
                            </el-form-item>
                            <el-form-item label="单位意见:">
                                <span>{{ props.row.dwyj }}</span>
                            </el-form-item>
                            <el-form-item label="财务部门意见:">
                                <span>{{ props.row.cwbmyj }}</span>
                            </el-form-item>
                            <el-form-item label="分管领导意见:">
                                <span>{{ props.row.fgldyj }}</span>
                            </el-form-item>
                            <el-form-item label="总经理意见:">
                                <span>{{ props.row.zjlyj }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column prop="contractNo" label="合同编号" width="150">
                </el-table-column>
                <el-table-column prop="projectName" label="合同项目" width="120">
                </el-table-column>
                <el-table-column prop="rq" sortable  label="合同日期" width="120">
                </el-table-column>
                <el-table-column prop="dfdsr" label="对方当事人">
                </el-table-column>
                <el-table-column prop="tzwh" label="投资文号">
                </el-table-column>
                <el-table-column prop="price" label="合同价款">
                </el-table-column>
                <el-table-column prop="psjl" label="评审结论">
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click="djfj(scope.row.id)" icon="el-icon-upload">附件</el-button>
                        <el-button type="text" icon="el-icon-edit" @click="bjht(scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" @click="scht(scope.row.id)" class="red">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!--上传附件弹窗 -->
        <el-dialog title="上传附件" :visible.sync="show_scfj" width="30%">
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
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload>
        </el-dialog>

        <!--添加合同弹窗 -->
        <el-dialog title="新建合同" :visible.sync="show_xjht" width="50%">
            <el-form  ref="form"  label-width="100px">
                <el-form-item label="合同编号">
                    <el-input v-model="contract.contractNo"></el-input>
                </el-form-item>
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
                <el-form-item label="合同价款">
                    <el-input v-model="contract.price" type="number" style="width: 210px" ></el-input>
                    &nbsp&nbsp&nbsp&nbsp&nbsp合同经办人&nbsp&nbsp&nbsp&nbsp
                    <el-input v-model="contract.jbr" style="width: 210px"></el-input>
                </el-form-item>
                <el-form-item label="主办单位意见">
                    <el-input v-model="contract.zbdwyj" type="textarea"></el-input>
                </el-form-item>
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
                <el-form-item label="单位意见">
                    <el-input type="textarea" v-model="contract.dwyj"></el-input>
                </el-form-item>
                <el-form-item label="财务部门意见">
                    <el-input type="textarea" v-model="contract.cwbmyj"></el-input>
                </el-form-item>
                <el-form-item label="分管领导意见">
                    <el-input type="textarea" v-model="contract.fgldyj"></el-input>
                </el-form-item>
                <el-form-item label="总经理意见">
                    <el-input type="textarea" v-model="contract.zjlyj"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="show_xjht = false">取 消</el-button>
                <el-button type="primary" @click="qdxjht">确 定</el-button>
            </span>
        </el-dialog>

        <!--编辑合同弹窗 -->
        <el-dialog title="编辑合同" :visible.sync="show_bjht" width="50%">
            <el-form  ref="form"  label-width="100px">
                <el-form-item label="合同编号">
                    <el-input v-model="contract.contractNo"></el-input>
                </el-form-item>
                <el-form-item label="合同项目">
                    <el-select
                            :disabled="true"
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
                <el-form-item label="合同价款">
                    <el-input v-model="contract.price" type="number" style="width: 210px" ></el-input>
                    &nbsp&nbsp&nbsp&nbsp&nbsp合同经办人&nbsp&nbsp&nbsp&nbsp
                    <el-input v-model="contract.jbr" style="width: 210px"></el-input>
                </el-form-item>
                <el-form-item label="主办单位意见">
                    <el-input v-model="contract.zbdwyj" type="textarea"></el-input>
                </el-form-item>
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
                <el-form-item label="单位意见">
                    <el-input type="textarea" v-model="contract.dwyj"></el-input>
                </el-form-item>
                <el-form-item label="财务部门意见">
                    <el-input type="textarea" v-model="contract.cwbmyj"></el-input>
                </el-form-item>
                <el-form-item label="分管领导意见">
                    <el-input type="textarea" v-model="contract.fgldyj"></el-input>
                </el-form-item>
                <el-form-item label="总经理意见">
                    <el-input type="textarea" v-model="contract.zjlyj"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="qxbj">取 消</el-button>
                <el-button type="primary" @click="qdbj">确定编辑</el-button>
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
                    rq:''
                },
                //对方资质审查,数组
                zzsc:[],
                xms:[],
                ip: 'http://localhost:8080',
                loading: false,
                list: [],
                url: '',
                cid:'',
                contractNo:''
            }
        },
        created() {
            this.getAllht()
            this.getXms()
        },
        computed:{
          projectId(){
              return this.contract.projectId;
          }
        },
        watch:{
            //判断当前项目是否绑定了合同，如果绑定，则不能继续绑定
            projectId(newvalue,oldValue){
                if(newvalue!=null&&newvalue!=''&&this.show_bjht==false){
                    axios.get(this.ip+'/contract/isXjht',{
                        params:{
                            projectId:newvalue
                        }
                    }).then(res=>{
                        if(!res.data){
                            this.$message.error("该项目已经绑定合同、不能再次绑定")
                            this.contract.projectId=null
                        }
                    })
                }
            }
        },
        methods: {
            //取消编辑
            qxbj(){
                    this.show_bjht = false,
                    this.contract={},
                    this.getAllht()
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
                        else
                            this.contracts=res.data
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
                                this.getAllht()
                            }
                            else
                                this.$message.error("删除失败！")
                        })
                }).catch(()=>{this.$message.info("已取消删除")})
            },
            //删除附件
            handleBeforeRemove(file, fileList){
                this.$confirm('此操作将永久删除该附件,是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    axios.get(this.ip+'/contract/deletFj',{
                        params:{
                            fid:file.id
                        }
                    })
                        .then(res=>{
                            if(res.data){
                                this.$message.success("删除成功！")
                            }else{
                                this.$message.error("删除失败！")
                            }
                            this.getFileList(this.cid)
                        })
                })
                    .catch(()=>{
                        this.getFileList(this.cid)
                    })
            },
            //编辑合同
            bjht(row){
                this.remoteMethod(row.projectName)
                this.contract=row
                this.zzsc=row.zzsc.split('/')
                this.show_bjht=true
            },
            //确定编辑
            qdbj(){
                this.contract.zzsc=''
                for(let i=0;i<this.zzsc.length;i++){
                    if(i<this.zzsc.length-1)
                        this.contract.zzsc=this.contract.zzsc+this.zzsc[i]+'/'
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
                        this.getAllht()
                    })
                this.show_bjht=false
            },
            //删除请求
            handleRemove(file, fileList) {
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
                })
            },
            //上传成功，重新请求
            handleSuccess() {
                this.djfj(this.cid)
            },
            //点击文件下载
            handlePreview(file){
                window.open(this.ip+'/contract/getFj?fid='+file.id+'&fname='+file.name)
            },
            //点击附件
            djfj(id){
                this.cid=id
                this.getFileList()
                this.url = 'http://localhost:8080/contract/uploadHtfj?id=' + id
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
                this.contract.zzsc=''
                for(let i=0;i<this.zzsc.length;i++){
                    if(i<this.zzsc.length-1)
                        this.contract.zzsc=this.contract.zzsc+this.zzsc[i]+'/'
                    else
                        this.contract.zzsc=this.contract.zzsc+this.zzsc[i]
                }
                axios.post(this.ip+'/contract/addContract',this.contract)
                    .then(res=>{
                        if(res.data)
                            this.$message.success("添加成功！")
                        else
                            this.$message.success("添加失败！")
                        this.getAllht()
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
            getAllht() {
                this.zzsc=[]
                this.contract={}
                axios.get(this.ip+'/contract/getAllContracts')
                    .then(res=>{
                        console.log(res.data)
                        this.contracts=res.data
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
