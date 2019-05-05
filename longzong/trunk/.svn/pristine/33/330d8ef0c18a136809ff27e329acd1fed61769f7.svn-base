<style lang="less" scoped>
    @import './mesUnit.less';
    @import '../taskplant/taskplant.less';
    @import '../mytaskReach/mytaskReach.less';
/*
信息单元列表 关联信息单元
*/
</style>
<template>
<Row>
    <Col span="24">
      <Row class-name="current-position">
        当前位置：信息发布管理&nbsp;&nbsp;>>&nbsp;&nbsp;信息单元列表&nbsp;&nbsp;>>&nbsp;&nbsp;关联信息单元
      </Row>
    </Col>
     <Col span="24" class="plant-content">
        <!--人员信息start-->
        <div class="unit">
            <div class="unit_title">
                <span>人员信息</span>
            </div>
            <div class="unit_content">
                <div class="unit_content_left">
                    <div class="unit_s_left">信息单元编码：</div>
                    <div class="unit_s_right">{{infromationCode}}</div> 
                </div>
                <div class="unit_content_left no_line">
                    <div class="unit_s_left">信息单元编码：</div>
                    <div class="unit_s_right no-right-border">{{infromationName}}</div>
                </div>
            </div>
            <div class="height-50">
                <Col class="border-up-no">
                    <Button  class="margin-zy20px" @click="basicInformation">基本信息</Button>
                    <Button  class="margin-zy20px" @click="infoContacts">信息联系人</Button>
                    <Button  class="margin-zy20px" @click="publishedInfo">已发布信息</Button>
                </Col>
            </div>
        </div>
        <!--人员信息end-->
        <Row>
            <Col span="24" class="text-align-center font-size1 height-50" @click="CorrelationIndex">关联指标</Col>
            <Col span="24" class="height-50"><Button type="primary" class="margin-y20px">新增信息单元</Button></Col>
            <Col span="24">
                <Table class="tableCommon" border :columns="columns1" :data="data6"></Table>
            </Col>
            <Col span="24" class="text-align-center height-50">
                <Button type="primary" class="margin-zy20px" @click="saveInfromationRelation">保存</Button>
                <Button type="primary" class="margin-zy20px" @click="cancelInfromationRelation">取消</Button>
            </Col>
        </Row>
         <!-- 已发布信息弹窗 -->
        <!--<Modal v-model="publishedModal" title="已发布信息" width="950"> 
            <div class="unit" >
                <div class="unit_title">
                <span>信息单元</span>
                </div>         
                <div class="unit_content">
                <Form ref="publishedform" :model="formItem" :label-width="120">            
                    <Row >
                    <Col span="12"><FormItem label="信息单元编码 : ">{{ formItem.infoUnitCode}}</FormItem></Col>
                    <Col span="12"><FormItem label="信息单元名称 ：">{{ formItem.infoUnitName}}</FormItem></Col>        
                    </Row> 
                </Form>
                </div>           
            </div>         
            <div class="unit" >
                <div class="unit_title publishedList">
                    <span>已发布信息列表</span>
                </div>
                <Form ref="basicform" :model="formItem" style="margin-top: 20px;"> 
                    <Row >
                        <Col span="8"><FormItem label="标题 : "  :label-width="80"><Input v-model="formItem.title" type="text" /></FormItem></Col>
                        <Col span="8"><FormItem label="关键字 ："  :label-width="80"><Input v-model="formItem.keyword" type="text" /></FormItem></Col>
                        <Col span="8">
                        <FormItem label="发布时间 ：" :label-width="100">
                            <DatePicker type="date" placeholder="Date" style="width: 200px" transfer='true'></DatePicker>
                        </FormItem>
                        </Col>        
                    </Row>
                    <Row type="flex" justify="space-between">
                        <Col span="24">
                            <Col span="8">
                                <FormItem label="信息大类 : "  :label-width="80">
                                    <Select v-model="formItem.infoType">
                                        <Option v-for="item in infoType" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col span="16" class="text-right">
                                <Button type="primary">查询</Button>
                                <Button style="margin-left: 8px">重置</Button>
                            </Col>
                        </Col>
                    </Row>
                </Form>
                <Table class="tableCommon" :columns="columns3" :data="data4"></Table>
            </div>
            <div slot="footer">
                <i-button type="primary" @click="closeBasicModal">返回</i-button>
            </div> 
        </Modal> -->
        <!-- 已发布信息弹窗结束 -->
    </Col>
</Row>
</template>
<script>
import axios from "axios";
import oilPage from "../../components/page/page.vue"
import {
  getRelationTaskDetail,
  taskSelect,
  saveTaskSelect
} from "./api/mesUnitList.js";
import { formData } from "../../../assets/js/common.js";

     export default {
        name:'mesUnitListDetail',
        components: {
        oilPage
        },
        data () {
            return {
                linkerData:{},
                showDetailModal: false,
                showLinkerDetailModal:false,
                publishedModal:false,
                taskId : this.$route.query.taskId,
                infromationCode:"",
                infromationId:"",
                infromationName:"",
                sortNumber:"",
                relationName:"",
                relationTaskId:"",
                infoType:[
                    { value: 1, label: "全部" },
                    { value: 2, label: "文章类" },
                    { value: 3, label: "行情类" },
                ],
                columns1: [
                    {
                        title: "序号",
                        key: "sortNumber",
                        align: "center"
                    },
                     {
                    title: "信息单元",
                    key: "relationName",
                    align: "center",
                    loading: true,
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, data) => {
                            return h('div', [
                                h('div', {
                                    style: {
                                    marginRight: '8px',
                                    color: '#145edb',
                                    textDecoration: 'underline',
                                    cursor: 'pointer',
                                    color:'#F42C2C'
                                    },
                                    on: {
                                    click: () => {
                                        this.delete(data)
                                    }
                                    }
                                }, '删除')
                            ])
                        }
                    }
                ],
                data6: [
                    {
                        sortNumber:null,
                        relationName:"",
                        relationTaskId:null,
                        taskId:this.taskId
                    }
                ]
            }
        },
        created() {
            },
        methods: {




        }
    }
</script>    