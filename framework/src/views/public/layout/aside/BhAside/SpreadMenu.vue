<template>
  <Menu
    class="spreadMenu-container"
    ref="SpreadMenu"
    :active-name="$route.name"
    :open-names="openNames"
    :theme="theme"
    width="auto"
    @on-select="changeMenu"
  >
    <template v-for="menu in menuList">
      <Submenu v-if="hasChildren(menu)" :name="menu.name" :key="menu.name">
        <template slot="title">
          <Icon :type="menu.icon" :size="iconSize" class="menu-icon"></Icon>
          <span class="layout-text">{{ menu.title }}</span>
        </template>
        <template v-for="subMenu in menu.children">
          <MenuItem :name="subMenu.name" :key="'menuitem' + subMenu.name">
            <Icon :type="subMenu.icon" class="menu-icon" :size="iconSize" :key="'icon' + subMenu.name"></Icon>
            <span class="layout-text" :key="'title' + subMenu.name">{{ subMenu.title }}</span>
          </MenuItem>
        </template>
      </Submenu>
      <MenuItem v-else :name="menu.name" :key="'menuitem' + menu.name">
        <Icon :type="menu.icon" class="menu-icon" :size="iconSize" :key="'menuicon' + menu.name"></Icon>
        <span class="layout-text" :key="'title' + menu.name">{{ menu.title }}</span>
      </MenuItem>
    </template>
  </Menu>
</template>

<script>
export default {
  name: 'SpreadMenu',
  props: {
    menuList: {
      type: Array,
      required: true,
    },
    openNames: Array,
    theme: {
      type: String,
      default: 'dark'
    },
    onSelect: Function
  },
  data() {
    return {
      iconSize: 20
    }
  },
  methods: {
    hasChildren(menu) {
      return Array.isArray(menu.children) && !!menu.children.length;
    },
    changeMenu(params) {
      this.$emit('onSelect', params);
    }
  },
  updated() {
    this.$nextTick(() => {
      if (this.$refs.SpreadMenu) {
        this.$refs.SpreadMenu.updateOpened();
      }
    });
  }
}
</script>

<style lang="less">
.spreadMenu-container {
  .ivu-menu-item {
    display: flex;
    align-items: center;
  }
  .menu-icon {
    line-height: 24px;
    margin-right: 8px;
  }
  .layout-text {
    display: block;
    font-size: 16px;
    line-height: 24px;
    width: 110px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &.ivu-menu-dark {
    background: #1D1E23;
  }
  &.ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title {
    display: flex;
    align-items: center;
  }
  &.ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
    color: #fff !important;
    background: #101117 !important;
  }
  &.ivu-menu-dark.ivu-menu-vertical .ivu-menu-item:not(.ivu-menu-submenu):hover,
  &.ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title:hover {
    color: #fff;
    background: #1d1e23;
  }
  &.ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active,
  &.ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active:hover {
    background: rgba(63,64,69,.75) !important;
  }

  &.ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened {
    background: #101117 !important;
  }
  &.ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened .ivu-menu-submenu-title {
    background: #1d1e23;
  }

}

</style>
