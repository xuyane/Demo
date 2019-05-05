<style lang="less" scoped>
  @import "./confirmFinance.less";
</style>

<template>
  <Row>
    <Col span="24">
      <span v-for="item in topList" :name="item.name" :key="item.key" @click="handleChange(item)">
        <b v-if="item.name == currentName" class="confirm-finance-top-show">{{item.title}}</b>
        <b v-else>{{item.title}}</b>
      </span>
    </Col>
  </Row>
</template>

<script>
export default{
  data () {
    return {
      currentName:"",
      topList: [{
          icon: 'icon-manager icon',
          title: '合同认账',
          key: '1-1',
          name: 'confirmcontractList'
        },{
          icon: 'icon-manager icon',
          title: '认账审核',
          key: '1-2',
          name: 'accountAuditsList'
        }]
    }
  },
  created () {
    this.currentName = this.$router.history.current.name
  },
  methods: {
    handleChange (item) {
      this.$router.push({
        name: item.name
      })
    }
  }
}
</script>
