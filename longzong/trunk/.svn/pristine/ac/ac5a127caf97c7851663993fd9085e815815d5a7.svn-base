<style lang="less" scoped>
#img_process{
  display:block;
  width:300px;
  height:1200px;
}
</style>
<template>
   <Row class="my-association-out">
    <Col span="24">
      <Row class-name="current-position">
        当前位置：工作流管理&nbsp;&nbsp;>>&nbsp;&nbsp;流程实例&nbsp;&nbsp;>>&nbsp;&nbsp;流程定义详情
      </Row>
    </Col>
    <Col span="24">
      <Row>
        <iframe :src="myImgsrc" width="100%" height="100%"></iframe>
        <!-- <div style="overflow-x: auto;">
            <img id="img_process" ref="myImg" :src="myImgsrc"/>
        </div> -->
      </Row>
    </Col>
  </Row>

</template>


<script>
export default {
    data(){
      return{
        myImgsrc:''
      }
    },
    mounted() {
      const id = this.$route.query.id;
      this.myImgsrc = '/mysteel/workflow/instance/image.htm?id='+id;
      //this.$refs.myImg.src = '/mysteel/workflow/instance/image.htm?id=' + id;
    }
}
</script>


