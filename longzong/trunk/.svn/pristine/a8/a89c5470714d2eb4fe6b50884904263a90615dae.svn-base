<style>
</style>

<template >
  <Row class='varietybox'>
    <Col span="24" class-name="search-form">
        <Form ref="form" :model="form" :label-width="120">
            <Row type="flex" justify="space-between">
                <Col span='7'>
                    <FormItem label="产品名称:" :label-width="100">
                        <Input type="text" v-model="form.productName" class="search-input" placeholder="请输入产品名称"></Input>
                    </FormItem>
                </Col>
                 <Col span='7'>
                    <FormItem label="产品ID:" :label-width="100">
                        <Input type="text"  v-model.number="form.priceId" @on-keyup="keyUp" class="search-input" placeholder="请输入产品id"></Input>
                    </FormItem>
                </Col>
                <Col span='7'>
                    <FormItem label="规格型号:" :label-width="100">
                        <Input type="text" v-model="form.modelName" class="search-input" placeholder="请输入规格型号"></Input>
                    </FormItem>
                </Col>
                <Col span='7'>
                    <FormItem label="地区名称:" :label-width="100">
                        <Input type="text" v-model="form.areaName" class="search-input" placeholder="请输入地区名称"></Input>
                    </FormItem>
                </Col>
                 <Col span='7'>
                    <FormItem label="市场名称:" :label-width="100">
                    <Input type="text" v-model="form.marketName" class="search-input" placeholder="请输入市场名称"></Input>
                    </FormItem>
                </Col>
                <Col span='7'>
                  <FormItem label="是否显示:" :label-width="100">
                    <Select v-model="form.isShow">
                      <Option v-for="item in showList" :value="item.value" :key="item.value">{{ item.desc }}</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span='7'>
                  <FormItem label="启用禁用:" :label-width="100">
                    <Select v-model="form.isStart">
                      <Option v-for="item in startList" :value="item.value" :key="item.value">{{ item.desc }}</Option>
                    </Select>
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
     <!-- 删除弹窗开始 -->
    <Modal v-model="deleteModal" title="删除成品油主营批发价价格">
      <p>是否删除成品油主营批发价价格配置？</p>
      <div slot="footer">
        <i-button type="primary" @click="deleteData">确定</i-button>
        <i-button @click="deleteModal=false">取消</i-button>
      </div>
    </Modal>
    <!-- 删除弹窗结束 -->
  </Row>
</template>
<script>
import axios from "axios";
import oilPage from "../components/page/page.vue";
import {
  getPriceConfig,deletePriceConfig
} from "../components/axios/apiManagement.js";
import { formData } from "../../assets/js/common.js";
export default {
  name: "wholesalePrice",
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
      deleteId:"",
      deleteModal:false,
      form:{
        userId: "",
        type:"",
        productName: "",
        modelName: "",
        areaName: "",
        manufactureName:"",
        priceId:"",
        marketName:"",
        isShow:-1,
        isStart:-1
      },
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
          title: "产品ID",
          key: "priceId",
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
        },
        {
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
    }
  },
  created() {
    this.form.userId = this.$route.query.id;
    this.form.type = 5;
    this.queryData();
  },
  methods: {
     //限制只能输入数字
      keyUp() {
      let typeInput = typeof this.form.priceId;
      if (typeInput != "number") {        
        this.form.priceId = this.form.priceId.replace(/[^\d]/g, "");        
      } 
    },
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
        this.form.priceId = "";
        this.form.marketName = "";
        this.form.isShow = -1;
        this.form.isStart= -1;
    },
    //数据列表
    queryData() {
      var that = this;
      this.form.pageSize = this.pageSize;
      this.form.pageNum = this.pageNum;
      getPriceConfig(formData(this.form)).then(res => {
          that.tableData = res.response.list;
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
    },
   //删除提示框
    deleteDataModal(id){
      this.deleteModal = true;
      this.deleteId = id;
    },
    //删除
    deleteData(){
      let params = {
        id : this.deleteId
      }
      deletePriceConfig(params).then(res => {
        this.deleteModal = false;
        if (res.status == 200) {
          this.$Message.success("删除成功！");
          this.queryData();
        } else {
          this.$Message.error(res.message);
        }
      });
    }
  }
};

</script>
