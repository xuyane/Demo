<style>
</style>

<template >
  <Row class='varietybox'>
    <Col span="24" class-name="search-form">
        <Form ref="form" :model="form" :label-width="120">
            <Row type="flex" justify="space-between">
                <Col span='7'>
                    <FormItem label="产品名称:" :label-width="100">
                        <Input type="text" v-model="form.productName" class="search-input"></Input>
                    </FormItem>
                </Col>
                <Col span='7'>
                    <FormItem label="规格型号:" :label-width="100">
                        <Input type="text" v-model="form.modelName" class="search-input"></Input>
                    </FormItem>
                </Col>
                <Col span='7'>
                    <FormItem label="地区名称:" :label-width="100">
                        <Input type="text" v-model="form.areaName" class="search-input"></Input>
                    </FormItem>
                </Col>
                <Col span='7'>
                    <FormItem label="生产厂家:" :label-width="100">
                    <Input type="text" v-model="form.manufactureName" class="search-input"></Input>
                    </FormItem>
                </Col>
                <Col span="7" class="text-right">
                    <Button type="primary" @click="search">查询</Button>
                    <Button style="margin-left: 8px" @click="reset">重置</Button>
                </Col>
            </Row>
        </Form>
    </Col>
    <Col span="24">
        <Row>
            <Table class="tableCommon" border :columns="columns" :data="tableData"></Table>
            
            <div class="page-con">
                <oil-page :total="total" :page-num="pageNum" :page-size="pageSize" @page-change="pageChange" :page-size-opts="pageSizeOpts" :show-sizer="showSizer"></oil-page>
            </div>
        </Row>
    </Col>
  </Row>
</template>
<script>
import axios from "axios";
import oilPage from "../../components/page/page.vue";
import {
  getPriceConfig,deletePriceConfig
} from "../../components/axios/apiManagement.js";
import { formData } from "../../../assets/js/common.js";
export default {
  name: "homeMarketPrice",
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
      form:{
        userId: "",
        type:"",
        productName: "",
        modelName: "",
        areaName: "",
        manufactureName:""
      },
      columns: [
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
          title: "标准",
          key: "stardard",
          minWidth: 100
        },
        {
          title: "市场名称",
          key: "marketName",
          minWidth: 100
        },
        {
          title: "生产厂家",
          key: "manufactureName",
          minWidth: 100
        },{
          title: "操作",
          align: "center",
          minWidth: 100,
          render: (h, data) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    color: "span",
                    color: "blue",
                    marginRight: "8px",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.deleteDataModal(
                        data.row.id
                      );
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      tableData: [],
      deleteModal:false
    }
  },
  created() {
    this.form.userId = this.$route.query.id;
    this.form.type = 3;
    this.queryData();
  },
  methods: {
    //查询功能
    search() {
      this.pageNum = 1;
      this.pageSize = 10;
      this.queryData();
    },
    //重置
    reset() {
        this.pageNum = 1;
        this.pageSize = 10;
        this.form.productName = "";
        this.form.modelName = "";
        this.form.areaName = "";
        this.form.manufactureName = "";
        this.initDateRange();
    },
    //数据列表
    queryData() {
      var that = this;
      this.form.pageSize = this.pageSize;
      this.form.pageNum = this.pageNum;
      getPriceConfig(formData(this.form)).then(res => {
          that.tableData = res.response.list || [];
          that.total = res.response.total;
      });
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
    }
  }
};

</script>
