<style lang="less" scoped>
</style>

<template>
  <Col>
    <Form :label-width="100" class="addform">
      <formItem prop='breedId' label="品种:">
        <Row>
            <Col>
            <Row>
                <Col span="14" style='margin-right:20px;'>
                    <Input v-model='breedId' style="display:none"> </Input>
                    <associate-Search @query-list="breedNameFunction" :dataUrl="url" ref="childData"></associate-Search>
                </Col>
                <Col span="6">
                    <Button type="primary" @click="showselect">选择品种</Button>
                    <Button type="primary" @click="deleteAllBreed">清空所有品种</Button>
                </Col>
            </Row>
            </Col>
            <Col class="hadwrap">
            <Col>
                <div v-for='(item1, index) in  breedTypeRelationList' :key='item1.breedId'>
                    <Col span="14" style='margin-right:20px;'>
                        <Input v-model='item1.breedName' readonly> </Input>
                          <div v-for='(item2, itemindex) in  item1.infomationList' :key='item2.informationTypeId'  class="selectvwrap">
                            <Col span="14" style='margin-right:20px;'>
                             <span style="color:#FF8C00">{{item2.informationTypeName}}</span>
                              <Col  class="selectvwrap">
                                <div v-for='(option, unitIndex) in  item2.infomationUnitList' v-if='option.informationUnitName' :key='option.informationUnitId' style="float:left;">
                                {{option.informationUnitName}}
                                <b class="icon-delete" @click="removeselect(index, itemindex,unitIndex)"></b>
                                </div>
                              </Col>
                            </Col>
                            <Col span="8">
                              <Button type="primary" @click="showUnitselect(index,itemindex)">选择信息单元</Button>
                              <Button type="primary" @click="deleteInformationType(index,itemindex)">删除信息分类</Button>
                            </Col>
                          </div>
                    </Col>
                    <Col span="6">
                      <Button type="primary" @click="showInfoselect(index)">选择信息分类</Button>
                      <Button type="primary" @click="deleteBreed(index)">删除品种</Button>
                    </Col>
                </div>
            </Col>
            </Col>
        </Row>
      </formItem>
        <div style="text-align:center;width:1360px;">
            <i-button  class="search-btn" type="primary" @click="doConfirmAddBreed">保存</i-button>
            <i-button class="search-btn" type="primary" @click="exportBtnOpen">导出</i-button>
            <i-button class="search-btn" @click="doCancel">返回</i-button>
        </div>
    </Form>
  <Modal v-model="showselectModal" title="选择品种类别" @on-cancel="cancel" width="900" class="selectgg">
    <Form  ref="selectformRef" class="addform">
      <Row type="flex" justify="space-between">
        <Col span="7">
        <FormItem label="品种名称:" :label-width="100">
          <Input v-model="selectform.breedName" class="search-input"></Input>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem>
          <Button type="primary" @click="handleSubmit">搜索</Button>
          <Button @click="handleReset" style="margin-left: 20px">重置</Button>
        </FormItem>
        </Col>
      </Row>
    </Form>
    <div>
      <Table class="tableCommon" border ref="selection" :columns="columns" :data="dataTable" @on-selection-change="handleRowChange"></Table>
      <oil-page :total="total" :page-num="pageNum" :page-size="pageSize" @page-change="pageChange" :page-size-opts="pageSizeOpts" :show-sizer="showSizer"></oil-page>
    </div>
    <div slot="footer">
      <i-button class="search-btn" type="primary" @click="doEdit">确定</i-button>
      <i-button class="search-btn" @click="cancel(0)">取消</i-button>
    </div>
  </Modal>
   <Modal v-model="showselectInfoModal" title="选择信息分类" @on-cancel="cancel" width="900" class="selectgg">
    <Form  ref="selectformRef" class="addform">
      <Row type="flex" justify="space-between">
        <Col span="7">
        <FormItem label="信息分类名称:" :label-width="100">
          <Input v-model="selectform1.informationTypeName" class="search-input"></Input>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="信息分类编码:" :label-width="100">
          <Input v-model="selectform1.informationTypeCode" class="search-input"></Input>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem>
          <Button type="primary" @click="handleSubmit1">搜索</Button>
          <Button @click="handleReset1" style="margin-left: 20px">重置</Button>
        </FormItem>
        </Col>
      </Row>
    </Form>
    <div>
      <Table class="tableCommon" border ref="selection" :columns="columns1" :data="dataTableInfo" @on-selection-change="handleRowChange1"></Table>
      <oil-page :total="total" :page-num="pageNum1" :page-size="pageSize1" @page-change="pageChangeInfo" :page-size-opts="pageSizeOpts" :show-sizer="showSizer"></oil-page>
    </div>
    <div slot="footer">
      <i-button  class="search-btn" type="primary" @click="doEdit1">确定</i-button>
      <i-button class="search-btn" @click="cancel(1)">取消</i-button>
    </div>
  </Modal>

  <Modal v-model="showselectUnitModal" title="选择信息单元" @on-cancel="cancel" width="900" class="selectgg">
    <Form  ref="selectUnitformRef" class="addform">
      <Row type="flex" justify="space-between">
        <Col span="7">
        <FormItem label="信息单元名称:" :label-width="100">
          <Input v-model="selectform3.informationUnitName" class="search-input"></Input>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="信息单元编码:" :label-width="100">
          <Input v-model="selectform3.informationUnitCode" class="search-input"></Input>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem>
          <Button type="primary" @click="handleSubmit3">搜索</Button>
          <Button @click="handleReset3" style="margin-left: 20px">重置</Button>
        </FormItem>
        </Col>
      </Row>
    </Form>
    <div>
      <Table class="tableCommon" border ref="selection" :columns="columns3" :data="dataUnitInfo" @on-selection-change="handleRowChange3"></Table>
      <oil-page :total="total" :page-num="pageNum3" :page-size="pageSize3" @page-change="pageChangeUnit" :page-size-opts="pageSizeOpts" :show-sizer="showSizer"></oil-page>
    </div>
    <div slot="footer">
      <i-button class="search-btn" type="primary" @click="doEdit3">确定</i-button>
      <i-button class="search-btn" @click="cancel(2)">取消</i-button>
    </div>
  </Modal>
  </Col>
</template>
<script>
import oilPage from "../components/page/page.vue";
import associateSearch from "../components/associateSearch/associateSearch.vue";
import axios from "axios";
import {
  saveInformationConfig,selectInformationConfig,exportBtn,queryPageInformationUnit
} from "../components/axios/apiManagement.js";
import { formData } from "../../assets/js/common.js";
import { deletePermissionList } from '../components/axios/EAC';
export default {
  name: "informationConfig",
  components: {
    oilPage,
    associateSearch
  },
  data() {
    return {
      showselectModal: false,
      showselectInfoModal: false,
      showselectUnitModal:false,
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "品种名称",
          key: "breedName"
        },
        {
          title: "品种简称",
          key: "shortName"
        }
      ],
       columns1: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "信息分类编码",
          key: "informationTypeCode"
        },
        {
          title: "信息分类名称",
          key: "informationTypeName"
        }
      ],
       columns3: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "品种名称",
          key: "breedName"
        },
        {
          title: "信息分类名称",
          key: "informationTypeName"
        },
        {
          title: "信息单元编码",
          key: "informationUnitCode"
        },
        {
          title: "信息单元名称",
          key: "informationUnitName"
        }
      ],
      dataTable: [],
      dataTableInfo: [],
      dataUnitInfo:[],
      pageSizeOpts: [5,10, 20],
      showSizer: true,
      pageSize: 5,
      pageNum: 1,
      pageSize1: 5,
      pageNum1: 1,
      pageSize3: 5,
      pageNum3: 1,
      total: 0,
      name: "",
      userId: "",
      loading: false,
      loading1: false,
      loading2: false,
      tid: 0,
      selectRow1:[],
      selectRow:[],
      selectRow3:[],
      url: "/openapi/common/breedNameSelectTO",
      selectform: {
        code: "",
        breedName: ""
      },
      selectform1: {
        informationTypeCode: "",
        informationTypeName: ""
      },
      selectform3: {
        informationUnitCode: "",
        informationUnitName: ""
      },
      breedId:"",
      infomationList: [],
      breedTypeRelationList: [],
      infomationUnitList:[],
      showModal: false,
      loading: true,
      actionindex:0,
      infomationindex:0
    };
  },
  created(){
    this.userId = parseInt(this.$route.query.id);
    this.initData(this.userId);
  },
  methods: {
    //反显信息配置

    //初始化数据
    initData(initId) {
      var that = this;
      var params = {
        userId: initId,
        time: new Date().getTime()
      }
      selectInformationConfig(params).then(res => {
        if(res.response){
          that.breedTypeRelationList = res.response.data.breedTypeRelationList;
        }
        
      });
    },
    //品种分页
    pageChange(page, pageSize) {
      if (page) {
        this.pageNum = page;
      }
      if (pageSize) {
        this.pageSize = pageSize;
      }
      this.getBreedList();
    },
    //信息分类分页
    pageChangeInfo(page, pageSize) {
      if (page) {
        this.pageNum1 = page;
      }
      if (pageSize) {
        this.pageSize1 = pageSize;
      }
      this.getInfoList();
    },
    //信息单元分页
    pageChangeUnit(page, pageSize) {
      if (page) {
        this.pageNum3 = page;
      }
      if (pageSize) {
        this.pageSize3 = pageSize;
      }
      this.getUnitList();
    },
    //点击选择品种确认按钮
    doEdit() {
      let that = this;
      that.loading1 = true;
      if (that.selectRow && that.selectRow.length > 0 ) {
        for (let i = 0; i < that.selectRow.length; i++) {
          let breedObj = {};
          breedObj.breedId = that.selectRow[i].breedId;
          breedObj.breedName = that.selectRow[i].breedName;
          if (that.isRepeatBreed(that.selectRow[i].breedId)) {
            that.breedTypeRelationList.push(breedObj);
          }
        }
        that.selectRow = [];
      }else{
        that.$Message.warning("请选择品种");
        return;
      }
      that.showselectModal = false;
      that.loading1 = false;
    },
    //点击选择信息分类确认按钮
    doEdit1() {
      let that = this;
      if (that.selectRow1 && that.selectRow1.length > 0 ) {
        for (let i = 0; i < that.selectRow1.length; i++) {
          let breedObj = {};
          breedObj.informationTypeId = that.selectRow1[i].informationTypeId;
          breedObj.informationTypeName = that.selectRow1[i].informationTypeName;
          let infomationList=[];
          if (that.isRepeatInfomationType(that.selectRow1[i].informationTypeId)) {
            if(that.breedTypeRelationList[this.actionindex].infomationList){
              that.breedTypeRelationList[this.actionindex].infomationList.push(breedObj);
            }else{
              infomationList.push(breedObj);
              that.breedTypeRelationList[this.actionindex].infomationList = infomationList;
            }
            
          }
        }
        that.selectRow1 = [];
      }else{
        that.$Message.warning("请选择信息分类");
        return;
      }
      that.showselectInfoModal = false;
    },
    //点击选择信息单元确认按钮
    doEdit3(){
      let that = this;
        if (that.selectRow3 && that.selectRow3.length > 0 ) {
          for (let i = 0; i < that.selectRow3.length; i++) {
            let breedObj = {};
            breedObj.informationUnitId = that.selectRow3[i].informationUnitId;
            breedObj.informationUnitName = that.selectRow3[i].informationUnitName;
            let infomationUnitList=[];
            if (that.isRepeatInfomationUnit(that.selectRow3[i].informationUnitId)) {
            if(that.breedTypeRelationList[this.actionindex].infomationList[this.infomationindex].infomationUnitList){
              that.breedTypeRelationList[this.actionindex].infomationList[this.infomationindex].infomationUnitList.push(breedObj);
            }else{
              infomationUnitList.push(breedObj);
              that.breedTypeRelationList[this.actionindex].infomationList[this.infomationindex].infomationUnitList = infomationUnitList;
            }
          }
        }
        that.selectRow3 = [];
      }else{
        that.$Message.warning("请选择信息单元");
        return;
      }
      that.showselectUnitModal = false;
    },
    //判断品种是否重复
    isRepeatBreed(value) {
      if (this.breedTypeRelationList.length > 0) {
        let breedArr = [];
        for (let j = 0; j < this.breedTypeRelationList.length; j++) {
          breedArr.push(this.breedTypeRelationList[j].breedId);
        }
        if (breedArr.indexOf(value) == -1) {
          return true;
        }
      } else {
        return true;
      }
    },
    //判断信息分类是否重复
    isRepeatInfomationType(value) {
      let infomationList =  this.breedTypeRelationList[this.actionindex].infomationList
      if (infomationList) {
        let breedArr = [];
        for (let j = 0; j < infomationList.length; j++) {
          breedArr.push(infomationList[j].informationTypeId);
        }
        if (breedArr.indexOf(value) == -1) {
          return true;
        }
      } else {
        return true;
      }
    },
    //判断信息单元是否重复
    isRepeatInfomationUnit(value) {
      let infomationUnitList =  this.breedTypeRelationList[this.actionindex].infomationList[this.infomationindex].infomationUnitList;
      if (infomationUnitList) {
        let breedArr = [];
        for (let j = 0; j < infomationUnitList.length; j++) {
          breedArr.push(infomationUnitList[j].informationUnitId);
        }
        if (breedArr.indexOf(value) == -1) {
          return true;
        }
      } else {
        return true;
      }
    },
    
    //点击品种类别搜索
    handleSubmit() {
      this.pageNum = 1;
      this.pageSize = 5;
      this.getBreedList();
    },
    //点击信息分类搜索
    handleSubmit1() {
      this.pageNum1 = 1;
      this.pageSize1 = 5;
      this.getInfoList();
    },
    //信息单元搜索
    handleSubmit3() {
      this.pageNum3 = 1;
      this.pageSize3 = 5;
      this.getUnitList();
    },
    //重置品种搜索
    handleReset() {
      this.selectform.breedName = "";
    },
    //重置信息分类搜索
    handleReset1() {
      this.selectform1.informationTypeCode = "";
      this.selectform1.informationTypeName = "";
    },
    //重置信息单元
    handleReset3() {
      this.selectform3.informationUnitCode = "",
      this.selectform3.informationUnitName = ""
    },
    
   //点击取消品种按钮
    cancel(type) {
      if(type==0){
        this.showselectModal = false;
      }
      if(type==1){
        this.showselectInfoModal = false;
      }
      if(type==2){
        this.showselectUnitModal = false;
      }
    },
    
    doCancel() {
      this.$router.push({
          name: "apiUserManagement"
      });
    },
    //选择关联品种
    showselect() {
      this.selectform.breedName = ""; 
      this.showselectModal = true;
      this.pageNum = 1;
      this.pageSize = 5;
      this.getBreedList();
    },
    //选择信息分类
    showInfoselect(index){
        this.actionindex = index;
        this.selectform1.informationTypeCode = "";
        this.selectform1.informationTypeName = "";
        this.showselectInfoModal = true;
        this.pageNum1 = 1;
        this.pageSize1 = 5;
        this.getInfoList();
    },
    //选择信息单元
    showUnitselect(index,itemindex){
      this.infomationindex = itemindex;
      this.actionindex = index;
      this.selectform3.informationUnitCode = "";
      this.selectform3.informationUnitName = "";
      this.showselectUnitModal = true;
      this.pageNum3 = 1;
      this.pageSize3 = 5;
      this.getUnitList();
    },
    //信息单元数据列表
    getUnitList() {
      var that = this;
      this.selectform3.pageSize = this.pageSize;
      this.selectform3.pageNum = this.pageNum;
      let params = {       
        breedId: this.breedTypeRelationList[this.actionindex].breedId,
        informationTypeId: this.breedTypeRelationList[this.actionindex].infomationList[this.infomationindex].informationTypeId,
        informationUnitCode: this.selectform3.informationUnitCode,
        informationUnitName: this.selectform3.informationUnitName,
        pageNum: this.pageNum3,
        pageSize: this.pageSize3
      }
      queryPageInformationUnit(params).then(res => {
        if(res.response.list){
          that.dataUnitInfo = res.response.list;
          that.total = res.response.total;
        }else{
          that.dataUnitInfo = [];
          that.total = 0;
        }
          
      });
    },
    // 监听品种名称选中项发生变化
    handleRowChange(row) {
      this.selectRow = row;
    },
    // 监听信息分类选中项发生变化
    handleRowChange1(row) {
      this.selectRow1 = row;
    },
    // 监听信息单元选中项发生变化
    handleRowChange3(row) {
      this.selectRow3 = row;
    },
    //删除品种
    deleteBreed(index){
      this.breedTypeRelationList.splice(index,1);
      this.$forceUpdate();
    },
    //删除信息分类
    deleteInformationType(index,itemindex){
      this.breedTypeRelationList[index].infomationList.splice(itemindex,1);
      this.$forceUpdate();
    },
    //删除信息单元
    removeselect(index, itemindex,unitIndex) {
      this.breedTypeRelationList[index].infomationList[itemindex].infomationUnitList.splice(unitIndex,1);
      this.$forceUpdate();
    },
    //品种名称模糊搜索
    breedNameFunction(breedName) {
      if (breedName) {
        if (this.isRepeatBreed(breedName.value)) {
          let breedObj = {};
          breedObj.breedId = breedName.value;
          breedObj.breedName = breedName.label;
          this.breedTypeRelationList.push(breedObj);
        }
      }
    },
     //获取信息分类数据
    getInfoList() {
      var that = this;
      axios({
        url: "/openapi/common/queryPageInformationTypes",
        method: "post",
        data: {
          pageNum: that.pageNum1,
          pageSize: that.pageSize1,
          informationTypeCode: that.selectform1.informationTypeCode,
          informationTypeName: that.selectform1.informationTypeName
        }
      }).then(function(resp) {
        if (resp.data.status == 200) {
          if(resp.data.response.list){
            that.dataTableInfo = resp.data.response.list;
            that.total = resp.data.response.total;
          }
          else {
          that.dataTableInfo = [];
          that.total = 0;
        }
        } 
      });
    },
    //获取关联品种数据
    getBreedList() {
      var that = this;
      axios({
        url: "/openapi/common/queryPageBreedName",
        method: "post",
        data: {
          pageNum: that.pageNum,
          pageSize: that.pageSize,
          breedName: that.selectform.breedName
        }
      }).then(function(resp) {
        if (resp.data.status == 200) {
          that.dataTable = resp.data.response.list;
          that.total = resp.data.response.total;
        } else {
          that.dataTable = [];
        }
      });
    },
    //点击保存资讯配置
   doConfirmAddBreed(){
    let that = this;
    let informationConfigSaveListVO = [];
    if(this.breedTypeRelationList && this.breedTypeRelationList.length>0){
      for(let i = 0; i < this.breedTypeRelationList.length; i++){
        if(that.breedTypeRelationList[i].infomationList && that.breedTypeRelationList[i].infomationList.length>0){
          for(let j = 0; j< that.breedTypeRelationList[i].infomationList.length; j++){
            if(that.breedTypeRelationList[i].infomationList[j].infomationUnitList && that.breedTypeRelationList[i].infomationList[j].infomationUnitList.length>0){
              for(let m = 0; m< that.breedTypeRelationList[i].infomationList[j].infomationUnitList.length; m++){
              let obj={};
              obj.infomationTypeId = that.breedTypeRelationList[i].infomationList[j].informationTypeId;
              obj.userId = this.userId;
              obj.breedId = that.breedTypeRelationList[i].breedId;
              obj.informationUnitId = that.breedTypeRelationList[i].infomationList[j].infomationUnitList[m].informationUnitId;
              informationConfigSaveListVO.push(obj);
              }
            }else{
              that.$Message.warning("请选择信息分类下面的信息单元");
              return;
            }
          } 
        }else{
          
          that.$Message.warning("请选择品种下面的信息分类");
          return;
        } 
      }
      }else{
        let obj={};
        obj.infomationTypeId = 0;
        obj.userId = this.userId;
        obj.breedId = 0;
        obj.informationUnitId = 0;
        informationConfigSaveListVO.push(obj);
      }
    let params = {
      informationConfigSaveListVO:informationConfigSaveListVO
    }
     saveInformationConfig(params).then(res => {
        if(res.status==200){
          that.$Message.success("保存成功");
          that.$router.push({
            name: "apiUserManagement"
          });
        }
      });
   },
    
    //清空所有品种
    deleteAllBreed(){
      this.breedTypeRelationList = [];
      this.infomationList = [];
    },
    //导出
    exportBtnOpen(){
      window.location.href='https://mgt.oilchem.net/openapi/news/export?userId='+this.userId
    }
  }
};
</script>
