
<style lang="less" scoped>
.tab {
  padding: 10px 0 0 50px;
  background: #fff;
}
</style>

<template>
  <Row>
    <Col span="24">
      <Row class-name="current-position">
        当前位置：生产报表&nbsp;&nbsp;>&nbsp;&nbsp;编辑排行
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
import industrialchainRanking from "./industrialChainRanking.vue";
import personRanking from "./personRanking.vue";

export default {
  components: {
    TabHeader,
    industrialchainRanking,
    personRanking
  },
  computed: {
    currentComp() {
      return this.tab === 1 ? 'industrialchainRanking' : 'personRanking'
    }
  },
  data() {
    return {
      tab: 1,
      tabList: [
        {
          tab: 1,
          title: "产业链排名"
        },
        {
          tab: 2,
          title: "个人排名"
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
