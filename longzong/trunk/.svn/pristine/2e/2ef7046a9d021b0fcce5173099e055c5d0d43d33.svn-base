
<style lang="less" scoped>
.tab {
  padding: 20px 0 0 50px;
  background: #fff;
}
</style>

<template>
  <Row>
    <Col span="24">
      <Row class-name="current-position">
        当前位置：营销报表&nbsp;&nbsp;>>&nbsp;&nbsp;营销指标>>&nbsp;&nbsp;部门指标
      </Row>
    </Col>
    <Col span="24" class="tab">
      <tab-header :tab="tab" :tab-list="tabList" @tab="tabChange"></tab-header>
    </Col>
    <Col span="24">
      <keep-alive>
        <component :is="currentComp"></component>
      </keep-alive>
    </Col>
  </Row>
</template>

<script>
import axios from "axios";
import TabHeader from "../../components/tab/tab.vue";
import achievementstatisticalorgReport from "./achievementsStatisticalOrgReport.vue";
import productcategoryorgReport from "./productCategoryOrgReport.vue";
import customermanagementorgReport from "./customerManagementOrgReport.vue";
import callorgReport  from "./callOrgReport.vue";

export default {
  components: {
    TabHeader,
    achievementstatisticalorgReport,
    productcategoryorgReport,
    callorgReport,
    customermanagementorgReport
  },
  computed: {
    currentComp() {
      return this.tab === 1 ? 'achievementstatisticalorgReport' : this.tab === 2 ? 'productcategoryorgReport' : this.tab === 3 ? 'customermanagementorgReport' : 'callorgReport'
    }
  },
  data() {
    return {
      tab: 1,
      tabList: [
        {
          tab: 1,
          title: "业绩统计"
        },
        {
          tab: 2,
          title: "产品分类"
        },
        {
          tab: 3,
          title: "客户管理"
        },
        {
          tab: 4,
          title: "通话量"
        }
      ]
    };
  },
  methods: {
    tabChange(tab) {
      this.tab = tab;
    }
  }
};
</script>
