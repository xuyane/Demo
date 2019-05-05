<style lang="less" scoped>
  .mar-top-20 {
    margin-top: 20px;
  }
  .text-right {
    text-align: right;
  }
  .btn-text {
    text-align: right;
    padding: 30px 0px 0px 0;
    span {
      margin-left: 20px;
    }
    i {
      font-style: normal;
    }
  }
  .my-account-conter {
    background: #fff;
  }
</style>

<template>
  <Row class="my-saleList-out">
    <Col span="24">
    <Row class-name="current-position">
      当前位置：财务管理&nbsp;&nbsp;>>&nbsp;&nbsp;销项票列表&nbsp;&nbsp;
    </Row>
    </Col>
    <Col span="24" class="search-form">
    <Form ref="addForm" :label-width="100" class="my-account-conter">
      <Row>
        <Col span="8">
        <FormItem label="发票号码:">
          <Input class="search-input" v-model="value1"></Input>
        </FormItem>
        </Col>
        <Col span="8">
        <FormItem label="发票代码:">
          <Input class="search-input" v-model="value2"></Input>
        </FormItem>
        </Col>
        <Col span="8">
        <FormItem label="发票状态:">
          <Select class="form-select" v-model="value3">
            <Option value="">全部</Option>
            <Option v-for="item in payStates" :value="item.value" :key="item.value">{{item.label}}</Option>
          </Select>
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
        <FormItem label="发票抬头:">
          <Input class="search-input" v-model="value4"></Input>
        </FormItem>
        </Col>
        <Col span="8">
        <FormItem label="会员名称:">
          <Select class="form-select" v-model="value5" filterable remote :remote-method="remoteMethod2" :loading="loading2" placeholder="全部">
            <Option v-for="(option, index) in options2" :value="option.value" :key="index">{{option.label}}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="8">
        <FormItem label="申请时间:">
          <DatePicker type="daterange" v-model="value6" class="search-input" placeholder="选择时间段"></DatePicker>
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
        <FormItem label="开票金额:">
          <Col span="11">
          <Input v-model="value7" class="search-input" placeholder="请输入最小金额" @on-blur="validatePrice"></Input>
          </Col>
          <Col span="2" class="text-center">--</Col>
          <Col span="11">
          <Input v-model="value8" class="search-input" placeholder="请输入最大金额" @on-blur="validatePrice1"></Input>
          </Col>
        </FormItem>
        </Col>
        <Col span="8">
        <FormItem label="开票日期:">
          <DatePicker type="daterange" v-model="value9" class="search-input" placeholder="选择时间段"></DatePicker>
        </FormItem>
        </Col>
        <Col span="8">
        <FormItem label="领用状态:">
          <Select class="search-input" v-model="value10">
            <Option value="">全部</Option>
            <Option v-for="item in useStates" :value="item.value" :key="item.value">{{item.label}}</Option>
          </Select>
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
        <FormItem label="申请人:">
          <!-- <Input class="search-input" v-model="value11"></Input> -->
          <Select class="form-select"
                  v-model="value11"
                  filterable
                  remote
                  :remote-method="remoteMethod1"
                  :loading="loading1"
                  placeholder="请输入申请人">
            <Option v-for="(option, index) in options1" :value="option.value" :key="index">{{option.label}}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="8">
        <FormItem label="所在部门:">
          <select-department @data-list="getDepData" :emptyModel='departId'></select-department>
        </FormItem>
        </Col>
        <Col span="8" class=" text-right">
        <Button type="primary" @click="search">查询</Button>
        <Button style="margin-left:8px;" @click="reset">重置</Button>
        </Col>
      </Row>
    </Form>
    </Col>
    <Col span="24" class="mar-top-20">
    <Row class-name="table-con">
      <Button :loading= "loadExport" type="primary" @click="exportExcle">导出</Button>
      <!-- <Button type="primary">打印导出</Button> -->
      <br><br>
      <Table class="tableCommon" :data="tableData" :columns="columns" ref="dragTable" :stripe="true" :border="true"></Table>
      <div class="page-con">
        <span>第{{pageNum}}页 / 共{{Math.ceil(dataCount / pageSize)}}页 每页{{pageSize}}条 共{{dataCount}}条</span>
        <Page :total="dataCount" :page-size="pageSize" show-sizer show-elevator :page-size-opts="pageSizeOpt" @on-change="changePageNum" @on-page-size-change="changePageSize" class="pull-right" />
      </div>
    </Row>
    </Col>
    <Modal v-model="showDetailModal" title="关联合同详情" @on-ok="ok" width="1000" @on-cancel="cancel">
      <Row>
        <Table class="tableCommon" :data="tableDataRow" :columns="columnsRow" ref="dragTable" :stripe="true" :border="true"></Table>
        <oil-page :total="modalPage.dataCount" :page-num="modalPage.pageNum" :page-size="modalPage.pageSize" @page-change="modalPageChange" :page-size-opts="pageSizeOpt1" :show-sizer="modalPage.showSizer"></oil-page>
      </Row>
      <div slot="footer">
        <i-button @click="showDetailModal=false">关闭</i-button>
      </div>
    </Modal>
    <!-- <detail-modal :dataRow="dataRow" :showDetailModal="showDetailModal" :hide-page="true" @hide-modal="hideDetailModal"></detail-modal> -->
  </Row>
</template>

<script>
  import axios from 'axios'
  import detailModal from './detailModal.vue'
  import { getSaleTicketList } from "../../components/axios/finance.js";
  import SelectDepartment from '../../components/finance/selectDepartment.vue'
  import oilPage from "../../components/page/page.vue";
  import { formatThousandPrice ,formData } from "../../../assets/js/common.js"
  export default {
    name: "saleTicketListManager",
    components: {
      detailModal,
      SelectDepartment,
      oilPage
    },
    data() {
      return {
        showSizer: true,
        pageShow: false,
        pageSizeOpt: [10,15,20,40,50,100],
        pageSizeOpt1: [5,10,20],
        detailsModal: false,
        loadExport: false,
        detailForm: {
        },
        ids: '',
        tableDataRow: [],
        columnsRow: [
          {
            key: "contractNo",
            title: "合同编号",
            align: "center",
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
            key: "contractName",
            align: "center",
            title: "合同名称",
            minWidth: 140
          },
          {
            key: "member",
            align: "center",
            title: "会员名称",
            minWidth: 140
          },
          {
            key: "productNameCn",
            align: "center",
            title: "产品名称",
            minWidth: 150
          },
          {
            key: "contractDetailAmount",
            align: "center",
            title: "产品金额",
            minWidth: 100,
            render: (h, data) => {
              return h('span',{
                style: {}
              },formatThousandPrice(data.row.contractDetailAmount))
            }
          },
          {
            key: "invoiceAmount",
            align: "center",
            title: "开票申请金额",
            minWidth: 100,
            render: (h, data) => {
              return h('span',{},formatThousandPrice(data.row.invoiceAmount))
            }
          }
        ],
        dataList: [],
        payStates: [],
        useStates: [],
        columns: [
          {
            key: "invoiceNum",
            title: "发票号码",
            align: "center",
            minWidth: 160
          },
          {
            key: "invoiceCode",
            align: "center",
            title: "发票代码",
            minWidth: 150
          },
          {
            key: "member",
            align: "center",
            title: "会员名称",
            minWidth: 150
          },
          {
            key: "title",
            align: "center",
            title: "发票抬头",
            minWidth: 150
          },
          {
            key: "invoiceContent",
            align: "center",
            title: "开票内容",
            minWidth: 180,
            render: (h, params) => {
              return h('Tooltip', {
                props: { placement: 'top' }
              }, [
                params.row.invoiceContent.length > 11 ? params.row.invoiceContent.slice(0, 11) + "..." : params.row.invoiceContent,
                h('span', { slot: 'content', style: { whiteSpace: 'normal', wordBreak: 'break-all' } }, params.row.invoiceContent)
              ])
            }
          },
          {
            key: "invoiceType",
            align: "center",
            title: "发票类型",
            minWidth: 150
          },
          {
            key: "requireTime",
            align: "center",
            title: "期望开票日期",
            minWidth: 100
          },
          {
            key: "invoiceTime",
            align: "center",
            title: "开票日期",
            minWidth: 120
          },
          {
            key: "drawerName",
            align: "center",
            title: "开票人",
            minWidth: 100
          },
          {
            key: "contractNo",
            align: "center",
            minWidth: 150,
            title: "开票产品信息",
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
                        this.openDetailModal(data);
                      }
                    }
                  }, "查看"

                )
              ]);
            }
          },
          {
            key: "totalAmount",
            align: "center",
            title: "开票金额",
            minWidth: 100,
            render: (h, data) => {
              return h('span',{
                style: {}
              },formatThousandPrice(data.row.totalAmount))
            }
          },
          {
            key: "adminName",
            align: "center",
            title: "申请人",
            minWidth: 100
          },
          {
            key: "adminDeptName",
            align: "center",
            title: "申请人所在部门",
            minWidth: 150
          },
          {
            key: "applyTime",
            align: "center",
            title: "申请时间",
            minWidth: 150
          },
          {
            key: "status",
            align: "center",
            title: "状态",
            minWidth: 80
          },
          {
            key: "advanced",
            align: "center",
            title: "提前开票",
            minWidth: 80
          },
          {
            key: "received",
            align: "center",
            title: "是否领用",
            minWidth: 80
          },
          {
            key: "postStatus",
            align: "center",
            title: "是否邮寄",
            minWidth: 100
          },
          {
            key: "postNo",
            align: "center",
            title: "快递单号",
            minWidth: 130
          },
          {
            title: "操作",
            align: "center",
            minWidth: 120,
            fixed: 'right',
            render: (h, data) => {
              if (data.row.status == "已退票") {
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
                          this.goDetail(data);
                        }
                      }
                    },
                    "查看"
                  )
                ]);
              } else {
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
                          this.goDetail(data);
                        }
                      }
                    },
                    "查看"
                  ),
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
                          this.goRefound(data);
                        }
                      }
                    },
                    "退票"
                  )
                ]);
              }

            }
          }
        ],
        tableData: [],
        showSizer: true,
        dataCount: 0,
        pageSize: 10,
        pageNum: 1,
        modalPage:{
          pageSize: 10,
          pageNum: 1,
          dataCount: 0,
          showSizer: true,
        },
        value1: null,
        value2: null,
        value3: null,
        value4: null,
        value5: null,
        value6: [],
        value7: null,
        value8: null,
        value9: [],
        value10: null,
        value11: null,
        showDetailModal: false,
        options1: [],
        loading1: false,
        loading2: false,
        options2: [],
        state1: 0,
        state2: 0,
        dataRow: [],
        departId: [],
      }
    },
    created() {
      this.InvoiceStatusEnum();
      this.InvoiceReceivedStatusEnum();
      this.selectDept();
      this.query();
    },
    methods: {
      goheCode(contractNo) {
        let routeData = this.$router.resolve({
          name: "waittingCheck",
          query: {
            contractCode: contractNo
          }
        });
        window.open(routeData.href, '_blank');
      },
      exportExcle() {// 导出 Excel 数据
        let startTime1 = '';
        let startTime2 = '';
        let endTime1 = '';
        let endTime2 = '';
        if (this.value6.length == 0) {
          startTime1 = "";
          endTime1 = "";
        } else {
          if (this.value6[0] == '') {
            startTime1 = "";
            endTime1 = "";
          } else {
            startTime1 = new Date(this.value6[0]).getTime();
            endTime1 = new Date(this.value6[1]).getTime() + 24 * 60 * 60 * 1000 - 1000;
          }
        }
        if (this.value9.length == 0) {
          startTime2 = "";
          endTime2 = "";
        } else {
          if (this.value9[0] == '') {
            startTime2 = "";
            endTime2 = "";
          } else {
            startTime2 = new Date(this.value9[0]).getTime();
            endTime2 = new Date(this.value9[1]).getTime() + 24 * 60 * 60 * 1000 - 1000;
          }
        }
        let forms = {
          //adminDeptId: this.departId, //所在部门
          applyTimeE: endTime1, //结束申请时间
          applyTimeS: startTime1, //开始申请时间
          adminId: this.value11?this.value11:"", //申请人
          invoiceCode: this.value2?this.value2:"", //发票代码
          invoiceNum: this.value1?this.value1:"", //发票号吗
          invoiceTimeE: endTime2, //结束开票日期
          invoiceTimeS: startTime2, //开始开票日期
          memberId: this.value5?this.value5:"", //会员id
          pageNum: this.pageNum, //分页页码
          pageSize: this.pageSize, //分页大小
          received: this.value10 ? Number(this.value10) : "", // 是否领用：1-已领用 0-未领用
          status: this.value3 ? Number(this.value3) : "", // 发票状态：1-退票 0-正常
          title: this.value4?this.value4:"", // 	发票抬头
          totalAmountE: this.value8 ? Number(this.value8) : "", // 开票金额结束
          totalAmountS: this.value7 ? Number(this.value7) : ""// 开票金额开始
        };
        //有部门的时候才传这个参数
        if(this.departId && this.departId.length > 0){
          forms.adminDeptId = this.departId.join(",");
        }
        this.loadExport = true;
        axios({
          url: "/finance/invoiceinfo/export",
          method: "get",
          params: forms
        }).then(res => {
          if (res.data.status === "500" || res.data.status === "100042") {
            this.$Message.warning(res.data.message);
          } else if (res.data.status === "100043") {
           /* this.$Modal.warning({
              content: '当前数据超过一万条，请分批导出ssd'
            });*/
            this.$Modal.warning({
              render: (h) => {
                return h('Alert', {
                  props: {
                    type: 'warning'
                  },
                  style: {
                    'background-color': 'transparent',
                    'border-color': 'transparent'
                  }
                }, '当前数据超过一万条，请分批导出');
              }
            })
          } else {
            let form_data = formData(forms);
            window.location.href = '/finance/invoiceinfo/export?' + form_data;
          }
          this.loadExport = false;
        })


      },
      validatePrice() {
        if (isNaN(Number(this.value7))) {
          this.value7 = "";
        }
      },
      validatePrice1() {
        if (isNaN(Number(this.value8))) {
          this.value8 = "";
        }
      },
      //modal 关闭 弹窗
      ok() {

      },
      cancel() {

      },
      //获取所在部门
      getDepData(deptLabel, deptId, deptCode) {
        this.departId = deptId ? deptId : null;
      },
      //
      goDetail(data) {
        this.$router.push({
          name: 'saleTicketListDetail',
          query: {
            id: data.row.id
          }
        })
      },
      goRefound(data) {
        this.$router.push({
          name: 'ticketRefound',
          query: {
            id: data.row.id
          }
        })
      },
      search(){
        this.pageSize = 10;
        this.pageNum = 1;
        this.query()
      },
      reset() {
        this.value1 = null,
          this.value2 = null;
        this.value3 = null;
        this.value4 = null;
        this.value5 = null;
        this.value6 = [];
        this.value7 = null;
        this.value8 = null;
        this.value9 = [];
        this.value10 = null;
        this.value11 = null;
        this.dataList = [];
        this.departId = [];
        this.pageSize = 10;
        this.pageNum = 1;
      },
      openDetailModal(data) {//打开查看弹窗
        this.showDetailModal = true;
        let that = this;
        axios({
          url: '/finance/invoiceinfo/contract/detail',
          method: 'post',
          data: {
            id: data.row.id,
            pageNum: that.modalPage.pageNum, //分页页码
            pageSize: that.modalPage.pageSize, //分页大小
          }
        }).then(resp => {
          if (resp.data.status == '200') {
            that.tableDataRow = resp.data.response.list ? resp.data.response.list : [];
            that.modalPage.dataCount = resp.data.response.total;
          } else {
            that.$Message.warning(resp.data.message)
          }
        }).catch(err => {
          that.$Message.warning(err.message)
        })
        console.log(this.tableDataRow);
      },
      hideDetailModal() {//关闭弹窗
        this.showDetailModal = false;
      },
      selectDept() {
        let that = this
        axios({
          url: '/finance/common/selectDept',
          method: 'get',
        }).then(resp => {
          if (resp.data.status == '200') {
            //console.log(resp)
            that.dataList = JSON.parse(resp.data.response)
          } else {
            // that.$Message.warning(resp.data.message)
          }
        }).catch(err => {
          this.$Message.warning(err.message)
        })
      },
      InvoiceStatusEnum() {
        let that = this
        axios({
          url: '/finance/common/select',
          method: 'get',
          params: {
            type: 'InvoiceStatusEnum',
          },
        }).then(resp => {
          if (resp.data.status == '200') {
            //console.log(resp)
            const payStates = resp.data.response.map(item => {
              return {
                value: item.value,
                label: item.desc
              };
            })
            that.payStates = payStates
            //console.log(that.payStyle)
          } else {
            // that.$Message.warning(resp.data.message)
          }
        }).catch(err => {
          this.$Message.warning(err.message)
        })
      },
      InvoiceReceivedStatusEnum() {
        let that = this
        axios({
          url: '/finance/common/select',
          method: 'get',
          params: {
            type: 'InvoiceReceivedStatusEnum',
          },
        }).then(resp => {
          if (resp.data.status == '200') {
            //console.log(resp)
            const useStates = resp.data.response.map(item => {
              return {
                value: item.value,
                label: item.desc
              };
            })
            that.useStates = useStates
            //console.log(that.payStyle)
          } else {
            // that.$Message.warning(resp.data.message);
          }
        }).catch(err => {
          this.$Message.warning(err.message);
        })
      },
      changePageNum(current) {
        this.pageNum = current;
        this.query();
      },
      // 监听修改显示条数
      changePageSize(size) {
        this.pageSize = size;
        this.query();
      },
      //弹出框分页
      modalPageChange(page, pageSize) {
        //分页
        if(page) {
          this.modalPage.pageNum = page
        }
        if(pageSize) {
          this.modalPage.pageSize = pageSize
        }
        this.query();
      },
      query() {
        let that = this;
        this.$Spin.show();
        let startTime1 = '';
        let startTime2 = '';
        let endTime1 = '';
        let endTime2 = '';
        if (this.value6.length == 0) {
          startTime1 = null;
          endTime1 = null;
        } else {
          if (this.value6[0] == '') {
            startTime1 = null;
            endTime1 = null;
          } else {
            startTime1 = new Date(this.value6[0]).getTime();
            endTime1 = new Date(this.value6[1]).getTime() + 24 * 60 * 60 * 1000 - 1000;
          }
        }
        if (this.value9.length == 0) {
          startTime2 = null;
          endTime2 = null;
        } else {
          if (this.value9[0] == '') {
            startTime2 = null;
            endTime2 = null;
          } else {
            startTime2 = new Date(this.value9[0]).getTime();
            endTime2 = new Date(this.value9[1]).getTime() + 24 * 60 * 60 * 1000 - 1000;
          }
        }
        let forms = {
          adminId: this.value11,//申请人id
          adminDeptId: this.departId && this.departId.length > 0 ? this.departId : null, //	所在部门
          pageNum: this.pageNum, //分页页码
          pageSize: this.pageSize, //分页大小
          applyTimeE: endTime1, //结束申请时间
          applyTimeS: startTime1, //开始申请时间
          invoiceCode: this.value2, //发票代码
          invoiceNum: this.value1, //发票号码
          invoiceTimeE: endTime2, //结束开票日期
          invoiceTimeS: startTime2, //开始开票日期
          memberId: this.value5, //会员ID
          received: this.value10 ? Number(this.value10) : null, // 是否领用：1-已领用 0-未领用
          status: this.value3 ? Number(this.value3) : null, // 发票状态：1-退票 0-正常
          title: this.value4, // 	发票抬头
          totalAmountE: this.value8 ? Number(this.value8) : null, // 开票金额结束
          totalAmountS: this.value7 ? Number(this.value7) : null// 开票金额开始
        }
        getSaleTicketList(forms).then(resp => {
          if (resp.status === '200') {
            that.tableData = resp.response.list ? resp.response.list : [];
            that.dataCount = resp.response.total;
            //console.log(resp)
            that.$Spin.hide();
          } else {
            that.$Message.warning('无数据');
            that.$Spin.hide();
          }
        }).catch(err => {
          console.log(err);
          that.$Spin.hide();
        });
        // axios({
        //     url: '/finance/invoiceinfo/listPage',
        //     method: 'post',
        //     data: forms
        // }).then(resp => {
        //     if (resp.data.status === '200') {
        //         that.tableData = resp.data.response.list ? resp.data.response.list : [];
        //         that.dataCount = resp.data.response.total;
        //         //console.log(resp)
        //         that.$Spin.hide();
        //     } else {
        //         that.$Message.warning('无数据');
        //         that.$Spin.hide();
        //     }
        // }).catch(err => {
        //     console.log(err);
        //     that.$Spin.hide();
        // })
      },
      //模糊查询
      remoteMethod2(query) {
        if (query !== '') {
          this.loading2 = true;
          setTimeout(() => {
            this.loading2 = false;
            axios({
              url: '/finance/common/selectMember',
              method: 'get',
              params: {
                memberName: query
              }
            }).then(resp => {
              if (resp.data.status === '200') {
                const list = resp.data.response.map(item => {
                  return {
                    value: item.id,
                    label: item.name
                  };
                });
                this.options2 = list
              } else {
                _this.$Message.warning('无数据');
              }
            }).catch(err => {
              console.log(err);
            })
          }, 2000);
        } else {
          this.options2 = [];
        }
      },
      remoteMethod1(query) {
        if (query !== '') {
          this.loading1 = true;
          axios({
            url: '/finance/common/selectEmployee',
            method: 'post',
            data: formData({name: query})
          }).then(resp => {
            if (resp.data.status === '200') {
              this.loading1 = false;
              const list1 = JSON.parse(resp.data.response).map(item => {
                return {
                  value: item.id,
                  label: item.name
                };
              });
              this.options1 = list1
            } else {
              this.$Message.warning('无数据');
            }
          }).catch(err => {
            console.log(err);
          })
        } else {
          this.options1 = [];
        }
      }
    }
  }
</script>


