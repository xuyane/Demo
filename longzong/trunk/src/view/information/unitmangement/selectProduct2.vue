<style lang="less" scoped>
.mar-t-20{
  margin-bottom:20px;
}
</style>
<template>
  <Row>
    <FormItem label="产品:" >
        <Input placeholder="请选择关联产品" style="width:53%" disabled="disabled" v-model="productName" ></Input>        
        <Button type="primary"  v-if="productName=='' || productName==null" @click="infoProduct()">关联产品</Button>
        <!-- <Button type="primary"  v-else @click="getProductEdit()">升级产品</Button>
        <Button type="primary"  v-else @click="noInfoProduct()" >取消关联</Button> -->
        <Button type="primary"  v-if="productName != ''&&  productName!=null" @click="getProductEdit()">升级产品</Button>
        <Button type="primary"  v-if="productName != ''&&  productName!=null" @click="noInfoProduct()" >取消关联</Button>
    </FormItem>
<!-- 关联模板开始 -->
    <Modal v-model="productMadel2" title="关联产品" width="900">
      <Form ref="shenheform" :model="Assonform" :label-width="110">
          <Row>
              <Col span="11">
                  <FormItem label="产品名称">
                      <Input v-model="Assonform.name" placeholder="请输入产品名称"></Input>
                  </FormItem>
              </Col>
              <Col span="11" class="text-right">
                  <Button type="primary" icon="ios-search"  @click="infoSeach">查询</Button>
                  <Button style="margin-left: 8px" icon="ios-refresh"  @click="handleReset()">重置</Button>
              </Col>
          </Row>
      </Form>
      <Row class-name="table-con" style="padding-left:0px">
              <Table
              :data="tableData_info"
              :columns="columns_info"
              :stripe="true"
              :border="true"
                >
              </Table>
      </Row>
      <Row>
        <oil-page :total="total" :page-num="pageNum" :page-size="pageSize" @page-change="pageChange" :page-size-opts="pageSizeOpts" :show-sizer="showSizer"></oil-page>
      </Row>
      <div slot="footer">
          <i-button type="primary" @click="doEdit">保存</i-button>
          <i-button type="primary" @click="Relationcancel">取消</i-button>
      </div>
    </Modal>
<!-- 关联模板结束 -->
  </Row>
</template>
<script>  
import axios from "axios";
import oilPage from "../../components/page/page.vue";
import { formData } from "../../../assets/js/common.js";
import { productList,productDetail  } from "./api/unitManageMent";
export default {
  components: {
    oilPage
  },
  props:{
     productNameP:String,
     productId:Number
  },
  data() {
    return {
      siteChangeNum: -1,
      productMadel2: false,
      breedRelations: [],
      loading1: false,
      options1: [],
      tableData_info: [],
      pageSizeOpts: [5, 10, 20],
      pageSize: 5,
      pageNum: 1,
      pageSize: 5,
      showSizer: true,
      total: 0,
      form: {
        informationTypeId: ""
      },
      productName:"",//产品名称
      Assonform: {
        code: "",
        name: "",
      },
      columns_info: [
        {
          width: 60,
          align: "center",
          render:(h,params)=>{
              return h('Checkbox', {
                    props: {
                        value: params.row.select
                    },
                    on: {
                        'on-change': (e) => {
                            this.tableData_info.forEach((items)=>{      //先取消所有对象的勾选，checkBox设置为false
                                this.$set(items,'select',false);
                            });
                            this.tableData_info[params.index].select =true;  //再将勾选的对象的checkBox设置为true
                            this.selectRow = this.tableData_info[params.index];
                        }
                    }
                });
          }
        },
        {
          title: "产品名称",
          key: "name"
        },
        {
          title: "产品分类",
          key: "productCategoryCodeName"
        },
        {
          title:'已关联信息单元',
          key:'infomationName'
        }
      ],
    };
  },
  created() {
    this.productName = this.productNameP;
    this.getListPage();
  },
  methods: {
    //获取分页数据
    pageChange(page, pageSize) {
      if (page) {
        this.pageNum = page;
      }
      if (pageSize) {
        this.pageSize = pageSize;
      }
      this.getListPage();
    },

    // 列表
    getListPage() {
      let form = {
        code: this.Assonform.code,
        name: this.Assonform.name,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      };
      productList(form).then(res => {
        this.tableData_info = res.response.list;
        this.total = res.response.total;
      });
    },
    handleReset(){
      this.Assonform.name =''
    },
    // 关联信息分类开始
    infoSeach() {
       this.pageNum = 1;
      this.getListPage();
    },
    infoProduct(data) {
      this.productMadel2 = true;
      this.pageNum = 1;
      this.tableData_info=[]; 
      this.getListPage();
    },
    noInfoProduct(){
       this.tableData_info.forEach((items)=>{      //先取消所有对象的勾选，checkBox设置为false
          this.$set(items,'select',false)
      });
        this.productName = "";
        this.$emit('connectProduct','');

    },
    // 监听选中项发生变化
    // handleRowChange(row) {
    //   console.log(row);
    //   this.selectRow = row;
    // },
    //点击选择信息分类确认按钮
    doEdit() {
      let that = this;
      that.loading1 = true;
        //   console.log(that.selectRow);
        if(that.selectRow.infomationName == '' ||that.selectRow.infomationName ==null ){
             if (that.selectRow.name !="") {
              that.productName = that.selectRow.name;
              //    向addInformationSettings 组件发送关联品种的内容
                that.$emit('connectProduct', that.selectRow);
              that.selectRow = [];
            }else{
              //   当没有选择关联品种时，向addInformationSettings组件发送一个空值，同时将productName置为空
                that.$emit('connectProduct','');
                that.productName="";
            }
            that.productMadel2 = false;
            that.loading1 = false;
        }else{
          that.$Message.warning('已关联信息单元不能被选择');
          
        }
     
      
    },
    Relationcancel() {
       this.$emit('connectProduct','');
       this.tableData_info.forEach((items)=>{      //先取消所有对象的勾选，checkBox设置为false
          this.$set(items,'select',false)
      });
       this.productName="";
       this.productMadel2 = false;
    },
    getProductEdit(){
      let form = {
        productId:this.productId
      }
      productDetail(formData(form)).then(res=>{
        this.$emit("connectProductDetail",res.response)
      })
    }
  },
  watch:{
    productNameP(newV,oldV){
      this.productName = newV;
    }
  }
};
</script>