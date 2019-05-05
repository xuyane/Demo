<style lang="less" scoped>
.addCreateTopicWidth{
  width:600px;
}
</style>

<template>
  <Row>
    <Col span="24">
      <Row class-name="current-position">
          当前位置：专题管理&nbsp;&nbsp;>>&nbsp;&nbsp;创建专题
      </Row>
      <Col span="24" class-name="search-form">
      <Form ref="addCreateTopicRef" :model="addCreateTopic" :rules="addRules" :label-width="170" style="padding-bottom:80px">
        <Row>
          <Col span="24">
            <FormItem label="所属站点:" prop="websiteId" class="addCreateTopicWidth">
              <Select class="search-input" v-model="addCreateTopic.websiteId" @on-change="siteListChange">
                  <Option v-for="item in affiliatedSiteList" :value="item.value" :key="item.value">{{item.label}}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="24" >
            <FormItem label="所属频道:" prop="channelId" class="addCreateTopicWidth"  >
              <Select class="search-input" v-model="addCreateTopic.channelId" @on-open-change="channelIdChange">
                  <Option v-for="item in ownChannelList" :value="item.value" :key="item.value">{{item.label}}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="24">
            <FormItem label="专题名称:" prop="topicName" class="addCreateTopicWidth">
              <Input placeholder="请输入专题名称" class="search-input" v-model="addCreateTopic.topicName"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="9" >
            <FormItem label="专题模板:" prop="modelId" class="addCreateTopicWidth">
              <Input placeholder="请输入专题模板" class="search-input" v-model="addCreateTopic.modelId" disabled></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <Button type="primary" class="search-btn" style="margin-top:3px" @click="createdTopic">创建专题</Button>
          </Col>
        </Row>
        <Row>
          <Col span="24">
            <FormItem label="发布地址:" prop="publishUrl" class="addCreateTopicWidth">
              <Input placeholder="请输入发布地址" class="search-input" v-model="addCreateTopic.publishUrl"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="24">
            <FormItem label="关键字:" class="addCreateTopicWidth">
              <Input placeholder="请输入关键字" class="search-input" v-model="addCreateTopic.keyWord"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="24">
            <FormItem label="专题描述:" class="addCreateTopicWidth">
              <Input class="search-textarea" v-model="addCreateTopic.note" :maxlength="500" type="textarea" :autosize="{minRows: 5,maxRows: 5}" placeholder="请输入专题描述"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="24">
            <FormItem  class="addCreateTopicWidth">
              <Button type="primary" @click="">确定</Button>
              <Button style="width: 68px; margin-left: 20px" >取消</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
      </Col>
    </Col>

    <!-- 关联模板开始 -->
    <Modal v-model="AssoInforClass" title="模板列表" width="600">
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
      <!-- <Row>
        <oil-page :total="total" :page-num="pageNum" :page-size="pageSize" @page-change="pageChange" :page-size-opts="pageSizeOpts" :show-sizer="showSizer"></oil-page>
      </Row> -->
      <div slot="footer">
          <i-button type="primary">保存</i-button>
          <i-button type="primary" >取消</i-button>
      </div>
    </Modal>
<!-- 关联模板结束 -->

  </Row>
</template>
<script>
import axios from "axios";
import OilPage from "../components/page/page.vue";
import {queryWebsite,queryChannel,queryModel} from "./api/thematicManagement.js";
export default {
  components: {
    OilPage
  },
  data(){
    const validatewebsiteId = (rule, value, callback) => {
      if (value) {
        callback();
      } else {
        callback(new Error("请选择站点"));
      }
    };
    const validatechannelId = (rule,value,callback) =>{
      if (value) {
        callback();
      } else {
        callback(new Error("请选择所属频道"));
      }
    }
    const validatetopicName = (rule,value,callback) =>{
      if(value){
        callback();
      }else{
        callback(new Error('请输入专题名称'));
      }
    }
    return {
      AssoInforClass:false,
      total: 0,
      pageSize: 10,
      pageNum: 1,
      showSizer: true,
      pageSizeOpts: [5, 10, 20, 30],
      tableData_info:[],
      columns_info:[
        {
            type: 'selection',
            minWidth: 60,
            align: 'center'
        },
        {
            title: '模板名称',
            key: '"templateName'
        },
      ],
      affiliatedSiteList:[],
      ownChannelList:[],
      addRules:{
        websiteId: [
          {
            required: true,
            validator: validatewebsiteId,
            message: "请选择站点",
            trigger: "change"
          }
        ],
        channelId: [
          {
            required: true,
            validator: validatechannelId,
            message: "请选择所属频道",
            trigger: "change"
          }
        ],
        topicName: [
          {
            required: true,
            validator: validatetopicName,
            message: "请输入专题名称",
            trigger: "change"
          }
        ],
      },
      addCreateTopic:{
        websiteId:'',
        topicName:'',
        publishUrl:'',
        note:'',
        modelId:'',
        keyWord:'',
        channelId:''
      }
    }
  },
  created(){
    this.queryWebsiteList();
    this.queryModelList();
  },
  methods:{
    handleRowChange(){

    },
    createdTopic(){
      this.AssoInforClass = true ;
    },
    queryModelList(){
      queryModel().then(res => {
        // console.log(res);
        this.tableData_info = res.response;
        // this.total = res.response.total;
      })
    },
    pageChange(page, pageSize) {
      if (page) {
        this.pageNum = page;
      }
      if (pageSize) {
        this.pageSize = pageSize;
      }
      // this.getListPage();
    },
    siteListChange(data){
      this.addCreateTopic.websiteId = data;
      this.addCreateTopic.channelId = ''
      this.queryChannelList();
    },
    channelIdChange(data){
      console.log(data);
      if(this.addCreateTopic.channelId == ''){
        this.$refs.addCreateTopicRef.validateField('websiteId');
      }
    },
    queryWebsiteList(){
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
        channelId:this.addCreateTopic.channelId,
        siteId:this.addCreateTopic.websiteId
      }
      queryChannel(params).then(res => {
        console.log('res',res);
        const list1 = res.response.map(item => {
          return {
            value: item.channelId,
            label: item.channelName
          };
        });
        this.ownChannelList = list1;
      });
    },

  }
}
</script>
