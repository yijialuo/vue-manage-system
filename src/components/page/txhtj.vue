<template>
    <div>
        <!--开发中……-->
        <el-input placeholder="项目编号" clearable v-model="xmbh" class="handle-input mr10"></el-input>
        <el-input placeholder="项目名称" clearable v-model="xmmc" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" style="margin-left: 10px" @click="search">搜索</el-button>
        <el-row>
            <el-col :span="8" v-for="(o, index) in tjdata.length" :key="o">
                <el-card class="box-card" style="width: 500px;height: 500px;margin-top: 10px">
                    <ve-pie :data="tjdata[index].chartData"></ve-pie>
                    <div style="text-align: center">{{tjdata[index].xmbh}}</div>
                    <div style="text-align: center">{{tjdata[index].xmmc}}</div>
                    <el-button type="text" @click="xmxq(tjdata[index].xmid)">项目详情</el-button>
                </el-card>
            </el-col>
        </el-row>
        <!--立项详情-->
        <el-dialog title="立项详情" :visible.sync="lxxqShow" width="50%">
            <el-form :model="project" label-position="left" label-width="120px">
                <el-form-item label="项目编号">
                    <el-input v-model="project.projectNo" readonly/>
                </el-form-item>
                <el-form-item label="项目名称">
                    <el-input v-model="project.projectNam" readonly/>
                </el-form-item>
                <el-form-item style="margin-left: -120px;">
                    <el-col :span="11">
                        <el-form-item label="立项时间">
                            <el-input v-model="project.applicationDte" readonly/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="2">
                        <el-form-item label="立项部门">
                            <el-input v-model="project.declarationDep" readonly/>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item style="margin-left: -120px;">
                    <el-col :span="11">
                        <el-form-item label="立项类别">
                            <el-input v-model="project.depAuditOpinion" readonly/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="2">
                        <el-form-item label="项目类别">
                            <el-input v-model="project.projectType" readonly/>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item style="margin-left: -120px;">
                    <el-col :span="11">
                        <el-form-item label="投资预算">
                            <el-input v-model="project.investmentEstimate" readonly/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="2">
                        <el-form-item label="项目负责人">
                            <el-input v-model="project.personInCharge" readonly/>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item style="margin-left: -120px;">
                    <el-col :span="11">
                        <el-form-item label="预计工期">
                            <el-input v-model="project.techAuditOpinion" readonly/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="2">
                        <el-form-item label="项目大类">
                            <el-input v-model="project.reviser" readonly/>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item style="margin-left: -120px;">
                    <el-col :span="11">
                        <el-form-item label="两会时间">
                            <el-input v-model="project.lhsj" readonly/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="2">
                        <el-form-item label="总经会时间">
                            <el-input v-model="project.zjhsj" readonly/>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="立项背景理由">
                    <el-input v-model="project.establishReason" readonly type="textarea"
                              :autosize="{ minRows: 4, maxRows: 10}"></el-input>
                </el-form-item>

                <el-form-item label="立项内容规模">
                    <el-input v-model="project.scale" readonly type="textarea"
                              :autosize="{ minRows: 4, maxRows: 10}"></el-input>
                </el-form-item>
                <el-form-item label="投资概算说明">
                    <el-input v-model="project.illustration" readonly type="textarea"
                              :autosize="{ minRows: 4, maxRows: 10}"></el-input>
                </el-form-item>
                <el-form-item label="审批列表">
                    <el-table
                            :data="commentList"
                            style="width: 100%"
                            :row-class-name="tableRowClassName"
                    >
                        <el-table-column
                                prop="time"
                                label="日期"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="usernam"
                                label="姓名"
                                width="80">
                        </el-table-column>
                        <el-table-column
                                prop="groupName"
                                label="职位"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="comment"
                                label="审批">
                        </el-table-column>
                    </el-table>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="lxxqShow = false">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "txhtj",
        data() {
            return {
                project: {},
                commentList: [],
                lxxqShow: false,
                xmbh: '',
                xmmc: '',
                ip: 'http://10.197.41.100:8080',
                tjdata: [],
                searchData: [],
                chartData: {
                    columns: ['节点', '时间'],
                    rows: [
                        {'节点': '前期', '时间': 1393},
                        {'节点': '招标', '时间': 3530},
                        {'节点': '合同', '时间': 2923},
                        {'节点': '施工', '时间': 1723},
                        {'节点': '验收', '时间': 3792},
                        {'节点': '结算', '时间': 4593}
                    ]
                }
            }
        },
        created() {
            const loading = this.$loading({
                lock: true,
                text: '处理中……',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            axios.get(this.ip + '/projectApplication/txhtj')
                .then(res => {
                    for (let i = 0; i < res.data.length; i++) {
                        let xm = {
                            xmid: res.data[i].ID,
                            xmmc: res.data[i].PROJECT_NAM,
                            xmbh: res.data[i].PROJECT_NO,
                            chartData: {
                                columns: ['节点', '时间'],
                                rows: [
                                    {'节点': '前期', '时间': 1393},
                                    {'节点': '招标', '时间': 3530},
                                    {'节点': '合同', '时间': 2923},
                                    {'节点': '施工', '时间': 1723},
                                    {'节点': '验收', '时间': 3792},
                                    {'节点': '结算', '时间': 4593}
                                ]
                            }
                        }
                        this.tjdata.push(xm)
                        this.searchData.push(xm)
                    }
                    loading.close()
                })
        },
        methods: {
            //搜索
            search() {
                this.tjdata = this.searchData
                if (this.xmbh != null) {
                    this.tjdata = this.tjdata.filter((item) => {
                        if (item.xmbh == null)
                            return false
                        if (item.xmbh.toLowerCase().indexOf(this.xmbh.toLowerCase()) != -1)
                            return true
                        else
                            return false
                    })
                }
                if (this.xmmc != null) {
                    this.tjdata = this.tjdata.filter((item) => {
                        if (item.xmmc == null)
                            return false
                        if (item.xmmc.toLowerCase().indexOf(this.xmmc.toLowerCase()) != -1)
                            return true
                        else
                            return false
                    })
                }
            },

            xmxq(xmid) {// 立项详情
                this.lxxqShow = true
                axios.get('http://10.197.41.100:8080/projectApplication/getXmById', {
                    params: {
                        xmid: xmid
                    }
                }).then(res => {
                    this.project = res.data
                })

                //领取前期评论
                axios.get(this.ip + '/projectApplication/projectIdTocomment', {
                    params: {
                        projectId: xmid
                    }
                })
                    .then(res => {
                        if (res.data) {
                            this.commentList = res.data
                        }
                    })
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