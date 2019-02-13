<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-warn"></i> 系统设置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="delete" class="handle-del mr10" @click="show_addDepartment=true">添加部门
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
                        <el-button type="text" icon="el-icon-edit" @click="edit_department(scope.$index, scope.row)">
                            编辑
                        </el-button>
                        <el-button type="text" icon="el-icon-delete" class="red"
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
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="edit_group(scope.$index, scope.row)">
                            编辑
                        </el-button>
                        <el-button type="text" icon="el-icon-delete" class="red"
                                   @click="delete_group(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 添加职位弹出框 -->
            <el-dialog title="添加职位" :visible.sync="show_addGroup" width="30%">
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
            <el-dialog title="添加部门" :visible.sync="show_addDepartment" width="30%">
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
            <el-dialog title="编辑部门" :visible.sync="show_editDepartment" width="30%">
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
            <el-dialog title="编辑职位" :visible.sync="show_editGroup" width="30%">
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
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'setting',
        data() {
            return {
                ip: 'http://localhost:8080',
                show_addDepartment: false,
                show_editDepartment: false,
                show_addGroup: false,
                show_editGroup:false,
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
            this.getAlldepartment()
            this.getAllgroup()
        },
        methods: {
            edit_group(index){
                this.group = this.groups[index];
                this.show_editGroup = true;
            },
            confirm_editgroup(){
                axios.get(this.ip + '/group/updatagroup', {
                    params:{
                        id:this.group.id,
                        name:this.group.name,
                        code:this.group.code
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
            cancel_editgroup(){
                this.show_editGroup=false
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
                        this.groups=[]
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
                    axios.get(this.ip+'/department/deleteDepartment',{
                        params:{
                            departmentId:this.departments[index].id,
                            userId:localStorage.getItem("userId"),
                            passWord:localStorage.getItem("passWord")
                        }
                    }).then(res=>{
                        if(res.data){
                            this.$message.info("删除成功!")
                        }else {
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
            delete_group(){

            },
            goBack() {
                this.$router.go(-1);
            }
        }
    }
</script>


<style scoped>
    .error-page {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
        height: 100%;
        background: #f3f3f3;
        box-sizing: border-box;
    }

    .error-code {
        line-height: 1;
        font-size: 250px;
        font-weight: bolder;
        color: #2d8cf0;
    }

    .error-code span {
        color: #00a854;
    }

    .error-desc {
        font-size: 30px;
        color: #777;
    }

    .error-handle {
        margin-top: 30px;
        padding-bottom: 200px;
    }

    .error-btn {
        margin-left: 100px;
    }

    .mr10 {
        margin-right: 10px;
    }

    .table {
        width: 100%;
        font-size: 14px;
    }

    .red {
        color: #ff0000;
    }
</style>
