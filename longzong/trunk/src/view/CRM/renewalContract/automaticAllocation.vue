<style lang="less" >
// @import "./myagreement.less";
.producedx .ivu-select-selection {
  height: auto !important;
}
</style>

<template >
    <Row class='varietybox'>
        <i-col span="24">
            <Row class-name="current-position">
                当前位置：客户关系管理&nbsp;&nbsp;>>&nbsp;&nbsp;待续入合同自动分配详情
            </Row>
        </i-col>
        <Col span='24'>
            <Row :gutter="20">
                <Col span='24' >
                  <Card style="margin-bottom:20px" class-name="search-form">
                    <div  >
                        <Form ref="formCustom" :model="formCustom"  :label-width="80">
                            <Row type="flex" justify="space-between">
                                <Col span='7'>
                                    <FormItem label="部门:" :label-width="100">
                                        <Input type="text" v-model="formCustom.continuationDepartmentName" class="search-input" @on-focus='showtreeModal' readonly></Input>
                                        
                                    </FormItem>
                                </Col>
                                <Col span='7'>
                                    <FormItem label="原业务员:"  :label-width="100" >
                                        <associate-Search @query-list="getkf"  :dataUrl="url1" :parameterName='name1' ref='kfref'></associate-Search>
                                    </FormItem>
                                </Col>
                                <Col span='7'>
                                    <FormItem label="续入业务员:"  :label-width="100" >
                                        <associate-Search2 @query-list="getxrkf"  :dataUrl="xrurl1" :parameterName='name1' ref='xrkfref'></associate-Search2>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row type="flex" justify="space-between">
                                <Col span='7'>
                                    <FormItem label="公司名称:"  :label-width="100">
                                        <!-- <Input type="text" v-model="formCustom.memberName" class="search-input"></Input> -->
                                        <associate-Search ref='breedDataRef' @query-list="companyTypeFunction" :dataUrl="url" :parameterName='name' ></associate-Search>

                                    </FormItem>
                                </Col>
                                <Col span='7'>
                                    <FormItem label="合同编号:" :label-width="100">
                                        <Input type="text" v-model="formCustom.contractCode" class="search-input"></Input>
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
                    <Row style="margin-bottom:10px"><span>{{allocationTime}} 待续入合同自动分配结果     分配用户合同总数： {{contractCount}}  &nbsp;&nbsp;     已分配数：{{userCount}}</span> </Row>
                    <Row >
                      <Table class="tableCommon" border :columns="columns" :data="agreementmsg" ></Table>
                        <oil-page :total="total" :page-size="findlistmsg.pageSize" :page-num="findlistmsg.pageNum" @page-change="pageChange" :page-size-opts="pageSizeOpts" :show-sizer="showSizer" class="pagebox"></oil-page>

                    </Row>
                    <Row type="flex" justify="center"><Col  ><Button type="primary" @click="goback()">返回</Button></Col></Row>
                  </Card>
                </Col>
                
            </Row>
            
        </Col>
        <Modal
        v-model="modaltree"
        title="请选择部门"
        @on-ok="bmok"
        @on-cancel="bmcancel">
        <Tree :data="datatree" @on-select-change="selected"  @on-check-change='selectbm'></Tree>
    </Modal>
        <Modal
        v-model="modaltable"
        width='800'
        title="详情"
        @on-ok="tablecancel"
        @on-cancel="tablecancel">
        <Table height="400" border :columns="columntable" :data="detialdata" ></Table>
    </Modal>
    <Spin size="large" fix v-if="spinShow"></Spin>  
    </Row>
</template>
<script>
import oilPage from "../../components/page/page.vue";
import timeStampChange from "../../../assets/js/timestamp_change.js";
import {
  formData,
  formatStamp,
  formatTime2,
  formatTime
} from "../../../assets/js/common.js";
import axios from "axios";
import {
  recordDetailsList,
  getStatus,
  getContractAuditStatus,
  getContractStatus,
  queryProductSelectList,
  orgTree,
  distributionInfo
} from "../../components/axios/crm.js";
import associateSearch from "../../components/associateSearch/getAssociateSearch.vue";
import associateSearch2 from "../../components/associateSearch/getAssociateSearch2.vue";
import dial from "@/assets/js/linkDial.js";
export default {
  name: "myAgreement",
  components: {
    oilPage,
    associateSearch,
    associateSearch2
  },
  data() {
    return {
      spinShow:false,
      modaltable:false,
      detialdata: [],
      columntable: [
        {
          title: "部门",
          key: "formerDepartmentName",
          minWidth: 100
        },
        {
          title: "原业务员",
          minWidth: 100,
          key: "formerSalesmanName"
        },
        {
          title: "续入金额",
          key: "contractAmount",
          minWidth: 100
        },
        {
          title: "合同编号",
          key: "contractCode",
          minWidth: 100
        }
      ],
      allocationTime:0,
      userCount: this.$route.query.userCount,
      contractCount: this.$route.query.contractCount,
      url1: "/crm/common/query-adminList-by-name",
      name1: "adminName",
      xrurl1: "/crm/continued/query-continued-salemen-list",
      hadselectbm: [],
      modaltree: false,
      datatree: [],
      loading1: false,
      companyData: "",
      name: "memberName",
      value1: "",
      url: "/crm/common/query-member-select-list", //根据会员名称模糊匹配下拉选择列表
      usernameurl: "/crm/common/query-user-select-list",
      nameuser: "userName",
      selectitem: [],
      contractAuditStatus: [],
      contractStatus: [],
      produceList: [], //选购产品列表
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
        pageSize: 10,
        pageNum: 1
      },
      columns: [
        {
          title: "部门",
          key: "continuationDepartmentName",
          minWidth: 150
        },
        {
          title: "续入业务员",
          minWidth: 400,
          key: "continuationSalesmanName",
          render: (h, data) => {
            return h(
              "span",{
                on: {
                  click: () => {
                    let msg={
                      allocationTime:this.$route.query.allocationTime,
                      continuationSalesmanId:data.row.continuationSalesmanId,
                      continuationDepartmentId:data.row.continuationDepartmentId,   
                      pageNum:1,
                      pageSize:1000

                    }
                    let that=this;
                    distributionInfo(msg).then(resp=>{
                      that.modaltable = true;
                      that.detialdata=resp.response.list
                    })
                    
                  }
                }
              },
              data.row.continuationSalesmanName+"（用户数：" +
                data.row.userCount +
                "，本次分配续入总金额：" +
                data.row.contractAmountSum +
                "）"
            );
          }
        }
      ],
      agreementmsg: []
    };
  },
  methods: {
    tablecancel() {
      this.modaltable = false;
    },
    //点击部门
    selected(data) {
      this.formCustom.continuationDepartmentName = data[0].title;
      this.formCustom.continuationDepartmentId = data[0].id;
      this.modaltree=false;
      data[0].selected = !data[0].selected;
    },
    getxrkf(data) {
      if (data) {
        this.formCustom.continuationSalesmanId = data.value;
      } else {
        this.formCustom.continuationSalesmanId = "";
      }
    },
    goback() {
      this.$router.go(-1);
    },
    // 呼出
    onDial(phone) {
      dial(phone, res => {
        this.$Notice.success({ title: "呼叫成功：" + phone });
      });
    },
    //   创建合同
    creatagreement() {
      this.$router.push({
        name: "creatAgreement"
      });
    },
    // 查询
    addmsg() {
      this.showAddModal = true;
    },
    // 查看合同
    check(data) {
      this.$router.push({
        name: "checkContact",
        query: {
          contractCode: data.row.contractCode,
          bussinessId: data.row.id
          // taskId:data.row.taskId
        }
      });
    },
    // 查询
    handleSubmit(name) {
      // debugger
      this.formCustom.pageNum = 1;
      this.formCustom.pageSize = 10;
      
      this.findlistmsg = JSON.parse(JSON.stringify(this.formCustom));
      if (this.findlistmsg.adminDeptValue) {
        delete this.findlistmsg.adminDeptValue;
      }
      this.getlist(this.findlistmsg);
    },
    //重置
    handleReset() {
      this.formCustom = {};
      this.formCustom.pageNum = 1;
      this.formCustom.pageSize = 10;
      this.$refs.breedDataRef.model = "";
      this.$refs.breedDataRef.getData("");
      this.$refs.kfref.model = "";
      this.$refs.kfref.getData("");
      this.$refs.xrkfref.model = "";
      this.$refs.xrkfref.getData("");
    },
    //退款
    refund(data) {
      this.$router.push({
        name: "refundsContract",
        query: {
          contractCode: data.row.contractCode,
          bussinessId: data.row.id
        }
      });
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

    //合同列表
    getlist(data) {
      let that = this;
      data.allocationTime = this.$route.query.allocationTime;
      this.spinShow=true;
      recordDetailsList(data).then(resp => {
        that.spinShow=false;
        if (resp.status == 200 && resp.response.list != null) {
          let data = resp.response.list;
          that.agreementmsg = data;
          that.total = resp.response.total;
        } else {
          that.agreementmsg = [];
          that.total = 0;
        }

        // that.$Spin.hide();
      });
    },
    // 合同状态
    getstatus() {
      let that = this;
      getStatus().then(resp => {
        if (resp.status == 200) {
          that.selectitem = resp.response;
        }
      });
    },
    // 合同状态
    getContractAuditStatusVue() {
      let that = this;
      getContractAuditStatus().then(resp => {
        if (resp.status == 200) {
          that.contractAuditStatus = resp.response;
        }
      });
    },
    // 合同状态
    getContractStatusVue() {
      let that = this;
      getContractStatus().then(resp => {
        if (resp.status == 200) {
          that.contractStatus = resp.response;
        }
      });
    },
    // 通过id获取name
    getNameContractAuditStatus(value) {
      let temt = "无";
      for (let i = 0; i < this.contractAuditStatus.length; i++) {
        if (this.contractAuditStatus[i].value === value) {
          temt = this.contractAuditStatus[i].desc;
          break;
        }
      }
      return temt;
    },
    // 通过id获取name
    getNameContractStatus(value) {
      let temt = "无";
      for (let i = 0; i < this.contractStatus.length; i++) {
        if (this.contractStatus[i].value === value) {
          temt = this.contractStatus[i].desc;
          break;
        }
      }
      return temt;
    },
    //根据公司名称模糊匹配下拉选择列表
    companyTypeFunction(companyData) {
      // this.companyData = companyData;
      if (companyData) {
        this.formCustom.memberId = companyData.value;
        this.formCustom.memberName = companyData.label;
      }else{
        this.formCustom.memberId = '';
        this.formCustom.memberName = '';
      }
    },
    usernameFunction(data) {
      if (data) {
        this.formCustom.userId = data.value;
        this.formCustom.userName = data.label;
      }else{
        this.formCustom.userId = '';
        this.formCustom.userName = '';
      }
    },
    // 选购产品
    remoteMethod1(query) {
      if (query !== "") {
        this.loading1 = true;
        setTimeout(() => {
          let data = {
            productName: query
          };
          var that = this;
          queryProductSelectList(data).then(resp => {
            that.loading1 = false;
            // const list = resp.response.list.map(item => {
            //   return {
            //     value: item.id,
            //     label: item.productNameCn
            //   };
            // });

            that.produceList = resp.response;
          });
        }, 200);
      } else {
        this.produceList = [];
      }
    },
    changename(data) {
      // const idlist=data.map(item=>{
      //   return data.value
      // })
      // const namelist=data.map(item=>{
      //   return data.label
      // })
      // this.formCustom.productId=idlist.join(',')
      // this.formCustom.productName=namelist.join(',')
    },
    showtreeModal() {
      this.modaltree = true;
    },
    // 部门ok
    bmok() {
      if (this.hadselectbm.length != 0) {
        var namelist = this.hadselectbm.map(item => {
          return item.title;
        });
        this.formCustom.adminDeptId = this.hadselectbm.map(item => {
          return item.id;
        });
        this.formCustom.creatorDeptId = this.hadselectbm.map(item => {
          return item.id;
        });
        this.formCustom.adminDeptValue = namelist.join("/");
      } else {
        this.formCustom.creatorDeptId = [];
        this.formCustom.adminDeptId = [];
        this.formCustom.adminDeptValue = "";
      }
    },
    transferStatus(status) {
      let msg;
      switch (status) {
        case 0:
          msg = "过期";
          break;
        case 1:
          msg = "启用";
          break;
        case 2:
          msg = "停用";
          break;
      }
      return msg;
    },
    transferTypes(type) {
      let msg;
      switch (type) {
        case 0:
          msg = "试用";
          break;
        case 1:
          msg = "正式";
          break;
        case 2:
          msg = "免费";
          break;
      }
      return msg;
    },
    // 部门取消
    bmcancel() {},
    tree() {
      let that = this;
      orgTree().then(resp => {
        // this.datatree=resp.response;
        var a = JSON.parse(resp.response);
        that.datatree = this.breedDigui(a);
      });
    },
    // 部门复选框
    selectbm(data) {
      this.hadselectbm = data;
    },
    getkf(data) {
      this.kflist = data;
      if (data) {
        this.formCustom.formerSalesmanId = data.value;
      } else {
        this.formCustom.formerSalesmanId = "";
      }
    },
    breedDigui(data) {
      let dgData = data.map(item => {
        if (item.children && item.children.length > 0) {
          return {
            title: item.label,
            disableCheckbox: false,
            id: item.id,
            children: this.breedDigui(item.children)
          };
        } else {
          return {
            title: item.label,
            id: item.id,
            disableCheckbox: false
          };
        }
      });
      return dgData;
    }
  },
  created() {
    // this.$Spin.show();
    this.allocationTime= formatTime2(this.$route.query.allocationTime)
    this.getstatus();
    this.getContractAuditStatusVue();
    this.getContractStatusVue();

    this.tree();
  },
  mounted() {
    this.getlist(this.findlistmsg);
  }
};
</script>
