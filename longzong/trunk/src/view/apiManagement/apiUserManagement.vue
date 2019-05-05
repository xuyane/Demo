<style>
</style>

<template >
  <Row class='varietybox'>
    <Col span="24">
        <i-col span="24">
        <Row class-name="current-position">
            当前位置：对外接口管理&nbsp;&nbsp;>>&nbsp;&nbsp;接口用户管理
        </Row>
        </i-col>
    </Col>
    <Col span="24" class-name="search-form">
        <Form ref="form" :model="form" :label-width="120">
            <Row type="flex" justify="space-between">
                <Col span='7'>
                    <FormItem label="企业名称:" >
                        <Input type="text" v-model="form.enterpriseName" class="search-input"></Input>
                    </FormItem>
                </Col>
                <Col span='7'>
                    <FormItem label="联系人:" >
                        <Input type="text" v-model="form.contactsName" class="search-input"></Input>
                    </FormItem>
                </Col>
                <Col span='7'>
                  <FormItem label="状态:">
                    <Select v-model="form.status">
                      <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.desc }}</Option>
                    </Select>
                  </FormItem>
                </Col>
                </Row>
                <Row type="flex" justify="space-between">
                  <Col span='7'>
                      <FormItem label="合同开始时间:" >
                        <DatePicker v-model="queryContractTime" :editable="editableStr" format="yyyy-MM-dd" type="daterange" placement="top-start" placeholder="请选择合同开始时间" class="search-input" @on-change="changeContractTime"></DatePicker>
                      </FormItem>
                  </Col>
                  <Col span='7'>
                      <FormItem label="合同结束时间:">
                        <DatePicker v-model="queryDataTime" :editable="editableStr" format="yyyy-MM-dd" type="daterange" placement="top-start" placeholder="请选择合同结束时间" class="search-input" @on-change="changeDataTime"></DatePicker>
                      </FormItem>
                  </Col>
                  <Col span='7'>
                    <FormItem label="信息接口状态:">
                      <Select v-model="form.informationConfigStatus">
                        <Option v-for="item in infoStatusList" :value="item.value" :key="item.value">{{ item.desc }}</Option>
                      </Select>
                    </FormItem>
                  </Col>
                </Row>
                <Row type="flex" justify="space-between">
                 <Col span='7'>
                    <FormItem label="价格接口状态:">
                      <Select v-model="form.priceConfigStatus">
                        <Option v-for="item in priceStatusList" :value="item.value" :key="item.value">{{ item.desc }}</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  <Col span="7"></Col>
                  <Col span="7" style="text-align:right">
                      <Button type="primary" @click="search">查询</Button>
                      <Button style="margin-left: 8px" @click="reset">重置</Button>
                  </Col>
                </Row>
        </Form>
    </Col>
    <Col span="24">
    <div class="btn-container">
        <Button type="primary" class="search-btn" @click="addUser">新增用户</Button>
      </div>
        <Row>
            <Table class="tableCommon" border :columns="columns" :data="tableData"></Table>
            <div class="page-con">
                <oil-page :total="total" :page-num="pageNum" :page-size="pageSize" @page-change="pageChange" :page-size-opts="pageSizeOpts" :show-sizer="showSizer"></oil-page>
            </div>
        </Row>
    </Col>
     
    <!-- 启用弹窗开始 -->
    <Modal v-model="enableSiteModal" title="是否启用该接口?">
      <!-- <p>是否确认启用该信息接口？</p> -->
      <Form :model="enableform" :label-width="150">
        <Row>
          <Col span="24">
            <FormItem label="开始时间：" >
                <DatePicker v-model="enableform.startTime" format="yyyy-MM-dd" type="date"></DatePicker>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="24">
            <FormItem label="结束时间：">
                <DatePicker v-model="enableform.endTime" format="yyyy-MM-dd" type="date"></DatePicker>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <i-button type="primary" @click="infoClick()">确定</i-button>
        <i-button @click="cancelClick()">取消</i-button>
      </div>
    </Modal>
    <!-- 启用弹窗结束 -->
  </Row>
</template>
<script>
import {
userList,getPrice,setConfigStatus,timeOpen
} from "../components/axios/apiManagement.js";
import axios from "axios";
import oilPage from "../components/page/page.vue";
import { formData,formatTime,getNextMonth } from "../../assets/js/common.js";
import timeStampChange from "../../assets/js/timestamp_change.js";
export default {
  name: "apiUserManagement",
  components: {
    oilPage
  },
  data() { 
    return {
      pageSizeOpts: [10, 20, 50, 100, 200],
      editableStr: false,
      showSizer: true,
      pageSize: 10,
      pageNum: 1,
      total: 0,
      useId: "",
      type: "",
      configStatus: "",
      enableSiteModal:false,
      queryInfoTime:[],
      queryContractTime:[],
      queryDataTime:[],
      contractEndTime1:"",
      enableform: {
        id: "",
        type: "",
        configStatus: "",
        startTime: null,
        endTime: null
      },
      statusList:[
        {
          value: -1,
          desc: "全部"
        },
        {
          value: 0,
          desc: "禁用"
        },
        {
          value: 1,
          desc: "启用"
        }
      ],
       infoStatusList:[
        {
          value: -1,
          desc: "全部"
        },
        {
          value: 0,
          desc: "禁用"
        },
        {
          value: 1,
          desc: "启用"
        }
      ],
       priceStatusList:[
        {
          value: -1,
          desc: "全部"
        },
        {
          value: 0,
          desc: "禁用"
        },
        {
          value: 1,
          desc: "启用"
        }
      ],
      infoStatusList1:[
        {
          value: 0,
          desc: "禁用"
        },
        {
          value: 1,
          desc: "启用"
        }
      ],
       priceStatusList1:[
        {
          value: 0,
          desc: "禁用"
        },
        {
          value: 1,
          desc: "启用"
        }
      ],
      form:{
        enterpriseName: "",
        contactsName: "",
        informationConfigStatus: -1,
        priceConfigStatus: -1,
        status: -1,
        contractStartTimeStart: "",
        contractStartTimeEnd: "",
        contractEndTimeStart: "",
        contractEndTimeEnd: ""
      },
      queryTime:[],
      columns: [
        {
          title: "企业名称",
          key: "enterpriseName",
          minWidth: 100
        },
        {
          title: "联系人姓名",
          key: "contactsName",
          align: "center",
          minWidth: 100
        },
        {
          title: "联系方式",
          key: "contactsMobile",
          align: "center",
          minWidth: 100,
          render: (h, data) => {
            let label = "";
            if(data.row.contactsMobile==="0"){
              label = "";
            }else{
              if(data.row.contactsPhone){
                label = data.row.contactsMobile +"-"+ data.row.contactsPhone;
              }else{
                label = data.row.contactsMobile
              } 
            } 
            return h(
              "span",
              {
                props: {
                  type: "text",
                  size: "small"
                }
              },
              label
            );
          }
        },
        {
          title: "合同开始时间",
          key: "contractStartTime",
          minWidth: 100,
          render: (h, data) => {
            let label = "";
            if(data.row.contractStartTime){
              label=  formatTime(data.row.contractStartTime)
            }
            return h("span", {},label );    
          }
        },
        {
          title: "合同截止时间",
          key: "contractEndTime",
          minWidth: 100,
          render: (h, data) => {
            let label = "";
            if(data.row.contractEndTime){
              label=  formatTime(data.row.contractEndTime)
            }
            return h("span", {},label );    
          }
        }, {
          title: "价格起始时间",
          key: "dataStartTime",
          minWidth: 100,
          render: (h, data) => {
            let label = "";
            if(data.row.dataStartTime){
              label=  formatTime(data.row.dataStartTime)
            }
            return h("span", {},label );    
          }
        },{
          title: "资讯起始时间",
          key: "infoStartTime",
          minWidth: 100,
          render: (h, data) => {
            let label = "";
            if(data.row.infoStartTime){
              label=  formatTime(data.row.infoStartTime)
            }
            return h("span", {},label );    
          }
        },{
          title: "ip地址绑定",
          key: "bindIps",
          minWidth: 110,
          render: (h, data) => {
            let str = '';
            for(var i=0;i<data.row.bindIps.length;i++ ){
              str+=data.row.bindIps[i]+'<br />';
            }
            return h("div", [
              h(
                "Tooltip",
                {
                  props: {
                    placement: "top",
                    maxWidth: 600
                  },
                  style: {
                    marginLeft: "5px",
                    color: "#2d8cf0",
                    cursor: "pointer"
                  }
                },
                [
                  h(
                    "span",
                    {},
                    data.row.bindIps&&data.row.bindIps.length>0  ? "详情" : ""
                  ),
                  h("div", {
                    slot: "content",
                    style: {
                      maxHeight: "400px",
                      overflow: "auto"
                    },
                    domProps: {
                      innerHTML:str
                    }
                  })
                ]
              )
            ]);
          }
        },{
          title: "当前访问ip地址",
          key: "lastIp",
          minWidth: 130
        },{
          title: "状态",
          key: "status",
          minWidth: 100,
          render: (h, data) => {
            let label =
              data.row.status == 0 ? "禁用" : data.row.status == 1 ? "启用" : "";
            return h(
              "span",
              {
                props: {
                  type: "text",
                  size: "small"
                }
              },
              label
            );
          }
        },{
            key: "informationConfigStatus",
            title: "信息接口",
            minWidth: 100,
            align: "center",
            render: (h, params) => {
              return h(
                "Select",
                {
                  style: {
                    width:"60px",
                    style: "border: 1px solid #dddee1"
                  },
                  props: {
                    value: params.row.informationConfigStatus,
                    size: "small"
                  },
                  on: {
                    "on-change": event => {
                      let contractEndTime = formatTime(params.row.contractEndTime);
                      if(event==1){
                        this.infoIsShow(params, event,contractEndTime,1);
                      }
                      if(event==0){
                        this.enableform.id = params.row.id;
                        this.enableClick(params.row.id,1);
                      }
                      
                    }
                  }
                },
                this.infoStatusList1.map(function(item) {
                  return h(
                    "Option",
                    {
                      props: { value: item.value }
                    },
                    item.desc
                  );
                })
              );
            }
          }, {
            key: "priceConfigStatus",
            title: "价格接口",
            minWidth: 100,
            align: "center",
            render: (h, params) => {
              return h(
                "Select",
                {
                  style: {
                    width:"60px",
                    style: "border: 1px solid #dddee1"
                  },
                  props: {
                    value: params.row.priceConfigStatus,
                    size: "small"
                  },
                  on: {
                    "on-change": event => {
                      let contractEndTime = formatTime(params.row.contractEndTime);
                     if(event==1){
                        this.infoIsShow(params, event,contractEndTime,2);
                      }
                      if(event==0){
                        this.enableform.id = params.row.id;
                        this.enableClick(params.row.id,2);
                      }
                    }
                  }
                },
                this.priceStatusList1.map(function(item) {
                  return h(
                    "Option",
                    {
                      props: { value: item.value }
                    },
                    item.desc
                  );
                })
              );
            }
          },{
          title: "操作",
          align: "center",
          minWidth: 200,
          render: (h, data) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    color: "span",
                    color: "blue",
                    textDecoration: "underline",
                    marginRight: "8px",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        path: "/addReviseApiUser",
                        query: {
                          id: data.row.id
                        }
                      });
                    }
                  }
                },
                "编辑"
              ),
              h(
                "span",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  style: {
                    color: "blue",
                    marginRight: "8px",
                    textDecoration: "underline",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        path: "/informationConfig",
                        query: { id: data.row.id }
                      });
                    }
                  }
                },
                "资讯配置"
              ),
              h(
                "span",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  style: {
                    color: "blue",
                    marginRight: "8px",
                    textDecoration: "underline",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        path: "/priceConfig",
                        query: { id: data.row.id }
                      });
                    }
                  }
                },
                "价格配置"
              )
            ]);
          }
        }
      ],
      tableData: [],
    }
  },
  created() {
    this.queryData();
  },
  methods: {
     //新增用户
    addUser() {
      this.$router.push({
        name: "addReviseApiUser",
        query: {
          id: -1
        }
      });
    },
    //查询功能
    search() {
      this.pageNum = 1;
      this.pageSize = 10;
      this.queryData();
    },
    //重置
    reset() {
    this.pageNum = 1;
    this.pageSize = 10;
    this.form.enterpriseName = "";
    this.form.contactsName = "";
    this.form.status = -1;
    this.form.fatoryName = "";
    this.form.informationConfigStatus = -1;
    this.form.priceConfigStatus = -1;
    this.form.contractStartTimeStart = "";
    this.form.contractStartTimeEnd = "";
    this.queryContractTime = [];
    this.form.contractEndTimeStart = "";
    this.form.contractEndTimeEnd = "";
    this.queryDataTime= [];
    },
    //获取合同时间
    changeContractTime(data) {
      let data1 = new Date(data[0]);
      let data2 = new Date(data[1]);
      this.form.contractStartTimeStart = data1.getTime();
      this.form.contractStartTimeEnd = data2.getTime();
    },
    //获取数据时间
    changeDataTime(data) {
      let data1 = new Date(data[0]);
      let data2 = new Date(data[1]);
      this.form.contractEndTimeStart = data1.getTime();
      this.form.contractEndTimeEnd = data2.getTime();
    },
    //数据列表
    queryData() {
      var that = this;
      this.form.pageSize = this.pageSize;
      this.form.pageNum = this.pageNum;
      this.form.contractStartTimeStart = this.form.contractStartTimeStart || "";
      this.form.contractStartTimeEnd = this.form.contractStartTimeEnd || "";
      this.form.contractEndTimeStart = this.form.contractEndTimeStart || "";
      this.form.contractEndTimeEnd = this.form.contractEndTimeEnd || "";
      userList(formData(this.form)).then(res => {
        if(res.response.list){
          res.response.list.map(item=>{
            if(item.bindIps.length==0){
              return
            }else{
              item.bindIps =  item.bindIps.split('-');
            }
          })
          that.tableData = res.response.list;
          that.total = res.response.total;
        }
      });
    },
  getQueryTime(){

  },
    //分页
    pageChange(page, pageSize) {
      if (page) {
        this.pageNum = page;
      }
      if (pageSize) {
        this.pageSize = pageSize;
      }
      this.queryData();
    },
    infoIsShow(data, event,time,type){
      let that = this;
      this.enableSiteModal = true;
      this.contractEndTime1 = time;
      this.enableform = {
        id: data.row.id, 
        type: type,
        configStatus: event 
      };
      let params = {
        userId: data.row.id, 
        type: type
      };
      timeOpen(formData(params)).then(res => {
        if(res.response.startTime){
          that.enableform.startTime = formatTime(res.response.startTime);
        }
        if(res.response.endTime){
          that.enableform.endTime = formatTime(res.response.endTime);
        }
        
        that.enableform = {...that.enableform};
      });
    },
    //取消接口
    cancelClick(){
      this.enableSiteModal = false;
      this.queryData();
    },
    // 接口启用
    infoClick() {
      debugger
      let that = this;
      let startTime = new Date(this.enableform.startTime).getTime() || "";
      let endTime = new Date(this.enableform.endTime).getTime() || "";
      let getMonth = getNextMonth(formatTime(this.contractEndTime1));
      let getMonthEnd = new Date(getMonth).getTime();
      let contractEndTime1 = new Date(this.contractEndTime1).getTime();
       if(!startTime){
         that.$Message.warning("开始时间不能为空");
        return;
       }
       if(!endTime){
        that.$Message.warning("结束时间不能为空");
        return;
       }
       if(endTime<contractEndTime1){
        that.$Message.warning("结束时间不能小于合同截止时间");
        return;
       }
       if(endTime>getMonthEnd){
        that.$Message.warning("结束时间不能超过合同截止时间一个月");
        return;
       }
      if(startTime>endTime){
        that.$Message.warning("开始时间不能大于结束时间");
        return;
      }

     
      //启用
       let params = {
          id: that.enableform.id, 
          type: that.enableform.type,
          configStatus: 1,
          startTime: startTime,
          endTime: endTime
        }
      setConfigStatus(formData(params)).then(res => {
        that.$Message.success("启用成功");
        setTimeout(function() {
          that.enableSiteModal = false;
          that.queryData();
        }, 300);
      });
    },

    //接口禁用
    enableClick(id,type){
      let that = this;
      let  params = {
          id: id, 
          type: type,
          configStatus: 0,
          startTime: "",
          endTime: ""
        }
      setConfigStatus(formData(params)).then(res => {
        that.$Message.success("禁用成功");
        setTimeout(function() {
          that.enableSiteModal = false;
          that.queryData();
        }, 300);
      });
    },
    priceIsShow_is(data, event,type){
      this.enableSiteModal = true;
      this.useId = data.row.id;
      this.type = type;
      this.configStatus = this.event;
    },
     // 信息接口启用禁用
    priceIs_setConfigStatus() {
      let that = this;
      let form = { 
        id: this.useId, 
        type: this.type,
        configStatus: this.configStatus 
      };
      setConfigStatus(formData(form)).then(res => {
        that.$Message.success("修改成功");
        setTimeout(function() {
          that.queryData();
        }, 300);
      });
    },
  }
};

</script>
