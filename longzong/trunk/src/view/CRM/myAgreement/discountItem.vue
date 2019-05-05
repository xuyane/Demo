<style lang="less" scoped>
@import "./myagreement.less";
.discountitem {
  display: block;
}
.discounttitle {
  font-weight: bold;
}
.discountwrap {
  margin-bottom: 20px;
}
</style>
<template>
    <Modal v-model="showdiscountModal" @on-cancel="cancel" width="600">
        <p slot="header" >优惠信息</p>
        <div type="flex" justify="space-between">

          <dl v-for="(item,index) in items" v-if='item.title' :key='index' class="discountwrap">
            <dt class="discounttitle">{{item.title}}</dt>
            <dd>
              <RadioGroup v-model="animal">
                <Radio  v-for='(option,index) in item.menu'   :key='option.id'  :label="option.id" class="discountitem">
                  <span>{{option.name}}</span>
                  <div v-if='option.productList' >
                    <p v-for="(item,index) in  option.productList">【{{item.productNameCn}}】*1</p>
                  </div>
                </Radio>
                
              </RadioGroup>
            </dd>
          </dl>
        </div>
        <div slot="footer">
          
          <Button @click="cancel" class="search-btn">取消</Button>
          <Button type="primary" @click="confirm" class="search-btn"> 确定</Button>
        </div>
        <Spin size="large" fix v-if="spinShow"></Spin>
    </Modal>
</template>
<script>
import axios from "axios";
import oilPage from "../../components/page/page.vue";
import { formData } from "../../../assets/js/common.js";
import associateSearch from "../../components/associateSearch/getAssociateSearch.vue";
import {
  productList,
  listBreedAssociateVO
} from "../../components/axios/crm.js";
export default {
  name: "selectDiscountModal",
  props: {
    showselectDiscountModal: Boolean,
    onSale: Object
  },
  components: {
    oilPage,
    associateSearch
  },
  data() {
    return {
      spinShow:false,
      items: [
        { title: "", menu: [] },
        // { title: "打包价格", menu: [{name:"1342",id:3}, {name:"1234233",id:4}]  }
      ],
      animal: "123",
      url: "/crm/common/query-adminList-by-name",
      name: "breedName",
      showSizer: true,
      pageSize: 5,
      total: 0,
      pageNum: 1,
      pageSizeOpts: [5],
      findlistmsg: {
        pageNum: 1,
        pageSize: 5,
        type: 1
      },
      Discount: [],

      selected: [
        {
          name: "产品名称1"
        },
        {
          name: "产品名称2"
        }
      ],
      formCustom: {},
      showdiscountModal: false,
      pageNum: 1,
      pageSize: 5,
      total: 0,
      data: [],
      hadselected: [],
      relatedDiscount: []
    };
  },
  methods: {
    // 弹窗点击确定
    confirm() {
      if (!this.animal) {
        this.$Message.info("请先勾选优惠政策");
      } else {
        this.$emit("hide-discount-modal");
        let a=this.animal.split('-');
        var discount=this.items[a[0]];
          var discountdetial={};
          for(var i=0;i<discount.menu.length;i++){
            if(discount.menu[i].id==this.animal){
              discountdetial=discount.menu[i]
            }
          }
        this.$emit("discount-list", discountdetial);
      //   var unit = this.hadselected[0].unit;
      //   var result = this.hadselected.every(function(item) {
      //     if (item.unit != unit) {
      //       return false;
      //     }
      //     return true;
      //   });
      //   if (result) {
      //     // this.$emit("hide-select-modal");
      //     this.$emit("child-list", this.hadselected);
      //   } else {
      //     this.$Message.error("请勾选币种相同的产品");
      //   }
      }
    },
    // 弹窗点击取消
    cancel() {
      this.$emit("hide-discount-modal");
    },
    //   查询
    handleSubmit() {
      this.findlistmsg = this.formCustom;
      this.findlistmsg.type = 1;
      this.findlistmsg.pageNum = 1;
      this.findlistmsg.pageSize = 5;
      this.pageNum = 1;
      this.pageSize = 5;
      this.getProductList(this.findlistmsg);
    },
    // 重置
    handleReset() {},
    //分页
    pageChange(page, pageSize) {
      if (page) {
        this.pageNum = page;
        this.findlistmsg.pageNum = page;
      }
      if (pageSize) {
        this.pageSize = pageSize;
        this.findlistmsg.pageSize = pageSize;
      }
      this.getProductList(this.findlistmsg);
    },
    //点击×
    delate(i) {
      this.selected.splice(i, 1);
    },
    // 删除表格某个产品
    delatetr(data) {
      this.Discount.splice(data.index, 1);
    },
    // 勾选产品
    selectedDiscount(data) {
      this.hadselected = data;
    },
    getProductList(data) {
      let that = this;
       this.spinShow=true;
      productList(formData(data)).then(resp => {
         that.spinShow=false;
        that.Discount = resp.response.list;
        that.total = resp.response.total;
      });
    },
    // 单位 0-人民币 1-美元 2欧元
    getunit(a) {
      switch (a) {
        case 0:
          a = "人民币";
          break;
        case 1:
          a = "美元";
          break;
        case 2:
          a = "欧元";
          break;
      }
      return a;
    },
    DiscountFunction(data) {
      this.relatedDiscount = data;
    }
  },
  created() {},
  watch: {
    showselectDiscountModal(newVal, oldVal) {
      this.showdiscountModal = newVal;
      // if (newVal == true) {
      //   this.getProductList(this.findlistmsg);
      // }
    },
    onSale(newVal, oldVal) {
      this.items=[  
        {},{},{},{},{}
      ]
      if (newVal.expandTimeVOs.length > 0) {
        
        this.items[0].title = "赠送期限";
        this.items[0].menu=newVal.expandTimeVOs.map(item => {
              return {
                 name:item.strategyName,
                 id:'0-'+item.discountId+'-'+4,//index+discountId+type
                 ob:item
              }
        });
        this.items[0].menu.concat(newVal.expandTimeVOs)
      }
      if (newVal.giftProductVOs.length > 0) {
        this.items[1].title = "赠送产品";
         this.items[1].menu=newVal.giftProductVOs.map(item => {
              return {
                 name:item.strategyName,
                 productList:item.productVOs,
                 id:'1-'+item.discountId+'-'+3,
                 ob:item
              }
            });
                    this.items[1].menu.concat(newVal.giftProductVOs)

      }

      if (newVal.giftVOs.length > 0) {
        this.items[2].title = "赠送礼品";
        this.items[2].menu=newVal.giftVOs.map(item => {
              return {
                 name:item.strategyName+'-'+item.gift,
                 id:'2-'+item.discountId+'-'+5,
                 ob:item
              }
            });
      }
      if (newVal.packPriceVOs.length > 0) {
        this.items[3].title = "打包价格";
        this.items[3].menu=newVal.packPriceVOs.map(item => {
              return {
                 name:item.strategyName,
                 id:'3-'+item.discountId+'-'+2,
                 ob:item
              }
            });
            this.items[3].menu.concat(newVal.packPriceVOs)
      }
      if (newVal.rebateVOs.length > 0) {
        this.items[4].title = "优惠折扣";
        this.items[4].menu=newVal.rebateVOs.map(item => {
              return {
                 name:item.strategyName,
                 id:'4-'+item.discountId+'-'+1,
                 ob:item
              }
            });
             this.items[4].menu.concat(newVal.rebateVOs)
      }
    }
  }
};
</script>

