<template>
  <Breadcrumb class="container">
    <BreadcrumbItem
      v-for="(item, index) in breadcrumbList"
      :key="index"
    >
      {{item.title}}
    </BreadcrumbItem>
  </Breadcrumb>
</template>

<script>
export default {
  name: 'NavBreadcrumb',
  computed: {
    breadcrumbList() {
      return this.$store.state.app.breadcrumbList
    }
  },
}
</script>

<style lang="less" scoped>
.container {
  height: 30px;
  margin-bottom: 10px;
}
</style>
