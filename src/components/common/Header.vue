<template>
    <div style="background-color:  #417e9f" class="header">
        <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="collapseChage">
            <i class="el-icon-menu"></i>
        </div>
        <div class="logo">新沙工程项目管理系统</div>
        <div class="header-right">
            <div class="header-user-con">
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{username}} <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item divided  command="loginout">退出登录</el-dropdown-item>
                        <el-dropdown-item divided  command="xgmm">修改密码</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>

        <!--修改密码弹窗-->
        <el-dialog title="修改密码" :visible.sync="show_xgmm" width="350px">
            <el-form >
                <el-form-item label="新密码" label-width="100px">
                    <el-input v-model="mm" placeholder="请输入密码" type="password"></el-input>
                </el-form-item>
                <el-form-item label="再次输入" label-width="100px">
                    <el-input v-model="zcmm" placeholder="请输入密码" type="password"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="show_xgmm = false">取 消</el-button>
                <el-button type="primary" @click="qdxgmm" >确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import bus from '../common/bus';
    import axios from 'axios'
    export default {
        data() {
            return {
                mm:'',
                zcmm:'',
                //修改密码
                show_xgmm:false,
                ip:'http://10.197.41.100:8080',
                collapse: false,
                fullscreen: false,
                name: 'linxin',
                message: 0
            }
        },
        computed:{
            username(){
                let username = localStorage.getItem('userName');
                return username ? username : this.name;
            }
        },

        methods:{
            //确定修改密码
            qdxgmm(){
                if(this.mm!==this.zcmm||this.mm==""||this.mm==null){
                    this.$message.error("修改失败！")
                    return
                }
                axios.get(this.ip+'/user/xgmm',{
                    params:{
                        userId:localStorage.getItem('userId'),
                        oldPass:localStorage.getItem('passWord'),
                        newPass:this.mm
                    }
                }).then(res=>{
                    if(res.data){
                        this.$message.success("修改成功！")
                        localStorage.setItem("passWord",this.mm)
                        this.show_xgmm=false
                    }else {
                        this.$message.error("修改失败！")
                    }
                })
            },
            // 用户名下拉菜单选择事件
            handleCommand(command) {
                if(command == 'loginout'){
                    localStorage.removeItem('userId')
                    this.$router.push('/login');
                }else {
                    this.show_xgmm=true
                    console.log("xgmm!")
                }
            },
            // 侧边栏折叠
            collapseChage(){
                this.collapse = !this.collapse;
                bus.$emit('collapse', this.collapse);
            },
        },
        mounted(){
            if(document.body.clientWidth < 1500){
                this.collapseChage();
            }
        }
    }
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        color: #fff;
    }
    .collapse-btn{
        float: left;
        padding: 0 21px;
        cursor: pointer;
        line-height: 70px;
    }
    .header .logo{
        float: left;
        width:250px;
        line-height: 70px;
    }
    .header-right{
        float: right;
        padding-right: 50px;
    }
    .header-user-con{
        display: flex;
        height: 70px;
        align-items: center;
    }
    .btn-fullscreen{
        transform: rotate(45deg);
        margin-right: 5px;
        font-size: 24px;
    }
    .btn-bell, .btn-fullscreen{
        position: relative;
        width: 30px;
        height: 30px;
        text-align: center;
        border-radius: 15px;
        cursor: pointer;
    }
    .btn-bell-badge{
        position: absolute;
        right: 0;
        top: -2px;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background: #f56c6c;
        color: #fff;
    }
    .btn-bell .el-icon-bell{
        color: #fff;
    }
    .user-name{
        margin-left: 10px;
    }
    .user-avator{
        margin-left: 20px;
    }
    .user-avator img{
        display: block;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-link{
        color: #fff;
        cursor: pointer;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
</style>
