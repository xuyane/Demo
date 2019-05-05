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
                当前位置：客户关系管理&nbsp;&nbsp;>>&nbsp;&nbsp;系统配置&nbsp;&nbsp;>>&nbsp;&nbsp; 新增分配业务员规则
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
                        <FormItem label="规则名称：" prop="ruleName">
                          <Input v-model="formValidate.ruleName"  style='width:300px'></Input>
                        </FormItem>
                        <FormItem label="自动分配：" prop="mail">
                          <i-switch v-model="formValidate.type" size="large">
                            <span slot="open" label='1'>开</span>
                            <span slot="close" label='0'>关</span>
                          </i-switch>
                        </FormItem>
                        <FormItem label="是否重复：" >
                          <RadioGroup v-model="formValidate.repeatType" @on-change='changeradio'>
                            <Radio  v-for="(item,index) in radio" :key='index' :label='item.value'>{{item.desc}}</Radio>
                          </RadioGroup>
                        </FormItem>
                        
                        <FormItem label="指定时间：" prop='datewrap' v-if="formValidate.repeatType=='6'"   >
                          <Row>
                            <Col span="12">
                              <DatePicker type="datetimerange" v-model="formValidate.datewrap" style="width: 250px"></DatePicker>
                            </Col>
                        </Row>
                        </FormItem>
                        <FormItem label="指定时间：" prop='timewrap'  v-else>
                          <Row>
                            <Col span="12">
                              <TimePicker v-model='formValidate.timewrap' format="HH:mm:ss" type="timerange" placement="bottom-end"  style="width: 250px"></TimePicker>
                            </Col>
                        </Row>
                        </FormItem>
                        <FormItem>
                          <Button type="primary" @click="confirm">确定</Button>
                          <Button style="margin-left: 8px" @click="cancel">取消</Button>
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
import axios from "axios";
import {
  newRulerApi, // 获取自动分配业务员配置信息列表
  queryAllDistributeRepeatType
} from "../../../components/axios/crm.js";
export default {
  components: {
    oilPage
  },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value[0] == "") {
        callback(new Error("指定时间不为空"));
      } else {
        callback();
      }
    };
    const validatetime = (rule, value, callback) => {
      if (value[0] == "") {
        callback(new Error("指定时间不为空"));
      } else {
        callback();
      }
    };
    return {
      spinShow:false,
      radio: [],

      formValidate: {
        type: true,
        repeatType: 0
      },
      ruleValidate: {
        ruleName: [
          { required: true, message: "规则名称不能为空", trigger: "blur" }
        ],
        datewrap: [
          {
            required: true,
            validator: validatePass,
            trigger: "blur"
          }
        ],
        timewrap: [
          {
            required: true,
            validator: validatetime,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    time_to_sec(time) {
      var s = "";

      var hour = time.split(":")[0];
      var min = time.split(":")[1];
      var sec = time.split(":")[2];

      s = (Number(hour * 3600) + Number(min * 60) + Number(sec))*1000;

      return s;
    },
    changeradio() {
      this.formValidate.timewrap = [];
      this.formValidate.datewrap = [];
    },
    // 确定
    confirm() {
      this.$refs.formValidate.validate(valid => {
        if (valid) {
          this.formValidate.status = this.formValidate.type == true ? 1 : 0;
          if (this.formValidate.repeatType == "6") {
            this.formValidate.startEffectTime =
              Date.parse(new Date(this.formValidate.datewrap[0])) ;
            this.formValidate.endEffectTime =
              Date.parse(new Date(this.formValidate.datewrap[1])) ;
          } else {
            this.formValidate.startEffectTime = this.time_to_sec(
              this.formValidate.timewrap[0]
            );
            this.formValidate.endEffectTime = this.time_to_sec(
              this.formValidate.timewrap[1]
            );
          }
          this.spinShow=true;
          var data=this.formValidate;
          delete data.type;
          delete data.datewrap;
          delete data.timewrap;
          var that=this;
          newRulerApi(data).then(resp => {
            that.spinShow=false;
            that.$Message.success(resp.message);
            that.$router.go(-1)
          });
        } else {
          // this.$Message.error("Fail!");
        }
      });
    },
    //取消
    cancel() {
      this.$router.go(-1)
    },
    getradio() {
      var that = this;
      this.spinShow=true;
      queryAllDistributeRepeatType().then(res => {
        that.spinShow=false;
        that.radio = res.response;
      });
    }
  },
  created() {
    this.getradio();
  }
};
</script>

