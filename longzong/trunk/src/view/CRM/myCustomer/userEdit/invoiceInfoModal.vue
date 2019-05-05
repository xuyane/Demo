<style lang="less">
</style>
<template>

  <Modal v-model="modal2" width="1000" title="发票信息"  @on-cancel="cancel" >  
    <Row>
      <Col span="24" class="table-con">
        <Table class="tableCommon"
          :data="tableData"
          :columns="columns"
          ref="dragTable"
          :stripe="true"
          :border="true" >
        </Table>
      </Col>
    </Row>
    <div slot="footer">
      <Button type="primary" @click="cancel" class="search-btn">确定</Button>
      <Button @click="cancel" class="search-btn">取消</Button>
    </div>
  </Modal>
</template>
<script>
// import TabHeader from './tabHeader'
// import OilPage from '../../../components/page/page.vue'
import {
  getInvoiceInfoList
} from '../../../components/axios/crm.js'
import { formatTime2 } from '../../../../assets/js/common.js'
export default {
  name: "InvoiceInfoModal",
  props: {
    showInvoiceInfo: Boolean,
    invoiceInfoMsg:Object
  },
  
  data () {
    return {
      modal2: false,
      editorOption: {
       // something config
      },
      total: 0,
      pageSize: 10,
      pageNum: 1,
      showSizer: true,
      pageSizeOpts: [5, 10, 20, 30],
      tableData: [],
      columns: [
        {
          key: 'invoiceNo',
          title: '发票号码',
          minWidth: 80
        },
        {
          key: 'contractNo',
          title: '合同编号',
          minWidth: 100
        },
        {
          key: 'createTime',
          title: '开票时间',
          minWidth: 80,
          render: (h, data) => {
            return h('span', data.row.createTime ? formatTime2(data.row.createTime) : '')
          }
        },
        {
          key: 'title',
          title: '开票抬头',
          minWidth: 120
        },
        {
          key: 'invoiceAmount',
          title: '发票金额',
          minWidth: 80
        },
        {
          key: 'applyType',
          title: '状态',
          minWidth: 80,
          render: (h, data) => {
            return h('span', data.row.applyType === 1 ? '退票申请' : '开票申请')
          }
        },
        {
          key: 'advanced',
          title: '是否提前开票',
          minWidth: 80,
          render: (h, data) => {
            return h('span', data.row.advanced === 1 ? '是' : '否')
          }
        },
        {
          key: 'adminName',
          title: '业务员',
          minWidth: 80
        }
      ],
      contractCode:''
    }
  },
  // components: {
  //   TabHeader,
  //   OilPage
  // },
  created() {
    // this.getListPage()
  },  
  watch:{
    showInvoiceInfo(newval,oldval){
      this.modal2 = newval;
    },
    invoiceInfoMsg(newval,oldval){
      console.log(newval)
      this.contractCode=newval.contractCode;
      this.getListPage();
    },
  },
  methods: {
    cancel(){
      this.$emit("hide-invoice-info");
    },
   
    getListPage() {
      this.$Spin.show()
      let params = {
        contractCode: this.contractCode
      }
      getInvoiceInfoList(params).then(res => {
        this.$Spin.hide()
        console.log('res', res)
        this.tableData = res.response
        this.total = res.response.total
      })
    },
    // 监听分页
    pageChange (page, pageSize) {
      if(page) {
        this.pageNum = page
      }
      if(pageSize) {
        this.pageSize = pageSize
      }
      this.getListPage()
    }
  }
}
</script>
