<style lang="less" >

</style>
<template >
    <Row class='varietybox'>
        <i-col span="24">
            <Row class-name="current-position">
                当前位置：客户关系管理&nbsp;&nbsp;>>&nbsp;&nbsp;审批事项&nbsp;&nbsp;>>&nbsp;&nbsp;退款审核
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
                                        <associate-Search ref='breedDataRef' @query-list="companyTypeFunction" :dataUrl="url" :parameterName='name' :parameterValue='value1' ></associate-Search>

                                    </FormItem>
                                </Col>
                                <Col span='7'>
                                    <FormItem label="用户名:" :label-width="100">
                                        <associate-Search ref='usernamebreedDataRef' @query-list="usernameFunction" :dataUrl="usernameurl" :parameterName='nameuser' ></associate-Search>
                                    </FormItem>
                                </Col>
                               <Col span='7' >
                                    <FormItem label="选购产品:"  :label-width="100" class="produce">
                                        <Select v-model="formCustom.productId" ref='breedDataRef1' filterable multiple remote :remote-method="remoteMethod1" :loading="loading1" @on-query-change="changename">
                                          <Option v-for="(item,index) in produceList" :value="item.id" :key="item.index">{{ item.productNameCn }}</Option>
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
                                    <FormItem label="业务员:"  :label-width="100">
                                         <associate-Search ref='usernamebreedDataRef2' @query-list="getkf"  :dataUrl="url1" :parameterName='name1'></associate-Search>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row type="flex" justify="space-between">
                               
                               <Col span='7' offset="17">
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
                        <oil-page :total="total" :page-size="pageSize" @page-change="pageChange" :page-size-opts="pageSizeOpts" :show-sizer="showSizer" class="pagebox"></oil-page>

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
import { formData, formatStamp, formatTime,formatTime2 } from "../../../assets/js/common.js";
import axios from "axios";
import dial from '@/assets/js/linkDial.js';
import {
  contractChangeapplyList,
  getStatus,
  productList,
  orgTree,
} from "../../components/axios/crm.js";
import associateSearch from "../../components/associateSearch/getAssociateSearch.vue";
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
      usernameurl: "/crm/common/query-user-select-list",
      nameuser: "userName",
      hadselectbm: [],
      modaltree: false,
      datatree: [],
      departId:'',
      loading1: false,
      companyData: "",
      name: "memberName",
      value1: "",
      url: "/crm/common/query-member-select-list", //根据会员名称模糊匹配下拉选择列表
      selectitem: [],
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
      findlistmsg: {},
      columns: [
        {
          title: "公司名称",
          key: "memberName",
          minWidth: 240,
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
          minWidth: 120,
          className: "colorbluer",
          key: "username"
        },
        {
          title: "合同编号",
          minWidth: 160,
          key: "contractCode"
        },
        {
          title: "合同状态",
          key: "auditStatus",
          minWidth: 80,
          render: (h, data) => {
            let statustext = "";
            switch (data.row.auditStatus) {
              case 0:
                statustext = "待审核";
                break;
              case 1:
                statustext = "审批通过";
                break;
              case 2:
                statustext = "驳回";
                break;
              case 99:
                statustext = "其他";
                break;
            }
            return h("span", statustext);
          }
        },
        {
          title: "洽谈金额",
          minWidth: 120,
          key: "adjustAmount"
        },
        {
          title: "选购产品",
          minWidth: 100,
          className: "colorbluer",
          key: "contractChangeProductVOs",
         render: (h, data) => {
            let list = [];
            if (data.row.contractChangeProductVOs && data.row.contractChangeProductVOs.length > 0) {
              data.row.contractChangeProductVOs.map(item => {
                let str = `${item.productNameCn} ( ${formatTime(item.startTime)} 至 ${formatTime(
                  item.endTime
                )} )`;
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
          key: "createTime",
          render: function(h, params) {
            return h("div", formatTime2(params.row.createTime));
          }
        },
        {
          title: "认账日期",
          minWidth: 150,
          key: "accountTime",
          render: function(h, params) {
            return h("div", formatTime2(params.row.accountTime));
          }
        },
        {
          title: "业务员",
          minWidth: 160,
          key: "creatorName",
          render:(h,data)=>{
           return h('span', data.row.creatorDeptName+'-'+data.row.creatorName)
         }
        },
        {
          title: "业务员电话",
          minWidth: 120,
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
          minWidth: 150,
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
        //退款
    refund(data) {
      this.$router.push({
        name: "refundsContract",
        query: {
          contractCode: data.row.contractCode
        }
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
    // 审核合同-退款详情
    check(data) {
      this.$router.push({
        name: "refundDetial",
        query: {
          id:data.row.id
        }
      });
    },
    // 查询
    handleSubmit(name) {
      this.formCustom.pageNum = 1;
      this.formCustom.pageSize = 10;
      this.formCustom.creatorDeptId = this.departId;
      let data = JSON.parse(JSON.stringify(this.formCustom));
      if (data.adminDeptValue) {
        delete data.adminDeptValue;
      }
      this.getlist(data);
    },
    //重置
    handleReset() {
      this.departId = '';
      this.formCustom = {};
      this.formCustom.pageNum = 1;
      this.formCustom.pageSize = 10;
      this.$refs.breedDataRef.model = "";
      this.$refs.breedDataRef.getData("");
       this.$refs.usernamebreedDataRef.model = "";
       this.$refs.usernamebreedDataRef.getData("");
        this.$refs.usernamebreedDataRef2.model = "";
       this.$refs.usernamebreedDataRef2.getData("");
      this.$refs.breedDataRef1.model = "";
       this.$refs.breedDataRef1.getData("");
       this.$refs.breedDataRef1.query = "";
    },
 // 获取所在部门部门树
    getDepData (deptLabel,deptId,deptCode){
      this.departId = deptId ? deptId:'';
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
      contractChangeapplyList(formData(data)).then(resp => {
        that.spinShow=false;
        if (resp.status == 200) {
          if(resp.response){
            let data = resp.response.list;
          for (var i = 0; i < data.length; i++) {
            data[i].createTime = timeStampChange.format(
              resp.response.list[i].createTime
            );
            data[i].accountTime = timeStampChange.format(
              resp.response.list[i].accountTime
            );
            data[i].checkTime = timeStampChange.format(
              resp.response.list[i].checkTime
            );
          }
          that.agreementmsg = data;
          that.total = resp.response.total;
          }else{
            that.agreementmsg = [];
          that.total = 0;
          }
          
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
        this.formCustom.username = data.label;
      }else{
        this.formCustom.userId ='';
        this.formCustom.username = '';
      }
    },
     getkf(data) {
      this.kflist = data;
      if (data) {
        this.formCustom.creatorId = data.value;
      } else {
        this.formCustom.creatorId = "";
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
          productList(formData(data)).then(resp => {
            that.loading1 = false;
            // const list = resp.response.list.map(item => {
            //   return {
            //     value: item.id,
            //     label: item.productNameCn
            //   };
            // });
            if (resp.response) {
              this.produceList = resp.response.list;
            }
          });
        }, 200);
      } else {
        this.produceList = [];
      }
    },
    changename(query) {
      if (query == "") {
        this.produceList = [];
      } else {
        this.remoteMethod1();
      }
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
        this.formCustom.creatorDeptId = this.hadselectbm.map(item => {
          return item.id;
        });
        this.formCustom.adminDeptValue = namelist.join("/");
      } else {
        this.formCustom.creatorDeptId = [];
        this.formCustom.adminDeptValue = "";
      }
    },
    // 部门取消
    bmcancel() {},
    tree() {
      orgTree().then(resp => {
        // this.datatree=resp.response;
        var a = JSON.parse(resp.response);
        this.datatree = this.breedDigui(a);
      });
    },
    // 呼出
    onDial(phone) {
      dial(phone, res => {
        this.$Notice.success({title: '呼叫成功：' + phone})
      });
    },
    // 部门复选框
    selectbm(data) {
      this.hadselectbm = data;
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
    this.findlistmsg.pageSize = 10;
    this.findlistmsg.pageNum = 1;
    this.getstatus();
    this.getlist(this.findlistmsg);
    this.tree();
  }
};
</script>
