<style scoped>
@import "./updateEnterpriseInfo.less";
.unit_s_left_s {
  line-height: 79px;
  text-align: center;
  border-right: 1px solid #bbbbbb;
  border-left: 1px solid #bbbbbb;
  border-bottom: 1px solid #bbbbbb;
  float: left;
  background: #e9eaef;
}
.unit_content .unit_s_right1{
    width: 65%;
    font-size:14px;
    color:#000000;
    text-align:center;
    float: left;
    border-right:0px !important;
    margin-left: 15px;
    margin-top: 11px;
    line-height: auto !important;
    margin-bottom: 12px !important;
}
</style>
<template>
  <Row>
    <Col span="24">
    <Row class-name="current-position">
      当前位置：基础数据管理&nbsp;&nbsp;>>&nbsp;&nbsp;企业库管理>>&nbsp;&nbsp;{{title}}
    </Row>
    </Col>
    <Col span="24" class="plant-content" style="margin-bottom: 20px">
    <Form ref="enterpriseFormValidate" :model="enterpriseForm" :rules="enterpriseRoles" :label-width="0">
      <div class="unit">
        <div class="unit_title">
          <span>企业基础信息</span>
        </div>
        <div class="unit_content">
          <div class="unit_content_left">
            <div class="unit_s_left"><span class="info">*</span>企业名称：</div>
            <FormItem class="unit_s_right" prop="name">
              <Input v-model="enterpriseForm.name" @on-change="changeDatapinyin" placeholder="请输入企业名称" class="search-input"></Input>
            </FormItem>
          </div>
          <div class="unit_content_left no_line">
            <div class="unit_s_left">简称：</div>
            <FormItem class="unit_s_right no-right-border" prop="shortName">
              <Input v-model="enterpriseForm.shortName" placeholder="请输入企业简称" class="search-input"></Input>
            </FormItem>
          </div>
        </div>
        <div class="unit_content">
          <div class="unit_content_left">
            <div class="unit_s_left">全拼：</div>
            <FormItem class="unit_s_right" prop="qp">
              <Input v-model="enterpriseForm.qp" placeholder="请输入企业全拼" class="search-input"></Input>
            </FormItem>
          </div>
          <div class="unit_content_left no_line">
            <div class="unit_s_left">简拼：</div>
            <FormItem class="unit_s_right no-right-border" prop="jp">
              <Input v-model="enterpriseForm.jp" placeholder="请输入企业简拼" class="search-input"></Input>
            </FormItem>
          </div>
        </div>

        <div class="unit_content">
          <div class="unit_content_left">
            <div class="unit_s_left">英文名：</div>
            <FormItem class="unit_s_right" prop="nameEn">
              <Input v-model="enterpriseForm.nameEn" placeholder="请输入企业英文名" class="search-input"></Input>
            </FormItem>
          </div>
          <div class="unit_content_left no_line">
            <div class="unit_s_left">日文名：</div>
            <FormItem class="unit_s_right no-right-border" prop="nameJa">
              <Input v-model="enterpriseForm.nameJa" placeholder="请输入企业日文名" class="search-input"></Input>
            </FormItem>
          </div>
        </div>

        <div class="unit_content">
          <div class="unit_content_left">
            <div class="unit_s_left">简称英文名：</div>
            <FormItem class="unit_s_right" prop="shortNameEn">
              <Input v-model="enterpriseForm.shortNameEn" placeholder="请输入简称英文名" class="search-input"></Input>
            </FormItem>
          </div>
          <div class="unit_content_left no_line">
            <div class="unit_s_left">简称日文名：</div>
            <FormItem class="unit_s_right no-right-border" prop="shortNameJa">
              <Input v-model="enterpriseForm.shortNameJa" placeholder="请输入简称日文名" class="search-input"></Input>
            </FormItem>
          </div>
        </div>

        <div class="unit_content">
          <div class="unit_content_left">
            <div class="unit_s_left"><span class="info">*</span>企业类型：</div>
            <div class="unit_s_right">
              <FormItem prop="enterpriseType">
                <Select v-model="enterpriseForm.enterpriseType">
                  <Option v-for="item in enterpriseTypeList" :value="item.value" :key="item.value">{{item.desc}}</Option>
                </Select>
              </FormItem>
            </div>
          </div>
          <div class="unit_content_left no_line">
            <div class="unit_s_left"><span class="info">*</span>企业性质</div>
            <div class="unit_s_right no-right-border">
              <FormItem prop="enterpriseType">
                <Select v-model="enterpriseForm.nature">
                  <Option v-for="item in natureDescList" :value="item.value" :key="item.value">{{ item.desc }}</Option>
                </Select>
              </FormItem>
            </div>
          </div>
        </div>

        <div class="unit_content" style="height:200px">
          <div class="unit_content_left">
            <div class="unit_s_left" style="height:199px;line-height:200px;"><span class="info">*</span>行业类型：</div>
            <div class="unit_s_right1">
              <Col span="24">
              <Col span="15">
              <Form ref="industryTypeValidate" :rules="industryTypeRoles">
                <FormItem ref="industryTypeRef" prop="industryType">
                  <associate-Search @query-list="industryTypeFunction" :dataUrl="urlIndustry" ref="industryRef"></associate-Search>
                </FormItem>
              </Form>
              </Col>
              <Col span="9">
              <Button type="primary" @click="showselect">选择关联</Button>
              </Col>
              <Col span="24" style="margin-top:5px;text-align:center;position: relative;">
              <ul class="fx-boxs" id="fxBox">
                <li v-for="(item, index) in industryTypes" :key="item.value">
                  <p style="max-width: 100%;text-align: left;margin-left: 20px; display:inline-block">
                    <span>{{item.label}}</span>
                    <b class="icon-delete pull-right" @click="removeRight(index)"></b>
                  </p>
                </li>
              </ul>
              </Col>
              </Col>
            </div>
          </div>
          <div class="unit_content_left no_line">
            <div class="unit_s_left" style="height:199px;line-height:200px;">邮件地址</div>
            <FormItem class="unit_s_right no-right-border" prop="email">
              <Input v-model="enterpriseForm.email" placeholder="请输入邮件地址" class="search-input"></Input>
            </FormItem>
          </div>
        </div>

        <div class="unit_content">
          <div class="unit_content_left">
            <div class="unit_s_left">联系电话：</div>
            <FormItem class="unit_s_right" prop="phone">
              <Input v-model="enterpriseForm.phone" placeholder="请输入联系电话" class="search-input"></Input>
            </FormItem>
          </div>
          <div class="unit_content_left no_line">
            <div class="unit_s_left">传真号码：</div>
            <FormItem class="unit_s_right no-right-border" prop="fax">
              <Input v-model="enterpriseForm.fax" placeholder="请输入传真号码" class="search-input"></Input>
            </FormItem>
          </div>
        </div>

        <div class="unit_content">
          <div class="unit_content_left">
            <div class="unit_s_left">区域：</div>
            <div class="unit_s_right">
              <associate-area-Search ref="areaRef" @query-list="areaFunction" :dataUrl="url" class="search-input"></associate-area-Search>
            </div>
          </div>
          <div class="unit_content_left no_line">
            <div class="unit_s_left">邮编：</div>
            <FormItem class="unit_s_right no-right-border" prop="postcode">
              <Input v-model="enterpriseForm.postcode" placeholder="请输入邮编" class="search-input"></Input>
            </FormItem>
          </div>
        </div>

        <div class="unit_content">
          <div class="unit_content_left">
            <div class="unit_s_left">详细地址：</div>
            <FormItem class="unit_s_right" prop="address">
              <Input v-model="enterpriseForm.address" placeholder="请输入详细地址" class="search-input"></Input>
            </FormItem>
          </div>
          <div class="unit_content_left no_line">
            <!-- <div class="unit_s_left">详细地址(英文)：</div>
                <FormItem class="unit_s_right no-right-border" prop="EnAddress">
                  <Input v-model="enterpriseForm.EnAddress" placeholder="请输入详细地址（英文）" class="search-input"></Input>
                </FormItem>-->
          </div>
        </div>
      </div>

      <div class="unit">
        <div class="unit_title">
          <span>工商数据信息</span>
        </div>
        <div class="unit_content">
          <div class="unit_content_left">
            <div class="unit_s_left">成立日期：</div>
            <FormItem class="unit_s_right" prop="createTime">
              <DatePicker v-model="enterpriseForm.enterpriseIcInfoVO.establishDateDesc" style="width:100%" type="date"></DatePicker>
            </FormItem>
          </div>
          <div class="unit_content_left no_line">
            <div class="unit_s_left">注册资本(元)：</div>
            <FormItem class="unit_s_right no-right-border">
              <InputNumber :min="0" :max="1000000000000000.00" v-model="enterpriseForm.enterpriseIcInfoVO.registeredCapital" placeholder="请输入注册资本" class="search-input"></InputNumber>
            </FormItem>
          </div>
        </div>

        <div class="unit_content">
          <div class="unit_content_left">
            <div class="unit_s_left">法人：</div>
            <FormItem class="unit_s_right" prop="legalPerson">
              <Input v-model="enterpriseForm.legalPerson" placeholder="请输入法人姓名" class="search-input"></Input>
            </FormItem>
          </div>
          <div class="unit_content_left no_line">
            <div class="unit_s_left">
              <!-- <span class="info">*</span> prop="creditCode"-->
              社会信用代码：</div>
            <FormItem class="unit_s_right no-right-border" >
              <Input v-model="enterpriseForm.creditCode" placeholder="请输入社会信用代码" class="search-input"></Input>
            </FormItem>
          </div>
        </div>

        <div class="unit_content">
          <div class="unit_content_left">
            <div class="unit_s_left">企业人数：</div>
            <FormItem class="unit_s_right" prop="personNumber">
              <Input v-model="enterpriseForm.personNumber" placeholder="企业人数" class="search-input"></Input>
            </FormItem>
          </div>
          <div class="unit_content_left no_line">
            <div class="unit_s_left">企业产值(元)：</div>
            <FormItem class="unit_s_right no-right-border" prop="capacity">
              <Input v-model="enterpriseForm.capacity" placeholder="请输入企业产值" class="search-input"></Input>
            </FormItem>
          </div>
        </div>

        <div class="unit_content">
          <div class="unit_content_left">
            <div class="unit_s_left">企业网站：</div>
            <FormItem class="unit_s_right" prop="website">
              <Input v-model="enterpriseForm.website" placeholder="请输入企业网站" class="search-input"></Input>
            </FormItem>
          </div>
          <div class="unit_content_left no_line">
            <div class="unit_s_left">
              <!-- <span class="info">*</span>prop="licenseNo" -->
              证件编号：</div>
            <FormItem class="unit_s_right no-right-border" >
              <Input v-model="enterpriseForm.licenseNo" placeholder="请输入证件编号" class="search-input"></Input>
            </FormItem>
          </div>
        </div>

        <div class="unit_content">
          <div class="unit_s_left" style="width:15%">企业简述：</div>
          <FormItem class="unit_s_right" prop="description" style="width:75%">
            <Input v-model="enterpriseForm.description" placeholder="请输入企业简述" class="search-input"></Input>
          </FormItem>
        </div>

        <div class="unit_content" style="height:110px;">
          <div class="unit_s_left_s" style="width:15%;height:105px;line-height:100px border-bottom:1px solid #BBBBBB">企业经营范围：</div>
          <FormItem class="unit_s_right" prop="operateScope" style="width:75%;">
            <Input type="textarea" v-model="enterpriseForm.operateScope" placeholder="请输入企业经营范围" :rows="3"></Input>
          </FormItem>
        </div>
      </div>
      <Col span="24" style="margin-bottom: 20px">
      <div class="btn-container" style="display:flex; justify-content:center">
        <Button type="primary" class="search-btn" @click="doAdd()">确定</Button>
        <Button @click="doCancel" type="primary" class="search-btn">取消</Button>
      </div>
      </Col>
    </Form>
    </Col>

    <!-- 选择关联弹窗 -->
    <Modal v-model="showselectModal" title="选择行业类型" @on-ok="doEdit" :loading="loading" :width="900" @on-cancel="onCancel" class="selectgg">
      <Form ref="selectModal" :model="selectform" :label-width="100">
        <Row type="flex" justify="space-between">
          <Col span="7">
          <FormItem label="行业类型名称" :label-width="100">
            <Input v-model="selectform.name" class="search-input" placeholder="请输入行业类型名称"></Input>
          </FormItem>
          </Col>
          <Col span="7" :label-width="100">
          <FormItem>
            <Button type="primary" @click="searchIndustryTypeList">搜索</Button>
            <Button @click="handleReset" style="margin-left: 20px">重置</Button>
          </FormItem>
          </Col>
        </Row>
      </Form>
      <div style="position:relative;overflow:hidden">
        <Table class="tableCommon" border ref="selection" :columns="columns" :data="dataTable" @on-selection-change="handleRowChange"></Table>
        <oil-page :total="total" :page-num="pageNum" :page-size="pageSize" @page-change="pageChange" :page-size-opts="pageSizeOpts" :show-sizer="showSizer"></oil-page>
      </div>
    </Modal>
  </Row>
</template>

<script>
import pinyin from "../../../assets/js/Convert_Pinyin.js";
import axios from "axios";
import oilPage from "../../components/page/page.vue";
import associateSearch from "../../components/associateSearch/associateSearch.vue";
import associateAreaSearch from "../../components/cms/associateAreaSearch.vue";
import {
  getEnterprisenameRepeat,
  getCreditcodeRepeat,
  getLicenseNoRepeat,
  checkEditName,
  editCheckCreditCode,
  editCheckLicenseNo
} from "../../components/axios/baseDataManagement.js";
import { formData } from "../../../assets/js/common.js";
import timeStampChange from "../../../assets/js/timestamp_change.js";
export default {
  name: "createEnterpriseInfo",
  components: {
    oilPage,
    associateSearch,
    associateAreaSearch
  },
  data() {
    const validatePassName = (rule, value, callback) => {
      let tid = this.tid == -1 ? "": this.tid;
      if (tid) {
        if (value) {
          const reg = /^.*个体|.*个人|.*手机号|.*先生|.*经理|.*女士|.*小姐|.*注册|.*测试|.*隆众|.*账号|.*培训|.*内部|.*员工.*$/;
          if(value.length <5){
            callback(new Error("不低于5个汉字"))
          }else if (reg.test(value) === true) {
            callback(new Error("企业名称不合法"));   
          } else {
            let params = {
            id: this.tid,
            name: value
            };
            axios.post('/basedata/enterprise/check_edit_name',formData(params)).then(res => {
              if (res.data.status == '200') {
                callback();
              }else{
                callback(new Error(res.data.message));
              } 
            })
          };
        } else {
          callback();
        }
      } else {
        if (value) {
          const reg = /^.*个体|.*个人|.*手机号|.*先生|.*经理|.*女士|.*小姐|.*注册|.*测试|.*隆众|.*账号|.*培训|.*内部|.*员工.*$/;
          if(value.length <5){
            callback(new Error("不低于5个汉字"))
          } else if (reg.test(value) === true) {
            callback(new Error("企业名称不合法"));   
          } else {
            let params = {
            name: value
          };
          axios.post('/basedata/enterprise/check_name',formData(params)).then(res => {
            if (res.data.status == '200') {
              callback();
            }else{
              callback(new Error(res.data.message));
            } 
          })
          };
        } else {
          callback();
        }
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

    const validatePassCreditCode = (rule, value, callback) => {
      var vId = this.tid;
      if (vId == -1) {
        if (value) {
          if (value.length > 30) {
            callback(new Error("社会信用代码超过30个"));
          }
          let params = {
            id: this.tid,
            creditCode: value
          };
          // getCreditcodeRepeat(formData(params)).then(res => {
          //   if (res.response) {
          //     callback();
          //   } else {
          //     callback(new Error("社会编号代码已存在"));
          //   }
          // });
        } else {
          callback(new Error("请输入社会信用代码"));
        }
      } else {
        if (value) {
          if (value.length > 30) {
            callback(new Error("社会信用代码字符超过30个"));
          }
          let params = {
            id: this.tid,
            creditCode: value
          };
          // editCheckCreditCode(formData(params)).then(res => {
          //   if (res.response) {
          //     callback();
          //   } else {
          //     callback(new Error("社会编号代码已存在"));
          //   }
          // });
        } else {
          callback(new Error("请输入社会信用代码"));
        }
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
    const validatePassLicenseNo = (rule, value, callback) => {
      var vId = this.tid;
      if (vId == -1) {
        if (value) {
          if (value.length > 30) {
            callback(new Error("证件编号字符超过30个"));
          }
          let params = {
            id: this.tid,
            licenseNo: value
          };
          // getLicenseNoRepeat(formData(params)).then(res => {
          //   if (res.response) {
          //     callback();
          //   } else {
          //     callback(new Error("证件编号已存在"));
          //   }
          // });
        } else {
          callback(new Error("请输入证件编号"));
        }
      } else {
        if (value) {
          if (value.length > 30) {
            callback(new Error("证件编号字符超过30个"));
          }
          let params = {
            id: this.tid,
            licenseNo: value
          };
          // editCheckLicenseNo(formData(params)).then(res => {
          //   if (res.response) {
          //     callback();
          //   } else {
          //     callback(new Error("证件编号已存在"));
          //   }
          // });
        } else {
          callback(new Error("请输入证件编号"));
        }
      }
    };
    const validateFax = (rule, value, callback) => {
      if (value) {
        const reg = /^0\d{2,3}-?\d{7,8}$/;
        if (reg.test(value) === false) {
          callback(new Error("请输入正确的传真号码"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    const validatePhone = (rule, value, callback) => {
      if (value) {
        const reg = /^0\d{2,3}-?\d{7,8}$/;
        if (reg.test(value) === false) {
          callback(new Error("请输入正确的电话号码"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };

    const validateEmail = (rule, value, callback) => {
      if (value) {
        const reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
        if (reg.test(value) === false) {
          callback(new Error("请输入正确的邮箱"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    const validatePassIndustryType = (rule, value, callback) => {
      var dataLength = this.industryTypes.length;
      console.log("datalength", dataLength);
      if (dataLength == 0) {
        callback(new Error("请输入行业类型"));
      } else {
        callback();
      }
    };
    return {
      showselectModal: false,
      loading: false,
      loading1: false,
      name: "",
      tid: 0,
      selectRow: [],
      title: "",
      initId: "",
      message: "",
      urlIndustry: "/basedata/select/industry_type", //行业性质
      url: "/basedata/select/area_for_enterprise",
      industryTypes: [],
      natureDescList: [],
      enterpriseForm: {
        enterpriseIcInfoVO: {
          businessTermEnd: 0,
          businessTermStart: 0,
          capacity: "",
          chargePerson: "",
          createTime: "",
          creatorId: 0,
          creatorName: "",
          creditCode: "",
          enterpriseId: 0,
          establishDate: 0,
          id: 0,
          lastAccess: 0,
          lastModiforId: 0,
          lastModiforName: "",
          legalPerson: "",
          description: "",
          operateScope: "",
          licenseFilePath: "",
          licenseNo: "",
          personNumber: "",
          registeredCapital: 0.0
        },
        legalPerson: "",
        description: "",
        operateScope: "",
        capacity: "",
        fax: "",
        id: 0,
        enterpriseType: "",
        jp: "",
        name: "",
        nameEn: "",
        nameJa: "",
        natureDesc: "",
        nature: "",
        phone: "",
        postcode: "",
        qp: "",
        sign: "",
        stateCode: "",
        status: 0,
        statusDesc: "",
        type: 0,
        typeDesc: "",
        website: ""
      },
      selectform: {
        name: ""
      },
      pageSizeOpts: [5,10, 20],
      showSizer: true,
      pageNum: 1,
      pageSize: 5,
      total: 0,
      enterpeiseNatureList: [],
      enterpriseTypeList: [],
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "行业类型编号",
          key: "code"
        },
        {
          title: "行业类型名称",
          key: "name"
        }
      ],
      dataTable: [],
      industryTypeRoles: {
        industryType: [
          { validator: validatePassIndustryType, trigger: "change" }
        ]
      },
      enterpriseRoles: {
        name: [
          { required: true, message: "请输入企业名称", trigger: "change" },
          {
            type: "string",
            max: 100,
            message: "企业名称不能超过100个字符",
            trigger: "change"
          },
          { validator: validatePassName, trigger: "blur" }
        ],
        licenseNo: [{ validator: validatePassLicenseNo, trigger: "blur" }],

        creditCode: [{ validator: validatePassCreditCode, trigger: "blur" }],
        qp: [
          {
            type: "string",
            max: 200,
            message: "全拼不能超过200个字符",
            trigger: "change"
          }
        ],
        jp: [
          {
            type: "string",
            max: 50,
            message: "简拼不能超过50个字符",
            trigger: "change"
          }
        ],
        shortName: [
          {
            type: "string",
            max: 50,
            message: "简称不能超过50个字符",
            trigger: "change"
          }
        ],
        shortNameEn: [
          {
            type: "string",
            max: 100,
            message: "简称英文名不能超过100个字符",
            trigger: "change"
          }
        ],
        shortNameJa: [
          {
            type: "string",
            max: 100,
            message: "简称日文名不能超过100个字符",
            trigger: "change"
          }
        ],
        legalPerson: [
          {
            type: "string",
            max: 10,
            message: "法人不能超过10个字符",
            trigger: "change"
          }
        ],

        nameEn: [
          {
            type: "string",
            max: 100,
            message: "英文名称不能超过100个字符",
            trigger: "change"
          }
        ],
        nameJa: [
          {
            type: "string",
            max: 100,
            message: "日文名称不能超过100个字符",
            trigger: "change"
          }
        ],
        enterpriseType: [
          {
            required: true,
            message: "请选择企业类型",
            trigger: "change",
            type: "number"
          }
        ],
        natureDesc: [
          {
            required: true,
            message: "请选择企业性质",
            trigger: "change",
            type: "number"
          }
        ],
        phone: [{ validator: validatePhone, trigger: "change" }],
        fax: [{ validator: validateFax, trigger: "change" }],
        address: [
          {
            type: "string",
            max: 100,
            message: "地址不能超过100个字符",
            trigger: "change"
          }
        ],
        email: [{ validator: validateEmail, trigger: "change" }],

        postcode: [{ validator: validatePassPostcode, trigger: "change" }],
        registeredCapital: [
          {
            type: "string",
            max: 100,
            message: "注册资本不能超过100个字符",
            trigger: "change"
          }
        ],

        personNumber: [
          {
            type: "string",
            max: 50,
            message: "企业人数不能超过50个字符",
            trigger: "change"
          }
        ],
        capacity: [
          {
            type: "string",
            max: 100,
            message: "企业产值不能超过100个字符",
            trigger: "change"
          }
        ],
        website: [
          {
            type: "string",
            max: 50,
            message: "企业网站不能超过50个字符",
            trigger: "change"
          }
        ],
        description: [
          {
            type: "string",
            max: 300,
            message: "企业简述不能超过300个字符",
            trigger: "change"
          }
        ],
        operateScope: [
          {
            type: "string",
            max: 500,
            message: "企业经营范围不能超过500个字符",
            trigger: "change"
          }
        ]
      },
      areaData: "",
      industryTypeList: []
    };
  },
  created() {
    this.initEnterpeiseNature();
    this.initEnterpeiseType();
    this.initId = this.$route.query.id;
    if (this.initId != -1) {
      this.initData(this.initId);
      this.title = "修改企业";
    } else {
      this.title = "新增企业";
    }
    this.tid = this.$route.query.id;
  },
  methods: {
    //初始化企业性质
    initEnterpeiseNature() {
      var that = this;
      axios({
        url: "/basedata/select/enterpeise_nature",
        method: "post",
        data: {}
      }).then(function(resp) {
        that.natureDescList = resp.data.response;
      });
    },
    //初始化企业类型
    initEnterpeiseType() {
      var that = this;
      axios({
        url: "/basedata/select/enterpeise_type",
        method: "post",
        data: {}
      }).then(function(resp) {
        that.enterpriseTypeList = resp.data.response;
      });
    },
    //初始化数据
    initData(initId) {
      var that = this;
      var params = new URLSearchParams();
      params.append("id", initId);
      axios.post("/basedata/enterprise/detail", params).then(function(res) {
        if (res.data.status == 200) {
          that.enterpriseForm = res.data.response;
          that.enterpriseForm.legalPerson =
            res.data.response.enterpriseIcInfoVO.legalPerson;
          that.enterpriseForm.personNumber =
            res.data.response.enterpriseIcInfoVO.personNumber;
          that.enterpriseForm.capacity =
            res.data.response.enterpriseIcInfoVO.capacity;
          that.enterpriseForm.operateScope =
            res.data.response.enterpriseIcInfoVO.operateScope;
          that.enterpriseForm.licenseNo =
            res.data.response.enterpriseIcInfoVO.licenseNo;
          that.enterpriseForm.creditCode =
            res.data.response.enterpriseIcInfoVO.creditCode;

          that.enterpriseForm.enterpriseType = res.data.response.type;
          if(that.enterpriseForm.enterpriseIcInfoVO.registeredCapital ){
that.enterpriseForm.enterpriseIcInfoVO.registeredCapital = that.enterpriseForm.enterpriseIcInfoVO.registeredCapital.toFixed(
            2
          );
          }
          
          if (that.enterpriseForm.enterpriseIcInfoVO.establishDateDesc == "-") {
            that.enterpriseForm.enterpriseIcInfoVO.establishDateDesc = "";
          }
          var arrList = res.data.response.industryTypesDesc;
          if (arrList && arrList.length > 0) {
            for (let i = 0; i < arrList.length; i++) {
              var industryTypeObj = {};
              industryTypeObj.value = arrList[i].id;
              industryTypeObj.label = arrList[i].pathName;
              that.industryTypes.push(industryTypeObj);
            }
          }
          that.$refs.areaRef.getData(that.enterpriseForm.areaName);
        } else {
          that.$Message.warning(res.data.message);
        }
      });
    },
    onCancel() {
      this.showselectModal = false;
    },
    //点击确定后新增或修改
    doAdd() {
      var that = this;
      var arr = [];
      if (that.industryTypes.length > 0) {
        for (let i = 0; i < that.industryTypes.length; i++) {
          arr.push(that.industryTypes[i].value);
        }
      }
      that.enterpriseForm.industryTypes = arr.join(";");
      var areas = "";
      if (that.areaData != null && that.areaData != "") {
        areas = that.areaData.value.split("|");
        that.enterpriseForm.areaId = areas[0];
        that.enterpriseForm.areaCode = areas[1];
        that.enterpriseForm.areaName = that.areaData.label;
      }
      that.enterpriseForm.type = that.enterpriseForm.enterpriseType;
      var url = "";
      if (this.initId == -1) {
        url = "/basedata/enterprise/add";
        this.message = "新增成功";
      } else {
        url = "/basedata/enterprise/edit";
        this.message = "修改成功";
      }
      that.enterpriseForm.enterpriseIcInfoVO.legalPerson =
        that.enterpriseForm.legalPerson;
      that.enterpriseForm.enterpriseIcInfoVO.personNumber =
        that.enterpriseForm.personNumber;
      that.enterpriseForm.enterpriseIcInfoVO.capacity =
        that.enterpriseForm.capacity;
      that.enterpriseForm.enterpriseIcInfoVO.operateScope =
        that.enterpriseForm.operateScope;
      that.enterpriseForm.enterpriseIcInfoVO.licenseNo =
        that.enterpriseForm.licenseNo;
      that.enterpriseForm.enterpriseIcInfoVO.creditCode =
        that.enterpriseForm.creditCode;
      that.$refs["industryTypeValidate"].validate();
      this.$refs["enterpriseFormValidate"].validate(valid => {
        if (valid) {
          if (!that.loading1) {
            that.loading1 = true;
            axios({
              url: url,
              method: "post",
              data: that.enterpriseForm
            }).then(function(resp) {
              if (resp.data.status == 200) {
                that.$Message.success(that.message);
                that.$refs.enterpriseFormValidate.resetFields();
                that.tid = 0;
                that.$router.push({
                  name: "enterpriseList"
                });
              } else {
                that.$Message.error(resp.data.message);
              }
              that.loading1 = false;
            });
          }
        }
      });
    },

    doCancel() {
      this.$router.push({
        name: "enterpriseList"
      });
    },
    //区域模糊搜索
    areaFunction(areaData) {
      this.areaData = areaData;
    },
    //获取从联想搜索框里取到的值
    industryTypeFunction(industryData) {
      if (industryData) {
        let industryDataId = industryData.value;
        if (this.isRepeatIndustry(industryDataId)) {
          this.industryTypes.push(industryData);
          this.$refs.industryRef.queryChange();
        }
      }
    },
    // 删除行业类型
    removeRight(index) {
      this.industryTypes.splice(index, 1);
      if (this.industryTypes.length == 0) {
        this.$refs["industryTypeValidate"].validate();
      }
      this.$refs.industryRef.model = "";
    },

    //判断行业类型是否重复
    isRepeatIndustry(value) {
      if (this.industryTypes.length > 0) {
        let industryTypeArr = [];
        for (let j = 0; j < this.industryTypes.length; j++) {
          industryTypeArr.push(this.industryTypes[j].value);
        }
        if (industryTypeArr.indexOf(value) == -1) {
          return true;
        }
      } else {
        return true;
      }
    },
    // 监听选中项发生变化
    handleRowChange(row) {
      this.selectRow = row;
    },
    //点击选择行业类型后新增到表格中去
    doEdit() {
      let that = this;
      that.loading = false;
      let arr = that.selectRow;
      for (let i = 0; i < arr.length; i++) {
        let obj = {};
        obj.value = arr[i].id;
        obj.label = arr[i].name;
        if (this.isRepeatIndustry(obj.value)) {
          this.industryTypes.push(obj);
        }
      }
      that.selectRow = [];
      that.$refs["industryTypeValidate"].validate();
      that.$emit("hide-modal");
    },

    //选择行业类型
    showselect() {
      var tagBox = document.getElementById("fxBox");
      tagBox.style.display = "block";
      this.showselectModal = true;
      this.getIndustryTypeList();
    },
    //查询行业类型
    searchIndustryTypeList(){
      this.pageNum = 1;
      this.pageSize = 10;
      this.getIndustryTypeList();
    },
    //获取行业类型数据
    getIndustryTypeList() {
      var that = this;
      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        name: this.selectform.name
      };
      axios({
        url: "/basedata/select/industry_type_page",
        method: "post",
        data: params
      }).then(function(resp) {
        if (resp.data.status == 200) {
          that.total = resp.data.response.total;
          that.dataTable = resp.data.response.list;
        } else {
          that.dataTable = [];
        }
      });
    },
    //重置行业类型
    handleReset() {
      this.selectform.name = "";
    },
    //分页
    pageChange(page, pageSize) {
      if (page) {
        this.pageNum = page;
      }
      if (pageSize) {
        this.pageSize = pageSize;
      }
      this.getIndustryTypeList();
    },
    //改变全拼和简拼数据
    changeDatapinyin() {
      this.enterpriseForm.qp = pinyin.getFullChars(this.enterpriseForm.name);
      this.enterpriseForm.jp = pinyin.getCamelChars(this.enterpriseForm.name);
    }
  }
};
</script>
