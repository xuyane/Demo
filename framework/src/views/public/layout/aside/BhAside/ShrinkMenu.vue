<template>
  <div class="shrink-container">
    <template v-for="(menu, index) in menuList">
      <Dropdown
        v-if="hasChildren(menu)"
        transfer
        placement="right-start"
        :key="index"
        @on-click="changeMenu"
        transfer-class-name="shrink-container-dropdown"
      >
        <div :class="['single-icon-wrap', {'doropdown-active': hasChildName(menu)}]">
          <Icon :size="iconSize" :type="menu.icon" />
        </div>
        <DropdownMenu slot="list">
          <template v-for="(subMenu, i) in menu.children">
            <DropdownItem
              :name="subMenu.name"
              :key="index + '_' + i"
              :class="[{'text-active': subMenu.name === activeName}]"
            >
              <!-- <Icon :type="subMenu.icon"></Icon> -->
              <span>{{ subMenu.title }}</span>
            </DropdownItem>
          </template>
        </DropdownMenu>
      </Dropdown>
      <Tooltip
        v-else
        :key="index"
        :content="menu.title"
        placement="right"
      >
        <div :class="['single-icon-wrap', {'doropdown-active': menu.name === activeName}]" @click="changeMenu(menu.name)">
          <Icon :size="iconSize" :type="menu.icon" />
        </div>
      </Tooltip>
    </template>
  </div>
</template>

<script>
export default {
  name: 'ShrinkMenu',
  data() {
    return {
      iconSize: 24
    }
  },
  props: {
    menuList: {
      type: Array,
      required: true,
    },
    menuTheme: {
      type: String,
    },
    activeName: {
      type: String,
      required: true,
    }
  },
  methods: {
    hasChildren(menu) {
      return Array.isArray(menu.children) && !!menu.children.length;
    },
    changeMenu(params) {
      this.$emit('onSelect', params);
    },
    hasChildName(menu) {
      return (menu.children || []).some((subMenu) => subMenu.name === this.activeName);
    }
  }
}
</script>

<style lang="less">
.shrink-container {
  display: flex;
  flex-direction: column;
  justify-content: center;

  .single-icon-wrap {
    width: 100%;
    display: flex;
    height: 52px;
    align-items: center;
    justify-content: center;

    .ivu-icon {
      cursor: pointer;
      transition: all 0.2s ease-in-out;
    }
    &:hover {
      .ivu-icon {
        color: #fff;
      }
    }
    &.doropdown-active {
      color: #fff;
    }
  }
  .ivu-tooltip-rel {
    display: block;
  }
}
.shrink-container-dropdown.ivu-select-dropdown {
  background: #1d1e23;
  margin: 5px 0 5px 3px;
  .ivu-dropdown-menu {
    min-width: 160px;
    .ivu-dropdown-item > span {
      line-height: 26px;
    }
    .ivu-dropdown-item:hover {
      color: #fff;
      background: transparent;
    }
    .ivu-dropdown-item.text-active > span {
      color: #fff;
    }
  }
}
</style>
