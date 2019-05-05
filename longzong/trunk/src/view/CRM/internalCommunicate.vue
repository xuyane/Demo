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
.title_tree .ivu-card-head {
  background: #2d8cf0;
  p {
    color: #fff;
  }
}
.zmbtn {
  margin-bottom: 20px;
  margin-left: 0;
 
}
.zmitem {
  margin-right: 12px;
  width:10px;
  min-width: 10px;
  text-align: center;
  line-height: 32px;
}


</style>
<template  >
    <Row class='nbtxun'>
        <i-col span="24">
            <Row class-name="current-position">
                当前位置：客户关系管理&nbsp;&nbsp;>>&nbsp;&nbsp;内部通讯
            </Row>
        </i-col>
        <Row :gutter="20">
          <Col span='4'>
            <div class='leftree'>
              <Card :bordered="false" class="title_tree">
                <p slot="title" >通讯录</p>
                <div>
                  <div>组织架构</div>
                  <Tree :data="datatree"  @on-check-change='selectbm'></Tree>
                </div>
              </Card>
            </div>  
          </Col>
          <Col span='20'>
            <Row :gutter="20">
                <Col span='24' >
                  <Card class="tablewrap">
                    <Row>
                      <Col span='2' >
                        <Button type="primary" class="search-btn-w zmbtn" >按字母筛选</Button>
                        <!-- <Button type="default"></Button> -->
                      </Col>
                      <Col span='14' offset="1">
                        <a v-for="(item,index) in  zmlist" class='zmitem' >{{item}}</a>
                      </Col>
                      <Col span='5' offset="2">
                        <div class="ivu-input-wrapper ivu-input-wrapper-default ivu-input-type">
                          <i class="ivu-icon ivu-icon-ios-search ivu-input-icon ivu-input-icon-normal ivu-input-search-icon"></i> 
                          <i class="ivu-icon ivu-icon-ios-loading ivu-load-loop ivu-input-icon ivu-input-icon-validate"></i> 
                          <input autocomplete="off" spellcheck="false" type="text" placeholder="输入姓名或者电话" class="ivu-input ivu-input-default ivu-input-with-suffix"> 
                        </div>
                      </Col>
                    </Row>
                    <Row >
                      <Table class="tableCommon" border :columns="columns" :data="agreementmsg" ></Table>
                        <oil-page :total="total" :page-size="pageSize" @page-change="pageChange" :page-size-opts="pageSizeOpts" :show-sizer="showSizer" class="pagebox"></oil-page>

                    </Row>
                  </Card>
                </Col>
                
            </Row>
            
          </Col>
        </Row>
        <Modal
        v-model="modaltree"
        title="请选择部门"
        @on-ok="bmok"
        @on-cancel="bmcancel">
        <Tree :data="datatree" show-checkbox @on-check-change='selectbm'></Tree>
    </Modal>
        
    </Row>
</template>
<script>
import oilPage from "../components/page/page.vue";
import timeStampChange from "../../assets/js/timestamp_change.js";
import { formData } from "../../assets/js/common.js";
import axios from "axios";
import {
  getmyAgreementList,
  getStatus,
  productList,
  orgTree
} from "../components/axios/crm.js";
import associateSearch from "../components/associateSearch/getAssociateSearch.vue";
export default {
  name: "myAgreement",
  components: {
    oilPage,
    associateSearch
  },
  data() {
    return {
      zmlist: [
        "#",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      ],
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
      items: [{ name: "个人", id: 0 }, { name: "全部", id: 1 }],
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
          title: "部门",
          key: "memberName",
          minWidth: 100,
          className: "colorbluer",
        },
        {
          title: "姓名",
          width: 114,
          className: "colorbluer",
          key: "userName"
        },
        {
          title: "性别",
          minWidth: 160,
          key: "type"
        },
        {
          title: "电话",
          minWidth: 160,
          key: "saleman"
        },
        {
          title: "分机",
          minWidth: 160,
          key: "status"
        },
        {
          title: "手机",
          minWidth: 80,
          key: "totalAmount"
        },
        {
          title: "邮箱",
          minWidth: 160,
          key: "limited"
        },
        {
          title: "经理",
          minWidth: 160,
          key: "limited"
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
      let data = JSON.parse(JSON.stringify(this.formCustom));
      if (data.adminDeptValue) {
        delete data.adminDeptValue;
      }
      this.getlist(data);
    },
    //重置
    handleReset() {
      this.formCustom = {};
      this.formCustom.pageNum = 1;
      this.formCustom.pageSize = 10;
      this.$refs.breedDataRef.model = "";
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

    //合同列表
    getlist(data) {
      let that = this;
      this.$Spin.show();
      // if(data.adminDeptValue){
      //   delete data.adminDeptValue
      // }
      getmyAgreementList(formData(data)).then(resp => {
        that.$Spin.hide();
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
      console.log(data);
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
    this.getstatus();
    this.getlist(this.findlistmsg);
    this.tree();
  }
};
</script>
