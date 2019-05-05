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
            &nbsp;&nbsp;>>&nbsp;&nbsp;
            <span v-show="tab === 1">
                  <a @click="goto" class="link-css">修改信息单元</a>
               </span>
            <span v-show="tab === 2">
                <a @click="goto" class="link-css">信息人列表</a></span>
        </Row>
        </Col>
        <Col span="24">
        <Row class-name="add-container">
            <!-- 基本信息设置tab切换开始 -->
            <tab-header :tab='tab' :tab-list="tabList" @tab="tabChange"></tab-header>
            <!-- 基本信息设置tab切换结束 -->
            <Col span="24" v-show="tab === 1">
            <info-seting></info-seting>
            </Col>
            <Col span="24" v-show="tab === 2">
            <contact-seting></contact-seting>
            </Col>
        </Row>

        </Col>
    </Row>
</template>
<script>
import TabHeader from "../../components/tab/tab.vue";
import InfoSeting from "./infoSeting.vue";
import ContactSeting from "./contactSeting.vue";
export default {
  components: {
    TabHeader,
    InfoSeting,
    ContactSeting
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
          title: "信息联系人设置"
        }
      ]
    };
  },
  methods: {
    goto() {
      window.reload();
    },
    tabChange(tab) {
      this.tab = tab;
    }
  }
};
</script>