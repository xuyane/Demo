<template>
  <Modal
    v-model="editSubuserModal"
    title="变为子用户"
    :loading="loading"
    @on-cancel="cancel()"
    width="1000"
  >
    <Row>
      <Form ref="editForm" :model="editsForm" :label-width="150" :rules="ruleValidate">
        <Row>
          <Col span="10">
            <FormItem label="请选择主用户：" prop="mainUser">
              <Select v-model="editsForm.mainUser" class="search-input">
                <Option
                  v-for="item in mainList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Row>
    <div slot="footer">
      <Button @click="cancel()">取消</Button>
      <Button type="primary" style="margin-left:8px;" :disabled="disabledbtn" @click="doChange()">确定</Button>
    </div>
  </Modal>
</template>

<script>
import axios from "axios";
import { formData } from "../../../../assets/js/common.js";
import { changeMainUserToSubUser } from "../../../components/axios/crm.js";
export default {
  name: "editSubuserModal",
  props: {
    showEditSubuserModal: Boolean,
    userId: Number
  },
  data() {
    const validateMainUser = (rule, value, callback) => {
      if (value === "请选择") {
        callback(new Error("主用户不能为空"));
      } else {
        callback();
      }
    };
    return {
      disabledbtn: false,
      // employeList: [],
      mainList: [],
      memberId: window.localStorage.getItem("lzMemberId"),
      loading: false,
      editSubuserModal: false,
      // isChangeOk: false,
      currentUserId: 0,
      // mainListId: [],
      // mainListRealname: [],
      // editsForm: {
      //   // isExtendFormal: "1", //继承正式权限
      //   // isExtendTrial: "1", //继承试阅权限
      //   // isCompetitor: "0", //是否竞争对手用户
      //   // competitorTime: '', //到期时间
      //   // username: "", //用户名
      //   // isMain: "0", //是否主用户
      //   // email: "", //邮箱
      //   // mobile: "", //手机
      //   // userManagerId: "" //业务员ID
      //   // mainUser: 0 //选择主用户
      // }
      editsForm: {
        
      },

      ruleValidate:{
        mainUser: [{ type:"array",required: true, message: '请选择主用户', trigger: 'change',validator: validateMainUser }]
      }

    };
  },
  created() {},
  methods: {
    doChange() {
      this.disabledbtn = true;
      // isCheck:是否校验，是的话则只返回是否可以变更，不进行变更操作
      let form = {
        userId: this.currentUserId,
        mainUserId: this.editsForm.mainUser,
        isCheck: 1
      };
      this.$Spin.show();
      // 发送变更可行性校验请求
      changeMainUserToSubUser(formData(form))
        .then(resp => {
          if (resp.status == "200") {
            this.$Spin.hide();
            this.$Message.success(resp.message);
            // 主用户变更为主用户校验可行性通过后弹窗确认
            this.confirm(form);
          } else {
            this.$Spin.hide();
            this.$Message.warning(resp.message);
          }
        })
        .catch(err => {
          this.$Spin.hide();
        });
      this.disabledbtn = false;
    },
    // 主用户变更为主用户校验可行性通过后弹窗确认
    confirm(form) {
      // 可行性已校验通过，将参数isCheck改为0，再次请求时后台会在校验通过后进行变更操作
      form.isCheck = 0;
      this.$Modal.confirm({
        title: "提示",
        content:
          "<p>可进行变更，是否继续操作？</p>",
        onOk: () => {
          // 发送变更请求
          changeMainUserToSubUser(formData(form))
            .then(resp => {
              if (resp.status == "200") {
                this.$Spin.hide();
                this.$Message.success(resp.message);
                this.editSubuserModal = false;
                this.$emit("hide-modal");
                this.$emit("getUserList4");
                this.$emit("get-main-user");
              } else {
                this.$Spin.hide();
                this.$Message.warning(resp.message);
              }
            })
            .catch(err => {
              this.$Spin.hide();
            });
        },
        onCancel: () => {}
      });
    },
    cancel() {
      this.$emit("hide-modal");
      this.$refs.editForm.resetFields();
    },
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
            const list1 = [];
            resp.data.response.map(item => {
              if (item.id != this.currentUserId) {
                var json = {};
                json.value = item.id;
                json.label = item.username;
                list1.push(json);
              }
            });
            this.mainList = list1;
            this.editsForm.mainUser=this.mainList[0].value;
          } else {
            this.$Message.warning(resp.data.message);
          }
        })
        .catch(err => {}
        );
    }
  },
  watch: {
    userId(newVal, oldVal) {
      this.currentUserId = newVal;
    },
    showEditSubuserModal(newVal, oldVal) {
      this.editSubuserModal = newVal;
      if (this.editSubuserModal == true) {
        this.getMainUser();
      }
    }
  },
  mounted() {
    // 1
  }
};
</script>