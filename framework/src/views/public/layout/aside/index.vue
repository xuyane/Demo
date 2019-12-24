<template>
  <div class="layout-aside">
    <bh-aside
      :isShrink="isShrink"
      :theme="theme"
      @onSelect="handleSelect"
      :activeName="activeName"
      :openNames="openNames"
      :menuList="menuList"
    />
  </div>
</template>

<script>
import BhAside from './BhAside'
// 获取当前路由面包屑
const loopFindBreadcrumb = (routes, name) => {
  for (let i = 0; i < routes.length; i++) {
    const cur = { name: routes[i]["name"], title: routes[i]["title"] };
    if (routes[i]["name"] === name) {
      return [cur];
    }
    if (routes[i]["children"]) {
      const deepRes = loopFindBreadcrumb(routes[i]["children"], name);
      if (deepRes.length) {
        return [].concat(cur, deepRes);
      }
    }
  }
  return [];
};

export default {
  name: 'AsideNext',
  components: {
    BhAside
  },
  data() {
    return {
      theme: 'dark',
    }
  },
  computed: {
    isShrink() {
      return this.$store.state.app.isShrink;
    },
    activeName() {
      return this.$route.name;
    },
    menuList() {
      return this.$store.state.auth.navList;
    },
    openNames() {
      const objHasChild = this.menuList.filter((item) => !!item.children);
      const obj = objHasChild.filter((item) => {
        return item.children.some((sub) => sub.name === this.$route.name)
      })[0]
      if (obj) {
        return [obj.name]
      }
      return [];
    }
  },
  created() {
    this.handleChangeBread(this.$route.name);
  },
  methods: {
    handleSelect(name) {
      this.$router.push({ name });
      this.handleChangeBread(name);
    },

    handleChangeBread(name) {
      const breadcrumbList = loopFindBreadcrumb(this.menuList, name);
      this.$store.dispatch("app/changeBreadcrumbList", breadcrumbList);
    },
  }
}
</script>

<style lang="less" scoped>
.layout-aside {
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
}
</style>
