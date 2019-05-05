<style lang="less" scoped>
  .bill .tab {
    display: flex;
    background: #fff;
    color: #145edb;
    // padding: 20px 0 0 50px;
  }
  .bill .tab .tab-flex {
    width: 194px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    font-size: 14px;
    margin-left: -1px;
    cursor: pointer;
    border: 1px solid #4280e8;
  }
  .bill .tab-flex.tab-active {
    background: rgb(45, 140, 240);
    color: #fff;
    border: none
  }
</style>
<template>
  <Row class="bill">
    <Col span="24" style="background: #fff">
      <div class="tab">
        <div class="tab-flex" v-for="item in tabList" @click="tabChange(item.tab)" :class="tab === item.tab ? 'tab-active' : ''">{{item.title}}</div>
      </div>
    </Col>
  </Row>
</template>
<script>
export default {
  props: ['tabList', 'tab'],
  data() {
    return {

    }
  },
  methods: {
    tabChange(tab) {
      this.$emit('tab', tab)
    }
  }
}
</script>
