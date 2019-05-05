
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
        当前位置：生产报表&nbsp;&nbsp;>>&nbsp;&nbsp;编辑指标>>&nbsp;&nbsp;个人指标
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
import infopersonDiffusionReport from "./infoPersonDiffusionReport.vue";
import infopersonCollectionReport from "./infoPersonCollectionReport.vue"; 
import infopersonOtherReport from "./infoPersonOtherReport.vue";

export default {
  components: {
    TabHeader,
    infopersonDiffusionReport,
    infopersonCollectionReport,
    infopersonOtherReport
  },
  computed: {
    currentComp() {
      return this.tab === 1 ? 'infopersonDiffusionReport' : this.tab === 2 ? 'infopersonCollectionReport' : infopersonOtherReport
    }
  },
  data() {
    return {
      tab: 1,
      tabList: [
        {
          tab: 1,
          title: "信息发布"
        },
        {
          tab: 2,
          title: "信息采集"
        },
        {
          tab: 3,
          title: "其他"
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
