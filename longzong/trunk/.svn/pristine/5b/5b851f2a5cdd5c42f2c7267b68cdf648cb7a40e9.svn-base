<style lang="less" >
@import "./workBench.less";
</style>

<template>
  <div>
    <div class="top-header">
      <top-header></top-header>
    </div>
    <div class='box clearfix'>
        <left-msg></left-msg>
          <Row class='right-content'>
            <nav-menu></nav-menu>   
                <!-- 业务员        -->
            <sale-men v-if="isshow"></sale-men>
                <!-- 业务员        -->
                <!-- 经理        -->
            <manage-men  v-if="isshow"></manage-men>
                <!-- 经理        -->
                <!-- 客服-->
            <customer-service v-if="isshow"></customer-service>
            <!-- 客服-->
            <!-- 总经理 -->
            <general-man  ></general-man>
            <!-- 总经理 -->
          </Row>
    </div>
  </div>
</template>

<script>
import topHeader from "../../header/header.vue";
import leftMsg from "../leftUserMsg/leftUserMsg.vue";
import saleMen from "./SMWorkBench/SMWorkBench.vue";
import navMenu from "./navMenu.vue";
import customerService from "./CSWorkBench/CSWorkBench.vue";
import manageMen from "./MMWorkBench/MMWorkBench.vue";
import generalMan from "./GMWorkBench/GMWorkBench.vue";
// import aimEchart from "./aimEchart.vue";
// import customAccount from "./customAccount.vue";
// import accountStatistics from "./accountStatistics.vue";
// import comparisonHistogram from "../../productCenter/comparisonHistogram.vue";
export default {
  components: {
    topHeader,
    navMenu,
    leftMsg,
    saleMen,
    manageMen,
    customerService,
    generalMan
  },
  data() {
    return{
      isshow:false,
      menu: [
        {
          key: "0",
          name: "用户注册"
        },
        {
          key: "1",
          name: "用户分配"
        },
        {
          key: "2",
          name: "用户划转"
        },
        {
          key: "3",
          name: "我的用户"
        },
        {
          key: "4",
          name: "用户搜索"
        },
        {
          key: "5",
          name: "报表"
        },
        {
          key: "6",
          name: "合同管理"
        },
        {
          key: "7",
          name: "用户通知"
        },
        {
          key: "8",
          name: "合同推广"
        },
        {
          key: "9",
          name: "用户通讯录"
        }
      ],
    }
  },
  methods: {
    
  }
};
</script>