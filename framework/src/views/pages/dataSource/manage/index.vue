<template>
  <Row class="container" :gutter="20">
    <Col span="5">
      <tree-manage
        @updateTreeId="update"
      />
    </Col>
    <Col span="19">
      <source-table
        :treeId="treeId"
      />
    </Col>
  </Row>
</template>

<script>
import TreeManage from './TreeManage'
import SourceTable from './SourceTable'

export default {
  name: 'Manage',
  components: {
    TreeManage,
    SourceTable
  },
  data () {
    return {
      treeId: null
    }
  },
  methods: {
    update(treeId) {
      this.treeId = treeId;
    }
  }
}
</script>

<style lang="less" scoped>
  .container {
    height: 100%;
    display: flex;
  }
</style>
