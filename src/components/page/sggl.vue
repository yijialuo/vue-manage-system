<template>
    <div>
        <div class="table">
            <div class="crumbs">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item><i class="el-icon-lx-cascades"></i>施工表单</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="container">
                <div class="handle-box">
                    <el-input v-model="projectName" placeholder="项目名称" style="" class="handle-input mr10">
                    </el-input>
                    <el-input v-model="fzr" placeholder="负责人" style="" class="handle-input mr10">
                    </el-input>
                    <el-select
                            clearable
                            class="handle-input mr10"
                            v-model="xmlb"
                            placeholder="项目类别">
                        <el-option
                                v-for="item in xmlbs"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <el-input v-model="yjgq" placeholder="预计工期" style="" class="handle-input mr10">
                    </el-input>
                    <el-select
                            clearable
                            class="handle-input mr10"
                            v-model="zt"
                            placeholder="状态">
                        <el-option
                                v-for="item in sgzts"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <el-button style="margin-left: 20px" type="primary" @click="handleSerch" icon="el-icon-search">搜索</el-button>
                    <el-button type="success" icon="el-icon-tickets" style="float:right" @click="qb">全部</el-button>
                </div>
                <el-table @row-dblclick="sjxm" stripe :data="projects" border class="table" ref="multipleTable">
                    <el-table-column prop="projectNo" align="center" label="项目编号" width="140">
                    </el-table-column>
                    <el-table-column prop="projectNam" label="项目名称" min-width="180">
                    </el-table-column>
                    <el-table-column prop="declarationDep" align="center" label="立项部门" min-width="180">
                    </el-table-column>
                    <el-table-column prop="personInCharge" align="center" label="负责人" width="180">
                    </el-table-column>
                    <el-table-column prop="projectType" align="center" label="项目类别" width="180">
                    </el-table-column>
                    <el-table-column prop="techAuditOpinion" align="center" label="预计工期" width="180">
                    </el-table-column>
                    <el-table-column prop="sgzt" align="center" sortable label="状态" width="180">
                    </el-table-column>
                    <el-table-column label="操作" width="180" align="center" min-width="180">
                        <template slot-scope="scope">
                            <el-button type="text"  @click="sjxm(scope.row)">
                                管理
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div v-if="!ssss" style="text-align: center">
                    <el-pagination
                            background
                            @current-change="currentChange"
                            layout="total,prev, pager, next"
                            :total="count">
                    </el-pagination>
                </div>
            </div>
        </div>
        <!--进度弹窗 -->
        <el-dialog :close-on-click-modal="false" title="施工进度" :visible.sync="show_sgjd" width="690px" @close="close">
            <h2 style="text-align: center"> {{projectName}}</h2>
            <el-form style="margin-top: 20px" label-width="70px" label-position='left'>
                <el-form-item label="开工时间">
                    <el-input v-model="kgsj" :disabled="true" style="width: 215px;margin-right: 50px"></el-input>
                    &nbsp&nbsp完工时间&nbsp&nbsp
                    <el-input v-model="wgsj" :disabled="true" style="width: 215px" ></el-input>
                </el-form-item>
                <el-button v-if="!equalsJs(groupId,'bgs')" :disabled=iswg type="primary" @click="xzjd"  style="float:right" icon="el-icon-circle-plus" class="handle-del mr10" >
                    新增节点
                </el-button>
                <el-button v-if="!equalsJs(groupId,'bgs')" type="success" icon="el-icon-success" :disabled=iswg @click="wg">完 工</el-button>
                <el-table
                        height="500"
                        :data="jindus"
                        stripe
                        style="width: 100%">
                    <el-table-column
                            prop="point"
                            label="节点"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="finishDate"
                            label="时间"
                            width="160">
                    </el-table-column>
                    <el-table-column
                            prop="isFinish"
                            label="描述">
                    </el-table-column>
                    <el-table-column label="操作" width="250" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" v-if="!equalsJs(groupId,'bgs')" icon="el-icon-edit" :disabled=iswg   @click="bj(scope.row)">编辑</el-button>
                            <el-button type="text" v-if="!equalsJs(groupId,'bgs')" icon="el-icon-delete" :disabled=iswg  v-bind:class="{ red: !iswg,}"  @click="handleDelete(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form>
        </el-dialog>
        <!--编辑节点弹窗 -->
        <el-dialog title="添加施工进度" :close-on-click-modal="false" :visible.sync="show_bj" width="550px">
            <h2 style="text-align: center"> {{projectName}}</h2>
            <el-form style="margin-top: 20px" label-width="70px" label-position='left'>
                <el-form-item label="节点：">
                    <el-input v-model="jindu.point"></el-input>
                </el-form-item>
                <el-form-item label="时间：">
                    <el-date-picker
                            v-model="jindu.finishDate"
                            type="datetime"
                            placeholder="选择日期时间"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            align="right"
                            :picker-options="pickerOptions1">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="描述：">
                    <el-input v-model="jindu.isFinish" rows="4" type="textarea" ></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="qxbj">取 消</el-button>
                <el-button type="primary" @click="qdxg">确定修改</el-button>
            </span>
        </el-dialog>

        <!--完工时间选择框-->
        <el-dialog title="选择完工时间" :visible.sync="show_wgsj" width="300px">
            <el-date-picker
                    v-model="xzwgsj"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    type="datetime"
                    placeholder="选择日期时间">
            </el-date-picker>
            <span slot="footer" class="dialog-footer">
                <el-button @click="show_wgsj = false">取 消</el-button>
                <el-button type="primary" @click="qdwgsj">确 定</el-button>
            </span>
        </el-dialog>

        <!--新建施工进度弹窗 -->
        <el-dialog title="添加施工进度" :close-on-click-modal="false" :visible.sync="show_xzjd" width="550px">
            <h2 style="text-align: center"> {{projectName}}</h2>
            <el-form style="margin-top: 20px" label-width="70px" label-position='left'>
                <el-form-item label="节点：">
                    <el-input v-model="jindu.point"></el-input>
                </el-form-item>
                <el-form-item label="时间：">
                    <el-date-picker
                            v-model="jindu.finishDate"
                            type="datetime"
                            placeholder="选择日期时间"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            align="right"
                            :picker-options="pickerOptions1">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="描述：">
                    <el-input v-model="jindu.isFinish" rows="4" type="textarea" ></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="show_xzjd = false">取 消</el-button>
                <el-button type="primary" @click="qdcr">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        inject:['reload'],
        name: 'sggl',
        data() {
            return {
                groupId:localStorage.getItem('groupId'),
                ssss:false,
                userId:localStorage.getItem('userId'),
                select_sgzt:'',
                bms:[],
                //项目类别
                xmlbs: [{
                    value: '固定资产',
                    label: '固定资产'
                }, {
                    value: '维修',
                    label: '维修'
                }, {
                    value: '物资采购',
                    label: '物资采购'
                }],
                sgzts:[{
                    value: '已完工',
                    label: '已完工'
                },{
                    value: '进行中',
                    label: '进行中'
                },{
                    value: '未开工',
                    label: '未开工'
                },],
                pickerOptions1: {
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
                jindu:{},
                jindus:[],
                tableData: [],
                wgsj:"",
                //新增节点弹窗
                show_xzjd:false,
                //施工进度
                show_sgjd: false,
                //编辑弹窗
                show_bj:false,
                //完工时间弹窗
                show_wgsj:false,
                loading: false,
                projectId: '',
                projectName: '',
                departmentName:'',
                fzr:'',
                xmlb:'',
                yjgq:'',
                zt:'',
                ip: 'http://10.197.33.115:8080',
                projects: [],
                xms: [],
                list: [],
                //开工时间
                kgsj:'',
                //完工时间
                xzwgsj:'',
                iswg:false,
                count:0
            }
        },
        created() {
            this.getXms()
            this.getAllProject(1,this.userId)
            this.getcounts()
            this.getAllDptName()
        },
        watch:{
          xzwgsj(newValue,oldValue){
              //新选的日期大于当前时间
              if(new Date(newValue)>new Date()){
                  this.xzwgsj=oldValue
              }
          }
        },
        methods: {
            //分页请求
            currentChange(pageNum){
                this.getAllProject(pageNum,this.userId)
            },
            //项目数量
            getcounts(){
                axios.get(this.ip+'/projectApplication/selfAllCounts', {
                    params:{
                        dpt:localStorage.getItem("departmentName")
                    }
                })
                    .then(res=>{
                        this.count=res.data
                    })
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
            //删除
            handleDelete(row){
                this.$confirm('此操作将永久删除该节点, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.get(this.ip+'/jindu/deleteJindu',{
                        params:{
                            jid:row.id
                        }
                    })
                        .then(res=>{
                            if(res.data){
                                this.$message.success("删除成功！")
                            }else {
                                this.$message.error("删除失败！")
                            }
                            this.getJds()
                        })
                })
                    .catch()
            },
            //取消编辑
            qxbj(){
                this.show_bj = false
                this.getJds()
            },
            //全部按钮事件
            qb() {
                this.getAllProject(1,this.userId)
                this.ssss = false
            },
            //确定修改
            qdxg(){
              axios.post(this.ip+'/jindu/updataJindu',this.jindu)
                  .then(res=>{
                      if(res.data){
                          this.$message.success("修改成功！")
                          this.getJds()
                          this.show_bj=false
                      }else {
                          this.$message.error("修改失败！")
                      }
                  })
            },
            //编辑进度
            bj(row){
                this.show_bj=true
                this.jindu=row
            },
            //点击完工
            wg(){
                this.$confirm('完成后，将不能修改各个节点信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    if(this.jindus.length!=0){
                        //弹出完工时间选择框
                        this.show_wgsj=true
                    }else {
                        this.$message.error("该项目还没有节点，请先添加节点！")
                    }
                }).catch(()=>{

                })

            },
            //进度窗口关闭
            close(){
                this.projectId=''
                this.projectName=''
            },
            //点击新增节点
            xzjd(){
                //新增节点判断该项目是否可以新增节点
                axios.get(this.ip+'/jindu/canAddjd',{
                    params:{
                        projectId:this.projectId
                    }
                }).then(res=>{
                    if(res.data){
                        this.show_xzjd=true
                        this.jindu={}
                        this.jindu.projectId=this.projectId
                    }else {
                        this.$message.error("该项目招标流程还未结束！禁止施工！")
                    }
                })
            },
            //确定完工时间
            qdwgsj(){
                if(this.xzwgsj!=null&&this.xzwgsj!=""){
                    axios.get(this.ip+'/jindu/projectFinish',{
                        params:{
                            pid:this.projectId,
                            wgsj:this.xzwgsj
                        }
                    }).then(res=>{
                        if(res.data){
                            this.$message.success("已经完工！")
                            this.iswg=true
                            this.wgsj=res.data
                            this.show_xzjd=false
                            this.show_wgsj=false
                        }
                    })
                }else {
                    this.$message.error("请选择时间！")
                }
            },

            //确定插入节点
            qdcr(){
                axios.post(this.ip+'/jindu/addJindu',this.jindu)
                    .then(res=>{
                        if(res.data){
                            this.$message.success("节点插入成功！")
                        }else {
                            this.$message.error("节点插入失败！")
                        }
                        this.getJds()
                        this.getSFdte()
                        this.getWg()
                        this.show_xzjd=false
                    })
            },
            //拿到项目所有节点信息
            getJds(){
                axios.get(this.ip+'/jindu/cxJindu',{
                    params:{
                        pid:this.projectId
                    }
                }).then(res=>{
                    this.jindus=res.data
                })
            },
            //拿到当前项目是否完工
            getWg(){
                axios.get(this.ip+'/jindu/isfinish',{
                    params:{
                        pid:this.projectId
                    }
                })
                    .then(res=>{
                        this.iswg=res.data
                    })
            },
            //双击项目
            sjxm(row) {
                this.kgsj=''
                this.wgsj=''
                this.projectName = row.projectNam
                this.projectId=row.id
                this.getJds()
                this.getSFdte()
                this.getWg()
                this.show_sgjd = true

            },
            //拿到开工日期和完工日期
            getSFdte(){
                axios.get(this.ip+'/jindu/getSFdte',{
                    params:{
                        pid:this.projectId
                    }
                })
                    .then(res=>{
                        this.kgsj=res.data.split('/')[0]
                        this.wgsj=res.data.split('/')[1]
                        if(this.kgsj=='null')
                            this.kgsj=''
                        if(this.wgsj=='null')
                            this.wgsj=''
                    })
            },
            //施工状态搜索
            sgztss(){
                if(this.select_sgzt===''||this.select_sgzt==null)
                    return
                axios.get(this.ip+'/projectApplication/sgztss',{
                    params:{
                        sgzt:this.select_sgzt,
                        departmentName:localStorage.getItem('departmentName')
                    }
                }).then(res=>{
                    if(res.data.length==0){
                        this.$message.error("没查询到相关数据")
                        return
                    }else {
                        this.ssss=true
                        this.projects=res.data;
                        //请求项目施工状态
                        for(let i=0;i<res.data.length;i++){
                            this.projects[i].sgzt=this.select_sgzt
                            this.$set(this.projects, i, this.projects[i]);
                        }
                    }
                })
            },
            //搜索
            ss() {
                axios.get(this.ip + '/projectApplication/selectXmById', {
                    params: {
                        projectId: this.projectId
                    }
                }).then(res => {
                    if (res.data != null) {
                        this.ssss=true
                        this.projects = []
                        this.projects.push(res.data)
                        //填充状态
                        if(this.projects[0].finishDte!==''&&this.projects[0].finishDte!=null){//有完成时间，表示完成
                            this.projects[0].sgzt='已完工'
                            this.$set(this.projects, 0, this.projects[0]);
                        }else {
                            axios.get(this.ip+'/jindu/getSgzt',{
                                params:{
                                    projectId:this.projects[0].id
                                }
                            }).then(xxx=>{
                                this.projects[0].sgzt=xxx.data
                                this.$set(this.projects, 0, this.projects[0]);
                            })
                        }
                    } else {
                        this.$message.error("没找到相关数据！")
                    }
                })
            },
            handleSerch(){
                axios.get(this.ip + '/projectApplication/sgSearch', {
                    params: {
                        projectName: this.projectName,
                        departmentName: localStorage.getItem('departmentName')!='无部门'?localStorage.getItem('departmentName'):"",
                        fzr: this.fzr,
                        xmlb: this.xmlb,
                        yjgq: this.yjgq,
                        zt: this.zt
                    }
                }).then(res => {
                    this.ssss=true
                    this.projects = res.data
                    //请求项目施工状态
                    for(let i=0;i<res.data.length;i++){
                        if(res.data[i].finishDte!==''&&res.data[i].finishDte!=null){//有完成时间，表示完成
                            this.projects[i].sgzt='已完工'
                            this.$set(this.projects, i, this.projects[i]);
                        }else {
                            axios.get(this.ip+'/jindu/getSgzt',{
                                params:{
                                    projectId:res.data[i].id
                                }
                            }).then(xxx=>{
                                this.projects[i].sgzt=xxx.data
                                this.$set(this.projects, i, this.projects[i]);
                            })
                        }
                    }
                })
            },
            //拿到所有项目
            getAllProject(pageNum) {
                axios.get(this.ip +'/projectApplication/selectByDepartmentName', {
                    params:{
                        pageNum:pageNum,
                        departmentName:localStorage.getItem('departmentName')
                    }
                }).then(res=>{
                    this.projects = res.data
                    //请求项目施工状态
                    for(let i=0;i<res.data.length;i++){
                        if(res.data[i].finishDte!==''&&res.data[i].finishDte!=null){//有完成时间，表示完成
                            this.projects[i].sgzt='已完工'
                            this.$set(this.projects, i, this.projects[i]);
                        }else {
                            axios.get(this.ip+'/jindu/getSgzt',{
                                params:{
                                    projectId:res.data[i].id
                                }
                            }).then(xxx=>{
                                this.projects[i].sgzt=xxx.data
                                this.$set(this.projects, i, this.projects[i]);
                            })
                        }
                    }
                })
            },
            //拿到项目下拉框数据
            getXms() {
                if(localStorage.getItem('departmentName')!='工程技术部'&&localStorage.getItem('departmentName')!='办公室'){
                    axios.get(this.ip + '/projectApplication/getSelfXmidAndXmname',{
                        params:{
                            dpt:localStorage.getItem('departmentName')
                        }
                    })
                        .then(res => {
                            this.xms = res.data
                        })
                }else {
                    axios.get(this.ip + '/projectApplication/getAllXmIdAndXmname')
                        .then(res => {
                            this.xms = res.data
                        })
                }

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
            },
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
