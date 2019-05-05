<style lang="less">
  @import "../assets/css/main.less";
  @import "../assets/css/common.less";
  .top-header {
    width: 100%;
    height: 80px;
    min-width: 1000px;
  }
  .error-main {
    position: absolute;
    top: 80px;
    width: 100%;
  }
</style>

<template>
  <div>
    <div class="top-header">
      <top-header></top-header>
    </div>
    <div class="error-main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import topHeader from './header/header.vue'
export default {
  name: 'Error',
  components: {
    topHeader
  },
  computed: {}
}
</script>
