<style lang="less" scoped>
  .container {
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
      margin-bottom: 10px;
      cursor: pointer;
    }
    .tab-active {
      background: #f09d21;
    }
  }
</style>
<template>
  <Col span="24">
    <div class="container">
      <span class="tab" 
        v-for="item in tabList" 
        :key="item.key"
        :class="item.key == tabIndex ? 'tab-active' : ''"
        @click="goPage(item.name)">
        {{item.title}}
      </span>
    </div>
  </Col>
</template>
<script>
export default {
  props: ['tabIndex'],
  data() {
    return {
      tab: 1,
      tabList: [
        {
          key: 1,
          title: '发送短信',
          name: 'sendMessage'
        },
        {
          key: 2,
          title: '模板管理',
          name: 'templet'
        },
        {
          key: 3,
          title: '发送记录',
          name: 'sendRecord'
        },
        {
          key: 4,
          title: '回复记录',
          name: 'replyRecord'
        },
        {
          key: 5,
          title: '短信黑名单',
          name: 'blacklistUser'
        },
        {
          key: 6,
          title: '第三方接口设置',
          name: 'interfaceSet'
        },
        {
          key: 7,
          title: '过滤规则',
          name: 'filterRule'
        }
      ]
    }
  },
  methods: {
    goPage(name) {
      this.$router.push({
        name 
      })
    }
  }
}
</script>
