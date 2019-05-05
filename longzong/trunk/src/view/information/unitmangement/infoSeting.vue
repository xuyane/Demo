<style lang="less" scoped>
  @import "./addInformationSettings.less";
  .info-detail {
    border-left: 1px solid #ddd;
  }
</style>
<template>
  <Row>
    <Col span="24">
    <Row class-name="add-container">
      <p class="title">信息单元基本信息</p>
      <Col span="24" class="product-opening-table">
      <Form ref="formItem" :model="formItem" :rules='ruleValidate' :label-width="150">
        <FormItem label="信息单元编码:">
          <Input v-model="formItem.code" placeholder="请输入信息单元编码" style="width:60%" disabled></Input>
        </FormItem>
        <FormItem label="信息单元名称:" prop="IsNameNull">
          <Input v-model="formItem.name" placeholder="请输入信息单元名称" style="width:60%" :maxlength="100"></Input>
        </FormItem>
        <FormItem label="站点:">
          <Input v-model="formItem.siteName" placeholder="请输入信息单元名称" style="width:60%" disabled></Input>
        </FormItem>
        <!-- 关联产品 -->
        <select-product @connectProduct="connectProduct" @connectProductDetail="connectProductDetail" :productNameP="formItem.productName"
          :productId="formItem.productId"></select-product>


        <FormItem label="信息大类:" prop="LargeClass">
          <Select class="search-input" style="width:60%" v-model="formItem.type" prop="BigType">
            <Option v-for="item in largeClassInfoList2" :value="item.value" :key="item.desc">{{ item.desc }}</Option>
          </Select>
        </FormItem>
        <!-- 当关联产品为空时，关联信息分类、关联品种名称、关联区域名称、关联企业为可选，否则为不可选 -->
        <Row v-show="!formItem.productName">
          <select-connect ref="selectConnect" @connectInfo="connectInfo" :siteChange="formItem" :informationList="informationList0"
            :istrue=false></select-connect>
          <select-varieties @connectVarieties="connectVarieties" :siteChange="formItem" :informationList="informationList1"></select-varieties>
          <select-area @connectArea="connectArea" :siteChange="formItem" :informationList="informationList2"></select-area>
          <select-enterprise @connectEnterprise="connectEnterprise" :siteChange="formItem" :informationList="informationList3"></select-enterprise>
        </Row>
        <Row v-show="formItem.productName">
          <FormItem label="关联的信息分类:">
            <Row>
              <Col>
              <div class="info-detail" style="width:60%">
                <p v-for=" (item,index) in formItem.InfoClass" :key="index">
                  <span>{{item.name}}</span>
                </p>
              </div>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="关联品种:">
            <Row>
              <Col>
              <div class="info-detail" style="width:60%">
                <p v-for=" (item,index) in formItem.InfoVarieties" :key="index">
                  <span>{{item.name}}</span>
                </p>
              </div>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="关联区域:">
            <Row>
              <Col>
              <div class="info-detail" style="width:60%">
                <p v-for=" (item,index) in formItem.InfoArea" :key="index">
                  <span>{{item.name}}</span>
                </p>
              </div>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="关联企业:">
            <Row>
              <Col>
              <div class="info-detail" style="width:60%">
                <p v-for=" (item,index) in formItem.InfoEnterprise" :key="index">
                  <span>{{item.name}}</span>
                </p>
              </div>
              </Col>
            </Row>
          </FormItem>

        </Row>
        <FormItem label="前端是否展示:" prop="productClassify">
          <Select class="search-input" style="width:60%" v-model="formItem.isShow">
            <Option v-for="item in isShowList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="节假日是否展示:">
          <Select class="search-input" style="width:60%" v-model="formItem.isHolidayShow">
            <Option v-for="item in isHolidayShowList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="默认关键字:" prop="defaultKeywordOne">
          <Input placeholder="请输入默认关键字" style="width:60%" v-model="formItem.defaultKeyword" :maxlength="100"></Input>
        </FormItem>
        <Row>
          <FormItem label="默认文章摘要:" prop="defaultSummaryOne">
            <Col span="20">
            <Input type="textarea" :autosize="{minRows: 5,maxRows: 5}" placeholder="请输入默认文章摘要" style="width:68%" v-model="formItem.defaultSummary" :maxlength="300"></Input>
            </Col>
          </FormItem>
        </Row>
        <FormItem label="默认信息来源网:" prop="defaultSourceOne">
          <Input v-model="formItem.defaultSource" placeholder="请输入默认信息来源网" style="width:60%" :maxlength="50"></Input>
        </FormItem>
        <p class="title">信息任务</p>
        <Row type="flex">
          <Col span="8">
          <FormItem label="发布周期:" prop="releaseCycle">
            <Select class="search-input" v-model="formItem.releaseCycle" @on-change="changeTypeList1" style="width:50%">
              <Option v-for="item in typeList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="8" v-if="formItem.releaseCycle != 0 && formItem.releaseCycle !== ''">
          <FormItem label="要求完成时间:" v-if="formItem.releaseCycle == 1" prop="completeTime1">
            <Select class="search-input" v-model="formItem.completeTime1" @on-change="changeCompleteTime">
              <Option v-for="item in dateWeek" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem label="要求完成时间:" v-if=" formItem.releaseCycle == 2 || formItem.releaseCycle == 3" prop="completeTime1">
            <Select class="search-input" v-model="formItem.completeTime1" @on-change="changeCompleteTime">
              <Option v-for="item in dateMonth" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>

          <FormItem label="要求完成时间:" v-if="formItem.releaseCycle == 4" prop="completeTime2">
            <DatePicker type="date" format="yyyy-MM-dd" v-model="formItem.completeTime2" placeholder="请选择日期" @on-change="changeCompleteTime2"></DatePicker>
          </FormItem>
          </Col>
          <Col span="8">
          <FormItem label="发布次数:">
            <Input type="text" v-model="formItem.releaseCount" class="search-input" style="width:50px"></Input>
            <span>次/周期</span>
          </FormItem>
          </Col>

        </Row>
        <Row>
          <Col span="6">
          <FormItem label="发布时间:" prop="releaseTime">
            <TimePicker type="time" format="HH:mm" v-model="formItem.releaseTime"></TimePicker>
          </FormItem>
          </Col>
        </Row>
        <FormItem label="任务责任人:" prop="TaskResponsibility">
          <Input v-model="formItem.executorName" style="width:50%" disabled></Input>
          <!-- <Select
                    v-model="formItem.executorId"
                    filterable
                    remote
                    :remote-method="employeeList"
                    label-in-value
                    @on-change = "employeeNum"
                    :loading="loading1" style="width:53%">
                    <Option v-for="option in optionemployee" :value="option.value" :key="option.value">{{option.label}}</Option>
                </Select> -->
          <!-- <associate-Search  :dataUrl="urlPersonLiable" ref="personLiableRef" class="search-input"></associate-Search> -->
        </FormItem>
        <Row>
          <FormItem label="备注:" prop="descriptionOne">
            <Col span="20">
            <Input type="textarea" :autosize="{minRows: 5,maxRows: 5}" placeholder="" style="width:68%" v-model="formItem.description" :maxlength="300"></Input>
            </Col>
          </FormItem>
        </Row>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formItem',1)">完成</Button>
          <!-- <Button type="primary" @click="handleSubmit('formItem',2)">保存并返回</Button> -->
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
  import SelectConnect from "./selectConnect2";
  import SelectVarieties from "./selectVarieties";
  import SelectArea from "./selectArea";
  import SelectEnterprise from "./selectEnterprise";
  import SelectProduct from "./selectProduct2";
  // import associateSearch from "../../components/associateSearch/associateSearch.vue";
  import { informationTypeBig } from "./api/unitManageMent";
  import {
    informationType,
    site,
    informationtypeList,
    Variety,
    breedList,
    employee,
    add,
    editDetail,
    saveEdit,
    productDetail
  } from "./api/unitManageMent";
  export default {
    components: {
      SelectConnect,
      SelectVarieties,
      SelectArea,
      SelectEnterprise,
      SelectProduct
      // associateSearch
    },
    data() {
      const validateName = (rule, value, callback) => {
        var regu = /^\s*$/g;
        if (regu.test(this.formItem.name)) {
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
      // const validateCount =  (rule,value,callback)=>{
      //     if(this.formItem.releaseCount == 0 ){
      //         callback(new Error("发布次数不能为0"))
      //     }else{
      //         callback()
      //     }
      //     if(value == null){
      //         callback(new Error('发布次数不能为空'))
      //     }else{
      //         callback()
      //     }
      // }
      const LargeClassList = (rule, value, callback) => {
        if (this.formItem.type === "") {
          //要写为 '===',因为当为数字0时会认为控制报错
          callback(new Error("请选择信息大类"));
        } else {
          callback();
        }
      };
      const validateTime = (rule, value, callback) => {
        if (
          this.formItem.completeTime1 == "" &&
          this.formItem.completeTime2 == ""
        ) {
          if (value == "") {
            callback(new Error("请输入要求完成时间"));
          } else {
            callback();
          }
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
        if ((value == "") & !this.formItem.productId) {
          const res = this.$refs.selectConnect.childValidateFn();
          callback(new Error("不能为空"));
        } else {
          callback();
        }
        if (
          this.$refs.selectConnect.childValidateFn() == undefined ||
          this.$refs.selectConnect.childValidateFn() == false
        ) {
          callback(new Error("不能为空"));
        } else {
          callback();
        }
      };
      const validateInfoSite = (rule, value, callback) => {
        if (this.formItem.siteId == "") {
          callback(new Error("不能为空"));
        } else {
          callback();
        }
      };
      const TaskRes = (rule, value, callback) => {
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
        urlPersonLiable: "/information/select/employee",
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
          completeTime1: 1,
          completeTime2: "",
          description: "",
          InfoClass: [],
          InfoVarieties: [],
          InfoArea: [],
          InfoEnterprise: [],
          productId: 0,
          productName: "",
          isHolidayShow: "0",
          releaseCount: 0
        },
        typeList: [],
        defaultTypeList: "",
        defaultCompleteTime: "",
        changeTime: "",
        yearTime: "",
        clickOnde: true,
        largeClassInfoList: [
          {
            value: 0,
            label: "文章类"
          },
          {
            value: 1,
            label: "行情类"
          },
          {
            value: 2,
            label: "短信类"
          }
        ],
        largeClassInfoList2: [],
        isShowList: [
          {
            value: 0,
            label: "展示"
          },
          {
            value: 1,
            label: "隐藏"
          }
        ],
        isHolidayShowList: [
          {
            value: 0,
            label: "展示"
          },
          {
            value: 1,
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
        dateMonth: [
          { value: 1, label: "1日" },
          { value: 2, label: "2日" },
          { value: 3, label: "3日" },
          { value: 4, label: "4日" },
          { value: 5, label: "5日" },
          { value: 6, label: "6日" },
          { value: 7, label: "7日" },
          { value: 8, label: "8日" },
          { value: 9, label: "9日" },
          { value: 10, label: "10日" },
          { value: 11, label: "11日" },
          { value: 12, label: "12日" },
          { value: 13, label: "13日" },
          { value: 14, label: "14日" },
          { value: 15, label: "15日" },
          { value: 16, label: "16日" },
          { value: 17, label: "17日" },
          { value: 18, label: "18日" },
          { value: 19, label: "19日" },
          { value: 20, label: "20日" },
          { value: 21, label: "21日" },
          { value: 22, label: "22日" },
          { value: 23, label: "23日" },
          { value: 24, label: "24日" },
          { value: 25, label: "25日" },
          { value: 26, label: "26日" },
          { value: 27, label: "27日" },
          { value: 28, label: "28日" },
          { value: 0, label: "月末" }
        ],
        dateWeek: [
          { value: 1, label: "星期一" },
          { value: 2, label: "星期二" },
          { value: 3, label: "星期三" },
          { value: 4, label: "星期四" },
          { value: 5, label: "星期五" },
          { value: 6, label: "星期六" },
          { value: 7, label: "星期日" }
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
          // completeTime1: [
          //     {  required: true,validateor:validateTime, trigger: 'change' }
          // ],
          // completeTime2: [
          //     {  required: true,validateor:validateTime, trigger: 'change' }
          // ],
          // releaseCount: { required: true,type:'number',validateor:validateCount,message: '请输入发布频率', trigger: 'blur' },
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
        productListContent: {}, //关联产品的详细内容
        informationList0: [], //相关信息分类数组
        informationList1: [], //相关品种数组
        informationList2: [], //相关区域数组
        informationList3: [], //相关企业数组
        isShowContent: ""
      };
    },
    created() {
      // this.getListPage();
      this.getInformationTypeBig();
      this.getEditDetail();
      this.employeeList();
    },
    methods: {
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
          that.largeClassInfoList = res.response;
          that.largeClassInfoList2 = that.largeClassInfoList;
        });
      },
      //获取所要编辑信息单元的所有信息
      getEditDetail() {
        let that = this;
        let form = {
          informationUnitId: this.$route.query.informationUnitId
        };
        editDetail(formData(form)).then(res => {
          that.formItem.taskId = res.response.taskId;
          that.formItem.informationUnitId = res.response.id; //信息单元id
          that.formItem.name = res.response.name; //信息单元名称
          that.formItem.code = res.response.code; //信息单元编码
          that.formItem.siteId = res.response.siteId; //获取站点id
          that.formItem.type = res.response.bigType; //获取信息大类
          that.formItem.isShow = res.response.isShow; //前端是否展示
          that.formItem.isHolidayShow = res.response.isHolidayShow; //节假日是否展示
          that.formItem.releaseCycle = res.response.taskCycle; //发布周期
          if (
            that.formItem.releaseCycle == 1 ||
            that.formItem.releaseCycle == 2 ||
            that.formItem.releaseCycle == 3
          ) {
            that.formItem.completeTime1 = res.response.cycleSupplyInfo;
          } else if (that.formItem.releaseCycle == 4) {
            that.formItem.completeTime2 = res.response.publishDate;
          }
          that.formItem.releaseTime = res.response.checkTime; //发布时间
          that.formItem.defaultKeyword = res.response.defaultKeyword; //获取默认关键字
          that.formItem.defaultSummary = res.response.defaultSummary; //获取默认文章摘要
          that.formItem.defaultSource = res.response.defaultSource; //获取默认信息来源
          that.formItem.executorId = res.response.executorId; //获取责任人id
          that.formItem.executorName = res.response.executorName; //获取责任人名称
          that.formItem.releaseCount = res.response.executionNumber; //获取发布次数
          that.formItem.description = res.response.description; //备注
          that.formItem.siteName = res.response.siteName; //站点名称
          that.formItem.productId = res.response.productId;
          that.formItem.productName = res.response.productName;
          //对相关联的数据进行分类
          if (res.response.infoInformationUnitRelationList != null) {
            res.response.infoInformationUnitRelationList.map(val => {
              if (val.relationType == 0) {
                // val.informationTypeRoadName = val.roadName
                that.informationList0.push(val);
              } else if (val.relationType == 1) {
                // val.name = val.roadName
                that.informationList1.push(val);
              } else if (val.relationType == 2) {
                // val.name = val.roadName
                that.informationList2.push(val);
              } else {
                // val.name = val.roadName
                that.informationList3.push(val);
              }
            });
          }
          that.formItem.InfoClass = that.informationList0;
          that.formItem.InfoVarieties = that.informationList1;
          that.formItem.InfoArea = that.informationList2;
          that.formItem.InfoEnterprise = that.informationList3;
        
          if (res.response.productId != null && res.response.productId != 0) {
            that.informationList0 = [];
            that.informationList1 = [];
            that.informationList2 = [];
            that.informationList3 = [];
          }
        });
      },
      connectInfo(val) {
        this.formItem.InfoClass = val;
        let arr = [];
        if (val) {
          // const info = val.reduce((res, item) => {
          //     return res + item.code + ','
          // }, '');
          // this.formItem.info = info;

          for (let i = 0; i < val.length; i++) {
            arr.push(val[i].id);
          }
          this.formItem.info = arr.join(",");
        } else {
          this.formItem.info = "";
        }
      },
      connectVarieties(val) {
        this.formItem.InfoVarieties = val;
      },
      connectArea(val) {
        this.formItem.InfoArea = val;
      },
      connectEnterprise(val) {
        this.formItem.InfoEnterprise = val;
      },
      //关联产品
      connectProduct(val) {

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
          this.largeClassInfoList.map((el, index) => {
            if (el.value == val.type) {
              this.largeClassInfoList2 = [];
              this.largeClassInfoList2.push(this.largeClassInfoList[index]);
            }
          });
        } else {
          this.formItem.productName = "";
          this.formItem.productId = "";
          this.productListContent = "";
          this.largeClassInfoList2 = [];
          this.largeClassInfoList2 = this.largeClassInfoList;
          this.formItem.InfoClass = "";
          this.formItem.InfoVarieties = "";
          this.formItem.InfoArea = "";
          this.formItem.InfoEnterprise = "";
        }
      },
      //升级产品获取的值
      connectProductDetail(val) {
        this.formItem.InfoClass = val.messageCatagoryList;
        this.formItem.InfoVarieties = val.breedList;
        this.formItem.InfoArea = val.areaList;
        this.formItem.InfoEnterprise = val.enterpriseList;
        this.formItem.type = val.type;
        this.formItem.productName = val.name;
        this.$Message.success("产品升级成功");
      },
      // ---
      changeTypeList1(val) {
        this.formItem.completeTime1 = "";
        this.formItem.completeTime2 = "1";
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
        this.formItem.completeTime1 = val;
      },
      changeCompleteTime2(val, data) {
        this.formItem.completeTime2 = val;
      },
      // 关联信息分类结束
      handleSubmit(name, idOne) {
        let that = this;
        // debugger;
        this.$refs[name].validate(valid => {

          this.objList = [];
          if (valid) {
            let Connect = that.formItem.InfoClass;
            let ConVariet = that.formItem.InfoVarieties;
            let ConArea = that.formItem.InfoArea;
            let ConEnter = that.formItem.InfoEnterprise;
           
            Connect.map(item => {
              let obj = {
                relationType: 0,
                relationId: item.id
              };
              this.objList.push(obj);
            });
            if (ConVariet.length > 0) {
              ConVariet.map(item => {
                let obj = {
                  relationType: 1,
                  relationId: item.id
                };
                this.objList.push(obj);
              });
            }
            if (ConArea.length > 0) {
              ConArea.map(item => {
                let obj = {
                  relationType: 2,
                  relationId: item.id
                };
                this.objList.push(obj);
              });
            }
            if (ConEnter.length > 0) {
              ConEnter.map(item => {
                let obj = {
                  relationType: 3,
                  relationId: item.id
                };
                this.objList.push(obj);
              });
            }

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
              one = formatStamp(that.formItem.completeTime2);
            }

            this.$Spin.show();
            if (that.formItem.releaseCount <= 0) {
              that.formItem.releaseCount = 1;
            }
            let form = {
              taskId: that.formItem.taskId,
              id: that.formItem.informationUnitId,
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
            saveEdit(form).then(res => {
              that.$Spin.hide();
              that.$Message.success("保存成功!");
              // window.location.reload();
              if (idOne == 1) {
                that.$router.push({
                  name: "unitMangement"
                });
              }
              // if(idOne==2){
              //      that.$router.push({
              //         name: "unitMangement"
              //     });
              // }

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
            const list1 = res.response.map(item => {
              return {
                value: item.id,
                label: item.text
              };
            });
            this.optionSite = list1;
          });
        } else {
          this.optionSite = [];
        }
      },
      employeeNum(data) {
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
          this.loading1 = true;
          let params = {
            name: query
          };
          setTimeout(() => {
            this.loading1 = false;
            employee(formData(params)).then(res => {
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
          this.optionSite = [];
        }
      },
      // 关联信息分类结束
      // 关联的品种开始
      remoteMethodVarieties(query) {
        if (query !== "") {
          this.loading1 = true;
          let params = {
            name: query
          };
          setTimeout(() => {
            this.loading1 = false;
            Variety(formData(params)).then(res => {
              const list1 = res.response.map(item => {
                return {
                  value: item.id,
                  label: item.text
                };
              });
              this.options1 = list1;
            });
          }, 200);
        } else {
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
        this.siteChange = data;
      }
    },
    watch: {
      informationList0(newV, oldV) {
        this.informationList0 = newV;
      }
    }
  };
</script>