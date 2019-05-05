<style lang="less" scoped>

</style>
<template>
  <Row>
    <Col span="24" class-name="search-form">
      <Form :model="formItem" :label-width="100">
        <Row type="flex" justify="space-between">
          <Col span="7">
            <FormItem label="合同编号:">
              <Input v-model="formItem.code" class="search-input" placeholder="请输入合同编号"></Input>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="客户名称:">
              <Select
                v-model="formItem.memberId"
                class="search-input"
                filterable
                remote
                @on-query-change="remoteMethod"
                :loading="loading">
                <Option v-for="(option, index) in options" :value="option.id" :key="index">{{option.name}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="是否要票:">
              <Select v-model="formItem.isNeedInvoice" class="form-select">
                <Option v-for="item in boolList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="space-between">
          <Col span="7">
            <FormItem label="业务员:">
              <Input v-model="formItem.creatorName" class="search-input" placeholder="请输入业务员"></Input>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="所在部门:">
              <select-department @data-list="getDepData" :emptyModel='formItem.deptIdList'></select-department>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="开票状态:">
              <Select v-model="formItem.invoiceStatus" class="form-select">
                <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="space-between">
          <Col span="7">
            <FormItem label="合同创建时间:">
              <DatePicker v-model="formItem.time" @on-change="dateChange" type="daterange" split-panels placeholder="选择创建时间" class="search-input"></DatePicker>
            </FormItem>
          </Col>
          <Col span="7" class="text-right">
            <Button type="primary" @click="search">查询</Button>
            <Button style="margin-left: 8px" @click="reset">重置</Button>
          </Col>
        </Row>
      </Form>
    </Col>
    <Col span="24">
      <Row class-name="table-con">
        <Table class="tableCommon"
          :data="tableData"
          :columns="columns"
          ref="dragTable"
          :stripe="true"
          :border="true"
          :loading="tableLoading"
          @on-selection-change="selectChange">
        </Table>
        <oil-page
          :total="total"
          :page-size="pageSize"
          @page-change="pageChange"
          :page-size-opts="pageSizeOpts"
          :show-sizer="showSizer">
        </oil-page>
      </Row>
    </Col>
  </Row>
</template>
<script>
import axios from 'axios'
import OilPage from '../components/page/page.vue'
import { getInvoiceapplyList, invoiceapplyDetails } from '../components/axios/finance.js'
import { formData,formatThousandPrice } from '../../assets/js/common.js'
import SelectDepartment from '../components/finance/selectDepartment.vue'
export default {
  data() {
    return {
      total: 0,
      pageSize: 10,
      pageNum: 1,
      showSizer: true,
      pageSizeOpts: [10,15,20,40,50,100],
      selection: [],
      loading: false,
      tableLoading: false,
      options: [],
      departData: [],
      boolList: [
        {value: 1, label: '是'},
        {value: 0, label: '否'}
      ],
      statusList: [
        {value: 1, label: '全部开票'},
        {value: 0, label: '未开票'},
        {value: 2, label: '部分开票'}
      ],
      columns: [
        {
          key: 'code',
          title: '合同编号',
          align: 'center',
          minWidth:150,
          render: (h, data) => {
            return h('span', {
              style: {
                color: '#145edb',
                cursor: 'pointer',
                textDecoration: 'underline'
              },
              on: {
                click: () => {
                  this.goheCode(data.row.code);
                }
              }
            }, data.row.code)
          }
        },
        // {
        //   key: 'name',
        //   title: '合同名称',
        //   align: 'center',
        //   minWidth:200,
        //   render: (h, data) => {
        //     return h('span',{
        //       props: {
        //         type: 'text',
        //         value: data.row.name
        //       },
        //       on: {
        //         'on-blur': event => {
        //           data.row.name = event.target.value;
        //           this.updateTable(data)
        //         }
        //       }
        //     })
        //   }
        // },
        {
          key: 'name',
          title: '合同名称',
          align: 'center',
          minWidth:300
        },
        {
          key: 'partA',
          title: '客户名称',
          align: 'center',
          minWidth:200
        },
        {
          key: 'totalAmount',
          title: '合同总金额',
          align: 'center',
          minWidth:100,
          render: (h, data) => {
              return h('span',{
                  style: {}
              },formatThousandPrice(data.row.totalAmount))
          }
        },
        {
          key: 'invoicedAmount',
          title: '已开票金额',
          align: 'center',
          minWidth:100,
          render: (h, data) => {
              return h('span',{
                  style: {}
              },formatThousandPrice(data.row.invoicedAmount))
          }
        },
        {
          key: 'applyAmount',
          title: '申请中金额',
          align: 'center',
          minWidth:100,
          render: (h, data) => {
              return h('span',{
                  style: {}
              },formatThousandPrice(data.row.applyAmount))
          }
        },
        {
          key: 'openingInvoiceAmount',
          title: '可开票金额',
          align: 'center',
          minWidth:100,
          render: (h, data) => {
              return h('span',{
                  style: {}
              },formatThousandPrice(data.row.openingInvoiceAmount))
          }
        },
        {
          key: 'isNeedInvoice',
          title: '是否要票',
          align: 'center',
          minWidth:100
        },
        {
          key: 'createTimeDes',
          title: '合同创建时间',
          minWidth: 150,
          align: 'center'
        },
        {
          key: 'creatorName',
          title: '业务员',
          align: 'center',
          minWidth:100
        },
        {
          key: 'deptName',
          title: '所在部门',
          align: 'center',
          minWidth:100
        },
        {
          title: '操作',
          minWidth:90,
          align: 'center',
          // fixed: 'right',
          render: (h, data) => {
            if(data.row.openingInvoiceAmount > 0 && data.row.applyAmount == 0){
              return h('a', {
                style: {
                  color: '#145edb',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    this.$Spin.show();
                    invoiceapplyDetails({ contratcId: data.row.id }).then(res => {
                      if (res.response.memberId) {
                        this.$router.push({
                          name: 'applyDetail',
                          query: { id: data.row.id }
                        })
                      }else {
                        this.$Spin.hide();
                        this.$Message.warning({
                          content: '该合同的会员未维护开票信息，请到开票信息维护中先行维护会员开票信息。',
                          duration: 2
                        })
                      }
                      this.$Spin.hide();
                    })
                  }
                }
              }, '开票')
            }else{
              return h('a', {}, '')
            }

          }
        }
      ],
      tableData: [],
      formItem: {
        startTime: null,
        endTime: null,
        creatorName: '',
        isNeedInvoice: '',
        invoiceStatus: '',
        memberId: "",
        code: '',
        deptIdList: []
      }
    }
  },
  components: {
    OilPage,
    SelectDepartment
  },
  created() {
    this.getDataList1()
  },
  methods: {
    updateTable(data) {
      this.tableData[data.index] = data.row;
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
    // 获取数据
    getDataList1 () {
      // this.tableLoading = true;
      let form = {
        timestamp: new Date().getTime(),
        code: this.formItem.code,
      creatorName: this.formItem.creatorName,
        deptIdList: this.formItem.deptIdList,
        endTime: this.formItem.endTime ? this.formItem.endTime : "",
        invoiceStatus: this.formItem.invoiceStatus == undefined ? "" : this.formItem.invoiceStatus,
        isNeedInvoice: this.formItem.isNeedInvoice == undefined ? "" : this.formItem.isNeedInvoice,
        memberId: this.formItem.memberId ? this.formItem.memberId : "",
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        startTime: this.formItem.startTime ? this.formItem.startTime : '',
        totalAmoutMax: '',
        totalAmoutMin: '',
      }
//      let formDat = formData(form)
      getInvoiceapplyList(formData(form))
      .then(res => {
        // this.tableLoading = false;
        this.tableData = res.response.list ? res.response.list : []
        this.total = res.response.total
      })
    },
    // 监听选择日期
    dateChange (date) {
      this.formItem.startTime = this.formatTime(date[0]) - 8 * 1000 * 60 * 60
      this.formItem.endTime = this.formatTime(date[1]) + 16 * 1000 * 60 * 60 - 1000
    },
    search(){
      this.pageNum = 1;
      this.pageSize = 10;
      this.getDataList1()
    },
    // 重置
    reset () {
      this.pageNum = 1;
      this.pageSize = 10;
      this.formItem = {
        startTime: '',
        endTime: '',
        creatorName: '',
        isNeedInvoice: '',
        invoiceStatus: '',
        memberId: null,
        code: '',
        deptIdList: []
      }
    },
    //搜索模糊查询
    remoteMethod(st){
      var that=this;
      axios({
        url: "/finance/common/selectMember",
        method: 'get',
        params:{
          memberName:st ? st:''
        }
      }).then(function(res){
        if(res.data.status == 200){
            that.options = res.data.response;
        };
        that.$Spin.hide();
      }).catch(err => {
        that.$Spin.hide();
      });
    },
    // 获取部门列表
    getDepData (deptLabel,deptId,deptCode){
      this.formItem.deptIdList = deptId
    },
    //页码事件
    pageChange (page, pageSize) {
      if(page) {
        this.pageNum = page
      }
      if(pageSize) {
        this.pageSize = pageSize
      }
      this.getDataList1()
    },
    selectChange (selection) {
      this.selection = selection
      // console.log(selection)
    },
    // 转时间戳
    formatTime (date) {
      return new Date(date).getTime()
    }
  }
}
</script>
