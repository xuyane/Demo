<style lang="less" scoped>
  .red {
    color: red;
  }
</style>
<template>
  <Modal
    v-model="showModal"
    title="发送短信"
    width="600"
    @on-cancel="cancel">
    <Row>
      <Form :model="formItem" ref="formItem" :rules="addRules">
         <Col>
          <FormItem prop="username">
            <Select v-model="formItem.username" placeholder="请选择发送类型">
              <Option v-for="(item, index) in userinfos" :value="index" :key="index">{{ item.username }}({{ item.mobile }})</Option>
            </Select>
          </FormItem>
        </Col>
        <Col>
          <FormItem prop="replyType">
            <Select v-model="formItem.replyType" placeholder="请选择发送类型">
              <Option v-for="(item, index) in replyTypes" :value="index" :key="index">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col>
          <FormItem prop="content">
            <Input v-model="formItem.content" class="search-textarea" type="textarea" :rows="4" placeholder="请输入发送内容" :maxlength="60"></Input>
          </FormItem>
          <div>您当前已输入<span class="red">{{formItem.content.length}}</span>个字符,最多60字符</div>
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
  getUsersmstemplateList,
  getUsersmssendSave,
  queryUserList,
} from "../../../components/axios/crm.js";
export default {
  props: {
    showMessageModal: Boolean,
    rowData: Object
  },
  data() {
    return {
      showModal: false,
      replyTypes: [],
      userinfos: [],
      lineData: {},
      addRules: {
        replyType: [
          {
            type:'number',
            required: true,
            message: "发送类型不能为空",
            trigger: "change"
          }
        ],
        content: [
          {
            required: true,
            message: "发送内容不能为空",
            trigger: "change"
          }
        ]
      },
      formItem: {
        content: '',
        replyType: null,
        username:0,
      }
    }
  },
  methods: {
    cancel() {
      this.userinfos=[];
      this.formItem={
        content: '',
        replyType: null,
        username:0,
      };
      this.showModal = false
      this.$emit('hide-modal')
      this.$refs.formItem.resetFields();
    },
    addOk () {
      let userId = this.lineData.userId;
      let that = this;
      this.$refs.formItem.validate(valid => {
        if (valid) { 
          this.$Spin.show();
          let params= {
            mobile: this.userinfos[this.formItem.username].mobile,
            gateway: this.replyTypes[this.formItem.replyType].gateway,
            type:1,
            status:1,
            isResend:0,
            isSend:1,
            templateId: this.replyTypes[this.formItem.replyType].id,
            content: this.formItem.content
          }
          getUsersmssendSave(params).then(resp => {
            this.$Message.success('发送成功')
            that.$Spin.hide();
            this.$emit('hide-modal');
          });
        }
      })
    },
    getlist() {
      let that = this;
      getUsersmstemplateList().then(resp => {
        let data = resp.response;
        that.replyTypes = data;
      });
    },
     // 关联号码
    getUserInfoList() {
      let that = this;
      var data = {
        memberId: this.lineData.memberId,
      };
      that.$Spin.show();
      queryUserList(data).then(resp => {
        that.$Spin.hide();
        that.userinfos = resp.response;
      });
    },
  },
  created(){
     // this.$Spin.show();
  },
  watch: {
    showMessageModal(newVal, oldVal) {
      this.showModal = newVal;
      if(newVal && this.formItem.replyType) {
        this.formItem.replyType = null
      }
    },
    "formItem.replyType":function(val) {
      if(val || val === 0) {
        console.log(val)
        this.formItem.content = this.replyTypes[val].content
      }
    },
    rowData(newVal, oldVal) {
      this.lineData = newVal
      this.getlist()
      this.getUserInfoList()
    }
  }
}
</script>
