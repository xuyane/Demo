<style lang="less" scoped>
  @import "./unitmangement.less";
  .ivu-input{
    border: 1px solid #000 !important;
  }
  .page {
    margin: 10px 0;
    text-align: right;
    padding-right: 18px;
  }
  .flex333 .ivu-col-span-7{
    flex:0 0 33.3%
  }
  // .ivu-select-small .ivu-select-selection{
  //   height: 22px !important;
  //   line-height: 22px !important;
  // }
</style>
<template>
  <Row>
    <Col span="24">
    <Row class-name="current-position">
      当前位置：
      <router-link to="/plantIndex" class="link-css"> 信息发布管理</router-link>                
      &nbsp;&nbsp;>>&nbsp;&nbsp;
      <router-link to="/unitMangement" class="link-css"> 信息单元管理</router-link>                
    </Row>
    </Col>
    <Col span="24" class-name="search-form">
    <Form :model="formItem" :label-width="100">
      <Col>
      <Row type="flex" justify="space-between">
        <Col span="7">
        <FormItem label="信息单元编码:">
          <Input v-model="formItem.informationUnitCode" class="search-input" placeholder="请输入信息单元编码"></Input>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="信息单元名称:">
          <Input v-model="formItem.informationUnitName" class="search-input" placeholder="请输入信息单元名称"></Input>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="信息分类:">
          <Select class="form-select"
                  v-model="formItem.informationTypeId"
                  filterable
                  ref="selectInformationTypeId"
                  remote
                  label-in-value
                  @on-query-change="remoteMethod4"
                  @on-change="onInformationTypeChange"
                  :loading="loading1"
                  placeholder="请选择信息分类">
            <Option v-for="(option, index) in options4" :value="option.value" :key="index">{{option.label}}</Option>
          </Select>
        </FormItem>
        </Col>
      </Row>
      </Col>
      <Col span="24" v-if="isTrue">
      <Row type="flex" justify="space-between">
        <Col span="7">
        <FormItem label="品种:">
          <Select class="form-select"
                  v-model="formItem.breedId"
                  ref="selectBreedId"
                  filterable
                  remote
                  label-in-value
                  @on-query-change="remoteMethod1"
                  @on-change="onbreedIdChange"
                  :loading="loading1"
                  placeholder="请输入品种">
            <Option v-for="(option, index) in options1" :value="option.value" :key="index">{{option.label}}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="区域:">
          <Select class="form-select"
                  v-model="formItem.areaId"
                  ref="selectAreaId"
                  filterable
                  remote
                  label-in-value
                  @on-query-change="remoteMethod2"
                  @on-change="onAreaIdChange"
                  :loading="loading1"
                  placeholder="请输入区域">
            <Option v-for="(option, index) in options2" :value="option.value" :key="index">{{option.label}}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="企业:">
          <Select class="form-select"
                  v-model="formItem.enterpriseId"
                  filterable
                  ref="selectEnterpriseId"
                  remote
                  label-in-value
                  @on-query-change="remoteMethod3"
                  @on-change="onEnterpriseIdChange"
                  :loading="loading1"
                  placeholder="请输入企业">
            <Option v-for="(option, index) in options3" :value="option.value" :key="index">{{option.label}}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="频率:">
          <Select v-model="formItem.value3" class="search-input" placeholder="请选择频率">
            <Option v-for="item in boolList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="站点:">
          <Select class="form-select"
                  v-model="formItem.siteId"
                  filterable
                  ref="selectSiteId"
                  remote
                  label-in-value
                  @on-query-change="remoteMethod6"
                  @on-change="onSiteIdChange"
                  :loading="loading1"
                  placeholder="请选择站点">
            <Option v-for="(option, index) in options6" :value="option.value" :key="index">{{option.label}}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="前端是否展示:">
          <Select v-model="formItem.value4" class="search-input" placeholder='请选择是否展示'>
            <Option v-for="item in isFree" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="状态:">
          <Select v-model="formItem.value5" class="search-input" placeholder="请选择状态">
            <Option v-for="item in isState" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="信息大类:">
          <Select v-model="formItem.value6" class="search-input" placeholder="请选择信息大类">
            <Option v-for="item in isBigType" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="责任人:">
          <Select class="form-select"
                  v-model="formItem.executorId"
                  ref="selectExecutorId"
                  filterable
                  remote
                  label-in-value
                  @on-query-change="remoteMethod5"
                  @on-change="onExecutorIdChange"
                  :loading="loading1"
                  placeholder="请选择责任人">
            <Option v-for="(option, index) in options5" :value="option.value" :key="index">{{option.label}}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="部门:">
          <Select class="form-select"
                  v-model="formItem.departmentId"
                  filterable
                  ref="selectDepartmentId"
                  remote
                  label-in-value
                  @on-query-change="remoteMethod7"
                  @on-change="onDepartmentChange"
                  :loading="loading1"
                  placeholder="请输入部门">
            <Option v-for="(option, index) in depatmentList" :value="option.value" :key="index">{{option.label}}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="责任人姓名:">
          <Input v-model="formItem.executorName" class="search-input" placeholder="请输入责任人姓名"></Input>
        </FormItem>
        </Col>
        <Col span="7"><!--此处占位，让上一条居中--></Col>
      </Row>
      </Col>
      <Col span="24">
      <Row type="flex" justify="space-between">
        <Col span="24" class="text-right">
        <span class="take-up" @click="nodisPlayShow">{{this.text}}</span>
        <Button type="primary" @click="infoSearch" >查询</Button>
        <Button style="margin-left: 8px; margin-bottome: 20px" @click="reset">重置</Button>
        </Col>
      </Row>
      </Col>
    </Form>
    </Col>
    <Col span="24">
    <Row class-name="table-con">
      <div class="btn-container">
        <Button type="primary" class="search-btn" @click="addInfoSet">新增信息单元</Button>
        <!-- <Button type="primary" class="search-btn">导入信息单元</Button>
        <Button type="primary" class="search-btn">导入模板</Button> -->
      </div>
      <!-- <Table class="tableCommon"
         :data="tableData"
         highlight-row
         :columns="columns"
         :stripe="true"
         :border="true"
        >
       </Table>
       <Row>
         <oil-page :total="total" :page-num="pageNum" :page-size="pageSize" @page-change="pageChange" :page-size-opts="pageSizeOpts" :show-sizer="showSizer" class="pagebox"></oil-page>
       </Row>-->

      <Table class="tableCommon"
             :data="tableData"
             :columns="columns"
             @on-row-click="rowClick"
             :row-class-name="rowClassName"
             :stripe="true"
             :border="true">
        <div class="page" slot="footer">
          <Page :current="pageNum" :page-size="pageSize" :total="total" show-elevator show-total show-sizer @on-change="pageChange" :page-size-opts="pageSizeOpts" @on-page-size-change="pageSizeChange"/>
        </div>
      </Table>
    </Row>
    </Col>
    <!-- 编辑频率开始 -->
    <Modal v-model="Editingfrequency" title="编辑频率" width="417px">
      <Form ref="distribution" :model="distributionTask" :label-width="120">
        <Row >
          <Col span="24">
          <FormItem label="执行次数: ">
            <Input v-model="executionNumber" class="search-input" placeholder="请输入次数"  ></Input>
          </FormItem>
          </Col>
          <Col span="24">
          <FormItem label="任务周期: " >
            <Select v-model="taskCycle" @on-change="technique" >
              <Option v-for="item in date" :value="item.value" :key="item.value" >{{ item.label }}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="24" >
          <FormItem label="执行周期: " v-if="weekDate">
            <DatePicker type="date" placeholder="请输入日期" @on-change="dataDate" v-model="dateDateOne"></DatePicker>
          </FormItem>
          </Col>
          <Col span="24" >
          <FormItem label="执行周期: " v-if="weekMonth">
            <Select v-model="dateMonthOne" >
              <Option v-for="item in dateMonth" :value="item.value" :key="item.value" >{{ item.label }}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="24">
          <FormItem label="执行周期: " v-if="weekWeek">
            <Select v-model="dateWeekOne">
              <Option v-for="item in dateWeek" :value="item.value" :key="item.value" >{{ item.label }}</Option>
            </Select>
          </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <i-button type="primary" @click="save_week">保存</i-button>
        <i-button type="primary" @click="cancel">取消</i-button>
      </div>
    </Modal>
    <!-- 编辑频率结束 -->
    <!-- 弹窗开始 -->
    <!--  <Modal v-model="modal1" class="talkwrap" width="365">
       <p slot="header" class='result_t'>提示信息</p>
       <p class="msgcont">{{issure.label}}</p>
       <div slot="footer">
         <i-button type="primary" @click="confirm(issure.value,issure.number)">确定</i-button>
         <i-button @click="cancelchange">取消</i-button>
       </div>
     </Modal> -->
    <!-- 弹窗结束 -->
    <!-- 模板设置开始 -->
    <Modal v-model="shenheModal" title="模板设置" width="650">
      <Form ref="informationModal1" :model="informationModal" :label-width="120">
        <Row >
          <Col span="24">
          <FormItem label="信息单元编码 : ">
            <Input v-model="infromationCode" class="search-input" placeholder="" disabled></Input>
          </FormItem>
          </Col>
          <Col span="24">
          <FormItem label="信息单元 ：">
            <Input v-model="infromationName" class="search-input" placeholder="" disabled ></Input>
          </FormItem>
          </Col>
          <Col span="24">
          <FormItem label="后台信息模板 ：">
            <Input v-model="backStageModalName" class="search-input" placeholder="" style="width:68%" disabled></Input>
            <Button type="error" @click="backStageBtn()" class="iconCancel">x</Button>
            <Button type="primary" @click="relationBackStageModal">关联模板</Button>
          </FormItem>
          </Col>
          <Col span="24">
          <FormItem label="前台信息模板 ：">
            <Input v-model="beforeModalName" class="search-input" placeholder="" style="width:68%" disabled></Input>
            <Button type="error" @click="beforeNameBtn()" class="iconCancel">x</Button>
            <Button type="primary" @click="relationBeforeModal">关联模板</Button>
          </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <i-button type="primary" @click="rejectModal">保存</i-button>
        <i-button type="primary" @click="cancelModal">取消</i-button>
      </div>
    </Modal>
    <!-- 模板设置结束 -->
    <!-- 关联模板开始 -->
    <Modal v-model="AssoInforClassTemplate" title="关联模板列表" width="850" @on-cancel="relationCancel">
      <Form ref="shenheform" :model="shenheform" :label-width="110">
        <Row>
          <Col span="12" class="text-right">
          <FormItem label="模板名称">
            <Input v-model="templateName" placeholder="请输入模板名称"></Input>
          </FormItem>
          </Col>
          <Col span="12" class="text-right">
          <Button type="primary" icon="ios-search" @click="infoSelectTemplate" >查询</Button>
          <Button style="margin-left: 8px" icon="ios-refresh"  @click="handleReset">重置</Button>
          </Col>
        </Row>
      </Form>
      <Row class-name="table-con" style="padding-left:0px" >
        <Table class="tableCommon"
               :data="tableData_info"
               :columns="columns_info"
               :stripe="true"
               :border="true"
        >
        </Table>
      </Row>
      <Row>
        <oil-page :total="templateTotal" :page-num="templatePageNum" :page-size="templatePageSize" @page-change="templatePageChange" :page-size-opts="templatePageSizeOpts" :show-sizer="templateShowSizer" class="pagebox"></oil-page>
      </Row>
      <div slot="footer">
        <i-button type="primary" @click="saveSelectTemplate()" >保存</i-button>
        <i-button type="primary" @click="calcelQueryTemplate()">取消</i-button>
      </div>
    </Modal>
    <!-- 关联模板结束 -->
    <!-- 分配开始 -->
    <Modal v-model="distributionAlertTask" title="任务分配" width="417px">
      <Form ref="distribution" :model="distributionTask1" :label-width="120">
        <Row >
          <Col span="24">
          <FormItem label="姓名:">
            <!-- <Input v-model="formItem.informationUnitCode" class="search-input" placeholder="请输入姓名" style="width: 200px" ></Input> -->
            <Select
              v-model="distributionTask1.entrustedId"
              filterable
              remote
              :remote-method="remoteMethodEmployee"
              :loading="loadingEmploy"
              style="width:73%">
              <Option v-for="(option, index) in options1" :value="option.value" :key="index">{{option.label}}</Option>
            </Select>

          </FormItem>
          </Col>
          <Col span="24">
          <FormItem label="生效日期:">
            <DatePicker type="date" v-model="distributionTask1.startTime" :options="optionsDatePick" format="yyyy-MM-dd" placeholder="请选择日期"></DatePicker>
          </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <i-button type="primary" @click="saveDistributionTask">保存</i-button>
        <i-button type="primary" @click="cancelDistributionTask">取消</i-button>
      </div>
    </Modal>
    <!-- 分配结束 -->
  </Row>
</template>
<script>
  import axios from "axios";
  import oilPage from "../../components/page/page.vue";
  import {
    getUserInfo,
    getBreed,
    getArea,
    getentErpeise,
    Variety,
    editIsShow,
    editTask,
    informationTemplateSave,
    informationTemplateDetail,
    informationTemplateList,
    getEmployee,//负责人接口
    toDistribution,
    doDistribution,
    getClassify,
    getDepartment,
    getStateS,
    getEmployeeOutAdminName,
    getBigType,//获取信息大类
    getSite,//获取站点接口
    Disable,//禁用信息单元接口
    Enable,//启用信息单元接口
    AllArea,//下拉选择全部区域
    getAllBreed,//下拉选择全部品种
    getAllClassify,//下拉选择全部信息分类，
    allenterpeiseName,//下拉选择全部企业
  } from "./api/unitManageMent";
  import { formData } from "../../../assets/js/common.js";
  export default {
    name: "unitMangement",
    components: {
      oilPage
    },
    data() {
      return {
        distributionTask1:{
          entrustedId:null,
          entrustedName:"",
          startTime:null,
          taskId:null
        },
        optionsDatePick:{
          disabledDate (date) {
            return date && date.valueOf() < Date.now() - 86400000;
          }
        },
        selectState: null,
        checkTime:"",
        weekDate: true,
        weekMonth: false,
        weekWeek: false,
        pageSizeOpts: [10,15, 20,40, 50, 100, 200],
        showSizer: true,
        total: 0,
        datetime: "",
        isTrue: false,
        issure: {},
        modal1: false,
        text: "高级搜索",
        loading1: false,
        loadingEmploy:false,
        options1:[],
        options2: [],
        taskId:"",
        options3: [],
        options4:[],
        options5:[],
        options6:[],
        depatmentList:[],
        shenheModal: false,
        Editingfrequency: false,
        distributionTask: {},
        taskCycle: "",
        informationModal:{},
        executionNumber: "",
        // --设置模板参数开始
        infromationCode:"",
        infromationName:"",
        backStageModalId:"",
        backStageModalName:"",
        beforeModalName:"",
        beforeModalId:"",
        infromationModelId:"",
        // --设置模板参数结束

        //--关联模板查询参数开始
        shenheform:{},
        templateName:"",
        AssoInforClassTemplate:false,
        distributionAlertTask:false,
        model13:"",
        effectiveTime:"",
        name:"",
        informationTemplateTypePath:"",
        selectTemplateName:"",
        selectTemplateId:"",
        currentid:"",
        optionChoice:"1",
        templatePageSizeOpts: [5, 10, 20],
        templateShowSizer: true,
        templatePageSize: 5,
        templateTotal: 0,
        templatePageNum:1,
        //--关联模板查询参数结束

        infromationUnitId:"",
        boolList: [{value:-1,label:"全部"},{ value: 0, label: "日" }, { value: 1, label: "周" },{ value: 2, label: "月" },{ value: 3, label: "季度" },{ value: 4, label: "年" }],
        isFree: [{value:-1,label:"全部"},{ value: 0, label: "展示" }, { value: 1, label: "隐藏" }],
        isState: [],
        isBigType:[],
        date: [
          { value: 1, label: "周" },
          { value: 2, label: "月" },
          { value: 3, label: "季度" },
          { value: 4, label: "年" },
          { value: 0, label: "日" }
        ],
        dateMonth: [
          { value: 1, label: "1日" },
          { value: 2, label: "2日" },
          { value: 3, label: "3日" },
          { value: 4, label: "4日" },
          { value: 5, label: "5日" },
          { value: 6, label: "6日" },
          { value: 7, label: "7日" },
          { value: 8, label: "8日" },
          { value: 9, label: "9日" },
          { value: 10, label: "10日" },
          { value: 11, label: "11日" },
          { value: 12, label: "12日" },
          { value: 13, label: "13日" },
          { value: 14, label: "14日" },
          { value: 15, label: "15日" },
          { value: 16, label: "16日" },
          { value: 17, label: "17日" },
          { value: 18, label: "18日" },
          { value: 19, label: "19日" },
          { value: 20, label: "20日" },
          { value: 21, label: "21日" },
          { value: 22, label: "22日" },
          { value: 23, label: "23日" },
          { value: 24, label: "24日" },
          { value: 25, label: "25日" },
          { value: 26, label: "26日" },
          { value: 27, label: "27日" },
          { value: 28, label: "28日" },
          { value: 0, label: "月末" }
        ],
        dateWeek: [
          { value: 1, label: "星期一" },
          { value: 2, label: "星期二" },
          { value: 3, label: "星期三" },
          { value: 4, label: "星期四" },
          { value: 5, label: "星期五" },
          { value: 6, label: "星期六" },
          { value: 7, label: "星期日" }
        ],
        dateWeekOne:'',
        dateMonthOne:"",
        dateDateOne:"",

        isDisplaySelect: [
          {
            value: 0,
            label: "展示"
          },
          {
            value: 1,
            label: "隐藏"
          }
        ],
        columns: [
          {
            key:'informationUnitId',
            title:'ID',
            minWidth:100,
            align:'center'
          },
          {
            key: "informationUnitCode",
            title: "信息单元编码",
            minWidth: 140,
            align: "center"
          },
          {
            key: "informationUnitName",
            title: "信息单元名称",
            minWidth: 350,
            align: "center",
            render: (h, params) => {
              return h(
                "a",
                {
                  style:{
                    textAlign:"left",
                    color:'#2d8cf0',
                    cursor:'pointer',
                  },
                  on: {
                    click: () => {
                      this.showName(params);
                    }
                  }
                },
                params.row.informationUnitName
              )
            }
          },

          {
            key: "isShow",
            title: "前端是否展示",
            minWidth: 100,
            align: "center",
            render: (h, params) => {
              return h(
                "Select",
                {
                  style: {
                    width:"60px",
                    style: "border: 1px solid #dddee1",
                    // border:'1px solid #dddee1'
                  },
                  props: {
                    value: params.row.isShow,
                    size: "small"
                  },
                  on: {
                    "on-change": event => {
                      this.tableData[params.index].isDisplay = event;
                      this.editIsShow_is(params, event);
                    }
                  }
                },
                this.isDisplaySelect.map(function(item) {
                  return h(
                    "Option",
                    {
                      props: { value: item.value }
                    },
                    item.label
                  );
                })
              );
            }
          },
          {
            key: "counts",
            title: "频率",
            minWidth: 315,
            align: "center",
            render: (h, data) => {
              const self = this
              return h('div',[
                h('Input', {
                  style: {
                    width:"50px",
                    float:'left',
                    marginRight:'10px',
                    // border:'1px solid #000'
                  },
                  props: {
                    type: 'text',
                    value: data.row.executionNumber,
                  },
                  on: {
                    "input": (e)=>{
                      //  修改次数调接口
                      this.executionNumberChange(data,e);
                    }
                  }
                }),
                h('span', {
                  style: {
                    float:'left',
                    marginRight:'5px'
                  }
                }, '次/'),
                h("Select",{
                    style: {
                      width:"60px",
                      float:'left',
                      marginRight:'10px'
                    },
                    props: {
                      value: data.row.taskCycle
                    },
                    on: {
                      "on-change": event => {
                        // this.tableData[data.index].counts.type = event;
                        this.taskCycleChange(data,event);
                      }
                    }
                  },
                  this.date.map(function(item){
                    return h('Option', {
                      props: {value: item.value}
                    }, item.label);
                  }),
                ),

                h('DatePicker', {
                  style: {
                    width:"130px",
                    float:'left',
                    display: (data.row.taskCycle == 4)? "inline-block":"none"
                  },
                  attrs: {
                    type: 'datetime',
                    format: 'yyyy-MM-dd',
                    value: data.row.cycleSupplyInfoName
                  },
                  props:{
                    // vIf:false
                    // ref:'data1'
                    // hidden: true
                  },
                  on: {
                    input: (val) => {
                      // this.datetime = val;
                    },
                    "on-change":event =>{
                      this.cycleSupplyInfoChange(data,event);
                    }
                  }
                }),
                h("Select",{
                    style: {
                      width:"100px",
                      float:'left',
                      marginRight:'10px',
                      display: (data.row.taskCycle == 1)? "inline-block":"none"
                    },
                    props: {
                      value: data.row.cycleSupplyInfo
                    },
                    on: {
                      "on-change": event => {
                        this.cycleSupplyInfoChange(data,event);
                      }
                    }
                  },
                  this.dateWeek.map(function(item){
                    return h('Option', {
                      props: {value: item.value}
                    }, item.label);
                  }),
                ),
                h("Select",{
                    style: {
                      width:"100px",
                      float:'left',
                      marginRight:'10px',
                      display: (data.row.taskCycle == 3|| data.row.taskCycle == 2)? "inline-block":"none"
                    },
                    props: {
                      value: data.row.cycleSupplyInfo
                    },
                    on: {
                      "on-change": event => {
                        // this.tableData[data.index].counts.type = event;
                        // this.Editing_ping(data)
                        this.cycleSupplyInfoChange(data,event);
                      }
                    }
                  },
                  this.dateMonth.map(function(item){
                    return h('Option', {
                      props: {value: item.value}
                    }, item.label);
                  }),
                ),

              ])
            }
          },
          {
            key: "checkTime",
            title: "最晚发布时间",
            minWidth: 110,
            align: "center",
            render: (h, data) => {
              return h("TimePicker", {
                style: {
                  // float: "left",
                  width:"80px"
                },
                attrs: {
                  type: "time",
                  format: "HH:mm",
                  value: data.row.checkTime
                },
                on: {
                  input: val => {
                    this.datetime = val;
                  },
                  "on-change":e=>{
                    this.checkTimeChange(data,e);
                  }
                },
              });
            }
          },
          {
            key: "executorName",
            title: "责任人",
            minWidth: 100,
            align: "center"
          },
          {
            key: "departmenName",
            title: "所属部门",
            minWidth: 120,
            align: "center"
          },
          // {
          //   key: "subscribeNumber",
          //   title: "订阅数",
          //   minWidth: 70,
          //   align: "center"
          // },
          {
            key: "statusSec",
            title: "状态",
            minWidth: 70,
            align: "center"
          },
          {
            key: "siteName",
            title: "站点",
            minWidth: 120,
            align: "center"
          },
          {
            title: "操作",
            minWidth: 350,
            height:40,
            align: "center",
            fixed: "right",
            render: (h, data) => {
              return h("div", [
                h(
                  "span",
                  {
                    style: {
                      marginRight: "8px",
                      color: "#145edb",
                      textDecoration: "underline",
                      cursor: "pointer"
                    },
                    on: {
                      click: () => {
                        this.edit(data);
                      }
                    }
                  },
                  "编辑"
                ),
                h(
                  "span",
                  {
                    style: {
                      marginRight: "8px",
                      color: "#145edb",
                      textDecoration: "underline",
                      cursor: "pointer"
                    },
                    on: {
                      click: () => {
                        //禁用
                        if(data.row.status == 0){
                          this.disable(data);
                        }
                        //启用
                        if(data.row.status == 1){
                          this.enable(data)
                        }

                      }
                    }
                  },
                  data.row.status == 1? "启用": data.row.status == 0? "禁用": ""
                ),
                h(
                  "span",
                  {
                    style: {
                      marginRight: "8px",
                      color: "#145edb",
                      textDecoration: "underline",
                      cursor: "pointer"
                    },
                    on: {
                      click: () => {
                        this.moban(data);
                      }
                    }
                  },
                  "模板设置"
                ),
                h(
                  "span",
                  {
                    style: {
                      marginRight: "8px",
                      color: "#145edb",
                      textDecoration: "underline",
                      cursor: "pointer"
                    },
                    on: {
                      click: () => {
                        this.CorrelationIndex(data);
                      }
                    }
                  },
                  "关联指标"
                ),
                h(
                  "span",
                  {
                    style: {
                      marginRight: "8px",
                      color: "#145edb",
                      textDecoration: "underline",
                      cursor: "pointer"
                    },
                    on: {
                      click: () => {
                        this.CorrelationIndexUnit(data);
                      }
                    }
                  },
                  "关联信息单元"
                ),
                h(
                  "span",
                  {
                    style: {
                      marginRight: "8px",
                      color: "#145edb",
                      textDecoration: "underline",
                      cursor: "pointer"
                    },
                    on: {
                      click: () => {
                        this.distributionTaskDetail(data);
                      }
                    }
                  },
                  "分配"
                )
              ]);
            }
          }
        ],
        tableData: [],
        formItem: {
          informationUnitCode:'',//信息单元编码
          informationUnitName:'',//信息单元名称
          informationTypeId:'',//信息分类ID查询条件
          InformationTypeName: '',
          executorName:'',//责任人名称
          areaId:null,//区域id初始为null
          breedId:'',//品种id
          departmentId:null,//部门id
          departmentName: '',
          enterpriseId:'',//企业ID查询条件
          executorId:'',//任务责任人ID查询条件
          siteId:'',//站点id
          value3:'',//频率
          value4:'',//前端是否展示
          value5:'',//状态
          value6:'',//信息大类类型
          breedName: '',
          areaName: '',
          enterpriseName: '',
          sitename: '',
          executorName: ''
        },
        pageSize: 10,
        pageNum: 1,
        tableData_info:[
          {
            name: "",
            informationTemplateTypePath: "",
          }
        ],
        columns_info:[
          {
            title: '选中',
            align:'center',
            key: 'checkBox',
            width:50,
            render:(h,data)=>{
              let that = this;
              return h('div',[
                h('Checkbox',{
                  props:{
                    value:data.row.checkBox
                  },
                  on:{
                    'on-change':(e)=>{
                      that.tableData_info.forEach((items)=>{      //先取消所有对象的勾选，checkBox设置为false
                        that.$set(items,'checkBox',false)
                      });
                      that.tableData_info[data.index].checkBox = e;  //再将勾选的对象的checkBox设置为true
                      that.selectTemplateName = data.row.name;
                      that.selectTemplateId = data.row.id;
                    }
                  }
                })
              ])
            }
          },
          {
            title: '模板名称',
            key: 'name'
          },
          {
            title: '模板分类',
            key: 'informationTemplateTypePath'
          }
        ],
        formerAssignor:"",
        publishType:null,
        testIndex: -1
      };
    },
    created() {
      const session = JSON.parse(window.sessionStorage.getItem('unitMangementHistoryList'));
      if (session) {
        this.formItem = session;
        this.pageChange(session.pageNum);
        this.pageSizeChange(session.pageSize);

        this.remoteMethod1(this.formItem.breedName);
        this.remoteMethod2(this.formItem.areaName);
        this.remoteMethod3(this.formItem.enterpriseName);
        this.remoteMethod4(this.formItem.InformationTypeName);
        this.remoteMethod5(this.formItem.executorName);
        this.remoteMethod6(this.formItem.sitename);
        this.remoteMethod7(this.formItem.departmentName);
      }

      this.getUserInfo();
      this.getStatus();
      this.getBigTypes();
    },
    methods: {
      backStageBtn(){
        console.log(this.backStageModalName,this.backStageModalId,this.infromationModelId)
        if(this.backStageModalName!==''){
          this.backStageModalName = ''
          this.backStageModalId = ''
          // this.infromationModelId = ''
        }
      },
      beforeNameBtn(){
        console.log(this.beforeModalName,this.beforeModalId,this.infromationModelId)
        if(this.beforeModalName!==''){
          this.beforeModalName = ''
          this.beforeModalId = ''
          // this.infromationModelId = ''
        }
      },
      rowClick(data,index){
        this.testIndex = index;
      },
      rowClassName (row, index) {
        if (index === this.testIndex) {
          return 'demo-table-info-row';
        }
        return '';
      },
      //最晚发布时间改动
      checkTimeChange(data,e){
        let form={
          taskId:data.row.taskId,
          checkTime:e
        }
        if(e!=""){
          editTask(form).then(res=>{
            if(res.status == "200"){
              this.$Message.success("最晚发布时间修改成功");
              this.getUserInfo();
            }
          })
        }

      },
      //周期内次数改变
      executionNumberChange(data,e){
        let form={
          taskId:data.row.taskId,
          executionNumber:e
        }
        if(e<=0 ||e!=""){
          editTask(form).then(res=>{
            if(res.status == "200"){
              this.$Message.success("周期内次数修改成功");
              this.getUserInfo();
            }
          })
        }else{
          this.$Message.error("周期次数不能为0或者为空")
        }
      },
      //改变周期类型
      taskCycleChange(data,e){
        if(e==0||e == 2 || e==3 ||e==4){
          var form = {
            taskId:data.row.taskId,
            taskCycle:e,
            cycleSupplyInfo:0
          }
        }else if(e == 1){
          var form = {
            taskId:data.row.taskId,
            taskCycle:e,
            cycleSupplyInfo:5
          }
        }
        editTask(form).then(res=>{
          if(res.status == "200"){
            this.$Message.success("周期修改成功");
            this.getUserInfo();
          }
        })
      },
      //改变周期
      cycleSupplyInfoChange(data,e){
        if(data.row.taskCycle==4){
          e= new Date(e).getTime();
        }else {
          e=e;
        }
        let form ={
          taskId:data.row.taskId,
          cycleSupplyInfo:e
        }
        editTask(form).then(res=>{
          if(res.status == "200"){
            this.$Message.success("具体日期修改成功");
            this.getUserInfo();
          }
        })
      },
      //状态枚举
      getStatus(){
        getStateS().then(res => {
          const list2 = res.response.map(item => {
            return {
              value: item.value,
              label: item.desc
            };
          });
          this.isState = list2;
        });
      },
      //信息大类状态枚举
      getBigTypes(){
        getBigType().then(res => {
          const list9 = res.response.map(item => {
            return {
              value: item.value,
              label: item.desc
            };
          });
          this.isBigType = list9;
        });
      },
      //重置
      reset(){
        this.testIndex = -1;
        if(!this.isTrue){
          this.formItem.informationUnitCode='';
          this.formItem.informationUnitName='';
          this.formItem.informationTypeId='';
          // 将选择下拉框手动输入的值清空
          this.$refs['selectInformationTypeId'].$data.query='';
        }else{
          this.formItem.informationUnitCode='';
          this.formItem.informationUnitName='';
          this.formItem.informationTypeId='';
          this.formItem.executorName = '';
          this.formItem.breedId='';
          this.formItem.areaId='';
          this.formItem.enterpriseId='';
          this.formItem.siteId='';
          this.formItem.value3='';
          this.formItem.value4='';
          this.formItem.value5='';
          this.formItem.value6='';
          this.formItem.executorId='';
          this.formItem.departmentId='';
          // 将选择下拉框手动输入的值清空
          this.$refs['selectInformationTypeId'].$data.query='';
          this.$refs['selectBreedId'].$data.query='';
          this.$refs['selectAreaId'].$data.query='';
          this.$refs['selectEnterpriseId'].$data.query='';
          this.$refs['selectSiteId'].$data.query='';
          this.$refs['selectExecutorId'].$data.query='';
          this.$refs['selectDepartmentId'].$data.query='';
        }
      },
      //分配任务查看
      distributionTaskDetail(data){
        let that = this;
        that.distributionAlertTask = true;
        this.distributionTask1.taskId =  data.row.taskId;
        let form =
          {
            taskId:data.row.taskId
          };
        toDistribution(formData(form)).then(res =>{
          if(res.status == 200)
          {
            if(res.response.entrustedId != null && res.response.entrustedId >0)
            {
              that.distributionTask1.entrustedId = res.response.entrustedId
            }
            if(res.response.entrustedName != null)
            {
              that.formerAssignor = res.response.entrustedName;
              this.remoteMethodEmployee(res.response.entrustedName);
            }
            if(res.response.startTime != null && res.response.startTime > 0)
            {
              that.distributionTask1.startTime = new Date(res.response.startTime);
            }
          }
        })
      },
      // 分配任务保存
      saveDistributionTask() {
        let that = this;
        let flag = true;
        if(that.distributionTask1.entrustedId == null || that.distributionTask1.entrustedId == 0)
        {
          flag = false;
          that.$Message.warning("请选择责任人");
          return false;
        }
        if(that.distributionTask1.startTime == null || that.distributionTask1.startTime == '')
        {
          flag = false;
          that.$Message.warning("请输入有效时间");
          return false;
        }
        if(flag)
        {
          let form =
            {
              startTime: new Date(that.distributionTask1.startTime).getTime(),
              taskId:that.distributionTask1.taskId,
              entrustedId: that.distributionTask1.entrustedId
            };
          doDistribution(form).then(res =>{
            if(res.status == 200)
            {
              that.$Message.success("任务分配成功");
              that.distributionTask1.entrustedId = "",
                that.distributionTask1.entrustedName ="",
                that.distributionTask1.startTime="",
                that.distributionTask1.taskId="",
                that.formerAssignor = "";
              that.distributionAlertTask = false;
              this.getUserInfo();

            }
          })
        }
      },
      cancelDistributionTask(){
        let that = this;
        that.distributionTask1.entrustedId = "";
        that.distributionTask1.entrustedName ="";
        that.distributionTask1.startTime="";
        that.distributionTask1.taskId="";
        that.formerAssignor = "";
        that.distributionAlertTask = false;
      },
      remoteMethodEmployee (query) {
        if (query !== '') {
          this.loadingEmploy = true;
          let params = {
            name:query
          }
          setTimeout(() => {
            this.loadingEmploy = false;
            getEmployee(formData(params)).then(res =>{
              const list1 = res.response.map(item => {
                return {
                  value: item.id,
                  label: item.text
                };
              });
              this.options1 = list1
            })
          }, 200);
        } else {
          this.options1 = [];
        }
      },
      CorrelationIndex(data) {
        this.$router.push({
          name: "mesUnitList",
          query: {
            taskId: data.row.taskId,
            informationUnitId: data.row.informationUnitId
          }
        });
      },
      CorrelationIndexUnit(data) {
        this.$router.push({
          name: "mesUnitListDetail",
          query: {
            taskId: data.row.taskId,
            informationUnitId: data.row.informationUnitId
          }
        });
      },
      //获取信息列表
      getUserInfo() {
        let form = {
          areaId: this.formItem.areaId,
          breedId: this.formItem.breedId,
          departmentId: this.formItem.departmentId,
          enterpriseId: this.formItem.enterpriseId,//企业id
          executorId: this.formItem.executorId,//责任人id
          informationTypeId: this.formItem.informationTypeId,
          informationUnitCode:this.formItem.informationUnitCode,
          informationUnitName: this.formItem.informationUnitName,
          executorName: this.formItem.executorName, //责任人名称
          siteId: this.formItem.siteId,
          taskCycle:this.formItem.value3,//频率
          isShow:this.formItem.value4,//前端是否展示
          status:this.formItem.value5,//状态
          type:this.formItem.value6,//状态
          // order: "",
          pageNum: this.pageNum,
          pageSize:this.pageSize
          // sort: "",
          // status: 0,
          // taskCycle: 0
        };
        getUserInfo(form).then(res => {
          this.tableData = res.response.list;
          this.total = res.response.total;
          this.pageSize = res.response.pageSize;
          console.log(this.tableData,this.total,this.pageSize)
          if (window.sessionStorage.getItem('unitMangementHistoryList')) {
            window.sessionStorage.removeItem('unitMangementHistoryList');
          }
        });
      },
      //搜索
      infoSearch(){
        this.pageNum = 1;
        this.getUserInfo();
      },
      nodisPlayShow() {
        if (this.text === "高级搜索") {
          this.isTrue = true;
          this.text = "收起";
        } else if (this.text === "收起") {
          this.isTrue = false;
          this.text = "高级搜索";
        }
      },
      //获取分页数据
      pageChange(page) {
        this.testIndex = -1;
        if (page) {
          this.pageNum = page;
        }
        this.getUserInfo();
        // this.getlist(this.selectCondition);
      },
      pageSizeChange(pageSize) {
        if (pageSize) {
          this.pageSize = pageSize;
        }
        this.getUserInfo();
        // this.getlist(this.selectCondition);
      },
      // 是否禁用
      disable(data) {
        var config = {
          title: "提示信息",
          content: "您确定禁用此信息单元吗？",
          onOk: () => {
            let form ={
              taskId:data.row.taskId
            };
            Disable(formData(form)).then(res=>{
              if(res.status=="200"){
                this.getUserInfo();//刷新列表
                this.$Message.success("禁用成功")
              }
            })
          },
          onCancel: () => {
            //this.$Message.info('Clicked cancel');
          }
        };
        this.$Modal.confirm(config);
      },
      //启用信息单元
      enable(data){
        var config = {
          title: "提示信息",
          content: "您确定启用此信息单元吗？",
          onOk: () => {
            let form ={
              taskId:data.row.taskId
            };
            Enable(formData(form)).then(res=>{
              if(res.status=="200"){
                this.getUserInfo();//刷新列表
                this.$Message.success("启用成功")
              }
            })
          },
          onCancel: () => {
            //this.$Message.info('Clicked cancel');
          }
        };
        this.$Modal.confirm(config);

      },
      cancelchange() {
        this.modal1 = false;
      },
      addInfoSet() {
        this.$router.push({ name: "addInformationSettings" });
      },
      edit(data) {
        this.$router.push({
          name: "EditInfoUnit",
          query:{
            informationUnitId:data.row.informationUnitId,
            taskId:data.row.taskId
          }
        });
      },
      // 列表查看
      showName(data) {
        this.$router.push({
          name: "CheckUnit",
          query: {
            taskId: data.row.taskId,
            informationUnitId: data.row.informationUnitId
          }
        });
      },
      //获取品种
      remoteMethod1(query) {
        if (query !== "") {
          this.loading1 = true;
          let params = {
            name: query
          };
          setTimeout(() => {
            this.loading1 = false;
            getAllBreed(formData(params)).then(res => {
              const list1 = res.response.map(item => {
                return {
                  value: item.id,
                  label: item.text
                };
              });
              this.options1 = list1;
            });
          }, 2000);
        } else {
          this.formItem.breedId='';
          this.options1 = [];
        }
      },
      //获取区域
      remoteMethod2(query) {
        if (query !== "") {
          this.loading1 = true;
          let params = {
            name: query
          };
          setTimeout(() => {
            this.loading1 = false;
            AllArea(formData(params)).then(res => {
              const list2 = res.response.map(item => {
                return {
                  value: item.id,
                  label: item.text
                };
              });
              this.options2 = list2;
            });
          }, 2000);
        } else {
          this.formItem.areaId='';
          this.options2 = [];
        }
      },
      //获取企业
      remoteMethod3(query) {
        if (query !== "") {
          this.loading = true;
          let params = {
            name: query
          };
          this.loading1 = false;
          allenterpeiseName(formData(params)).then(res => {
            const list3 = res.response.map(item => {
              return {
                value: item.id,
                label: item.text
              };
            });
            this.options3 = list3;
          });
        } else {
          this.formItem.enterpriseId='';
          this.options3 = [];
        }
      },
      //信息分类
      remoteMethod4(query) {
        if (query !== "") {
          this.loading1 = true;
          let params = {
            name: query
          };
          setTimeout(() => {
            this.loading1 = false;
            getAllClassify(formData(params)).then(res => {
              const list2 = res.response.map(item => {
                return {
                  value: item.id,
                  label: item.text
                };
              });
              this.options4 = list2;
            });
          }, 2000);
        } else {
          this.formItem.informationTypeId="";
          this.options4 = [];
        }
      },
      //责任人
      remoteMethod5(query) {
        if (query !== "") {
          this.loading1 = true;
          let params = {
            name: query
          };
          this.loading1 = false;
          getEmployee(formData(params)).then(res => {
            const list2 = res.response.map(item => {
              return {
                value: item.id,
                label: item.text
              };
            });
            this.options5 = list2;
          });
        } else {
          this.formItem.executorId='';
          this.options5 = [];
        }
      },
      //获取站点
      remoteMethod6(query) {
        if (query !== "") {
          this.loading1 = true;
          let params = {
            name: query
          };
          setTimeout(() => {
            this.loading1 = false;
            getSite(formData(params)).then(res => {
              const list2 = res.response.map(item => {
                return {
                  value: item.id,
                  label: item.text
                };
              });
              this.options6 = list2;
            });
          }, 2000);
        } else {
          this.formItem.siteId = '';
          this.options6 = [];
        }
      },
      //获取部门
      remoteMethod7(query) {
        if (query !== "") {
          this.loading = true;
          let params = {
            name: query
          };
          this.loading1 = false;
          getDepartment(formData(params)).then(res => {
            const list3 = res.response.map(item => {
              return {
                value: item.id,
                label: item.text
              };
            });
            this.depatmentList = list3;
          });
        } else {
//        this.formItem.departmentId="";
          this.depatmentList = [];
        }
      },
      onDepartmentChange(data) {
        if (data) {
          this.formItem.departmentName = data.label;
        }
      },
      onInformationTypeChange(data) {
        if (data) {
          this.formItem.InformationTypeName = data.label;
        }
      },
      onbreedIdChange(data) {
        if (data) {
          this.formItem.breedName = data.label;
        }
      },
      onAreaIdChange(data) {
        if (data) {
          this.formItem.areaName = data.label;
        }
      },
      onEnterpriseIdChange(data) {
        if (data) {
          this.formItem.enterpriseName = data.label;
        }
      },
      onSiteIdChange(data) {
        if (data) {
          this.formItem.sitename = data.label;
        }
      },
      onExecutorIdChange(data) {
        if (data) {
          this.formItem.executorName = data.label;
        }
      },
      moban(data) {
        this.shenheModal = true;
        this.publishType = data.row.displayType;
        let form = {
          taskId: data.row.informationUnitId,
        };
        informationTemplateDetail(formData(form)).then(res => {
          this.infromationCode = res.response.code;
          this.infromationName = res.response.name;
          this.infromationModelId = res.response.id;
          let list = res.response.templateVOList;
          if(list != null)
          {
            for(var i=0; i < list.length; i++)
            {
              if(list[i].relationType == 1)
              {
                this.beforeModalName = list[i].informationTemplateName;
                this.beforeModalId= list[i].informationTemplateId;
              }
              else
              {
                this.backStageModalId = list[i].informationTemplateId;
                this.backStageModalName = list[i].informationTemplateName;

              }
            }
          }

        });
      },
      distribution(data) {
        this.distributionAlertTask = true;
      },
      Editing_ping(data) {
        this.taskId = data.row.taskId;
        this.checkTime = data.row.checkTime;
        this.executionNumber = data.row.executionNumber;
        this.taskCycle = data.row.taskCycle;
        // 0表示日，1表示周，2表示月，3表示季度，4表示年
        if(data.row.taskCycle == 0){
          this.weekMonth = false;
          this.weekDate = false;
          this.weekWeek = false;
        }
        if(data.row.taskCycle == 1){
          this.dateWeekOne = data.row.cycleSupplyInfo;
          this.weekMonth = false;
          this.weekDate = false;
          this.weekWeek = true;
          this.$refs.data1.style.display = 'none'
        }
        if(data.row.taskCycle == 2){
          this.dateMonthOne = data.row.cycleSupplyInfo
          this.weekMonth = true;
          this.weekDate = false;
          this.weekWeek = false;
        }
        if(data.row.taskCycle == 3){
          this.dateDateOne = data.row.cycleSupplyInfoName;
          this.weekMonth = false;
          this.weekDate = true;
          this.weekWeek = false;
        }
        if(data.row.taskCycle == 4){
          this.dateDateOne = data.row.cycleSupplyInfoName;
          this.weekMonth = false;
          this.weekDate = true;
          this.weekWeek = false;
        }
        // this.Editingfrequency = true;
      },
      // 前端是否展示
      editIsShow_is(data, event) {
        let informationUnitId = data.row.informationUnitId;
        let isShow = event;
        let that = this;
        let form = { informationUnitId: informationUnitId, isShow: isShow };
        editIsShow(formData(form)).then(res => {
          this.$Message.success("修改成功");
          setTimeout(function() {
            that.getUserInfo();
          }, 300);
        });
      },
      technique() {
        if (this.taskCycle == 4 || this.taskCycle == 3) {
          this.weekDate = true;
          this.weekMonth = false;
          this.weekWeek = false;
        }
        if (this.taskCycle == 2) {
          this.weekMonth = true;
          this.weekDate = false;
          this.weekWeek = false;
        }
        if (this.taskCycle == 1) {
          this.weekWeek = true;
          this.weekDate = false;
          this.weekMonth = false;
        }
        if (this.taskCycle == 0) {
          this.weekMonth = false;
          this.weekDate = false;
          this.weekWeek = false;
        }
      },

      // 保存
      cancel() {
        this.Editingfrequency = false;
      },
      save_week(executionNumber,taskCycle,cycleSupplyInfo,taskId,checkTime) {
        let one = "";
        if(this.taskCycle == 3 || this.taskCycle == 4){
          one = new Date(this.dateDateOne).getTime();
        }
        if(this.taskCycle == 1){
          one = this.dateWeekOne ;
        }
        if(this.taskCycle == 2){
          one = this.dateMonthOne ;
        }
        if(this.taskCycle == 0){
          one = '';
        }
        let form = {
          executionNumber:this.executionNumber,
          taskCycle:this.taskCycle,
          cycleSupplyInfo:one,
          taskId:this.taskId,
          checkTime:this.checkTime
        };
        editTask(form).then(res => {
          this.$Message.success("修改成功");
          this.getUserInfo();
          this.Editingfrequency = false ;
        });
      },
      dataDate(data){
        this.dateMonthOne = data;
      },
      relationBackStageModal() {
        this.optionChoice = "0";
        this.getTemplateList();
      },
      relationBeforeModal(){
        this.optionChoice = "1";
        this.getTemplateList();
      },
      rejectModal(data){
        let form = {
          id:this.infromationModelId,
          templateVOList: [
            {
              informationTemplateId: this.backStageModalId,
              informationUnitId: this.infromationModelId,
              relationType: 0
            },
            {
              informationTemplateId: this.beforeModalId,
              informationUnitId: this.infromationModelId,
              relationType: 1
            }
          ]
        };
        informationTemplateSave(form).then(res =>
        {
          if(res.status == 200)
          {
            let that = this;
            that.shenheModal = false;
            that.$Message.success("关联模板成功");
            setTimeout(function() {
              that.getUserInfo();
            }, 300);

            that.infromationCode = "";
            that.infromationName = "";
            that.backStageModalName = "";
            that.beforeModalName = "";
          }
        });
      },
      cancelModal() {
        let that = this;
        that.infromationCode = "";
        that.infromationName = "";
        that.backStageModalName = "";
        that.beforeModalName = "";
        that.shenheModal = false;
        setTimeout(function() {
          that.getUserInfo();
        }, 300);
      },
      // 关联模板列表
      getTemplateList(){
        this.AssoInforClassTemplate = true;
        let displayType = null;
        if(this.optionChoice == 1)
        {
          displayType = this.publishType;
        }
        let form = {
          name:this.templateName,
          pageNum: this.templatePageNum,
          pageSize: this.templatePageSize,
          status:0,
          displayType:displayType
        };
        informationTemplateList(form).then(res =>
        {
          if(res.response === null){
            this.tableData_info = [];
            this.templateTotal = 0;
            this.templatePageSize = 10;
            this.templatePageNum = 1;
          }else{
            this.tableData_info = res.response.list;
            this.templateTotal = res.response.total;
            this.templatePageSize = res.response.pageSize;
            this.templatePageNum = res.response.pageNum;
          }
        });
      },

      // 关联模板擦除
      relationCancel() {
        this.AssoInforClassTemplate = false;
        this.publishType = null;
        this.handleReset();
      },
      // 关联模板列表重置
      handleReset() {
        this.templateName = "";
      },
      // 关联模板列表查询
      infoSelectTemplate(){
        this.templatePageNum = 1;
        this.getTemplateList();
      },
      // 关联模板列表取消
      calcelQueryTemplate()
      {
        this.AssoInforClassTemplate = false;
        this.tableData_info = [];
        this.handleReset();
        this.templatePageNum = 1;
      },

      // 关联模板保存
      saveSelectTemplate(){
        let that = this;
        this.AssoInforClassTemplate = false;
        this.templatePageNum = 1;
        // 1代表前端模板
        if(this.optionChoice == 1)
        {
          this.beforeModalName = this.selectTemplateName;
          this.beforeModalId = this.selectTemplateId;
        }
        else
        {
          this.backStageModalId = this.selectTemplateId;
          this.backStageModalName = this.selectTemplateName;
        }
        this.handleReset();
      },
      templatePageChange(page, templatePageSize) {
        // debugger
        if (page) {
          this.templatePageNum = page;
        }
        if (templatePageSize) {
          this.templatePageSize = templatePageSize;
        }
        this.getTemplateList();
      },

      setHistorySession(cb) {
        const unitMangementHistoryList = { ...this.formItem, pageNum: this.pageNum, pageSize: this.pageSize };
        window.sessionStorage.setItem('unitMangementHistoryList', JSON.stringify(unitMangementHistoryList));
        if (cb) cb();
      }
    },

    beforeRouteLeave (to, from, next) {
      this.setHistorySession(function () {
        next();
      });
    }
  };
</script>
