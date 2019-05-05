<style lang="less" scoped>
  @import './error.less';
</style>

<template>
  <div class="error-bg">
    <div class="error-content">
      <img class="pull-left" src="../../assets/images/error.png" alt="">
      <div class="pull-left error-left">
        <!-- <p class="font-size-22">{{message}}</p> -->
        <p class="font-size-22">无权限</p>        
        <p class="font-size-14">您可以去其他地方逛逛......</p>
        <Button @click="goBack" class="mar-t-102" type="primary">返回</Button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      message: this.$route.query.message
    }
  },
  created () {
    console.log(this.$route.query.message)
  },
  methods: {
    goBack (){
      this.$router.go(-2);
    }
  }
}
</script>
