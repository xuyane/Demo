
<template>  
  <Modal v-model="editUserModal" :title="title" @on-cancel="cancel()" width="1000">
    <Row>
      <Form ref="editForm" :model="editsForm" :rules="editRules" :label-width="150">
        <Row>
            <Col span="10">
                <FormItem label="用户名：" prop="username">
                    <Input class="search-input" v-model="editsForm.username" clearable></Input>
                </FormItem>
            </Col>
            <Col span="10">
                <FormItem label="主用户：" v-if="showMain">
                    <RadioGroup v-model="editsForm.isCheckedShowMain">
                        <Radio label="1" :disabled="!isChangeOk">是</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="主用户：" prop="mainUser" v-if="showMains">
                    <Select  class="search-input" @on-change="onchange" v-model="editsForm.mainUser">
                        <Option v-for="item in maindList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
            </Col>
        </Row>
        <Row>
            <Col span="10">
                <FormItem label="真实姓名" prop="realName">
                    <Input v-model="editsForm.realName" clearable class="search-input"></Input>
                </FormItem>
            </Col>
            <Col span="10">
                <FormItem label="邮箱：" prop="email">
                    <Input v-model="editsForm.email" clearable class="search-input"></Input>
                </FormItem>
            </Col>
        </Row>
        <Row>
            <Col span="10">
              <FormItem label="手机：" prop="mobile">
                  <Input v-model="editsForm.mobile" clearable class="search-input" ></Input>
              </FormItem>
            </Col>
            <Col span="10">
                <FormItem label="业务员：" prop="mangerd">
                    <Select v-model="mangerd" class="search-input">
                        <Option v-for="item in employeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
            </Col>
            
        </Row> 
        <Row>
            <Col span="10">
                <FormItem label="可创建子用户数：" v-if="showMain">
                      <Input v-model="editsForm.accountNo"  class="search-input" clearable ></Input>
                </FormItem>
                <FormItem label="可创建子用户数：" v-if="showMains">
                      <Input v-model="editsForm.accountNo"  class="search-input" disabled></Input>
                </FormItem>
            </Col>
            <Col span="10">
                <FormItem label="继承正式权限：" prop="isChecked" v-if="showFormal">
                    <RadioGroup v-model="editsForm.isCheckedShowFormal">
                        <Radio label="1" >是</Radio>
                        <Radio label="0" >否</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="继承正式权限：" prop="isChecked" v-if="showFormals">
                    <RadioGroup v-model="editsForm.isCheckedShowFormals">
                        <Radio label="1" :disabled="!isChangeOk">是</Radio>
                        <Radio label="0" :disabled="!isChangeOk">否</Radio>
                    </RadioGroup>
                </FormItem>
            </Col>
            
        </Row>
        <Row>
            <Col span="10">
                <FormItem label="是否竞争对手用户：" prop="isChecked" v-if="showCompetitor">
                    <RadioGroup v-model="editsForm.isCheckedShowCompetitor" @on-change="onchangeTime">
                        <Radio label="1" >是</Radio>
                        <Radio label="0" >否</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="是否竞争对手用户：" prop="isChecked" v-if="showCompetitors"> 
                    <RadioGroup v-model="editsForm.isCheckedShowCompetitors" @on-change="onchangeTime">
                        <Radio label="1" :disabled="!isChangeOk">是</Radio>
                        <Radio label="0" :disabled="!isChangeOk">否</Radio>
                    </RadioGroup>
                </FormItem>
            </Col>
            <Col span="10">
                <FormItem label="继承试阅权限：" prop="isChecked" v-if="showMains">
                    <RadioGroup v-model="editsForm.isCheckedExtendTrial">
                        <Radio label="1">是</Radio>
                        <Radio label="0">否</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="继承试阅权限：" prop="isChecked" v-if="showMain">
                    <RadioGroup v-model="editsForm.isCheckedExtendTrial">
                        <Radio label="1" :disabled="!isChangeOk">是</Radio>
                        <Radio label="0" :disabled="!isChangeOk">否</Radio>
                    </RadioGroup>
                </FormItem>
            </Col>
            
        </Row> 
        <Row>
          <Col span="10" v-show="showCompetitorTime">
                <FormItem label="竞争对手到期日：">
                     <DatePicker type="date" class="search-input" v-model="competitorTime"  clearable  placeholder="Select date"></DatePicker>
                </FormItem>
            </Col>
        </Row>   
     </Form>
    </Row>
    <div slot="footer">
      <Button @click="cancel()">取消</Button>
      <Button type="primary" style="margin-left:8px;" :disabled='disabledbtn' @click="doEdit()">确定</Button>
      <Button v-if="showChangeToSubUser" type="primary" style="margin-left:8px;" :disabled='disabledbtn' @click="changeToSubUser()">变为子用户</Button>
    </div>
  </Modal>

</template>

<script>
import axios from "axios";
import { formatTime, formatTime2 } from "../../../../assets/js/common.js";
export default {
  name: "editUserModal",
  props: {
    showEditModal: Boolean,
    editData: Object,
    mainUserList: Object
  },
  data() {
    const validatePhone = (rule, value, callback) => {
      const reg =  /^1[0-9]{10}$/;
      if (reg.test(value) === false) {
        callback(new Error("请输入正确的手机"));
      } else {
        callback();
      }
    };
    const validateismain  = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入主用户"));
      }
    }
    const validateusername = (rule, value, callback) => {
      var isname = /^[a-zA-Z0-9]{6,15}$/;
      // 模拟异步验证效果
      //setTimeout(() => {
      if (!value) {
        callback(new Error("请输入用户名"));
      } else if (!isname.test(value)) {
        callback(new Error("用户名为6-15个英文字符或数字组合"));
      } else {
        if (value == this.editsForm1.username) {
          callback();
        } else {
          axios({
            url: "/crm/register/check-username",
            method: "get",
            params: {
              username: value
            }
          }).then(function(resp) {
            if (resp.data.status == 200) {
              if (resp.data.response) {
                callback(new Error("该用户名已存在，请重命名"));
              } else {
                callback();
              }
            } else {
            }
          });
        }
      }
    };
     const validateMainUser = (rule, value, callback) => {
      if (value == undefined || value == "") {
        callback(new Error("主用户不能为空"));
      } else {
        callback();
      }
    };
     const validateUserManagerId = (rule, value, callback) => {
       value = this.mangerd;
      if (value == undefined || value == "") {
        callback(new Error("业务员不能为空"));
      } else {
        callback();
      }
    };
    const validateuserphone = (rule, value, callback) => {
      if (value) {
        if (value == this.editsForm1.mobile) {
          callback();
        } else {
          axios({
            url: "/crm/register/check-mobile-exist",
            method: "post",
            params: {
              mobile: value
            }
          }).then(function(resp) {
            if (resp.data.status == 200) {
              if (resp.data.response) {
                callback(new Error("该手机号已存在，请重新输入"));
              } else {
                callback();
              }
            } else {
            }
          });
        }
      } else {
        callback();
      }
    };
    return {
      disabledbtn: false,
      showChangeToSubUser: false,
      showFormal: true,
      showFormals: false,
      showCompetitor: true,
      showCompetitors: false,
      showCompetitorTime: true,
      title: "",
      maindList: [],
      memberId: window.localStorage.getItem("lzMemberId"),
      showMain: true,
      showMains: false,
      employeList: [],
      editRules: {
        realName: [{ required: true, message: "真实姓名必填", trigger: "change" }],
        email: [{ type: "email", message: "邮箱格式错误", trigger: "change" }],
        isExtendFormal: [
          {
            required: true,
            message: "继承正式权限不能为空",
            trigger: "change"
          }
        ],
        isCompetitor: [
          {
            required: true,
            message: "是否竞争对手用户不能为空",
            trigger: "change"
          }
        ],
        isExtendTrial: [
          {
            required: true,
            message: "继承试阅权限不能为空",
            trigger: "change"
          }
        ],
        username: [
          {
            required: true,
            max: 15,
            min: 6,
            trigger: "blur",
            validator: validateusername
          }
        ],
        mobile: [
          {
            message: "手机号不正确",
            pattern: "^1[0-9]{10}$"
          },
          {
            trigger: "blur",
            required: false,
            validator: validateuserphone
          }
        ],
        mainUser: [
          { validator: validateMainUser, required: true, trigger: "change" }
        ],
         mangerd: [
          { validator: validateUserManagerId, required: true}
        ],
      },
      loading: false,
      editUserModal: false,
      competitorTime: "",
      value1: "",
      value2: "",
      value3: "",
      value4: "",
      isChangeOk: false,
      editsForm: {
        isChecked: "是",
        isCheckedShowCompetitor: "0", //是否竞争对手用户
        isCheckedShowCompetitors: "0" //是否竞争对手用户
      },
      editsForm1: {},
      userId: [],
      mangersId: [],
      userName: [],
      mangersName: [],
      employeList1: [],
      mangerd: ""
    };
  },
  created() {
    this.getMainUser();
  },
  methods: {
    doEdit() {
      let _this = this;
      let competorTime = new Date(
        new Date(this.competitorTime).toLocaleDateString().replace(/\//g, "-")
      ).getTime();
      this.$refs.editForm.validate(valid => {
        this.disabledbtn = true;
        if (valid) {
          // 校验通过
          if (this.editsForm.isMain === 1) {
            this.editsForm.isExtendFormal = this.editsForm.isCheckedShowFormals;
            this.editsForm.isExtendTrial = this.editsForm.isCheckedExtendTrial;
            this.editsForm.isCompetitor = this.editsForm.isCheckedShowCompetitors;
          } else {
            this.editsForm.isExtendFormal = this.editsForm.isCheckedShowFormal;
            this.editsForm.isExtendTrial = this.editsForm.isCheckedExtendTrial;
            this.editsForm.isCompetitor = this.editsForm.isCheckedShowCompetitor;
          }
          let form = {
            mobile: this.editsForm.mobile,
            userManagerId: this.mangerd,
            email: this.editsForm.email,
            isMain: this.editsForm.isMain,
            isExtendFormal: this.editsForm.isExtendFormal,
            isExtendTrial: this.editsForm.isExtendTrial,
            isCompetitor: this.editsForm.isCompetitor,
            accountNo: this.editsForm.accountNo,
            username: this.editsForm.username,
            states: this.editsForm.states,
            competitorTime: competorTime,
            realName:this.editsForm.realName||'',
            id: this.editsForm.userId,
            mainUserId: this.editsForm.mainUserId,
            memberId: this.memberId,
            userProfileId: this.editsForm.userProfileId
          };
          this.$Spin.show();
          axios({
            url: "/crm/userbase/modify_user",
            method: "post",
            data: form
          })
            .then(resp => {
              if (resp.data.status == "200") {
                this.$Message.success("修改成功");
                this.$Spin.hide();
                this.$emit("getUserList2");
              } else {
                this.$Spin.hide();
                this.$Message.warning(resp.data.message);
              }
              this.editUserModal = false;
              this.$emit("hide-modal");
            })
            .catch(err => {
              this.$Spin.hide();
            });
        } else {
        }
        this.disabledbtn = false;
      });
    },
    cancel() {
      this.$emit("hide-modal");
      //this.$refs.editForm.resetFields();
    },
    // 变更为子用户
    changeToSubUser() {
      //关闭当前弹窗并开启变更子用户弹窗
      this.$emit("change-to-sub-user");
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
            const list1 = resp.data.response.map(item => {
              return {
                value: item.id,
                label: item.username
              };
            });
            const list2 = resp.data.response.map(item => {
              return {
                value: item.userManagerid,
                label: item.userManagerName
              };
            });
            this.employeList1 = list2;
            this.maindList = list1;
            this.userName = resp.data.response;
          } else {
            this.$Message.warning(resp.data.message);
          }
        })
        .catch(err => {}
        );
    },
    onchange() {
      this.mangersName = [];
      //const list = [];
      const obj1 = {
        userManagerid: "",
        userManagerName: ""
      };
      this.userName.map(item => {
        if (this.editsForm.mainUser == item.id) {
          obj1.userManagerid = item.userManagerid;
          obj1.userManagerName = item.userManagerName;
          this.mangersName.push(obj1);
        }
      });
      const list = this.mangersName.map(item => {
        return {
          value: item.userManagerid,
          label: item.userManagerName
        };
      });
      this.employeList = list;
      this.mangerd = "";
      this.$refs.addForm.validate(valid => {
        if (valid) { 
        }
      });
    },
    onchangeTime() {
      this.showCompetitorTime = false;
      let tineShows = this.editsForm.isCheckedShowCompetitors;
      let tineShow = this.editsForm.isCheckedShowCompetitor;
      if (tineShows == 1 || tineShow == 1) {
        this.showCompetitorTime = true;
      }
    }
    // onchange() {
    //   this.mangersName = [];
    //   const list = [];
    //   const obj = {
    //     value:'',
    //     label:''
    //   };
    //   this.userName.map(item =>{
    //     if(this.editsForm.mainUser == item.id){
    //       this.mangersId.push(item.userManagerid)
    //       this.mangersName.push(item.userManagerName)
    //     }
    //   })
    //   for(var i=0;i<this.mangersName.length;i++){
    //     obj.value = this.mangersName[i]
    //     obj.label = this.mangersName[i]
    //     list.push(obj)
    //   }
    //   this.employeList = list;
    //   this.userManagerName = '';
    // }
  },
  watch: {
    showEditModal(newVal, oldVal) {
      this.editUserModal = newVal;
    },
    mainUserList(newVal, oldVal) {
      this.maindList = newVal;
    },
    editData(newVal, oldVal) {
      this.editsForm = newVal;
      this.editsForm1.username = newVal.username;
      this.editsForm1.mobile = newVal.mobile;

      this.editsForm.isExtendTrial === 1
        ? (this.editsForm.isCheckedExtendTrial = "1")
        : (this.editsForm.isCheckedExtendTrial = "0");

      if (this.editsForm.isMain === 1) {
        this.title = "编辑主用户";
        if(this.maindList.length > 1) {
          this.showChangeToSubUser = true;
        }
        this.showMain = true;
        this.showMains = false;
        this.editsForm.isMain === 1
          ? (this.editsForm.isCheckedShowMain = "1")
          : (this.editsForm.isCheckedShowMain = "0");
        this.showCompetitor = false;
        this.showCompetitors = true;
        this.editsForm.isCompetitor === 1
          ? (this.editsForm.isCheckedShowCompetitors = "1")
          : (this.editsForm.isCheckedShowCompetitors = "0");
        this.editsForm.isCompetitor === 1
          ? (this.showCompetitorTime = true)
          : (this.showCompetitorTime = false);
        this.showFormal = false;
        this.showFormals = true;
        this.editsForm.isExtendFormal === 1
          ? (this.editsForm.isCheckedShowFormals = "1")
          : (this.editsForm.isCheckedShowFormals = "0");
      } else if (this.editsForm.isMain === 0) {
        this.title = "编辑子用户";
        this.showChangeToSubUser = false;
        this.showMain = false;
        this.showMains = true;
        this.showCompetitor = true;
        this.showCompetitors = false;
        this.editsForm.isCompetitor === 1
          ? (this.editsForm.isCheckedShowCompetitor = "1")
          : (this.editsForm.isCheckedShowCompetitor = "0");
        this.editsForm.isCompetitor === 1
          ? (this.showCompetitorTime = true)
          : (this.showCompetitorTime = false);
        this.showFormal = true;
        this.showFormals = false;
        this.editsForm.isExtendFormal === 1
          ? (this.editsForm.isCheckedShowFormal = "1")
          : (this.editsForm.isCheckedShowFormal = "0");
      }
      let listempley = [];
      for (let i = 0; i < newVal.userManagerDetailVOs.length; i++) {
        if (newVal.userManagerDetailVOs[i].isMainAdmin === 1) {
          this.mangerd = newVal.userManagerDetailVOs[i].id;
          listempley.push({
            value: newVal.userManagerDetailVOs[i].id,
            label: newVal.userManagerDetailVOs[i].adminName
          });
        }
      }
      this.employeList = listempley;
      this.editsForm.mainUser = this.editsForm.mainUserId;
      this.competitorTime = formatTime2(this.editsForm.competitorTime);
    }
  },
  mounted() {
    // 1
  }
};
</script>
