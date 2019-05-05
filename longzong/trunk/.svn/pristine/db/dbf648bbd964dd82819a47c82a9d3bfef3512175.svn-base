
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
        当前位置：财务管理&nbsp;&nbsp;>>&nbsp;&nbsp;到账管理&nbsp;&nbsp;>>&nbsp;&nbsp;<span v-show="tab === 1">到账导入</span><span v-show="tab === 2">到账关联</span>
      </Row>
    </Col>
    <Col span="24" class="tab">
      <tab-header :tab='tab' :tab-list="tabList" @tab="tabChange"></tab-header>
    </Col>
    <Col span="24" v-show="tab === 1">
      <account-manager></account-manager>
    </Col>
    <Col span="24" v-show="tab === 2">
      <account-association></account-association>
    </Col>
  </Row>
</template>

<script>
import axios from 'axios'
import TabHeader from '../../components/tab/tab.vue'
import AccountAssociation from './accountAssociation.vue'
import AccountManager from './accountManager.vue'
export default{
  components: {
    AccountAssociation,
    AccountManager,
    TabHeader
  },
  data () {
    return {
      tab: 1,
      tabList: [
        {
          tab: 1,
          title: '到账导入'
        },
        {
          tab: 2,
          title: '到账关联'
        }
      ]
    }
  },
  created () {
    if(this.$route.query.tab){
      this.tab = parseInt(this.$route.query.tab);
    }else {
      this.tab = 1
    };
    this.currentName = this.$router.history.current.name;
  },
  methods: {
    tabChange(tab) {
      this.tab = tab
    }
  }
}
</script>
