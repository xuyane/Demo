<style lang="less" scoped>
 /* @import '../productOpening.less'; */
.margin-left-15 {
    margin-left: 15px !important;
}
body .ivu-upload-list {
    margin-top: 0;
    float: right;
}
</style>

<template>
  <Row class="product-opening-out">
    <Col span="24">
    <Row class-name="current-position">
      当前位置：财务管理&nbsp;&nbsp;>>&nbsp;&nbsp;成本上报&nbsp;&nbsp;>>&nbsp;&nbsp;间接成本
    </Row>
    </Col>
    <Col span="24" class-name="search-form">
    <Form :model="form" :label-width="80">
      <Row type="flex" justify="space-between">
        <Col span="7">
        <FormItem label="员工:">
          <Input v-model="form.employeName" class="search-input" placeholder="请输入员工姓名"></Input>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="状态:">
          <Select v-model="form.type" clearable class="form-select">
            <Option v-for="item in stateList" :value="item.value" :key="item.value">{{item.desc}}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="7" class="text-right">
        <FormItem label="统计时间:">
          <DatePicker v-model="newTime" format="yyyy-MM" type="month" placement="top-start" placeholder="请选择统计时间" class="search-input" @on-change="getStatisticalTime"></DatePicker>
        </FormItem>
        </Col>
      </Row>
      <Row type="flex" justify="space-between">
        <Col span="7">
        <FormItem label="所在部门:">
          <select-department @data-list="getDepData" :emptyModel='form.deptId'></select-department>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="费用类型:">
          <Select v-model="form.costType" clearable class="form-select">
            <Option v-for="item in costTypeList" :value="item.value" :key="item.value">{{item.desc}}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="7" class="text-right">
        <FormItem label="导入日期:">
          <DatePicker v-model="importDate" format="yyyy-MM-dd" type="daterange" placement="top-start" placeholder="请选择导入日期" class="search-input" @on-change="getImportTime"></DatePicker>
        </FormItem>
        </Col>
      </Row>
      <Row type="flex" justify="space-between">
        <Col span="24" class="text-right">
        <Button type="primary" @click="search">查询</Button>
        <Button style="margin-left: 8px" @click="clearSearch">重置</Button>
        </Col>
      </Row>
    </Form>
    </Col>
    <Col span="24">
    <Row class-name="table-con">
      <div class="btn-container">
        <Row>
          <Col span="24">
          <Button type="error" class="search-btn margin-left-15 pull-left" @click="reportDelete">批量删除</Button>
          <Upload class="pull-left" :show-upload-list="false" :before-upload="handleUpload" :data="uploadForm" :on-success="upSuccess" :on-error="upError" action="/finance/inDirectCost/Import">
            <Button type="primary" class="search-btn">批量导入</Button>
          </Upload>
          <Button class="search-btn margin-left-15" @click="exportExcle">导入模板下载</Button>
          </Col>
        </Row>
      </div>
      <Table class="tableCommon" :data="tableData" :columns="columns" ref="dragTable" :stripe="true" :border="true" @on-selection-change="selection"></Table>
      <oil-page :total="total" :page-num="form.pageNum" :page-size="form.pageSize" @page-change="pageChange" :page-size-opts="pageSizeOpts" :show-sizer="showSizer"></oil-page>
    </Row>
    </Col>
  </Row>
</template>

<script>
import axios from "axios";
import oilPage from "../../components/page/page.vue";
import { getinDirectList } from "../../components/axios/finance.js";
import SelectDepartment from "../../components/finance/selectDepartment.vue";
import { formatTime ,formatThousandPrice} from "../../../assets/js/common.js";
export default {
    name: "indirect",
    components: {
        oilPage,
        SelectDepartment
    },
    data() {
        return {
            uploadForm: {
                multipartFile: ""
            },
            form: {
                deptId: [],
                costTime: "",
                costType: "",
                employeName: "",
                inTimeE: "",
                inTimeS: "",
                pageNum: 1,
                pageSize: 10,
                type: ""
            },
            newTime: "", //统计时间
            importDate: [], //导入日期
            costTypeList: [],
            stateList: [],
            selectionId: [],
            total: 0,
            pageSizeOpts: [10,15,20,40,50,100],
            showSizer: true,
            contractStateList: [
                {
                    label: "正常",
                    value: "1"
                },
                {
                    label: "作废",
                    value: "2"
                }
            ],
            columns: [
                {
                    type: "selection",
                    minWidth: 60,
                    align: "center"
                },
                {
                    key: "id",
                    align: "center",
                    title: "ID",
                    minWidth: 80
                },
                {
                    key: "employeId",
                    align: "center",
                    title: "员工ID",
                    minWidth: 70
                },
                {
                    key: "employeName",
                    align: "center",
                    title: "员工姓名",
                    minWidth: 90
                },
                {
                    key: "deptName",
                    align: "center",
                    title: "所在部门",
                    minWidth: 160
                },
                {
                    key: "type",
                    align: "center",
                    title: "状态",
                    minWidth: 60
                },
                {
                    key: "ondutyDay",
                    align: "center",
                    title: "出勤天数",
                    minWidth: 80
                },
                {
                    key: "costTime",
                    align: "center",
                    title: "产生月份",
                    minWidth: 80
                },
                {
                    key: "costType",
                    align: "center",
                    title: "费用类型",
                    minWidth: 80
                },
                {
                    key: "amount",
                    align: "center",
                    title: "分摊金额",
                    minWidth: 100,
                    render: (h, data) => {
                        return h('div', [
                        h('span', {
                            style: {
                            },
                        },formatThousandPrice(data.row.amount))
                        ])
                    }
                },
                {
                    key: "note",
                    align: "center",
                    title: "说明",
                    tooltip: true,
                    ellipsis: true,
                    minWidth: 200,

                },
                {
                    key: "creatorName",
                    align: "center",
                    title: "上报人",
                    minWidth: 100
                },
                {
                    key: "inTime",
                    align: "center",
                    title: "上报时间",
                    minWidth: 150
                },
                {
                    title: "操作",
                    align: "center",
                    minWidth: 150,
                    render: (h, data) => {
                        return h("div", [
                            h(
                                "span",
                                {
                                    style: {
                                        color: "#145edb",
                                        textDecoration: "underline",
                                        cursor: "pointer"
                                    },
                                    on: {
                                        click: () => {
                                            this.delete(data.row.id);
                                        }
                                    }
                                },
                                "删除"
                            )
                        ]);
                    }
                }
            ],
            tableData: [],
            departData: []
        };
    },
    mounted() {
        this.getList();
        this.getSelect();
        this.getCommon();
        this.getType();
    },
    methods: {
      exportExcle() {
        window.location.href = "/finance/inDirectCost/indirectCostDownload";
      },
        //获取部门树
        getDepData(value, selectedData) {
            this.form.deptId = selectedData;
        },
        upSuccess(res) {

          if (res.status == "200") {
              this.$Message.success("上传成功！");
              this.getList();
          } else {
            //   this.$Message.error("上传失败！");
            this.$Message.error(res.message);

          }
        },
        upError(res) {
            // this.$Message.error("上传失败");
            this.$Message.error(res.message);
        },
        handleUpload(file) {
            this.uploadForm.multipartFile = file;

        },
        getList() {
            //获取列表信息
            let that = this;
            this.$Spin.show();
             getinDirectList(that.form).then(function(res) {
                if (res.status == 200) {
                  if(res.response.list!==null){
                    that.tableData = res.response.list;
                  }else{
                    that.tableData = [];
                  }
                  that.total = res.response.total;
                }
                that.$Spin.hide();
            }).catch(err => {
                that.$Spin.hide();
            });
            // axios({
            //     url: "/finance/inDirectCost/list_page",
            //     method: "post",
            //     data: that.form
            // }).then(function(res) {
            //     if (res.status === 200) {
            //       if(res.data.response.list!==null){
            //         that.tableData = res.data.response.list;
            //       }else{
            //         that.tableData = [];
            //       }
            //       that.total = res.data.response.total;
            //     }
            //     that.$Spin.hide();
            // }).catch(err => {
            //     that.$Spin.hide();
            // });
        },
        getType() {
            //获取员工类型
            let that = this;
            let params = {
                type: "EmployeeTypeEnum"
            };
            axios({
                url: "/finance/common/select",
                method: "get",
                params
            }).then(function(res) {
                if (res.status == 200) {
                    that.stateList = res.data.response;
                }
            }).catch(err => {
                console.log(err);
            });
        },
        getSelect() {
            //获取费用类型
            let that = this;
            let params = {
                type: "InDirectCostTypeEnum"
            };
            axios({
                url: "/finance/common/select",
                method: "get",
                params
            }).then(function(res) {
                if (res.status == 200) {
                    that.costTypeList = res.data.response;
                }
            }).catch(err => {
                console.log(err);
            });
        },
        getCommon() {
            //获取部门树
            let that = this;
            axios({
                url: "/finance/common/selectDept",
                method: "get"
            }).then(function(res) {
                if (res.status === 200) {
                    that.departmentList = JSON.parse(res.data.response);
                }
            }).catch(err => {
                console.log(err);
            });
        },
        getMemberId(value, selectedData) {
            this.form.deptId = selectedData[selectedData.length - 1].id;
        },
        pageChange(page, pageSize) {
            if (page) {
                this.form.pageNum = page;
            }
            if (pageSize) {
                this.form.pageSize = pageSize;
            }
            this.getList();
        },
        getStatisticalTime(data) {
            //获取统计时间
            var datas_str = (data+'-01 00:00:00').toString();
            let datas_val= new Date(Date.parse(datas_str.replace(/-/g,"/"))).getTime()
            this.form.costTime = datas_val;
        },
        getImportTime(data) {
            //获取导入日期
            let data1 = (data[0] + ' 00:00:00').toString();
            let data2 = (data[1] + ' 23:59:59').toString();
            let data1_val= new Date(Date.parse(data1.replace(/-/g,"/"))).getTime();
            let data2_val= new Date(Date.parse(data2.replace(/-/g,"/"))).getTime();
            this.form.inTimeS = data1_val;
            this.form.inTimeE = data2_val;
        },
        search() {
            //查询按钮
            this.pageChange(1, 10);
        },
        clearSearch() {
            //清空查询条件
            this.form = {
                deptId: [],
                costTime: "",
                costType: "",
                employeName: "",
                inTimeE: "",
                inTimeS: "",
                pageNum: 1,
                pageSize: 10,
                type: ""
            };
            this.newTime = "";
            this.importDate = [];
        },
        delete(data) {
            //操作中的删除的事件
            let that = this;
            let form = "ids=" + data;
            this.$Modal.confirm({
                title: "提示信息",
                content: "您确定删除？",
                onOk: () => {
                    axios({
                        url: "/finance/inDirectCost/delete",
                        method: "post",
                        data: form
                    }).then(function(res) {
                        if (res.data.status == 200) {
                            that.getList();
                        }
                    }).catch(err => {
                        that.$Message.error(err);
                    });
                },
                onCancel: () => {}
            });
        },
        reportDelete() {
            //批量删除事件
            if (this.selectionId.length < 1) {
                this.$Message.warning("请选择要删除的数据！！！");
            } else {
                this.delete(this.selectionId);
            }
        },
        selection(data) {
            //批量删除 获取id 数组
            this.selectionId = [];
            data.map(item => {
                this.selectionId.push(item.id);
            });
        },
    }
};
</script>
