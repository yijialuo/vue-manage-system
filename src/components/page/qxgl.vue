<template>
    <div>
        <div class="table">
            <div class="crumbs">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item><i class="el-icon-lx-warn"></i> 账号管理</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="container">
                <div class="handle-box">
                    <el-button type="primary" icon="delete" class="handle-del mr10"
                               @click="visible=true;userOV.passWord='111'">新建用户
                    </el-button>
                    <br/>
                    <el-input placeholder="姓名" v-model="searchName" clearable style="width: 200px;margin-top: 5px"
                              class="handle-input mr10">
                    </el-input>
                    <el-button style="margin-left: 10px" type="primary" icon="el-icon-search" @click="userSearchBt">搜索
                    </el-button>
                </div>
                <el-table :data="users" height="500px" border class="table">
                    <el-table-column prop="userId" label="账号">
                    </el-table-column>
                    <el-table-column prop="userName" label="姓名">
                    </el-table-column>
                    <el-table-column v-if="userId==='admin'" prop="passWord" label="密码">
                    </el-table-column>
                    <el-table-column prop="departmentName" sortable label="部门">
                    </el-table-column>
                    <el-table-column prop="groupName" label="职位">
                    </el-table-column>
                    <el-table-column prop="sfzf" label="是否作废">
                    </el-table-column>
                    <el-table-column label="管理类型">
                        <template slot-scope="scope">
                            <span>{{ scope.row.manageType | filterManageType }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="180" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" icon="el-icon-edit" @click="editUser( scope.row)">编辑
                            </el-button>
                            <el-button v-if="userId==='admin'" type="text" icon="el-icon-delete" class="red"
                                       @click="deleteUser( scope.row)">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <!--新建用户弹窗-->
            <el-dialog v-dialogDrag title="新建用户" :close-on-click-modal="false" center :visible.sync="visible"
                       width="408px">
                <div class="demo-input-suffix">
                    账号：
                    <el-input v-model="userOV.userId"></el-input>
                </div>
                <div class="demo-input-suffix" style="margin-top: 10px">
                    姓名：
                    <el-input v-model="userOV.userName"></el-input>
                </div>
                <div v-if="userId==='admin'" class="demo-input-suffix" style="margin-top: 10px">
                    密码：
                    <el-input v-model="userOV.passWord"></el-input>
                </div>
                <div class="demo-input-suffix" style="margin-top: 10px">
                    部门：
                    <el-select v-model="userOV.departmentId" placeholder="请选择">
                        <el-option
                                v-for="item in department_options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="demo-input-suffix" style="margin-top: 10px">
                    职位：
                    <el-select v-model="userOV.groupId" multiple placeholder="请选择">
                        <el-option
                                v-for="item in group_options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <!--是工程技术部的技术部办事员或技术部主管经理或者分管副总显示-->
                <div class="demo-input-suffix"
                     v-if="userOV.departmentId=='20190123022801622'&&(userOV.groupId.indexOf('jsb_doman')!=-1||userOV.groupId.indexOf('jsb_zgjl')!=-1)||userOV.groupId.indexOf('fgfz')!=-1"
                     style="margin-top: 10px;width: 100%;">
                    管理类型：
                    <el-select v-model="userOV.manageType" multiple placeholder="请选择">
                        <el-option
                                v-for="item in manageTypes"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="visible = false">取 消</el-button>
                <el-button type="primary" @click="confirm_user">确 定</el-button>
            </span>
            </el-dialog>

            <!-- 编辑弹出框 -->
            <el-dialog title="编辑账号" :close-on-click-modal="false" :visible.sync="editVisible" width="408px">
                <el-form ref="form" :model="form" label-width="50px">
                    <el-form-item label="账号">
                        <el-input v-model="form.userId"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名">
                        <el-input v-model="form.userName"></el-input>
                    </el-form-item>
                    <el-form-item v-if="userId==='admin'" label="密码">
                        <el-input v-model="form.passWord"></el-input>
                    </el-form-item>
                    <el-form-item label="部门">
                        <el-select v-model="form.departmentId" placeholder="请选择">
                            <el-option
                                    v-for="item in department_options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="职位">
                        <el-select v-model="form.groupId" multiple placeholder="请选择">
                            <el-option
                                    v-for="item in group_options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <!--有管理类型才显示-->
                    <div class="demo-input-suffix"
                         v-if="form.departmentId=='20190123022801622'&&(form.groupId.indexOf('jsb_doman') !=-1||form.groupId.indexOf('jsb_zgjl') !=-1)||form.groupId.indexOf('fgfz')!=-1"
                         style="margin-top: 10px;width: 100%;">
                        管理类型：
                        <el-select v-model="form.manageType" multiple placeholder="请选择">
                            <el-option
                                    v-for="item in manageTypes"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
            </el-dialog>

            <!-- 删除提示框 -->
            <el-dialog title="提示" :close-on-click-modal="false" :visible.sync="delVisible" width="300px" center>
                <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
            </el-dialog>
        </div>
        <div class="table">
            <div class="crumbs">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item><i class="el-icon-lx-warn"></i>部门职位</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="container">
                <div class="handle-box">
                    <el-button type="primary" icon="delete" class="handle-del mr10" @click="show_addDepartment=true">
                        添加部门
                    </el-button>
                    <el-button type="primary" v-if="userId==='admin'" icon="delete" class="handle-del mr10"
                               @click="show_addGroup=true">添加职位
                    </el-button>
                </div>
                <el-table :data="departments" border style="margin-top: 20px">
                    <el-table-column prop="dCod" label="部门编号" width="150">
                    </el-table-column>
                    <el-table-column prop="dNam" label="部门名字" width="150">
                    </el-table-column>
                    <el-table-column label="操作" width="180" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" icon="el-icon-edit"
                                       :disabled="scope.row.id=='20190125102616787'||scope.row.id=='20190123022801622'"
                                       @click="edit_department(scope.$index, scope.row)">
                                编辑
                            </el-button>
                            <el-button type="text" icon="el-icon-delete" class="red" v-if="userId==='admin'"
                                       :disabled="scope.row.id=='20190125102616787'||scope.row.id=='20190123022801622'"
                                       @click="delete_department(scope.$index, scope.row)">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <el-table :data="groups" border style="margin-top: 20px">
                    <el-table-column prop="code" label="职位编号" width="150">
                    </el-table-column>
                    <el-table-column prop="id" label="职位ID" width="150">
                    </el-table-column>
                    <el-table-column prop="name" label="职位名字" width="150">
                    </el-table-column>
                </el-table>

                <!-- 添加职位弹出框 -->
                <el-dialog title="添加职位" :close-on-click-modal="false" :visible.sync="show_addGroup" width="408px">
                    <el-form ref="form" :model="group" label-width="80px">
                        <el-form-item label="职位编号">
                            <el-input v-model="group.code"></el-input>
                        </el-form-item>
                        <el-form-item label="职位ID">
                            <el-input v-model="group.id"></el-input>
                        </el-form-item>
                        <el-form-item label="职位名称">
                            <el-input v-model="group.name"></el-input>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                <el-button @click="show_addGroup = false">取 消</el-button>
                <el-button type="primary" @click="confirm_addGroup">确 定</el-button>
            </span>
                </el-dialog>

                <!-- 添加部门弹出框 -->
                <el-dialog title="添加部门" :close-on-click-modal="false" :visible.sync="show_addDepartment" width="408px">
                    <el-form ref="form" :model="department" label-width="80px">
                        <el-form-item label="部门编号">
                            <el-input v-model="department.dCod"></el-input>
                        </el-form-item>
                        <el-form-item label="部门名称">
                            <el-input v-model="department.dNam"></el-input>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                <el-button @click="show_addDepartment = false">取 消</el-button>
                <el-button type="primary" @click="saveDepartment">确 定</el-button>
            </span>
                </el-dialog>

                <!-- 编辑部门弹出框 -->
                <el-dialog title="编辑部门" :close-on-click-modal="false" :visible.sync="show_editDepartment" width="408px">
                    <el-form ref="form" :model="department" label-width="80px">
                        <el-form-item label="部门编号">
                            <el-input v-model="department.dCod"></el-input>
                        </el-form-item>
                        <el-form-item label="部门名称">
                            <el-input v-model="department.dNam"></el-input>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                <el-button @click="cancel_edit">取 消</el-button>
                <el-button type="primary" @click="confirm_edit">确 定</el-button>
            </span>
                </el-dialog>
                <!-- 编辑职位弹出框 -->
                <el-dialog title="编辑职位" :close-on-click-modal="false" :visible.sync="show_editGroup" width="408px">
                    <el-form ref="form" :model="group" label-width="80px">
                        <el-form-item label="职位编号">
                            <el-input v-model="group.code"></el-input>
                        </el-form-item>
                        <el-form-item label="部门名称">
                            <el-input v-model="group.name"></el-input>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="cancel_editgroup">取 消</el-button>
                        <el-button type="primary" @click="confirm_editgroup">确 定</el-button>
                    </span>
                </el-dialog>
            </div>
        </div>
        <div class="table" v-if="userId==='admin'">
            <div class="crumbs">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item><i class="el-icon-lx-warn"></i>阈值</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="container">
                <el-table :data="zjhfz" border style="margin-top: 20px">
                    <el-table-column prop="fz" label="总经会阈值" width="150">
                    </el-table-column>
                    <el-table-column label="操作" width="180" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" icon="el-icon-edit"
                                       @click="edit_zjhfz(scope.row)">
                                修改
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>

        <div class="table">
            <div class="crumbs">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item><i class="el-icon-lx-warn"></i>机种</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="container">
                <div class="handle-box">
                    <el-button type="primary" class="handle-del mr10" @click="show_addjz=true,jz=''">添加机种
                    </el-button>
                </div>
                <el-table :data="jzs" border style="margin-top: 20px">
                    <el-table-column prop="jzmc" label="机种" width="150">
                    </el-table-column>
                    <el-table-column label="操作" width="180" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" icon="el-icon-edit"
                                       @click="del_jz(scope.row,scope.$index)">
                                删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <!-- 添加机种弹出框 -->
            <el-dialog title="添加机种" :close-on-click-modal="false" :visible.sync="show_addjz" width="380px">
                <el-form label-width="80px" :model="bcwj">
                    <el-form-item label="机种名称:">
                        <el-input v-model="jz"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                        <el-button @click="show_addjz=false">取 消</el-button>
                        <el-button type="primary" @click="addjz">确 定</el-button>
                    </span>
            </el-dialog>
        </div>

        <div class="table">
            <div class="crumbs">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item><i class="el-icon-lx-warn"></i>必传文件</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="container">
                <div class="handle-box">
                    <el-button type="primary" icon="delete" class="handle-del mr10" @click="show_addbcwj=true">添加必传文件
                    </el-button>
                </div>
                <el-table :data="bcwjs" border style="margin-top: 20px">
                    <el-table-column prop="lc" sortable label="流程" width="150">
                    </el-table-column>
                    <el-table-column prop="jd" label="节点" width="100">
                    </el-table-column>
                    <el-table-column prop="wjmc" label="文件名称" width="110">
                    </el-table-column>
                    <el-table-column label="操作" width="180" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" icon="el-icon-edit"
                                       @click="edit_bcwj(scope.row)">
                                修改
                            </el-button>
                            <el-button type="text" class="red" icon="el-icon-delete"
                                       @click="delete_bcwj(scope.row)">
                                删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>

        <div class="table">
            <div class="crumbs">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item><i class="el-icon-lx-warn"></i>交接</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="container">
                <div class="handle-box">
                    <el-button type="primary" class="handle-del mr10" @click="showDt=true;dt={}">新增交接
                    </el-button>
                </div>
                <el-table :data="dts" border style="margin-top: 20px">
                    <el-table-column prop="username" label="当前人" width="150">
                    </el-table-column>
                    <el-table-column prop="dtusername" label="被交接人" width="150">
                    </el-table-column>
                    <el-table-column label="操作" width="180" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" icon="el-icon-edit"
                                       @click="detDt(scope.row)">
                                删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <!-- 添加机种弹出框 -->
            <el-dialog title="添加交接" :close-on-click-modal="false" :visible.sync="showDt" width="500px">
                <el-form label-width="160px">
                    <el-form-item label="用户">
                        <el-select filterable v-model="dt.userid" placeholder="请选择用户">
                            <el-option
                                    v-for="item in selectLabelUser"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="被代替用户（原用户）">
                        <el-select filterable v-model="dt.dtuserid" placeholder="请选择用户">
                            <el-option
                                    v-for="item in selectLabelUser"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                        <el-button @click="showDt=false">取 消</el-button>
                        <el-button type="primary" @click="adddt">确 定</el-button>
                    </span>
            </el-dialog>

            <!-- 添加机种弹出框 -->
            <el-dialog title="添加机种" :close-on-click-modal="false" :visible.sync="show_addjz" width="380px">
                <el-form label-width="80px" :model="bcwj">
                    <el-form-item label="机种名称:">
                        <el-input v-model="jz"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                        <el-button @click="show_addjz=false">取 消</el-button>
                        <el-button type="primary" @click="addjz">确 定</el-button>
                    </span>
            </el-dialog>
        </div>

        <!-- 添加必传文件弹出框 -->
        <el-dialog title="添加必传文件记录" :close-on-click-modal="false" :visible.sync="show_addbcwj" width="380px">
            <el-form label-width="80px" :model="bcwj">
                <el-form-item label="流程:">
                    <el-select v-model="bcwj.lc" placeholder="请选择流程">
                        <el-option
                                v-for="item in lcs"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="节点:">
                    <el-select v-model="bcwj.jd" placeholder="请选择节点">
                        <el-option
                                v-for="item in jds"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="文件名称:">
                    <el-input v-model="bcwj.wjmc"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                        <el-button @click="show_addbcwj=false">取 消</el-button>
                        <el-button type="primary" @click="addBcwj">确 定</el-button>
                    </span>
        </el-dialog>

        <!-- 编辑总经会阀值弹出框 -->
        <el-dialog title="编辑总经会阀值" :close-on-click-modal="false" :visible.sync="show_zjhfz" width="200px">
            <el-form label-width="80px">
                <el-form-item label="阀值">
                    <el-input v-model="fz"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                        <el-button @click="show_zjhfz=false">取 消</el-button>
                        <el-button type="primary" @click="qdxgzjhfz">确 定</el-button>
                    </span>
        </el-dialog>
    </div>

</template>

<script>
    import axios from 'axios'

    export default {
        inject: ['reload'],
        name: 'account',
        data: function () {
            return {
                userId: localStorage.getItem('userId'),
                fz: '',
                //总经会阀值
                zjhfz: [],
                ip: 'http://10.197.33.115:8080',
                //添加必传文件
                show_addbcwj: false,
                selectLabelUser: [],
                //添加机种
                show_addjz: false,
                showDt: false,
                editVisible: false,
                user: {},
                userOV: {
                    userId: '',
                    userName: '',
                    passWord: '',
                    groupId: [],
                    groupName: [],
                    departmentId: '',
                    departmentName: '',
                    manageType: []
                },
                users: [],
                alluser: [],
                //添加用户
                visible: false,
                //删除用户
                delVisible: false,
                //总经会阀值修改弹窗
                show_zjhfz: false,
                group_options: [],
                department_options: [],
                //流程下拉
                lcs: [
                    {
                        label: '前期',
                        value: '前期'
                    }, {
                        label: '招标',
                        value: '招标'
                    }, {
                        label: '合同',
                        value: '合同'
                    }
                ],
                //节点下拉
                jds: [],
                manageTypes: [
                    {
                        label: '土建',
                        value: '土建'
                    },
                    {
                        label: '设备',
                        value: '设备'
                    },
                    {
                        label: '物资',
                        value: '物资'
                    },
                    {
                        label: '信息',
                        value: '信息'
                    },

                ],
                form: {
                    userId: '',
                    userName: '',
                    passWord: '',
                    groupId: [],
                    departmentId: '',
                    manageType: []
                },
                idx: -1,
                show_addDepartment: false,
                show_editDepartment: false,
                show_addGroup: false,
                show_editGroup: false,
                department: {
                    dCod: '',
                    dNam: '',
                    id: ''
                },
                departments: [],
                group: {
                    id: '',
                    name: '',
                    code: ''
                },
                bcwjs: [],
                groups: [],
                searchName: '',
                bcwj: {
                    id: '',
                    lc: '',
                    jd: '',
                    wjmc: ''
                },
                //机种列表
                jzs: [],
                //代替表
                dts: [],
                dt: {},
                //机种
                jz: ''
            }
        },
        created() {
            this.getAllusers();
            this.getGroup_options();
            this.getDepartment_optins();
            this.getAlldepartment()
            this.getAllgroup()
            //拿总经会阀值
            this.getZjhfz()
            //拿毕传文件
            this.getBcwjs()
            //拿机种
            this.getjzs()
            //拿交接
            this.getdts()
            //所有用户下拉
            this.selectLabelUsers()
        },
        computed: {
            lc() {
                return this.bcwj.lc
            },
        },

        watch: {
            lc(newValue, oldValue) {
                this.bcwj.jd = ''
                if (newValue === '前期') {
                    this.getJd('lxsp')
                } else if (newValue === '招标') {
                    this.getJd('zbsp')
                } else {//合同
                    this.getJd('htsp')
                }
            },

            visible(newValue, oldValue) {
                if (newValue == true) {

                }
            },
        },
        filters: {// 过滤、格式化
            filterManageType: function (value) {//时间格式化，"2018-10-21T17:20:16.000+0000"的需要进行格式化
                if (value != null)
                    return value.toString()
                return null
            }
        },
        methods: {
            //账号搜索
            userSearchBt() {
                if (this.searchName == null || this.searchName === '') {
                    this.users = this.alluser
                    return
                }
                this.users = this.alluser.filter(item => {
                    return item.userName.indexOf(this.searchName) != -1
                })
            },

            detDt(row) {
                this.$confirm('确定删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.post(this.ip + '/dt/delete', row)
                        .then(res => {
                            if (res.data) {
                                this.$message.success("删除成功！")
                                this.getdts()
                            } else {
                                this.$message.error("删除失败！")
                            }
                        })
                }).catch(() => {
                })
            },

            //添加代替
            adddt() {
                axios.post(this.ip + '/dt/insert', this.dt)
                    .then(res => {
                        if (res.data) {
                            this.$message.success("添加成功！")
                            this.getdts()
                            this.showDt = false
                        } else {
                            this.$message.error("添加失败！")
                        }
                    })
            },

            //添加机种
            addjz() {
                axios.get(this.ip + '/jz/addJz', {
                    params: {
                        jz: this.jz
                    }
                }).then(res => {
                    if (res.data) {
                        this.$message.success("添加成功！")
                        this.jzs.push({
                            jzmc: this.jz
                        })
                    } else {
                        this.$message.error("添加失败！")
                    }
                    this.show_addjz = false
                })
            },

            selectLabelUsers() {
                axios.get(this.ip + '/user/selectLabelUsers', {
                    params: {
                        userId: localStorage.getItem('userId'),
                        passWord: localStorage.getItem('passWord')
                    }
                })
                    .then(res => {
                        if (res.data) {
                            this.selectLabelUser = res.data
                        }
                    })
            },

            //拿代替
            getdts() {
                axios.get(this.ip + '/dt/select', {params: {}})
                    .then(res => {
                        console.log(res.data)
                        this.dts = res.data
                    })
            },

            //拿机种
            getjzs() {
                axios.get(this.ip + '/jz/getAll')
                    .then(res => {
                        this.jzs = res.data;
                    })
            },

            //删除机种
            del_jz(row, index) {
                axios.get(this.ip + '/jz/delJz', {
                    params: {
                        jz: row.jzmc
                    }
                }).then(res => {
                    if (res.data) {
                        this.$message.success("删除成功！")
                        this.jzs.splice(index, 1);
                    } else {
                        this.$message.error("删除失败！")
                    }
                })
            },

            //拿节点
            getJd(lc) {
                axios.get(this.ip + "/process/getJd", {
                    params: {
                        lc: lc
                    }
                }).then(res => {
                    if (res.data) {
                        this.jds = []
                        for (let i = 0; i < res.data.length; i++) {
                            this.jds.push({
                                value: res.data[i],
                                label: res.data[i]
                            })
                        }
                    }
                })
            },

            //插入必传文件数据
            addBcwj() {
                axios.get(this.ip + '/bcwj/insert', {
                    params: this.bcwj
                }).then(res => {
                    if (res.data) {
                        this.bcwj.id = res.data
                        this.bcwjs.push(this.bcwj)
                        this.bcwj = {
                            id: '',
                            lc: '',
                            jd: '',
                            wjmc: ''
                        }
                        this.show_addbcwj = false
                    }
                })
            },

            //拿所有的毕传文件
            getBcwjs() {
                axios.get(this.ip + '/bcwj/select')
                    .then(res => {
                        this.bcwjs = res.data;
                    })
            },

            //编辑必传文件
            edit_bcwj() {

            },

            //删除毕传文件
            delete_bcwj(row) {
                axios.get(this.ip + '/bcwj/delete', {
                    params: {
                        id: row.id
                    }
                }).then(res => {
                    if (res.data) {
                        this.$message.success("删除成功！")
                        this.removeByValue(this.bcwjs, row)
                    } else {
                        this.$message.error("删除失败！")
                    }
                })
            },

            //删除数组中指定元素
            removeByValue(arr, val) {
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].id === val.id) {
                        arr.splice(i, 1);
                        break;
                    }
                }
            },

            //确定修改总经会阀值
            qdxgzjhfz() {
                this.$confirm('此操作将修改总经会阀值,是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.get(this.ip + '/zjhfz/updata', {
                        params: {
                            fz: this.fz
                        }
                    }).then(res => {
                        if (res.data) {
                            this.$message.success("修改成功！")
                            this.show_zjhfz = false
                            this.zjhfz[0].fz = this.fz
                            this.$set(this.zjhfz, 0, this.zjhfz[0]);
                        } else {
                            this.$message.error("修改失败！")
                        }
                    })
                })
                    .catch(() => {
                    })
            },

            getZjhfz() {
                axios.get(this.ip + '/zjhfz/get')
                    .then(res => {
                        this.zjhfz = res.data
                    })
            },

            //总经会阀值修改
            edit_zjhfz(row) {
                this.fz = row.fz
                this.show_zjhfz = true
            },

            getDepartment_optins() {
                axios.get(this.ip + '/department/getAllDepartment')
                    .then(res => {
                        if (res.data) {
                            for (let i = 0; i < res.data.length; i++) {
                                this.department_options.push({
                                    value: res.data[i].id,
                                    label: res.data[i].dNam
                                })
                            }
                        }
                    })
            },
            getGroup_options() {
                axios.get(this.ip + '/group/getallgroup')
                    .then(res => {
                        if (res.data)
                            for (let i = 0; i < res.data.length; i++) {
                                this.group_options.push({
                                    value: res.data[i].id,
                                    label: res.data[i].name
                                })
                            }
                    })
            },
            //删除用户
            deleteRow() {
                axios.get(this.ip + '/user/deleteuser', {
                    params: {
                        userId: this.user.userId
                    }
                })
                    .then(res => {
                        if (res.data) {
                            //this.users.splice(this.idx, 1);
                            this.$message.success('删除成功');
                            this.getAllusers();
                            this.delVisible = false;
                        }
                    })
            },
            editUser(row) {

                this.form = {
                    userId: row.userId,
                    userName: row.userName,
                    passWord: row.passWord,
                    groupId: row.groupId,
                    departmentId: row.departmentId,
                    manageType: row.manageType ? row.manageType : []
                }
                this.editVisible = true;
            },
            deleteUser(row) {
                this.user = row;
                this.delVisible = true;
            },
            getAllusers() {
                axios.get(this.ip + '/user/getallusers', {
                    params: {
                        userId: localStorage.getItem('userId'),
                        passWord: localStorage.getItem('passWord')
                    }
                })
                    .then(res => {
                        this.users = res.data
                        this.alluser = res.data
                        //填充是否作废，如果密码是1111,就是作废的
                        for (let i = 0; i < this.users.length; i++) {
                            if (this.users[i].passWord === 'gcglzfzh123*') {
                                this.users[i].sfzf = '已作废'
                                this.$set(this.users, i, this.users[i])
                                this.alluser[i].sfzf = '已作废'
                                this.$set(this.alluser, i, this.alluser[i])
                            }
                        }
                    })
            },
            confirm_user() {
                this.visible = false;
                axios.post(this.ip + '/user/adduser', this.userOV)
                    .then(res => {
                        if (res.data) {
                            this.$message.info("添加成功！")
                        } else {
                            this.$message.error("添加失败！")
                        }
                        this.getAllusers();
                    })
            },
            saveEdit() {
                //防止新沙乱改
                if(this.form.userId==null||this.form.userName==null||this.form.groupId==null||this.form.userId===''||this.form.userName===''||this.form.groupId.length==0){
                    this.$message.error("请填写完整信息！")
                    return
                }
                axios.post(this.ip + '/user/edituser', this.form)
                    .then(res => {
                        if (res.data)
                            this.getAllusers()
                        this.editVisible = false
                    })
            },

            edit_group(index) {
                this.group = this.groups[index];
                this.show_editGroup = true;
            },
            confirm_editgroup() {
                axios.get(this.ip + '/group/updatagroup', {
                    params: {
                        id: this.group.id,
                        name: this.group.name,
                        code: this.group.code
                    }
                })
                    .then(res => {
                        if (res.data) {
                            this.$message.info("修改成功！")
                        } else {
                            this.$message.info("修改失败！")
                        }
                        this.getAllgroup();
                        this.show_editGroup = false;
                    })
            },
            cancel_editgroup() {
                this.show_editGroup = false
                this.getAllgroup();
            },

            //确认添加角色
            confirm_addGroup() {
                axios.get(this.ip + "/group/addgroup", {
                    params: {
                        groupId: this.group.id,
                        groupName: this.group.name,
                        groupCode: this.group.code,
                    }
                })
                    .then(res => {
                        if (res.data) {
                            this.$message.info("添加成功")
                            this.groups.push({
                                id: res.data.id,
                                name: res.data.name,
                                code: res.data.type
                            })
                        } else {
                            this.$message.info("添加失败")
                        }
                        this.show_addGroup = false
                    })
            },
            //获取职位
            getAllgroup() {
                axios.get(this.ip + '/group/getallgroup')
                    .then(res => {
                        this.groups = []
                        for (let i = 0; i < res.data.length; i++) {
                            this.groups.push({
                                id: res.data[i].id,
                                name: res.data[i].name,
                                code: res.data[i].type
                            })
                        }
                    })
            },
            //取消修改
            cancel_edit() {
                this.show_editDepartment = false
                this.getAlldepartment()
            },
            //确认修改
            confirm_edit() {
                axios.post(this.ip + '/department/updataDepartment', this.department)
                    .then(res => {
                        if (res.data) {
                            this.$message.info("修改成功！")
                        } else {
                            this.$message.info("修改失败！")
                        }
                        this.getAlldepartment();
                        this.show_editDepartment = false;
                    })
            },
            //添加部门
            saveDepartment() {
                axios.post(this.ip + '/department/insertDepartment', this.department)
                    .then(res => {
                        if (res.data) {
                            this.departments.push(res.data)
                            this.$message.info('添加成功！');
                        } else {
                            alert("新建失败！")
                        }
                        this.show_addDepartment = false;
                    })
            },
            //查询所有部门
            getAlldepartment() {
                axios.get(this.ip + '/department/getAllDepartment')
                    .then(res => {
                        if (res.data)
                            this.departments = res.data;
                    })
            },
            edit_department(index) {
                this.department = this.departments[index];
                this.show_editDepartment = true;
            },
            delete_department(index) {
                this.$confirm('此操作将永久删除该部门,该部门下面的用户部门信息将为空 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.get(this.ip + '/department/deleteDepartment', {
                        params: {
                            departmentId: this.departments[index].id,
                            userId: localStorage.getItem("userId"),
                            passWord: localStorage.getItem("passWord")
                        }
                    }).then(res => {
                        if (res.data) {
                            this.$message.info("删除成功!")
                        } else {
                            this.$message.error("删除失败！")
                        }
                        this.getAlldepartment();
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },


        }
    }
</script>

<style scoped>
    h1 {
        text-align: center;
        margin: 30px 0;
    }

    p {
        line-height: 30px;
        margin-bottom: 10px;
        text-indent: 2em;
    }

    .logout {
        color: #409EFF;
    }

    .table {
        width: 100%;
        font-size: 14px;
    }

    .red {
        color: #ff0000;
    }

    .handle-box {
        margin-bottom: 20px;
    }
</style>
