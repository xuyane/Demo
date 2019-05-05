<style lang="less" >
@import "../workBench.less";
</style>
<template>
  <div>
    <div class="top-header">
      <top-header :currentRoutePath="currentRoutePath" @openPhoneCenter="openModal" @on-dial="onDial" @on-hang-up="onHangUp" @init-user-info="initUserPhoneInfo"></top-header>
    </div>
    <div class='box clearfix'>
      <left-msg></left-msg>
      <Row class='right-content'>
        <div class="cont-wrap">
          <div>
            <Row>
              <Col span="19">
                <Card>
                  <div slot="title" >
                    <p class='pmtj fs18' style="position:relative">业绩目标<span class="timeicon"><i ></i> 2018-09-10 08:00:00</span></p>
                    <div class='timebox'>
                      <div v-for='(item,index) in timewrap' :key='index' :class="index==number? 'jdbox' : ''"   @click="navchange(index,item.value)" >
                        <span class="onbox">{{item.option}}</span>
                        <span class="downbox"></span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Row offset='20'>
                      <Col span="12">
                        <div >
                          <div class="productsum">
                            <aim-echart></aim-echart>
                          </div>
                            <Row :gutter="20">
                              <Col span='10' offset='2'>
                                <div>新入金额：<span class="blueword">{{WorkbenchPerformanceTargetVO.actualAmountNew}}</span>元</div>
                                <div class="aim"><span>目标金额:{{WorkbenchPerformanceTargetVO.targetAmountNew}}</span></div>
                                <div>新入率：<span class="blueword">{{WorkbenchPerformanceTargetVO.newrl}}%</span></div>
                              </Col>
                              <Col span='10'>
                                <div>续入金额：<span class="blueword">{{WorkbenchPerformanceTargetVO.actualAmountOld}}</span>元</div>
                                <div class="aim"><span>目标金额:{{WorkbenchPerformanceTargetVO.targetAmountOld}}</span></div>
                                <div>续入率：<span class="blueword">{{WorkbenchPerformanceTargetVO.xrl}}%</span></div>
                              </Col>
                            </Row>
                        </div>
                      </Col>
                      <Col span="10" offset='2'>
                          <div class='bg-right'>
                          <div class="proinfor">
                            <div class='thisdata' v-if="false"><span v-for='(item,index) in timesolt' :key='index' :class="index==thisdatanum? 'thisdataactive' : ''"   @click="thisdatachange(index)" >{{item.name}}</span></div>
                            <div   >
                              <div class="Onshelf">
                                <div>有效电话时长<span class="blueword">{{WorkbenchPerformanceTargetVO.effectiveCallTime}}</span>分钟</div>
                                <Progress :percent="100" />
                                <div>有效任务：{{WorkbenchPerformanceTargetVO.effectiveCallTime}}分钟</div>
                              </div>
                              <div class="Onshelf">
                                <div>有效电话个数<span class="blueword">{{WorkbenchPerformanceTargetVO.effectiveCallNum}}</span>个</div>
                                <Progress :percent="100" />
                                <div>有效任务：{{WorkbenchPerformanceTargetVO.effectiveCallNum}}个</div>
                              </div>
                              <div class="Onshelf">
                                <div>今日开发客户<span class="blueword">{{WorkbenchPerformanceTargetVO.userCreateNum}}</span>个</div>
                                <Progress :percent="100" />
                                <div>开发任务：{{WorkbenchPerformanceTargetVO.userCreateNum}}个</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Card>
                <Card class="middle-content">
                  <p class='pmtj fs18'>客户维护</p>
                  <div class='thisdata'><span v-for='(item,index) in teamitem' :key='index' :class="index==thisteamnum? 'thisdataactive' : ''"   @click="thisteamchange(index)" >{{item.name}}</span></div>
                  <Row>
                      <Col span="15">
                        <div class="bgbox">
                            <div class="sum">
                            <Row>
                              <Col span="8">
                                <div class="blue">{{userManagerVO.userTotal}}</div>
                                <div>客户总数（位）</div>
                              </Col>
                              <Col span="8">
                                <div class="blue">{{userManagerVO.intentionUser}}</div>
                                <div>意向客户（位）</div>
                              </Col>
                              <Col span="8">
                                <div class="blue">{{userManagerVO.loseUser}}</div>
                                <div>流失客户（位）</div>
                              </Col>
                            </Row>
                          </div>
                          <div class="productsum">
                            <custom-account :getUserManagerVO='userManagerVO'></custom-account>
                          </div>
                        </div>
                      </Col>
                      <Col span="9">
                        <div class='bg-right circle1'>
                          <Row>
                            <Col span='12' offset='2'>
                              <i-circle :size="120"
                                :trail-width="8"
                                :stroke-width="8"
                                :percent="75"
                                stroke-linecap="square"
                                trail-color='#f09d21'
                                stroke-color="#427fe9">
                                <span class="demo-Circle-inner" style="font-size:20px">试用客户</span>
                              </i-circle>
                            </Col>
                            <Col span='10' class="circleexplain">
                              <div class="">
                                <Icon type="stop" color='#4180e7'></Icon>
                                <span>试用客户：<span class="blueword">{{userManagerVO.trialUser}}</span>个</span>

                              </div>
                              <div class="xiajia">
                                <Icon type="stop" color='#f19d21'></Icon>
                                <span>试用到期：<span class="blueword">{{userManagerVO.trianlExpirationUser}}</span>个</span>
                              </div>
                            </Col>
                          </Row>
                        </div>
                        <div class='bg-right circle12'>
                          <Row>
                            <Col span='12' offset='2'>
                              <i-circle
                                :trail-width="8"
                                :stroke-width="8"
                                :percent="75"
                                :size='120'
                                stroke-linecap="square"
                                trail-color='#f09d21'
                                stroke-color="#427fe9">
                                <span class="demo-Circle-inner" style="font-size:20px">正式客户</span>
                              </i-circle>
                            </Col>
                            <Col span='10' class="circleexplain">
                              <div class="">
                                <Icon type="stop" color='#4180e7'></Icon>
                                <span>正式客户<span class="blueword">{{userManagerVO.formalUser}}</span>个</span>

                              </div>
                              <div class="xiajia">
                                <Icon type="stop" color='#f19d21'></Icon>
                                <span>正式到期：<span class="blueword">{{userManagerVO.formalExpirationUser}}</span>个</span>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </Col>
                    </Row>
                </Card>
                <Row :gutter="15" justify="space-between">
                    <Col span='12' >
                        <Card class="middle-content">
                            <p class='pmtj fs18'>财务事项</p>
                            <div class='thisdata'><span v-for='(item,index) in teamitem' :key='index' :class="index==thismoneynum? 'thisdataactive' : ''"   @click="thismoneychange(index)" >{{item.name}}</span></div>
                            <Row class="bbline">
                                <div class=" financesum">
                                    <div class="sum">
                                        <Row>
                                            <Col span="12">
                                                <div class="blue">{{WorkbenchFinancialItemVO.totalRegAmount}}</div>
                                                <div>认账总金额（元）</div>
                                            </Col>
                                            <Col span="12">
                                                <div class="blue">{{WorkbenchFinancialItemVO.totalNewAmount}}</div>
                                                <div>新入金额（位）</div>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </Row>
                            <Row justify="space-around">
                                <Col span='6'offset='1'>
                                    <div class='hnwrap'>
                                        <i class="head-in"></i>
                                        <div>
                                            <p>
                                                <span class='blue fs24'>{{WorkbenchFinancialItemVO.memberNum}}</span>
                                            </p>
                                            <p>
                                                <span>会员数（位）</span>
                                            </p>
                                        </div>

                                    </div>
                                </Col>
                                <Col span='6' offset='2' class="p20">
                                    <div>
                                        <p>续入金额：<span class="blue30">{{WorkbenchFinancialItemVO.totalOldAmount}}</span></p>
                                        <p>会议金额：<span class="blue30">{{WorkbenchFinancialItemVO.totalConfAmount}}</span></p>
                                    </div>
                                </Col>
                                <Col span='6' offset='2' class="p20">
                                    <div>
                                        <p>开票总金额：<span class="blue30">{{WorkbenchFinancialItemVO.invoiceTotalAmount}}</span></p>
                                        <p>退票总金额：<span class="blue30">{{WorkbenchFinancialItemVO.invoiceRefundTotalAmount}}</span></p>
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col span='12' >
                        <Card class="middle-content">
                            <p class='pmtj fs18'>人事汇总</p>
                            <Row>
                                <div class=" financesum">
                                        <div class="sum">
                                            <Row class="bb20">
                                                <Col span="12" class="bright p20">
                                                    <div class="blue">1,060,000</div>
                                                    <div>员工总数（元）</div>
                                                </Col>
                                                <Col span="12" class="p20">
                                                    <div>
                                                        <p>新入人员（位）：<span class="blue60">23</span></p>
                                                        <p>转正人员（位）：<span class="blue60">23</span></p>
                                                        <p>外办人员（位）：<span class="blue60">23</span></p>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col span='3' offset='2'>迟到：<span class="blue60">21</span></Col>
                                                <Col span='3' offset='2'>旷工：<span class="blue60">21</span></Col>
                                                <Col span='3' offset='2'>请假：<span class="blue60">21</span></Col>
                                                <Col span='3' offset='2'>离职：<span class="blue60">21</span></Col>
                                            </Row>
                                        </div>
                                    </div>
                            </Row>
                        </Card>
                    </Col>
                </Row>

                <Card class="middle-content">
                  <p class='pmtj fs18'>到账统计</p>
                  <Row>
                    <div class="productsum">
                      <account-statistics></account-statistics>
                    </div>

                  </Row>
                  <Row  class="yjbb">
                    <Col span='4'> <span class='pmtj fs18'>业务报表</span></Col>
                    <Col span='6'> <span >业务报表 <a >点击下载</a> </span></Col>
                    <Col span='5'> <span >业务报表 <a >点击下载</a></span></Col>
                    <Col span='5'> <span >业务报表<a >点击下载</a></span></Col>
                    <Col span='4'> <span >更多+</span></Col>
                  </Row>
                </Card>
              </Col>
              <Col span="5" >
                <div class="rightcard">
                    <Card dis-hover class="pox">
                      <div class="ryb-t"></div>
                      <div class="ryb-time">
                        <span v-for='(item,index) in rybtime' :key='index' :class="index==rybnumber? 'active' : ''"   @click="rybnavchange(index)">{{item.name}}</span>
                      </div>
                      <Row class="myry">
                        <Col span='6'> <i class="myryhead"></i> </Col>
                        <Col span='12'>个人排行</Col>
                        <Col span='6'><span class="blueword">4</span>/320</Col>
                      </Row>
                      <Row>
                        <Table :columns="columns1" :data="data1" class="rylist tableCommon"></Table>
                        <div class="pagewrap">
                          <Page :total="40" size="small" show-total />
                        </div>

                      </Row>
                    </Card>
                    <Card dis-hover class="pox">
                        <p class='pmtj fs18'>电话事项</p>
                        <div class='thisdata'><span v-for='(item,index) in teamitem' :key='index' :class="index==thisphonenum? 'thisdataactive' : ''"   @click="thisphonechange(index)" >{{item.name}}</span></div>
                        <Row>
                            <Col span='11' offset='1'>
                                <div class='hnwrap'>
                                    <i class="phone-in"></i>
                                    <div>
                                    <p>
                                        <span class='greensum fs24'>{{phoneItemsVO.reservation}}</span>
                                    </p>
                                    <p>
                                        <span>预约提醒</span>
                                    </p>
                                    </div>

                                </div>
                            </Col>
                            <Col span='11'  offset='1'>
                            <div class='hnwrap'>
                                <i class="phone-out"></i>
                                <div>
                                <p>
                                    <span class='redword fs24'>{{phoneItemsVO.missedCalls}}</span>
                                </p>
                                <p>
                                    <span>未接来电</span>
                                </p>
                                </div>

                            </div>
                            </Col>


                        </Row>
                        <div class="textcenter timelong">今日通话时长: <span class="blueword">{{phoneItemsVO.todayTalkTime}}</span></div>
                        <Row>
                            <Col span="12" class="financeexplain">
                            <div class=""><span>呼出记录：<span class="blueword">{{phoneItemsVO.callOutRecords}}</span></span></div>
                            <div><span>有效呼出：<span class="blueword">{{phoneItemsVO.validCalls}}</span></span></div>
                            </Col>
                            <Col span="12" class="financeexplain">
                            <div class=""><span>呼入记录：<span class="blueword">{{phoneItemsVO.callInRecords}}</span></span></div>
                            <div><span>未接通数：<span class="blueword">{{phoneItemsVO.unconnected}}</span></span></div>
                            </Col>
                        </Row>
                        </Card>
                        <Card dis-hover class="pox">
                        <div class="  mb10">
                            <p class='pmtj fs18 mb10'>部门事项</p>
                            <div class='thisdata'><span v-for='(item,index) in teamitem' :key='index' :class="index==thisdepartnum? 'thisdataactive' : ''"   @click="thisdepartchange(index)" >{{item.name}}</span></div>
                            <div class="dotwrap">
                          <a @click="gowhere('userDistribute')">
                            <span class="dottext">用户分配</span>
                            <span class='dot'>·············</span>
                            <span class='htnum'>{{departmentItemsVO.distributed}}</span>
                          </a>
                        </div>
                        <div class="dotwrap">
                          <a @click="gowhere('userTransfer')">
                            <span class="dottext">用户划转</span>
                            <span class='dot'>·············</span>
                            <span class='htnum'>{{departmentItemsVO.transfer}}</span>
                          </a>
                        </div>
                        <div class="dotwrap">
                          <a @click="gowhere('trialDelay')">
                            <span class="dottext">延期审核</span>
                            <span class='dot'>·············</span>
                            <span class='htnum'>{{departmentItemsVO.delayAudit}}</span>
                          </a>
                        </div>
                        <div class="dotwrap">
                          <a @click="gowhere('customerComplaint')">
                            <span class="dottext">客户投诉</span>
                            <span class='dot'>·············</span>
                            <span class='htnum'>{{departmentItemsVO.complainting}}</span>
                          </a>
                        </div>
                        <div class="dotwrap">
                          <a @click="gowhere('callBarring')"><span class="dottext">电话呼出限制</span></a>
                          <!-- <span class='dot'>·············</span>
                          <span class='htnum'>0</span> -->
                        </div>
                        <div class="dotwrap">
                          <a @click="gowhere('remittanceInformation')"><span class="dottext">公司汇款资料</span></a>
                          <!-- <span class='dot'>·············</span>
                          <span class='htnum'>0</span> -->
                        </div>

                        </div>
                        <div>
                            <p class='pmtj fs18 mb10' >行政事项</p>
                            <div class="dotwrap">
                              <span class="dottext">发票邮寄</span>
                              <span class='dot'>·············</span>
                              <span class='htnum'>2100</span>
                            </div>
                            <div class="dotwrap">
                              <span class="dottext">行政事项邮寄</span>
                              <span class='dot'>·············</span>
                              <span class='htnum'>21000</span>
                            </div>
                        </div>
                        </Card>

                </div>

              </Col>
            </Row>

          </div>
        </div>
      </Row>
    </div>

    <!---------------->

    <Modal footer-hide width="760" v-model="showModal" :title="modalTitle">
      <phone-center-modal :has_connected="has_connected" :calling="calling" :phoneMsgRecord="phoneMsgRecord" :callInRecord="callInRecord" :callOutRecord="callOutRecord" @change-connect="changeConnectStatus" @on-dial="onDial" @on-hang-up="onHangUp"></phone-center-modal>
    </Modal>
  </div>
</template>

<script>
import topHeader from "../../../header/header.vue";
import leftMsg from "../../leftUserMsg/leftUserMsg.vue";
import navMenu from "../navMenu.vue";
import aimEchart from "./aimEchart.vue";
import customAccount from "./customAccount.vue";
import accountStatistics from "./accountStatistics.vue";
import { formData } from "../../../../assets/js/common.js";
import {
  workbenchUserManager,
  workbenchDeptItems,
  workbenchPhoneItems,
  workbenchFinancialItem,
  workbenchPerformanceTarget
} from "../../../components/axios/crm.js";

import axios from 'axios'
import dial from '@/assets/js/linkDial.js';
import phoneCenterModal from '@/view/components/phoneCenterModal/phoneCenterModal.vue';
import {callRecordPage} from '@/view/components/axios/phoneCenter'

export default {
  components: {
    topHeader,
    leftMsg,
    navMenu,
    aimEchart,
    customAccount,
    accountStatistics,
    phoneCenterModal
  },
  data() {
    return {
      WorkbenchPerformanceTargetVO :{},//业绩目标
      WorkbenchFinancialItemVO :{},//财务事项
      userManagerVO: {},// 客户维护
      phoneItemsVO: {},// 电话事项
      departmentItemsVO:{},// 部门事项
      columns1: [
        {
          type: "index",
          width: 60,
          title: "排名",
          align: "center"
        },
        {
          title: "业务员",
          key: "age",
          minWidth: 60
        },
        {
          title: "业绩",
          key: "address",
          minWidth: 100
        }
      ],
      data1: [
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03"
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park",
          date: "2016-10-01"
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          date: "2016-10-02"
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          date: "2016-10-04"
        }
      ],
      rybnumber: 0,
      rybtime: [
        {
          name: "日业绩"
        },
        {
          name: "周业绩"
        },
        {
          name: "续入业绩"
        }
      ],
      Onshelf: [
        {
          onshelf: 25,
          value: 2000,
          value1: 300
        },
        {
          onshelf: 35,
          value: 2000,
          value1: 300
        },
        {
          onshelf: 50,
          value: 2000,
          value1: 300
        },
        {
          onshelf: 70,
          value: 2000,
          value1: 300
        }
      ],
      thisdatanum: 0,
      thisteamnum:0,
      thisphonenum:0,
      thisdepartnum:0,
      thismoneynum:0,
      timesolt: [
        { name: "日" },
        { name: "周" },
        { name: "月" },
        { name: "年" }
      ],
      teamitem:[
         { name: "个人" },
        { name: "部门" },
      ],
      number: "0",
      menu: [
        {
          key: "0",
          name: "用户注册"
        },
        {
          key: "1",
          name: "用户分配"
        },
        {
          key: "2",
          name: "用户划转"
        },
        {
          key: "3",
          name: "我的用户"
        },
        {
          key: "4",
          name: "用户搜索"
        },
        {
          key: "5",
          name: "报表"
        },
        {
          key: "6",
          name: "合同管理"
        },
        {
          key: "7",
          name: "用户通知"
        },
        {
          key: "8",
          name: "合同推广"
        },
        {
          key: "9",
          name: "用户通讯录"
        }
      ],
      timewrap: [
          {
          option: "月业绩目标",
          value:2
        },
        {
          option: "年业绩目标",
          value:4
        }
      ],

      tableTitle1: "用户量TOP10",

      /***************************/

      showModal: false,

      // 是否连接cclink
      has_connected: false,
//      has_connected: true,

      // 是否正在打电话
      calling: false,


      // 登陆上下文
      login_context: {},

      // 呼出记录
      callOutRecord: [],

      // 呼入记录
      callInRecord: [],

      // 消息记录
      phoneMsgRecord: [],

      userPhoneInfo: {},
      currentRoutePath: '/'
    };
  },
  methods: {
    gowhere(a){
      this.$router.push({
        name: a
      });
    },
    // 荣誉榜
    rybnavchange(index) {
      this.rybnumber = index;
    },
    // 排名统计
    navchange(index,value) {
      this.number = index;
      this.getWorkbenchPerformanceTargetVO(value)
    },
    //日周月年切换
    thisdatachange(index) {
      this.thisdatanum = index;
    },
    //个人部门切换
    thisteamchange(index){
      this.thisteamnum=index;
      this.getWorkbenchUserManager();
    },
    thisphonechange(index){
      this.thisphonenum=index;
      this.getWorkbenchPhoneItems();
    },
    thisdepartchange(index){
      this.thisdepartnum=index;
      this.getWorkbenchDeptItems();
    },
    thismoneychange(index){
      this.thismoneynum=index;
      this.getWorkbenchFinancialItemVO();
    },
    handleChange(item) {
      this.$router.push({
        name: item.name
      });
    },
    // 部门事项
    getWorkbenchDeptItems(){
      let that = this;
      this.$Spin.show();
      let params = {
        pageType:this.thisdepartnum==1?2:0
      };
      workbenchDeptItems(params).then(resp => {
        that.$Spin.hide();
        if (resp.status == 200)
        {
          this.departmentItemsVO = resp.response;
        }
      });
    },
    // 通话事项
    getWorkbenchPhoneItems(){
      let that = this;
      this.$Spin.show();
      let params = {
        pageType:this.thisphonenum==1?2:0
      };
      workbenchPhoneItems(params).then(resp => {
        that.$Spin.hide();
        if (resp.status == 200)
        {
          this.phoneItemsVO = resp.response;
        }
      });
    },
    // 客户维护
    getWorkbenchUserManager(){
      let that = this;
      this.$Spin.show();
      let params = {
        pageType:this.thisteamnum==1?2:0
      };
      workbenchUserManager(params).then(resp => {
        that.$Spin.hide();
        // this.departmentItemsVO =
        if (resp.status == 200)
        {
          that.userManagerVO = resp.response;
        }
      });
    },
    //财务事项
    getWorkbenchFinancialItemVO(){
      let that = this;
      this.$Spin.show();
      let params = {
        timeType:1,
        pageType:this.thismoneynum==1?2:0
      };
      workbenchFinancialItem(params).then(resp => {
        that.$Spin.hide();
        // this.departmentItemsVO =
        if (resp.status == 200)
        {
          that.WorkbenchFinancialItemVO = resp.response;
        }
      });
    },
        //业绩目标
    getWorkbenchPerformanceTargetVO(value){
      let that = this;
      this.$Spin.show();
      let params = {
        timeType:value
      };
      workbenchPerformanceTarget(params).then(resp => {
        that.$Spin.hide();
        // this.departmentItemsVO =
        if (resp.status == 200)
        {
          that.WorkbenchPerformanceTargetVO = resp.response;
         if(that.WorkbenchPerformanceTargetVO.targetAmountNew == 0){
            that.WorkbenchPerformanceTargetVO.newrl = 0;
          }else{
            that.WorkbenchPerformanceTargetVO.newrl=that.WorkbenchPerformanceTargetVO.actualAmountNew/that.WorkbenchPerformanceTargetVO.targetAmountNew*100
          }
           if(that.WorkbenchPerformanceTargetVO.targetAmountOld == 0){
            that.WorkbenchPerformanceTargetVO.xrl = 0;
          }else{
            that.WorkbenchPerformanceTargetVO.xrl=that.WorkbenchPerformanceTargetVO.actualAmountOld/that.WorkbenchPerformanceTargetVO.targetAmountOld*100
          }
        }
      });
    },

    /********************/
    initUserPhoneInfo(info) {
      this.userPhoneInfo = info;
      this.currentRoutePath = this.$route.path;
//      console.log('in', this.userPhoneInfo);
      this.getPhoneCenterDatas();
    },

    // 打开呼叫弹窗
    openModal(){
      if (this.isGl) return;
      if (this.has_connected) {
        this.getPhoneCenterDatas();
        this.showModal = true;
      }else {
        this.$Message.warning({
          content: '未连接呼叫中心',
          duration: 3,
          closable: true
        });
      }
    },

    // 呼出
    onDial(phone) {
      dial(phone, res => {
        if (!res.isGl && !this.showModal) {
          this.openModal();
        }
        this.getMsgRecords().then(msg => {
          this.phoneMsgRecord = msg;
          const time = formatDate(+new Date());
          this.addMsgRecord({
            callTypeDesc: '正在拨号',
            otherCode: phone,
            time
          });
          this.$Notice.success({title: '呼叫成功：' + phone});
        });
      });
    },


    // 切换连接状态
    changeConnectStatus(status) {
      this.has_connected = status;
      if (!this.has_connected) {
        this._disConnect();
      }else {
        this._connectCClink();
      }
    },

    // 挂断
    onHangUp() {
      if (this.isGl) return;
      const calling = window.localStorage.getItem('calling');
      console.log('挂断', calling);
      if (!calling) return;
      CCLink.Ext_DropCall(calling);
      this.calling = false;
      window.localStorage.removeItem('calling');

      const time = formatDate(+new Date());
      this.addMsgRecord({
        callTypeDesc: '已挂机',
        otherCode: calling,
        time
      });

      console.log('已挂断');
      this.$Notice.info({title: '已挂断'});
    },

    // 断开cclink
    _disConnect() {
      if (!CCLink || this.isGl) return;
      CCLink.Link_DisConnectServer();
      this.has_connected = false;
      window.localStorage.removeItem('hasConnected');
      window.localStorage.removeItem('calling');
      this.$Notice.warning({
        title: '已断开连接',
        duration: 2
      });
    },



    // 获取呼叫记录
    getPhoneCenterDatas() {
      axios.all([
        this.getRecords(this.userPhoneInfo.ids, 1),
        this.getRecords(this.userPhoneInfo.ids, 2),
        this.getMsgRecords()
      ]).then(axios.spread((callInRes, callOutRes, msg) => {
        if (Number(callInRes.status) === 200) {
          this.callInRecord = callInRes.response.slice(0, 6);
//            console.log('in', this.callInRecord);
        }

        if (Number(callOutRes.status) === 200) {
          this.callOutRecord = callOutRes.response.slice(0, 6);
//            console.log('in-out', this.callOutRecord);
        }

        this.phoneMsgRecord = msg;

//            this._connectServer();
        if (window.localStorage.getItem('hasConnected')) {
          this.has_connected = true;
        }
      }));
    },


    // 获取呼叫记录
    getRecords(adminId, type){
      if (adminId && type) {
        return callRecordPage({ adminId, type });
      }
    },


    // 获取消息记录
    getMsgRecords() {
      const sessionMsg = window.sessionStorage.getItem('phoneMsg');
      const msgArr = sessionMsg ? JSON.parse(sessionMsg) : [];
      return new Promise(resolve => {
        resolve(msgArr);
      })
    },


    // 增加消息记录
    addMsgRecord(msg) {
      this.getMsgRecords().then(res => {
        res.unshift(msg);
        this.phoneMsgRecord = res;
        window.sessionStorage.setItem('phoneMsg', JSON.stringify(res));
      })
    },


    _connectCClink() {
      if (!CCLink) {
        this.has_connected =  false;
        return;
      }
      if (!this.userPhoneInfo.linkHost || !this.userPhoneInfo.linkPort) {
        this.has_connected =  false;
        return;
      }

      // 连接服务器
      const err_link = CCLink.Link_ConnectServer(this.userPhoneInfo.linkHost, this.userPhoneInfo.linkPort, 1);
      if (err_link) {
        this.$Notice.error({
          title: '连接呼叫中心服务器失败',
          desc: err_link
        });
        this.has_connected =  false;
        return;
      }

      // 绑定分机
      const err_assign = CCLink.Ext_Assign(this.userPhoneInfo.telephoneShortNumber, this.userPhoneInfo.telephoneShortNumber); //绑定到分机设备
      if (err_assign) {
        this.$Notice.error({
          title: '绑定分机失败',
          desc: err_assign
        });
        this.has_connected =  false;
        return;
      }

      // 将分机签入队列
      CCLink.Ext_CheckInQueue(this.userPhoneInfo.telephoneShortNumber);
      window.localStorage.setItem('hasConnected', 'true');
      this.has_connected =  true;
      this.$Notice.success({
        title: '连接呼叫中心服务器成功',
        duration: 2
      });
    }
  },

  computed: {
    modalTitle() {
      return this.userPhoneInfo ? `隆众呼叫中心（我的分机号：${this.userPhoneInfo.telephoneShortNumber}）` : '隆众呼叫中心';
    },
    isGl() {
      return this.userPhoneInfo.glAdminId !== null;
    }
  },

  created(){
    this.getWorkbenchUserManager();
    this.getWorkbenchDeptItems();
    this.getWorkbenchPhoneItems();
    this.getWorkbenchPerformanceTargetVO(2);
    this.getWorkbenchFinancialItemVO();

  }
};
</script>
