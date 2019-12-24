<template>
  <div class="main-container">
    <breadcrumb-list v-if="hasBreadcrumb"></breadcrumb-list>
    <div :class="['content', {'has-breadcrumb': hasBreadcrumb}]">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import BreadcrumbList from './BreadcrumbList'

export default {
  name: 'Main',
  computed: {
    hasBreadcrumb() {
      return !!this.$store.state.app.breadcrumbList.length;
    }
  },
  components: {
    BreadcrumbList
  }
}
</script>

<style lang="less" scoped>
  .main-container {
    flex: 1;
    background: #f5f7f9;
    padding: 16px;
    box-sizing: border-box;
    .content {
      height: 100%;
      position: relative;
    }
    .content.has-breadcrumb {
      height: calc(100% - 40px);
      transition: height 0.2s ease-in;
    }
  }
</style>
