<style lang='less' scoped>
.add-btn {
  position: absolute;
  right: 20px;
  top: 30px;
}
.product-text {
  line-height: 26px;
}
 .center-left{
        float: left;
 }
</style>
<template>
  <Row>
    <Col span='24'>
      <Row class-name='current-position'>
        当前位置：用户关系管理&nbsp;&nbsp;>>&nbsp;&nbsp;我的用户
      </Row>
    </Col>
    <Col span='24' style='position: relative'>
      <tab-header :tab-index='3'></tab-header>
      <Button type='primary' class='add-btn' @click="addUser">添加账户</Button>
    </Col>
       
    <Col span='24' style='background: #fff;padding: 0 20px;'>
      <Row :gutter="20">
         <Col span="24" class-name="search-form">
            <Form ref="formCustom" class-name="search-form" :model="formCustom"  :label-width="80">
              
              <Row type="flex" justify="space-between">
                  <Col span='7'>
                      <FormItem label="用户名:" >
                         <associate-Search-Common
                @query-list="usernameFunction"
                :dataUrl="usernameurl"
                ajaxType="get"
                keyword="userName"
                :extraData="extraData"
                ref="usernamebreedDataRef"
                class="search-input"
              ></associate-Search-Common>
                          <!-- <associate-Search ref='usernamebreedDataRef'  @query-list="usernameFunction" :dataUrl="usernameurl" :parameterName='nameuser' ></associate-Search> -->
                      </FormItem>
                  </Col>
                  <Col span='7'>
                      <FormItem label="姓名:" >
                          <Input type="text" v-model="formCustom.realName" class="search-input"></Input>
                      </FormItem>
                  </Col>
                  <Col span='7'>
                      <FormItem label="业务员:"   >
                          <associate-Search @query-list="getkf"  :dataUrl="url1" :parameterName='name1'  ref='kfref'></associate-Search>
                      </FormItem>
                  </Col>
              </Row>
              <Row type="flex" justify="space-between">
                  <Col span='7' >
                      <FormItem label="状态:"  >
                          <Select v-model="formCustom.status" class="search-input" >
                              <Option v-for='(item,index) in itemStatus' :key='index' :value="item.value">{{item.desc}}</Option>
                          </Select>
                      </FormItem>
                  </Col>
                  <Col span='7'>
                      <FormItem label="手机号:"   >
                          <Input type="text" v-model="formCustom.mobile" class="search-input"></Input>
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
          </Col>
      </Row>
      <Table class="tableCommon "
        :data='tableData'
        :columns='columns'
        ref='dragTable'
        :stripe='true'
        :border='true'>
      </Table>
      <oil-page
        :total='total'
        :page-size='pageSize'
        @page-change='pageChange'
        :page-size-opts='pageSizeOpts'
        :show-sizer='showSizer'>
      </oil-page>
    </Col>
    <add-user-modal
      @getUserList1='getListPage1'
      :showAddModal="showAddModal"
      @hide-modal="hideAddModal">
    </add-user-modal>
    <channel-select-modal
      :fromShujuOrKuaixun='fromShujuOrKuaixun'
      :showChannelModal="showChannelModal"
      :channalData='channalData'
      @hide-modal="hideChannelModal">
    </channel-select-modal>
    <edit-user-modal
      @getUserList2='getListPage2'
      :showEditModal="showEditModal"
      @hide-modal="hideEditModal"
      @hide-modal1="hideEditModal"
      :editData="editData"
      :mainUserList="mainUserList"
      @change-to-sub-user="changeToSubUser()"
      ref="editModal">
    </edit-user-modal>
    <edit-subuser-modal
      @getUserList4='getListPage4'
      :showEditSubuserModal="showEditSubuserModal"
      @get-main-user="getMainUser()"
      @hide-modal="hideEditSubuserModal"
      :userId="userId"
      >
    </edit-subuser-modal>
    <follow-delay-modal
      @getUserList='getListPage3'
      :showDelayModal="showDelayModal"
      @hide-modal="hideDelayModal"
      :delayData="delayData">
    </follow-delay-modal>
    <product-auth-modal
      :showProductModal="showModal"
      @hide-modal1="hideModal1"
      @hide-modal="hideModal"
      :rowData="productAuthData">
    </product-auth-modal>
    <!-- <reset-password-modal
      :showPasswordModal="showPasswordModal"
      @hide-modal="hidePasswordModal"
      :rowData="passwordData">
    </reset-password-modal> -->
    <Modal
      v-model="productDetailModal"      
      title="产品详情">
      <div v-for="(item, index) in productDetailData" :key="index" class="product-text">
        {{item}}
      </div>
      <div slot="footer">
        <Button type="primary" size="large" long @click="close">关闭</Button>
      </div>
    </Modal>
    <!-- <Modal
        v-model="modalcopypower"
        width="500"
        :title='activetr'
        @on-ok="copycancel"
        @on-cancel="copycancel">
        <div >
          <Form ref="activeformCustom" class-name="search-form" :model="activeformCustom"  :rules="ruleInline"  :label-width="160">
            <FormItem label="请选择权限来源帐号:" prop='userId' >
              <Select
                v-model="activeformCustom.userId"
                ref="input2"
                class="search-input"
                filterable
                clearable
                remote
                :remote-method="remoteMethod2"
                :loading="loading">
                <Option v-for="(option, index) in options2" :value="option.id" :key="index">{{option.userName}}</Option>
              </Select>
            </FormItem>
          </Form>
        </div>
        <div slot="footer">
          <i-button type="primary" @click="copyconfirm" class="search-btn"> 确定</i-button>
          <i-button @click="copycancel" class="search-btn">取消</i-button>
      </div>
    </Modal> -->
        <Modal
        v-model="modalcopypower"
        width="500"
        
        @on-ok="copycancel"
        @on-cancel="copycancel">
        <div slot="header" class="modal-header">
            <Tooltip :content="activeRealName" placement="top-start">{{activetr}}</Tooltip>
        </div>
          <Form ref="activeformCustom" class-name="search-form" :model="activeformCustom"  :rules="ruleInline"  :label-width="160">
            <FormItem label="请选择权限来源帐号:" prop='userId' >
              <Select
                v-model="activeformCustom.userId"
                ref="input2"
                class="search-input"
                filterable
                clearable
                remote
                :remote-method="remoteMethod2"
                :loading="loading">
                <Option v-for="(option, index) in options2" :value="option.id" :key="index">{{option.userName}}</Option>
              </Select>
            </FormItem>
          </Form>
        </div>
        <div slot="footer">
          <i-button type="primary" @click="copyconfirm" class="search-btn"> 确定</i-button>
          <i-button @click="copycancel" class="search-btn">取消</i-button>
      </div>
    </Modal>
  </Row>
</template>
<script>
import axios from "axios";
import md5 from "js-md5";
import TabHeader from "./tabHeader";
import OilPage from "../../../components/page/page.vue";
import AddUserModal from "./addUserModal";
import channelSelectModal from "./channelSelectModal";
import EditUserModal from "./editUserModal";
import EditSubuserModal from "./editSubuserModal";
import FollowDelayModal from "./followDelayModal";
import ProductAuthModal from "../user/productAuthModal";
import ResetPasswordModal from "./resetPasswordModal";
import associateSearch from "../../../components/associateSearch/getAssociateSearch.vue";
import associateSearchCommon from "../../../components/associateSearch/associateSearchCommon.vue";
import {
  getUserbaseList,
  disabledUser,
  editUserbase,
  resetPassword,
  resetPasswordByUserId,
  updatePasswordByUserId,
  userIdCopyProduct,
  userSelectList
} from "../../../components/axios/crm.js";
import {
  formatTime,
  formatTime2,
  formData
} from "../../../../assets/js/common.js";
import dial from "@/assets/js/linkDial.js";
export default {
  data() {
    const validatesameid = (rule, value, callback) => {
      setTimeout(() => {
        var that = this;

        this.show = false;
        // if(!value){
        if (this.activeid == value) {
          callback(new Error("不能是同一个账号"));
        } else {
          callback();
        }
      }, 1000);
    };
    return {
      activeRealName:'',
      channalData:{},
      fromShujuOrKuaixun:'',
      activeName:'',
      activeid: "",
      loading: false,
      options2: [],
      ruleInline: {
        userId: [
          {
            required: true,
            type: "number",
            message: "用户账号不能为空",
            trigger: "change"
          },
          {
            required: true,
            trigger: "change",
            validator: validatesameid
          }
        ]
      },
      activeformCustom: {},
      activetr: "",
      modalcopypower: false,
      url1: "/crm/common/query-adminList-by-name",
      name1: "adminName",
      itemStatus: [
        {
          value: "-1",
          desc: "全部"
        },
        {
          value: "0",
          desc: "禁用"
        },
        {
          value: "1",
          desc: "启用"
        }
      ],
      usernameurl: "/crm/common/query-user-select-list",
      nameuser: "userName",
      formCustom: {
        status: "-1"
      },
      memberId: window.localStorage.getItem("lzMemberId"),
      extraData: {
        memberId: window.localStorage.getItem("lzMemberId")
      },
      total: 0,
      pageSize: 10,
      pageNum: 1,
      showSizer: true,
      pageSizeOpts: [5, 10, 20, 30],
      editModal: false,
      showAddModal: false,
      showChannelModal:false,
      showEditModal: false,
      showEditSubuserModal: false,
      showDelayModal: false,
      productDetailModal: false,
      showPasswordModal: false,
      showModal: false,
      productAuthData: {},
      editData: {},
      mainUserList: {},
      userId: 0,
      delayData: {},
      passwordData: {},
      productDetailData: [],
      formItem: {},
      ruleForm: {},
      tableData: [],
      columns: [
        {
          key: "realName",
          title: "姓名",
          align: "center",
          minWidth: 100
        },
        {
          key: "username",
          align: "center",
          title: "用户名",
          minWidth: 120
        },
        {
          key: "mobile",
          align: "center",
          title: "手机",
          minWidth: 120,
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
                      this.onDial(data.row.mobile);
                    }
                  }
                },
                data.row.mobile
              )
            ]);
          }
        },
        {
          key: "userManagerDetailVOs",
          align: "center",
          title: "业务员",
          minWidth: 160,
          render: (h, data) => {
            let name = [];
            if (
              data.row.userManagerDetailVOs &&
              data.row.userManagerDetailVOs.length > 0
            ) {
              data.row.userManagerDetailVOs.map(item => {
                if (item.adminName) {
                  if (item.isMainAdmin === 1) {
                    name.push(`${item.adminName}(主)`);
                  } else {
                    name.push(`${item.adminName}`);
                  }
                }
              });
            }
            return h("div", [
              // h('span', name && name.length > 0 ? `${name[0]}` : '无'),
              h(
                "Tooltip",
                {
                  props: {
                    placement: "top",
                    maxWidth: 400
                  },
                  style: {
                    marginLeft: "5px",
                    color: "#2d8cf0",
                    cursor: "pointer"
                  }
                },
                [
                  name[0] ? `${name[0]}` : "无",
                  h("div", {
                    slot: "content",
                    domProps: {
                      innerHTML: name.join("<br />")
                    }
                  })
                ]
              )
            ]);
          }
        },
        {
          key: "isCompetitor",
          align: "center",
          title: "是否竞争对手用户",
          minWidth: 160,
          render: (h, data) => {
            return h("span", data.row.isCompetitor === 1 ? "是" : "否");
          }
        },
        {
          key: "states",
          align: "center",
          title: "状态",
          minWidth: 80,
          render: (h, data) => {
            return h("span", data.row.disabled === 1 ? "启用" : "禁用");
          }
        },
        {
          key: "isMain",
          align: "center",
          title: "主用户",
          minWidth: 80,
          render: (h, data) => {
            return h("span", data.row.isMain === 1 ? "是" : "否");
          }
        },
        {
          key: "accountNo",
          align: "center",
          title: "可创建子用户",
          minWidth: 120
        },
        {
          key: "isExtendFormal",
          align: "center",
          title: "继承正式权限",
          minWidth: 120,
          render: (h, data) => {
            return h("span", data.row.isExtendFormal === 1 ? "是" : "否");
          }
        },
        {
          key: "isExtendTrial",
          align: "center",
          title: "继承试阅权限",
          minWidth: 120,
          render: (h, data) => {
            return h("span", data.row.isExtendTrial === 1 ? "是" : "否");
          }
        },
        {
          key: "userProductVOs",
          align: "center",
          title: "产品期限",
          minWidth: 80,
          render: (h, data) => {
            let list = [];
            if (data.row.userProductVOs && data.row.userProductVOs.length > 0) {
              data.row.userProductVOs.map(item => {
                let str = `${item.productNameCn}(${this.transferTypes(
                  item.type
                )} ${this.transferStatus(item.status)} ${formatTime(
                  item.startTime
                )}至${formatTime(item.endTime)})`;
                list.push(str);
              });
            }
            // return h('div', {}, list.join(','))
            return h("div", [
              h(
                "Tooltip",
                {
                  props: {
                    placement: "top",
                    maxWidth: 600
                  },
                  style: {
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
                    style: {
                      maxHeight: "400px",
                      overflow: "auto"
                    },
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
          key: "competitorTime",
          align: "center",
          title: "跟踪期限",
          minWidth: 160,
          render: (h, data) => {
            let str = "";
            if (
              data.row.userManagerDetailVOs &&
              data.row.userManagerDetailVOs.length > 0
            ) {
              data.row.userManagerDetailVOs.map(item => {
                if (item.isMainAdmin === 1) {
                  str = item.serviceEndTime;
                }
              });
            }
            if (data.row.isMain === 1) {
              return h("div", [
                // h('span', formatTime2(data.row.competitorTime)),
                h("span", str ? formatTime2(str) : ""),
                h(
                  "span",
                  {
                    style: {
                      color: "#2d8cf0",
                      cursor: "pointer"
                    },
                    on: {
                      click: () => {
                        this.showFollowDelay(data);
                      }
                    }
                  },
                  "跟踪延期"
                )
              ]);
            } else {
              return h("div", [
                // h('span', formatTime2(data.row.competitorTime)),
                h("span", str ? formatTime2(str) : "")
              ]);
            }
          }
        },
        {
          key: "loginTime",
          align: "center",
          title: "最后登录",
          minWidth: 160,
          render: (h, data) => {
            return h("div", [
              h(
                "span",
                data.row.loginTime && data.row.loginTime > 0
                  ? formatTime2(data.row.loginTime)
                  : ""
              )
            ]);
          }
        },
        {
          title: "操作",
          align: "center",
          fixed: "right",
          minWidth: 320,
          render: (h, data) => {
            return h("div", [
               h(
                "span",
                {
                  style: {
                    marginRight: "8px",
                    color: "#2d8cf0",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.channelselect(data,1);
                    }
                  }
                },
                "数据频道管理"
              ),
               h(
                "span",
                {
                  style: {
                    marginRight: "8px",
                    color: "#2d8cf0",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.channelselect(data,2);
                    }
                  }
                },
                "快讯频道管理"
              ),
               h("br"),
              h(
                "span",
                {
                  style: {
                    marginRight: "8px",
                    color: "#2d8cf0",
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
                    color: "#2d8cf0",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.repairpwd(data);
                    }
                  }
                },
                "修改密码"
              ),
              h(
                "span",
                {
                  style: {
                    marginRight: "8px",
                    color: "#2d8cf0",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.reset(data);
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
                    color: data.row.disabled === 1 ? "red" : "#9ecd3f",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.isUsing(data);
                    }
                  }
                },
                `${data.row.disabled === 1 ? "禁用" : "启用"}`
              ),
              // h('span', {
              //   style: {
              //     marginRight: '8px',
              //     color: '#2d8cf0',
              //     cursor: 'pointer'
              //   },
              //   on: {
              //     click: () => {
              //       this.compare(data)
              //     }
              //   }
              // }, '对标'),
              h(
                "span",
                {
                  style: {
                    color: "#2d8cf0",
                    cursor: "pointer",
                    marginRight: "8px"
                  },
                  on: {
                    click: () => {
                      this.productAuth(data);
                    }
                  }
                },
                "权限试用"
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
                      this.copyPower(data);
                    }
                  }
                },
                "复制权限"
              )
            ]);
          }
        }
      ],
      newpwdvalue: ""
    };
  },
  components: {
    TabHeader,
    OilPage,
    AddUserModal,
    channelSelectModal,
    EditUserModal,
    EditSubuserModal,
    ProductAuthModal,
    FollowDelayModal,
    ResetPasswordModal,
    associateSearch,
    associateSearchCommon
  },
  created() {
    this.getListPage();
  },
  methods: {
    // 获取用户名称下拉搜索
    remoteMethod2(query) {
      if (query !== "") {
        this.loading = true;
         this.activeformCustom.userName = query
        setTimeout(() => {
          let data = {
            memberId: window.localStorage.getItem("lzMemberId"),
            userName: query
          };
          let that = this;
          userSelectList(data).then(res => {
            this.loading = false;
            this.options2 = res.response;
          });
        }, 200);
      } else {
        this.options2 = [];
      }
    },
    copycancel() {
      this.modalcopypower = false;
    },
    copyconfirm() {
      this.$refs.activeformCustom.validate(valid => {
        if (valid) {
          let that = this;
          let msg = {
            copyUserId: this.activeformCustom.userId,
            userId: this.activeid
          };
          this.$Modal.confirm({
            title: "提示",
            content: "<p>将"+this.activeformCustom.userName+"的信息单元权限，复制到账号"+this.activeName+"，复制具有不可恢复性，被复制的账号权限将可能被覆盖，请慎重操作。</p>",
            onOk: () => {
              userIdCopyProduct(msg).then(res => {
                that.$Message.success(res.message);
                that.modalcopypower = false;
                that.getListPage();
              });
            },
            onCancel: () => {}
          });
        } else {
        }
      });
    },
    copyPower(data) {
      this.modalcopypower = true;
      this.activeid = data.row.userId;
      this.activeName=data.row.username;
      this.activeItem = window.localStorage.getItem("lzMemberName");
      this.activeRealName = this.activeItem;
      if (this.activeItem.length>8) {
        this.activetr = this.activeItem.slice(0,8) + "..." +
        "-账号：" +
        data.row.username +
        "    权限复制";
        
      } else {
        this.activetr = this.activeItem +
        "-账号：" +
        data.row.username +
        "    权限复制";
      }
     

      // this.activetr =
      //   window.localStorage.getItem("lzMemberName") +
      //   "-账号：" +
      //   data.row.username +
      //   "    权限复制";
    },
    handleReset() {
      this.formCustom = {};
      this.formCustom.status = "-1";
      this.pageNum = 1;
      this.pageSize = 10;
      this.$refs.usernamebreedDataRef.model = [];
      // this.$refs.usernamebreedDataRef.getData("");
      this.$refs.kfref.model = "";
      this.$refs.kfref.getData("");
      this.$refs.kfref.model = "";
      // this.$refs.account.model = [];
    },
    getkf(data) {
      if (data) {
        this.formCustom.adminId = data.value;
      } else {
        this.formCustom.adminId = "";
      }
    },
    usernameFunction(data) {
      if (data) {
        this.formCustom.userId = data.value;
        this.formCustom.userName = data.label;
      }else{
        this.formCustom.userId = '';
        this.formCustom.userName = '';
      }
    },
    usernameactive(data) {
      if (data) {
        this.activeformCustom.userId = data.value;
       
      }
    },
    handleSubmit() {
      this.pageNum = 1;
      this.pageSize = 10;
      this.getListPage();
    },
    getListPage1() {
      this.getListPage();
    },
    getListPage2() {
      this.getListPage();
    },
    getListPage3() {
      this.getListPage();
    },
    getListPage4() {
      this.getListPage();
    },
    // 获取列表
    getListPage() {
      let params = {
        memberId: this.memberId,
        order: "desc",
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        mobile: this.formCustom.mobile || "",
        userId: this.formCustom.userId || "",
        realName: this.formCustom.realName || "",
        adminId: this.formCustom.adminId || "",

        sort: ""
      };
      if (this.formCustom.status == "-1") {
        params.disabled = "";
      } else {
        params.disabled = this.formCustom.status;
      }
      params.times = new Date().getTime();
      this.$Spin.show();

      getUserbaseList(formData(params)).then(res => {
        this.$Spin.hide();
        this.tableData = res.response.list;
        this.total = res.response.total;
      });
    },
    // 呼出
    onDial(phone) {
      dial(phone, res => {
        this.$Notice.success({ title: "呼叫成功：" + phone });
      });
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
    },
    showProduct(data) {
      this.productDetailModal = true;
      this.productDetailData = data;
    },
    showFollowDelay(data) {
      this.showDelayModal = true;
      this.delayData = data.row;
    },
    close() {
      this.productDetailModal = false;
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
    // 更新主用户LIST
    getMainUser() {
      axios({
        url: "/crm/userbase/user_main_list",
        method: "get",
        params: {
          memberId: this.memberId
        }
      })
        .then(resp => {
          if (resp.data.status === "200") {
            const list = resp.data.response.map(item => {
              return {
                value: item.id,
                label: item.username
              };
            });
            // 更新主用户List
            this.mainUserList = list;
          } else {
            this.$Message.warning(resp.data.message);
          }
        })
        .catch(err => {}
        );
    },
    // 添加账户
    addUser() {
      this.showAddModal = true;
    },
    editUser(data) {
      // 打开修改弹窗
      this.showEditModal = true;
      this.editData = JSON.parse(JSON.stringify(data.row));
      this.userId = data.row.userId;
    },
    changeToSubUser() {
      // 隐藏修改弹窗
      this.showEditModal = false;
      // 打开选择主用户弹窗
      this.showEditSubuserModal = true;
    },
    // 打开频道弹窗
    channelselect(data,val){
      this.fromShujuOrKuaixun=new Date().getTime()+'.'+val;
      this.channalData=JSON.parse(JSON.stringify(data.row))
      this.channalData.time=new Date().getTime()
      this.showChannelModal=true;
    },
    //隐藏频道弹窗
    hideChannelModal(){
      this.showChannelModal=false;
    },
    hideAddModal() {
      // 隐藏新增弹窗
      this.showAddModal = false;
      this.getListPage();
    },
    hideEditModal() {
      // 隐藏修改弹窗
      this.showEditModal = false;
    },
    hideEditSubuserModal() {
      // 隐藏选择主用户弹窗
      this.showEditSubuserModal = false;
    },
    hideModal1() {
      this.showModal = false;
    },
    hideModal() {
      this.showModal = false;
      this.getListPage();
    },
    hideDelayModal() {
      this.showDelayModal = false;
      this.getListPage();
    },
    hidePasswordModal() {
      this.showPasswordModal = false;
    },
    // 修改密码
    repairpwd(data) {
      this.$Modal.confirm({
        render: h => {
          return h("Input", {
            props: {
              value: this.value,
              autofocus: true,
              placeholder: "请输入新密码"
            },
            on: {
              input: val => {
                this.newpwdvalue = val;
              }
            }
          });
        },
        onOk: () => {
          if (!this.newpwdvalue) {
            this.$Message.warning("请输入新密码");
            return;
          }
          var enoughRegex = /^[A-Za-z0-9]{7,18}$/;
          if (enoughRegex.test(this.newpwdvalue) == false) {
            this.$Message.warning(
              "要求：密码需为7-18个英文字符或数字组合，区分大小写。"
            );
            return;
          }
          let msg = {
            password: md5(this.newpwdvalue),
            userId: data.row.userId
          };
          updatePasswordByUserId(formData(msg)).then(resp => {
            this.$Message.success("修改成功");
          });
        }
      });
    },
    // 重置密码
    reset(data) {
      // this.showPasswordModal = true
      // this.passwordData = data.row
      this.$Modal.confirm({
        title: "操作提示",
        content: "确定要重置密码吗?",
        onOk: () => {
          let params = {
            userId: data.row.userId,
            mobile: data.row.mobile,
            isNeedCaptcha: false
          };
          resetPasswordByUserId(formData(params)).then(res => {
            // this.$Message.success(`重置密码成功！短信已发送至${data.row.mobile}`)

            if (data.row.mobile == "") {
              this.$Message.success({
                content: `重置密码成功！短信已发送至${
                  data.row.mobile
                },新密码为${res.response}`,
                duration: 0,
                closable: true
              });
            } else {
              this.$Message.success({
                content: `重置密码成功！短信已发送至${data.row.mobile}`,
                duration: 0,
                closable: true
              });
            }
          });
        },
        onCancel: () => {}
      });
    },
    // 启用、禁用
    isUsing(data) {
      let params = {
        disabled: `${data.row.disabled === 1 ? "0" : "1"}`,
        id: data.row.userId
      };
      disabledUser(params).then(res => {
        this.$Message.success(res.message);
        this.getListPage();
      });
    },
    // 对标
    compare(data) {
      this.$router.push({
        name: "benchMarking"
      });
    },
    // 产品授权
    productAuth(data) {
      this.showModal = true;
      this.productAuthData = data.row;
    },
    editOk() {},
    cancel() {
      this.editModal = false;
    }
  }
};
</script>
