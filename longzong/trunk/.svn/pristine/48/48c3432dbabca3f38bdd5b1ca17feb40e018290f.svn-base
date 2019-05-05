<style lang="less" scoped>
  @import "../taskplant/taskplant.less";
  /*
任务分配与委派
*/
</style>
<template>
  <Row>
    <Col span="24">
    <Row class-name="current-position">
      当前位置：
      <router-link to="/plantIndex" class="link-css"> 信息发布管理</router-link>
      &nbsp;&nbsp;>>&nbsp;&nbsp;
      <router-link to="/departmentTaskReach" class="link-css"> 部门任务达标统计</router-link>
      <!-- 当前位置：信息发布管理&nbsp;&nbsp;>>&nbsp;&nbsp;部门任务达标统计 -->
    </Row>
    </Col>
    <Col span="24">
    <Row :gutter="24">
      <Col span="6">
      <div class="plant-title">
        <p>人员信息列表</p>
      </div>
      <Row class="plant-content">
        <Tree :data="treeData" @on-select-change="clickTree"></Tree>
      </Row>
      </Col>
      <Col span="18">
      <Row>
        <Col span="24" class-name="search-form">
        <Form :label-width="100">
          <Row type="flex" justify="space-between">
            <Col span="8">
            <FormItem label="姓名:">
              <Input v-model="selectName" class="search-input" placeholder="请输入姓名/拼音" @on-change="getData"></Input>
            </FormItem>
            </Col>
            <Col span="8">
            <FormItem label="查询时间段：">
              <DatePicker v-model="queryTime" format="yyyy-MM-dd" type="daterange" placement="top-start" placeholder="请选择日期" class="search-input"
                @on-change="getQueryTime"></DatePicker>
            </FormItem>
            </Col>
            <Col span="8" class="text-right mar-b-10">
            <Button type="primary" icon="ios-search" @click="getData">查询</Button>
            <Button style="margin-left: 8px" icon="ios-refresh" @click="handleReset">重置</Button>
            </Col>
          </Row>
        </Form>
        </Col>
        <Col span="24" class="table-con">
        <p style="text-align: center;font-size: 18px;margin-bottom: 15px;">{{titleName}}</p>
        <Table class="tableCommon" :loading="loading" :data="tableData" :columns="columns" ref="dragTable" :stripe="true" :border="true"></Table>
        </Col>
      </Row>
      </Col>
    </Row>
    </Col>
  </Row>
</template>
<script>
  import { getTree, getTable } from "../unitmangement/api/departmentTaskReach.js";
  import { formData } from "../../../assets/js/common.js";
  export default {
    name: "departmentTaskReach",
    data() {
      return {
        tempCode: "",
        treeData: [
          {
            title: "暂无数据",
            loading: false
          }
        ],
        selectName: "",
        selectStartTime: "",
        selectEndTime: "",
        queryTime: [],
        pageNum: 1,
        pageSize: 10,
        columns: [
          {
            title: " ",
            align: "center",
            children: [
              {
                key: "name",
                title: "姓名",
                align: "center",
                width: 80,
                render: (h, params) => {
                  if (params.row.name == "汇总信息") {
                    return h("div", [
                      h(
                        "span",
                        {
                          style: {
                            color: "black",
                            "font-weight": 600
                          }
                        },
                        params.row.name
                      )
                    ]);
                  } else {
                    return h("div", [
                      h(
                        "a",
                        {
                          on: {
                            click: () => {
                              this.$router.push({
                                name: "personalTaskReach"
                              });
                              localStorage.setItem(
                                "department",
                                JSON.stringify({
                                  name: params.row.name,
                                  id: params.row.id,
                                  departMentId: params.row.departMentId,
                                  queryTime: [this.nowTime, this.setTime]
                                })
                              );
                            }
                          }
                        },
                        params.row.name
                      )
                    ]);
                  }
                }
              }
            ]
          },
          {
            title: "总任务数",
            align: "center",
            children: [
              {
                title: "标准任务数",
                align: "center",
                render: (h, data) => {
                  let label =
                    data.row.standardPublishCount + data.row.standardGatherCount;
                  return h(
                    "span",
                    {
                      props: {
                        type: "text",
                        size: "small"
                      }
                    },
                    label
                  );
                }
              },
              {
                title: "实际完成任务数",
                align: "center",
                render: (h, data) => {
                  let label =
                    data.row.actualPublishCount + data.row.actualGatherCount;
                  return h(
                    "span",
                    {
                      props: {
                        type: "text",
                        size: "small"
                      }
                    },
                    label
                  );
                }
              }
            ]
          },
          {
            title: "发布任务数",
            align: "center",
            children: [
              {
                key: "standardPublishCount",
                title: "标准任务数",
                align: "center"
              },
              {
                key: "actualPublishCount",
                title: "实际完成任务数",
                align: "center"
              }
            ]
          },
          {
            key: "total",
            title: "采集任务数",
            align: "center",
            children: [
              {
                key: "standardGatherCount",
                title: "标准任务数",
                align: "center"
              },
              {
                key: "actualGatherCount",
                title: "实际完成任务数",
                align: "center"
              }
            ]
          },
          {
            key: "total",
            title: "总任务数",
            align: "center",
            children: [
              {
                key: "totalRate",
                title: "总达标率",
                align: "center",
                render: (h, data) => {
                  let label = this.countRate(
                    data.row.actualGatherCount + data.row.actualPublishCount,
                    data.row.standardGatherCount + data.row.standardPublishCount
                  );
                  return h(
                    "span",
                    {
                      props: {
                        type: "text",
                        size: "small"
                      }
                    },
                    label
                  );
                }
              },
              {
                title: "发布达标率",
                align: "center",
                render: (h, data) => {
                  let label = this.countRate(
                    data.row.actualPublishCount,
                    data.row.standardPublishCount
                  );
                  return h(
                    "span",
                    {
                      props: {
                        type: "text",
                        size: "small"
                      }
                    },
                    label
                  );
                }
              },
              {
                key: "collectRate",
                title: "采集达标率",
                align: "center",
                render: (h, data) => {
                  let label = this.countRate(
                    data.row.actualGatherCount,
                    data.row.standardGatherCount
                  );
                  return h(
                    "span",
                    {
                      props: {
                        type: "text",
                        size: "small"
                      }
                    },
                    label
                  );
                }
              }
            ]
          }
        ],
        tableData: [],
        loading: false,
        pageNum: 1,
        pageSize: 5,
        titleName: "",
        departmentId: "",
        nowTime: this.getCurrentMonthFirst(),
        setTime: this.getNowFormatDate()
      };
    },
    created() {
      if (this.$route.query.code) {
        this.tempCode = this.$route.query.code;
      }
      if (this.$route.query.departmentId) {
        this.departmentId = this.$route.query.departmentId;
      }
      this.queryTime = [this.getCurrentMonthFirst(), this.getNowFormatDate()];
      this.getTree();
      this.getData();
    },
    methods: {
      getCurrentMonthFirst() {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = "01";
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
      },
      getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
      },
      countRate(val1, val2) {
        if (val1 == 0) {
          return "0%";
        } else if (val2 == 0) {
          return "100%";
        } else {
          return ((val1 / val2) * 100).toFixed(2) + "%";
        }
      },
      getTree() {
        var that = this;
        var params = {
          code: that.tempCode
        };
        getTree(formData(params)).then(res => {
          that.treeData = res.response;
        });
      },
      clickTree(node) {
        console.log(node[0].isClick);
        this.departmentId = node[0].id;
        if (node[0].isClick) {
          this.getData();
        }
      },
      getQueryTime(data) {
        this.nowTime = data[0];
        this.setTime = data[1];
        let data1 = new Date(data[0]);
        let data2 = new Date(data[1]);
        this.selectStartTime = data1.setHours(0, 0, 0, 0);
        this.selectEndTime = data2.setHours(23, 59, 59, 999);
      },
      getData() {
        var that = this;
        that.loading = true;
        var params = {
          departmentId: that.departmentId,
          name: that.selectName,
          pageNum: that.pageNum,
          pageSize: that.pageSize,
          startTime: that.selectStartTime,
          endTime: that.selectEndTime,
          ids: [],
          order: "",
          sign: "",
          sort: "",
          time: ""
        };
        getTable(params)
          .then(res => {
            that.tableData = res.response.list;
            that.titleName = res.response.titleName;
            that.loading = false;
          })
          .catch(() => {
            that.loading = false;
          });
      },
      pageChange(page, pageSize) {
        if (page) {
          this.pageNum = page;
        }
        if (pageSize) {
          this.pageSize = pageSize;
        }
        this.getData();
      },
      handleReset() {
        this.selectName = "";
        this.queryTime = [this.getCurrentMonthFirst(), this.getNowFormatDate()];
        this.selectStartTime = "";
        this.selectEndTime = "";
        this.getData();
      }
    }
  };
</script>