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
            当前位置：财务报表&nbsp;&nbsp;>>&nbsp;&nbsp;合同执行情况&nbsp;&nbsp;
        </Row>
        </Col>
        <Col span="24" class="search-form">
        <Form ref="addForm" :label-width="100" class="my-account-conter">
            <Row>
                <Col span="8">
                <FormItem label="报告编号:">
                    <Input class="search-input" v-model="params.reportCode"></Input>
                </FormItem>
                </Col>
                <Col span="8">
                <FormItem label="统计时间:">
                    <DatePicker type="daterange" v-model="dateRange" class="search-input" placeholder="选择时间段" @on-change="dateChange"></DatePicker>
                </FormItem>
                </Col>
                <Col span="8">
                <FormItem label="编辑部门:">
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
            </Row>
            <Row>
                <Col span="8">
                <FormItem label="合同编号:">
                    <Input class="search-input" v-model="params.contractNo"></Input>
                </FormItem>
                </Col>
                <Col span="8">
                <FormItem label="报告金额:">
                    <Col span="11">
                    <Input v-model="params.reportAmountMin" class="search-input" placeholder="请输入最小金额" @on-blur="validatePrice"></Input>
                    </Col>
                    <Col span="2" class="text-center">--</Col>
                    <Col span="11">
                    <Input v-model="params.reportAmountMax" class="search-input" placeholder="请输入最大金额" @on-blur="validatePrice1"></Input>
                    </Col>
                </FormItem>
                </Col>
                <Col span="8">
                <FormItem label="编辑人员:">
                    <Select v-model="params.employeeId" filterable remote :remote-method="getEmployeeSelect" :loading="loading1">
                        <Option v-for="(option, index) in employeeOptions" :value="option.value" :key="index">{{option.label}}</Option>
                    </Select>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="24" class="text-right mrb-10">
                <Button type="primary" @click="search">查询</Button>
                <Button style="margin-left:8px;" @click="reset">重置</Button>
                </Col>
            </Row>
        </Form>
        </Col>
        <Col span="24" class="mar-top-20">
        <Row class-name="table-con">
            <Col span="12 mrb-10">
            <Button type="primary" @click="totalExportExcle">汇总导出</Button>
            </Col>
             <Col span="12" class="text-right font-14">
            报告总金额：<span class="font-c-blue mar-r-10">{{formatPrice(totalDetail.sumReportAmount)}}</span>
            报告总成本: <span class="font-c-blue mar-r-10">{{formatPrice(totalDetail.sumCostAmount)}}</span>
            编辑总收入: <span class="font-c-blue">{{formatPrice(totalDetail.sumEditorAmount)}}</span>
            </Col>
            <Col span="24">
            <Table class="TableCommon" :data="tableData" :columns="columns" ref="dragTable" :loading="loading2" :stripe="true" :border="true"></Table>
            <div class="page-con">
                <span>第{{pageNum}}页 / 共{{Math.ceil(pageTotal / pageSize)}}页 每页{{pageSize}}条 共{{pageTotal}}条</span>
                <Page :total="pageTotal" :page-size="pageSize" show-sizer show-elevator :page-size-opts="pageSizeOpt" @on-change="changePageNum" @on-page-size-change="changePageSize" class="pull-right" />
            </div>
            </Col>
        </Row>
        </Col>
        </Col>
    </Row>
</template>

<script>
import axios from 'axios'
import oilPage from "../../components/page/page.vue";
import { formatThousandPrice, formData } from "../../../assets/js/common.js";
import { efcontractexecutionListAmountCount, efcontractexecutionListPage, efcontractexecutionProductList, pfCommonTreeDeptTreet } from "@/view/components/axios/report.js"
export default {
    name: "editExtractReport",
    components: {
        oilPage
    },
    data() {
        return {
            params: {
                accountAckStatus: '',
                contractNo: '',
                creatorDeptIdList: [],
                creatorId: '',
                effectiveTimeEnd: '',
                effectiveTimeStart: '',
                invoiceStatus: '',
                memberId: '',
                totalAmountMax: '',
                totalAmountMin: '',
                pageNum: 1,
                pageSize: 10
            },
            fromEmployee: false,
            detailEmployeeId: '',
            deptName: '',
            showDept: false,
            deptIdList: [],
            employeeOptions: [],
            dateRange: [],
            totalDetail: '',
            pageSizeOpt: [10, 15, 20, 40, 50, 100],
            pageNum: 1,
            pageTotal: 0,
            pageSize: 10,
            tableData: [],
            columns: [
                {
                    key: "",
                    title: "序号",
                    align: "center",
                    minWidth: 60,
                    width: 60,
                    render: (h, data) => {
                        return h('span', {}, data.index + 1)
                    }
                },
                {
                    key: "contractNo",
                    title: "合同编号",
                    align: "center",
                    minWidth: 140,
                    render: (h, data) => {
                        return h('span', {
                            style: {
                                color: "blue",
                                textDecoration: "underline",
                                cursor: "pointer"
                            },
                            on: {
                                click: () => {
                                }
                            }
                        }, data.row.contractNo)
                    }
                },
                {
                    key: "contractName",
                    title: "合同名称",
                    align: "center",
                    minWidth: 140
                },
                {
                    key: "effectiveTimeDesc",
                    title: "合同确认时间",
                    align: "center",
                    minWidth: 140
                },
                {
                    key: "partA",
                    title: "客户名称",
                    align: "center",
                    minWidth: 150
                },
                {
                    key: "",
                    title: "产品信息",
                    align: "center",
                    minWidth: 140,
                    render: (h, data) => {
                        return h('span', {
                            style: {
                                color: "blue",
                                textDecoration: "underline",
                                cursor: "pointer"
                            },
                            on: {
                                click: () => {
                                }
                            }
                        }, '查看')
                    }
                },
                {
                    key: "creatorName",
                    title: "业务员",
                    align: "center",
                    minWidth: 140
                },
                {
                    key: "creatorDeptName",
                    title: "所在部门",
                    align: "center",
                    minWidth: 140
                },
                {
                    key: "totalAmount",
                    title: "合同总金额",
                    align: "center",
                    minWidth: 140,
                    render: (h, data) => {
                        return h('span', {
                            style: {}
                        }, formatThousandPrice(data.row.totalAmount))
                    }
                },
                {
                    key: "refundAmount",
                    title: "合同退款金额",
                    align: "center",
                    minWidth: 140,
                    render: (h, data) => {
                        return h('span', {
                            style: {}
                        }, formatThousandPrice(data.row.refundAmount))
                    }
                },
                {
                    key: "ackAmount",
                    title: "合同认账金额",
                    align: "center",
                    minWidth: 140,
                    render: (h, data) => {
                        return h('span', {
                            style: {}
                        }, formatThousandPrice(data.row.ackAmount))
                    }
                },
                {
                    key: "newAmount",
                    title: "新入金额",
                    align: "center",
                    minWidth: 140,
                    render: (h, data) => {
                        return h('span', {
                            style: {}
                        }, formatThousandPrice(data.row.newAmount))
                    }
                },
                {
                    key: "oldAmount",
                    title: "续入金额",
                    align: "center",
                    minWidth: 140,
                    render: (h, data) => {
                        return h('span', {
                            style: {}
                        }, formatThousandPrice(data.row.oldAmount))
                    }
                },
                {
                    key: "confAmount",
                    title: "会议金额",
                    align: "center",
                    minWidth: 140,
                    render: (h, data) => {
                        return h('span', {
                            style: {}
                        }, formatThousandPrice(data.row.confAmount))
                    }
                },
                {
                    key: "invoiceAmount",
                    title: "开票金额",
                    align: "center",
                    minWidth: 140,
                    render: (h, data) => {
                        return h('span', {
                            style: {}
                        }, formatThousandPrice(data.row.invoiceAmount))
                    }
                },
                {
                    key: "actualAmount",
                    title: "实际应收款",
                    align: "center",
                    minWidth: 140,
                    render: (h, data) => {
                        return h('span', {
                            style: {}
                        }, formatThousandPrice(data.row.actualAmount))
                    }
                },
                {
                    key: "accountAmount",
                    title: "账面应收款",
                    align: "center",
                    minWidth: 140,
                    render: (h, data) => {
                        return h('span', {
                            style: {}
                        }, formatThousandPrice(data.row.accountAmount))
                    }
                },
            ],
            loading1: false,
            loading2: false,
        }
    },
    created() {
        this.getSelectList();
        this.changePageNum(1);
        this.changePageNum1(1);
    },
    methods: {
        search() {
            this.fromEmployee = false
            this.pageSize = 10;
            this.pageSize1 = 10;
            this.changePageNum(1);
            this.changePageNum1(1);
        },
        reset() {
            this.params = {
                contractNo: '',
                employeeId: '',
                orgIds: [],
                reportAmountMax: '',
                reportAmountMin: '',
                reportCode: '',
                reportName: '',
                reportTimeEnd: '',
                reportTimeStart: '',
                pageNum: 1,
                pageSize: 10
            }
            this.deptName = '';
            this.dateRange = [];
        },

        //改变汇总列表页码
        changePageNum(current) {
            this.pageNum = current;
            this.getSumList();
        },

        //改变明细列表页码
        changePageNum1(current) {
            this.pageNum1 = current;
            this.getDetailList();
        },

        // 监听修改汇总显示条数
        changePageSize(size) {
            this.pageSize = size;
            this.getSumList();
        },

        // 监听修改明细显示条数
        changePageSize1(size) {
            this.pageSize1 = size;
            this.getDetailList();
        },

        //汇总列表
        getSumList() {
            let param = JSON.parse(JSON.stringify(this.params));
            param.pageNum = this.pageNum;
            param.pageSize = this.pageSize;
            this.loading2 = true;
            bjbgExtractListPage(param).then(res => {
                this.loading2 = false;
                if (res.status == 200) {
                    this.tableData = res.response.list ? res.response.list : [];
                    this.pageTotal = res.response.total;
                } else {
                    this.$Message.warning(res.message);
                }
            })
        },

        //汇总导出
        totalExportExcle() {
            axios({
                url: "/report/bjbgExtract/export_list",
                method: "get",
                params: this.params
            }).then(res => {
                if (res.data.status === "500") {
                    this.$Message.warning(res.data.message);
                } else {
                    let form_data = formData(this.params);
                    window.location.href = '/report/bjbgExtract/export_list?' + form_data;
                }
            })
        },

        validatePrice() {
            if (isNaN(Number(this.params.reportAmountMin))) {
                this.params.reportAmountMin = "";
            }
        },
        validatePrice1() {
            if (isNaN(Number(this.params.reportAmountMax))) {
                this.params.reportAmountMax = "";
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
            this.deptName = deptLabel.join('/');
            this.params.orgIds = deptId;
        },
        openModal() {
            this.showDept = true;
            this.getSelectList();
        },
        getSelectList() {
            if (this.deptName == '') {
                pfCommonTreeDeptTree().then(res => {
                    this.deptIdList = JSON.parse(res.response).map(item => {
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
                                            title: childItem.label
                                        }
                                    })
                                }
                            })
                        }
                    });
                })
            }
        },

        //获取编辑人员
        getEmployeeSelect(val) {
            this.loading1 = true;
            pfCommonTreeEmployeeSelect({
                name: val
            }).then(res => {
                this.loading1 = false;
                if (res.status == 200) {
                    this.employeeOptions = (res.response ? res.response : []).map(item => {
                        return {
                            value: item.key,
                            label: item.value
                        }
                    });
                } else {
                    this.$Message.warning(res.message)
                }
            }).catch(err => {
                this.$Message.warning(err.message)
            })
        },
        dateChange() {
            this.params.reportTimeStart = this.dateRange ? new Date(this.dateRange[0]).getTime() : '';
            this.params.reportTimeEnd = this.dateRange ? new Date(this.dateRange[1]).getTime() + 24 * 60 * 60 * 1000 - 1000 : '';
        },
        formatPrice(val) {
            return formatThousandPrice(val);
        },
    }

}
</script>


