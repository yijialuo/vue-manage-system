<template>
    <div style="width: 100%;height: 100%">
        <div>
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-card shadow="hover" class="mgb20" style="height:115px;">
                        <div class="user-info">
                            <div class="user-info-cont">
                                <div class="user-info-name" style="margin-top: 0px">{{userName}}</div>
                            </div>
                        </div>
                        <div class="user-info-list" v-if="userId!='lqb'">
                            {{groupName}}&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp{{departmentName}}
                        </div>
                    </el-card>
                    <el-card shadow="hover" style="height:210px;">
                        <div slot="header" class="clearfix">
                            <span>项目类别</span>
                        </div>
                        维修
                        <el-progress :percentage="zbs[0]" color="#f1e05a"></el-progress>
                        物资采购
                        <el-progress :percentage="zbs[1]"></el-progress>
                        固定资产
                        <el-progress :percentage="zbs[2]" color="#42b983"></el-progress>
                    </el-card>
                    <el-card shadow="hover" style="height:300px;margin-top: 10px">
                        <div slot="header" class="clearfix">
                            <span>项目大类</span>
                        </div>
                        土建
                        <el-progress :percentage="zbs[3]" color="#42b983"></el-progress>
                        设备
                        <el-progress :percentage="zbs[4]" color="#f1e05a"></el-progress>
                        物资
                        <el-progress :percentage="zbs[5]"></el-progress>
                        信息
                        <el-progress :percentage="zbs[6]" color="#a1eaaa"></el-progress>
                    </el-card>
                </el-col>
                <el-col :span="18">
                    <el-row :gutter="20" class="mgb20">
                        <el-col :span="8">
                            <el-card shadow="hover" :body-style="{padding: '0px'}">
                                <div class="grid-content grid-con-1">
                                    <i class="el-icon-lx-people grid-con-icon"></i>
                                    <div class="grid-cont-right">
                                        <div class="grid-num">{{allNum}}</div>
                                        <div>总项目</div>
                                    </div>
                                </div>
                            </el-card>
                        </el-col>
                        <el-col :span="8">
                            <el-card shadow="hover" :body-style="{padding: '0px'}">
                                <div class="grid-content grid-con-2">
                                    <i class="el-icon-lx-notice grid-con-icon"></i>
                                    <div class="grid-cont-right">
                                        <div class="grid-num">{{doNum}}</div>
                                        <div>已处理</div>
                                    </div>
                                </div>
                            </el-card>
                        </el-col>
                        <el-col :span="8">
                            <el-card shadow="hover" :body-style="{padding: '0px'}">
                                <div class="grid-content grid-con-3">
                                    <i class="el-icon-lx-goods grid-con-icon"></i>
                                    <div class="grid-cont-right">
                                        <div class="grid-num">{{unDoNum}}</div>
                                        <div>未处理</div>
                                    </div>
                                </div>
                            </el-card>
                        </el-col>
                    </el-row>
                    <el-card shadow="hover" style="height:535px;">
                        <div slot="header" class="clearfix">
                            <span>待办</span>
                            <el-input v-model="daibanSearch.projectNo" placeholder="项目编号" clearable class="daibanSearch"/>
                            <el-input v-model="daibanSearch.projectNam" placeholder="项目名称" clearable class="daibanSearch"/>
                            <el-select
                                    clearable
                                    filterable
                                    class="daibanSearch"
                                    v-model="daibanSearch.declarationDep"
                                    placeholder="立项部门">
                                <el-option
                                        v-for="item in bms"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                            <el-button type="primary" icon="el-icon-search" @click="doDaibanSearch">搜索
                            </el-button>
                        </div>
                        <el-tabs v-model="message">
                            <!--!待办项目-->
                            <el-tab-pane v-if="groupId!='doman'" :label="`前期审批(${Xms.length})`" name="first">
                                <el-table :data="Xms" border height="400px" stripe :show-header="true"
                                          style="width: 100%;font-size: 14px;">
                                    <el-table-column label="项目编号" align="center" sortable prop="projectNo" width="160">
                                    </el-table-column>
                                    <el-table-column label="项目名称" prop="projectNam" min-width="160">
                                    </el-table-column>
                                    <el-table-column sortable align="center" label="项目大类" prop="reviser" width="120">
                                    </el-table-column>
                                    <el-table-column label="申请人" align="center" sortable prop="proposer" width="120">
                                    </el-table-column>
                                    <el-table-column label="立项时间" align="center" sortable prop="applicationDte"
                                                     width="120">
                                    </el-table-column>
                                    <el-table-column label="操作" align="center" width="120">
                                        <template slot-scope="scope">
                                            <el-button type="text" size="small" @click="xmxq(scope.row)">处理</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-tab-pane>

                            <!--!待办公室苏燕春备案股份项目-->
                            <el-tab-pane stripe v-if="userId=='syc'" :label="`股份备案(${baXms.length})`"
                                         name="second">
                                <el-table height="400px" border :data="baXms" :show-header="true"
                                          style="width: 100%;font-size: 14px;">
                                    <el-table-column label="项目编号" align="center" sortable prop="projectNo" width="160">
                                    </el-table-column>
                                    <el-table-column label="项目名称" prop="projectNam" min-width="160">
                                    </el-table-column>
                                    <el-table-column label="申请人" align="center" sortable prop="proposer" width="140">
                                    </el-table-column>
                                    <el-table-column label="立项时间" align="center" sortable prop="applicationDte"
                                                     width="140">
                                    </el-table-column>
                                    <el-table-column label="操作" align="center" width="140">
                                        <template slot-scope="scope">
                                            <el-button size="small" @click="xmxq(scope.row),ba=true">处理</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-tab-pane>

                            <!--!待技术部经办人备案项目-->
                            <el-tab-pane stripe v-if="groupId=='jsb_doman'" :label="`待备案项目(${baXms.length})`"
                                         name="second">
                                <el-table height="400px" border :data="baXms" :show-header="true"
                                          style="width: 100%;font-size: 14px;">
                                    <el-table-column label="项目编号" align="center" sortable prop="projectNo" width="160">
                                    </el-table-column>
                                    <el-table-column label="项目名称" prop="projectNam" min-width="160">
                                    </el-table-column>
                                    <el-table-column label="申请人" align="center" sortable prop="proposer" width="140">
                                    </el-table-column>
                                    <el-table-column label="立项时间" align="center" sortable prop="applicationDte"
                                                     width="140">
                                    </el-table-column>
                                    <el-table-column label="操作" align="center" width="140">
                                        <template slot-scope="scope">
                                            <el-button size="small" @click="xmxq(scope.row),ba=true">处理</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-tab-pane>
                            <!--!驳回的项目 -->
                            <el-tab-pane v-if="groupId=='doman'" :label="`项目审批(${bhXms.length})`" name="third">
                                <el-table stripe border height="400px" :data="bhXms" :show-header="true"
                                          style="width: 100%;font-size: 14px;">
                                    <el-table-column label="项目编号" align="center" sortable prop="projectNo" width="160">
                                    </el-table-column>
                                    <el-table-column label="项目名称" prop="projectNam" min-width="180">
                                    </el-table-column>
                                    <el-table-column sortable align="center" prop="reviser" label="项目大类" width="120">
                                    </el-table-column>
                                    <el-table-column label="申请人" align="center" prop="proposer" width="120">
                                    </el-table-column>
                                    <el-table-column label="立项时间" align="center" sortable="" prop="applicationDte"
                                                     width="120">
                                    </el-table-column>
                                    <el-table-column label="操作" align="center" width="120">
                                        <template slot-scope="scope">
                                            <el-button type="text" size="small" @click="xmxq(scope.row)">处理</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-tab-pane>
                            <!--招标的项目-->
                            <el-tab-pane stripe v-if="groupId!=='zgjl'&&groupId!=='jl'"
                                         :label="`招标审批(${zhaobiaos.length})`" name="fourth">
                                <el-table height="400px" border :data="zhaobiaos" :show-header="true"
                                          style="width: 100%;font-size: 14px;">
                                    <el-table-column label="项目编号" align="center" sortable prop="xmNo" width="160">
                                    </el-table-column>
                                    <el-table-column label="项目名称" prop="xmName" min-width="160">
                                    </el-table-column>
                                    <el-table-column sortable align="center" label="申请人" prop="userName" width="120">
                                    </el-table-column>
                                    <el-table-column sortable align="center" label="申请时间" prop="cjsj" width="160">
                                    </el-table-column>
                                    <el-table-column label="操作" align="center" width="120">
                                        <template slot-scope="scope">
                                            <el-button type="text" @click="zbcl(scope.row)">处理</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-tab-pane>
                            <!--合同-->
                            <el-tab-pane stripe
                                         v-if="groupId=='jsb_doman'||groupId=='jsb_jl'||groupId=='bgs'"
                                         :label="`合同审批(${contracts.length})`" name="fifth">
                                <el-table height="400px" border :data="contracts" :show-header="true"
                                          style="width: 100%;font-size: 14px;">
                                    <el-table-column label="项目编号" align="center" sortable prop="xmNo" width="160">
                                    </el-table-column>
                                    <el-table-column label="项目名称" prop="projectName" min-width="160">
                                    </el-table-column>
                                    <el-table-column sortable align="center" label="经办人" prop="jbr" width="120">
                                    </el-table-column>
                                    <el-table-column sortable align="center" label="投资文号" prop="tzwh" width="120">
                                    </el-table-column>
                                    <el-table-column sortable align="center" label="合同价款(元)" prop="price" width="140">
                                    </el-table-column>
                                    <el-table-column label="操作" align="center" width="120">
                                        <template slot-scope="scope">
                                            <el-button type="text" @click="htcl(scope.row)">处理</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-tab-pane>
                        </el-tabs>
                    </el-card>
                </el-col>
            </el-row>
            <el-dialog title="状态" :visible.sync="show_zt" width="850px">
                <img :src='src'/>
                <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="show_zt=false">确 定</el-button>
            </span>
            </el-dialog>
        </div>
        <div class="">
            <div class="crumbs">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item><i class="el-icon-lx-copy"></i>经办项目</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="container">
                <el-table stripe :data="xmList" :show-header="true" height="400" style="width: 100%;font-size:14px;">
                    <el-table-column label="项目编号" sortable prop="projectNo" width="200">
                    </el-table-column>
                    <el-table-column label="项目名称" prop="projectNam" min-width="160">
                    </el-table-column>
                    <el-table-column label="申请时间" prop="applicationDte" sortable width="160">
                    </el-table-column>
                    <el-table-column label="项目类型" prop="projectType" sortable width="160">
                    </el-table-column>
                    <el-table-column label="负责人" prop="personInCharge" sortable="" width="160">
                    </el-table-column>
                    <el-table-column label="操作" width="160">
                        <template slot-scope="scope">
                            <el-button type="text" @click="zt(scope.row)">状态</el-button>
                            <el-button type="text" @click="xq(scope.row)">详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <!-- 项目详情框 技术部自己项目-->
            <el-dialog title="项目详情" :close-on-click-modal="false" :visible.sync="show_xqgcjsb" width="1000px" center>
                <el-form style="margin-top: 20px" label-width="120px">
                    <el-form-item v-if="groupId=='bgs'" label="项目编号">
                        <el-input v-model="xm.projectNo"></el-input>
                    </el-form-item>
                    <el-form-item v-if="groupId!='bgs'" label="项目编号">
                        <el-input
                                :readonly="groupId!='doman'"
                                v-model="xm.projectNo"></el-input>
                    </el-form-item>
                    <el-form-item label="项目名称">
                        <el-input v-model="xm.projectNam" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="申报部门">
                        <el-input
                                readonly
                                style="width: 215px;padding-right: 55px"
                                v-model="xm.declarationDep"></el-input>
                        立项类型&nbsp&nbsp
                        <el-input readonly
                                  style="width: 215px;padding-right: 15px"
                                  v-model="xm.depAuditOpinion"></el-input>
                    </el-form-item>
                    <el-form-item label="项目类别">
                        <el-input
                                readonly
                                style="width: 215px;padding-right: 55px"
                                v-model="xm.projectType"></el-input>
                        项目大类&nbsp&nbsp
                        <el-input style="width: 215px"
                                  readonly
                                  v-model="xm.reviser"></el-input>
                    </el-form-item>
                    <el-form-item label="投资概算">
                        <el-input type="number" style="width: 215px;padding-right: 55px"
                                  v-model="xm.investmentEstimate"></el-input>
                        项目负责人
                        <el-input style="width: 215px"
                                  v-model="xm.personInCharge"></el-input>
                    </el-form-item>
                    <el-form-item label="立项背景理由">
                        <el-input
                                v-model="xm.establishReason" type="textarea"
                                placeholder="立项背景理由"
                                :autosize="{ minRows: 4, maxRows: 10}"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="立项内容规模">
                        <el-input v-model="xm.scale"
                                  type="textarea"
                                  placeholder="立项内容规模"
                                  :autosize="{ minRows: 4, maxRows: 10}"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="投资概算说明">
                        <el-input v-model="xm.illustration"
                                  type="textarea"
                                  placeholder="投资概算说明"
                                  :autosize="{ minRows: 4, maxRows: 10}"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="审批列表">
                        <el-table
                                :data="commentList"
                                style="width: 100%">
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
                    <el-form-item label="文件列表">
                        <el-table :data="bcwjs" border style="margin-top: 20px">
                            <el-table-column prop="jd" label="节点" width="100px">
                            </el-table-column>
                            <el-table-column prop="wjmc" label="文件名称" width="110px">
                            </el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-upload
                                            class="upload-demo"
                                            :action="url"
                                            :on-preview="handlePreview"
                                            :before-remove="handleBeforeRemove"
                                            :on-success="handleSuccess"
                                            multiple
                                            :file-list="fileList[scope.$index]">
                                        <el-button size="small" type="primary" @click="recordCurrentRow(scope.row)">
                                            点击上传
                                        </el-button>
                                    </el-upload>
                                </template>
                            </el-table-column>
                        </el-table>
                        <!--<el-upload-->
                        <!--class="upload-demo"-->
                        <!--drag-->
                        <!--:action="url"-->
                        <!--:on-preview="handlePreview"-->
                        <!--:on-remove="handleRemove"-->
                        <!--:on-success="handleSuccess"-->
                        <!--multiple-->
                        <!--:file-list="fileList"-->
                        <!--&gt;-->
                        <!--<i class="el-icon-upload"></i>-->
                        <!--<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>-->
                        <!--</el-upload>-->
                    </el-form-item>
                    <el-form-item :label="jbrOrZgjl" v-if="jbrOrZgjl=='技术部主管经理'&&NodeId!='备案'">
                        <el-select
                                clearable
                                multiple
                                style="width: 100%;"
                                v-model="jbrOrZgjlValue"
                                :placeholder="'请选择'+jbrOrZgjl">
                            <el-option
                                    v-for="item in jbrOrZgjlList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="推荐单位">
                        <el-input :readonly="groupId!='jsb_doman'&&groupId!='jsb_zgjl'&&groupId!='jsb_jl'"
                                  :autofocus="groupId=='jsb_doman'||groupId=='jsb_zgjl'||groupId=='jsb_jl'"
                                  v-model="xm.tjdw"
                                  type="textarea"
                                  placeholder="推荐单位"
                                  :autosize="{ minRows: 4, maxRows: 10}"
                        ></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                     <el-button @click="show_xqgcjsb = false">取消</el-button>
                    <el-button v-if="NodeId=='备案'" type="primary" @click="wcba">完成备案</el-button>
                    <div v-else>
                        <el-button type="warning" @click="xmzf">作废</el-button>
                        <el-button type="primary" @click="jsbsq">申请</el-button>
                    </div>
                </span>
            </el-dialog>

            <!-- 项目详情框 -->
            <el-dialog title="项目详情" :close-on-click-modal="false" :visible.sync="show_xq" width="1000px" center>

                <el-form style="margin-top: 20px" label-width="120px">
                    <el-form-item v-if="groupId=='bgs'&&NodeId=='两会'" label="项目编号">
                        <el-input v-model="xm.projectNo"></el-input>
                    </el-form-item>
                    <el-form-item v-if="groupId!='bgs'" label="项目编号">
                        <el-input
                                :readonly="groupId!='doman'&&NodeId!='总经理办公会'"
                                v-model="xm.projectNo"></el-input>
                    </el-form-item>
                    <el-form-item label="项目名称">
                        <el-input :readonly="groupId!='doman'&&NodeId!='两会'"
                                  v-model="xm.projectNam"></el-input>
                    </el-form-item>
                    <el-form-item label="申报部门">
                        <el-input readonly
                                  style="width: 215px;padding-right: 55px"
                                  v-model="xm.declarationDep"></el-input>
                        立项类型&nbsp&nbsp
                        <el-select style="width: 215px;padding-right: 15px"
                                   v-model="xm.depAuditOpinion"
                                   placeholder="请选择">
                            <el-option
                                    v-for="item in xmdl"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                        <!--<el-input readonly-->
                        <!--style="width: 215px;padding-right: 15px"-->
                        <!--v-model="xm.depAuditOpinion"></el-input>-->
                    </el-form-item>
                    <el-form-item label="项目类别">
                        <el-select style="width: 215px;padding-right: 55px"
                                   v-model="xm.projectType"
                                   placeholder="请选择">
                            <el-option
                                    v-for="item in xmlb"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                        <!--<el-input readonly-->
                        <!--style="width: 215px;padding-right: 55px"-->
                        <!--v-model="xm.projectType"></el-input>-->
                        项目大类&nbsp&nbsp
                        <el-select style="width: 215px;padding-right: 15px"
                                   v-model="xm.reviser"
                                   placeholder="请选择">
                            <el-option
                                    v-for="item in xmfl"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                        <!--<el-input style="width: 215px" readonly-->
                        <!--v-model="xm.reviser"></el-input>-->
                    </el-form-item>
                    <el-form-item label="投资概算">
                        <el-input style="width: 215px;padding-right: 55px"
                                  :readonly="groupId!='doman'&&NodeId!='两会'&&NodeId!='总经理办公会'"
                                  v-model="xm.investmentEstimate"></el-input>
                        项目负责人
                        <el-input style="width: 215px" :readonly="groupId!='doman'&&NodeId!='两会'&&NodeId!='总经理办公会'"
                                  v-model="xm.personInCharge"></el-input>
                    </el-form-item>
                    <el-form-item label="立项背景理由">
                        <el-input :readonly="groupId!='doman'&&NodeId!='两会'&&NodeId!='总经理办公会'"
                                  v-model="xm.establishReason" type="textarea"
                                  placeholder="立项背景理由"
                                  :autosize="{ minRows: 4, maxRows: 10}"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="立项内容规模">
                        <el-input :readonly="groupId!='doman'&&NodeId!='两会'&&NodeId!='总经理办公会'" v-model="xm.scale"
                                  type="textarea"
                                  placeholder="立项内容规模"
                                  :autosize="{ minRows: 4, maxRows: 10}"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="投资概算说明">
                        <el-input :readonly="groupId!='doman'&&NodeId!='两会'&&NodeId!='总经理办公会'"
                                  v-model="xm.illustration"
                                  type="textarea"
                                  placeholder="投资概算说明"
                                  :autosize="{ minRows: 4, maxRows: 10}"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="审批列表">
                        <el-table
                                key="splb"
                                :data="commentList"
                                style="width: 100%">
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
                    <el-form-item label="文件列表">
                        <el-table :data="bcwjs" border style="margin-top: 20px">
                            <el-table-column prop="jd" label="节点" width="100px">
                            </el-table-column>
                            <el-table-column prop="wjmc" label="文件名称" width="110px">
                            </el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-upload
                                            class="upload-demo"
                                            :action="url"
                                            :on-preview="handlePreview"
                                            :before-remove="handleBeforeRemove"
                                            :on-success="handleSuccess"
                                            multiple
                                            :file-list="fileList[scope.$index]">
                                        <el-button size="small" type="primary" @click="recordCurrentRow(scope.row)">
                                            点击上传
                                        </el-button>
                                    </el-upload>
                                </template>
                            </el-table-column>
                        </el-table>
                        <!--<el-upload-->
                        <!--class="upload-demo"-->
                        <!--drag-->
                        <!--:action="url"-->
                        <!--:on-preview="handlePreview"-->
                        <!--:on-remove="handleRemove"-->
                        <!--:on-success="handleSuccess4"-->
                        <!--multiple-->
                        <!--:file-list="fileList"-->
                        <!--&gt;-->
                        <!--<i class="el-icon-upload"></i>-->
                        <!--<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>-->
                        <!--</el-upload>-->
                    </el-form-item>
                    <el-form-item :label="jbrOrZgjl" v-if="jbrOrZgjl=='技术部主管经理'&&NodeId!='备案'">
                        <el-select
                                clearable
                                multiple
                                style="width: 100%;"
                                v-model="jbrOrZgjlValue"
                                :placeholder="'请选择'+jbrOrZgjl">
                            <el-option
                                    v-for="item in jbrOrZgjlList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item v-if="NodeId=='两会'" label="两会召开时间">
                        <el-date-picker
                                v-model="xm.lhsj"
                                type="date"
                                value-format="yyyy-MM-dd"
                                placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item v-if="NodeId=='总经理办公会'" label="总经会时间">
                        <el-date-picker
                                v-model="xm.zjhsj"
                                type="date"
                                value-format="yyyy-MM-dd"
                                placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="推荐单位">
                        <el-input :readonly="groupId!='jsb_doman'&&groupId!='jsb_zgjl'&&groupId!='jsb_jl'"
                                  :autofocus="groupId=='jsb_doman'||groupId=='jsb_zgjl'||groupId=='jsb_jl'"
                                  v-model="xm.tjdw"
                                  type="textarea"
                                  placeholder="推荐单位"
                                  :autosize="{ minRows: 4, maxRows: 10}"
                        ></el-input>
                    </el-form-item>
                </el-form>
                <span v-if="!isxq" slot="footer" class="dialog-footer">
                <el-button @click="show_xq = false">取 消</el-button>
                <el-button v-if="NodeId=='备案'" type="primary" @click="wcba">完成备案</el-button>
                    <el-button type="warning" v-if="NodeId=='两会'" @click="bh">驳回</el-button>
                    <el-button type="warning" v-else-if="NodeId=='总经理办公会'" @click="bh">驳回</el-button>
                    <el-button type="warning" v-else-if="groupId!='doman'&&NodeId!='备案'"
                               @click="bh">驳 回</el-button>
                    <el-button type="primary" v-if="NodeId=='两会'" @click="tglh">通过两会</el-button>
                    <el-button type="primary" v-else-if="NodeId=='总经理办公会'" @click="tgzjh">通过总经会</el-button>
                    <el-button type="primary" v-else-if="groupId=='doman'" @click="cxsq">申请</el-button>
                    <el-button type="primary" v-else-if="NodeId!='备案'" @click="ty">同 意</el-button>
                </span>
                <span v-else slot="footer" class="dialog-footer">
                    <el-button @click="show_xq = false">取 消</el-button>
                </span>
            </el-dialog>

            <!--技术部办事员合同弹窗-->
            <el-dialog title="合同详情" :close-on-click-modal="false" :visible.sync="show_jsbdoman_ht" width="50%">
                <el-form ref="form" label-width="100px">
                    <el-form-item label="合同项目">
                        <el-input readonly v-model="contract.projectName" style="width: 210px"></el-input>
                        &nbsp&nbsp&nbsp&nbsp&nbsp合同日期&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                        <el-date-picker type="date" placeholder="选择日期" v-model="contract.rq" value-format="yyyy-MM-dd"
                                        style="width: 205px"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="对方当事人">
                        <el-input v-model="contract.dfdsr" style="width: 210px"></el-input>
                        &nbsp&nbsp&nbsp&nbsp&nbsp投资文号&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                        <el-input v-model="contract.tzwh" style="width: 210px"></el-input>
                    </el-form-item>
                    <el-form-item label="合同价款(元)">
                        <el-input v-model="contract.price" type="number" style="width: 210px"></el-input>
                        &nbsp&nbsp&nbsp&nbsp&nbsp合同经办人&nbsp&nbsp&nbsp&nbsp
                        <el-input v-model="contract.jbr" style="width: 210px"></el-input>
                    </el-form-item>
                    <el-form-item label="主办单位意见">
                        <el-input v-model="contract.zbdwyj" type="textarea"></el-input>
                    </el-form-item>
                    <el-form-item label="对方资质审查">
                        <el-checkbox-group v-model="zzsc">
                            <el-checkbox label="营业执照"></el-checkbox>
                            <br/>
                            <el-checkbox label="法定代表人身份证明或授权委托书"></el-checkbox>
                            <br/>
                            <el-checkbox label="企业登记证书"></el-checkbox>
                            <br/>
                            <el-checkbox label="安全生产许可证"></el-checkbox>
                            <br/>
                            <el-checkbox label="其他"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="评审结论">
                        <el-radio-group v-model="contract.psjl">
                            <el-radio style="margin-top: 8px" label="评审合格，同意签订此合同"></el-radio>
                            <br/>
                            <el-radio style="margin-top: 10px" label="存在缺陷，完善后再次评审"></el-radio>
                            <br/>
                            <el-radio style="margin-top: 10px" label="评审不合格，不能签订此合同"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="审批列表">
                        <el-table
                                :data="bzs"
                        >
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
                                    prop="time"
                                    label="时间"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="comment"
                                    label="备注"
                                    width="180">
                            </el-table-column>
                        </el-table>
                    </el-form-item>
                    <el-form-item label="文件列表">
                        <el-table :data="bcwjs" border style="margin-top: 20px">
                            <el-table-column prop="jd" label="节点" width="100px">
                            </el-table-column>
                            <el-table-column prop="wjmc" label="文件名称" width="110px">
                            </el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-upload
                                            class="upload-demo"
                                            :action="url"
                                            :on-preview="handlePreview"
                                            :before-remove="handleBeforeRemove"
                                            :on-success="handleSuccess4"
                                            multiple
                                            :file-list="fileList[scope.$index]">
                                        <el-button size="small" type="primary" @click="recordCurrentRow(scope.row)">
                                            点击上传
                                        </el-button>
                                    </el-upload>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="show_jsbdoman_ht=false">取消</el-button>
                <el-button @click="zfht" type="warning">作废</el-button>
                <el-button type="primary" @click="htzcsp">审批</el-button>
            </span>
            </el-dialog>

            <!--技术部经理合同处理弹窗-->
            <el-dialog title="合同详情" :close-on-click-modal="false" :visible.sync="show_jsbjl_ht" width="50%">
                <el-form ref="form" label-width="100px">
                    <el-form-item label="合同项目">
                        <el-input :readonly="true" v-model="contract.projectName" style="width: 210px"></el-input>
                        &nbsp&nbsp&nbsp&nbsp&nbsp合同日期&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                        <el-date-picker :readonly="true" type="date" placeholder="选择日期" v-model="contract.rq"
                                        value-format="yyyy-MM-dd"
                                        style="width: 205px"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="对方当事人">
                        <el-input :readonly="true" v-model="contract.dfdsr" style="width: 210px"></el-input>
                        &nbsp&nbsp&nbsp&nbsp&nbsp投资文号&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                        <el-input :readonly="true" v-model="contract.tzwh" style="width: 210px"></el-input>
                    </el-form-item>
                    <el-form-item label="合同价款(元)">
                        <el-input :readonly="true" v-model="contract.price" type="number"
                                  style="width: 210px"></el-input>
                        &nbsp&nbsp&nbsp&nbsp&nbsp合同经办人&nbsp&nbsp&nbsp&nbsp
                        <el-input :readonly="true" v-model="contract.jbr" style="width: 210px"></el-input>
                    </el-form-item>
                    <el-form-item label="主办单位意见">
                        <el-input :readonly="true" v-model="contract.zbdwyj" type="textarea"></el-input>
                    </el-form-item>
                    <el-form-item label="对方资质审查">
                        <el-input :readonly="true" v-model="contract.zzsc" type="textarea"></el-input>
                    </el-form-item>
                    <el-form-item label="评审结论">
                        <el-input :readonly="true" v-model="contract.psjl" type="textarea"></el-input>
                    </el-form-item>
                    <el-form-item label="审批列表">
                        <el-table
                                :data="bzs"
                        >
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
                                    prop="time"
                                    label="时间"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="comment"
                                    label="备注"
                                    width="180">
                            </el-table-column>
                        </el-table>
                    </el-form-item>
                    <el-form-item label="文件列表">
                        <el-table :data="bcwjs" border style="margin-top: 20px">
                            <el-table-column prop="jd" label="节点" width="100px">
                            </el-table-column>
                            <el-table-column prop="wjmc" label="文件名称" width="110px">
                            </el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-upload
                                            class="upload-demo"
                                            :action="url"
                                            :on-preview="handlePreview"
                                            :before-remove="handleBeforeRemove"
                                            :on-success="handleSuccess4"
                                            multiple
                                            :file-list="fileList[scope.$index]">
                                        <el-button size="small" type="primary" @click="recordCurrentRow(scope.row)">
                                            点击上传
                                        </el-button>
                                    </el-upload>
                                </template>
                            </el-table-column>
                        </el-table>
                        <!--<el-upload-->
                        <!--class="upload-demo"-->
                        <!--drag-->
                        <!--:action="url"-->
                        <!--:on-preview="handlePreview"-->
                        <!--:on-remove="handleRemove"-->
                        <!--:on-success="handleSuccess4"-->
                        <!--multiple-->
                        <!--:file-list="fileList"-->
                        <!--&gt;-->
                        <!--<i class="el-icon-upload"></i>-->
                        <!--<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>-->
                        <!--</el-upload>-->
                    </el-form-item>
                    <!--<el-form-item label="单位意见">-->
                    <!--<el-input type="textarea" v-model="contract.dwyj"></el-input>-->
                    <!--</el-form-item>-->
                    <!--<el-form-item label="财务部门意见">-->
                    <!--<el-input type="textarea" v-model="contract.cwbmyj"></el-input>-->
                    <!--</el-form-item>-->
                    <!--<el-form-item label="分管领导意见">-->
                    <!--<el-input type="textarea" v-model="contract.fgldyj"></el-input>-->
                    <!--</el-form-item>-->
                    <!--<el-form-item label="总经理意见">-->
                    <!--<el-input type="textarea" v-model="contract.zjlyj"></el-input>-->
                    <!--</el-form-item>-->
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="show_jsbjl_ht=false">取 消</el-button>
                <el-button type="warning" @click="show_htbh=true,comment=''">驳回</el-button>
                <el-button type="primary" @click="show_htty=true,comment='同意'">同意</el-button>
            </span>
            </el-dialog>

            <!--办公室合同处理弹窗-->
            <el-dialog title="合同详情" :close-on-click-modal="false" :visible.sync="show_bgs_ht" width="50%">
                <el-form ref="form" label-width="100px">
                    <el-form-item label="合同编号">
                        <el-input v-model="contract.contractNo"></el-input>
                    </el-form-item>
                    <el-form-item label="合同项目">
                        <el-input :readonly="true" v-model="contract.projectName" style="width: 210px"></el-input>
                        &nbsp&nbsp&nbsp&nbsp&nbsp合同日期&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                        <el-date-picker :readonly="true" type="date" placeholder="选择日期" v-model="contract.rq"
                                        value-format="yyyy-MM-dd"
                                        style="width: 205px"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="对方当事人">
                        <el-input :readonly="true" v-model="contract.dfdsr" style="width: 210px"></el-input>
                        &nbsp&nbsp&nbsp&nbsp&nbsp投资文号&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                        <el-input :readonly="true" v-model="contract.tzwh" style="width: 210px"></el-input>
                    </el-form-item>
                    <el-form-item label="合同价款(元)">
                        <el-input :readonly="true" v-model="contract.price" type="number"
                                  style="width: 210px"></el-input>
                        &nbsp&nbsp&nbsp&nbsp&nbsp合同经办人&nbsp&nbsp&nbsp&nbsp
                        <el-input :readonly="true" v-model="contract.jbr" style="width: 210px"></el-input>
                    </el-form-item>
                    <el-form-item label="主办单位意见">
                        <el-input :readonly="true" v-model="contract.zbdwyj" type="textarea"></el-input>
                    </el-form-item>
                    <el-form-item label="对方资质审查">
                        <el-input :readonly="true" v-model="contract.zzsc" type="textarea"></el-input>
                    </el-form-item>
                    <el-form-item label="评审结论">
                        <el-input :readonly="true" v-model="contract.psjl" type="textarea"></el-input>
                    </el-form-item>
                    <el-form-item label="审批列表">
                        <el-table
                                :data="bzs"
                        >
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
                                    prop="time"
                                    label="时间"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="comment"
                                    label="备注"
                                    width="180">
                            </el-table-column>
                        </el-table>
                    </el-form-item>
                    <el-form-item label="文件列表">
                        <el-table :data="bcwjs" border style="margin-top: 20px">
                            <el-table-column prop="jd" label="节点" width="100px">
                            </el-table-column>
                            <el-table-column prop="wjmc" label="文件名称" width="110px">
                            </el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-upload
                                            class="upload-demo"
                                            :action="url"
                                            :on-preview="handlePreview"
                                            :before-remove="handleBeforeRemove"
                                            :on-success="handleSuccess4"
                                            multiple
                                            :file-list="fileList[scope.$index]">
                                        <el-button size="small" type="primary" @click="recordCurrentRow(scope.row)">
                                            点击上传
                                        </el-button>
                                    </el-upload>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-form-item>
                    <!--<el-form-item label="单位意见">-->
                    <!--<el-input type="textarea" v-model="contract.dwyj"></el-input>-->
                    <!--</el-form-item>-->
                    <!--<el-form-item label="财务部门意见">-->
                    <!--<el-input type="textarea" v-model="contract.cwbmyj"></el-input>-->
                    <!--</el-form-item>-->
                    <!--<el-form-item label="分管领导意见">-->
                    <!--<el-input type="textarea" v-model="contract.fgldyj"></el-input>-->
                    <!--</el-form-item>-->
                    <!--<el-form-item label="总经理意见">-->
                    <!--<el-input type="textarea" v-model="contract.zjlyj"></el-input>-->
                    <!--</el-form-item>-->
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="show_bgs_ht=false">取 消</el-button>
                <el-button type="primary" @click="qrhtjs">确认合同接收</el-button>
            </span>
            </el-dialog>

            <!--点击处理招标弹窗 -->
            <el-dialog title="招标流程审批" :close-on-click-modal="false" :visible.sync="show_zbxq" width="50%">
                <el-form ref="form" label-width="100px">
                    <el-form-item label="项目">
                        <el-input readonly v-model="zhaobiao.xmName" rows="6"></el-input>
                    </el-form-item>
                    <el-form-item label="技术要求备注">
                        <el-input :readonly="groupId!='doman'" v-model="zhaobiao.jsyq" rows="6"
                                  type="textarea"></el-input>
                    </el-form-item>
                    <el-form-item v-if="groupId==='bgs'" label="发标时间">
                        <el-date-picker :readonly="groupId!='bgs'" v-model="zhaobiao.fbsj" type="date"
                                        placeholder="选择日期" value-format="yyyy-MM-dd"
                                        style="width: 205px"></el-date-picker>
                        &nbsp&nbsp&nbsp&nbsp定标时间&nbsp&nbsp&nbsp&nbsp
                        <el-date-picker v-if="groupId==='bgs'" :readonly="groupId!='bgs'" v-model="zhaobiao.dbsj"
                                        type="date"
                                        placeholder="选择日期" value-format="yyyy-MM-dd"
                                        style="width: 205px"></el-date-picker>
                    </el-form-item>

                    <el-form-item label="中标" v-if="groupId==='bgs'">
                        <el-input placeholder="单位" :disabled="isTjzbs" v-model="zhongbiao.zhongbiaodw"
                                  style="width: 200px"></el-input>
                        <el-input placeholder="中标价格(元)" :disabled="isTjzbs" v-model="zhongbiao.zhongbiaojg"
                                  type="number"
                                  style="width: 200px;margin-left: 4px"></el-input>
                        <el-button @click="tjzbdw" type="primary" :disabled="isTjzbs" style="margin-left: 10px"
                                   icon="el-icon-circle-plus">
                            添加中标单位
                        </el-button>
                    </el-form-item>
                    <el-form-item v-if="groupId==='bgs'">
                        <el-table
                                :data="zhongbiaos"
                        >
                            <el-table-column
                                    prop="zhongbiaodw"
                                    label="中标单位"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="zhongbiaojg"
                                     label="中标价格(元)"
                                    width="180">
                            </el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button type="text" @click="sczbdw(scope.row)" icon="el-icon-delete"
                                               style="color: red">删除
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-form-item>
                    <el-form-item v-if="groupId==='bgs'" label="工期">
                        <el-input v-model="zhaobiao.tbjzsj"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-table
                                :data="bzs"
                        >
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
                                    prop="time"
                                    label="时间"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="comment"
                                    label="备注"
                                    width="180">
                            </el-table-column>
                        </el-table>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input v-model="comment" rows="3"
                                  type="textarea"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-table :data="bcwjs" border style="margin-top: 20px">
                            <el-table-column prop="jd" label="节点" width="100px">
                            </el-table-column>
                            <el-table-column prop="wjmc" label="文件名称" width="110px">
                            </el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-upload
                                            class="upload-demo"
                                            :action="url"
                                            :on-preview="handlePreview"
                                            :before-remove="handleBeforeRemove"
                                            :on-success="handleSuccess2"
                                            multiple
                                            :file-list="fileList[scope.$index]">
                                        <el-button size="small" type="primary" @click="recordCurrentRow(scope.row)">
                                            点击上传
                                        </el-button>
                                    </el-upload>
                                </template>
                            </el-table-column>
                        </el-table>
                        <!--<el-upload-->
                        <!--class="upload-demo"-->
                        <!--drag-->
                        <!--:action="url"-->
                        <!--:on-preview="handlePreview"-->
                        <!--:before-remove="handleBeforeRemove"-->
                        <!--:on-success="handleSuccess2"-->
                        <!--multiple-->
                        <!--:file-list="fileList"-->
                        <!--&gt;-->
                        <!--<i class="el-icon-upload"></i>-->
                        <!--<div class="el-upload__text">将文件拖到此处，或<em>上传文件</em></div>-->
                        <!--</el-upload>-->
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="show_zbxq = false">取 消</el-button>
                <el-button v-if="groupId==='doman'" type="warning" @click="zf">作废</el-button>
                <el-button v-else-if="groupId!='bgs'" type="warning" @click="qd_zbbh">驳 回</el-button>
                <el-button v-if="groupId==='doman'" @click="cxsp" type="primary">重新审批</el-button>
                <el-button v-else-if="groupId==='jsb_doman'" type="primary" @click="fqbs">发起标书</el-button>
                <el-button v-else-if="groupId==='bgs'" type="primary" @click="wczb">完成招标</el-button>
                <el-button v-else type="primary" @click="ty2">同意</el-button>
            </span>
            </el-dialog>

            <!--技术部自己招标弹窗（办事员） -->
            <el-dialog title="招标流程审批" :close-on-click-modal="false" :visible.sync="show_zbxqjsb" width="50%">
                <el-form ref="form" label-width="100px">
                    <el-form-item label="项目">
                        <el-input :readonly="true" v-model="zhaobiao.xmName" rows="6"></el-input>
                    </el-form-item>
                    <el-form-item label="技术要求备注">
                        <el-input :readonly="groupId!='jsb_doman'" v-model="zhaobiao.jsyq" rows="6"
                                  type="textarea"></el-input>
                    </el-form-item>
                    <el-form-item v-if="groupId==='bgs'" label="发标时间">
                        <el-date-picker :readonly="groupId!='bgs'" v-model="zhaobiao.fbsj" type="date"
                                        placeholder="选择日期" value-format="yyyy-MM-dd"
                                        style="width: 205px"></el-date-picker>
                        &nbsp&nbsp&nbsp&nbsp定标时间&nbsp&nbsp&nbsp&nbsp
                        <el-date-picker v-if="groupId==='bgs'" :readonly="groupId!='bgs'" v-model="zhaobiao.dbsj"
                                        type="date"
                                        placeholder="选择日期" value-format="yyyy-MM-dd"
                                        style="width: 205px"></el-date-picker>
                    </el-form-item>

                    <el-form-item label="中标单位" v-if="groupId==='bgs'">
                        <el-input placeholder="单位" :disabled="isTjzbs" v-model="zhongbiao.zhongbiaodw"
                                  style="width: 200px"></el-input>
                        <el-input placeholder="中标价格(元)" :disabled="isTjzbs" v-model="zhongbiao.zhongbiaojg"
                                  type="number"
                                  style="width: 200px"></el-input>
                        <el-button @click="tjzbdw" type="primary" :disabled="isTjzbs" style="margin-left: 10px"
                                   icon="el-icon-circle-plus">
                            添加中标单位
                        </el-button>
                    </el-form-item>
                    <el-form-item v-if="groupId==='bgs'">
                        <el-table
                                :data="zhongbiaos"
                        >
                            <el-table-column
                                    prop="zhongbiaodw"
                                    label="中标单位"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="zhongbiaojg"
                                    label="中标价格(元)"
                                    width="180">
                            </el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button type="text" @click="sczbdw(scope.row)" icon="el-icon-delete"
                                               style="color: red">删除
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-form-item>
                    <el-form-item v-if="groupId==='bgs'" label="工期">
                        <el-input v-model="zhaobiao.tbjzsj"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-table
                                :data="bzs"
                        >
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
                                    prop="time"
                                    label="时间"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="comment"
                                    label="备注"
                                    width="180">
                            </el-table-column>
                        </el-table>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input v-model="comment" rows="3"
                                  type="textarea"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-table :data="bcwjs" border style="margin-top: 20px">
                            <el-table-column prop="jd" label="节点" width="100px">
                            </el-table-column>
                            <el-table-column prop="wjmc" label="文件名称" width="110px">
                            </el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-upload
                                            class="upload-demo"
                                            :action="url"
                                            :on-preview="handlePreview"
                                            :before-remove="handleBeforeRemove"
                                            :on-success="handleSuccess2"
                                            multiple
                                            :file-list="fileList[scope.$index]">
                                        <el-button size="small" type="primary" @click="recordCurrentRow(scope.row)">
                                            点击上传
                                        </el-button>
                                    </el-upload>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="show_zbxqjsb = false">取消</el-button>
                    <el-button type="warning" @click="zf">作废</el-button>
                    <el-button type="primary" @click="fqbs">发起标书</el-button>
                </span>
            </el-dialog>

            <!--前期驳回弹窗-->
            <el-dialog title="审批意见" :close-on-click-modal="false" :visible.sync="show_bh">
                <el-form>
                    <el-form-item v-if="groupId=='jsb_jl'||groupId=='jsb_zgjl'" label="驳回到：">
                        <el-select style="width: 215px;margin-left: 15px"
                                   v-model="bhd"
                                   placeholder="请选择">
                            <el-option
                                    v-for="item in bh_options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="审批意见：">
                        <el-input v-model="comment" type="textarea"
                                  placeholder="审批意见："
                                  :autosize="{ minRows: 2, maxRows: 4}"
                        ></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
            <el-button @click="show_bh=false">取 消</el-button>
            <el-button type="primary" @click="qd_bh">确 定</el-button>
            </span>
            </el-dialog>

            <!--招标驳回弹窗-->
            <el-dialog title="审批意见" :close-on-click-modal="false" :visible.sync="show_zbbh">
                <el-form>
                    <el-form-item label="审批意见：">
                        <el-input v-model="comment" type="textarea"
                                  placeholder="审批意见："
                                  :autosize="{ minRows: 2, maxRows: 4}"
                        ></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
            <el-button @click="show_zbbh=false;comment='同意'">取 消</el-button>
            <el-button type="primary" @click="qd_zbbh">确 定</el-button>
            </span>
            </el-dialog>

            <!--同意弹窗-->
            <el-dialog title="审批意见" :close-on-click-modal="false" :visible.sync="show_ty">
                <el-form>
                    <el-form-item label="审批意见：">
                        <el-input style="margin-top: 5px" v-model="comment" type="textarea"
                                  :autosize="{ minRows: 2, maxRows: 4}"
                        ></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
            <el-button @click="show_ty=false">取 消</el-button>
            <el-button type="primary" @click="qd_ty">确 定</el-button>
            </span>
            </el-dialog>

            <!--合同同意弹窗-->
            <el-dialog title="合同审批意见" :close-on-click-modal="false" :visible.sync="show_htty">
                <el-form>
                    <el-form-item label="审批意见：">
                        <el-input style="margin-top: 5px" v-model="comment" type="textarea"
                                  :autosize="{ minRows: 2, maxRows: 4}"
                        ></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
            <el-button @click="show_htty=false">取 消</el-button>
            <el-button type="primary" @click="htjsbjlty">确 定</el-button>
            </span>
            </el-dialog>

            <!--合同同意弹窗-->
            <el-dialog title="合同审批意见" :close-on-click-modal="false" :visible.sync="show_htbh">
                <el-form>
                    <el-form-item label="审批意见：">
                        <el-input style="margin-top: 5px" v-model="comment" type="textarea"
                                  :autosize="{ minRows: 2, maxRows: 4}"
                        ></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
            <el-button @click="show_htbh=false">取 消</el-button>
            <el-button type="primary" @click="htjsbjlbh">确 定</el-button>
            </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import bus from '../common/bus';

    export default {
        name: 'dashboard',
        inject: ['reload'],
        data() {
            return {
                userName: localStorage.getItem('userName'),
                groupName: localStorage.getItem('groupName'),
                departmentName: localStorage.getItem('departmentName'),
                groupId: localStorage.getItem('groupId'),
                //驳回到的节点
                bhd: '',
                //技术部经理驳回选项
                bh_options: [],
                //判断是否备案（决定同意、驳回按钮的显示）
                isbs: false,
                //备注数组
                bzs: [],
                options: [
                    {
                    value: '同意',
                    label: '同意'
                }, {
                    value: '已阅',
                    label: '已阅'
                }, {
                    value: '安计划进行',
                    label: '安计划进行'
                }],
                //合同驳回弹窗
                show_htbh: false,
                //合同同意弹窗
                show_htty: false,
                //前期驳回弹窗
                show_bh: false,
                //招标驳回弹窗
                show_zbbh: false,
                //同意弹窗
                show_ty: false,
                //技术部经理合同处理弹窗
                show_jsbjl_ht: false,
                //技术部办事员合同处理弹窗
                show_jsbdoman_ht: false,
                //办公室合同处理
                show_bgs_ht: false,
                url: '',
                fileList: [],
                commentList: [],
                //详情弹窗
                show_xq: false,
                //工程技术部
                show_xqgcjsb: false,
                comment: '同意',
                userId: localStorage.getItem('userId'),
                xm: {},
                ip: 'http://10.197.41.100:8080',
                message: 'first',
                //项目
                Xms: [],
                //备案项目
                baXms: [],
                //驳回项目
                bhXms: [],
                NodeId: '',
                src: '',
                cur_page: 1,
                show_xjsq: false,
                show_zt: false,
                xm: {},
                fileList: [],
                ip: 'http://10.197.41.100:8080',
                //立项类别
                xmdl: [
                    {
                    id: '临时立项',
                    name: '临时立项'
                }, {
                    id: '年度计划',
                    name: '年度计划'
                }, {
                    id: '年度维保',
                    name: '年度维保'
                }, {
                    id: '股份项目',
                    name: '股份项目'
                }],
                //项目类别
                xmlb: [
                    {
                    id: '固定资产',
                    name: '固定资产'
                }, {
                    id: '维修',
                    name: '维修'
                }, {
                    id: '物资采购',
                    name: '物资采购'
                }],
                //项目大类
                xmfl: [
                    {
                    id: '土建',
                    name: '土建'
                }, {
                    id: '设备',
                    name: '设备'
                }, {
                    id: '信息',
                    name: '信息'
                }, {
                    id: '物资',
                    name: '物资'
                }
                ],
                sqb: {//申请表
                    projectNo: '',
                    userId: localStorage.getItem('userId'), //用户id
                    project_name: "",  //项目名称
                    project_type: '',  //项目类型
                    person_in_charge: '', //     负责人
                    investment_establish: '',//     投资概算
                    establish_reason: '',//      立项理由
                    scale: '', //      内容规模
                    illustration: ''//         概要说明
                },
                //项目列表
                xmList: [],
                xmDetails: {},
                zhaobiaos: [],
                contracts: [],
                contract: {},


                zhaobiao: {},
                show_zbxq: false,
                tbdws: [],
                zhongbiaos: [],
                //投标单位
                dw: '',
                //中标
                zhongbiao: {
                    id: '',
                    zbid: '',
                    xmid: '',
                    zhongbiaodw: '',
                    zhongbiaojg: ''
                },
                //是否详情
                isxq: false,
                zbs: [],
                //招标详情技术部办事员弹窗
                show_zbxqjsb: false,
                zzsc: [],
                jbrOrZgjl: localStorage.getItem('groupId') == 'jsb_doman' ? '技术部主管经理' : '',// 弹出框经理条目
                jbrOrZgjlList: [],// 经理列表
                jbrOrZgjlValue: [],// 下拉选择的经理值
                //必传文件列表
                bcwjs: [],
                daibanSearch:{// 待办搜索字段
                    projectNo:'',// 项目编号
                    projectNam:'',// 项目名称
                    declarationDep:''// 立项部门
                },
                bms:[],// 所有立项部门
                daibanSearchRawData:{// 保存待办搜索过滤前的数据
                    Xms:[],
                    baXms:[],
                    bhXms:[],
                    zhaobiaos:[],
                    contracts:[]
                }
            }
        },
        watch: {
            zhongbiaojg(newValue, oldValue) {
                if (Number(newValue) < 0) {
                    this.$alert('中标金额只能填写大于等于0!', '提示', {
                        confirmButtonText: '确定',
                        type: 'error'
                    })
                    this.zhongbiao.zhongbiaojg = 1
                }
            },

            show_xq(newValue, oldValue) {// 监听详情显示
                if (newValue == true) {
                    this.getjbrOrZgjlList();// 获取经办人或主管经理列表
                }
            },

            //技术部自己的项目弹窗
            show_xqgcjsb(newValue, oldValue) {
                if (newValue == true) {
                    this.getjbrOrZgjlList();// 获取经办人或主管经理列表
                }
            }
        },
        computed: {
            zhongbiaojg() {
                return this.zhongbiao.zhongbiaojg
            },
            isTjzbs() {
                return this.zhongbiaos.length > 0
            },
            role() {
                return localStorage.getItem('groupName')
            },
            allNum() {
                if (localStorage.getItem('userId') === 'db' || localStorage.getItem('userId') === 'lze')
                    return this.xmList.length + this.bhXms.length
                if (localStorage.getItem('groupId') === 'jsb_doman')
                    return this.xmList.length + this.Xms.length + this.baXms.length
                return this.xmList.length + this.Xms.length
            },
            doNum() {
                if (localStorage.getItem('userId') === 'db' || localStorage.getItem('userId') === 'lze')
                    return this.xmList.length
                if (localStorage.getItem('groupId') === 'doman')
                    return this.xmList.length - this.bhXms.length
                return this.xmList.length
            },
            unDoNum() {
                if (localStorage.getItem('groupId') === 'doman')
                    return this.bhXms.length
                if (localStorage.getItem('groupId') === 'jsb_doman')
                    return this.baXms.length + this.Xms.length
                return this.Xms.length
            }
        },
        created() {
            // this.getuser()
            this.getxmList()
            //领取项目
            this.lqxm()
            //如果是办事员，定位到驳回项目
            if (localStorage.getItem('groupId') === 'doman') {
                this.message = 'third'
            } else {
                this.message = 'first'
            }
            //如果是经办人或者苏燕春，还要拿到备案的项目
            if (localStorage.getItem('groupId') == 'jsb_doman' || localStorage.getItem('userId') == 'syc') {
                this.getBaxm()
            }
            //领取招标
            this.lqzhaobiao()
            //领取合同
            this.getContracts()
            //拿占比
            this.getzb()

            this.handleListener();

            this.getAllDptName()
        },

        activated() {
            this.handleListener();
        },
        deactivated() {
            window.removeEventListener('resize', this.renderChart);
            bus.$off('collapse', this.handleBus);
        },
        methods: {
            //推荐单位修改
            xgtjdw(xmid,tjdw){
                axios.get(this.ip+'/projectApplication/updataTjdw',{
                    params:{
                        xmid:xmid,
                        tjdw:tjdw
                    }
                })
            },

            //技术部自己的项目，驳回再申请
            jsbsq() {
                if (this.jbrOrZgjlValue == null || this.jbrOrZgjlValue.length == 0) {
                    this.$message.error("请选择技术部主管经理！")
                    return
                }
                this.cl('jbr', true)
            },

            //办公室确认合同已接受
            qrhtjs() {
                axios.get(this.ip + "/bcwj/jcwj", {
                    params: {
                        id: this.contract.id,
                        lc: '合同',
                        dqjd: '办公室确认'
                    }
                }).then(res => {
                    if (res.data) {
                        if (this.contract.contractNo === null || this.contract.contractNo === '') {
                            this.$message.error('请填写合同编号！')
                            return
                        }
                        axios.get(this.ip + '/contract/qrhtyjs', {
                            params: {
                                dwyj: this.contract.dwyj,
                                htno: this.contract.contractNo
                            }
                        })
                            .then(res => {
                                if (res.data)
                                    this.$message.success("处理完成！")
                                else
                                    this.$message.error("处理失败！")
                                this.reload()
                            })
                    } else {
                        axios.get(this.ip + '/bcwj/bcwjm', {
                            params: {
                                lc: '合同',
                                dqjd: '办公室确认'
                            }
                        }).then(res => {
                            let filenames = ''
                            for (let i = 0; i < res.data.length; i++) {
                                filenames = filenames + res.data[i].wjmc + ","
                            }
                            //去后面,
                            filenames = filenames.substring(0, filenames.length - 1)
                            this.$message.error("申请前，请上传文件：" + filenames)
                        })
                    }
                })

            },

            //合同再次审批
            htzcsp() {
                axios.get(this.ip + "/bcwj/jcwj", {
                    params: {
                        id: this.contract.id,
                        lc: '合同',
                        dqjd: '填写合同表单'
                    }
                }).then(res => {
                    if (res.data) {
                        this.contract.zzsc = ''
                        for (let i = 0; i < this.zzsc.length; i++) {
                            if (i < this.zzsc.length - 1)
                                this.contract.zzsc = this.contract.zzsc + this.zzsc[i] + '、'
                            else
                                this.contract.zzsc = this.contract.zzsc + this.zzsc[i]
                        }
                        delete this.contract.projectName
                        axios.post(this.ip + '/contract/htzcsp', this.contract).then(res => {
                            if (res.data) {
                                this.$message.success("已发往技术部经理审批")
                            } else {
                                this.$message.error("处理失败！")
                            }
                            this.reload()
                        })
                    } else {//没有文件
                        axios.get(this.ip+'/bcwj/bcwjm',{
                            params:{
                                lc:'合同',
                                dqjd:'填写合同表单'
                            }
                        }).then(res=>{
                            let filenames=''
                            for(let i=0;i<res.data.length;i++){
                                filenames=filenames+res.data[i].wjmc+","
                            }
                            //去后面,
                            filenames=filenames.substring(0,filenames.length-1)
                            this.$message.error("申请前，请上传文件："+filenames)
                        })
                    }
                })
            },

            //作废合同
            zfht() {
                this.$confirm('此操作将永久删除该合同,是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.get(this.ip + '/contract/htzf', {
                        params: {
                            htid: this.contract.id
                        }
                    }).then(res => {
                        if (res.data) {
                            this.$message.success("作废成功！")
                        } else {
                            this.$message.error("作废失败！")
                        }
                        this.reload()
                    })
                })
            },

            //合同技术部经理驳回
            htjsbjlbh() {
                const loading = this.$loading({
                    lock: true,
                    text: '处理中……',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                this.comment = '驳回:' + this.comment
                axios.get(this.ip + '/contract/jsbjldoht', {
                    params: {
                        dwyj: this.contract.dwyj,
                        userId: localStorage.getItem('userId'),
                        value: false,
                        comment: this.comment
                    }
                }).then(res => {
                    loading.close()
                    if (res.data) {
                        this.$message.success("已处理！")
                    } else {
                        this.$message.error("处理失败！")
                    }
                    this.reload()
                })
            },
            //合同技术部经理同意
            htjsbjlty() {
                const loading = this.$loading({
                    lock: true,
                    text: '处理中……',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                axios.get(this.ip + '/contract/jsbjldoht', {
                    params: {
                        dwyj: this.contract.dwyj,
                        userId: localStorage.getItem('userId'),
                        value: true,
                        comment: this.comment
                    }
                }).then(res => {
                    loading.close()
                    if (res.data) {
                        this.$message.success("已处理！")
                    } else {
                        this.$message.error("处理失败！")
                    }
                    this.reload()
                })
            },


            //合同处理点击事件
            htcl(row) {
                this.contract = row
                this.url = 'http://10.197.41.100:8080/contract/uploadFile?dwyj=' + row.dwyj + '&userId=' + localStorage.getItem('userId')
                //拿合同评论
                this.gethtbz()
                //领取附件
                this.lqfj('合同', row.id)
                if (this.groupId === 'jsb_jl') {
                    this.show_jsbjl_ht = true
                } else if (this.groupId === 'jsb_doman') {
                    this.zzsc = row.zzsc.split('、')
                    this.show_jsbdoman_ht = true
                } else {
                    this.show_bgs_ht = true
                }
            },

            //拿合同备注
            gethtbz() {
                axios.get(this.ip + '/zhaobiao/getComment', {
                    params: {
                        zbpid: this.contract.dwyj
                    }
                }).then(res => {
                    this.bzs = res.data
                })
            },

            //拿需要处理的合同
            getContracts() {
                if (this.groupId === 'jsb_jl') {
                    axios.get(this.ip + '/contract/getJsbjlHts').then(res => {
                        this.contracts = res.data
                        this.daibanSearchRawData.contracts=this.contracts
                    })
                } else if (this.groupId === 'bgs') {
                    axios.get(this.ip + '/contract/getBgsHts', {
                        params: {
                            userId: localStorage.getItem('userId')
                        }
                    }).then(res => {
                        this.contracts = res.data
                        this.daibanSearchRawData.contracts=this.contracts
                    })
                } else {
                    axios.get(this.ip + '/contract/getJsbdomanHts', {
                        params: {
                            userId: localStorage.getItem('userId')
                        }
                    }).then(res => {
                        this.contracts = res.data
                        this.daibanSearchRawData.contracts=this.contracts
                    })
                }
            },

            //确定项目编号
            qdxmbh() {
                axios.get(this.ip + '/projectApplication/xgxmbh', {
                    params: {
                        xmid: this.xm.id,
                        xmbh: this.xm.projectNo
                    }
                }).then(res => {
                })
            },
            //拿占比
            getzb() {
                axios.get(this.ip + '/projectApplication/zb')
                    .then(res => {
                        this.zbs = res.data.split("-")
                        for (let i = 0; i < this.zbs.length; i++) {
                            this.zbs[i] = Number(this.zbs[i])
                        }
                    })
            },
            //两会点击备案
            ba() {
                this.cl('lh', 3)
            },
            //拿备注
            getbzs() {
                axios.get(this.ip + '/zhaobiao/getComment', {
                    params: {
                        zbpid: this.zhaobiao.zbpid
                    }
                }).then(res => {
                    this.bzs = res.data
                })
            },
            //删除投标单位
            scdw(row) {
                axios.get(this.ip + '/zhaobiao/deletTbdw', {
                    params: {
                        id: row.id
                    }
                }).then(res => {
                    if (res.data)
                        this.getAlltbdw()
                })
            },
            //重新审批（招标）
            cxsp() {
                axios.get(this.ip + '/zhaobiao/cxsq', {
                    params: {
                        id: this.zhaobiao.id,
                        jsyq: this.zhaobiao.jsyq,
                        comment: this.comment,
                        userId: this.userId
                    }
                })
                    .then(res => {
                        this.reload()
                    })
            },
            //删除中标单位
            sczbdw(row) {
                axios.get(this.ip + '/zhongbiao/deletZhongbiao', {
                    params: {
                        id: row.id
                    }
                }).then(res => {
                    if (res.data) {
                        this.getZhongbiaodw()
                    }
                })
            },
            //完成招标
            wczb() {
                axios.get(this.ip + "/bcwj/jcwj", {
                    params: {
                        id: this.zhaobiao.id,
                        lc: '招标',
                        dqjd: '定标'
                    }
                }).then(res => {
                    if (res.data) {
                        if (this.zhaobiao.fbsj != "" && this.zhaobiao.fbsj != null && this.zhaobiao.dbsj != "" && this.zhaobiao.dbsj != null && this.zhaobiao.tbjzsj != null && this.zhaobiao.tbjzsj != '' && this.zhongbiaos.length != 0) {
                            axios.get(this.ip + '/zhaobiao/wczb', {
                                params: {
                                    userId: localStorage.getItem('userId'),
                                    id: this.zhaobiao.id,
                                    fbsj: this.zhaobiao.fbsj,
                                    dbsj: this.zhaobiao.dbsj,
                                    tbjzsj: this.zhaobiao.tbjzsj,//工期
                                    comment: this.comment
                                }
                            }).then(res => {
                                if (res.data) {
                                    this.$message.success("完成定标!")
                                    this.reload()
                                } else
                                    this.$message.error("失败！")
                            })
                        } else {
                            this.$message.error("请完成该表单填写！")
                        }
                    } else {
                        axios.get(this.ip + '/bcwj/bcwjm', {
                            params: {
                                lc: '招标',
                                dqjd: '定标'
                            }
                        }).then(res => {
                            let filenames = ''
                            for (let i = 0; i < res.data.length; i++) {
                                filenames = filenames + res.data[i].wjmc + ","
                            }
                            //去后面,
                            filenames = filenames.substring(0, filenames.length - 1)
                            this.$message.error("完成招标前，请上传文件：" + filenames)
                        })
                    }
                })
            },
            //添加中标单位
            tjzbdw() {
                if (this.zhongbiao.zhongbiaodw === '' || this.zhongbiao.zhongbiaodw == null || this.zhongbiao.zhongbiaojg === '' || this.zhongbiao.zhongbiaojg == null) {
                    this.$message.error("请添加中标信息！")
                    return
                }
                this.zhongbiao.zbid = this.zhaobiao.id
                this.zhongbiao.xmid = this.zhaobiao.xmid
                axios.post(this.ip + '/zhongbiao/addZhongbiao', this.zhongbiao)
                    .then(res => {
                        if (res.data) {
                            this.$message.success("新建成功！")
                            this.zhongbiao.zhongbiaodw = ''
                            this.zhongbiao.zhongbiaojg = ''
                            this.getZhongbiaodw()
                        } else {
                            this.$message.error("失败！")
                        }

                    })
            },
            //同意 2为招标流程中的同意
            ty2() {
                if (localStorage.getItem('groupId') === 'jsb_doman')
                    this.cl2("jbr", true)
                else if (localStorage.getItem('groupId') === 'jsb_zgjl')
                    this.cl2('zgjl', true)
                else if (localStorage.getItem('groupId') === 'jsb_jl')
                    this.cl2('jl', true)
                // this.show_zbxq = false
                // this.zhaobiao = {}
            },
            //处理 招标流程中的处理
            cl2(varName, value) {
                const loading = this.$loading({
                    lock: true,
                    text: '处理中……',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                axios.get(this.ip + '/zhaobiao/doNode', {
                    params: {
                        zbpid: this.zhaobiao.zbpid,
                        userId: localStorage.getItem('userId'),
                        varName: varName,
                        value: value,
                        comment: this.comment
                    }
                })
                    .then(res => {
                        loading.close()
                        this.reload()//刷新
                    })
            },
            //添加投标单位
            tjtbdw() {
                if (this.dw != '' && this.dw != null) {
                    axios.get(this.ip + '/zhaobiao/addTbdw', {
                        params: {
                            zbid: this.zhaobiao.id,
                            dw: this.dw
                        }
                    }).then(res => {
                        this.dw = ''
                        this.getAlltbdw()
                    })
                }
            },
            //发起标书
            fqbs() {
                //检查文件
                axios.get(this.ip + "/bcwj/jcwj", {
                    params: {
                        id: this.zhaobiao.id,
                        lc: '招标',
                        dqjd: '技术部经办人'
                    }
                }).then(res => {
                    if (res.data) {
                        axios.get(this.ip + '/zhaobiao/bsfq', {
                            params: {
                                id: this.zhaobiao.id,
                                jsyq: this.zhaobiao.jsyq,
                                userId: localStorage.getItem('userId'),
                                comment: this.comment
                            }
                        }).then((res) => {
                            if (res.data) {
                                this.$message.success("招标流程已发往主管经理！")
                                this.reload()
                            } else {
                                this.$message.error("发起失败！")
                            }
                        })
                    } else {
                        axios.get(this.ip + '/bcwj/bcwjm', {
                            params: {
                                lc: '招标',
                                dqjd: '技术部经办人'
                            }
                        }).then(res => {
                            let filenames = ''
                            for (let i = 0; i < res.data.length; i++) {
                                filenames = filenames + res.data[i].wjmc + ","
                            }
                            //去后面 ,
                            filenames = filenames.substring(0, filenames.length - 1)
                            this.$message.error("申请前，请上传文件：" + filenames)
                        })
                    }
                })
            },
            //点击处理
            zbcl(row) {
                this.zhaobiao = row
                this.getbzs()
                this.lqfj('招标', row.id)
                this.getZhongbiaodw()
                if (this.groupId === 'jsb_doman') {
                    this.show_zbxqjsb = true
                } else {
                    this.show_zbxq = true
                }
                this.url = 'http://10.197.41.100:8080/zhaobiao/uploadFile?zbpid=' + row.zbpid + '&userId=' + localStorage.getItem('userId')
                // axios.get(this.ip + '/user/userIdToDept', {
                //     params: {
                //         userId: this.zhaobiao.sqr
                //     }
                // }).then(res => {
                //     if (res.data === '工程技术部' && this.groupId === 'jsb_doman')
                //         this.show_zbxqjsb = true
                //     else
                //         this.show_zbxq = true
                // })
            },
            //根据招标表中的申请人拿到申请部门

            //拿到所有投标单位
            getAlltbdw() {
                axios.get(this.ip + '/zhaobiao/getAllTbdw', {
                    params: {
                        zbid: this.zhaobiao.id
                    }
                }).then(res => {
                    this.tbdws = res.data
                })
            },
            //拿到中标单位
            getZhongbiaodw() {
                const loading = this.$loading({
                    lock: true,
                    text: '处理中……',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                axios.get(this.ip + '/zhongbiao/getZhongbiaoByZbid', {
                    params: {
                        zbid: this.zhaobiao.id
                    }
                }).then(res => {
                    this.zhongbiaos = res.data
                    loading.close()
                })
            },

            //项目作废（工程技术部）
            xmzf() {
                this.$confirm("该操作将作废该条项目，是否确定", "提示")
                    .then(() => {
                        axios.get(this.ip + '/projectApplication/xmzf', {
                            params: {
                                id: this.xm.id,
                                pid: this.xm.pid
                            }
                        }).then(res => {
                            if (res.data) {
                                this.$message.success("已作废！")
                            } else {
                                this.$message.error("作废失败！")
                            }
                            this.reload()
                        })
                    })
                    .catch(() => {
                    })
            },
            //作废招标审批
            zf() {
                this.$confirm("该操作将作废该条审批，是非确定", "提示")
                    .then(() => {
                        axios.get(this.ip + '/zhaobiao/zfzb', {
                            params: {
                                id: this.zhaobiao.id,
                                zbpid: this.zhaobiao.zbpid
                            }
                        }).then(res => {
                            if (res.data) {
                                this.$message.success("已作废！")
                            } else {
                                this.$message.error("作废失败！")
                            }
                            this.reload()
                        })
                    })
                    .catch(() => {
                    })
            },
            //上传成功，重新新请求合同附件
            handleSuccess4(response, file, fileList) {
                this.lqfj('合同', this.contract.id)
            },

            //上传成功，重新请求
            handleSuccess2() {
                this.lqfj('招标', this.zhaobiao.id)
            },
            //领取招标
            lqzhaobiao() {
                axios.get(this.ip + '/zhaobiao/lqzhaobiao', {
                    params: {
                        userId: localStorage.getItem('userId')
                    }
                }).then(res => {
                    if (res.data.length != 0) {
                        this.zhaobiaos = res.data
                        //填充项目名称和用户名
                        for (let i = 0; i < this.zhaobiaos.length; i++) {
                            axios.get(this.ip + '/projectApplication/xmIdToxmNo', {
                                params: {
                                    xmId: this.zhaobiaos[i].xmid
                                }
                            }).then(res => {
                                this.zhaobiaos[i].xmNo = res.data
                                this.$set(this.zhaobiaos, i, this.zhaobiaos[i]);
                            })

                            axios.get(this.ip + '/projectApplication/xmIdToxmName', {
                                params: {
                                    xmId: this.zhaobiaos[i].xmid
                                }
                            }).then(res => {
                                this.zhaobiaos[i].xmName = res.data
                                this.$set(this.zhaobiaos, i, this.zhaobiaos[i]);
                            })
                            axios.get(this.ip + '/user/userIdTouserName', {
                                params: {
                                    userId: this.zhaobiaos[i].sqr
                                }
                            }).then(res => {
                                this.zhaobiaos[i].userName = res.data
                                this.$set(this.zhaobiaos, i, this.zhaobiaos[i]);
                            })
                        }
                        this.daibanSearchRawData.zhaobiaos=this.zhaobiaos
                    }
                })
            },

            //重新申请
            cxsq() {
                axios.post(this.ip + '/projectApplication/cxsq', this.xm)
                    .then(res => {
                        this.show_xq = false
                        this.reload()
                    })
            },

            //完成备案
            wcba() {
                //检查备案文件
                axios.get(this.ip + '/bcwj/jcwj', {
                    params: {
                        id: this.xm.id,
                        lc: '前期',
                        dqjd: '备案'
                    }
                }).then(res => {
                    //有文件
                    if (res.data) {
                        //备案请求
                        axios.get(this.ip + '/projectApplication/wcba', {
                            params: {
                                pid: this.xm.pid,
                                userId: localStorage.getItem('userId')
                            }
                        }).then(() => {
                            this.reload()
                        })
                    } else {//没文件
                        axios.get(this.ip + '/bcwj/bcwjm', {
                            params: {
                                lc: '前期',
                                dqjd: '备案'
                            }
                        }).then(res => {
                            let filenames = ''
                            for (let i = 0; i < res.data.length; i++) {
                                filenames = filenames + res.data[i].wjmc + ","
                            }
                            //去掉后面 ,
                            filenames = filenames.substring(0, filenames.length - 1)
                            this.$message.error("备案前，请上传文件：" + filenames)
                        })
                        return
                    }
                })

            },

            //拿到当前节点名字
            getNodeId(pid) {
                axios.get(this.ip + '/projectApplication/getPidNode', {
                    params: {
                        pid: pid
                    }
                })
                    .then(res => {
                        this.NodeId = res.data
                    })
            },

            //确定前期驳回
            qd_bh() {

                //技术部经理的驳回
                if (this.groupId === 'jsb_jl' || this.groupId === 'jsb_zgjl') {
                    if (this.comment == '' || this.comment == null || this.bhd == '' || this.bhd == '') {
                        this.$message.error("请填写驳回理由和选择驳回节点！")
                        return
                    } else {
                        this.comment = '驳回：' + this.comment
                        const loading = this.$loading({
                            lock: true,
                            text: '处理中……',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        });
                        if (this.groupId === 'jsb_jl') {
                            axios.get(this.ip + '/projectApplication/jsjlBh', {
                                params: {
                                    pid: this.xm.pid,
                                    userId: localStorage.getItem('userId'),
                                    comment: this.comment,
                                    bhd: this.bhd
                                }
                            }).then(res => {
                                if (res.data) {
                                    this.$message.success("处理成功！")
                                } else {
                                    this.$message.error("处理失败！")
                                }
                                this.reload()
                                loading.close()
                            })
                        } else {
                            axios.get(this.ip + '/projectApplication/jszgjlBh', {
                                params: {
                                    pid: this.xm.pid,
                                    userId: localStorage.getItem('userId'),
                                    comment: this.comment,
                                    bhd: this.bhd
                                }
                            }).then(res => {
                                if (res.data) {
                                    this.$message.success("处理成功！")
                                } else {
                                    this.$message.error("处理失败！")
                                }
                                this.reload()
                                loading.close()
                            })
                        }
                    }
                } else {
                    if (this.comment == '' || this.comment == null)
                        this.$message.error("请填写驳回理由")
                    else {
                        this.comment = '驳回：' + this.comment
                        if (localStorage.getItem('groupId') == 'zgjl') {//主管经理驳回
                            this.cl('zgjl', false)
                        } else if (localStorage.getItem('groupId') == 'jl') {//经理驳回
                            this.cl('jl', false)
                        } else if (localStorage.getItem('groupId') == 'jsb_doman') {//经办人驳回
                            this.cl('jbr', false)
                        } else if (localStorage.getItem('groupId') == 'jsb_zgjl') {
                            this.cl('jszgjl', false)
                        } else if (localStorage.getItem('groupId') == 'bgs') {
                            this.cl('lh', 2)
                        } else {//doman的驳回的话，只能是邓博、和李泽恩的总经会的驳回
                            this.cl('zjl', 1)
                        }
                    }
                }
            },
            //确定同意
            qd_ty() {
                if (this.groupId === 'bgs') {
                    //拿阀值
                    axios.get(this.ip + "/zjhfz/get")
                        .then(res => {
                            var fz = res.data[0].fz
                            axios.post(this.ip + '/projectApplication/updataXm', this.xm).then(res => {
                                //两会节点
                                if (Number(this.xm.investmentEstimate) >= Number(fz)) {
                                    //大于阀值，总经理办公会
                                    this.cl('lh', 0)
                                } else
                                    this.cl('lh', 1) //结束
                            })
                            return
                        })
                }

                //邓博，李泽恩处理总经会
                if ((localStorage.getItem('userId') === 'db' || localStorage.getItem('userId') === 'lze') && this.NodeId === '总经理办公会') {
                    axios.post(this.ip + '/projectApplication/updataXm', this.xm).then(res => {
                        if (this.xm.depAuditOpinion != '股份项目') {
                            this.$confirm('是否备案', '提示', {
                                confirmButtonText: '是',
                                cancelButtonText: '否',
                                type: 'warning'
                            }).then(() => {
                                this.cl('zjl', 0)//备案
                            }).catch(() => {
                                this.cl('zjl', 2)
                            })
                            return
                        } else {
                            this.cl('zjl', 0)
                        }

                    })
                }
                if (localStorage.getItem('groupId') == 'zgjl') {//主管经理同意
                    this.cl('zgjl', true)
                } else if (localStorage.getItem('groupId') == 'jl') {
                    //经理可以修改更新项目
                    axios.post(this.ip + '/projectApplication/updataXm', this.xm).then(res => {
                        this.cl('jl', true)
                    })
                } else if (localStorage.getItem('groupId') == 'jsb_doman') {
                    this.cl('jbr', true)
                } else if (localStorage.getItem('groupId') == 'jsb_zgjl') {
                    this.cl('jszgjl', true)
                } else if (localStorage.getItem('groupId') == 'jsb_jl') {
                    this.cl('jsjl', true)
                }
            },

            //驳回（前期审批）
            bh() {
                if(this.groupId=='jsb_doman'||this.groupId=='jsb_zgjl'||this.groupId=='jsb_jl'){
                    this.xgtjdw(this.xm.id,this.xm.tjdw)
                }
                this.comment = ''
                if (this.xm.declarationDep === '工程技术部') {
                    if (this.groupId === 'jsb_jl') {//技术部经理
                        this.bh_options = [{
                            value: '技术部主管',
                            label: '技术部主管经理'
                        }, {
                            value: '技术部经办人',
                            label: '技术部经办人'
                        }]
                    } else {
                        this.bh_options = [{
                            value: '技术部经办人',
                            label: '技术部经办人'
                        }]
                    }
                } else {
                    if (this.groupId === 'jsb_jl') {//技术部经理
                        this.bh_options = [{
                            value: '技术部主管',
                            label: '技术部主管经理'
                        }, {
                            value: '技术部经办人',
                            label: '技术部经办人'
                        }, {
                            value: '立项部门经办人',
                            label: '立项部门经办人'
                        }]
                    } else {//技术部主管经理经理
                        this.bh_options = [{
                            value: '技术部经办人',
                            label: '技术部经办人'
                        }, {
                            value: '立项部门经办人',
                            label: '立项部门经办人'
                        }]
                    }
                }

                this.show_bh = true
            },

            //驳回（招标管理）
            bh2() {
                //this.comment = ''
                this.show_zbbh = true
            },

            //确定招标驳回
            qd_zbbh() {
                if (this.comment == '' || this.comment == null) {
                    this.$message.error("请填写备注！")
                    return
                }
                if (this.comment == '同意') {
                    this.$message.error("驳回必须修改备注！")
                    return
                }
                this.comment = '驳回：' + this.comment
                if (localStorage.getItem('groupId') === 'jsb_doman')
                    this.cl2('jbr', false)
                else if (localStorage.getItem('groupId') === 'jsb_zgjl')
                    this.cl2('zgjl', false)
                else if (localStorage.getItem('groupId') === 'jsb_jl')
                    this.cl2('jl', false)
            },

            //通过总经会按钮事件
            tgzjh() {
                //检查总经会文件
                axios.get(this.ip + '/bcwj/jcwj', {
                    params: {
                        id: this.xm.id,
                        lc: '前期',
                        dqjd: '总经理办公会'
                    }
                }).then(res => {
                    //有文件
                    if (res.data) {
                        //办公室人处理、需要检验总经会召开时间
                        if (this.xm.zjhsj == null || this.xm.zjhsj === '') {
                            this.$message.error("请确定总经会时间！")
                            return
                        } else {
                            this.comment = '同意'
                            this.show_ty = true
                        }
                    } else {//没文件
                        axios.get(this.ip + '/bcwj/bcwjm', {
                            params: {
                                lc: '前期',
                                dqjd: '总经理办公会'
                            }
                        }).then(res => {
                            let filenames = ''
                            for (let i = 0; i < res.data.length; i++) {
                                filenames = filenames + res.data[i].wjmc + ","
                            }
                            //去掉后面 ,
                            filenames = filenames.substring(0, filenames.length - 1)
                            this.$message.error("通过总经会前，请上传文件：" + filenames)
                        })
                        return
                    }
                })
            },

            //通过两会按钮事件
            tglh() {
                //检查两会文件
                axios.get(this.ip + '/bcwj/jcwj', {
                    params: {
                        id: this.xm.id,
                        lc: '前期',
                        dqjd: '两会'
                    }
                }).then(res => {
                    //有文件
                    if (res.data) {
                        //办公室人处理、需要检验项目编号和两会召开时间
                        if (this.xm.projectNo == null || this.xm.projectNo === '' || this.xm.lhsj == null || this.xm.lhsj === '') {
                            this.$message.error("请确定项目编号和两会时间！")
                            return
                        } else {
                            this.comment = '同意'
                            this.show_ty = true
                        }
                    } else {//没文件
                        axios.get(this.ip + '/bcwj/bcwjm', {
                            params: {
                                lc: '前期',
                                dqjd: '两会'
                            }
                        }).then(res => {
                            let filenames = ''
                            for (let i = 0; i < res.data.length; i++) {
                                filenames = filenames + res.data[i].wjmc + ","
                            }
                            //去掉后面 ,
                            filenames = filenames.substring(0, filenames.length - 1)
                            this.$message.error("通过两会前，请上传文件：" + filenames)
                        })
                        return
                    }
                })
            },




            //同意
            ty() {
                console.log(this.groupId)
                if(this.groupId=='jsb_doman'||this.groupId=='jsb_zgjl'||this.groupId=='jsb_jl'){
                    this.xgtjdw(this.xm.id,this.xm.tjdw)
                }

                if (this.jbrOrZgjl == '技术部主管经理') {
                    if (this.jbrOrZgjlValue.length == 0) {
                        this.$message.error("请选择" + this.jbrOrZgjl)
                        return
                    }
                }

                this.comment = '同意'
                this.show_ty = true
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

            //处理
            cl(varName, value) {
                const loading = this.$loading({
                    lock: true,
                    text: '处理中……',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                var params = {
                    pid: this.xm.pid,
                    userId: localStorage.getItem('userId'),
                    comment: this.comment,
                    varName: varName,
                    value: value
                }

                if (this.jbrOrZgjl == '技术部主管经理') {
                    params.peoples = this.jbrOrZgjlValue
                }
                axios.get(this.ip + '/projectApplication/doNode', {
                    params: params
                })
                    .then(res => {
                        loading.close()
                        //技术部经办人修改项目信息
                        if (this.groupId === 'jsb_doman') {
                            this.xm.bider=localStorage.getItem('userName')
                            axios.post(this.ip + '/projectApplication/jsbdomanXgxm', this.xm)
                        }
                        this.reload()//刷新
                    })
            },

            //删除请求
            handleRemove(file, fileList) {
                this.$confirm('此操作将永久删除该附件,是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.get(this.ip + '/Attachment/deletAttachment', {
                        params: {
                            userId: localStorage.getItem('userId'),
                            attachment_id: file.id
                        }
                    })
                        .then(res => {
                            this.$message.success("删除成功！")
                        })
                })
                    .catch(() => {
                        this.reload()
                    })
            },


            //点击文件下载
            handlePreview(file) {
                window.open(this.ip + '/Attachment/Download?fid=' + file.id + '&fname=' + encodeURIComponent(file.name))
            },

            //领取评论
            lqpl(pid) {
                axios.get(this.ip + '/projectApplication/projecttocomment', {
                    params: {
                        pid: pid
                    }
                })
                    .then(res => {
                        if (res.data) {
                            this.commentList = res.data
                        }
                    })
            },

            //审批
            sp() {
                if (!this.comment) {
                    this.$confirm('你没有填写审批意见 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        axios.get(this.ip + '/projectApplication/addComment', {
                            params: {
                                pid: this.xm.pid,
                                userId: localStorage.getItem('userId'),
                                comment: this.comment
                            }
                        })
                            .then(res => {
                                if (res.data) {
                                    this.show_xq = false
                                    this.lqslxm()
                                }
                            })
                        this.reload()
                        this.$message.info("处理完成")
                    }).catch(() => {
                    })
                } else {
                    axios.get(this.ip + '/projectApplication/addComment', {
                        params: {
                            pid: this.xm.pid,
                            userId: localStorage.getItem('userId'),
                            comment: this.comment
                        }
                    })
                        .then(res => {
                            if (res.data) {
                                this.show_xq = false
                                this.lqslxm()
                            }
                        })
                    this.reload()
                    this.$message.info("处理完成")
                }
            },

            //项目详情(前期)
            xmxq(row) {
                this.isxq = false
                // if (row.declarationDep === '工程技术部' && this.groupId === 'jsb_doman') {//如果是工程技术部的项目、另外弹窗
                //     this.show_xqgcjsb = true
                // } else {
                //     this.show_xq = true
                // }
                this.show_xq = true
                this.xm = row
                //领取评论
                this.lqpl(row.pid)
                //领取附件
                this.lqfj('前期', row.id)
                //查询当前节点
                this.getNodeId(row.pid)
                this.url = 'http://10.197.41.100:8080/projectApplication/uploadFile?pId=' + row.pid + '&userId=' + localStorage.getItem('userId')

            },

            //领取附件，参数：流程，记录id
            lqfj(lc, id) {
                //拿前期必传文件列表
                axios.get(this.ip + '/bcwj/select', {
                    params: {
                        lc: lc
                    }
                }).then(res => {
                    this.bcwjs = res.data
                    //拿附件信息
                    for (let i = 0; i < this.bcwjs.length; i++) {
                        axios.get(this.ip + '/Attachment/getattachment2', {
                            params: {
                                id: id,
                                bcwjid: this.bcwjs[i].id
                            }
                        })
                            .then(res => {
                                this.fileList.splice(i, 1, [])
                                if (res.data) {
                                    for (let j = 0; j < res.data.length; j++) {
                                        this.fileList[i].push({
                                            name: res.data[j].attachment_nam,
                                            id: res.data[j].attachment_id
                                        })
                                    }
                                }
                            })
                    }
                })


                // axios.get(this.ip + '/Attachment/getattachment', {
                //     params: {
                //         pid: pid
                //     }
                // })
                //     .then(res => {
                //         if (res.data) {
                //             this.fileList = []
                //             for (let i = 0; i < res.data.length; i++) {
                //                 this.fileList.push({
                //                     name: res.data[i].attachment_nam,
                //                     id: res.data[i].attachment_id
                //                 })
                //             }
                //         }
                //     })
            },

            recordCurrentRow(row) {
                this.currentRow = row;
                var index = this.url.indexOf("&bcwjid=")
                if (index != -1) {
                    this.url = this.url.substring(0, index + 8) + this.currentRow.id;
                } else {
                    this.url = this.url + "&bcwjid=" + this.currentRow.id
                }
            },

            //领取项目
            lqxm() {
                axios.get(this.ip + '/projectApplication/lqxm', {
                    params: {
                        userId: localStorage.getItem('userId'),
                    }
                }).then(res => {
                    if (res.data) {
                        if (localStorage.getItem('groupId') == 'doman') {//如果是办事员，收到的项目为驳回项目
                            this.bhXms = res.data
                            this.daibanSearchRawData.bhXms=this.bhXms
                        } else {
                            this.Xms = res.data
                            this.daibanSearchRawData.Xms=this.Xms
                        }
                    } else {
                        this.Xms = []
                        this.daibanSearchRawData.Xms=this.Xms
                    }
                })
            },

            getBaxm() {
                axios.get(this.ip + '/projectApplication/getBaXm', {
                    params: {
                        userId: localStorage.getItem('userId')
                    }
                })
                    .then(res => {
                        if (res.data) {//填充到备案项目数组
                            this.baXms = res.data
                            this.daibanSearchRawData.baXms=this.baXms
                        } else {
                            this.baXms = []
                            this.daibanSearchRawData.baXms=this.baXms
                        }
                    })
            },

            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },

            //上传成功，重新请求
            handleSuccess() {
                this.lqfj('前期', this.xm.id)
                //重新请求
                // axios.get(this.ip + '/Attachment/getattachment', {
                //     params: {
                //         pid: this.xm.pid
                //     }
                // })
                //     .then(res => {
                //         if (res.data) {
                //             this.fileList = []
                //             for (let i = 0; i < res.data.length; i++) {
                //                 this.fileList.push({
                //                     name: res.data[i].attachment_nam,
                //                     id: res.data[i].attachment_id
                //                 })
                //             }
                //         }
                //     })
            },

            //删除请求
            handleBeforeRemove(file, fileList) {
                this.$confirm('此操作将永久删除该附件,是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.get(this.ip + '/contract/deletFj', {
                        params: {
                            fid: file.id,
                            fname: file.name,
                            jlid: this.xm.id
                        }
                    })
                        .then(res => {
                            this.$message.success("删除成功！")
                        })
                }).catch(() => {
                    fileList.push(file)
                    //this.lqfj('前期', this.xm.id)
                    //this.fj(this.project)
                })
                //
                //
                // this.$confirm('此操作将永久删除该附件,是否继续?', '提示', {
                //     confirmButtonText: '确定',
                //     cancelButtonText: '取消',
                //     type: 'warning'
                // }).then(() => {
                //     axios.get(this.ip + '/Attachment/deletAttachment', {
                //         params: {
                //             userId: localStorage.getItem('userId'),
                //             attachment_id: file.id
                //         }
                //     })
                //         .then(res => {
                //             if (res.data) {
                //                 this.$message.info("删除成功！")
                //                 //重新请求
                //                 axios.get(this.ip + '/Attachment/getattachment', {
                //                     params: {
                //                         pid: this.xm.pid
                //                     }
                //                 })
                //                     .then(res => {
                //                         if (res.data) {
                //                             this.fileList = []
                //                             for (let i = 0; i < res.data.length; i++) {
                //                                 this.fileList.push({
                //                                     name: res.data[i].attachment_nam,
                //                                     id: res.data[i].attachment_id
                //                                 })
                //                             }
                //                         }
                //                         //      return true
                //                     })
                //             } else {
                //                 this.$message.info("删除失败！您可能没有权限！")
                //                 //重新请求
                //                 axios.get(this.ip + '/Attachment/getattachment', {
                //                     params: {
                //                         pid: this.xm.pid
                //                     }
                //                 })
                //                     .then(res => {
                //                         if (res.data) {
                //                             this.fileList = []
                //                             for (let i = 0; i < res.data.length; i++) {
                //                                 this.fileList.push({
                //                                     name: res.data[i].attachment_nam,
                //                                     id: res.data[i].attachment_id
                //                                 })
                //                             }
                //                         }
                //                         //    return false
                //                     })
                //             }
                //         })
                // })
                //     .catch(() => {
                //         //重新请求
                //         axios.get(this.ip + '/Attachment/getattachment', {
                //             params: {
                //                 pid: this.xm.pid
                //             }
                //         })
                //             .then(res => {
                //                 if (res.data) {
                //                     this.fileList = []
                //                     for (let i = 0; i < res.data.length; i++) {
                //                         this.fileList.push({
                //                             name: res.data[i].attachment_nam,
                //                             id: res.data[i].attachment_id
                //                         })
                //                     }
                //                 }
                //             })
                //     })
            },

            //得到该用户下的项目
            getxmList() {
                axios.get(this.ip + '/projectApplication/getallproject', {
                    params: {
                        userId: localStorage.getItem('userId')
                    }
                })
                    .then(res => {
                        if (res.data) {
                            this.xmList = res.data;
                            for (let i = 0; i < this.xmList.length; i++) {
                                //请求当前节点
                                axios.get(this.ip + '/projectApplication/getPidNode', {
                                    params: {
                                        pid: this.xmList[i].pid
                                    }
                                })
                                    .then(res => {
                                        this.xmList[i].dqjd = res.data
                                        this.$set(this.xmList, i, this.xmList[i])
                                    })
                            }
                        }
                    })
            },

            //前期详情
            xq(row) {
                this.isxq = true
                this.xm = row
                //领取评论
                axios.get(this.ip + '/projectApplication/projecttocomment', {
                    params: {
                        pid: row.pid
                    }
                })
                    .then(res => {
                        if (res.data) {
                            this.commentList = res.data
                            this.show_xq = true
                        }
                    })
                //领取附件
                this.lqfj('前期', row.id)
                this.url = 'http://10.197.41.100:8080/projectApplication/uploadFile?pId=' + row.pid + '&userId=' + localStorage.getItem('userId')
            },

            //状态
            zt(row) {
                if (row.depAuditOpinion == '股份项目') {
                    if (row.pid != null && row.pid != '') {
                        if (row.dqjd === '填写申请表') {
                            this.src = require('@/assets/img/g_txsqb.png')
                        } else if (row.dqjd === '主管经理审批') {
                            this.src = require('@/assets/img/g_zgjlsp.png')
                        } else if (row.dqjd === '经理审批') {
                            this.src = require('@/assets/img/g_jlsp.png')
                        } else if (row.dqjd === '经办人') {
                            this.src = require('@/assets/img/g_jbr.png')
                        } else if (row.dqjd === '技术部主管经理') {
                            this.src = require('@/assets/img/g_jsbzgjl.png')
                        } else if (row.dqjd === '技术部经理') {
                            this.src = require('@/assets/img/g_jsbjl.png')
                        } else if (row.dqjd === '总经理办公会') {
                            this.src = require('@/assets/img/g_zjlbgh.png')
                        } else if (row.dqjd === '备案') {
                            this.src = require('@/assets/img/g_ba.png')
                        } else if (row.dqjd === '申请结束') {
                            this.src = require('@/assets/img/g_js.png')
                        }
                    } else {
                        this.src = require('@/assets/img/g_wsq.png')
                    }
                } else {
                    if (Number(row.investmentEstimate) > 10) {
                        if (row.dqjd === '填写申请表') {
                            this.src = require('@/assets/img/s_txsqb.png')
                        } else if (row.dqjd === '主管经理审批') {
                            this.src = require('@/assets/img/s_zgjlsp.png')
                        } else if (row.dqjd === '经理审批') {
                            this.src = require('@/assets/img/s_jlsp.png')
                        } else if (row.dqjd === '经办人') {
                            this.src = require('@/assets/img/s_jbr.png')
                        } else if (row.dqjd === '技术部主管经理') {
                            this.src = require('@/assets/img/s_jsbzgjl.png')
                        } else if (row.dqjd === '技术部经理') {
                            this.src = require('@/assets/img/s_jsbjl.png')
                        } else if (row.dqjd === '两会') {
                            this.src = require('@/assets/img/s_lh.png')
                        } else if (row.dqjd === '总经理办公会') {
                            this.src = require('@/assets/img/s_zjlbgh.png')
                        } else if (row.dqjd === '备案') {
                            this.src = require('@/assets/img/s_ba.png')
                        } else if (row.dqjd === '申请结束') {
                            this.src = require('@/assets/img/s_js.png')
                        }
                    } else {
                        if (row.dqjd === '填写申请表') {
                            this.src = require('@/assets/img/x_txsqb.png')
                        } else if (row.dqjd === '主管经理审批') {
                            this.src = require('@/assets/img/x_zgjlsp.png')
                        } else if (row.dqjd === '经理审批') {
                            this.src = require('@/assets/img/x_jlsp.png')
                        } else if (row.dqjd === '经办人') {
                            this.src = require('@/assets/img/x_jbr.png')
                        } else if (row.dqjd === '技术部主管经理') {
                            this.src = require('@/assets/img/x_jsbzgjl.png')
                        } else if (row.dqjd === '技术部经理') {
                            this.src = require('@/assets/img/x_jsbjl.png')
                        } else if (row.dqjd === '两会') {
                            this.src = require('@/assets/img/x_lh.png')
                        } else if (row.dqjd === '申请结束') {
                            this.src = require('@/assets/img/x_js.png')
                        }
                    }
                }
                this.show_zt = true
            },

            //点击文件下载
            handlePreview(file) {
                window.open(this.ip + '/Attachment/Download?fid=' + file.id + '&fname=' + encodeURIComponent(file.name))
            },

            //确定申请
            qdsq() {
                axios.post(this.ip + '/projectApplication/startApplication', this.sqb)
                    .then(res => {
                        if (res.data) {
                            this.show_xjsq = false;
                            this.getxmList();
                            if (this.role == '办事员')
                                alert("已经开始申请流程，转到主管经理！")
                            else
                                alert("已经开始申请流程，转到技术部主管！")
                        }
                    })
            },

            //领取附件
            // lqfj(pid) {
            //     axios.get(this.ip + '/Attachment/getattachment', {
            //         params: {
            //             pid: pid
            //         }
            //     })
            //         .then(res => {
            //             if (res.data) {
            //                 this.fileList = []
            //                 for (let i = 0; i < res.data.length; i++) {
            //                     this.fileList.push({
            //                         name: res.data[i].attachment_nam,
            //                         id: res.data[i].attachment_id
            //                     })
            //                 }
            //             }
            //         })
            // },


            handleListener() {
                bus.$on('collapse', this.handleBus);
                // 调用renderChart方法对图表进行重新渲染
                window.addEventListener('resize', this.renderChart)
            },

            handleBus(msg) {
                // setTimeout(() => {
                //     this.renderChart()
                // }, 300);
            },

            getjbrOrZgjlList() {// 获取经办人或主管经理列表
                var isReject = false;// 是否驳回
                var projectId = this.xm.id
                var manageType = this.xm.reviser
                axios.get(this.ip + '/projectApplication/isReject', {
                    params: {
                        projectId: projectId
                    }
                })
                    .then(res => {
                        if (res.data) {// 被驳回
                            isReject = true
                        } else {// 未被驳回
                            isReject = false
                        }

                        if (this.jbrOrZgjl == '技术部主管经理') {// 为这个才获取
                            // 经理->经办人，经办人-主管经理
                            var address = '/user/getAllJsbZgjl'
                            axios.get(this.ip + address, {
                                params: {
                                    manageType: manageType,
                                    projectId: isReject == true ? projectId : null
                                }
                            })
                                .then(res => {
                                    this.jbrOrZgjlList = []// 先清空
                                    for (let i = 0; i < res.data.length; i++) {
                                        this.jbrOrZgjlList.push({
                                            value: res.data[i].userId,
                                            label: res.data[i].userName,
                                        })
                                    }
                                })
                        }
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

            doDaibanSearch(){// 待办项目搜索
                this.Xms=this.daibanSearchRawData.Xms
                this.baXms=this.daibanSearchRawData.baXms
                this.bhXms=this.daibanSearchRawData.bhXms
                this.contracts=this.daibanSearchRawData.contracts
                this.zhaobiaos=this.daibanSearchRawData.zhaobiaos

                var _this=this
                if(this.daibanSearch.projectNo){
                    this.Xms=this.Xms.filter(function(item){
                        if(item.projectNo)
                            return item.projectNo.toLowerCase().indexOf(_this.daibanSearch.projectNo.toLowerCase())!=-1
                        else
                            return false;
                    })
                    this.baXms=this.baXms.filter(function(item){
                        if(item.projectNo)
                            return item.projectNo.toLowerCase().indexOf(_this.daibanSearch.projectNo.toLowerCase())!=-1
                        else
                            return false;
                    })
                    this.bhXms=this.bhXms.filter(function(item){
                        if(item.projectNo)
                            return item.projectNo.toLowerCase().indexOf(_this.daibanSearch.projectNo.toLowerCase())!=-1
                        else
                            return false;
                    })
                    this.zhaobiaos=this.zhaobiaos.filter(function(item){
                        console.log(item)
                        if(item.xmNo)
                            return item.xmNo.toString().toLowerCase().indexOf(_this.daibanSearch.projectNo.toLowerCase())!=-1
                        else
                            return false;
                    })
                    this.contracts=this.contracts.filter(function(item){
                        if(item.xmNo)
                            return item.xmNo.toString().toLowerCase().indexOf(_this.daibanSearch.projectNo.toLowerCase())!=-1
                        else
                            return false;
                    })
                }
                if(this.daibanSearch.projectNam){
                    this.Xms=this.Xms.filter(function(item){
                        if(item.projectNam)
                            return item.projectNam.toLowerCase().indexOf(_this.daibanSearch.projectNam.toLowerCase())!=-1
                        else
                            return false;
                    })
                    this.baXms=this.baXms.filter(function(item){
                        if(item.projectNam)
                            return item.projectNam.toLowerCase().indexOf(_this.daibanSearch.projectNam.toLowerCase())!=-1
                        else
                            return false;
                    })
                    this.bhXms=this.bhXms.filter(function(item){
                        if(item.projectNam)
                            return item.projectNam.toLowerCase().indexOf(_this.daibanSearch.projectNam.toLowerCase())!=-1
                        else
                            return false;
                    })
                    this.zhaobiaos=this.zhaobiaos.filter(function(item){
                        if(item.xmName)
                            return item.xmName.toString().toLowerCase().indexOf(_this.daibanSearch.projectNam.toLowerCase())!=-1
                        else
                            return false;
                    })
                    this.contracts=this.contracts.filter(function(item){
                        if(item.projectNam)
                            return item.projectNam.toLowerCase().indexOf(_this.daibanSearch.projectNam.toLowerCase())!=-1
                        else
                            return false;
                    })
                }
                if(this.daibanSearch.declarationDep){
                    this.Xms=this.Xms.filter(function(item){
                        if(item.declarationDep)
                            return item.declarationDep.toLowerCase().indexOf(_this.daibanSearch.declarationDep.toLowerCase())!=-1
                        else
                            return false
                    })
                    this.baXms=this.baXms.filter(function(item){
                        if(item.declarationDep)
                            return item.declarationDep.toLowerCase().indexOf(_this.daibanSearch.declarationDep.toLowerCase())!=-1
                        else
                            return false
                    })
                    this.bhXms=this.bhXms.filter(function(item){
                        if(item.declarationDep)
                            return item.declarationDep.toLowerCase().indexOf(_this.daibanSearch.declarationDep.toLowerCase())!=-1
                        else
                            return false
                    })
                    this.zhaobiaos=this.zhaobiaos.filter(function(item){
                        if(item.declarationDep)
                            return item.declarationDep.toLowerCase().indexOf(_this.daibanSearch.declarationDep.toLowerCase())!=-1
                        else
                            return false
                    })
                    this.contracts=this.contracts.filter(function(item){
                        if(item.declarationDep)
                            return item.declarationDep.toLowerCase().indexOf(_this.daibanSearch.declarationDep.toLowerCase())!=-1
                        else
                            return false
                    })
                }
            },
        }
    }

</script>


<style scoped>
    .el-row {
        margin-bottom: 20px;
    }

    .grid-content {
        display: flex;
        align-items: center;
        height: 100px;
    }

    .grid-cont-right {
        flex: 1;
        text-align: center;
        font-size: 14px;
        color: #999;
    }

    .grid-num {
        font-size: 30px;
        font-weight: bold;
    }

    .grid-con-icon {
        font-size: 50px;
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        color: #fff;
    }

    .grid-con-1 .grid-con-icon {
        background: rgb(45, 140, 240);
    }

    .grid-con-1 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-2 .grid-con-icon {
        background: rgb(100, 213, 114);
    }

    .grid-con-2 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-3 .grid-con-icon {
        background: rgb(242, 94, 67);
    }

    .grid-con-3 .grid-num {
        color: rgb(242, 94, 67);
    }

    .user-info {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        border-bottom: 2px solid #ccc;
        margin-bottom: 0px;
    }

    .user-avator {
        width: 120px;
        height: 120px;
        border-radius: 50%;
    }

    .user-info-cont {
        padding-left: 50px;
        flex: 1;
        font-size: 14px;
        color: #999;
    }

    .user-info-cont div:first-child {
        font-size: 30px;
        color: #222;
    }

    .user-info-list {
        margin-left: 30px;
        font-size: 14px;
        color: #999;
        line-height: 25px;
    }

    .user-info-list span {
        margin-left: 70px;
    }

    .mgb20 {
        margin-bottom: 20px;
    }

    .todo-item {
        font-size: 14px;
    }

    .schart {
        width: 100%;
        height: 300px;
    }

    .message-title {
        cursor: pointer;
    }

    .handle-row {
        margin-top: 30px;
    }

    .daibanSearch{
        width: 150px;
        margin: 0px 20px 0px 20px;
        display: inline-block;
    }

</style>
