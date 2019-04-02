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
                    <el-button type="primary" icon="delete" class="handle-del mr10" @click="visible=true">新建用户
                    </el-button>
                </div>
                <el-table :data="users" height="500px" border class="table">
                    <el-table-column prop="userId" label="账号">
                    </el-table-column>
                    <el-table-column prop="userName" label="姓名">
                    </el-table-column>
                    <el-table-column prop="passWord" label="密码">
                    </el-table-column>
                    <el-table-column prop="departmentName" label="部门">
                    </el-table-column>
                    <el-table-column prop="groupName" label="职位">
                    </el-table-column>
                    <el-table-column label="操作" width="180" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" icon="el-icon-edit" @click="editUser(scope.$index, scope.row)">编辑
                            </el-button>
                            <el-button type="text" icon="el-icon-delete" class="red"
                                       @click="deleteUser(scope.$index, scope.row)">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <!--新建用户弹窗-->
            <el-dialog v-dialogDrag title="新建用户" :close-on-click-modal="false" center :visible.sync="visible" width="408px">
                <div class="demo-input-suffix">
                    账号：
                    <el-input v-model="userOV.userId"></el-input>
                </div>
                <div class="demo-input-suffix" style="margin-top: 10px">
                    姓名：
                    <el-input v-model="userOV.userName"></el-input>
                </div>
                <div class="demo-input-suffix" style="margin-top: 10px">
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
                    <el-select v-model="userOV.groupId" placeholder="请选择">
                        <el-option
                                v-for="item in group_options"
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
                    <el-form-item label="密码">
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
                        <el-select v-model="form.groupId" placeholder="请选择">
                            <el-option
                                    v-for="item in group_options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
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
                    <el-button type="primary" icon="delete" class="handle-del mr10" @click="show_addGroup=true">添加职位
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
                            <el-button type="text" icon="el-icon-delete" class="red"
                                       :disabled="scope.row.id=='20190125102616787'||scope.row.id=='20190123022801622'"
                                       @click="delete_department(scope.$index, scope.row)">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <el-table :data="groups" border style="margin-top: 20px">
                    <el-table-column prop="code" label="职位编号" width="150">
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
    </div>

</template>

<script>
    import axios from 'axios'

    export default {
        inject: ['reload'],
        name: 'account',
        data: function () {
            return {
                ip: 'http://10.197.33.115:8080',
                editVisible: false,
                userOV: {
                    userId: '',
                    userName: '',
                    passWord: '',
                    groupId: '',
                    groupName: '',
                    departmentId: '',
                    departmentName: ''
                },
                users: [],
                //添加用户
                visible: false,
                //删除用户
                delVisible: false,
                group_options: [],
                department_options: [],
                form: {
                    userId: '',
                    userName: '',
                    passWord: '',
                    groupId: '',
                    departmentId: '',
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
                groups: []
            }
        },
        created() {
            this.getAllusers();
            this.getGroup_options();
            this.getDepartment_optins();
            this.getAlldepartment()
            this.getAllgroup()
        },
        methods: {
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
                        userId: this.users[this.idx].userId
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
            editUser(index, row) {
                this.idx = index;
                const item = this.users[index];
                this.form = {
                    userId: item.userId,
                    userName: item.userName,
                    passWord: item.passWord,
                    groupId: item.groupId,
                    departmentId: item.departmentId
                }
                this.editVisible = true;
            },
            deleteUser(index, row) {
                this.idx = index;
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
            confirm_addGroup() {
                axios.get(this.ip + "/group/addgroup", {
                    params: {
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