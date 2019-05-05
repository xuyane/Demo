<style lang="less" scoped>
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
            当前位置：财务报表&nbsp;&nbsp;>>&nbsp;&nbsp;到账统计&nbsp;&nbsp;>>部门到账排行
        </Row>
        </Col>
        <Col span="24" class="search-form">
        <Form ref="addForm" :label-width="100" class="my-account-conter">
            <Row>
                <Col span="8">
                <FormItem label="认账时间:">
                    <DatePicker type="daterange" :clearable="clearData" v-model="dateRange" class="search-input" placeholder="选择时间段"></DatePicker>
                </FormItem>
                </Col>
                <Col span="8">
                <FormItem label="部门名称:">
                    <Input v-model="deptName" class="search-input" readonly @on-focus="openModal" placeholder="请选择编辑部门"></Input>
                    <Modal v-model="showDept" title="请选择所在部门" @on-cancel="cancel">
                        <div style="max-height: 300px;overflow-x: hidden;">
                            <Tree ref="tree" :data="deptIdTreeList" show-checkbox></Tree>
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
        <Col span="24">
        <Row class-name="table-con">
            <Col span="4 mrb-10">
            <Button type="primary" @click="exportExcle">导出</Button>
            </Col>
            <Col span="20" class="text-right font-14">
            总金额: <span class="font-c-blue mar-r-10">{{formatPrice(amountStatistics.ackAmount)}}</span>
            新入金额：<span class="font-c-blue mar-r-10">{{formatPrice(amountStatistics.newAmount)}}</span>
            续入金额: <span class="font-c-blue mar-r-10">{{formatPrice(amountStatistics.oldAmount)}}</span>
            会议金额: <span class="font-c-blue mar-r-10">{{formatPrice(amountStatistics.confAmount)}}</span>
            </Col>
            <Col span="24">
            <Table class="TableCommon" :data="tableData" :columns="columns" ref="dragTable" :loading="loading1" :stripe="true" :border="true"></Table>
            <div class="page-con">
                <span>第{{pageNum}}页 / 共{{Math.ceil(pageTotal / pageSize)}}页 每页{{pageSize}}条 共{{pageTotal}}条</span>
                <Page :total="pageTotal" :current="pageNum" :page-size="pageSize" show-sizer show-elevator :page-size-opts="pageSizeOpt" @on-change="changePageNum" @on-page-size-change="changePageSize" class="pull-right" />
            </div>
            </Col>
        </Row>
        </Col>
        </Col>
    </Row>
</template>

<script>
import axios from "axios";
import {
  formatThousandPrice,
  formDataFilterEmpty
} from "@/assets/js/common.js";
import {
  efaccounttransferOrgList,
  efaccounttransferOrgListTotal,
  pfCommonTreeDeptTree
} from "@/view/components/axios/report.js";
export default {
  name: "departAccountRanking",
  data() {
    return {
      clearData: false,
      params: {
        deptIdList: null,
        endTime: "",
        startTime: "",
        pageNum: 1,
        pageSize: 10
      },
      deptIdTreeList: [],
      deptName: "",
      showDept: false,
      dateRange: [],
      amountStatistics: "",
      pageSizeOpt: [10, 15, 20, 40, 50, 100],
      pageNum: 1,
      pageTotal: 0,
      pageSize: 10,
      tableData: [],
      columns: [
        {
          key: "",
          title: "排名",
          align: "center",
          minWidth: 80,
          render: (h, data) => {
            return h(
              "span",
              {},
              (this.pageNum - 1) * this.pageSize + data.index + 1
            );
          }
        },
        {
          key: "adminDeptName",
          title: "部门",
          align: "center",
          minWidth: 160
        },
        {
          key: "ackAmount",
          title: "认账总金额",
          align: "center",
          minWidth: 160,
          render: (h, data) => {
            return h("span", {}, formatThousandPrice(data.row.ackAmount));
          }
        },
        {
          key: "newAmount",
          title: "新入金额",
          align: "center",
          minWidth: 160,
          render: (h, data) => {
            return h("span", {}, formatThousandPrice(data.row.newAmount));
          }
        },
        {
          key: "oldAmount",
          title: "续入金额",
          align: "center",
          minWidth: 140,
          render: (h, data) => {
            return h("span", {}, formatThousandPrice(data.row.oldAmount));
          }
        },
        {
          key: "confAmount",
          title: "会议金额",
          align: "center",
          minWidth: 140,
          render: (h, data) => {
            return h("span", {}, formatThousandPrice(data.row.confAmount));
          }
        }
      ],
      loading1: false,
      loading2: false
    };
  },
  created() {
//    this.initDateRange();
    this.changePageNum(1);
    this.dateRange = this.initDateRange;
    this.params.startTime = +this.initDateRange[0];
    this.params.endTime = +this.initDateRange[1];
  },
  methods: {
    search() {
      this.pageSize = 10;
      this.changePageNum(1);
    },
    reset() {
      this.params = {
        deptIdList: null,
        endTime: "",
        startTime: "",
        pageNum: 1,
        pageSize: 10
      };
      this.deptName = "";
      this.dateRange = this.initDateRange;
    },

    //改变列表页码
    changePageNum(current) {
      this.pageNum = current;
      this.getList();
    },

    // 监听修改显示条数
    changePageSize(size) {
      this.pageSize = size;
      this.getList();
    },
    getList() {
      if (!this.dateRange[0] || !this.dateRange[1]) {
        this.dateRange = this.initDateRange;
      }
      this.params.startTime = this.dateRange[0].setHours(0, 0, 0, 0);
      this.params.endTime = this.dateRange[1].setHours(23, 59, 59, 999);


      let param = JSON.parse(JSON.stringify(this.params));
      param.pageNum = this.pageNum;
      param.pageSize = this.pageSize;
      this.loading1 = true;
      efaccounttransferOrgList(param).then(res => {
        this.loading1 = false;
        if (res.status == 200) {
          this.tableData = res.response.list ? res.response.list : [];
          this.pageTotal = res.response.total;
        } else {
          this.$Message.warning(res.message ? res.message : "");
        }
      });
      efaccounttransferOrgListTotal(param).then(res => {
        if (res.status == 200) {
          this.amountStatistics = res.response;
        } else {
          this.$Message.warning(res.message ? res.message : "");
        }
      });
    },
    exportExcle() {
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
        let param = JSON.parse(JSON.stringify(this.params));
        param.deptIdList = this.params.deptIdList
          ? this.params.deptIdList.join()
          : null;
        axios({
          url: "/report/efaccounttransfer/org_export",
          method: "get",
          params: param
        }).then(res => {
          if (res.data.status === "500" || res.data.status === "100053") {
            this.$Message.warning(res.data.message ? res.data.message : "");
          } else {
            let form_data = formDataFilterEmpty(param);
            window.location.href =
              "/report/efaccounttransfer/org_export?" + form_data;
          }
        });
      }
    },
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
      this.params.deptIdList = deptId;
    },
    openModal() {
      this.showDept = true;
      this.getSelectList();
    },
    getSelectList() {
        pfCommonTreeDeptTree().then(res => {
          this.deptIdTreeList = JSON.parse(res.response).map(item => {
            return {
              code: item.value,
              value: item.id,
              title: item.label,
              children: item.children.map(option => {
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

    },
   /* dateChange() {
      this.params.startTime = this.dateRange
        ? new Date(this.dateRange[0]).getTime()
        : "";
      this.params.endTime = this.dateRange
        ? new Date(this.dateRange[1]).getTime() + 24 * 60 * 60 * 1000 - 1000
        : "";
    },*/
  /*  initDateRange() {
      let startTime = new Date(new Date().toLocaleDateString()).getTime();
      let endTime =
        new Date(new Date().toLocaleDateString()).getTime() +
        24 * 60 * 60 * 1000 -
        1000;
      this.dateRange = [new Date(startTime), new Date(endTime)];
      this.params.startTime = startTime;
      this.params.endTime = endTime;
    },*/
    formatPrice(val) {
      return formatThousandPrice(val);
    }
  },

  computed: {
    initDateRange() {
      const dateStart = new Date();
      dateStart.setHours(0, 0, 0, 0);
      const dateEnd = new Date();
      dateEnd.setHours(23, 59, 59, 999);
      return [dateStart, dateEnd]
    }
  }
};
</script>


