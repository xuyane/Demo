<style lang="less" >
.navwrap {
  margin-bottom: 20px;
  text-align: center;
  line-height: 32px;
  font-size: 16px;
  height: 32px;

  span {
    border: 1px solid #605f5f;
    cursor: pointer;
    display: inline-block;
    width: 50%;
  }
  .active {
    background: #2d8cf0;
    color: #fff;
  }
}
.navwrap .ivu-col span:first-child {
  border-right: none;
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
                当前位置：客户关系管理&nbsp;&nbsp;>>&nbsp;&nbsp;审批事项&nbsp;&nbsp;>>&nbsp;&nbsp;试用延期
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
                                    <FormItem label="业务员:"  :label-width="100">
                                         <associate-Search   @query-list="getkf" :dataUrl="url1"    :parameterName='name1' ref='kfref'></associate-Search>
                                    </FormItem>
                                </Col>
                                <Col span='7'>
                                    <FormItem label="用户名:" :label-width="100">
                                        <Input type="text" v-model="formCustom.userName" class="search-input"></Input>
                                    </FormItem>
                                </Col>
                                
                                <Col span='7'>
                                    <FormItem label="公司名称:"  :label-width="100">
                                        <!-- <Input type="text" v-model="formCustom.memberName" class="search-input"></Input> -->
                                        <associate-Search ref='breedDataRef' @query-list="companyTypeFunction" :dataUrl="url" :parameterName='name' :parameterValue='value1' ></associate-Search>

                                    </FormItem>
                                </Col>
                            </Row>
                            <Row type="flex" justify="space-between">
                                <Col span='7'>
                                    <FormItem label="用户类型:" :label-width="100">
                                        <Select v-model="formCustom.userType" style="width:200px">
                                            <Option v-for="(item,index) in typeList" :value="item.value" :key="index">{{ item.label }}</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span='7'>
                                    <FormItem label="申请时间:"  :label-width="100">
                                        <DatePicker v-model="time1" :value="value2" @on-change='gettime'   format="yyyy/MM/dd" type="daterange" placement="bottom-end" style="width: 200px"></DatePicker>

                                    </FormItem>
                                </Col>
                                <Col span='7' >
                                    <FormItem style="text-align:right" >
                                        <Button type="primary" @click="handleSubmit('formCustom')">查询</Button>
                                        <Button @click="handleReset" style="margin-left: 8px">重置</Button>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row type="flex" justify="space-between">
                               
                               
                            </Row>
                        </Form>
                    </div>
                  </Card>
                  <Card class="tablewrap">
                    <Row >
                      <Table class="tableCommon" border :columns="columns" :data="agreementmsg" ></Table>
                        <oil-page :total="total" :page-size="findlistmsg.pageSize" :page-num="findlistmsg.pageNum"  @page-change="pageChange" :page-size-opts="pageSizeOpts" :show-sizer="showSizer" class="pagebox"></oil-page>

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
import {
  formData,
  formatStamp,
  formatTime
} from "../../../assets/js/common.js";
import axios from "axios";
import {
  getUserproductdelayapply,
  updateUserproductdelayapply,
  productList,
  orgTree
} from "../../components/axios/crm.js";
import associateSearch from "../../components/associateSearch/getAssociateSearch.vue";
export default {
  name: "trialDelay",
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

      typeList: [
        {
          value: "0",
          label: "免费用户"
        },
        {
          value: "1",
          label: "试用用户"
        },
        {
          value: "2",
          label: "正式用户"
        }
      ],
      url1: "/crm/common/query-adminList-by-name",
      name1: "adminName",
      value2: [],
      items: [{ name: "待审核", id: 0 }, { name: "已审核", id: 1 }],
      number: 0,
      hadselectbm: [],
      modaltree: false,
      datatree: [],
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
      findlistmsg: {
        pageNum : 1,
        pageSize : 10
      },
      columns: [
        {
          title: "公司名称",
          key: "memberName",
          minWidth: 180,
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
          minWidth: 100,
          className: "colorbluer",
          key: "userName"
        },
        {
          title: "用户类型",
          minWidth: 100,
          key: "userType",
          render: (h, data) => {
            var typevalue = "";
            switch (data.row.userType) {
              case 0:
                typevalue = "免费用户";
                break;
              case 1:
                typevalue = "试用用户";
                break;
              case 2:
                typevalue = "正式用户";
                break;
            }
            return h("span", {}, typevalue);
          }
        },
        {
          key: "userManagerDetailVOs",
          align: "center",
          minWidth: 100,
          title: "业务员",
          render: (h, data) => {
            let name=data.row.userManagerDetailVOs.map((item, index) => {
              return item.adminName;
            });
            return h("span", name.join(','));
          }
        },
        // {
        //   title: "状态",
        //   minWidth: 80,
        //   key: "status",
        //   render: (h, data) => {
        //     var typevalue = "";
        //     switch (data.row.status) {
        //       case 0:
        //         typevalue = "待审核";
        //         break;
        //       case 1:
        //         typevalue = "通过";
        //         break;
        //       case 2:
        //         typevalue = "驳回";
        //         break;
        //     }
        //     return h("span", {}, typevalue);
        //   }
        // },
        {
          title: "产品分类",
          minWidth: 100,
          className: "colorbluer",
          key: "productType"
        },
        {
          title: "主用户",
          minWidth: 80,
          key: "isMain",
          render: (h, data) => {
            var typevalue = "";
            switch (data.row.isMain) {
              case 0:
                typevalue = "否";
                break;
              case 1:
                typevalue = "是";
                break;
            }
            return h("span", {}, typevalue);
          }
        },
        {
          title: "产品期限",
          minWidth: 100,
          key: "limited",
          render: (h, data) => {
            let list = [];
            if (
              data.row.userProductDelayItemVOs &&
              data.row.userProductDelayItemVOs.length > 0
            ) {
              data.row.userProductDelayItemVOs.map(item => {
                let str = `${item.productNameCn} (${formatTime(item.startTime)} 至 ${formatTime(
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
        // {
        //   key: "trackTerm",
        //   align: "center",
        //   title: "跟踪期限",
        //   minWidth: 140,
        //   render: (h, data) => {
        //     return h(
        //       "span",
        //       {},
        //       timeStampChange.format(data.row.serviceEndTime)
        //     );
        //   }
        // },
        {
          key: "trackTerm",
          align: "center",
          title: "申请时间",
          minWidth: 140,
          render: (h, data) => {
            return h(
              "span",
              {},
              data.row.createTime
            );
          }
        },
        {
          title: "试用次数",
          minWidth: 80,
          key: "userCount"
        },
        {
          title: "操作",
          key: "action",
          minWidth: 150,
          className: "colorbluer",
          align: "center",
          render: (h, data) => {
            if (data.row.status == "1") {
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
                     
                    }
                  },
                  " 通过 "
                )
              ]);
            } else if (data.row.status == "2") {
              return h("div", [
                h(
                  "div",
                  {
                    style: {
                      color: "red"
                    }
                  },
                  "驳回，原因：" + data.row.note
                )
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
                      marginRight: "8px"
                    },
                    on: {
                      click: () => {
                        this.updateStatue(data);
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
            }
          }
        }
      ],
      agreementmsg: []
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
    // 查询
    handleSubmit(name) {
      this.formCustom.pageNum = 1;
      this.formCustom.pageSize = 10;
      this.findlistmsg = JSON.parse(JSON.stringify(this.formCustom));
      // if (data.adminDeptValue) {
      //   delete data.adminDeptValue;
      // }
      this.getlist(this.findlistmsg);
    },
    getkf(data) {
      this.kflist = data;
      if (data) {
        this.formCustom.adminName = data.label;
        this.formCustom.adminId = data.value;
      } else {
        this.formCustom.adminName = "";
        this.formCustom.adminId = "";
      }
    },
    //重置
    handleReset() {
      this.formCustom = {};
      this.formCustom.pageNum = 1;
      this.formCustom.pageSize = 10;
      this.$refs.breedDataRef.model = "";
      this.$refs.kfref.model = "";
      this.time1 = [];
      this.time1[0] = '';
      this.time1[1] = '';
    },
    // 申请时间
    gettime(data) {
      if (data != undefined) {
        // let distributionTimeS = this.distributionTime[0] == '' ? '' : formatStamp(this.distributionTime[0]);
        // let distributionTimeE = formatStamp(data[1])
        this.formCustom.loginTimeStart =
          data[0] == "" ? "" : formatStamp(data[0]);
        this.formCustom.loginTimeEnd =
          data[1] == "" ? "" : (formatStamp(data[1])+86399000);
      }
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

    //用户产品审核列表
    getlist(data) {
      let that = this;
      this.spinShow=true;
      // if(data.adminDeptValue){
      //   delete data.adminDeptValue
      // }
      data.status = this.number;
      getUserproductdelayapply(formData(data)).then(resp => {
        that.spinShow=false;
        if (resp.status == 200 && resp.response.list != null) {
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
      });
    },
    // 试用延期审核通过驳回
    updateStatue(data) {
      this.$Modal.confirm({
        title: "提示",
        content: "<p>您确定通过" + data.row.userName + "的试用延期申请吗？</p>",
        onOk: () => {
          var msg = {
            id: data.row.id,
            note: "审核通过",
            status: 1
          };
          let that = this;
          updateUserproductdelayapply(msg).then(resp => {
            that.$Message.info(resp.message);
            that.agreementmsg.splice(data.index, 1);
          });
        },
        onCancel: () => {}
      });
      // let that = this;
      //  let params= {
      //     id: data.row.id,
      //     note:"审核通过",
      //     status: 1
      //   }
      // updateUserproductdelayapply(params).then(resp => {
      //   if (resp.status == 200) {
      //     that.selectitem = resp.response;
      //   }
      // });
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
          id: this.rejecttr.row.id,
          note: this.rejectvalue,
          status: 2
        };
        let that = this;
        updateUserproductdelayapply(msg).then(resp => {
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
    //根据公司名称模糊匹配下拉选择列表
    companyTypeFunction(companyData) {
      // this.companyData = companyData;
      if (companyData) {
        this.formCustom.memberId = companyData.value;
        this.formCustom.memberName = companyData.label;
      } else {
        this.formCustom.memberId = "";
        this.formCustom.memberName = "";
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
    }
  },
  created() {
    // this.$Spin.show();
    // this.getstatus();
    this.getlist(this.findlistmsg);
    // this.tree();
  }
};
</script>
