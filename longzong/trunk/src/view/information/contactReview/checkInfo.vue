<template>
  <Modal v-model="shenheModal" title="审核信息联系人" width="800" @on-cancel="cancelAddModal">
                <Form ref="shenheform" :model="shenheform" :label-width="120">
                    <Row>
                        <Col span="12">
                            <FormItem label="姓名 : ">
                                <P>{{shenheform.name}}&nbsp;</P>
                                <!-- <p v-if="examineName" style="color:#FF0000">变更前：{{shenheform.examineName}}</p> -->
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="性别 ：">
                                <p style="display:inline-block">{{ shenheform.sex}}&nbsp;</p>
                                <!-- <p v-if="examineSex" style="color:#FF0000">变更前：{{shenheform.examineSex}}</p> -->
                            </FormItem>
                        </Col>        
                    </Row>
                    <Row>
                        <Col span="12">
                            <FormItem label="部门 : ">
                                <p>{{ shenheform.department}}&nbsp;</p>
                                <!-- <p v-if="examineDepartment" style="color:#FF0000">变更前：{{shenheform.examineDepartment}}</p> -->
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="职位 : ">
                                <p>{{ shenheform.position}}&nbsp;</p>
                                <!-- <p v-if="examinePosition" style="color:#FF0000">变更前：{{shenheform.examinePosition}}</p> -->
                            </FormItem>
                        </Col>        
                    </Row> 
                    <Row >
                        <Col span="12">
                            <FormItem label="联系电话号码 : ">
                                <p>{{shenheform.phone}}&nbsp;</p>
                                <!-- <p v-if="examinePhone" style="color:#FF0000">变更前：{{shenheform.examinePhone}}</p> -->
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="手机号码 ：">
                                <P>{{ shenheform.mobile}}&nbsp;</P>
                                <!-- <p v-if="examineMobile" style="color:#FF0000">变更前：{{shenheform.examineMobile}}</p> -->
                            </FormItem>
                        </Col>        
                    </Row>
                    <Row >
                        <Col span="12">
                            <FormItem label="QQ号码 : ">
                                <p>{{shenheform.qq}}&nbsp;</p>
                                <!-- <p v-if="examineQq" style="color:#FF0000">变更前：{{shenheform.examineQq}}</p> -->
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="微信号码 ：">
                                <P>{{ shenheform.WeChat}}&nbsp;</P>
                                <!-- <p v-if="examineWeChat" style="color:#FF0000">变更前：{{shenheform.examineWeChat}}</p> -->
                            </FormItem>
                        </Col>        
                    </Row>
                     <Row >
                        <Col span="12">
                            <FormItem label="企业类型 :">
                                <p>{{ shenheform.enterpriseType}}&nbsp;</p>
                                <!-- <p v-if="examineEnterpriseType" style="color:#FF0000">变更前：{{shenheform.examineEnterpriseType}}</p> -->
                            </FormItem>
                        </Col>    
                        <Col span="12">
                            <FormItem label="企业性质 :">
                                <p>{{ shenheform.enterpriseNature}}&nbsp;</p>
                                <!-- <p v-if="examineEnterpriseNature" style="color:#FF0000">变更前：{{shenheform.examineEnterpriseNature}}</p> -->
                            </FormItem>
                        </Col>      
                    </Row>
                    <Row >
                        <Col span="24">
                            <FormItem label="所在企业 :">
                                <p>{{ shenheform.enterpriseName}}&nbsp;</p>
                                <!-- <p v-if="examineEnterpriseName" style="color:#FF0000">变更前：{{shenheform.examineEnterpriseName}}</p> -->
                            </FormItem>
                        </Col>
                     </Row>
                     <Row >
                        <Col span="24">
                            <FormItem label="所在区域 :">
                                <p>{{ shenheform.enterpriseArea}}&nbsp;</p>
                                <!-- <p v-if="examineEnterpriseArea" style="color:#FF0000">变更前：{{shenheform.examineEnterpriseArea}}</p> -->
                            </FormItem>
                        </Col>
                     </Row>
                     <Row >
                        <Col span="24">
                            <FormItem label="详细地址 :">
                                <p>{{ shenheform.enterpriseAddress}}&nbsp;</p>
                                <!-- <p v-if="examineEnterpriseAddress" style="color:#FF0000">变更前：{{shenheform.examineEnterpriseAddress}}</p> -->
                            </FormItem>
                        </Col>
                     </Row>
                     <Row >
                        <Col span="24">
                            <FormItem label="邮编 :">
                                <p>{{ shenheform.enterprisePostcode}}&nbsp;</p>
                                <!-- <p v-if="examineEnterprisePostcode" style="color:#FF0000">变更前：{{shenheform.examineEnterprisePostcode}}</p> -->
                            </FormItem>
                        </Col>
                     </Row>
                    <Row >
                        <Col span="24">
                            <FormItem label="关联品种 : ">
                                 <div>
                                     <Table class="tableCommon" :data="tableData1" :columns="columns1"></Table>
                                 </div>
                                 <!-- <div v-if="examineTableDataOne" style="color:#FF0000">
                                     变更前：
                                     <Table class="tableCommon" :data="examineTableData" :columns="examinecolumns1"></Table>
                                 </div> -->
                            </FormItem>
                        </Col>       
                    </Row>
                    <!-- <Row >
                        <Col span="24">
                            <FormItem label="关联的信息单元 : ">
                               <Table class="tableCommon" :data="tableData2" :columns="columns2"></Table>
                            </FormItem>
                        </Col>       
                    </Row> -->
                    <Row >
                        <Col span="24">
                            <FormItem label="审核结果 : ">
                                <span v-if="this.shenheform.auditStatus==1 || this.shenheform.auditStatus ==3" style="color:#008000">通过</span>
                                <span v-if="this.shenheform.auditStatus==2 || this.shenheform.auditStatus ==4" style="color:#f52a1b">驳回</span>
                            </FormItem>
                        </Col>       
                    </Row>
                    <Row >
                        <Col span="24">
                            <FormItem label="审核意见 : ">
                                {{this.shenheform.description}}
                            </FormItem>
                        </Col>       
                    </Row>
                </Form>
                <div slot="footer">
                  <i-button  class="search-btn" type="primary" @click="cancelAddModal">返回</i-button>
                </div>
            </Modal>
</template>
<script>
import axios from "axios";
import { formData } from "../../../assets/js/common.js";
import {
  getentErpeise,
  detailContactsAudit,
  editContactsAudit,
  enterpeiseType,
  enterpeiseNature,
  detailEnterprise,
  
} from "../unitmangement/api/unitManageMent";
export default {
  name: 'shenheModal',
  props: {
        showEditModal: Boolean,
        checkData: Object
    },
  data(){
    return {
      checkInfoData:{},
      shenheModal:false,
      shenheform:{
        enterpriseType:'',
        enterpriseNature:'',
        enterpriseArea:''
      },
      examineDepartment: false,
      examineSex: false,
      examineName: false,
      examinePosition: false,
      examinePhone: false,
      examineMobile: false,
      examineEnterpriseName: false,
      examineTableDataOne: false,
      descriptionDisplay: false,
      examineEnterpriseType: false,
      examineQq: false,
      examineWeChat: false,
      examineEnterpriseNature:false,
      examineEnterpriseArea:false,
      examineEnterpriseAddress:false,
      examineEnterprisePostcode:false,
      tableData1: [],
      columns1: [
        {
          title: "品种名称",
          key: "breedName"
        },
        {
          title: "品种类型",
          key: "breedTypeName"
        }
      ],
      examinecolumns1: [
        {
          title: "品种名称",
          key: "breedName"
        },
        {
          title: "品种类型",
          key: "breedTypeName"
        }
      ],
      examineTableData: [],
      tableData2: [],
      columns2: [
        {
          title: "信息单元",
          key: "name",
          align: "left"
        }
      ]
    }
  },
  created (){
     
  },
  methods:{
    cancelAddModal (){
        this.shenheModal = false;
        this.$emit('hide-modal');
    },
     // 转换企业类型开始
    convertType(newVal, oldVal) {
      enterpeiseType().then(res => {
        let one = res.response;
        one.map((v, k) => {
          if (v.value == oldVal) {
            this.shenheform.examineEnterpriseType = v.desc;
          }
          if (v.value == newVal) {
            this.shenheform.enterpriseType = v.desc;
            console.log('转换企业类型开始',this.shenheform.enterpriseType);
          }
        });
      });
    },
    // 转换企业结束
    // 转换企业性质开始
    convertNature(newVal, oldVal) {
      enterpeiseNature().then(res => {
        let two = res.response;
        two.map((v, k) => {
          if (v.value == oldVal) {
            this.shenheform.examineEnterpriseNature = v.desc;
          }
          if (v.value == newVal) {
            this.shenheform.enterpriseNature = v.desc;
          }
        });
      });
    },
    // 转换企业性质结束
    // 根据企业ID返回区域开始
    convertArea(newVal){
        let params = {
            id:newVal
        }
        detailEnterprise(formData(params)).then(res => {
            this.shenheform.enterpriseArea = res.response.areaName;
            console.log(res);
        })
    },
    examineConvertArea(newVal){
        let params = {
            id:newVal
        }
        detailEnterprise(formData(params)).then(res => {
            this.shenheform.examineEnterpriseArea = res.response.areaName;
        })
    },
    // 根据企业ID返回区域结束
    showCheck() {
      let form = { id: this.checkInfoData.row.id };
      detailContactsAudit(formData(form)).then(res => {
        console.log("回显数据",res);
        this.shenheform.id = res.response.id;
        this.shenheform.name = res.response.name;
        if (res.response.sex == 0) {
          this.shenheform.sex = "男";
        }
        if (res.response.sex == 1) {
          this.shenheform.sex = "女";
        }
        this.shenheform.department = res.response.department;
        this.shenheform.position = res.response.position;
        this.shenheform.enterpriseName = res.response.enterpriseName;
        this.shenheform.enterpriseAddress = res.response.enterpriseAddress;
        this.shenheform.enterprisePostcode = res.response.enterprisePostcode;
        this.shenheform.description = res.response.description;
        this.shenheform.auditStatus = res.response.auditStatus;
        if (res.response.taskContactsVO.enterpriseType == null) {
          this.examineEnterpriseType = false;
          this.shenheform.examineEnterpriseType = "";
        } else if (res.response.taskContactsVO.enterpriseType == "变更前为空") {
          this.examineEnterpriseType = true;
          this.shenheform.examineEnterpriseType = "";
        } else {
          this.examineEnterpriseType = true;
          this.shenheform.examineEnterpriseType = res.response.taskContactsVO.enterpriseType;
        }
        this.convertType(
          res.response.enterpriseType,
          res.response.taskContactsVO.enterpriseType
        );

        if (res.response.taskContactsVO.enterpriseNature == null) {
          this.examineEnterpriseNature = false;
          this.shenheform.examineEnterpriseNature = "";
        } else if (res.response.taskContactsVO.enterpriseType == "变更前为空") {
          this.examineEnterpriseNature = true;
          this.shenheform.examineEnterpriseNature = "";
        } else {
          this.examineEnterpriseNature = true;
          this.shenheform.examineEnterpriseNature = res.response.taskContactsVO.enterpriseNature;
        }
        this.convertNature(
          res.response.enterpriseNature,
          res.response.taskContactsVO.enterpriseNature
        );


        if (res.response.taskContactsVO.enterpriseAreaId == null) {
          this.examineEnterpriseArea = false;
          this.shenheform.examineEnterpriseArea = "";
        } else if (res.response.taskContactsVO.enterpriseAreaId == "变更前为空") {
          this.examineEnterpriseArea = true;
          this.shenheform.examineEnterpriseArea = "";
        } else {
          this.examineEnterpriseArea = true;
          this.shenheform.examineEnterpriseArea = res.response.taskContactsVO.enterpriseAreaId;
          this.shenheform.examineEnterpriseArea = res.response.taskContactsVO.enterpriseAreaName;
        }
        // this.convertArea(res.response.enterpriseId);
        this.shenheform.enterpriseArea = res.response.enterpriseAreaName;
        // this.examineConvertArea(res.response.taskContactsVO.enterpriseId);

        this.shenheform.mobile = res.response.mobile;
        this.shenheform.qq = res.response.qq;
        this.shenheform.WeChat = res.response.weChat;
        this.shenheform.phone = res.response.phone;
        let breeds = res.response.breeds;
        if (res.response.taskContactsBreedRelationVOList) {
          this.tableData1 = res.response.taskContactsBreedRelationVOList;
        }
        if (res.response.relationTaskList) {
          this.tableData2 = res.response.relationTaskList;
        }
        // 变更前examineTableData1
        if (
          res.response.taskContactsVO.taskContactsBreedRelationVOList == null
        ) {
          this.examineTableDataOne = false;
          this.examineTableData = [];
        } else if (res.response.taskContactsVO.name == "变更前为空") {
          this.examineTableDataOne = true;
          this.examineTableData = [];
        } else {
          this.examineTableDataOne = true;
          this.examineTableData =
            res.response.taskContactsVO.taskContactsBreedRelationVOList;
        }

        if (res.response.taskContactsVO.name == null) {
          this.examineName = false;
          this.shenheform.examineName = "";
        } else if (res.response.taskContactsVO.name == "变更前为空") {
          this.examineName = true;
          this.shenheform.examineName = "";
        } else {
          this.examineName = true;
          this.shenheform.examineName = res.response.taskContactsVO.name;
        }

        if (res.response.taskContactsVO.sex == null) {
          this.examineSex = false;
          this.shenheform.examineSex = "";
        } else if (res.response.taskContactsVO.sex == "变更前为空") {
          this.examineSex = true;
          this.shenheform.examineSex = "";
        } else {
          this.examineSex = true;
          this.shenheform.examineSex =
            res.response.taskContactsVO.sex == 0 ? "男" : "女";
        }

        if (res.response.taskContactsVO.department == null) {
          this.examineDepartment = false;
          this.shenheform.examineDepartment = "";
        } else if (res.response.taskContactsVO.department == "变更前为空") {
          this.examineDepartment = true;
          this.shenheform.examineDepartment = "";
        } else {
          this.examineDepartment = true;
          this.shenheform.examineDepartment =
            res.response.taskContactsVO.department;
        }

        if (res.response.taskContactsVO.position == null) {
          this.examinePosition = false;
          this.shenheform.examinePosition = "";
        } else if (res.response.taskContactsVO.position == "变更前为空") {
          this.examinePosition = true;
          this.shenheform.examinePosition = "";
        } else {
          this.examinePosition = true;
          this.shenheform.examinePosition =
            res.response.taskContactsVO.position;
        }

        if (res.response.taskContactsVO.phone == null) {
          this.examinePhone = false;
          this.shenheform.examinePhone = "";
        } else if (res.response.taskContactsVO.phone == "变更前为空") {
          this.examinePhone = true;
          this.shenheform.examinePhone = "";
        } else {
          this.examinePhone = true;
          this.shenheform.examinePhone = res.response.taskContactsVO.phone;
        }

        if (res.response.taskContactsVO.mobile == null) {
          this.examineMobile = false;
          this.shenheform.examineMobile = "";
        } else if (res.response.taskContactsVO.mobile == "变更前为空") {
          this.examineMobile = true;
          this.shenheform.examineMobile = "";
        } else {
          this.examineMobile = true;
          this.shenheform.examineMobile = res.response.taskContactsVO.mobile;
        }

        if (res.response.taskContactsVO.qq == null) {
          this.examineQq = false;
          this.shenheform.examineQq = "";
        } else if (res.response.taskContactsVO.qq == "变更前为空") {
          this.examineQq = true;
          this.shenheform.examineQq = "";
        } else {
          this.examineQq = true;
          this.shenheform.examineQq = res.response.taskContactsVO.qq;
        }

        if (res.response.taskContactsVO.weChat == null) {
          this.examineWeChat = false;
          this.shenheform.examineWeChat = "";
        } else if (res.response.taskContactsVO.weChat == "变更前为空") {
          this.examineWeChat = true;
          this.shenheform.examineWeChat = "";
        } else {
          this.examineWeChat = true;
          this.shenheform.examineWeChat = res.response.taskContactsVO.weChat;
        }

        if (res.response.taskContactsVO.enterpriseName == null) {
          this.examineEnterpriseName = false;
          this.shenheform.examineEnterpriseName = "";
        } else if (res.response.taskContactsVO.enterpriseName == "变更前为空") {
          this.examineEnterpriseName = true;
          this.shenheform.examineEnterpriseName = "";
        } else {
          this.examineEnterpriseName = true;
          this.shenheform.examineEnterpriseName =
            res.response.taskContactsVO.enterpriseName;
        }

        if (res.response.taskContactsVO.enterpriseAddress == null) {
          this.examineEnterpriseAddress = false;
          this.shenheform.examineEnterpriseAddress = "";
        } else if (res.response.taskContactsVO.enterpriseAddress == "变更前为空") {
          this.examineEnterpriseAddress = true;
          this.shenheform.examineEnterpriseAddress = "";
        } else {
          this.examineEnterpriseAddress = true;
          this.shenheform.examineEnterpriseAddress =
            res.response.taskContactsVO.enterpriseAddress;
        }

        if (res.response.taskContactsVO.enterprisePostcode == null) {
          this.examineEnterprisePostcode = false;
          this.shenheform.examineEnterprisePostcode = "";
        } else if (res.response.taskContactsVO.enterprisePostcode == "变更前为空") {
          this.examineEnterprisePostcode = true;
          this.shenheform.examineEnterprisePostcode = "";
        } else {
          this.examineEnterprisePostcode = true;
          this.shenheform.examineEnterprisePostcode =
            res.response.taskContactsVO.enterprisePostcode;
        }
      });
      // 显示审核框
      this.shenheModal = true;
    },
  },
  watch:{
    showEditModal (newV, oldV){
        this.shenheModal = newV
    }, 
    checkData(newV, oldV){
        this.checkInfoData = newV;
        console.log('checkInfoData',this.checkInfoData);
        this.showCheck();
    },
  }
}
</script>
