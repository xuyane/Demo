<style lang="less" scoped>
.mar-t-20{
  margin-bottom:20px;
}
.info-detail{
  border-left: 1px solid #ddd;
}

</style>
<template>
  <Row>
    <Form ref="formItemSon" :label-width="150">
      <FormItem label="关联品种名称:" prop="info">
        <Select
          ref="informationRef"
          v-model="form.informationTypeId"
          filterable
          remote
           @on-query-change="remoteMethod"
          @on-change="infoFenlei"
          label-in-value
          :loading="loading1" style="width:53%">
          <Option v-for="option in options1" :value="option.value" :key="option.value">{{option.label}}</Option>
        </Select>
        <Button type="primary" @click="xuanzheInfo">选择关联</Button>
          
      </FormItem>
      <FormItem label="">
         <Row >
      <!-- <Col>
        <div class="info-title">
          <p>关联的品种</p>
        </div>
      </Col> -->
      <Col >
        <div class="info-detail" style="width:60%">
          <div v-for="(item, index) in breedRelations" :key="item.id" ref="selectedBreed">
            <span>{{item.name}}</span>
            <b class="icon-delete mar-l-10" @click="removeSelect(index)"></b>
          </div>
        </div>
      </Col>
    </Row>
      </FormItem>
    </Form>
 
<!-- 关联模板开始 -->
    <Modal v-model="AssoInforClass" title="关联品种" width="900">
      <Form ref="shenheform" :model="Assonform" :label-width="110">
          <Row>
              <Col span="11">
                  <FormItem label="品种名称">
                      <Input v-model="Assonform.name" placeholder="请输入品种名称"></Input>
                  </FormItem>
              </Col>
              <Col span="12" class="text-right">
                  <Button type="primary" icon="ios-search"  @click="infoSeach">查询</Button>
                  <Button style="margin-left: 8px" icon="ios-refresh"  @click="handleReset()">重置</Button>
              </Col>
          </Row>
      </Form>
      <Row class-name="table-con" style="padding-left:0px">
              <Table class="tableCommon"
              :data="tableData_info"
              :columns="columns_info"
              :stripe="true"
              :border="true"
              @on-selection-change="handleRowChange"
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
import { informationtypeList, informationType,getBreed,breedList,editDetail } from "./api/unitManageMent";
export default {
  components: {
    oilPage
  },
  props: {
    siteChange: Object,
     informationList:Array
  },
  data() {
    const validateInfoSite = (rule, value, callback) => {
      console.log('zzz')
      if (this.siteChangeNum === -1) {
        console.log(22);
        callback(new Error("请输入站点"));
      } else {
        console.log(11);
        callback();
      }
    };
    return {
      siteChangeNum: -1,
      AssoInforClass: false,
      breedRelations: [],
      loading1: false,
      options1: [],
      tableData_info: [],
      pageSizeOpts: [5, 10, 20],
      pageSize: 5,
      pageNum: 1,
      showSizer: true,
      total: 0,
      form: {
        informationTypeId: ""
      },
      Assonform: {
        code: "",
        name: "",
        siteId: ""
      },
      columns_info: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "品种名称",
          key: "name"
        },
        {
          title: "简称",
          key: "shortName"
        },
        {
          title: "别名",
          key: "keyword"
        }
      ],
    };
  },
  created() {
   this.getEditDetia();
    this.getListPage();
  },
  methods: {
       getEditDetia(){
         if(this.$route.query.informationUnitId){
               let form={
                informationUnitId:this.$route.query.informationUnitId
              }
              editDetail(formData(form)).then(res=>{
                // console.log("关联产品",res);
                if(res.response.productId == null ||res.response.productId ==0 ){
                  // console.log("没有关联产品");
                  this.breedRelations = this.informationList;
                }else{
                  // console.log("有关联产品");
                  this.breedRelations=[];
                }
              })
         }
    
    },
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
        name: this.Assonform.name,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      };
      breedList(form).then(res => {
        console.log(res);
        this.tableData_info = res.response.list;
        this.total = res.response.total;
      });
    },
    // 关联信息分类开始
    infoSeach() {
       this.pageNum = 1;
      this.getListPage();
    },
    //重置
    handleReset(){
       this.Assonform.name = '';
       this.Assonform.code= "";
    },
    xuanzheInfo(data) {
      this.AssoInforClass = true;
      //每次打开弹窗再次请求数据，保持弹窗展示始终打开第一页
     this.pageNum = 1;
      this.tableData_info = [];
       this.getListPage();
    },
    //取消按钮
     Relationcancel() {
      this.AssoInforClass = false
    },
    remoteMethod(query) {
      if (query !== "") {
        //console.log(111)
        this.loading1 = true;
        let params = {
          name: query
        };
        setTimeout(() => {
          this.loading1 = false;
          getBreed(formData(params)).then(res => {
            //console.log(res);
            const list1 = res.response.map(item => {
              return {
                value: item.id,
                label: item.text
              };
            });
            this.options1 = list1;
          });
        }, 200);
        //console.log('pppp',this.form.informationTypeId);
      } else {
        this.form.informationTypeId = "";
        //console.log(111)
        this.options1 = [];
      }
    },
    infoFenlei(name) {
      const that = this;
      let breedObjOne = {
        id: name.value,
        name: name.label
      };
      if (that.isRepeatBreed(name.id)) {
        that.breedRelations.push(breedObjOne);
      }
      this.$emit('connectVarieties', this.breedRelations);
    },
    // 监听选中项发生变化
    handleRowChange(row) {
      console.log(row);
      this.selectRow = row;
    },
    //判断信息分类
    isRepeatBreed(value) {
      if (this.breedRelations.length > 0) {
        let breedArr = [];
        for (let j = 0; j < this.breedRelations.length; j++) {
          breedArr.push(this.breedRelations[j].id);
        }
        if (breedArr.indexOf(value) == -1) {
          return true;
        }
      } else {
        return true;
      }
    },
    //删除关联品种
    removeSelect(index) {
      this.$emit('connectVarieties', this.breedRelations);
      this.breedRelations.splice(index, 1);
      if(this.breedRelations.length < 1) {
        this.$refs.informationRef.query = ''
      }
    },
    //点击选择信息分类确认按钮
    doEdit() {
      let that = this;
      that.loading1 = true;
      if (that.selectRow.length > 0) {
        console.log(that.selectRow.length )
        for (let i = 0; i < that.selectRow.length; i++) {
          let breedObj = {};
          breedObj.id = that.selectRow[i].id;
          breedObj.name = that.selectRow[i].name;
          if (that.isRepeatBreed(that.selectRow[i].id)) {
            that.breedRelations.push(breedObj);
          }
          this.$emit('connectVarieties', this.breedRelations);
        }
        that.selectRow = [];
      }
      that.AssoInforClass = false;
      that.loading1 = false;
    },
   
  },

};
</script>