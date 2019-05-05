<style lang="less" scoped>

</style>

<template>
  <Row>
    <Col span="24">
      <Row class-name="current-position">
        当前位置：产品中心&nbsp;&nbsp;>>&nbsp;&nbsp;变更日志
      </Row>
    </Col>
    <Col span="24" class-name="search-form">
      <Form :model="form" :label-width="80">
        <Row type="flex" justify="space-between">
          <Col span="7">
            <FormItem label="产品名称:">
              <Input v-model="form.productNameCn" class="search-input" placeholder="请输入产品名称"></Input>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="产品分类:">
              <Cascader v-model="productClassify" :data="productClassificationList" class="search-input" @on-change="getproductClassify" placeholder="请选择产品分类"></Cascader>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="修改人:">
              <Input v-model="form.operatorName" class="search-input" placeholder="请选择修改人名称"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="space-between">
          <Col span="7">
            <FormItem label="修改时间:">
              <DatePicker v-model="changeTime" format="yyyy-MM-dd" type="daterange" placement="top-start" placeholder="请选择修改日期" class="search-input" @on-change="getOperatorTime"></DatePicker>
            </FormItem>
          </Col>
          <Col span="7" class="text-right">
            <Button type="primary"  @click="search">查询</Button>
            <Button style="margin-left: 8px"  @click="clearSearch">重置</Button>
          </Col>
        </Row>
      </Form>
    </Col>
    <Col span="24" class="table-con">
      <Table class="tableCommon" :data="tableData" :columns="columns" ref="dragTable" :stripe="true" :border="true">
      </Table>
      <div class="page-con">
        <span>第{{form.pageNum}}页 / 共{{pages}}页   每页{{form.pageSize}}条   共{{total}}条</span>
        <Page :total="total" :page-size="form.pageSize" :current="form.pageNum" show-elevator class="pull-right" show-sizer @on-change="getpages" @on-page-size-change="getPageSize"></Page>
      </div>
    </Col>
  </Row>
</template>

<script>
import { productListPage, proCategoryList,productListPageOld } from '../components/axios/productCenter.js'
export default {
  name: 'myTable',
  components: {
  },
  data () {
    return {
      productClassify:[],
      changeTime: '',
      form: {
        productNameCn: '',
        type: 0,
        operatorName: '',
        operatorTime: '',
        productCategoryCode:'',
        pageNum: 1,
        pageSize: 5,
        type: ""
      },
      total:10,
      pages:10,
      productClassificationList: [],
      columns: [ {
        key: 'id',
        title: '编号',
        align: 'center',
        width: 70,
        render: (h,data) => {
          let showIndex = data.index+((this.form.pageNum-1)*this.form.pageSize)+1;
          return h('span',showIndex);
        }
      }, {
        key: 'productNameCn',
        align: 'center',
        title: '产品名称'
      }, {
        key: 'shortNameCn',
        align: 'center',
        title: '简称'
      }, {
        key: 'productCategoryName',
        align: 'center',
        title: '产品分类'
      }, {
        key: 'operatorName',
        align: 'center',
        title: '修改人'
      }, {
        key: 'departmentName',
        align: 'center',
        title: '部门'
      }, {
        key: 'operatorTime',
        align: 'center',
        title: '修改时间'
      }, {
        title: '操作',
        align: 'center',
        width: 150,
        render: (h, data) => {
          return h('div', [
            h('span', {
              style: {
                color: '#145edb',
                textDecoration: 'underline',
                cursor: 'pointer'
              },
              on: {
                click: () => {
                  this.details(data.row.id)
                }
              }
            }, '查看')
          ])
        }
      }],
      tableData: []
    }
  },
  created (){
    this.getData(this.form);
    this.getProCategory()
  },
  methods: {
    details (logId) {//查看详情
      this.$router.push({
        name: 'logDetails',
        query: {
          id: logId
        }
      })
    },
    getData (data) {//请求列表数据
      this.$Spin.show();
      let that = this;
      productListPageOld(data).then(function(res){
        if(res.response.list == null || res.response.list.length<1){
          that.tableData = [];
        }else{
          that.tableData = res.response.list;
          that.total = res.response.total;
          that.pages = res.response.pages;
        }
        that.$Spin.hide();
      })
    },
    getProCategory () {//获取产品分类
      let that = this;
      proCategoryList().then(res => {
        that.productClassificationList = this.productDigui(res.response);
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
    search () {//查询按钮
      this.form.pageNum = 1
      this.getData (this.form)
    },
    //产品分类切换
    getproductClassify (value, selectedData){
      this.productClassify = value
      this.form.productCategoryCode = value[value.length-1]
    },
    clearSearch () {//清空查询条件
      this.form.productNameCn='';
      this.form.type='';
      this.form.operatorName='';
      this.form.operatorTime='';
      this.form.productCategoryCode = '';
      this.changeTime = '';
      this.productClassify = []
    },
    getpages (data) {//获取跳转页码
      let that = this;
      this.form.pageNum = data;
      this.getData(this.form);
    },
    getPageSize (pageSize) {//获取每页显示条数
      let that = this;
      this.form.pageSize = pageSize;
      this.getData (this.form);
    },
    getOperatorTime (data) {//获取修改时间
      this.form.operatorTime = data[0]+","+data[1];
    }
  }
}
</script>
