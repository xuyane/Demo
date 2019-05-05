<style lang="less" scoped>
  // .ivu-modal-content {
  //   width: 820px;
  //   height: 500px;
  //   margin-left: -150px;
  // }
  .imp:before {
    content: '*';
    display: inline-block;
    margin-right: 4px;
    line-height: 1;
    font-family: SimSun;
    font-size: 12px;
    color: #ed4014;
  }

  .ivu-transfer-list {
    width: 216px;
    height: 340px;
  }

  .closeMore {
    height: 70px;
    overflow: hidden;
  }

  .openMore {
    height: auto;
  }

  .icon-minus {
    width: 18px;
    height: 18px;
    margin-bottom: 0;
  }

  .ib-center {
    display: flex;
    align-items: center;
    margin-left: 10px;
  }
  .ivu-form .ivu-form-item-label{
    width:auto !important;
  }
  .ivu-radio-group{
    float: left!important;
  }
</style>

<template>
  <Row class="first-step">
    <Col span="24">
    <Form ref="productForm" :model="productForm" :rules="formRoles" :label-width="110">
      <Row type="flex" justify="space-between">
        <Col span="11">
        <FormItem label="产品名称:" prop="productName">
          <Input v-if="listData" v-model="productForm.productName" :maxlength="100" class="search-input" placeholder="请输入产品名称" disabled></Input>
          <Input v-else v-model="productForm.productName" :maxlength="100" class="search-input" placeholder="请输入产品名称"></Input>
        </FormItem>
        </Col>
        <Col span="11">
        <FormItem label="英文名称:">
          <Input v-if="listData" v-model="productForm.productNameEn" :maxlength="200" class="search-input" placeholder="Energy english product name"
            disabled></Input>
          <Input v-else v-model="productForm.productNameEn" :maxlength="200" class="search-input" placeholder="Energy english product name"></Input>
        </FormItem>
        </Col>
      </Row>
      <Row type="flex" justify="space-between" class="mar-t-15">
        <Col span="11">
        <FormItem label="产品简称:" prop="productShortName">
          <Input v-model="productForm.productShortName" :maxlength="100" class="search-input" placeholder="请输入产品简称"></Input>
        </FormItem>
        </Col>
        <Col span="11">
        <FormItem label="英文简称:" prop="shortNameEn">
          <Input v-model="productForm.shortNameEn" :maxlength="200" class="search-input" placeholder="Energy short english product name"></Input>
        </FormItem>
        </Col>
      </Row>
      <Row type="flex" justify="space-between" class="mar-t-15">
        <Col span="11">
        <FormItem label="产品分类:" prop="productClassify">
          <Cascader v-model="productForm.productClassify" :data="typeList" class="search-input" @on-change="getproductClassify" placeholder="请选择产品分类"></Cascader>
        </FormItem>
        </Col>
        <Col span="11">
        <FormItem label="面向企业类型:">
          <Select v-model="productForm.busniessType"  placeholder="请选择面向企业类型" multiple class="selectBox">
            <Option v-for="item in priseList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        </Col>
      </Row>
      <Row type="flex" justify="space-between">
        <Col span="12">
        <FormItem label="是否可持续销售:" :label-width="120">
          <RadioGroup v-model="productForm.continue">
            <Radio label="是"></Radio>
            <Radio label="否"></Radio>
          </RadioGroup>
          <span style="color:red;margin-top:2px;display: inline-block;width: 320px;">说明：在一定时间周期内(年、月)可重复销售的产品为可持续销售产品,否则为一次性产品</span>
        </FormItem>
        </Col>
        <Col span="11">
        <FormItem label="所属站点:" prop="siteName">
          <Input v-if="listData" v-model="productForm.siteName" :maxlength="100" class="search-input" placeholder="请输入所属站点" disabled></Input>
          <Select v-else v-model="productForm.siteId" label-in-value @on-change='getSiteName' placeholder="请输入所属站点">
            <Option v-for="(option, index) in siteList" :value="option.siteId" :key="index">{{option.siteName}}</Option>
          </Select>
        </FormItem>
        </Col>
      </Row>
      <!--<Row>
        <Col span="12">
          <FormItem label="源产品:">
            <Button type="primary" class="choose-btn" @click="showSourceModal">请选择</Button>
          </FormItem>
        </Col>
      </Row>-->
      <Row class="mar-t-15">
        <Col span="19" v-show="rightData.length > 0">
        <FormItem :class="isSpread ? 'openMore' : 'closeMore'">
          <Col span="8" v-for="(item,index) in rightData" :key="item.key">
          <span v-if="listData">{{item.name}}</span>
          <span v-else>{{item.name}}</span>
          <!-- <span class="blue">价格：{{item.price}}</span> -->
          <b class="icon-delete" @click="removeRight(index, item.key)"></b>
          </Col>
        </FormItem>
        </Col>
        <Col span="5" style="position: absolute;bottom: 30px; right: 0" v-show="rightData.length > 6"> {{spreadText}}
        <b class="icon-more" @click="changeShow"></b>
        </Col>
      </Row>
      <Row>
        <Col span="12">
        <FormItem label="成本价:">
          <Input v-model="productForm.basicPrice" :maxlength="8" class="search-input" style="width: 180px" placeholder=""></Input>
          <span>元</span>
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24" class="mar-b-10" v-for="(list, index) in productForm.barginList" :key="index">
        <Col span="19">
        <FormItem label="分类合同条款:">
          <!-- prop="barginList" -->
          <Input v-model="productForm.barginList[index]" :maxlength="200" type="textarea" :autosize="{minRows: 3,maxRows: 3}" placeholder="请输入分类合同条款"></Input>
        </FormItem>
        </Col>
        <Col span="5">
        <div class="ib-center">
          <span class="icon-minus" @click="deleteItem(index)" v-show="productForm.barginList.length > 1"></span>
          <span class="mar-r-10" v-show="productForm.barginList.length > 1">删除</span>
          <span class="icon-add" @click="addItem()"></span>
          <span>添加</span>
        </div>
        <div class="ib-center">
          <Input v-model="productForm.order[index]" value="123" type="text" style="width:42px;height:16px;padding:0;text-align:center"></Input>
          <span class="mar-l-5">排序</span>
        </div>
        </Col>
        </Col>
      </Row>
      <Row>
        <Col span="24" class="mar-b-10" v-for="(list, index) in productForm.barginList" :key="index">
        <Col span="19">
        <FormItem label="英文条款:">
          <!-- prop="barginList" -->
          <Input v-model="productForm.barginListEn[index]" :maxlength="200" type="textarea" :autosize="{minRows: 3,maxRows: 3}" placeholder="Please enter an English terms"></Input>
        </FormItem>
        </Col>
        </Col>
      </Row>
      <Row>
        <FormItem label="产品描述:">
          <Col span="19">
          <Input v-model="productForm.productDesc" :maxlength="500" type="textarea" :autosize="{minRows: 5,maxRows: 5}" placeholder="请输入产品描述"></Input>
          </Col>
        </FormItem>
      </Row>
      <Row class="mar-t-15">
        <FormItem label="英文描述:">
          <Col span="19">
          <Input v-model="productForm.productDescEn" :maxlength="500" type="textarea" :autosize="{minRows: 5,maxRows: 5}" placeholder="Please enter an English descrption"></Input>
          </Col>
        </FormItem>
      </Row>
      <Row class="mar-t-15">
        <Col span="24" style="text-align: center">
        <FormItem>
          <Button type="primary" @click="validateData('productForm')">下一步</Button>
          <Button style="width: 68px; margin-left: 20px" @click="cancelNext">取消</Button>
        </FormItem>
        </Col>
      </Row>
    </Form>
    </Col>
    <!--<Modal
    v-model="sourceModal"
    title="源产品"
    @on-ok="ok"
    @on-cancel="cancel">
    <Transfer
      :data="leftData"
      :target-keys="targetKeys"
      filterable
      :render-format="renderFormat"
      :filter-method="filterMethod"
      :titles="titles"
      @on-change="handleChange"></Transfer>
  </Modal>-->
  </Row>
</template>
<script>
  import axios from 'axios'
  import { proCategoryList, enterPriseList, selectSiteList } from '../components/axios/productCenter.js'
  import bus from '../../store/bus/eventBus.js'
  export default {
    props: ['listData'],
    data() {
      const validateList = (rule, value, callback) => {
        // 模拟异步验证效果
        for (let i in value) {
          if (value[i]) {
            callback()
          } else {
            callback(new Error('请输入条款'))
          }
        }
      }
      const validateProductClassify = (rule, value, callback) => {
        if (this.productForm.productClassify.length == 0) {
          callback(new Error('请选择产品分类'))
        } else {
          callback()
        }
      }
      const validateName = (rule, value, callback) => {
        if (this.productData) {
          callback()
        } else {
          let pro = this.productForm
          let proId = null
          if (this.productId != '') {
            proId = this.productId
          }
          if (pro.productClassify && pro.productName && pro.productNameEn) {
            axios.post('/product/product/checkProNameUnique', {
              proCategoryCode: this.productForm.productClassifyCode,
              proNameCN: this.productForm.productName,
              proNameEN: this.productForm.productNameEn,
              id: proId
            }).then(res => {
              if (res.data.message === 'OK') {
                callback()
              } else {
                callback(new Error(res.data.message))
              }
            })
          } else {
            callback()
          }
        }
      }
      const validateSiteName = (rule, value, callback) => {
        if (this.productForm.siteName && this.productForm.siteName != '') {
          callback()
        } else {
          callback(new Error('请输入所属站点'))
        }
      }
      return {
        productId: this.$route.query.id || '',
        sourceModal: false,
        isSpread: false,  // 是否展开
        spreadText: '展开',
        titles: ['搜索列表', '已选产品'],
        productList: ['产品类一', '产品类二', '产品类三'],
        typeList: [],
        priseList: [],
        siteList: [],
        productData: '',
        productForm: {
          contractList: [],
          productName: '',
          productNameEn: '',
          productShortName: '',
          shortNameEn: '',
          productClassify: [],
          productClassifyCode: '',
          busniessType: [],
          productDesc: '',
          productDescEn: '',
          basicPrice: '',
          barginList: [''],
          barginListEn: [''],
          order: [1],
          continue: '是',
          must: 'must',
          siteId: '',
          siteName: ''
        },
        formRoles: {
          productName: [{
            required: true, message: '请输入产品名称', trigger: 'blur'
          }, {
            validator: validateName, trigger: 'blur'
          }],
          // productNameEn: [{
          //   required: false, message: '请输入英文名称', trigger: 'blur'
          // }, {
          //   validator: validateName, trigger: 'blur'
          // }],
          productClassify: [{
            required: true, validator: validateProductClassify, message: '请选择产品分类', trigger: 'change'
          }],

          siteName: [{
            required: true, validator: validateSiteName, trigger: 'change'
          }],
          productDesc: [{
            required: true, message: '请输入产品描述', trigger: 'blur'
          }],
          productDescEn: [{
            required: true, message: '请输入产品描述', trigger: 'blur'
          }],
          barginList: [{
            required: true, validator: validateList, trigger: 'blur'
          }],
          barginListEn: [{
            required: true, validator: validateList, trigger: 'blur'
          }],
          must: [{
            required: true, message: '', trigger: 'blur'
          }]
        },
        leftData: [],
        rightData: [],
        targetKeys: []
      }
    },
    created() {
      this.getCategoryList()
      this.getPriseList()
      this.getSite()
    },

    watch: {
      listData(newVal, oldVal) {
        this.productData = newVal
        this.productForm.productName = this.productData.productNameCn
        this.productForm.productNameEn = this.productData.productNameEn
        this.productForm.productShortName = this.productData.shortNameCn
        this.productForm.shortNameEn = this.productData.shortNameEn
        if (this.productData.productCategoryCode.length == 3) {
          this.productForm.productClassify.push(this.productData.productCategoryCode)
        } else {
          this.productForm.productClassify.push(this.productData.productCategoryCode.slice(0, 3))
          this.productForm.productClassify.push(this.productData.productCategoryCode)
        }
        console.log("this.productForm.productClassify", this.productForm.productClassify)
        this.productForm.siteId = this.productData.siteId
        this.productForm.siteName = this.productData.siteName
        this.productForm.productClassifyCode = this.productData.productCategoryCode
        this.productForm.busniessType = this.productData.enterpriseCategory.split(",")
        this.productForm.productDesc = this.productData.productDesc
        this.productForm.productDescEn = this.productData.productDescEn
        this.productForm.basicPrice = this.productData.basePrice
        this.productForm.continue = this.productData.isContinuedDes
        console.log('this.productData',this.productData);
        this.rightData = this.productData.sourceProduct.map(item => {
          return {
            name: item.sourceName,
            propId: item.sourceId
          }
        })
        this.sort(this.productData.contractList)
      }
    },
    methods: {
      //获取所属站点
      getSite() {
        selectSiteList().then(res => {
          this.siteList = res.response
        })
      },
      //获取所属站点名称
      getSiteName(data) {
        this.productForm.siteName = data.label
      },
      //获取产品分类code
      getproductClassify(value, selectedData) {
        this.productForm.productClassify = value
        this.productForm.productClassifyCode = value[value.length - 1]
      },
      // 模态框点击确定
      // ok () {
      //   let keys =  this.targetKeys
      //   this.rightData = []
      //   for(let key in keys) {
      //     this.rightData.push(this.leftData[keys[key]-1])
      //   }
      //   this.rightData = [...new Set(this.rightData)]
      // },
      // 模态框点击取消
      cancel() {
      },
      sort(obj) {
        this.productForm.barginList = []
        this.productForm.barginListEn = []
        this.productForm.order = []
        obj.map(item => {
          this.productForm.barginList.push(item.contentCn)
          this.productForm.barginListEn.push(item.contentEn)
          this.productForm.order.push(item.priority)
        })
      },
      formatBargin() {
        let listCn = this.productForm.barginList
        let listEn = this.productForm.barginListEn
        let order = this.productForm.order
        let arr = []
        for (let i = 0; i < listCn.length; i++) {
          let params = {
            contentCn: listCn[i],
            contentEn: listEn[i],
            priority: order[i]
          }
          arr.push(params)
        }
        this.productForm.contractList = arr
      },
      productDigui(data) {
        let dgData = data.map(item => {
          if (item.children.length > 0) {
            return {
              label: item.productCategoryName,
              value: item.productCategoryCode,
              children: this.productDigui(item.children)
            };
          } else {
            return {
              label: item.productCategoryName,
              value: item.productCategoryCode,
            };
          }
        });
        return dgData;
      },
      // 获取产品分类列表
      getCategoryList() {
        proCategoryList().then(res => {
          this.typeList = this.productDigui(res.response)
        })
      },
      // 获取企业类型列表
      getPriseList() {
        enterPriseList().then(res => {
          this.priseList = res.response.map(item => {
            return {
              value: item,
              label: item
            }
          })
        })
      },
      // 根据分类查询源产品
      // getSourceList () {
      //   let form = {
      //     proCategoryCode: this.productForm.productClassify
      //   };
      //   sourceProList(form).then(res => {
      //     let dataArray = []
      //     for (let i = 0; i < res.response.length; i++) {
      //       let item = {}
      //       if(this.productId == ''){
      //         item = {
      //           key: i + 1,
      //           proId: res.response[i].proId,
      //           name: res.response[i].productName,
      //           price: res.response[i].productPrice + res.response[i].unitDes + '/' + res.response[i].buyPeriodDes
      //         }
      //       }else {
      //         if(this.productId == res.response[i].proId){
      //           continue
      //         }else {
      //           item = {
      //             key: i + 1,
      //             proId: res.response[i].proId,
      //             name: res.response[i].productName,
      //             price: res.response[i].productPrice + res.response[i].unitDes + '/' + res.response[i].buyPeriodDes
      //           }
      //         }
      //       }
      //       dataArray.push(item)
      //     }
      //     this.leftData = dataArray
      //   })
      // },
      // 显示源产品对话框
      // showSourceModal () {
      //   if (this.productForm.productClassify) {
      //     this.sourceModal = true
      //     this.getSourceList()
      //   } else {
      //     this.$Message.warning('请先选择产品分类')
      //   }
      // },
      // 删除源产品
      // removeRight (index, key) {
      //   let number = this.targetKeys.indexOf(key)
      //   if(number !== -1) {
      //     this.targetKeys.splice(number, 1)
      //   }
      //   this.rightData.splice(index, 1)
      //   console.log(this.rightData, key)
      // },
      // 控制收起展开
      changeShow() {
        if (this.isSpread) {
          this.isSpread = false
          this.spreadText = '展开'
        } else {
          this.isSpread = true
          this.spreadText = '收起'
        }
      },
      // 格式化模态框显示字段
      renderFormat(item) {
        return item.name + ' ' + item.price
      },
      // 监听选中项发生变化
      handleChange(newTargetKeys) {
        this.targetKeys = newTargetKeys
      },
      // 自定义搜索函数
      filterMethod(data, query) {
        return (data.name.indexOf(query) > -1) || (data.price.indexOf(query) > -1)
      },
      addItem() {
        this.productForm.order.push(this.productForm.order.length + 1);
        this.productForm.barginList.push('')
        this.productForm.barginListEn.push('')
      },
      deleteItem(index) {
        this.productForm.barginList.splice(index, 1)
        this.productForm.order.splice(-1, 1);
      },
      // 校验数据 下一步
      validateData(name) {
        for (let i = 0; i < this.productForm.barginList.length; i++) {
          if (this.productForm.barginList[i] != '' && this.productForm.barginListEn[i] == '') {
            this.$Message.warning('请填写第' + (i + 1) + '项英文条款');
            return false;
          }
        }
        let pro = this.productForm
        let proId = null
        if (this.productId != '') {
          proId = this.productId
        }
        this.$refs[name].validate((valid) => {
          if (valid) {
            if (pro.productClassify && pro.productName) {
              // && pro.productNameEn
              axios.post('/product/product/checkProNameUnique', {
                proCategoryCode: this.productForm.productClassifyCode,
                proNameCN: this.productForm.productName,
                proNameEN: this.productForm.productNameEn,
                id: proId
              }).then(res => {
                if (res.data.message === 'OK') {
                  this.formatBargin()
                  this.$emit('step', 2);
                  let transmissionData = {
                    productClassifyCode: this.productForm.productClassifyCode,
                    siteId: this.productForm.siteId
                  }
                  bus.$emit('isSms', transmissionData);
                  let proIds = this.rightData.map(item => {
                    return item.proId
                  })
                } else {
                  this.$Message.warning(res.data.message);
                }
              })
            }
          } else {
            this.$Message.warning('请填写必填项');
          }
        })
      },
      // 取消，返回产品管理页面
      cancelNext() {
        this.$router.push({
          name: 'productManager'
        })
      }
    }
  }
</script>
