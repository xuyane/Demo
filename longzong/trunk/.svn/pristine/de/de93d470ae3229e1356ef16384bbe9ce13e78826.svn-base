
<template>
    <Modal v-model="addUserModal" title="添加 子账户" :loading="loading" @on-cancel="cancel()" width="1000">
      <Row>
        <Form ref="addForm" :model="addsForm" :rules="addRules" :label-width="150">
          <Row>
            <Col span="10">
              <FormItem label="用户名：" prop="username" >
                <Input v-model="addsForm.username" class="search-input" placeholder="请输入用户名"></Input>
              </FormItem>
            </Col>
              <Col span="10">
                <FormItem label="主用户：" prop="mainUser">
                  <Select v-model="addsForm.mainUser"  class="search-input" @on-change="onchange" >
                    <Option v-for="item in mainList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
              </Col>
          </Row>
          <Row>
            <Col span="10">
              <FormItem label="邮箱：" prop="email" >
                <Input v-model="addsForm.email" class="search-input" placeholder="请输入邮箱"></Input>
              </FormItem>
            </Col>
            <Col span="10">
              <FormItem label="手机：" prop="mobile" >
                <Input v-model="addsForm.mobile"  class="search-input" placeholder="请输入手机"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="10">
              <FormItem label="业务员："  prop="userManagerId">
                <Select v-model="addsForm.userManagerId"  class="search-input">
                  <Option v-for="item in employeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
            </Col>
             <Col span="10">
              <FormItem label="真实姓名：" prop="realName" >
                <Input v-model="addsForm.realName" class="search-input" placeholder="请输入真实姓名"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
              <Col span="10">
                  <FormItem label="继承正式权限：" prop="isExtendFormal" >
                      <RadioGroup v-model="addsForm.isExtendFormal">
                          <Radio label="1">是</Radio>
                          <Radio label="0">否</Radio>
                      </RadioGroup>
                  </FormItem>
              </Col>
              <Col span="10">
                  <FormItem label="是否竞争对手用户：" prop="isCompetitor" >
                      <RadioGroup v-model="addsForm.isCompetitor">
                          <Radio label="1">是</Radio>
                          <Radio label="0">否</Radio>
                      </RadioGroup>
                  </FormItem>
              </Col>
          </Row>
          <Row>
              <Col span="10">
                  <FormItem label="继承试阅权限：" prop="isExtendTrial" >
                      <RadioGroup v-model="addsForm.isExtendTrial">
                          <Radio label="1">是</Radio>
                          <Radio label="0">否</Radio>
                      </RadioGroup>
                  </FormItem>
              </Col>
              <Col span="10" v-if="addsForm.isCompetitor == 1">
                  <FormItem label="竞争对手到期日："  prop="competitorTime">
                      <DatePicker type="date" class="search-input" v-model="addsForm.competitorTime" placeholder="Select date"></DatePicker>
                  </FormItem>
              </Col>
          </Row>
        </Form>
      </Row>
      <div slot="footer">
        <Button @click="cancel()">取消</Button>
        <Button type="primary" style="margin-left:8px;" :disabled='disabledbtn'  @click="doAdd()">确定</Button>
      </div>
    </Modal>
</template>

<script>
import axios from "axios";
export default {
  name: "addUserModal",
  props: {
    showAddModal: Boolean
  },
  data() {
    const validatePhone = (rule, value, callback) => {
      const reg = /^1[0-9]{10}$/;
      if (reg.test(value) === false) {
        callback(new Error("请输入正确的手机"));
      } else {
        callback();
      }
    };
    const validateUserName = (rule, value, callback) => {
      const reg = /^[a-zA-Z\d]{6,15}$/;
      if (reg.test(value) === false) {
        callback(new Error("请输入字符或数字且长度为6-15的用户名"));
      } else {
        callback();
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
      if (value == undefined || value == "") {
        callback(new Error("业务员不能为空"));
      } else {
        callback();
      }
    };

    return {
      disabledbtn:false,
      employeList: [],
      mainList: [],
      memberId: window.localStorage.getItem('lzMemberId'),
      addRules: {
        username: [
          {
            required: true,
            message: "用户不能为空",
            trigger: "blur"
          },
          { validator: validateUserName, trigger: "blur" }
        ],
        realName: [
          {
            required: true,
            message: "真实姓名不能为空",
            trigger: "blur"
          }
        ],
        mainUser: [
          { validator: validateMainUser, required: true, trigger: "change" }
        ],
        userManagerId: [
         { validator: validateUserManagerId, required: true}
        ],
        email: [
          {
            required: false,
            message: "邮箱不能为空",
            trigger: "blur"
          },
          { type: "email", message: "请输入正确的邮箱", trigger: "change" }
        ],
        mobile: [
          {
            required: true,
            message: "手机号不能为空",
            trigger: "change"
          },
          { validator: validatePhone, trigger: "change" }
        ],
        competitorTime: [
          {
            required: true,
            type: "date",
            message: "时间不能为空",
            trigger: "change"
          }
        ],
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
            message: "是否竞争关系用户不能为空",
            trigger: "change"
          }
        ],
        isExtendTrial: [
          {
            required: true,
            message: "继承试阅权限不能为空",
            trigger: "change"
          }
        ]
      },
      loading: false,
      addUserModal: false,
      isChangeOk: false,
      mainListId: [],
      mainListRealname: [],
      addsForm: {
        isExtendFormal: "1", //继承正式权限
        isExtendTrial: "1", //继承试阅权限
        isCompetitor: "0", //是否竞争对手用户
        competitorTime: '', //到期时间
        username: "", //用户名
        isMain: "0", //是否主用户
        email: "", //邮箱
        mobile: "", //手机
      },
      userId: [],
      mangersId: [],
      userName: [],
      mangersName: []
    };
  },
  created() {
    this.getMainUser();
  },
  methods: {
    doAdd() {
      
      let _this = this;
      let that = this;

       let flag = true;
      this.$refs.addForm.validate(valid => {
        if (valid) { 
        }
        else {
          flag =  false;
        }
      });
      if(!flag)
      {
        that.addUserModal = true;
        return ;
      }
    
      let date = new Date(this.addsForm.competitorTime);
      let time1 = date.getTime();
      let mangerIds = this.addsForm.userManagerId;
      console.log(mangerIds);
      this.$refs.addForm.validate(valid => {
        this.disabledbtn=true;
        if (valid) {
          // 校验通过
          let form = {
            username: this.addsForm.username,
            email: this.addsForm.email,
            mobile: this.addsForm.mobile,
            isExtendFormal: parseInt(this.addsForm.isExtendFormal),
            isExtendTrial: parseInt(this.addsForm.isExtendTrial),
            isCompetitor: parseInt(this.addsForm.isCompetitor),
            competitorTime: time1,
            userManagerId: mangerIds,
            realName: this.addsForm.realName,

            createTime: 0,
            disabled: 1,
            id: 279,
            lastAccess: 0,
            loginTime: 0,
            mainUserId: this.addsForm.mainUser,
            memberId: this.memberId,
            operatorId: 0,
            operatorName: "",
            password: "",
            phone: this.addsForm.mobile,
            regIp: "",
            regSource: 0,
            regSourceUrl: "",
            regTime: 0,
            regType: 0,
            type: 0,
            userProfileId: 0,
            accountNo: 0,
            version: 0
          };
          this.$Spin.show();
          axios({
            url: "/crm/userbase/save_user",
            method: "post",
            data: form
          }).then(resp => {
              if (resp.data.status == "200") {
                this.$Spin.hide();
                this.$Message.success("添加成功");
                this.$emit("getUserList1");
                // 清空一下所有已经填写的值
                this.$refs.addForm.resetFields();
              } else {
                this.$Spin.hide();
                this.$Message.warning(resp.data.message);
                console.log(resp.data.message);
              }
            }).catch(err => {
              console.log(err);
              this.$Spin.hide();
            });
        } else {
          this.$Message.error("Fail!");
        }
        this.disabledbtn=false;
        this.addUserModal = false;
        this.$emit("hide-modal");
      });
      
    },
    cancel() {
      this.$emit("hide-modal");
      this.$refs.addForm.resetFields();
      this.addUserModal = newVal;
    },
    getMainUser() {
      
      axios({
        url: "/crm/userbase/user_main_list",
        method: "get",
        params:{
          memberId: this.memberId
        }
      })
        .then(resp => {
          //console.log(resp)
          if (resp.data.status === "200") {
            const list1 = resp.data.response.map(item => {
              return {
                value: item.id,
                label: item.username
              };
            });
            this.mainList = list1;
            this.userName = resp.data.response;
            this.addsForm.mainUser = list1[0].value;
          
             this.mangersName = [];
              //const list = [];
              const obj1 = {
                userManagerid: "",
                userManagerName: ""
              };
              resp.data.response.map(item => {
                if (list1[0].value == item.id) {
                  obj1.userManagerid = item.userManagerid;
                  obj1.userManagerName = item.userManagerName;
                  this.mangersName.push(obj1);
                }
              });
              console.log(this.mangersName);
              const list = this.mangersName.map(item => {
                return {
                  value: item.userManagerid,
                  label: item.userManagerName
                };
              });
              this.employeList = list;
              this.addsForm.userManagerId = list[0].value;
          } else {
            this.$Message.warning(resp.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    onchange() {
      this.mangersName = [];
      //const list = [];
      const obj1 = {
        userManagerid: "",
        userManagerName: ""
      };
      this.userName.map(item => {
        if (this.addsForm.mainUser == item.id) {
          obj1.userManagerid = item.userManagerid;
          obj1.userManagerName = item.userManagerName;
          this.mangersName.push(obj1);
        }
      });
      console.log(this.mangersName);
      const list = this.mangersName.map(item => {
        return {
          value: item.userManagerid,
          label: item.userManagerName
        };
      });
      this.employeList = list;
      this.addsForm.userManagerId = list[0].value;
       this.$refs.addForm.validate(valid => {
        if (valid) { 
        }
      });
    }
  },
  watch: {
    showAddModal(newVal, oldVal) {
      this.addUserModal = newVal;
    }
  },
  mounted() {
    // 1
  }
};
</script>
