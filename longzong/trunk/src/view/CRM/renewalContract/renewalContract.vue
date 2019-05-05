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
                当前位置：客户关系管理&nbsp;&nbsp;>>&nbsp;&nbsp;待续入合同
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
                        <Form ref="formCustom" :model="formCustom"  :label-width="100">
                            <Row type="flex" justify="space-between">
                                <Col span='7'>
                                    <FormItem label="公司名称:"  >
                                        <!-- <Input type="text" v-model="formCustom.memberName" class="search-input"></Input> -->
                                        <associate-Search ref='breedDataRef' @query-list="companyTypeFunction" :dataUrl="url" :parameterName='name' ></associate-Search>

                                    </FormItem>
                                </Col>
                                <Col span='7'>
                                    <FormItem label="用户名:" >
                                        <associate-Search ref='usernamebreedDataRef' @query-list="usernameFunction" :dataUrl="usernameurl" :parameterName='nameuser' ></associate-Search>
                                    </FormItem>
                                </Col>
                               <Col span='7' class="producedx" >
                                    <FormItem label="选购产品:"   class="produce">
                                        <Select v-model="formCustom.productId"  ref='breedDataRef1' filterable  remote :remote-method="remoteMethod1" :loading="loading1" @on-change="changename">
                                          <Option v-for="(item,index) in produceList" :value="item.id" :key="item.index">{{ item.name }}</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row type="flex" justify="space-between">
                                <Col span='7'>
                                    <FormItem label="合同编号:" >
                                        <Input type="text" v-model="formCustom.contractCode" class="search-input"></Input>
                                    </FormItem>
                                </Col>
                                <Col span='7'>
                                    <FormItem label="合同金额:" >
                                        <Input type="text" v-model="formCustom.totalAmount" class="search-input">
                                            <Select v-model="formCustom.rangeType" slot="prepend" style="width: 60px">
                                              <Option value="1"> 大于 </Option>
                                              <Option value="2"> 小于 </Option>
                                              <Option value="3"> 等于 </Option>
                                          </Select>
                                        </Input>
                                    </FormItem>
                                </Col>
                               <Col span='7' >
                                    <FormItem label="合同状态:"  >
                                        <Select v-model="formCustom.status" class="search-input">
                                            <Option v-for='(item,index) in contractStatus' :key='index' :value="item.value">{{item.desc}}</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row type="flex" justify="space-between">
                                <Col span='7'>
                                    <FormItem label="部门:" >
                                        <Input type="text" v-model="formCustom.adminDeptName" class="search-input" @on-focus='showtreeModal' readonly></Input>
                                        
                                    </FormItem>
                                </Col>
                                <Col span='7'>
                                    <FormItem label="业务员:"   >
                                        <associate-Search @query-list="getkf"  :dataUrl="url1" :parameterName='name1' ref='kfref'></associate-Search>
                                    </FormItem>
                                </Col>
                               <Col span='7' >
                                    <!-- <FormItem label="合同审核状态:"  >
                                        <Select v-model="formCustom.auditStatus" class="search-input">
                                            <Option v-for='(item,index) in contractAuditStatus' :key='index' :value="item.value">{{item.desc}}</Option>
                                        </Select>
                                    </FormItem> -->
                                    <FormItem label="待续入日期:"  >
                                        <DatePicker type="month"  :clearable='false' class="search-input" v-model="formCustom.endTime"></DatePicker>
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
                    <Row  >
                      <div class="btn-container" style="margin-top:10px">
                        <Button type="primary" class="search-btn" @click="automaticAllocation">自动分配</Button>
                        <Button type="primary" class="search-btn" @click="manualAllocation">手动分配</Button>
                      </div>
                    </Row>
                    <Row >
                      <Table class="tableCommon" border :columns="columns" :data="agreementmsg"  @on-selection-change='selecteserves'></Table>
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
         <Modal title="跟踪内容" v-model="showfollowModal" @on-cancel='showfollowModalcancel'>
             <Form :model="followcon" ref="followcon" :label-width="100" :rules="ruleCustom">
                <FormItem label="续入业务员:"   class="produce" prop='adminIdAfter'>
                    <Select v-model="followcon.adminIdAfter"  ref='breedDataRef1' filterable  remote  :remote-method="remoteMethod2" :loading="loading2" @on-change="changename">
                        <Option v-for="(item,index) in produceList2" :value="item.adminId" :key="item.adminId">{{ item.adminName }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="跟踪内容:" prop='content' >
                   <Input v-model="followcon.content" type="textarea" :autosize="{minRows: 2,maxRows: 5}" />
                </FormItem>
            </Form>        
          <div slot="footer">
            <Button type="text" size="large" @click="showfollowModalcancel">取消</Button>
            <Button type="primary" size="large" @click="showfollowModalconfirm">确定</Button>
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
  continuedContractList,
  getStatus,
  getContractAuditStatus,
  getContractStatus,
  queryProductSelectList,
  orgTree,
  queryContinuedSalemenList,
  singleAllocation,
  automaticPreviewAllot,
  batchAllocation,
  checkIsAutomaticAllot,
  contractretentionrecordSave
} from "../../components/axios/crm.js";
import associateSearch from "../../components/associateSearch/getAssociateSearch.vue";
import dial from "@/assets/js/linkDial.js";
export default {
  name: "renewalContract",
  components: {
    oilPage,
    associateSearch
  },
  data() {
    return {
      spinShow: false,
      selecttr: [],
      produceList2: [],
      loading2: false,
      showfollowModal: false,
      followcon: {},
      number: 0,
      items: [{ name: "合同分配", id: 0 }, { name: "分配记录", id: 1 }],
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
        rangeType: "3",
        endTime: new Date()
      },
      ruleCustom: {
        adminIdAfter: [
          {
            required: true,
            type: "number",
            message: "续入业务员不能为空",
            trigger: "change"
          }
        ],
        content: [
          {
            required: true,
            message: "跟踪内容不能为空",
            trigger: "blur"
          }
        ]
      },
      findlistmsg: {
        pageSize: 10,
        pageNum: 1
      },
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "合同名称",
          key: "contractName",
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
              data.row.contractName
            );
          }
        },
        {
          title: "用户名",
          minWidth: 120,
          className: "colorbluer",
          key: "userName"
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
            // if (data.row.status == 0) {

            // } else {
            //   statustext =
            //     this.getNameContractStatus(data.row.status) +
            //     "(" +
            //     this.getNameContractAuditStatus(data.row.auditStatus) +
            //     ")";
            // }

            return h("span", {}, this.getNameContractStatus(data.row.status));
          }
        },
        {
          title: "应续入",
          minWidth: 80,
          key: "totalAmount",
          render: (h, data) => {
            return h("span", data.row.totalAmount + "元");
          }
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
          title: "开通日期",
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
              return h("span", {}, "");
            }
          }
        },
        {
          title: "到期日期",
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
          key: "adminName",
          render: (h, data) => {
            return h("span", data.row.adminDeptName + "-" + data.row.adminName);
          }
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
                  on: {
                    click: () => {
                      this.distributeone(data);
                    }
                  }
                },
                " 分配 "
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
                      this.retenteone(data);
                    }
                  }
                },
                " 自留 "
              )
            ]);
          }
        }
      ],
      agreementmsg: [],
      activetr: 0
    };
  },
  methods: {
    monthnow() {
      var now = new Date();
      var monthn = now.getMonth() + 1;
      var yearn = now.getFullYear();
      return yearn + "年" + monthn + "月";
    },
    //点击部门
    selected(data) {
      this.formCustom.adminDeptName = data[0].title;
      this.formCustom.adminDeptId = data[0].id;
      this.modaltree = false;
      data[0].selected = !data[0].selected;
    },
    // 勾选
    selecteserves(data) {
      this.selecttr = data;
    },
    remoteMethod2(query) {
      if (query !== "") {
        this.loading2 = true;
        setTimeout(() => {
          let data = {
            adminName: query
          };
          var that = this;
          queryContinuedSalemenList(data).then(resp => {
            that.loading2 = false;
            if (that.showfollowModal == true) {
              that.produceList2 = resp.response;
            } else {
              //   that.produceList = resp.response;
            }
          });
        }, 200);
      } else {
        this.produceList = [];
      }
    },
    showfollowModalcancel() {
      this.showfollowModal = false;
    },
    showfollowModalconfirm() {
      this.$refs.followcon.validate(valid => {
        if (valid) {
          let that = this;
          checkIsAutomaticAllot().then(resp => {
            if (resp.response) {
              that.$Modal.confirm({
                title: "提示",
                content: "<p>已进行自动分配操作，是否清空预分配数据？</p>",
                onOk: () => {
                  let msg = JSON.parse(JSON.stringify(that.followcon));
                  msg.contractId = this.activetr;
                  console.log(typeof this.activetr);
                  if (typeof this.activetr == String) {
                    batchAllocation(formData(msg)).then(resp => {
                      that.$Message.success("分配成功");
                      that.showfollowModal = false;
                      that.getlist(that.findlistmsg);
                    });
                  } else {
                    singleAllocation(formData(msg)).then(resp => {
                      that.$Message.success("分配成功");
                      that.showfollowModal = false;
                      that.getlist(that.findlistmsg);
                    });
                  }
                },
                onCancel: () => {}
              });
            } else {
              let msg = JSON.parse(JSON.stringify(that.followcon));
              msg.contractId = that.activetr;
              console.log(typeof this.activetr);
              if (typeof this.activetr == String) {
                batchAllocation(formData(msg)).then(resp => {
                  that.$Message.success("分配成功");
                  that.showfollowModal = false;
                  that.getlist(that.findlistmsg);
                });
              } else {
                singleAllocation(formData(msg)).then(resp => {
                  that.$Message.success("分配成功");
                  that.showfollowModal = false;
                  that.getlist(that.findlistmsg);
                });
              }
            }
          });
        } else {
        }
      });
    },
    distributeone(data) {
      this.showfollowModal = true;
      this.activetr = data.row.contractId;
    },
    retenteone(data) {
      let that = this;
      this.$Modal.confirm({
        title: "提示",
        content: "确认自留该条合同？",
        onOk: () => {
          var params = new URLSearchParams();
          params.append("id", data.row.id);

          contractretentionrecordSave(data.row.contractId).then(res => {
            that.getlist(that.findlistmsg);
            that.$Message.info("自留成功");
          });
        }
      });
    },
    navchange(index) {
      if (index == 1) {
        this.$router.push({
          name: "recordList"
        });
      }
    },
    //自动分配
    automaticAllocation() {
      this.spinShow = true;
      let that = this;
      let data = this.findlistmsg;
      data.totalAmount = Number(data.totalAmount)
        ? Number(data.totalAmount)
        : "";
        console.log(this.findlistmsg.endTime,formatStamp(data.endTime))
      data.endTime = this.findlistmsg.endTime ? this.findlistmsg.endTime : "";
      data.endTime = data.endTime ? formatStamp(data.endTime) : "";
      delete data.pageSize;
      delete data.pageNum;
      automaticPreviewAllot(data).then(resp => {
        that.spinShow=false;
        that.$router.push({
          name: "automaticPreview",
          query: data
        });
      });
      that.spinShow = false;
    },
    //   手动分配
    manualAllocation() {
      if (this.selecttr.length == 0) {
        this.$Message.warning("请先勾选合同，至少一条。");
      } else {
        this.showfollowModal = true;
        this.activetr = this.selecttr
          .map(item => {
            return item.contractId;
          })
          .join(",");
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
        name: "automaticAllocation",
        query: {
          //   contractCode: data.row.contractCode,
          //   bussinessId: data.row.id
          // taskId:data.row.taskId
        }
      });
    },
    // 查询
    handleSubmit(name) {
      // debugger
      this.formCustom.pageNum = 1;
      this.formCustom.pageSize = 10;
      console.log(this.formCustom.endTime,formatStamp(this.formCustom.endTime))
      
      this.findlistmsg = JSON.parse(JSON.stringify(this.formCustom));
      if (this.findlistmsg.adminDeptValue) {
        delete this.findlistmsg.adminDeptValue;
      }
      this.getlist(this.findlistmsg);
    },
    //重置
    handleReset() {
      this.formCustom = {
        rangeType: "3",
        endTime: new Date()
      };
      console.log(this.formCustom.endTime,formatStamp(this.formCustom.endTime))
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
      this.spinShow = true;
      data.totalAmount = Number(data.totalAmount)
        ? Number(data.totalAmount)
        : "";
      data.endTime = this.formCustom.endTime ? +this.formCustom.endTime : "";
      console.log('data.endTime', data.endTime)
      // console.log(data.endTime,this.formCustom.endTime,formatStamp(this.formCustom.endTime))
      // data.endTime = data.endTime ? formatStamp(data.endTime) : "";
      continuedContractList(formData(data)).then(resp => {
        that.spinShow = false;
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
        that.spinShow = false;
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
    // this.getContractAuditStatusVue();
    this.getContractStatusVue();

    this.tree();
  },
  mounted() {
    this.getlist(this.findlistmsg);
  }
};
</script>
