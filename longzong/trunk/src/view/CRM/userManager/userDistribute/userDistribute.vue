<style lang="less" scoped>
.setNo {
  text-align: center;
}
</style>
<template>
  <Row>
    <Col span="24">
      <Row class-name="current-position">
        当前位置：用户关系管理&nbsp;&nbsp;>>&nbsp;&nbsp;用户分配
      </Row>
    </Col>
    <tab-header :tab-index="1"></tab-header>
    <Col span="24" class-name="search-form">
      <Form :model="formItem" :label-width="80">
        <Row type="flex" justify="space-between">
          <Col span="7">
            <FormItem label="公司名称:">
              <Select
                v-model="formItem.memberId"
                ref="input1"
                class="search-input"
                filterable
                remote
                :remote-method="remoteMethod2"
                @on-query-change="emptyQuery"
                :loading="loading">
                <Option v-for="(option, index) in options2" :value="option.id" :key="index"><{{option.id}}>{{option.name}}</Option>
              </Select>
            </FormItem>
          </Col>
          <!-- <Col span="7">
            <FormItem label="关注产品:">
              <Input v-model="formItem.product" class="search-input" placeholder="请输入关注产品"></Input>
            </FormItem>
          </Col> -->
          <Col span="7">
            <FormItem label="注册时间:">
              <DatePicker v-model="time"  format="yyyy/MM/dd" type="daterange" placeholder="请选择注册时间" class="search-input"></DatePicker>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="注册来源:">
              <Select v-model="formItem.regSource" class="form-select" placeholder="请选择注册来源">
                <Option v-for="item in customerSource" :value="item.value" :key="item.value">{{ item.desc }}</Option>
              </Select>
            </FormItem>
            
          </Col>
        </Row>
        <Row type="flex" justify="space-between">
          <Col span="7">
            <FormItem label="用户名:">
              <Input type="text" v-model="formItem.userName" class="search-input"></Input>
            </FormItem>  
          </Col>
          <Col span="14" class="text-right">
            <FormItem>
              <Button type="primary" @click="findListPage">查询</Button>
              <Button style="margin-left: 8px" @click="reset">重置</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Col>
    <Col span="24">
      <Row class-name="table-con">
        <div class="btn-container">
          <Button type="primary" class="search-btn" @click="distribute">分配</Button>
          <Button type="primary" class="search-btn" @click="set" v-if="isShow">设置代办</Button>
          <Button type="primary" class="search-btn" @click="cancelSet" v-if="isShowd">{{this.name}} 取消代办</Button>
        </div>
        <Table
          class="tableCommon"
          :data="tableData"
          :columns="columns"
          ref="dragTable"
          :stripe="true"
          :border="true"
          @on-selection-change="selectChange">
        </Table>

        <oil-page
          :total="total"
          :page-size="pageSize"
          @page-change="pageChange"
          :page-size-opts="pageSizeOpts"
          :show-sizer="showSizer">
        </oil-page>
      </Row>
    </Col>
    <Modal
    v-model="showModal"
    title="设置代办"
    width="620"
    @on-cancel="cancel">
    <Row>
      <Form :model="formItem" :label-width="100">
        <FormItem label="业务员:">
            <Select
             style="width:300px;"
              v-model="formItem.admin"
              ref="input2"
              class="search-input"
              filterable
              remote
              @on-query-change="removeQuery"
              :remote-method="remoteMethod1"
              :loading="loading">
              <Option v-for="(option, index) in options1" :value="option.value" :key="index">{{option.label}}</Option>
            </Select>
          </FormItem>
      </Form>
    </Row>
    <div slot="footer">
        <Button type="primary" class="search-btn" @click="ok">确定</Button>
        <Button class="search-btn" @click="cancel">返回</Button>
      </div>
  </Modal>
  <Modal
    v-model="showsModal"
    title="取消代办"
    width="420">
    <Row>
      <Col span="24" class="setNo">确定取消代办？</Col>
    </Row>
    <div slot="footer">
        <Button type="primary" class="search-btn" @click="noSet">确定</Button>
        <Button class="search-btn" @click="setCancel">返回</Button>
      </div>
  </Modal>
  </Row>
</template>
<script>
import TabHeader from "./tabHeader";
import OilPage from "../../../components/page/page.vue";
import {
  formData,
  formatStamp,
  formatTime,
  formatType
} from "../../../../assets/js/common.js";
import {
  getUserResource,
  getNewUserAllotList,
  memberSelectList,
  getFollow,
  getAdminList,
  getSetup,
  getCancel,
  checkAutomatic,
  checkHelp,
  isQueryMax
} from "../../../components/axios/crm.js";
export default {
  data() {
    return {
      loading1:true,
      isCustomer: false,
      name: "",
      showModal: false,
      showsModal: false,
      isShow: true,
      isShowd: false,
      total: 0,
      pageSize: 10,
      pageNum: 1,
      showSizer: true,
      pageSizeOpts: [5, 10, 20, 30],
      options1: [],
      options2: [],
      loading: false,
      customerSource: [],
      time: [],
      formItem: {
        isUserAllot: 1,
        memberName: "",
        regSource: ""
      },
      selection: [],
      tableData: [],
      userId: [],
      userIds: [],
      userIdstr: "",
      columns: [
        {
          type: "selection",
          width: 60
        },
        {
          key: "memberName",
          title: "公司名称",
          minWidth: 180
        },
        {       
          title: "联系人",
          minWidth: 100,
          render:(h,data)=>{
            if(data.row.mobile != null && data.row.mobile != ""){
              return h('span',data.row.userName+'('+data.row.mobile+')');
            } else {
              return h('span',data.row.userName);
            }
          }
        },
        {
          key: "registerTime",
          title: "注册时间",
          minWidth: 120
        },
        {
          key: "lastLoginTime",
          title: "最近登录时间",
          minWidth: 120
        },
        // {
        //   key: "browseRecords",
        //   title: "浏览记录",
        //   minWidth: 160
        // },
        {
          key: "regSource",
          title: "用户来源",
          minWidth: 120,
          render: (h, data) => {
            var text = '';
            this.customerSource.map(item=>{
              if(data.row.regSource==item.value){
                text=item.desc
              }
            })
            return h("span", {}, text);
          }
        },
        // {
        //   key: "customerName",
        //   title: "客服",
        //   minWidth: 100
        // },
        {
          key: "",
          title: "操作",
          minWidth: 120,
          render: (h, data) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    color: "#2d8cf0",
                    marginRight: "8px",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.oneDistribute(data);
                    }
                  }
                },
                "分配"
              ),
              h(
                "span",
                {
                  style: {
                    color: "#2d8cf0",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.follow(data);
                    }
                  }
                },
                "我要跟踪"
              )
            ]);
          }
        }
      ]
    };
  },
  components: {
    TabHeader,
    OilPage
  },
  created() {
    this.getUserResource();
    this.getListPage();
    this.isSet();
  },
  methods: {
    // 业务员下拉搜索
    remoteMethod1(query) {
      if (query !== "") {
        this.loading = true;
        let params = {
          adminName: query
        };
        setTimeout(() => {
          this.loading = false;
          getAdminList(params).then(res => {
            let list1 = res.response.map(item => {
              return {
                value: item.id,
                label: item.name
              };
            });
            this.options1 = list1;
          });
        }, 200);
      } else {
        this.options1 = [];
      }
    },
    // 获取公司名称下拉搜索
    remoteMethod2(query) {
      if (query !== "") {
        this.loading = false;
        let params = {
          isNotRlAdmin:2,
          memberName: query.replace(/\<.*?\>/g,'')
        };
        this.formItem.memberName=query.replace(/\<.*?\>/g,'');
        setTimeout(() => {
          this.loading = false;
          memberSelectList(params).then(res => {
            this.options2 = res.response;
          });
        }, 200);
      } else {
        this.options2 = [];
      }
    },
    findListPage(){
      this.pageNum=1;
      this.pageSize=10;
      this.getListPage();
    },
    // 获取列表数据
    getListPage() {
      this.$Spin.show();
      let params = {
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        isUserAllot: this.formItem.isUserAllot,
        memberId: this.formItem.memberId || "",
        memberName:this.formItem.memberName|| "",
        registerTimeStart: this.time[0] ? formatTime(this.time[0]) : "",
        registerTimeEnd: this.time[1] ? formatTime(this.time[1]) : "",
        regSource: formatType(this.formItem.regSource),
        userName:this.formItem.userName||'',
      };
      getNewUserAllotList(formData(params)).then(res => {
        //console.log(res);
        this.$Spin.hide();
        this.tableData = res.response.list;
        this.total = res.response.total;
      });
    },
    // 获取用户来源
    getUserResource() {
      getUserResource().then(res => {
        this.customerSource = res.response;
      });
    },
    // 重置
    reset() {
      this.$refs.input1.query = "";
      this.formItem = {
        isUserAllot: 1,
        userName:'',
      };
      this.time = [];
    },
    // 清空公司
    emptyQuery(query) {
      if (query == "") {
        this.formItem.memberName = "";
        return;
      }
    },
    // 分配
    distribute() {
      if(!this.isCustomer) {
        this.$Message.error('您不是客服人员，不能分配!')
        return
      }else{
        checkAutomatic().then(res => {
          // console.log(res.response)
        if (res.response == true) {
          this.$Message.warning("自动分配已开启,不能进行分配");
        } else {
          if (this.selection.length !== 0) {
            if (!window.localStorage) {
              this.$Message.warning("浏览器支持localstorage");
              return false;
            } else {
              let storage = window.localStorage;
              storage.setItem("longZhongCrmIsSign", 1);
              storage.setItem(
                "longZhongCrmIsUserAllot",
                this.formItem.isUserAllot
              );
              storage.setItem("longZhongCrmUserId", this.userIdstr);
            }
            this.$router.push({
              name: "allSalemen"
            });
          } else {
            this.$Message.warning("请勾选用户");
          }
        }
      });
      }
    },
    //单个分配
    oneDistribute(data) {
      if(!this.isCustomer) {
        this.$Message.error('您不是客服人员，不能分配!')
        return
      }else{
        checkAutomatic().then(res => {
          if (res.response == true) {
            this.$Message.warning("自动分配已开启,不能进行分配");
          } else {
            if (!window.localStorage) {
              this.$Message.warning("浏览器支持localstorage");
              return false;
            } else {
              let storage = window.localStorage;
              storage.setItem("longZhongCrmIsSign", 2);
              storage.setItem(
                "longZhongCrmIsUserAllot",
                this.formItem.isUserAllot
              );
              storage.setItem("longZhongCrmUserId", data.row.userId);
            }
            this.$router.push({
              name: "allSalemen"
            });
          }
        });
      }
    },
     //我要跟踪
    follow(data) {
      let that=this;
      this.loading1=true;
        this.$Modal.confirm({
        title: "跟踪用户",
        content: "<p>是否跟踪此用户？</p>",
        onOk: () => {
          if(!this.loading1){
            return
          }
          this.loading1=false;
          setTimeout(function(){
            that.loading1=true
          },1000)
          let form = {
            isUserAllot: this.formItem.isUserAllot,
            userId: data.row.userId
          };
          
          getFollow(formData(form)).then(res => {
            isQueryMax().then(res => {
              if (res.response.ableNum < 1) {
                this.$Message.success(
                  "跟踪成功"
                );
              } else {
                this.$Message.success("您的可分配数已达上限" + res.response.maxNum + "");
                this.getListPage();
              }
            });
          });
        },
        onCancel: () => {
          
        }
      });
    },
    // 校验是否设置代办
    isSet() {
      checkHelp().then(res => {
        if (res.response.backupAdminId) {
          this.isShow = false;
          this.isShowd = true;
          this.name = res.response.backupAdminName;
        }
        this.isCustomer = res.response.isCustomer
      });
    },
    // 打开设置代办弹窗
    set() {
      if(!this.isCustomer) {
        this.$Message.error('您不是客服人员，不能设置代办!')
        return
      }else{
        this.options1 = [];
        this.formItem.admin = "";
        this.showModal = true;
      }
    },
    // 取消设置代办弹窗
    cancelSet() {
      this.showsModal = true;
    },
    //确定代办
    ok() {
      //console.log(this.$refs.input2.query)
      if (this.$refs.input2.query == "") {
        this.$Message.warning("业务员不能为空");
      } else if (!this.formItem.admin) {
        this.$Message.warning("业务员不存在");
      } else {
        getSetup(this.formItem.admin).then(res => {
          this.name = this.formatTypeName(this.formItem.admin);
          this.$Message.success(res.message);
          this.showModal = false;
          this.isShow = false;
          this.isShowd = true;
        });
      }
    },
    // id换name
    formatTypeName(id) {
      let name = "";
      this.options1 && this.options1.length > 0
        ? this.options1.map(item => {
            if (item.value == id) {
              name = item.label;
              return;
            }
          })
        : "";
      return name;
    },
    // 清空业务员框
    removeQuery(query) {
      if (query == "") {
        this.formItem.admin = "";
      }
    },
    // 取消代办
    noSet() {
      getCancel().then(res => {
        this.$Message.success(res.message);
        this.showsModal = false;
        this.isShow = true;
        this.isShowd = false;
      });
    },
    //关闭设置代办弹窗
    cancel() {
      this.showModal = false;
      this.options1 = [];
      this.$refs.input2.query = "";
      this.formItem.admin = "";
    },
    //关闭取消代办弹窗
    setCancel() {
      this.showsModal = false;
    },
    // 获取勾选的数据
    selectChange(selection) {
      this.selection = selection;
      this.selection.map(item => {
        this.userId.push(item.userId);
      });
      this.userIds = [...new Set(this.userId)];
      this.userIdstr = this.userIds.join(",");
      // console.log(this.userIdstr)
    },
    // 监听分页
    pageChange(page, pageSize) {
      if (page) {
        this.pageNum = page;
      }
      if (pageSize) {
        this.pageSize = pageSize;
      }
      this.getListPage();
    }
  }
};
</script>

