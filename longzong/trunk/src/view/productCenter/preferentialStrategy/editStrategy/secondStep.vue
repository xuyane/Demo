<style lang="less" scoped>
  .border {
    border: 1px solid #5d5d5d;
  }

  .out-left {
    height: 100%;
    border-right: 1px solid #5d5d5d;
    padding-top: 60px;
    text-align: center;
    font-size: 16px
  }

  .out-center {
    height: 100%;
    border-right: 1px solid #5d5d5d;
  }

  .title {
    background-color: #e9eaef;
    text-align: left;
    padding-left: 10px;
    height: 41px;
    line-height: 41px;
    font-size: 16px
  }

  .out-right {
    height: 289px;
  }

  .out-right .icon-delete {
    width: 25px;
    height: 25px;
    background-size: 100%;
    margin-top: 8px
  }

  .switch {
    width: 23px;
    height: 22px;
    background: url(../../../../assets/images/switch.png) 0 0 no-repeat;
    background-size: 100%;
    display: inline-block;
    margin-top: 7px;
    cursor: pointer;
  }

  .error-message {
    position: absolute;
    top: 30px;
    left: 0;
    color: red;
  }

  .star {
    position: relative;
  }

  .star:before {
    position: absolute;
    content: "*";
    display: inline-block;
    margin-right: 4px;
    line-height: 1;
    font-family: SimSun;
    font-size: 12px;
    color: #ed4014;
    left: 25px;
    top: 10px;
  }

  .stars {
    position: relative;
  }

  .stars:before {
    position: absolute;
    content: "*";
    display: inline-block;
    margin-right: 4px;
    line-height: 1;
    font-family: SimSun;
    font-size: 12px;
    color: #ed4014;
    left: 3px;
    top: 10px;
  }
</style>

<template>
  <Row>
    <Col span="24">
    <Form v-for="(item,index) in items" :key="index" :model="item" :label-width="80">
      <Row>
        <Col span="20" class="border mar-b-20">
        <Row class="out-right">
          <Col span="2" class="out-left"> 优
          </br>惠</br>政</br>策</br>({{index+1}})
          </Col>
          <Col span="11" class="out-center">
          <p class="title">销售内容</p>
          <Row class="mar-t-20">
            <FormItem v-if="item.type == 1" label="产品:" class="star">
              <Col span="8">
              <InputNumber v-model="item.productNumMin" :min='0' class="search-input" placeholder="最小值" @on-blur="changeMIn(index)"></InputNumber>
              </Col>
              <Col span="2" class="text-center"> --
              </Col>
              <Col span="8">
              <InputNumber v-model="item.productNumMax" :min='0' class="search-input" placeholder="最大值"></InputNumber>
              </Col>
              <Col span="2" class="text-center"> 个
              </Col>
              <Col span="2" class="text-center">
              <span class="switch" @click="changeType(index)"></span>
              </Col>
            </FormItem>
            <FormItem v-else label="产品:" class="star">
              <Col span="18">
              <Input v-model="item.cproductNames" class="search-input" readonly @on-focus="getProductTree('pro',index)"></Input>
              </Col>
              <!-- <Col span="2" class="text-center"> 个
              </Col> -->
              <Col span="2" class="text-center">
              <span class="switch" @click="changeType(index)"></span>
              </Col>
            </FormItem>
          </Row>
          <Row>
            <FormItem label="产品分类:" v-if="item.type == 1">
              <Col span="18">
              <Cascader class="search-input" :data="typeList" v-model="item.productClassify" @on-change="getproductClassify($event,index)"
                placeholder="请选择产品分类"></Cascader>
              </col>
            </FormItem>
            <FormItem label="合同金额:" class="stars">
              <Col span="8">
              <InputNumber v-model="item.contractAmountMin" :min='0' class="search-input" placeholder="最小值"></InputNumber>
              </Col>
              <Col span="2" class="text-center"> --
              </Col>
              <Col span="8">
              <InputNumber v-model="item.contractAmountMax" :min='0' class="search-input" placeholder="最大值"></InputNumber>
              </Col>
              <Col span="2" class="text-center"> 元
              </Col>
            </FormItem>
            <FormItem label="购买期限:">
              <Col span="18">
              <Select v-model="item.contractTime" class="search-input">
                <Option v-for="(item,index) in contractTimeList" :value="item.value" :key="item.index">{{ item.label }}</Option>
              </Select>
              </Col>
            </FormItem>
          </Row>
          </Col>
          <Col span="11 out-right">
          <p class="title">
            <span>优惠政策</span>
            <b class="icon-delete mar-l-30 pull-right" @click="delectStrategy(index)"></b>
          </p>
          <Row class="mar-t-20">
            <FormItem v-if="item.type == 1" label="优惠折扣:">
              <Col span="20">
              <InputNumber :max="100" :min='0' v-model="item.rebate" :formatter="value => `${value}%`" :parser="value => value.replace('%', '')"
                class="search-input"></InputNumber>
              </Col>
            </FormItem>
            <FormItem label="打包价:">
              <!-- v-else  -->
              <Col span="20">
              <InputNumber v-model="item.packPrice" element-id="inputID" @on-focus="chagne(index)" :formatter="value => `${value}元`" :parser="value => value.replace('元', '')"
                class="search-input"></InputNumber>
              </Col>
            </FormItem>
            <FormItem v-if="item.type == 2" label="赠送产品:">
              <Col span="20">
              <Input v-model="item.dproductNames" class="search-input" readonly @on-focus="getProductTree('largess',index)"></Input>
              </Col>
            </FormItem>
            <FormItem label="赠送礼品:">
              <Col span="20">
              <Input v-model="item.gift" class="search-input" placeholder="请输入礼品名称,多个礼品以逗号隔开"></Input>
              </Col>
            </FormItem>
            <FormItem label="赠送期限:">
              <Col span="20">
              <Select v-model="item.expandTime">
                <Option v-for="(item,index) in expandTimeList" :value="item.value" :key="item.index">{{ item.label }}</Option>
              </Select>
              </Col>
            </FormItem>
          </Row>
          </Col>
        </Row>
        </Col>
      </Row>
    </Form>
    <Button type="default" class="search-btn" @click="addStrategy">添加优惠政策</Button>
    <product-list-modal :strategyIndex="strategyIndex" :productTreeType="productTreeType" :productModel="productTreeModal" @sing-add="singAdd"
      @close-modal="cancel"></product-list-modal>
    </Col>
  </Row>
</template>

<script>
  import { getProductTreeList, proCategoryList } from '../../../components/axios/productCenter.js'
  import ProductListModal from '../productListModal.vue'
  export default {
    components: {
      ProductListModal
    },
    props: ['listData'],
    data() {
      return {
        productTreeModal: false,
        breedList: [],
        checkBreedList: [],
        strategyIndex: 0,
        productTreeType: '',
        items: [
          {
            productClassify: [],
            productNumMin: null,
            productNumMax: null,
            contractAmountMin: null,
            contractAmountMax: null,
            cproductNames: '',
            cproductIds: '',
            contractTime: '',
            rebate: null,
            gift: '',
            type: 1,
            packPrice: null,
            productCategoryCode: null,
            dproductNames: '',
            dproductIds: '',
            expandTime: null
          }
        ],
        expandTimeList: [
          {
            value: '',
            label: '请选择',
          },
          {
            value: 1,
            label: '1个月',
          },
          {
            value: 2,
            label: '2个月',
          },
          {
            value: 3,
            label: '3个月',
          },
          {
            value: 6,
            label: '半年',
          },
          {
            value: 12,
            label: '1年',
          }
        ],
        contractTimeList: [
          {
            value: '',
            label: '请选择',
          },
          {
            value: '12',
            label: '1年',
          },
          {
            value: '24',
            label: '2年',
          }
        ],
        // productClassify: [],
        typeList: [],
      }
    },
    created() {
      this.getCategoryList();
    },
    methods: {

      changeMIn(index){
        if (this.items[index].productNumMin == null && this.items[index].type == 1) {
          this.items[index].packPrice = null
        }
      },
      //打包价验证
      chagne(index) {

        if ((this.items[index].productNumMin == null ||this.items[index].productCategoryCode == "" || this.items[index].productCategoryCode == undefined) && this.items[index].type == 1) {
          this.$Message.error("请选择产品分类并填写产品最小值");
          $("#inputID").blur();
        }
      },
      // 获取产品分类列表
      getCategoryList() {
        proCategoryList({ v: Math.random() * 1000 }).then(res => {
          this.typeList = this.productDigui(res.response);
        })
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

      //获取产品分类code
      getproductClassify(value, index) {
        this.items[index].productCategoryCode = value[value.length - 1];
        if (value.length == 0 && this.items[index].type == 1) {
          this.items[index].packPrice = null
        }
      },
      //改变优惠政策
      changeType(index) {
        if (this.items[index].type == 1) {
          this.items[index].type = 2;
        } else {
          this.items[index].type = 1;
        }
      },
      //新增优惠政策
      addStrategy() {
        let newStrategy = {
          productNumMin: null,
          productNumMax: null,
          contractAmountMin: null,
          contractAmountMax: null,
          productCategoryCode: null,
          cproductNames: '',
          cproductIds: '',
          contractTime: '',
          rebate: null,
          gift: '',
          type: 1,
          packPrice: null,
          dproductNames: '',
          dproductIds: '',
          expandTime: null
        };
        if (this.items.length < 10) {
          this.items.push(newStrategy)
        } else {
          this.$Message.error("优惠政策最多添加十条！！！")
        }
      },
      //删除优惠政策
      delectStrategy(index) {
        this.items.splice(index, 1)
      },
      // 获取产品树
      getProductTree(type, index) {
        this.productTreeType = type
        this.strategyIndex = index
        this.productTreeModal = true;
      },
      // 模态框点击取消
      cancel() {
        this.productTreeModal = false;
      },
      singAdd(data, index, type) {
        this.strategyIndex = index,
          this.productTreeType = type,
          this.checkBreedList = data
        let productNames = [];
        this.checkBreedList.map(item => {
          productNames.push(item.productNameCn)
        });
        let productIds = [];
        this.checkBreedList.map(item => {
          productIds.push(item.id)
        });
        if (this.productTreeType == 'largess') {
          this.items[this.strategyIndex].dproductNames = productNames.join(',');
          this.items[this.strategyIndex].dproductIds = productIds.join(',');
        } else {
          this.items[this.strategyIndex].cproductNames = productNames.join(',');
          this.items[this.strategyIndex].cproductIds = productIds.join(',');
        }
      }
    },
    watch: {
      listData(newVal, oldVal) {
        this.items = newVal.map(item => {
          if (item.productCategoryCode.length == 3) {
            item.productClassify.push(item.productCategoryCode)
          } else {
            item.productClassify.push(item.productCategoryCode.slice(0, 3))
            item.productClassify.push(item.productCategoryCode);
          }

          if (item.rebate != null) {
            item.rebate = Number(item.rebate * 100)
          }
          if (item.cproductNames == '') {
            return {
              productNumMin: item.productNumMin ? Number(item.productNumMin) : null,
              productNumMax: item.productNumMax ? Number(item.productNumMax) : null,
              contractAmountMin: item.contractAmountMin ? Number(item.contractAmountMin) : null,
              contractAmountMax: item.contractAmountMax ? Number(item.contractAmountMax) : null,
              cproductNames: item.cproductNames,
              cproductIds: item.cproductIds,
              contractTime: item.contractTime,
              rebate: item.rebate,
              gift: item.gift,
              type: 1,
              packPrice: item.packPrice,
              productCategoryCode: item.productCategoryCode,
              productClassify: item.productClassify,
              dproductNames: item.dproductNames,
              dproductIds: item.dproductIds,
              expandTime: item.expandTime
            }
          } else {
            return {
              productNumMin: item.productNumMin ? Number(item.productNumMin) : null,
              productNumMax: item.productNumMax ? Number(item.productNumMax) : null,
              contractAmountMin: item.contractAmountMin ? Number(item.contractAmountMin) : null,
              contractAmountMax: item.contractAmountMax ? Number(item.contractAmountMax) : null,
              cproductNames: item.cproductNames,
              cproductIds: item.cproductIds,
              contractTime: item.contractTime,
              rebate: item.rebate,
              gift: item.gift,
              type: 2,
              packPrice: item.packPrice,
              productCategoryCode: item.productCategoryCode,
              productClassify: item.productClassify,
              dproductNames: item.dproductNames,
              dproductIds: item.dproductIds,
              expandTime: item.expandTime
            }
          }
        });
        console.log("this.item", this.items)

      }
    }
  }
</script>