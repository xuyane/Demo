<style lang="less" scoped>
.mrb-10 {
  margin-bottom: 10px;
}
</style>

<template>
    <Row class="my-saleList-out">
        <Col span="24">
        <Row class-name="current-position">
            当前位置：财务报表&nbsp;&nbsp;>>&nbsp;&nbsp;合同执行情况&nbsp;&nbsp;>>认账明细列表
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
import { efcontractexecutionAckList } from "@/view/components/axios/report.js"
export default {
    name: "contractConfirmReport",
    data() {
        return {
            contractCode: this.$route.query.contractCode,
            tableData: [],
            columns: [
                {
                    key: "indexTimeDesc",
                    title: "认账时间",
                    align: "center",
                    minWidth: 100
                },
                {
                    key: "adminName",
                    title: "认账人",
                    align: "center",
                    minWidth: 100
                },
                {
                    key: "productName",
                    title: "产品名称",
                    align: "center",
                    minWidth: 180
                },
                {
                    key: "amount",
                    title: "产品金额",
                    align: "center",
                    minWidth: 100,
                    render: (h, data) => {
                        return h('span', {
                            style: {}
                        }, formatThousandPrice(data.row.amount))
                    }
                },
                {
                    key: "ackAmount",
                    title: "认账金额",
                    align: "center",
                    minWidth: 100,
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
                    minWidth: 100,
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
                    minWidth: 100,
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
                    minWidth: 100,
                    render: (h, data) => {
                        return h('span', {
                            style: {}
                        }, formatThousandPrice(data.row.confAmount))
                    }
                },
                {
                    key: "orgName",
                    title: "所在部门",
                    align: "center",
                    minWidth: 100,
                    render: (h, data) => {
                        return h('span', {
                            style: {}
                        }, data.row.orgName)
                    }
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
            efcontractexecutionAckList({
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
                url: "/report/efcontractexecution/ackListExport",
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
                    window.location.href = '/report/efcontractexecution/ackListExport?' + form_data;
                }
            })
        },
        formatPrice(val) {
            return formatThousandPrice(val);
        },
    }

}
</script>


