<style lang="less" scoped>
.refound-title {
  font-size: 16px;
  color: rgb(0, 0, 0);
}
.infoTable {
  border: 1px solid rgb(187, 187, 187);
  border-collapse: collapse;
  width: 100%;
}
.myDetails {
  background: #ffffff;
  padding: 30px 20px;
}
.infoTable td {
  border: 1px solid rgb(187, 187, 187);
  height: 52px;
  text-align: center;
  width: 35%;
}
.bac {
  background: #eee;
  width: 15% !important;
}
.mar-top-20 {
  margin-top: 20px;
}
.height-50-inline {
  display: inline-block;
  height: 50px;
  line-height: 50px;
}
</style>

<template>
    <Row class="my-saleList-out">
        <Col span="24">
        <Row class-name="current-position">
            当前位置：财务管理&nbsp;&nbsp;>>&nbsp;&nbsp;销项票列表&nbsp;&nbsp;>>&nbsp;&nbsp;退票申请
        </Row>
        </Col>
        <Col span="24" class="myDetails">
        <Col span="24">
        <span class="refound-title">客户基本信息</span>
        <Row>
            <Col span="24">
            <table class="infoTable mar-top-20">
                <tr>
                    <td class="bac">购方名称</td>
                    <td>{{this.customerVO.member}}</td>
                    <td class="bac">纳税人识别号</td>
                    <td>{{this.customerVO.payTaxNo}}</td>
                </tr>
                <tr>
                    <td class="bac">地址、电话</td>
                    <td>{{this.customerVO.invoiceAddressPhone}}</td>
                    <td class="bac">购方开户行及帐号</td>
                    <td>{{this.customerVO.payBank}},{{this.customerVO.payBankNo}}</td>
                </tr>
            </table>
            </Col>
        </Row>
        </Col>
        <Col span="24" class="mar-top-20">
        <span class="refound-title">开票详情信息</span>
        <Row>
            <Col span="24">
            <table class="infoTable mar-top-20">
                <tr>
                    <td class="bac">开票抬头</td>
                    <td>{{this.baseVO.title}}</td>
                    <td class="bac">开票金额</td>
                    <td>{{this.baseVO.totalAmount}}</td>
                </tr>
                <tr>
                    <td class="bac">发票号码</td>
                    <td>{{this.baseVO.invoiceNum}}</td>
                    <td class="bac">发票代码</td>
                    <td>{{this.baseVO.invoiceCode}}</td>
                </tr>
                <tr>
                    <td class="bac">收款人（默认）</td>
                    <td>{{this.baseVO.beneficiaryName}}</td>
                    <td class="bac">开票人（默认）</td>
                    <td>{{this.baseVO.drawerName}}</td>
                </tr>
                <tr>
                    <td class="bac">复核（默认）</td>
                    <td>{{this.baseVO.buyerName}}</td>
                    <td class="bac">&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td class="bac">开票类型</td>
                    <td>{{this.baseVO.invoiceType}}</td>
                    <td class="bac">是否提前开票</td>
                    <td>{{this.baseVO.advanced}}</td>
                </tr>
                <tr>
                    <td class="bac">开票备注</td>
                    <td>{{this.baseVO.note}}</td>
                    <td class="bac">开票状态</td>
                    <td>{{this.baseVO.status}}</td>
                </tr>
                <tr>
                    <td class="bac">申请人</td>
                    <td>{{this.baseVO.adminName}}</td>
                    <td class="bac">所在部门</td>
                    <td>{{this.baseVO.adminDeptName}}</td>
                </tr>
                <tr>
                    <td class="bac">申请时间</td>
                    <td>{{this.baseVO.applyTime}}</td>
                    <td class="bac">期望开票时间</td>
                    <td>{{this.baseVO.requireTime}}</td>
                </tr>
                <tr>
                    <td class="bac">实际开票时间</td>
                    <td>{{this.baseVO.invoiceTime}}</td>
                    <td class="bac">领用状态</td>
                    <td>{{this.baseVO.received}}</td>
                </tr>
                <tr>
                    <td class="bac">领用人</td>
                    <td>{{this.baseVO.receiveName}}</td>
                    <td class="bac">领用时间</td>
                    <td>{{this.baseVO.receiveTime}}</td>
                </tr>
            </table>
            </Col>
        </Row>
        </Col>
        <Col span="24" class="mar-top-20">
        <span class="refound-title height-50-inline">开票明细</span>
        <Col span="24">
        <Table class="tableCommon" :columns="columns1" :data="data1"></Table>
        </Col>
        </Col>
        <Col span="24" class="mar-top-20">
        <span class="refound-title">邮寄信息</span>
        <Row>
            <Col span="24">
            <table class="infoTable mar-top-20">
                <tr>
                    <td class="bac">收件人</td>
                    <td>{{this.postVO.postName}}</td>
                    <td class="bac">联系电话</td>
                    <td>{{this.postVO.postPhone}}</td>
                </tr>
                <tr>
                    <td class="bac">收件人邮箱</td>
                    <td>{{this.postVO.postEmail}}</td>
                    <td class="bac">&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td class="bac">邮寄地址</td>
                    <td>{{this.postVO.postAddress}}</td>
                    <td class="bac">是否邮寄</td>
                    <td>{{this.postVO.posted}}</td>
                </tr>
                <tr>
                    <td class="bac">快递公司</td>
                    <td>{{this.postVO.postCrop}}</td>
                    <td class="bac">快递号</td>
                    <td>{{this.postVO.postNo}}</td>
                </tr>
            </table>
            </Col>
        </Row>
        </Col>
        <Col span="24" class="mar-top-20">
        <span class="refound-title">开票关联合同明细</span>
        <Row class="mar-top-20">
            <Table class="tableCommon" :data="tableData" :columns="columns" ref="dragTable" :stripe="true" :border="true">

            </Table>
        </Row>
        </Col>
        <Col span="24" class="mar-top-20">
        <span class="refound-title">回退原因</span>
        <Row class="mar-top-20">
            <Col span="24">
            <textarea style="width:99%;border:1px solid #ddd;padding-left:7px;padding-top:5px" name="" id="" cols="220" rows="10" v-model="reason"></textarea>
            </Col>
        </Row>
        </Col>
        <Col span="24" class="mar-top-20 text-center">
        <Button type="primary" @click="refundRequire">申请回退</Button>
        <Button style="margin-left:8px;" @click="goHistory">返回</Button>
        </Col>
        </Col>
    </Row>
</template>

<script>
import axios from 'axios'
import { formatThousandPrice } from "../../../assets/js/common.js";
export default {
    data() {
        return {
            columns1: [
                {
                    title: '开票内容（服务名称）',
                    key: 'invoiceContentName'
                },
                {
                    title: '规格型号',
                    key: 'spec'
                },
                {
                    title: '单位',
                    key: 'projectUnit'
                },
                {
                    title: '数量',
                    key: 'projectNum'
                },
                {
                    title: '明细金额（含税）',
                    key: 'contentAmount',
                    render: (h, data) => {
                        return h('span',{
                            style: {}
                        },formatThousandPrice(data.row.contentAmount))
                    }
                }
            ],
            data1: [],
            columns: [
                {
                    key: "contractNo",
                    align: "center",
                    title: "合同编号",
                    render: (h, data) => {
                        return h('span', {
                            style: {
                                color: '#145edb',
                                cursor: 'pointer',
                                textDecoration: 'underline'
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
                    align: "center",
                    title: "合同名称"
                },
                {
                    key: "productName",
                    align: "center",
                    title: "产品名称",
                },
                {
                    key: "wanted",
                    align: "center",
                    title: "是否要票"
                },
                {
                    key: "contractDetailAmount",
                    align: "center",
                    title: "产品金额",
                    render: (h, data) => {
                        return h('span',{
                            style: {}
                        },formatThousandPrice(data.row.contractDetailAmount))
                    }
                },
                {
                    key: "invoiceAmount",
                    align: "center",
                    title: "本次开票金额",
                    render: (h, data) => {
                        return h('span',{
                            style: {}
                        },formatThousandPrice(data.row.invoiceAmount))
                    }
                }
            ],
            tableData: [],
            customerVO: {},
            baseVO: {},
            postVO: {},
            reason: '',
        }
    },
    created() {
        this.getInfo()
    },
    methods: {
        goheCode(contractNo) {
            let routeData = this.$router.resolve({
                name: "checkContact",
                query: {
                    contractCode: contractNo
                }
            });
            window.open(routeData.href, '_blank');
        },
        getInfo() {
            let ids = this.$route.query.id;
            let _this = this
            axios({
                url: '/finance/invoiceinfo/detail',
                method: 'get',
                params: {
                    id: ids
                }
            }).then(resp => {
                if (resp.data.status == '200') {
                    _this.customerVO = resp.data.response.customerVO;
                    _this.baseVO = resp.data.response.baseVO;
                    _this.baseVO.totalAmount = formatThousandPrice(_this.baseVO.totalAmount)
                    _this.postVO = resp.data.response.postVO;
                    // _this.value1 = resp.data.response.customerVO.member;
                    // _this.value2 = resp.data.response.customerVO.payTaxNo;
                    // _this.value3 = resp.data.response.customerVO.invoiceAddressPhone;
                    // _this.value4 = resp.data.response.customerVO.payBank;
                    // _this.value5 = resp.data.response.customerVO.payBankNo;
                    // _this.value6 = resp.data.response.baseVO.title;
                    // _this.value7 = resp.data.response.baseVO.invoiceNum;
                    // _this.value8 = resp.data.response.baseVO.transferTime;
                    // _this.value9 = resp.data.response.baseVO.totalAmount;
                    // _this.value10 = resp.data.response.baseVO.invoiceContent;
                    // _this.value11 = resp.data.response.baseVO.invoiceType;
                    // _this.value12 = resp.data.response.baseVO.advanced;
                    // _this.value13 = resp.data.response.baseVO.note;
                    // _this.value14 = resp.data.response.baseVO.status;
                    // _this.value15 = resp.data.response.baseVO.adminName;
                    // _this.value16 = resp.data.response.baseVO.admindDeptName;
                    // _this.value17 = resp.data.response.baseVO.createTime;
                    // _this.value18 = resp.data.response.baseVO.requireTime;
                    // _this.value19 = resp.data.response.baseVO.invoiceTime;
                    // _this.value20 = resp.data.response.baseVO.received;
                    // _this.value21 = resp.data.response.baseVO.receiveName;
                    // _this.value22 = resp.data.response.baseVO.receiveTime;
                    // _this.value23 = resp.data.response.postVO.postName;
                    // _this.value24 = resp.data.response.postVO.postPhone;
                    // _this.value25 = resp.data.response.postVO.postAddress;
                    // _this.value26 = resp.data.response.postVO.posted;
                    // _this.value27 = resp.data.response.postVO.postCrop;
                    // _this.value28 = resp.data.response.postVO.postNo;
                    _this.tableData = resp.data.response.contractDetailVO;
                    _this.data1 = resp.data.response.invoiceContentListRepVOList;
                } else {
                    this.$Message.warning(resp.data.message)
                }
            }).catch(err => {
                this.$Message.warning(err.message)
            })
        },
        goHistory() {
            this.$router.go(-1);
        },
        refundRequire() {
            let ids = this.$route.query.id;
            // var params = new URLSearchParams();
            // params.append('invoiceInfoId', ids);
            // params.append('refundReason', this.reason);
            let params = {
                invoiceInfoId: ids,
                refundReason: this.reason
            }
            axios({
                url: '/finance/invoiceinfo/refund',
                method: 'post',
                data: params,
            }).then(resp => {
                if (resp.data.status == '200') {
                    this.$Message.success(resp.data.message)
                    this.$router.push({ path: "/saleTicketListManager" })
                } else {
                    this.$Message.warning(resp.data.message)
                }
            }).catch(err => {
                this.$Message.warning(err.message)
            })
        }
    }

}
</script>