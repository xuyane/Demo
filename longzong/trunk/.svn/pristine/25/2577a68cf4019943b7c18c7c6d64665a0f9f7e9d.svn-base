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
            当前位置：财务报表&nbsp;&nbsp;>>&nbsp;&nbsp;编辑报告收入统计&nbsp;&nbsp;
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
                    <DatePicker type="daterange" v-model="dateRange" :clearable="falseNum" class="search-input" placeholder="选择时间段" @on-change="dateChange"></DatePicker>
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
                    <Select ref="employeeSelect" v-model="params.employeeId" filterable clearable remote :remote-method="getEmployeeSelect" :loading="loading1">
                        <Option v-for="(option, index) in employeeOptions" :value="option.value" :key="index">{{option.label}}</Option>
                    </Select>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="8">
                <FormItem label="报告名称:">
                    <Input class="search-input" v-model="params.reportName"></Input>
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
            <Col span="24 mrb-10">
            <Button type="primary" @click="totalExportExcle">汇总导出</Button>
            </Col>
            <Col span="24">
            <Table class="TableCommon" :data="totalTableData" :columns="totalColumns" ref="dragTable" :loading="loading2" :stripe="true"
                :border="true"></Table>
            <div class="page-con">
                <span>第{{pageNum}}页 / 共{{Math.ceil(pageTotal / pageSize)}}页 每页{{pageSize}}条 共{{pageTotal}}条</span>
                <Page :total="pageTotal" :current="pageNum" :page-size="pageSize" show-sizer show-elevator :page-size-opts="pageSizeOpt"
                    @on-change="changePageNum" @on-page-size-change="changePageSize" class="pull-right" />
            </div>
            </Col>
        </Row>
        </Col>
        <Col span="24" class="mar-top-20">
        <Row class-name="table-con">
            <Col span="12" class="mrb-10">
            <Button type="primary" @click="detailExportExcle">明细导出</Button>
            </Col>
            <Col span="12" class="text-right font-14"> 报告总金额：
            <span class="font-c-blue mar-r-10">{{formatPrice(totalDetail.sumReportAmount)}}</span>
            报告总成本:
            <span class="font-c-blue mar-r-10">{{formatPrice(totalDetail.sumCostAmount)}}</span>
            编辑总收入:
            <span class="font-c-blue">{{formatPrice(totalDetail.sumEditorAmount)}}</span>
            </Col>
            <br />
            <Col span="24">
            <Table class="TableCommon" :data="detailTableData" :columns="detailColumns" ref="dragTable" :stripe="true" :border="true"
                :loading="loading3"></Table>
            <div class="page-con">
                <span>第{{pageNum1}}页 / 共{{Math.ceil(pageTotal1 / pageSize1)}}页 每页{{pageSize1}}条 共{{pageTotal1}}条</span>
                <Page :total="pageTotal1" :current="pageNum1" :page-size="pageSize1" show-sizer show-elevator :page-size-opts="pageSizeOpt1"
                    @on-change="changePageNum1" @on-page-size-change="changePageSize1" class="pull-right" />
            </div>
            </Col>
        </Row>
        </Col>
    </Row>
</template>

<script>
    import axios from 'axios'
    import oilPage from "../../components/page/page.vue";
    import { formatThousandPrice, formData } from "../../../assets/js/common.js";
    import { bjbgExtractListPage, bjbgExtractListPageDetail, bjbgExtractDetailTotal, pfCommonTreeDeptTree, pfCommonTreeEmployeeSelect } from "@/view/components/axios/report.js"
    export default {
        name: "editExtractReport",
        components: {
            oilPage
        },
        data() {
            return {
                falseNum: false,
                params: {
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
                totalTableData: [],
                totalColumns: [
                    {
                        key: "",
                        title: "排名",
                        align: "center",
                        minWidth: 60,
                        width: 60,
                        render: (h, data) => {
                            return h('span', {}, data.index + 1)
                        }
                    },
                    {
                        key: "editorName",
                        title: "编辑",
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
                                        this.fromEmployee = true;
                                        this.detailEmployeeId = data.row.editorId;
                                        this.params.employeeId = data.row.editorId;
                                        this.changePageNum1(1);
                                        this.toBottom();
                                    }
                                }
                            }, data.row.editorName)
                        }
                    },
                    {
                        key: "orgName",
                        title: "所在部门",
                        align: "center",
                        minWidth: 140
                    },
                    {
                        key: "sumDepecent",
                        title: "总贡献度",
                        align: "center",
                        minWidth: 140
                    },
                    {
                        key: "sumProductAmount",
                        title: "总分成",
                        align: "center",
                        minWidth: 150,
                        render: (h, data) => {
                            return h('span', {
                                style: {}
                            }, formatThousandPrice(data.row.sumProductAmount))
                        }
                    }
                ],
                pageSizeOpt1: [10, 15, 20, 40, 50, 100],
                pageNum1: 1,
                pageTotal1: 0,
                pageSize1: 10,
                detailTableData: [],
                detailColumns: [
                    {
                        key: "reportCode",
                        title: "报告编号",
                        align: "center",
                        minWidth: 120
                    },
                    {
                        key: "reportName",
                        align: "center",
                        title: "报告名称",
                        minWidth: 200
                    },
                    {
                        key: "typeDesc",
                        align: "center",
                        title: "报告类型",
                        minWidth: 100
                    },
                    {
                        key: "employeeName",
                        align: "center",
                        title: "负责业务",
                        minWidth: 100
                    },
                    {
                        key: "contractNo",
                        align: "center",
                        title: "对应合同编号",
                        minWidth: 200
                    },
                    {
                        key: "reportDate",
                        align: "center",
                        title: "报告时间",
                        minWidth: 120
                    },
                    {
                        key: "reportAmount",
                        align: "center",
                        title: "报告金额",
                        minWidth: 100,
                        render: (h, data) => {
                            return h('span', {}, formatThousandPrice(data.row.reportAmount))
                        }
                    },
                    {
                        key: "costAmount",
                        align: "center",
                        title: "报告成本",
                        minWidth: 120,
                        render: (h, data) => {
                            return h('span', {}, formatThousandPrice(data.row.costAmount))
                        }
                    },
                    {
                        key: "productAmount",
                        align: "center",
                        title: "编辑分成",
                        minWidth: 100,
                        render: (h, data) => {
                            return h('span', {}, formatThousandPrice(data.row.productAmount))
                        }
                    },
                    {
                        key: "dePecent",
                        align: "center",
                        minWidth: 150,
                        title: "贡献度"
                    },
                    {
                        key: "editorAmount",
                        align: "center",
                        title: "分配金额",
                        minWidth: 100,
                        render: (h, data) => {
                            return h('span', {
                                style: {}
                            }, formatThousandPrice(data.row.editorAmount))
                        }
                    },
                    {
                        key: "editorName",
                        align: "center",
                        title: "受益人",
                        minWidth: 100,
                        render: (h, data) => {
                            return h('span', {
                                style: {
                                    color: "blue"
                                }
                            }, data.row.editorName)
                        }
                    },
                    {
                        key: "editorOrgName",
                        align: "center",
                        title: "受益人所在部门",
                        minWidth: 200
                    }
                ],
                loading1: false,
                loading2: false,
                loading3: false,
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
                //清空客户名称的搜索词
                this.$refs.employeeSelect.$data.query = "";
                //清空客户下拉单选项
                this.$refs.employeeSelect.clearSingleSelect();
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
                        this.totalTableData = res.response.list ? res.response.list : [];
                        this.pageTotal = res.response.total;
                    } else {
                        this.$Message.warning(res.message);
                    }
                })
            },

            //明细列表
            getDetailList() {
                let param = JSON.parse(JSON.stringify(this.params));
                param.pageNum = this.pageNum1;
                param.pageSize = this.pageSize1;
                this.loading3 = true;
                if (this.fromEmployee) {
                    param.employeeId = this.detailEmployeeId;
                }
                bjbgExtractListPageDetail(param).then(res => {
                    this.loading3 = false;
                    if (res.status == 200) {
                        this.detailTableData = res.response.list ? res.response.list : [];
                        this.pageTotal1 = res.response.total;
                    } else {
                        this.$Message.warning(res.message ? res.message : '');
                    }
                })

                //明细累计查询
                bjbgExtractDetailTotal(param).then(res => {
                    if (res.status == 200) {
                        this.totalDetail = res.response;
                    } else {
                        this.$Message.warning(res.message ? res.message : '');
                    }
                })
            },

            //汇总导出
            totalExportExcle() {
                if (this.pageTotal >= 10000) {
                    this.$Message.warning({
                        content: '数据超过1万条，请分批导出',
                        duration: 2
                    });
                } else if (this.pageTotal <= 0) {
                    this.$Message.warning({
                        content: '无数据',
                        duration: 2
                    })
                } else {
                    if (this.params.reportTimeStart == null) {
                        this.params.reportTimeStart = '';
                    }
                    if (this.params.reportTimeEnd == null) {
                        this.params.reportTimeEnd = '';
                    }
                    let param = JSON.parse(JSON.stringify(this.params))
                    param.orgIds = this.params.orgIds.join();
                    axios({
                        url: "/report/bjbgExtract/export_list",
                        method: "get",
                        params: param
                    }).then(res => {
                        if (res.data.status === "500" || res.data.status === "100053") {
                            this.$Message.warning(res.data.message ? res.data.message : '');
                        } else {
                            let form_data = formData(param);
                            window.location.href = '/report/bjbgExtract/export_list?' + form_data;
                        }
                    })
                }

            },

            //明细导出
            detailExportExcle() {
                // console.log(this.pageTotal1)
                if (this.pageTotal1 >= 10000) {
                    this.$Message.warning({
                        content: '数据超过1万条，请分批导出',
                        duration: 2
                    });
                } else if (this.pageTotal1 <= 0) {
                    this.$Message.warning({
                        content: '无数据',
                        duration: 2
                    })
                } else {
                    if (this.params.reportTimeStart == null) {
                        this.params.reportTimeStart = '';
                    }
                    if (this.params.reportTimeEnd == null) {
                        this.params.reportTimeEnd = '';
                    }
                    let param = JSON.parse(JSON.stringify(this.params))
                    param.orgIds = this.params.orgIds.join();
                    // debugger;
                    axios({
                        url: "/report/bjbgExtract/export_list_detail",
                        method: "get",
                        params: param
                    }).then(res => {
                        if (res.data.status === "500" || res.data.status === "100053") {
                            this.$Message.warning(res.data.message ? res.data.message : '');
                        } else {
                            let form_data = formData(param);
                            window.location.href = '/report/bjbgExtract/export_list_detail?' + form_data;
                        }
                    })
                }

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
                                                                title: fourItem.label,
                                                            }
                                                        })
                                                    }
                                                })
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

            // 定位到明细导出
            toBottom() {
                let scrollObj = document.getElementsByClassName('Main')[0];
                let scrollHeight = scrollObj.scrollHeight;
                let offsetHeight = scrollObj.offsetHeight;
                let minusHeight = scrollHeight - offsetHeight;
                let step = Math.floor(minusHeight / 5);
                let sum = scrollObj.scrollTop;
                let timer = null;
                timer = setInterval(function () {
                    if (sum >= minusHeight) {
                        clearInterval(timer)
                    } else {
                        sum += step;
                        scrollObj.scrollTop = sum;
                    }
                }, 30)
            }
        }

    }
</script>