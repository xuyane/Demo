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
                当前位置：客户关系管理&nbsp;&nbsp;>>&nbsp;&nbsp;系统配置&nbsp;&nbsp;>>&nbsp;&nbsp;待续入业务员
            </Row>
        </i-col>
        <Col span='24'>
            <Row :gutter="20">
                <Col span='24' >
                  <Card style="margin-bottom:20px" class-name="search-form">
                    <div  >
                        <Form ref="formCustom" :model="formCustom"  :label-width="100">
                            <Row type="flex" justify="space-between">
                                <Col span='7'>
                                    <FormItem label="部门:" >
                                        <Input type="text" v-model="formCustom.adminDeptValue" class="search-input" @on-focus='showtreeModal' readonly></Input>
                                        
                                    </FormItem>
                                </Col>
                                <Col span='7'  >
                                    <FormItem label="业务员:"   class="produce">
                                        <Select v-model="formCustom.adminId"  ref='breedDataRef1' filterable  remote :remote-method="remoteMethod1" :loading="loading1" >
                                          <Option v-for="(item,index) in produceList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                               <Col span='7' >
                                    <FormItem label="状态:"  >
                                        <Select v-model="formCustom.status" class="search-input">
                                            <Option v-for='(item,index) in contractAuditStatus' :key='index' :value="item.value">{{item.desc}}</Option>
                                        </Select>
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
                    <Row  class="navbox">
                      <div class="btn-container" style="margin-top:10px">
                        <Button type="primary" class="search-btn" @click="newsalemenbtn">新增续入业务员</Button>
                        <!-- <Button type="primary" class="search-btn" @click="deletesome">批量删除</Button> -->
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
        <Tree :data="datatree" @on-select-change="selected"  @on-check-change='selectbm'></Tree>
    </Modal>
        <Modal v-model="modalsalesemen" title="新增续入业务员" @on-cancel="salecancel" width='500'>
          <div class-name="search-form" style="width:80%;margin:auto"> 
            <Form :model="addcon" ref="addcon" :label-width="100" :rules="ruleCustom">
                <FormItem label="续入业务员:"   class="produce" prop='adminIds'>
                    <Select v-model="addcon.adminIds"  ref='breedDataRef1' filterable  remote  :remote-method="remoteMethod1" :loading="loading1" @on-change="changename">
                        <Option v-for="(item,index) in produceList2" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="续入部门:" prop='adminDeptValue' >
                   <Input type="text" v-model="addcon.adminDeptValue" class="search-input" @on-focus='showtreeModal' readonly></Input>
                </FormItem>
                <FormItem label="状态:" prop='type'>
                    <i-switch v-model="addcon.type" size="large">
                    <span slot="open" label='1'>开</span>
                    <span slot="close" label='0'>关</span>
                    </i-switch>
                </FormItem>
            </Form>
          </div>
          <div slot="footer">
                <Button type="text" size="large" @click="salecancel">取消</Button>
                <Button type="primary" size="large" @click="saleaddok">确定</Button>
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
  getmyAgreementList,
  getStatus,
  getContractAuditStatus,
  getContractStatus,
  getAdminList,
  orgTree,
  continuedSalemenList,
  continuedDelete,
  salemenAddOperate,
  salemenActiveorDisabled
} from "../../components/axios/crm.js";
import associateSearch from "../../components/associateSearch/getAssociateSearch.vue";
import dial from "@/assets/js/linkDial.js";
export default {
  name: "myAgreement",
  components: {
    oilPage,
    associateSearch
  },
  data() {
    return {
      spinShow:false,
      addcon: {
        type: true
      },
      modalsalesemen: false,
      url1: "/crm/continued/query-continued-salemen-list",
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
      contractAuditStatus: [
        { value: 0, desc: "冻结" },
        { value: 1, desc: "可用" }
      ],
      contractStatus: [],
      produceList: [], //选购产品列表
      produceList2: [],
      pageSizeOpts: [10, 20, 50, 100, 200],
      pageSize: 10,
      pageNum: 1,
      showSizer: true,
      total: 0,
      issure: {},
      modal1: false,
      formCustom: {},
      ruleCustom: {
        adminIds: [
          {
            required: true,
            type: "number",
            message: "续入业务员不能为空",
            trigger: "change"
          }
        ],
        adminDeptValue: [
          {
            required: false,
            message: "续入部门不能为空",
            trigger: "blur"
          }
        ]
      },
      findlistmsg: {
        pageSize: 10,
        pageNum: 1
      },
      columns: [
        // {
        //   type: "selection",
        //   width: 60,
        //   align: "center"
        // },

        {
          title: "续入业务员",
          minWidth: 160,
          key: "adminName"
        },
        {
          title: "续入部门",
          minWidth: 160,
          key: "deptName"
        },
        {
          title: "创建时间",
          minWidth: 150,
          key: "createTime",
          render: (h, data) => {
            if (data.row.createTime) {
              return h("span", {}, timeStampChange.format(data.row.createTime));
            } else {
              return h("span", {}, "");
            }
          }
        },
        {
          title: "设置人",
          minWidth: 160,
          key: "creatorName"
        },
        {
          title: "状态",
          minWidth: 160,
          key: "status",
          render: (h, data) => {
            return h("span", data.row.status == 1 ? "可用" : "冻结");
          }
        },
        {
          title: "操作",
          key: "action",
          minWidth: 150,
          //   fixed: "right",
          className: "colorbluer",
          align: "center",
          render: (h, data) => {
            if (data.row.status == 1) {
              return h("div", [
                h(
                  "a",
                  {
                    props: {
                      type: "text",
                      size: "small",
                      
                    },
                    style: {
                      color: "red"
                    },
                    on: {
                      click: () => {
                        this.activedone(data);
                      }
                    }
                  },
                  " 禁用 "
                ),
                // h(
                //   "a",
                //   {
                //     props: {
                //       type: "text",
                //       size: "small"
                //     },

                //     on: {
                //       click: () => {
                //         this.delateone(data);
                //       }
                //     }
                //   },
                //   " 删除 "
                // )
              ]);
            } else {
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
                        this.activedone(data);
                      }
                    }
                  },
                  " 激活 "
                ),
                // h(
                //   "a",
                //   {
                //     props: {
                //       type: "text",
                //       size: "small"
                //     },
                //     on: {
                //       click: () => {
                //         this.delateone(data);
                //       }
                //     }
                //   },
                //   " 删除 "
                // )
              ]);
            }
          }
        }
      ],
      agreementmsg: []
    };
  },
  methods: {
    //   激活禁用
    activedone(data) {
      let that = this;
      var contentInfo =
        data.row.status == 0
          ? "确定要激活该业务员吗?"
          : "确定要禁用该业务员吗?";
      this.$Modal.confirm({
        title: "提示",
        content: contentInfo,
        onOk: () => {
          var params = new URLSearchParams();
          params.append("id", data.row.id);
          params.append("status", data.row.status == 0 ? "1" : "0");
          salemenActiveorDisabled(params).then(res => {
            that.$Message.info({
              content: data.row.status == 0 ? "激活成功" : "禁用成功",
              duration: 3
            });
            that.getlist(that.findlistmsg);
          });
        }
      });
    },
    //   删除一条
    delateone(data) {
      let params = "ids[]=" + data.row.id;
      let that = this;
      console.log(params);
      continuedDelete(params).then(resp => {
        that.$Message.info(resp.message);
        that.getlist(that.findlistmsg);
      });
    },
    salecancel() {
      this.modalsalesemen = false;
    },
    saleaddok() {
      this.$refs.addcon.validate(valid => {
        console.log(valid);
        if (valid) {
          let that = this;
          let msg = JSON.parse(JSON.stringify(this.addcon));
          msg.status = this.addcon.type == false ? 0 : 1;
          salemenAddOperate(msg).then(resp => {
            that.$Message.success("新增成功");
            that.modalsalesemen = false;
            that.getlist(that.findlistmsg);
          });
        } else {
        }
      });
    },
    // 勾选
    selecteserves(data) {
      this.selectitem = data;
    },
    newsalemenbtn() {
      this.modalsalesemen = true;
    },
    deletesome() {
      let length = this.selectitem.length;
      if (length == 0) {
        this.$Message.warning("请先勾选业务员，至少一位。");
      } else {
        let params =
          "ids[]=" +
          this.selectitem
            .map(item => {
              return item.id;
            })
            .join(",");
        let that = this;
        continuedDelete(params).then(resp => {
          that.$Message.info(resp.message);
          that.getlist(that.findlistmsg);
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
      //   this.$refs.kfref.model = "";
      //   this.$refs.kfref.getData("");
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
      if(data.adminDeptValue){
        delete data.adminDeptValue
      }
      continuedSalemenList(data).then(resp => {
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

        that.spinShow=false;
      });
    },
    // 合同状态
    getstatus() {
      let that = this;
      getStatus().then(resp => {
        if (resp.status == 200) {
          //   that.selectitem = resp.response;
        }
      });
    },
    // 合同状态
    getContractAuditStatusVue() {
      let that = this;
      getContractAuditStatus().then(resp => {
        if (resp.status == 200) {
          //   that.contractAuditStatus = resp.response;
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
      //   for (let i = 0; i < this.contractAuditStatus.length; i++) {
      //     if (this.contractAuditStatus[i].value === value) {
      //       temt = this.contractAuditStatus[i].desc;
      //       break;
      //     }
      //   }
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
    // 业务员
    remoteMethod1(query) {
      if (query !== "") {
        this.loading1 = true;
        setTimeout(() => {
          let data = {
            adminName: query
          };
          var that = this;
          getAdminList(data).then(resp => {
            that.loading1 = false;
            if (that.modalsalesemen == true) {
              that.produceList2 = resp.response;
            } else {
              that.produceList = resp.response;
            }
          });
        }, 200);
      } else {
        this.produceList = [];
      }
    },
    changename(data) {
      console.log(data);
      // this.produceList2.map(item => {
      //   if (item.adminId == data) {
      //     this.addcon.adminDeptValue = item.adminDeptName;
      //     this.addcon.adminDeptId = item.adminDeptId;
      //   }
      // });
      //   this.addcon.adminDeptValue=
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
        this.formCustom.adminDeptId = this.hadselectbm
          .map(item => {
            return item.id;
          })
          .join(",");
        // this.formCustom.adminDeptName = this.hadselectbm.map(item => {
        //   return item.id;
        // }).join(',');
        this.formCustom.adminDeptValue = namelist.join("/");
      } else {
        // this.formCustom.creatorDeptId = [];
        this.formCustom.adminDeptId = [];
        this.formCustom.adminDeptValue = "";
      }
    },
    //点击部门
    selected(data) {
      if (this.modalsalesemen == true) {
        this.addcon.adminDeptValue = data[0].title;
        this.addcon.deptId = data[0].id;
      } else {
        this.formCustom.adminDeptValue = data[0].title;
        this.formCustom.deptId = data[0].id;
      }
      this.modaltree = false;
      data[0].selected = !data[0].selected;
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
    // this.getstatus();
    // this.getContractAuditStatusVue();
    // this.getContractStatusVue();
    this.getlist(this.findlistmsg);
    this.tree();
  },
  mounted() {}
};
</script>
