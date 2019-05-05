<style >
.navbox {
  margin-bottom: 20px;
}
.ivu-steps-horizontal .ivu-steps-content {
  padding-left: 0;
}
</style>
<template>
  <Row class='varietybox'>
        <i-col span="24">
            <Row class-name="current-position">
                当前位置：客户关系管理&nbsp;&nbsp;>>&nbsp;&nbsp;系统配置&nbsp;&nbsp;>>&nbsp;&nbsp; 自动分配业务员规则审批
            </Row>
        </i-col>
        <Col span='24'>
            <Row :gutter="20">
                <Col span='24' >
                  <Card  >
                    <dl class="navbox">
                      <dt style="font-weight:bold">分配规则说明：</dt>
                      <dd>规则生效后，外部注册的用户直接分配给业务员，自动分配客服和客服手工分配功能不可用；如果同一时间内多个规则，讲按照以下优先级进行生效，建议不要设置冲突的规则。</dd>
                      <dd>工作：临时->上午,下午->工作时间&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;周末：临时->上午,下午->周末->永久</dd>
                    </dl>
                    <div style='width:600px'>
                      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
                        <FormItem label="规则名称：" >
                          <Input v-model="formValidate.ruleName" readonly style='width:300px'></Input>
                        </FormItem>
                        <FormItem label="自动分配：" prop="mail">
                          <i-switch v-model="formValidate.type" disabled size="large">
                            <span slot="open">开</span>
                            <span slot="close">关</span>
                          </i-switch>
                        </FormItem>
                        <FormItem label="是否重复："  prop="city">
                          <RadioGroup v-model="formValidate.repeatType" >
                            <Radio label="永久"disabled>永久</Radio>
                            <Radio label="工作时间" disabled>工作时间</Radio>
                            <Radio label="上午" disabled>上午</Radio>
                            <Radio label="下午"disabled>下午</Radio>
                            <Radio label="周末" disabled>周末</Radio>
                            <Radio label="法定假日" disabled>法定假日</Radio>
                            <Radio label="临时" disabled>临时</Radio>
                          </RadioGroup>
                        </FormItem>
                        <FormItem label="指定时间：" v-if="formValidate.repeatType=='临时'"   >
                          <Row>
                            <Col span="12">
                              <DatePicker type="datetimerange" v-model="formValidate.effectTime" readonly style="width: 250px"></DatePicker>
                            </Col>
                        </Row>
                        </FormItem>
                        <FormItem label="指定时间："  v-else>
                          <Row>
                            <Col span="12">
                              <TimePicker v-model='formValidate.effectTime' format="HH:mm:ss" readonly type="timerange" placement="bottom-end"  style="width: 250px"></TimePicker>
                            </Col>
                        </Row>
                        </FormItem>
                        <FormItem label="审批信息：">
                          <Steps :current="1" v-model="formValidate.step">
                            <Step title="" content="客服经理"></Step>
                            <Step title="" content="营销总监"></Step>
                            <Step title="" content="领导"></Step>
                          </Steps>
                        </FormItem>
                        <FormItem label="审批意见：">
                          <Input v-model="formValidate.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
                        </FormItem>
                        <FormItem>
                          <Button type="primary" @click="pass">通过</Button>
                          <Button type="error" style="margin-left: 8px" @click="reject">驳回</Button>
                          <Button style="margin-left: 8px" @click="goback">返回</Button>
                        </FormItem>
                      </Form>
                    </div>
                  </Card>
                </Col>
                
            </Row>
            
        </Col>
        <Spin size="large" fix v-if="spinShow"></Spin>
    </Row>
</template>

<script>
import timeStampChange from "../../../../assets/js/timestamp_change.js";
import oilPage from "../../../components/page/page.vue";
import { formData } from "../../../../assets/js/common.js";
import axios from "axios";
import {
  queryRuleById, // 获取自动分配业务员配置信息列表
  auditRuleById //审核
} from "../../../components/axios/crm.js";
export default {
  components: {
    oilPage
  },
  data() {
    return {
      spinShow:false,
      formValidate: {},
      ruleValidate: {}
    };
  },
  methods: {
    // 返回
    goback() {
      this.$router.go(-1);
    },
    //获取规则信息
    getmsg() {
      let msg = {
        ruleId: this.$route.query.id
      };
      var that = this;
      that.spinShow=true
      queryRuleById(msg).then(resp => {
        that.spinShow=false
        that.formValidate = resp.response;
        that.formValidate.type = resp.response.type == 0 ? false : true;
        that.formValidate.effectTime = resp.response.effectTime.split("~");
      });
    },
    //通过
    pass() {
      this.$Modal.confirm({
        title: "提示",
        content: "<p>确定要通过该规则吗？</p>",
        onOk: () => {
          let msg = {
            ruleId: this.$route.query.id,
            auditStatus: 1,
            auditMessage: this.formValidate.textarea
          };
          let that = this;
          that.spinShow=true;
          auditRuleById(msg).then(resp => {
            that.spinShow=false;
            that.$Message.info(resp.message);
            that.$router.go(-1);
          });
        },
        onCancel: () => {}
      });
    },
    //驳回
    reject() {
      this.$Modal.confirm({
        title: "提示",
        content: "<p>确定要驳回该规则吗？</p>",
        onOk: () => {
          let msg = {
            ruleId: this.$route.query.id,
            auditStatus: 2,
            auditMessage: this.formValidate.textarea
          };
          let that = this;
          that.spinShow=true;
          auditRuleById(msg).then(resp => {
            that.spinShow=false
            that.$Message.info(resp.message);
            that.$router.go(-1);
          });
        },
        onCancel: () => {}
      });
    }
  },
  created() {
    this.getmsg();
  }
};
</script>

