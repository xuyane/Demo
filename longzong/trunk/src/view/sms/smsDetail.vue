<style lang="less" scoped>
    @import './sms.less';
</style>

<template>
    <Row>
        <Col span="24">
            <Row class-name="current-position">
                当前位置：产品中心&nbsp;&nbsp;>>&nbsp;&nbsp;短信套餐&nbsp;&nbsp;>>&nbsp;&nbsp;详情
             </Row>
        </Col>
        <Col span="24" style="background-color: #fff;padding-top: 20px">
            <Row>
                <Col span="24">
                    <div class="header-con">
                        <h3>《{{ productDetailList.productNameCn }}》产品详情</h3>
                    </div>
                </Col>
                <Col span="24">
                    <Row class="sms-detail-title">
                        产品信息
                    </Row>
                </Col>
                <Col span="24">
                    <Row>
                        <Col span="6"><p class="sms-detail-con">产品名称:</p></Col>
                        <Col span="6" class="sms-detail-con">{{productDetailList.productNameCn}}</Col>
                        <Col span="6"><p class="sms-detail-con">英文名称:</p></Col>
                        <Col span="6" class="sms-detail-con">{{productDetailList.productNameEn}}</Col>
                    </Row>
                    <Row>
                        <Col span="6"><p class="sms-detail-con">简&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp称:</p></Col>
                        <Col span="6" class="sms-detail-con">{{productDetailList.shortNameCn}}</Col>
                        <Col span="6"><p class="sms-detail-con">英文简称:</p></Col>
                        <Col span="6" class="sms-detail-con">{{productDetailList.shortNameEn}}</Col>
                    </Row>
                    <Row>
                        <Col span="6"><p class="sms-detail-con">产品分类:</p></Col>
                        <Col span="6" class="sms-detail-con">{{productDetailList.productCategoryName}}</Col>
                        <Col span="6"><p class="sms-detail-con">企业类型:</p></Col>
                        <Col span="6" class="sms-detail-con">{{productDetailList.enterpriseCategory}}</Col>
                    </Row>
                    <Row>
                        <Col span="6"><p class="sms-detail-con">短信产品:</p></Col>
                        <Col span="18" class="sms-detail-lr">
                            <span class="mar-r-20" v-for="item in productDetailList.sourceProduct" :key="item.sourceId">{{item.sourceName}}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="6"><p class="sms-detail-con">短信描述:</p></Col>
                        <Col span="18" class="sms-detail-lr">{{productDetailList.productDesc}}</Col>
                    </Row>
                    <Row>
                        <Col span="6"><p class="sms-detail-con">英文描述:</p></Col>
                        <Col span="18" class="sms-detail-lr">{{productDetailList.productDescEn}}</Col>
                    </Row>
                </Col>
                <Col span="24">
                    <Row class="sms-detail-con">
                    定价信息
                    </Row>
                </Col>
                <Col span="24">
                    <Row>
                        <Col span="6" class="sms-detail-con">系统销售价:</Col>
                        <Col span="6" class="sms-detail-con">{{productDetailList.productPrice}}</Col>
                        <Col span="6" class="sms-detail-con">优惠折扣:</Col>
                        <Col span="6" class="sms-detail-con">{{productDetailList.specialDiscount*100}}%</Col>
                    </Row>
                    <Row>
                        <Col span="6" class="sms-detail-con">市场销售价:</Col>
                        <Col span="6" class="sms-detail-con">{{productDetailList.afterDiscountPrice}}</Col>
                        <Col span="6" class="sms-detail-con">单位:</Col>
                        <Col span="6" class="sms-detail-con">{{productDetailList.unitDes}}/{{productDetailList.buyPeriodDes}}</Col>
                    </Row>
                </Col>
                <Col span="24">
                    <Row>
                        <Col span="6" class="sms-detail-table">业务归属品种及分成比例:</Col>
                        <Col span="18" style="height: 260px;border-right: 1px solid #ddd;border-bottom: 1px solid #ddd;overflow-y: scroll">
                            <Table class="tableCommon" :data="productDetailList.propertionList" :columns="columns" ref="dragTable" :stripe="true" :border="true"></Table>
                        </Col>
                    </Row>
                </Col>
                <Col span="24" class="margin-top-18" style="text-align: center;">
                    <div class="btn-container">
                        <Button type="primary" class="search-btn" @click="voidSms">返回</Button>
                    </div>
                </Col>
            </Row>
        </Col>
    </Row>
</template>

<script>
import { proSmsdetail } from '../components/axios/productCenter.js'
export default {
    name: 'smsDetail',
    data () {
        return {
            productDetailList: '',
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
                    render: (h,data) => {
                        return h('span', (data.row.percent*100)+'%')
                    }
                }
            ]
        };
    },
    created() {
        this.init()
    },
    methods:{
        // 获取短信套餐详情
        init(){
            let productId = this.$route.query.productId;
            let productVersionId = this.$route.query.productVersionId;
            var that = this;
            var sourceProductArr = [];
            let form = {
                productId : productId,
                productVersionId : productVersionId || 1
            }
            proSmsdetail(form).then(res => {
                that.productDetailList = res.response
            })
        },
        voidSms () {
            this.$router.push({
            name: 'smsManager'
        })
    }
    }
}
</script>



