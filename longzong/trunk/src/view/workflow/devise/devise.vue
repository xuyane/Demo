<style lang="less" scoped src="./devise.less"></style>


<template>
   <Row class="my-association-out">
    <Col span="24">
      <Row class-name="current-position">
        当前位置：工作流&nbsp;&nbsp;>>&nbsp;&nbsp;流程设计
      </Row>
    </Col>
    <iframe src="/mysteel/workflow/model/add.htm" style="min-height:760px;width:100%;height:100%;" frameborder="0" ></iframe>
  </Row>

</template>



<script>
import axios from 'axios'
export default {

    data () {
        return{

            columns: [],
            tableData: [],

        }
    },

    created() {
    //  this.getListData()
  },
    methods:{
      reset() {
      },
    },
}
</script>


