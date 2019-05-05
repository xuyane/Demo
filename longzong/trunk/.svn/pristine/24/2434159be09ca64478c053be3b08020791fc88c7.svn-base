<style lang="less" scoped>
.mrb-10 {
  margin-bottom: 10px;
}
</style>

<template>
    <Row class="my-saleList-out">
        <Col span="24">
        <Row class-name="current-position">
            当前位置：财务报表&nbsp;&nbsp;>>&nbsp;&nbsp;合同执行情况&nbsp;&nbsp;>>开票明细列表
        </Row>
        </Col>
        <Col span="24">
        <Row class-name="table-con">
            <Col span="24 mrb-10">
            <Button type="primary" @click="exportExcle">导出</Button>
            </Col>
           
            <Col span="24">
            <Table class="TableCommon" :data="tableData" :columns="columns" ref="dragTable" :loading="loading1" :stripe="true" :border="true"></Table>
            </Col>
        </Row>
        </Col>
        </Col>
    </Row>
</template>

<script>
import axios from 'axios'
import { formatThousandPrice, formData } from "@/assets/js/common.js";
import { efcontractexecutionInvoiceItemsList } from "@/view/components/axios/report.js"
export default {
    name: "contractInvoiceReport",
    data() {
        return {
            contractCode: this.$route.query.contractCode,
            tableData: [],
            columns: [
                {
                    key: "invoiceTimeDesc",
                    title: "开票时间",
                    align: "center",
                    minWidth: 140
                },
                {
                    key: "invoiceNum",
                    title: "发票号码",
                    align: "center",
                    minWidth: 140
                },
                {
                    key: "invoiceCode",
                    title: "发票代码",
                    align: "center",
                    minWidth: 140
                },
                {
                    key: "title",
                    title: "开票抬头",
                    align: "center",
                    minWidth: 170
                },
                {
                    key: "invoiceTypeDesc",
                    title: "开票类型",
                    align: "center",
                    minWidth: 180
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
                    key: "requiredDesc",
                    title: "是否要票",
                    align: "center",
                    minWidth: 100
                },
                {
                    key: "advancedDesc",
                    title: "是否提前开票",
                    align: "center",
                    minWidth: 140
                },
                {
                    key: "adminName",
                    title: "开票申请人",
                    align: "center",
                    minWidth: 100
                },
                {
                    key: "adminDeptName",
                    title: "申请人所在部",
                    align: "center",
                    minWidth: 180
                },
                {
                    key: "statusDesc",
                    title: "开票状态",
                    align: "center",
                    minWidth: 100
                },
                {
                    key: "postedDesc",
                    title: "是否邮寄",
                    align: "center",
                    minWidth: 100
                },
                {
                    key: "postAddress",
                    title: "邮寄地址",
                    align: "center",
                    minWidth: 200
                },
                {
                    key: "postNo",
                    title: "快递单号",
                    align: "center",
                    minWidth: 100
                },
            ],
            loading1: false,
        }
    },
    created() {
        this.getList();
    },
    methods: {
        getList() {
            efcontractexecutionInvoiceItemsList({
                contractCode: this.contractCode
            }).then(res => {
                this.loading1 = false;
                if (res.status == 200) {
                    this.tableData = res.response ? res.response : [];
                } else {
                    this.$Message.warning(res.message);
                }
            })
        },
        exportExcle() {
            axios({
                url: "/report/efcontractexecution/invoiceItemsListExport",
                method: "get",
                params: {
                    contractCode: this.contractCode
                }
            }).then(res => {
                if (res.data.status === "100053" || res.data.status === "500") {
                    this.$Message.warning(res.data.message ? res.data.message : '');
                } else {
                    let form_data = formData({
                        contractCode: this.contractCode
                    });
                    window.location.href = '/report/efcontractexecution/invoiceItemsListExport?' + form_data;
                }
            })
        },
        formatPrice(val) {
            return formatThousandPrice(val);
        },
    }

}
</script>


