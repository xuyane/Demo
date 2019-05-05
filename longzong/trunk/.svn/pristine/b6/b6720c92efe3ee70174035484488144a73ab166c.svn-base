<style lang="less" scoped>
  @import './page.less';
</style>
<template>
  <Row class-name="page-con">
    <span>第{{pageIndex}}页 / 共{{totalPage}}页   每页{{pageSize}}条   共{{totalNumber}}条</span>
    <Page :total="totalNumber" :current="pageIndex" :page-size="pageSize" show-elevator class="pull-right" @on-change="pageChange" @on-page-size-change="pageSizeChange" :page-size-opts="pageSizeOpts" :show-sizer="showSizer"></Page>
  </Row>
</template>

<script>
export default {
  name: 'oilPage',
  props: {
    pageNum:Number,
    pageSize: Number,
    total: Number,
    pageSizeOpts: Array,
    showSizer: Boolean
  },
  data () {
    return {
      pageIndex: 1,
      totalPage: 0,
      totalNumber: 0
    }
  },
  methods: {
    pageChange (page) {
      this.pageIndex = page
      this.$emit('page-change', page)
    },
    pageSizeChange (pagesize) {
      this.totalPage = Math.ceil(this.totalNumber / pagesize)
      this.$emit('page-change', this.pageIndex, pagesize)
    }
  },
  watch: {
    total (newVal, oldVal) {
      this.totalNumber = newVal
      this.totalPage = Math.ceil(newVal / this.pageSize)
    },
    pageNum (newVal) {
      this.pageIndex = newVal
    }
  }
}
</script>
