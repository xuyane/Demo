<style lang="less" scoped>
@import './listOfRelatedTopic.less';
.form-select-status{
  height:auto !important;
}
.ownChannel-select {
  .ivu-select-selection{
    height:auto !important;
  }
}
.changeOneData {
  .ivu-select-selection{
    height:auto !important;
  }
}

</style>

<template>
  <Row>
    <Col span="24">
      <Row class-name="current-position">
          当前位置：
           <router-link to="/plantIndex" class="link-css">专题管理</router-link>
          &nbsp;&nbsp;>>&nbsp;&nbsp;
          <router-link to="/topicList" class="link-css">专题列表</router-link>
          &nbsp;&nbsp;>>&nbsp;&nbsp;
           <a @click="backPre" class="link-css">专栏列表</a>
          &nbsp;&nbsp;>>&nbsp;&nbsp;
          
             <a @click="goto" class="link-css">文章列表</a>
      </Row>
      <Row>
        <!-- 信息单元开始 -->
        <div class="unit" style="padding-top:20px;padding-bottom:20px">
            <div class="unit_content">
                <div class="unit_content_left">
                    <div class="unit_s_left" style="width:14%">所属专题</div>
                    <div class="unit_s_right" style="width:86%;line-height: 27px;margin-top: 13px;text-align:center">{{topicName}}</div>
                </div>
                <div class="unit_content_left no_line">
                    <div class="unit_s_left" style="width:14%">所属专栏</div>
                    <div class="unit_s_right" style="width:86%;line-height: 27px;margin-top: 13px;text-align:center">{{columnName}}</div>
                </div>
            </div>
        </div>
         <!-- 信息单元结束 -->
      </Row>
                  <!-- 查询条件开始 -->
      <Col span="24" class-name="search-form" style="padding-bottom:20px;">
      <Form :label-width="100" ref="searchForm">
            <Row type="flex" justify="space-between">
                <Col span="7">
                <FormItem label="文章ID:">
                    <Input v-model="articleId" class="search-input" placeholder="请输入文章ID" @on-keyup="keyUp"></Input>
                </FormItem>
                </Col>
                <Col span="7">
                </Col>
                <Col span="7" class="text-right">
                <Button type="primary" @click="clickGetListPage">查询</Button>
                <Button style="margin-left: 8px" @click="clear">重置</Button>
                </Col>
            </Row>
        </Form>
      </Col>
      <!-- 查询条件结束 -->
      <!-- 列表开始 -->
      <Col span="24">
      <Row class-name="table-con">
          <div class="btn-container">
              <Button type="primary" class="search-btn" @click="deleteTopic">移除文章</Button>
              <Button type="primary" class="search-btn" @click="addSpecial">添加文章</Button>
          </div>
          <Table class="tableCommon" :data="tableData" :columns="columns" ref="dragTable" :stripe="true" :border="true" @on-selection-change="tableDataChange">
          </Table>
          <oil-page :total="total_one" :page-num="pageNum_one" :page-size="pageSize_one" @page-change="pageChange_one" :page-size-opts="pageSizeOpts_one" :show-sizer="showSizer_one">
          </oil-page>
      </Row>
      </Col>
      <!-- 列表结束 -->
    </Col>
    <!-- 添加专题开始 -->
    <Modal v-model="AssoInforClass" title="添加文章" width="1100">
      <Form :label-width="100" ref="addSearchForm" class="changeOneData" :rules="addRules">
            <Row type="flex" justify="space-between">
                <Col span="7">
                <FormItem label="文章标题:">
                    <Input v-model="title" class="search-input" placeholder="请输入文章标题"></Input>
                </FormItem>
                </Col>
                <Col span="7">
                <FormItem label="文章ID:">
                    <Input v-model="articleIds" class="search-input" placeholder="请输入文章ID" prop="articleIds" @on-keyup="keyUpArt"></Input>
                </FormItem>
                </Col>
                <Col span="7">
                <FormItem label="所属频道:" class="ownChannel-select">
                    <!-- <Select v-model="ownChannel" class="form-select" multiple>
                        <Option v-for="item in ownChannelList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select> -->
                    <Input v-model="ownChannel" class="search-input" readonly @on-focus="getBreedData()" placeholder="请选择所属频道"></Input>
                </FormItem>
                </Col>

            </Row>
            <Row type="flex" justify="space-between">
                <Col span="7">
                <FormItem label="创建时间:">
                    <DatePicker v-model="creationTime" type="daterange" format="yyyy-MM-dd" placeholder="请输入创建时间" style="width:100%" class="search-input"></DatePicker>
                </FormItem>
                </Col>
                <Col span="7">
                
                </Col>
                <Col span="7" class="text-right">
                <Button type="primary" @click="clickGetListPageArt">查询</Button>
                <Button style="margin-left: 8px" @click="clearPage">重置</Button>
                </Col>
            </Row>
        </Form>
      <Row class-name="table-con" style="padding-left:0px;padding-right:0px">
          <Table class="tableCommon"
          :data="tableData_info"
          :columns="columns_info"
          :stripe="true"
          :border="true"
           @on-selection-change="tableSelect"
            >
          </Table>
      </Row>
      <Row>
        <oil-page :total="total" :page-num="pageNum" :page-size="pageSize" @page-change="pageChange" :page-size-opts="pageSizeOpts" :show-sizer="showSizer"></oil-page>
      </Row>
      <div slot="footer">
          <i-button type="primary"  @click="assoInforClassSubmit">保存</i-button>
          <i-button type="primary" @click="articleClear">取消</i-button>
      </div>
    </Modal>
<!-- 添加专题结束 -->
<Modal
      v-model="breedModel"
      title="频道"
      @on-cancel="cancel">
      <div style="max-height: 300px;overflow: auto;">
        <Tree  ref="infoRef" :data="infoDataTree" :load-data="loadInfoData" show-checkbox @on-check-change='selectbm'></Tree>
      </div>
      <div slot="footer">
        <Button type="primary" @click="ok">确定</Button>
        <Button @click="cancel">取消</Button>
      </div>
    </Modal>
  </Row>
</template>
<script>
import axios from "axios";
import OilPage from "../components/page/page.vue";
import { listPage,queryWebsite,queryChannel ,statusDisable,listPageOne,info,columnBaseInfo,columnArticleList,columnArticleDelete,ArticlePageList,ArticlePageSave} from "./api/thematicManagement.js";
import { formData ,formatStamp, formatTime } from "../../assets/js/common.js";
export default {
  components: {
    OilPage
  },
  data(){
    const validatelineNum = (rule,value,callback) =>{
      let reg = /^[1-9]\d*$/
      if (value) {
        if(!reg.test(value)){
          // callback(new Error("请正确的格式信息行数为正整数"));
          this.$Message.warning("文章id正整数为正整数");
        }else{
          callback();
        }
      }
    }
    return{
      addRules:{
        articleIds: [
          {
            required: true,
            validator: validatelineNum,
            trigger: "change"
          }
        ],
      },
      hadselectbm:[],
      infoDataTree:[],
      breedModel:false,
      title:'',
      articleIds:null,
      articleId:'',
      affiliatedSite:'',
      ownChannel:'',
      creationTime:[],
      ownChannelList:[],
      affiliatedSiteList:[],
      AssoInforClass:false,
      // 分页参数开始
      total: 0,
      pageSize: 10,
      pageNum: 1,
      showSizer: true,
      pageSizeOpts: [5, 10, 20, 30],
      // 分页参数结束
      total_one: 0,
      pageSize_one: 10,
      pageNum_one: 1,
      showSizer_one: true,
      pageSizeOpts_one: [5, 10, 20, 30],

      topicName:'',
      columnName:'',
      id:'',
      tableData:[],
      columns:[
        {
          type: 'selection',
          minWidth: 60,
          align: 'center'
        },
        {
          key: "id",
          align: "center",
          minWidth: 80,
          title: "文章ID"
        },
        {
          key: "title",
          align: "center",
          minWidth: 600,
          title: "文章标题"
        },
        {
          key: "channelName",
          align: "center",
          minWidth: 100,
          title: "所属频道"
        },
        {
          key: "publishTime",
          align: "center",
          minWidth: 100,
          title: "发布时间",
          render:(h,data)=>{
            console.log('data',data)
            return h('div',data.row.publishTime == 0 ? '' : formatTime(data.row.publishTime))
          }
        },
        {
          key: "department",
          align: "center",
          minWidth: 200,
          title: "操作",
          render:(h,data) => {
            return h('div',[
              h('a',{
                on:{
                  click:()=>{
                    this.deleteEdit(data);
                  }
                }
              },'移除')
            ])
          }
        }
      ],
      tableData_info:[],
      columns_info:[
        {
            type: 'selection',
            minWidth: 60,
            align: 'center'
        },
        {
          key: "id",
          align: "center",
          minWidth: 100,
          title: "文章ID"
        },
        {
          key: "title",
          align: "center",
          minWidth: 500,
          title: "文章标题"
        },
        {
          key: "channelName",
          align: "center",
          minWidth: 160,
          title: "所属频道"
        },
        {
          key: "publishTime",
          align: "center",
          minWidth: 160,
          title: "发布时间",
          render:(h,data)=>{
            return h('div',data.row.publishTime == 0 ? '' : formatTime(data.row.publishTime))
          }
        }
      ],
      topic:{
        tableDataDataSelect:[],
        topicId:[]
      }
    }
  },
  created(){
    this.defaultField();
    this.queryChannelList();
    // this.getListPage();
    this.getListPageOne();
  },
  methods:{
     goto() {
      window.reload();
    },
     backPre(){
       this.$router.push({
          name: "columnList",
          query: {
            id: this.$route.query.topic
          }
        });
    },
    keyUp(){
      this.articleId = this.articleId.replace(/[^\d]/g,'')
    },
    keyUpArt(){
      this.articleIds = this.articleIds.replace(/[^\d]/g,'')
    },
    loadInfoData(item, callback){
      console.log('item',item);
       // this.infoId = item.id
      let form = {
        channelId:item.id,
        siteId: ''
      }
      queryChannel(form).then(res => {
        let infoDataTree = res.response.map(item => {
          if(item.isLeaf == 0){
            return {
              id: item.channelId,
              title: item.channelName,
              loading: false,
              children: []
            }
          }else{
            return {
              id: item.channelId,
              title: item.channelName
            }
          }
        })
        callback(infoDataTree)
      })
    },
    selectbm(data){
      console.log(1666,data);
      this.hadselectbm = data;
    },
    ok(){
      if(this.hadselectbm.length != 0){
         var namelist = this.hadselectbm.map(item => {
          return item.title;
        });
        this.ownChannelIdList = this.hadselectbm.map(item => {
          return item.id;
        });
        this.ownChannel = namelist.join(",");
        this.breedModel = false;
      }else{
        this.ownChannelIdList = [];
        this.ownChannel = '';
        this.$Message.warning("请选择频道");
        this.breedModel = true;
      }
      console.log('ownChannelIdList',this.ownChannelIdList);
    },
    cancel(){
      this.breedModel = false ;
    },
    getBreedData(){
      this.getInfoData();
      this.breedModel = true;
    },
    getInfoData(){
      let params = {
        channelId:'',
        siteId: ''
      }
      console.log(params);
      queryChannel(params).then(res => {
        this.infoDataTree = res.response.map(item => {
          if(item.isLeaf == 0){
            return {
              id: item.channelId,
              title: item.channelName,
              loading: false,
              children: []
            }
          }else{
            return {
              id: item.channelId,
              title: item.channelName
            }
          }
        })
      });
    },
    tableSelect(data){
      this.topic.topicId = [];
      let that = this;
      if(data.length > 0){
        data.map(item => {
          console.log(item);
          that.topic.topicId.push(item.id)
        })
      }
      console.log(222,that.topic.topicId)
    },
    assoInforClassSubmit(){
      console.log(this.topic.topicId);
      if( this.topic.topicId.length == 0){
        this.$Message.warning("请勾选数据");
        return false;
      }
      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        articleIdList:this.topic.topicId,
        columnId:this.$route.query.columnId
      }
      ArticlePageSave(params).then(res => {
          this.$Message.success('添加成功');
          this.AssoInforClass = false;
          this.getListPageOne();
          this.getListPage();
      })
    },
    deleteTopic(){
      let that = this ;
      if( that.topic.tableDataDataSelect.length == 0){
        that.$Message.warning("请勾选数据");
        return false;
      }
      var config = {
        title: "提示信息",
        content: "您确定删除所选项吗？",
        onOk: () => {
          let params = {
             pageNum: that.pageNum_one,
             pageSize: that.pageSize_one,
             articleIdList:that.topic.tableDataDataSelect,
             columnId:Number(that.$route.query.columnId)
          }
          columnArticleDelete(formData(params)).then(res => {
            that.$Message.success("删除所选项成功");
            that.topic.tableDataDataSelect = [];
            // that.getListPage();
            that.getListPageOne();
          });
        },
        onCancel: () => {}
      };
      that.$Modal.confirm(config);
    },
    deleteEdit(data){
      let that = this ;
      let array = [];
      array.push(data.row.id)
      var config = {
        title: "提示信息",
        content: "您确定删除此选项吗？",
        onOk: () => {
          let params = {
             pageNum: that.pageNum_one,
             pageSize: that.pageSize_one,
             articleIdList:array,
             columnId:Number(that.$route.query.columnId)
          }
          columnArticleDelete(formData(params)).then(res => {
            that.$Message.success("删除所选项成功");
            that.getListPage();
            that.getListPageOne();
          });
        },
        onCancel: () => {}
      };
      that.$Modal.confirm(config);
    },
    tableDataChange(data){
      let that = this ;
      that.topic.tableDataDataSelect = [];
      if( data.length >0){
        data.map(item => {
          that.topic.tableDataDataSelect.push(item.id)
        })
      }
    },
    addSpecial(){
      this.AssoInforClass = true;
      this.title = '';
      this.articleIds = null;
      this.ownChannel = '';
      this.creationTime = [];
      this.hadselectbm = [];
      this.ownChannelIdList = [];
      this.tableData_info = [];
      this.topic.topicId = [];
      this.getListPage();
    },
    defaultField(){
      let paramsOne = {
        id:this.$route.query.topic
      }
      info(paramsOne).then(res => {
        this.topicName = res.response.topicName;
      })
      let paramsTwo = {
        id:this.$route.query.columnId
      }
      columnBaseInfo(paramsTwo).then(res => {
        this.columnName = res.response.columnName;
      })
    },
    edit(data){
      this.$router.push({
          name: "editTopic",
          query: { 
              id: data.row.id
          }
      });
    },
    see(data){
      this.$router.push({
          name: "seeTopic",
          query: { 
              id: data.row.id
          }
      });
    },
    siteListChange(data){
      // console.log('站点',data,this.ownChannel);
      // this.ownChannel = '';
      // this.affiliatedSite = data;
      // this.queryChannelList();
    },
    enabledDisable(id,status){
      let _this = this;
      let statusValue = 0;
      let statusChinaValue
      if(status == '启用'){
        statusValue = 0;
        statusChinaValue = '禁用';
      }
      if(status == '禁用'){
        statusValue = 1;
        statusChinaValue = '启用';
      }
      var config = {
        title: "提示信息",
        content: "您确定"+statusChinaValue+"吗？",
        onOk: () => {
          let params = {
              id:id,
              status:statusValue
          }
          statusDisable(params).then(res => {
            _this.$Message.success(""+statusChinaValue+"成功");
            _this.getListPage();
          });
        },
        onCancel: () => {}
      };
      this.$Modal.confirm(config);
    },
    queryWebsiteList(){
      console.log('dataa',this.$route.query.data)
      queryWebsite().then(res => {
        const list1 = res.response.map(item => {
          return {
            value: item.siteId,
            label: item.siteName
          };
        });
        this.affiliatedSiteList = list1;
      });
    },
    queryChannelList(){
      let params = {
        channelId:'',
        siteId:''
      }
      queryChannel(params).then(res => {
        console.log('频道',res);
        const list1 = res.response.map(item => {
          return {
            value: item.channelId,
            label: item.channelName
          };
        });
        this.ownChannelList = list1;
      });
    },
    clickGetListPage(){
      this.pageNum_one =1;
      this.getListPageOne();
    },
    clickGetListPageArt(){
      this.pageNum = 1;
      this.getListPage();
    },
    getListPageOne(){
      let artId = '';
       artId = this.articleId;
      // if(this.articleId){
      //   artId = this.articleId.replace(/[^\d]/g,'');
      // }else{
      //   artId = this.articleId ;
      // }
      this.$Spin.show();
      let params = {
        pageNum: this.pageNum_one,
        pageSize: this.pageSize_one,
        // articleId:this.articleId,
        articleId:artId == '' ? null :artId ,
        columnId:Number(this.$route.query.columnId)
      }
      columnArticleList(params).then(res => {
        if(res.response.list){
          this.$Spin.hide();
          this.tableData = res.response.list;
          this.total_one = res.response.total;
        }else{
          this.$Spin.hide();
          this.tableData = [];
          this.total_one = res.response.total;
        }
      })
    },
    getListPage(){
      let valTitle = '';
      let valNum = '';
      console.log('this.title',this.title);
      if(this.title == '%'){
         valTitle = '.';
      }else if(this.title){
         valTitle = this.title.replace(/%/g, "");
      }else{
         valTitle = this.title;
      }
      // if(this.articleIds){
      //   valNum= this.articleIds.replace(/[^\d]/g,'');
      // }else{
      //   valNum = this.articleIds
      // }
      this.$Spin.show();
      let arrayOne = [];
      let arrayTwo = [];
      if(this.articleIds){
        arrayOne.push(Number(this.articleIds));
        // arrayOne.push(Number(valNum));
      }
      let start = formatStamp(this.creationTime[1]) + 86399000;
      let end = formatStamp(this.creationTime[0]);
      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        publishEndTime:start || '',
        publishStartTime:end || '',
        title:valTitle,
        articleIds:arrayOne,
        // channelIds:this.ownChannel
        channelIds:this.ownChannelIdList
      }
      ArticlePageList(params).then(res => {
        console.log(res);
        if(res.response.list){
          this.$Spin.hide();
          this.tableData_info = res.response.list;
          this.total = res.response.total;
        }else{
          this.$Spin.hide();
          this.tableData_info = [];
          this.total = res.response.total;
        }
        
      })
    },
    pageChange(page, pageSize) {
      if (page) {
        this.pageNum = page;
      }
      if (pageSize) {
        this.pageSize = pageSize;
      }
      this.getListPage();
    },
    pageChange_one(page, pageSize) {
      if (page) {
        this.pageNum_one = page;
      }
      if (pageSize) {
        this.pageSize_one = pageSize;
      }
      this.getListPageOne();
    },
    clear(){
      this.articleId = '';
    },
    articleClear(){
      this.AssoInforClass = false;
      this.title = '';
      this.articleIds = null;
      this.ownChannel = '';
      this.creationTime = [];
      this.ownChannelIdList = [];
    },
    clearPage(){
      this.title = '';
      this.articleIds = null;
      this.ownChannel = '';
      this.creationTime = [];
      this.hadselectbm = [];
      this.ownChannelIdList = [];
    }
  }
}
</script>

