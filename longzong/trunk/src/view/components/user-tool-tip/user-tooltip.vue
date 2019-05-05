<style lang="less" scoped>
  .tooltip-wrap{
    max-height: 400px;
    overflow: auto;

    dl{
      dt{
        display:block;
      }
     dd{
        display:block;
      }
    }
  }
</style>
<template>
    <div class="tooltip-wrap">
      <dl v-for="item in mobileData" :key="item.adminId">
        <dt>{{item.adminName}}:</dt>
        <dd v-for="phone in item.list" :key="phone.id">
          <span>{{phone.realName}}</span>
          <span @click="onClickPhone(phone.mobile)">({{phone.mobile}})</span>
        </dd>
      </dl>
    </div>
</template>
<script>
export default {
  name: 'userToolTip',
  props: {
    mobileData: {
      type: Array,
      required: true
    }
  },
  methods: {
    onClickPhone(phone) {
      this.$emit('on-call', phone);
    }
  }
}
</script>
