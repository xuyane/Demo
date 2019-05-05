<style lang="less" scoped>
@import "./confirmFinance.less";
.no-margin-left {
    margin-left: 0;
}

</style>

<template>
  <Row class="confirm-finance">
    <Col span="24">
    <Row class-name="current-position">
      当前位置：财务管理&nbsp;&nbsp;>>&nbsp;&nbsp;认账管理&nbsp;&nbsp;>>&nbsp;&nbsp;认账审核
    </Row>
    </Col>
    <Col span="24" class="confirm-finance-top">
    <confirm-title></confirm-title>
    </Col>
    <Col span="24" class-name="search-form">
    <Form :model="defaultForm" :label-width="80">
      <Row type="flex" justify="space-between">
        <Col span="7">
        <FormItem label="会员名称:">
          <select-member @query-list="getMember" :defailModel='defaultForm.memberId' ref="memberModal"></select-member>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="申请时间:">
          <DatePicker v-model="defaultForm.operatorTime" format="yyyy-MM-dd" type="daterange" placement="top-start" placeholder="请选择修改日期" class="search-input" @on-change="getOperatorTime"></DatePicker>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="合同号:">
          <Input v-model="defaultForm.contractNo" class="search-input" placeholder="请输入合同号"></Input>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="审核状态:">
          <Select v-model="defaultForm.auditStatus" class="search-input">
            <Option v-for="item in auditStatusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="申请人:">
          <Input v-model="defaultForm.creatorName" class="search-input" placeholder="请输入申请人"></Input>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="所在部门:">
          <select-department @data-list="getDepData" :emptyModel='defaultForm.deptIdList'></select-department>
        </FormItem>
        </Col>
        <Col span="24" class="text-right">
        <Button type="primary" @click="search">查询</Button>
        <Button style="margin-left:8px" @click="clearSearch">重置</Button>
        </Col>
      </Row>
    </Form>
    </Col>
    <Col span="24">
    <Row class-name="table-con">
      <div class="btn-container no-margin-left">
        <Button type="primary" class="" @click="auditAccountAck(1,1,ids)">批量通过</Button>
        <Button type="error" class="search-btn" @click="auditAccountAck(0,1,ids)">批量驳回</Button>
      </div>

      <Table class="tableCommon" @on-selection-change="selectData" :data="tableData" :columns="columns" ref="dragTable" :stripe="true" :border="true"></Table>

      <oil-page :total="total" :page-num="pageNum" :page-size="pageSize" @page-change="pageChange" :page-size-opts="pageSizeOpts" :show-sizer="showSizer"></oil-page>
    </Row>
    </Col>
    <Modal v-model="modal1" :title="modelTitle" @on-cancel="cancel" :width="tableModelWidth">
      <Table class="tableCommon" :data="tableData1" :columns="columnsDefault" :stripe="true" border>
      </Table>
      <div slot="footer">
          <Button @click="cancel">返回</Button>
      </div>
    </Modal>
    <Modal v-model="status.modal" :title="status.title" @on-cancel="checkStatusCancel" width="500">
      <Form :model="status" :label-width="80">
        <FormItem :label="status.reasonLabel" :class="status.isRequired">
          <Input v-model="status.reason" type="textarea" :rows="4" :placeholder="status.placeholder" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="checkStatusCancel">取消</Button>
        <Button type="primary" @click="checkStatus">确定</Button>
      </div>
    </Modal>
  </Row>
</template>

<script>
import confirmTitle from './confirmContractTitle.vue';
import oilPage from '../../components/page/page.vue';
import SelectAll from '../../components/finance/selectAll.vue';
import SelectDepartment from '../../components/finance/selectDepartment.vue';
import axios from 'axios';
import {formatThousandPrice } from '../../../assets/js/common';
import { getLoginData, getCancelAccountAckList, getContactProductDetail, getAccountTransferByCancelList, getCancelAccountAckDetail, auditCancelAccountAck } from '../../components/axios/finance.js';
import SelectMember from '../../components/finance/selectMember.vue';
import timeStampChange from "../../../assets/js/timestamp_change.js";
export default {
  name: 'confirmContractTitle',
  components: {
    confirmTitle,
    SelectAll,
    SelectDepartment,
    SelectMember,
    oilPage
  },
  computed: {},
  data() {
    return {
      status: {
        modal: false,
        title: '通过',
        reasonLabel: '通过原因:',
        reason: '',
        placeholder: '请输入通过原因',
        isRequired:""
        // reasonList: []
      },
      statusForm: {
        auditType: 0,
        operateType: 0,
        auditReason: '',
        id: null,
        ids: '',
      },
      id: null,
      ids: [],
      tableModelWidth: '500',
      modal1: false,
      statusModal: false,
      statusTitle: '通过',
      accountAckType: 'InvoiceStatusEnum',
      defaultForm: {
        memberName: '',
        operatorTime: '',
        contractNo: '',
        auditStatus: -1,
        creatorName: '',
        deptIdList: '',
        memberId: null,
      },
      operatorTimeStart:"",
      operatorTimeEnd:"",
      deptIds: [],
      deptIdList: [],
      auditStatusList: [
        {
          value: -1,
          label: '请选择'
        },
        {
          value: 0,
          label: '审核中'
        },
        {
          value: 1,
          label: '审核通过'
        },
        {
          value: 2,
          label: '驳回'
        }
      ],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      pageSizeOpts: [10,15,20,40,50,100],
      showSizer: true,
      columns: [
        {
          type: 'selection',
          key: "_disabled",
          width: 60,
          align: 'center'
        },
        {
          key: 'contractNo',
          align: 'center',
          title: '合同编号',
          minWidth: 180,
          render: (h, data) => {
            return h('span', {
              style: {
                color: '#145edb',
                textDecoration: 'underline',
                cursor: 'pointer'
              },
              on: {
                click: () => {
                  this.goheCode(data.row.contractNo);
                }
              }
            }, data.row.contractNo)
          }
        }, {
          key: 'contractName',
          align: 'center',
          title: '合同名称',
          minWidth: 160
        }, {
          key: 'memberName',
          align: 'center',
          title: '会员名称',
          tooltip: true,
          ellipsis: true,
          minWidth: 160
        }, {
          key: 'contractAmount',
          align: 'center',
          title: '合同金额',
          minWidth: 100,
          render: (h, data) => {
            return h('div', [
              h('span', {
                style: {
                },
              }, formatThousandPrice(data.row.contractAmount))
            ])
          }
        }, {
          key: 'productNames',
          align: 'center',
          title: '关联产品',
          minWidth: 170,
          render: (h, data) => {
            return h('span', {
              style: {
                color: '#145edb',
                textDecoration: 'underline',
                cursor: 'pointer'
              },
              on: {
                click: () => {
                  this.productNamesDetails(data.row.contractNo)
                }
              }
            }, data.row.productNames.length > 10 ? data.row.productNames.substring(0, 10) + '...' : data.row.productNames)
          }
        }, {
          key: 'amoutAcked',
          align: 'center',
          title: '关联到账',
          minWidth: 100,
          render: (h, data) => {
            return h('span', {
              style: {
                color: '#145edb',
                textDecoration: 'underline',
                cursor: 'pointer'
              },
              on: {
                click: () => {
                  this.amoutAckedDetails(data.row.id)
                }
              }
            }, '查看')
          }
        }, {
          key: 'ackAmount',
          align: 'center',
          title: '申请取消金额',
          minWidth: 100,
          render: (h, data) => {
            return h('div', [
              h('span', {
                style: {
                },
              }, formatThousandPrice(data.row.ackAmount))
            ])
          }
        }, {
          key: 'applyTypeDesc',
          align: 'center',
          title: '申请类型',
          minWidth: 100
        }, {
          key: 'refundReason',
          align: 'center',
          title: '取消原因',
          tooltip: true,
          ellipsis: true,
          minWidth: 120
        }, {
          key: 'adminName',
          align: 'center',
          title: '申请人',
          minWidth: 100
        }, {
          key: 'adminDeptName',
          align: 'center',
          title: '所在部门',
          minWidth: 150
        }, {
          key: 'createDate',
          align: 'center',
          title: '申请时间',
          minWidth: 150
        }, {
          key: 'auditor',
          align: 'center',
          title: '当前审核节点',
          minWidth: 120
        }, {
          key: 'applyStatusDesc',
          align: 'center',
          title: '审核状态',
          minWidth: 80
        }, {
          title: '操作',
          align: 'center',
          minWidth: 160,
          render: (h, data) => {
            // Number(data.row.auditorId) !== Number(this.loginerId)
            if (data.row.applyStatusDesc == '审核通过' || data.row.applyStatusDesc == '已驳回' || this.userInfo.loginName != data.row.auditor ) {
              return h('div', [
                h('span', {
                  style: {
                    color: '#145edb',
                    textDecoration: 'underline',
                    cursor: 'pointer'
                  },
                  on: {
                    click: () => {
                      this.details(data.row.id)
                    }
                  }
                }, '详情')
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
                      this.details(data.row.id)
                    }
                  }
                }, '详情'),
                h('span', {
                  style: {
                    color: '#145edb',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    marginLeft: '20px'
                  },
                  on: {
                    click: () => {
                      this.auditAccountAck(1, 0, data.row.id)
                    }
                  }
                }, '通过'),
                h('span', {
                  style: {
                    color: '#145edb',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    marginLeft: '20px'
                  },
                  on: {
                    click: () => {
                      this.auditAccountAck(0, 0, data.row.id)
                    }
                  }
                }, '驳回')
              ])
            }
          }
        }
      ],
      columnsDefault: [],
      modelTitle:"",
      columns1: [
        {
          key: 'productNameCn',
          align: 'center',
          title: '产品名称',
          minWidth: 120
        }, {
          key: 'serviceTime',
          align: 'center',
          title: '服务时段',
          minWidth: 180
        }, {
          key: 'saleAmount',
          align: 'center',
          title: '产品售价',
          minWidth: 120
        }
      ],
      columns2: [
        {
          key: 'transferTime',
          align: 'center',
          title: '到账时间',
          minWidth: 160
        }, {
          key: 'payTypeDesc',
          align: 'center',
          title: '支付方式',
          minWidth: 80
        }, {
          key: 'accountTypeDesc',
          align: 'center',
          title: '账户类型',
          minWidth: 80
        }, {
          key: 'transferFrom',
          align: 'center',
          title: '来源（户名）',
          minWidth: 80
        }, {
          key: 'transferAmount',
          align: 'center',
          title: '到账金额',
          minWidth: 80
        }, {
          key: 'refundAmount',
          align: 'center',
          title: '退款金额',
          minWidth: 80
        }
      ],
      columns3: [
        {
          key: 'auditorId',
          align: 'center',
          title: '序号',
          minWidth: 50
        }, {
          key: 'auditor',
          align: 'center',
          title: '审核人',
          minWidth: 80
        }, {
          key: 'auditTime',
          align: 'center',
          title: '审核时间',
          minWidth: 130,
          render: (h, data) => {
            return h('span', timeStampChange.format(data.row.auditTime))
          }
        }, {
          key: 'content',
          align: 'center',
          title: '审核批注',
          tooltip: true,
          ellipsis: true,
          minWidth: 100
        }, {
          key: 'pass',
          align: 'center',
          title: '审核结果',
          minWidth: 60,
          render: (h, data) => {
            return h('span', data.row.pass ? '通过' : '驳回')
          }
        }
      ],
      tableData: [],
      tableData1: [],
      userInfo:"",
      loginerId:""
    }
  },
  created() {
    this.getLoginerId();
    this.getName();
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
    //获取用户名
    getName(){
      const userPhoneInfo = JSON.parse(window.localStorage.getItem('userPhoneInfo'));
      console.log("userPhoneInfo",userPhoneInfo)
      if (userPhoneInfo) {
        this.userInfo= userPhoneInfo;
      }
      console.log("userInfo",this.userInfo)
    },
    // 获取登录人ID
    getLoginerId(){
      getLoginData().then(res => {
        if(res.status=="200"){
          console.log('登陆', res.response);
          this.loginerId = res.response.id;
           this.getList();
        }
      })
    },

    //获取会员名称
    getMember(data) {
      if (data) {
        this.defaultForm.memberName = data.label;
        this.defaultForm.memberId = data.value;
      } else {
        this.defaultForm.memberName = '';
        this.defaultForm.memberId = null;
      }
    },
    //获取认账审核列表
    getList() {
      //let that = this;
      this.$Spin.show();
      let form = {
        timestamp: new Date().getTime(),
        auditStatus: this.defaultForm.auditStatus,
        contractNo: this.defaultForm.contractNo,
        createTimeEnd: this.operatorTimeEnd,
        createTimeStart: this.operatorTimeStart,
        creatorName: this.defaultForm.creatorName,
        deptIds: this.deptIds,
        memberId: this.defaultForm.memberId,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      getCancelAccountAckList(form).then(res => {
        if (res.response.total > 0) {
          res.response.list.forEach((e, v, arr)=> {
            if (e.auditorId != this.loginerId) {
              arr[v]._disabled = true;
            } else {
              arr[v]._disabled = false;
            }
          })
          this.tableData = res.response.list;
        } else {
          this.tableData = [];
        }
        this.total = res.response.total;
        this.$Spin.hide();
      })
    },
    //详情
    details(id) {
      this.modal1 = true;
      let params = {
        ackApply: id
      }
      this.tableModelWidth = '700';
      this.modelTitle = "审核详情";
      this.columnsDefault = this.columns3
      getCancelAccountAckDetail(params).then(res => {
        this.tableData1 = res.response
      })
    },
    //获取关联产品详情
    productNamesDetails(contractNo) {
      this.modal1 = true;
      let params = {
        contractNo: contractNo
      }
      this.tableModelWidth = '500';
      this.modelTitle = "关联产品详情";
      this.columnsDefault = this.columns1
      getContactProductDetail(params).then(res => {
        this.tableData1 = res.response
      })
    },
    //获取关联到账详情
    amoutAckedDetails(id) {
      this.modal1 = true;
      let params = {
        ackApplyId: id
      }
      this.tableModelWidth = '1000';
      this.modelTitle = "关联到账详情";
      this.columnsDefault = this.columns2;
      getAccountTransferByCancelList(params).then(res => {
        this.tableData1 = res.response
      })
    },
    //获取部门树
    getDepData(deptLabel, deptId, deptCode) {
      this.deptIds = deptId;
    },
    //分页
    pageChange(page, pageSize) {
      if (page) {
        this.pageNum = page;
      };
      if (pageSize) {
        this.pageSize = pageSize;
      };
      this.getList();
    },
    search() {//查询按钮
      this.pageChange(1,10)
    },
    //取消关联产品详情弹窗
    cancel() {
      this.modal1 = false;
    },
    clearSearch() {//清空查询条件
      this.$refs.memberModal.clearMemberQuery();
      this.operatorTimeStart = "";
      this.operatorTimeEnd = "";
      this.defaultForm = {
        memberId: null,
        memberName: '',
        operatorTime: '',
        contractNo: '',
        auditStatus: -1,
        creatorName: '',
        deptIdList: [],
      }
    },
    getOperatorTime(data) {//获取修改时间
      let data1 = (data[0] + ' 00:00:00').toString();
      let data2 = (data[1] + ' 23:59:59').toString();
      let data1_val= new Date(Date.parse(data1.replace(/-/g,"/"))).getTime();
      let data2_val= new Date(Date.parse(data2.replace(/-/g,"/"))).getTime();
      this.operatorTimeStart = data1_val;
      this.operatorTimeEnd = data2_val;
    },
    //获取列表选中项
    selectData(selection) {
      this.ids = [];
      selection.map((item) => {
        this.ids.push(item.id)
      });
      console.log(this.ids)
    },
    //（批量）通过/驳回
    auditAccountAck(auditType, operateType, data) {
      console.log(operateType, data)
      if (operateType == 1 && data < 1) {
        this.$Message.error("请选择需要修改的合同");
        return false;
      }
      this.status.reason = '';
      this.status.modal = true;
      this.statusForm.auditType = auditType;
      this.statusForm.operateType = operateType;
      if (auditType == 0 && operateType == 0) {
        this.status.title = '驳回';
        this.status.reasonLabel = '驳回原因';
        this.status.placeholder = '请输入驳回原因';
        this.status.reason = "驳回";
        this.status.isRequired = "ismust";
        this.statusForm.id = data;

        // this.status.reasonList = [
        //   {
        //     value: '',
        //     label: '请选择'
        //   },
        //   {
        //     value: '信息不全',
        //     label: '信息不全'
        //   },
        //   {
        //     value: '其他',
        //     label: '其他'
        //   }
        // ]

      } else if (auditType == 0 && operateType == 1) {
        this.status.title = '批量驳回';
        this.status.reasonLabel = '驳回原因';
        this.status.placeholder = '请输入驳回原因';
        this.status.reason = "驳回";
        this.status.isRequired = "ismust";
        this.statusForm.ids = data.join(',');
        // this.status.reasonList = [
        //   {
        //     value: '',
        //     label: '请选择'
        //   },
        //   {
        //     value: '信息不全',
        //     label: '信息不全'
        //   },
        //   {
        //     value: '其他',
        //     label: '其他'
        //   }
        // ]
      } else if (auditType == 1 && operateType == 1) {
        this.status.title = '批量通过';
        this.status.reasonLabel = '通过原因';
        this.status.placeholder = '请输入通过原因';
        this.status.reason = "通过";
        this.status.isRequired = "";
        this.statusForm.ids = data.join(',');
      } else if (auditType == 1 && operateType == 0) {
        this.status.title = '通过';
        this.status.reasonLabel = '通过原因';
        this.status.placeholder = '请输入通过原因';
        this.statusForm.id = data;
        this.status.isRequired = "";
        this.status.reason = "通过";
      }

    },
    checkStatusCancel() {
      this.status.modal = false;
    },
    checkStatus() {
      this.statusForm.auditReason = this.status.reason;
      console.log(this.statusForm)
      if(this.statusForm.auditType==0){ //为0时是驳回,驳回才需要必填原因
        if (this.statusForm.auditReason == "" || this.statusForm.auditReason == "undefined") {
          this.$Message.error("请输入原因");
          return false;
        };
      }

      auditCancelAccountAck(this.statusForm).then(res => {
        if(res.status=="200"){
          this.$Message.success("审核成功！");
        }else{
          this.$Message.error("审核成功！");
        }
        this.status.modal = false;
        this.getList();
      })
    }
  }
}
</script>
