<style>

</style>

<template>
  <Row class="first-step">
    <Col span="24">
      <Form ref="strategyForm" :model="strategyForm" :rules="formRoles" :label-width="110">
        <Row type="flex" justify="space-between">
          <Col span="20">
            <FormItem label="优惠策略标题:" prop="strategyName">
              <Input v-model="strategyForm.strategyName" class="search-input" placeholder="请输入策略标题"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="20">
            <FormItem label="客户类型:">
              <RadioGroup v-model="strategyForm.memberType">
                <Radio label = '0'>全部</Radio>
                <Radio label = '1'>新入</Radio>
                <Radio label = '2'>续入</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="space-between">
          <Col span="10">
            <FormItem label="优惠期限:" prop="time">
              <DatePicker v-model="time" format="yyyy-MM-dd" type="daterange" placement="top-start" placeholder="请选择修改日期" class="search-input" @on-change="getOperatorTime"></DatePicker>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="20">
            <FormItem label="备注:">
              <Input v-model="strategyForm.note" type="textarea" :autosize="{minRows: 5,maxRows: 5}" placeholder="请输入备注内容"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row class="mar-t-15">
          <Col span="24" style="text-align: center">
            <FormItem>
              <Button type="primary" @click="validateData('strategyForm')">下一步</Button>
              <Button style="width: 68px; margin-left: 20px" @click="cancelNext">取消</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Col>
  </Row>
</template>

<script>
import { checkName } from '../../../components/axios/productCenter.js'
import { formatTime } from '../../../../assets/js/common.js'
export default {
  props: ['listData'],
  data (){
    const validateTime = (rule, value, callback) => {
      if(value[0] == ''|| value[1] == ''){
        callback(new Error('请输入优惠期限'));
      } else {
        callback();
      }
    };
    const validateName = (rule, value, callback) => {
      let form = {
        strategyId: this.listData.id,
        strategyName: value
      }
      checkName(form).then(res => {
        if(res.response){
          callback();
        }else {
          callback(new Error('优惠策略标题不可用'));
        }
      });
    };
    return {
      strategyForm: {
        strategyName: '',
        memberType: '0',
        note: '',
        time: ''
      },
      time: '',
      formRoles: {
        strategyName: [
          { required: true, message: '请输入策略标题', trigger: 'blur' },
          { validator: validateName, trigger: 'blur' }
        ],
        time: [
          { required: true, validator: validateTime, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    getOperatorTime (data){
      this.strategyForm.time=[];
      this.strategyForm.time.push(data[0]);
      this.strategyForm.time.push(data[1]);
    },
    // 校验数据 下一步
    validateData (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$emit('data', this.strategyForm);
          this.$emit('step', 2);
        } else {
          this.$Message.warning('请填写必填项');
          // this.$emit('step', 2);
        }
      })
    },
    //取消返回
    cancelNext () {
      this.$router.push({
        name: 'preferentialStrategyList'
      })
    },
  },
  watch: {
    listData (newVal, oldVal) {
      this.strategyForm.strategyName = newVal.strategyName
      this.strategyForm.memberType = String(newVal.memberType)
      this.strategyForm.note = newVal.note
      this.strategyForm.time = [formatTime(newVal.startTime),formatTime(newVal.endTime)]
      this.time = [formatTime(newVal.startTime),formatTime(newVal.endTime)];
    }
  }
}
</script>

