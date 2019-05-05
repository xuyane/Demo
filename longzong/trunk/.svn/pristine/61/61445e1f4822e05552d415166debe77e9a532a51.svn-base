<style lang="less" scoped>
.container {
  position: relative;
  padding: 20px 20px 0 20px;
  background: #fff;
  .tab {
    display: inline-block;
    min-width: 112px;
    height: 35px;
    line-height: 35px;
    color: #fff;
    font-size: 14px;
    background: #4280e8;
    text-align: center;
    margin-left: 20px;
    margin-bottom: 20px;
    cursor: pointer;
    &:first-child {
      margin-left: 0;
    }
  }
  .tab-active {
    background: #f09d21;
  }
}
</style>
<template>
  <Col span="24">
    <div class="container">
      <span
        class="tab"
        v-for="item in tabList"
        :key="item.key"
        :class="item.key == tabIndex ? 'tab-active' : ''"
        @click="goPage(item.name)"
      >{{item.title}}</span>
    </div>
  </Col>
</template>
<script>
export default {
  props: ["tabIndex"],
  data() {
    return {
      tab: 1,
      tabList: [
        {
          key: 1,
          title: "基本信息",
          name: "basicInfo"
        },
        {
          key: 2,
          title: "资质信息",
          name: "aptitudeInfo"
        },
        {
          key: 3,
          title: "用户信息",
          name: "userInfo"
        },
        {
          key: 4,
          title: "跟踪记录",
          name: "followRecord"
        },
        {
          key: 5,
          title: "通话记录",
          name: "callRecord"
        },
        {
          key: 6,
          title: "短信记录",
          name: "noteRecord"
        },
        {
          key: 7,
          title: "合同信息",
          name: "contractInfo"
        },
        {
          key: 8,
          title: "权限管理",
          name: "privilegeManagement"
        },
        {
          key: 9,
          title: "数据权限",
          name: "dataPower"
        }
      ]
    };
  },
  methods: {
    goPage(name) {
      this.$router.push({
        name
      });
    }
  }
};
</script>
