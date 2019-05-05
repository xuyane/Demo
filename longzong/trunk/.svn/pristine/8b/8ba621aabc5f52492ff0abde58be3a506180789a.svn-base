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
                当前位置：客户关系管理&nbsp;&nbsp;>>&nbsp;&nbsp;审批事项&nbsp;&nbsp;>>&nbsp;&nbsp;跟踪延期
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
                                         <associate-Search @query-list="getkf" :dataUrl="url1" :parameterName='name1' ref='kfref'></associate-Search>
                                    </FormItem>
                                </Col>
                                <Col span='7'>
                                    <FormItem label="用户名:" :label-width="100">
                                        <Input type="text" v-model="formCustom.realName" class="search-input"></Input>
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
                                        <Select v-model="formCustom.type" style="width:200px">
                                            <Option v-for="(item,index) in typeList" :value="item.value" :key="index">{{ item.label }}</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span='7'>
                                    <FormItem label="申请时间:"  :label-width="100">
                                        <DatePicker v-model="time1" :value="value2" format="yyyy/MM/dd" type="daterange" @on-change='gettime' placement="bottom-end" style="width: 200px"></DatePicker>
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
import { formData, formatStamp, formatTime} from "../../../assets/js/common.js";
import axios from "axios";
import {
  managerDelayApplygList,
  passApply, //通过
  rejectApply, //驳回
  getStatus,
  productList,
  orgTree
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
      typeList: [
        {
          value: "2",
          label: "正式用户"
        },
        {
          value: "0",
          label: "免费用户"
        },
        {
          value: "1",
          label: "试用用户"
        }
      ],
      url1: "/crm/common/query-adminList-by-name",
      name1: "adminName",
      value2: [],
      time1: [],
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
      findlistmsg: {},
      columns: [
        {
          title: "公司名称",
          key: "memberNameCn",
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
              data.row.memberNameCn
            );
          }
        },
        {
          title: "用户名",
          minWidth: 100,
          className: "colorbluer",
          key: "realName"
        },
        {
          title: "用户类型",
          minWidth: 160,
          key: "typeDesc"
        },
        {
          title: "业务员",
          minWidth: 100,
          key: "adminName"
        },
        {
          title: "状态",
          minWidth: 160,
          key: "status",
          render: (h, data) => {
            var typevalue = "";
            switch (data.row.status) {
              case 0:
                typevalue = "过期";
                break;
              case 1:
                typevalue = "激活";
                break;
              case 2:
                typevalue = "禁用";
                break;
            }
            return h("span", {}, typevalue);
          }
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
          minWidth: 160,
          key: "limited",
          render: (h, data) => {
            let list = [];
            if (
              data.row.userProductVOs &&
              data.row.userProductVOs.length > 0
            ) {
              data.row.userProductVOs.map(item => {
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
        {
          title: "跟踪期限",
          minWidth: 160,
          key: "serviceEndTime"
        },
        // {
        //   title: "跟踪延期",
        //   minWidth: 160,
        //   key: "delayServiceEndTime"
        // },
        {
          title: "跟踪延期次数",
          minWidth: 100,
          key: "delayApplyTimes"
        },
        {
          title: "最后登录",
          minWidth: 160,
          key: "loginTime"
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
              if (data.row.status == 1) {
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
              } else if (data.row.status == 2) {
                return h(
                  "div",
                  {
                    style: {
                      color: "red"
                    }
                  },
                  "驳回，原因：" + data.row.note
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
    // 通过
    adopt(data) {
      this.$Modal.confirm({
        title: "提示",
        content: "<p>您确定通过" + data.row.realName + "的服务延期申请吗？</p>",
        onOk: () => {
          var msg = {
            id: data.row.id
          };
          let that = this;
          passApply(formData(msg)).then(resp => {
            that.$Message.info(resp.message);
            that.agreementmsg.splice(data.index, 1);
          });
        },
        onCancel: () => {}
      });
    },
    // 查询
    handleSubmit(name) {
      this.formCustom.pageNum = 1;
      this.formCustom.pageSize = 10;
      this.findlistmsg = JSON.parse(JSON.stringify(this.formCustom));
      // let data = JSON.parse(JSON.stringify(this.formCustom));
      // if (data.adminDeptValue) {
      //   delete data.adminDeptValue;
      // }
      // this.getlist(data);
      this.getlist(this.findlistmsg);
    },
    //重置
    handleReset() {
      this.formCustom = {};
      this.formCustom.pageNum = 1;
      this.formCustom.pageSize = 10;
      this.$refs.breedDataRef.model = "";
      this.$refs.breedDataRef.getData('');

      this.$refs.kfref.model = "";
      this.$refs.kfref.getData('');
      // this.value2= '';
      this.time1 = [];
      this.time1[0] = '';
      this.time1[1] = '';
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
          note: this.rejectvalue
        };
        let that = this;
        rejectApply(formData(msg)).then(resp => {
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
      // this.formCustom.createTimeStart=new Date(data[0]).getTime();
      // this.formCustom.createTimeEnd=new Date(data[1]).getTime();
      if  (data != undefined) {
      this.formCustom.createTimeStart = 
        data[0] == "" ? "" : formatStamp(data[0]);
      this.formCustom.createTimeEnd = 
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

    //申请列表
    getlist(data) {
      let that = this;
      this.spinShow=true;
      // if(data.adminDeptValue){
      //   delete data.adminDeptValue
      // }
      data.status = this.number;
      managerDelayApplygList(formData(data)).then(resp => {
        that.spinShow=false;
        if (resp.status == 200) {
          let data = resp.response.list;
          for (var i = 0; i < data.length; i++) {
            data[i].loginTime = timeStampChange.format(
              resp.response.list[i].loginTime
            );
            data[i].serviceEndTime = timeStampChange.format(
              resp.response.list[i].serviceEndTime
            );
            data[i].delayServiceEndTime = timeStampChange.format(
              resp.response.list[i].delayServiceEndTime
            );
          }
          that.agreementmsg = data;
          that.total = resp.response.total;
        }
      });
    },
    //根据公司名称模糊匹配下拉选择列表
    companyTypeFunction(companyData) {
      // this.companyData = companyData;
      if (companyData) {
        this.formCustom.memberNameCn = companyData.label;
        this.formCustom.memberId = companyData.value;
      }else{
        this.formCustom.memberNameCn = '';
        this.formCustom.memberId = '';
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
        this.formCustom.adminDeptId = this.hadselectbm.map(item => {
          return item.id;
        });
        this.formCustom.adminDeptValue = namelist.join("/");
      } else {
        this.formCustom.adminDeptId = [];
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
    },
    getkf(data) {
      this.kflist = data;
      if (data) {
        // this.formCustom.userName = data.label;
        this.formCustom.adminId=data.value;
      } else {
        this.formCustom.adminId = "";
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
    // this.$Spin.show();
    this.findlistmsg.pageSize = 10;
    this.findlistmsg.pageNum = 1;
    // this.getstatus();
    this.getlist(this.findlistmsg);
    // this.tree();
  }
};
</script>
