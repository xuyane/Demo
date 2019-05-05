<style lang="less" scoped>

</style>
<template>
  <Modal
    v-model="showModal"
    :title="title"
    @on-cancel="cancel">
    <Row>
      <Form :model="formItem" :label-width="100" :rules="addRules" ref="formItemT">
        <Col>
          <FormItem label="手机号:" prop="mobile">
            
            <Input v-model="formItem.mobile" v-if="formItem.id > 0"   class="search-input" placeholder="请输入手机号" disabled></Input>
            <Input v-model="formItem.mobile" v-else   class="search-input" placeholder="请输入手机号" ></Input>
          </FormItem>
        </Col>
        <Col>
          <FormItem label="第三方接口:" prop="interface">
            <Select v-model="formItem.interface" placeholder="请选择第三方接口">
              <Option v-for="item in interfaces" :value="item.value" :key="item.value">{{ item.desc }}</Option>
            </Select>
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
          <i-button @click="cancel">取消</i-button>
        </div>
  </Modal>
</template>
<script>
import {
  getUsersmsgatewayEnum,
  getUsersmsgatewaySave,
  getUsersmsgatewayUpdate
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
      interfaces: [],
      title: '',
      
      addRules: {
         mobile: [
          {
            required: true,
            message: "手机号不能为空",
            trigger: "change"
          },
          { validator: validatePhone, trigger: "change" }
        ],
        interface: [
          {
            type:'number',
            required: true,
            message: "请选择第三方接口",
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
        interface: "",
        reason: "", 
      }
    }
  },
  methods: {
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
        that.showAddModal = true;
        return ;
      }
      
      this.$Spin.show();
      let params= {
          mobile: this.formItem.mobile,
          note: this.formItem.reason,
          id: this.formItem.id,
          gateway: this.formItem.interface
        }
        if(this.formItem.id === undefined)
        {
          getUsersmsgatewaySave(params).then(resp => {
            that.$Spin.hide();
            if (resp.status == 200) {
               this.$emit('hide-modal')
               this.$emit('getListPage')
            }
          });
        }
        else{
          getUsersmsgatewayUpdate(params).then(resp => {
            that.$Spin.hide();
            if (resp.status == 200) {
              this.$emit('hide-modal')
              this.$emit('getListPage')
            }
          });
        }
    },
     // 获取枚举列表
    getlistEnum() {
      let that = this;
      this.$Spin.show();
      getUsersmsgatewayEnum().then(resp => {
        that.$Spin.hide();
        if (resp.status == 200) {
          let data = resp.response;
          that.interfaces = data;
        }
      });
    }
  },
  watch: {
    showAddModal(newVal, oldVal) {
      this.showModal = newVal
    }
  },
   created(){
     this.getlistEnum();
  }
}
</script>
