<style lang="less" scoped>
@import './informationSource.less';
.unit .unit_title span,.unit_content{
    width: 100%;
}
.unit_content .unit_content_left{
    width: 50%
}
.unit_content .unit_s_left{
    width: 40%;
}
.unit_content .unit_s_right{
    width: 60%;
}
</style>
<template>
  <Row>
    <Col span="24">
      <Row class-name="current-position">
        当前位置：信息发布管理&nbsp;&nbsp;>>&nbsp;&nbsp;新建信息单元
      </Row>
    </Col>
    <Col span="24">
      <Row class-name="add-container">
        <div class="step-container">
          <span class="step1 active">基本信息设置</span>
          <span class="step2 active">信息联系人设置</span>
          <span class="step2">关联相关信息单元</span>
        </div>
        <!-- 信息单元开始 -->
        <div class="unit">
            <div class="unit_title">
                <span>信息单元</span>
            </div>
            <div class="unit_content">
                <div class="unit_content_left">
                    <div class="unit_s_left">信息单元名称：</div>
                    <div class="unit_s_right">{{taskName}}</div>
                </div>
                <div class="unit_content_left no_line">
                    <div class="unit_s_left">信息单元编码：</div>
                    <div class="unit_s_right">{{taskCode}}</div>
                </div>
            </div>
        </div>
         <!-- 信息单元结束 -->
        <p class="title">信息联系人列表</p>
          <Col span="24">
            <Row class-name="table-con">
                <div class="btn-container">
                  <Button type="primary" class="search-btn" @click="addContactShow">新增信息联系人</Button>
                </div>
                <Table class="tableCommon"
                  :data="tableData"
                  :columns="columns"
                  :stripe="true"
                  :border="true"
                >
                </Table>
                <Row>
                  <oil-page :total="total" :page-size="pageSize" @page-change="pageChange" :page-size-opts="pageSizeOpts" :show-sizer="showSizer"></oil-page>
                </Row>
                <Row type="flex" justify="space-between">
                  <Col span="24" class="text-center">
                    <!-- <Button type="primary"  @click="shangRelationInformation">上一步</Button> -->
                    <Button type="primary" style="margin-left: 8px" @click="nextRelationInformation" >下一步</Button>
                    <Button type="primary" style="margin-left: 8px" @click="OK">完成</Button>
                  </Col>
                </Row>
            </Row>
          </Col>
      </Row>        
    </Col>
    <Col span="24">
      <!-- 新增联系人弹窗 -->
        <Modal v-model="addContact" title="新增信息联系人"  @on-cancel="handleReset('formValidate')" width="750">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
                <Row type="flex" justify="space-between">
                    <Col span="12">
                    <FormItem label="姓名：" prop="name">
                        <Input v-model="formValidate.name" class="search-input" placeholder="请输入姓名"></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="性别：">
                        <Select v-model="formValidate.sex" class="form-select">
                            <Option v-for="(option, index) in editFormValidateSex" :value="option.value" :key="index">{{ option.label }}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
                <Row type="flex" justify="space-between">
                    <Col span="12">
                    <FormItem label="部门：" prop="department">
                        <Input v-model="formValidate.department" class="search-input"></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="职位：" prop="position">
                        <Input v-model="formValidate.position" class="search-input"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row type="flex" justify="space-between">
                    <Col span="12">
                    <FormItem label="电话号码：" prop="phone">
                        <Input v-model="formValidate.phone" class="search-input" :maxlength="phoneMaxLength"></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="手机号码：" >
                        <Input v-model="formValidate.mobile" class="search-input" @on-blur="validFocus" :maxlength="mobileMaxLength"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row type="flex" justify="space-between">
                    <Col span="12">
                    <FormItem label="QQ号码：" >
                        <Input v-model="formValidate.qq" class="search-input" :maxlength="qqMaxLength"></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="微信号码：" >
                        <Input v-model="formValidate.weChat" class="search-input" :maxlength="qqMaxLength"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row type="flex" justify="space-between">
                    <Col span="16">
                    <FormItem label="所在企业:" prop="enterpriseId">
                        <Select v-model="formValidate.enterpriseIdOne11" filterable remote :remote-method="remoteMethod1" @on-open-change="select_one" ref="enterpriseRef" label-in-value :loading="loading1">
                            <Option v-for="(option, index) in options1" :value="option.value" :key="index">{{option.label}}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                    <Col span="6">
                    <Button type="primary" icon="ios-search" @click="qichacha">企查查</Button>
                    </Col>
                </Row>
                <Row type="flex" justify="space-between">
                    <Col span="24">
                    <FormItem label="企业简称：" prop="enterpriseShortName">
                        <Input v-model="formValidate.enterpriseShortName" class="search-input"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row type="flex" justify="space-between">
                    <Col span="24">
                    <FormItem label="企业类型：" prop="enterpriseType">
                        <Select v-model="formValidate.enterpriseType" label-in-value >
                            <Option v-for="(option, index) in options2" :value="option.value" :key="index">{{option.label}}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
                <Row type="flex" justify="space-between">
                    <Col span="24">
                    <FormItem label="企业性质：" prop="enterpriseNature">
                        <Select v-model="formValidate.enterpriseNature" label-in-value>
                            <Option v-for="(option, index) in options3" :value="option.value" :key="index">{{option.label}}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
                <Row type="flex" justify="space-between">
                    <Col span="24">
                    <FormItem label="所在区域：" prop="enterpriseAreaId">
                        <Select v-model="formValidate.enterpriseAreaId" filterable remote @on-query-change="remoteMethod4" label-in-value :loading="loading1" @on-change="SelectAreaName" ref="changeArea">
                            <Option v-for="(option, index) in options4" :value="option.value" :key="index">{{option.label}}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                    <Col span="24">
                    <FormItem label="详细地址：" prop="enterpriseAddress">
                        <Input v-model="formValidate.enterpriseAddress" class="search-input" placeholder="请输入详细地址"></Input>
                    </FormItem>
                    </Col>
                    <Col span="24">
                    <FormItem label="邮编：" prop="enterprisePostcode">
                        <Input v-model="formValidate.enterprisePostcode" class="search-input" placeholder="请输入邮编"></Input>
                    </FormItem>
                    </Col>
                    <Col span="24">
                    <FormItem label="关联品种：" prop="breeds">
                        <Button type="primary" @click="addBreeds">添加品种</Button>
                    </FormItem>
                    </Col>
                </Row>

                <Row class-name="table-con" style="padding-left:0px">
                    <Table class="tableCommon" :data="tableData_add" :columns="columns_one" :stripe="true" :border="true">
                    </Table>
                </Row>
            </Form>
            <div slot="footer">
                <Button type="primary" :loading="handleLoad" @click="handleSubmit('formValidate')">确定</Button>
                <Button style="margin-left:8px;" @click="handleReset('formValidate')">取消</Button>
            </div>
        </Modal>
        <!-- 新增联系人弹窗结束 -->
      <!-- 编辑开始 -->
        <Modal v-model="editContactModel" title="编辑信息联系人" width="750">
            <Form ref="editFormValidate" :model="editFormValidate" :rules="ruleValidate" :label-width="100">
                <Row type="flex" justify="space-between">
                    <Col span="12">
                    <FormItem label="姓名：" prop="namedit">
                        <Input v-model="editFormValidate.name" class="search-input" placeholder="请输入姓名"></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="性别：">
                        <Select v-model="editFormValidate.sex" class="form-select">
                            <Option v-for="(option, index) in editFormValidateSex" :value="option.value" :key="index">{{ option.label }}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
                <Row type="flex" justify="space-between">
                    <Col span="12">
                    <FormItem label="部门：" prop="department">
                        <Input v-model="editFormValidate.department" class="search-input"></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="职位：" prop="position">
                        <Input v-model="editFormValidate.position" class="search-input"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row type="flex" justify="space-between">
                    <Col span="12">
                    <FormItem label="电话号码：" prop="editphone">
                        <Input v-model="editFormValidate.phone" class="search-input" :maxlength="phoneMaxLength"></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="手机号码：">
                        <Input v-model="editFormValidate.mobile" class="search-input" @on-blur="editValidFocus" :maxlength="mobileMaxLength"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row type="flex" justify="space-between">
                    <Col span="12">
                    <FormItem label="QQ号码：" >
                        <Input v-model="editFormValidate.qq" class="search-input" :maxlength="qqMaxLength"></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="微信号码：" >
                        <Input v-model="editFormValidate.weChat" class="search-input" :maxlength="qqMaxLength"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row type="flex" justify="space-between">
                    <Col span="16">
                    <FormItem label="所在企业:" prop="editenterpriseName">
                        <Select v-model="editFormValidate.enterpriseIdOne111" filterable remote :remote-method="remoteMethod1" @on-open-change="select_enterprise" label-in-value :loading="loading1" ref="editFormValidRef">

                            <!-- <option  v-if="editFormValidate.enterpriseId==option.value" selected v-for="(option, index) in options1" :value="option.value" >{{option.label}}</option> -->
                            <Option v-for="(option, index) in options1" :value="option.value" :key="index">{{option.label}}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                    <Col span="6">
                    <Button type="primary" icon="ios-search" @click="qichacha">企查查</Button>
                    </Col>
                </Row>
                <Row type="flex" justify="space-between">
                    <Col span="24">
                    <FormItem label="企业简称：" prop="enterpriseShortName">
                        <Input v-model="editFormValidate.enterpriseShortName" class="search-input"></Input>
                    </FormItem> 
                    </Col>
                </Row>
                <Row type="flex" justify="space-between">
                    <Col span="24">
                    <FormItem label="企业类型：" prop="enterpriseType">
                        <Select v-model="editFormValidate.enterpriseType" label-in-value>
                            <Option v-for="(option, index) in options2" :value="option.value" :key="index">{{option.label}}</Option>
                        </Select>
                    </FormItem>
                    </Col>

                </Row>
                <Row type="flex" justify="space-between">
                    <Col span="24">
                    <FormItem label="企业性质：" prop="enterpriseNature">
                        <Select v-model="editFormValidate.enterpriseNature" label-in-value>
                            <Option v-for="(option, index) in options3" :value="option.value" :key="index">{{option.label}}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
                <Row type="flex" justify="space-between">
                    <Col span="24">
                    <FormItem label="所在区域：" prop="enterpriseAreaId">
                        <Select v-model="editFormValidate.enterpriseAreaIdOne" filterable remote ref="enterpriseArea" @on-query-change="remoteMethod4" @on-change="enterpriseAreaIdOneValue" label-in-value :loading="loading1" >
                            <Option v-for="(option, index) in options4" :value="option.value" :key="index">{{option.label}}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                    <Col span="24">
                    <FormItem label="详细地址：" prop="enterpriseAddress">
                        <Input v-model="editFormValidate.enterpriseAddress" class="search-input" placeholder="请输入详细地址"></Input>
                    </FormItem>
                    </Col>
                    <Col span="24">
                    <FormItem label="邮编：" prop="enterprisePostcode">
                        <Input v-model="editFormValidate.enterprisePostcode" class="search-input" placeholder="请输入邮编"></Input>
                    </FormItem>
                    </Col>
                    <Col span="24">
                    <FormItem label="关联品种：" prop="breeds">
                        <Button type="primary" @click="showAddBreedsModalShow">添加品种</Button>
                    </FormItem>
                    </Col>
                </Row>
                <Row type="flex" justify="space-between" >
                    <Table :data="tableData_add" :columns="columns_one" :stripe="true" :border="true" class="tableCommon">
                    </Table>
                </Row>
            </Form>
            <div slot="footer">
                <Button type="primary" :loading="handleEditLoad" @click="handleEditSubmit('editFormValidate')">确定</Button>
                <Button style="margin-left:8px;" @click="handleEditReset('editFormValidate')">取消</Button>
            </div>
        </Modal>
        <!-- 编辑结束 -->
         <!-- 添加品种 -->
      <Modal v-model="showAddBreedsModal" title="添加品种" width="450"  @on-cancel="resetBreeds('addBreedsform')">
            <Form ref="addBreedsform" :model="addBreedsform" :label-width="120" :rules="ruleValidateBreed">
                <Row type="flex" justify="space-between">
                    <Col span="16">
                    <FormItem label="品种名称:" prop="breedId" >
                        <Select v-model="addBreedsform.breedId" filterable remote :remote-method="Variety" @on-change="select_breed" label-in-value :loading="loading1" ref="breedIdref">
                            <Option v-for="(option, index) in options_Variety" :value="option.value" :key="index">{{option.label}}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
                <Row type="flex" justify="space-between" >
                    <Col span="16">
                    <FormItem label="品种类型:" prop="breedTypeId" >
                        <Select v-model="addBreedsform.breedTypeId" label-in-value @on-change="select_breedType" ref="breedTypeIdref">
                            <Option v-for="(option, index) in tableData_one" :value="option.value" :key="index">{{option.label}}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
                <Row type="flex" justify="space-between" >
                  <Col span="15" class="text-right">
                  <div style="color:red" v-if="nameType">品种名称和品种类型已存在</div>
                  </Col>
                </Row>
                
            </Form>
            <div slot="footer">
                <Button type="primary" @click="saveBreeds('addBreedsform')">确定</Button>
                <Button style="margin-left:8px;" @click="resetBreeds('addBreedsform')">取消</Button>
            </div>
        </Modal>
        <!-- 添加品种结束 -->
        <!-- 联系信息人详情开始 -->
        <Modal v-model="detailModal" title="信息联系人详情" width="800" @on-cancel='fanhuiOne'> 
            <Form ref="detailform" :model="detailform" :label-width="120">
                <Row>
                    <Col span="12">
                    <FormItem label="姓名 : ">{{ detailform.name}}</FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="性别 ：">{{ detailform.sex}}</FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                    <FormItem label="部门 : ">{{ detailform.department}}</FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="职位 : ">{{ detailform.position}}</FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                    <FormItem label="联系电话号码 : ">{{ detailform.phone}}</FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="手机号码 ：">{{ detailform.mobile}}</FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                    <FormItem label="QQ号码 : ">{{ detailform.qq}}</FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="微信号码 ：">{{ detailform.weChat}}</FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                    <FormItem label="所在企业 :">{{ detailform.enterpriseName}}</FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="企业简称 ：">{{ detailform.enterpriseShortName}}</FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span="12">
                    <FormItem label="企业类型 ：">{{ detailform.enterpriseType}}</FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="企业性质 ：">{{ detailform.enterpriseNature}}</FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                    <FormItem label="所在区域 ：">{{ detailform.enterpriseAreaName}}</FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="邮编 ：">{{ detailform.enterprisePostcode}}</FormItem>
                    </Col>

                </Row>
                <Row>
                    <Col span="12">
                    <FormItem label="详细地址 ：">{{ detailform.enterpriseAddress}}</FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                    <FormItem label="关联品种 : ">
                        <Table :data="tableData1" :columns="columns1"></Table>
                    </FormItem>
                    </Col>
                </Row>
                <!-- <Row>
                    <Col span="24">
                    <FormItem label="关联的信息单元 : ">
                        <Table class="tableCommon" :data="tableData2" :columns="columns2"></Table>
                    </FormItem>
                    </Col>
                </Row> -->
            </Form>
                <div slot="footer">
                    <Button style="margin-left:8px;" @click="fanhuiOne">返回</Button>
                </div>
        </Modal>
        <!-- 联系信息人详情结束 -->
    </Col>
    <!-- <new-information-contacts  :showEditModal="showEditModal" @show-edit-modal="hideEditModal"></new-information-contacts> -->
   
  </Row>
</template>
<script>
import axios from "axios";
import { formData } from "../../../assets/js/common.js";
import oilPage from "../../components/page/page.vue";
import {Variety, getentErpeise,enterpeiseType,enterpriseNature,enterpriseArea,detailEnterprise,VarietyType,deleteapp,detailContacts,toInfromationDetail,addContacts,editContacts,UniqueContactsname} from "../unitmangement/api/unitManageMent";
// import newInformationContacts from './newinformationContacts.vue'

export default {
  name:"informationSource",
  components:{
    oilPage,
    // newInformationContacts,
  },
  data() {
    // 请输入姓名
    const validateName = (rule, value, callback) => {
      if (value) {
        let params = {
          enterpriseId:this.formValidate.enterpriseId == null ? '' : this.formValidate.enterpriseId,
          name:this.formValidate.name,
          id:this.editDataId
        }
        UniqueContactsname(formData(params)).then(res => {
      console.log(1,this.formValidate.name)
          console.log('res',res);
          if(!res.response.result){
            callback(new Error('姓名不能重复'));
          }else{
            callback();
          }   
        });
      } else {
        callback(new Error("请输入姓名"));
      }
    };
    const validateEditName = (rule, value, callback) => {
      if (this.editFormValidate.name) {
        let params = {
          enterpriseId:this.editFormValidate.enterpriseId == null ? '' : this.editFormValidate.enterpriseId,
          name:this.editFormValidate.name,
          id:this.editDataId
        }
        UniqueContactsname(formData(params)).then(res => {
        console.log(1,this.formValidate.name)
          console.log('res',res);
          if(!res.response.result){
            callback(new Error('姓名不能重复'));
          }else{
            callback();
          }   
        });
      } else {
        callback(new Error("请输入姓名"));
      }
    };
    //请输入所在企业
    const validateenterpriseName = (rule, value, callback) => {
    let queryData = this.$refs.enterpriseRef.query;
      if (queryData) {
        callback();
      } else {
        callback(new Error("请输入所在企业"));
      }
    };
    const editvalidateenterpriseName = (rule, value, callback) => {
    let queryData = this.$refs.editFormValidRef.query;
      if (queryData) {
        callback();
      } else {
        callback(new Error("请输入所在企业"));
      }
    };
    //请输入企业类型
    const validateenterpriseType = (rule, value, callback) => {
      console.log(111888886,this.editFormValidate.enterpriseType);
      if (value == null) {
        callback(new Error("请选择企业类型"));
      } else {
        callback();;
      }
      // if (this.editFormValidate.enterpriseType == null) {
      //   callback(new Error("请选择企业类型"));
      // } else {
      //   callback();
      // }
    };
    //请输入企业性质
    const validateenterpriseNature = (rule, value, callback) => {
      console.log(111888887,this.editFormValidate.enterpriseNature);
      console.log(111888887,this.formValidate.enterpriseNature);
      if(value== null){
        callback(new Error("请输入企业性质"));
      } else {
        callback();
      }
      // if(this.editFormValidate.editFormValidate== null){
      //   callback(new Error("请输入企业性质"));
      // } else {
      //   callback();
      // }
    };
    //请输入所在区域
    const validateenterpriseAreaId = (rule, value, callback) => {
      if (value) {
        callback();
      } else {
        callback(new Error("请输入所在区域"));
      }
    };
    //请输入详细地址
    const validateenterpriseAddress = (rule, value, callback) => {
      if (value) {
        callback();
      } else {
        callback(new Error("请输入详细地址"));
      }
    };
    const validatetableDataadd = (rule, value, callback) => {
      if (this.tableData_add.length > 0) {
        callback();
      } else {
        callback(new Error("请关联品种"));
      }
    };
    const validatebreedId = (rule, value, callback) => {
      if(value == 0 && value !== ""){
        callback();
      }else if (!value) {
        callback(new Error("请选择品种"));
      } else {
        callback();
      }
    };
    const validatebreedTypeId = (rule, value, callback) => {
      if(value == 0 && value !== ""){
        callback();
      }else if (!value) {
        callback(new Error("请选择品种类别"));
      } else {
        callback();
      }
    };
    const validatetaskId = (rule, value, callback) => {
      if (value) {
        callback();
      } else {
        callback(new Error("请关联信息单元"));
      }
    };
    const validatetaskIdList = (rule, value, callback) => {
      if (value) {
        callback();
      } else {
        callback(new Error("请关联信息单元"));
      }
    };
    const validatePhone = (rule, value, callback) => {
      // if (value) {
      //   const reg = /^0\d{2,3}-?\d{7,8}$/;
      //   if (reg.test(value) === false) {
      //     callback(new Error("请输入正确的电话号码"));
      //   } else {
      //     callback();
      //   }
      // } else {
      //   callback();
      // }
      if(this.formValidate.phone == '' && this.formValidate.mobile == ''){
        callback(new Error("电话号码和手机号码至少填写一个"));
      }else{
        callback();
      }
    };
    const validateMobile = (rule, value, callback) => {
      if (value) {
        const reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
        if (reg.test(value) === false) {
          callback(new Error("请输入正确的手机号码"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    const editValidatePhone = (rule, value, callback) => {
      // if (value) {
      //   const reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
      //   if (reg.test(value) === false) {
      //     callback(new Error("请输入正确的手机号码"));
      //   } else {
      //     callback();
      //   }
      // } else {
      //   callback();
      // }
      if(this.editFormValidate.phone== '' && this.editFormValidate.mobile == ''){
        callback(new Error("电话号码和手机号码至少填写一个"));
      }else{
        callback();
      }
    };
    const validateQQ = (rule, value, callback) => {
      if (value) {
        const reg = /^[1-9][0-9]{4,9}$/;
        if (reg.test(value) === false) {
          callback(new Error("请输入正确的QQ号"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    const validatePassPostcode = (rule, value, callback) => {
      if (value) {
        const reg = /^[0-9]{6}$/;
        if (reg.test(value) === false) {
          callback(new Error("请输入正确的邮编"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    return {
      mobileMaxLength:11,
      phoneMaxLength:12,
      qqMaxLength:20,
      handleEditLoad:false,
      handleLoad:false,
      columns2: [
        {
          title: "信息单元",
          key: "name",
          align: "left"
        }
      ],
      taskName:'',
      taskCode:'',
      editDataId:'',
      nameType:false,
      SelectAreaNameMingzi: "",
      UnitData: {},
      showUnitModal: false,
      RecordskData: {},
      showRecordsModal: false,
      array: [
        {
          oneId: "",
          oneName: "",
          twoId: "",
          twoName: ""
        }
      ],
      array_one: [],
      array_two: [],
      array_three: [],
      editContactModel: false,
      total: 0,
      pageSize: 10,
      pageNum: 1,
      showSizer: true,
      short_message_modal: false,
      pageSizeOpts:[10,15,20,40,50,100,200],
      value1: "",
      value2: "",
      value3: "",
      value4: "",
      model13: "",
      RelatedModal: false,
      addTaskModal: false,
      msgContent: "",
      tableData: [],
      tableData_one: [],
      form: {},
      tableData_add: [],
      tableData_addTask: [],
      tableData1: [],
      tableData2: [],
      Varietyid: "",
      breedTypeid: "",
      loading1: false,
      loading2: false,
      options1: [],
      options2: [],
      options3: [],
      options4: [],
      options_Variety: [],
      optionstask: [],
      enableUrl: "",
      disableUrl: "",
      testValue: "",
      cid: 0,
      cType: 0,
      values1: "",
      model13: "",
      addContact: false,
      showMoreImportModal: false,
      showEditModal: false,
      showAddBreedsModal: false,
      detailModal: false,
      relationTask: {
        taskIdList: [],
        id: ""
      },
      addBreedsform: {
        breedId: "",
        breedName: "",
        breedTypeId: "",
        breedTypeName: ""
      },
        formValidate: {
            name: "", // 姓名
            sex: 0, // 性别
            department: "", // 部门
            position: "", // 职位
            phone: "", // 联系电话号码
            mobile: "", // 手机号码
            qq: "", // QQ号码
            weChat: "", // 微信号码
            enterpriseName: "", // 所在企业
            enterpriseId: null, // 所在企业ID
            enterpriseShortName: "", // 企业简称
            enterpriseType: null, // 企业类型
            enterpriseNature: null, // 企业性质
            enterpriseAreaId: "", // 所在区域ID
            enterpriseAddress: "", // 详细地址
            enterprisePostcode: "", // 邮编
            enterpriseNameOne: "",
            enterpriseAreaName: "",
            breeds: ""
        },
        detailform:{
          name: "",
          sex: "",
          department: "",
          position: "",
          phone: "",
          mobile: "",
          qq: '',
          weChat: '',
          enterpriseName: "",
          enterpriseShortName: "",
          enterpriseNature: '',
          enterpriseAreaName: '',
          enterpeiseType: '',
          enterprisePostcode: '',
          enterpriseAddress: '',
          taskContactsBreedRelationVOList: "",
        },
        editFormValidate: {
            auditStatus: "",
            id: "",
            name: "", // 姓名
            sex: "0", // 性别
            department: "", // 部门
            position: "", // 职位
            phone: "", // 联系电话号码
            mobile: "", // 手机号码
            qq: "", // QQ号码
            weChat: "", // 微信号码
            enterpriseName: "", // 所在企业
            enterpriseId: "", // 所在企业ID
            enterpriseShortName: "", // 企业简称
            enterpriseType: "", // 企业类型
            enterpriseNature: null, // 企业性质
            enterpriseAreaId: null, // 所在区域ID
            enterpriseAreaIdOne: "",
            enterpriseAddress: "", // 详细地址
            enterprisePostcode: "", // 邮编
            enterpriseNameOne: "",
            taskContactsBreedRelationVOList: []
        },
        editFormValidateSex:[
          {
            value: "0",
            label: "男"
          },
          {
            value: "1",
            label: "女"
          }
        ],
        ruleValidateBreed:{
          breedTypeId: [
              {
                  required: true,
                  validator: validatebreedTypeId,
                  message: "请选择品种类别",
                  trigger: "change"
              } 
          ],
           breedId: [
              {
                  required: true,
                  validator: validatebreedId,
                  message: "请选择品种",
                  trigger: "change"
              } 
          ],
          
        },
        ruleValidate: {
        name: [
          {
            required: true,
            validator: validateName,
            trigger: "blur"
          },
          {
            type: "string",
            max: 10,
            message: "姓名不能超过10个字符",
            trigger: "change"
          }
        ],
        namedit: [
          {
            required: true,
            validator: validateEditName,
            trigger: "blur"
          },
          {
            type: "string",
            max: 10,
            message: "姓名不能超过10个字符",
            trigger: "change"
          }
        ],
        department: [
          {
            required: true,
            message: "请输入部门",
            trigger: "change"
          },
          {
            type: "string",
            max: 20,
            message: "部门不能超过20个字符",
            trigger: "change"
          }
        ],
        position: [
          {
            required: true,
            message: "请输入职位",
            trigger: "change"
          },
          {
            type: "string",
            max: 20,
            message: "职位不能超过20个字符",
            trigger: "change"
          }
        ],
        phone: [{ validator: validatePhone, trigger: "change" }],
        editphone: [{ validator: editValidatePhone, trigger: "change" }],
        sex: [
          {
            required: true,
            message: "请选择性别",
            trigger: "change"
          }
        ],
        enterpriseName: [
          {
            required: true,
            type: "number",
            validator:validateenterpriseName,
            trigger: "change"
          }
        ],
        editenterpriseName: [
          {
            required: true,
            type: "number",
            validator:editvalidateenterpriseName,
            trigger: "change"
          }
        ],
        enterpriseType: [
          {
            required: true,
            validator: validateenterpriseType,
            message: "请选择企业类型",
            trigger: "change"
          }
        ],
        enterpriseAreaId: [
          {
            required: true,
            validator: validateenterpriseAreaId,
            message: "请输入所在区域",
            trigger: "change"
          }
        ],
        enterpriseAddress: [
          {
            required: true,
            validator: validateenterpriseAddress,
            message: "请输入详细地址",
            trigger: "blur"
          }
        ],
        enterpriseNature: [
          {
            required: true,
            validator: validateenterpriseNature,
            message: "请选择企业性质",
            trigger: "change"
          }
        ],
        breedId: [
          {
            required: true,
            validator: validatebreedId,
            message: "请选择品种",
            trigger: "change"
          } 
        ],
        breeds: [
              {
                  required: true,
                  validator: validatetableDataadd,
                  message: "请关联品种",
                  trigger: "change"
              } 
          ],
      },
      columns1:[
        {
          title:'品种名称',
          key:'breedName' 
        },
        {
          title:'品种类型',
          key:'breedTypeName' 
        }
      ],
    
        columns: [
        {
          key: "name",
          title: "姓名",
          width: 150,
          align: "center",
          render: (h, data) => {
            return h("div", [
              h(
                "a",
                {
                  on: {
                    click: () => {
                      this.getdetailContacts(data);
                    }
                  }
                },
                data.row.name
              )
            ]);
          }
        },
        {
          key: "sex",
          title: "性别",
          width: 150,
          align: "center",
          render: (h, data) => {
              return h("span",data.row.sex === 1 ? '女' : '男');
          }
        },
        {
          key: "department",
          title: "部门",
          width: 150,
          align: "center"
        },
        {
          key: "position",
          title: "职位",
          width: 150,
          align: "center"
        },
        {
          key: "phone",
          title: "联系电话号码",
          width: 150,
          align: "center"
        },
        {
          key: "mobile",
          title: "手机号码",
          width: 150,
          align: "center"
        },
        {
          key: "enterpriseName",
          title: "所在公司",
          width: 150,
          align: "center"
        },
        {
          key: "enterpriseShortName",
          title: "公司简称",
          width: 150,
          align: "center"
        },
        {
          key: "breeds",
          title: "关联的品种",
          width: 350,
          align: "center"
        },
        {
          key: "isDisplay",
          title: "操作",
          width: 150,
          align: "center",
          render: (h, data) => {
            return h('div', [
               h('span', {
                style: {
                  marginRight: '8px',
                  color: '#145edb',
                  textDecoration: 'underline',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                  this.editData(data)
                  }
                }
              }, '编辑'),
              h('span', {
                style: {
                  marginRight: '8px',
                  color: '#145edb',
                  textDecoration: 'underline',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    this.disable(data)
                  }
                }
              }, '删除')
            ])
          }
        },
      ],
      columns_one:[
        {
            key: "breedName",
            title: "品种名称",
            align: "center",
        },
        {
            key: "breedTypeName",
            title: "品种类型",
            align: "center",
          
        },
        {
            title: "操作",
            align: "center",
            render: (h, data) => {
                return h('div',[
                    h('span', {
                        style: {
                        marginRight: '5px',
                        color: '#145edb',
                        textDecoration: 'underline',
                        cursor: 'pointer'
                        },
                        on: {
                        click: () => {
                            console.log(data);
                            this.deleteBreed(data);
                        }
                    }
                    }, '删除'),
                ])
            }
        }
      ],
      informationId:null,
    };
  },
   created () {
    // 获取我的联系人列表
    this.detailTask();
    this.getListPage();
    this.getRemoteMethod3();
    this.getRemoteMethod2();
    this.VarietyType();
  },
  
  methods: {
    validFocus(){
      // console.log(1111);
      this.$refs.formValidate.validateField('phone');
    },
    editValidFocus(){
      // console.log(1111);
      this.$refs.editFormValidate.validateField('editphone');
    },
    // 控制高级搜索显示和隐藏
    displayShow() {
      this.isTrue = true;
    },
    nodisPlayShow() {
      this.isTrue = false;
    },
   detailTask(){
        let params = {
              formationUnitId: this.$route.query.formationUnitId
          }
        toInfromationDetail(formData(params)).then(res =>{
            this.formationUnitId = res.response.id;
            this.taskId = res.response.taskId;
            // debugger
            console.log("informationId11111111111",res.response);
            this.taskName = res.response.name;
            this.taskCode = res.response.code;
        });
   },
    // 编辑开始
    editData(data) {
      console.log('编辑',data);
      this.editDataId = data.row.id;
      this.editFormValidate.name = data.row.name;
      let self = this;
      let params = {
        id: data.row.id
      };
      // 查询详情方法
      detailContacts(formData(params)).then(res => {
        self.editFormValidate.auditStatus = res.response.auditStatus;
        self.editFormValidate.id = res.response.id;
        self.editFormValidate.name = res.response.name;
        self.editFormValidate.sex = String(res.response.sex);
        self.editFormValidate.department = res.response.department;
        self.editFormValidate.position = res.response.position;
        self.editFormValidate.phone = res.response.phone;
        self.editFormValidate.mobile = res.response.mobile;
        self.editFormValidate.qq = res.response.qq;
        self.editFormValidate.weChat = res.response.weChat;
        // 企业开始
        self.editFormValidate.enterpriseName = res.response.enterpriseName;
        self.editFormValidate.enterpriseShortName = res.response.enterpriseShortName;
        self.editFormValidate.enterpriseType = res.response.enterpriseType;
        self.editFormValidate.enterpriseNature = res.response.enterpriseNature;
        self.editFormValidate.enterpriseAreaId = res.response.enterpriseAreaId;
        self.editFormValidate.enterpriseAddress = res.response.enterpriseAddress;
        self.editFormValidate.enterpriseAreaName = res.response.enterpriseAreaName;
        console.log('yuqu',self.editFormValidate.enterpriseAreaName,self.editFormValidate.enterpriseAreaId);
        self.remoteMethod4(res.response.enterpriseAreaName);
        self.$refs.enterpriseArea.query = res.response.enterpriseAreaName;
        // 企业结束
        // self.remoteMethod1(res.response.enterpriseName);
        // this.options1 = [{
        //   value :res.response.enterpriseId,
        //   label: res.response.enterpriseName
        // }]
        // 匹配企业
        self.editFormValidate.enterpriseId = res.response.enterpriseId;
        // 进行区域匹配
         self.$refs.editFormValidRef.query = res.response.enterpriseName;
        // self.select_enterprise(false);
        self.tableData_add = res.response.taskContactsBreedRelationVOList;
        console.log("所在企业", res.response.enterpriseName);
        self.editFormValidate.enterprisePostcode = res.response.enterprisePostcode;
        self.$refs["editFormValidate"].validate();
      });
      self.editContactModel = true;
    },
   // 选择企业
    select_enterprise(data) {
      // let that = this;
      // console.log("id", id);
      // if (id != "" && id != undefined) {
      //   var reg = /^[0-9]+.?[0-9]*$/;
      //   console.log("是数值型：" + reg.test(id));
      //   let params = {};
      //   if (reg.test(id)) {
      //     params = {
      //       id: id
      //     };
      //   } else {
      //     params = {
      //       id: id.value
      //     };
      //     that.editFormValidate.enterpriseName = id.label;
      //   }
      //   detailEnterprise(formData(params)).then(res => {
      //     console.log("res", res);
      //     that.editFormValidate.enterpriseName = res.response.name;
      //     that.editFormValidate.enterpriseShortName = res.response.jp;
      //     that.editFormValidate.enterpriseType = res.response.type;
      //     that.editFormValidate.enterpriseNature = res.response.nature;
      //     that.editFormValidate.enterpriseAddress = res.response.address;
      //     that.editFormValidate.enterprisePostcode = res.response.postcode;
      //     console.log("res.response.areaName", res.response.areaName);
      //     console.log("1111", res.response.areaName);
      //     this.$refs.enterpriseArea.query = res.response.areaName;
      //     // that.remoteMethod4(res.response.areaName);
      //     that.editFormValidate.enterpriseAreaId = res.response.areaId;
      //     console.log("1111", this.$refs.enterpriseArea.query);
      //   });
      // }
      // debugger;
      console.log(111,data);
      if(data==false){
       if(this.options1.length>0){
         this.options1.map(item => {
           if(item.label == this.$refs.editFormValidRef.query){
             this.editFormValidate.enterpriseId = item.value
           }
         })
         console.log('661366',this.editFormValidate.enterpriseId);
        if(this.editFormValidate.enterpriseId){
        let params = {
          id: this.editFormValidate.enterpriseId
        };
        let that = this;
        that.editFormValidate.enterpriseAreaId = ''
        // that.formValidate.enterpriseName = id.label;
        detailEnterprise(formData(params)).then(res => {
          that.editFormValidate.enterpriseShortName = res.response.shortName;
          that.editFormValidate.enterpriseType = res.response.type;
          that.editFormValidate.enterpriseNature = res.response.nature;
          that.editFormValidate.enterpriseAddress = res.response.address;
          that.editFormValidate.enterprisePostcode = res.response.postcode;
          that.editFormValidate.enterpriseName = res.response.name;
          // that.remoteMethod4(res.response.areaName);
          that.editFormValidate.enterpriseAreaId = res.response.areaId;
          that.editFormValidate.enterpriseAreaName = res.response.areaName;
          that.$refs.enterpriseArea.query = res.response.areaName;
          that.$refs["editFormValidate"].validate();
        });
      
        }else{
            this.editFormValidate.enterpriseId = '';
            // this.$refs["formValidate"].resetFields();
            this.editFormValidate.enterpriseShortName = '';
            this.editFormValidate.enterpriseType = '';
            this.editFormValidate.enterpriseNature = '';
            this.editFormValidate.enterpriseAreaId = '';
            this.editFormValidate.enterpriseAreaName = '';
            this.$refs.enterpriseArea.query = '';
            this.formValidate.enterpriseAddress = '';
            this.formValidate.enterprisePostcode = '';
            this.editFormValidate.enterpriseIdOne11 = '';
            this.$refs.editFormValidate.validateField('enterpriseAreaId');
        }
       }else{
        this.editFormValidate.enterpriseId = '';
        // this.$refs["formValidate"].resetFields();
        this.editFormValidate.enterpriseShortName = '';
        this.editFormValidate.enterpriseType = '';
        this.editFormValidate.enterpriseNature = '';
        this.editFormValidate.enterpriseAreaId = '';
        this.editFormValidate.enterpriseAreaName = '';
        this.$refs.enterpriseArea.query = '';
        this.editFormValidate.enterpriseAddress = '';
        this.editFormValidate.enterprisePostcode = '';
        this.editFormValidate.enterpriseIdOne11 = '';
        this.$refs.editFormValidate.validateField('enterpriseAreaId');
      }
      }
      console.log(this.editFormValidate.enterpriseId);
    },
    // 删除联系人
    disable (data){
     
        let _this = this;
        var config = {
            title: "提示信息",
            content: "您确定删除？",
            onOk: () => {
            let form = {id:data.row.id};
            console.log(data);
                deleteapp(formData(form)).then(res =>{
                    _this.$Message.success("删除成功!");
                    _this.getListPage();
                })
            },
            onCancel: () => {
            
            }
        };
        this.$Modal.confirm(config);
    },
    
    // 获取联系人信息
    getdetailContacts(data) {
      let self = this;
      let form = { id: data.row.id };
      detailContacts(formData(form)).then(res => {
        self.detailform.id = res.response.id;
        console.log("99999", res);
        self.detailform.name = res.response.name;
        if (res.response.sex == 0) {
          self.detailform.sex = "男";
        }
        if (res.response.sex == 1) {
          self.detailform.sex = "女";
        }
        self.detailform.qq = res.response.qq;
        self.detailform.weChat = res.response.weChat;
        // 获取企业信息
        // self.getentErpeise(res.response.enterpriseId);
        // 所在企业开始
        self.detailform.enterpriseName = res.response.enterpriseName;
        self.detailform.enterpriseShortName = res.response.enterpriseShortName;
        self.detailform.enterpriseAreaName = res.response.enterpriseAreaName;
        self.detailform.enterprisePostcode = res.response.enterprisePostcode;
        self.detailform.enterpriseAddress = res.response.enterpriseAddress;
        let arr = this.options2;
          console.log("类型：", arr);
          if (arr != null) {
            for (var i = 0; i < arr.length; i++) {
              if (res.response.enterpriseType === arr[i].value) {
                self.detailform.enterpriseType = arr[i].label;
              }
            }
          }

          let arr2 = this.options3;
          if (arr2 != null) {
            for (var j = 0; j < arr2.length; j++) {
              if (res.response.enterpriseNature === arr2[j].value) {
                self.detailform.enterpriseNature = arr2[j].label;
              }
            }
          }
        // 所在企业结束

        self.detailform.department = res.response.department;
        self.detailform.position = res.response.position;

        self.detailform.mobile = res.response.mobile;
        self.detailform.phone = res.response.phone;
        if (res.response.taskContactsBreedRelationVOList) {
          self.tableData1 = res.response.taskContactsBreedRelationVOList;
        }
        if (res.response.taskTaskContacts) {
          self.tableData2 = res.response.taskTaskContacts;
        }
      });
      // 显示审核框
      self.detailModal = true;
    },
  // 根据企业id获取信息
    // 根据企业id获取信息
    getentErpeise(id) {
      let params = {
        id: id
      };
      let that = this;

      detailEnterprise(formData(params)).then(res => {
        console.log(res);
        if (res.status == 200) {
          that.detailform.enterpriseName = res.response.name;
          that.detailform.enterpriseShortName = res.response.shortName;
          that.detailform.enterpriseAddress = res.response.address;
          that.detailform.enterprisePostcode = res.response.postcode;
          that.detailform.enterpriseAreaName = res.response.areaName;

          let arr = this.options2;
          console.log("类型：", arr);
          if (arr != null) {
            for (var i = 0; i < arr.length; i++) {
              if (res.response.type === arr[i].value) {
                that.detailform.enterpriseType = arr[i].label;
              }
            }
          }

          let arr2 = this.options3;
          console.log("关联任务：", arr2);
          if (arr2 != null) {
            for (var j = 0; j < arr2.length; j++) {
              if (res.response.nature === arr2[j].value) {
                that.detailform.enterpriseNature = arr2[j].label;
              }
            }
          }
        }
      });
    },
    // 企查查
    qichacha(){
        window.open("https://www.qichacha.com/"); 
    },
    fanhuiOne() {
      this.detailModal = false;
    },
    // 企业类型
    getRemoteMethod2 (){
        enterpeiseType().then(res =>{
          
            const list1 = res.response.map(item => {
                return {
                    value: item.value,
                    label: item.desc
                };
            });
            this.options2 = list1
        })
    },
    // 企业性质
    getRemoteMethod3 (){
        enterpriseNature().then(res =>{
            
            const list1 = res.response.map(item => {
                return {
                    value: item.value,
                    label: item.desc
                };
            });
            this.options3 = list1
        })
    },
     remoteMethod1 (query) {
         console.log('搜索企业名称', query)
        if (query !== '') {
            this.loading1 = true;
            let params = {
              name:query
            }                     
            getentErpeise(formData(params)).then(res =>{
                
                const list1 = res.response.map(item => {
                    return {
                      value: item.id,
                      label: item.text
                    };
                });
                this.options1 = list1
                if(JSON.stringify(this.options1) === '[]')
                {
                    this.formValidate.enterpriseName = query;
                    this.editFormValidate.enterpriseName = query;
                }
            })
             this.loading1 = false;
        } else {
            this.options1 = [];
        }      
    },
    addContactShow(){
      this.handleLoad = false,
      this.addContact = true ;
      this.$refs.formValidate.resetFields();
      this.$refs.enterpriseRef.query = '';
      this.formValidate.sex = '0';
      this.formValidate.department = '';
      this.formValidate.position = '';
      this.formValidate.mobile = '';
      this.formValidate.phone = '';
      this.formValidate.qq = '';
      this.formValidate.weChat = '';
    },
    //下拉区域
    remoteMethod4(query){
        console.log('根据名称搜索区域',query);   
         //deugger;       
        if (query !== '') {
            this.loading1 = true;
                let params = {
                name:query
                }                           
            enterpriseArea(formData(params)).then(res =>{
                const list2 = res.response.map(item => {
                return {
                    value: item.id,
                    label: item.text
                };
                });
                this.options4 = list2
          
            })
            this.loading1 = false;
        } else {
            this.options4 = [];
            
        }      
    },
    showAddBreedsModalShow() {
      this.showAddBreedsModal = true;
      this.$refs.addBreedsform.resetFields();
      this.addBreedsform.breedId = "";
      this.addBreedsform.breedName = "";
      this.addBreedsform.breedTypeId = "";
      this.addBreedsform.breedTypeName = "";
      this.nameType = false;
    },
    // 选择企业时自动填充下面的企业信息
     // 选择企业时自动填充下面的企业信息
    select_one(data) {
      console.log(data);
      if(data==false){
       if(this.options1.length>0){
         this.options1.map(item => {
           if(item.label == this.$refs.enterpriseRef.query){
             this.formValidate.enterpriseId = item.value
           }
         })
         console.log('661366',this.formValidate.enterpriseId);
        if(this.formValidate.enterpriseId){
        let params = {
          id: this.formValidate.enterpriseId
        };
        let that = this;
        that.formValidate.enterpriseAreaId = ''
        // that.formValidate.enterpriseName = id.label;
        detailEnterprise(formData(params)).then(res => {
          that.formValidate.enterpriseShortName = res.response.shortName;
          that.formValidate.enterpriseType = res.response.type;
          that.formValidate.enterpriseNature = res.response.nature;
          that.formValidate.enterpriseAddress = res.response.address;
          that.formValidate.enterprisePostcode = res.response.postcode;
          that.formValidate.enterpriseName = res.response.name;
          // that.remoteMethod4(res.response.areaName);
          that.formValidate.enterpriseAreaId = res.response.areaId;
          that.formValidate.enterpriseAreaName = res.response.areaName;
          that.$refs.changeArea.query = res.response.areaName;
          that.$refs["formValidate"].validate();
        });
      
        }else{
            this.formValidate.enterpriseId = '';
            // this.$refs["formValidate"].resetFields();
            this.formValidate.enterpriseShortName = '';
            this.formValidate.enterpriseType = '';
            this.formValidate.enterpriseNature = '';
            this.formValidate.enterpriseAreaId = '';
            this.formValidate.enterpriseAddress = '';
            this.formValidate.enterprisePostcode = '';
            this.formValidate.enterpriseIdOne11 = '';
        }
       }else{
        this.formValidate.enterpriseId = '';
        // this.$refs["formValidate"].resetFields();
        this.formValidate.enterpriseShortName = '';
        this.formValidate.enterpriseType = '';
        this.formValidate.enterpriseNature = '';
        this.formValidate.enterpriseAreaId = '';
        this.formValidate.enterpriseAddress = '';
        this.formValidate.enterprisePostcode = '';
        this.formValidate.enterpriseIdOne11 = '';
      }
      }
      console.log(this.formValidate.enterpriseId);
      
      // if (id != "" && id != undefined) {
      //   console.log("选择企业时", id);
      //   let params = {
      //     id: id.value
      //   };
      //   let that = this;
      //   that.formValidate.enterpriseAreaId = ''
      //   that.formValidate.enterpriseName = id.label;
      //   detailEnterprise(formData(params)).then(res => {
      //     console.log(res);
      //     that.formValidate.enterpriseShortName = res.response.shortName;
      //     that.formValidate.enterpriseType = res.response.type;
      //     console.log('6666',that.formValidate.enterpriseType);
      //     console.log('6666',res.response.type);
      //     that.formValidate.enterpriseNature = res.response.nature;
      //     that.formValidate.enterpriseAddress = res.response.address;
      //     that.formValidate.enterprisePostcode = res.response.postcode;
      //     // that.remoteMethod4(res.response.areaName);
      //     that.formValidate.enterpriseAreaId = res.response.areaId;
      //     that.formValidate.enterpriseAreaName = res.response.areaName;
      //     that.$refs.changeArea.query = res.response.areaName;
      //     console.log(22222,that.formValidate.enterpriseAreaId);
      //     that.$refs["formValidate"].validate();
      //   });
      // }
    },
    // 下拉品种
    VarietyType (){
        VarietyType().then(res =>{
         
            const list1 = res.response.map(item => {
                return {
                    value: item.value,
                    label: item.desc
                };
            });
            this.tableData_one = list1
        })
    },
   
    // 下拉品种名称
    Variety(query){
        if (query !== '') {
            this.loading1 = true;
            let params = {
              name:query
            }
            setTimeout(() => {
                this.loading1 = false;
                Variety(formData(params)).then(res =>{
                   
                  const list1 = res.response.map(item => {
                      return {
                          value: item.id,
                          label: item.text
                      };
                  });
                  this.options_Variety = list1
                  
                })
            }, 200); 
        } else {
            this.options4 = [];
        }
    },

      // 获取我的联系人列表
    getListPage () {
        this.$Spin.show();
        axios.post('/information/contacts/list',{
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            taskId: this.$route.query.taskId,
            // creatorId: 12
        }).then(res => {
            
            if(res.status === 200) {
               
                this.tableData = res.data.response.list;
                this.total = res.data.response.total;
            }
            this.$Spin.hide();
        }).catch(err => {
           
            this.$Spin.hide();
        })
    },
    // 监听分页
     pageChange (page, pageSize) {
      if(page) {
        this.pageNum = page
      }
      if(pageSize) {
        this.pageSize = pageSize
      }
      this.getListPage()
    },
    // 打开关联品种会话框
    addBreeds(){
        this.$refs.addBreedsform.resetFields();
      this.showAddBreedsModal = true;
    },
     // 选择品种
    select_breed(id){
       if(id != '' && id != undefined)
      {
        console.log('选择品种时',id);
        this.addBreedsform.breedId = id.value;
        this.addBreedsform.breedName = id.label;
      }
    },
    // 选择品种类别
    select_breedType(id){
      if(id != '' && id != undefined)
      {
         console.log('选品种类别时',id);
          this.addBreedsform.breedTypeId = id.value;
          this.addBreedsform.breedTypeName = id.label;
          console.log(this.addBreedsform.breedTypeName)
      }
       
    },
    // 保存关联品种
    saveBreeds(name) {
      console.log(this.addBreedsform.breedTypeId);
      console.log(this.addBreedsform.breedId);
      this.$refs[name].validate(valid => {
        if (valid) {
          let obj1 = {
            breedId: this.addBreedsform.breedId,
            breedName: this.addBreedsform.breedName,
            breedTypeId: this.addBreedsform.breedTypeId,
            breedTypeName: this.addBreedsform.breedTypeName
          };
          if(this.tableData_add.length>0){
            let zhiOne = true;
            console.log('this.nameType',this.nameType);
            for(var i=0;i<this.tableData_add.length;i++){
              if(this.tableData_add[i].breedId == this.addBreedsform.breedId && this.tableData_add[i].breedTypeId == this.addBreedsform.breedTypeId){
                zhiOne = false;
                // return false;
              }
            }
            if(zhiOne){
              this.tableData_add.push(obj1);
              this.nameType = false;
              obj1 = {};
              this.$Message.success("关联品种成功!");
              this.addBreedsform.breedId = "" ;
              this.addBreedsform.breedTypeId = "" ;
              this.showAddBreedsModal = false;
              this.$refs["formValidate"].validate();
            }else{
              this.nameType = true;
            }
          }else{
            this.tableData_add.push(obj1);
            obj1 = {};
            this.$Message.success("关联品种成功!");
            this.addBreedsform.breedId = "" ;
            this.addBreedsform.breedTypeId = "" ;
            this.showAddBreedsModal = false;
            this.$refs["formValidate"].validate();
          }
          
          console.log('this.nameType',this.nameType);
        } else {
          // this.$Message.error("关联品种失败!");
        }
      });
    },
    // 取消关联品种
    resetBreeds (name) {
      this.$refs[name].resetFields();
      this.showAddBreedsModal = false;
      this.nameType = false;
    },
    // 删除关联品种
    deleteBreed (data){       
        this.tableData_add.splice(data.index, 1); 
    },
    // 新增联系人
    handleSubmit(name) {
      this.handleLoad = true ;
      // 循环关联品种表格取值
      const list = this.tableData_add.map(item => {
        return {
          breedId: item.breedId,
          breedName: item.breedName,
          breedTypeId: item.breedTypeId,
          breedTypeName: item.breedTypeName
        };
      });
      let breeds = JSON.stringify(list);
      if (breeds == "[]") {
        this.editFormValidate.breeds = null;
      } else {
        this.formValidate.breeds = breeds;
      }
      // 关联品种以数组的json格式传送
      console.log("品种====", breeds);
      this.$refs.formValidate.validate(valid => {
        if (valid) {
          let params = {
            auditStatus: "",
            name: this.formValidate.name,
            sex: Number(this.formValidate.sex),
            department: this.formValidate.department,
            position: this.formValidate.position,
            phone: this.formValidate.phone,
            mobile: this.formValidate.mobile,
            qq: this.formValidate.qq,
            weChat: this.formValidate.weChat,
            enterpriseId: this.formValidate.enterpriseId,
            enterpriseName: this.formValidate.enterpriseName,
            enterpriseShortName: this.formValidate.enterpriseShortName,
            enterpriseType: this.formValidate.enterpriseType,
            enterpriseNature: this.formValidate.enterpriseNature,
            enterpriseAreaId: this.formValidate.enterpriseAreaId,
            enterpriseAddress: this.formValidate.enterpriseAddress,
            enterprisePostcode: this.formValidate.enterprisePostcode,
            enterpriseAreaName: this.SelectAreaNameMingzi,
            //enterpriseBreedVOList: enterpriseBreedList,
            sign: "",
            taskId: this.$route.query.taskId,
            status: "",
            breeds: breeds,
            fax: "",
            id: "",
            description: "",
            email: ""
          };
          console.log("新增参数：", params);
          addContacts(params).then(res => {
            if (res.status == "200") {
              this.tableData_add = [];
              // this.$refs[name].resetFields();
              this.$Message.success("新增成功!");
              this.handleLoad = false ;
              this.getListPage();
              this.addContact = false;
            } else {
              this.handleLoad = false ;
              // this.tableData_add = [];
              // this.$refs[name].resetFields();
              // this.$Message.error("新增失败!");
              this.getListPage();
            }
          });
        } else {
          this.handleLoad = false ;
          // this.tableData_add = [];
          // this.$Message.error("新增失败!");
        }
      });
    },
    handleReset (name) {
        this.$refs[name].resetFields();
        this.tableData_add = []; 
        this.addContact = false;
    },
    SelectAreaName(data) {
      console.log(12121,data);
      if(data){
        this.SelectAreaNameMingzi = data.label;
      }
      
    },
    // 编辑保存
    handleEditSubmit(name) {
      this.handleEditLoad = true;
      // 循环关联品种表格取值
      let self = this;
      console.log("修改时的企业：", self.editFormValidate.enterpriseName);
      const list = this.tableData_add.map(item => {
        return {
          breedId: item.breedId,
          breedName: item.breedName,
          breedTypeId: item.breedTypeId,
          breedTypeName: item.breedTypeName
        };
      });
      let breeds = JSON.stringify(list);
      if (breeds == "[]") {
        self.editFormValidate.breeds = null;
      } else {
        self.editFormValidate.breeds = breeds;
      }
      // 关联品种以数组的json格式传送
      console.log("品种====", breeds);
      self.$refs.editFormValidate.validate(valid => {
        if (valid) {
          let params = {
            id: self.editFormValidate.id,
            auditStatus: self.editFormValidate.auditStatus,
            name: self.editFormValidate.name,
            sex: Number(self.editFormValidate.sex),
            department: self.editFormValidate.department,
            position: self.editFormValidate.position,
            phone: self.editFormValidate.phone,
            mobile: self.editFormValidate.mobile,
            qq: self.editFormValidate.qq,
            weChat: self.editFormValidate.weChat,
            enterpriseId: self.editFormValidate.enterpriseId,
            enterpriseName: self.editFormValidate.enterpriseName,
            enterpriseShortName: self.editFormValidate.enterpriseShortName,
            enterpriseType: self.editFormValidate.enterpriseType,
            enterpriseNature: self.editFormValidate.enterpriseNature,
            enterpriseAreaId: self.editFormValidate.enterpriseAreaId,
            enterpriseAddress: self.editFormValidate.enterpriseAddress,
            enterprisePostcode: self.editFormValidate.enterprisePostcode,
            breeds: breeds,
            taskId: this.$route.query.taskId
          };
          console.log("编辑的参数：", params);
          editContacts(params).then(res => {
            if (res.message == "OK") {
              // self.$refs[name].resetFields();
              self.tableData_add = [];
              self.$Message.success("编辑成功!");
              self.handleEditLoad = false;
              self.editContactModel = false
              self.getListPage();
            } else {
              self.handleEditLoad = false;
              // self.$refs[name].resetFields();
              // self.tableData_add = [];
              // self.$Message.error("编辑失败!");
              self.getListPage();
            }
          });
        } else {
          self.handleEditLoad = false;
          // self.$refs[name].resetFields();
          // self.tableData_add = [];
          // self.$Message.error("编辑失败!");
        }
      });
    },
    // 编辑取消
    handleEditReset (name) {
       this.editContactModel = false;
    },
    
    cancelchange() {
      this.modal1 = false;
    },
    addInfoSet() {
      // this.$router.push({name:'addInformationSettings'})
      this.showEditModal = true;
    },
    hideEditModal (modal) {
      // 隐藏修改弹窗
      this.showEditModal = modal;
    },
    enterpriseAreaIdOneValue(data) {
      this.editFormValidate.enterpriseAreaId = data.value;
    },
    //下一步
    nextRelationInformation() {
        this.$router.push({
        name: "unitCorrelation",
        query: { 
          taskId: this.$route.query.taskId,
          formationUnitId: this.$route.query.formationUnitId
        }
       });
     },
     //完成
     OK(){
         this.$router.push({name:"unitMangement"});
     }
  }
};
</script>
