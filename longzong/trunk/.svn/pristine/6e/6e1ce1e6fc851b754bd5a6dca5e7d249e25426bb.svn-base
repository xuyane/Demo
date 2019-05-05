<style lang="less" scoped>

</style>
<template>
  <Modal
    v-model="showModal"
    title="新增黑名单"
    @on-cancel="cancel">
    <Row>
      <Form :model="formItem" :label-width="120" :rules="addRules" ref="formItemT">
        <Col>
          <FormItem label="手机号:" prop="mobile">
            <Input v-model="formItem.mobile" class="search-input" placeholder="请输入手机号"></Input>
          </FormItem>
        </Col>
        <Col>
          <FormItem label="公司名称:" prop="memberNameCn">
            <Input v-model="formItem.memberNameCn" class="search-input" placeholder="请输入公司名称" readonly></Input>
          </FormItem>
        </Col>
        <Col>
          <FormItem label="用户名:" prop="username">
            <Input v-model="formItem.username" class="search-input" placeholder="请输入用户名" readonly></Input>
          </FormItem>
        </Col>
        <Col>
          <FormItem label="原因:" prop="reason">
            <Input v-model="formItem.reason" class="search-textarea" type="textarea" :rows="4" placeholder="请输入原因"></Input>
          </FormItem>
        </Col>
      </Form>
    </Row>
     <div slot="footer">
          <i-button type="primary" @click="addOk">确定</i-button>
          <i-button @click="noOk">取消</i-button>
        </div>
  </Modal>
</template>
<script>
import {
  getUsersmsblackSave,
  getUsersmsblackInfoByMobile
} from "../../components/axios/crm.js";
export default {
  props: {
    showAddModal: Boolean
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
    return {
      showModal: false,
      addRules: {
         mobile: [
          {
            required: true,
            message: "手机号不能为空",
            trigger: "change"
          },
          { validator: validatePhone, trigger: "change" }
        ],
        memberNameCn: [
          {
            required: true,
            message: "公司名称不能为空",
            trigger: "change"
          }
        ],
         username: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "change"
          }
        ],
        reason: [
          {
            required: true,
            message: "原因不能为空",
            trigger: "change"
          }
        ]
      },
      formItem: {
        mobile: "",
        memberNameCn: "",
        username: "",
        reason: "", 
      }
    }
  },
  methods: {
    noOk() {
      this.showModal = false
      this.$emit('hide-modal')
      this.$refs.formItemT.resetFields();
    },
    cancel() {
      this.showModal = false
      this.$emit('hide-modal')
      this.$refs.formItemT.resetFields();
    },
    addOk() {
      let that = this;
      let flag = true;
      this.$refs.formItemT.validate(valid => {
        if (valid) { 
        }
        else {
          flag =  false;
        }
      });
      if(!flag)
      {
        that.showModal = true;
        return ;
      }
      this.$Spin.show();
      let params= {
          mobile: this.formItem.mobile,
          userId: this.formItem.userId,
          phone: this.formItem.mobile,
          adminId: this.formItem.adminId,
          note: this.formItem.reason
        }
        getUsersmsblackSave(params).then(resp => {
        that.$Spin.hide();
        if (resp.status == 200) {
         // this.$router.go(-1);
         this.$emit('hide-modal');
         this.$emit('getListPage')
        }
        else{
              this.$Message.warning(resp.data.message);
              console.log( resp.data.message)
            }
      });
    },
    getListPage(mobile) {
      const that = this;
      this.$Spin.show();
      let params= {
        mobile: mobile
      }
      getUsersmsblackInfoByMobile(params).then(resp => {
        that.$Spin.hide();
        if (resp.status == 200) {
          let data = resp.response;
          that.formItem = data;
        }
      });
    }
  },
  watch: {
    showAddModal(newVal, oldVal) {
      this.showModal = newVal
    },
    "formItem.mobile":function(val) {
            this.formItem.mobile = val;
            if(val.length === 11)
            {
              this.getListPage(val);
            }
        }
  }
}
</script>
