<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i>验收表单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button @click="xjys" type="primary" icon="el-icon-circle-plus" class="handle-del mr10">
                    新建验收
                </el-button>
                <el-input placeholder="编号" v-model="ysNo" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search"  @click="ysSearch">搜索</el-button>
                <el-select
                        style="margin-left: 40px"
                        filterable
                        v-model="projectId"
                        placeholder="选择项目"
                      >
                    <el-option
                            v-for="item in xms"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-button style="margin-left: 10px" type="primary" @click="ss" icon="el-icon-search">搜索</el-button>

                <el-button type="success" icon="el-icon-tickets" style="float:right" @click="getAllys(1)">全部</el-button>
            </div>
            <el-table height="600" :data="yanshous" style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form style="color: #99a9bf;"  label-position="left" inline class="demo-table-expand">
                            <el-form-item label="建设地点:">
                                <span>{{ props.row.jsdd }}</span>
                            </el-form-item>
                            <el-form-item label="使用部门:">
                                <span>{{ props.row.sybm }}</span>
                            </el-form-item>
                            <el-form-item label="施工单位:">
                                <span>{{ props.row.jhwh }}</span>
                            </el-form-item>
                            <el-form-item label="计划文号:">
                                <span>{{ props.row.sgdw }}</span>
                            </el-form-item>
                            <!--<el-form-item label="施工单位自我评定:">-->
                                <!--<span>{{ props.row.sgdwzwpd }}</span>-->
                            <!--</el-form-item>-->
                            <!--<el-form-item label="使用部门验收意见:">-->
                                <!--<span>{{ props.row.sybmysyj }}</span>-->
                            <!--</el-form-item>-->
                            <!--<el-form-item label="项目主管部门质量评定:">-->
                                <!--<span>{{ props.row.zgbmpd }}</span>-->
                            <!--</el-form-item>-->
                            <!--<el-form-item label="参加验收人员验收结论:">-->
                                <!--<span>{{ props.row.ysjl }}</span>-->
                            <!--</el-form-item>-->
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column prop="ysno" sortable label="验收单编号" >
                </el-table-column>
                <el-table-column prop="projectName" label="工程名称" >
                </el-table-column>
                <el-table-column prop="kgrq" sortable  label="开工日期">
                </el-table-column>
                <el-table-column prop="sjjgrq" sortable  label="实际竣工日期">
                </el-table-column>
                <el-table-column prop="jhje" sortable  label="计划金额(元)">
                </el-table-column>
                <el-table-column prop="cbje"    label="承包金额(元)">
                </el-table-column>
                <el-table-column prop="ysrq"  sortable label="验收日期">
                </el-table-column>
                <el-table-column label="操作"  align="center">
                    <template slot-scope="scope">
                        <el-button type="text"  @click="djfj(scope.row.id),isgd=scope.row.gd" >附件</el-button>
                        <el-button type="text" :disabled="scope.row.gd=='1'" @click="bjys(scope.row)">编辑</el-button>
                        <el-button type="text" :disabled="scope.row.gd=='1'"  @click="gd(scope.row.id)">归档</el-button>
                        <el-button type="text" :disabled="scope.row.gd=='1'"  @click="scys(scope.row.id)"  v-bind:class="{red:scope.row.gd!='1'}">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div style="text-align: center">
                <el-pagination
                        background
                        @current-change="currentChange"
                        layout="prev, pager, next"
                        :total="counts">
                </el-pagination>
            </div>
        </div>

        <!--上传附件弹窗 -->
        <el-dialog title="上传附件" :visible.sync="show_scfj" width="408px">
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
        <!--新建验收弹窗 -->
        <el-dialog title="验收单" :visible.sync="show_xjys" width="653px">

            <el-form style="margin-top: 20px" ref="form"  label-width="100px">
                <el-form-item label="验收单编号">
                    <el-input
                            placeholder="验收单编号"
                            v-model="yanshou.ysno"
                            clearable>
                    </el-input>
                </el-form-item>
                <el-form-item label="工程名称">
                    <el-select
                            placeholder="选择项目"
                            style="width: 200px"
                            filterable
                            v-model="yanshou.projectid"
                          >
                        <el-option
                                v-for="item in ysxms"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    &nbsp&nbsp&nbsp&nbsp&nbsp建设地点&nbsp&nbsp&nbsp
                    <el-input  v-model="yanshou.jsdd" style="width: 200px" ></el-input>
                </el-form-item>
            <el-form-item label="使用部门">
                <el-input  v-model="yanshou.sybm" style="width: 200px" ></el-input>
                &nbsp&nbsp&nbsp&nbsp施工单位&nbsp&nbsp&nbsp&nbsp
                <el-input v-model="yanshou.sgdw" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="计划文号">
                <el-input v-model="yanshou.jhwh"  style="width: 200px" ></el-input>
                &nbsp&nbsp&nbsp&nbsp开工日期&nbsp&nbsp&nbsp&nbsp
                <el-date-picker type="date" placeholder="选择日期" v-model="yanshou.kgrq" value-format="yyyy-MM-dd"
                                style="width: 200px" ></el-date-picker>
            </el-form-item>
            <el-form-item label="计划金额">
                <el-input type="number" v-model="yanshou.jhje"  style="width: 200px" ></el-input>
                &nbsp&nbsp&nbsp&nbsp竣工日期&nbsp&nbsp&nbsp&nbsp
                <el-date-picker type="date" placeholder="选择日期" v-model="yanshou.sjjgrq" value-format="yyyy-MM-dd"
                                style="width: 200px" ></el-date-picker>
            </el-form-item>
            <el-form-item label="承包金额(元)">
                <el-input type="number" v-model="yanshou.cbje" style="width: 200px" ></el-input>
                &nbsp&nbsp&nbsp&nbsp验收日期&nbsp&nbsp&nbsp&nbsp
                <el-date-picker type="date" placeholder="选择日期" v-model="yanshou.ysrq" value-format="yyyy-MM-dd"
                                style="width: 200px" ></el-date-picker>
            </el-form-item>
            <!--<el-form-item label="施工单位自我评定">-->
                <!--<el-input type="textarea" v-model="yanshou.sgdwzwpd" rows="3"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="使用部门验收意见">-->
                <!--<el-input type="textarea" v-model="yanshou.sybmysyj" rows="3"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="项目主管部门质量评定">-->
                <!--<el-input type="textarea" v-model="yanshou.zgbmpd" rows="3"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="参加验收人员验收结论">-->
                <!--<el-input type="textarea" v-model="yanshou.ysjl" rows="3"></el-input>-->
            <!--</el-form-item>-->
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="show_xjys = false,yanshou={}">取 消</el-button>
                <el-button type="primary" @click="qdxj">确定新建</el-button>
            </span>
        </el-dialog>

        <!--编辑验收弹窗 -->
        <el-dialog title="验收单" :visible.sync="show_bjys" width="653px">
            <el-input
                    placeholder="编号"
                    v-model="yanshou.ysno"
                    style="margin-left: 30px;width: 150px"
                    clearable>
            </el-input>
            <el-form style="margin-top: 20px" ref="form"  label-width="100px">
                <el-form-item label="工程名称">
                    <el-select
                            :disabled="true"
                            v-model="yanshou.projectid"
                            style="width: 200px"
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
                    &nbsp&nbsp&nbsp&nbsp&nbsp建设地点&nbsp&nbsp&nbsp
                    <el-input  v-model="yanshou.jsdd" style="width: 200px" ></el-input>
                </el-form-item>
                <el-form-item label="使用部门">
                    <el-input  v-model="yanshou.sybm" style="width: 200px" ></el-input>
                    &nbsp&nbsp&nbsp&nbsp施工单位&nbsp&nbsp&nbsp&nbsp
                    <el-input v-model="yanshou.sgdw" style="width: 200px"></el-input>
                </el-form-item>
                <el-form-item label="计划文号">
                    <el-input v-model="yanshou.jhwh"  style="width: 200px" ></el-input>
                    &nbsp&nbsp&nbsp&nbsp开工日期&nbsp&nbsp&nbsp&nbsp
                    <el-date-picker type="date" placeholder="选择日期" v-model="yanshou.kgrq" value-format="yyyy-MM-dd"
                                    style="width: 200px" ></el-date-picker>
                </el-form-item>
                <el-form-item label="计划金额">
                    <el-input type="number" v-model="yanshou.jhje"  style="width: 200px" ></el-input>
                    &nbsp&nbsp&nbsp&nbsp竣工日期&nbsp&nbsp&nbsp&nbsp
                    <el-date-picker type="date" placeholder="选择日期" v-model="yanshou.sjjgrq" value-format="yyyy-MM-dd"
                                    style="width: 200px" ></el-date-picker>
                </el-form-item>
                <el-form-item label="承包金额(元)">
                    <el-input type="number" v-model="yanshou.cbje" style="width: 200px" ></el-input>
                    &nbsp&nbsp&nbsp&nbsp验收日期&nbsp&nbsp&nbsp&nbsp
                    <el-date-picker type="date" placeholder="选择日期" v-model="yanshou.ysrq" value-format="yyyy-MM-dd"
                                    style="width: 200px" ></el-date-picker>
                </el-form-item>
                <!--<el-form-item label="施工单位自我评定">-->
                    <!--<el-input type="textarea" v-model="yanshou.sgdwzwpd" rows="3"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="使用部门验收意见">-->
                    <!--<el-input type="textarea" v-model="yanshou.sybmysyj" rows="3"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="项目主管部门质量评定">-->
                    <!--<el-input type="textarea" v-model="yanshou.zgbmpd" rows="3"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="参加验收人员验收结论">-->
                    <!--<el-input type="textarea" v-model="yanshou.ysjl" rows="3"></el-input>-->
                <!--</el-form-item>-->
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="qxbj">取 消</el-button>
                <el-button type="primary" @click="qdxg">确定修改</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        inject:['reload'],
        name: 'ysgl',
        data() {
            return {
                yanshou:{
                    id:'',
                    ysno:'',
                     //项目id
                    projectid:'',
                    //建设地点
                    jsdd:'',
                    //使用部门
                    sybm:'',
                    //施工单位
                    sgdw:'',
                    //计划文号
                    jhwh:'',
                     //开工日期
                    kgrq:'',
                    //计划金额
                    jhje:'',
                    //实际竣工日期
                    sjjgrq:'',
                  //承包金额
                    cbje:'',
                    //验收日期
                    ysrq:'',
                    //施工单位自我评定
                    sgdwzwpd:'',
                   //使用部门验收意见
                    sybmysyj:'',
                    //项目主管部门质量评定
                    zgbmpd:'',
                    //参加验收人员验收结论
                    ysjl:'',
                },
                projectId:'',
                //新建验收
                show_xjys:false,
                //编辑验收
                show_bjys:false,
                fileList:[],
                //上传附件
                show_scfj:false,
                yanshous: [],

                xms:[],
                ip: 'http://localhost:8080',
                loading: false,
                list: [],
                url: '',
                cid:'',
                ysNo:'',
                //验收条数
                counts:0,
                //可以验收的项目
                ysxms:[],
            }
        },
        created() {
            this.getAllys(1)
            this.getXms()
            this.getCount()
        },
        methods: {
            currentChange(pageNum){
                this.getAllys(pageNum)
            },
            //拿到数据条数
            getCount(){
                axios.get(this.ip+'/yanshou/AllCounts')
                    .then(res=>{
                        this.counts=res.data;
                    })
            },
            //归档
            gd(id){
                //请求附件名
                axios.get(this.ip+'/contract/getFjs',{
                    params:{
                        cid:id
                    }
                })
                    .then(res=>{
                        if(res.data.length==0){
                            this.$message.error("改记录还未上传附件！禁止归档！")
                            return;
                        }else {
                            this.$confirm("归档后，将不能操作此记录，是否继续","提示",{
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning'
                            }).then(()=> {
                                axios.get(this.ip + '/yanshou/guidang', {
                                    params: {
                                        id: id
                                    }
                                }).then(res => {
                                    if (res.data){
                                        this.$message.success("归档完成！")
                                        this.getAllys(1)
                                    }
                                })
                            })
                        }
                    })

            },
            //取消编辑
            qxbj(){
                this.show_bjys = false
                this.yanshou={}
                this.getAllys(1)
            },
            //确定新建验收
            qdxj(){
                if(this.yanshou.projectid==null||this.yanshou.projectid==''){
                    this.$message.error("请选择项目！")
                    return
                }
                axios.post(this.ip+'/yanshou/addYanshou',this.yanshou)
                    .then(res=>{
                        this.$message.success("新建验收成功！")
                        this.reload()
                        this.show_xjys=false
                    })
            },
            //新建验收
            xjys(){
                this.show_xjys=true
                this.getYsxms()
                this.yanshou={}
            },
            //拿到可以验收的项目
            getYsxms(){
                axios.get(this.ip+'/projectApplication/selectYsXm')
                    .then(res=>{
                        this.ysxms=res.data
                    })
            },
            //项目名称搜索（projectId）
            ss(){
                axios.get(this.ip+'/yanshou/selectYSbyprojectid',{
                    params:{
                        projectid:this.projectId
                    }
                }).then(res=>{
                    if(res.data.length!=0)
                        this.changesj(res.data)
                    else
                        this.$message.error("没找到相关数据！")
                })
            },
            //验收搜索
            ysSearch(){
                axios.get(this.ip+'/yanshou/selectYSbyNo',{
                    params:{
                        ysNo:this.ysNo
                    }
                })
                    .then(res=>{
                        if(res.data.length==0)
                            this.$message.error("没有查询到相关数据！")
                        else
                            this.changesj(res.data)
                    })
            },
            //删除合同
            scys(id){
                this.$confirm('此操作将永久删除该验收, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    axios.get(this.ip+'/yanshou/deleteYanshou',{
                        params:{
                            yid:id
                        }
                    })
                        .then(res=>{
                            if(res.data){
                                this.$message.success("删除成功")
                                this.reload()
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
                            this.getFileList()
                        })
                })
                    .catch(()=>{
                        this.getFileList()
                    })
            },
            //编辑合同
            bjys(row){
                this.remoteMethod(row.projectName)
                this.yanshou=row
                this.show_bjys=true
            },
            //确定修改
            qdxg(){

                axios.post(this.ip+'/yanshou/updateYanshou',this.yanshou)
                    .then(res=>{
                        if(res.data){
                            this.$message.success("修改成功！")
                        }else {
                            this.$message.error("修改失败！")
                        }
                        this.getAllys(1)
                    })
                this.show_bjys=false
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
            //变为前端需要的数据（添加项目名）
            changesj(xxx){
                let yyy=xxx
                let qq=[]
                for(let i=0;i<xxx.length;i++){
                    qq.push(axios.get(this.ip+'/projectApplication/xmIdToxmName',{
                        params:{
                            xmId:xxx[i].projectid
                        }
                    })
                        .then(zzz=>{
                            yyy[i].projectName=zzz.data
                        }))

                }
                axios.all(qq)
                    .then(axios.spread((acct, perms)=>{
                        this.yanshous=yyy
                    }))
            },
            //拿到项目下拉框数据
            getXms(){
                axios.get(this.ip+'/projectApplication/getAllXmIdAndXmname')
                    .then(res=>{
                        this.xms=res.data
                    })
            },
            //拿到所有验收
            getAllys(pageNum) {
                axios.get(this.ip+'/yanshou/getAllYanshou',{
                    params:{
                        pageNum:pageNum
                    }
                })
                    .then(res=>{
                       this.changesj(res.data)
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
