<style lang="less">
@import "./userRegister.less";
.breedtree .ivu-modal-body {
  max-height: 500px;
  overflow-y: scroll;
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
.gzwrap {
  white-space: normal;
  width: 300px;
  max-height: 400px;
  overflow-y: scroll;
  // overflow: hidden;
}
</style>
<template >
    <Row class="userRegisterwrap">
        <Col span="24">
            <Row class-name="current-position">
                当前位置：客户关系管理&nbsp;&nbsp;>>&nbsp;&nbsp;用户注册
            </Row>
        </Col>
        <Col span="24">
            <Row class-name="search-form">
                <Col span="12"  style="min-width:700px">
                    <Row class="nav-step">
                        <Col span="8"  v-for='(item,index) in nav'  style="cursor:pointer"  :class="{'innav':index ==checkindex }"  :key='index'><div @click="toggle(index)">{{item}}</div></Col>
                    </Row>
                    <Row  v-show="showstep1">
                        <i-form ref='formValidate' :model="formValidate" :rules="ruleValidate" :label-width="80" class="step1-wrap" >
                            <Form-item label="公司全称" prop="companyFullName">
                                <Select
                                  v-model="formValidate.companyFullName"
                                  ref='companyref'
                                  remote
                                  clearable
                                  @on-clear='clearmember'
                                  @on-query-change='querychange'
                                  @on-change='companyregister'
                                  :filterable="true"
                                  :remote-method="remoteMethod1"
                                  @on-open-change='queryset'
                                  :loading="loading1">
                                  <Option v-for="(option, index) in options1" :value="option.value" :key="index">{{option.label}}</Option>
                              </Select>
                              <div class="ivu-tooltip-popper ivu-tooltip-dark" v-if="show" style="position: absolute;will-change: top, left;top: -50%;right:-300px;" x-placement="right">
                                <div class="ivu-tooltip-content">
                                  <div class="ivu-tooltip-arrow" style="top:40px;"></div> 
                                  <div class="ivu-tooltip-inner gzwrap" >
                                    <div v-for="(item,index) in type2" :key="index" style='margin-bottom:10px'>
                                      <div>公司名称：{{item.memberName}}</div>
                                      <p>用户名：{{item.userName}}</p>
                                      <p>用户类型：{{item.userType}}</p>lastCall
                                      <p >业务员：{{item.adminName}}</p>
                                      <p >近期通话时间：{{item.lastCall}}</p>
                                      <p >最近登录时间：{{item.time}}</p>
                                      <p v-if='item.isHistory' style="text-align:right"><Button type="primary" size='small'  @click="followmen(item.userId)">我要跟踪</Button></p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Form-item>
                            
                            <Form-item label="公司简称" prop="companyShortName">
                                <Input v-model="formValidate.companyShortName" placeholder="公司简称"  :disabled ='companyShortNamevalue' ></Input>
                            </Form-item>
                            
                            <Form-item label="企业类型" prop="companyType">
                                 <Select v-model="formValidate.companyType" placeholder="请选择企业性质" :disabled='companyTypevalue'>
                                    <Option  v-for='(item,index) in companyTypes' :value="item.value" :key='index'>{{item.desc}}</Option>
                                </Select>
                            </Form-item>
                            <Form-item label="企业性质" prop="companyNature">
                                 <Select v-model="formValidate.companyNature" placeholder="请选择企业类型" :disabled='companyNaturevalue'>
                                    <Option  v-for='(item,index) in companyNatures' :value="item.value" :key='index'>{{item.desc}}</Option>
                                </Select>
                            </Form-item>
                            <Form-item label="主营品种" prop="varieties" class="produce">
                              <Input v-model="formValidate.varieties" placeholder="请选择主营品种" @on-focus='showtreeModal' readonly :disabled='varietiesvalue'></Input>
                                <!-- 
                                <Select v-model="formValidate.varietys" multiple @on-change='selectvarity' style='overflow:hidden'>
                                    <Option v-for="item in cityList" :value="item.value" :key="item.value" >{{ item.label }}</Option>
                                </Select> -->
                                <!-- <associate-Search @query-list="getvarietys"  :dataUrl="url" :parameterName='name' ref='kfref'></associate-Search> -->
                                <template>
                                    <Row :gutter="16" class="varieties" v-if="formValidate.varietys.length >= 1">
                                        <Col  v-for=" (variety,index) in formValidate.varietys" :key='index'>
                                            <div><span>{{variety.name}}</span></div>
                                            <!-- <Icon type="close" @click="handleRemove(index)"></Icon> -->
                                        </Col>
                                    </Row>
                                </template>
                            </Form-item>
                            <Form-item label="所在城市">
                              <!-- <Cascader :data="arr" :load-data="loadData" v-model="formValidate.provinces" change-on-select> </Cascader> -->
                              <Row span='24'  type="flex" justify="space-between">
                                <Col span='3' >
                                    <Select v-model="inout" @on-change='findprov' :disabled='inoutvalue'>
                                      <Option  value="01" >国内</Option>
                                      <Option  value="02" >国外</Option>
                                  </Select>
                                </Col>
                                <Col span='6' >
                                    <Select v-model="prov" v-if="(inout&&arr.length>0)||district"  @on-change='findcity' :label-in-value='true' :disabled='provvalue'>
                                    <Option v-for="(option,index) in arr" :value="option.code" :key='index'>
                                      {{ option.name }}
                                    </Option>
                                  </Select>
                                </Col>
                                <Col span='6' > 
                                  <Select v-model="city" v-if="(prov&&cityArr.length>0)||district" :label-in-value='true' @on-change='finddistrict' :disabled='cityvalue'>
                                    <Option v-for="(option,index) in cityArr" :value="option.code" :key='index'>
                                      {{ option.name }}
                                    </Option>
                                  </Select>
                                </Col>
                                <Col span='6' >
                                  <Select v-model="district" v-if="(city&&districtArr.length>0)||district" :label-in-value='true'  @on-change='getdistrict' :disabled='districtvalue'>
                                    <Option v-for="(option,index) in districtArr" :value="option.code" :key='index'>
                                      {{ option.name }}
                                    </Option>
                                  </Select>
                                </Col>
                              </Row>                             
                            </Form-item>
                            <Form-item label="街道地址" prop="companyAddress" > 
                                <Input v-model="formValidate.companyAddress" placeholder="街道地址" :disabled='companyAddressvalue'></Input>
                            </Form-item>
                            <Form-item label="邮政编码" prop="postalCode">
                                <Input v-model="formValidate.postalCode" placeholder="邮政编码" :disabled='postalCodevalue' ></Input>
                            </Form-item>
                            <Form-item class="btn-wrap">
                                <i-button type="primary"  @click="nextstep(1,'formValidate','step2')">下一步</i-button>
                                <!-- <i-button type="primary" @click="handleSubmit('formValidate')">提交</i-button> -->
                                <!-- <i-button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</i-button> -->
                            </Form-item>
                        </i-form>
                        
                    </Row>
                    <Row  v-show="showstep2">
                        <i-form ref="step2" :model="step2" :rules="rulestep2" :label-width="80" class="step1-wrap">
                            <Form-item label="公司电话" prop="companyPhone">
                                <Input v-model="step2.companyPhone" placeholder="请输入公司电话" :disabled='companyPhonevalue'></Input>
                            </Form-item>
                            <Form-item label="公司传真" prop="companyFax" >
                                <Input  v-model="step2.companyFax" placeholder="请输入公司传真" :disabled='companyFaxvalue'></Input>
                            </Form-item>
                            <Form-item label="公司网址" prop="companyWebsite">
                                <Input v-model="step2.companyWebsite" placeholder="请输入公司网址" :disabled='companyWebsitevalue'></Input>
                            </Form-item>
                            <Form-item label="公司邮箱" prop="companyEmail" >
                                <Input  v-model="step2.companyEmail" placeholder="请输入公司邮箱" :disabled='companyEmailvalue'></Input>
                            </Form-item>
                            <Form-item class="btn-wrap">
                                <i-button   @click="toggle(0)" style="margin-right:8px;">上一步</i-button>
                                <i-button type="primary"  @click="thirdstep(2,'step2','step3')">下一步</i-button>
                               
                            </Form-item>
                        </i-form>
                    </Row>
                    <Row v-show="showstep3">
                        <i-form ref='step3' :model="step3" :rules="rulestep3" :label-width="80" class="step1-wrap">
                            <Form-item label="用户名" prop="username">
                                <Input  v-model="step3.username" placeholder="请输入用户名" ></Input>
                            </Form-item>
                            <Form-item label="姓名" prop="name">
                                <Input  v-model="step3.name" placeholder="请输入姓名"></Input>
                            </Form-item>
                            <Form-item label="职位" prop="position">
                                <Input  v-model="step3.position" placeholder="请输入职位"></Input>
                            </Form-item>
                            <div v-if='inout=="02"' class="c1">
                              <Form-item label="邮箱" prop="email1">
                                <Input v-model="step3.email1" placeholder="请输入邮箱"></Input>
                              </Form-item>
                              <Form-item label="手机" prop="mobilephone1" >
                                  <Input  v-model="step3.mobilephone1" placeholder="请输入手机号"></Input>
                              </Form-item>
                            </div>
                            <div v-else>
                              <Form-item label="邮箱" prop="email">
                                <Input v-model="step3.email" placeholder="请输入邮箱"></Input>
                              </Form-item>
                              <Form-item label="手机" prop="mobilephone" >
                                  <Input  v-model="step3.mobilephone" placeholder="请输入手机号"></Input>
                              </Form-item>
                            </div>
                            
                            <Form-item label="电话" prop="userphone">
                                <Row>
                                    <Col span="4"><Input  v-model="step3.userphone.qh" placeholder=""></Input></Col>
                                    <Col span="1" class='hg'>-</Col>
                                    <Col span="19"><Input  v-model="step3.userphone.hm" placeholder=""></Input></Col>
                                </Row>
                            </Form-item>
                            <Form-item label="传真" prop="userfax">
                                <Row>
                                    <Col span="4"><Input  v-model="step3.userfax.qh" placeholder=""></Input></Col>
                                    <Col span="1" class='hg'>-</Col>
                                    <Col span="19"><Input  v-model="step3.userfax.hm" placeholder=""></Input></Col>
                                </Row>
                            </Form-item>
                            <Form-item label="地址" prop="useraddress">
                                <Input  v-model="step3.useraddress" placeholder="请输入地址"></Input>
                            </Form-item>
                            <Form-item class="btn-wrap">
                                <Button   @click="toggle(1)" style="margin-right:8px;">上一步</Button>
                                <Button type="primary" :loading="isdisabled"  @click="send('step3')">
                                    <span v-if="!isdisabled">新增用户并发送密码</span>
                                    <span v-else>Loading...</span>
                                </Button>
                                <!-- <Button type="primary"  :disabled='' ></Button> -->
                                <Modal v-model="modal1"   class="talkwrap" width="450" :mask-closable="false" :closable="false"> 
                                    <p slot="header" class='result_t'>提示</p>
                                    <p>用户注册成功！</p>
                                    <div slot="footer">
                                        <i-button type="primary"  @click="stillzc(0,'formValidate')">继续注册</i-button>
                                        <i-button    @click="gomyuser">前往我的用户</i-button>                                      
                                    </div>
                                </Modal>
                            </Form-item>
                        </i-form>
                    </Row>
                </Col>             
            </Row>
        </Col>
                <Modal
        v-model="modaltree"
        title="请选择品种"
        @on-ok="pzok"
        class="breedtree"
        @on-cancel="pzcancel">
        <Tree :data="breeddata" show-checkbox :load-data="loadData"  @on-check-change='selectpz'></Tree>
    </Modal>
    <Spin size="large" fix v-if="spinShow"></Spin> 
    </Row>
    
</template>


<script>
import axios from "axios";
import associateSearch from "../components/associateSearch/getAssociateSearch.vue";
import {
  isRegister, //公司是否注册过
  queryMemberSelectListRegister, //模糊搜索公司
  areaSelectList, //城市
  queryAllProvince, //省级
  queryBreedTree, //品种
  queryCompanyNatureSelectList, //企业性质
  queryCompanyTypeSelectList, //企业类型
  getFollow //我要跟踪
} from "../components/axios/crm.js";
import { formData, formatTime2 } from "../../assets/js/common.js";
export default {
  components: {
    associateSearch
  },
  data() {
    const validatephone = (rule, value, callback) => {
      var qh = this.step3.userphone.qh;
      var hm = this.step3.userphone.hm;
      if (qh == "" && hm == "") {
        callback();
      } else {
        var number = qh + "-" + hm;
        var isPhone = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
        // 模拟异步验证效果
        // setTimeout(() => {
        if (!isPhone.test(number)) {
          callback(new Error("电话号码不正确"));
        } else {
          // if (value < 18) {
          //     callback(new Error('Must be over 18 years of age'));
          // } else {
          callback();
          // }
        }
        // }, 1000);
      }
    };
    const validatefax = (rule, value, callback) => {
      var qh = this.step3.userfax.qh;
      var hm = this.step3.userfax.hm;
      if (qh == "" && hm == "") {
        callback();
      } else {
        var number = qh + "-" + hm;
        var isPhone = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
        // 模拟异步验证效果
        //setTimeout(() => {
        if (!isPhone.test(number)) {
          callback(new Error("传真号不正确"));
        } else {
          // if (value < 18) {
          //     callback(new Error('Must be over 18 years of age'));
          // } else {
          callback();
          // }
        }
        // }, 1000);
      }
    };
    const validateusername = (rule, value, callback) => {
      var isname = /^[a-zA-Z0-9]{6,15}$/;
      // 模拟异步验证效果
      //setTimeout(() => {
      if (!value) {
        callback(new Error("请输入用户名"));
      } else if (!isname.test(value)) {
        callback(new Error("用户名为6-15个英文字符或数字组合"));
      } else {
        // if (value < 18) {
        //     callback(new Error('Must be over 18 years of age'));
        // } else {

        // }
        axios({
          url: "/crm/register/check-username",
          method: "get",
          params: {
            username: value
          }
        }).then(function(resp) {
          if (resp.data.status == 200) {
            if (resp.data.response) {
              callback(new Error("该用户名已存在，请重命名"));
            } else {
              callback();
            }
          } else {
          }
        });
      }
    };
    const validateuserphone = (rule, value, callback) => {
      if (value) {
        axios({
          url: "/crm/register/check-mobile-exist",
          method: "post",
          params: {
            mobile: value
          }
        }).then(function(resp) {
          if (resp.data.status == 200) {
            if (resp.data.response) {
              callback(new Error("该手机号已存在，请重新输入"));
            } else {
              callback();
            }
          } else {
          }
        });
      } else {
        callback();
      }
    };
    const validatecompanyFullNameblur = (rule, value, callback) => {
      setTimeout(() => {
        var that = this;

        this.show = false;
        // if(!value){
        if (!that.formValidate.companyFullNamevalue) {
          callback(new Error("请输入公司全称"));
        } else if (that.formValidate.companyFullNamevalue.length > 50) {
          callback(new Error("公司全称不能超过50个字符"));
        } else {
          callback();
        }
      }, 1000);
    };
    const validatecompanyFullName = (rule, value, callback) => {
      setTimeout(() => {
        var that = this;
        this.show = false;
        if (value) {
          let that = this;
          this.getsetdata();
          axios({
            url: "/crm/register/check-member-register",
            method: "get",
            params: {
              memberName: that.formValidate.companyFullNamevalue,
              memberId: value
              // memberName: '华西_125',
              // memberId: 38
            }
          }).then(function(resp) {
            if (resp.data.status == 200) {
              if (resp.data.response.type == 0) {
              } else if (resp.data.response.type == 1) {
                let data = resp.data.response.memberInfoFromZero;
                if (data.companyShortName) {
                  that.formValidate.companyShortName = data.companyShortName; //公司简称
                  that.companyShortNamevalue = true;
                }
                if (data.postalCode) {
                  that.formValidate.postalCode = data.postalCode; //邮政编码
                  that.postalCodevalue = true;
                }
                if (data.companyType != null) {
                  that.formValidate.companyType = data.companyType; //企业性质
                  that.companyTypevalue = true;
                }
                if (data.breedList && data.breedList.length > 0) {
                  var name = data.breedList.map(item => {
                    return item.name;
                  });
                  that.formValidate.varieties = name.join("/"); //主营品种
                  that.formValidate.varietys = data.breedList;
                  that.varietiesvalue = true;
                }

                if (data.companyNature) {
                  that.formValidate.companyNature = data.companyNature; //企业类型
                  that.companyNaturevalue = true;
                }
                if (data.companyAddress) {
                  that.formValidate.companyAddress = data.companyAddress; //公司地址
                  that.companyAddressvalue = true;
                }
                if (data.companyEmail) {
                  that.step2.companyEmail = data.companyEmail; //公司邮箱
                  that.companyEmailvalue = true;
                }
                if (data.companyFax) {
                  that.step2.companyFax = data.companyFax; //公司传真
                  that.companyFaxvalue = true;
                }
                if (data.companyPhone) {
                  that.step2.companyPhone = data.companyPhone; //公司联系电话
                  that.companyPhonevalue = true;
                }
                if (data.companyWebsite) {
                  that.step2.companyWebsite = data.companyWebsite; //公司网址
                  that.companyWebsitevalue = true;
                }
                if (data.provinceCode) {
                  // that.getaddress(
                  //   data.provinceCodes.substring(
                  //     0,
                  //     data.provinceCodes.Length - 2
                  //   ),
                  //   1
                  // );
                  that.prov = data.provinceCode;
                  that.provvalue = true;
                  that.inoutvalue = true;
                }
                if (data.cityCode) {
                  that.getaddress(
                    data.data.cityCode.substring(0, data.cityCode.Length - 2),
                    2
                  );
                  that.city = data.cityCode;
                  that.cityvalue = true;
                  that.provvalue = true;
                  that.inoutvalue = true;
                }
                if (data.areaCode) {
                  var a = data.areaCode.substring(0, data.areaCode.length - 2);
                  that.getaddress(a, 3);
                  that.district = data.areaCode;
                  that.districtvalue = true;
                  that.provvalue = true;
                  that.cityvalue = true;
                  that.inoutvalue = true;
                }
                callback();
              } else if (resp.data.response.type == 2) {
                callback(new Error("该公司已注册"));
                that.show = true;
                that.type2 = resp.data.response.registerUserInfo;

                that.type2.map(item => {
                  item.memberId = value;
                  item.time = formatTime2(item.loginTime);
                  item.lastCall = formatTime2(item.lastCallTime);
                });
                // callback(new Error("该公司已注册"));
              }
            }
          });
        } else {
          callback();
        }
      }, 1000);
    };
    return {
      isdisabled: false,
      spinShow: false,
      inout: "",
      type2: {},
      show: false,
      hasselectpz: [],
      breeddata: [],
      modaltree: false,
      companyShortNamevalue: false,
      postalCodevalue: false,
      companyTypevalue: false,
      varietiesvalue: false,
      companyNaturevalue: false,
      companyAddressvalue: false,
      companyEmailvalue: false,
      companyFaxvalue: false,
      companyPhonevalue: false,
      companyWebsitevalue: false,
      districtvalue: false,
      cityvalue: false,
      provvalue: false,
      inoutvalue: false,
      arr: [],
      model13: "",
      loading1: false,
      options1: [],
      name: "breedName",
      url: "/crm/common/query-breed-select-list", //根据主营品种模糊匹配下拉选择列表
      nav: ["公司基本信息", "公司联系方式", "主联系人信息"],
      checkindex: 0, // 初始化第一个栏块高亮
      modal1: false,
      showstep1: true,
      showstep2: false,
      showstep3: false,
      spinShow: false,
      loading1: false,
      options1: [],
      visible: false,
      companyNatures: [],
      companyTypes: [],
      cityList: [],
      list: [],
      prov: "",
      city: "",
      district: "",
      cityArr: [],
      districtArr: [],
      formValidate: {
        companyFullName: "",
        companyShortName: "",
        companyNature: "",
        companyType: "",
        varieties: "",
        postalCode: "",
        companyAddress: "",
        varietys: [],
        provinces: ["", "", ""]
      },
      step2: {
        companyPhone: "",
        companyFax: "",
        companyWebsite: "",
        companyEmail: ""
      },
      step3: {
        username: "",
        name: "",
        position: "",
        mobilephone: "",
        userphone: {
          qh: "",
          hm: ""
        },
        userfax: {
          qh: "",
          hm: ""
        },
        useraddress: ""
      },

      ruleValidate: {
        companyFullName: [
          {
            required: true,
            trigger: "blur",
            validator: validatecompanyFullNameblur
          },
          {
            required: true,
            trigger: "change",
            validator: validatecompanyFullName
          }
        ],
        companyShortName: [
          {
            required: false,
            type: "string",
            max: 50,
            message: "公司简称不能超过50个字符",
            trigger: "blur"
          }
        ],
        companyAddress: [
          {
            required: false,
            type: "string",
            max: 100,
            message: "街道地址不能超过100个字符",
            trigger: "blur"
          }
        ],
        postalCode: [
          {
            required: false,
            max: 6,
            min: 6,
            pattern: "^[0-9]\\d{5}$",
            message: "邮政编码正确格式为六位有效数字",
            trigger: "blur"
          }
        ]
      },
      rulestep2: {
        companyPhone: [
          {
            required: false,
            pattern:
              "^((((\\+\\d{2})?0\\d{2,3})?\\d{7,8})|((\\+\\d{2}-)?0\\d{2,3}-\\d{7,8})|([1][0-9][0-9]\\d{8}))$",
            message: "电话号码格式不正确,格式：11位手机，区号+7~8位号码",
            trigger: "blur"
          }
        ],
        companyFax: [
          {
            required: false,
            pattern:
              "^(0\\d{2}-\\d{8}(-\\d{1,4})?)|(0\\d{3}-\\d{7,8}(-\\d{1,4})?)$",
            message: "传真号不正确,格式：区号-7~8位号码",
            trigger: "blur"
          }
        ],
        companyWebsite: [
          {
            required: false,
            pattern:
              "^(?=^.{3,255}$)((ht|f)tps?://)?(www.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:d+)*(/w+.w+)*([?&]w+=w*)*$",
            message: "网址格式不正确",
            trigger: "blur"
          }
        ],
        companyEmail: [
          {
            required: false,
            type: "email",
            message: "邮箱格式不正确",
            trigger: "blur"
          }
        ]
      },
      rulestep3: {
        username: [
          {
            required: true,
            max: 15,
            min: 6,
            trigger: "blur",
            validator: validateusername
          }
          // { required: true, message: '用户名不能为空', trigger: 'blur' },
          // { type: 'string', max: 15,min:6, message: '用户名为6-15个英文字符或数字组合', trigger: 'blur',pattern:'[A-Za-z0-9_\-\u4e00-\u9fa5]+',}
        ],
        name: [
          { required: true, message: "姓名不能为空", trigger: "blur" },
          {
            type: "string",
            max: 20,
            message: "字数不能超过20个字符",
            trigger: "blur"
          }
        ],
        position: [
          {
            required: false,
            type: "string",
            max: 20,
            message: "字数不要超过20个字符",
            trigger: "blur"
          }
        ],
        email: [
          {
            required: false,
            type: "email",
            message: "邮箱格式不正确",
            trigger: "blur"
          },
          { max: 50, message: "邮箱不要超过50个字符", trigger: "blur" }
        ],
        mobilephone: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          {
            message: "手机号不正确",
            pattern: "^1[0-9]{10}$"
          },
          {
            required: true,
            validator: validateuserphone
          }
        ],
        email1: [
          {
            required: true,
            type: "email",
            message: "邮箱格式不正确",
            trigger: "blur"
          },
          { max: 50, message: "邮箱不要超过50个字符", trigger: "blur" }
        ],
        mobilephone1: [
          { required: false, message: "手机号不能为空", trigger: "blur" },
          {
            message: "手机号不正确",
            trigger: "blur",
            pattern: " ^1[0-9]{10}$"
          },
          {
            trigger: "blur",
            validator: validateuserphone
          }
        ],
        useraddress: [
          {
            required: false,
            max: 100,
            message: "地址不要超过100个字符",
            trigger: "blur"
          }
        ],
        userphone: [
          {
            required: false,
            max: 20,
            trigger: "blur",
            validator: validatephone
          }
        ],
        userfax: [
          { required: false, max: 20, trigger: "blur", validator: validatefax }
        ]
      }
    };
  },
  methods: {
    findprov(value) {
      console.log(this.inout);
      this.prov = "";
      this.getsjaddress(value);
    },
    clearmember() {
      this.formValidate.companyFullNamevalue = "";
      this.getsetdata();
    },
    querychange(query) {},
    followmen(b) {
      let form = {
        isUserAllot: 2,
        userId: b
      };
      getFollow(formData(form)).then(res => {
        this.$Message.success("跟踪成功");
        that.$router.go(0);
      });
    },
    // 品种弹窗出现
    showtreeModal() {
      this.modaltree = true;
    },
    //勾选品种
    selectpz(data) {
      this.hasselectpz = data;
    },
    // 品种弹窗取消
    pzcancel() {},
    // 品种弹窗确定
    pzok() {
      this.formValidate.varietys = this.hasselectpz.map(item => {
        if (item.type == 0) {
          return {
            name: item.title,
            id: item.id
          };
        }
      });
      for (var i = 0; i < this.formValidate.varietys.length; i++) {
        if (this.formValidate.varietys[i] == undefined) {
          this.formValidate.varietys.splice(i, 1);
          i = i - 1; // i - 1 ,因为空元素在数组下标 2 位置，删除空之后，后面的元素要向前补位，
          // 这样才能真正去掉空元素,觉得这句可以删掉的连续为空试试，然后思考其中逻辑
        }
      }
      const namelist = this.formValidate.varietys.map(item => {
        // if (item.name) {
        return item.name;
        // }

        //
      });
      this.formValidate.varieties = namelist.join("/");
    },
    getsetdata() {
      var that = this;
      that.formValidate.companyShortName = ""; //公司简称
      that.companyShortNamevalue = false;
      that.formValidate.postalCode = ""; //邮政编码
      that.postalCodevalue = false;
      that.formValidate.companyType = ""; //企业性质
      that.companyTypevalue = false;
      that.formValidate.varieties = ""; //主营品种
      this.formValidate.varietys = [];
      that.varietiesvalue = false;
      that.formValidate.companyNature = ""; //企业类型
      that.companyNaturevalue = false;
      that.formValidate.companyAddress = ""; //公司地址
      that.companyAddressvalue = false;
      that.step2.companyEmail = ""; //公司邮箱
      that.companyEmailvalue = false;
      that.step2.companyFax = ""; //公司传真
      that.companyFaxvalue = false;
      that.step2.companyPhone = ""; //公司联系电话
      that.companyPhonevalue = false;
      that.step2.companyWebsite = ""; //公司网址
      that.companyWebsitevalue = false;
      that.prov = "";
      that.provvalue = false;
      that.inoutvalue = false;
      that.city = "";
      that.cityvalue = false;
      that.district = "";
      that.districtvalue = false;
    },
    findcity(data) {
      this.city = "";
      this.formValidate.prov = data ? data.label : "";
      if (data) {
        this.getaddress(data.value, 2);
      }
    },
    finddistrict(data) {
      this.district = "";
      this.formValidate.city = data ? data.label : "";
      if (data) {
        this.getaddress(data.value, 3);
      }
    },
    getdistrict(data) {
      if (data) {
        this.formValidate.district = data.label;
      } else {
        this.formValidate.district = "";
      }
    },
    // 城市
    // loadData(item, callback) {
    //   item.loading = true;
    //   // setTimeout(() => {
    //   var a = {
    //     parentCode: item.value
    //   };
    //   areaSelectList(a).then(resp => {
    //     if (resp.response.length > 0) {
    //       item.children = resp.response.map(option => {
    //         return {
    //           value: option.code,
    //           label: option.name,
    //           children: [],
    //           loading: false
    //           // render:
    //         };
    //       });
    //     } else {
    //       delete item.children;
    //     }
    //   });
    //   item.loading = false;
    //   callback();
    //   // }, 1000);
    // },
    queryset(data) {
      if (!data) {
        if (
          this.options1.length == 0 &&
          this.formValidate.companyFullNamevalue
        ) {
          this.show = false;
          this.$refs.companyref.query = this.formValidate.companyFullNamevalue;
          // this.options1 = [];
          this.getsetdata();
        }
      }
    },
    //公司名称模糊搜索
    remoteMethod1(query) {
      if (query) {
        // this.options1 = [];
        this.formValidate.memberId = "";

        this.formValidate.companyFullNamevalue = query;

        this.loading1 = true;
        setTimeout(() => {
          var a = {
            memberName: query
          };
          var that = this;
          queryMemberSelectListRegister(a).then(resp => {
            that.loading1 = false;
            if (resp.response.length > 0) {
              const list = resp.response.map(item => {
                return {
                  value: item.id,
                  label: item.name
                };
              });
              that.options1 = list.filter(
                item =>
                  item.label.toLowerCase().indexOf(query.toLowerCase()) > -1
              );
            } else {
              that.options1 = [{
                label:query,
                value:''
              }]
            }
          });
        }, 200);
      } else {
        this.options1 = [];
      }
    },
    //公司模糊搜索下拉选中
    companyregister(data) {},
    //   主营品种模糊搜索
    getvarietys(data) {},
    selectgs(name) {
      this.formValidate.companyFullName = name;
    },
    checkusername() {
      var username = this.formValidate.username;
      var regusername = "[A-Za-z0-9_-\u4e00-\u9fa5]+";
      if (username != "" && regusername.test(username)) {
        axios({
          url: "/crm/register/check-username",
          method: "get",
          params: {
            username: username
          }
        }).then(function(resp) {
          if (resp.data.status == 200) {
            if (resp.data.response.type == 0) {
            } else if (resp.data.response.type == 1) {
            } else if (resp.data.response.type == 2) {
            }
          }
        });
      }
    },

    toggle(key) {
      this.checkindex = key;
      if (key == 0) {
        this.showstep1 = true;
        this.showstep2 = false;
        this.showstep3 = false;
      } else if (key == 1) {
        this.showstep1 = false;
        this.showstep2 = true;
        this.showstep3 = false;
      } else if (key == 2) {
        this.showstep1 = false;
        this.showstep2 = false;
        this.showstep3 = true;
      }
    },
    selectvarity(value) {
      this.formValidate.varietys = value;
    },
    fingmsg(event) {
      var companyFullName = this.formValidate.companyFullName;
      if (companyFullName.length < 51 && companyFullName.length > 0) {
        queryMemberSelectListRegister().then(resp => {});
        // axios({
        //     url: '/crm/register/check-member-register',
        //     method: 'get',
        //     params: {
        //         memberName:companyFullName
        //     }
        //     }).then(function(resp) {
        //         if(resp.data.status==200){
        //             if(resp.data.response.type==0){
        //             }else if(resp.data.response.type==1){

        //             }else if(resp.data.response.type==2){

        //             }
        //         }
        // })
        this.visible = true;
      } else {
        this.visible = false;
      }
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          // this.$Message.success("提交成功!");
        } else {
          // this.$Message.error("表单验证失败!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    nextstep(a, name, b) {
      console.log(this.formValidate);
      this.$refs[name].validate(valid => {
        if (valid) {
          this.showstep1 = false;
          this.showstep2 = true;
          this.checkindex = a;
          // this.$refs[b].resetFields();
        } else {
        }
      });
    },
    thirdstep(a, name, b) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.showstep2 = false;
          let that = this;
          setTimeout(function() {
            that.showstep3 = true;
            that.checkindex = a;
            that.$refs[b].resetFields();
          }, 5);
        } else {
        }
      });
    },
    stillzc(a, name) {
      // this.showstep3 = false;
      // this.showstep1 = true;
      // this.checkindex = a;
      // this.modal1 = false;
      // this.$refs[name].resetFields();
      this.$router.go(0);
    },
    gomyuser() {
      // this.$Message.info("点击了前往我的用户");
      this.$router.push({
        name: "allUser"
      });
    },
    send(name) {
      this.$refs.formValidate.validate(valid => {
        if (valid) {
          this.$refs.step2.validate(valid => {
            if (valid) {
              this.$refs[name].validate(valid => {
                if (valid) {
                  if (this.isdisabled) {
                    return;
                  } else {
                    this.isdisabled=true;
                    var that = this;
                    this.$Spin.show();
                    let msg = {};
                    msg.areaCode = this.district || this.city || this.prov; //会员所在区域编码

                    let areaId = "";
                    if (this.district) {
                      for (var i = 0; i < this.districtArr.length; i++) {
                        if (this.districtArr[i].code == this.district) {
                          areaId = this.districtArr[i].id;
                        }
                      }
                    } else if (this.city) {
                      for (var i = 0; i < this.cityArr.length; i++) {
                        if (this.cityArr[i].code == this.district) {
                          areaId = this.cityArr[i].id;
                        }
                      }
                    } else if (this.prov) {
                      for (var i = 0; i < this.arr.length; i++) {
                        if (this.arr[i].code == this.district) {
                          areaId = this.arr[i].id;
                        }
                      }
                    }
                    msg.areaId = areaId; //会员所在区域Id
                    let m = "",
                      n = "",
                      p = "";
                    if (this.formValidate.prov) {
                      m = this.formValidate.prov.replace(/^\s+|\s+$/g, "");
                    }
                    if (this.formValidate.city) {
                      n = this.formValidate.city.replace(/^\s+|\s+$/g, "");
                    }
                    if (this.formValidate.district) {
                      p = this.formValidate.district.replace(/^\s+|\s+$/g, "");
                    }
                    msg.areaName = p || n || m; // 会员所在区域名称
                    msg.companyAddress =
                      m + n + p + this.formValidate.companyAddress; // 公司地址（由前端省市区+街道地址拼接组成）
                    msg.companyEmail = this.step2.companyEmail; // 公司邮箱
                    msg.companyFax = this.step2.companyFax.split("-").join(""); // 公司传真
                    msg.companyFullName = this.formValidate.companyFullNamevalue; // 公司全称

                    msg.companyPhone = this.step2.companyPhone
                      .split("-")
                      .join(""); // 公司联系电话
                    msg.companyShortName = this.formValidate.companyShortName; // 公司简称
                    if (this.formValidate.companyType) {
                      msg.companyType = Number(this.formValidate.companyType);
                    }
                    if (this.formValidate.companyNature) {
                      msg.companyNature = Number(
                        this.formValidate.companyNature
                      );
                    }
                    // msg.companyNature=Number(this.formValidate.type||0);// 企业类型
                    // msg.companyType=Number(this.formValidate.Nature||0);// 企业性质
                    msg.companyWebsite = this.step2.companyWebsite; // 公司网址
                    msg.mainContactAddress = this.step3.useraddress; // 主联系人地址
                    msg.mainContactEmail =
                      this.inout == "02" ? this.step3.email1 : this.step3.email; // 主联系人邮箱
                    let a = "";
                    if (this.step3.userfax.qh) {
                      a = this.step3.userfax.qh + this.step3.userfax.hm;
                    }
                    msg.mainContactFax = a; // 主联系人传真
                    msg.mainContactMobile =
                      this.inout == "02"
                        ? this.step3.mobilephone1
                        : this.step3.mobilephone; // 主联系人手机
                    msg.mainContactName = this.step3.name; // 主联系人姓名
                    let b = "";
                    if (this.step3.userphone.qh) {
                      b = this.step3.userphone.qh + this.step3.userphone.hm;
                    }
                    msg.mainContactPhone = b; // 主联系人电话
                    msg.mainContactTitle = this.step3.position; // 主联系人职位
                    let mainProduct = [];
                    mainProduct = this.formValidate.varietys.map(item => {
                      return item.id;
                    }); // 主营品种
                    msg.mainProduct = mainProduct.join(",");
                    msg.postalCode = this.formValidate.postalCode; // 公司邮政编码
                    msg.username = this.step3.username; //用户名

                    axios({
                      url: "/crm/register/save-register-info",
                      method: "post",
                      params: msg
                    }).then(function(resp) {
                      that.isdisabled=false;
                      that.$Spin.hide();
                      if (resp.data.status == 200) {
                        that.$Message.success(resp.data.message);
                        that.modal1 = true;
                      } else {
                        that.$Message.error(resp.data.message);
                      }
                    });
                  }
                } else {
                }
              });
            } else {
              this.toggle(1);
              return;
            }
          });
        } else {
          this.toggle(0);
          return;
        }
      });
    },
    // 主营品种
    handleRemove(item) {
      this.formValidate.varietys.splice(item, 1);
      this.selectvarity(this.formValidate.varietys);
      // this.formValidate.varietys.splice(item,1);
      // this.formValidate.varietys.splice(item, 1)
    },
    updateCity: function() {
      for (var i in this.arr) {
        var obj = this.arr[i];
        if (obj.name == this.prov) {
          this.cityArr = obj.sub;
          break;
        }
      }
      if (this.cityArr.length > 0) {
        this.city = this.cityArr[1].name;
      } else {
        this.city = "";
        this.districtArr = [];
      }
    },
    updateDistrict: function() {
      for (var i in this.cityArr) {
        var obj = this.cityArr[i];
        if (obj.name == this.city) {
          this.districtArr = obj.sub;
          break;
        }
      }
      if (
        this.districtArr &&
        this.districtArr.length > 0 &&
        this.districtArr[1].name
      ) {
        this.district = this.districtArr[1].name;
      } else {
        this.district = "";
      }
    },
    getaddress(data, b) {
      var a = {
        parentCode: data
      };
      var that = this;
      areaSelectList(a).then(resp => {
        if (b == 1) {
          that.arr = resp.response.map(option => {
            return {
              code: option.code,
              name: option.name,
              id: option.id
            };
          });
        } else if (b == 2) {
          that.cityArr = resp.response.map(option => {
            return {
              code: option.code,
              name: option.name,
              id: option.id
            };
          });
        } else if (b == 3) {
          that.districtArr = resp.response.map(option => {
            return {
              code: option.code,
              name: option.name,
              id: option.id
            };
          });
        }
      });
    },
    getsjaddress(value) {
      let a = {
        type: 1,
        parentCode: value
      };
      let that = this;
      queryAllProvince(a).then(resp => {
        that.arr = resp.response.map(option => {
          return {
            code: option.code,
            name: option.name,
            id: option.id
          };
        });
      });
    },
    loadData(a, callback) {
      setTimeout(() => {
        let msg = {
          parentCode: a.value
        };
        queryBreedTree(msg).then(resp => {
          const data = resp.response.map(option => {
            if (option.type != 0) {
              return {
                title: option.nodeName,
                value: option.nodeCode,
                id: option.nodeId,
                disableCheckbox: true,
                children: [],
                type: option.type,
                loading: false
                // render:
              };
            } else {
              return {
                title: option.nodeName,
                value: option.nodeCode,
                type: option.type,
                id: option.nodeId
                // loading: false
                // render:
              };
            }
          });
          callback(data);
        });
      }, 1000);
    },
    // 点击品种节点
    loadson(data) {},
    // 品种树
    getpztree(data) {
      let msg = {
        parentCode: data
      };
      queryBreedTree(msg).then(resp => {
        this.breeddata = resp.response.map(option => {
          if (option.type != 0) {
            return {
              title: option.nodeName,
              value: option.nodeCode,
              id: option.nodeId,
              disableCheckbox: true,
              children: [],
              type: option.type,
              loading: false
              // render:
            };
          } else {
            return {
              title: option.nodeName,
              value: option.nodeCode,
              id: option.nodeId,
              type: option.type
              // loading: false
              // render:
            };
          }
        });
      });
    },
    // 企业性质
    getcompanyNature() {
      var that = this;
      queryCompanyNatureSelectList().then(resp => {
        that.companyNatures = resp.response;
      });
    },
    //企业类型
    getcompanyType() {
      var that = this;
      queryCompanyTypeSelectList().then(resp => {
        that.companyTypes = resp.response;
      });
    }
  },
  beforeMount: function() {
    // this.updateCity();
    // this.updateDistrict();
  },
  watch: {
    // prov: function() {
    //   this.updateCity();
    //   this.updateDistrict();
    // },
    // city: function() {
    //   this.updateDistrict();
    // }
  },

  created: function() {
    this.getpztree("");
    this.getcompanyNature();
    this.getcompanyType();
    // var that = this;
    // // 企业性质
    // axios({
    //   url: "/crm/common/query-companyNature-select-list",
    //   method: "get",
    //   params: {}
    // }).then(function(resp) {
    //   if (resp.data.status == 200) {
    //     that.companyTypes = resp.data.response;
    //   }
    // });
    // // 企业类型
    // axios({
    //   url: "/crm/common/query-companyType-select-list",
    //   method: "get",
    //   params: {}
    // }).then(function(resp) {
    //   if (resp.data.status == 200) {
    //     that.companyNatures = resp.data.response;
    //   }
    // });
    // this.getsjaddress();
  }
};
</script>

   
    