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
            当前位置：财务报表&nbsp;&nbsp;>>&nbsp;&nbsp;到账统计&nbsp;&nbsp;>>每日账务详情
        </Row>
        </Col>
        <Col span="24" class="search-form">
        <Form ref="addForm" :label-width="100" class="my-account-conter">
            <Row>
                <Col span="8">
                <FormItem label="时间:">
                    <DatePicker type="daterange" v-model="dateRange" class="search-input" placeholder="选择时间段" @on-change="dateChange"></DatePicker>
                </FormItem>
                </Col>
                <Col span="16" class="text-right mrb-10">
                <Button type="primary" @click="search">查询</Button>
                <Button style="margin-left:8px;" @click="reset">重置</Button>
                </Col>
            </Row>
        </Form>
        </Col>
        <Col span="24">
        <Row class-name="table-con">
            <Col span="4 mrb-10">
            <Button type="primary" @click="totalExportExcle">汇总导出</Button>
            </Col>
            <Col span="20" class="text-right font-14">
            累计到账金额: <span class="font-c-blue mar-r-10">{{formatPrice(amountStatistics.totalAmount)}}</span>
            累计退款金额: <span class="font-c-blue mar-r-10">{{formatPrice(amountStatistics.refundAmount)}}</span>
            累计认账金额: <span class="font-c-blue mar-r-10">{{formatPrice(amountStatistics.ackAmount)}}</span>
            累计新入金额：<span class="font-c-blue mar-r-10">{{formatPrice(amountStatistics.newAmount)}}</span>
            累计续入金额: <span class="font-c-blue mar-r-10">{{formatPrice(amountStatistics.oldAmount)}}</span>
            累计会议金额: <span class="font-c-blue mar-r-10">{{formatPrice(amountStatistics.confAmount)}}</span>
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
        <Col span="24">
        <Modal :footer-hide="true" v-model="showModal" :title="modalTitle" width="1200">
            <Row>
                <Col span="4">
                <Button type="primary" :loading="detailLoading" @click="detailExportExcle">明细导出</Button>
                </Col>
                <Col span="24" class="mar-t-10">
                <Table class="tableCommon" :data="modalTableData" :columns="modalColumns" :loading="loading2" :stripe="true" :border="true"></Table>
                <div class="page-con">
                    <span>第{{pageNum1}}页 / 共{{Math.ceil(pageTotal1 / pageSize1)}}页 每页{{pageSize1}}条 共{{pageTotal1}}条</span>
                    <Page :total="pageTotal1" :current="pageNum1" :page-size="pageSize1" show-sizer show-elevator :page-size-opts="pageSizeOpt1" @on-change="changePageNum1" @on-page-size-change="changePageSize1" class="pull-right" />
                </div>
                </Col>
            </Row>
            <Row>
                <Col span="24" class="text-center mar-t-20">
                <Button type="primary" @click="showModal=false">关闭</Button>
                </Col>
            </Row>
        </Modal>
        </Col>
        </Col>
    </Row>
</template>

<script>
import axios from 'axios';
import { formatThousandPrice, formDataFilterEmpty, formatTime2 } from "@/assets/js/common.js";
import { efaccounttransferList, efaccounttransferListAckItem, efaccounttransferListItem, efaccounttransferListRefundItem, efaccounttransferListTotal } from "@/view/components/axios/report.js"
export default {
    name: "dailyAccountsDetail",
    data() {
        return {
            params: {
                endTime: '',
                startTime: '',
                pageNum: 1,
                pageSize: 10
            },

            //明细导出参数
            detailParams: {
                endTime: '',
                startTime: '',
                type: 0
            },
            detailLoading: false,
            detailTime: '',
            dateRange: [],
            amountStatistics: '',
            pageSizeOpt: [10, 15, 20, 40, 50, 100],
            pageNum: 1,
            pageTotal: 0,
            pageSize: 10,
            tableData: [],
            columns: [
                {
                    key: "time",
                    title: "日期",
                    align: "center",
                    minWidth: 120
                },
                {
                    key: "totalAmount",
                    title: "当日到账金额",
                    align: "center",
                    minWidth: 160,
                    render: (h, data) => {
                        return h('span', {
                            style: {
                                color: "blue",
                                textDecoration: "underline",
                                cursor: "pointer"
                            },
                            on: {
                                click: () => {
                                    this.showModal = true;
                                    this.pageNum1 = 1;
                                    this.pageSize1 = 10;
                                    this.goTotalAmount(data.row.transferTime);
                                }
                            }
                        }, formatThousandPrice(data.row.totalAmount))
                    }
                },
                {
                    key: "refundAmount",
                    title: "当日退款金额",
                    align: "center",
                    minWidth: 160,
                    render: (h, data) => {
                        return h('span', {
                            style: {
                                color: "blue",
                                textDecoration: "underline",
                                cursor: "pointer"
                            },
                            on: {
                                click: () => {
                                    this.showModal = true;
                                    this.pageNum1 = 1;
                                    this.pageSize1 = 10;
                                    this.goRefundAmount(data.row.transferTime);
                                }
                            }
                        }, formatThousandPrice(data.row.refundAmount))
                    }
                },
                {
                    key: "ackAmount",
                    title: "当日认账金额",
                    align: "center",
                    minWidth: 160,
                    render: (h, data) => {
                        return h('span', {
                            style: {
                                color: "blue",
                                textDecoration: "underline",
                                cursor: "pointer"
                            },
                            on: {
                                click: () => {
                                    this.showModal = true;
                                    this.pageNum1 = 1;
                                    this.pageSize1 = 10;
                                    this.goAckAmount(data.row.transferTime);
                                }
                            }
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
                    key: "partA",
                    title: "会议金额",
                    align: "center",
                    minWidth: 170,
                    render: (h, data) => {
                        return h('span', {
                            style: {}
                        }, formatThousandPrice(data.row.confAmount))
                    }
                }
            ],
            //当日到账金额
            totalAmountColmns: [
                {
                    key: "payTypeDesc",
                    title: "支付方式",
                    align: "center",
                    minWidth: 100,
                },
                {
                    key: "transferNo",
                    title: "交易流水号",
                    align: "center",
                    minWidth: 180,
                },
                {
                    key: "accountTypeDesc",
                    title: "账户类型",
                    align: "center",
                    minWidth: 80,
                },
                {
                    key: "accountNo",
                    title: "帐号",
                    align: "center",
                    minWidth: 180,
                },
                {
                    key: "transferFrom",
                    title: "来源（户名）",
                    align: "center",
                    minWidth: 200,
                },
                {
                    key: "note",
                    title: "备注",
                    align: "center",
                    maxWidth: 200,
                    ellipsis: true,
                    tooltip: true
                },
                {
                    key: "totalAmount",
                    title: "到账金额",
                    align: "center",
                    minWidth: 150,
                    render: (h, data) => {
                        return h('span', {
                            style: {}
                        }, formatThousandPrice(data.row.totalAmount))
                    }
                },
                {
                    key: "refundAmount",
                    title: "退款金额",
                    align: "center",
                    minWidth: 150,
                    render: (h, data) => {
                        return h('span', {
                            style: {}
                        }, formatThousandPrice(data.row.refundAmount))
                    }
                },
                {
                    key: "transferTime",
                    title: "到账时间",
                    align: "center",
                    minWidth: 150,
                    render: (h, data) => {
                        return h('span', {
                            style: {}
                        }, formatTime2(data.row.transferTime))
                    }
                },
                {
                    key: "createTime",
                    title: "导入时间",
                    align: "center",
                    minWidth: 150,
                    render: (h, data) => {
                        return h('span', {
                            style: {}
                        }, formatTime2(data.row.createTime))
                    }
                },
                {
                    key: "createName",
                    title: "导入人",
                    align: "center",
                    minWidth: 100
                }
            ],

            //当日退款金额
            refundAmountColmns: [
                {
                    key: "refundTypeDesc",
                    title: "退款类型",
                    align: "center",
                    minWidth: 100,
                },
                {
                    key: "refundReason",
                    title: "退款原因",
                    align: "center",
                    minWidth: 180,
                },
                {
                    key: "refundTime",
                    title: "退款时间",
                    align: "center",
                    minWidth: 180,
                    render: (h, data) => {
                        return h('span', {
                            style: {}
                        }, formatTime2(data.row.refundTime))
                    }
                },
                {
                    key: "refundAmount",
                    title: "退款金额",
                    align: "center",
                    minWidth: 100,
                    render: (h, data) => {
                        return h('span', {
                            style: {}
                        }, formatThousandPrice(data.row.refundAmount))
                    }
                },
                {
                    key: "contractNo",
                    title: "对应合同编号",
                    align: "center",
                    minWidth: 180
                },
                {
                    key: "adminName",
                    title: "业务员",
                    align: "center",
                    minWidth: 120
                },
                {
                    key: "adminDeptName",
                    title: "所在部门",
                    align: "center",
                    minWidth: 120
                },
                {
                    key: "refundName",
                    title: "操作人",
                    align: "center",
                    minWidth: 100
                }
            ],

            //当日认账金额
            ackAmountColmns: [
                {
                    key: "contractNo",
                    title: "合同编号",
                    align: "center",
                    minWidth: 180,
                    render: (h, data) => {
                        return h('span', {
                            style: {
                                color: "blue",
                                textDecoration: "underline",
                                cursor: "pointer"
                            },
                            on: {
                                click: () => {
                                    this.goheCode(data.row.contractNo);
                                }
                            }
                        }, data.row.contractNo)
                    }
                },
                {
                    key: "contractName",
                    title: "合同名称",
                    align: "center",
                    minWidth: 180,
                },
                {
                    key: "partA",
                    title: "客户名称",
                    align: "center",
                    minWidth: 180,
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
                    key: "statusDesc",
                    title: "合同状态",
                    align: "center",
                    minWidth: 100
                },
                {
                    key: "ackAmount",
                    title: "认账金额",
                    align: "center",
                    minWidth: 120,
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
                    minWidth: 120,
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
                    minWidth: 120,
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
                    minWidth: 120,
                    render: (h, data) => {
                        return h('span', {
                            style: {}
                        }, formatThousandPrice(data.row.confAmount))
                    }
                },
                {
                    key: "ackTime",
                    title: "认账时间",
                    align: "center",
                    minWidth: 180,
                    render: (h, data) => {
                        return h('span', {
                            style: {}
                        }, formatTime2(data.row.ackTime))
                    }
                },
                {
                    key: "adminName",
                    title: "业务员",
                    align: "center",
                    minWidth: 100
                },
                {
                    key: "adminDeptName",
                    title: "所在部门",
                    align: "center",
                    minWidth: 150
                }
            ],
            pageSizeOpt1: [10, 15, 20, 40, 50, 100],
            pageNum1: 1,
            pageTotal1: 0,
            pageSize1: 10,
            showModal: false,
            modalTitle: '',
            modalTableData: [],
            modalColumns: [],
            loading1: false,
            loading2: false,
        }
    },
    created() {
        this.initDateRange();
        this.changePageNum(1);
    },
    methods: {
        search() {
            this.pageSize = 10;
            this.changePageNum(1);
        },
        reset() {
            this.params = {
                endTime: '',
                startTime: '',
                pageNum: 1,
                pageSize: 10
            }
            this.dateRange = [];
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
        changePageNum1(current) {
            this.pageNum1 = current;
            switch (this.detailParams.type) {
                case 1: this.goTotalAmount(this.detailTime);
                    break;
                case 2: this.goRefundAmount(this.detailTime);
                    break;
                case 3: this.goAckAmount(this.detailTime);
                    break;
            }
        },
        changePageSize1(size) {
            this.pageSize1 = size;
            switch (this.detailParams.type) {
                case 1: this.goTotalAmount(this.detailTime);
                    break;
                case 2: this.goRefundAmount(this.detailTime);
                    break;
                case 3: this.goAckAmount(this.detailTime);
                    break;
            }
        },
        getList() {
            let param = JSON.parse(JSON.stringify(this.params));
            param.pageNum = this.pageNum;
            param.pageSize = this.pageSize;
            this.loading1 = true;
            efaccounttransferList(param).then(res => {
                this.loading1 = false;
                if (res.status == 200) {
                    this.tableData = res.response.list ? res.response.list : [];
                    this.pageTotal = res.response.total;
                } else {
                    this.$Message.warning(res.message ? res.message : '');
                }
            })
            efaccounttransferListTotal(param).then(res => {
                if (res.status == 200) {
                    this.amountStatistics = res.response;
                } else {
                    this.$Message.warning(res.message ? res.message : '');
                }
            })
        },
        goTotalAmount(time) {
            this.detailTime = time;
            let startTime = new Date(this.detailTime);
            startTime.setHours(0);
            startTime.setMinutes(0);
            startTime.setSeconds(0);
            let param = {
                startTime: this.detailTime,
                endTime: startTime.getTime() + 24 * 60 * 60 * 1000 - 1000,
                pageNum: this.pageNum1,
                pageSize: this.pageSize1
            };
            this.detailParams.startTime = param.startTime;
            this.detailParams.endTime = param.endTime;
            this.detailParams.type = 1;

            this.modalTitle = '到账明细';
            this.loading2 = true;
            this.modalColumns = this.totalAmountColmns;
            efaccounttransferListItem(param).then(res => {
                this.loading2 = false;
                if (res.status == 200) {
                    this.modalTableData = res.response.list ? res.response.list : [];
                    this.pageTotal1 = res.response.total;
                } else {
                    this.$Message.warning(res.message ? res.message : '');
                }
            })
        },
        goRefundAmount(time) {
            this.detailTime = time;
            let startTime = new Date(this.detailTime);
            startTime.setHours(0)
            startTime.setMinutes(0);
            startTime.setSeconds(0);
            let param = {
                startTime: this.detailTime,
                endTime: startTime.getTime() + 24 * 60 * 60 * 1000 - 1000,
                pageNum: this.pageNum1,
                pageSize: this.pageSize1
            };
            this.detailParams.startTime = param.startTime;
            this.detailParams.endTime = param.endTime;
            this.detailParams.type = 2;

            this.modalTitle = '退款明细';
            this.loading2 = true;
            this.modalColumns = this.refundAmountColmns;
            efaccounttransferListRefundItem(param).then(res => {
                this.loading2 = false;
                if (res.status == 200) {
                    this.modalTableData = res.response.list ? res.response.list : [];
                    this.pageTotal1 = res.response.total;
                } else {
                    this.$Message.warning(res.message ? res.message : '');
                }
            })
        },
        goAckAmount(time) {
            this.detailTime = time;
            let startTime = new Date(this.detailTime);
            startTime.setHours(0)
            startTime.setMinutes(0);
            startTime.setSeconds(0);
            let param = {
                startTime: this.detailTime,
                endTime: startTime.getTime() + 24 * 60 * 60 * 1000 - 1000,
                pageNum: this.pageNum1,
                pageSize: this.pageSize1
            };
            this.detailParams.startTime = param.startTime;
            this.detailParams.endTime = param.endTime;
            this.detailParams.type = 3;

            this.modalTitle = '认账明细';
            this.loading2 = true;
            this.modalColumns = this.ackAmountColmns;
            efaccounttransferListAckItem(param).then(res => {
                this.loading2 = false;
                if (res.status == 200) {
                    this.modalTableData = res.response.list ? res.response.list : [];
                    this.pageTotal1 = res.response.total;
                } else {
                    this.$Message.warning(res.message ? res.message : '');
                }
            })
        },
        goheCode(contractNo) {
            let routeData = this.$router.resolve({
                name: "waittingCheck",
                query: {
                    contractCode: contractNo
                }
            });
            window.open(routeData.href, '_blank');
        },
        totalExportExcle() {
            axios({
                url: "/report/efaccounttransfer/tansfer_export",
                method: "get",
                params: this.params
            }).then(res => {
                if (res.data.status === "500" || res.data.status === "100053") {
                    this.$Message.warning(res.data.message ? res.data.message : '');
                } else {
                    let form_data = formDataFilterEmpty(this.params);
                    window.location.href = '/report/efaccounttransfer/tansfer_export?' + form_data;
                }
            })
        },
        detailExportExcle() {
            let param = JSON.parse(JSON.stringify(this.detailParams));
            this.detailLoading = true;
            axios({
                url: "/report/efaccounttransfer/tansfer_item_export",
                method: "get",
                params: param
            }).then(res => {
                if (res.data.status === "500" || res.data.status === "100053") {
                    this.$Message.warning(res.data.message ? res.data.message : '');
                } else {
                    this.detailLoading = false;
                    let form_data = formDataFilterEmpty(param);
                    window.location.href = '/report/efaccounttransfer/tansfer_item_export?' + form_data;
                }
            })
        },
        dateChange() {
            this.params.startTime = this.dateRange ? new Date(this.dateRange[0]).getTime() : '';
            this.params.endTime = this.dateRange ? new Date(this.dateRange[1]).getTime() + 24 * 60 * 60 * 1000 - 1000 : '';
        },
        initDateRange() {
            let currentDate = new Date();
            let nextMonth = currentDate.getMonth() + 1;
            let nextMonthFirstDay = new Date(currentDate.getFullYear(), nextMonth, 1);
            let currentMonthFirstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
            let currentMonthLastDay = new Date(nextMonthFirstDay - 1000);
            this.dateRange = [currentMonthFirstDay, currentMonthLastDay];
            this.params.startTime = new Date(this.dateRange[0]).getTime();
            this.params.endTime = new Date(this.dateRange[1]).getTime();
        },
        formatPrice(val) {
            return formatThousandPrice(val);
        },
    }

}
</script>


