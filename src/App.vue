<template>
    <div id="app">
        <router-view v-if="isRouterAlive"></router-view>
    </div>
</template>
<script>
    export default {
        name:'app',
        provide(){
            return{
                reload:this.reload
            }
        },
        data(){
            return{
                isRouterAlive:true
            }
        },
        methods:{
            reload(){
                this.isRouterAlive=false
                this.$nextTick(()=>{
                    this.isRouterAlive=true
                })
            }
        }
    }
</script>
<style>
    .el-table  .warning-row {
        background: #FFA07A;
    }

    .el-table  .zc-row {
        background: #87CEFA;
    }
    @import "./assets/css/main.css";
    @import "./assets/css/color-dark.css";     /*深色主题*/
    /*@import "./assets/css/theme-green/color-green.css";   浅绿色主题*/
</style>
