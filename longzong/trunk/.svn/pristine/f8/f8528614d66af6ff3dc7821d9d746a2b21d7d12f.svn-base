<style lang="less" scoped>
  .icon-minus {
    width: 18px;
    height: 18px;
    margin-bottom: 0;
  }
  .ib-center {
    display: block;
    align-items: center;
    margin-left: 10px;
  }
</style>
<template>
  <Row>
    <Col span="24">
      <Row class-name="current-position">
        当前位置：用户关系管理&nbsp;&nbsp;>>&nbsp;&nbsp;系统配置&nbsp;&nbsp;>>&nbsp;&nbsp;合同模板
      </Row>
    </Col>
    <Col span="24" class-name="search-form">
      <Form ref="formItem" :model="formItem" :rules="ruleForm" :label-width="120">
        <Row>
          <Col span="9">
            <FormItem label="模板名称:" prop="name">
              <Input clearable v-model="formItem.name" class="search-input" placeholder="请输入模板名称"></Input>
            </FormItem>
          </Col>
          <Col span="9">
           <FormItem label="产品分类:" prop="proclass">
              <Cascader
                v-model="formItem.proclass"
                :data="productClass"
                change-on-select
                trigger="hover"
                class="search-input"
                @on-change='getproductClass'>
              </Cascader>
            </FormItem>
          </Col>
        </Row>
        <Row type="flex">
          <Col span="9">
            <FormItem label="是否英文模板:" prop="isEnglish">
              <RadioGroup v-model="formItem.isEnglish">
                <Radio label="是"></Radio>
                <Radio label="否"></Radio>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col span="9">
            <FormItem label="是否禁用:" prop="isForbid">
              <RadioGroup v-model="formItem.isForbid">
                <Radio label="是"></Radio>
                <Radio label="否"></Radio>
              </RadioGroup>
            </FormItem>
          </Col>
        </Row>
        <Col span="18">
          <FormItem label="标签:">
            <Button class="search-btn" type="primary" v-for="tab in tabs" :key="tab.id" @click="contactTab(tab)">{{tab.name}}</Button>
          </FormItem>
        </Col>
        <Col span="24">
          <FormItem label="条款内容:">
            <Col span="24" class="mar-b-10" v-for="(item, index) in formItem.barginList" :key="index">
              <Col span="16">
                <FormItem
                  :prop="'barginList.'+ index + '.content'" 
                  :rules="{required: true, message: '条款内容不能为空', trigger: 'blur'}">
                  <Input v-model="item.content" @on-focus="contentFocus(index)"  type="textarea" :autosize="{minRows: 4,maxRows: 4}" placeholder="请输入分类合同条款"></Input>
                </FormItem>
              </Col>
              <Col span="5">
                <div class="ib-center">
                  <span class="icon-minus" @click="deleteItem(index)" v-show="formItem.barginList.length > 1"></span>
                  <span class="mar-r-10" v-show="formItem.barginList.length > 1">删除</span>
                  <span class="icon-add" @click="addItem()"></span>
                  <span>添加</span>
                </div>
                <div class="ib-center">
                  <Input v-model="item.orderNum" value="123" type="text" style="width:42px;height:16px;padding:0;text-align:center"></Input>
                  <span class="mar-l-5">排序</span>
                </div>
              </Col>
            </Col>
          </FormItem>
        </Col>
        <Col span="18" class="text-center">
          <FormItem>
            <Button class="search-btn" type="primary" @click="submit">提交</Button>
            <Button class="search-btn" @click="back">返回</Button>
          </FormItem>
        </Col>
      </Form>
    </Col>
    <Spin size="large" fix v-if="spinShow"></Spin>
  </Row>
</template>
<script>
import {
  // getUserproductListProductTreeVO,
  getAllConfigList,
  saveContractTemplet,
  updateContractTemplet,
  getAllProductTreeVO,
  getContractTempletInfo
} from '../../../components/axios/crm.js'
import { formatStamp, formData } from '../../../../assets/js/common.js';
export default {
  data() {
    return {
      spinShow:false,
      id: this.$route.query.id,
      currentIndex: 0,
      formItem: {
        isForbid: '否',
        isEnglish: '否',
        proclass: [],
        productCategoryCode: '',
        barginList: [
          {
            content: '',
            orderNum: 1,
          }
        ],
      },
      ruleForm: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        proclass: [
          { required: true, type: 'array', message: '请选择产品分类', trigger: 'change' }
        ],
        isEnglish: [
           { required: true, message: '请选择是否英文模板', trigger: 'change' }
        ],
        isForbid: [
           { required: true, message: '请选择是否禁用', trigger: 'change' }
        ],
      },
      productClass: [],
      tabs: []
    }
  },
  created() {
    this.getAllTab()
    this.getUserproductListProductCategory()
    this.getList()
  },
  methods: {
    // 产品分类
    getUserproductListProductCategory() {
      this.spinShow=true;
      let that=this;
      getAllProductTreeVO().then(res => {
        that.spinShow=false;
        this.productClass = this.breedDigui(res.response)
      })
    },
    breedDigui(a) {
      let dgData = a.map(item => {
        if (item.children.length>0) {
          return {
            label: item.productCategoryName,
            value: item.productCategoryCode,
            children: this.breedDigui(item.children)
          };
        } else {
          return {
            label: item.productCategoryName,
            value: item.productCategoryCode
          };
        }
      })
      return dgData
    },
    getproductClass(value){
      console.log(value)
      this.formItem.productCategoryCode = value[value.length - 1];
    },
    getAllTab() {
      let params = {
        status: 1,
        type: 2
      }
      getAllConfigList(params).then(res => {
        this.tabs = res.response
      })
    },
    // 修改页内容获取
    getList() {
      if(this.id) {
        this.spinShow=true
        let that=this;
        getContractTempletInfo(this.id).then(res => {
          that.spinShow=false
          let data = res.response
          this.formItem.name = data.name,
          this.formItem.isEnglish = data.type === 1 ? '是' : '否',
          this.formItem.isForbid = data.status === 1 ? '否' : '是' ,
          this.formItem.proclass = [data.productCategoryCode.slice(0,3),data.productCategoryCode],
          this.formItem.productCategoryCode = data.productCategoryCode
          if(data.contentVOs && data.contentVOs.length > 0) {
            this.formItem.barginList = data.contentVOs.map(item => {
              return {
                content: item.content,
                orderNum: item.orderNum
              }
            })
          }
        })
      }
    },
    contentFocus(index) {
      this.currentIndex = index
    },
    contactTab(tab) {
      this.formItem.barginList[this.currentIndex].content += tab.code
    },
    addItem () {
      this.formItem.barginList.push({
        content: '',
        orderNum: this.formItem.barginList.length + 1
      })
    },
    deleteItem (index) {
      this.formItem.barginList.splice(index, 1)
      // this.formItem.order.splice(-1, 1);
    },
    // 提交
    submit() {
      let that=this;
      this.$refs.formItem.validate(valid => {
        if(valid) {
          this.spinShow=true
          let params = {
            name: this.formItem.name,
            productCategoryCode: this.formItem.productCategoryCode,
            type: this.formItem.isEnglish === '是' ? 1 : 2,
            status: this.formItem.isForbid === '是' ? 0 : 1,
            contentVOs: this.formItem.barginList
          }
          if(this.id) {
            Object.assign(params, {id: this.id})
            updateContractTemplet(params).then(res => {
              that.spinShow=false
              this.$Message.success('更新成功')
              this.$router.push({
                name: 'contractTemplet'
              })
            })
          } else {
            saveContractTemplet(params).then(res => {
              that.spinShow=false
              this.$Message.success('新增成功')
              this.$router.push({
                name: 'contractTemplet'
              })
            })
          }
        }
      })
    },
    back() {
      window.history.back()
    }
  }
}
</script>

