<style lang="less" scoped>
@import "./addInformationSettings.less";
</style>
<template>
    <Row>
        <Col span="24">
        <Row class-name="current-position">
            当前位置：
            <router-link to="/plantIndex" class="link-css"> 信息发布管理</router-link>
            &nbsp;&nbsp;>>&nbsp;&nbsp;
            <router-link to="/unitMangement" class="link-css"> 信息单元管理</router-link>
            &nbsp;&nbsp;>> 
          <a @click="goto" class="link-css">信息联系人</a>
        </Row>
        </Col>
        <Col span="24">
        <Row class-name="add-container">
            <!-- 基本信息设置tab切换开始 -->
            <tab-header :tab='tab' :tab-list="tabList" @tab="tabChange"></tab-header>
            <!-- 基本信息设置tab切换结束 -->
            <Col span="24" v-show="tab === 1">
            <check-unit-one @return-Linker-Data="returnLinkerData"></check-unit-one>
            </Col>
            <Col span="24" v-show="tab === 2">
            <check-unit-two :linkerData="linkerData" ref="linkerInfromationShow"></check-unit-two>
            </Col>
            <Col span="24" v-show="tab === 3">
            <check-unit-three :linkerData="linkerData" ref="publisInfromationShow"></check-unit-three>
            </Col>
        </Row>

        </Col>
    </Row>
</template>
<script>
import TabHeader from "../../components/tab/tab.vue";
import CheckUnitOne from "./CheckUnitOne.vue";
import CheckUnitTwo from "./CheckUnitTwo.vue";
import CheckUnitThree from "./CheckUnitThree.vue";
export default {
  components: {
    TabHeader,
    CheckUnitOne,
    CheckUnitTwo,
    CheckUnitThree
  },
  data() {
    return {
      tab: 1,
      tabList: [
        {
          tab: 1,
          title: "基本信息设置"
        },
        {
          tab: 2,
          title: "信息联系人"
        },
        {
          tab: 3,
          title: "已发布信息"
        }
      ],
      linkerData: {}
    };
  },
  methods: {
    goto() {
      window.reload();
    },
    tabChange(tab) {
      this.tab = tab;
      if (tab == 2) {
        this.$refs.linkerInfromationShow.getListPage();
      } else if (tab == 3) {
        let type = this.linkerData.type;
        if (type == 4) {
          // 短信
          this.$refs.publisInfromationShow.toShortInformationList();
        } else if (type == 5) {
          // 短讯
          this.$refs.publisInfromationShow.toMessageInformationList();
        } else {
          this.$refs.publisInfromationShow.toPublishInformationList();
        }
      }
    },

    // 传递值
    returnLinkerData(msg) {
      console.log("msg", msg);
      this.linkerData = msg;
    }
  }
};
</script>