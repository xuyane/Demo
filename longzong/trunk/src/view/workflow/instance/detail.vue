<template>
  <Row class="my-customer-out">
    <Col span="24">
      <Row class-name="current-position">
        当前位置：工作流&nbsp;&nbsp;>>&nbsp;&nbsp;流程实例&nbsp;&nbsp;>>&nbsp;&nbsp;流程实例详情
      </Row>
    </Col>
    <Col span="24" class="my-customer-content text-align-center">
      <Row>
        <Col span="24" class="btn-container">
          <Button class="search-btn colorBlock" @click="goback()">返回</Button>
          <Button type="primary" class="search-btn" @click="showDevise()">流程图</Button>
          <template v-if="instance.status === 1">
            <Button type="primary" class="search-btn" @click="receiveMo">接收任务</Button>
            <Button type="error" class="search-btn" @click="hangUp">挂起</Button>
            <Button type="error" class="search-btn" @click="addBlack">作废</Button>
          </template>
          <template v-else-if="instance.status === 0">
            <Button type="primary" class="search-btn" @click="ablebtn">启用</Button>
          </template>
          <Button type="error" class="search-btn" @click="onDelete">删除</Button>
        </Col>
        <Col span="24" class="border height-50">流程实例信息</Col>
      </Row>
      <Row>
        <Col span="5" class="border border-top-none bg-color-gray">ID:</Col>
        <Col span="7" class="border-bottom border-right">{{instance.id}}</Col>
        <Col span="5" class="border-bottom border-right bg-color-gray">流程KEY:</Col>
        <Col span="7" class="border-bottom border-right">{{instance.processKey}}</Col>
      </Row>
      <Row>
        <Col span="5" class="border border-top-none bg-color-gray">流程名称:</Col>
        <Col span="7" class="border-bottom border-right">{{instance.processName}}</Col>
        <Col span="5" class="border-bottom border-right bg-color-gray">流程版本:</Col>
        <Col span="7" class="border-bottom border-right">{{instance.processVersion}}</Col>
      </Row>
      <Row>
        <Col span="5" class="border border-top-none bg-color-gray">业务ID:</Col>
        <Col span="7" class="border-bottom border-right">{{instance.businessId}}</Col>
        <Col span="5" class="border-bottom border-right bg-color-gray">业务KEY:</Col>
        <Col span="7" class="border-bottom border-right">{{instance.businessKey}}</Col>
      </Row>
      <Row>
        <Col span="5" class="border border-top-none bg-color-gray">业务短信:</Col>
        <Col span="7" class="border-bottom border-right comeup">{{instance.businessSMS}}</Col>
        <Col span="5" class="border-bottom border-right bg-color-gray">业务通知:</Col>
        <Col span="7" class="border-bottom border-right">{{instance.businessNotice}}</Col>
      </Row>
      <Row>
        <Col span="5" class="border border-top-none bg-color-gray">开始时间:</Col>
        <Col span="7" class="border-bottom border-right">{{instance.startTime}}</Col>
        <Col span="5" class="border-bottom border-right bg-color-gray">结束时间:</Col>
        <Col span="7" class="border-bottom border-right comeup">{{instance.endTime}}</Col>
      </Row>
      <Row>
        <Col span="5" class="border border-top-none bg-color-gray">状态:</Col>
        <Col span="7" class="border-bottom border-right">{{instance.status | instanceFilters}}</Col>
        <Col span="5" class="border-bottom border-right bg-color-gray">其他变量:</Col>
        <Col span="7" class="border-bottom border-right"><div class="bordscroll">{{instance.otherVar}}</div></Col>
      </Row>
      <Row span="24" class="padd-20">
        <Col style="overflow-x:auto;">
          <Steps :current="currentStep">
            <Step v-for="(item, index) in testStep" :key='index' :title="item.role" :content="item.admin" ></Step>
          </Steps>
        </Col>
      </Row>
    </Col>

    <Col span="24" class="my-customer-content">
      <Row class="mar-t-20">
        <Col span="24" class="padding-l-20 text-align-center">审核信息</Col>
      </Row>
      <Row>
        <Col span="24" class="mar-t-20 padd-20">
          <Table :data="auditMsg" :columns="columns" :stripe="true" :border="true"></Table>
        </Col>
      </Row>
    </Col>
    <Modal v-model="receiveModal" width="570" :closable="false">
        <div style="font-size:18px;">办理接收任务</div>
        <div slot="footer">
            <Button type="primary" @click="receveTask">通过</Button>
            <Button type="error" @click="receiveMo">驳回</Button>
        </div>
    </Modal>
   <Modal v-model="showModal"  title="作废流程实例" width="570">
      <Form ref="addForm">
        <FormItem prop="name">
          <Input v-model="addForm.name" class="search-input"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <i-button type="primary" @click="cancelb">确定</i-button>
        <i-button @click="showModal=false">取消</i-button>
      </div>
    </Modal>
  </Row>
</template>

<script>
import axios from 'axios'
import { setTimeout } from 'timers';
import { statusZero } from '../../components/axios/workflow.js'
export default {
  data (){
    return{
      auditProcess: null,
      testStep: [],
      currentStep: 0,
      // 是否已挂起
      hasHangUp: false,
      instance: { status:'' },
      auditMsg: [],
      columns: [ {
        key: 'auditor',
        title: '审批人',
        align: 'center'
      }, {
        key: 'pass',
        align: 'center',
        title: '状态',
        render: (h, data) => {
          return h('div', data.row.pass == true ? '通过' : '驳回')
        }
      }, {
        key: 'auditTime',
        align: 'center',
        title: '审批时间'
      }, {
        key: 'content',
        align: 'center',
        title: '意见'
      }
      ],
      pass:true,//是否接收任务
      addForm:{name:''},//作废理由
      addRules:'',
      showModal:false,
      receiveModal:false //接收任务弹出
    }
  },
  created() {
    this.$Spin.show();
      this.init();
  },
  computed: {
    id() {
      return this.$route.query.id;
    },
  },
  filters:{
    instanceFilters:function(value){
      if(value===1){
        return '正常'
      }else if(value===0){
        return '挂起'
      }else{
        return '已结束'
      }
    }
  },
  methods:{
    init(){
      axios.get('/mysteel/workflow/instance/detail', {
        params: {id: this.id}
      }).then(resp => {
          statusZero(resp.data.status)
//        console.log(resp.data.instance);
        this.instance = resp.data.instance;
        this.hasHangUp = resp.data.instance.status === 0;
        this.auditMsg = resp.data.auditMsg;
        this.auditProcess = JSON.parse(resp.data.auditProcess);
//        console.log(this.auditProcess);
        console.log(this.auditProcess.taskMap)
        this._makeSteps();
        this.$Spin.hide();
      })
    },
    _makeSteps() {
      this.testStep = []
      const msg = this.auditProcess.taskMap;
      this.testStep[0] = msg.start;
      for(let a = 0; a <= this.testStep.length - 1; a++) {
        if('nexts' in this.testStep[a]){
          const attr = this.testStep[a].nexts[0].id;
        }else{
          this.testStep[a].nexts = [{id:''}]
        }
        const attr = this.testStep[a].nexts[0].id;
        if (attr && msg[attr]) {
          this.testStep.push(msg[attr]);
        }
      }
      console.log('testStep', this.testStep);
      const currentIndex = this.testStep.findIndex(item => !item.audited);
      this.currentStep = currentIndex === -1 ? this.testStep.length : currentIndex;
    },
    receiveMo(){
      this.receiveModal = !this.receiveModal
    },
    receveTask(){ //接收任务
        axios.get('/mysteel/workflow/task/receive?instanceId='+this.id+'&pass='+this.pass)
        .then(res => {
          statusZero(res.data.status)
          if(res.data==true){
            this.$Message.info({
            content: '接收成功',
            duration: 3
          });
            this.$Spin.show();
            this.init();
          }else{
            this.$Message.warning(res.data.message);
          }
          this.receiveModal = !this.receiveModal
        })
    },
    addBlack () {
      this.showModal = true
    },
    //作废
    cancelb(){
      axios.get('/mysteel/workflow/instance/cancel?id='+this.id+'&reason='+this.addForm.name)
      .then(res=>{
        if(res.data == true){
          statusZero(res.data.status)
          this.$Message.info({
            content: '作废成功',
            duration: 3
          });
          this.$Spin.show();
          this.init();
        }else{
          this.$Message.warning(res.data.message);
        }
        this.showModal = false
      })
    },
    //启用
    ablebtn(){
      axios.get('/mysteel/workflow/instance/enable?id='+this.id)
      .then(res=>{
        statusZero(res.data.status)
        if(res.data==true){
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
    hangUp(){ //挂起
      let that = this
      this.$Modal.confirm({
        title: '请确认',
        content: '确认要挂起该流程实例吗？',
        onOk: () => {
          //let datas = { id:that.id }
          axios.get('/mysteel/workflow/instance/disable?id='+this.id)
          //hangUpRequest(formData(datas))
            .then(res=>{
            statusZero(res.data.status)
            if(res.data==true){
              this.$Message.info({
                content: '挂起成功',
                duration: 3
              });
              this.$Spin.show();
              this.init();
            }else{
              this.$Message.warning(res.data.message);
            }
          })

        }
      })
    },
    onDelete(){
      this.$Modal.confirm({
        title: '请确认',
        content: '确认要删除该流程实例吗？',
        onOk: () => {
          axios.get("/mysteel/workflow/instance/delete?id="+this.id)
          .then(res => {
            statusZero(res.data.status)
            if(res.data === true){
              this.$Message.info({
                content: '删除成功',
                duration: 3
              });
              this.goback();
            }else{
              this.$Message.warning(res.data.message);
            }
          })
        }
      })
    },
    goback() {
      this.$router.go(-1)
      // this.$router.push({
      //   name: "instanceList"
      // });
    },
    showDevise() {
      window.open('/mysteel/workflow/instance/image?id=' + this.id, '_blank');
      //this.$router.push({path: '/processDetailDevise', query: {id : this.id }})
    }
  }
}
</script>
<style lang="less" scoped>
@import "./detail.less";
.process_detail{
  .f_card{
    margin: 20px 0;
    .content{
      .process_img{
        position: relative;
        .current_process{
          position: absolute;
          width: 100px;
          height:100px;
          left: 0;
          top:0;
          border: 2px solid blue;
        }
      }
    }
  }
}
.comeup {
  height: 51px;
}
.bordscroll{
    overflow-x: overlay;
}
.padd-20{
  padding:20px 0;
}
.colorBlock{
  width:80px;
  color:#000;
}
</style>
