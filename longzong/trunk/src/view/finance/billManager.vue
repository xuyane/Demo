<style lang="less" scoped>
  .tab {
    padding: 20px 0 0 50px;
    background: #fff;
  }
</style>
<template>
  <Row>
    <Col span="24">
      <Row class-name="current-position">
        当前位置：财务管理&nbsp;&nbsp;>>&nbsp;&nbsp;票据管理&nbsp;&nbsp;>>&nbsp;&nbsp;<span v-show="tab === 1">开票申请</span><span v-show="tab === 2">票据审核</span>
      </Row>
    </Col>
    <Col span="24" class="tab">
      <tab-header :tab="tab" :tab-list="tabList" @tab="tabChange"></tab-header>
    </Col>
    <Col span="24" v-if="tab === 1"> 
      <bill-apply></bill-apply>
    </Col>
    <Col span="24" v-if="tab === 2">
      <bill-verify></bill-verify>
    </Col>
  </Row>
</template>
<script>
import TabHeader from '../components/tab/tab.vue'
import BillApply from './billApply.vue'
import BillVerify from './billVerify.vue'
export default {
 data() {
   return {
     tab: this.$route.query.tab || 1,
     tabList: [
       {
         tab: 1,
         title: '开票申请'
       },
       {
         tab: 2,
         title: '票据审核'
       }
     ]
   }
 },
 methods: {
    tabChange(tab) {
      this.tab = tab
    }
 },
 components: {
   BillApply,
   BillVerify,
   TabHeader
 }
}
</script>
