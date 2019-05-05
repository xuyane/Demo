<style lang="less" scoped>
.grid-table {
  width: 100%;
  background: #fff;
  border-top: 1px solid #bbb;
  border-right: 1px solid #bbb;
  border-spacing: 0;
  .row {
    position: relative;
    display: flex;
    width: 50%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    .th {
      display: block;
      width: 200px;
      height: 100%;
      background: #eeeff4;
      overflow: hidden;
      border-left: 1px solid #bbb;
      border-bottom: 1px solid #bbb;
    }
    .td {
      display: block;
      width: 100%;
      height: 100%;
      overflow: hidden;
      border-left: 1px solid #bbb;
      border-bottom: 1px solid #bbb;
    }
  }
}
</style>
<template>
  <Row>
    <Col span="24">
    <Row>
      <table
        width="100%"
        class="grid-table"
      >
        <Col
          span="12"
          class="row"
          v-for="(item, index) in gridColumns"
          :key="index"
        >
        <th class="th">{{ item.title }}</th>
        <td class="td">{{ gridData[item.key] }}</td>
        </Col>
        <Col
          span="12"
          class="row"
          v-if="gridColumns.length % 2 === 1"
        >
        <th class="th"></th>
        <td class="td"></td>
        </Col>
      </table>
    </Row>
    </Col>
  </Row>
</template>
<script>
export default {
  props: {
    gridColumns: Array,
    gridData: Object
  },
  data() {
    return {

    }
  },
  created() {
    console.log()
  }
}
</script>


