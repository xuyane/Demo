<style lang="less" scoped>
.product-text {
  line-height: 26px;
}

</style>
<template>
  <Row>
    <!--<user-tool-tip></user-tool-tip>-->
    <Table class="tableCommon showtiptable"
      :data="tableData"
      :columns="columns"
      ref="dragTable"
      :stripe="true"
      :border="true">
    </Table>
    <product-auth-modal
      :showProductModal="showModal"
      @hide-modal="hideModal"
       @hide-modal1="hideModal1"
      :rowData="productAuthData">
    </product-auth-modal>
    <user-follow-modal
      :showFollowModal="showFollowModal"
      @hide-modal="hideFollowModal"
      @hide-modal1='reflashFlowModal'
      @hide-load="hideFollowModal1"
      :rowData="userFollowData">
    </user-follow-modal>
    <send-message-modal
      :showMessageModal="showMessageModal"
      @hide-modal="hideMessageModal"
      :rowData="sendMessageData">
    </send-message-modal>
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
    <follow-delay-modal
      :showDelayModal="showDelayModal"
      @hide-modal="hideDelayModal"
      @hide-modal1="reflashtr"
      :delayData="delayData">
    </follow-delay-modal>
  </Row>
</template>
<script>
import {
  formatTime,
  formatTime2,
  formData,
  formatStamp
} from "../../../../assets/js/common.js";
import ProductAuthModal from "./productAuthModal";
import UserFollowModal from "./userFollowModal";
import SendMessageModal from "./sendMessageModal";
import dial from "@/assets/js/linkDial.js";
import FollowDelayModal from "../userEdit/followDelayModal";
import {
  userProductList,
  queryUserList,
  getContactsList,
  queryUserMobile
} from "../../../components/axios/crm.js";

//import userToolTip from '../../../components/user-tool-tip/user-tooltip.vue';

export default {
  props: {
    dataList: Array
  },
  data() {
    return {
      checkindex:'',
      showModal: false,
      showFollowModal: false,
      showMessageModal: false,
      productDetailModal: false,
      showDelayModal: false,
      productAuthData: {},
      userFollowData: {},
      sendMessageData: {},
      productDetailData: [],
      productDetailData1: [],
      userInfolData: [],
      mobileData: [],
      delayData: {},
      delayDataindex:'',
      columns: [
        {
          key: "memberName",
          title: "公司名称",
          minWidth: 160,
          render: (h, data) => {
            return h(
              "Tooltip",
              {
                props: {
                  placement: "right-start",
                  maxWidth: 600
                },
                style: {
                  display: "block",
                  color: "#2d8cf0",
                  cursor: "pointer"
                  // overflow: "hidden",
                  // textOverflow: "ellipsis",
                  // whiteSpace: "nowrap"
                }
              },
              [
                h(
                  "span",
                  {
                    style: {
                      color:
                        this.followchange && data.row.hasAuditDelayed
                          ? "#00FFFF"
                          : this.contactchange && data.row.isNotConnect
                            ? "#9ecd3f"
                            : "#2d8cf0"
                    },
                    on: {
                      click: () => {
                        // this.check(data)
                        this.copyText(data.row.memberName);
                      }
                    }
                  },
                  data.row.memberName + "(" + data.row.userMemberCount + ")"
                ),
                h("div", {
                  slot: "content",
                  domProps: {
                    innerHTML:
                      data.row.memberName + "(" + data.row.userMemberCount + ")"
                  }
                })
              ]
            );
          }
        },
        {
          key: "userId",
          title: "用户ID",
          width: 80
        },
        {
          key: "userName",
          title: "用户名",
          minWidth: 150,
          render: (h, data) => {
            // return h("span", `${data.row.realName} (${data.row.userName})`);
            // let strCount = '${data.row.realName} (${data.row.userName})'
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
                          this.copyText(this.userInfolData);
                        },
                        mouseover: () => {
                          let dataTemt = {
                            memberId: data.row.memberId
                          };
                          let that = this;
                          that.userInfolData = [];
                          queryUserList(dataTemt).then(resp => {
                            let list = [];
                            if (resp.response && resp.response.length > 0) {
                              resp.response.map(item => {
                                let str = item.username;
                                list.push(str);
                              });
                              that.userInfolData = list;
                              //  that.productDetailData = list;
                              //  that.productDetailModal = true;
                            }
                          });
                        }
                      }
                    },
                    data.row.userName
                  ),
                  h("div", {
                    slot: "content",
                    style: {
                      maxHeight: "400px",
                      overflow: "auto"
                    },
                    domProps: {
                      innerHTML: this.userInfolData.join("<br />")
                    }
                  })
                ]
              )
            ]);
          }
        },
        {
          key: "mobile",
          title: "联系电话",
          minWidth: 160,
          render: (h, data) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    color: "#2d8cf0",
                    cursor: "pointer",
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.onDial(data.row.mobile);
                    }
                  }
                },
                data.row.mobile
              ),
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
                        mouseenter: () => {
                          getContactsList(
                            data.row.memberId + "?date=" + new Date().getTime()
                          ).then(res => (this.mobileData = res.response));
                        }
                      }
                    },
                    "详情"
                  ),
                  h(
                    "div",
                    {
                      slot: "content"
                    },
                    [
                      h("user-tool-tip", {
                        props: {
                          mobileData: this.mobileData
                        },
                        on: {
                          "on-call": phone => {
                            this.onDial(phone);
                          }
                        }
                      })
                    ]
                  )
                ]
              )
            ]);
          }
        },
        {
          key: "regTime",
          title: "注册时间",
          minWidth: 160,
          render: (h, data) => {
            return h(
              "div",
              data.row.regTime ? formatTime2(data.row.regTime) : ""
            );
          }
        },
        {
          key: "loginTime",
          title: "最近登录时间",
          minWidth: 160,
          render: (h, data) => {
            return h(
              "div",
              data.row.loginTime && data.row.loginTime > 0
                ? formatTime2(data.row.loginTime)
                : ""
            );
          }
        },
        {
          key: "userType",
          title: "用户类型",
          minWidth: 100,
          render: (h, data) => {
            return h(
              "div",
              {
                style: {
                  color: "#2d8cf0",
                  cursor: "pointer"
                }
              },
              data.row.userTypeShow
            );
          }
        },
        {
          key: "productList",
          title: "产品",
          minWidth: 80,
          render: (h, data) => {
            // let list = []
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
                          this.copyText(this.productDetailData1);
                        },
                        mouseover: () => {
                          let msg = {
                            userId: data.row.userId
                          };
                          let that = this;
                          that.productDetailData1 = [];
                          userProductList(formData(msg)).then(res => {
                            let list = [];
                            if (res.response && res.response.length > 0) {
                              res.response.map(item => {
                                let str = "";
                                if (item.status == 0) {
                                  str = `${
                                    item.productNameCn
                                  } (<span style='color:red'>${this.transferTypes(
                                    item.type
                                  )} ${this.transferStatus(
                                    item.status
                                  )} ${formatTime(
                                    item.startTime
                                  )} 至 ${formatTime(item.endTime)}</span> )`;
                                } else {
                                  str = `${
                                    item.productNameCn
                                  } (${this.transferTypes(
                                    item.type
                                  )} ${this.transferStatus(
                                    item.status
                                  )} ${formatTime(
                                    item.startTime
                                  )} 至 ${formatTime(item.endTime)} )`;
                                }

                                let newData = new Date().getTime();
                                var iDays =
                                  parseInt(
                                    (item.endTime - newData) /
                                      1000 /
                                      60 /
                                      60 /
                                      24
                                  ) + 1;
                                if (iDays <= 0) {
                                  iDays = 0;
                                }
                                str = str + "(还有" + iDays + "天)";
                                list.push(str);
                              });
                              that.productDetailData1 = list;
                              //  that.productDetailData = list;
                              //  that.productDetailModal = true;
                            } else {
                              list.push("无产品授权");
                              that.productDetailData1 = list;
                            }
                          });
                        }
                      }
                    },
                    "详情"
                  ),
                  h("div", {
                    slot: "content",
                    style: {
                      maxHeight: "600px",
                      overflow: "auto"
                    },
                    domProps: {
                      innerHTML: this.productDetailData1.join("<br />")
                    }
                  })
                ]
              )
            ]);
          }
        },
        {
          key: "serviceStartTime",
          title: "跟踪日期",
          minWidth: 200,
          render: (h, data) => {
            let startTime = data.row.serviceStartTime
              ? formatTime(data.row.serviceStartTime)
              : "";
            let endTime = data.row.serviceEndTime
              ? formatTime(data.row.serviceEndTime)
              : "";
            let newTime = new Date().getTime()
              ? formatTime(new Date().getTime())
              : "";
            let newData = new Date().getTime();
            var iDays =
              parseInt(
                (data.row.serviceEndTime - newData) / 1000 / 60 / 60 / 24
              ) + 1;
            if (iDays <= 0) {
              iDays = 0;
            }

            return h("div", [
              h("span", startTime + "至" + endTime),
              h(
                "p",
                {
                  style: {
                    marginRight: "8px",
                    color: "red",
                    cursor: "pointer"
                  }
                },
                "(还有" + iDays + "天)"
              )
            ]);
          }
        },
        {
          key: "adminName",
          title: "业务员",
          minWidth: 120,
          render: (h, data) => {
            let name = [];
            let name1 = [];
            if (data.row.umList && data.row.umList.length > 0) {
              data.row.umList.map(item => {
                if (item.adminDeptName && item.adminName) {
                  if (item.isMainAdmin === 1) {
                    name.unshift(`${item.adminDeptName}-${item.adminName}(主)`);
                    name1.unshift(`${item.adminName}(主)`);
                  } else {
                    name.push(`${item.adminDeptName}-${item.adminName}`);
                    name1.push(`${item.adminName}`);
                  }
                }
              });
            }
            return h("div", [
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
                  h("div", {
                    domProps: {
                      innerHTML: name1.join("<br />")
                    }
                  }),
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
          title: "操作",
          minWidth: 230,
          fixed: "right",
          // fixed: "right",
          render: (h, data) => {
            return h("div", [
              h(
                "Tooltip",
                {
                  props: {
                    placement:data.index === 0 ? "bottom" : "top",
                    maxWidth: 100,
                    content: "编辑"
                  },
                  style: {
                    color: "#2d8cf0",
                    cursor: "pointer",
                    marginRight: "8px"
                  }
                },
                [
                  h("Icon", {
                    props: {
                      type: "ios-create",
                      size: 24
                    },
                    on: {
                      click: () => {
                        this.editData(data);
                      }
                    }
                  })
                ]
              ),
              h(
                "Tooltip",
                {
                  props: {
                    placement:data.index === 0 ? "bottom" : "top",
                    maxWidth: 100,
                    content: "用户跟踪"
                  },
                  style: {
                    color: "#2d8cf0",
                    cursor: "pointer",
                    marginRight: "8px"
                  }
                },
                [
                  h("Icon", {
                    props: {
                      type: "ios-contact",
                      size: 24
                    },
                    on: {
                      click: () => {
                        this.userFollow(data);
                      }
                    }
                  })
                ]
              ),
              h(
                "Tooltip",
                {
                  props: {
                    placement:data.index === 0 ? "bottom" : "top",
                    maxWidth: 100,
                    content: "权限试用"
                  },
                  style: {
                    color: "#2d8cf0",
                    cursor: "pointer",
                    marginRight: "8px"
                  }
                },
                [
                  h("Icon", {
                    props: {
                      type: "ios-information-circle",
                      size: 24
                    },
                    on: {
                      click: () => {
                        this.productAuth(data);
                      }
                    }
                  })
                ]
              ),
              h(
                "Tooltip",
                {
                  props: {
                    placement:data.index === 0 ? "bottom" : "top",
                    maxWidth: 100,
                    content: "合同管理"
                  },
                  style: {
                    color: "#2d8cf0",
                    cursor: "pointer",
                    marginRight: "8px"
                  }
                },
                [
                  h("Icon", {
                    props: {
                      type: "ios-paper",
                      size: 24
                    },
                    on: {
                      click: () => {
                        this.createContract(data);
                      }
                    }
                  })
                ]
              ),
              h(
                "Tooltip",
                {
                  props: {
                    placement:data.index === 0 ? "bottom" : "top",
                    maxWidth: 100,
                    content: "发送短信"
                  },
                  style: {
                    color: "#2d8cf0",
                    cursor: "pointer",
                    marginRight: "8px"
                  }
                },
                [
                  h("Icon", {
                    props: {
                      type: "ios-mail",
                      size: 24
                    },
                    on: {
                      click: () => {
                        this.sendMessage(data);
                      }
                    }
                  })
                ]
              ),
              h(
                "Tooltip",
                {
                  props: {
                    placement:data.index === 0 ? "bottom" : "top",
                    maxWidth: 100,
                    content: "跟踪延期"
                  },
                  style: {
                    color: "#2d8cf0",
                    cursor: "pointer",
                    marginRight: "8px"
                  }
                },
                [
                  h("Icon", {
                    props: {
                      type: "ios-time",
                      size: 24
                    },
                    on: {
                      click: () => {
                        this.showFollowDelay(data);
                      }
                    }
                  })
                ]
              )
              // h('span', {
              //   style: {
              //     marginRight: '8px',
              //     color: '#2d8cf0',
              //     cursor: 'pointer'
              //   },
              //   on: {
              //     click: () => {
              //       this.editData(data)
              //     }
              //   }
              // }, '编辑'),
              // h('span', {
              //   style: {
              //     marginRight: '8px',
              //     color: '#2d8cf0',
              //     cursor: 'pointer'
              //   },
              //   on: {
              //     click: () => {
              //       this.userFollow(data)
              //     }
              //   }
              // }, '用户跟踪'),
              // h('span', {
              //   style: {
              //     marginRight: '8px',
              //     color: '#2d8cf0',
              //     cursor: 'pointer'
              //   },
              //   on: {
              //     click: () => {
              //       this.productAuth(data)
              //     }
              //   }
              // }, '产品授权'),
              // h('span', {
              //   style: {
              //     marginRight: '8px',
              //     color: '#2d8cf0',
              //     cursor: 'pointer'
              //   },
              //   on: {
              //     click: () => {
              //       this.createContract(data)
              //     }
              //   }
              // }, '合同管理'),
              // h('span', {
              //   style: {
              //     color: '#2d8cf0',
              //     cursor: 'pointer'
              //   },
              //   on: {
              //     click: () => {
              //       this.sendMessage(data)
              //     }
              //   }
              // }, '发送短信')
            ]);
          }
        }
      ],
      tableData: [],
      followchange: false,
      contactchange: false
    };
  },
  components: {
    ProductAuthModal,
    UserFollowModal,
    SendMessageModal,
    FollowDelayModal
    //    userToolTip
  },
  created() {
    if (this.$route.path == "/contactedUser") {
      let msg = {
        key: "contactTime",
        title: "联系日期",
        width: 120,
        render: (h, data) => {
          return h("span", formatTime(data.row.contactTime) || "");
        }
      };
      this.columns.splice(4, 0, msg);
    } else if (this.$route.path == "/followUser") {
      this.followchange = true;
    } else if (this.$route.path == "/recentContactUser") {
      this.contactchange = true;
    }
  },
  methods: {
    hideFollowModal1() {
      this.showFollowModal = false;
      this.$emit("get-list");
    },
    reflashFlowModal(){
      this.showFollowModal = false;
      this.tableData[this.checkindex].isNotConnect=0;
    },
    // 获取产品详情
    getdetial(id) {},
    editData(data) {
      const {href} = this.$router.resolve({
        name: "basicInfo",
        query: {
          userId: data.row.userId,
          memberId: data.row.memberId
        }
      });
      window.localStorage.setItem("lzUserId", data.row.userId);
      window.localStorage.setItem("lzMemberId", data.row.memberId);
      window.localStorage.setItem("lzMemberName", data.row.memberName);
      window.localStorage.setItem("lzUserName", data.row.userName);
      window.localStorage.setItem("lzRealName", data.row.realName);
      window.localStorage.setItem("lzMobile", data.row.mobile);
      window.localStorage.setItem("checkOrEdit", "edit");
      window.open(href, '_blank');
    },
    // 呼出
    onDial(phone) {
      dial(phone, res => {
        this.$Notice.success({ title: "呼叫成功：" + phone });
      });
    },

    // check(data) {
    //   this.$router.push({
    //     name: 'basicInfo',
    //     query: {
    //       userId: data.row.userId,
    //       memberId: data.row.memberId
    //     }
    //   })
    //   window.localStorage.setItem('lzUserId', data.row.userId)
    //   window.localStorage.setItem('lzMemberId', data.row.memberId)
    //   window.localStorage.setItem('lzMemberName', data.row.memberName)
    //   window.localStorage.setItem('lzUserName', data.row.userName)
    //   window.localStorage.setItem('lzRealName', data.row.realName)
    //   window.localStorage.setItem('lzMobile', data.row.mobile)
    //   window.localStorage.setItem('checkOrEdit', 'check')
    // },
    // 产品授权
    productAuth(data) {
      this.showModal = true;
      this.productAuthData = data.row;
    },
    // 用户跟踪
    userFollow(data) {
      window.localStorage.setItem("lzUserId", data.row.userId);
      window.localStorage.setItem("lzMemberId", data.row.memberId);
      window.localStorage.setItem("lzMemberName", data.row.memberName);
      window.localStorage.setItem("lzUserName", data.row.userName);
      window.localStorage.setItem("lzRealName", data.row.realName);
      window.localStorage.setItem("lzMobile", data.row.mobile);
      window.localStorage.setItem("checkOrEdit", "edit");
      this.showFollowModal = true;
      this.checkindex=data.index;
      this.userFollowData = data.row;
    },

    // // 合同管理
    // createContract(data) {
    //   const {href} = this.$router.resolve({
    //     name: "contractInfo",
    //     query: {
    //       memberId: data.row.memberId
    //       // memberName: data.row.memberName,
    //       // userId: data.row.userId
    //       // userName: data.row.userName,
    //       // realName: data.row.realName,
    //       // mobile: data.row.mobile
    //     }
    //   });
    //   window.open(href, '_blank');
    // },

    // 合同管理
    createContract(data) {
      const {href} = this.$router.resolve({
        name: "contractInfo"
      });
      window.localStorage.setItem("lzUserId", data.row.userId);
      window.localStorage.setItem("lzMemberId", data.row.memberId);
      window.localStorage.setItem("lzMemberName", data.row.memberName);
      window.localStorage.setItem("lzUserName", data.row.userName);
      window.localStorage.setItem("lzRealName", data.row.realName);
      window.localStorage.setItem("lzMobile", data.row.mobile);
      window.localStorage.setItem("checkOrEdit", "edit");
      window.open(href, '_blank');
    },

    // createContract(data) {
    //   this.$router.push({
    //     name: "creatAgreement",
    //     query: {
    //       memberId: data.row.memberId,
    //       // memberName: data.row.memberName,
    //       userId: data.row.userId
    //       // userName: data.row.userName,
    //       // realName: data.row.realName,
    //       // mobile: data.row.mobile
    //     }
    //   });
    // },
    // 发送短信
    sendMessage(data) {
      this.showMessageModal = true;
      this.sendMessageData = data.row;
    },
    hideModal() {
      this.showModal = false;
      this.$emit("get-list");
    },
    hideModal1() {
      this.showModal = false;
      // this.$emit("get-list");
    },
    hideFollowModal() {
      this.showFollowModal = false;
    },
    hideMessageModal() {
      this.showMessageModal = false;
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
    showProduct(data) {
      this.productDetailModal = true;
      this.productDetailData = data;
    },
    reflashtr(){
      this.tableData[this.delayDataindex].hasAuditDelayed=1;
    },
    hideDelayModal() {
      this.showDelayModal = false;
    },
    showFollowDelay(data) {
      this.showDelayModal = true;
      this.delayDataindex=data.index
      this.delayData = data.row;
    },
    // getListPage3(){
    //   this.getListPage()
    // },
    // 复制
    copyText(text) {
      let str = text;
      if (Array.prototype.isPrototypeOf(text)) {
        str = text.join("\n");
      }
      this.$copyText(str).then(
        res => {
          this.$Message.success("复制成功");
        },
        err => {
          this.$Message.warning("复制失败");
        }
      );
    },
    close() {
      this.productDetailModal = false;
    }
  },
  watch: {
    dataList(newVal, oldVal) {
      this.tableData = newVal;
    }
  }
};
</script>
