<style lang="less" scoped>
@import "./myagreement.less";
</style>
<template>
    <Modal v-model="showselectModal" @on-cancel="cancel" width="1000">
        <p slot="header" >选择产品</p>
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
                  <Cascader :data="productClass" class="search-input" trigger="hover" @on-change='getproductClass' v-model="formCustom.proclass"></Cascader>
                </FormItem>
              </Col>
              <Col span='6' >
                <FormItem label="品种:"  >
                  <!-- <Select v-model="formCustom.breedId"  filterable clearable  >
                    <Option v-for="item in breedList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                  </Select> -->
                  <associate-Search ref='breedDataRef' @query-list="produceFunction" :dataUrl="url" :parameterName='name' ></associate-Search>
                  <!-- <Input type="text" v-model="pznameipt" class="search-input" @on-focus='showpzModal' readonly></Input> -->
                </FormItem>
              </Col>
              <Col span='6' >
                <FormItem label="地区:"  >
                  <Input type="text" clearable  v-model="formCustom.areaIdname" class="search-input" @on-focus='showtreeModal' readonly></Input>
                </FormItem>
              </Col>
            </Row>
            <Row type="flex" justify="space-between">
               <Col span="6">
            <FormItem label="所属站点:">
              <Select
                v-model="site"
                @on-change="getChannel"
                class="search-input"
                placeholder="请输入所属站点">
                <Option v-for="(option, index) in siteList" :value="option.id" :key="index">{{option.siteName}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="频道:">
              <Input type="text" v-model="channelnameipt" class="search-input" @on-focus='showpdModal' readonly></Input>
              <!-- <Cascader change-on-select v-model="channel" :data="channelList" :load-data='channelLoad' class="search-input" @on-change="getColumn" @on-visible-change="channelOpen" placeholder="请输入频道"></Cascader> -->
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="栏目:">
              <!-- <Select
                v-model="column"
                class="search-input"
                @on-open-change="columnOpen"
                placeholder="请输入栏目">
                <Option v-for="(option, index) in columnList" :value="option.id" :key="index">{{option.name}}</Option>
              </Select> -->
              <Input type="text" v-model="lanmunameipt" class="search-input" @on-focus='showlmModal' readonly></Input>
            </FormItem>
          </Col>
              <Col span='6'>
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
          <Table class="tableCommon" border ref="selection" height='300' :columns="columns4" :data="produce" @on-selection-change='selectedproduce' @on-select-cancel='cancelone' @on-select-all-cancel='cancelall'></Table>
          <oil-page :total="total" :page-num="findlistmsg.pageNum" :page-size="findlistmsg.pageSize" @page-change="pageChange" :page-size-opts="pageSizeOpts" :show-sizer="showSizer" ></oil-page>
        </div>
        <div slot="footer">
          <i-button type="primary" @click="confirm" class="search-btn"> 确定</i-button>
          <i-button @click="cancel" class="search-btn">取消</i-button>
        </div>
        <Modal
        v-model="modaltree"
        title="请选择地区"
        @on-cancel="dqcancel"
        class="breedtree">
       <Tree :data="datatree1" :load-data="loadData1"  ref='treedq1' show-checkbox  ></Tree>
       <div slot="footer">
          <i-button type="primary" @click="dqok1" class="search-btn"> 确定</i-button>
          <i-button @click="dqcancel" class="search-btn">取消</i-button>
        </div>
        </Modal>
        <Modal
        v-model="modalpdtree"
        title="请选择频道"
        @on-cancel="pdcancel"
        class="breedtree">
       <Tree :data="channelList" :load-data="pdloadData1"  ref='treepd' @on-check-change='pdselect' show-checkbox  ></Tree>
       <div slot="footer">
          <i-button type="primary" @click="pdok1" class="search-btn"> 确定</i-button>
          <i-button @click="pdcancel" class="search-btn">取消</i-button>
        </div>
        </Modal>
        <Modal
        v-model="modallmtree"
        title="请选择栏目"
        @on-cancel="lmcancel"
        class="breedtree">
       <Tree :data="lanmuList" :load-data="lmloadData1"  ref='treelm' @on-check-change='lmselect' show-checkbox  ></Tree>
       <div slot="footer">
          <i-button type="primary" @click="lmcancel" class="search-btn"> 确定</i-button>
          <i-button @click="lmcancel" class="search-btn">取消</i-button>
        </div>
        </Modal>
         <Modal
        v-model="modalpztree"
        title="请选择品种"
        @on-ok="pzcancel"
        class="breedtree"
        @on-cancel="pzcancel">
        <Tree :data="breeddata" ref='treepz' show-checkbox :load-data="pzloadData"  @on-check-change='selectpz'></Tree>
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
  productList,
  listBreedAssociateVO, //所有品种
  listProductTreeVOAll,
  getUserproductListProductTreeVO, //所有产品分类
  queryAreaTree, //区域
  selectSiteList,
  selectChannelList,
  selectColumnList,
  queryBreedTree
} from "../../components/axios/crm.js";
export default {
  name: "selectProduceModal",
  props: {
    showselectProduceModal: Boolean
  },
  components: {
    oilPage,
    associateSearch
  },
  data() {
    return {
      spinShow:false,
      pznameipt:'',
      hasselectpz:[],
      breeddata:[],
      modalpztree:false,
      lanmuList: [],
      modallmtree: false,
      lanmunameipt: "",
      pddatatree1: [],
      modalpdtree: false,
      channelnameipt: "",
      modaltree: false,
      datatree1: [],
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
      pageSizeOpts: [5,10,20,50,100],
      site: "",
      channel: [],
      channelId: [],
      column: "",
      siteList: [],
      channelList: [],
      columnList: [],
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
          title: "成本价",
          minWidth: 80,
          key: "basePrice",
          render: (h, data) => {
            return h("span", data.row.basePrice + this.getunit(data.row.unit));
          }
        },
        {
          title: "系统销售价",
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
          title: "市场销售价",
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
      formCustom: {
        areaIdname: "",
        areaId: ""
      },
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
      relatedproduce: []
    };
  },
  methods: {
    pzcancel(){
      this.modalpztree=false;
    },
    
    getpztree(data) {
      let msg = {
        parentCode: data
      };
      queryBreedTree(msg).then(resp => {
        this.breeddata = resp.response.map(option => {
          if (option.type != 0) {
            return {
              title: option.nodeName,
              value: option.nodeCode,
              id: option.nodeId,
              children: [],
              type: option.type,
              loading: false
              // render:
            };
          } else {
            return {
              title: option.nodeName,
              value: option.nodeCode,
              id: option.nodeId,
              type: option.type
              // loading: false
              // render:
            };
          }
        });
      });
    },
    showpzModal(){
      this.modalpztree=true;
    },
    selectpz(data){
      this.hasselectpz = data;
      this.pznameipt=data .map(item => {
          return item.title;
        })
        .join(",");
    },
    lmselect(data) {
      this.lanmunameipt = this.$refs.treelm
        .getCheckedNodes()
        .map(item => {
          return item.title;
        })
        .join(",");
        this.columnList=data;
    },
    lmcancel() {
      this.modallmtree = false;
    },
    showlmModal() {
      if (this.channel == 0) {
        this.$Message.warning("请选择频道");
      } else {
        this.modallmtree = true;

        // this.lanmuList.map(item=>{
        //   item.children=[];
        //   item.checked=false;
        // })
        // this.$forceUpdate()
      }
    },
    pdselect(data) {
      this.channel = data;
      this.channelnameipt = data
        .map(item => {
          return item.title;
        })
        .join(",");
    },
    showpdModal() {
      if (!this.site || this.site == "") {
        this.$Message.warning("请选择站点");
      } else {
        this.modalpdtree = true;
      }
    },
    pdcancel() {
      this.modalpdtree = false;
    },
    pdok1() {
      this.modalpdtree = false;
      this.lanmuList = this.channel.map(item => {
        return {
          children: [],
          title: item.title,
          value: item.value,
          check: false,
          loading: false
        };
      });
    },
    showtreeModal() {
      this.modaltree = true;
      this.gettreedata(0);
    },
    selectnodeOne(data) {
      if (data) {
        this.formCustom.areaIdname = data[0].name;
        this.formCustom.areaId = data[0].id;
        this.modaltree = false;
      }
    },
    gettreedata(a) {
      let data = {
        id: a
      };
      let that = this;
      queryAreaTree(data).then(res => {
        that.datatree1 = res.response.map(item => {
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
    pzloadData(item, callback) {
      setTimeout(() => {
        let msg = {
          parentCode: item.value
        };
        queryBreedTree(msg).then(resp => {
          const data = resp.response.map(option => {
            if (option.type != 0) {
              return {
                title: option.nodeName,
                value: option.nodeCode,
                id: option.nodeId,
                children: [],
                type: option.type,
                loading: false
                // render:
              };
            } else {
              return {
                title: option.nodeName,
                value: option.nodeCode,
                type: option.type,
                id: option.nodeId
              };
            }
          });
          callback(data);
        });
      }, 1000);
    },
    loadData1(item, callback) {
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
    pdloadData1(item, callback) {
      setTimeout(() => {
        let data = {
          siteId: this.site || "",
          channelId: item.value
        };
        selectChannelList(data).then(res => {
          let msg = res.response;
          const data = msg.map(item => {
            if (item.isLeaf == 0) {
              item.children = [];
              item.loading = false;
            }
            item.value = item.id;
            item.title = item.name;
            return item;
          });
          callback(data);
        });
      }, 1000);
    },
    lmloadData1(item, callback) {
      setTimeout(() => {
        let data = {
          channelIds: item.value
        };
        selectColumnList(data).then(res => {
          let msg = res.response[0].columnDTOList;
          const data = msg.map(item => {
            if (item.isLeaf == 0) {
              item.children = [];
              item.loading = false;
            }
            item.value = item.id;
            item.title = item.name;
            return item;
          });
          callback(data);
        });
      }, 1000);
    },
    dqok1() {
      let selectnode = this.$refs.treedq1.getCheckedNodes();
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
    dqcancel() {
      this.modaltree = false;
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
      if (this.hadselected.length == 0) {
        this.$Message.info("请先勾选产品");
      } else {
        var unit = this.hadselected[0].unit;
        var result = this.hadselected.every(function(item) {
          if (item.unit != unit) {
            return false;
          }
          return true;
        });
        if (result) {
          // this.$emit("hide-select-modal");
          this.$emit("child-list", this.hadselected);
        } else {
          this.$Message.error("请勾选币种相同的产品");
        }
      }
    },
    // 弹窗点击取消
    cancel() {
      this.$emit("hide-select-modal");
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
      this.site = "";
      this.channel = [];
      this.channelId = [];
      this.column = "";
      this.channelList = [];
      this.columnList = [];
      this.channelnameipt = "";
      this.lanmunameipt = "";
      this.hasselectpz=[];
      this.pznameipt='';
      this.$refs.treepz.getCheckedNodes().map(item => {
           item.checked=false;
        })
        this.$refs.treelm.getCheckedNodes().map(item => {
           item.checked=false;
        })
        this.$refs.treepd.getCheckedNodes().map(item => {
           item.checked=false;
        })
    },
    //获取所属站点
    getSite() {
      selectSiteList().then(res => {
        this.siteList = res.response;
      });
    },
    //获取频道
    getChannel() {
      this.channel = [];
      this.column = "";
      if (this.site) {
        selectChannelList({
          siteId: this.site || "",
          channelId: ""
        }).then(res => {
          this.channelList = res.response.map(item => {
            if (item.isLeaf == 0) {
              return {
                value: item.id,
                title: item.name,
                children: [],
                loading: false
              };
            } else {
              return {
                value: item.id,
                title: item.name
              };
            }
          });
        });
      }
    },
    //获取频道动态加载
    channelLoad(item, callback) {
      this.channel = [];
      item.loading = true;
      selectChannelList({
        siteId: this.site || "",
        channelId: item.value
      }).then(res => {
        let channelList = res.response.map(item => {
          if (item.isLeaf == 1) {
            return {
              value: item.channelId,
              isLeaf: item.isLeaf,
              label: item.channelName,
              children: [],
              loading: false
            };
          } else {
            return {
              value: item.channelId,
              isLeaf: item.isLeaf,
              label: item.channelName
            };
          }
        });
        item.loading = false;
        item.children = channelList;
        callback();
      });
    },
    //获取栏目
    getColumn(data) {
      let channelId = [];
      channelId.push(data[data.length - 1]);
      this.channelId = channelId;
      this.column = "";
      if (this.channelId.length > 0) {
        selectColumnList({
          channelIds: this.channelId.join(",")
        }).then(res => {
          this.columnList = res.response[0].columnDTOList;
        });
      }
    },
    //获取频道展开
    channelOpen(data) {
      if (data) {
        if (!this.site || this.site == "") {
          this.$Message.warning("请选择站点");
        }
      }
    },
    //获取栏目展开
    columnOpen(data) {
      if (data) {
        if (this.channelId.length == 0) {
          this.$Message.warning("请选择频道");
        }
      }
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
    // 删除表格某个产品
    delatetr(data) {
      this.produce.splice(data.index, 1);
    },
    test(arr1, arr2) {
      var arr3 = [];
      for (var i = 0; i < arr1.length; i++) {
        var flag = true;
        for (var j = 0; j < arr2.length; j++) {
          if (arr1[i].id == arr2[j].id) flag = false;
        }
        if (flag) {
          arr3.push(arr1[i]);
        }
      }
      return arr3;
    },
    cancelall(data,row){
      this.hadselected=this.test(this.hadselected,this.produce);
    },
    cancelone(data,row){
      var a;
      this.hadselected.map((item,index)=>{
        if(item.id==row.id){
          a=index
        }
      })
      this.hadselected.splice(a,1);
    },
    // 勾选产品
    selectedproduce(data) {
      if(this.hadselected==[]){
        this.hadselected=data
      }else{
        this.hadselected=this.mergeArray(this.hadselected,data)
      }
    },
    //数组合并去重
    mergeArray(arr1, arr2) {
      var _arr = new Array();
      for (var i = 0; i < arr1.length; i++) {
        _arr.push(arr1[i]);
      }
      for (var i = 0; i < arr2.length; i++) {
        var flag = true;
        for (var j = 0; j < arr1.length; j++) {
          if (arr2[i].id == arr1[j].id) {
            flag = false;
            break;
          }
        }
        if (flag) {
          _arr.push(arr2[i]);
        }
      }
      return _arr;
    },
    getProductList(data) {
      let that = this;
      let itemIds = [];
      if (this.column && this.column != "") {
        itemIds.push(this.column);
      }
      data.siteId = this.site ? String(this.site) : "";
      data.channelIds = this.channel.map(item => {
        return item.value;
      });
      data.columns = this.columnList.map(item => {
        return item.value;
      });
      // data.breedId=this.hasselectpz.map(item => {
      //   return item.id;
      // });
      // let params = {
      //   userId: this.lineData.userId,
      //   pageSize: this.pageSize,
      //   pageNum: this.pageNum,
      //   productName: this.formItem.productName || '',
      //   breedId: this.formItem.breed || '',
      //   productCategoryCode: this.formItem.productCategoryCode || '',
      //   siteId: this.site ? String(this.site) : '',
      //   channelIds: this.channelId,
      //   columns: itemIds
      // }
      this.spinShow=true;
      productList(formData(data)).then(resp => {
        that.spinShow=false;
        if (resp.response) {
          that.produce = resp.response.list;
          that.total = resp.response.total;
          that.produce.map(item=>{
            for(var i=0;i<that.hadselected.length;i++){
              if(that.hadselected[i].id==item.id){
                item._checked=true
              }
            }
          })
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
      listProductTreeVOAll().then(resp => {
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
      console.log(data)
      if (data) {
        this.formCustom.breedId = data.value;
      } else {
        this.formCustom.breedId = "";
      }
    }
  },
  created() {
    this.getSite();
    // this.getallbreed();
    this.getallproducetype();
    this.getpztree("");
  },
  watch: {
    showselectProduceModal(newVal, oldVal) {
      this.hadselected=[];
      this.showselectModal = newVal;
      if (newVal == true) {
        this.getProductList(this.findlistmsg);
      }
    }
  }
};
</script>

