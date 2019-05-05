<style lang="less" >
// @import "./myagreement.less";
.producedx .ivu-select-selection {
  height: auto !important;
}
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
                当前位置：客户关系管理&nbsp;&nbsp;>>&nbsp;&nbsp;审批事项&nbsp;&nbsp;>>&nbsp;&nbsp;续入自留
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
                                    <FormItem label="公司名称:"  :label-width="100">
                                        <!-- <Input type="text" v-model="formCustom.memberName" class="search-input"></Input> -->
                                        <associate-Search ref='breedDataRef' @query-list="companyTypeFunction" :dataUrl="url" :parameterName='name' ></associate-Search>

                                    </FormItem>
                                </Col>
                                <Col span='7'>
                                    <FormItem label="用户名:" :label-width="100">
                                        <associate-Search ref='usernamebreedDataRef' @query-list="usernameFunction" :dataUrl="usernameurl" :parameterName='nameuser' ></associate-Search>
                                    </FormItem>
                                </Col>
                               <Col span='7' class="producedx" >
                                    <FormItem label="选购产品:"  :label-width="100" class="produce">
                                        <Select v-model="formCustom.productId"  ref='breedDataRef1' filterable multiple remote :remote-method="remoteMethod1" :loading="loading1" @on-change="changename">
                                          <Option v-for="(item,index) in produceList" :value="item.id" :key="item.index">{{ item.name }}</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row type="flex" justify="space-between">
                                <Col span='7'>
                                    <FormItem label="合同编号:" :label-width="100">
                                        <Input type="text" v-model="formCustom.contractCode" class="search-input"></Input>
                                    </FormItem>
                                </Col>
                                <Col span='7'>
                                    <FormItem label="合同金额:" :label-width="100">
                                        <Input type="text" v-model="formCustom.contractTotal" class="search-input">
                                          <Select v-model="formCustom.rangeType" slot="prepend" style="width: 60px">
                                              <Option value="1"> 大于 </Option>
                                              <Option value="2"> 小于 </Option>
                                              <Option value="3"> 等于 </Option>
                                          </Select>
                                        </Input>
                                    </FormItem>
                                </Col>
                               <Col span='7' >
                                    <FormItem label="合同状态:"  :label-width="100">
                                        <Select v-model="formCustom.contractStatus" class="search-input">
                                            <Option v-for='(item,index) in contractStatus' :key='index' :value="item.value">{{item.desc}}</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row type="flex" justify="space-between">
                                <Col span='7'>
                                    <FormItem label="部门:" :label-width="100">
                                        <Input type="text" v-model="formCustom.adminDeptValue" class="search-input" @on-focus='showtreeModal' readonly></Input>
                                        
                                    </FormItem>
                                </Col>
                                <Col span='7'>
                                    <FormItem label="业务员:"  :label-width="100" >
                                        <associate-Search @query-list="getkf"  :dataUrl="url1" :parameterName='name1' ref='kfref'></associate-Search>
                                    </FormItem>
                                </Col>
                               <!-- <Col span='7' >
                                    <FormItem label="合同审核状态:"  :label-width="100">
                                        <Select v-model="formCustom.auditStatus" class="search-input">
                                            <Option v-for='(item,index) in contractAuditStatus' :key='index' :value="item.value">{{item.desc}}</Option>
                                        </Select>
                                    </FormItem>
                                </Col> -->
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
        <Modal
        v-model="modaltree"
        title="请选择部门"
        @on-ok="bmok"
        @on-cancel="bmcancel">
        <Tree :data="datatree" @on-select-change="selected" @on-check-change='selectbm'></Tree>
    </Modal>
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
import {
  formData,
  formatStamp,
  formatTime
} from "../../../assets/js/common.js";
import axios from "axios";
import {
  contractretentionrecordList,
  getStatus,
  getContractAuditStatus,
  getContractStatus,
  queryProductSelectList,
  orgTree,
  passContractRetentionRecord,
  overruleContractRetentionRecord
} from "../../components/axios/crm.js";
import associateSearch from "../../components/associateSearch/getAssociateSearch.vue";
import dial from "@/assets/js/linkDial.js";
export default {
  name: "retentionCheck",
  components: {
    oilPage,
    associateSearch
  },
  data() {
    return {
      spinShow:false,
      activetr: 0,
      showRejectModal: false,
      rejectvalue: "",
      number: 0,
      items: [{ name: "待审核", id: 0 }, { name: "已审核", id: 1 }],
      url1: "/crm/common/query-adminList-by-name",
      name1: "adminName",
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
      formCustom: {
        rangeType: "3"
      },
      ruleCustom: {},
      findlistmsg: {
        pageSize: 10,
        pageNum: 1
      },
      columns: [
        {
          title: "合同标题",
          key: "contractName",
          minWidth: 240,
          className: "colorbluer"
        },
        {
          title: "用户名",
          minWidth: 120,
          className: "colorbluer",
          key: "orgAdminName"
        },
        {
          title: "合同编号",
          minWidth: 160,
          key: "contractCode"
        },
        {
          title: "合同状态",
          key: "contractStatus",
          minWidth: 160,
          render: (h, data) => {
            // let statustext = "";
            // if(data.row.status == 0)
            // {
            //   statustext = this.getNameContractStatus(data.row.status);
            // }
            // else
            // {
            //   statustext = this.getNameContractStatus(data.row.status) + '('+this.getNameContractAuditStatus(data.row.auditStatus)+')';
            // }
            return h(
              "span",
              {},
              this.getNameContractStatus(data.row.contractStatus)
            );
          }
        },
        {
          title: "应续入金额",
          minWidth: 80,
          key: "total"
        },
        {
          title: "选购产品",
          minWidth: 100,
          key: "cpList",
          render: (h, data) => {
            let list = [];
            if (data.row.cpList && data.row.cpList.length > 0) {
              data.row.cpList.map(item => {
                let str = `${item.productNameCn} (${formatTime(
                  item.startTime
                )} 至 ${formatTime(item.endTime)} )`;
                list.push(str);
              });
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
                    {
                      on: {
                        click: () => {
                          this.copyText(list);
                        }
                      }
                    },
                    list && list.length > 0 ? "详情" : ""
                  ),
                  h("div", {
                    slot: "content",
                    style: {
                      maxHeight: "400px",
                      overflow: "auto"
                    },
                    domProps: {
                      innerHTML: list.join("<br />")
                    }
                  })
                ]
              )
            ]);
          }
        },
        {
          title: "创建日期",
          minWidth: 150,
          key: "effectiveTime",
          render: (h, data) => {
            if (data.row.effectiveTime) {
              return h(
                "span",
                {},
                timeStampChange.format(data.row.effectiveTime)
              );
            } else {
              return h("span", {}, data.row.effectiveTime);
            }
          }
        },
        {
          title: "终止日期",
          minWidth: 150,
          key: "endTime",
          render: (h, data) => {
            if (data.row.endTime) {
              return h("span", {}, timeStampChange.format(data.row.endTime));
            } else {
              return h("span", {}, "");
            }
          }
        },
        {
          title: "原业务员",
          minWidth: 160,
          key: "salesmanName",
          render: (h, data) => {
            return h(
              "span",
              data.row.departmentName + "-" + data.row.salesmanName
            );
          }
        },
        {
          title: "备注",
          minWidth: 80,
          key: "rejectionReason"
        },
        {
          title: "操作",
          key: "action",
          minWidth: 150,
          fixed: "right",
          className: "colorbluer",
          align: "center",
          render: (h, data) => {
            return h("div", [
              h(
                "a",
                {
                  props: {
                    type: "text",
                    size: "small",
                    
                  },
                  style: {
                    color: "#9ecd3f"
                  },
                  on: {
                    click: () => {
                      this.passone(data);
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
                  style: {
                    color: "red"
                  },
                  on: {
                    click: () => {
                      this.rejectone(data);
                    }
                  }
                },
                " 驳回 "
              )
            ]);
          }
        }
      ],
      agreementmsg: []
    };
  },
  methods: {
    //点击部门
    selected(data) {
      this.formCustom.adminDeptValue = data[0].title;
      this.formCustom.departmentId = data[0].id;
      this.modaltree = false;
      data[0].selected = !data[0].selected;
    },
    showRejectModalcancel() {
      this.showRejectModal = false;
    },
    showRejectModalconfirm() {
      let that = this;
      var params = new URLSearchParams();
      params.append("id", this.agreementmsg[this.activetr].id);
      params.append("content", this.rejectvalue);
      overruleContractRetentionRecord(params).then(resp => {
        that.$Message.info("已驳回");
        that.getlist(that.findlistmsg);
      });
    },
    passone(data) {
      let that = this;
      this.$Modal.confirm({
        title: "提示",
        content: "确定要通过该待续入合同吗？",
        onOk: () => {
          var params = new URLSearchParams();
          params.append("id", data.row.id);
          passContractRetentionRecord(params).then(resp => {
            that.$Message.info(resp.message);
            that.getlist(that.findlistmsg);
          });
        }
      });
    },
    rejectone(data) {
      this.activetr = data.index;
      this.showRejectModal = true;
    },
    navchange(index) {
      if (index == 1) {
        this.$router.push({
          name: "allocationRecord"
        });
      }
    },
    // 复制
    copyText(text) {
      let str = text.join("\n");
      this.$copyText(str).then(
        res => {
          this.$Message.success("复制成功");
        },
        err => {
          this.$Message.warning("复制失败");
        }
      );
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
      this.formCustom = {
         rangeType: "3"
      };
      this.formCustom.pageNum = 1;
      this.formCustom.pageSize = 10;
      this.$refs.breedDataRef.model = "";
      this.$refs.breedDataRef.getData("");
      this.$refs.usernamebreedDataRef.model = "";
      this.$refs.usernamebreedDataRef.getData("");
      this.$refs.kfref.model = "";
      this.$refs.kfref.getData("");
      this.$refs.breedDataRef1.model = "";
      this.$refs.breedDataRef1.query = "";
      this.$refs.kfref.model = "";
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
      this.spinShow=true;
      // if(data.adminDeptValue){
      //   delete data.adminDeptValue
      // }
      data.statusType=2;
      contractretentionrecordList(data).then(resp => {
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
        this.formCustom.salesmanId = data.value;
      } else {
        this.formCustom.salesmanId = "";
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
    // this.getstatus();
    // this.getContractAuditStatusVue();
    this.getContractStatusVue();

    this.tree();
  },
  mounted() {
    this.getlist(this.findlistmsg);
  }
};
</script>
