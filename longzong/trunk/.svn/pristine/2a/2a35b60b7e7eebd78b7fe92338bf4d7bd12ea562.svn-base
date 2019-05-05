<style lang="less" scoped>
@import "./myagreement.less";
.breedlist .ivu-select-selection {
  // height: auto !important;
}
</style>
<template>
    <Modal v-model="showselectModal" @on-cancel="cancel" width="1000">
        <p slot="header" >套餐产品</p>
        <div type="flex" justify="space-between">
          <Form ref="formCustom" :model="formCustom"  :label-width="80">
            <Row type="flex" justify="space-between">
              <Col span='6'>
                <FormItem label="产品名称:"  >
                  <Input type="text" class="search-input" v-model="formCustom.productName"></Input>
                  <!-- <associate-Search ref='breedDataRef' @query-list="getproducename" :dataUrl="urlname" :parameterName='producename' ></associate-Search> -->
                </FormItem>
              </Col>
              <Col span='6'>
                <FormItem label="产品分类:" >
                  <!-- <Input type="text" v-model="formCustom.productCategoryCode"></Input> -->
                  <Cascader :data="productClass" trigger="hover" class="search-input" @on-change='getproductClass' v-model="formCustom.proclass"></Cascader>
                </FormItem>
              </Col>
              <Col span='6' >
                <FormItem label="品种:"  >
                  <!-- <Select v-model="formCustom.breedId"  filterable clearable  >
                    <Option v-for="item in breedList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                  </Select> -->
                  <associate-Search ref='breedDataRef' @query-list="produceFunction" :dataUrl="url" :parameterName='name' ></associate-Search>
                </FormItem>
              </Col>
              <Col span='6' >
                <FormItem label="地区:"  >
                  <Input type="text" clearable  v-model="formCustom.areaIdname" class="search-input" @on-focus='showtreeModal' readonly></Input>
                </FormItem>
              </Col>
              <Col span='6' offset='18'>
                <FormItem>
                  <Button type="primary" @click="handleSubmit">查询</Button>
                  <Button @click="handleReset" style="margin-left: 8px">重置</Button>
                </FormItem>
              </Col>
            </Row>
          </Form>
          <!-- <Row>
            <Col span="24"  >
              <Row >
                <Col span="3" style='margin-bottom:10px;' v-for="(item,index) in selected" :key='index' class="" v-if='selected.length>0'>
                  <Button size="large" class="" type="primary"> 添加产品 <Icon type="close" class="close" size='12' @click="delate(index)"></Icon></Button>
                </Col>
              </Row>
            </Col>
          </Row> -->
          <Table class="tableCommon" border ref="selection" :columns="columns4" :data="produce" @on-select='selectedproduce'@on-select-all-cancel='selectallcancel'  @on-select-all='selectall'  @on-select-cancel='selectedproducecancel'></Table>
          <oil-page :total="total" :page-num="findlistmsg.pageNum" :page-size="findlistmsg.pageSize" @page-change="pageChange" :page-size-opts="pageSizeOpts" :show-sizer="showSizer" ></oil-page>
        </div>
        <div slot="footer">
          <i-button type="primary" @click="confirm" class="search-btn"> 确定</i-button>
          <i-button @click="cancel" class="search-btn">取消</i-button>
        </div>
        <Modal
        v-model="modaltree"
        title="请选择地区"
        class="breedtree"
        @on-cancel="dqcancel">
        <Tree :data="datatree" :load-data="loadData" ref="treedq" show-checkbox ></Tree>
        <div slot="footer">
          <i-button type="primary" @click="dqok1" class="search-btn"> 确定</i-button>
          <i-button @click="dqcancel" class="search-btn">取消</i-button>
        </div>
    </Modal>
    <Spin size="large" fix v-if="spinShow"></Spin>
    </Modal>
</template>
<script>
import axios from "axios";
import oilPage from "../../components/page/page.vue";
import { formData } from "../../../assets/js/common.js";
import associateSearch from "../../components/associateSearch/getAssociateSearch.vue";
import {
  sourceList,
  listBreedAssociateVO, //所有品种
  getUserproductListProductTreeVO, //所有产品分类
  queryAreaTree //区域
} from "../../components/axios/crm.js";
export default {
  name: "mealProduceModal",
  props: {
    showmealProduceModal: Boolean,
    produceId: String
  },
  components: {
    oilPage,
    associateSearch
  },
  data() {
    return {
      spinShow: false,
      modaltree: false,
      datatree: [],
      urlname: "/crm/common/query-product-select-list",
      producename: "productName",
      productClass: [],
      breedList: [],
      url: "/crm/common/query-breed-select-list",
      name: "breedName",
      showSizer: true,
      pageSize: 5,
      total: 0,
      pageNum: 1,
      pageSizeOpts: [5, 10, 50],
      findlistmsg: {
        pageNum: 1,
        pageSize: 5,
        type: 1
      },
      columns4: [
        {
          type: "selection",
          minWidth: 60,
          align: "center"
        },
        {
          type: "index",
          minWidth: 60,
          title: "序号",
          align: "center"
        },
        {
          title: "产品名称",
          minWidth: 130,
          key: "productNameCn"
        },
        {
          title: "简称",
          minWidth: 90,
          key: "shortNameCn"
        },
        {
          title: "产品分类",
          minWidth: 90,
          key: "productCategoryCodeName"
        },
        // {
        //   title: "信息分类",
        //   minWidth: 90,
        //   key: "messageCatagoryList"
        // },
        // {
        //   title: "品种",
        //   minWidth: 96,
        //   key: "various"
        // },
        // {
        //   title: "城市",
        //   minWidth: 90,
        //   key: "areaList"
        // },
        {
          title: "价格",
          minWidth: 80,
          key: "productPrice",
          render: (h, data) => {
            return h(
              "span",
              data.row.productPrice + this.getunit(data.row.unit)
            );
          }
        },
        {
          title: "优惠折扣",
          minWidth: 90,
          key: "specialDiscount"
        },
        {
          title: "折后定价",
          minWidth: 90,
          key: "afterDiscountPrice",
          render: (h, data) => {
            return h(
              "span",
              data.row.afterDiscountPrice + this.getunit(data.row.unit)
            );
          }
        },
        {
          title: "操作",
          minWidth: 90,
          key: "afterDiscountPrice",
          render: (h, data) => {
            return h(
              "a",
              {
                style: {
                  // color: "red"
                },
                on: {
                  click: () => {
                    let routeData = this.$router.resolve({
                      name: "productDetail",
                      query: {
                        id: data.row.id,
                        vid: data.row.proVerId
                      }
                    });
                    window.open(routeData.href, "_blank");
                  }
                }
              },
              "查看详情"
            );
          }
        }
      ],
      produce: [],

      selected: [
        {
          name: "产品名称1"
        },
        {
          name: "产品名称2"
        }
      ],
      formCustom: {},
      showselectModal: false,

      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "品种类别编号",
          key: "breedId"
        },
        {
          title: "品种类别名称",
          key: "breedName"
        }
      ],
      pageNum: 1,
      pageSize: 5,
      total: 0,
      data: [],
      hadselected: [],
      relatedproduce: [],
      hasproduceId: "",
      productVersionId: "",
      sourceList: []
    };
  },
  methods: {
    loadData(item, callback) {
      setTimeout(() => {
        let data = {
          id: item.id
        };
        queryAreaTree(data).then(res => {
          let msg = res.response;
          const data = msg.map(item => {
            if (item.isLeaf == 1) {
              item.children = [];
              item.loading = false;
            }
            item.title = item.name;
            return item;
          });
          callback(data);
        });
      }, 1000);
    },
    dqcancel() {
      this.modaltree = false;
    },
    dqok1() {
      let selectnode = this.$refs.treedq.getCheckedNodes();
      if (selectnode.length > 0) {
        let namelist = selectnode.map(item => {
          return item.name;
        });
        this.formCustom.areaIdname = namelist.join("/");
        this.formCustom.areaId = selectnode.map(item => {
          return item.id;
        });
        this.modaltree = false;
      } else {
        this.$Message.warning("请先勾选至少一个地区");
      }
    },
    showtreeModal() {
      this.modaltree = true;
      this.gettreedata(0);
    },
    gettreedata(a) {
      let data = {
        id: a
      };
      let that = this;
      queryAreaTree(data).then(res => {
        that.datatree = res.response.map(item => {
          if (item.isLeaf == 1) {
            return {
              children: [],
              loading: false,
              title: item.name,
              name: item.name,
              id: item.id
            };
          } else {
            return {
              title: item.name,
              name: item.name,
              id: item.id
            };
          }
        });
      });
    },
    //选择地区
    selectdq(data) {
      let selectno = data;
      if (selectno.length > 0) {
        this.formCustom.areaIdname = selectno[0].name;
        this.formCustom.areaId = selectno[0].id;
        this.modaltree = false;
      }
    },
    // 产品分类
    getproductClass(value) {
      this.formCustom.productCategoryCode = value[value.length - 1];
    },
    // 产品名称模糊搜索
    getproducename(data) {
      if (data) {
        this.formCustom.productName = data.label;
        this.formCustom.productId = data.value;
      }
    },
    // 弹窗点击确定
    confirm() {
      // if (this.hadselected.length == 0) {
      //   this.$Message.info("请先勾选产品");
      // } else {
      //   var unit = this.hadselected[0].unit;
      //   var result = this.hadselected.every(function(item) {
      //     if (item.unit != unit) {
      //       return false;
      //     }
      //     return true;
      //   });
      //   if (result) {
      // this.$emit("hide-meal-modal");
      this.$emit("child-meal-list", this.sourceList);
      //   } else {
      //     this.$Message.error("请勾选币种相同的产品");
      //   }
      // }
    },
    // 弹窗点击取消
    cancel() {
      this.$emit("hide-meal-modal");
    },
    //   查询
    handleSubmit() {
      if (!this.formCustom.areaIdname) {
        this.formCustom.areaId = [];
      }
      this.findlistmsg = JSON.parse(JSON.stringify(this.formCustom));
      // if(this.findlistmsg)
      this.findlistmsg.type = 1;
      this.findlistmsg.pageNum = 1;
      this.findlistmsg.pageSize = 5;
      this.getProductList(this.findlistmsg);
    },
    // 重置
    handleReset() {
      this.$refs.formCustom.resetFields();
      this.$refs.breedDataRef.model = "";
      this.$refs.breedDataRef.getData("");
      // this.proclass='';
      this.formCustom = {};
    },
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
    // 取消全选
    selectallcancel(selection) {
      if (this.produce.length == this.total) {
        this.$Message.error("该套餐产品不能取消所有子套餐。");
        return;
      }
      this.produce.map(item => {
        if (this.sourceList.length) {
          for (var i = 0; i < this.sourceList.length; i++) {
            if (item.id != this.sourceList[i].id) {
              this.sourceList.push(item);
            }
          }
        } else {
          this.sourceList.push(item);
        }
      });
    },
    // 全选
    selectall(selection) {
      selection.map(item => {
        for (var i = 0; i < this.sourceList.length; i++) {
          if (this.sourceList[i].id == item.id) {
            this.sourceList.splice(i, 1);
          }
        }
      });
    },
    // 删除表格某个产品
    delatetr(data) {
      this.produce.splice(data.index, 1);
    },
    // 勾选一个
    selectedproduce(selection, row) {
      for (var i = 0; i < this.sourceList.length; i++) {
        if (this.sourceList[i].id == row.id) {
          this.sourceList.splice(i, 1);
        }
      }
    },
    // 取消勾选某一个产品
    selectedproducecancel(selection, row) {
      // this.hadselected = data;
      selection.map(item => {
        for (var i = 0; i < this.sourceList.length; i++) {
          if (this.sourceList[i].id == item.id) {
            this.sourceList.splice(i, 1);
          }
        }
      });
      //
      this.sourceList.push(row);
    },
    getProductList(data) {
      let that = this;
      this.spinShow = true;
      data.productId = this.hasproduceId;
      data.productVersionId = this.productVersionId;
      sourceList(formData(data)).then(resp => {
        that.spinShow = false;
        if (resp.response) {
          that.produce = resp.response.list;
          that.produce.map(item => {
            item._checked = true;
            for (var i = 0; i < that.sourceList.length; i++) {
              if (item.id == that.sourceList[i].id) {
                item._checked = false;
              }
            }
          });
          that.total = resp.response.total;
        } else {
          that.produce = [];
          that.total = 0;
        }
      });
    },
    // 获取所有品种
    getallbreed() {
      var that = this;
      listBreedAssociateVO().then(resp => {
        that.breedList = resp.response;
      });
    },
    // 获取产品分类
    getallproducetype() {
      var that = this;
      getUserproductListProductTreeVO().then(resp => {
        that.productClass = this.breedDigui(resp.response);
      });
    },
    breedDigui(a) {
      let dgData = a.map(item => {
        if (item.children.length > 0) {
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
      });
      return dgData;
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
    produceFunction(data) {
      if (data) {
        this.relatedproduce = data;
        this.formCustom.breedId = data.value;
      } else {
        this.relatedproduce = data;
        this.formCustom.breedId = "";
      }
    }
  },
  created() {
    this.getallbreed();
    this.getallproducetype();
  },
  watch: {
    produceId(newVal, oldVal) {
      if (newVal != oldVal) {
        this.sourceList = [];
      }
      this.hasproduceId = newVal.split("-")[0];
      this.productVersionId = newVal.split("-")[1];
    },
    showmealProduceModal(newVal, oldVal) {
      this.showselectModal = newVal;
      if (newVal == true) {
        this.getProductList(this.findlistmsg);
      }
    }
  }
};
</script>

