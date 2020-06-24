<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-warn"></i> 账号管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="delete" class="handle-del mr10" @click="visible=true;userOV={}">新建用户s</el-button>
            </div>
            <el-table :data="users" border class="table" >
                <el-table-column prop="userId" label="账号" >
                </el-table-column>
                <el-table-column prop="userName" label="姓名" >
                </el-table-column>
                <el-table-column prop="passWord" label="密码">
                </el-table-column>
                <el-table-column prop="departmentName" label="部门">
                </el-table-column>
                <el-table-column prop="groupName" label="职位">
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="editUser(scope.row)">编辑
                        </el-button>
                        <el-button type="text" icon="el-icon-delete" class="red"
                                   @click="deleteUser(scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="" layout="prev, pager, next" :total="1000">
                </el-pagination>
            </div>
        </div>

        <!--新建用户弹窗-->
        <el-dialog v-dialogDrag title="新建用户" center :visible.sync="visible" width="30%">
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
        <el-dialog title="编辑账号" :visible.sync="editVisible" width="30%">
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
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        inject:['reload'],
        name:'account',
        data: function () {
            return {
                ip: 'http://10.197.33.115:8080',
                editVisible: false,
                userOV: {
                    userId: '',
                    userName: '',
                    passWord: '',
                    groupId: '',
                    groupName:'',
                    departmentId:'',
                    departmentName:''
                },
                user:{},
                users: [],
                //添加用户
                visible: false,
                //删除用户
                delVisible:false,
                group_options: [],
                department_options:[],
                form: {
                    userId: '',
                    userName: '',
                    passWord: '',
                    groupId: '',
                    departmentId:'',
                },
                idx: -1
            }
        },
        created() {
            this.getAllusers();
            this.getGroup_options();
            this.getDepartment_optins();
        },
        methods: {
            getDepartment_optins(){
              axios.get(this.ip+'/department/getAllDepartment')
                  .then(res=>{
                      if(res.data){
                          for(let i=0;i<res.data.length;i++){
                              this.department_options.push({
                                  value:res.data[i].id,
                                  label:res.data[i].dNam
                              })
                          }
                      }
                  })
            },
            getGroup_options(){
              axios.get(this.ip+'/group/getallgroup')
                  .then(res=>{
                      if(res.data)
                      for(let i=0;i<res.data.length;i++){
                          this.group_options.push({
                              value:res.data[i].id,
                              label:res.data[i].name
                          })
                      }
                  })
            },
            //删除用户
            deleteRow(){
                axios.get(this.ip+'/user/deleteuser',{
                    params:{
                        userId:this.user.userId
                    }
                } )
                    .then(res=>{
                        if(res.data){
                            //this.users.splice(this.idx, 1);
                            this.$message.success('删除成功');
                            this.getAllusers();
                            this.delVisible = false;
                        }
                    })
            },
            editUser(index, row) {
                // this.idx = index;
                // const item = this.users[index];
                this.user=row
                this.form = {
                    userId: row.userId,
                    userName: row.userName,
                    passWord: row.passWord,
                    groupId: row.groupId,
                    departmentId:row.departmentId
                }
                this.editVisible = true;
            },
            deleteUser( row) {
                this.user = row;
                this.delVisible = true;
            },
            getAllusers() {
                axios.get(this.ip + '/user/getallusers',{
                    params:{
                        userId:localStorage.getItem('userId'),
                        passWord:localStorage.getItem('passWord')
                    }
                })
                    .then(res => {
                        this.users=res.data
                    })
            },
            confirm_user() {
                this.visible = false;
                axios.post(this.ip + '/user/adduser', this.userOV)
                    .then(res => {
                        if(res.data){
                            this.$message.info("添加成功！")
                        }else {
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
                            this.editVisible=false
                    })
            }
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
