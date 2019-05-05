<style lang="less" scoped>
.receiptsBackgroound{
  background-color: #fff;
  display: flex;
  justify-content: space-between;
}
.tranMessages1{
  text-align: center;
  padding-top: 50px;
}
.tranMessages2{
  text-align: center;
  padding-top: 80px;
}
.remittancesty{
  padding: 80px;
}
.messtitle{
  background-color: #2D8CF0;
  padding:10px 10px;
  font-size: 16px;
  color: #fff;
  text-align: center;
}
.diviceLine{
  margin-top: 8px;
  height:1px;
  width: 100%;
  background-color: #ccc;
}
.detailpp p{
  font-size: 14px;
}
.ivu-form-item {
    margin-bottom: 0px !important;
}

.textarea.ivu-input {
    max-width: 100%;
    height: auto;
    min-height: 50px;
    vertical-align: bottom;
    font-size: 14px;
    min-width: 300px;
}

</style>
<template>
<Row>
  <Col span="24">
    <Row class-name="current-position">
      当前位置：客户关系管理&nbsp;&nbsp;>>&nbsp;&nbsp;汇款信息
    </Row>
  </Col>
  <Col span="24" >
    <Row class="receiptsBackgroound">
      <Col span="7" class="tranMessages1">
        <img style="width:100%;" src="../../../assets/images/apliyReceipts.png" alt="">
      </Col> 
      <Col span="6" class="tranMessages2">
        <img style="width:100%;" src="../../../assets/images/u53.png" alt="">
      </Col>
      <Col span="11" class="remittancesty">
      <Row>
        <div class="messtitle"><h2>汇款资料</h2></div> 

        <Col span="20" class="noBorderTextarea">
          <Input style="border:0px" type="textarea" :readonly="true" :autosize="true" v-model="detailText"/>
        </Col>
        <Col span="4" style="padding-top:8px;" class="text-right">
          <Button type="primary" 
          v-clipboard:copy="detailText"
          v-clipboard:success="onCopy1"
          v-clipboard:error="onError1" >复制</Button>
        </Col>

        <Col span="24">
          <div class="diviceLine"></div>
        </Col>
        <Col span="20" style="padding-top:8px;" class="noBorderTextarea">
          <Input style="border:0px" type="textarea" :readonly="true" :autosize="true" v-model="detailText2"/>
        </Col>
        <Col span="4" style="padding-top:8px;" class="text-right">
          <Button type="primary"
           v-clipboard:copy="detailText2"
          v-clipboard:success="onCopy2"
          v-clipboard:error="onError2">复制</Button>
        </Col>
        
      </Row>
      </Col> 
    </Row>
  </Col>
</Row>
</template>
<script>
export default {
  name:'remittanceInformation',
  data(){
    return{
      detailText:`公司名称：山东隆众信息技术有限公司
      
纳税人识别号：91370303676849987W

地址及电话：淄博高新区柳泉路125号先进陶瓷创新园B座808-809室   0533-2269602

开户行及账号：淄博高新区农行开发区支行  15256101040038017

银行行号：103 453 025 618`,
      detailText2:`收款单位：山东隆众信息技术有限公司

开 户 行：中国农业银行淄博高新技术产业开发区支行

美元账号：15256114040000838
      `,
    }
  },
  methods:{
    onCopy1: function (e) {
      //console.log(e)
      this.$Message.success("复制成功！");
    },
    onError1: function (e) {
      this.$Message.error("复制失败！");
    },
    onCopy2: function (e) {
      //console.log(e)
      this.$Message.success("复制成功！");
    },
    onError2: function (e) {
      this.$Message.error("复制失败！");
    }


  }
}
</script>
