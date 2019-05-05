<style lang="less" >
@import "../workBench.less";
</style>
<template>
  <div>
    <div class="top-header">
      <top-header></top-header>
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
                      <Col span="12">
                          <div class='bg-right'>
                          <div class="proinfor">
                            <div class='thisdata'><span v-for='(item,index) in timesolt' :key='index' :class="index==thisdatanum? 'thisdataactive' : ''"   @click="thisdatachange(index)" >{{item.name}}</span></div>
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
                    <Col  >
                        <Card class="middle-content">
                            <p class='pmtj fs18'style='margin-bottom:10px;'>部门事项</p>
                            <Row class="bbline">
                                <Col span='8'>
                                  <Row>
                                    <Col span='12'>
                                      <i-circle :size="120"
                                        :trail-width="8"
                                        :stroke-width="8"
                                        :percent="75"
                                        stroke-linecap="square"
                                        trail-color='#f09d21'
                                        stroke-color="#427fe9">
                                        <span class="demo-Circle-inner" style="font-size:20px">用户注册</span>
                                      </i-circle>
                                    </Col>
                                    <Col span='12' class="circleexplain">
                                      <div class="">
                                        <Icon type="md-square" color='#4180e7'></Icon>
                                        <span>内部（位）：<span class="blueword">{{departmentItemsVO.inReg}}</span></span>
                                      </div>
                                      <div class="">
                                        <Icon type="md-square" color='#f19d21'></Icon>
                                        <span>外部（位）：<span class="blueword">{{departmentItemsVO.outReg}}</span></span>
                                      </div>
                                      <!-- <div class="xiajia">
                                        <Icon type="stop" color='#f19d21'></Icon>
                                        <span>试用到期：<span class="blueword">300</span>个</span>
                                      </div> -->
                                    </Col>
                                  </Row>
                                </Col>
                                <Col span='8'>
                                  <Row>
                                    <Col span='12'>
                                      <i-circle :size="120"
                                        :trail-width="8"
                                        :stroke-width="8"
                                        :percent="75"
                                        stroke-linecap="square"
                                        trail-color='#f09d21'
                                        stroke-color="#427fe9">
                                        <span class="demo-Circle-inner" style="font-size:20px">广告位</span>
                                      </i-circle>
                                    </Col>
                                    <Col span='12' class="circleexplain">
                                      <div class="">
                                        <Icon type="md-square" color='#4180e7'></Icon>
                                        <span>试用客户：<span class="blueword">300</span>个</span>
                                        
                                      </div>
                                      <div class="">
                                        <Icon type="md-square" color='#4180e7'></Icon>
                                        <span>试用客户：<span class="blueword">300</span>个</span>
                                        
                                      </div>
                                      <div class="xiajia">
                                        <Icon type="md-square" color='#f19d21'></Icon>
                                        <span>试用到期：<span class="blueword">300</span>个</span>
                                      </div>
                                    </Col>
                                  </Row>
                                </Col>
                                <Col span='8'>
                                  <Row>
                                    <Col span='12'>
                                      <i-circle :size="120"
                                        :trail-width="8"
                                        :stroke-width="8"
                                        :percent="75"
                                        stroke-linecap="square"
                                        trail-color='#f09d21'
                                        stroke-color="#427fe9">
                                        <span class="demo-Circle-inner" style="font-size:20px">投诉</span>
                                      </i-circle>
                                    </Col>
                                    <Col span='12' class="circleexplain">
                                      <div class="">
                                        <Icon type="md-square" color='#4180e7'></Icon>
                                        <span>待处理：<span class="blueword">{{departmentItemsVO.complainting}}</span></span>
                                        
                                      </div>
                                      <div class="">
                                        <Icon type="md-square" color='#4180e7'></Icon>
                                        <span>已处理：<span class="blueword">{{departmentItemsVO.complainted}}</span></span>
                                        
                                      </div>
                                      <div class="xiajia">
                                        <Icon type="md-square" color='#f19d21'></Icon>
                                        <span>跟踪：<span class="blueword">{{departmentItemsVO.complaintTrack}}</span></span>
                                      </div>
                                    </Col>
                                  </Row>
                                </Col>
                            </Row>
                            <Row  type="flex" justify="space-between" style="padding-top:15px;">
                              <Col span="3">
                                <div class="blue">{{departmentItemsVO.distributed}}</div>
                                <div>已分配（位）</div>
                              </Col>
                              <Col span="3">
                                <div class="blue">{{departmentItemsVO.notDistribute}}</div>
                                <div>未分配（位）</div>
                              </Col>
                              <Col span="3">
                                <div class="blue">{{departmentItemsVO.distributeTrack}}</div>
                                <div>业务员跟踪</div>
                              </Col>
                              <Col span="3">
                                <div class="blue">{{departmentItemsVO.transfer}}</div>
                                <div>用户划转</div>
                              </Col>
                              <Col span="3">
                                <div class="blue">{{departmentItemsVO.delayAudit}}</div>
                                <div>延期审核</div>
                              </Col>
                              <Col span="3">
                                <div class="blue">{{departmentItemsVO.distributed}}</div>
                                <div>电话呼出限制</div>
                              </Col>
                              <Col span="3">
                                <div class="blue">{{departmentItemsVO.distributed}}</div>
                                <div>会议信息反馈</div>
                              </Col>                               
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
                    <Card class="pox">
                      <p class='pmtj fs18'>财务事项</p>
                      <div class=''>
                          <div class="proinfor">
                            <div class='thisdata' v-if='false'><span v-for='(item,index) in timesolt' :key='index' :class="index==thisdatanum? 'thisdataactive' : ''"   @click="thisdatachange(index)" >{{item.name}}</span></div>
                            <div class='hnwrap'>
                              <i class="head-in"></i>
                              <div>
                                  <p>
                                      <span class='blue'>{{WorkbenchFinancialItemVO.memberNum}}</span>
                                  </p>
                                  <p>
                                      <span>会员数（位）</span>
                                  </p>
                              </div>
                            </div>
                            <div>
                              <div class="dotwrap">
                                <span class="dottext">认账总金额</span>
                                <span class='dot'>·············</span>
                                <span class='htnum'>{{WorkbenchFinancialItemVO.totalRegAmount}}</span>
                              </div>
                              <div class="dotwrap">
                                <span class="dottext">新入金额</span>
                                <span class='dot'>·············</span>
                                <span class='htnum'>{{WorkbenchFinancialItemVO.totalNewAmount}}</span>
                              </div>
                              <div class="dotwrap">
                                <span class="dottext">续入金额</span>
                                <span class='dot'>·············</span>
                                <span class='htnum'>{{WorkbenchFinancialItemVO.totalOldAmount}}</span>
                              </div>
                              <div class="dotwrap">
                                <span class="dottext">会议金额</span>
                                <span class='dot'>·············</span>
                                <span class='htnum'>{{WorkbenchFinancialItemVO.totalConfAmount}}</span>
                              </div>
                              <div class="dotwrap">
                                <span class="dottext">开票总金额</span>
                                <span class='dot'>·············</span>
                                <span class='htnum'>{{WorkbenchFinancialItemVO.invoiceTotalAmount}}</span>
                              </div>
                              <div class="dotwrap">
                                <span class="dottext">退票总金额</span>
                                <span class='dot'>·············</span>
                                <span class='htnum'>{{WorkbenchFinancialItemVO.invoiceRefundTotalAmount}}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                    </Card>
                    <Card dis-hover class="pox">
                        <p class='pmtj fs18'>电话事项</p>
                        <Row>
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
                            <Col span='11' offset='1'>
                                <div class='hnwrap'>
                                    <div>
                                    <p>
                                        <span class="blueword">{{phoneItemsVO.todayTalkTime}}</span>
                                    </p>
                                    <p>
                                        <span>今日通话时长</span>
                                    </p>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <div>
                              <div class="dotwrap">
                                <span class="dottext">呼出记录（次）</span>
                                <span class='dot'>·············</span>
                                <span class='htnum'>{{phoneItemsVO.callOutRecords}}</span>
                              </div>
                              <div class="dotwrap">
                                <span class="dottext">呼入记录（次）</span>
                                <span class='dot'>·············</span>
                                <span class='htnum'>{{phoneItemsVO.callInRecords}}</span>
                              </div>
                              <div class="dotwrap">
                                <span class="dottext">有效呼出（次）</span>
                                <span class='dot'>·············</span>
                                <span class='htnum'>{{phoneItemsVO.validCalls}}</span>
                              </div>
                              <div class="dotwrap">
                                <span class="dottext">未接通数（次）</span>
                                <span class='dot'>·············</span>
                                <span class='htnum'>{{phoneItemsVO.unconnected}}</span>
                              </div>
                            </div>
                        </Row>
                        </Card>
                        <Card dis-hover class="pox">
                        <div class="  mb10">
                            <p class='pmtj fs18 mb10'>人事汇总</p>
                            <Row class="dotwrap">
                              <Col span='11'  style="padding-top:25px">
                                <div class="blue">60</div>
                                <p>
                                  <span>未接来电</span>
                                </p>
                              </Col>
                              <Col span='10' offset='2'>
                                <div class="">
                                  <span>试用客户：<span class="blueword">300</span></span>
                                  
                                </div>
                                <div class="">
                                  <span>试用客户：<span class="blueword">300</span></span>
                                  
                                </div>
                                <div class="xiajia">
                                  <span>试用到期：<span class="blueword">300</span></span>
                                </div>
                              </Col>
                            </Row>
                            <div class="dotwrap">
                              <span class="dottext">用户分配</span>
                              <span class='dot'>·············</span>
                              <span class='htnum'>2100</span>
                            </div>
                            <div class="dotwrap">
                              <span class="dottext">用户划转</span>
                              <span class='dot'>·············</span>
                              <span class='htnum'>21000</span>
                            </div>
                            <div class="dotwrap">
                              <span class="dottext">电话呼出限制</span>
                              <span class='dot'>·············</span>
                              <span class='htnum'>2100</span>
                            </div>
                            <div class="dotwrap">
                              <span class="dottext">公司汇款资料</span>
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
  </div>
</template>

<script>
import topHeader from "../../../header/header.vue";
import leftMsg from "../../leftUserMsg/leftUserMsg.vue";
import navMenu from "../navMenu.vue";
import aimEchart from "./aimEchart.vue";
import customAccount from "./customAccount.vue";
import accountStatistics from "./accountStatistics.vue";
import {
  workbenchUserManager,
  workbenchDeptItems,
  workbenchPhoneItems,
  workbenchFinancialItem,
  workbenchPerformanceTarget
} from "../../../components/axios/crm.js";
export default {
  components: {
    topHeader,
    leftMsg,
    navMenu,
    aimEchart,
    customAccount,
    accountStatistics
  },
  data() {
    return {
      WorkbenchPerformanceTargetVO: {}, //业绩目标
      WorkbenchFinancialItemVO: {}, //财务事项
      userManagerVO: {}, // 客户维护
      phoneItemsVO: {}, // 电话事项
      departmentItemsVO: {}, // 部门事项
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
      timesolt: [
        { name: "日" },
        { name: "周" },
        { name: "月" },
        { name: "年" }
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

      tableTitle1: "用户量TOP10"
    };
  },
  methods: {
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
    handleChange(item) {
      this.$router.push({
        name: item.name
      });
    },
    // 部门事项
    getWorkbenchDeptItems() {
      let that = this;
      this.$Spin.show();
      let params = {
        pageType: 0
      };
      workbenchDeptItems(params).then(resp => {
        that.$Spin.hide();
        if (resp.status == 200) {
          this.departmentItemsVO = resp.response;
        }
      });
    },
    // 通话事项
    getWorkbenchPhoneItems() {
      let that = this;
      this.$Spin.show();
      let params = {
        pageType: 0
      };
      workbenchPhoneItems(params).then(resp => {
        that.$Spin.hide();
        // this.departmentItemsVO =
        if (resp.status == 200) {
          this.phoneItemsVO = resp.response;
        }
      });
    },
    // 客户维护
    getWorkbenchUserManager() {
      let that = this;
      this.$Spin.show();
      let params = {
        pageType: 0
      };
      workbenchUserManager(params).then(resp => {
        that.$Spin.hide();
        // this.departmentItemsVO =
        if (resp.status == 200) {
          that.userManagerVO = resp.response;
        }
      });
    },
    //财务事项
    getWorkbenchFinancialItemVO() {
      let that = this;
      this.$Spin.show();
      let params = {
        timeType: 1,
        pageType: 0
      };
      workbenchFinancialItem(params).then(resp => {
        that.$Spin.hide();
        // this.departmentItemsVO =
        if (resp.status == 200) {
          that.WorkbenchFinancialItemVO = resp.response;
        }
      });
    },
    //业绩目标
    getWorkbenchPerformanceTargetVO(value) {
      let that = this;
      this.$Spin.show();
      let params = {
        timeType: value
      };
      workbenchPerformanceTarget(params).then(resp => {
        that.$Spin.hide();
        // this.departmentItemsVO =
        if (resp.status == 200) {
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
    }
  },
  created() {
    this.getWorkbenchUserManager();
    this.getWorkbenchDeptItems();
    this.getWorkbenchPhoneItems();
    this.getWorkbenchFinancialItemVO();
    this.getWorkbenchPerformanceTargetVO(2);
  }

  // updated() {
  //   this.$nextTick(() => {
  //     if (this.$refs.sideMenu) {
  //       this.$refs.sideMenu.updateOpened();
  //     }
  //   });
  // }
};
</script>