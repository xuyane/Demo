<style lang="less" scoped>
.mar-top-20 {
  margin-top: 20px;
}
.text-right {
  text-align: right;
}
.my-account-conter {
  background: #fff;
}
.font-14 {
  font-size: 14px;
}
.font-c-blue {
  color: #145edb;
}
.mrb-10 {
  margin-bottom: 10px;
}
</style>

<template>
    <Row class="my-saleList-out">
        <Col span="24">
        <Row class-name="current-position">
            当前位置：财务报表&nbsp;&nbsp;>>&nbsp;&nbsp;产业链收入统计&nbsp;&nbsp;>>&nbsp;&nbsp;年任务完成情况
        </Row>
        </Col>
        <Col span="24" class="search-form">
        <Form :label-width="150">
            <Row type="flex" justify="space-between">
                <Col span="8">
                <FormItem label="统计时间:">
                    <DatePicker type="year" v-model="params.selectYear" :clearable="falseNum" class="search-input" placeholder="选择时间" @on-change="dateChange"></DatePicker>
                </FormItem>
                </Col>
                <Col span="8">
                <FormItem label="部门（产业链）:">
                    <Input v-model="deptName" class="search-input" readonly @on-focus="openModal" placeholder="请选择编辑部门"></Input>
                    <Modal v-model="showDept" title="请选择编辑部门" @on-cancel="cancel">
                        <div style="max-height: 300px;overflow-x: hidden;">
                            <Tree ref="tree" :data="deptIdList" show-checkbox></Tree>
                        </div>
                        <div slot="footer">
                            <Button type="primary" @click="ok">确定</Button>
                            <Button @click="cancel">取消</Button>
                        </div>
                    </Modal>
                </FormItem>
                </Col>
                <Col span="8" class="text-right mrb-10">
                <Button type="primary" @click="search">查询</Button>
                <Button style="margin-left:8px;" @click="reset">重置</Button>
                </Col>
            </Row>
        </Form>
        </Col>
        <Col span="24" class-name="table-con">
        <Row>
            <Col span="12 mrb-10">
            <Button type="primary" @click="exportByYear" :loading="btnloading1">按年导出</Button>
            <Button type="primary" @click="exportByMonth" :loading="btnloading2">按月导出</Button>
            </Col>
            <Col span="12" class="text-right font-14"> 年任务目标：
            <span class="font-c-blue mar-r-10">{{totalDetail.targetAmountProductCount}}</span>
            年任务完成:
            <span class="font-c-blue mar-r-10">{{totalDetail.actualAmountProductCount}}</span>
            完成率:
            <span class="font-c-blue">{{totalDetail.completionRate}}</span>
            </Col>
        </Row>
        <Row :gutter="20">
            <Col span="14">
            <Table class="" :data="yearTableData" :columns="yearColumns" ref="dragTable" :loading="loading" :stripe="true" :border="true"></Table>
            <oil-page :total="pageTotal" :page-num="params.pageNum" :page-size="params.pageSize" @page-change="pageChange" :page-size-opts="pageSizeOpts" :show-sizer="showSizer"></oil-page>
            </Col>
            <Col span="10">
            <Table class="table-fixed" :data="monthTableData" :columns="monthColumns" ref="dragTable" :loading="loading1" :stripe="true" :border="true"></Table>
            </Col>
        </Row>
        </Col>
    </Row>
</template>

<script>
import axios from "axios";
import oilPage from "../../components/page/page.vue";
import { formatThousandPrice, formData } from "../../../assets/js/common.js";
import {
  reportOrgProductYearList,
  reportOrgProductMonthList,
  pfCommonTreeDeptTree,
  reportOrgProductYearCount,
  pfCommonTreeOrgTree
} from "@/view/components/axios/report.js";
export default {
  name: "reportOrgProductYear",
  components: {
    oilPage
  },
  data() {
    return {
      falseNum: false,
      params: {
        selectYear: new Date().getFullYear().toString(),
        orgIds: [],
        pageNum: 1,
        pageSize: 10,
        sign: ""
      },
      loading: false,
      loading1: false,
      btnloading1: false,
      btnloading2: false,
      deptName: "",
      pageTotal: 0,
      showDept: false,
      deptIdList: [],
      pageSizeOpts: [10, 15, 20, 40, 50, 100],
      showSizer: true,
      yearTableData: [],
      yearColumns: [
        {
          key: "orgName",
          title: "产业链",
          align: "center",
          minWidth: 60,
          width: 150
        },
        {
          key: "parentOrgName",
          title: "所属部门",
          align: "center",
          minWidth: 120
        },
        {
          key: "targetAmountProduct",
          title: "年任务目标",
          align: "center",
          minWidth: 100
        },
        {
          key: "actualAmountProduct",
          title: "年收入",
          align: "center",
          minWidth: 100
        },
        {
          key: "completionRate",
          title: "年任务完成率",
          align: "center",
          minWidth: 100
        },
        {
          key: "",
          title: "操作",
          align: "center",
          minWidth: 100,
          render: (h, data) => {
            return h(
              "span",
              {
                style: {
                  color: "blue",
                  textDecoration: "underline",
                  cursor: "pointer"
                },
                on: {
                  click: () => {
                    this.getMonthList(data.row.orgId);
                  }
                }
              },
              "查看"
            );
          }
        }
      ],
      monthTableData: [],
      monthColumns: [
        {
          key: "monthStr",
          title: "月份",
          align: "center",
          minWidth: 60,
          width: 80
        },
        {
          key: "targetAmountProduct",
          title: "月任务目标",
          align: "center",
          minWidth: 140
        },
        {
          key: "actualAmountProduct",
          title: "月收入",
          align: "center",
          minWidth: 140
        },
        {
          key: "completionRate",
          title: "月任务完成率（%）",
          align: "center",
          minWidth: 140
        }
      ],
      totalDetail: {
        targetAmountProductCount: 0,
        actualAmountProductCount: 0,
        completionRate: "0.00%"
      }
    };
  },
  mounted() {
    this.getSelectList();
    this.getYearList();
    this.getSumList();
  },
  methods: {
    cancel() {
      this.showDept = false;
    },
    ok() {
      this.showDept = false;
      let dataList = this.$refs.tree.getCheckedNodes();
      let deptLabel = [];
      let deptId = [];
      let deptCode = [];
      dataList.map(item => {
        deptLabel.push(item.title);
        deptId.push(item.value);
        deptCode.push(item.code);
      });
      this.deptName = deptLabel.join("/");
      this.params.orgIds = deptId;
    },
    openModal() {
//      this.getSelectList();
      this.showDept = true;
    },

    _breedDigui(arr = []) {
      return arr.map(item => {
        if (item.children && item.children.length > 0) {
          return {
            title: item.label,
            value: item.id,
            code: item.value,
            children: this._breedDigui(item.children)
          };
        } else {
          return {
            title: item.label,
            value: item.id,
            code: item.value
          };
        }
      });
    },


    getSelectList() {
      pfCommonTreeOrgTree({ type: 2 }).then(res => {
//            console.log(JSON.parse(res.response));
        this.deptIdList = this._breedDigui(JSON.parse(res.response));
      })
    /*  if (this.deptName == "") {
        pfCommonTreeDeptTree().then(res => {
          this.deptIdList = JSON.parse(res.response).map(item => {
            return {
              code: item.value,
              value: item.id,
              title: item.label,
              children: item.children
                .filter(child => {
                  return child.id === 2202 || child.id === 2203;
                })
                .map(option => {
                  return {
                    code: option.value,
                    value: option.id,
                    title: option.label,
                    children: option.children.map(childItem => {
                      return {
                        code: childItem.value,
                        value: childItem.id,
                        title: childItem.label,
                        children: childItem.children.map(triItem => {
                          return {
                            code: triItem.value,
                            value: triItem.id,
                            title: triItem.label,
                            children: triItem.children.map(fourItem => {
                              return {
                                code: fourItem.value,
                                value: fourItem.id,
                                title: fourItem.label
                              };
                            })
                          };
                        })
                      };
                    })
                  };
                })
            };
          });
        });
      }*/
    },
    dateChange(val) {
      this.params.selectYear = val;
    },
    getSumList() {
      if (typeof this.params.selectYear === "object") {
        this.params.selectYear = this.params.selectYear
          .getFullYear()
          .toString();
      }
      this.loading = true;
      reportOrgProductYearCount(this.params).then(res => {
        if (res.status == 200) {
          this.loading = false;
          // this.totalDetail = res;
          this.totalDetail = {
            targetAmountProductCount: res.response.targetAmountProductCount
              ? formatThousandPrice(res.response.targetAmountProductCount)
              : 0,
            actualAmountProductCount: res.response.actualAmountProductCount
              ? formatThousandPrice(res.response.actualAmountProductCount)
              : 0,
            completionRate: res.response.completionRate
          };
        } else {
          this.$Message.warning(res.message);
        }
      });
    },
    getYearList() {
      if (typeof this.params.selectYear === "object") {
        this.params.selectYear = this.params.selectYear
          .getFullYear()
          .toString();
      }
      this.loading = true;
      reportOrgProductYearList(this.params).then(res => {
        if (res.status == 200) {
          this.loading = false;
          this.yearTableData = res.response.list ? res.response.list : [];
          this.pageTotal = res.response.total;
        } else {
          this.$Message.warning(res.message);
        }
      });
    },
    getMonthList(id) {
      if (typeof this.params.selectYear === "object") {
        this.params.selectYear = this.params.selectYear
          .getFullYear()
          .toString();
      }
      let params = {
        orgId: id,
        selectYear: this.params.selectYear
      };
      this.loading1 = true;
      reportOrgProductMonthList(params).then(res => {
        this.loading1 = false;
        if (res.status == 200) {
          console.log(res);
          this.monthTableData = res.response ? res.response : [];
        } else {
          this.$Message.warning(res.message);
        }
      });
    },
    exportByYear() {
      if (this.pageTotal >= 10000) {
        this.$Message.warning({
          content: "数据超过1万条，请分批导出",
          duration: 2
        });
      } else if (this.pageTotal <= 0) {
        this.$Message.warning({
          content: "无数据",
          duration: 2
        });
      } else {
        this.btnloading1 = true;
        let params = {
          selectYear: this.params.selectYear,
          orgIds: this.params.orgIds ? this.params.orgIds.join(",") : "",
          pageNum: 1,
          pageSize: 10,
          sign: ""
        };
        axios({
          url: "/report/reportIndustryChainAmount/reportOrgProductYearExport",
          method: "get",
          params: params
        }).then(res => {
          if (res.data.status === "500" || res.data.status === "100053") {
            this.$Message.warning(res.data.message ? res.data.message : "");
          } else {
            let form_data = formData(this.params);
            window.location.href =
              "/report/reportIndustryChainAmount/reportOrgProductYearExport?" +
              form_data;
          }
          this.btnloading1 = false;
        });
      }
    },
    exportByMonth() {
      if (this.monthTableData.length <= 0) {
        this.$Message.warning({
          content: "无数据",
          duration: 2
        });
      } else if (this.monthTableData.length >= 10000) {
        this.$Message.warning({
          content: "数据超过1万条，请分批导出",
          duration: 2
        });
      } else {
        this.btnloading2 = true;
        let params = {
          selectYear: this.params.selectYear,
          orgIds: this.params.orgIds ? this.params.orgIds.join(",") : "",
          pageNum: 1,
          pageSize: 10,
          sign: ""
        };
        axios({
          url: "/report/reportIndustryChainAmount/reportOrgProductMonthExport",
          method: "get",
          params: params
        }).then(res => {
          if (res.data.status === "500" || res.data.status === "100053") {
            this.$Message.warning(res.data.message ? res.data.message : "");
          } else {
            let form_data = formData(this.params);
            window.location.href =
              "/report/reportIndustryChainAmount/reportOrgProductMonthExport?" +
              form_data;
          }
          this.btnloading2 = false;
        });
      }
    },
    search() {
      //            this.pageChange(1, 10);
      this.params.pageNum = 1;
      this.params.pageSize = 10;
      this.monthTableData = [];
      this.getYearList();
      this.getSumList();
    },
    reset() {
      this.params = {
        selectYear: new Date().getFullYear().toString(),
        orgIds: [],
        pageNum: 1,
        pageSize: 10,
        sign: ""
      };
      this.deptName = "";
      this.dateRange = [];
    },
    pageChange(page, pageSize) {
      //分页
      if (page) {
        this.params.pageNum = page;
      }
      if (pageSize) {
        this.params.pageSize = pageSize;
      }
      this.getYearList();
    }
  }
};
</script>


