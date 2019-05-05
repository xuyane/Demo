<template lang="html">
  <div class="basic-modal">
      <!-- 基本信息弹窗 -->
    <Modal v-model="basicModalVisible" title="信息单元" class-name="verModal"> 
      <div class="warp" >
        <div class="unit_title">
          <span>基本信息</span>
        </div>         
        <div>
          <Form ref="form" style='margin-top: 24px;' class='basic-modal' :model="form" :label-width="120">            
            <Row >
              <Col><FormItem label="信息单元编码 :">{{ form.code}}</FormItem></Col>
            </Row>
            <Row >
              <Col><FormItem label="信息单元名称 :">{{ form.name}}</FormItem></Col>        
            </Row>
            <Row >
              <Col><FormItem label="站点 :">{{ form.siteName}}</FormItem></Col>
            </Row>
            <Row >
              <Col><FormItem label="产品 :">{{ form.productName}}</FormItem></Col>
            </Row>
            <Row >
              <Col><FormItem label="信息大类 :">{{ form.bigTypeName}}</FormItem></Col>
            </Row>
            <Row >
              <Col><FormItem label="关联的信息分类 :"><Input v-model="form.basicInfoClassify" type="textarea" disabled :rows="5"/></FormItem></Col>
            </Row>
            <Row >
              <Col><FormItem label="关联的品种 :"><Input v-model="form.basicTypeClassify" type="textarea" disabled :rows="5"/></FormItem></Col>        
            </Row>
            <Row >
              <Col><FormItem label="关联的区域 :"><Input v-model="form.basicareaClassify" type="textarea" disabled :rows="5"/></FormItem></Col>
            </Row>
            <Row >
              <Col><FormItem label="关联的企业 :"><Input v-model="form.basiccompanyClassify" type="textarea" disabled :rows="5"/></FormItem></Col>        
            </Row>
            <Row >
              <Col><FormItem label="前端是否展示 :">{{form.isShowName}}</FormItem></Col>
            </Row>
            <Row >
              <Col><FormItem label="节假日是否展示 :">{{form.isHolidayShowName}}</FormItem></Col>
            </Row>
            <Row >
              <Col><FormItem label="默认关键字 :">{{form.defaultKeyword}}</FormItem></Col>
            </Row>
            <Row >
              <Col><FormItem label="默认文章摘要 :">{{form.defaultSummary}}</FormItem></Col>
            </Row>
            <Row >
              <Col><FormItem label="默认信息来源 :">{{form.defaultSource}}</FormItem></Col>
            </Row> 
          </Form>
        </div>           
      </div>         
      <div class="warp" >
        <div class="unit_title">
          <span>任务信息</span>
        </div>
        <div class="btn-modal _content">
          <Form ref="form" :model="form">
            <Col span="8"><FormItem label="发布周期： ">{{form.taskCycleName}} <span v-show="form.taskCycleName !=='1次/日'">最晚发布日期{{form.publishDate}}</span></FormItem></Col>
            <Col span="8"><FormItem label="最晚发布时间点：">{{formatCheckTime(form.checkTime)}}</FormItem></Col> 
            <Col span="8"><FormItem label="任务责任人：">{{form.executorName}}</FormItem></Col> 
          </Form>
        </div>
      </div>
      <div slot="footer">
        <i-button type="primary" @click="hideModal">返回</i-button>
      </div> 
    </Modal>
  </div>
</template>

<script>
import { basicModal } from "../../unitmangement/api/infoDiffusion";
import { formData } from "../../../../assets/js/common.js";
export default {
  data() {
    return {
      basicModalVisible: false,
      form: {
        basicInfoClassify: "",
        basicTypeClassify: "",
        basicareaClassify: "",
        basiccompanyClassify: ""
      }
    };
  },
  methods: {
    formatCheckTime(val) {
      if (val == "0" || val == 0) {
        return "";
      } else {
        return val;
      }
    },
    showModal() {
      this.basicModalVisible = true;
    },
    showBasicInfo(row) {
      var that = this;
      let params = {
        formationUnitId: row.informationUnitId
      };
      basicModal(formData(params)).then(res => {
        that.form = res.response;
        if (res.response.infoInformationUnitRelationList.length > 0) {
          that.form.basicInfoClassify = "";
          that.form.basicTypeClassify = "";
          that.form.basicareaClassify = "";
          that.form.basiccompanyClassify = "";
          that.form.infoInformationUnitRelationList.forEach(element => {
            if (element.relationType == 0) {
              that.form.basicInfoClassify += element.roadName + "\n";
            }
            if (element.relationType == 1) {
              that.form.basicTypeClassify += element.roadName + "\n";
            }
            if (element.relationType == 2) {
              that.form.basicareaClassify += element.roadName + "\n";
            }
            if (element.relationType == 3) {
              that.form.basiccompanyClassify += element.roadName + "\n";
            }
          });
        }
      });
    },
    hideModal() {
      this.basicModalVisible = false;
    }
  }
};
</script>

<style scoped>
.warp .unit_title span {
  height: 43px;
  width: 100%;
  padding-left: 10px;
  background: #ebf2fe;
  border: 1px solid #bbbbbb;
  display: block;
  color: #000000;
  font-size: 18px;
  line-height: 43px;
}
._content {
  height: 30px;
  line-height: 30px;
  padding: 10px;
}
</style>
