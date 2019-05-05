<style lang="less" scoped>
  @import "./confirmFinance.less";
</style>

<template>
  <Row class="confirm-finance">
    <Col span="24">
    <Row class-name="current-position">
      当前位置：财务管理&nbsp;&nbsp;>>&nbsp;&nbsp;认账管理&nbsp;&nbsp;>>&nbsp;&nbsp;合同认账
    </Row>
    </Col>
    <Col span="24" class="confirm-finance-top">
    <confirm-title></confirm-title>
    </Col>
    <Col span="24" class-name="search-form">
    <Form :model="form" :label-width="80">
      <Row type="flex" justify="space-between">
        <Col span="7">
        <FormItem label="合同编号:">
          <Input v-model="form.code" class="search-input" placeholder="请输入合同编号"></Input>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="客户名称:">
          <Select v-model="form.memberId" filterable class="search-input" @on-query-change="getCustomList" ref="selectMember">
            <Option v-for="item in customList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="7">
        <Row>
          <FormItem label="合同金额:">
            <Col span="11">
            <Input v-model="form.totalAmoutMin" class="search-input" placeholder="请输入最小值" @on-keyup="numberInput(form.totalAmoutMin,'min')"></Input>
            </Col>
            <Col span="2" class="text-center">--</Col>
            <Col span="11">
            <Input v-model="form.totalAmoutMax" class="search-input" placeholder="请输入最大值" @on-keyup="numberInput(form.totalAmoutMax,'max')"></Input>
            </Col>
          </FormItem>
        </Row>
        </Col>
        <Col span="7">
        <FormItem label="业务员:">
          <Input v-model="form.creatorName" class="search-input" placeholder="请输入业务员"></Input>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="所在部门:">
          <select-department @data-list="getDepData" :emptyModel='form.deptIdList'></select-department>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="认账状态:">
          <select-all @query-list="getAccountAckStatus" :emptyModel='form.accountAckStatus' :defailType='accountAckType'></select-all>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="合同状态:">
          <Select v-model="form.contractStatus" class="search-input">
            <Option v-for="item in arrStatus" :value="item.value" :key="item.value">{{ item.desc }}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="7" class="text-right">
        <Button type="primary" @click="search">查询</Button>
        <Button style="margin-left-8px" @click="clearSearch">重置</Button>
        </Col>
      </Row>
    </Form>
    </Col>
    <Col span="24" class="product-opening-table">
    <Row>
      <Col span="24" class="text-right"> 合计：
      <span class="font-c-blue mar-r-10">{{formatPrice(totalAmount)}}</span>
      已认账:
      <span class="font-c-blue mar-r-10">{{formatPrice(amoutAcked)}}</span>
      未认账:
      <span class="font-c-blue">{{formatPrice(amoutUnAck)}}</span>
      </Col>
      <Col span="24" class="mar-t-10">
      <Table class="tableCommon" :data="tableData" :columns="columns" ref="dragTable" :stripe="true" :border="true"></Table>
      <oil-page :total="total" :page-num="form.pageNum" :page-size="form.pageSize" @page-change="pageChange" :page-size-opts="pageSizeOpts"
        :show-sizer="showSizer"></oil-page>
      </Col>
    </Row>
    </Col>
  </Row>
</template>

<script>
  import ConfirmTitle from './confirmContractTitle.vue';
  import OilPage from '../../components/page/page.vue';
  import SelectAll from '../../components/finance/selectAll.vue';
  import SelectDepartment from '../../components/finance/selectDepartment.vue';
  import axios from 'axios';
  import { formData, formatThousandPrice } from '../../../assets/js/common';
  import { getAccountackcontractList } from '../../components/axios/finance.js'
  export default {
    name: 'confirmContractTitle',
    components: {
      SelectAll,
      ConfirmTitle,
      OilPage,
      SelectDepartment
    },
    computed: {},
    data() {
      return {
        arrStatus: [],
        contractType: 'AckContractStatusEnum',
        accountAckType: 'InvoiceStatusEnum',
        deptIdLists: '',
        defaultForm: {
          code: '',
          accountAckStatus: '',
          creatorName: '',
          deptIdList: '',
          pageNum: 1,
          pageSize: 10,
          memberId: '',
          totalAmoutMax: '',
          totalAmoutMin: '',
          contractStatus: ''
        },
        form: {
          code: "",
          accountAckStatus: "",
          creatorName: "",
          deptIdList: "",
          pageNum: 1,
          pageSize: 10,
          memberId: "",
          totalAmoutMax: "",
          totalAmoutMin: "",
          contractStatus: ""
        },
        totalAmount: '4000.00',
        amoutAcked: '1000.00',
        amoutUnAck: '3000.00',
        accountAckList: [],
        customList: [],
        //contractStatusList: [],
        total: 0,
        pageSizeOpts: [10, 15, 20, 40, 50, 100],
        showSizer: true,
        columns: [
          {
            key: 'code',
            align: 'center',
            title: '合同编号',
            minWidth: 160
          }, {
            key: 'name',
            align: 'center',
            title: '合同名称',
            minWidth: 160
          }, {
            key: 'partA',
            align: 'center',
            title: '客户名称',
            minWidth: 160
          }, {
            key: 'createTimeDes',
            align: 'center',
            title: '合同创建时间',
            minWidth: 120
          }, {
            key: 'totalAmount',
            align: 'center',
            title: '合同总金额',
            minWidth: 100,
            render: (h, data) => {
              return h('div', [
                h('span', {
                  style: {
                  },
                }, formatThousandPrice(data.row.totalAmount))
              ])
            }
          }, {
            key: 'amoutAcked',
            align: 'center',
            title: '已认账金额',
            minWidth: 100,
            render: (h, data) => {
              return h('div', [
                h('span', {
                  style: {
                  },
                }, formatThousandPrice(data.row.amoutAcked))
              ])
            }
          }, {
            key: 'amoutUnAck',
            align: 'center',
            title: '待认账金额',
            minWidth: 100,
            render: (h, data) => {
              return h('div', [
                h('span', {
                  style: {
                  },
                }, formatThousandPrice(data.row.amoutUnAck))
              ])
            }
          }, {
            key: 'creatorName',
            align: 'center',
            title: '业务员',
            minWidth: 90
          }, {
            key: 'deptName',
            align: 'center',
            title: '所在部门',
            minWidth: 90
          }, {
            key: 'contractStatusDes',
            align: 'center',
            title: '合同状态',
            minWidth: 80
          }, {
            key: 'accountAckStatusDes',
            align: 'center',
            title: '认账状态',
            minWidth: 80
          }, {
            title: '操作',
            align: 'center',
            minWidth: 150,
            render: (h, data) => {
              if (data.row.contractStatusDes == "作废") {
                return h('div', [
                  h('span', {
                    style: {
                      color: '#cccccc',
                      textDecoration: 'underline',
                      cursor: 'pointer'
                    },
                    on: {
                      click: () => {
                      }
                    }
                  }, '认账'),
                  h('span', {
                    style: {
                      color: '#cccccc',
                      textDecoration: 'underline',
                      cursor: 'pointer',
                      marginLeft: '20px'
                    },
                    on: {
                      click: () => {
                      }
                    }
                  }, '取消认账')
                ])
              } else {

                if (data.row.accountAckStatusDes == "完全认账") {
                  if (data.row.cancelStatus == 0) {
                    return h('div', [
                      h('span', {
                        style: {
                          color: '#cccccc',
                          textDecoration: 'underline',
                          cursor: 'pointer'
                        },
                        on: {
                          click: () => {
                          }
                        }
                      }, '认账'),
                      h('span', {
                        style: {
                          color: '#145edb',
                          textDecoration: 'underline',
                          cursor: 'pointer',
                          marginLeft: '20px'
                        },
                        on: {
                          click: () => {
                            this.cancelAccount(data.row.id)
                          }
                        }
                      }, '取消认账')
                    ])
                  } else {
                    return h('div', [
                      h('span', {
                        style: {
                          color: '#cccccc',
                          textDecoration: 'underline',
                          cursor: 'pointer'
                        },
                        on: {
                          click: () => {
                          }
                        }
                      }, '认账'),
                      h('span', {
                        style: {
                          color: '#145edb',
                          textDecoration: 'none',
                          cursor: 'pointer',
                          marginLeft: '20px'
                        },
                      }, '取消中'),
                      h('span', {
                        style: {
                          color: '#145edb',
                          textDecoration: 'underline',
                          cursor: 'pointer',
                          marginLeft: '20px'
                        },
                        on: {
                          click: () => {
                            this.cancelAccountDetail(data.row.id)
                          }
                        }
                      }, '查看')
                    ])
                  }

                } else if (data.row.accountAckStatusDes == "未认账") {
                  return h('div', [
                    h('span', {
                      style: {
                        color: '#145edb',
                        textDecoration: 'underline',
                        cursor: 'pointer'
                      },
                      on: {
                        click: () => {
                          this.confirmContractDetail(data.row.id)
                        }
                      }
                    }, '认账'),
                    h('span', {
                      style: {
                        color: '#cccccc',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                        marginLeft: '20px'
                      },
                      on: {
                        click: () => {
                        }
                      }
                    }, '取消认账')
                  ])
                } else {
                  if (data.row.cancelStatus == 1) {
                    return h('div', [
                      h('span', {
                        style: {
                          color: '#145edb',
                          textDecoration: 'underline',
                          cursor: 'pointer'
                        },
                        on: {
                          click: () => {
                            this.confirmContractDetail(data.row.id)
                          }
                        }
                      }, '认账'),
                      h('span', {
                        style: {
                          color: '#145edb',
                          textDecoration: 'none',
                          cursor: 'pointer',
                          marginLeft: '20px'
                        },
                       
                      }, '取消中'),
                      h('span', {
                        style: {
                          color: '#145edb',
                          textDecoration: 'underline',
                          cursor: 'pointer',
                          marginLeft: '20px'
                        },
                        on: {
                          click: () => {
                            this.cancelAccountDetail(data.row.id)
                          }
                        }
                      }, '查看')
                    ])
                  } else {
                    return h('div', [
                      h('span', {
                        style: {
                          color: '#145edb',
                          textDecoration: 'underline',
                          cursor: 'pointer'
                        },
                        on: {
                          click: () => {
                            this.confirmContractDetail(data.row.id)
                          }
                        }
                      }, '认账'),
                      h('span', {
                        style: {
                          color: '#145edb',
                          textDecoration: 'underline',
                          cursor: 'pointer',
                          marginLeft: '20px'
                        },
                        on: {
                          click: () => {
                            this.cancelAccount(data.row.id)
                          }
                        }
                      }, '取消认账')
                    ])
                  }

                }
              }
            }
          }
        ],
        tableData: [],
      }
    },
    mounted() {
      this.getList();
      this.getAmount();
      this.getCustomList();
      this.getContractStatus();
    },
    methods: {
      formatPrice(num) {
        return formatThousandPrice(num)
      },
      //金额只允许输入数字
      numberInput(value, type) {
        if (value != "") {
          if (type == "min") {
            this.form.totalAmoutMin = value.replace(/[^\d.]/g, "");
          }
          if (type == "max") {
            this.form.totalAmoutMax = value.replace(/[^\d.]/g, "");
          }
        }
      },
      //获取客户列表
      getCustomList(st) {
        var that = this;
        axios({
          url: "/finance/common/selectMember",
          method: 'get',
          params: {
            memberName: st ? st : ''
          }
        }).then(function (res) {
          if (res.data.status == 200) {
            that.customList = res.data.response;
          };
          that.$Spin.hide();
        }).catch(err => {
          console.log(err)
          that.$Spin.hide();
        });
      },
      //获取合同状态
      getContractStatus(data) {
        //let params =
        axios({
          url: '/finance/common/select',
          method: 'get',
          params: { type: 'AckContractStatusEnum' }
        }).then((res) => {
          if (res.status == 200) {
            this.arrStatus = res.data.response;
          };
        }).catch(err => {
          console.log(err)
        });
      },
      //获取认账状态
      getAccountAckStatus(data) {
        if (data) {
          this.form.accountAckStatus = data.value
        }
      },
      //获取所在部门
      getDepData(value, selectedData) {
        this.form.deptIdList = selectedData;
      },
      //获取列表信息
      getList() {
        this.$Spin.show();
        this.form.contractStatus = this.form.contractStatus == undefined ? "" : this.form.contractStatus;
        this.form.memberId = this.form.memberId == undefined ? "" : this.form.memberId;
        this.form.timestamp = new Date().getTime();
        getAccountackcontractList(formData(this.form)).then(res => {
          if (Number(res.status) == 200) {
            if (res.response.list == null || res.response.list.length < 1) {
              this.tableData = [];
            } else {
              this.tableData = res.response.list;
            }
            this.total = res.response.total;
          }
          this.$Spin.hide();
        })
      },
      //查询金额统计
      getAmount() {
        this.form.contractStatus = this.form.contractStatus == undefined ? "" : this.form.contractStatus;
        this.form.memberId = this.form.memberId == undefined ? "" : this.form.memberId;
        axios({
          url: '/finance/accountackcontract/listAmountCount',
          method: 'post',
          data: formData(this.form)
        }).then((res) => {
          if (Number(res.data.status) == 200) {
            this.totalAmount = res.data.response.totalAmoutCount;
            this.amoutAcked = res.data.response.amoutAckedCount;
            this.amoutUnAck = res.data.response.amoutUnAckCount;
          };
        }).catch(err => {
          console.log('测试', err)
        });
      },
      //分页
      pageChange(page, pageSize) {
        if (page) {
          this.form.pageNum = page;
        };
        if (pageSize) {
          this.form.pageSize = pageSize;
        };
        this.getList();
        this.getAmount();
      },
      //查询按钮
      search() {
        this.pageChange(1, 10)
      },
      //清空查询条件
      clearSearch() {
        //清空客户名称的搜索词
        this.$refs.selectMember.$data.query = "";
        //清空客户下拉单选项
        this.$refs.selectMember.clearSingleSelect();
        this.form = {
          code: "",
          accountAckStatus: "",
          creatorName: "",
          deptIdList: "",
          pageNum: 1,
          pageSize: 10,
          memberId: "",
          totalAmoutMax: "",
          totalAmoutMin: "",
          contractStatus: ""
        }
      },
      //取消认账路由跳转
      cancelAccount(datas) {
        this.$router.push({
          name: 'cancelAccount',
          query: {
            contractBaseId: datas
          }
        })
      },
      //查看取消详情
      cancelAccountDetail(datas) {
        this.$router.push({
          name: 'cancelAccountDetail',
          query: {
            contractBaseId: datas
          }
        })
      },
      //认账路由跳转
      confirmContractDetail(contractBaseId) {
        this.$router.push({
          name: 'confirmContractDetail',
          query: {
            contractBaseId: contractBaseId
          }
        })
      }
    }
  }
</script>