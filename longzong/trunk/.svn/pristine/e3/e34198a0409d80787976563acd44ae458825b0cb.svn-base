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
          当前位置：客户关系管理&nbsp;&nbsp;>>&nbsp;&nbsp;客户投诉
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
                      <FormItem label="被投诉人：">
                        <Select
                          v-model="formCustom.complainId"
                          ref="input1"
                          class="search-input"
                          filterable
                          remote
                          transfer
                          label-in-value
                          @on-change="change1"
                          :remote-method="remoteMethod1"
                          :loading="loading">
                          <Option v-for="(item, index) in adminList" :value="item.id" :key="index">{{item.name}}</Option>
                        </Select>
                      </FormItem>
                    </Col>
                    
                    <Col span='7'>
                      <FormItem label="关键字:" :label-width="100">
                          <Input type="text" v-model="formCustom.content" class="search-input"></Input>
                      </FormItem>
                    </Col>
                    <Col span='7'>
                      <FormItem label="所属部门:" :label-width="100">
                          <Input :value="departmentTitle" class="search-input" @on-focus='showtreeModal' readonly></Input>            
                      </FormItem>
                    </Col>
                </Row>
                <Row type="flex" justify="space-between">
                  <Col span='7'>
                    <FormItem label="投诉时间："  :label-width="100">
                      <DatePicker :value="value2" @on-change="changeDate" format="yyyy/MM/dd" type="daterange" class="search-input" placement="bottom-start"></DatePicker>
                    </FormItem>
                  </Col>
                  <Col span='7' offset='10'>
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
            <Row :gutter="16" class="navbox">
              <Col span='2' style="margin-bottom:20px">
                <Button type="primary" @click="addComplaint">新增投诉</Button>
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
    <Modal
      v-model="modaltree"
      title="请选择部门"
      @on-ok="bmok"
      @on-cancel="bmcancel">
      <Tree :data="datatree" @on-select-change='selectbm'></Tree>
    </Modal>
    <!-- 处理 -->
    <Modal v-model="resultModal" title="处理">
      <Form>
        <FormItem label="处理意见：" :label-width="100">
          <Input type="textarea" v-model="result"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <i-button type="primary" @click="">确定</i-button>
        <i-button @click="resultModal=false">取消</i-button>
      </div>
    </Modal>
    <Spin size="large" fix v-if="spinShow"></Spin>  
  </Row>
</template>
<script>
import oilPage from "../../components/page/page.vue";
import timeStampChange from "../../../assets/js/timestamp_change.js";
import { formData,formatStamp } from "../../../assets/js/common.js";
import axios from "axios";
import {
  userComplainList,
  productList,
  orgTree,
  getAdminList,//业务员
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
       value2:[],
      loading:false,
      number:0,
      items: [{ name: "未处理", id: 0 }, { name: "已处理", id: 1 }],
      url1: "/crm/common/query-adminList-by-name",
      name1: "adminName",
      number: 1,
      hadselectbm: [],
      modaltree: false,
      datatree: [],
      adminList:[],
      loading1: false,
      resultModal: false,
      departmentTitle:'',
      result:'',
      companyData: "",
      name: "memberName",
      url: "/crm/common/query-member-select-list", //根据会员名称模糊匹配下拉选择列表
      pageSizeOpts: [5, 10, 20, 50, 100],
      pageSize: 10,
      pageNum: 1,
      showSizer: true,
      total: 0,
      formCustom: {
        pageNum: 1,
        pageSize: 10,
      },
      findlistmsg: {},
      columns: [
        {
          title: "投诉时间",
          key: "createTime",
          minWidth: 140,
        },
        {
          title: "严重等级",
          width: 80,
          className: "colorbluer",
          key: "seriousLevel",
          render:(h,data)=>{
            var a='';
            switch(data.row.seriousLevel){
              case 0:
              a='低';
              break;
              case 1:
              a='中';
              break;
              case 2:
              a='高';
              break;
            };
            return h('span',{},a)
          }
        },
        {
          title: "公司名称",
          minWidth: 180,
          key: "memberName"
        },
        {
          title: "投诉人",
          width: 100,
          key: "userName"
        },
        {
          title: "联系方式",
          minWidth: 100,
          key: "phone"
        },
        {
          title: "投诉内容",
          minWidth: 180,
          key: "content"
        },
        {
          title: "产品",
          key: "productNames",
          minWidth: 150,
        },
        {
          title: "责任编辑",
          minWidth: 120,
          key: "editorName"
        },
        {
          title: "业务员",
          width: 100,
          key: "adminName",
        },
        {
          title:'处理结果',
          key:"status",
          minWidth: 100,
          render:(h,data)=>{
            var a='';
            switch(data.row.status){
              case 1:
              a=data.row.result;
              break;
              case 2:
              a='已撤销';
              break;
            };
            return h('span',{},a)
          }
        },
        {
          title: "记录人",
          minWidth: 150,
          key: "creatorName"
        },
        
      ],
      agreementmsg: [
        {}
      ]
    };
  },
  methods: {
     // nav切换
    navchange(index) {
      if (index == 0) {
        this.$router.push({
          name: "customerComplaint"
        });
      }
    },
    // 查询
    handleSubmit(name) {
     this.formCustom.pageNum=1;
      this.formCustom.pageSize = 10;
      // console.log(this.formCustom);
      this.getlist();
    },
    //重置
    handleReset() {
      // this.formCustom = {};
      this.formCustom.pageNum = 1;
      this.formCustom.pageSize = 10;
      this.departmentTitle = this.formCustom.content = this.formCustom.departmentId = this.formCustom.startTime = this.formCustom.endTime = '';
      this.searchTimes = [];
      this.getlist();
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

    //列表
    getlist(data) {
      let that = this;
      this.spinShow=true;
      this.formCustom.status=this.number;
      userComplainList(this.formCustom).then(resp => {
        // console.log(resp.response)
        that.spinShow=false;
        if (resp.status == 200) {
          let data = resp.response ? resp.response.list : [];
          for (var i = 0; i < data.length; i++) {
            data[i].createTime = timeStampChange.format(
              resp.response.list[i].createTime
            );
          }
          that.agreementmsg = data;
          that.total = resp.response ? resp.response.total : 0;
        }
      });
    },
    addComplaint(){
      this.$router.push({name:'addCustomerComplaint'})
    },
    // 模糊查找被投诉人
    remoteMethod1(query) {
      if (query !== "") {
        this.loading = true;
        let params = {
          adminName: query
        };
        getAdminList(params).then(res => {
          // console.log(query)
          this.loading = false;
          this.adminList = res.response;
        });
      }
    },
    // 选择日期
    changeDate(date){
      this.formCustom.startTime = formatStamp(date[0]) - 8 * 1000 * 60 * 60;
      this.formCustom.endTime = formatStamp(date[1]) + 16 * 1000 * 60 * 60 - 1000;
      console.log(date)
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
    change1(option){
      getAdminList({adminName:option.label}).then(res=>{
        this.formCustom.complainId=res.response[0].id
        this.formCustom.adminName=res.response[0].name
        // console.log(res)
      })
    },
    // 选择部门弹窗
    showtreeModal() {
      this.modaltree = true;
    },
    // 部门ok
    bmok() {
      if (this.hadselectbm.length === 1) {
        this.departmentTitle = this.hadselectbm[0].title;
        this.formCustom.departmentId = this.hadselectbm[0].id;
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
    getkf(data) {
      console.log(data);
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
    this.findlistmsg.pageSize = 10;
    this.findlistmsg.pageNum = 1;
    this.getlist(this.findlistmsg);
    this.tree();
  }
};
</script>
