<style lang="less" scoped>

</style>
<template>
  <Modal
    v-model="showModal"
    title="重置密码"
    @on-cancel="cancel"
    @on-ok="ok">
    <Row>
      <Form ref="formItem" :model="formItem" :rules="formRule" :label-width="80">
        <Col span="24">
          <FormItem label="用户名：" prop="username">
            <Input v-model="formItem.username" class="search-input" readonly></Input>       
          </FormItem>
        </Col>
        <Col span="24">
          <FormItem label="手机号：" prop="mobile">
            <Input v-model="formItem.mobile" class="search-input" readonly></Input>       
          </FormItem>
        </Col>
        <Col span="24">
          <Col span="16">
            <FormItem label="验证码：" prop="captcha">
              <Input v-model="formItem.captcha" class="search-input"></Input>       
            </FormItem>
          </Col>
          <Col span="6" style="float: right; margin-top: 3px;">
            <Button v-if="!sendMsg" type="primary" ref="buttonRef" @click="getCaptcha">获取验证码</Button>
            <Button v-if="sendMsg">{{time}}秒后获取</Button>
          </Col>
        </Col>
      </Form>
    </Row>
  </Modal>
</template>
<script>
import {
  getCaptcha,
  resetPassword
} from '../../../components/axios/crm'
import {
  formData
} from '../../../../assets/js/common'
export default {
  props: {
    showPasswordModal: Boolean,
    rowData: Object
  },
  data() {
    return {
      showModal: false,
      sendMsg: false,
      lineData: {},
      time: 0,
      timer: null,
      formItem: {
        username: '',
        mobile: '',
        captcha: ''
      },
      formRule: {
        username: [
          {required: true, message: "请输入用户名", trigger: "blur"}
        ],
        mobile: [
          {required: true, message: "请输入手机号", trigger: "blur"}
        ],
        captcha: [
          {required: true, message: "请输入验证码", trigger: "blur"}
        ]
      }
    }
  },
  methods: {
    cancel() {
      this.showModal = false
      window.clearInterval(this.timer)
      this.time = 0
      this.sendMsg = false
      this.$emit('hide-modal')
    },
    ok() {
      this.$refs.formItem.validate(valid => {
        if(valid) {
          resetPassword(formData(this.formItem)).then(res => {
            console.log(res)
            this.$emit('hide-modal')
          })
        }
      })
    },
    // 获取验证码
    getCaptcha() {
      let that = this
      let params = {
        username: this.formItem.username,
        mobile: this.formItem.mobile
      }
      getCaptcha(formData(params)).then(res => {
        this.sendMsg = true
        this.time = res.response.expiration_time
        // window.clearInterval(this.timer)
        this.timer = window.setInterval(function() {
          if((that.time--) <= 0) {
            that.sendMsg = false
          }
        }, 1000)
      })
    }
  },
  watch: {
    showPasswordModal(newVal, oldVal) {
      this.showModal = newVal
    },
    rowData(newVal, oldVal) {
      this.lineData = newVal
      this.formItem = {
        username: newVal.username || '',
        mobile: newVal.mobile || '',
      }
    }
  }
}
</script>
