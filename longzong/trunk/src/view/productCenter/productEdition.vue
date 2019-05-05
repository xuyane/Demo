<style lang="less" scoped>

  @import './productEdition.less';

</style>
<template>
  <Row>
    <Col span="24">
      <Row class-name="current-position">
        当前位置：产品中心&nbsp;&nbsp;>>&nbsp;&nbsp;产品管理&nbsp;&nbsp;>>&nbsp;&nbsp;产品版本
      </Row>
    </Col>
    <Col span="24" class="production-content">
      <Row>
        <Col span="24">
          <Row>
            <p class="product-title pad-top-35">{{title}}</p>
          </Row>
        </Col>
        <Col span="24" class="search-form">
          <Row>
            <Col span="7">
              <Form :label-width="100">
                <Row type="flex" justify="space-between">
                  <Col span="24">
                    <FormItem label="选择版本:">
                      <Select v-model="chooseProductEdition" class="edition-select"  placeholder="请选择产品版本" @on-change="productShow">
                        <Option v-for="item in productEdition" :value="item.productVerId" :key="item.productVerId">{{item.productVersion}}</Option>
                      </Select>
                    </FormItem>
                  </Col>
                </Row>
              </Form>
            </Col>
            <Col span="17">
              <span class="show-product-ver" v-for="(item,index) in productVerShow">
                {{item.productVersion}}
                <i class="icon-delete pull-right margin-top-6" @click="deleteVer(item,item.productVerId,index)"></i>
              </span>
            </Col>
          </Row>
        </Col>
        <Col span="24">
          <Row class="border-top border-bottom">
            <Col span="4" class="top-title col-base-style border-left border-right">产品版本</Col>
            <Col span="20">
              <Row>
                <Col v-for="(item,index) in productEditionDetails" :key="index" :span="parseInt(24/productEditionDetails.length)" class="top-title col-base-style border-right">{{item.productVersion}}</Col>
              </Row>
            </Col>
          </Row>
          <Row class="border-bottom">
            <Col span="4" class="col-base-style border-left"></Col>
            <Col span="20" class="col-base-style border-right">基本信息</Col>
          </Row>
          <Row class="border-bottom">
            <Col span="4" class="left-title col-base-style border-left border-right">产品名称:</Col>
            <Col span="20">
              <Row>
                <Col v-for="(item,index) in productEditionDetails" :key="index" :span="parseInt(24/productEditionDetails.length)" class="col-base-style border-right">
                  {{item.productNameCn}}
                </Col>
              </Row>
            </Col>
          </Row>
          <Row class="border-bottom">
            <Col span="4" class="left-title col-base-style border-left border-right">英文名称:</Col>
            <Col span="20">
              <Row>
                <Col v-for="(item,index) in productEditionDetails" :key="index" :span="parseInt(24/productEditionDetails.length)" class="col-base-style border-right">
                  {{item.productNameEn}}
                </Col>
              </Row>
            </Col>
          </Row>
          <Row class="border-bottom">
            <Col span="4" class="left-title col-base-style border-left border-right">简    称:</Col>
            <Col span="20">
              <Row>
                <Col v-for="(item,index) in productEditionDetails" :key="index" :span="parseInt(24/productEditionDetails.length)" class="col-base-style border-right">
                  {{item.shortNameCn}}
                </Col>
              </Row>
            </Col>
          </Row>
          <Row class="border-bottom">
            <Col span="4" class="left-title col-base-style border-left border-right">英文简称:</Col>
            <Col span="20">
              <Row>
                <Col v-for="(item,index) in productEditionDetails" :key="index" :span="parseInt(24/productEditionDetails.length)" class="col-base-style border-right">
                  {{item.shortNameEn}}
                </Col>
              </Row>
            </Col>
          </Row>
          <Row class="border-bottom">
            <Col span="4" class="left-title col-base-style border-left border-right">产品分类:</Col>
            <Col span="20">
              <Row>
                <Col v-for="(item,index) in productEditionDetails" :key="index" :span="parseInt(24/productEditionDetails.length)" class="col-base-style border-right">
                  {{item.productCategoryName}}
                </Col>
              </Row>
            </Col>
          </Row>
          <Row class="border-bottom">
            <Col span="4" class="left-title col-base-style border-left border-right">企业类型:</Col>
            <Col span="20">
              <Row>
                <Col v-for="(item,index) in productEditionDetails" :key="index" :span="parseInt(24/productEditionDetails.length)" class="col-base-style border-right">
                  {{item.enterpriseCategory}}
                </Col>
              </Row>
            </Col>
          </Row>
          <Row class="border-bottom">
            <Col span="4" class="left-title col-base-style border-left border-right line-height-90">源产品:</Col>
            <Col span="20">
              <Row>
                <Col v-for="(item,index) in productEditionDetails" :key="index" :span="parseInt(24/productEditionDetails.length)" class="col-base-style border-right height-90">
                  {{item.sourceProduct}}
                </Col>
              </Row>
            </Col>
          </Row>
          <Row class="border-bottom">
            <Col span="4" class="left-title col-base-style border-left border-right">成本价:</Col>
            <Col span="20">
              <Row>
                <Col v-for="(item,index) in productEditionDetails" :key="index" :span="parseInt(24/productEditionDetails.length)" class="col-base-style border-right">
                  {{item.basePrice}}
                </Col>
              </Row>
            </Col>
          </Row>
          <Row class="border-bottom">
            <Col span="4" class="left-title col-base-style border-left border-right">是否续入:</Col>
            <Col span="20">
              <Row>
                <Col v-for="(item,index) in productEditionDetails" :key="index" :span="parseInt(24/productEditionDetails.length)" class="col-base-style border-right">
                  {{item.isContinued}}
                </Col>
              </Row>
            </Col>
          </Row>
          <Row class="border-bottom">
            <Col span="4" class="left-title col-base-style border-left border-right">所属站点:</Col>
            <Col span="20">
              <Row>
                <Col v-for="(item,index) in productEditionDetails" :key="index" :span="parseInt(24/productEditionDetails.length)" class="col-base-style border-right">
                  {{item.siteName}}
                </Col>
              </Row>
            </Col>
          </Row>
          <Row class="border-bottom">
            <Col span="4" class="left-title col-base-style border-left border-right line-height-146">分类合同条款:</Col>
            <Col span="20">
              <Row>
                <Col v-for="(item,index) in productEditionDetails" :key="index" :span="parseInt(24/productEditionDetails.length)" class="col-base-style border-right height-146">
                  <div class="align-left" v-for="(contractList,index) in item.contractList" :key="index">{{contractList.priority}}、{{contractList.contentCn}}</div>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row class="border-bottom">
            <Col span="4" class="left-title col-base-style border-left border-right line-height-146">英文条款:</Col>
            <Col span="20">
              <Row>
                <Col v-for="(item,index) in productEditionDetails" :key="index" :span="parseInt(24/productEditionDetails.length)" class="col-base-style border-right height-146">
                  <div class="align-left" v-for="(contractList,index) in item.contractList" :key="index">{{contractList.priority}}、{{contractList.contentEn}}</div>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row class="border-bottom">
            <Col span="4" class="left-title col-base-style border-left border-right line-height-146">产品描述:</Col>
            <Col span="20">
              <Row>
                <Col v-for="(item,index) in productEditionDetails" :key="index" :span="parseInt(24/productEditionDetails.length)" class="col-base-style border-right height-146 align-left">
                  {{item.productDesc}}
                </Col>
              </Row>
            </Col>
          </Row>
          <Row class="border-bottom">
            <Col span="4" class="left-title col-base-style border-left border-right line-height-146">英文描述:</Col>
            <Col span="20">
              <Row>
                <Col v-for="(item,index) in productEditionDetails" :key="index" :span="parseInt(24/productEditionDetails.length)" class="col-base-style border-right height-146 align-left">
                  {{item.productDescEn}}
                </Col>
              </Row>
            </Col>
          </Row>
          <Row class="border-bottom">
            <Col span="4" class="col-base-style border-left"></Col>
            <Col span="20" class="col-base-style border-right">相关信息</Col>
          </Row>
          <Row class="border-bottom">
            <Col span="4" class="left-title col-base-style border-left border-right line-height-185">频道:</Col>
            <Col span="20">
              <Row>
                <Col v-for="(item,index) in productEditionDetails" :key="index" :span="parseInt(24/productEditionDetails.length)" class="col-base-style border-right height-185-line-30">
                  <div class="product-message-box">
                    <p class="align-left" v-for="(messageCategory,index) in item.channelList" :key="index">{{messageCategory}}</p>
                  </div>
                  <p v-if="item.channelList && item.channelList.length > 3" class="align-right"><a @click="moreShow('频道',item.channelList)"><span>更多</span><i class="ivu-icon ivu-icon-ios-arrow-dropright"></i></a></p>
                  <p v-else hidden></p>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row class="border-bottom">
            <Col span="4" class="left-title col-base-style border-left border-right line-height-185">栏目:</Col>
            <Col span="20">
              <Row>
                <Col v-for="(item,index) in productEditionDetails" :key="index" :span="parseInt(24/productEditionDetails.length)" class="col-base-style border-right height-185-line-30">
                  <div class="product-message-box">
                    <p class="align-left" v-for="(messageCategory,index) in item.itemList" :key="index">{{messageCategory}}</p>
                  </div>
                  <p v-if="item.itemList && item.itemList.length > 3" class="align-right"><a @click="moreShow('栏目',item.itemList)"><span>更多</span><i class="ivu-icon ivu-icon-ios-arrow-dropright"></i></a></p>
                  <p v-else hidden></p>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row class="border-bottom">
            <Col span="4" class="left-title col-base-style border-left border-right line-height-185">信息分类:</Col>
            <Col span="20">
              <Row>
                <Col v-for="(item,index) in productEditionDetails" :key="index" :span="parseInt(24/productEditionDetails.length)" class="col-base-style border-right height-185-line-30">
                  <div class="product-message-box">
                    <p class="align-left" v-for="(messageCategory,index) in item.messageCategoryList" :key="index">{{messageCategory}}</p>
                  </div>
                  <p v-if="item.messageCategoryList && item.messageCategoryList.length > 3" class="align-right"><a @click="moreShow('信息分类',item.messageCategoryList)"><span>更多</span><i class="ivu-icon ivu-icon-ios-arrow-dropright"></i></a></p>
                  <p v-else hidden></p>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row class="border-bottom">
            <Col span="4" class="left-title col-base-style border-left border-right line-height-185">品 种:</Col>
            <Col span="20">
              <Row>
                <Col v-for="(item,index) in productEditionDetails" :key="index" :span="parseInt(24/productEditionDetails.length)" class="col-base-style border-right height-185-line-30">
                  <div class="product-message-box">
                    <p class="align-left" v-for="(messageCategory,index) in item.breedList" :key="index">{{messageCategory}}</p>
                  </div>
                  <p v-if="item.breedList && item.breedList.length > 3" class="align-right"><a @click="moreShow('品    种',item.breedList)"><span>更多</span><i class="ivu-icon ivu-icon-ios-arrow-dropright"></i></a></p>
                  <p v-else hidden></p>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row class="border-bottom">
            <Col span="4" class="left-title col-base-style border-left border-right line-height-185">城    市:</Col>
            <Col span="20">
              <Row>
                <Col v-for="(item,index) in productEditionDetails" :key="index" :span="parseInt(24/productEditionDetails.length)" class="col-base-style border-right height-185-line-30">
                  <div class="product-message-box">
                    <p class="align-left" v-for="(messageCategory,index) in item.areaList" :key="index">{{messageCategory}}</p>
                  </div>
                  <p v-if="item.areaList && item.areaList.length > 3" class="align-right"><a @click="moreShow('城    市',item.areaList)"><span>更多</span><i class="ivu-icon ivu-icon-ios-arrow-dropright"></i></a></p>
                  <p v-else hidden></p>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row class="border-bottom">
            <Col span="4" class="left-title col-base-style border-left border-right line-height-185">企    业:</Col>
            <Col span="20">
              <Row>
                <Col v-for="(item,index) in productEditionDetails" :key="index" :span="parseInt(24/productEditionDetails.length)" class="col-base-style border-right height-185-line-30">
                  <div class="product-message-box">
                    <p class="align-left" v-for="(messageCategory,index) in item.memberList" :key="index">{{messageCategory}}</p>
                  </div>
                  <p v-if="item.memberList && item.memberList.length > 3" class="align-right"><a @click="moreShow('企    业',item.memberList)"><span>更多</span><i class="ivu-icon ivu-icon-ios-arrow-dropright"></i></a></p>
                  <p v-else hidden></p>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row class="border-bottom">
            <Col span="4" class="col-base-style border-left"></Col>
            <Col span="20" class="col-base-style border-right">定价信息</Col>
          </Row>
          <Row class="border-bottom">
            <Col span="4" class="left-title col-base-style border-left border-right">系统销售价:</Col>
            <Col span="20">
              <Row>
                <Col v-for="(item,index) in productEditionDetails" :key="index" :span="parseInt(24/productEditionDetails.length)" class="col-base-style border-right">
                  {{item.productPrice}}
                </Col>
              </Row>
            </Col>
          </Row>
          <Row class="border-bottom">
            <Col span="4" class="left-title col-base-style border-left border-right">优惠折扣:</Col>
            <Col span="20">
              <Row>
                <Col v-for="(item,index) in productEditionDetails" :key="index" :span="parseInt(24/productEditionDetails.length)" class="col-base-style border-right">
                  {{item.specialDiscount}}
                </Col>
              </Row>
            </Col>
          </Row>
          <Row class="border-bottom">
            <Col span="4" class="left-title col-base-style border-left border-right">市场销售价:</Col>
            <Col span="20">
              <Row>
                <Col v-for="(item,index) in productEditionDetails" :key="index" :span="parseInt(24/productEditionDetails.length)" class="col-base-style border-right">
                  {{item.afterDiscountPrice}}
                </Col>
              </Row>
            </Col>
          </Row>
          <Row class="border-bottom">
            <Col span="4" class="left-title col-base-style border-left border-right">单位:</Col>
            <Col span="20">
              <Row>
                <Col v-for="(item,index) in productEditionDetails" :key="index" :span="parseInt(24/productEditionDetails.length)" class="col-base-style border-right">
                  {{item.unit}}/{{item.buyPeriod}}
                </Col>
              </Row>
            </Col>
          </Row>
          <Row class="border-bottom">
            <Col span="4" class="left-title col-base-style border-left border-right tow-line-185">业务归属品种</br>及分成比例:</Col>
            <Col span="20">
              <Row>
                <Col v-for="(item,index) in productEditionDetails" :key="index" :span="parseInt(24/productEditionDetails.length)" class="col-base-style border-right height-185-line-30">
                  <div class="product-message-box">
                    <p class="align-left" v-for="(messageCategory,index) in item.propertionList" :key="index">
                      <span>{{messageCategory.breedName}}</span>
                      <span style="margin-left: 30px">{{(messageCategory.percent*100).toFixed(2)}}%</span>
                    </p>
                  </div>
                  <p v-if="item.propertionList && item.propertionList.length > 3" class="align-right"><a @click="moreShow('业务归属品种及分成比例',item.propertionList)"><span>更多</span><i class="ivu-icon ivu-icon-ios-arrow-dropright"></i></a></p>
                  <p v-else hidden></p>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row class="border-bottom">
            <Col span="4" class="col-base-style border-left"></Col>
            <Col span="20" class="col-base-style border-right">产品说明</Col>
          </Row>
          <!-- <Row class="border-bottom">
            <Col span="4" class="left-title col-base-style border-left border-right">产品说明书:</Col>
            <Col span="20">
              <Row>
                <Col v-for="(item,index) in productEditionDetails" :key="index" :span="parseInt(24/productEditionDetails.length)" class="col-base-style border-right">
                  <a :href="item.productInstructionUrl" target="_blank">{{item.productInstructionName}}</a>
                </Col>
              </Row>
            </Col>
          </Row> -->
          <Row class="border-bottom">
            <Col span="4" class="left-title col-base-style border-left border-right">上传附件:</Col>
            <Col span="20">
              <Row>
                <Col v-for="(item,index) in productEditionDetails" :key="index" :span="parseInt(24/productEditionDetails.length)" class="col-base-style border-right">
                  <!-- <a v-for="(attachList,index) in item.attachList" :key="index" target="_blank" :href="attachList.url">{{attachList.attaName}}</a> -->
                  <a v-for="(attachList,index) in item.attachList" :key="index" target="_blank" :href="(urlHead+attachList.url)">{{attachList.attaName}}</a>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row class="border-bottom">
            <Col span="4" class="left-title col-base-style border-left border-right">产品备注:</Col>
            <Col span="20">
              <Row>
                <Col v-for="(item,index) in productEditionDetails" :key="index" :span="parseInt(24/productEditionDetails.length)" class="col-base-style border-right">
                  {{item.productNote}}
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
    <Col span="24">
      <Modal
        v-model="productModule.show"
        :closable="false">
        <p slot="header" style="text-align:center">
            <span v-model="productModule.title">{{productModule.title}}</span>
        </p>
        <div v-if="productModule.title == '业务归属品种及分成比例'">
          <p class="font-size-16" v-for="(item,index) in productModule.data" @key="index">
            <span>{{item.breedName}}</span>
            <span>{{(item.percent*100).toFixed(2)}}%</span>
          </p>
        </div>
        <div v-else>
          <p class="font-size-16" v-for="(item,index) in productModule.data" @key="index">{{item}}</p>
        </div>
        <div slot="footer">
            <Button type="primary" @click="productModule.show=false">关闭</Button>
        </div>
    </Modal>
    </Col>
  </Row>
</template>

<script>
  import { versionCompare, selectCompareProductVersion } from '../components/axios/productCenter.js'
  import { formData, urlHead } from "../../assets/js/common.js";
  export default{
    data () {
      return {
        title: "《石化产品分析报告》日志详情",
        productVerId: [],
        urlHead: '',
        productId: Number(this.$route.query.id),
        productVerShow: [],
        productModule: {
          show: false,
          data: [],
          title: ""
        },
        productEdition: [],
        chooseProductEdition: [],
        productEditionDetails: []
      }
    },
    created (){
      let that = this;
      this.urlHead = urlHead
      let params = {
        proVerIds:this.productVerId.join(','),
        productId: this.productId
      };
      let productId = {
        proId: this.productId
      };
      this.getProductVer(productId);
      this.getProductDetails(params);
    },
    methods: {
      productShow (data) {
        let isAdd = true
        for(let i=0; i <this.productVerId.length; i++){
          if(data == this.productVerId[i]){
            isAdd = false;
          }
        }
        if(this.productVerShow.length == 4){
          this.$Message.error('产品版本最多不超过四个');
        }else {
          if(isAdd){
            if(data){
              this.productVerId.push(data);
            }
            for(let i=0; i <this.productEdition.length; i++){
              if(data == this.productEdition[i].productVerId){
                this.productVerShow.push(this.productEdition[i]);
              }
            };
            let params = {
              proVerIds:this.productVerId.join(','),
              productId: this.productId
            };
            this.getProductDetails(params);
          }
        };
      },
      getProductDetails (params){//获取版本信息
        let that = this;
        versionCompare(formData(params)).then(res => {
          let list = res.response;
          that.productEditionDetails = res.response;
          if(that.productVerId == ''){
            if(list.length > 3) {
              that.productEditionDetails = list.slice(0,3);
            }
          }else{
            that.productEditionDetails = list;
          }
        })
      },
      getProductVer (params){//获取版本号
        let that = this;
        selectCompareProductVersion(params).then(res => {
          that.productEdition = res.response;
        })
      },
      moreShow (title,data) {
        this.productModule.title = title;
        this.productModule.data = data;
        this.productModule.show = true;
      },
      deleteVer (productVer,productVerId,index) {
        this.productVerId = [];
        this.productVerShow.splice(index,1);
        for(let i=0; i<this.productVerShow.length;i++){
          this.productVerId.push(this.productVerShow[i].productVerId)
        };
        let params = {
          proVerIds:this.productVerId.join(','),
          productId: this.productId
        };
        this.getProductDetails(params);
        this.chooseProductEdition=[]
      }
    }
  }
</script>
