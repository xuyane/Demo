<style lang="less" >

  .navcontainer {
    padding-right: 20px;
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
  .action-a{
    float: left;
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
              <FormItem label="关键字：" :label-width="100">
                <Input type="text" v-model="formCustom.content" class="search-input"></Input>
              </FormItem>
              </Col>
              <Col span='7'>
              <FormItem label="所属部门：" :label-width="100">
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
              <Col span='7'>
              <FormItem style="text-align:right" >
                <Button type="primary" @click="handleSubmit">查询</Button>
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
        <Row>
          <Table class="tableCommon" border :columns="columns" :data="agreementmsg" ></Table>
          <oil-page :total="total" :page-size="formCustom.pageSize" @page-change="pageChange" :page-size-opts="pageSizeOpts" :show-sizer="showSizer" class="pagebox"></oil-page>
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
    <!-- 指派 -->
    <Modal v-model="pointModal" title="指派" width="650">
      <Row type="flex" justify="space-between">
        <Col span='24'>
        <Form :label-width="85">
          <Col span='12'>
          <Tree :data="datatree" @on-select-change='selectbm2'></Tree>
          </Col>
          <Col span='12'>
          <FormItem label="部门人员">
            <Select
              v-model="adminName"
              ref="input1"
              class="search-input"
              filterable
              remote
              transfer
              label-in-value
              @on-change="change5"
              :remote-method="remoteMethod5"
              :loading="loading">
              <Option v-for="(item, index) in apointadminList" :value="item.id" :key="index">{{item.name}}</Option>
            </Select>
          </FormItem>
          </Col>
        </Form>
        </Col>
      </Row>
      <div slot="footer">
        <i-button type="primary" @click="adminPoint2">确定</i-button>
        <i-button @click="pointModal=false">取消</i-button>
      </div>
    </Modal>
    <!-- 处理 -->
    <Modal v-model="resultModal" title="处理">
      <Form :model="handle" ref="handle">
        <FormItem label="处理意见：" :label-width="100">
          <Input type="textarea" v-model="handle.result"></Input>
          <span>您当前已输入{{handle.result.length}}个字符</span>
        </FormItem>
      </Form>
      <div slot="footer">
        <i-button type="primary" @click="handleResult">确定</i-button>
        <i-button @click="resultModal=false">取消</i-button>
      </div>
    </Modal>
    <!-- 撤销 -->
    <Modal v-model="cancelModal" title="提示信息">
      <p style="text-align: center;">您确定撤销？</p>
      <div slot="footer">
        <i-button type="primary" @click="isCancel">确认</i-button>
        <i-button type="default" @click="cancelModal=false">取消</i-button>
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
    userComplainList,//获取列表
    productList,
    getAdminList,//业务员
    userComplainCancel,//撤销
    userComplainAppoint,//指派
    userComplainHandle,//处理
    orgTree,
    queryAdminListByOrgCode
  } from "../../components/axios/crm.js";
  import associateSearch from "../../components/associateSearch/getAssociateSearch.vue";
  import dial from '@/assets/js/linkDial.js';
  export default {
    name: "myAgreement",
    components: {
      oilPage,
      associateSearch
    },
    watch: {
      pointModal(newVal,oldVal){
        if(newVal == true){
          this.adminName='';
        }
      },
    },
    data() {
      return {
        spinShow:false,
        value2:[],
        params:{
          pageNum: 1,
          pageSize: 10,
        },
        handle:{
          result:'',
          id:''
        },
        formCustom: {
          pageNum: 1,
          pageSize: 10,
        },
        trees:'',
        searchTimes: [],
        apointadminList:[],
        departmentTitle: '',    // 所属部门名称
        adminPoint:'',
        adminPointId:'',
        adminDeptId:'',
        adminDeptValue:'',
        id:'',
        number:0,
        items: [{ name: "未处理", id: 0 }, { name: "已处理", id: 1 }],
        hadselectbm: '',
        modaltree: false,
        datatree: [],
        adminList:[],
        loading:false,
        adminName:'',
        resultModal:false,
        pointModal:false,
        cancelModal:false,
        result:'',
        companyData: "",
        selectitem: [],
        produceList: [], //选购产品列表
        pageSizeOpts: [5, 10, 20, 50, 100],
        showSizer: true,
        total: 0,
        issure: {},
        orgCode:'',
        modal1: false,
        ruleCustom: {},
        columns: [
          {
            title: "投诉时间",
            key: "createTime",
            minWidth: 160,
          },
          {
            title: "严重等级",
            minWidth: 80,
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
            minWidth: 100,
            key: "userName"
          },
          {
            title: "联系方式",
            minWidth: 100,
            key: "phone",
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
                      this.onDial(data.row.phone);
                    }
                  }
                },
                data.row.phone
              )
            ]);
          }
          },
          {
            title: "投诉内容",
            minWidth: 180,
            key: "content"
          },
          {
            title: "产品",
            key: "productNames",
            ellipsis: true,
            tooltip: true,
            minWidth: 150,
          },
          {
            title: "责任编辑",
            minWidth: 120,
            key: "editorName"
          },
          {
            title: "业务员",
            minWidth: 100,
            key: "adminName",
          },
          {
            title: "记录人",
            minWidth: 100,
            key: "creatorName"
          },
          {
            title: "操作",
            key: "action",
            minWidth: 120,
            className: "colorbluer",
            align: "center",
            render: (h, data) => {
              return h("div",{
                style:{
                  display: "flex"
                }
              },[
                h("a",{
                  props: {
                    type: "text",
                    size: "small",
                    
                  },
                  style:{
                    display: data.row.appointAuth === true ? 'block' : 'none',
                    marginRight:"8px"
                  },
                  on: {
                    click: () => {
                      this.pointModal=true;
                      console.log(data.row)
                      this.adminPointId=data.row.id
                    }
                  }
                }," 指派 "),
                h("a",{
                  props: {
                    type: "text",
                    size: "small",
                    
                  },
                  style:{
                    display: data.row.cancelAuth === true ? 'block' : 'none',
                    marginRight:"8px"
                  },
                  on: {
                    click: () => {
                      this.cancelModal=true;
                      this.id=data.row.id
                    }
                  }
                }," 撤销 "),
                h("a",{
                  props: {
                    type: "text",
                    size: "small",
                    
                  },
                  style:{
                    display: data.row.handleAuth === true ? 'block' : 'none'
                  },
                  on: {
                    click: () => {
                      this.handle.id=data.row.id
                      this.resultModal=true;
                    }
                  }
                }," 处理 "),
              ]);
            }
          }
        ],
        agreementmsg: [

        ]
      };
    },
    methods: {
      // nav切换
      navchange(index) {
        if (index == 1) {
          this.$router.push({
            name: "handledComplain"
          });
        }
      },
      // 指派
      adminPoint2() {
        let form={
          "employeeIds[]":[
            this.adminDeptId,
            this.adminName,
          ],
          id:this.adminPointId
        };
        userComplainAppoint(formData(form)).then(res=>{
          this.pointModal=false
          if(res.status == 200){
            this.$Message.success("指派成功！")
            this.getlist();
          }else{
            this.$Message.error(res.message)
          }
        })
      },
      // 部门复选框
      selectbm2(data) {
        this.orgCode=data[0].code;
        this.adminDeptId=data[0].id;
      },
      // 处理
      handleResult(){
        let form={
          result:this.handle.result,
          id:this.handle.id,
        };
        userComplainHandle(formData(form)).then(res=>{
          this.resultModal=false
          if(res.status == 200){
            this.$Message.success("处理成功！")
            this.getlist();
          }else{
            this.$Message.error("请输入处理意见")
          }
        })
      },
      // 撤销
      isCancel(){
        console.log(this.id)
        userComplainCancel(formData({id:this.id})).then(res=>{
          this.cancelModal=false
          if(res.status == 200){
            this.$Message.success("撤销成功!")
            this.getlist();
          }else{
            this.$Message.error(res.message)
          }
        })
      },
      change1(option){
        getAdminList({adminName:option.label}).then(res=>{
          this.formCustom.complainId=res.response[0].id
          this.formCustom.adminName=res.response[0].name
          // console.log(res)
        })
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
      change5(option){
        console.log(this.adminName)

      },
      remoteMethod5(){
        queryAdminListByOrgCode({orgCode:this.orgCode}).then(res=>{
          this.apointadminList=res.response;

        })
      },

      // 查询
      handleSubmit() {
        this.formCustom.pageNum=1;
        this.formCustom.pageSize = 10;
        // console.log(this.formCustom);
        this.getlist();
      },
      // 选择日期
      changeDate(date){
        this.formCustom.startTime = formatStamp(date[0]) - 8 * 1000 * 60 * 60;
        this.formCustom.endTime = formatStamp(date[1]) + 16 * 1000 * 60 * 60 - 1000;
        console.log(date)
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
          this.formCustom.pageNum = page;
        }
        if (pageSize) {
          this.pageSize = pageSize;
          this.formCustom.pageSize = pageSize;
        }
        this.getlist();
      },

      //列表
      getlist() {
        let that = this;
        this.spinShow=true;
        this.formCustom.status=this.number;
        this.formCustom.times = new Date().getTime();
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
      // 新增投诉链接
      addComplaint(){
        this.$router.push({name:'addCustomerComplaint'})
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
          // console.log("表格",this.datatree[0].code);
        });
      },
      // 部门复选框
      selectbm(data){
        console.log(data);
        if (data){
          this.hadselectbm = data;
        }
      },
      breedDigui(data) {
        let dgData = data.map(item => {
          if (item.children && item.children.length > 0) {
            return {
              title: item.label,
              // disabled: true,
              id: item.id,
              code: item.value,
              children: this.breedDigui(item.children)
            };
          } else {
            return {
              title: item.label,
              id: item.id,
              code: item.value
              // disabled: false
            };
          }
        });
        return dgData;
      },
      // 呼出
    onDial(phone) {
      dial(phone, res => {
        this.$Notice.success({title: '呼叫成功：' + phone})
      });
    },
    },
    created() {
      // this.$Spin.show();
      // this.findlistmsg.pageSize = 10;
      // this.findlistmsg.pageNum = 1;
      this.getlist();
      this.tree();
    }
  };
</script>
