<template>
          <!-- 查看通话记录弹窗 -->
        <Modal v-model="short_message_modal" title="查看通话记录" width="1100" @on-cancel="closeBasicModal">
            <Row class="unit">
                <Row class="unit_title">
                    <span style="font-size:15px">联系人基本信息</span>
                </Row>
                <Row class="unit_content">
                    <Form ref="basicform" :model="basicform" :label-width="120">
                        <Row>
                            <Col span="12">
                            <FormItem label="姓名 : ">{{ basicform.xingmin}}</FormItem>
                            </Col>
                            <Col span="12">
                            <FormItem label="所在部门 ：">{{ basicform.department}}</FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="24">
                            <FormItem label="所在公司 ：">{{ basicform.enterpriseName}}</FormItem>
                            </Col>
                        </Row>
                    </Form>
                </Row>
            </Row>
            <div class="unit">
                <Row class="unit_title" style="margin-bottom:20px">
                    <span style="font-size:15px">通话记录</span>
                </Row>
                <Form ref="basicform" :model="basicform">
                    <Row>
                        <Col span="18">
                        <FormItem label="查询时间段 ：" :label-width="120">
                            <Row>
                                <Col span="9">
                                  <DatePicker type="date" v-model="basicform.startTime" placeholder="请输入开始时间" style="width: 200px" ></DatePicker>
                                </Col>
                                <Col span="2">
                                 <span>至</span>
                                </Col>
                                <Col span="8">
                                  <DatePicker v-model="basicform.endTime" type="date" placeholder="请输入结束时间" style="width: 200px" ></DatePicker>
                                </Col>
                            </Row>
                        </FormItem>
                        </Col>
                        <Col span="6" class="text-right" style="margin-bottom:20px">
                        <Button type="primary" @click="search">查询</Button>
                        <Button style="margin-left: 8px" @click="reset">重置</Button>
                        </Col>
                    </Row>
                </Form>
                <Table :columns="columns4" :data="data4"></Table>
                 <oil-page :total="total" :page-num="pageNum" :page-size="pageSize" @page-change="pageChange" :page-size-opts="pageSizeOpts" :show-sizer="showSizer" ></oil-page>
            </div>
            <div slot="footer">
                <i-button type="primary" @click="closeBasicModal">返回</i-button>
            </div>
        </Modal>
        <!-- 查看通话记录弹窗结束 -->
</template>
<script>
import axios from "axios";
import { formData ,formatStamp, formatTime } from "../../../assets/js/common.js";
import oilPage from "../../components/page/page.vue";
import {callrecordsList,callrecordsDownload} from "../unitmangement/api/unitManageMent";
export default {
  name :'short_message_modal',
  props: {
        showRecordsModal: Boolean,
        RecordskData: Object
    },
  components: {
    oilPage
  },
  data(){
    return {
      pageSizeOpts: [10,15,20,40,50,100,200],
      showSizer: true,
      pageSize: 5,
      total: 0,
      pageNum:1,
      short_message_modal:false,
      basicform:{
        startTime: '',
        endTime: ''
      },
      RecordsData:{},
      data4:[],
      columns4:[
        {
          title: "日期",
          key: "changeCreateTime"
        },
        {
          title: "呼叫号码",
          key: "extCode"
        },
        {
          title: "被叫号码",
          key: "otherCode"
        },
        {
          title: "通话开始时间",
          key: "changeConnectTime"
        },
        {
          title: "通话结束时间",
          key: "changeDisconnectTime"
        },
        {
          title: "通话时长(单位：分钟)",
          key: "connectTimeLen"
        },
        {
          title: "操作",
          align:'center',
          minWidth:220,
          render: (h, params) => {
            var html = '<audio controls><source src="'
            +params.row.fileUrl+
            '" type="audio/wav">'+
            "</audio>";
            return h("div", {
              domProps:{
                innerHTML:html
              }
            });
          }
        },
      ]
    }
    
  },
  created (){
    // let startTime = formatStamp(this.basicform.startTime);
    let start = new Date();
    let inTimeE = new Date().getTime();
    let nTimeS = start.setTime(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
    // let endTime = ;
    // this.basicform.startTime = formData(nTimeS);
    // console.log(formData(nTimeS));
    console.log(formatTime(inTimeE));
    this.basicform.startTime = formatTime(nTimeS);
    this.basicform.endTime = formatTime(inTimeE) ;
    
  },
  methods:{
    downLoad(data){
      // console.log(data);
      // let params={
      //   urlFile:data.row.fileUrl
      // }
      // callrecordsDownload(formData(params)).then(res => {
      //   console.log(res);
      // })
      // window.location.href = data.row.fileUrl;
    },
    search(){
      this.pageNum = 1;
      this.pageSize = 10;
      this.getList();
    },
    reset(){
      this.basicform.startTime = '';
      this.basicform.endTime  = '';
    },
    startTime(data){
      console.log(new Date(data).getTime());
      this.basicform.startTime = new Date(data).getTime();
    },
    endTime(data){
      this.basicform.endTime = new Date(data).getTime();
    },
    pageChange(page, pageSize) {
      if(page) {
        this.pageNum = page
      }
      if(pageSize) {
        this.pageSize = pageSize
      }
      this.getList();
    },
    closeBasicModal(){
      this.short_message_modal = false;
      this.$emit('hide-modal');
      // this.basicform.startTime = '';
      // this.basicform.endTime  = '';
      let start = new Date();
      let inTimeE = new Date().getTime();
      let nTimeS = start.setTime(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
      // let endTime = ;
      // this.basicform.startTime = formData(nTimeS);
      // console.log(formData(nTimeS));
      console.log(formatTime(inTimeE));
      this.basicform.startTime = formatTime(nTimeS);
      this.basicform.endTime = formatTime(inTimeE);
      this.getList();
    },
    baseInfo(){
      this.basicform.xingmin = this.RecordsData.row.name;
      this.basicform.department = this.RecordsData.row.department;
      this.basicform.enterpriseName = this.RecordsData.row.enterpriseName;
    },
    getList(){
      let startTime = formatStamp(this.basicform.startTime);
      let endTime = formatStamp(this.basicform.endTime) + 86399000;
      let params = {
        pageNum:this.pageNum,
        pageSize:this.pageSize,
        startTime: startTime,
        endTime:endTime,
        callRecordId:1,
        otherPhone:this.RecordsData.row.phone,
        otherMobile:this.RecordsData.row.mobile
      }
      callrecordsList(params).then(res => {
        console.log('下载',res);
        this.data4 = res.response.list;
        this.total = res.response.total;
      })
    }
  },
  watch:{
    showRecordsModal (newV, oldV){
        this.short_message_modal = newV
    }, 
    RecordskData(newV, oldV){
        this.RecordsData = newV;
        console.log('RecordsData',this.RecordsData);
        this.baseInfo();
        this.getList();
    },
  }
}
</script>
