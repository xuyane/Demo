<style lang="less" scoped>

  .files .text {
    color: blue;
    text-decoration: underline;
  }
</style>
<template>
  <Row>
    <Col span="24">
      <Row class-name="current-position">
        当前位置：财务管理&nbsp;&nbsp;>>&nbsp;&nbsp;票据管理&nbsp;&nbsp;>>&nbsp;&nbsp;票据审核&nbsp;&nbsp;>>&nbsp;&nbsp;详情
      </Row>
    </Col>
    <Col span="24" class="card-container">
      <div class="table-title">客户基本信息</div>
      <grid-table :grid-columns="gridColumns1" :grid-data="gridData1"></grid-table>
    </Col>
    <Col span="24" class="card-container">
      <div class="table-title">申请信息</div>
       <grid-table :grid-columns="gridColumns2" :grid-data="gridData2"></grid-table>
    </Col>
    <Col span="24" class-name="card-container">
      <div class="table-title">开票明细</div>
      <Table class="tableCommon"
        :columns="columnsD"
        :data="tableDataD"
        border
        stripe>
      </Table>
    </Col>
    <Col span="24" class="card-container">
      <div class="table-title">邮寄信息</div>
       <grid-table :grid-columns="gridColumns3" :grid-data="gridData3"></grid-table>
    </Col>
    <Col span="24" class="card-container" v-if="imgList.length>0">
      <div class="table-title">附件信息</div>
      <div class="files">
        <span v-for="(item,index) in imgList" v-bind:class="{ 'mar-l-10': index>0 }">
          <span>{{item.attName}}</span>
          <a class="text" target="_blank" :href="'//mfs.oilchem.net/'+item.attUrl">点击下载</a>
        </span>
      </div>
    </Col>
    <Col span="24" class-name="card-container">
      <div class="table-title">合同信息</div>
      <Table class="tableCommon"
        :columns="columns"
        :data="tableData"
        border
        stripe>
      </Table>
    </Col>
    <Col span="24" class-name="card-container" >
      <div class="table-title">审核信息</div>
      <div class="step-container" style="margin-left: -20px;margin-top: -20px;display:none">
        <span class="step1 active">开票申请</span>
        <span class="step2" :class="step > 1 ? 'active' : ''">部门主管审核</span>
        <span class="step2" :class="step > 2 ? 'active' : ''">营销总监审核</span>
        <span class="step2" :class="step > 3 ? 'active' : ''">财务主管审核</span>
        <span class="step2" :class="step > 4 ? 'active' : ''">开票专员录入</span>
      </div>
      <Table class="tableCommon mar-t-20"
        :columns="columns2"
        :data="tableData2"
        border
        stripe>
      </Table>
    </Col>
    <!--<Col span="24">
      <Row class-name="table-con">
        <div class="table-title">审批意见</div>
        <Input v-show="!id"  type="textarea" :rows="5"></Input>
      </Row>
    </Col>-->
    <Col span="24">
      <Row class-name="table-con" style="text-align:center">
        <Button type="primary" @click="apply(1)" v-show="!id">通过</Button>
        <Button type="error" @click="apply(0)" v-show="!id">驳回</Button>
        <Button @click="back" v-show="!id">取消</Button>
        <Button type="primary" @click="back" v-show="id">返回</Button>
      </Row>
    </Col>
  </Row>
</template>
<script>
import GridTable from '../components/table/gridTable.vue'
import { getInvoiceAuditDetail, auditInvoiceApply } from '../components/axios/finance.js'
import { formData, formatTime,formatThousandPrice } from "../../assets/js/common.js";
export default {
  data () {
    return {
      id: this.$route.query.id,
      step: 1,
      gridColumns1: [
        {
          key: 'partA',
          title: '购方名称',
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
          key: 'payBankNameAndNo',
          title: '购方开户行及账号'
        },
        {
          key: 'postName',
          title: '收件人（默认）'
        },
        {
          key: 'postPhone',
          title: '联系电话（默认）'
        },
        {
          key: 'postAddress',
          title: '邮寄地址（默认）'
        },
        {
          key: 'postMail',
          title: '收件人邮箱'
        }
      ],
      gridColumns2: [
        {
          key: 'applyTypeDesc',
          title: '申请类型'
        },
        {
          key: 'title',
          title: '开票抬头'
        },
        {
          key: 'invoiceNo',
          title: '发票号码'
        },
        {
          key: 'invoiceCode',
          title: '发票代码'
        },
        {
          key: 'invoiceAmount',
          title: '开票金额'
        },
        {
          key: 'invoiceContentIdDesc',
          title: ' '
        },
        {
          key: 'invoiceTypeDesc',
          title: '开票类型'
        },
        {
          key: 'advancedDesc',
          title: '是否提前开票'
        },
        {
          key: 'note',
          title: '开票备注'
        },
        {
          key: 'applyStatusDesc',
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
          key: 'applyTimeDesc',
          title: '申请时间'
        },
        {
          key: 'requireTimeDesc',
          title: '期望开票时间'
        }
      ],
      gridColumns3: [
        {
          key: 'yjpostName',
          title: '收件人'
        },
        {
          key: 'yjpostPhone',
          title: '联系电话'
        },
        {
          key: 'yjpostAddress',
          title: '邮寄地址'
        },
        {
          key: 'yjpostedDesc',
          title: '是否邮寄'
        }
      ],
      gridData1: {
        partA: '',
        payTaxNo: '',
        invoiceAddressPhone: '',
        payBankNameAndNo: '',
        postName: '',
        postPhone: '',
        postAddress: '',
        postMail:''
      },
      gridData2: {
        applyTypeDesc: '',
        title: '',
        invoiceNo: '',
        invoiceCode: '',
        invoiceAmount: '',
        invoiceContentIdDesc: '',
        invoiceTypeDesc: '',
        advancedDesc: '',
        note: '',
        applyStatusDesc: '',
        adminName: '',
        adminDeptName: '',
        applyTimeDesc: '',
        requireTimeDesc: '',
        invoiceTimeDesc: '',
        receiveStatus: ''
      },
      gridData3: {
        yjpostName: '',
        yjpostPhone: '',
        yjpostAddress: '',
        yjpostedDesc: '',
        yjpostCropNameDesc: '',
        yjpostNo: '',
      },
      columnsD:[
          {
          key: 'invoiceContentName',
          title: '开票内容(服务名称)'
        },
        {
          key: 'spec',
          title: '规格型号'
        },{
          key: 'projectUnit',
          title: '单位'
        },
        {
          key: 'projectNum',
          title: '数量'
        },{
          key: 'contentAmount',
          title: '明细金额(含税)',
          render: (h, data) => {
            return h('span',{
                style: {}
            },formatThousandPrice(data.row.contentAmount))
          }
        }
      ],
      columns: [
        {
          key: 'contractCode',
          title: '合同编号',
          minWidth:150
        },
        {
          key: 'contractName',
          title: '合同名称',
          minWidth:160
        },
        {
          key: 'totalAmout',
          title: '合同总金额',
          minWidth:100,
          render: (h, data) => {
            return h('span',{
                style: {}
            },formatThousandPrice(data.row.totalAmout))
          }
        },
        {
          key: 'contractAckAmount',
          title: '合同认账总金额',
          minWidth:100,
          render: (h, data) => {
            return h('span',{
                style: {}
            },formatThousandPrice(data.row.contractAckAmount))
          }
        },
        {
          key: 'productName',
          title: '产品名称',
          minWidth:120
        },
        {
          key: 'productPrice',
          title: '产品金额',
          minWidth:100,
          render: (h, data) => {
            return h('span',{
                style: {}
            },formatThousandPrice(data.row.productPrice))
          }
        },
        {
          key: 'wantedDesc',
          title: '是否需要开票',
          minWidth:100
        },
        {
          key: 'invoice',
          title: '本次开票金额',
          minWidth:100,
          render: (h, data) => {
            return h('span',{
                style: {}
            },formatThousandPrice(data.row.invoice))
          }
        }
      ],
      columns2: [
        {
          key: 'auditTime',
          title: '审批时间',
          render: (h,data) => {
            return h("div", formatTime(data.row.auditTime))
          }
        },
        {
          key: 'auditor',
          title: '审批人'
        },
        {
          key: 'pass',
          title: '操作内容',
          render: (h,data) => {
            if(data.row.pass){
              return h("div", "审核通过")
            }else {
              return h("div", "审核驳回")
            }
          }
        },
        {
          key: 'content',
          title: '审批意见'
        }
      ],
      tableDataD:[],
      tableData: [
          {
            contractCode:"20180718000038218",
            contractName:'上海钢联订购咨讯',
            totalAmout:'40亿',
            contractAckAmount:'10亿',
            productName:'网站资讯',
            producPrcie:'40亿',
            wantedDesc:'是',
            invoice:'40亿'
          }
      ],
      tableData2: [],
      imgList:[]

    }
  },
  created () {
    this.getDataList()
  },
  methods: {
    // 获取详情
    getDataList () {
      let form = {
        applyId: this.id
      }
      getInvoiceAuditDetail(formData(form)).then(res => {
        this.gridData1.partA = res.response.partA
        this.gridData1.payTaxNo = res.response.payTaxNo
        this.gridData1.invoiceAddressPhone = res.response.invoiceAddressPhone
        this.gridData1.payBankNameAndNo = res.response.payBankNameAndNo
        this.gridData1.postName = res.response.postName
        this.gridData1.postPhone = res.response.postPhone
        this.gridData1.postAddress = res.response.postAddress
        this.gridData1.postMail = res.response.invoiceEmail
        this.gridData2.applyTypeDesc = res.response.applyTypeDesc
        this.gridData2.title = res.response.title
        this.gridData2.invoiceNo = res.response.invoiceNo
        this.gridData2.invoiceCode = res.response.invoiceCode
        this.gridData2.invoiceAmount = formatThousandPrice(res.response.invoiceAmount)
        this.gridData2.invoiceContentIdDesc = res.response.invoiceContentIdDesc
        this.gridData2.invoiceTypeDesc = res.response.invoiceTypeDesc
        this.gridData2.advancedDesc = res.response.advancedDesc
        this.gridData2.note = res.response.note
        this.gridData2.applyStatusDesc = res.response.applyStatusDesc
        this.gridData2.adminName = res.response.adminName
        this.gridData2.adminDeptName = res.response.adminDeptName
        this.gridData2.applyTimeDesc = res.response.applyTimeDesc
        this.gridData2.requireTimeDesc = res.response.requireTimeDesc
        this.gridData2.invoiceTimeDesc = res.response.invoiceTimeDesc
        this.gridData2.receiveStatus = res.response.receiveStatus
        this.gridData3.yjpostName = res.response.yjpostName
        this.gridData3.yjpostPhone = res.response.yjpostPhone
        this.gridData3.yjpostAddress = res.response.yjpostAddress
        this.gridData3.yjpostedDesc = res.response.yjpostedDesc
        this.gridData3.yjpostCropNameDesc = res.response.yjpostCropNameDesc
        this.gridData3.yjpostNo = res.response.yjpostNo
        this.tableDataD = res.response.invoiceContentListRepVOList
        this.tableData = res.response.contractDetailList
        this.tableData2 = res.response.auditMessageDTOList
        this.imgList = res.response.invoiceAttVOList
      })
    },
    // 取消
    back () {
      this.$router.push({
        name: 'billManager',
        query: {
          tab: 2
        }
      })
    },
    // 通过或驳回
    apply(result) {
      let form = {
        auditInvoiceReqVOList: {}
      }
      let item = {
        invoiceApplyId: this.id,
        opinion: '',
        result,
        sign: ''
      }
      form.auditInvoiceReqVOList.push(item)
      auditInvoiceApply(form).then(res => {
        console.log('result', res)
      })
    }
  },
  components: {
    GridTable
  }
}
</script>
