<style lang="less" scoped>

</style>

<template>
  <Row>
    <Col span="24">
      <Row class-name="current-position">
        当前位置：产品中心&nbsp;&nbsp;>>&nbsp;&nbsp;产品管理
      </Row>
    </Col>
    <Col span="24">
      <Row class-name="add-container">
        <p v-if="sign" class="title">修改产品</p>
        <p v-else class="title">新增产品</p>
        <div class="step-container">
          <span class="step1 active">1 基础信息</span>
          <span class="step2" :class="step > 1 ? 'active' : ''">2 关联信息</span>
          <span class="step2" :class="step > 2 ? 'active' : ''">3 定价信息</span>
          <span class="step2" :class="step > 3 ? 'active' : ''">4 附件资料</span>
        </div>
      </Row>
      <!-- 第一步 基础信息 -->
      <Row class-name="form-container" v-show="step === 1">
        <Col :lg="16" :md="24">
          <first-step ref="firstStep" :listData="this.listData" @step = "toStep"></first-step>
        </Col>
      </Row>

      <!-- 第二步 关联信息 -->
      <Row class-name="form-container" v-show="step === 2">
        <Col :lg="16" :md="24">
          <second-step ref="secondStep" :listData="this.listData" @step = "toStep"></second-step>
        </Col>
      </Row>
      <!-- 第三步 定价信息 -->
      <Row class-name="form-container" v-show="step === 3">
        <Col :lg="16" :md="24">
          <third-step ref="thirdStep" :listData="this.listData" @step = "toStep"></third-step>
        </Col>
      </Row>
      <!-- 第四步 附件资料 -->
      <Row class-name="form-container" v-show="step === 4">
        <Col :lg="16" :md="24">
          <last-step ref="lastStep" :listData="this.listData" @step = "toStep"></last-step>
          <Row class="mar-t-15">
            <Col span="24" style="text-align: center">
              <Button type="primary" @click="toStep(3)">上一步</Button>
              <Button v-if="sign" type="primary" style="width: 68px; margin-left: 20px" @click="alertProduct">保存</Button>
              <Button v-else type="primary" style="width: 68px; margin-left: 20px" @click="save">保存</Button>
              <Button style="width: 68px; margin-left: 20px" @click="cancel">取消</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  </Row>
</template>

<script>
import FirstStep from './firstStep.vue'
import SecondStep from './secondStep.vue'
import ThirdStep from './thirdStep.vue'
import LastStep from './lastStep.vue'
import { getAlterProduct, proSmsInsert, postAlterProduct } from '../components/axios/productCenter.js'
export default {
  name: 'addModal',
  props: {
  },
  data () {
    return {
      productId: this.$route.query.id || '',
      productVersionId: this.$route.query.vid || '',
      sign: this.$route.query.sign || '',
      step: 1,
      typeList: [],
      breeds: [],
      listData: ''
    }
  },
  created() {
    if (this.sign) {
      this.getDetail()
    }
  },
  methods: {
    toStep (step) {
      this.step = step
    },
    // object转array
    toArray (obj) {
      let arr = []
      for(let key in obj) {
        if(!obj.hasOwnProperty(key)){
          continue
        }
        let item = {}
        item[key] = obj[key]
        arr.push(item)
      }
      return arr
    },
    // 取消，返回产品管理页面
    cancel () {
      this.$router.push({
        name: 'productManager'
      })
    },
    // 获取详情
    getDetail() {
      let form = {
        productId: this.productId,
        productVersionId: this.productVersionId || 1
      }
      getAlterProduct(form).then(res => {
        this.listData = res.response
      })
    },
    formatBuy (val) {
      if(val == '次') {
        return 0
      } else if(val == '月') {
        return 1
      } else {
        return 2
      }
    },
    getIds (list) {
      let arr = []
      for (let i = 0; i < list.length; i++) {
        arr.push(list[i].id)
      }
      return arr
    },
    getBreedIds (list) {
      let arr = []
      for (let i = 0; i < list.length; i++) {
        arr.push(list[i].breedId)
      }
      return arr
    },
    getMemberId (list) {
      let arr = []
      for (let i = 0; i < list.length; i++) {
        arr.push(list[i].memberId)
      }
      return arr
    },
    getProId (list) {
      let arr = []
      for (let i = 0; i < list.length; i++) {
        arr.push(list[i].proId)
      }
      return arr
    },
    save () {
      this.$Spin.show();
      let firstData = this.$refs.firstStep.productForm
//      console.log(firstData)
      let secondData = this.$refs.secondStep
      let thirdData = this.$refs.thirdStep.fixPriceForm
      let lastData = this.$refs.lastStep.productForm
      let propertionList = this.$refs.thirdStep.selectBreeds.map(item => {
        return {
          breedId: item.breedId,
          breedName: item.breedName,
          percent: (item.percent*0.01).toFixed(4)
        }
      })
      let lastDataUrl = lastData.attachList.map(item => {
        return {
          attaName: item.name,
          url: item.url
        }
      });
      let params = {
        type: 1,
        productNameCn: firstData.productName || '',
        productNameEn: firstData.productNameEn || '',
        shortNameCn: firstData.productShortName || '',
        shortNameEn: firstData.shortNameEn || '',
        productCategoryCode: firstData.productClassifyCode,
        enterpriseCategory: String(firstData.busniessType) || '',
        isContinued: firstData.continue == '是' ? 1 : 0,
        basePrice: firstData.basicPrice || '',
        contractList: firstData.contractList || [],  // 合同条款
        productDesc: firstData.productDesc || '',
        productDescEn: firstData.productDescEn || '',
        sourceProduct: this.getProId(this.$refs.firstStep.rightData) || '',
        siteId: firstData.siteId,
        siteName: firstData.siteName,

        areaList: this.getIds(secondData.selectCity) || [],
        memberList: this.getMemberId(secondData.selectedCompany) || [],
        breedList: this.getBreedIds(secondData.selectedBreed) || [],
        messageCatagoryList: this.getIds(secondData.selectInfo) || [],
        itemList: this.getIds(secondData.selectColumn) || [],
        channelList: this.getIds(secondData.selectChannel) || [],

        productPrice: thirdData.productPrice || '',
        specialDiscount: (thirdData.discount * 0.01).toFixed(4) || '',
        afterDiscountPrice: thirdData.discountPrice || '',
        buyPeriod: this.formatBuy(thirdData.buyPeriod),
        unit: thirdData.unit == '美元' ? 1 : 0,

        productNote: lastData.tips || '',
        propertionList: propertionList || [],  // 品种分成比例
        attachList: lastDataUrl    // 附件url
      }
      proSmsInsert(params).then(res => {
        this.$Spin.hide();
        this.$Message.success('保存成功！')
        this.$router.push({
          name: 'productManager'
        })
      })
    },
    alertProduct () {
//      console.log(this.$refs.firstStep.rightData)
//      console.log(this.getProId(this.$refs.firstStep.rightData))
      this.$Spin.show();
      let firstData = this.$refs.firstStep.productForm
      let secondData = this.$refs.secondStep
      let thirdData = this.$refs.thirdStep.fixPriceForm
      let lastData = this.$refs.lastStep.productForm
      let propertionList = this.$refs.thirdStep.selectBreeds.map(item => {
        return {
          breedId: item.breedId,
          breedName: item.breedName,
          percent: (item.percent*0.01).toFixed(4)
        }
      })
      let lastDataUrl = lastData.attachList.map(item => {
        return {
          attaName: item.name,
          url: item.url
        }
      });
//      console.log(lastDataUrl)
      let params = {
        type: 1,
        productId: this.productId,
        productVersionId: this.productVersionId,
        productNameCn: firstData.productName || '',
        productNameEn: firstData.productNameEn || '',
        shortNameCn: firstData.productShortName || '',
        shortNameEn: firstData.shortNameEn || '',
        productCategoryCode: firstData.productClassifyCode,
        enterpriseCategory: String(firstData.busniessType) || '',
        isContinued: firstData.continue == '是' ? 1 : 0,
        basePrice: firstData.basicPrice || '',
        contractList: firstData.contractList || [],  // 合同条款
        productDesc: firstData.productDesc || '',
        productDescEn: firstData.productDescEn || '',
        sourceProduct: this.getProId(this.$refs.firstStep.rightData) || '',
        siteId: firstData.siteId,
        siteName: firstData.siteName,

        areaList: this.getIds(secondData.selectCity) || [],
        memberList: this.getMemberId(secondData.selectedCompany) || [],
        breedList: this.getBreedIds(secondData.selectedBreed) || [],
        messageCatagoryList: this.getIds(secondData.selectInfo) || [],
        itemList: this.getIds(secondData.selectColumn) || [],
        channelList: this.getIds(secondData.selectChannel) || [],

        productPrice: thirdData.productPrice || '',
        specialDiscount: (thirdData.discount * 0.01).toFixed(4) || '',
        afterDiscountPrice: thirdData.discountPrice || '',
        buyPeriod: this.formatBuy(thirdData.buyPeriod),
        unit: thirdData.unit == '美元' ? 1 : 0,

        productNote: lastData.tips || '',
        propertionList: propertionList || [],  // 品种分成比例
        attachList: lastDataUrl     // 附件url
      }
      postAlterProduct(params).then(res => {
        this.$Spin.hide();
        this.$Message.success('保存成功！')
        this.$router.push({
          name: 'productManager'
        })
      })
    }
  },
  watch: {},
  components: {
    FirstStep,
    SecondStep,
    ThirdStep,
    LastStep
  }
}
</script>
