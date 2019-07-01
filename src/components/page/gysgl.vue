<template>
    <div>
        <div class="table">
            <div class="crumbs">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item><i class="el-icon-lx-cascades"></i>供应商表单</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="container">
                <div class="handle-box">
                    <el-button type="primary" icon="el-icon-circle-plus" class="handle-del mr10" @click="supplier={},show_tjgys=true">
                        添加供应商
                    </el-button>
                    <el-input v-model="gysmc" placeholder="供应商名称" class="handle-input mr10"></el-input>
                    <el-button type="primary" icon="el-icon-search" @click="gysmcSearch">搜索</el-button>
                </div>
                <el-table height="600" @row-dblclick="sjgys" stripe :data="suppliers" border class="table" ref="multipleTable">
                    <el-table-column prop="name" label="供应商名称" sortable min-width="160">
                    </el-table-column>
                    <el-table-column prop="code" align="center" label="供应商编号" min-width="160">
                    </el-table-column>
                    <el-table-column prop="phone" align="center" label="座机" width="120">
                    </el-table-column>
                    <el-table-column prop="mobile" align="center" label="手机" width="120">
                    </el-table-column>
                    <el-table-column prop="contact" align="center" label="联系人" width="120">
                    </el-table-column>
                    <el-table-column prop="fax" align="center" label="传真" width="160">
                    </el-table-column>
                    <el-table-column prop="email" align="center" label="邮箱" width="180">
                    </el-table-column>
                    <el-table-column prop="address" align="center" label="地址" min-width="180">
                    </el-table-column>
                    <el-table-column label="操作" width="180" align="center" min-width="140">
                        <template slot-scope="scope">
                            <el-button type="text" icon="el-icon-star-on"
                                       @click="sjgys(scope.row)">评价
                            </el-button>
                            <el-button type="text" icon="el-icon-edit"
                                       @click="editGys(scope.$index, scope.row)">编辑
                            </el-button>
                            <el-button type="text" icon="el-icon-delete" class="red"
                                       @click="deleteGys(scope.$index, scope.row)">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div style="text-align: center">
                    <el-pagination
                            background
                            layout="prev, pager, next"
                            :total="suppliers.length">
                    </el-pagination>
                </div>
            </div>
        </div>

         <!--添加供应商弹窗 -->
        <el-dialog title="添加供应商" :close-on-click-modal="false" :visible.sync="show_tjgys" width="700px">
            <el-form ref="form" :model="supplier" label-width="100px">
                <el-form-item label="供应商名称">
                    <el-input v-model="supplier.name"></el-input>
                </el-form-item>
                <el-form-item label="供应商编号">
                    <el-input v-model="supplier.code"></el-input>
                </el-form-item>
                <el-form-item label="座机">
                    <el-input style="width: 226px;padding-right: 20px" v-model="supplier.phone"></el-input>
                    &nbsp&nbsp&nbsp&nbsp&nbsp手机&nbsp&nbsp&nbsp&nbsp
                    <el-input style="width: 226px" v-model="supplier.mobile"></el-input>
                </el-form-item>
                <el-form-item label="联系人">
                    <el-input style="width: 226px;padding-right: 20px" v-model="supplier.contact"></el-input>
                    &nbsp&nbsp&nbsp&nbsp&nbsp传真&nbsp&nbsp&nbsp&nbsp
                    <el-input style="width: 226px" v-model="supplier.fax"></el-input>
                </el-form-item>

                <el-form-item label="邮箱">
                    <el-input  style="width: 226px;padding-right: 20px" v-model="supplier.email"></el-input>
                    &nbsp&nbsp&nbsp&nbsp&nbsp地址&nbsp&nbsp&nbsp&nbsp
                    <el-input style="width: 226px" v-model="supplier.address"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="show_tjgys = false">取 消</el-button>
                <el-button type="primary" @click="qdtjgys">确 定</el-button>
            </span>
        </el-dialog>

        <!--编辑供应商弹窗 -->
        <el-dialog title="编辑供应商" :close-on-click-modal="false" :visible.sync="show_bjgys" width="690px">
            <el-form ref="form" :model="supplier" label-width="100px">
                <el-form-item label="供应商名称">
                    <el-input v-model="supplier.name"></el-input>
                </el-form-item>
                <el-form-item label="供应商编号">
                    <el-input v-model="supplier.code"></el-input>
                </el-form-item>
                <el-form-item label="座机">
                    <el-input style="width: 226px;padding-right: 20px" v-model="supplier.phone"></el-input>
                    &nbsp&nbsp&nbsp&nbsp&nbsp手机&nbsp&nbsp&nbsp&nbsp
                    <el-input style="width: 226px" v-model="supplier.mobile"></el-input>
                </el-form-item>
                <el-form-item label="联系人">
                    <el-input style="width: 226px;padding-right: 20px" v-model="supplier.contact"></el-input>
                    &nbsp&nbsp&nbsp&nbsp&nbsp传真&nbsp&nbsp&nbsp&nbsp
                    <el-input style="width: 226px" v-model="supplier.fax"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input  style="width: 226px;padding-right: 20px" v-model="supplier.email"></el-input>
                    &nbsp&nbsp&nbsp&nbsp&nbsp地址&nbsp&nbsp&nbsp&nbsp
                    <el-input style="width: 226px" v-model="supplier.address"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="show_bjgys = false">取 消</el-button>
                <el-button type="primary" @click="qdbjgys">确 定</el-button>
            </span>
        </el-dialog>

        <!--评价报告弹窗 -->
        <el-dialog title="评价报告" :close-on-click-modal="false" :visible.sync="show_pjbg" width="912px">
            <h3>{{this.gysmc}}</h3>
            <el-table
                    :data="pjbgData"
                    style="width: 100%">
                <el-table-column
                        prop="nr"
                        label="考核内容"
                        width="370">
                </el-table-column>
                    <el-table-column label="考核评分">
                        <el-table-column
                                prop="gcjsb"
                                label="工程技术部"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="lyczb"
                                label="粮油操作部"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="mkczb"
                                label="煤矿操作部"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="xmwyh"
                                label="项目委员会（办公室）"
                                width="120">
                        </el-table-column>
                    </el-table-column>
            </el-table>
        </el-dialog>

        <!--添加评价弹窗 -->
        <el-dialog title="添加评价" :close-on-click-modal="false" :visible.sync="show_tjpj" width="925px">
            <h2 style="text-align: center">{{this.gysmc}}</h2>
            <el-form  style="margin-top: 20px" label-width="140px" label-position='left'>
                <el-form-item label="时间">
                    <el-date-picker
                            v-model="totalcomment.pjnf"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="承包范围">
                    <el-input v-model="totalcomment.cbfw" type="textarea" :rows="2"></el-input>
                </el-form-item>
                <el-form-item label="承包项目情况">
                    <el-input v-model="totalcomment.cdxmqk" type="textarea" :rows="2"></el-input>
                </el-form-item>
                <el-form-item label="违章整改情况">
                    <el-input v-model="totalcomment.wzqk" type="textarea" :rows="2"></el-input>
                </el-form-item>
                <el-table
                        :data="pjbgData2"
                        style="width: 100%">
                    <el-table-column
                            prop="nr"
                            label="考核内容"
                            width="370">
                    </el-table-column>
                    <el-table-column label="考核评分">
                        <el-table-column
                                label="工程技术部"
                                width="120">
                            <template slot-scope="scope">
                                <el-input  :id="scope.row.id+scope.column.label"  type="number"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="粮油操作部"
                                width="120">
                            <template slot-scope="scope">
                                <el-input :id="scope.row.id+scope.column.label" type="number"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="煤矿操作部"
                                width="120">
                            <template slot-scope="scope">
                                <el-input :id="scope.row.id+scope.column.label" type="number"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="项目委员会（办公室）"
                                width="150">
                            <template slot-scope="scope">
                                <el-input :id="scope.row.id+scope.column.label" type="number"></el-input>
                            </template>
                        </el-table-column>
                    </el-table-column>
                </el-table>
                <el-form-item style="margin-top: 15px" label="工程技术部考评人">
                    <el-input style="width: 215px;margin-right: 120px" v-model="totalcomment.gcjsbkpr"></el-input>
                    &nbsp&nbsp&nbsp&nbsp粮油操作部考评人&nbsp&nbsp&nbsp&nbsp
                    <el-input style="width: 215px" v-model="totalcomment.lyczbkpr"></el-input>
                </el-form-item>
                <el-form-item label="煤矿操作部考评人">
                    <el-input  style="width: 215px;margin-right: 120px" v-model="totalcomment.mkczbkpr"></el-input>
                    &nbsp&nbsp&nbsp&nbsp项目委员会考评人&nbsp&nbsp&nbsp&nbsp
                    <el-input style="width: 215px" v-model="totalcomment.xmwyhkpr"></el-input>
                </el-form-item>
                <el-form-item style="margin-top: 10px" label="工程技术部意见">
                    <el-input v-model="totalcomment.gcjsbyj" type="textarea" :rows="2"></el-input>
                </el-form-item>
                <el-form-item label="项目管理委员会意见">
                    <el-input v-model="totalcomment.xmglwyhyj" type="textarea" :rows="2"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="show_tjpj=false">取消</el-button>
                 <el-button type="primary" @click="ljcj">立即创建</el-button>
            </span>
        </el-dialog>

        <!--总评价弹窗 -->
        <el-dialog title="总评价" :close-on-click-modal="false" :visible.sync="show_zpj" width="952px">
            <el-button type="primary" @click="show_tjpj=true">新增评价</el-button>
            <el-table
                    @row-dblclick="xxpj"
                    :data="zpj"
                    height="250"
                    border
                    style="width: 100%">
                <el-table-column
                        fixed
                        prop="pjnf"
                        label="评价年份"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="gcjsbzf"
                        label="工程技术部总分"
                        width="105">
                </el-table-column>
                <el-table-column
                        prop="lyczbzf"
                        label="粮油操作部总分"
                        width="105">
                </el-table-column>
                <el-table-column
                        prop="mkczbzf"
                        label="煤矿操作部总分"
                        width="105">
                </el-table-column>
                <el-table-column
                        prop="xmwyhzf"
                        label="项目委员会总分"
                        width="105">
                </el-table-column>
                <el-table-column
                        prop="cbfw"
                        label="承包范围"
                        width="180">
                </el-table-column>
                <el-table-column
                    prop="cdxmqk"
                    label="承担项目情况"
                    width="180">
                </el-table-column>
                <el-table-column
                        prop="wzqk"
                        label="违章情况"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="gcjsbkpr"
                        label="工程技术部考评人"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="lyczbkpr"
                        label="粮油操作部考评人"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="mkczbkpr"
                        label="煤矿操作部考评人"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="xmwyhkpr"
                        label="项目委员会考评人"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="gcjsbyj"
                        label="工程技术部意见"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="xmglwyhyj"
                        label="项目管理委员会意见"
                        width="130">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        prop="zhdf"
                        label="综合得分">
                </el-table-column>
            </el-table>
        </el-dialog>

    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name:'gysgl',
        inject:['reload'],
        data(){
            return {
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                //评价报告
                pjbgData: [{
                    nr:'1、提供优质原装配件，在没有原装配件情况下能提供合适配件，并确保配件质量。（10）',
                    gcjsb: '',
                    lyczb: '',
                    mkczb: '',
                    xmwyh: ''
                }, {
                    nr:'2、能根据实际制订合理维修方案和科学维修工艺，确保维修质量。（10）',
                    gcjsb: '',
                    lyczb: '',
                    mkczb: '',
                    xmwyh: ''
                }, {
                    nr:'3、施工队伍技术水平稳定工程质量可靠，返修率低。（10）',
                    gcjsb: '',
                    lyczb: '',
                    mkczb: '',
                    xmwyh: ''
                }, {
                    nr:'1、在港区施工的项目能提前做好准备工作，及时办理各项开工手续。（5）',
                    gcjsb: '',
                    lyczb: '',
                    mkczb: '',
                    xmwyh: ''
                }, {
                    nr:'2、能针对项目制订安全、环保措施，并严格遵守（7）',
                    gcjsb: '',
                    lyczb: '',
                    mkczb: '',
                    xmwyh: ''
                }, {
                    nr:'3、严格遵守港区安全规定，文明施工。（8，违章整改占项目比例每10%扣1分，类推）',
                    gcjsb: '',
                    lyczb: '',
                    mkczb: '',
                    xmwyh: ''
                }, {
                    nr:'1、项目实施前能根据实际提前制订施工计划。（7）',
                    gcjsb: '',
                    lyczb: '',
                    mkczb: '',
                    xmwyh: ''
                },{
                    nr:'2、能根据现场生产需要，按项目部门的安排及时进场施工（10）',
                    gcjsb: '',
                    lyczb: '',
                    mkczb: '',
                    xmwyh: ''
                },{
                    nr:'3、施工过程能按计划控制进度，在保证项目质量、安全的情况下提前或按时完工。（8）',
                    gcjsb: '',
                    lyczb: '',
                    mkczb: '',
                    xmwyh: ''
                },{
                    nr:'1、完工后能主动跟踪项目在使用中的情况，并为使用中的问题提供合理建议。（4）',
                    gcjsb: '',
                    lyczb: '',
                    mkczb: '',
                    xmwyh: ''
                },{
                    nr:'2、在保修期内对存在问题能迅速响应，快速解决问题。（6）',
                    gcjsb: '',
                    lyczb: '',
                    mkczb: '',
                    xmwyh: ''
                },{
                    nr:'1、对发给的招标项目能积极响应，并按要求投标（5，每发生1次投标不规范扣1分）',
                    gcjsb: '',
                    lyczb: '',
                    mkczb: '',
                    xmwyh: ''
                 },{
                    nr:'2、对我方临时提出的抢修项目能积极配合抢修。（10）',
                    gcjsb: '',
                    lyczb: '',
                    mkczb: '',
                    xmwyh: ''
                }
                ],

                //评价报告
                pjbgData2: [{
                    id:'1',
                    nr:'1、提供优质原装配件，在没有原装配件情况下能提供合适配件，并确保配件质量。（10）',
                }, {
                    id:'2',
                    nr:'2、能根据实际制订合理维修方案和科学维修工艺，确保维修质量。（10）',
                }, {
                    id:'3',
                    nr:'3、施工队伍技术水平稳定工程质量可靠，返修率低。（10）',
                }, {
                    id:'4',
                    nr:'1、在港区施工的项目能提前做好准备工作，及时办理各项开工手续。（5）',
                }, {
                    id:'5',
                    nr:'2、能针对项目制订安全、环保措施，并严格遵守（7）',
                }, {
                    id:'6',
                    nr:'3、严格遵守港区安全规定，文明施工。（8，违章整改占项目比例每10%扣1分，类推）',
                }, {
                    id:'7',
                    nr:'1、项目实施前能根据实际提前制订施工计划。（7）',
                },{
                    id:'8',
                    nr:'2、能根据现场生产需要，按项目部门的安排及时进场施工（10）',
                },{
                    id:'9',
                    nr:'3、施工过程能按计划控制进度，在保证项目质量、安全的情况下提前或按时完工。（8）',
                },{
                    id:'10',
                    nr:'1、完工后能主动跟踪项目在使用中的情况，并为使用中的问题提供合理建议。（4）',
                },{
                    id:'11',
                    nr:'2、在保修期内对存在问题能迅速响应，快速解决问题。（6）',
                },{
                    id:'12',
                    nr:'1、对发给的招标项目能积极响应，并按要求投标（5，每发生1次投标不规范扣1分）',
                },{
                    id:'13',
                    nr:'2、对我方临时提出的抢修项目能积极配合抢修。（10）',
                }
                ],
                //
                ip: 'http://10.197.41.100:8080',
                //添加评价弹窗
                show_tjpj:false,
                //添加供应商弹窗
                show_tjgys:false,
                //评价报告弹窗
                show_pjbg:false,
                //编辑供应商弹窗
                show_bjgys:false,
                //总评价弹窗
                show_zpj:false,
                //总评价
                zpj:[],
                scores:[],
                score:{
                    id:'',
                    sid:'',
                    pfnf:'',
                    khnr:'',
                    khbm:'',
                    pf:''
                },
                gysmc:'',
                supplier:{
                    id:'',
                    name:'',
                    code:'',
                    phone:'',
                    mobile:'',
                    contact:'',
                    fax:'',
                    email:'',
                    address:'',
                },
                suppliers:[{
                    id: '1',
                    name: '2',
                    code: '3',
                    phone: '4',
                    mobile: '5',
                    contact: '6',
                    fax: '7',
                    email: '8',
                    address: '9'
                }],
                totalcomment:{
                    id:'',
                    sid:'',
                    cbfw:'',
                    cdxmqk:'',
                    wzqk:'',
                    pjnf:'',
                    gcjsbzf:0,
                    gcjsbkpr:'',
                    lyczbzf:0,
                    lyczbkpr:'',
                    mkczbzf:0,
                    mkczbkpr:'',
                    xmwyhzf:0,
                    xmwyhkpr:'',
                    gcjsbyj:'',
                    xmglwyhyj:'',
                    zhdf:0
                },
                nr:['内容一','内容二','内容三','内容四']
            }
        },
        created(){
            this.getAllsuppliers()
        },
        methods: {
            //绑定函数
            bdhs(khnr,khbm){
                let id=khnr+khbm
                let pf=document.getElementById(id).value
                let score={
                    khnr:khnr,
                    khbm:khbm,
                    pf:pf
                }
                this.scores.push(score)
            },
            //立即创建
            ljcj(){
                for(let i=1;i<14;i++){
                    for(let j=1;j<5;j++){
                        let khnr=i
                        let khbm=''
                        if(j==1)
                            khbm='工程技术部'
                        else if(j==2)
                            khbm='粮油操作部'
                        else if(j==3)
                            khbm='煤矿操作部'
                        else
                            khbm='项目委员会（办公室）'
                        this.bdhs(khnr,khbm)
                    }
                }
                //外面表
                for(let i=0;i<52;i++){
                    if(this.scores[i].khbm==='工程技术部')
                        this.totalcomment.gcjsbzf=this.totalcomment.gcjsbzf+Number(this.scores[i].pf)
                    else if(this.scores[i].khbm==='粮油操作部')
                        this.totalcomment.lyczbzf=this.totalcomment.lyczbzf+Number(this.scores[i].pf)
                    else if(this.scores[i].khbm==='煤矿操作部')
                        this.totalcomment.mkczbzf=this.totalcomment.mkczbzf+Number(this.scores[i].pf)
                    else
                        this.totalcomment.xmwyhzf=this.totalcomment.xmwyhzf+Number(this.scores[i].pf)
                }
                this.totalcomment.zhdf=(this.totalcomment.gcjsbzf+this.totalcomment.lyczbzf+this.totalcomment.mkczbzf+this.totalcomment.xmwyhzf)/4
                //插外面大表，返回大表id
                axios.post(this.ip+'/supplier/addZtpj',this.totalcomment)
                    .then(res=>{
                        //插里面小表数组
                        let qq = []
                        for(let i=0;i<52;i++){
                            this.scores[i].sid=res.data
                            this.scores[i].pfnf=this.totalcomment.pjnf
                            this.scores[i].id=''
                            qq.push(axios.post(this.ip+'/supplier/addScore',this.scores[i]))
                        }
                        axios.all(qq)
                            .then(axios.spread((acct, perms)=>{
                                this.$message.success("创建成功！")
                                this.reload()
                            }))
                            .catch(()=>{
                                this.$message.success("创建失败！")
                                this.show_tjpj=false
                            })
                    })

            },

            //评价报告
            xxpj(row){
                this.show_pjbg=true
                axios.get(this.ip+'/supplier/cxfs',{
                    params:{
                        tid:row.id
                    }
                })
                    .then(res=>{
                        let gcjsb=[]
                        let lyczb=[]
                        let mkczb=[]
                        let xmwyh=[]  // 项目委员会（办公室
                        for(let i=0;i<res.data.length;i++){//工程技术部所有评分拿出来
                            if(res.data[i].khbm==='工程技术部'){
                                gcjsb.push(res.data[i].pf)
                            }else if(res.data[i].khbm==='粮油操作部'){
                                lyczb.push(res.data[i].pf)
                            }else if(res.data[i].khbm==='煤矿操作部'){
                                mkczb.push(res.data[i].pf)
                            }else {
                                xmwyh.push(res.data[i].pf)
                            }
                        }
                        for(let i=0;i<13;i++){
                            this.pjbgData[i].gcjsb=gcjsb[i]
                            this.pjbgData[i].lyczb=lyczb[i]
                            this.pjbgData[i].mkczb=mkczb[i]
                            this.pjbgData[i].xmwyh=xmwyh[i]
                        }
                    })
            },
            //删除供应商
            deleteGys(index,row){
                this.$confirm('此操作将永久删除该供应商, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.get(this.ip+'/supplier/deleteSupplier',{
                        params:{
                            sid:row.id
                        }
                    })
                        .then(res=>{
                            if(res.data){
                                this.$message.success("删除成功！")
                                this.suppliers.splice(index,1)
                            }else{
                                this.$message.error("删除失败！")
                            }
                        })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //确定编辑供应商
            qdbjgys(){
                axios.post(this.ip+'/supplier/updateSupplier',this.supplier)
                    .then(res=>{
                        if(res.data)
                            this.$message.success('修改成功！')
                        this.getAllsuppliers()
                    })
                this.show_bjgys=false
            },
            //编辑供应商
            editGys(index,row){
                this.supplier=row
                this.show_bjgys=true
            },
            //确定添加供应商
            qdtjgys(){
                axios.post(this.ip+'/supplier/addSupplier',this.supplier)
                    .then(res=>{
                        this.supplier.id=res.data
                        this.suppliers.push(this.supplier)
                    })
                this.show_tjgys=false
            },
            //拿到所有供应商
            getAllsuppliers(){
                axios.get(this.ip+'/supplier/getAllSuppliers')
                    .then(res=>{
                        this.suppliers=res.data
                    })
            },
            //双击供应商
            sjgys(row){
                this.totalcomment.sid=row.id
                this.gysmc=row.name
                this.show_zpj=true
                this.zpj=[]
                axios.get(this.ip+'/supplier/cxsypj',{
                    params:{
                        sid:row.id
                    }
                })
                    .then(res=>{
                        this.zpj=res.data
                    })
            },
            //供应商名称搜索
            gysmcSearch(){
                axios.get(this.ip+'/supplier/gysmcss',{
                    params:{
                        name:this.gysmc
                    }
                })
                    .then(res=>{
                        if(res.data.length==0)
                            this.$message.error("没有查询到相关数据！")
                        else
                            this.suppliers=res.data
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
