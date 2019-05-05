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
      <a @click="goto" class="link-css">专栏列表</a>
      
      
    </Row>
    <Row>
      <!-- 信息单元开始 -->
      <div class="unit" style="padding-top:20px;padding-bottom:20px">
        <div class="unit_content">
          <div class="unit_content_left">
            <div class="unit_s_left" style="width:14%">所属专题</div>
            <div class="unit_s_right" style="width:86%;line-height: 27px;margin-top: 13px;text-align:center">{{subject}}</div>
          </div>
          <div class="unit_content_left no_line">
            <div class="unit_s_left" style="width:14%">专题地址</div>
            <div class="unit_s_right" style="width:86%;line-height: 27px;margin-top: 13px;text-align:center">{{specialAddress}}</div>
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
        <FormItem label="专栏名称:">
          <Input v-model="columnName" class="search-input" placeholder="请输入专题名称"></Input>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="创建时间:">
          <DatePicker v-model="creationTime" type="daterange" format="yyyy-MM-dd" placeholder="请输入创建时间" style="width:100%" class="search-input"></DatePicker>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="专题状态:">
          <Select v-model="thematicStatus" class="form-select form-select-status">
            <Option v-for="item in thematicStatusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        </Col>

      </Row>
      <Row type="flex" justify="space-between">
        <Col span="7">
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
        <Button type="primary" class="search-btn" @click="createdColumn">创建专栏</Button>
        <Button type="primary" class="search-btn" @click="returnSpecial">返回专题</Button>
      </div>
      <Table class="tableCommon" :data="tableData" :columns="columns" ref="dragTable" :stripe="true" :border="true">
      </Table>
      <oil-page :total="total" :page-num="pageNum" :page-size="pageSize" @page-change="pageChange" :page-size-opts="pageSizeOpts"
        :show-sizer="showSizer">
      </oil-page>
    </Row>
    </Col>
    <!-- 列表结束 -->
    </Col>
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
  columnBaseList,
  columnBaseStatus,
  columnBaseSave
} from "./api/thematicManagement.js";
import { formData, formatStamp, formatTime } from "../../assets/js/common.js";
export default {
  components: {
    OilPage
  },
  data() {
    return {
      columnName: "",
      thematicStatus: "",
      thematicStatusList: [
        {
          value: "",
          label: "全部状态"
        },
        {
          value: 0,
          label: "启用"
        },
        {
          value: 1,
          label: "禁用"
        }
      ],
      topicName: "",
      affiliatedSite: "",
      ownChannel: "",
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
      subject: "",
      specialAddress: "",
      id: "",
      tableData: [],
      columns: [
        {
          key: "id",
          align: "center",
          minWidth: 50,
          title: "专栏ID"
        },
        {
          key: "columnName",
          align: "center",
          minWidth: 320,
          title: "专栏名称"
        },
        {
          key: "lineNum",
          align: "center",
          minWidth: 100,
          title: "信息行数"
        },
        {
          key: "createTime",
          align: "center",
          minWidth: 100,
          title: "创建时间",
          render: (h, data) => {
            console.log("data", data);
            return h("div", formatTime(data.row.createTime));
          }
        },
        {
          key: "status",
          align: "center",
          minWidth: 70,
          title: "状态",
          render: (h, data) => {
            let color = "";
            if (data.row.status == "禁用") {
              color = "#f52a1b";
            }
            if (data.row.status == "启用") {
              color = "#6c9b0c";
            }
            return h("div", { style: { color } }, data.row.status);
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
                      this.edit(data);
                    }
                  }
                },
                "修改"
              ),
              h(
                "a",
                {
                  style: {
                    paddingLeft: "10px"
                  },
                  on: {
                    click: () => {
                      this.enabledDisable(data.row.id, data.row.status);
                    }
                  }
                },
                data.row.status == "禁用" ? "启用" : "禁用"
              ),
              h(
                "a",
                {
                  style: {
                    paddingLeft: "10px"
                  },
                  on: {
                    click: () => {
                      this.chakan(data);
                    }
                  }
                },
                "查看"
              ),
              h(
                "a",
                {
                  style: {
                    paddingLeft: "10px"
                  },
                  on: {
                    click: () => {
                      this.articleList(data);
                    }
                  }
                },
                "文章列表"
              )
            ]);
          }
        }
      ]
    };
  },
  created() {
    this.defaultField();
    this.getListPage();
  },
  methods: {
    goto() {
      window.reload();
    },
    chakan(data) {
      this.$router.push({
        name: "seeColumn",
        query: {
          id: data.row.id,
          topic: Number(this.$route.query.id)
        }
      });
    },
    articleList(data) {
      this.$router.push({
        name: "articleTopic",
        query: {
          topic: Number(this.$route.query.id),
          columnId: data.row.id
        }
      });
    },
    createdColumn() {
      this.$router.push({
        name: "createColumn",
        query: {
          id: Number(this.$route.query.id)
        }
      });
    },
    returnSpecial() {
      this.$router.push({
        name: "topicList"
      });
    },
    addSpecial() {
      this.AssoInforClass = true;
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
    edit(data) {
      this.$router.push({
        name: "editColumn",
        query: {
          topicid: this.$route.query.id,
          id: data.row.id
        }
      });
    },
    see(data) {
      this.$router.push({
        name: "seeColumn",
        query: {
          id: data.row.id
        }
      });
    },
    siteListChange(data) {
      this.ownChannel = "";
      this.affiliatedSite = data;
      this.queryChannelList();
    },
    enabledDisable(id, status) {
      let _this = this;
      let statusValue = 0;
      let statusChinaValue = "";
      if (status == "启用") {
        statusValue = 1;
        statusChinaValue = "禁用";
      }
      if (status == "禁用") {
        statusValue = 0;
        statusChinaValue = "启用";
      }
      var config = {
        title: "提示信息",
        content: "您确定" + statusChinaValue + "吗？",
        onOk: () => {
          let params = {
            id: id,
            status: statusValue
          };
          columnBaseStatus(params).then(res => {
            _this.$Message.success("" + statusChinaValue + "成功");
            _this.getListPage();
          });
        },
        onCancel: () => {}
      };
      this.$Modal.confirm(config);
    },
    queryWebsiteList() {
      console.log("dataa", this.$route.query.data);
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
        channelId: this.ownChannel,
        siteId: this.affiliatedSite
      };
      queryChannel(params).then(res => {
        console.log("频道", res);
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
    getListPage() {
      let start = formatStamp(this.creationTime[1]) + 86399000;
      let end = formatStamp(this.creationTime[0]);
      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        createTimeE: start || "",
        createTimeS: end || "",
        status: this.thematicStatus,
        columnName: this.columnName,
        topicId: Number(this.$route.query.id)
      };
      columnBaseList(params).then(res => {
        console.log(res);
        if (res.response.list) {
          this.tableData = res.response.list;
          this.total = res.response.total;
        } else {
          this.tableData = [];
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
    clear() {
      // this.$refs.searchForm.resetFields();
      this.columnName = "";
      this.creationTime = [];
      this.thematicStatus = "";
    }
  }
};
</script>