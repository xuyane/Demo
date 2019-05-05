<style lang="less" scoped>
@import "./listOfRelatedTopic.less";
.form-select-status {
  height: auto !important;
}
.ownChannel-select {
  .ivu-select-selection {
    height: auto !important;
  }
}
.searchRe .ivu-select-selection {
  height: auto !important;
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
          <a @click="goto" class="link-css">关联专题列表</a>
          
          
      </Row>
      <Row>
        <!-- 信息单元开始 -->
        <div class="unit" style="padding-top:20px;padding-bottom:20px;">
            <div class="unit_content">
                <div class="unit_content_left">
                    <div class="unit_s_left">所属专题</div>
                    <div class="unit_s_right">{{subject}}</div>
                </div>
                <div class="unit_content_left no_line">
                    <div class="unit_s_left">专题地址</div>
                    <div class="unit_s_right">{{specialAddress}}</div>
                </div>
            </div>
        </div>
         <!-- 信息单元结束 -->
      </Row>
      <!-- 列表开始 -->
      <Col span="24">
      <Row class-name="table-con">
          <div class="btn-container">
              <Button type="primary" class="search-btn" @click="deleteTopic">移除专题</Button>
              <Button type="primary" class="search-btn" @click="addSpecial">添加专题</Button>
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
    <Modal v-model="AssoInforClass" title="添加专题" width="1100">
      <Form :label-width="100" ref="searchForm" class="searchRe">
            <Row type="flex" justify="space-between">
                <Col span="7">
                <FormItem label="专题名称:">
                    <Input v-model="topicName" class="search-input" placeholder="请输入专题名称"></Input>
                </FormItem>
                </Col>
                <Col span="7">
                <FormItem label="所属站点:">
                    <Select v-model="affiliatedSite" class="form-select" @on-change="siteListChange">
                        <Option v-for="item in affiliatedSiteList" :value="item.value" :key="item.value" >{{ item.label }}</Option>
                    </Select>
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
                <Button type="primary" @click="clickGetListPage">查询</Button>
                <Button style="margin-left:8px" @click="clear">重置</Button>
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
          <i-button type="primary" @click="assoInforClassSubmit">保存</i-button>
          <i-button type="primary" @click="quxiao">取消</i-button>
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
import {
  listPage,
  queryWebsite,
  queryChannel,
  statusDisable,
  listPageOne,
  info,
  topicrefDelete,
  topicrefSave
} from "./api/thematicManagement.js";
import { formData, formatStamp, formatTime } from "../../assets/js/common.js";
export default {
  components: {
    OilPage
  },
  data() {
    return {
      infoDataTree: [],
      hadselectbm: [],
      breedModel: false,
      topicName: "",
      affiliatedSite: "",
      // ownChannel:[],
      ownChannel: "",
      ownChannelIdList: [],
      creationTime: [],
      ownChannelList: [],
      affiliatedSiteList: [],
      AssoInforClass: false,
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

      subject: "",
      specialAddress: "",
      id: "",
      tableData: [],
      columns: [
        {
          type: "selection",
          minWidth: 60,
          align: "center"
        },
        {
          key: "id",
          align: "center",
          minWidth: 60,
          title: "专题ID"
        },
        {
          key: "topicName",
          align: "center",
          minWidth: 320,
          title: "专题名称"
        },
        {
          key: "websiteName",
          align: "center",
          minWidth: 100,
          title: "所属站点"
        },
        {
          key: "channelName",
          align: "center",
          minWidth: 100,
          title: "所属频道"
        },
        {
          key: "createTime",
          align: "center",
          minWidth: 100,
          title: "创建时间",
          render: (h, data) => {
            return h("div", formatTime(data.row.createTime));
          }
        },
        {
          key: "department",
          align: "center",
          minWidth: 200,
          title: "操作",
          render: (h, data) => {
            return h("div", [
              h(
                "a",
                {
                  on: {
                    click: () => {
                      this.deleteEdit(data);
                    }
                  }
                },
                "移除"
              )
            ]);
          }
        }
      ],
      tableData_info: [],
      columns_info: [
        {
          type: "selection",
          minWidth: 60,
          align: "center"
        },
        {
          key: "id",
          align: "center",
          minWidth: 60,
          title: "专题ID"
        },
        {
          key: "topicName",
          align: "center",
          minWidth: 320,
          title: "专题名称"
        },
        {
          key: "websiteName",
          align: "center",
          minWidth: 60,
          title: "所属站点"
        },
        {
          key: "channelName",
          align: "center",
          minWidth: 60,
          title: "创建频道"
        },
        {
          key: "createTime",
          align: "center",
          minWidth: 60,
          title: "创建时间",
          render: (h, data) => {
            return h("div", formatTime(data.row.createTime));
          }
        }
      ],
      topic: {
        topicName: "",
        websiteId: "",
        channelIdList: [],
        createTimeE: "",
        createTimeS: "",
        status: 0,
        topicId: [],
        tableDataDataSelect: []
      }
    };
  },
  created() {
    this.defaultField();
    this.queryWebsiteList();
    this.getListPage();
    this.getListPageOne();
  },
  methods: {
    goto() {
      window.reload();
    },
    ok() {
      this.ownChannel = "";
      this.ownChannelIdList = [];
      if (this.hadselectbm.length != 0) {
        var namelist = this.hadselectbm.map(item => {
          return item.title;
        });
        this.ownChannelIdList = this.hadselectbm.map(item => {
          return item.id;
        });
        this.ownChannel = namelist.join(",");
        this.breedModel = false;
      } else {
        this.ownChannelIdList = [];
        this.ownChannel = "";
        this.$Message.warning("请选择频道");
        this.breedModel = true;
      }
    },
    cancel() {
      this.breedModel = false;
    },
    selectbm(data) {
      this.hadselectbm = data;
    },
    loadInfoData(item, callback) {
      // this.infoId = item.id
      let form = {
        channelId: item.id,
        siteId: this.affiliatedSite || ""
      };
      queryChannel(form).then(res => {
        let infoDataTree = res.response.map(item => {
          if (item.isLeaf == 0) {
            return {
              id: item.channelId,
              title: item.channelName,
              loading: false,
              children: []
            };
          } else {
            return {
              id: item.channelId,
              title: item.channelName
            };
          }
        });
        callback(infoDataTree);
      });
    },
    getInfoData() {
      let params = {
        channelId: "",
        siteId: this.affiliatedSite || ""
      };
      queryChannel(params).then(res => {
        this.infoDataTree = res.response.map(item => {
          if (item.isLeaf == 0) {
            return {
              id: item.channelId,
              title: item.channelName,
              loading: false,
              children: []
            };
          } else {
            return {
              id: item.channelId,
              title: item.channelName
            };
          }
        });
      });
    },
    getBreedData() {
      if (this.affiliatedSite && this.affiliatedSite != "") {
        this.getInfoData();
        this.breedModel = true;
      } else {
        this.$Message.warning("请选择所属站点");
      }
    },
    deleteTopic() {
      let that = this;
      if (that.topic.tableDataDataSelect == 0) {
        that.$Message.warning("请勾选数据");
        return false;
      }
      var config = {
        title: "提示信息",
        content: "您确定删除所选项吗？",
        onOk: () => {
          let params = {
            pageNum: that.pageNum,
            pageSize: that.pageSize,
            refTopicIdList: that.topic.tableDataDataSelect,
            topicId: Number(that.$route.query.id)
          };
          topicrefDelete(formData(params)).then(res => {
            that.$Message.success("删除所选项成功");
            that.topic.tableDataDataSelect = 0;
            that.getListPage();
            that.getListPageOne();
          });
        },
        onCancel: () => {}
      };
      that.$Modal.confirm(config);
    },
    tableDataChange(data) {
      let that = this;
      that.topic.tableDataDataSelect = [];
      if (data.length > 0) {
        data.map(item => {
          that.topic.tableDataDataSelect.push(item.id);
        });
      }
    },
    assoInforClassSubmit() {
      if (this.topic.topicId.length == 0) {
        this.$Message.warning("请勾选数据");
        return false;
      }
      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        refTopicIdList: this.topic.topicId,
        topicId: this.$route.query.id
      };
      topicrefSave(params).then(res => {
        this.$Message.success("添加成功");
        this.AssoInforClass = false;
        this.getListPageOne();
        this.getListPage();
      });
    },
    tableSelectAll(data) {
      // this.topic.topicId = [];
      // let that = this;
      // if(data && data.length >1){
      //   data.map(item => {
      //     that.topic.topicId.push(item.id)
      //   })
      // }
    },
    tableSelect(data) {
      this.topic.topicId = [];
      let that = this;
      if (data.length > 0) {
        data.map(item => {
          that.topic.topicId.push(item.id);
        });
      }
    },
    quxiao() {
      this.AssoInforClass = false;
    },
    addSpecial() {
      this.topicName = "";
      this.affiliatedSite = "";
      this.ownChannel = "";
      this.creationTime = [];
      this.AssoInforClass = true;
      this.ownChannelIdList = [];
      this.topic.topicId = [];
      this.getListPage();
      this.getListPageOne();
    },
    defaultField() {
      let params = {
        id: this.$route.query.id
      };
      info(params).then(res => {
        this.subject = res.response.topicName;
        this.specialAddress = res.response.publishUrl;
      });
    },
    deleteEdit(data) {
      let that = this;
      let array = [];
      array.push(data.row.id);
      var config = {
        title: "提示信息",
        content: "您确定删除此选项吗？",
        onOk: () => {
          let params = {
            pageNum: that.pageNum,
            pageSize: that.pageSize,
            refTopicIdList: array,
            topicId: Number(that.$route.query.id)
          };
          topicrefDelete(formData(params)).then(res => {
            that.$Message.success("删除成功");
            that.getListPage();
            that.getListPageOne();
          });
        },
        onCancel: () => {}
      };
      that.$Modal.confirm(config);
    },
    siteListChange(data) {
      console.log("站点", data, this.ownChannel);
      // this.ownChannel = [];
      this.ownChannel = "";
      this.affiliatedSite = data;
      // this.queryChannelList();
    },
    queryWebsiteList() {
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
    queryChannelList() {
      let params = {
        channelId: "",
        siteId: this.affiliatedSite || ""
      };
      queryChannel(params).then(res => {
        const list1 = res.response.map(item => {
          return {
            value: item.channelId,
            label: item.channelName
          };
        });
        this.ownChannelList = list1;
      });
    },
    clickGetListPage() {
      this.pageNum = 1;
      this.getListPage();
    },
    getListPageOne() {
      let params = {
        pageNum: this.pageNum_one,
        pageSize: this.pageSize_one,
        topicId: Number(this.$route.query.id)
      };
      listPageOne(params).then(res => {
        if (res.response.list) {
          this.tableData = res.response.list;
          this.total_one = res.response.total;
        } else {
          this.tableData = [];
          this.total_one = res.response.total;
        }
      });
    },
    getListPage() {
      let start = formatStamp(this.creationTime[1]) + 86399000;
      let end = formatStamp(this.creationTime[0]);
      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        // channelIdList:this.ownChannel,
        channelIdList: this.ownChannelIdList,
        createTimeE: start || "",
        createTimeS: end || "",
        status: 0,
        topicName: this.topicName,
        websiteId: this.affiliatedSite
      };
      listPage(params).then(res => {
        if (res.response.list) {
          this.tableData_info = res.response.list;
          this.total = res.response.total;
        } else {
          this.tableData_info = [];
          this.total = res.response.total;
        }
      });
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
    clear() {
      this.topicName = "";
      this.affiliatedSite = "";
      // this.ownChannel = [];
      this.ownChannel = "";
      this.creationTime = [];
      this.ownChannelIdList = [];
      this.hadselectbm = [];
    }
  }
};
</script>

