<template>
  <div
    :class="['bhAside-container', {'is-shrink': isShrink, 'is-spread': !isShrink}]"
  >
    <div class="toggle-wrap">
      <Icon type="md-arrow-dropright-circle" v-if="isShrink" @click="toggleShrink" />
      <Icon type="md-arrow-dropleft-circle" v-else @click="toggleShrink" />
    </div>
    <SpreadMenu
      v-show="!isShrink"
      @onSelect="changeMenu"
      :openNames="openNames"
      :theme="theme"
      :menuList="menuList"
    />
    <ShrinkMenu
      v-show="isShrink"
      @onSelect="changeMenu"
      :activeName="activeName"
      :menuList="menuList"
      :theme="theme"
    />
  </div>
</template>

<script>
import ShrinkMenu from './ShrinkMenu';
import SpreadMenu from './SpreadMenu';

export default {
  name: 'BhAside',
  components: {
    ShrinkMenu,
    SpreadMenu,
  },
  props: {
    isShrink: {
      type: Boolean,
      default: false,
    },
    menuList: {
      type: Array,
      required: true,
    },
    activeName: String,
    openNames: Array,
    theme: {
      type: String,
      default: 'dark'
    },
  },
  methods: {
    changeMenu(params) {
      this.$emit('onSelect', params)
    },
    toggleShrink() {
      this.$store.dispatch('app/toggleSidebar')
    }
  }
}
</script>

<style lang="less" scoped>
.bhAside-container {
  height: 100%;
  width: auto;
  background: #1D1E23;
  transition: width 0.3s;
  &.is-shrink {
    width: 60px;
  }
  &.is-spread {
    width: 220px;
  }
  .toggle-wrap {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    i {
      font-size: 22px !important;
      color: #ccc;
      cursor: pointer;
    }
  }
}
</style>
