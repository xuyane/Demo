<style lang="less" scoped>
@import "./addInformationSettings.less";
.info-detail {
  border-left: 1px solid #ddd;
  width: 60%;
}
.info-detail div {
  font-size: 14px;
}
</style>
<template>
  <Row>
    <Col span="24">
      <Row class-name="current-position">
        当前位置：
         <router-link to="/plantIndex" class="link-css">信息发布管理</router-link> 
        &nbsp;&nbsp;>>&nbsp;&nbsp;
          <a @click="goto" class="link-css">新建信息单元</a>
        
        <!-- 新建信息单元 -->
      </Row>
    </Col>
    <Col span="24">
      <Row class-name="add-container">
        <div class="step-container">
          <span class="step1 active">基本信息设置</span>
          <span class="step2">信息联系人设置</span>
          <span class="step2">关联相关信息单元</span>
        </div>
        <p class="title">信息单元基本信息</p>
        <Col span="24" class="product-opening-table">
        <Form ref="formItem" :model="formItem" :rules='ruleValidate' :label-width="150">
            <FormItem label="信息单元名称:" prop="IsNameNull">
                <Input v-model="formItem.name" placeholder="请输入信息单元名称" style="width:60%" :maxlength="100"></Input>
            </FormItem>
            <FormItem prop="info" v-show="false">
                <Input v-model="formItem.info"/>
            </FormItem>
           
            <FormItem label="站点:" prop="siteOne">
                <Select
                    v-model="formItem.siteId"
                    filterable
                    remote
                    :remote-method="remoteMethodSite"
                    label-in-value
                    @on-change = "siteChangeNum"
                    :loading="loading1" style="width:60%">
                    <Option v-for="option in optionSite" :value="option.value" :key="option.value">{{option.label}}</Option>
                </Select>
            </FormItem>
            <!-- 关联产品 -->
            <select-product  @connectProduct="connectProduct" @connectProduct2="doDist2" :siteChange="siteChange"></select-product>
             <FormItem label="信息大类:" prop="LargeClass">
                <Select  class="search-input"   style="width:60%" v-model="formItem.type" prop="BigType">
                <Option v-for="item in largeClassInfoList2" :value="item.value" :key="item.desc">{{ item.desc }}</Option>
                </Select>
            </FormItem>
            <!-- 当关联产品为空时，关联信息分类、关联品种名称、关联区域名称、关联企业为可选，否则为不可选 -->
            <Row v-show="!formItem.productId">
            <select-connect ref="selectConnect" @selectConent="doDist" @connectInfo="connectInfo" :siteChange="siteChange"></select-connect>
            <select-varieties @connectVarieties="connectVarieties" :informationList="informationList1"></select-varieties>
            <select-area @connectArea="connectArea" :informationList="informationList2"></select-area>
            <select-enterprise @connectEnterprise="connectEnterprise" :informationList="informationList3"></select-enterprise>
            </Row>
            <Row v-show="formItem.productId">
                <FormItem label="关联的信息分类:">
                   <Row>
                    <Col>
                        <div class="info-detail" >
                        <div v-for=" (item,index) in productListContent.messageCatagoryList" :key="index"  >
                            <span>{{item.name}}</span>
                        </div>
                        </div>
                    </Col>
                    </Row>
                </FormItem>
                 <FormItem label="关联的品种:">
                   <Row>
                    <Col>
                        <div class="info-detail" >
                        <div v-for=" (item,index) in productListContent.breedList" :key="index"  >
                            <span>{{item.name}}</span>
                        </div>
                        </div>
                    </Col>
                    </Row>
                </FormItem>
                 <FormItem label="关联的区域:">
                   <Row>
                    <Col>
                        <div class="info-detail" >
                        <div v-for=" (item,index) in productListContent.areaList" :key="index"  >
                            <span>{{item.name}}</span>
                        </div>
                        </div>
                    </Col>
                    </Row>
                </FormItem>
                  <FormItem label="关联的企业:">
                   <Row>
                    <Col>
                        <div class="info-detail" >
                        <div v-for=" (item,index) in productListContent.enterpriseList" :key="index"  >
                            <span>
                                {{item.name}}</span>
                        </div>
                        </div>
                    </Col>
                    </Row>
                </FormItem>
               
            </Row>
            <FormItem label="前端是否展示:" prop="productClassify">
                <Select  class="search-input"   style="width:60%" v-model="formItem.isShow">
                <Option v-for="item in isShowList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
            <FormItem label="节假日是否展示:" >
                <Select  class="search-input"   style="width:60%" v-model="formItem.isHolidayShow">
                <Option v-for="item in isHolidayShowList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
            <FormItem label="默认关键字:" prop="defaultKeywordOne">
                <Input placeholder="请输入默认关键字" style="width:60%" v-model="formItem.defaultKeyword" :maxlength="100"></Input>
            </FormItem>
            <Row>
                <FormItem label="默认文章摘要:" prop="defaultSummaryOne"> 
                <Col span="20">
                    <Input  type="textarea" :autosize="{minRows: 5,maxRows: 5}" placeholder="请输入默认文章摘要" style="width:68%" v-model="formItem.defaultSummary" :maxlength="300" ></Input>
                </Col>
                </FormItem>
            </Row>
            <FormItem label="默认信息来源网:" prop="defaultSourceOne">
                <Input v-model="formItem.defaultSource" placeholder="请输入默认信息来源网" style="width:60%" :maxlength="50"></Input>
            </FormItem>
            <p class="title">信息任务</p>
            <Row type="flex" >
                <Col span="8">
                    <FormItem label="发布周期:" prop="releaseCycle">
                        <Select  class="search-input" v-model="formItem.releaseCycle" @on-change="changeTypeList1" style="width:50%">
                            <Option v-for="item in typeList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="8" v-if="formItem.releaseCycle != 0 && formItem.releaseCycle !== ''">
                    <FormItem label="要求完成时间:" v-if="formItem.releaseCycle == 1 || formItem.releaseCycle == 2 || formItem.releaseCycle == 3" prop="completeTime1">
                        <Select  class="search-input" v-model="formItem.completeTime1"  @on-change="changeCompleteTime" style="width:50%">
                        <Option v-for="item in completeTime" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="要求完成时间:" v-if="formItem.releaseCycle == 4" prop="completeTime2">
                        <DatePicker type="date" format="yyyy-MM-dd" v-model="formItem.completeTime2" style="width:60%" placeholder="请选择日期"  @on-change="changeCompleteTime2"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="发布次数:" prop="releaseCount">
                        <Input type="text" v-model="formItem.releaseCount" class="search-input" style="width:50px"></Input>
                        <span>次/周期</span>
                    </FormItem>
                </Col>
                
            </Row>
            <Row>
                <Col span="12">
                    <FormItem label="发布时间:" prop="releaseTime">
                        <TimePicker type="time" format="HH:mm" v-model="formItem.releaseTime" style="width:130px"></TimePicker>
                    </FormItem>
                </Col>
            </Row>
            <FormItem label="任务责任人:" prop="TaskResponsibility">
                <Select
                    v-model="formItem.executorId"
                    filterable
                    remote
                    :remote-method="employeeList"
                    label-in-value
                    @on-change = "employeeNum"
                    :loading="loading1" style="width:60%">
                    <Option v-for="option in optionemployee" :value="option.value" :key="option.value">{{option.label}}</Option>
                </Select>
            </FormItem>
            <Row>
                <FormItem label="备注:" prop="descriptionOne">
                <Col span="20">
                    <Input  type="textarea" :autosize="{minRows: 5,maxRows: 5}" placeholder="请输入备注" style="width:68%" v-model="formItem.description" :maxlength="300"></Input>
                </Col>
                </FormItem>
            </Row>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formItem',1)">保存并执行下一步</Button>
                 <Button type="primary" @click="handleSubmit('formItem',2)">保存并返回</Button>
                <Button style="margin-left: 8px" @click="Unitcancel()">取消</Button>
            </FormItem>
        </Form>
        </col>
        
      </Row>
    </Col>
  </Row>
</template>
<script>
import axios from "axios";
import { formData, formatStamp } from "../../../assets/js/common.js";
import SelectConnect from "./selectConnect";
import SelectVarieties from "./selectVarieties";
import SelectArea from "./selectArea";
import SelectEnterprise from "./selectEnterprise";
import SelectProduct from "./selectProduct";
import { informationTypeBig } from "./api/unitManageMent";
import {
  informationType,
  site,
  informationtypeList,
  Variety,
  breedList,
  employee,
  add
} from "./api/unitManageMent";
export default {
  components: {
    SelectConnect,
    SelectVarieties,
    SelectArea,
    SelectEnterprise,
    SelectProduct
  },
  data() {
    const validateName = (rule, value, callback) => {
      var regu = /^\s*$/g;
      if (regu.test(this.formItem.name)) {
        console.log("有空格");
        callback(new Error("信息单元不能为空格"));
      } else {
        callback();
      }
      if (this.formItem.name == "") {
        callback(new Error("请输入信息单元名称"));
      } else {
        callback();
      }
    };
    const LargeClassList = (rule, value, callback) => {
      if (this.formItem.type === "") {
        //要写为 '===',因为当为数字0时会认为控制报错
        callback(new Error("请选择信息大类"));
      } else {
        callback();
      }
    };
    const validateTime = (rule, value, callback) => {
      console.log("timedate", value);
      if (value == "") {
        callback(new Error("请输入要求完成时间"));
      } else {
        callback();
      }
    };
    //验证发布次数不能为0
    const validateCount = (rule, value, callback) => {
      if (value == "0") {
        callback(new Error("发布次数不能为0"));
      } else {
        callback();
      }
    };
    const validateReleaseTime = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请选择最晚发布时间"));
      } else {
        callback();
      }
    };
    const validateInfo = (rule, value, callback) => {
      console.log("validateInfo2:" + value);
      if ((value == "") & !this.formItem.productId) {
        const res = this.$refs.selectConnect.childValidateFn();
        console.log("zi", res);
        callback(new Error("不能为空"));
      } else {
        callback();
      }
    };
    const validateInfoSite = (rule, value, callback) => {
      //console.log('ii',this.$refs.formItem.Site);
      if (this.formItem.siteId === "") {
        callback(new Error("不能为空"));
      } else {
        callback();
      }
    };
    const TaskRes = (rule, value, callback) => {
      console.log("22xuyane", this.formItem.executorId);
      if (this.formItem.executorId == "") {
        callback(new Error("请选择任务责任人"));
      } else {
        callback();
      }
    };
    const BigTypeIsflag = (rule, value, callback) => {
      if (this.formItem.productId) {
        this.$set(rule, "disabled", true);
      } else {
        this.$set(rule, "disabled", false);
      }
    };

    return {
      optionemployee: [],
      isTrue: false,
      siteChange: {},
      options2: [],
      AssoInforClassVarieties: false,
      selectRow: [],
      objList: [],
      options1: [],
      loading1: false,
      optionSite: [],
      formItem: {
        type: "",
        largeClassInfo: "",
        productId: "",
        name: "",
        siteId: "",
        info: "",
        isShow: "0",
        defaultKeyword: "",
        defaultSummary: "",
        defaultSource: "",
        taskCycle: "",
        executorId: "",
        executorName: "",
        releaseCycle: "",
        releaseCount: "",
        releaseTime: "",
        completeTime1: "",
        completeTime2: "",
        description: "",
        InfoClass: [],
        InfoVarieties: [],
        InfoArea: [],
        InfoEnterprise: [],
        productId: "",
        productName: "",
        isHolidayShow: "0"
      },
      typeList: [],
      defaultTypeList: "",
      defaultCompleteTime: "",
      changeTime: "",
      yearTime: "",
      clickOnde: true,
      largeClassInfoList: [
        {
          value: "0",
          label: "文章类"
        },
        {
          value: "1",
          label: "行情类"
        },
        {
          value: "2",
          label: "短信类"
        }
      ],
      largeClassInfoList2: [],
      isShowList: [
        {
          value: "0",
          label: "展示"
        },
        {
          value: "1",
          label: "隐藏"
        }
      ],
      isHolidayShowList: [
        {
          value: "0",
          label: "展示"
        },
        {
          value: "1",
          label: "隐藏"
        }
      ],
      completeTime: [
        {
          value: 0,
          label: "日"
        },
        {
          value: 1,
          label: "周"
        }
      ],
      typeList1: [
        {
          value: 0,
          label: "日"
        },
        {
          value: 1,
          label: "周"
        },
        {
          value: 2,
          label: "月"
        },
        {
          value: 3,
          label: "季度"
        },
        {
          value: 4,
          label: "年"
        }
      ],
      ruleValidate: {
        IsNameNull: [
          { required: true, validator: validateName, trigger: "blur" },
          {
            type: "string",
            max: 100,
            message: "信息单元名称不能超过100个字符",
            trigger: "blur"
          }
        ],
        siteOne: [
          {
            required: true,
            validator: validateInfoSite,
            message: "请输入站点",
            trigger: "change"
          }
        ],
        info: [
          {
            required: true,
            validator: validateInfo,
            message: "请输入关联的信息分类",
            trigger: "change"
          }
        ],
        releaseCycle: [
          {
            required: true,
            type: "number",
            message: "请选择发布周期",
            trigger: "change"
          }
        ],
        completeTime1: [
          {
            required: true,
            type: "number",
            message: "请选择要求完成时间",
            trigger: "change"
          }
        ],
        completeTime2: [
          {
            required: true,
            validateor: validateTime,
            message: "请选择要求完成时间",
            trigger: "change"
          }
        ],
        releaseCount: [
          {
            required: true,
            type: "string",
            message: "请输入发布次数",
            trigger: "blur"
          },
          {
            required: true,
            validateor: validateCount,
            type: "string",
            trigger: "blur"
          }
        ],
        releaseTime: {
          required: true,
          validator: validateReleaseTime,
          message: "请选择最晚发布时间点",
          trigger: "change"
        },
        TaskResponsibility: {
          required: true,
          validator: TaskRes,
          trigger: "change"
        },
        LargeClass: {
          required: true,
          validator: LargeClassList,
          trigger: "change"
        },
        BigType: {
          required: true,
          validator: BigTypeIsflag,
          trigger: "change"
        },
        defaultKeywordOne: [
          {
            type: "string",
            max: 100,
            message: "默认关键字不能超过100个字符",
            trigger: "blur"
          }
        ],
        defaultSummaryOne: [
          {
            type: "string",
            max: 300,
            message: "默认文章摘要不能超过300个字符",
            trigger: "blur"
          }
        ],
        defaultSourceOne: [
          {
            type: "string",
            max: 50,
            message: "默认信息来源不能超过50个字符",
            trigger: "blur"
          }
        ],
        descriptionOne: [
          {
            type: "string",
            max: 300,
            message: "备注不能超过300个字符",
            trigger: "blur"
          }
        ]
      },
      modalTest: false,
      productListContent: [], //关联产品的详细内容
      //在新增页面也要向相关品种，相关区域，相关企业组件呢传一个空值，在编辑页面要传根据查询得来的数据
      informationList1: [],
      informationList2: [],
      informationList3: []
    };
  },
  created() {
    // this.getListPage();
    this.getInformationTypeBig();
  },
  methods: {
    goto() {
      window.reload();
    },
    IsNull(callback) {
      if (this.formItem.name.indexOf(" ") != -1) {
        this.$Message.error("输入框不能包含空格");
        callback(new Error("信息单元不能为空"));
        return false;
      } else {
        return true;
      }
    },
    getInformationTypeBig() {
      let that = this;
      informationTypeBig().then(res => {
        //  console.log("获取信息大类")
        //  console.log(res.response);
        that.largeClassInfoList = res.response;
        that.largeClassInfoList2 = that.largeClassInfoList;
      });
    },
    connectInfo(val) {
      console.log("val11111", val);
      this.formItem.InfoClass = val;
      let arr = [];
      if (val) {
        // const info = val.reduce((res, item) => {
        //     return res + item.code + ','
        // }, '');
        // this.formItem.info = info;
        console.log("aaaaaa", val.length);

        for (let i = 0; i < val.length; i++) {
          console.log("aaaaaabb", val[i]);
          arr.push(val[i].id);
        }
        this.formItem.info = arr.join(",");
        console.log("thisformItem", this.formItem.info);
      } else {
        this.formItem.info = "";
      }
    },
    connectVarieties(val) {
      console.log("val", val);
      this.formItem.InfoVarieties = val;
    },
    connectArea(val) {
      this.formItem.InfoArea = val;
    },
    connectEnterprise(val) {
      this.formItem.InfoEnterprise = val;
    },
    connectProduct(val) {
      console.log("关联产品id");
      console.log(val);
      if (val) {
        this.largeClassInfoList2 = [];
        this.formItem.productId = val.id;
        this.productListContent = val;
        this.formItem.productName = val.name;
        this.formItem.InfoClass = val.messageCatagoryList;
        this.formItem.InfoVarieties = val.breedList;
        this.formItem.InfoArea = val.areaList;
        this.formItem.InfoEnterprise = val.enterpriseList;
        this.formItem.type = val.type;
        console.log("打印数据");
        console.log(this.formItem);
        this.largeClassInfoList.map((el, index) => {
          if (el.value == val.type) {
            console.log("qqqqq");
            console.log(this.largeClassInfoList[index]);
            this.largeClassInfoList2 = [];
            this.largeClassInfoList2.push(this.largeClassInfoList[index]);
          }
        });
      } else {
        this.formItem.productId = "";
        this.productListContent = "";
        this.largeClassInfoList2 = [];
        this.largeClassInfoList2 = this.largeClassInfoList;
        this.formItem.InfoClass = [];
        this.formItem.InfoVarieties = [];
        this.formItem.InfoArea = [];
        this.formItem.InfoEnterprise = [];
      }
    },
    // ---
    changeTypeList1(val) {
      console.log("oooooo", val, this.formItem.releaseCycle);
      this.formItem.completeTime1 = "";
      this.formItem.completeTime2 = "";
      if (val == 1) {
        // 周
        this.completeTime = [
          { value: 1, label: "星期一" },
          { value: 2, label: "星期二" },
          { value: 3, label: "星期三" },
          { value: 4, label: "星期四" },
          { value: 5, label: "星期五" },
          { value: 6, label: "星期六" },
          { value: 7, label: "星期日" }
        ];
      } else if (val == 2 || val == 3) {
        const list = Array.from({ length: 28 }, (v, k) => k + 1);
        console.log(list);
        this.completeTime = list.map(item => {
          const obj = {};
          obj.value = item == 28 ? 0 : item;
          obj.label = item == 28 ? "月末" : item + "日";
          return obj;
        });
      }
    },
    // ---
    changeCompleteTime(val) {
      console.log("completeTime1", val);
      this.formItem.completeTime1 = val;
    },
    changeCompleteTime2(val, data) {
      console.log(val);
      this.formItem.completeTime2 = val;
    },
    // 关联信息分类结束
    doDist(val) {
      //this.isTrue = !this.isTrue;
      if (!val) {
        this.$refs.formItem.validateField("siteOne");
      }
    },
    doDist2(val) {
      //this.isTrue = !this.isTrue;
      if (!val) {
        this.$refs.formItem.validateField("siteOne");
      }
    },
    handleSubmit(name, idOne) {
      let that = this;
      this.$refs[name].validate(valid => {
        console.log("valid", valid);
        this.objList = [];
        if (valid) {
          console.log("xuyane");
          let Connect = that.formItem.InfoClass;
          let ConVariet = that.formItem.InfoVarieties;
          let ConArea = that.formItem.InfoArea;
          let ConEnter = that.formItem.InfoEnterprise;
          console.log("Connect", Connect);
          console.log("ConVariet", ConVariet);
          console.log("ConArea", ConArea);
          console.log("ConEnter", ConEnter);
          console.log("formItemmmm0", that.formItem);
          console.log(valid);
          Connect.map(item => {
            let obj = {
              relationType: 0,
              relationId: item.id
            };
            this.objList.push(obj);
            console.log("oooooo", this.objList);
          });
          ConVariet.map(item => {
            let obj = {
              relationType: 1,
              relationId: item.id
            };
            this.objList.push(obj);
            console.log("oooooo", this.objList);
          });
          ConArea.map(item => {
            let obj = {
              relationType: 2,
              relationId: item.id
            };
            this.objList.push(obj);
            console.log("oooooo", this.objList);
          });
          ConEnter.map(item => {
            let obj = {
              relationType: 3,
              relationId: item.id
            };
            this.objList.push(obj);
            console.log("oooooo", this.objList);
          });
          // 判断周期
          let one = 0;
          if (
            that.formItem.releaseCycle == 1 ||
            that.formItem.releaseCycle == 2 ||
            that.formItem.releaseCycle == 3
          ) {
            one = that.formItem.completeTime1;
          }
          if (that.formItem.releaseCycle == 4) {
            // debugger;
            console.log("5555", that.formItem.completeTime2);
            one = formatStamp(that.formItem.completeTime2);
            console.log("0000", one);
          }
          console.log("one", one);

          this.$Spin.show();
          let form = {
            name: that.formItem.name,
            siteId: that.formItem.siteId,
            infoInformationUnitRelationList: this.objList,
            isShow: that.formItem.isShow,
            defaultKeyword: that.formItem.defaultKeyword,
            defaultSummary: that.formItem.defaultSummary,
            defaultSource: that.formItem.defaultSource,
            cycleSupplyInfo: one,
            taskCycle: that.formItem.releaseCycle,
            executionNumber: that.formItem.releaseCount,
            checkTime: that.formItem.releaseTime,
            executorId: that.formItem.executorId,
            description: that.formItem.description,
            executorName: that.formItem.executorName,
            type: that.formItem.type,
            productName: that.formItem.productName,
            productId: that.formItem.productId,
            isHolidayShow: that.formItem.isHolidayShow
          };
          console.log("from", form);
          add(form).then(res => {
            console.log(res);
            that.$Spin.hide();
            if (res.status == "2000") {
              that.$Message.warning("信息单元选择的信息分类应与信息大类相匹配");
            }
            that.$Message.success("新增成功!");
            // window.location.reload();
            if (idOne == 1) {
              that.$router.push({
                name: "informationSource",
                query: {
                  taskId: res.response.taskId,
                  formationUnitId: res.response.id
                }
              });
            }
            if (idOne == 2) {
              that.$router.push({
                name: "unitMangement"
              });
            }

            // that.$refs[name].resetFields();
          });
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    // 删除某个品类
    deleteBreed(index) {
      this.selectedBreed.splice(index, 1);
    },
    emptyQuery(query) {
      console.log(query);
      if (query == "") {
        this.formItem.siteId = "";
      }
    },
    remoteMethodSite(query) {
      if (query !== "") {
        this.loading1 = true;
        let params = {
          name: query
        };
        this.loading1 = false;
        site(formData(params)).then(res => {
          //console.log(res);
          const list1 = res.response.map(item => {
            return {
              value: item.id,
              label: item.text
            };
          });
          this.optionSite = list1;
        });
      } else {
        //console.log(query)
        this.optionSite = [];
      }
    },
    employeeNum(data) {
      console.log("employeeNum", data);
      this.formItem.employeeNum = data.value;
      this.formItem.executorName = data.label;
    },
    Unitcancel() {
      this.$router.push({
        name: "unitMangement"
      });
    },
    employeeList(query) {
      if (query !== "") {
        //console.log(111)
        this.loading1 = true;
        let params = {
          name: query
        };
        setTimeout(() => {
          this.loading1 = false;
          employee(formData(params)).then(res => {
            console.log(res);
            const list1 = res.response.map(item => {
              return {
                value: item.id,
                label: item.text
              };
            });
            this.optionemployee = list1;
          });
        }, 200);
      } else {
        //console.log(111)
        this.optionSite = [];
      }
    },
    // 关联信息分类结束
    // 关联的品种开始
    remoteMethodVarieties(query) {
      if (query !== "") {
        //console.log(111)
        this.loading1 = true;
        let params = {
          name: query
        };
        setTimeout(() => {
          this.loading1 = false;
          Variety(formData(params)).then(res => {
            //console.log(res);
            const list1 = res.response.map(item => {
              return {
                value: item.id,
                label: item.text
              };
            });
            this.options1 = list1;
          });
        }, 200);
        //console.log('pppp',this.form.informationTypeId);
      } else {
        //console.log(111)
        this.options1 = [];
      }
    },
    RelatedVarieties() {
      this.AssoInforClassVarieties = trues;
    },
    // 关联的品种结束

    // 关联区域开始

    // 关联区域结束
    siteChangeNum(data) {
      //console.log(3333344444)
      //console.log('bangding',this.formItem.Site)
      console.log("baidu", data);
      this.siteChange = data;
    }
  }
};
</script>