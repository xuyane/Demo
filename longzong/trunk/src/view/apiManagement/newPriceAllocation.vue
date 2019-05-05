<style>
.mrb-20{
  margin-bottom: 20px;
}

</style>

<template >
  <Row class='varietybox'>
    <Col span="24">
        <i-col span="24">
            <Row class-name="current-position">
            当前位置：对外接口管理&nbsp;&nbsp;>>&nbsp;&nbsp;新增价格配置
            </Row>
        </i-col>
    </Col>
    <Col span="24" class-name="search-form">
        <Form ref="form" :model="form" :label-width="120">
            <Row type="flex"  >
                <Col span='8'>
                    <FormItem label="价格类型:" :label-width="100">
                      <Select v-model="form.priceType" @on-change="changePriceType">
                        <Option v-for="item in priceTypeList" :value="item.value" :key="item.value">{{ item.desc }}</Option>
                      </Select>
                    </FormItem>
                </Col>
                <Col span='8'>
                    <FormItem label="产品名称:" :label-width="100">
                    <Input type="text" v-model="form.productName" class="search-input" placeholder="请输入产品名称"></Input>
                    </FormItem>
                </Col>
                 <Col span='8'>
                    <FormItem label="价格产品id:" :label-width="100">
                    <Input type="text" v-model.number="form.id"  class="search-input" placeholder="请输入价格产品id"  @on-keyup="keyUp" ></Input>
                    </FormItem>
                </Col> <Col span='8'>
                    <FormItem label="规格型号:" :label-width="100">
                    <Input type="text" v-model="form.modelName" class="search-input" placeholder="请输入规格型号"></Input>
                    </FormItem>
                </Col> <Col span='8'>
                    <FormItem label="地区名称:" :label-width="100">
                    <Input type="text" v-model="form.areaName" class="search-input" placeholder="请输入地区名称"></Input>
                    </FormItem>
                </Col>
                 <Col span='8' v-if="form.priceType==1 ||  form.priceType==3 ||  form.priceType==5 ||  form.priceType==6">
                    <FormItem label="市场名称:" :label-width="100">
                    <Input type="text" v-model="form.marketName" class="search-input" placeholder="请输入市场名称"></Input>
                    </FormItem>
                </Col>
                 <Col span='8' v-if="form.priceType==3 ||  form.priceType==2">
                    <FormItem label="生产厂家:" :label-width="100">
                    <Input type="text" v-model="form.manufactureName" class="search-input" placeholder="请输入生产厂家"></Input>
                    </FormItem>
                </Col>
                <Col span='8'>
                  <FormItem label="是否显示:" :label-width="100">
                    <Select v-model="form.isShow">
                      <Option v-for="item in showList" :value="item.value" :key="item.value">{{ item.desc }}</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span='8'>
                  <FormItem label="启用禁用:" :label-width="100">
                    <Select v-model="form.isStart">
                      <Option v-for="item in startList" :value="item.value" :key="item.value">{{ item.desc }}</Option>
                    </Select>
                  </FormItem>
                </Col>
               <Col span="24" class="text-right">
                    <Button type="primary" @click="search">查询</Button>
                    <Button style="margin-left: 8px" @click="reset">重置</Button>
                </Col>
            </Row>
        </Form>
    </Col>
    <Col span="24">
        <Row>
            <Table class="tableCommon" border :columns="columns" :data="tableData"  @on-selection-change="handleRowChange" @on-select-cancel='cancelone' @on-select-all-cancel='cancelall'></Table>
            
            <div class="page-con">
                <oil-page :total="total" :page-num="pageNum" :page-size="pageSize" @page-change="pageChange" :page-size-opts="pageSizeOpts" :show-sizer="showSizer"></oil-page>
            </div>
        </Row>
    </Col>
    <Col span="24">
        <Row>
             <div style="text-align:center;">
            <i-button  class="search-btn" type="primary" @click="savePrice()">保存</i-button>
            <i-button class="search-btn" @click="doVoid">返回</i-button>
        </div>
        </Row>
    </Col>
  </Row>
</template>
<script>
import axios from "axios";
import oilPage from "../components/page/page.vue";
import {
  getPriceData,
  savePriceConfig,
  queryPriceType
} from "../components/axios/apiManagement.js";
import { formData } from "../../assets/js/common.js";
export default {
  name: "basePrice",
  components: {
    oilPage
  },
  data() {
    return {
      pageSizeOpts: [10, 20, 50, 100, 200],
      showSizer: true,
      pageSize: 10,
      pageNum: 1,
      total: 0,
      form: {
        priceType: 3,
        productName: "",
        id: "",
        modelName: "",
        areaName: "",
        marketName: "",
        manufactureName: "",
        isStart:-1,
        isShow:-1
      },
      priceTypeList: [],
      hadselected:[],
      startList:[
        {
          value:-1,
          desc:"全部"
        },
        {
           value:1,
          desc:"禁用"
        },
        {
           value:0,
          desc:"启用"
        }
      ],
      showList:[
        {
          value:-1,
          desc:"全部"
        },
        {
           value:1,
          desc:"否"
        },
        {
           value:0,
          desc:"是"
        }
      ],
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "价格产品ID",
          key: "id",
          minWidth: 100
        },
        {
          title: "产品名称",
          key: "productName",
          minWidth: 100
        },
        {
          title: "规格型号",
          key: "modelName",
          align: "center",
          minWidth: 100
        },
        {
          title: "地区名称",
          key: "areaName",
          align: "center",
          minWidth: 100
        },
        {
          title: "单位",
          key: "unit",
          minWidth: 100
        },
        {
          title: "备注",
          key: "memo",
          align: "center",
          minWidth: 100
        },
        {
          title: "市场名称",
          key: "marketName",
          align: "center",
          minWidth: 100
        },
        {
          title: "生产厂家",
          key: "manufactureName",
          align: "center",
          minWidth: 100
        },
        {
          title: "是否显示",
          key: "isShow",
          minWidth: 100,
          render: (h, data) => {
            let label =
              data.row.isShow == 1 ? "否" : data.row.isShow == 0 ? "是" : "";
            return h(
              "span",
              {
                props: {
                  type: "text",
                  size: "small"
                }
              },
              label
            );
          }
        },
        {
          title: "禁用/启用",
          key: "isStart",
          minWidth: 100,
          render: (h, data) => {
            let label =
              data.row.isStart == 0 ? "启用" : data.row.isStart == 1 ? "禁用" : "";
            return h(
              "span",
              {
                props: {
                  type: "text",
                  size: "small"
                }
              },
              label
            );
          }
        }
      ],
      tableData: []
    };
  },
  created() {
    this.initStatus();
    this.queryData();
  },
  methods: {
   changePriceType(){
      this.form.productName = "";     
      this.form.id = "";
      this.form.modelName = "";
      this.form.areaName = "";
      this.form.marketName = "";
      this.form.manufactureName = "";
      this.form.isShow = -1;
      this.form.isStart= -1;
     this.search()
   },
    keyUp() {
      let typeInput = typeof this.form.id;
      if (typeInput != "number") {        
        this.form.id = this.form.id.replace(/[^\d]/g, "");        
      } 
    },
    //初始化价格类型
    //初始化状态
    initStatus() {
      var that = this;
      queryPriceType().then(res => {
        let list = res.response;
        for (let i = 0; i < list.length; i++) {
          let objList = {};
          objList.value = list[i].value;
          objList.desc = list[i].desc;
          that.priceTypeList.push(objList);
        }
      });
    },
    //查询功能
    search() {
      this.pageNum = 1;
      this.pageSize = 10;
      this.hadselected = [];
      this.queryData();
    },
    //重置
    reset() {
      this.pageNum = 1;
      this.pageSize = 10;
      this.form.productName = "";
      this.form.id = "";
      this.form.modelName = "";
      this.form.areaName = "";
      this.form.marketName = "";
      this.form.manufactureName = "";
      this.form.isShow = -1;
      this.form.isStart= -1;
    },
    //数据列表
    queryData() {
      var that = this;
      this.form.pageSize = this.pageSize;
      this.form.pageNum = this.pageNum;
      this.form.type = this.$route.query.type;
      this.form.sort = "";
      this.form.order = "";
      getPriceData(formData(this.form)).then(res => {
        that.tableData = res.response.list;
        that.total = res.response.total;
        that.tableData.map(item=>{
            for(var i=0;i<that.hadselected.length;i++){
              if(that.hadselected[i].id==item.id){
                item._checked=true
              }
            }
          })
      });
    },
    //选中的表格数据
    handleRowChange(data) {
      if(this.hadselected == []){
        this.hadselected = data
      }else{
        this.hadselected = this.mergeArray(this.hadselected,data)
      }
    },
    //取消勾选数据
    cancelone(data,row){
      var a;
      this.hadselected.map((item,index)=>{
        if(item.id==row.id){
          a=index
        }
      })
      this.hadselected.splice(a,1);
    },
    //取消全部勾选数据
    cancelall(data,row){
      this.hadselected = this.test(this.hadselected,this.tableData);
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
    //分页
    pageChange(page, pageSize) {
      if (page) {
        this.pageNum = page;
      }
      if (pageSize) {
        this.pageSize = pageSize;
      }
      this.queryData();
    },
    //保存
    savePrice(type) {
      let that = this;
      let voList = [];
      if (that.hadselected) {
        for (let i = 0; i < that.hadselected.length; i++) {
          let obj = {};
          obj.userId = parseInt(this.$route.query.id);
          obj.priceType = this.form.priceType;
          obj.priceId = that.hadselected[i].id;
          voList.push(obj);
        }
      } else {
        that.$Message.warning("请选择一条数据");
        return;
      }
      let params = {
        voList: voList
      };
      savePriceConfig(params).then(res => {
          that.$Message.success("新增成功");
          that.doVoid();
      });
    },
    //返回
    doVoid() {
      this.$router.push({
        name: "priceConfig",
        query: {
          id: this.$route.query.id
        }
      });
    }
  }
};
</script>

