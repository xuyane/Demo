<style lang="less" scoped>
.refound-title {
  font-size: 16px;
  color: rgb(0, 0, 0);
}
.myDetails {
  background: #ffffff;
  padding: 30px 20px;
}
.infoTable {
  border: 1px solid rgb(187, 187, 187);
  border-collapse: collapse;
  width: 100%;
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
.text-c {
  text-align: center;
}
.mar-top-20 {
  margin-top: 20px;
}
.fujian {
  overflow: hidden;
}
.fujian li {
  float: left;
  color: blue;
  margin-left: 20px;
  list-style: none;
}
.fujian li:first-child {
  margin-left: 0px;
}
.height-50-inline {
  display: inline-block;
  height: 50px;
  line-height: 50px;
}
</style>

<template>
    <div id="subOutputRank-print">
        <Row class="my-saleList-out">
            <Col span="24">
            <Row class-name="current-position">
                当前位置：财务管理&nbsp;&nbsp;>>&nbsp;&nbsp;销项票列表&nbsp;&nbsp;>>&nbsp;&nbsp;详情
            </Row>
            </Col>
            <Col span="24" class="myDetails">
            <Col span="24" class="card-container">
            <div class="table-title">客户基本信息</div>
            <grid-table style="height:50px" :grid-columns="customerColumns" :grid-data="customerData"></grid-table>
            </Col>
            <Col span="24" class="card-container">
            <div class="table-title">开票详情信息</div>
            <grid-table  :grid-columns="InvoiceInfoBaseColumns" :grid-data="InvoiceInfoBaseData"></grid-table>
            </Col>
            <Col span="24" class="card-container">
            <span class="refound-title height-50-inline">开票明细</span>
            <Col span="24">
            <Table class="tableCommon" :columns="columns1" :data="data1"></Table>
            </Col>
            </Col>
            <Col span="24" class="card-container">
            <span v-show="receiveUrl" class="refound-title height-50-inline">电子票地址 <a :href="receiveUrl" target="_blank">在线地址查看</a>（30天有效期）</span>
            <Col v-show="newPdfUrl" span="24">
            <div class="refound-title"><a :href="newPdfUrl" target="_blank">电子票下载</a></div>
            </Col>
            </Col>
            <Col span="24" class="card-container" v-if="urlList.length>0">
            <span class="refound-title">附件信息</span>
            <Row class="mar-top-20">
                <Col span="24">
                <ul class="fujian">
                    <li v-for="(item,index) in urlList" :key="index"><a :href="item" target="_blank">附件.jpg</a></li>
                </ul>
                </Col>
            </Row>
            </Col>
            <Col span="24" class="card-container">
            <div class="table-title">邮寄信息</div>
            <grid-table :grid-columns="postColumns" :grid-data="postData"></grid-table>
            </Col>
            <Col span="24" class="card-container">
            <span class="refound-title">开票关联合同明细</span>
            <Row class="mar-top-20">
                <Col span="24" class="mar-top-20">
                <Table class="tableCommon" :data="tableData" :columns="columns" ref="dragTable" :stripe="true" :border="true">

                </Table>
                </Col>
            </Row>
            </Col>
            <Col span="24" class="card-container text-c">
            <Button type="primary" @click="doPrint">打印</Button>
            <Button style="margin-left:8px;" @click="goHistory">返回</Button>
            </Col>
            </Col>
        </Row>
    </div>
</template>

<script>
import GridTable from '../../components/table/accountTable.vue'
import { invoiceinfoDetail } from '../../components/axios/finance.js'
import { urlHead } from "../../../assets/js/common.js";
export default {
    components: {
        GridTable
    },
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
                    key: 'contentAmount'
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
                    title: "产品金额"
                },
                {
                    key: "invoiceAmount",
                    align: "center",
                    title: "本次开票金额"
                }
            ],
            tableData: [],
            customerColumns: [
                {
                    key: 'member',
                    title: '购方名称'
                },
                {
                    key: 'payTaxNo',
                    title: '纳税人识别号'
                },
                {
                    key: 'invoiceAddressPhone',
                    title: '地址、电话'
                },
                {
                    key: 'payBankAndNo',
                    title: '购方开户行及帐号'
                },
            ],
            InvoiceInfoBaseColumns: [
                {
                    key: 'title',
                    title: '开票抬头'
                },
                {
                    key: 'totalAmount',
                    title: '开票金额'
                },
                {
                    key: 'invoiceNum',
                    title: '发票号码'
                },
                {
                    key: 'invoiceCode',
                    title: '发票代码'
                },
                {
                    key: 'beneficiaryName',
                    title: '收款人（默认）'
                },
                {
                    key: 'drawerName',
                    title: '开票人（默认）'
                },
                {
                    key: 'buyerName',
                    title: '复核（默认）'
                },
                {
                    key: 'space',
                    title: ''
                },
                {
                    key: 'invoiceType',
                    title: '开票类型'
                },
                {
                    key: 'advanced',
                    title: '是否提前开票'
                },
                {
                    key: 'note',
                    title: '开票备注'
                },
                {
                    key: 'status',
                    title: '开票状态'
                },
                {
                    key: 'adminName',
                    title: '申请人'
                },
                {
                    key: 'adminDeptName',
                    title: '所在部门'
                },
                {
                    key: 'applyTime',
                    title: '申请时间'
                },
                {
                    key: 'requireTime',
                    title: '期望开票时间'
                },
                {
                    key: 'invoiceTime',
                    title: '实际开票时间'
                },
                {
                    key: 'received',
                    title: '领用状态'
                },
                {
                    key: 'receiveName',
                    title: '领用人'
                },
                {
                    key: 'receiveTime',
                    title: '领用时间'
                },
            ],
            postColumns: [
                {
                    key: 'postName',
                    title: '收件人'
                },
                {
                    key: 'postPhone',
                    title: '联系电话'
                },
                {
                    key: 'postEmail',
                    title: '收件人邮箱'
                },
                {
                    key: '',
                    title: ''
                },
                {
                    key: 'postAddress',
                    title: '邮寄地址'
                },
                {
                    key: 'posted',
                    title: '是否邮寄'
                },
                {
                    key: 'postCrop',
                    title: '快递公司'
                },
                {
                    key: 'postNo',
                    title: '快递号'
                }
            ],
            customerData: {
                member: '',
                payTaxNo: '',
                invoiceAddressPhone: '',
                payBankAndNo: ''
            },
            InvoiceInfoBaseData: {
                title: '',
                totalAmount: '',
                invoiceNum: '',
                invoiceCode: '',
                beneficiaryName: '',
                drawerName: '',
                buyerName: '',
                invoiceType: '',
                advanced: '',
                note: '',
                status: '',
                adminName: '',
                admindDeptName: '',
                createTime: '',
                requireTime: '',
                invoiceTime: '',
                received: '',
                receiveName: '',
                receiveTime: ''
            },
            postData: {
                postName: '',
                postPhone: '',
                postEmail: '',
                posted: '',
                postCrop: '',
                postNo: ''
            },
            receiveUrl: '',
            newPdfUrl: '',
            urlList: []
        }
    },
    created() {
        this.getInfo();
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
            console.log('111', urlHead)
            let ids = this.$route.query.id;
            let _this = this
            invoiceinfoDetail({
                id: ids
            }).then(resp => {
                _this.customerData.member = resp.response.customerVO.member;
                _this.customerData.payTaxNo = resp.response.customerVO.payTaxNo;
                _this.customerData.invoiceAddressPhone = resp.response.customerVO.invoiceAddressPhone;
                _this.customerData.payBankAndNo = resp.response.customerVO.payBank + ',' + resp.response.customerVO.payBankNo;
                _this.InvoiceInfoBaseData = resp.response.baseVO;
                _this.data1 = resp.response.invoiceContentListRepVOList;
                _this.tableData = resp.response.contractDetailVO;
                _this.postData = resp.response.postVO;
                _this.receiveUrl = resp.response.receiveUrl;
                _this.newPdfUrl = resp.response.newPdfUrl ? urlHead + resp.response.newPdfUrl : resp.response.newPdfUrl;
                _this.urlList = resp.response.urlList.map(item => {
                    return (urlHead + item);
                });
            })
        },
        goHistory() {
            this.$router.go(-1);
        },
        doPrint() {
            let subOutputRankPrint = document.getElementById('subOutputRank-print');
            //console.log(subOutputRankPrint.innerHTML);
            let newContent = subOutputRankPrint.innerHTML;
            let oldContent = document.body.innerHTML;
            document.body.innerHTML = newContent;
            window.print();
            window.location.reload();
            document.body.innerHTML = oldContent;
            return false;
        }
    }

}
</script>


