<style lang="less" scoped>
  .change-log-detail-title{
    font-weight: 900;
    margin-bottom: 10px;
    text-align: center
  }
  .over-hidden{
    overflow: hidden;
  }
</style>

<template>
  <Row>
    <Col span="24">
      <Row class-name="current-position">
        当前位置：产品中心&nbsp;&nbsp;>>&nbsp;&nbsp;变更日志>>&nbsp;&nbsp;产品日志
      </Row>
    </Col>
    <Col span="24" class="table-con">
      <Table class="tableCommon" :data="tableData" :columns="columns" ref="dragTable" :stripe="true" :border="true">

      </Table>
      <div class="page-con">
        <span>第{{pagesMessage.pageNum}}页 / 共{{pages}}页   每页{{pagesMessage.pageSize}}条   共{{total}}条</span>
        <Page :total="total" :page-size="pagesMessage.pageSize" :current="pagesMessage.pageNum" show-elevator class="pull-right" show-sizer @on-change="getpages" @on-page-size-change="getPageSize" ></Page>
      </div>
    </Col>
    <Col span="24">
      <Modal
        v-model="modalShow"
        width = "660px"
        style="overflow: hidden"
        :closable="false">
        <p slot="header" style="text-align:center">
            <span>日志详情</span>
        </p>
        <div class="over-hidden" style="width: 660px">
          <div class="pull-left" style="width: 300px;margin-right: 20px;">
            <div class="change-log-detail-title">
              变更后
            </div>
            <div class="over-hidden">
              <span class="pull-left mar-r-10">产品中文名称:</span>
              <span class="pull-left">{{productChange.productChangeAfter.productNameCn}}</span>
            </div>
            <div class="over-hidden">
              <span class="pull-left mar-r-10">产品英文名称:</span>
              <span class="pull-left">{{productChange.productChangeAfter.productNameEn}}</span>
            </div>
            <div class="over-hidden">
              <span class="pull-left mar-r-10">中文简称:</span>
              <span class="pull-left">{{productChange.productChangeAfter.shortNameCn}}</span>
            </div>
            <div class="over-hidden">
              <span class="pull-left mar-r-10">英文简称:</span>
              <span class="pull-left">{{productChange.productChangeAfter.shortNameEn}}</span>
            </div>
            <div class="over-hidden">
              <span class="pull-left mar-r-10">是否续入:</span>
              <span class="pull-left">{{productChange.productChangeAfter.isContinued}}</span>
            </div>
            <div class="over-hidden">
              <span class="pull-left mar-r-10">产品分类:</span>
              <span class="pull-left">{{productChange.productChangeAfter.productCategoryName}}</span>
            </div>
            <div class="over-hidden">
              <span class="pull-left mar-r-10">所属站点:</span>
              <span class="pull-left">{{productChange.productChangeAfter.siteName}}</span>
            </div>
            <div class="over-hidden">
              <span class="pull-left mar-r-10">关联频道:</span>
              <div class="pull-left">
                <div v-for="item in productChange.productChangeAfter.channelArray">
                  <span>{{item}}</span>
                </div>
              </div>
            </div>
            <div class="over-hidden">
              <span class="pull-left mar-r-10">关联栏目:</span>
              <div class="pull-left">
                <div v-for="item in productChange.productChangeAfter.columnArray">
                  <span>{{item}}</span>
                </div>
              </div>
            </div>
            <div class="over-hidden">
              <span class="pull-left mar-r-10">关联企业:</span>
              <div class="pull-left">
                <div v-for="item in productChange.productChangeAfter.memberArray">
                  <span>{{item}}</span>
                </div>
              </div>
            </div>
            <div class="over-hidden">
              <span class="pull-left mar-r-10">关联品种:</span>
              <div class="pull-left">
                <div v-for="item in productChange.productChangeAfter.propertionArray">
                  <span>{{item.breedName}}</span>
                  <span>{{item.percent}}</span>
                </div>
              </div>
            </div>
            <div class="over-hidden">
              <span class="pull-left mar-r-10">关联城市:</span>
              <div class="pull-left">
                <div v-for="item in productChange.productChangeAfter.areaArray">
                  <span>{{item}}</span>
                </div>
              </div>
            </div>
            <div class="over-hidden">
              <span class="pull-left mar-r-10">关联信息分类:</span>
              <div class="pull-left">
                <div v-for="item in productChange.productChangeAfter.messageCategoryArray">
                  <span>{{item}}</span>
                </div>
              </div>
            </div>
            <div class="over-hidden">
              <span class="pull-left mar-r-10">关联企业:</span>
              <div class="pull-left">
                <div v-for="item in productChange.productChangeAfter.contractArray">
                  <div>
                    <span>{{item.priority}}</span>
                    <span>{{item.contentCn}}</span>
                  </div>
                  <div>
                    <span>{{item.priority}}</span>
                    <span>{{item.contentEn}}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="over-hidden">
              <span class="pull-left mar-r-10">是否续入:</span>
              <span class="pull-left">{{productChange.productChangeAfter.isContinued}}</span>
            </div>
            <div class="over-hidden">
              <span class="pull-left mar-r-10">产品描述中文:</span>
              <span class="pull-left">{{productChange.productChangeAfter.productDesc}}</span>
            </div>
            <div class="over-hidden">
              <span class="pull-left mar-r-10">产品描述英文:</span>
              <span class="pull-left">{{productChange.productChangeAfter.productDescEn}}</span>
            </div>
            <div class="over-hidden">
              <span class="pull-left mar-r-10">市场销售价:</span>
              <span class="pull-left">{{productChange.productChangeAfter.afterDiscountPrice}}</span>
            </div>
            <div class="over-hidden">
              <span class="pull-left mar-r-10">购买周期:</span>
              <span class="pull-left">{{productChange.productChangeAfter.buyPeriod}}</span>
            </div>
            <div class="over-hidden">
              <span class="pull-left mar-r-10">单位:</span>
              <span class="pull-left">{{productChange.productChangeAfter.unit}}</span>
            </div>
            <div class="over-hidden">
              <span class="pull-left mar-r-10">产品备注:</span>
              <span>{{productChange.productChangeAfter.productNote}}</span>
            </div>
            <div class="over-hidden">
              <span class="pull-left mar-r-10">优惠折扣:</span>
              <span class="pull-left">{{productChange.productChangeAfter.specialDiscount}}</span>
            </div>
            <div class="over-hidden">
              <span class="pull-left mar-r-10">系统销售价:</span>
              <span class="pull-left">{{productChange.productChangeAfter.productPrice}}</span>
            </div>
            <div class="over-hidden">
              <span class="pull-left mar-r-10">产品基准价格:</span>
              <span class="pull-left">{{productChange.productChangeAfter.basePrice}}</span>
            </div>
          </div>
          <div class="pull-left" style="width: 300px;">
            <div class="change-log-detail-title">
              变更前
            </div>
            <div class="over-hidden">
              <span class="pull-left mar-r-10">产品中文名称:</span>
              <span class="pull-left">{{productChange.productChangeBefore.productNameCn}}</span>
            </div>
            <div class="over-hidden">
              <span class="pull-left mar-r-10">产品英文名称:</span>
              <span class="pull-left">{{productChange.productChangeBefore.productNameEn}}</span>
            </div>
            <div class="over-hidden">
              <span class="pull-left mar-r-10">中文简称:</span>
              <span class="pull-left">{{productChange.productChangeBefore.shortNameCn}}</span>
            </div>
            <div class="over-hidden">
              <span class="pull-left mar-r-10">英文简称:</span>
              <span class="pull-left">{{productChange.productChangeBefore.shortNameEn}}</span>
            </div>
            <div class="over-hidden">
              <span class="pull-left mar-r-10">是否续入:</span>
              <span class="pull-left">{{productChange.productChangeBefore.isContinued}}</span>
            </div>
            <div class="over-hidden">
              <span class="pull-left mar-r-10">产品分类:</span>
              <span class="pull-left">{{productChange.productChangeBefore.productCategoryName}}</span>
            </div>
            <div class="over-hidden">
              <span class="pull-left mar-r-10">所属站点:</span>
              <span class="pull-left">{{productChange.productChangeBefore.siteName}}</span>
            </div>
            <div class="over-hidden">
              <span class="pull-left mar-r-10">关联频道:</span>
              <div class="pull-left">
                <div v-for="item in productChange.productChangeBefore.channelArray">
                  <span>{{item}}</span>
                </div>
              </div>
            </div>
            <div class="over-hidden">
              <span class="pull-left mar-r-10">关联栏目:</span>
              <div class="pull-left">
                <div v-for="item in productChange.productChangeBefore.columnArray">
                  <span>{{item}}</span>
                </div>
              </div>
            </div>
            <div class="over-hidden">
              <span class="pull-left mar-r-10">关联企业:</span>
              <div class="pull-left">
                <div v-for="item in productChange.productChangeBefore.memberArray">
                  <span>{{item}}</span>
                </div>
              </div>
            </div>
            <div class="over-hidden">
              <span class="pull-left mar-r-10">关联品种:</span>
              <div class="pull-left">
                <div v-for="item in productChange.productChangeBefore.propertionArray">
                  <span>{{item.breedName}}</span>
                  <span>{{item.percent}}</span>
                </div>
              </div>
            </div>
            <div class="over-hidden">
              <span class="pull-left mar-r-10">关联城市:</span>
              <div class="pull-left">
                <div v-for="item in productChange.productChangeBefore.areaArray">
                  <span>{{item}}</span>
                </div>
              </div>
            </div>
            <div class="over-hidden">
              <span class="pull-left mar-r-10">关联信息分类:</span>
              <div class="pull-left">
                <div v-for="item in productChange.productChangeBefore.messageCategoryArray">
                  <span>{{item}}</span>
                </div>
              </div>
            </div>
            <div class="over-hidden">
              <span class="pull-left mar-r-10">关联企业:</span>
              <div class="pull-left">
                <div v-for="item in productChange.productChangeBefore.contractArray">
                  <div>
                    <span>{{item.priority}}</span>
                    <span>{{item.contentCn}}</span>
                  </div>
                  <div>
                    <span>{{item.priority}}</span>
                    <span>{{item.contentEn}}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="over-hidden">
              <span class="pull-left mar-r-10">是否续入:</span>
              <span class="pull-left">{{productChange.productChangeBefore.isContinued}}</span>
            </div>
            <div class="over-hidden">
              <span class="pull-left mar-r-10">产品描述中文:</span>
              <span class="pull-left">{{productChange.productChangeBefore.productDesc}}</span>
            </div>
            <div class="over-hidden">
              <span class="pull-left mar-r-10">产品描述英文:</span>
              <span class="pull-left">{{productChange.productChangeBefore.productDescEn}}</span>
            </div>
            <div class="over-hidden">
              <span class="pull-left mar-r-10">市场销售价:</span>
              <span class="pull-left">{{productChange.productChangeBefore.afterDiscountPrice}}</span>
            </div>
            <div class="over-hidden">
              <span class="pull-left mar-r-10">购买周期:</span>
              <span class="pull-left">{{productChange.productChangeBefore.buyPeriod}}</span>
            </div>
            <div class="over-hidden">
              <span class="pull-left mar-r-10">单位:</span>
              <span class="pull-left">{{productChange.productChangeBefore.unit}}</span>
            </div>
            <div class="over-hidden">
              <span class="pull-left mar-r-10">产品备注:</span>
              <span>{{productChange.productChangeBefore.productNote}}</span>
            </div>
            <div class="over-hidden">
              <span class="pull-left mar-r-10">优惠折扣:</span>
              <span class="pull-left">{{productChange.productChangeBefore.specialDiscount}}</span>
            </div>
            <div class="over-hidden">
              <span class="pull-left mar-r-10">系统销售价:</span>
              <span class="pull-left">{{productChange.productChangeBefore.productPrice}}</span>
            </div>
            <div class="over-hidden">
              <span class="pull-left mar-r-10">产品基准价格:</span>
              <!-- <span class="pull-left mar-r-10">成本价:</span> -->
              <span class="pull-left">{{productChange.productChangeBefore.basePrice}}</span>
            </div>
          </div>
        </div>
        <div slot="footer">
            <Button type="primary" @click="modalShow=false">关闭</Button>
        </div>
    </Modal>
    </Col>
  </Row>
</template>

<script>
import { productLogListPage, getProductLog } from '../components/axios/productCenter.js'
export default {
  name: 'myTable',
  components: {
  },
  logId: '',
  data () {
    return {
      pagesMessage: {
        productId: 1,
        pageNum: 1,
        pageSize: 10
      },
      pages: 5,
      total:10,
      columns: [ {
        key: 'id',
        title: '编号',
        align: 'center',
        width: 70,
        render: (h,data) => {
          let showIndex = data.index+((this.pagesMessage.pageNum-1)*this.pagesMessage.pageSize)+1;
          return h('span',showIndex);
        }
      }, {
        key: 'creatorName',
        align: 'center',
        title: '操作人'
      }, {
        key: 'departmentName',
        align: 'center',
        title: '部门'
      }, {
        key: 'createTimeDes',
        align: 'center',
        title: '时间'
      }, {
        key: 'operatorType',
        align: 'center',
        title: '操作类型'
      }, {
        key: 'productType',
        align: 'center',
        title: '业务模块'
      }, {
        key: 'logDetail',
        align: 'center',
        title: '日志内容',
        render: (h, data) => {
          console.log(data)
          if(data.row.operatorType == '修改'){
            return h('div', [
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.getLogDetails(data.row.id)
                  }
                }
              }, '查看')
            ]);
          }
        }
      }],
      modalShow: false,
      tableData: [],
      productChange: {
        productChangeAfter:{
          afterDiscountPrice: '',
          productCategoryName:'',
          memberArray:'',
          shortNameCn:'',
          siteName:'',
          shortNameEn:'',
          product1shortname:'',
          buyPeriod:'',
          productVersion:'',
          productVersion:'',
          productVersion:'',
          productVersion:'',
          productVersion:'',
        },
        productChangeBefore:{}
      }
    }
  },
  created (){
    let that = this;
    that.pagesMessage.productId = this.$route.query.id;
    console.log(that.$route.params.id)
    this.getLogList();
  },
  methods: {
    // 获取日志详情
    getLogList () {
      this.$Spin.show();
      let that = this;
      productLogListPage(that.pagesMessage).then(res => {
        console.log(res)
        if(res.response.list == null || res.response.list.length<1){
          that.tableData = [];
        }else{
          that.tableData = res.response.list;
          that.pagesMessage.pageNum = res.response.pageNum;
          that.pagesMessage.pageSize = res.response.pageSize;
          that.total = res.response.total;
          that.pages = res.response.pages;
        }
        that.$Spin.hide();
      })
    },
    getLogDetails (id) {
      let that = this;
      let form = {
        id: id
      }
      getProductLog(form).then(res => {
        that.modalShow = true;
        that.productChange.productChangeAfter = eval('(' +res.response.productChangeAfter+ ')');
        that.productChange.productChangeBefore = eval('(' +res.response.productChangeBefore+ ')');
        console.log(that.productChange.productChangeAfter)
        console.log(that.productChange.productChangeBefore)
      })
    },
    getpages (data) {//获取跳转页码
      this.pagesMessage.pageNum = data;
      this.getLogList();
    },
    getPageSize (pageSize) {//获取每页显示条数
      this.pagesMessage.pageSize = pageSize;
      this.getLogList ();
    },
  }
}
</script>
