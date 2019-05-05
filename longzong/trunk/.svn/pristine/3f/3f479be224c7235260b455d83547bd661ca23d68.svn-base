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
      tab: 0,
      tabList: [
        {
          key: 0,
          title: '普通分配',
          name: 'allSalemen'
        },
        {
          key: 1,
          title: '到账排名',
          name: 'accountRank'
        },
        {
          key: 2,
          title: '会议排名',
          name: 'meetingRank'
        },
        {
          key: 3,
          title: '电话排名',
          name: 'phoneRank'
        },
        {
          key: 4,
          title: '开发客户',
          name: 'devCustomer'
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
