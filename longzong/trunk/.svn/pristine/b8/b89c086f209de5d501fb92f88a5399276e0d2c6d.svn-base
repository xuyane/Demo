<style lang="less" scoped>
  @import '../productEdition.less';

  .col-base-style-detail {
    text-align: center;
    height: 60px;
    padding: 17px 0;
    font-size: 16px;
    color: #040003;
    overflow: auto;
  }

  .col-base-style-message {
    text-align: left;
    height: 60px;
    padding: 17px 20px;
    font-size: 16px;
    color: #040003;
    overflow: auto;
  }

  .height-365 {
    height: 490px;
  }

  .height-426 {
    height: 426px;
  }

  .height-182 {
    height: 182px;
    line-height: 120px;
  }

  .height-243 {
    height: 243px;
    line-height: 209px;
  }

  .pad-t-130 {
    padding-top: 130px;
  }
</style>
<template>
  <Row>
    <Col span="24">
    <Row class-name="current-position">
      当前位置：产品中心&nbsp;&nbsp;>>&nbsp;&nbsp;优惠政策&nbsp;&nbsp;>>&nbsp;&nbsp;详情
    </Row>
    </Col>
    <Col span="24" class="production-content" style="padding:0 10px 20px">
    <Row>
      <Col span="24" class="mar-b-20">
      <Row>
        <p class="product-title pad-top-35">{{strategyForm.strategyName}}</p>
      </Row>
      </Col>
      <Col span="24" class="border">
      <Row>
        <Col span="24" class="col-base-style-detail border-bottom">基本信息</Col>
      </Row>
      <Row class="border-bottom">
        <Col span="4" class="left-title col-base-style-detail border-right">优惠策略标题:</Col>
        <Col span="8" class="border-right col-base-style-detail"> {{strategyForm.strategyName}}
        </Col>
        <Col span="4" class="left-title col-base-style-detail border-right">客户类型:</Col>
        <Col span="8" class="col-base-style-detail"> {{strategyForm.memberTypeDesc}}
        </Col>
      </Row>
      <Row class="border-bottom">
        <Col span="4" class="left-title col-base-style-detail border-right">优惠期限:</Col>
        <Col span="20" class="border-right col-base-style-detail"> {{strategyForm.time}}
        </Col>
      </Row>
      <Row class="border-bottom">
        <Col span="4" class="left-title col-base-style-detail border-right">备注:</Col>
        <Col span="20" class="col-base-style-message"> {{strategyForm.note}}
        </Col>
      </Row>
      <Row>
        <Col span="24" class="col-base-style-detail border-bottom">优惠政策</Col>
      </Row>
      <Row class="border-bottom" v-for="(item,index) in strategyForm.items" :key="index">
        <div v-if="item.type == 1">
          <Col span="1" class="col-base-style-detail border-right height-365 pad-t-130">优</br>惠</br>政</br>策</br>({{index+1}})</Col>

          <Col span="3" class="col-base-style-detail border-right height-365" style="padding: 0;">
          <Row class="border-bottom">
            <Col span="24" class="left-title  height-243">销售内容:</Col>
          </Row>
          <Row>
            <Col span="24" class="left-title  height-243">优惠选择:</Col>
          </Row>
          </Col>

          <Col span="20" class="col-base-style-detail height-365" style="padding: 0;">


          <Row class="border-bottom">
            <Col span="4" class="col-base-style-detail border-right">产品:</Col>
            <Col span="20" v-if="item.productNumMin == ''" class="col-base-style-message">{{item.productNumMax}}个</Col>
            <Col span="20" v-else-if="item.productNumMax == ''" class="col-base-style-message">{{item.productNumMin}}个</Col>
            <Col span="20" v-else class="col-base-style-message">{{item.productNumMin}}个～{{item.productNumMax}}个</Col>
          </Row>
          <Row class="border-bottom">
            <Col span="4" class="col-base-style-detail border-right">产品分类:</Col>
            <!-- {{item.productCategoryName}} -->
            <Col span="20" class="col-base-style-message"> {{item.productCategoryName==null?'':item.productCategoryName}}</Col>
          </Row>
          <Row class="border-bottom">
            <Col span="4" class="col-base-style-detail border-right">合同金额:</Col>
            <Col span="20" v-if="item.contractAmountMin == ''" class="col-base-style-message">{{item.contractAmountMax}}元</Col>
            <Col span="20" v-else-if="item.contractAmountMax == ''" class="col-base-style-message">{{item.contractAmountMin}}元</Col>
            <Col span="20" v-else class="col-base-style-message">{{item.contractAmountMin}}元～{{item.contractAmountMax}}元</Col>
          </Row>
          <Row class="border-bottom">
            <Col span="4" class="col-base-style-detail border-right">购买期限:</Col>
            <Col span="20" v-if="item.contractTime == '12'" class="col-base-style-message">1年</Col>
            <Col span="20" v-else-if="item.contractTime == '24'" class="col-base-style-message">2年</Col>
            <Col span="20" v-else class="col-base-style-message"></Col>
          </Row>



          <Row class="border-bottom">
            <Col span="4" class="col-base-style-detail border-right">优惠折扣:</Col>
            <Col span="20" class="col-base-style-message"> {{item.rebate==null?'-':item.rebate*100+'%'}}
            </Col>
          </Row>
          <Row class="border-bottom">
            <Col span="4" class="col-base-style-detail border-right">打包价:</Col>
            <Col span="20" class="col-base-style-message"> {{item.packPrice==null?'-':item.packPrice+'元'}}
            </Col>
          </Row>
          <Row class="border-bottom">
            <Col span="4" class="col-base-style-detail border-right">赠送礼品:</Col>
            <Col span="20" class="col-base-style-message"> {{item.gifte==null?'':item.gifte}}
            </Col>
          </Row>
          <Row>
            <Col span="4" class="col-base-style-detail border-right">赠送期限:</Col>
            <Col span="20" v-if="item.expandTime == '1'" class="col-base-style-message">1个月</Col>
            <Col span="20" v-else-if="item.expandTime == '2'" class="col-base-style-message">2个月</Col>
            <Col span="20" v-else-if="item.expandTime == '3'" class="col-base-style-message">3个月</Col>
            <Col span="20" v-else-if="item.expandTime == '6'" class="col-base-style-message">半年</Col>
            <Col span="20" v-else-if="item.expandTime == '12'" class="col-base-style-message">1年</Col>
            <Col span="20" v-else class="col-base-style-message"></Col>
          </Row>
          </Col>
        </div>
        <div v-else>
          <Col span="1" class="col-base-style-detail border-right height-426 pad-t-130">优</br>惠</br>政</br>策</br>({{index+1}})</Col>

          <Col span="3" class="col-base-style-detail border-right height-426" style="padding: 0;">
          <Row class="border-bottom">
            <Col span="24" class="left-title col-base-style-detail height-182" >销售内容:</Col>
          </Row>
          <Row>
            <Col span="24" class="left-title col-base-style-detail height-243" >优惠选择:</Col>
          </Row>
          </Col>

          <Col span="20" class="col-base-style-detail height-426" style="padding: 0;">
          <Row class="border-bottom">
            <Col span="4" class="col-base-style-detail border-right">产品:</Col>
            <Col span="20" class="col-base-style-message"> {{item.cproductNames}}
            </Col>
          </Row>
         
          <Row class="border-bottom">
            <Col span="4" class="col-base-style-detail border-right">合同金额:</Col>
            <Col span="20" v-if="item.contractAmountMin == ''" class="col-base-style-message">{{item.contractAmountMax}}元</Col>
            <Col span="20" v-else-if="item.contractAmountMax == ''" class="col-base-style-message">{{item.contractAmountMin}}元</Col>
            <Col span="20" v-else class="col-base-style-message">{{item.contractAmountMin}}元～{{item.contractAmountMax}}元</Col>
          </Row>
          <Row class="border-bottom">
            <Col span="4" class="col-base-style-detail border-right">购买期限:</Col>
            <Col span="20" v-if="item.contractTime == '12'" class="col-base-style-message">1年</Col>
            <Col span="20" v-else-if="item.contractTime == '24'" class="col-base-style-message">2年</Col>
            <Col span="20" v-else class="col-base-style-message"></Col>
          </Row>
          <Row class="border-bottom">
            <Col span="4" class="col-base-style-detail border-right">打包价:</Col>
            <Col span="20" class="col-base-style-message"> {{item.packPrice}}元
            </Col>
          </Row>
          <Row class="border-bottom">
            <Col span="4" class="col-base-style-detail border-right">赠送产品:</Col>
            <Col span="20" class="col-base-style-message"> {{item.dproductNames}}
            </Col>
          </Row>
          <Row class="border-bottom">
            <Col span="4" class="col-base-style-detail border-right">赠送礼品:</Col>
            <Col span="20" class="col-base-style-message"> {{item.gift}}
            </Col>
          </Row>
          <Row>
            <Col span="4" class="col-base-style-detail border-right">赠送期限:</Col>
            <Col span="20" class="col-base-style-message"> {{item.expandTime}}
            </Col>
          </Row>
          </Col>
        </div>
      </Row>
      <Row>
        <Col span="24" class="col-base-style-detail border-bottom">下架原因</Col>
      </Row>
      <Row>
        <Col span="4" class="left-title col-base-style-detail border-right">产品下架原因:</Col>
        <Col span="20" class="col-base-style-message"> {{strategyForm.underReason}}
        </Col>
      </Row>
      </Col>
    </Row>
    <Row class="text-center mar-t-20">
      <Button class="search-btn" @click="goBack">返回</Button>
    </Row>
    </Col>
  </Row>
</template>

<script>
  import { strategyDetail } from '../../components/axios/productCenter.js'
  import { formatTime } from '../../../assets/js/common.js'
  export default {
    data() {
      return {
        strategyId: this.$route.query.strategyId,
        strategyForm: {
          strategyName: '',
          memberTypeDesc: '',
          note: '',
          time: '',
          items: []
        }
      }
    },
    created() {
      this.getMessage();
    },
    methods: {
      //获取优惠政策详情
      getMessage() {
        this.$Spin.show();
        let form = {
          strategyId: this.strategyId
        }
        strategyDetail(form).then(res => {
          this.strategyForm.strategyName = res.response.strategyName;
          this.strategyForm.memberTypeDesc = res.response.memberTypeDesc;
          this.strategyForm.note = res.response.note;
          this.strategyForm.time = formatTime(res.response.startTime) + '~' + formatTime(res.response.endTime);
          this.strategyForm.items = res.response.items.map(item => {
            if (item.cproductNames == '') {
              return {
                productNumMin: item.productNumMin,
                productNumMax: item.productNumMax,
                contractAmountMin: item.contractAmountMin,
                contractAmountMax: item.contractAmountMax,
                cproductNames: item.cproductNames,
                cproductIds: item.cproductIds,
                contractTime: item.contractTime,
                rebate: item.rebate,
                gift: item.gift,
                type: 1,
                packPrice: item.packPrice,
                dproductNames: item.dproductNames,
                dproductIds: item.dproductIds,
                expandTime: item.expandTime,
                productCategoryName: item.productCategoryName

              }
            } else {
              return {
                productNumMin: item.productNumMin,
                productNumMax: item.productNumMax,
                contractAmountMin: item.contractAmountMin,
                contractAmountMax: item.contractAmountMax,
                cproductNames: item.cproductNames,
                cproductIds: item.cproductIds,
                contractTime: item.contractTime,
                rebate: item.rebate,
                gift: item.gift,
                type: 2,
                packPrice: item.packPrice,
                dproductNames: item.dproductNames,
                dproductIds: item.dproductIds,
                expandTime: item.expandTime,
                productCategoryName: item.productCategoryName
              }
            }
          });
          this.$Spin.hide();
        });
      },
      goBack() {
        this.$router.push({
          name: 'preferentialStrategyList'
        })
      }
    }
  }
</script>