<style lang="less" scoped>
  // @import "./sms.less";
  th {
    height: 40px;
    line-height: 40px;
    background: #ebf2fe;
  }
  
.table-b{
  background-clip:padding-box;
}
.table-b,th{    
    border:0.5px solid 	#808080;
} 

.table-b,td{    
    border: 0.5px solid 	#808080; 
    border-bottom:0;      
    border-left:0;  
     
} 
.table-b,td:last-child{
    border: 0.5px solid#808080;      
    border-left:0;  

} 
.table-b,td:first-child{
  border: 0.5px solid 	#808080;          
}
</style>

<template>
  <Row>
    <Col span="24">
    <Row class-name="current-position">
      当前位置：产品中心&nbsp;&nbsp;>>&nbsp;&nbsp;短信产品
    </Row>
    </Col>
    <Col span="24" class="margin-top-18">
    <Row class-name="add-container">
      <p class="title">新增套餐</p>
    </Row>
    <Row class-name="form-container">
      <Col :lg="16" :md="24">
      <Form ref="smsForm" :model="smsForm" :rules="formRoles" :label-width="120">
        <Row class="mar-b-20">
          <div class="step-container" style="padding-top: 0">
            <span class="step1 active">基础信息</span>
          </div>
        </Row>
        <Row>
          <Col span="12">
          <FormItem label="产品名称:" prop="smsName">
            <Input v-model="smsForm.smsName" class="search-input" placeholder="请输入产品名称"></Input>
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem label="英文名称:" prop="smsNameEn">
            <Input v-model="smsForm.smsNameEn" class="search-input" placeholder="请输入英文名称"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
          <FormItem label="产品分类:">
            <Select v-model="smsForm.smsProductClassify" class="form-select">
              <Option v-for="item in smsProductClassifyList" :value="item.value" :key="item.value">{{item.label}}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem label="面向企业类型:">
            <Select v-model="smsForm.busniessType" label-in-value class="form-select" placeholder="请选择面向企业类型" multiple>
              <Option v-for="item in enterPriseList" :value="item" :key="item">{{item}}</Option>
            </Select>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
          <span>
            <FormItem label="产品简称:">
              <!-- prop="smsShortName" -->
              <Input v-model="smsForm.smsShortName" class="search-input" placeholder="请输入产品简称"></Input>
            </FormItem>
          </span>
          </Col>
          <Col span="12">
          <FormItem label="英文简称:" prop="smsShortNameEn">
            <Input v-model="smsForm.smsShortNameEn" class="search-input" placeholder="请输入英文简称"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <FormItem label="源产品:" class="tips ivu-form-item-label">
            <Button type="primary" class="choose-btn" @click="showSourceModal">请选择</Button>
          </FormItem>
        </Row>
        <Row>
          <Col span="19" v-show="rightData.length > 0">
          <FormItem :class="isSpread ? 'openMore' : 'closeMore'">
            <Col class="pull-left" v-for="(item,index) in rightData" :key="item.key"> {{item.name}}
            <!-- <span class="blue">价格：{{item.price}}</span> -->
            <b class="icon-delete" @click="deleteProduct(index, item.key)"></b>
            </Col>
          </FormItem>
          </Col>
          <!-- <Col span="5" style="position: absolute;bottom: 30px; right: 0" v-show="rightData.length > 6">
                                {{spreadText}}<b class="icon-more" @click="changeShow"></b>
                            </Col> -->
        </Row>
        <Row>
          <Col span="24">
          <FormItem label="产品描述:">
            <Input v-model="smsForm.smsProductDesc" :maxlength="500" class="textarea" type="textarea" :autosize="{minRows: 5,maxRows: 15}"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="24">
          <FormItem label="英文描述:">
            <Input v-model="smsForm.smsProductDescEn" :maxlength="500" class="textarea" type="textarea" :autosize="{minRows: 5,maxRows: 15}"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row class-name="add-container" style="padding: 10px 20px 20px">
          <div class="step-container" style="padding-top:0;padding-left:0">
            <span class="step1 active">定价信息</span>
          </div>
        </Row>
        <Row>
          <Col span="12">
          <FormItem label="系统销售价:" prop="productPrice">
            <Input number style="width: 120px" :max="99999999" :min="0" v-model="smsForm.productPrice" class="search-input"></Input>
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem label="折后优惠比例:" prop="productRate">
            <Input number style="width: 120px" :min="0" v-model="smsForm.productRate" class="search-input"></Input>%
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
          <FormItem label="市场销售价:">
            {{afterDiscountPrice}}
          </FormItem>
          </Col>
          <Col span="12" style="display:flex;">
          <FormItem label="单位:">
            <!-- <span style="font-size:14px;">{{smsForm.unit}}</span> -->
            <span style="font-size:14px;">人民币</span>
          </FormItem>
          <span style="margin: 10px">/</span>
          <FormItem prop="month" style="margin-left: -100px">
            <Select v-model="smsForm.month" style="width:120px;height:36px;" placeholder="请选择">
              <Option v-for="month in monthList" :value="month.value" :key="month.value">{{ month.label }}</Option>
            </Select>
          </FormItem>
          </Col>
        </Row>
        <Row class="mar-t-15">
          <Col span="12">
          <span style="color:#ed4014;">*</span>
          <span class="mar-r-20">业务归属品种及分成比例</span>
          <Button type="primary" style="width: 200px" @click="typeModal = true">请选择</Button>
          </Col>
        </Row>
        <Row class="mar-t-15">
          <table border="0" cellspacing="0" class="table-b">
            <Col span="24">
            <th width="100">序号</th>
            <th width="500">业务归属品种</th>
            <th width="300">分成比例（总和100%）</th>
            <tbody>
              <tr v-for="(item, index) in selectBreeds" :key="item.breedId">
                <td style="padding: 0 30px" class="text-center">{{index+1}}</td>
                <td>
                  <p style="width: 400px;max-width: 100%;text-align: left;margin-left: 20px">
                    <span>{{item.breedName}}</span>
                    <b class="icon-delete pull-right" @click="deleteBreed(index)"></b>
                  </p>
                </td>
                <td>
                  <InputNumber :max="100" v-model="item.percent" :formatter="value => `${value}%`" :parser="value => value.replace('%', '')"
                    class="search-input" style="width: 260px;margin:10px 5px"></InputNumber>
                </td>
              </tr>
            </tbody>
            </Col>
          </table>
          <div style="color: red">{{rateMsg}}</div>
        </Row>

      </Form>
      </Col>
      <Col span="24" class="mar-t-20" style="text-align:center;">
      <div class="btn-container" style="width: 1200px">
        <Button type="primary" class="search-btn" @click="addSmsProduct">提交</Button>
        <Button class="search-btn" @click="voidSms">取消</Button>
      </div>
      </Col>
    </Row>
    </Col>
    <Modal v-model="sourceModal" title="源产品" width="1300px" @on-ok="ok" @on-cancel="cancel">
      <Form :label-width="100">
        <Row type="flex" justify="space-between">
          <Col span="6">
          <FormItem label="产品名称:">
            <Input v-model="productNameValue" class="search-input" placeholder="请输入产品名称"></Input>
          </FormItem>
          </Col>
          <Col span="6">
          <FormItem label="品种:">
            <Input v-model="productBreedValue" class="search-input" readonly @on-focus="productValueData('品种')" placeholder="请选择品种"></Input>
          </FormItem>
          </Col>
          <Col span="6">
          <FormItem label="区域:">
            <Input v-model="productAreaValue" class="search-input" readonly @on-focus="productValueData('区域')" placeholder="请选择区域"></Input>
          </FormItem>
          </Col>
          <Col span="6" class="text-right">
          <Button type="primary" @click="searchListPage">查询</Button>
          <Button style="margin-left: 8px" @click="clear">重置</Button>
          </Col>
        </Row>
      </Form>
      <Transfer :data="leftData" :list-style="listStyle" :target-keys="targetKeys"  :render-format="renderFormat" :filter-method="filterMethod"
        @on-change="handleChange" >
      </Transfer>
    </Modal>
    <Modal v-model="typeModal" title="品种选择" @on-ok="doOk" @on-cancel="cancel">
      <p class="text-right">
        <span class="pointer">
          <i class="icon-remove" @click="clearInfo"></i>
          <span class="mar-r-20">清空所选</span>
        </span>
        <span class="pointer">
          <i class="icon-frash"></i>
          <span class="mar-r-20" @click="getBreedData">重新加载</span>
        </span>
      </p>
      <Tree :data="breedList" ref="breedRef" @on-check-change="checkedBreedChange" :load-data="loadBreedDataList" show-checkbox></Tree>
    </Modal>
    <Modal v-model="ModelData" :title="modalTitle" @on-cancel="cancel">
      <div style="max-height: 300px;overflow: auto;">
        <Tree v-if="modalTitle == '品种'" ref="breedRef" :data="breedList" :load-data="loadBreedDataListValue" show-checkbox></Tree>
        <Tree v-if="modalTitle == '区域'" :data="cityDataTree" ref="cityRef" :load-data="loadCityData" show-checkbox></Tree>
      </div>
      <div slot="footer">
        <Button type="primary" @click="okqueding">确定</Button>
        <Button @click="cancelquxiao">取消</Button>
      </div>
    </Modal>
  </Row>
</template>

<script>
  import axios from "axios";
  import { loadBreedData, breedMap, arrQC } from '../components/productCenter/productCenter.js'
  import { sourceProList, proSmsInsert, enterPriseList, getProductTreeList, fourdimension, breedTypeList,selectAreaList } from '../components/axios/productCenter.js'
  export default {
    name: "addSms",
    props: {
      breeds: Array
    },
    data() {
      const productRateNumber = (rule, value, callback) => {
        let res = /([0-9]+\.[0-9]{3})[0-9]*/
        if (res.test(value)) {
          callback(new Error('请输入最多两位小数数字'))
        } else if (value == '' || value == '') {
          callback(new Error('请输入优惠折扣'))
        } else {
          callback()
        }
      };
      const productPriceRateNumber = (rule, value, callback) => {
        // 模拟异步验证效果
        if (!Number.isInteger(+value)) {
          callback(new Error('请输入数字'))
        } else if (value == '' || value == '') {
          callback(new Error('请输入系统销售价'))
        } else {
          callback()
        }
      };
      //检验产品名称是否重复
      const validateName = (rule, value, callback) => {
        let pro = this.smsForm;
        if (pro.productName && pro.productNameEn) {
          axios
            .post("/product/product/checkProNameUnique", {
              proCategoryCode: that.smsForm.smsProductClassify,
              proNameCN: this.smsForm.smsName,
              proNameEN: this.smsForm.smsNameEn
            })
            .then(res => {
              if (res.data.message === "OK") {
                callback();
              } else {
                callback(new Error(res.data.message));
              }
            });
        } else {
          callback();
        }
      };
      return {
        breedIds: [],
        areaIds: [],
        modalTitle:'',
        ModelData:false,
        productAreaValue:'',
        productBreedValue:'',
        productNameValue:'',
        listStyle: {
          width: '600px',
          height: "380px"
        },
        spreadText: "展开",
        isSpread: false,
        isReadOnly: true,
        breedModel: "",
        loading: false,
        typeModal: false,
        breedList: [],
        cityDataTree:[],
        selectBreeds: [],
        leftData: [],
        rightData: [],
        targetKeys: [],
        selectedBreedList: [],
        sourceModal: false,
        // moneyList: [
        //   {
        //     value: 0,
        //     label: '人民币'
        //   }],
        monthList: [
          {
            value: 0,
            label: '次'
          },
          {
            value: 1,
            label: '月'
          },
          {
            value: 2,
            label: '年'
          }
        ],
        enterPriseList: [],
        stautsList: [],
        times: "",
        coin: "",
        smsForm: {
          smsName: "",
          smsNameEn: "",
          smsShortName: "",
          smsShortNameEn: "",
          smsClassify: "",
          smsProductClassify: "002001",
          busniessType: "",
          productPrice: 0,
          productRate: 100,
          afterDiscountPrice: 0,
          smsProductDesc: "",
          // unit: "人民币",
          unit: 0,
          month: 2,
          rate: []
        },
        propertionList: [],
        smsProductClassifyList: [
          {
            value: "002001",
            label: "短信"
          },
          {
            value: "002002",
            label: "短讯通"
          },
        ],
        formRoles: {
          smsName: [
            { required: true, message: "请输入产品名称", trigger: "blur" },
            {
              type: "string",
              max: 100,
              message: "产品名称不能超过100个字符",
              trigger: "blur"
            }
          ],
          smsNameEn: [
            { required: false, message: "请输入英文名称", trigger: "blur" },
            {
              type: "string",
              max: 200,
              message: "英文名称不能超过200个字符",
              trigger: "blur"
            },
            {
              validator: validateName,
              trigger: "blur"
            }
          ],
          smsShortName: [
            { required: true, message: "请输入产品简称", trigger: "blur" },
            {
              type: "string",
              max: 100,
              message: "产品简称不能超过100个字符",
              trigger: "blur"
            },
            {
              validator: validateName,
              trigger: "blur"
            }
          ],
          smsShortNameEn: [
            { required: false, message: "请输入英文简称", trigger: "blur" },
            // {
            //   type: "string",
            //   max: 200,
            //   message: "英文简称不能超过200个字符",
            //   trigger: "blur"
            // }
          ],
          smsProductDesc: [
            { required: true, message: "请输入产品描述", trigger: "blur" },
            {
              type: "string",
              max: 500,
              message: "产品描述不能超过500个字符",
              trigger: "blur"
            }
          ],
          smsProductDescEn: [
            { required: true, message: "请输入产品英文描述", trigger: "blur" },
            {
              type: "string",
              max: 500,
              message: "产品英文描述不能超过500个字符",
              trigger: "blur"
            }
          ],
          productPrice: [
            { required: true, validator: productPriceRateNumber, trigger: 'blur' }
          ],
          productRate: [
            { required: true, validator: productRateNumber, trigger: 'blur' }
          ],
          unit: [{
            required: true, type: 'number', message: '请选择单位', trigger: 'change'
          }],
          month: [{
            required: true, type: 'number', message: '请选择单位', trigger: 'change'
          }]
        },
        smsProductIds: []
      };
    },
    computed: {
      afterDiscountPrice() {
        this.smsForm.afterDiscountPrice = (this.smsForm.productPrice * this.smsForm.productRate * 0.01).toFixed(2);
        return (this.smsForm.productPrice * this.smsForm.productRate * 0.01).toFixed(2)
      },
      rateMsg() {//品种比例校验
        if (this.selectBreeds.length > 0) {
          let rate = this.selectBreeds
          let sum = 0
          if (rate.length > 0) {
            for (let i in rate) {
              sum += rate[i].percent
            }
            if (sum !== 100) {
              return '分成比例总和必须为100%'
            }
          } else {
            return '分成比例不能为空'
          }
          this.formatRate();
        }
      }
    },
    methods: {
      searchListPage(){
        console.log(this.targetKeys);
        this.targetKeys = [];
        this.getSourceList();
      },
      clear(){
        this.targetKeys = [];
        this.areaIds = [];
        this.breedIds = [];
        this.productNameValue='';
        this.productAreaValue = '';
        this.productBreedValue='';
      },
      okqueding(){
        if (this.modalTitle == "品种") {
          this.breedIds = [];
          let breedList = this.$refs.breedRef.getCheckedNodes();
          let breedArr = [];
          let breedIdArr = [];
          for (let i = 0; i < breedList.length; i++) {
            if (breedList[i].breedId) {
              breedArr.push(breedList[i])
            } else {
              breedIdArr.push(breedList[i].nodeId)
            }
          }
          breedTypeList({
            breedTypeIdList: breedIdArr
          }).then(res => {
            let BreedNameList = res.response.map(item => {
              return {
                breedId: item.nodeId,
                breedName: item.nodeName,
              }
            })
            let concatArr = breedArr.concat(BreedNameList)
            let selectedBreed = arrQC(concatArr)
            this.breedIds = selectedBreed.map(item => {
              return item.breedId
            });
            let value3 = selectedBreed.map(item => {
              return item.breedName
            });
            this.productBreedValue = value3.join(',')
          })
        } 
        if(this.modalTitle == "区域") {
          this.areaIds = [];
          let cityList = this.$refs.cityRef.getCheckedNodes();
          this.areaIds = cityList.map(item => {
            return item.id
          });
          let areaName = cityList.map(item => {
            return item.title
          });
          this.productAreaValue = areaName.join(',')
        }
        this.ModelData = false;
      },
      cancelquxiao(){
        this.ModelData = false;
      },
      loadCityData(item, callback) {
        let form = {
          id: item.id
        }
        selectAreaList(form).then(res => {
          let cityDataTree = res.response.map(item => {
            if (item.isLeaf === 1) {
              return {
                id: item.id,
                title: item.name,
                loading: false,
                children: [],
                route: item.path
              }
            } else {
              return {
                id: item.id,
                title: item.name,
                route: item.path
              }
            }
          })
          callback(cityDataTree)
        })
      },
      productValueData(title){
        console.log(title);
        this.modalTitle = title
        if (title == "品种") {
          this.ModelData = true;
          let form = {
            breedCode: ''
          }
          getProductTreeList(form).then(res => {
            this.breedList = breedMap(res.response)
          })
        }
        if (title == "区域") {
          this.ModelData = true;
          this.getCityData()
        }
      },
      getCityData() {
        // this.$Spin.show();
        let form = {
          id: ''
        }
        selectAreaList(form).then(res => {
          this.cityDataTree = res.response.map(item => {
            if (item.isLeaf === 1) {
              return {
                id: item.id,
                title: item.name,
                loading: false,
                children: [],
                route: item.path
              }
            } else {
              return {
                id: item.id,
                title: item.name,
                route: item.path
              }
            }
          })
          // this.$Spin.hide();
        })
      },
      doAdd() {
        let _this = this;
        this.$refs.addForm.validate(valid => {
          if (valid) {
            this.sourceModal = false;
            this.$emit("hide-modal");
            this.form = {};
          } else {
            setTimeout(function () {
              _this.loading = false;
              _this.$nextTick(() => {
                _this.loading = true;
              });
            }, 1);
          }
        });
      },
      doCancel() {
        this.$emit("hide-modal");
        this.form = {};
      },
      voidSms() {
        this.$router.push({
          name: "smsManager"
        });
      },
      //打开源产品窗口
      showSourceModal() {
        // 打开新增弹窗
        this.sourceModal = true;
        this.productAreaValue = '';
        this.productBreedValue = '';
        this.breedIds = [];
        this.areaIds = [];
        this.productNameValue = '';
        this.targetKeys = [];
        this.getSourceList();
      },
      hideAddModal() {
        // 隐藏新增弹窗
        this.sourceModal = false;
      },
      //点击确定事件
      ok() {
        let keys = this.targetKeys;
        // this.rightData = [];
        for (let key in keys) {
          this.rightData.push(this.leftData[keys[key] - 1]);
        }
        this.rightData = [...new Set(this.rightData)];
        this.rightData = this.uniq(this.rightData);
        // smsForm.productPrice
        let sumValue = 0;
        for(var i=0;i<this.rightData.length;i++){
          sumValue += parseInt(this.rightData[i].price);
        }
        this.smsForm.productPrice = sumValue;
        console.log('this.rightData',this.rightData,sumValue);
        let proIds = this.rightData.map(item => {
          return item.proId
        })
        if (proIds.length > 0) {
          fourdimension({
            proIds: proIds.join(",")
          }).then(res => {
            this.selectBreeds = res.response.breedList.map(item => {
              return {
                breedName: item.name,
                breedId: item.id,
                percent: 0
              }
            })
          })
        }
      },
      uniq(arr){
          let temp = []
          let l = arr.length
          for (let i = 0; i < l; i++) {
            for (let j = i + 1; j < l; j++) {
              if (arr[i].proId === arr[j].proId) {
                i++
                j = i
              }
            }
            temp.push(arr[i])
          }
          return temp
      },
      // 模态框点击取消
      cancel() {
      },
      // 根据分类查询源产品
      getSourceList() {
        this.$Spin.show();
        let form = {
          proCategoryCode: this.smsForm.smsProductClassify,
          breedIds: this.breedIds,
          areaIds: this.areaIds,
          productNameCn:this.productNameValue
        }
        sourceProList(form).then(res => {
          console.log('res',res);
          this.leftData = res.response.map((item, index) => {
            return {
              key: index + 1,
              proId: item.proId,
              name: item.productName,
              price:
                item.productPrice + item.unitDes + "/" + item.buyPeriodDes
            };
            this.$Spin.hide();
          });
        })
      },
      // 自定义搜索函数
      filterMethod(data, query) {
        return data.name.indexOf(query) > -1 || data.price.indexOf(query) > -1;
      },
      // 格式化模态框显示字段
      renderFormat(item) {
        return item.name + " " + item.price;
      },
      // 监听选中项发生变化
      handleChange(newTargetKeys) {
        this.targetKeys = newTargetKeys;
        console.log('this.targetKeys',this.targetKeys);
      },
      change(val, show) {
        this.smsProductIds = val;
        this.showAddModal = show;
      },
      changeBread(newVal) {
        if (breedData.children.check) {
          this.chooseBreedData.push(this.breedData);
        }
        this.chooseBreedData = newVal;
      },
      formatRate() {
        this.propertionList = this.selectBreeds.map((item, index) => {
          return {
            breedId: item.breedId,
            breedName: item.breedName,
            percent: parseFloat((item.percent / 100).toFixed(4))
          };
        });
      },
      //删除源产品
      deleteProduct(index, key) {
        let number = this.targetKeys.indexOf(key);
        if (number !== -1) {
          this.targetKeys.splice(number, 1);
        }
        this.rightData.splice(index, 1);
        let sumValue = 0;
        for(var i=0;i<this.rightData.length;i++){
          sumValue += parseInt(this.rightData[i].price);
        }
        this.smsForm.productPrice = sumValue;
      },
      // 控制收起展开
      changeShow() {
        if (this.isSpread) {
          this.isSpread = false;
          this.spreadText = "展开";
        } else {
          this.isSpread = true;
          this.spreadText = "收起";
        }
      },
      //新增套餐提交功能
      addSmsProduct() {
        this.$Spin.show();
        var that = this;
        let productId = that.$route.query.productId;
        let productVersionId = that.$route.query.productVersionId;
        if (that.rightData.length < 1) {
          this.$Message.warning("请选择源产品");
          this.$Spin.hide();
          return false
        }
        var arr = that.rightData;
        var sourceProducts = [];
        for (var i = 0; i < arr.length; i++) {
          sourceProducts.push(arr[i].proId);
        }
        let form = {
          afterDiscountPrice: that.smsForm.afterDiscountPrice,
          breedList: that.getBreedIds(this.selectBreeds) || [],
          buyPeriod: that.smsForm.month,
          enterpriseCategory: String(that.smsForm.busniessType),
          productCategoryCode: that.smsForm.smsProductClassify,
          productDesc: that.smsForm.smsProductDesc,
          productDescEn: that.smsForm.smsProductDescEn,
          productNameCn: that.smsForm.smsName,
          productNameEn: that.smsForm.smsNameEn,
          productPrice: that.smsForm.productPrice,
          propertionList: that.propertionList,
          shortNameCn: that.smsForm.smsShortName,
          shortNameEn: that.smsForm.smsShortNameEn,
          sourceProduct: sourceProducts,
          specialDiscount: (that.smsForm.productRate * 0.01).toFixed(4),
          type: 2,
          unit: that.smsForm.unit
        };
        this.$refs['smsForm'].validate((valid) => {
          if (valid) {
            proSmsInsert(form).then(res => {
              that.$Message.warning("新增成功");
              that.$Spin.hide();
              that.$router.push({
                name: "smsManager"
              });
            });
          } else {
            that.$Message.warning("请输入必填项");
            that.$Spin.hide();
          }
        })
      },
      //企业类型数据列表
      priseType() {
        var that = this;
        enterPriseList().then(res => {
          that.enterPriseList = res.response;
        });
      },
      // 删除某个品类
      deleteBreed(index) {
        this.selectBreeds.splice(index, 1);
      },
      // 品种选择触发事件
      checkedBreedChange(data) {
        this.selectedBreedList = data
      },
      // 修改品种树字段
      loadBreedDataList(item, callback) {
        loadBreedData(item, callback, this.selectBreeds)
      },
      loadBreedDataListValue(item, callback){
        console.log(12);
        loadBreedData(item, callback, [])
      },
      // 获取品种树信息
      getBreedData() {
        let form = {
          breedCode: ''
        }
        getProductTreeList(form).then(res => {
          this.breedList = breedMap(res.response)
        })
      },
      getBreedIds(list) {
        let arr = [];
        for (let i = 0; i < list.length; i++) {
          arr.push(list[i].breedId);
        }
        return arr;
      },
      doOk() {
        let breedArr = [];
        let breedIdArr = [];
        for (let i = 0; i < this.$refs.breedRef.getCheckedNodes().length; i++) {
          if (this.$refs.breedRef.getCheckedNodes()[i].breedId) {
            breedArr.push(this.$refs.breedRef.getCheckedNodes()[i])
          } else {
            breedIdArr.push(this.$refs.breedRef.getCheckedNodes()[i].nodeId)
          }
        }
        breedTypeList({
          breedTypeIdList: breedIdArr
        }).then(res => {
          let BreedNameList = res.response.map(item => {
            return {
              checked: false,
              breedId: item.nodeId,
              nodeCode: item.nodeCode,
              type: item.type,
              title: item.nodeName,
              route: item.nodeName,
              breedName: item.nodeName,
              percent: 0
            }
          })
          let concatArr = breedArr.concat(BreedNameList)
          let concatArray = concatArr.concat(this.selectBreeds)
          this.selectBreeds = arrQC(concatArray)
        })
      },
      // 清空所选
      clearInfo() {

      },
    },
    created() {
      this.priseType();
      this.getBreedData();
    }
  };
</script>