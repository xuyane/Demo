


<template>
   <Row class="my-association-out">
    <Col span="24">
      <Row class-name="current-position">
        当前位置：工作流&nbsp;&nbsp;>>&nbsp;&nbsp;流程实例&nbsp;&nbsp;>>&nbsp;&nbsp;BPMN
      </Row>
    </Col>
    <iframe ref="myImg" style="min-height:600px;width:100%;height:100%;" frameborder="0" :src="mySrc"></iframe>
  </Row>

</template>



<script>
import axios from 'axios'
export default {
    data () {
        return{
            //id: ''
        }
    },
    created() {
        //this.init()
    },
    computed:{
        mySrc(){
            return '/mysteel/workflow/process/bpmn.htm?id=' + this.$route.query.id;
        }
    },
    methods: {
    }
}
</script>


