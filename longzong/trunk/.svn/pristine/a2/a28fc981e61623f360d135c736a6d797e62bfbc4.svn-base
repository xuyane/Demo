<style lang="less" >

.navcontainer {
  padding: 0px 20px 0 0px;
  background: #fff;
  .tab {
    display: inline-block;
    min-width: 112px;
    height: 35px;
    line-height: 35px;
    color: #fff;
    font-size: 14px;
    background: #4280e8;
    text-align: center;
    margin-left: 20px;
    margin-bottom: 10px;
    cursor: pointer;
  }
  .tab-active {
    background: #f09d21;
  }
}
</style>
<template >
    <Row class='varietybox'>
        <i-col span="24">
            <Row class-name="current-position">
                当前位置：客户关系管理&nbsp;&nbsp;>>&nbsp;&nbsp;审批事项&nbsp;&nbsp;>>&nbsp;&nbsp;自动分配业务员
            </Row>
        </i-col>
        <Col span='24'>

            <Row :gutter="20">
                <Col span='24' >
                  <Card style="margin-bottom:20px" class-name="search-form">
                    
                    <Row>
                      <Col span='10'>
                        <div class="navcontainer">
                          <span class="tab" 
                            v-for="(item,index) in items" 
                            :key="index"
                            :class="index==number? 'tab-active' : ''"
                            @click="navchange(index)">
                            {{item.name}}
                          </span>
                        </div>
                      </Col>
                    </Row>
                    <div  >
                        <Form ref="formCustom" :model="formCustom"  :label-width="80">
                            <Row type="flex" justify="space-between">
                                <Col span='7'>
                                    <FormItem label="规则名称:" :label-width="100">
                                        <Input type="text" v-model="formCustom.ruleName" class="search-input"></Input>
                                    </FormItem>
                                </Col>
                                <Col span='7'>
                                    <FormItem label="申请时间:"  :label-width="100">
                                        <DatePicker :value="value2" format="yyyy/MM/dd" type="daterange" @on-change='gettime' placement="bottom-end" style="width: 200px"></DatePicker>
                                    </FormItem>
                                </Col>
                                <Col span='7' >
                                    <FormItem style="text-align:right" >
                                        <Button type="primary" @click="handleSubmit('formCustom')">查询</Button>
                                        <Button @click="handleReset" style="margin-left: 8px">重置</Button>
                                    </FormItem>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                  </Card>
                  <Card class="tablewrap">
                    <Row >
                      <Table class="tableCommon" border :columns="columns" :data="agreementmsg" ></Table>
                        <oil-page :total="total" :page-size="findlistmsg.pageSize" :page-num="findlistmsg.pageNum" @page-change="pageChange" :page-size-opts="pageSizeOpts" :show-sizer="showSizer" class="pagebox"></oil-page>

                    </Row>
                  </Card>
                </Col>
                
            </Row>
            
        </Col>
        <Modal title="驳回原因" v-model="showRejectModal" @on-cancel='showRejectModalcancel'>
          <Input v-model="rejectvalue" type="textarea" :autosize="{minRows: 2,maxRows: 5}" />
          <div slot="footer">
            <Button type="text" size="large" @click="showRejectModalcancel">取消</Button>
            <Button type="primary" size="large" @click="showRejectModalconfirm">确定</Button>
          </div>
        </Modal>
        <Spin size="large" fix v-if="spinShow"></Spin>
    </Row>
</template>
<script>
import oilPage from "../../components/page/page.vue";
import timeStampChange from "../../../assets/js/timestamp_change.js";
import { formData } from "../../../assets/js/common.js";
import axios from "axios";
import {
  queryAuditRules,//获取已审核/未审核规则列表
  managerDelayApplygList,
  passApply, //通过
  rejectApply, //驳回
  auditRuleById,//审核
} from "../../components/axios/crm.js";
import associateSearch from "../../components/associateSearch/getAssociateSearch.vue";
export default {
  name: "myAgreement",
  components: {
    oilPage,
    associateSearch
  },
  data() {
    return {
      spinShow:false,
      showRejectModal: false,
      rejectvalue: "",
      rejecttr: {},
      value2: [],
      items: [{ name: "待审核", id: 0 }, { name: "已审核", id: 1 }],
      number: 0,
      hadselectbm: [],
      modaltree: false,
      datatree: [],
      loading1: false,
      companyData: "",
      value1: "",
      selectitem: [],
      pageSizeOpts: [10, 20, 50, 100, 200],
      pageSize: 10,
      pageNum: 1,
      showSizer: true,
      total: 0,
      issure: {},
      modal1: false,
      formCustom: {},
      ruleCustom: {},
      findlistmsg: {
        pageSize : 10,
 pageNum : 1
      },
      columns: [
        {
          title: "规则名称",
          key: "ruleName",
          minWidth: 100,
          className: "colorbluer",
        },
        {
          title: "生效时间",
          width: 114,
          className: "colorbluer",
          key: "effectTime"
        },
        {
          title: "是否重复",
          minWidth: 160,
          key: "repeatType",
          
        },
        {
          title: "创建时间",
          minWidth: 100,
          key: "createTime"
        },
        {
          title: "设置人",
          minWidth: 100,
          key: "creatorName"
        },
        {
          title: "状态",
          minWidth: 160,
          key: "status",
        },
        {
          title: "操作",
          key: "action",
          minWidth: 150,
          className: "colorbluer",
          align: "center",
          render: (h, data) => {
            if (this.number == 0) {
              return h("div", [
                h(
                  "a",
                  {
                    props: {
                      type: "text",
                      size: "small",
                      
                    },
                    style: {
                      marginRight: "8px"
                    },
                    on: {
                      click: () => {
                        this.adopt(data);
                      }
                    }
                  },
                  " 通过 "
                ),
                h(
                  "a",
                  {
                    props: {
                      type: "text",
                      size: "small"
                    },
                    on: {
                      click: () => {
                        this.reject(data);
                      }
                    }
                  },
                  " 驳回 "
                )
              ]);
            } else if (this.number == 1) {
              if (data.row.status == '有效') {
                return h("div", [
                  h(
                    "span",
                    {
                      props: {
                        type: "text",
                        size: "small",
                        
                      },
                      style: {
                        marginRight: "8px",
                        color: "#222"
                      }
                    },
                    " 通过 "
                  )
                ]);
              } else  {
                return h(
                  "div",
                  {
                    style: {
                      color: "red"
                    }
                  },
                  "驳回，原因：" + data.row.auditMessage
                );
              }
            }
          }
        }
      ],
      agreementmsg: [
        // {
        //   companyname: "公司名字",
        //   userName: "用户名",
        //   contractCode: "合同编号",
        //   contractStatus: "合同状态",
        //   totalAmount: "洽谈金额",
        //   produce: "选购产品",
        //   createTime: "创建日期",
        //   accountTime: "到账日期",
        //   checkTime: "认账日期",
        //   adminName: "业务员",
        //   mobile: "业务员电话"
        // }
      ]
    };
  },
  methods: {
    // nav切换
    navchange(index) {
      this.number = index;
      this.findlistmsg = {};
      this.findlistmsg.pageNum = 1;
      this.findlistmsg.pageSize = 10;
      this.getlist(this.findlistmsg);
    },
    // 通过
    adopt(data) {
      this.$Modal.confirm({
        title: "提示",
        content: "<p>您确定通过" + data.row.ruleName + "的服务延期申请吗？</p>",
        onOk: () => {
          var msg = {
            ruleId: data.row.id,
            auditStatus:1,
          };
          let that = this;
          auditRuleById(msg).then(resp => {
            that.$Message.info(resp.message);
            that.agreementmsg.splice(data.index, 1);
          });
        },
        onCancel: () => {}
      });
    },
    // 查询
    handleSubmit(name) {
      this.findlistmsg = JSON.parse(JSON.stringify(this.formCustom));
      this.findlistmsg.pageSize=10;
      this.findlistmsg.pageNum=1;
      this.getlist(this.findlistmsg);
    },
    //重置
    handleReset() {
      this.$refs.formCustom.resetFields();
      this.formCustom = {};
      this.value2=[];
      // this.$refs.breedDataRef.model = "";
      // this.$refs.breedDataRef1.model = "";
    },
    //驳回
    reject(data) {
      this.showRejectModal = true;
      this.rejecttr = JSON.parse(JSON.stringify(data));
    },
    // 驳回弹窗确定
    showRejectModalconfirm() {
      if (this.rejectvalue) {
        var msg = {
          ruleId: this.rejecttr.row.id,
          auditMessage: this.rejectvalue,
          auditStatus:2,
        };
        let that = this;
        auditRuleById(msg).then(resp => {
          that.$Message.info(resp.message);
          that.showRejectModal = false;
          that.rejectvalue = "";
          that.agreementmsg.splice(that.rejecttr.index, 1);
        });
      } else {
        this.$Message.warning("请先输入驳回原因");
      }
    },
    //驳回弹窗取消
    showRejectModalcancel() {
      this.showRejectModal = false;
      this.rejectvalue = "";
    },
    // 申请时间
    gettime(data){
      this.formCustom.startTime=new Date(data[0]).getTime();
      this.formCustom.endTime=new Date(data[1]).getTime();
    },
    //分页
    pageChange(page, pageSize) {
      if (page) {
        this.pageNum = page;
        this.findlistmsg.pageNum = page;
      }
      if (pageSize) {
        this.pageSize = pageSize;
        this.findlistmsg.pageSize = pageSize;
      }
      this.getlist(this.findlistmsg);
    },

    //列表
    getlist(data) {
      let that = this;
      this.spinShow=true;
      // if(data.adminDeptValue){
      //   delete data.adminDeptValue
      // }
      data.type = this.number;
      queryAuditRules(data).then(resp => {
        that.spinShow=false;
        if (resp.status == 200) {
          let data = resp.response.list;
          for (var i = 0; i < data.length; i++) {
           
            data[i].createTime = resp.response.list[i].createTime?timeStampChange.format(
              resp.response.list[i].createTime):resp.response.list[i].createTime;
            data[i].delayServiceEndTime = timeStampChange.format(
              resp.response.list[i].delayServiceEndTime
            );
          }
          that.agreementmsg = data;
          that.total = resp.response.total;
        }
      });
    },



    // 获取type类型
    gettypevalue(a) {
      switch (a) {
        case 0:
          a = "试用";
          break;
        case 1:
          a = "正式";
          break;
        case 2:
          a = "免费";
          break;
      }
      return a;
    }
  },
  created() {
   
    this.getlist(this.findlistmsg);
  }
};
</script>
