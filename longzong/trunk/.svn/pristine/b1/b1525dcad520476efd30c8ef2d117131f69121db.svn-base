<style lang="less">
  .ivu-select-dropdown {
    z-index: 1000
  }
</style>
<template>
  <Row>
    <Col span="24">
      <Row class-name="current-position">
        当前位置：客户关系管理&nbsp;&nbsp;>>&nbsp;&nbsp;
        <span v-show="addOrEdit === 1">新增模板</span>
        <span v-show="addOrEdit === 2">编辑模板</span>
      </Row>
    </Col>
    <Col span="24" class-name="search-form">
      <Form :model="formItem" :label-width="100" :rules="addRules" ref="formItemT">
        <Col>
          <FormItem label="短信类型:" class="maxIndex" prop="messageType">
            <Input v-model="formItem.messageType" class="search-input" placeholder="请输入短信类型"></Input>
          </FormItem>
        </Col>
        <Col style="margin-left: 100px;margin-bottom: 20px">
          <Button type="primary" @click="addMemberName">公司名称</Button>
          <Button  type="primary" @click="addUserName">用户名称</Button>
        </Col>
        <Col>
          <FormItem label="短信内容:" prop="defaultMsg">
            <!-- <UE :defaultMsg="defaultMsg" :config="config" ref="ue"></UE> -->
            <Input v-model="formItem.defaultMsg" class="search-textarea" type="textarea" :rows="6" placeholder="请输入短信内容" maxlength="60"></Input>
          </FormItem>
        </Col>
        <Col >
          <FormItem label="短信通道:" prop="types">
          <RadioGroup v-model="formItem.types">
              <Radio  v-for='(option,index) in gatewayEnum'   :key='option.value'  :label="option.value" class="discountitem">{{option.desc}}</Radio>
          </RadioGroup>
          </FormItem>
        </Col>
        <Col>
         <FormItem label="模板属性:">
          <RadioGroup v-model="formItem.typeVodio">
            <Radio label='2' value='2'>私有</Radio>
            <Radio label='1' value='1'>公共</Radio>
          </RadioGroup>
          </FormItem>
        </Col>
        <Col class="text-center">
          <Button type="primary" class="search-btn" @click="getUEContent">确定</Button>
          <Button class="search-btn" @click="back">取消</Button>
        </Col>
      </Form>
    </Col>
  </Row>
</template>
<script>
// import UE from '../../components/richEdit/ueditor';
import {
  getUsersmsgatewayEnum,
  getUsersmstemplateSave,
  getUsersmstemplateUpdate
} from "../../components/axios/crm.js";
export default {
  data() {
    return {
      gatewayEnum: [],
      addOrEdit: this.$route.query.addOrEdit || 1,
     // defaultMsg: this.$route.query.content || '请输入内容',
      config: {
        initialFrameWidth: null,
        initialFrameHeight: 350
      },
      addRules: {
         messageType: [
          {
            required: true,
            message: "短信类型不能为空",
            trigger: "change"
          }
        ],
        types: [
          {
            type:'number',
            required: true,
            message: "短信通道不能为空",
            trigger: "change"
          }
        ],
        defaultMsg: [
          {
            required: true,
            message: "短信内容不能为空",
            trigger: "change"
          }
        ]
      },
      formItem: {
        messageType: this.$route.query.name || '',
        types:this.$route.query.gateway || 0,
        defaultMsg: this.$route.query.content || '',
        id: this.$route.query.id,
        typeVodio:this.$route.query.type || '2'
      }
    }
  },
  components: {
    // UE
  },
  methods: {
    getUEContent() {
      let that = this;
      this.$refs.formItemT.validate(valid => {
        if (valid) { 
          this.$Spin.show();
          let params= {
            content: this.formItem.defaultMsg,
            name: this.formItem.messageType,
            id: this.formItem.id,
            type: this.formItem.typeVodio,
            gateway: this.formItem.types
          }
          if(this.formItem.id === undefined) {
            getUsersmstemplateSave(params).then(resp => {
              that.$Spin.hide();
              if (resp.status == 200) {
                this.$router.push({
                  name: "templet"
                });
              } else {
                this.$Message.warning(resp.data.message)
              }
            });
          } else {
            getUsersmstemplateUpdate(params).then(resp => {
              that.$Spin.hide();
              if (resp.status == 200) {
                this.$router.push({
                  name: "templet"
                });
              }
              else{
                this.$Message.warning(resp.data.message)
              }
            });
          }
        }
      })
    },
    addMemberName() {
      this.formItem.defaultMsg += '${memberName}'
    },
    addUserName() {
      this.formItem.defaultMsg += '${username}'
    },
     // 获取枚举列表
    getlistEnum() {
      let that = this;
      this.$Spin.show();
      getUsersmsgatewayEnum().then(resp => {
        that.$Spin.hide();
        if (resp.status == 200) {
          let data = resp.response;
          that.gatewayEnum = data;
        }
      });
    },
    back() {
      this.$refs.formItemT.resetFields();
      this.$router.push({
        name: 'templet'
      })
    }
  },
   created(){
    this.getlistEnum();
  }
}
</script>
