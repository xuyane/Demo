<style lang="less" scoped>
/* @import '../productOpening.less'; */
.margin-left-15{
    margin-left: 15px !important;
  }
body .ivu-upload-list {
    display: inline-block;
    margin-top: 0;
    float: right;
}
</style>

<template>
  <Row class="product-opening-out">
    <Col span="24">
    <Row class-name="current-position">
      当前位置：财务管理&nbsp;&nbsp;>>&nbsp;&nbsp;成本上报&nbsp;&nbsp;>>&nbsp;&nbsp;直接成本
    </Row>
    </Col>
    <Col span="24" class-name="search-form">
    <Form :model="form" :label-width="80">
      <Row type="flex" justify="space-between">
        <Col span="7">
        <Row>
          <Col span="24">
          <FormItem label="项目编号:">
            <Input v-model="form.projectCode" class="search-input" placeholder="请输入会议或报告编号"></Input>
          </FormItem>
          </Col>
        </Row>
        </Col>
        <Col span="7">
        <FormItem label="支出时间:">
          <DatePicker format="yyyy-MM-dd" :value="payDate" type="daterange" placement="top-start" placeholder="请选择支出时间" class="search-input" @on-change="getPayTime"></DatePicker>
        </FormItem>
        </Col>
        <Col span="7" class="text-right">
        <FormItem label="支出人:">
          <Input v-model="form.applicantName" class="search-input" placeholder="请输入支出人姓名"></Input>
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
        <FormItem label="支出金额:">
          <Col span="11">
          <Input v-model="form.minAmount" class="search-input" placeholder="请输入最小值"></Input>
          </Col>
          <Col span="2" class="text-center">--</Col>
          <Col span="11">
          <Input v-model="form.maxAmount" class="search-input" placeholder="请输入最大值"></Input>
          </Col>
        </FormItem>
        </Col>
        <Col span="7" class="text-right">
        <FormItem label="导入日期:">
          <DatePicker format="yyyy-MM-dd" :value="importDate" type="daterange" placement="top-start" placeholder="请选择修改日期" class="search-input" @on-change="getImportTime"></DatePicker>
        </FormItem>
        </Col>
      </Row>
      <Row type="flex" justify="space-between">
        <Col span="14">
            <FormItem label="费用类型:">
              <CheckboxGroup v-model="form.costType" class="check-box-group">
                <Checkbox v-for="(item,index) in typeList" :label="item.value"  :key="index">{{item.desc}}</Checkbox>
              </CheckboxGroup>
            </FormItem>
          </Col>
        <Col span="7" class="text-right">
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
            <Upload class="pull-left" :show-upload-list="false" :before-upload="handleUpload" :data="uploadForm" :on-success="upSuccess" :on-error="upError" action="/finance/directCost/Import">
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
import { getDirectList, directExport } from "../../components/axios/finance.js";
import SelectDepartment from "../../components/finance/selectDepartment.vue";
import { formData, formatThousandPrice } from "../../../assets/js/common";
export default {
    name: "direct",
    components: {
        oilPage,
        SelectDepartment
    },
    data() {
        return {
            payDate:[],
            importDate:[],
            uploadForm: {
                multipartFile: ""
            },
            form: {
                deptId: [],
                costType: [],
                applicantName: "",
                costTimeE: "", //支付时间
                costTimeS: "",
                inTimeE: "",  //导出时间
                inTimeS: "",
                maxAmount: "",
                minAmount: "",
                pageNum: 1,
                pageSize: 10,
                projectCode: ""
            },
            loading: false,
            typeList: [],
            selectSeachList: [],
            selectionId: [],
            total: 0,
            pageSizeOpts: [10,15,20,40,50,100],
            showSizer: true,
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
                    minWidth: 60
                },
                {
                    key: "projectName",
                    align: "center",
                    title: "项目名称",
                    minWidth: 180
                },
                {
                    key: "projectCode",
                    align: "center",
                    title: "项目编号",
                    minWidth: 160
                },
                {
                    key: "projectType",
                    align: "center",
                    title: "项目类型",
                    minWidth: 150
                },
                {
                    key: "costType",
                    align: "center",
                    title: "费用类型",
                    minWidth: 120
                },
                {
                    key: "amount",
                    align: "center",
                    title: "支出金额",
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
                    key: "costTime",
                    align: "center",
                    title: "支出时间",
                    minWidth: 100
                },
                {
                    key: "contractNo",
                    align: "center",
                    title: "关联合同",
                    minWidth: 150
                },
                {
                    key: "note",
                    align: "center",
                    title: "支出说明",
                    minWidth: 150
                },
                {
                    key: "applicantName",
                    align: "center",
                    title: "支出人",
                    minWidth: 100
                },
                {
                    key: "deptName",
                    align: "center",
                    title: "所在部门",
                    minWidth: 160
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
                    minWidth: 160
                },
                {
                    title: "操作",
                    align: "center",
                    minWidth: 80,
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
            //departData: []
        };
    },
    mounted() {
        this.getBaseData();
        this.getList();
        this.getCommon();

    },
    methods: {
      exportExcle() {
        window.location.href = "/finance/directCost/directCostDownload";
      },

        //获取会议和报告等等数据
        getBaseData() {
            let that = this;
            axios({
                url: "/finance/common/select",
                method: "get",
                params: {
                    type: "DirectCostTypeEnum"
                }
            }).then(res => {
                if (res.data.status == "200") {
                    that.typeList = res.data.response;
                }
            });
        },
        //获取部门树
        getDepData(value, selectedData) {
            this.form.deptId = selectedData.length < 1 ? null : selectedData;
        },
        upSuccess(res) {

           if(res.status =="200"){
             this.$Message.success("上传成功！");
             this.getList();
           }else{
             this.$Message.error(res.message);
           }
        },
        upError(res) {
            this.$Message.error(res.message);
        },
        handleUpload(file) {
            this.uploadForm.multipartFile = file;
        },
        getList() {
            //获取列表信息
            let that = this;
            this.$Spin.show();
             getDirectList(that.form)
                .then(function(res) {
                    if (res.status == 200) {
                      if(res.response.list!==null){
                        that.tableData = res.response.list;
                      }else{
                        that.tableData = [];
                      }
                      that.total = res.response.total;
                    }
                    that.$Spin.hide();
                })
                .catch(err => {
                    console.log(err);
                    that.$Spin.hide();
                });
            // axios({
            //     url: "/finance/directCost/list_page",
            //     method: "post",
            //     data: that.form
            // })
            //     .then(function(res) {
            //         if (res.status === 200) {
            //           if(res.data.response.list!==null){
            //             that.tableData = res.data.response.list;
            //           }else{
            //             that.tableData = [];
            //           }
            //           that.total = res.data.response.total;
            //         }
            //         that.$Spin.hide();
            //     })
            //     .catch(err => {
            //         console.log(err);
            //         that.$Spin.hide();
            //     });
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
                    console.log(that.departmentList);
                }
            }).catch(err => {
                console.log(err);
            });
        },
        timestampToTime(timestamp) {
            var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + "-";
            var M =
                (date.getMonth() + 1 < 10
                    ? "0" + (date.getMonth() + 1)
                    : date.getMonth() + 1) + "-";
            var D = date.getDate() + " ";
            var h = date.getHours() + ":";
            var m = date.getMinutes() + ":";
            var s = date.getSeconds();
            return Y + M + D + h + m + s;
        },
        getPayTime(data) {
            //获取支付时间
            let data1 = (data[0] + ' 00:00:00').toString();
            let data2 = (data[1] + ' 23:59:59').toString();
            let data1_val= new Date(Date.parse(data1.replace(/-/g,"/"))).getTime();
            let data2_val= new Date(Date.parse(data2.replace(/-/g,"/"))).getTime();
            this.form.costTimeS = data1_val;
            this.form.costTimeE = data2_val;
        },
        getImportTime(data) {
            //获取导出时间
            let data1 = (data[0] + ' 00:00:00').toString();
            let data2 = (data[1] + ' 23:59:59').toString();
            let data1_val= new Date(Date.parse(data1.replace(/-/g,"/"))).getTime();
            let data2_val= new Date(Date.parse(data2.replace(/-/g,"/"))).getTime();
            this.form.inTimeS = data1_val;
            this.form.inTimeE = data2_val;
        },
        pageChange(page, pageSize) {
            //分页
            if(page) {
                this.form.pageNum = page;
            }
            if(pageSize) {
                this.form.pageSize = pageSize;
            }
            this.getList();
        },
        search() {
          //查询按钮
          this.pageChange(1,10);
        },
        clearSearch() {
            //清空查询条件
            this.payDate = [];
            this.importDate= [];
            this.form = {
                deptId: [],
                costType: [],
                applicantName: "",
                costTimeE: "", //支付时间
                costTimeS: "",
                inTimeE: "",  //导出时间
                inTimeS: "",
                maxAmount: "",
                minAmount: "",
                pageNum: 1,
                pageSize: 10,
                projectCode: ""
            }
        },
        delete(data) {
            //删除
            let that = this;
            let form = "ids=" + data;
            this.$Modal.confirm({
                title: "提示信息",
                content: "您确定删除？",
                onOk: () => {
                    axios({
                        url: "/finance/directCost/delete",
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
            //批量删除
            if (this.selectionId.length < 1) {
                this.$Message.warning("请选择要删除的数据！！！");
            } else {
                this.delete(this.selectionId);
            }
        },
        selection(data) {
            //列表勾选事件
            this.selectionId = [];
            data.map(item => {
                this.selectionId.push(item.id);
            });
        }
    }
};
</script>
