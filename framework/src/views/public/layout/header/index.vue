<template>
  <div class="header">
    <div class="nav-logo" @click="redirectTo">
      <img :src="logo" />
    </div>
  </div>
</template>

<script>
export default {
  name: "LayoutHeader",
  data() {
    return {
      logo: require("@/assets/images/logo.png")
    };
  },
  methods: {
    redirectTo() {
      this.$router.push({ name: "dashboard" });
      this.$store.dispatch("app/changeBreadcrumbList", [])
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  background: #fff;
  height: 60px;
  display: flex;
  align-items: center;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 1;
  padding: 0 20px;
  background: #fff;
  .nav-logo {
    flex: none;
    cursor: pointer;
    & > img {
      width: 50px;
      height: 50px;
    }
  }
}
</style>
