<style lang="less" scoped>
  .myUserInfo {
    background: #ffffff;
  }
  .my-customer-top {
    padding: 30px 20px !important;
  }
</style>

<template>
  <Row>
    <Col span="24">
      <Row class-name="current-position">
        当前位置：客户关系&nbsp;&nbsp;>>&nbsp;&nbsp;用户信息&nbsp;&nbsp;>>&nbsp;&nbsp;用户信息
      </Row>
    </Col>
    
    <Col span="24" class="myUserInfo">
      <Row>
        <Col span="24" class="my-customer-top">
          <top-customer></top-customer>
        </Col>
      </Row>
      <Row class-name="table-con">
        <div class="btn-container">
          <Button type="primary" class="search-btn" @click="addUser">添加账户</Button>
        </div>
        <Table class="tableCommon" :data="tableData" :columns="columns" ref="dragTable" :stripe="true" :border="true" >

        </Table>
        <div class="page-con">
          <span>第{{pageNum}}页 / 共{{Math.ceil(dataCount / pageSize)}}页 每页{{pageSize}}条 共{{dataCount}}条</span>
          <Page
            :total="dataCount"
            :page-size="pageSize"
            show-sizer
            show-elevator
            :page-size-opts="pageSizeOpt"
            @on-change="changePageNum"
            @on-page-size-change="changePageSize"
            class="pull-right"/>
        </div>
      </Row>
    </Col>
    <Modal v-model="tertimModal" title="编辑 跟踪延期" @on-ok="terTime" @on-cancel="tertimCancel" width="700">
    <Row>
      <Form :label-width="130" :model="terForm">
        <Row>
          <Col span="12">
              <FormItem label="跟踪延期：" prop="competitorTimes">
                    <DatePicker v-model="terForm.values" type="daterange" :options="options2" class="search-input" placeholder="Select date"></DatePicker>
              </FormItem>
          </Col>
        </Row>    
     </Form>
    </Row>
    </Modal>
    <add-user-modal @getUserList='getUserList' :showAddModal="showAddModal" @hide-modal="hideAddModal"></add-user-modal>
    <edit-user-modal   @getUserList='getUserList' :showEditModal="showEditModal" @hide-modal="hideEditModal" :editData="editData"  ref="editModal"></edit-user-modal>
    <Spin size="large" fix v-if="spinShow"></Spin> 
  </Row>
</template>

<script>
import addUserModal from './addUser.vue'
import editUserModal from './editUser.vue'
import topCustomer from './myCustomer/top.vue'
import {rts} from '../components/jsonp/oilJsonp.js'
import axios from "axios";
export default {
  name: "userInfo",
  components: {
    addUserModal,
    editUserModal,
    topCustomer,
  },
  data() {
    return {
      spinShow:false,
      loading: false,
      showAddModal: false,
      showEditModal: false,
      tertimModal:false ,
      competitorTimes:'',
      username:"",
      options2: {
        shortcuts: [
          {
              text: '1星期',
              value () {
                  const end = new Date();
                  const start = new Date();
                  end.setTime(end.getTime() + 3600 * 1000 * 24 * 7);
                  return [start,end];
              }
          },
          {
              text: '半个月',
              value () {
                  const end = new Date();
                  const start = new Date();
                  end.setTime(end.getTime() + 3600 * 1000 * 24 * 15);
                  return [start,end];
              }
          },
          {
              text: '1个月',
              value () {
                  const end = new Date();
                  const start = new Date();
                  end.setTime(end.getTime() + 3600 * 1000 * 24 * 30);
                  return [start,end];
              }
          },
          
      ]
    },
      columns: [
        {
          key: "realName",
          title: "姓名",
          align: "center",
        },
        {
          key: "username",
          align: "center",
          title: "用户名"
        },
        {
          key: "type",
          align: "center",
          title: "用户类型",
          width:50
        },
        {
          key: "mobile",
          align: "center",
          title: "手机",
        },
        {
          key: "userManagerDetailVOs",
          align: "center",
          title: "业务员",
          render:(h,data) => {
          let name = [];
          data.row.userManagerDetailVOs.map((item,index) =>{
            name.push(item.adminId)
          })
            return h(
              "span",name
            );
          }
        },
        {
          key: "isCompetitor",
          align: "center",
          title: "是否竞争对手用户",
        },
        {
          key: "states",
          align: "center",
          title: "状态",
          render:(h,data) => {
          let status = [];
          data.row.userManagerDetailVOs.map((item,index) =>{
            status.push(item.status)
          })
            return h(
              "span",status
            );
          }
        },
        {
          key: "isMain",
          align: "center",
          title: "主用户"
        },
        {
          key: "accountNo",
          align: "center",
          title: "可创建子用户",
        },
        {
          key: "isExtendFormal",
          align: "center",
          title: "继承正式权限",

        },
        {
          key: "isExtendTrial",
          align: "center",
          title: "继承试阅权限",
        },
        {
          key: "competitorTime",
          align: "center",
          title: "产品期限",
          width: 250,
          render: (h, data) => {
            let products = [];
            let obj = {
              name :'',
              startTime:'',
              endTime:''
            }
            data.row.userProductVOs.map((item,index) =>{
              let timestamp2 = new Date(item.startTime);
              let timestamp3 = new Date(item.endTime);
              let timed1 = timestamp2.toLocaleDateString().replace(/\//g, "-") ;
              let times1 = timestamp3.toLocaleDateString().replace(/\//g, "-") ;
              obj.name = item.productNameCn
              obj.startTime = timed1
              obj.endTime = times1
              let arr = obj.name + '(' + obj.startTime + '至' + obj.endTime+')'
              products.push(arr);
            });
            return h(
              "div",
              [
                h("div",{style: {
                    marginRight: "8px",
                    color: "red",
                    cursor: "pointer"
                  },on: {
                    click: () => {
                      this.nextProductCenter()
                    }
                  } 
                },products.join(',')),
              ]
            );
          }
        },
        {
          key: "trackTerm",
          align: "center",
          title: "跟踪期限",
          width:210,
          render:(h,data) => {
            const timeStart = [];
            const timeEnd = [];
            data.row.userManagerDetailVOs.map((item,index) =>{
              var timestamp4 = new Date(item.serviceStartTime);
              var timestamp5 = new Date(item.serviceEndTime);
              var timed = timestamp4.toLocaleDateString().replace(/\//g, "-") + " " + timestamp4.toTimeString().substr(0, 8);
              var times = timestamp5.toLocaleDateString().replace(/\//g, "-") + " " + timestamp5.toTimeString().substr(0, 8);
              timeStart.push(timed);
              timeEnd.push(times);
            }) 
            return h(
              "div",[
                h("div",{style: {
                    marginRight: "8px",
                    color: "red",
                    textDecoration: "underline",
                    cursor: "pointer"
                  }},timeStart),
                h("div",{style: {
                    marginRight: "8px",
                    color: "red",
                    textDecoration: "underline",
                    cursor: "pointer"
                  }},timeEnd),
                h("div",{style: {
                    marginRight: "8px",
                    color: "blue",
                    textDecoration: "underline",
                    cursor: "pointer"
                  }, 
                  on: {
                    click: () => {
                      this.showtrackTerm(data);
                    }
                  }},'跟踪延期'),
                 
              ]
            );
          }
        },
        {
          key: "loginTime",
          align: "center",
          title: "最后登录",
          render:(h,data) => {
            let time2 = [];
            var timestamp6 = new Date(data.row.loginTime);
            var timeds = timestamp6.toLocaleDateString().replace(/\//g, "-") + " " + timestamp6.toTimeString().substr(0, 8);
            time2.push(timeds)
            return h(
              "span",time2
            );
          }
        },
        {
          title: "操作",
          align: "center",
          width: 120,
          render: (h, data) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    marginRight: "8px",
                    color: "blue",
                    textDecoration: "underline",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.editUser(data);
                    }
                  }
                },
                "编辑"
              ),
              h(
                "span",
                {
                  style: {
                    marginRight: "8px",
                    color: "blue",
                    textDecoration: "underline",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      //this.editData(data)
                      this.success(data.row.mobile)
                    }
                  }
                },
                "重置密码"
              ),
              h(
                "span",
                {
                  style: {
                    marginRight: "8px",
                    color: "blue",
                    textDecoration: "underline",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.isUsing(data)
                    }
                  }
                },
                `${data.row.disabled === 0 ? '禁用' : '激活'}`
              ),
              h(
                "span",
                {
                  style: {
                    color: "blue",
                    textDecoration: "underline",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      //this.showVersion(data)
                    }
                  }
                },
                "权限试用"
              )
            ]);
          }
        }
      ],
      tableData: [],
      showSizer: true,
      dataCount: 0,
      pageSize: 2,
      pageNum: 1,
      pageSizeOpt: [2, 5, 10, 20],
      editData: {},
      dataRow:{},
      terForm:{
      values:[],
      },
    };
  },
  created() {
    this.getUserList()
  },
  methods: {
    addUser () { // 打开新增弹窗
      this.showAddModal = true;
    },
    editUser (data) { // 打开修改弹窗
      this.showEditModal = true;
      this.editData = data.row;
    },
    showtrackTerm(data) { //打开跟踪期限弹窗
      this.tertimModal = true;
      this.dataRow = data.row;
    },
    tertimCancel() {
      this.tertimModal = false;
    },
    terTime() {
      let endsTime = '';
      if(this.terForm.values.length == 0){
        endsTime = '';
      }else{
        if(this.terForm.values[0] == ''){
          endsTime = '';
        }
        if(this.terForm.values[1] == ''){
          endsTime = '';
        }else{
          endsTime = new Date(this.terForm.values[1]).getTime()
        }
      }
      let list = '';
      this.dataRow.userManagerDetailVOs.map(item => {
        if(item.isMainAdmin == 1 ){
           list = item.adminId;
        }
      })
      let form = {
        userId: this.dataRow.id,
        adminId: list,
        delayServiceEndTime: endsTime
      }
      axios({
        url:'/crm/usermanagerdelayapply/save',
        method: 'post',
        data:form,
      }).then(resp => {
        if(resp.data.status === '200'){
          this.$Message.success(resp.data.message)
        }else{
          this.$Message.warning(resp.data.message)
        }
      }).catch(err => {
        console.log(err);
      })
    },
    hideAddModal () {
      // 隐藏新增弹窗
      this.showAddModal = false;
    },
    hideEditModal () {
      // 隐藏修改弹窗
      this.showEditModal = false;
    },
    nextDbDetail () {
      this.$router.push({
        name: ''
      });
    },
    nextProductCenter () {
      this.$router.push({
        name: 'productManager'
      });
    },
    success (data){
      this.$Message.success('已成功发送至手机'+data)
    },
    isUsing (data){
      var ids = parseInt(data.row.id);
      var disabled =parseInt(data.row.disabled);
      //console.log(typeof(ids),typeof(disabled))
      //console.log(ids,disabled)
      axios({
        url:'/crm/userbase/disabled',
        method: 'get',
        params: {
          id: ids,
          disabled: disabled
        }
      }).then(resp => {
        if(resp.data.status == '200'){
          this.$Message.success(resp.data.message)
          const {index,row} = data;
          if (row.disabled === 1) {
            this.tableData[index].disabled = 0
          } else {
            this.tableData[index].disabled = 1
          }
        }else{
          this.$Message.warning(resp.data.message);
          console.log(resp.data.message)
        }
      }).catch(resp =>{
         //console.log(err);
      })
      
    },
    getUserList (){
      let _this = this;
      this.spinShow=true;
      let params = {
          order:'desc',
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          sort:''
        }
      axios({
        url:'/crm/userbase/user_list',   
        method: 'post',   
        params: params  
         }).then(resp => {
        //console.log(resp);
        _this.tableData = resp.data.response.list;
        _this.dataCount = resp.data.response.total;
        _this.spinShow=false;
      }).catch(err => {
        console.log(err);
        //  _this.spinShow=false;
      })
    },

    changePageNum (current) {
      this.pageNum = current
      this.getUserList()
    },
    // 监听修改显示条数
    changePageSize (size) {
      this.pageSize = size
      this.getUserList()
    },

  },
  mounted() {
    // 1
  }
};
</script>
