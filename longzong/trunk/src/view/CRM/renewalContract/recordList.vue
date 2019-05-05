<style lang="less" >
// @import "./myagreement.less";
.producedx .ivu-select-selection {
  height: auto !important;
}
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
                当前位置：客户关系管理&nbsp;&nbsp;>>&nbsp;&nbsp;待续入合同分配记录
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
                                    <FormItem label="部门:" :label-width="100">
                                        <Input type="text" v-model="formCustom.continuationDepartmentName" class="search-input" @on-focus='showtreeModal' readonly></Input>
                                        
                                    </FormItem>
                                </Col>
                                
                                <Col span='7'>
                                    <FormItem label="续入业务员:"  :label-width="100" >
                                        <associate-Search2 @query-list="getxrkf"  :dataUrl="xrurl1" :parameterName='name1' ref='xrkfref'></associate-Search2>
                                    </FormItem>
                                </Col>
                                <Col span='7'>
                                    <FormItem label="原业务员:"  :label-width="100" >
                                        <associate-Search @query-list="getkf"  :dataUrl="url1" :parameterName='name1' ref='kfref'></associate-Search>
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
        <Tree :data="datatree"  @on-select-change="selected" @on-check-change='selectbm'></Tree>
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
  formatTime,
  formatTime2
} from "../../../assets/js/common.js";
import axios from "axios";
import {
  contractallocationrecordList,
  getStatus,
  getContractAuditStatus,
  getContractStatus,
  queryProductSelectList,
  orgTree
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
      number: 1,
      items: [{ name: "合同分配", id: 0 }, { name: "分配记录", id: 1 }],
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
          title: "分配时间",
          minWidth: 100,
          key: "allocationTime",
          render: (h, data) => {
            if (data.row.allocationTime) {
              return h("span", {}, formatTime2(data.row.allocationTime));
            } else {
              return h("span", {}, "");
            }
          }
        },
        {
          title: "数量",
          minWidth: 300,
          key: "adminName",
          render: (h, data) => {
            return h(
              "span",
              "本次共分配：共" +
                data.row.salesmanCount +
                "个业务员参与，" +
                data.row.contractCount +
                "个合同，" +
                data.row.userCount +
                "个用户，全部分配成功"
            );
          }
        },
        {
          title: "分配人",
          minWidth: 80,
          key: "allocationName"
        },
        {
          title: "操作",
          key: "action",
          minWidth: 80,
          className: "colorbluer",
          align: "center",
          render: (h, data) => {
            return h("div", [
              h(
                "a",
                {
                  on: {
                    click: () => {
                      this.check(data);
                    }
                  }
                },
                " 查看 "
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
      this.formCustom.continuationDepartmentName = data[0].title;
      this.formCustom.continuationDepartmentId = data[0].id;
      this.modaltree = false;
      data[0].selected = !data[0].selected;
    },
    getxrkf(data) {
      if (data) {
        this.formCustom.continuationSalesmanId = data.value;
      } else {
        this.formCustom.continuationSalesmanId = "";
      }
    },
    navchange(index) {
      if (index == 0) {
        this.$router.push({
          name: "renewalContract"
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
    // 查询
    addmsg() {
      this.showAddModal = true;
    },
    // 查看
    check(data) {
      this.$router.push({
        name: "automaticAllocation",
        query: {
          allocationTime: data.row.allocationTime,
          contractCount: data.row.contractCount,
          userCount: data.row.userCount
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
      if (this.findlistmsg.memberName) {
        delete this.findlistmsg.memberName;
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
      //this.$Spin.show();
      // if(data.adminDeptValue){
      //   delete data.adminDeptValue
      // }
      this.spinShow=true;
      contractallocationrecordList(data).then(resp => {
        that.spinShow=false;
        if (resp.status == 200 && resp.response.list != null) {
          let data = resp.response.list;
          // for (var i = 0; i < data.length; i++) {
          //   data[i].createTime = timeStampChange.format(
          //     resp.response.list[i].createTime
          //   );
          //   data[i].accountTime = timeStampChange.format(
          //     resp.response.list[i].accountTime
          //   );
          //   data[i].checkTime = timeStampChange.format(
          //     resp.response.list[i].checkTime
          //   );
          // }
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
        this.formCustom.adminId = data.value;
      } else {
        this.formCustom.adminId = "";
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
