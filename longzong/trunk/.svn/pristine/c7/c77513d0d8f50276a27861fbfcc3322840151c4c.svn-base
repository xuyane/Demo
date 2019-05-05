<style lang="less" scoped>
</style>
<template>
  <Row>
    <Col span="24">
    <Row class-name="current-position">
      当前位置：基础数据管理&nbsp;&nbsp;>>&nbsp;&nbsp;企业库管理>>&nbsp;&nbsp;企业编辑
    </Row>
    </Col>
    <Form ref="enterpriseFormValidate" :model="form" :rules="enterpriseRoles" :label-width="200">
      <Col span="24">
      <Row>
        <Col span="24">
        <p class="sms-detail-con left top right">企业基础信息</p>
        </Col>
      </Row>
      <Row>
        <Col span="6">
        <p class="sms-detail-con left top">企业名称:</p>
        </Col>
        <Col span="6" class="sms-detail-con top left" prop="enterpriseName">
        <Input v-model="form.enterpriseName" @on-change="changeDatapinyin" class="search-input"></Input>
        </Col>
        <Col span="6">
        <p class="sms-detail-con top left">全拼:</p>
        </Col>
        <Col span="6" class="sms-detail-con top left right" prop="">
        <Input v-model="form.fullPinyin" class="search-input"></Input>
        </Col>
      </Row>
      <Row>
        <Col span="6">
        <p class="sms-detail-con left top">简拼:</p>
        </Col>
        <Col span="6" class="sms-detail-con top left">
        <Input v-model="form.simplePinyin" class="search-input"></Input>
        </Col>
        <Col span="6">
        <p class="sms-detail-con top left">简称:</p>
        </Col>
        <Col span="6" class="sms-detail-con top left right">
        <Input v-model="form.simpleName" @on-change="changeDataSuoxie" class="search-input"></Input>
        </Col>
      </Row>
      <Row>
        <Col span="6">
        <p class="sms-detail-con left top">简称简拼:</p>
        </Col>
        <Col span="6" class="sms-detail-con top left">
        <Input v-model="form.simpleNamePinyin" class="search-input"></Input>
        </Col>
        <Col span="6">
        <p class="sms-detail-con top left">英文名:</p>
        </Col>
        <Col span="6" class="sms-detail-con top left right">
        <Input v-model="form.enName" class="search-input"></Input>
        </Col>
      </Row>
      <Row>
        <Col span="6">
        <p class="sms-detail-con left top">日文名:</p>
        </Col>
        <Col span="6" class="sms-detail-con top left">
        <Input v-model="form.jpName" class="search-input"></Input>
        </Col>
        <Col span="6">
        <p class="sms-detail-con top left">企业类型:</p>
        </Col>
        <Col span="6" class="sms-detail-con top left right">
        <FormItem>
          <Select v-model="form.enterpeiseNatureList" class="form-select  col-75" style="margin-left:38px">
            <Option v-for="item in enterpeiseNatureList" :value="item.value" :key="item.value">{{ item.desc }}</Option>
          </Select>
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="6">
        <p class="sms-detail-large left top line-height-160" style="overflow: hidden">企业性质:</p>
        </Col>
        <Col span="6" class="sms-detail-large top left" style="padding-top:60px; overflow: inherit;z-index：1000">
        <FormItem>
          <Select v-model="form.enterpeiseTypeList" class="form-select  col-75">
            <Option v-for="item in enterpeiseTypeList" :value="item.value" :key="item.value">{{ item.desc }}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="6">
        <p class="sms-detail-large top left line-height-160" style="overflow: hidden">行业类型:</p>
        </Col>
        <Col span="6" class="sms-detail-large top left right ">
          <Col span="15">
          <associate-Search @query-list="industryTypeFunction" :dataUrl="urlIndustry" ref="breedParentRef" class="form-select"></associate-Search>
          </Col>
          <Col span="9">
          <Button type="primary" class="search-btn pull-right" @click="showselect">选择关联</Button>
          </Col>
          <Col span="24" style="margin-top:5px;text-align:center">
          <table border="0" cellspacing="0">
            <tr v-for="(item, index) in industryTypeTable" :key="item.value">
              <td>
                <p style="max-width: 100%;text-align: left;margin-left: 20px">
                  <span>{{item.label}}</span>
                  <b class="icon-delete pull-right" @click="removeRight(index, item.value)"></b>
                </p>
              </td>
            </tr>
          </table>
          </Col>
        </Col>
      </Row>
      <Row>
        <Col span="6">
        <p class="sms-detail-con left top">联系电话:</p>
        </Col>
        <Col span="6" class="sms-detail-con top left">
        <Input v-model="form.telephone" class="search-input"></Input>
        </Col>
        <Col span="6">
        <p class="sms-detail-con top left">传真号码:</p>
        </Col>
        <Col span="6" class="sms-detail-con top left right">
        <Input v-model="form.tax" class="search-input"></Input>
        </Col>
      </Row>
      <Row>
        <Col span="6">
        <p class="sms-detail-con left top">区域:</p>
        </Col>
        <Col span="6" class="sms-detail-con top left">
        <associate-Search @query-list="areaFunction" :dataUrl="url" class="search-input"></associate-Search>
        </Col>
        <Col span="6">
        <p class="sms-detail-con top left">详细地址:</p>
        </Col>
        <Col span="6" class="sms-detail-con top left right">
        <Input v-model="form.address" class="search-input"></Input>
        </Col>
      </Row>
      <Row>
        <Col span="6">
        <p class="sms-detail-con left top">邮件地址:</p>
        </Col>
        <Col span="6" class="sms-detail-con top left">
        <Input v-model="form.email" class="search-input"></Input>
        </Col>
        <Col span="6">
        <p class="sms-detail-con top left">邮件地址(英文):</p>
        </Col>
        <Col span="6" class="sms-detail-con top left right">
        <Input v-model="form.emailEn" class="search-input"></Input>
        </Col>
      </Row>
      <Row>
        <Col span="6">
        <p class="sms-detail-con left top">邮编:</p>
        </Col>
        <Col span="6" class="sms-detail-con top left">
        <Input v-model="form.zipCode" class="search-input"></Input>
        </Col>
        <Col span="6">
        <p class="sms-detail-con top left"></p>
        </Col>
        <Col span="6" class="sms-detail-con top left right"></Col>
      </Row>
      <Row>
        <Col span="24">
        <p class="sms-detail-con left top right">工商数据信息</p>
        </Col>
      </Row>
      <Row>
        <Col span="6">
        <p class="sms-detail-con left top">成立日期:</p>
        </Col>
        <Col span="6" class="sms-detail-con top left">
        <Input v-model="form.createDate" class="search-input"></Input>
        </Col>
        <Col span="6">
        <p class="sms-detail-con top left">注册资本:</p>
        </Col>
        <Col span="6" class="sms-detail-con top left right">
        <Input v-model="form.registeredCapital" class="search-input"></Input>
        </Col>
      </Row>
      <Row>
        <Col span="6">
        <p class="sms-detail-con left top">法人:</p>
        </Col>
        <Col span="6" class="sms-detail-con top left">
        <Input v-model="form.corporation" class="search-input"></Input>
        </Col>
        <Col span="6">
        <p class="sms-detail-con top left">社会信用代码:</p>
        </Col>
        <Col span="6" class="sms-detail-con top left right">
        <Input v-model="form.socialCreditCode" class="search-input"></Input>
        </Col>
      </Row>
      <Row>
        <Col span="6">
        <p class="sms-detail-con left top">企业人数:</p>
        </Col>
        <Col span="6" class="sms-detail-con top left">
        <InputNumber class="search-input" placeholder="请输入短号"></InputNumber>
        </Col>
        <Col span="6">
        <p class="sms-detail-con top left">企业产值:</p>
        </Col>
        <Col span="6" class="sms-detail-con top left right">
        <InputNumber class="search-input" placeholder="请输入短号"></InputNumber>
        </Col>
      </Row>
      <Row>
        <Col span="6">
        <p class="sms-detail-con left top">企业网站:</p>
        </Col>
        <Col span="6" class="sms-detail-con top left">
        <Input v-model="form.enterpriseWebsite" class="search-input"></Input>
        </Col>
        <Col span="6">
        <p class="sms-detail-con top left"></p>
        </Col>
        <Col span="6" class="sms-detail-con top left right"></Col>
      </Row>
      <Row>
        <Col span="6">
        <p class="sms-detail-con left top">企业简述:</p>
        </Col>
        <Col span="18" class="sms-detail-con top left right">
        <Input v-model="form.enterpriseDescription" class="search-input-lager" size="large"></Input>
        </Col>
      </Row>
      <Row class="left top bottom right">
        <Col span="6">
        <p class="sms-detail-lr">企业经营范围:</p>
        </Col>
        <Col span="18" class="sms-detail-lr left ">
        <Input v-model="form.enterpriseOperateRange" class="textarea" type="textarea" :autosize="{minRows: 5,maxRows: 15}"></Input>
        </Col>
      </Row>
      </Col>
    </form>
    <Col span="24" class="margin-top-18" style="text-align: center;">
    <div class="btn-container">
      <Button type="primary" class="search-btn" @click="doAdd">确定</Button>
      <Button type="primary" class="search-btn">取消</Button>
    </div>
    </Col>
    <Modal v-model="showselectModal" title="选择品种类别" @on-ok="doEdit" :loading="loading" :width="900" @on-cancel="doCancel" class="selectgg">
      <Form ref="selectModal" :model="selectform" :label-width="100">
        <Row>
          <Col span="16">
          <FormItem label="行业类型名称" class="">
            <Input v-model="selectform.name" class="search-input" placeholder="请输入行业类型名称"></Input>
          </FormItem>
          </Col>
          <Col span="8">
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

export default {
  name: "createEnterpriseInfo",
  components: {
    oilPage,
    associateSearch
  },
  data() {
    return {
      showselectModal: false,
      loading: false,
      loading1: false,
      loading2: false,
      selectRow: [],
      urlIndustry: "/basedata/select/industry_type", //行业性质
      url: "/basedata/select/area",
      industryTypeTable: [],
      form: {
        enterpriseName: "",
        simpleName: "",
        fullPinyin: "",
        simplePinyin: "",
        simpleNamePinyin: "",
        enName: "",
        jpName: "",
        enterpriseType: "",
        enterpriseNature: "",
        industryType: "",
        telephone: "",
        tax: "",
        address: "",
        email: "",
        emailEn: "",
        zipCode: "",
        createDate: "",
        registeredCapital: "",
        corporation: "",
        socialCreditCode: "",
        enterpriseOutputValue: "",
        enterpriseDescription: "",
        enterpriseOperateRange: ""
      },
      selectform: {
        name: ""
      },
      pageSizeOpts: [10, 20, 50, 100, 200],
      showSizer: true,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      enterpeiseNatureList: [],
      enterpeiseTypeList: [],
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "行业类型编号",
          key: "id"
        },
        {
          title: "行业类型名称",
          key: "name"
        }
      ],
      dataTable: [],
      enterpriseRoles: {
        enterpriseName: [
          { required: true, message: "请输入产品名称", trigger: "blur" },
          {
            type: "string",
            max: 100,
            message: "产品名称不能超过100个字符",
            trigger: "blur"
          }
        ],
        fullPinyin: [
          { required: true, message: "请输入产品名称", trigger: "blur" },
          {
            type: "string",
            max: 100,
            message: "产品名称不能超过100个字符",
            trigger: "blur"
          }
        ],
        simplePinyin: [
          { required: true, message: "请输入产品名称", trigger: "blur" },
          {
            type: "string",
            max: 100,
            message: "产品名称不能超过100个字符",
            trigger: "blur"
          }
        ],
        simpleName: [
          { required: true, message: "请输入产品名称", trigger: "blur" },
          {
            type: "string",
            max: 100,
            message: "产品名称不能超过100个字符",
            trigger: "blur"
          }
        ],
        simpleNamePinyin: [
          { required: true, message: "请输入产品名称", trigger: "blur" },
          {
            type: "string",
            max: 100,
            message: "产品名称不能超过100个字符",
            trigger: "blur"
          }
        ],
        enName: [
          { required: true, message: "请输入产品名称", trigger: "blur" },
          {
            type: "string",
            max: 100,
            message: "产品名称不能超过100个字符",
            trigger: "blur"
          }
        ],
        jpName: [
          { required: true, message: "请输入产品名称", trigger: "blur" },
          {
            type: "string",
            max: 100,
            message: "产品名称不能超过100个字符",
            trigger: "blur"
          }
        ],
        enterpriseType: [
          { required: true, message: "请输入产品名称", trigger: "blur" },
          {
            type: "string",
            max: 100,
            message: "产品名称不能超过100个字符",
            trigger: "blur"
          }
        ],
        enterpriseNature: [
          { required: true, message: "请输入产品名称", trigger: "blur" },
          {
            type: "string",
            max: 100,
            message: "产品名称不能超过100个字符",
            trigger: "blur"
          }
        ],
        industryType: [
          { required: true, message: "请输入产品名称", trigger: "blur" },
          {
            type: "string",
            max: 100,
            message: "产品名称不能超过100个字符",
            trigger: "blur"
          }
        ],
        telephone: [
          { required: true, message: "请输入产品名称", trigger: "blur" },
          {
            type: "string",
            max: 100,
            message: "产品名称不能超过100个字符",
            trigger: "blur"
          }
        ],
        tax: [
          { required: true, message: "请输入产品名称", trigger: "blur" },
          {
            type: "string",
            max: 100,
            message: "产品名称不能超过100个字符",
            trigger: "blur"
          }
        ],
        address: [
          { required: true, message: "请输入产品名称", trigger: "blur" },
          {
            type: "string",
            max: 100,
            message: "产品名称不能超过100个字符",
            trigger: "blur"
          }
        ],
        email: [
          { required: true, message: "请输入产品名称", trigger: "blur" },
          {
            type: "string",
            max: 100,
            message: "产品名称不能超过100个字符",
            trigger: "blur"
          }
        ],
        emailEn: [
          { required: true, message: "请输入产品名称", trigger: "blur" },
          {
            type: "string",
            max: 100,
            message: "产品名称不能超过100个字符",
            trigger: "blur"
          }
        ],
        zipCode: [
          { required: true, message: "请输入产品名称", trigger: "blur" },
          {
            type: "string",
            max: 100,
            message: "产品名称不能超过100个字符",
            trigger: "blur"
          }
        ],
        createDate: [
          { required: true, message: "请输入产品名称", trigger: "blur" },
          {
            type: "string",
            max: 100,
            message: "产品名称不能超过100个字符",
            trigger: "blur"
          }
        ],
        registeredCapital: [
          { required: true, message: "请输入产品名称", trigger: "blur" },
          {
            type: "string",
            max: 100,
            message: "产品名称不能超过100个字符",
            trigger: "blur"
          }
        ],
        corporation: [
          { required: true, message: "请输入产品名称", trigger: "blur" },
          {
            type: "string",
            max: 100,
            message: "产品名称不能超过100个字符",
            trigger: "blur"
          }
        ],
        socialCreditCode: [
          { required: true, message: "请输入产品名称", trigger: "blur" },
          {
            type: "string",
            max: 100,
            message: "产品名称不能超过100个字符",
            trigger: "blur"
          }
        ],
        enterpriseOutputValue: [
          { required: true, message: "请输入产品名称", trigger: "blur" },
          {
            type: "string",
            max: 100,
            message: "产品名称不能超过100个字符",
            trigger: "blur"
          }
        ],
        enterpriseDescription: [
          { required: true, message: "请输入产品名称", trigger: "blur" },
          {
            type: "string",
            max: 100,
            message: "产品名称不能超过100个字符",
            trigger: "blur"
          }
        ],
        enterpriseOperateRange: [
          { required: true, message: "请输入产品名称", trigger: "blur" },
          {
            type: "string",
            max: 100,
            message: "产品名称不能超过100个字符",
            trigger: "blur"
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
  },
  methods: {
    //点击确定后新增
    doAdd() {
      var that = this;
      let form = {
        address: that.form.address,
        areaCode: "",
        areaId: 0,
        areaName: "",
        areaPhoneCode: "",
        description: that.form.enterpriseDescription,
        email: that.form.email,
        enterpriseIcInfoVO: {
          businessTermEnd: 0,
          businessTermStart: 0,
          capacity: "",
          chargePerson: "",
          createTime: 0,
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
          licenseFilePath: "",
          licenseNo: "",
          operateScope: "",
          personNumber: "",
          registeredCapital: "",
          sign: ""
        },
        fax: that.form.fax,
        id: 0,
        industryTypes: "",
        jp: this.form.simplePinyin,
        name: this.form.enterpriseName,
        nameEn: this.form.enName,
        nameJa: "",
        natrueDesc: "",
        nature: 0,
        phone: "",
        postcode: "",
        qp: this.form.fullPinyin,
        shortName: this.form.simpleName,
        shortNameEn: "",
        shortNameJa: "",
        sign: "",
        stateCode: "",
        status: 0,
        statusDesc: "",
        type: 0,
        typeDesc: "",
        website: ""
      };
      this.$refs.enterpriseFormValidate.validate(valid => {
        if (valid) {
          // axios.post("/basedata/enterprise/add", form).then(function(res) {
      //     if (res.data.status == 200) {
      //     that.$Message.warning("新增成功");
      //     that.$router.push({ path: "/enterpriseContact" });
      //     } else {
      //     that.$Message.warning(res.data.message);
      //     }
      // });
        }
      })
      
    },
    doCancel() {
      this.$emit("hide-modal");
    },
    // 监听选中项发生变化
    handleRowChange(row) {
      this.selectRow = row;
    },
    //初始化企业类型
    initEnterpeiseType() {
      var that = this;
      axios({
        url: "/basedata/select/enterpeise_type",
        method: "post",
        data: {}
      }).then(function(resp) {
        that.enterpeiseTypeList = resp.data.response;
      });
    },
    //区域模糊搜索
    areaFunction(areaData) {
      this.areaData = areaData;
    },
    //获取从联想搜索框里取到的值
    industryTypeFunction(data) {
      if(this.isRepeatIndustry(data.value)){
        this.industryTypeTable.push(data);
      }
    },
    // 删除行业类型
    removeRight(index, key) {
      let number = this.targetKeys.indexOf(key);
      if (number !== -1) {
        this.targetKeys.splice(number, 1);
      }
      this.industryTypeTable.splice(index, 1);
    },
    //初始化企业性质
    initEnterpeiseNature() {
      var that = this;
      axios({
        url: "/basedata/select/enterpeise_nature",
        method: "post",
        data: {}
      }).then(function(resp) {
        that.enterpeiseNatureList = resp.data.response;
      });
    },
    //判断行业类型是否重复
    isRepeatIndustry(value) {
      if (this.industryTypeTable.length > 0) {
        let industryTypeArr = [];
        for (let j = 0; j < this.industryTypeTable.length; j++) {
          industryTypeArr.push(this.industryTypeTable[j].value);
        }
        if (industryTypeArr.indexOf(value) == -1) {
          return true;
        }
      } else {
        return true;
      }
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
        if(this.isRepeatIndustry(obj.value)){
          this.industryTypeTable.push(obj);
        }
      }
      that.$emit("hide-modal");
    },
    //选择行业类型
    showselect() {
      this.showselectModal = true;
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
    changeDatapinyin(){
      this.form.fullPinyin = pinyin.getFullChars(this.form.enterpriseName);
      this.form.simplePinyin = pinyin.getCamelChars(this.form.enterpriseName);
    },
    //改变缩写的拼音
    changeDataSuoxie(){
        this.form.simpleNamePinyin = pinyin.getCamelChars(this.form.simpleName);
    }
  }
};
</script>
