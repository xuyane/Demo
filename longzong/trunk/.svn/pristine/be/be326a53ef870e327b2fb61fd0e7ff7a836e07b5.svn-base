<style lang="less" scoped>
.mar-t-20{
  margin-bottom:20px;
}
.ivu-input-disabled{
  color:#333 !important;
}
.info-detail{
  border-left: 1px solid #ddd;
}

</style>
<template>
  <Row>
    <Form ref="formItemSon" :rules='ruleValidate' :label-width="150">
      <FormItem label="关联的信息分类:" prop="info">
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
          <Row>
      <!-- <Col>
        <div class="info-title">
          <p>关联信息分类</p>
        </div>
      </Col> -->
      <Col >
        <div class="info-detail"  style="width:60%">
          <div v-for="(item, index) in breedRelations" :key="index" ref="selectedBreed">
            <span>{{item.informationTypeRoadName}}</span>
            <b class="icon-delete mar-l-10" @click="removeSelect(index,item)"></b>
          </div>
        </div>
      </Col>
    </Row>
       </FormItem>
    </Form>
 
<!-- 关联模板开始 -->
    <Modal v-model="AssoInforClass" title="关联信息分类" width="900">
      <Form ref="shenheform" :model="Assonform" :label-width="110">
          <Row>
              <Col span="12" class="text-right">
              <FormItem label="信息分类编码">
                  <Input v-model="Assonform.code" placeholder="请选择信息分类编码"></Input>
              </FormItem>
              </Col>
              <Col span="12">
                  <FormItem label="信息分类名称">
                      <Input v-model="Assonform.name" placeholder="请选择信息分类名称"></Input>
                  </FormItem>
              </Col>
          </Row>
          <Row> 
              <Col span="24" class="text-right">
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
import { informationtypeList, informationType } from "./api/unitManageMent";
export default {
  name: 'selectConnect',
  components: {
    oilPage
  },
  props: {
    siteChange: Object,
  },
  data() {
    const validateInfoSite = (rule, value, callback) => {
      console.log('zzz')
      if (this.siteChangeNum === -1) {
        callback(new Error("请输入站点"));
      } else {
        if (this.breedRelations.length < 1) {
          console.log('qweqweqwe')
          callback(new Error("请输入选择关联信息分类"));
        } else {
          console.log('rrrrr')
          callback()
        }
      }
    };
    return {
      siteChangeNum: -1,
      AssoInforClass: false,
      breedRelations: [],
      loading1: false,
      options1: [],
      tableData_info: [],
      pageSizeOpts: [10,15,20,40,50,100,200],
      pageSize: 5,
      pageNum: 1,
      pageSize: 5,
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
          title: "信息分类编码",
          key: "code"
        },
        {
          title: "信息分类路径",
          key: "informationTypeRoadName"
        }
      ],
      ruleValidate: {
        info: [
          {
            required: true,
            validator: validateInfoSite,
            message: "请选择关联信息分类",
            trigger: "change"
          }
        ]
      }
    };
  },
  created() {
    // this.getListPage();
    console.log("父组件传信息分类",this.breedRelations);
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
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        siteId: this.Assonform.siteId,
        code: this.Assonform.code,
        name: this.Assonform.name,
        status:0
      };
      informationtypeList(form).then(res => {
        console.log("信息分类测试",res);
        console.log("信息分类参数",form)
        this.tableData_info = res.response.list;
        this.total = res.response.total;
      });
    },
    //触发子组件验证事件
    childValidateFn(){
      console.log('qqqq')
      return this.$refs.formItemSon.validateField('info');
    },
    // 关联信息分类开始
    infoSeach() {
      this.pageNum = 1;
      this.getListPage();
    },
    //重置
    handleReset(){
      //  this.Assonform.siteId = '';
       this.Assonform.code='';
       this.Assonform.name='';
    },
    xuanzheInfo(data) {
      if (this.siteChangeNum === -1) {
        return this.$emit('selectConent', false)
      }
      this.pageNum =1;
      this.AssoInforClass = true;
      console.log(this.AssoInforClass)
     //每次打开弹窗再次请求数据，保持弹窗展示始终打开第一页
     this.pageNum = 1;
      this.tableData_info = [];
       this.getListPage();
    },
    remoteMethod(query) {
      if (this.siteChangeNum === -1) {
        return this.$emit('selectConent', false)
      }
      // if(query){

      // }
      if (query !== "") {
        //console.log(111)
        this.loading1 = true;
        let params = {
          name: query,
          siteId:this.Assonform.siteId
        };
        setTimeout(() => {
          this.loading1 = false;
          informationType(formData(params)).then(res => {
            console.log("信息分类下拉列表",res);
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
        this.form.informationTypeId = '';
        //console.log(111)
        this.options1 = [];
      }
    },
    infoFenlei(name) {
      console.log(name);
      const that = this;
      let breedObjOne = {
        id: name.value,
        informationTypeRoadName: name.label
      };
      if (that.isRepeatBreed(name.value)) {
        that.breedRelations.push(breedObjOne);
      }
       this.$emit('connectInfo', this.breedRelations);
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
        console.log("afasd", this.breedRelations)
        if (breedArr.indexOf(value) == -1) {
          return true;
        }
      } else {
        return true;
      }
    },
    //删除关联品种
    removeSelect(index,value) {
      this.breedRelations.splice(index, 1);
      this.$emit('connectInfo', this.breedRelations)
      if(this.breedRelations.length < 1) {
        this.$refs.informationRef.query = ''
      }
      
    },
    //点击选择信息分类确认按钮
    doEdit() {
      let that = this;
      that.loading1 = true;
      if (that.selectRow.length > 0) {
        for (let i = 0; i < that.selectRow.length; i++) {
          let breedObj = {};
          breedObj.id = that.selectRow[i].id;
          breedObj.informationTypeRoadName = that.selectRow[i].informationTypeRoadName;
          if (that.isRepeatBreed(that.selectRow[i].id)) {
            that.breedRelations.push(breedObj);
          }
          this.$emit('connectInfo', this.breedRelations);
        }
        that.selectRow = [];
      }
      that.AssoInforClass = false;
      that.loading1 = false;
      this.tableData_info.forEach((items)=>{
        this.$set(items,"select",false)
      })
    },
    Relationcancel() {
      this.AssoInforClass= false;
    }
      
  },
  watch: {
    siteChange(newV, oldV) {
      this.siteChangeNum = newV.value;
      this.Assonform.siteId = newV.value;
      this.options1= [];
      console.log(this.Assonform.siteId )
      console.log("II", this.siteChangeNum);
    }
  }
};
</script>