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
        line-height: 28px;
        margin-bottom: 5px;
    }

    .font-c-blue {
        color: #145edb;
    }

    .mrb-10 {
        margin-bottom: 10px;
    }

    .money-row{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 840px;
        float: right;
    }
    .money-item{
        text-align: left;
        width: 210px;
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
                <FormItem label="合同编号:">
                    <Input class="search-input" v-model="params.contractNo"></Input>
                </FormItem>
                </Col>
                <Col span="8">
                <FormItem label="会员名称:">
                    <Select ref="memeberSelect" v-model="params.memberId" filterable remote :remote-method="getMemberId" :loading="loading2">
                        <Option v-for="(option, index) in memeberList" :value="option.value" :key="index">{{option.label}}</Option>
                    </Select>
                </FormItem>
                </Col>
                <Col span="8">
                <FormItem label="合同确认时间:">
                    <DatePicker type="daterange" :clearable="clearData" v-model="dateRange" class="search-input" placeholder="选择时间段" @on-change="dateChange"></DatePicker>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="8">
                <FormItem label="业务员:">
                    <Select ref="creatorSelect" v-model="params.creatorId" filterable remote :remote-method="getCreatorId" :loading="loading3">
                        <Option v-for="(option, index) in creatorList" :value="option.value" :key="index">{{option.label}}</Option>
                    </Select>
                </FormItem>
                </Col>
                <Col span="8">
                <FormItem label="所在部门:">
                    <Input v-model="deptName" class="search-input" readonly @on-focus="openModal" placeholder="请选择编辑部门"></Input>
                    <Modal v-model="showDept" title="请选择所在部门" @on-cancel="cancel">
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
                <Col span="8">
                <FormItem label="合同总金额:">
                    <Col span="11">
                    <Input v-model="params.totalAmountMin" class="search-input" placeholder="请输入最小金额" @on-blur="validatePrice"></Input>
                    </Col>
                    <Col span="2" class="text-center">--</Col>
                    <Col span="11">
                    <Input v-model="params.totalAmountMax" class="search-input" placeholder="请输入最大金额" @on-blur="validatePrice1"></Input>
                    </Col>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="8">
                <FormItem label="认账情况:">
                    <Select v-model="params.accountAckStatus">
                        <Option v-for="item in accountAckList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                </Col>
                <Col span="8">
                <FormItem label="开票情况:">
                    <Select v-model="params.invoiceStatus">
                        <Option v-for="item in invoiceList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
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
            <Col span="2 mrb-10">
            <Button type="primary" @click="exportExcle" :loading="exporting">导出</Button>
            </Col>
            <Col span="22" class="text-right font-14">
            <div class="money-row">
                <div class="money-item">
                    <div>合同总金额:
                        <span class="font-c-blue mar-r-10">{{formatPrice(amountStatistics.totalAmountCount)}}</span>
                    </div>
                    <div> 累计退款金额:
                        <span class="font-c-blue mar-r-10">{{formatPrice(amountStatistics.refundAmountCount)}}</span>
                    </div>
                </div>
                <div class="money-item">
                    <div>累计认账金额:
                        <span class="font-c-blue mar-r-10">{{formatPrice(amountStatistics.ackAmountCount)}}</span>
                    </div>
                    <div> 累计开票金额:
                        <span class="font-c-blue mar-r-10">{{formatPrice(amountStatistics.invoiceAmountCount)}}</span>
                    </div>
                </div>
                <div class="money-item">
                    <div> 累计新入:
                        <span class="font-c-blue mar-r-10">{{formatPrice(amountStatistics.newAmountCount)}}</span>
                    </div>
                    <div> 累计续入:
                        <span class="font-c-blue mar-r-10">{{formatPrice(amountStatistics.oldAmountCount)}}</span>
                    </div>
                </div>
                <div class="money-item">
                    <div> 实际应收:
                        <span class="font-c-blue mar-r-10">{{formatPrice(amountStatistics.actualAmountCount)}}</span>
                    </div> 账面应收款:
                    <span class="font-c-blue mar-r-10">{{formatPrice(amountStatistics.accountAmountCount)}}</span>
                </div>
            </div>

            </Col>
            <Col span="24">
            <Table class="TableCommon" :data="tableData" :columns="columns" ref="dragTable" :loading="loading1" :stripe="true" :border="true"></Table>
            <div class="page-con">
                <span>第{{pageNum}}页 / 共{{Math.ceil(pageTotal / pageSize)}}页 每页{{pageSize}}条 共{{pageTotal}}条</span>
                <Page :total="pageTotal" :current="pageNum" :page-size="pageSize" show-sizer show-elevator :page-size-opts="pageSizeOpt"
                    @on-change="changePageNum" @on-page-size-change="changePageSize" class="pull-right" />
            </div>
            </Col>
        </Row>
        </Col>
        <Col span="24">
        <Modal :footer-hide="true" v-model="detailModal" title="关联产品详情" width="800">
            <Row>
                <Col span="24" class="mar-t-20">
                <Table class="tableCommon" :data="detailTableData" :columns="detailColumns" ref="dragTable" :stripe="true" :border="true"></Table>
                </Col>
            </Row>
            <Row>
                <Col span="24" class="text-center mar-t-20">
                <Button type="primary" @click="detailModal=false">关闭</Button>
                </Col>
            </Row>
        </Modal>
        </Col>
        </Col>
    </Row>
</template>

<script>
    import axios from "axios";
    import oilPage from "@/view/components/page/page.vue";
    import {
        formatThousandPrice,
        formData,
        formatTime
    } from "@/assets/js/common.js";
    import {
        efcontractexecutionListAmountCount,
        efcontractexecutionListPage,
        efcontractexecutionProductList,
        pfCommonTreeDeptTree,
        pfCommonTreeEmployeeSelect,
        pfCommonTreeMemberSelect
    } from "@/view/components/axios/report.js";
    export default {
        name: "contractExecutionReport",
        components: {
            oilPage
        },
        data() {
            return {
                clearData: false,
                exporting: false,
                params: {
                    accountAckStatus: "",
                    contractNo: "",
                    creatorDeptIdList: [],
                    creatorId: "",
                    effectiveTimeEnd: "",
                    effectiveTimeStart: "",
                    invoiceStatus: "",
                    memberId: "",
                    totalAmountMax: "",
                    totalAmountMin: "",
                    pageNum: 1,
                    pageSize: 10
                },
                memeberList: [],
                creatorList: [],
                accountAckList: [
                    {
                        value: 0,
                        label: "未认账"
                    },
                    {
                        value: 1,
                        label: "部分认账"
                    },
                    {
                        value: 2,
                        label: "完全认账"
                    }
                ],
                invoiceList: [
                    {
                        value: 0,
                        label: "未开票"
                    },
                    {
                        value: 1,
                        label: "部分开票"
                    },
                    {
                        value: 2,
                        label: "完全开票"
                    }
                ],
                deptName: "",
                showDept: false,
                deptIdList: [],
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
                        title: "序号",
                        align: "center",
                        minWidth: 60,
                        width: 60,
                        render: (h, data) => {
                            return h(
                                "span",
                                {},
                                (this.pageNum - 1) * this.pageSize + data.index + 1
                            );
                        }
                    },
                    {
                        key: "contractNo",
                        title: "合同编号",
                        align: "center",
                        minWidth: 160,
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
                                            this.goheCode(data.row.contractNo);
                                        }
                                    }
                                },
                                data.row.contractNo
                            );
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
                        minWidth: 170
                    },
                    {
                        key: "",
                        title: "产品信息",
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
                                            this.getProducetList(data.row.contractNo);
                                        }
                                    }
                                },
                                "查看"
                            );
                        }
                    },
                    {
                        key: "creatorName",
                        title: "业务员",
                        align: "center",
                        minWidth: 100
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
                            return h(
                                "span",
                                {
                                    style: {}
                                },
                                formatThousandPrice(data.row.totalAmount)
                            );
                        }
                    },
                    {
                        key: "refundAmount",
                        title: "合同退款金额",
                        align: "center",
                        minWidth: 140,
                        render: (h, data) => {
                            return h(
                                "span",
                                {
                                    style: {}
                                },
                                formatThousandPrice(data.row.refundAmount)
                            );
                        }
                    },
                    {
                        key: "ackAmount",
                        title: "合同认账金额",
                        align: "center",
                        minWidth: 140,
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
                                            this.goToAckList(data.row.contractNo);
                                        }
                                    }
                                },
                                formatThousandPrice(data.row.ackAmount)
                            );
                        }
                    },
                    {
                        key: "newAmount",
                        title: "新入金额",
                        align: "center",
                        minWidth: 140,
                        render: (h, data) => {
                            return h(
                                "span",
                                {
                                    style: {}
                                },
                                formatThousandPrice(data.row.newAmount)
                            );
                        }
                    },
                    {
                        key: "oldAmount",
                        title: "续入金额",
                        align: "center",
                        minWidth: 140,
                        render: (h, data) => {
                            return h(
                                "span",
                                {
                                    style: {}
                                },
                                formatThousandPrice(data.row.oldAmount)
                            );
                        }
                    },
                    {
                        key: "confAmount",
                        title: "会议金额",
                        align: "center",
                        minWidth: 140,
                        render: (h, data) => {
                            return h(
                                "span",
                                {
                                    style: {}
                                },
                                formatThousandPrice(data.row.confAmount)
                            );
                        }
                    },
                    {
                        key: "invoiceAmount",
                        title: "开票金额",
                        align: "center",
                        minWidth: 140,
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
                                            this.goToInvoiceList(data.row.contractNo);
                                        }
                                    }
                                },
                                formatThousandPrice(data.row.invoiceAmount)
                            );
                        }
                    },
                    {
                        key: "actualAmount",
                        title: "实际应收款",
                        align: "center",
                        minWidth: 140,
                        render: (h, data) => {
                            return h(
                                "span",
                                {
                                    style: {}
                                },
                                formatThousandPrice(data.row.actualAmount)
                            );
                        }
                    },
                    {
                        key: "accountAmount",
                        title: "账面应收款",
                        align: "center",
                        minWidth: 140,
                        render: (h, data) => {
                            return h(
                                "span",
                                {
                                    style: {}
                                },
                                formatThousandPrice(data.row.accountAmount)
                            );
                        }
                    }
                ],
                detailModal: false,
                detailTableData: [],
                detailColumns: [
                    {
                        key: "productNameCn",
                        title: "产品名称",
                        align: "center",
                        minWidth: 140
                    },
                    {
                        key: "startTime",
                        title: "服务时段",
                        align: "center",
                        minWidth: 140,
                        render: (h, data) => {
                            return h(
                                "span",
                                {
                                    style: {}
                                },
                                `${formatTime(data.row.startTime)}--${formatTime(
                                    data.row.endTime
                                )}`
                            );
                        }
                    },
                    {
                        key: "subtotalPrice",
                        title: "产品售价",
                        align: "center",
                        minWidth: 140,
                        render: (h, data) => {
                            return h(
                                "span",
                                {
                                    style: {}
                                },
                                formatThousandPrice(data.row.subtotalPrice)
                            );
                        }
                    }
                ],
                loading1: false,
                loading2: false,
                loading3: false
            };
        },
        created() {
            this.initDateRange();
            this.getSelectList();
            this.changePageNum(1);
        },
        methods: {
            search() {
                this.pageSize = 10;
                this.changePageNum(1);
            },
            reset() {
                this.params = {
                    accountAckStatus: "",
                    contractNo: "",
                    creatorDeptIdList: [],
                    creatorId: "",
                    effectiveTimeEnd: "",
                    effectiveTimeStart: "",
                    invoiceStatus: "",
                    memberId: "",
                    totalAmountMax: "",
                    totalAmountMin: "",
                    pageNum: 1,
                    pageSize: 10
                };
                this.$refs.memeberSelect.$data.query = "";
                this.$refs.memeberSelect.clearSingleSelect();
                this.$refs.creatorSelect.$data.query = "";
                this.$refs.creatorSelect.clearSingleSelect();
                this.deptName = "";
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
            getList() {
                let param = JSON.parse(JSON.stringify(this.params));
                param.pageNum = this.pageNum;
                param.pageSize = this.pageSize;
                this.loading1 = true;
                efcontractexecutionListPage(param).then(res => {
                    this.loading1 = false;
                    if (res.status == 200) {
                        this.tableData = res.response.list ? res.response.list : [];
                        this.pageTotal = res.response.total;
                    } else {
                        this.$Message.warning(res.message ? res.message : "");
                    }
                });
                efcontractexecutionListAmountCount(param).then(res => {
                    if (res.status == 200) {
                        this.amountStatistics = res.response;
                    } else {
                        this.$Message.warning(res.message ? res.message : "");
                    }
                });
            },

            //关联产品详情
            getProducetList(contractCode) {
                this.detailModal = true;
                efcontractexecutionProductList({
                    contractCode: contractCode
                }).then(res => {
                    if (res.status == 200) {
                        this.detailTableData = res.response ? res.response : [];
                    } else {
                        this.$Message.warning(res.message ? res.message : "");
                    }
                });
            },
            goToAckList(contractCode) {
                let routeData = this.$router.resolve({
                    name: "contractConfirmReport",
                    query: {
                        contractCode: contractCode
                    }
                });
                window.open(routeData.href, "_blank");
            },
            goToInvoiceList(contractCode) {
                let routeData = this.$router.resolve({
                    name: "contractInvoiceReport",
                    query: {
                        contractCode: contractCode
                    }
                });
                window.open(routeData.href, "_blank");
            },
            goheCode(contractNo) {
                let routeData = this.$router.resolve({
                    name: "waittingCheck",
                    query: {
                        contractCode: contractNo
                    }
                });
                window.open(routeData.href, "_blank");
            },
            exportExcle() {
                this.exporting = true;
                let param = JSON.parse(JSON.stringify(this.params));
                param.creatorDeptIdList = this.params.creatorDeptIdList.join();
                axios({
                    url: "/report/efcontractexecution/export",
                    method: "get",
                    params: param
                }).then(res => {
                    this.exporting = false;
                    if (res.data.status == "100002" || res.data.status == "100053") {
                        this.$Message.warning(res.data.message);
                    } else {
                        const form_data = formData(param);
                        window.location.href =
                            "/report/efcontractexecution/export?" + form_data;
                    }
                });
            },
            //业务员
            getCreatorId(val) {
                this.loading3 = true;
                pfCommonTreeEmployeeSelect({
                    name: val
                })
                    .then(res => {
                        this.loading3 = false;
                        if (res.status == 200) {
                            this.creatorList = (res.response ? res.response : []).map(item => {
                                return {
                                    value: item.key,
                                    label: item.value
                                };
                            });
                        } else {
                            this.$Message.warning(res.message);
                        }
                    })
                    .catch(err => {
                        this.$Message.warning(err.message);
                    });
            },
            getMemberId(val) {
                this.loading2 = true;
                console.log(this.params.memberId);
                pfCommonTreeMemberSelect({
                    memberName: val
                })
                    .then(res => {
                        this.loading2 = false;
                        if (res.status == 200) {
                            this.memeberList = (res.response ? res.response : []).map(item => {
                                return {
                                    value: item.id,
                                    label: item.name
                                };
                            });
                        } else {
                            this.$Message.warning(res.message);
                        }
                    })
                    .catch(err => {
                        this.$Message.warning(err.message);
                    });
            },
            validatePrice() {
                if (isNaN(Number(this.params.totalAmountMin))) {
                    this.params.totalAmountMin = "";
                }
            },
            validatePrice1() {
                if (isNaN(Number(this.params.totalAmountMax))) {
                    this.params.totalAmountMax = "";
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
                this.params.creatorDeptIdList = deptId;
            },
            openModal() {
                this.showDept = true;
                this.getSelectList();
            },
            getSelectList() {
                if (this.deptName == "") {
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
                }
            },
            dateChange() {
                this.params.effectiveTimeStart = this.dateRange
                    ? new Date(this.dateRange[0]).getTime()
                    : "";
                this.params.effectiveTimeEnd = this.dateRange
                    ? new Date(this.dateRange[1]).getTime() + 24 * 60 * 60 * 1000 - 1000
                    : "";
            },
            initDateRange() {
                let currentDate = new Date();
                let nextMonth = currentDate.getMonth() + 1;
                let nextMonthFirstDay = new Date(currentDate.getFullYear(), nextMonth, 1);
                let currentMonthFirstDay = new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth(),
                    1
                );
                let currentMonthLastDay = new Date(nextMonthFirstDay - 1000);
                this.dateRange = [currentMonthFirstDay, currentMonthLastDay];
                this.params.effectiveTimeStart = new Date(this.dateRange[0]).getTime();
                this.params.effectiveTimeEnd = new Date(this.dateRange[1]).getTime();
            },
            formatPrice(val) {
                return formatThousandPrice(val);
            }
        }
    };
</script>