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
                当前位置：客户关系管理&nbsp;&nbsp;>>&nbsp;&nbsp;公告管理
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
                            :class="index+1==number? 'tab-active' : ''"
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
                                    <FormItem label="发布时间:"  :label-width="100">
                                        <DatePicker :value="value2" @on-change='changedate' format="yyyy/MM/dd" type="daterange" placement="bottom-start" style="width: 200px"></DatePicker>

                                    </FormItem>
                                </Col>
                                <Col span='7'>
                                    <FormItem label="公告标题:" :label-width="100">
                                        <Input type="text" v-model="formCustom.title" class="search-input"></Input>
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
                      <div class="btn-container">
                        <Button type="primary" class="search-btn" @click="addAnnouncement" >新增公告</Button>
                      </div>
                    </Row>
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


        <Modal
        v-model="ggdetial"
        title="查看公告"
        @on-cancel="detialdel">
        <div>
          <Form :model="detialform" :label-width="100">
            <FormItem label="公告标题:">
              <span>{{detialform.title}}</span>
            </FormItem>
            <FormItem label="公告内容:">
              <span v-html="detialform.content">{{detialform.content}}</span>
            </FormItem>
            <FormItem label="附件:">
              <div v-for="(item,index) in detial" :key='index'><span><a @click='downloadfile(item.filePath)'>{{item.fileName}}</a></span></div>
            </FormItem>
            <FormItem label="发布部门:">
              <span>{{detialform.orgName}}</span>
            </FormItem>
            <FormItem label="发布人:">
              <span>{{detialform.createName}}</span>
            </FormItem>
            <FormItem label="发布时间:">
              <span>{{detialform.createTime}}</span>
            </FormItem>
        </Form>
        </div>
        <div slot="footer">
          <Button  size="large"  @click="detialdel">取消</Button>
          <Button type="primary" size="large" @click="checkdetial">确定</Button>
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
import { sysnoticeinfoList } from "../../components/axios/crm.js";
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
      detial: [],
      detialform: {},
      ggdetial: false,
      typeList: [
        {
          value: "0",
          label: "正式用户"
        },
        {
          value: "1",
          label: "免费用户"
        },
        {
          value: "2",
          label: "试用用户"
        }
      ],
      url1: "/crm/common/query-adminList-by-name",
      name1: "adminName",
      value2: [],
      items: [{ name: "发出的公告", id: 0 }, { name: "接收的公告", id: 1 }],
      number: 1,
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
        pageNum: 1,
        pageSize: 10
      },

      columns: [
        {
          title: "发布时间",
          key: "createTime",
          minWidth: 100
          // render:(h,data)=>{
          //   return h('span',{},timeStampChange.format(data.row.createTime))
          // }
        },
        {
          title: "公告标题",
          minWidth: 114,
          className: "colorbluer",
          key: "title",
          render: (h, data) => {
            return h(
              "a",
              {
                on: {
                  click: () => {
                    this.checkinfor(data);
                  }
                }
              },
              data.row.title
            );
          }
        },
        {
          title: "公告内容",
          minWidth: 260,
          key: "content",
          render: (h, data) => {
            return h("div", {
              domProps: {
                innerHTML: data.row.content
              }
            });
          }
        },
        {
          title: "发布人",
          minWidth: 160,
          key: "createName"
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
    // 下载文件
    downloadfile(data) {
      window.location.href = "/crm/sysnoticeinfo/download?attachment=" + data;
    },
    // 选择日期
    changedate(data) {
      if (data[0]) {
        this.formCustom.startTime = this.gettimechuo(data[0]);
      } else {
        this.formCustom.startTime = "";
      }

      if (data[1]) {
        this.formCustom.endTime = this.gettimechuo(data[1]);
      } else {
        this.formCustom.endTime = "";
      }
    },
    // 日期转化时间戳
    gettimechuo(a) {
      var date = new Date(a);
      return date.getTime();
    },
    // nav切换
    navchange(index) {
      this.number = index + 1;
      this.getlist(this.findlistmsg);
    },
    // 点击公告标题
    checkinfor(data) {
      this.detialform = data.row;
      this.detial = data.row.noticeFiles;
      this.ggdetial = true;
    },
    //查看公告详情确定
    checkdetial() {
      this.ggdetial = false;
    },
    //查看公告详情取消
    detialdel() {
      this.ggdetial = false;
    },
    //   新增公告
    addAnnouncement() {
      this.$router.push({
        name: "addAnnouncement"
      });
    },
    // 查询
    addmsg() {
      this.showAddModal = true;
    },
    // 查看合同
    check(data) {
      this.$router.push({
        name: "waittingCheck",
        query: {
          contractCode: data.row.contractCode
        }
      });
    },
    // 查询
    handleSubmit(name) {
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
      // this.formCustom.pageNum = 1;
      // this.formCustom.pageSize = 10;
      this.value2 = [];
      // this.$refs.breedDataRef.model = "";
      // this.$refs.breedDataRef1.model = "";
    },
    //退款
    refund(data) {
      // status=this.data6
      // if()
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

    //公告列表
    getlist(data) {
      let that = this;
      this.spinShow=true;
      // if(data.adminDeptValue){
      //   delete data.adminDeptValue
      // }
      data.receiveOrSend = this.number;
      sysnoticeinfoList(formData(data)).then(resp => {
        that.spinShow=false;
        if (resp.status == 200) {
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
      if (this.formCustom.memberId) {
        this.formCustom.memberId = companyData.value;
      }
      if (this.formCustom.memberName) {
        this.formCustom.memberId = companyData.memberName;
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
        this.formCustom.adminId = data.value;
      } else {
        this.formCustom.adminId = "";
      }
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
