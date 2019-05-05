<style lang="less" scoped>
  @import 'productDetail.less';
  .over-auto{
  overflow: auto;
  padding: 10px 20px;
}
</style>
<template>
  <Row>
    <Col span="24">
      <Row class-name="current-position">
        当前位置：产品中心&nbsp;&nbsp;>>&nbsp;&nbsp;产品管理&nbsp;&nbsp;>>&nbsp;&nbsp;详情
      </Row>
    </Col>
    <Col span="24" class="container">
      <h2>《{{listData.productNameCn}}》产品详情</h2>
      <div class="table">
        <div class="height-60 font-s18 flex-center">产品基本信息</div>
        <div class="flex border-top height-60">
          <div class="flex-title">产品名称:</div>
          <div class="flex-val flex-1 text-center">{{listData.productNameCn}}</div>
          <div class="flex-title ">英文名称:</div>
          <div class="flex-val flex-1 text-center">{{listData.productNameEn}}</div>
        </div>
        <div class="flex border-top height-60">
          <div class="flex-title">简称:</div>
          <div class="flex-val flex-1 text-center">{{listData.shortNameCn}}</div>
          <div class="flex-title ">英文简称:</div>
          <div class="flex-val flex-1 text-center">{{listData.shortNameEn}}</div>
        </div>
        <div class="flex border-top height-60">
          <div class="flex-title">产品分类:</div>
          <div class="flex-val flex-1 text-center">{{listData.productCategoryName}}</div>
          <div class="flex-title ">企业类型:</div>
          <div class="flex-val flex-1 text-center">{{listData.enterpriseCategory}}</div>
        </div>
        <div class="flex border-top height-60">
          <div class="flex-title">源产品:</div>
          <div class="flex-val flex-1">
            <span class="mar-l-20" v-for="(item, index) in listData.sourceProduct" :key="index">{{item.sourceName}}</span>
          </div>
        </div>
        <div class="flex border-top height-60">
          <div class="flex-title">成本价:</div>
          <div class="flex-val flex-1 text-center mar-l--50">{{listData.basePrice}}</div>
        </div>
        <div class="flex border-top height-60">
          <div class="flex-title">是否可持续销售:</div>
          <div class="flex-val flex-1 text-center">{{listData.isContinuedDes}}</div>
          <div class="flex-title ">所属站点:</div>
          <div class="flex-val flex-1 text-center">{{listData.siteName}}</div>
        </div>
        <div class="flex height-80 border-top">
          <div class="flex-title">分类合同条款:</div>
          <div class="flex-1 over-auto font-s14">
            <p v-for="(item, index) in listData.contractList" :key="index">
              <span v-if="listData.contractList.length-1 == index">{{item.priority}}、{{item.contentCn}}。</span>
              <span v-else>{{item.priority}}、{{item.contentCn}};</span>
            </p>
          </div>
        </div>
        <div class="flex height-80 border-top">
          <div class="flex-title">英文条款:</div>
          <div class="flex-1 over-auto font-s14">
            <p class="word-wrap" v-for="(item, index) in listData.contractList" :key="index">
              <span v-if="listData.contractList.length-1 == index">{{item.priority}}、{{item.contentEn}}。</span>
              <span v-else>{{item.priority}}、{{item.contentEn}};</span>
            </p>
          </div>
        </div>
        <div class="flex height-80 border-top">
          <div class="flex-title">产品描述:</div>
          <div class="flex-1 over-auto font-s14">{{listData.productDesc}}</div>
        </div>
        <div class="flex height-80 border-top">
          <div class="flex-title">英文描述:</div>
          <div class="flex-1 over-auto font-s14">
            <div class="word-wrap">{{listData.productDescEn}}</div>
          </div>
        </div>
        <div class="height-60 font-s18 flex-center border-top">关联信息</div>
        <div class="flex height-180 border-top">
          <div class="flex-title">频道:</div>
          <div class="flex-value flex-1 pad-l-20">
            <!-- <p class="mar-t-12" v-for="n in 4" :key="n"> -->
            <p class="mar-t-12" v-for="item in listData.channelList" :key="item.name">
              {{item.name}}
            </p>
          </div>
        </div>
        <div class="flex height-180 border-top">
          <div class="flex-title">栏目:</div>
          <div class="flex-value flex-1 pad-l-20">
            <!-- <p class="mar-t-12" v-for="n in 4" :key="n"> -->
            <p class="mar-t-12" v-for="item in listData.itemList" :key="item.name">
              {{item.name}}
            </p>
          </div>
        </div>
        <div class="flex height-180 border-top">
          <div class="flex-title">信息分类:</div>
          <div class="flex-value flex-1 pad-l-20">
            <!-- <p class="mar-t-12" v-for="n in 4" :key="n"> -->
            <p class="mar-t-12" v-for="item in listData.messageCatagoryList" :key="item.name">
              {{item.name}}
            </p>
          </div>
        </div>
        <div class="flex height-180 border-top">
          <div class="flex-title">品种:</div>
          <div class="flex-value flex-1 pad-l-20">
            <p class="mar-t-12" v-for="item in listData.breedList" :key="item.breedId">
              {{item.name}}
            </p>
          </div>
        </div>
        <div class="flex height-180 border-top">
          <div class="flex-title">城市:</div>
          <div class="flex-value flex-1 pad-l-20">
            <p class="mar-t-12" v-for="item in listData.areaList" :key="item.name">
              {{item.name}}
            </p>
          </div>
        </div>
        <div class="flex height-180 border-top">
          <div class="flex-title">企业:</div>
          <div class="flex-value flex-1 pad-l-20">
            <p class="mar-t-12" v-for="item in listData.memberList" :key="item.name">
              {{item.name}}
            </p>
          </div>
        </div>
        <div class="height-60 font-s18 flex-center border-top">定价信息</div>
        <div class="flex height-60 border-top">
          <div class="flex-title">系统销售价:</div>
          <div class="flex-val flex-1 text-center">{{listData.productPrice}}</div>
          <div class="flex-title ">市场销售价:</div>
          <div class="flex-val flex-1 text-center">{{listData.afterDiscountPrice}}</div>
        </div>
        <div class="flex height-60 border-top">
          <div class="flex-title">优惠折扣:</div>
          <div class="flex-val flex-1 text-center">{{listData.specialDiscount}}</div>
          <div class="flex-title ">单位:</div>
          <div class="flex-val flex-1 text-center">{{listData.unitDes}}/{{listData.buyPeriodDes}}</div>
        </div>
        <div class="flex height-250 border-top">
          <div class="flex-title">业务归属品种及分成比例:</div>
          <div class="flex-1 text-center" style="font-size: 14px;overflow: auto;">
            <Table class="tableCommon" :columns="columns" :data="listData.propertionList"></Table>
          </div>
        </div>
        <div class="height-60 font-s18 flex-center border-top">产品说明</div>
        <div class="flex height-60 border-top">
          <div class="flex-title">产品备注:</div>
          <div class="flex-val flex-1 text-center">{{listData.productNote}}</div>
          <!-- <div class="flex-title ">产品说明:</div>
          <div class="flex-val flex-1 text-center blue">{{listData.productInstructUrl}}</div> -->
        </div>
        <div class="flex height-60 border-top">
          <div class="flex-title">上传附件:</div>
          <div class="flex-val flex-1 text-center blue">
            <a style="margin-right: 20px" v-for="item in listData.attachList" :href="(urlHead+item.url)">{{item.attaName}}</a>
          </div>
        </div>
        <div class="height-60 font-s18 flex-center border-top">操作信息</div>
        <div class="flex height-60 border-top">
          <div class="flex-title">创建信息:</div>
          <div class="flex-val flex-1 text-center">
            <span class="icon-user"></span>
            <span>创建人: {{listData.creator}}</span>
            <span class="icon-time mar-l-20"></span>
            <span>创建时间：{{listData.createTime}}</span>
          </div>
          <div class="flex-title ">最后修改信息:</div>
          <div class="flex-val flex-1 text-center">
            <span class="icon-user"></span>
            <span>修改人：{{listData.operator}}</span>
            <span class="icon-time mar-l-20"></span>
            <span>修改时间：{{listData.operateTime}}</span>
          </div>
        </div>
        <div class="flex height-60 border-top">
          <div class="flex-title">下架原因:</div>
          <div class="flex-val flex-1 text-center mar-l--50">{{listData.reason}}</div>
        </div>
      </div>
      <div class="btn-back">
        <Button type="primary" @click="back">返回</Button>
      </div>
    </Col>
  </Row>
</template>
<script>
import { proSmsdetail } from '../components/axios/productCenter.js'
import { urlHead } from '../../assets/js/common.js'
export default {
  data() {
    return {
      productId: this.$route.query.id,
      productVersionId: this.$route.query.vid,
      listData: '',
      urlHead: '',
      columns: [
        {
          title: '序号',
          type: 'index'
        },
        {
          title: '业务归属品种',
          key: 'breedName'
        },
        {
          title: '分成比例',
          key: 'percent',
          render: (h, data) => {
            return h('span', {}, `${data.row.percent * 100}%`)
          }
        }
      ]
    }
  },
  created() {
    this.urlHead = urlHead
    this.getDetail()
  },
  methods: {
    //排序
    sortId (a,b){
       return a.priority-b.priority
    },
    // 获取详情
    getDetail() {
      let form = {
          productId: this.productId,
          productVersionId: this.productVersionId || 1
      }
      proSmsdetail(form).then(res => {
        this.listData = res.response
        console.log(this.listData.contractList)
        console.log(res)
        this.listData.contractList.sort(this.sortId)
      })
    },
    // 返回
    back () {
      this.$router.push({
        name: 'productManager'
      })
    }
  }
}
</script>
