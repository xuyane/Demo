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
          title: '所有用户',
          name: 'allUser'
        },
        {
          key: 2,
          title: '正式到期用户',
          name: 'officalUser'
        },
        {
          key: 3,
          title: '意向用户',
          name: 'purposeUser'
        },
        {
          key: 4,
          title: '跟踪到期用户',
          name: 'followUser'
        },
        {
          key: 5,
          title: '试用到期用户',
          name: 'testUser'
        },
        {
          key: 6,
          title: '待续入用户',
          name: 'continuedUser'
        },
        {
          key: 7,
          title: '近期未联系用户',
          name: 'recentContactUser'
        },
        {
          key: 8,
          title: '近期登录用户',
          name: 'recentLoginUser'
        },
        {
          key: 9,
          title: '即将流失用户',
          name: 'runOffUser'
        },
        {
          key: 10,
          title: '竞争对手用户',
          name: 'competitorUser'
        },
        {
          key: 11,
          title: '待联系用户',
          name: 'contactedUser'
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
