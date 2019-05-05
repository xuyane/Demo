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
          title: '自动合并',
          name: 'companyMerge'
        },
        {
          key: 2,
          title: '普通合并',
          name: 'normalMerge'
        },
        {
          key: 3,
          title: '合并记录',
          name: 'recordMerge'
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
