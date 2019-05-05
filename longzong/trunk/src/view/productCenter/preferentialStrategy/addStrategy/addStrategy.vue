<style lang="less" scoped>
</style>

<template>
  <Row>
    <Col span="24">
    <Row class-name="current-position">
      当前位置：产品中心&nbsp;&nbsp;>>&nbsp;&nbsp;优惠策略&nbsp;&nbsp;>>&nbsp;&nbsp;新增策略
    </Row>
    </Col>
    <Col span="24">
    <Row class-name="add-container">
      <p class="title">新增策略</p>
      <div class="step-container">
        <span class="step1 active">1 基本信息</span>
        <span class="step2" :class="step > 1 ? 'active' : ''">2 优惠政策</span>
      </div>
    </Row>
    <!-- 第一步 基础信息 -->
    <Row class-name="form-container" v-show="step === 1">
      <Col :lg="16" :md="24">
      <first-step ref="firstStep" @step="toStep" @data="getStepOneData"></first-step>
      </Col>
    </Row>

    <!-- 第二步 优惠政策 -->
    <Row class-name="form-container" v-show="step === 2">
      <Col :lg="16" :md="24">
      <second-step ref="secondStep" @step="toStep"></second-step>
      <Row class="mar-t-15">
        <Col span="24" style="text-align: center">
        <Button type="primary" @click="toStep(1)">上一步</Button>
        <Button type="primary" style="width: 68px; margin-left: 20px" @click="save">保存</Button>
        <Button style="width: 68px; margin-left: 20px" @click="cancel">取消</Button>
        </Col>
      </Row>
      </Col>
    </Row>
    </Col>
  </Row>
</template>

<script>
  import FirstStep from './firstStep.vue'
  import SecondStep from './secondStep.vue'
  import { formatStamp } from '../../../../assets/js/common.js'
  import { addStrategy } from '../../../components/axios/productCenter.js'
  export default {
    components: {
      FirstStep,
      SecondStep
    },
    data() {
      return {
        step: 1,
        strategyForm: {
          endTime: 0,
          items: [],
          memberType: 0,
          note: '',
          startTime: 0,
          strategyName: '',
          sign: ''
        }
      }
    },
    created() {

    },
    methods: {
      toStep(step) {
        this.step = step
      },
      //时间戳
      moretime(time){
        var nowTime = time;
        var thisTime = nowTime;
        thisTime = thisTime.replace(/-/g, '/');
        var times = new Date(thisTime);
        times = times.getTime();
        return times
      },
      //获取第一步数据
      getStepOneData(data) {
        this.strategyForm.startTime =this.moretime(data.time[0]);
        this.strategyForm.endTime = this.moretime(data.time[1]);
        // this.strategyForm.endTime = formatStamp(data.time[1]);
        // this.strategyForm.startTime = formatStamp(data.time[0]);
        this.strategyForm.memberType = parseInt(data.memberType);
        this.strategyForm.note = data.note;
        this.strategyForm.strategyName = data.strategyName;
      },
      //取消返回
      cancel() {
        this.$router.push({
          name: 'preferentialStrategyList'
        })
      },
      //保存
      save() {
        this.$Spin.show();
        let secondStepData = this.$refs.secondStep.items;
        console.log("表格步骤数据", secondStepData)
        for (let i = 0; i < secondStepData.length; i++) {
          if (secondStepData[i].type == 1) {
            if (secondStepData[i].productNumMin == null && secondStepData[i].productNumMax == null) {
              this.$Message.error("请输入第" + (i + 1) + "个优惠政策产品数量");
              this.$Spin.hide();
              return false;
            } else if (secondStepData[i].productNumMin != null && secondStepData[i].productNumMax != null && secondStepData[i].productNumMin > secondStepData[i].productNumMax) {
              this.$Message.error("请输入第" + (i + 1) + "个优惠政策最小产品数量不能大于最大产品数量");
              this.$Spin.hide();
              return false;
            } else if (secondStepData[i].contractAmountMin == null && secondStepData[i].contractAmountMax == null) {
              this.$Message.error("请输入第" + (i + 1) + "个优惠政策合同金额");
              this.$Spin.hide();
              return false;
            } else if (secondStepData[i].contractAmountMin != null && secondStepData[i].contractAmountMax != null && secondStepData[i].contractAmountMin > secondStepData[i].contractAmountMax) {
              this.$Message.error("请输入第" + (i + 1) + "个优惠政策最小合同金额不能大于最大合同金额");
              this.$Spin.hide();
              return false;
            } else if ((secondStepData[i].rebate == null || secondStepData[i].rebate == 0) && secondStepData[i].gift == '' && secondStepData[i].expandTime == '') {
              this.$Message.error("请选择第" + (i + 1) + "个优惠政策");
              this.$Spin.hide();
              return false;
            }
          } else {
            if (secondStepData[i].cproductNames == '') {
              this.$Message.error("请输入第" + (i + 1) + "个优惠政策产品");
              this.$Spin.hide();
              return false;
            } else if (secondStepData[i].contractAmountMin == null && secondStepData[i].contractAmountMax == null) {
              this.$Message.error("请输入第" + (i + 1) + "个优惠政策合同金额");
              this.$Spin.hide();
              return false;
            } else if (secondStepData[i].contractAmountMin != null && secondStepData[i].contractAmountMax != null && secondStepData[i].contractAmountMin > secondStepData[i].contractAmountMax) {
              this.$Message.error("请输入第" + (i + 1) + "个优惠政策最小合同金额不能大于最大合同金额");
              this.$Spin.hide();
              return false;
            } else if ((secondStepData[i].packPrice == 0 || secondStepData[i].packPrice == null) && secondStepData[i].gift == '' && secondStepData[i].expandTime == '' && secondStepData[i].dproductNames == '') {
              this.$Message.error("请选择第" + (i + 1) + "个优惠政策");
              this.$Spin.hide();
              return false;
            }
          }
        }

        this.strategyForm.items = secondStepData.map(item => {
          if (item.type == 1) {
            if (item.rebate == 0) {
              item.rebate = null;
            } else if (item.rebate != null) {
              item.rebate = Number((item.rebate * 0.01).toFixed(2));
            }
            return {
              productNumMin: item.productNumMin,
              productNumMax: item.productNumMax,
              contractAmountMin: item.contractAmountMin,
              contractAmountMax: item.contractAmountMax,
              contractTime: item.contractTime,
              productCategoryCode: item.productCategoryCode,
              rebate: item.rebate,
              gift: item.gift,
              expandTime: item.expandTime,
              cproductNames: '',
              cproductIds: '',
              packPrice: item.packPrice,
              dproductNames: '',
              dproductIds: '',
              sign: ''
            }
          } else {
            return {
              productNumMin: null,
              productNumMax: null,
              contractAmountMin: item.contractAmountMin,
              contractAmountMax: item.contractAmountMax,
              contractTime: item.contractTime,
              productCategoryCode: item.productCategoryCode,
              rebate: null,
              gift: item.gift,
              expandTime: item.expandTime,
              cproductNames: item.cproductNames,
              cproductIds: item.cproductIds,
              packPrice: item.packPrice,
              dproductNames: item.dproductNames,
              dproductIds: item.dproductIds,
              sign: ''
            }
          }
        })
        console.log("传数据", this.strategyForm)
        addStrategy(this.strategyForm).then(res => {
          this.$Message.success("新增成功！！！");
          this.$Spin.hide();
          this.$router.push({
            name: 'preferentialStrategyList'
          })
        })
      }
    }
  }
</script>