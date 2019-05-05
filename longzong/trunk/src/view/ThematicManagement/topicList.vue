<style lang="less">
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
      <!-- 当前位置：专题管理&nbsp;&nbsp;>>&nbsp;&nbsp;专题列表 -->
      当前位置：
      <router-link to="/plantIndex" class="link-css">专题管理</router-link>
      &nbsp;&nbsp;>>&nbsp;&nbsp;
      <router-link to="/topicList" class="link-css">专题列表</router-link>

    </Row>
    <!-- 查询条件开始 -->
    <Col span="24" class-name="search-form">
    <Form :label-width="100" ref="searchForm">
      <Row type="flex" justify="space-between">
        <Col span="7">
        <FormItem label="专题名称:">
          <Input v-model="topicName" class="search-input" placeholder="请输入专题名称"></Input>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="所属站点:">
          <Select v-model="affiliatedSite" class="form-select" @on-change="siteListChange">
            <Option v-for="item in affiliatedSiteList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="7">
        <!-- <FormItem label="所属频道:" class="ownChannel-select">
                      <Select v-model="ownChannel" class="form-select" multiple >
                          <Option v-for="item in ownChannelList" :value="item.value" :key="item.value" >{{ item.label }}</Option>
                      </Select>
                  </FormItem> -->
        <FormItem label="所属频道:" class="ownChannel-select">
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
        <FormItem label="专题状态:">
          <Select v-model="thematicStatus" class="form-select form-select-status">
            <Option v-for="item in thematicStatusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
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
        <Button type="primary" class="search-btn" @click="createATopicOne">创建专题</Button>
      </div>
      <Table class="tableCommon" :data="tableData" :columns="columns" ref="dragTable" :stripe="true" :border="true">
      </Table>
      <oil-page :total="total" :page-size="pageSize" @page-change="pageChange" :page-size-opts="pageSizeOpts" :show-sizer="showSizer"
        :page-num="pageNum">
      </oil-page>
    </Row>
    </Col>
    <!-- 列表结束 -->
    </Col>
    <Modal v-model="breedModel" title="频道" @on-cancel="cancel">
      <div style="max-height: 300px;overflow: auto;">
        <Tree ref="infoRef" :data="infoDataTree" :load-data="loadInfoData" show-checkbox @on-check-change='selectbm'></Tree>
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
    statusDisable
  } from "./api/thematicManagement.js";
  import { formData, formatStamp, formatTime } from "../../assets/js/common.js";
  export default {
    components: {
      OilPage
    },
    data() {
      return {
        hadselectbm: [],
        infoDataTree: [],
        breedModel: false,
        // 查询参数开始
        topicName: "",
        affiliatedSite: "",
        creationTime: "",
        thematicStatus: "全部状态",
        // ownChannel:[],
        ownChannel: "",
        ownChannelIdList: [],
        // 查询参数结束
        // 分页参数开始
        total: 0,
        pageSize: 10,
        pageNum: 1,
        showSizer: true,
        pageSizeOpts: [5, 10, 20, 30],
        // 分页参数结束
        affiliatedSiteList: [],
        ownChannelList: [],
        tableData: [],
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
        columns: [
          {
            key: "id",
            align: "center",
            minWidth: 80,
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
            minWidth: 350,
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
                        this.see(data);
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
                        this.listOfRelatedTopic(data);
                      }
                    }
                  },
                  "关联专题管理"
                ),
                h(
                  "a",
                  {
                    style: {
                      paddingLeft: "10px"
                    },
                    on: {
                      click: () => {
                        this.columnList(data);
                      }
                    }
                  },
                  "专栏列表"
                )
              ]);
            }
          }
        ]
      };
    },
    created() {
      this.queryWebsiteList();
      this.getListPage();
    },
    methods: {
      selectbm(data) {
        console.log(1666, data);
        this.hadselectbm = data;
      },
      loadInfoData(item, callback) {
        console.log("item", item);
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
      ok() {
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
        console.log("ownChannelIdList", this.ownChannelIdList);
      },
      cancel() {
        this.breedModel = false;
      },
      getBreedData() {
        if (this.affiliatedSite && this.affiliatedSite != "") {
          this.getInfoData();
          this.breedModel = true;
        } else {
          this.$Message.warning("请选择所属站点");
        }
      },
      getInfoData() {
        let params = {
          channelId: "",
          siteId: this.affiliatedSite || ""
        };
        console.log(params);
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
      createATopicOne() {
        this.$router.push({
          name: "createTopic"
        });
      },
      columnList(data) {
        this.$router.push({
          name: "columnList",
          query: {
            id: data.row.id
          }
        });
      },
      edit(data) {
        this.$router.push({
          name: "editTopic",
          query: {
            id: data.row.id
          }
        });
      },
      see(data) {
        this.$router.push({
          name: "seeTopic",
          query: {
            id: data.row.id
          }
        });
      },
      listOfRelatedTopic(data) {
        this.$router.push({
          name: "listOfRelatedTopic",
          query: {
            id: data.row.id
          }
        });
      },
      siteListChange(data) {
        // this.ownChannel = [];
        this.ownChannel = "";
        this.affiliatedSite = data;
        // this.queryChannelList();
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
            statusDisable(params).then(res => {
              _this.$Message.success("" + statusChinaValue + "成功");
              _this.getListPage();
            });
          },
          onCancel: () => { }
        };
        this.$Modal.confirm(config);
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
        console.log(params);
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
        let statusValue = "";
        let array = [];
        array.push(this.ownChannel);
        if (this.thematicStatus == "全部状态") {
          statusValue = "";
        }
        if (this.thematicStatus == 0) {
          statusValue = 0;
        }
        if (this.thematicStatus == 1) {
          statusValue = 1;
        }
        let start = formatStamp(this.creationTime[1]) + 86399000;
        let end = formatStamp(this.creationTime[0]);
        let params = {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          channelIdList: this.ownChannelIdList,
          createTimeE: start || "",
          createTimeS: end || "",
          status: statusValue,
          topicName: this.topicName,
          websiteId: this.affiliatedSite
        };
        listPage(params).then(res => {
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
        this.topicName = "";
        this.affiliatedSite = "";
        // this.ownChannel = [];
        this.ownChannel = "";
        this.creationTime = [];
        this.thematicStatus = "全部状态";
        this.ownChannelIdList = [];
        this.statusValue = "";
        this.hadselectbm = [];
      }
    }
  };
</script>