<template>
  <div
    id="main"
    class="app-main"
  >
    <!-- <keep-alive>
      <router-view></router-view>
    </keep-alive> -->
     <keep-alive>
    <router-view v-if="$route.meta.keepAlive">
        <!-- 这里是会被缓存的视图组件，比如列表A页面 -->
    </router-view>
</keep-alive>

<router-view v-if="!$route.meta.keepAlive">
    <!-- 这里是不被缓存的视图组件，比如详情B页面-->
</router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {
    console.log("App.vue")
    if ('-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style) {
      window.addEventListener('hashchange', () => {
        console.log("addEventListener hashchange")
        var currentPath = window.location.hash.slice(1);
        if (this.$route.path !== currentPath) {
          console.log("router path:"+this.$route.path)
          console.log("target path:"+currentPath)
          this.$router.push(currentPath)
        }
      }, false)
    }
  }
}
</script>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.link-css {
  margin-bottom: 20px;
  font-size: 14px;
  color: #000;
}
.tips .ivu-form-item-label:before {
  content: "*";
  display: inline-block;
  margin-right: 4px;
  line-height: 1;
  font-family: SimSun;
  font-size: 12px;
  color: #ed4014;
}

.warning .ivu-input,
.warning .ivu-input:focus,
.warning .ivu-input:hover {
  border-color: #ed3f14;
  outline: 0;
  -webkit-box-shadow: 0 0 0 2px rgba(237, 63, 20, 0.2);
  box-shadow: 0 0 0 2px rgba(237, 63, 20, 0.2);
}

.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;
}
.vertical-center-modal .ivu-modal {
  top: 0;
}

.ivu-form-item-content {
  line-height: 36px;
}

.verModal .ivu-modal {
  top: 10% !important;
  width: 80% !important;
  height: 80% !important;
}

.verModal .ivu-modal .ivu-modal-content {
  height: 100%;
}

.verModal .ivu-modal .ivu-modal-content .ivu-modal-body {
  height: 80%;
  overflow-y: scroll;
}
.leftree .ivu-card-head {
  background: #427fe9 !important;
  text-align: center;
}
.leftree .ivu-card-head p {
  color: #fff;
}
.checkUnit .ivu-input[disabled],
.basic-modal .ivu-input[disabled],
.checkUnit .ivu-input,
.ivu-select-input[disabled] {
  color: black;
}
.ivu-input[disabled] {
  color: black;
}
.editCss .edui-editor-iframeholder {
  width: 100% !important;
  overflow: auto !important;
}

.formStyle .ivu-switch-large,
.textStyle .ivu-switch-large {
  width: 70px;
}
//这个样式应用到CMS的频道
.leftree .ivu-card-head {
  background: #427fe9 !important;
  text-align: center;
}
.talkwrap button {
  width: auto !important;
}
.formStyle .ivu-switch-large.ivu-switch-checked:after,
.textStyle .ivu-switch-large.ivu-switch-checked:after {
  left: 47px;
}
.ivu-page-item,
.ivu-page-item-jump-next,
.ivu-page-item-jump-prev,
.ivu-page-next,
.ivu-page-prev {
  height: 28px;
  min-width: 28px;
  color: #605f5f;
  line-height: 26px;
}

.selectWarning .ivu-select-selection {
  border: 1px solid #ed4014;
}

.ivu-modal-mask,
.post-modal{
  z-index: 999 !important;
}
</style>
