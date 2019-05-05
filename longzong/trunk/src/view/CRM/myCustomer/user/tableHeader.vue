<style lang="less" scoped>
  .container {
    display: flex;
    justify-content: flex-end;
    background: #fff;
    padding: 20px 40px 0 0;
    font-size: 14px;
    .item {
      margin-right: 40px;
      .title {
        color: #000;
      }
      .val {
        display: inline-block;
        height: 12px;
        color: #145edb;
      }
    }
  }
</style>
<template>
  <div class="container" v-if="false">
    <div class="item">
      <span class="title">用户总数(位):</span>
      <span class="val">{{num1}}</span>
    </div>
    <div class="item">
      <span class="title">正式到期用户(位):</span>
      <span class="val">{{num2}}</span>
    </div>
    <div class="item">
      <span class="title">意向用户(位):</span>
      <span class="val">{{num3}}</span>
    </div>
    <div class="item">
      <span class="title">合同金额(万元):</span>
      <span class="val">{{formatPrice(totalPrice)}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: ['num1', 'num2', 'num3', 'totalPrice'],
  data() {
    return {

    }
  },
  methods: {
    formatPrice(price) {
      return (price/10000).toFixed(2)
    }
  }
}
</script>
