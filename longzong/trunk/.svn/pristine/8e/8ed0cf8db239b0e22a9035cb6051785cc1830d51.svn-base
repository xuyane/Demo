<style lang="less" scoped>

</style>

<template>
    <Modal v-model="detailsModal" :footer-hide="true" title="关联合同详情" width="900">
        <Row>
            <Table class="tableCommon" :data="tableData" :columns="columns" ref="dragTable" :stripe="true" :border="true" ></Table>
            <div class="page-con">
                <span>第{{pageNum}}页 / 共{{Math.ceil(dataCount / pageSize)}}页 每页{{pageSize}}条 共{{dataCount}}条</span>
                <Page
                    :total="dataCount"
                    :page-size="pageSize"
                    show-sizer
                    show-elevator
                    :page-size-opts="pageSizeOpt"
                    @on-change="changePageNum"
                    @on-page-size-change="changePageSize"
                    class="pull-right"/>
            </div>
        </Row>

        <div slot="footer" span="24" class="mar-top-20 text-center">
            <Button type="primary"  @click="doLook">确定</Button>
            <Button  style="margin-left:8px;" @click="cancel">返回</Button>
        </div>
        
    </Modal> 
</template>

<script>
import axios from "axios";
export default {
  name: 'detailsModal',
  props: {
    showDetailModal: Boolean,
    dataRow: [Object,Array]
  },
  data() {
    return {
         columns: [
            {
                key: "contractNo",
                title: "合同编号",
                align: "center",
                minWidth:140,
                render:(h, data) => {
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
                                        this.goheCode();
                                    }
                                }
                            },
                            data.row.number  
                        )
                    ]);
                }
            },
            {
                key: "contractName",
                align: "center",
                title: "合同名称",
                minWidth:140
            },
            {
                key: "detailId",
                align: "center",
                title: "会员名称",
                minWidth:140
            },
            {
                key: "productNameCn",
                align: "center",
                title: "产品名称",
                minWidth:150
            },
            {
                key: "contractDetailAmount",
                align: "center",
                title: "产品金额",
                minWidth:100
            },
            {
                key: "invoiceAmount",
                align: "center",
                title: "开票申请金额",
                minWidth:100
            }
        ],
        tableData: [],
        showSizer: true,
        dataCount: 0,
        pageSize: 5,
        pageShow:false,
        pageNum: 1,
        pageSizeOpt: [5, 10, 20],
        detailsModal:false,
        detailForm:{

        },
        ids:'',
    }
  },
  created() {
    
  },
  methods: {
    doLook() {
        this.detailsModal = false;
        this.$emit("hide-modal");
    },
    cancel() {
        this.detailsModal = false;
        this.$emit("hide-modal");
      //this.$refs.editForm.resetFields();
    },
    goheCode() {
        this.$router.push({
            name :"",
        })
    },
     changePageNum (current) {
        this.pageNum = current
        this.getInfo()
    },
    // 监听修改显示条数
    changePageSize (size) {
        this.pageSize = size
        this.getInfo()
    },
    getInfo() {
        let that = this;
        axios({
                url: '/finance/invoiceinfo/contract/detail',
                method: 'post',
                data:{
                    id: this.ids,
                    pageNum: this.pageNum, //分页页码
                    pageSize: this.pageSize, //分页大小
                }
            }).then(resp => {
                if (resp.data.status == '200') {
                    that.tableData = resp.data.response.list;
                    that.dataCount = resp.data.response.total;
                }else {
                    that.$Message.warning(resp.data.message)
                }
            }).catch(err => {
                this.$Message.warning(err.message)
        })
    },
  },
  watch: {
    showDetailModal (newVal, oldVal) {
      this.detailsModal = newVal
    },
    dataRow (newVal, oldVal) {
        this.detailForm = newVal;
        this.getInfo()
    },
    hidePage(newVal, oldVal){
      this.pageShow=newVal;
    }
  },
  mounted() {
    // 1
  }
};
</script>
