<style lang="less" scoped>
</style>

<template>
    <Row class="product-opening-out">
        <Col span="24">
        <Row class-name="current-position">
            当前位置：财务管理&nbsp;&nbsp;>>&nbsp;&nbsp;产品开通
        </Row>
        </Col>
        <Col span="24" class-name="search-form">
        <Form :model="form" :label-width="80">
            <Row type="flex" justify="space-between">
                <Col span="7">
                <FormItem label="合同编号:">
                    <Input v-model="form.contractNo" class="search-input" placeholder="请输入合同编号"></Input>
                </FormItem>
                </Col>
                <Col span="7">
                <FormItem label="合同名称:">
                    <Input v-model="form.name" class="search-input" placeholder="请输入合同名称"></Input>
                </FormItem>
                </Col>
                <Col span="7">
                <FormItem label="客户名称:">
                    <select-member @query-list="getMember" :defailModel='form.memberId' ref="memberModal"></select-member>
                </FormItem>
                </Col>
            </Row>
            <Row type="flex" justify="space-between">
                <Col span="7">
                <FormItem label="开通状态:">
                    <Select v-model="form.openStatus" class="search-input">
                        <Option value="">全部</Option>
                        <Option v-for="item in openList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                </Col>
                <Col span="7">
                <FormItem label="合同状态:">
                    <Select v-model="form.contractStatus" class="search-input" @on-open-change="getContractStatus">
                        <Option v-for="item in arrStatus" :value="item.value" :key="item.value">{{ item.desc }}</Option>
                    </Select>
                </FormItem>
                </Col>
                <Col span="7" class="text-right">
                <FormItem label="合同金额:">
                    <Col span="11">
                    <Input v-model="form.minContractTotalAmount" class="search-input" placeholder="请输入最小值" @on-keyup="numberInput(form.minContractTotalAmount,'min')"></Input>
                    </Col>
                    <Col span="2" class="text-center">--</Col>
                    <Col span="11">
                    <Input v-model="form.maxContractTotalAmount" class="search-input" placeholder="请输入最大值" @on-keyup="numberInput(form.maxContractTotalAmount,'max')"></Input>
                    </Col>
                </FormItem>
                </Col>
            </Row>
            <Row type="flex" justify="space-between">
                <Col span="7">
                <FormItem label="业务员:">
                    <Input v-model="form.creatorName" class="search-input" placeholder="请输入业务员名称"></Input>
                </FormItem>
                </Col>
                <Col span="7">
                <FormItem label="所在部门:">
                    <select-department @data-list="getDepData" :emptyModel="form.deptId"></select-department>
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
        <Row class="table-con">
            <Table class="tableCommon" :data="tableData" :columns="columns" ref="dragTable" :stripe="true" :border="true"></Table>
            <oil-page :total="total" :page-num="form.pageNum" :page-size="form.pageSize" @page-change="pageChange" :page-size-opts="pageSizeOpts" :show-sizer="showSizer"></oil-page>
        </Row>
        </Col>
    </Row>
</template>

<script>
import axios from "axios";
import { getProductOpeningList } from "../../components/axios/finance.js";
import { formatThousandPrice } from '../../../assets/js/common';
import OilPage from "../../components/page/page.vue";
import SelectMember from "../../components/finance/selectMember.vue";
import SelectAll from "../../components/finance/selectAll.vue";
import SelectDepartment from "../../components/finance/selectDepartment.vue";
export default {
    name: "blackList",
    components: {
        OilPage,
        SelectAll,
        SelectDepartment,
        SelectMember
    },
    data() {
        return {
            contractType: "ContractStatusEnum",
            loading: false,
            arrStatus: [],
            form: {
                contractNo: "",
                name: "",
                memberId: null,
                openStatus: "",
                contractStatus: "",
                maxContractTotalAmount: "",
                minContractTotalAmount: "",
                creatorName: "",
                deptId: [],
                pageNum: 1,
                pageSize: 10
            },
            openList: [
                {
                    value: "全部开通",
                    label: "全部开通"
                },
                {
                    value: "部分开通",
                    label: "部分开通"
                },
                {
                    value: "未开通",
                    label: "未开通"
                }
            ],
            total: 0,
            pageSizeOpts: [10,15,20,40,50,100],
            showSizer: true,
            customerNameList: [],
            columns: [
                {
                    key: "contractNo",
                    align: "center",
                    title: "合同编号",
                    minWidth: 140,
                    render: (h, data) => {
                        return h("div", [
                            h(
                                "span",
                                {
                                    style: {
                                        marginRight: "8px",
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
                            )
                        ]);
                    }
                },
                {
                    key: "name",
                    align: "center",
                    title: "合同名称",
                    minWidth: 150
                },
                {
                    key: "partA",
                    align: "center",
                    title: "客户名称",
                    tooltip: true,
                    ellipsis: true,
                    minWidth: 160
                },
                {
                    key: "contractTotalAmount",
                    align: "center",
                    title: "合同总金额",
                    minWidth: 100,
                    render: (h, data) => {
                        return h('div', [
                            h('span', {
                                style: {
                                },
                            }, formatThousandPrice(data.row.contractTotalAmount))
                        ])
                    }
                },
                {
                    key: "contractStatus",
                    align: "center",
                    title: "合同状态",
                    minWidth: 80
                },
                {
                    key: "openStatus",
                    align: "center",
                    title: "开通状态",
                    minWidth: 90
                },
                {
                    key: "creatorName",
                    align: "center",
                    title: "业务员",
                    minWidth: 80
                },
                {
                    key: "deptName",
                    align: "center",
                    title: "所在部门",
                    minWidth: 90
                },
                {
                    title: "操作",
                    align: "center",
                    minWidth: 90,
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
                                            this.details(
                                                data.row.id,
                                                data.row.openStatus
                                            );
                                        }
                                    }
                                },
                                "详情"
                            )
                        ]);
                    }
                }
            ],
            tableData: []
        };
    },
    created() {
        this.getList();
    },
    methods: {
        //金额只允许输入数字
        numberInput(value, type) {
            if (value != "") {
                if (type == "min") {
                    this.form.minContractTotalAmount = value.replace(/[^\d.]/g, "");
                }
                if (type == "max") {
                    this.form.maxContractTotalAmount = value.replace(/[^\d.]/g, "");
                }
            }
        },
        goheCode(contractNo) {
            let routeData = this.$router.resolve({
                name: "checkContact",
                query: {
                    contractCode: contractNo
                }
            });
            window.open(routeData.href, '_blank');
        },
        getList() {
            //获取列表信息
            let that = this;
     
            this.form.times = new Date().getTime();
            getProductOpeningList(this.form).then(res => {
                that.total = res.response.total;
                if (res.response.list) {
                    that.tableData = res.response.list;
                } else {
                    that.tableData = [];
                }
                that.$Spin.hide();
            });
        },
        pageChange(page, pageSize) {
            //分页
            if (page) {
                this.form.pageNum = page;
            }
            if (pageSize) {
                this.form.pageSize = pageSize;
            }
            this.getList();
        },
        search() {
            //查询按钮
            this.pageChange(1, 10);
        },
        clearSearch() {
            //重置
            this.$refs.memberModal.clearMemberQuery();
            this.form.contractNo = "";
            this.form.name = "";
            this.form.memberId = null;
            this.form.openStatus = "";
            this.form.contractStatus = "";
            this.form.maxContractTotalAmount = "";
            this.form.minContractTotalAmount = "";
            this.form.creatorName = "";
            this.form.deptId = [];
            this.form.pageNum = 1;
        },
        // 客户名称搜索
        getMember(data) {
            if (data) {
                this.form.memberId = data.value;
            } else {
                this.form.memberId = null;
            }
            this.getCustomList();
        },
        //获取客户列表
        getCustomList(st) {
            var that = this;
            axios({
                url: "/finance/common/selectMember",
                method: "get",
                params: {
                    memberName: st ? st : ""
                }
            })
                .then(function (res) {
                    console.log(res);
                    if (res.data.status == 200) {
                        that.customList = res.data.response;
                    }
                    that.$Spin.hide();
                })
                .catch(err => {
                    console.log(err);
                    that.$Spin.hide();
                });
        },
        //获取合同状态
        getContractStatus(data) {
            let that = this;
            let params = {
                type: "AckContractStatusEnum"
            };
            axios({
                url: "/finance/common/select",
                method: "get",
                params
            })
                .then(function (res) {
                    if (res.status == 200) {
                        that.arrStatus = [];
                        res.data.response.map((item)=>{
                            if(item.desc != '作废'){
                                that.arrStatus.push(item)
                            }
                        })

                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        getDepData(deptLabel, deptId, deptCode) {
            this.form.deptId = deptId;
        },
        details(data, openStatus) {
            //详情
            this.$router.push({
                name: "productOpeningDetail",
                query: {
                    id: data,
                    openStatus: openStatus
                }
            });
        }
    }
};
</script>
