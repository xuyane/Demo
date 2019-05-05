<style lang="less">
@import "./detail.less";
</style>

<template>
  <Row class="my-customer-out">
    <Col span="24">
      <Row class-name="current-position">
        当前位置：工作流&nbsp;&nbsp;>>&nbsp;&nbsp;流程实例&nbsp;&nbsp;>>&nbsp;&nbsp;流程定义详情
      </Row>
    </Col>
    <Col span="24" class="my-customer-content text-align-center">
      <Row>
        <Col span="24" class="btn-container">
          <Button type="primary" class="search-btn" @click="goback()">返回</Button>
          <Button type="primary" class="search-btn" @click="showDevise()">流程图</Button>
          <Button type="primary" class="search-btn" @click="showBPMN()">BPMN</Button>
          <template v-if="ProcessDTO.status=== 1">
            <Button type="error" class="search-btn" @click="confirm(1)">挂起</Button>
          </template>
          <template v-else-if="ProcessDTO.status === 0">
            <Button type="primary" class="search-btn" @click="ablebtn">启用</Button>
          </template>
          <Button type="error" class="search-btn" @click="confirm(0)">删除</Button>
        </Col>
        <Col span="24" class="border height-50">流程定义信息</Col>
      </Row>
      <Row>
        <Col span="5" class="border border-top-none bg-color-gray">ID:</Col>
        <Col span="7" class="border-bottom border-right">{{ProcessDTO.id}}</Col>
        <Col span="5" class="border-bottom border-right bg-color-gray">名称:</Col>
        <Col span="7" class="border-bottom border-right">{{ProcessDTO.name}}</Col>
      </Row>
      <Row>
        <Col span="5" class="border border-top-none bg-color-gray">KEY:</Col>
        <Col span="7" class="border-bottom border-right">{{ProcessDTO.key}}</Col>
        <Col span="5" class="border-bottom border-right bg-color-gray">状态:</Col>
        <Col span="7" class="border-bottom border-right">{{instanceComputed}}</Col>
      </Row>
      <Row>
        <Col span="5" class="border border-top-none bg-color-gray">URL:</Col>
        <Col span="7" class="border-bottom border-right">{{ProcessDTO.url}}</Col>
        <Col span="5" class="border-bottom border-right bg-color-gray">版本:</Col>
        <Col span="7" class="border-bottom border-right">{{ProcessDTO.version}}</Col>
      </Row>
      <Row>
        <Col span="5" class="border border-top-none bg-color-gray">发布人:</Col>
        <Col span="7" class="border-bottom border-right">{{ProcessDTO.admin}}</Col>
        <Col span="5" class="border-bottom border-right bg-color-gray">发布时间:</Col>
        <Col span="7" class="border-bottom border-right">{{ProcessDTO.time}}</Col>
      </Row>
      <Row>
        <Col span="5" class="border border-top-none bg-color-gray">平台:</Col>
        <Col span="7" class="border-bottom border-right">{{ProcessDTO.system}}</Col>
        <Col span="5" class="border-bottom border-right bg-color-gray">描述:</Col>
        <Col span="7" class="border-bottom border-right">{{ProcessDTO.desc}}</Col>
      </Row>
    </Col>
  </Row>
</template>

<script>
import axios from 'axios'
import { statusZero } from '../../components/axios/workflow.js'
export default {
  data (){
    return{
      ProcessDTO:{status:''},
      tempId:''
    }
  },
  computed: {
    instanceComputed() {
      if(this.ProcessDTO.status===1){
        return '正常'
      }else if(this.ProcessDTO.status===0){
        return '挂起'
      }else{
        return '已结束'
      }
    }
  },
  created() {
      this.init()
  },
  methods:{
    init(){
        this.tempId = this.$route.query.id;
        var that = this;
        var sourceProductArr = [];
        let form = {
            id : this.tempId
        }
        axios({
            url: '/mysteel/workflow/process/detail',
            method: 'get',
            params: form
        }).then(resp => {
            statusZero(resp.data.status)
            that.ProcessDTO = resp.data.data
        })
    },
    goback() {
      this.$router.push({
        name: "instanceList"
      });
    },
    confirm(type) {
      var msg = 0 == type ? '删除' : '挂起';
      var op = 0 == type ? 'delete' : 'disable';

      this.$Modal.confirm({
        title: '请确认',
        content: '确认要' + msg + '该流程实例吗？',
        onOk: () => {
          axios.get("/mysteel/workflow/process/" + op + "?id=" + this.tempId).then(res => {
            statusZero(res.data.status)
            if(res.status == 200){
              this.$Message.info({
                content: msg + '成功',
                duration: 3
              })
              this.$Spin.show();
              this.init();
            }else{
                this.$Message.warning(msg + "失败");
            }
          })
        },
        onCancel: () => {
            this.$Message.info('取消' + msg + '操作');
        }
      })
    },
    //启用
    ablebtn(){
        axios.get('/mysteel/workflow/process/enable?id='+this.tempId)
        .then(res=>{
          statusZero(res.data.status)
          if(res.data.data == 'true'){
            this.$Message.info({
              content: '启用成功',
              duration: 3
            });
            this.$Spin.show();
            this.init();
          }else{
              this.$Message.warning(res.data.message);
          }
      })
    },
    showDevise() {
      window.open('/mysteel/workflow/process/image.htm?id='+this.tempId)
      //this.$router.push({path: '/processDetailDevise', query: {id : this.tempId}})
    },
    showBPMN() {
      window.open('/mysteel/workflow/process/bpmn.htm?id='+this.tempId)
      //this.$router.push({path: '/processDetailBPMN', query: {id : this.tempId}})
    }
  }

}
</script>
