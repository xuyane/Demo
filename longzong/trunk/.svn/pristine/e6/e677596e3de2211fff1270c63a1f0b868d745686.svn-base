<style>
.navbox {
  margin-bottom: 20px;
}

.produce .ivu-select-selection {
  height: auto !important;
}
</style>
<template>
  <Row class="varietybox">
    <i-col span="24">
      <Row
        class-name="current-position"
      >当前位置：客户关系管理&nbsp;&nbsp;>>&nbsp;&nbsp;系统配置&nbsp;&nbsp;>>&nbsp;&nbsp;通话限制</Row>
    </i-col>
    <Col span="24">
      <Row :gutter="20">
        <Col span="24">
          <Card style="margin-bottom:20px" class-name="search-form">
            <div>
              <Form ref="formCustom" :model="formCustom" :label-width="80" :rules="ruleValidate">
                <Row type="flex" justify="space-between">
                  <Col span="7">
                    <FormItem label="公司名称:" :label-width="100">
                      <associate-Search
                        ref="companyRef"
                        @query-list="companyTypeFunction"
                        :dataUrl="url"
                        :parameterName="name"
                      ></associate-Search>
                    </FormItem>
                  </Col>
                  <Col span="7">
                    <FormItem label="用户姓名:" :label-width="100">
                      <!-- <Input type="text" v-model="formCustom.userName" class="search-input"></Input> -->
                      <!-- <associate-Search ref='usernameRef' @query-list="userTypeFunction" :dataUrl="urluser" :parameterName='nameuser' ></associate-Search> -->
                      <Select
                        v-model="formCustom.userName"
                        filterable
                        remote
                        :remote-method="userremoteMethod"
                        :loading="loading4"
                        clearable
                        @on-clear="clearusername"
                        ref="realnameref"
                      >
                        <Option
                          v-for="(option, index) in useroptions"
                          :value="option.label"
                          :key="index"
                        >{{option.label}}</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  <Col span="7">
                    <FormItem label="用户电话:" :label-width="100" prop="userPhone">
                      <Input
                        type="text"
                        v-model="formCustom.userPhone"
                        clearable
                        class="search-input"
                      ></Input>
                    </FormItem>
                  </Col>
                </Row>
                <Row type="flex" justify="space-between">
                  <Col span="7">
                    <FormItem label="业务员:" :label-width="100">
                      <associate-Search
                        @query-list="getkf"
                        :dataUrl="url1"
                        :parameterName="name1"
                        ref="kfref"
                      ></associate-Search>
                    </FormItem>
                  </Col>
                  <Col span="7">
                    <FormItem style="text-align:right">
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
              <Col span="2">
                <Button type="primary" @click="addwhiteModal">新增用户白名单</Button>
              </Col>
            </Row>
            <Row>
              <Table class="tableCommon" border :columns="columns" :data="lists"></Table>
              <oil-page
                :total="total"
                :page-num="findlistmsg.pageNum"
                :page-size="findlistmsg.pageSize"
                @page-change="pageChange"
                :page-size-opts="pageSizeOpts"
                :show-sizer="showSizer"
                class="pagebox"
              ></oil-page>
            </Row>
          </Card>
        </Col>
      </Row>
    </Col>
    <Modal v-model="addwhite" title="新增用户白名单" @on-cancel="cancel" width="500">
      <div class-name="search-form" style="width:80%;margin:auto">
        <Form :model="addcon" ref="addcon" :label-width="100" :rules="ruleValidate">
          <FormItem label="公司名称:">
            <associate-Search
              ref="breedDataRefadd"
              @query-list="addcompanyTypeFunction"
              :dataUrl="url"
              :parameterName="name"
            ></associate-Search>
          </FormItem>
          <FormItem label="用户姓名:" :label-width="100">
            <Select v-model="addcon.userId" ref="selectitem">
              <Option
                v-for="(item,index) in userList"
                :value="item.id"
                :key="index"
              >{{item.realName}}</Option>
            </Select>
          </FormItem>
          <FormItem label="业务员姓名:" prop="adminIds" class="produce">
            <Select
              v-model="addcon.adminIds"
              multiple
              filterable
              remote
              :remote-method="remoteMethod2"
              :loading="loading2"
            >
              <Option
                v-for="(option, index) in options2"
                :value="option.value"
                :key="index"
              >{{option.label}}</Option>
            </Select>
          </FormItem>
          <FormItem label="用户电话:" prop="phone">
            <Input class="search-input" v-model="addcon.phone" type="text"></Input>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button type="text" size="large" @click="cancel">取消</Button>
        <Button type="primary" size="large" @click="addok">确定</Button>
      </div>
    </Modal>
    <Modal v-model="editwhite" title="编辑用户白名单" @on-cancel="editcancel" width="500">
      <div class-name="search-form" style="width:80%;margin:auto">
        <Form :model="editcon" ref="editcon" :label-width="100" :rules="ruleValidate">
          <FormItem label="公司名称:">
            <associate-Search
              ref="breedDataRefEdit"
              @query-list="editcompanyTypeFunction"
              :dataUrl="url"
              :parameterName="name"
            ></associate-Search>
          </FormItem>
          <FormItem label="用户姓名:">
            <Select v-model="editcon.userId">
              <Option
                v-for="(item,index) in editconuserList"
                :value="item.id"
                :key="index"
              >{{item.realName}}</Option>
            </Select>
          </FormItem>
          <FormItem label="业务员姓名:" prop="adminIds" class="produce">
            <Select
              v-model="editcon.adminIds"
              filterable
              remote
              :remote-method="remoteMethod3"
              :loading="loading3"
              @on-change="editsalename"
            >
              <Option
                v-for="(option, index) in editoptions2"
                :value="option.value"
                :key="index"
              >{{option.label}}({{option.mobile}})</Option>
            </Select>
          </FormItem>
          <FormItem label="用户电话:" prop="phone">
            <Input class="search-input" v-model="editcon.phone" type="text"></Input>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button type="text" size="large" @click="editcancel">取消</Button>
        <Button type="primary" size="large" @click="editok">确定</Button>
      </div>
    </Modal>
    <Spin size="large" fix v-if="spinShow"></Spin>
  </Row>
</template>

<script>
import oilPage from "../../components/page/page.vue";
import { formData } from "../../../assets/js/common.js";
import associateSearch from "../../components/associateSearch/getAssociateSearch.vue";
import dial from "@/assets/js/linkDial.js";
import axios from "axios";
import {
  userCallWhite, // 获取用户白名单信息列表
  saveUserCallwhite, // 保存用户白名单
  editWhiteMsg, // 修改用户白名单信息
  cancelWhiteMsg, //作废
  effectWhiteMsg, //激活
  userSelectList, //用户名
  adminListName, //业务员
  getUsersByMemberId, //根据会员id获取用户信息列表
  iscalloutWhiteMsg //根据业务员，管理员，手机号判断能否呼出
} from "../../components/axios/crm.js";
export default {
  components: {
    oilPage,
    associateSearch
  },
  data() {
    // const validatephone = (rule, value, callback) => {
    //   if (!value) {
    //     callback(new Error("用户姓名不能为空"));
    //   } else {
    //     callback();
    //   }
    // };
    const validateadminIds = (rule, value, callback) => {
      if (!value) {
        callback(new Error("业务员姓名不能为空"));
      } else {
        callback();
      }
    };
    return {
      spinShow:false,
      useroptions: [],
      loading4: false,
      urluser: "/crm/common/query-user-select-list",
      nameuser: "realName",
      editoptions2: [],
      loading3: false,
      editconuserList: [],
      userList: [],
      model14: [],
      loading2: false,
      options2: [],
      editoptions: [],
      url1: "/crm/common/query-adminList-by-name",
      name1: "adminName",
      model13: "",
      model1name: "",
      loading1: false,
      options1: [],
      name: "memberName",
      url: "/crm/common/query-member-select-list", //根据会员名称模糊匹配下拉选择列表
      editcon: {
        phone: ""
      },
      addcon: {
        phone: ""
      },
      editindex: "",
      addwhite: false,
      editwhite: false,
      formCustom: {},
      ruleValidate: {
        phone: [
          {
            type: "string",
            message: "用户号码不能为空",
            trigger: "blur",
            required: true
          },
          {
            required: true,
            pattern:
              "^((((\\+\\d{2})?0\\d{2,3})?\\d{7,8})|((\\+\\d{2}-)?0\\d{2,3}-\\d{7,8})|([1][0-9][0-9]\\d{8}))$",
            message: "电话号码格式不正确,格式：11位手机，区号+7~8位号码",
            trigger: "blur"
          }
        ],
        // userPhone: [
        //   {
        //     required: false,
        //     message: "用户电话格式不正确",
        //     trigger: "blur",
        //     pattern:
        //       "^(((\\+\\d{2}-)?0\\d{2,3}-\\d{7,8})|((\\+\\d{2}-)?(\\d{2,3}-)?([1][3,4,5,7,8][0-9]\\d{8})))$"
        //   }
        // ],
        // adminPhone: [
        //   {
        //     required: false,
        //     message: "业务员电话格式不正确",
        //     trigger: "blur",
        //     pattern:
        //       "^(((\\+\\d{2}-)?0\\d{2,3}-\\d{7,8})|((\\+\\d{2}-)?(\\d{2,3}-)?([1][3,4,5,7,8][0-9]\\d{8})))$"
        //   }
        // ],
        // memberNameCn: [
        //   {
        //     required: true,
        //     type: "string",
        //     message: "公司名称不能为空",
        //     trigger: "blur"
        //   }
        // ],
        // userId: [
        //   {
        //     required: true,
        //     trigger: "change",
        //     validator: validatephone
        //   }
        // ],
        // userPhone: [
        //   {
        //     required: true,
        //     type: "string",
        //     message: "用户手机号不能为空",
        //     trigger: "blur"
        //   },
        //   {
        //     required: true,
        //     message: "用户手机号不正确",
        //     trigger: "blur",
        //     pattern:
        //       "^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\\d{8}$"
        //   }
        // ],
        adminIds: [
          {
            required: true,
            validator: validateadminIds,
            message: "业务员姓名不能为空",
            trigger: "blur"
          }
        ]
        // adminPhone: [
        //   {
        //     required: true,
        //     type: "string",
        //     message: "可呼出号码不能为空",
        //     trigger: "blur"
        //   },
        //   {
        //     required: true,

        //     message: "可呼出号码不正确",
        //     trigger: "blur",
        //     pattern:
        //       "^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\\d{8}$"
        //   }
        // ]
      },
      pageSizeOpts: [10, 20, 50, 100, 200],
      pageSize: 10,
      pageNum: 1,
      showSizer: true,
      total: 0,
      findlistmsg: {
        pageSize: 10,
        pageNum: 1
      },
      columns: [
        {
          title: "用户姓名",
          minWidth: 150,
          key: "userName"
        },
        {
          title: "公司名称",
          minWidth: 150,
          key: "memberNameCn"
        },
        {
          title: "用户电话",
          minWidth: 150,
          key: "userPhone",
          render: (h, data) => {
            return h(
              "a",
              {
                on: {
                  click: () => {
                    this.onDial(data);
                  }
                }
              },
              data.row.userPhone
            );
          }
        },
        {
          title: "可呼出业务员",
          minWidth: 150,
          key: "adminPhone",
          render: (h, data) => {
            var b = data.row.adminName + "-" + data.row.adminPhone;
            if (data.row.adminPhone == "") b = data.row.adminName;
            return h("div", [
              h(
                "span",
                {
                  style: {
                    // color: '#145edb',
                    // textDecoration: 'underline',
                    // cursor: 'pointer',
                    // marginRight: '20px'
                  }
                },
                b
              )
            ]);
          }
        },
        {
          title: "操作",
          minWidth: 150,
          key: "action",
          render: (h, data) => {
            if (data.row.status == "0") {
              return h("div", [
                h(
                  "a",
                  {
                    style: {
                      // color: '#145edb',
                      // textDecoration: 'underline',
                      // cursor: 'pointer',
                      marginRight: "20px"
                    },
                    on: {
                      click: () => {
                        this.edit(data);
                      }
                    }
                  },
                  "编辑"
                ),
                h(
                  "a",
                  {
                    style: {
                      color: "#9ecd3f"
                      //   textDecoration: 'underline',
                      //   cursor: 'pointer'
                    },
                    on: {
                      click: () => {
                        this.activation(data);
                      }
                    }
                  },
                  "激活"
                )
              ]);
            } else {
              return h("div", [
                h(
                  "a",
                  {
                    style: {
                      // color: '#145edb',
                      // textDecoration: 'underline',
                      // cursor: 'pointer',
                      marginRight: "20px"
                    },
                    on: {
                      click: () => {
                        this.edit(data);
                      }
                    }
                  },
                  "编辑"
                ),
                h(
                  "a",
                  {
                    style: {
                      color: "red"
                      // textDecoration: 'underline',
                      // cursor: 'pointer'
                    },
                    on: {
                      click: () => {
                        this.tovoid(data);
                      }
                    }
                  },
                  "禁用"
                )
              ]);
            }
          }
        }
      ],
      lists: []
    };
  },
  methods: {
    // 用户姓名清空
    clearusername() {},
    // 业务员
    getkf(data) {
      this.kflist = data;
      if (data) {
        this.formCustom.adminId = data.value;
        this.formCustom.adminName = data.label;
        // this.formCustom.adminId = "";
      } else {
      }
    },
    userremoteMethod(query) {
      // if (this.formCustom.memberId) {
      if (query !== "") {
        this.loading4 = true;
        setTimeout(() => {
          let data = {
            realName: query
          };
          let that = this;
          userSelectList(data).then(resp => {
            this.loading4 = false;
            const list = resp.response.map(item => {
              return {
                value: item.id,
                label: item.realName
              };
            });
            this.useroptions = list.filter(
              item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1
            );
          });
        }, 200);
      } else {
        this.useroptions = [];
      }
      // } else {
      //   this.$Message.info("请先选择公司名称");
      // }
    },
    editremoteMethod1(query) {
      if (this.editcon.memberId) {
        if (query !== "") {
          this.loading1 = true;
          setTimeout(() => {
            let data = {
              memberId: this.editcon.memberId,
              userName: query
            };
            let that = this;
            userSelectList(data).then(resp => {
              this.loading1 = false;
              const list = resp.response.map(item => {
                return {
                  value: item.id,
                  label: item.name
                };
              });
              this.editoptions = list.filter(
                item =>
                  item.label.toLowerCase().indexOf(query.toLowerCase()) > -1
              );
            });
          }, 200);
        } else {
          this.editoptions = [];
        }
      } else {
        this.$Message.info("请先选择公司名称");
      }
    },
    editsalename(data) {},
    // 选择用户名称
    selectusername(data) {
      this.formCustom.userName = data.label;
      this.formCustom.userId = data.value;
    },
    // 编辑选择用户名称
    selecteditusername(data) {
      this.editcon.userName = data.label;
      this.editcon.userId = data.value;
    },
    //根据公司名称模糊匹配下拉选择列表
    companyTypeFunction(companyData) {
      // this.companyData = companyData;
      if (companyData) {
        this.formCustom.memberId = companyData.value;
        this.formCustom.memberNameCn = companyData.label;
      }else{
         this.formCustom.memberId = '';
        this.formCustom.memberNameCn = '';
      }
    },
    //根据用户名称模糊匹配下拉选择列表
    userTypeFunction(data) {
      if (data) {
        this.formCustom.userId = data.value;
        this.formCustom.userName = data.label;
      }else{
        this.formCustom.userId = '';
        this.formCustom.userName = '';
      }
    },
    //新增根据公司名称模糊匹配下拉选择列表
    addcompanyTypeFunction(companyData) {
      // this.companyData = companyData;

      if (companyData) {
        this.addcon.memberId = companyData.value;
        this.addcon.memberNameCn = companyData.label;
        this.$refs.selectitem.query = "";
        this.$refs.selectitem.model = "";

        this.$refs.selectitem.clearSingleSelect();
        this.userList = [];
        this.addcon.userId = 0;
        if (this.addcon.memberId) {
          this.getUserlist(this.addcon.memberId);
        }
      }
    },
    //编辑根据公司名称模糊匹配下拉选择列表
    editcompanyTypeFunction(companyData) {
      // this.companyData = companyData;
      if (companyData) {
        this.editcon.memberId = companyData.value;
        this.editcon.memberNameCn = companyData.label;
        if (this.editcon.memberId) {
          this.editgetUserlist(this.editcon.memberId);
        } else {
          this.editcon.userId = "";
          this.editcon.realName = "";
        }
      }
    },
    getUserlist(data) {
      var a = {
        memberId: data
      };
      var that = this;
      getUsersByMemberId(a).then(resp => {
        that.userList = resp.response.list;
      });
    },
    //编辑获取用户名
    editgetUserlist(data) {
      var a = {
        memberId: data
      };
      var that = this;
      getUsersByMemberId(a).then(resp => {
        that.editconuserList = resp.response.list;
        if (resp.response.list.length > 0) {
        } else {
          that.editcon.userId = "";
          that.editcon.realName = "";
        }
      });
    },
    //新增多选业务员
    remoteMethod2(query) {
      if (query !== "" || query != null) {
        if (query.indexOf("(") != -1) {
          query = query.split("(")[0];
        }
        this.loading2 = true;
        setTimeout(() => {
          let data = {
            adminName: query
          };
          let that = this;
          adminListName(data).then(resp => {
            this.loading2 = false;
            const list = resp.response.map(item => {
              return {
                value: item.id,
                label: item.name + "(" + item.mobile + ")"
              };
            });
            that.options2 = list.filter(
              item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1
            );
          });
        }, 200);
      } else {
        this.options2 = [];
      }
    },
    //编辑业务员
    remoteMethod3(query) {
      if (query !== "" || query != null) {
        if (query.indexOf("(") != -1) {
          query = query.split("(")[0];
        }

        this.loading3 = true;
        setTimeout(() => {
          let data = {
            adminName: query
          };
          let that = this;
          adminListName(data).then(resp => {
            this.loading3 = false;
            const list = resp.response.map(item => {
              return {
                value: item.id,
                label: item.name,
                mobile: item.mobile
              };
            });
            that.editoptions2 = list.filter(
              item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1
            );
          });
        }, 200);
      } else {
        this.editoptions2 = [];
      }
    },
    // 查询
    handleSubmit() {
      this.$refs.formCustom.validate(valid => {
        if (valid) {
          if (!this.formCustom.userName) {
            this.formCustom.userName = "";
          }
          this.findlistmsg = this.formCustom;
          this.findlistmsg.pageSize = 10;
          this.findlistmsg.pageNum = 1;
          this.getlist(this.findlistmsg);
        } else {
          // this.$Message.error("Fail!");
        }
      });
    },
    // 重置
    handleReset() {
      this.formCustom = {};
      this.$refs.formCustom.resetFields();
      this.$refs.companyRef.model = "";
      this.$refs.companyRef.getData("");
      this.$refs.kfref.model = "";
      this.$refs.kfref.getData("");
      this.$refs.realnameref.query = "";
    },
    // 列表编辑
    edit(data) {
      // console.log(data)
      this.editwhite = true;
      this.editcon = JSON.parse(JSON.stringify(data.row));
      this.editcon.adminIds = [];
      this.editcon.adminIds[0] = this.editcon.adminId;
      this.editindex = data.index;
      this.editcon.phone= data.row.userPhone;
      if (this.editcon.adminName) {
        this.remoteMethod3(this.editcon.adminName);
      }
      this.$refs.breedDataRefEdit.getData(this.editcon.memberNameCn);
    },
    // 作废
    tovoid(data) {
      this.$Modal.confirm({
        title: "提示",
        content: "<p>确定要禁用该用户白名单信息吗？</p>",
        onOk: () => {
          var data1 = {
            id: data.row.id
          };
          var that = this;
          cancelWhiteMsg(formData(data1)).then(resp => {
            that.lists[data.index].status = 0;
            that.$Message.info({
              content: "该用户白名单已禁用",
              duration: 3
            });
          });
        },
        onCancel: () => {
          // this.$Message.info("Clicked cancel");
        }
      });
    },
    // 激活
    activation(data) {
      this.$Modal.confirm({
        title: "提示",
        content: "<p>确定要激活该用户白名单信息吗？</p>",
        onOk: () => {
          var data1 = {
            id: data.row.id
          };
          var that = this;
          effectWhiteMsg(formData(data1)).then(resp => {
            that.lists[data.index].status = 1;
            that.$Message.info({
              content: "该用户白名单已激活",
              duration: 3
            });
          });
        },
        onCancel: () => {
          // this.$Message.info("Clicked cancel");
        }
      });
    },
    // 新增白名单
    addwhiteModal() {
      this.addwhite = true;
    },
    //新增白名单确定
    addok(data) {
      this.$refs.addcon.validate(valid => {
        if (valid) {
          var that = this;
          saveUserCallwhite(that.addcon).then(resp => {
            that.$Message.info(resp.message);
            that.findlistmsg.pageSize = 10;
            that.findlistmsg.pageNum = 1;
            that.getlist(that.findlistmsg);
            that.$refs.addcon.resetFields();
            that.$refs.breedDataRefadd.model = "";
            that.addwhite = false;
          });
        } else {
          // this.$Message.error("Fail!");
        }
      });
    },
    //新增白名单取消
    cancel() {
      this.addwhite = false;
      this.$refs.addcon.resetFields();
      this.$refs.breedDataRefadd.model = "";
    },

    // 列表编辑确定
    editok() {
      var a = this.editcon.adminIds;
      if (typeof a == "number") {
        this.editcon.adminIds = [];
        this.editcon.adminIds[0] = a;
      } else {
        this.editcon.adminIds = a;
      }

      this.$refs.editcon.validate(valid => {
        if (valid) {
          var that = this;
          this.spinShow=true;

          editWhiteMsg(this.editcon).then(resp => {
            that.spinShow=false
            that.$Message.info(resp.message);
            that.editwhite = false;
            that.getlist(that.findlistmsg);
            // that.lists[Number(that.editindex)] = that.editcon;
          });
        } else {
          // this.$Message.error("Fail!");
        }
      });
    },
    //列表编辑取消
    editcancel() {
      this.editwhite = false;
      this.$refs.editcon.resetFields();
    },
    // 呼出且有拨号限制
    onDial(data) {
      let params = {
        adminId: data.row.adminId,
        phone: data.row.userPhone,
        userId: data.row.userId
      };
      console.log(params.params);
      iscalloutWhiteMsg(formData(params)).then(resp => {
        dial(params.phone, res => {
          this.$Notice.success({ title: "呼叫成功：" + params.phone });
        });
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
    getlist(data) {
      let that = this;
      this.spinShow=true;
      userCallWhite(formData(data)).then(resp => {
        that.spinShow=false;
        that.lists = resp.response.list;
        that.total = resp.response.total;
      });
    }
  },
  created() {
    this.getlist(this.findlistmsg);
  },
  watch: {}
};
</script>

