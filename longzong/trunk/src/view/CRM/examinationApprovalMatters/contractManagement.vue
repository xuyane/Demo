<style lang="less" >
@import "../myagreement/myagreement.less";
.producedx .ivu-select-selection {
  height: auto !important;
}
</style>

<template >
    <Row class='varietybox'>
       <i-col span="24">
            <Row class-name="current-position">
                当前位置：客户关系管理&nbsp;&nbsp;>>&nbsp;&nbsp;审批事项&nbsp;&nbsp;>>&nbsp;&nbsp;合同审核
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
                                    <FormItem label="业务员部门:" :label-width="100">
                                    <select-department @data-list="getDepData" :emptyModel='departId'></select-department>
                                  </FormItem>
                                </Col>
                                <Col span='7'>
                                    <FormItem label="业务员:"  :label-width="100" >
                                        <associate-Search @query-list="getkf"  :dataUrl="url1" :parameterName='name1' ref='kfref'></associate-Search>
                                    </FormItem>
                                </Col>
                                
                            </Row>
                            <Row type="flex" justify="space-between">
                                <Col span='7'>
                                   
                                </Col>
                                <Col span='7'>
                                   
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
        <Tree :data="datatree" show-checkbox @on-check-change='selectbm'></Tree>
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
  getmyAgreementAuditList,
  getStatus,
  getContractAuditStatus,
  getContractStatus,
  queryProductSelectList,
  getProductInfo,
  orgTree
} from "../../components/axios/crm.js";
import associateSearch from "../../components/associateSearch/getAssociateSearch.vue";
import dial from '@/assets/js/linkDial.js';
import SelectDepartment from '../../components/crm/departMent.vue';
export default {
  name: "myAgreement",
  components: {
    oilPage,
    associateSearch,
    SelectDepartment
  },
  data() {
    return {
      spinShow:false,
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
      productDetailData: [], //选购产品列表
      pageSizeOpts: [10, 20, 50, 100, 200],
      pageSize: 10,
      pageNum: 1,
      departId:'',
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
          title: "公司名称",
          key: "memberName",
          width: 240,
          className: "colorbluer",
          render: (h, data) => {
            return h(
              "a",
              {
                on: {
                  click: () => {
                    // this.checkinfor(data);
                  }
                }
              },
              data.row.memberName
            );
          }
        },
        {
          title: "用户名",
          width: 120,
          className: "colorbluer",
          key: "userName"
        },
        {
          title: "合同编号",
          width: 160,
          key: "contractCode"
        },
        {
          title: "合同状态",
          key: "contractStatus",
          width: 120,
          render: (h, data) => {
            let statustext = "";
            if (data.row.status == 0) {
              statustext = this.getNameContractStatus(data.row.status);
            } else {
              statustext =
                this.getNameContractStatus(data.row.status) +
                "(" +
                this.getNameContractAuditStatus(data.row.auditStatus) +
                ")";
            }
            return h("span", {}, statustext);
          }
        },
        {
          title: "洽谈金额",
          width: 80,
          key: "totalAmount"
        },
        {
          title: "选购产品",
          minWidth: 100,
          key: "cpList",
          render: (h, data) => {
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
                          this.copyText(this.productDetailData);
                        },
                        mouseover: () => {
                          let msg = {
                            contractCode: data.row.contractCode,
                            type: 1
                          };
                          let that = this;
                          that.productDetailData = [];
                          getProductInfo(msg).then(res => {
                            let list = [];
                            that.producelist = res.response.list;
                            if(that.producelist && that.producelist.length > 0)
                            {
                             that.producelist.map(item => {
                                let str = `${item.productNameCn} (${formatTime(
                                  item.startTime
                                )} 至 ${formatTime(item.endTime)} )`;
                                list.push(str);
                              });
                              that.productDetailData = list;
                            } else {
                              list.push("无产品");
                              that.productDetailData1 = list;
                            }
                          });
                        }
                      }
                    },
                     "详情"
                  ),
                  h("div", {
                    slot: "content",
                    style: {
                      maxHeight: "400px",
                      overflow: "auto"
                    },
                    domProps: {
                      innerHTML: this.productDetailData.join("<br />")
                    }
                  })
                ]
              )
            ]);
          }
        },
        {
          title: "创建日期",
          width: 150,
          key: "createTime",
          render: (h, data) => {
            return h(
              "span",
              {},
              data.row.createTime
                ? timeStampChange.format(data.row.createTime)
                : data.row.createTime
            );
          }
        },
        {
          title: "业务员",
          width: 180,
          key: "adminName",
          render: (h, data) => {
            return h(
              "span",
              data.row.creatorDeptName + "-" + data.row.adminName
            );
          }
        },
        {
          title: "业务员电话",
          width: 120,
          key: "mobile",
          render: (h, data) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    color: "#2d8cf0",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.onDial(data.row.mobile);
                    }
                  }
                },
                data.row.mobile
              )
            ]);
          }
        },
        {
          title: "操作",
          key: "action",
          width: 150,
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
                    on: {
                      click: () => {
                        this.check(data);
                      }
                    }
                  },
                  " 审核 "
                )
              ]);
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
       //退款
    refund(data) {
      this.$router.push({
        name: "refundsContract",
        query: {
          contractCode: data.row.contractCode
        }
      });
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
       const {href} = this.$router.resolve({
        name: "waittingCheck",
        query: {
          contractCode: data.row.contractCode,
          bussinessId: data.row.id
        }
      });
      window.open(href, '_blank');
    },
    // 查询 
    handleSubmit(name) {
      // debugger
      this.formCustom.pageNum = 1;
      this.formCustom.pageSize = 10;
      this.formCustom.creatorDeptId = this.departId;
    
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
      this.$refs.usernamebreedDataRef.model = "";
      this.$refs.usernamebreedDataRef.getData("");
      this.$refs.kfref.model = "";
      this.$refs.kfref.getData("");
      this.$refs.breedDataRef1.model = "";
      this.$refs.breedDataRef1.query = "";
      this.$refs.kfref.model = "";
       this.departId = '';
    },
     // 获取所在部门部门树
    getDepData (deptLabel,deptId,deptCode){
      this.departId = deptId ? deptId:'';
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
      getmyAgreementAuditList(formData(data)).then(resp => {
        that.spinShow=false;
        if (resp.status == 200 && resp.response.list != null) {
          let data = resp.response.list;
          that.agreementmsg = data;
          that.total = resp.response.total;
        } else {
          that.agreementmsg = [];
          that.total = 0;
        }
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
      let temt = "无"
      for (let i = 0; i < this.contractAuditStatus.length; i++) {
        if (this.contractAuditStatus[i].value === value) {
          temt = this.contractAuditStatus[i].desc
          break
        }
      }
      return temt
    },
     // 通过id获取name
    getNameContractStatus(value) {
      let temt = "无"
      for (let i = 0; i < this.contractStatus.length; i++) {
        if (this.contractStatus[i].value === value) {
          temt = this.contractStatus[i].desc
          break
        }
      }
      return temt
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
    // 呼出
    onDial(phone) {
      dial(phone, res => {
        this.$Notice.success({title: '呼叫成功：' + phone})
      });
    },
    // 部门ok
    bmok() {
      if (this.hadselectbm.length != 0) {
        var namelist = this.hadselectbm.map(item => {
          return item.title;
        });
        this.formCustom.creatorDeptId = this.hadselectbm.map(item => {
          return item.id;
        });
        this.formCustom.adminDeptValue = namelist.join("/");
      } else {
        this.formCustom.creatorDeptId = [];
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
      let that=this;
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
  mounted(){
    this.getlist(this.findlistmsg);
  }
};
</script>
