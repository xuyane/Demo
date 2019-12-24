<template>
  <div class="layout-container">
    <layout-header />
    <div class="main">
      <layout-aside />
      <layout-main />
    </div>
  </div>
</template>

<script>
import LayoutHeader from "./header";
import LayoutAside from "./aside";
import LayoutMain from "./main";

export default {
  name: "LayoutContainer",
  components: {
    LayoutHeader,
    LayoutAside,
    LayoutMain
  }
};
</script>

<style lang="less" scoped>
.layout-container {
  height: 100%;
  .main {
    display: flex;
    width: 100%;
    height: calc(100% - 60px);
    overflow: hidden;
  }
}
</style>
