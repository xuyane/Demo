<style lang="less" scoped>
  .my-customer-top{
    overflow: hidden;
    span{
      float: left;
      color: #fff;
      margin: 5px 0px 5px 0;
      cursor: pointer;
      font-size: 16px;
    }
    b{
      background-color: #427fe9;
      padding: 6px 30px;
      font-weight: normal;
    }
    .my-customer-top-show{
      background-color: #f19d21;
    }
  }
  .my-customer-top{
    background-color: #fff;
    padding: 30px 60px;
  }
  .my-customer-content{
    background-color: #fff;
    font-size: 16px;
    line-height: 32px;
    padding: 0 40px;
  }
  .text-align-center{
    text-align: center;
  }
  .border{
    border: 1px solid #bbbbbb;
  }
  .border-top{
    border-top: 1px solid #bbbbbb;
  }
  .border-left{
    border-left: 1px solid #bbbbbb;
  }
  .border-left-none{
    border-left: none;
  }
  .border-top-none{
    border-top: none;
  }
  .border-bottom{
    border-bottom: 1px solid #bbbbbb;
  }
  .border-right{
    border-right: 1px solid #bbbbbb;
  }
  .bg-color-gray{
    background-color: #eeeff4;
  }
  .padding-l-20{
    padding-left: 20px;
  }
  .bg-color-blue{
    background-color: #427fe9;
  }
  
</style>
<template>
  <Row>
    <Col span="24">
      <span v-for="item in topList" :name="item.name" :key="item.key" @click="handleChange(item)">
        <b v-if="item.name == currentName" class="my-customer-top-show">{{item.title}}</b>
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
          title: '待办任务',
          key: '1-1',
          name: 'processing'
        },{
          icon: 'icon-manager icon',
          title: '已办理任务',
          key: '1-2',
          name: 'processed'
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
