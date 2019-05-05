<style lang="less" scoped>
  .goldRefund{
    .bread-crumb{
      font-size: 14px;
      color: #000;
    }

    .f_card{
      margin: 20px 0;
    }

    .form_wrap {
      .form_item {
        width: 90%;
      }
    }

    .page {
      margin: 10px 0;
      text-align: right;
      padding-right: 18px;
    }
  }
</style>

<template>
  <div class="goldRefund">
    <span class="bread-crumb">当前位置：财务管理&nbsp;&nbsp;>>&nbsp;&nbsp;到账退款</span>
    <Card dis-hover class="f_card">
      <span slot="title">退款搜索</span>
      <div class="form_wrap">
        <Form ref="refund_form" :model="formValue" :label-width="100">
          <Row type="flex" justify="space-between">
            <i-Col span="7">
              <FormItem label="支付方式：" class="search-input" prop="payType">
                <Select v-model="formValue.payType">
                  <Option v-for="item in payTypes" :key="item.value" :value="item.value">{{item.desc}}</Option>
                </Select>
              </FormItem>
            </i-Col>
            <i-Col span="7">
              <Row>
                <i-Col span="5">
                  <Select class="search-input" v-model="formValue.timeStatus">
                    <Option v-for="item in timeTypes" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </i-Col>
                <i-Col span="19">
                  <DatePicker type="daterange" :editable="editable" class="search-input" placeholder="请选择" v-model="dateArr"></DatePicker>
                </i-Col>
              </Row>
            </i-Col>
            <i-Col span="7">
              <FormItem label="账号：" class="search-input" prop="accountNo">
                <i-Input class='item_control' v-model="formValue.accountNo"></i-Input>
              </FormItem>
            </i-Col>
            <i-Col span="7">
              <FormItem label="到账金额：" class="search-input">
                <i-Col span="11">
                  <i-Input class="search-input" placeholder="最小金额" v-model="formValue.totalAmoutMin"></i-Input>
                </i-Col>
                <i-Col span="2" class="text-center">--</i-Col>
                <i-Col span="11">
                  <i-Input class="search-input" placeholder="最大金额" v-model="formValue.totalAmoutMax"></i-Input>
                </i-Col>
              </FormItem>
            </i-Col>
            <i-Col span="7">
              <FormItem label="交易流水号：" class="search-input" prop="transferNo">
                <i-Input class='item_control' v-model="formValue.transferNo"></i-Input>
              </FormItem>
            </i-Col>
            <i-Col span="7">
              <FormItem label="来源(户名)：" class="search-input" prop="transferFrom">
                <i-Input class='item_control' v-model="formValue.transferFrom"></i-Input>
              </FormItem>
            </i-Col>
            <i-Col span="7">
              <FormItem label="状态：" class="search-input" prop="auditStatus">
                <Select v-model="formValue.auditStatus">
                  <Option v-for="item in status" :value="item.value" :key="item.value">{{item.label}}</Option>
                </Select>
              </FormItem>
            </i-Col>
            <i-Col span="24" class="text-right">
              <ButtonGroup>
                <Button type="primary" @click="onSearch">查询</Button>
                <Button @click="onReset">重置</Button>
              </ButtonGroup>
            </i-Col>
          </Row>
        </Form>
      </div>
    </Card>


    <Card :bordered="false" dis-hover>
      <span slot="title">退款审核列表</span>
      <div class="table">
        <Table :columns="columns" :data="refundList" :loading="loading">
          <div class="page" slot="footer">
            <Page :page-size="formValue.pageSize" :current="formValue.pageNum" :total="total" show-elevator show-total show-sizer @on-change="onPageChange" @on-page-size-change="onPageSizeChange" />
          </div>
        </Table>
      </div>
    </Card>
  </div>
</template>

<script>
  import axios from 'axios';
  import { getSelectAllList, getRefundList } from "../../components/axios/finance.js";
  import { formatThousandPrice } from "../../../assets/js/common.js";
  export default {
    name: "goldRefund",
    data() {
      return {
        editable: false,
        dateArr: [],
        loading: true,

        formValue: {
          payType: '',                    // 支付方式
          timeStatus: 0,                  // 时间类型
          transferStartTime: '',         // 到账开始时间
          transferEndTime: '',           // 到账结束时间
          accountNo: '',                 // 账号
          totalAmoutMin: '',             // 到账金额最小值
          totalAmoutMax: '',             // 到账金额最大值
          transferNo: '',             // 交易流水号
          transferFrom: '',             // 来源
          auditStatus: 0,             // 状态
          pageNum: 1,
          pageSize: 10,
          sign: '',
          v: Math.random() * 1000
        },

        columns: [
          {
            key: "id",
            title: "序号",
            align: "center",
            minWidth: 70
          },
          {
            key: "payTypeDesc",
            align: "center",
            title: "支付方式",
            minWidth: 100
          },
          {
            key: "transferNo",
            align: "center",
            title: "交易流水号",
            minWidth: 180
          },
          {
            key: "accountTypeDesc",
            align: "center",
            title: "账户类型",
            minWidth: 80
          },
          {
            key: "accountNo",
            align: "center",
            title: "账号",
            minWidth: 180
          },
          {
            key: "transferFrom",
            align: "center",
            title: "来源(户名)",
            minWidth: 180
          },
          {
            key: "note",
            align: "center",
            title: "备注",
            minWidth: 200,
            ellipsis: true,
            render: (h, params) => {
              return h('Tooltip', {
                props: { placement: 'top' }
              }, [
                params.row.note.length > 12 ? params.row.note.slice(0, 12) + "..." : params.row.note,
                h('span', { slot: 'content', style: { whiteSpace: 'normal', wordBreak: 'break-all' } }, params.row.note)
              ]);
            }
          },
          {
            key: "totalAmout",
            align: "center",
            title: "到账金额",
            minWidth: 80,
              render: (h, data) => {
              return h('div', [
                h('span', {}, formatThousandPrice(data.row.totalAmout))
              ])
            }
          },
          {
            key: "refundAmount",
            align: "center",
            title: "退款金额",
            minWidth: 80,
              render: (h, data) => {
                return h('div', [
                  h('span', {}, formatThousandPrice(data.row.refundAmount))
                ])
            }
          },
          {
            key: "recognableAmount",
            align: "center",
            title: "可认账金额",
            minWidth: 100,
              render: (h, data) => {
                return h('div', [
                  h('span', {}, formatThousandPrice(data.row.recognableAmount))
                ])
            }
          },
          {
            key: "currentRefundAmount",
            align: "center",
            title: "本次退款金额",
            minWidth: 100,
              render: (h, data) => {
                return h('div', [
                  h('span', {}, formatThousandPrice(data.row.currentRefundAmount))
                ])
            }
          },
          {
            key: "transferTime",
            align: "center",
            title: "到账时间",
            minWidth: 150
          },
          {
            key: "createTime",
            align: "center",
            title: "导入时间",
            minWidth: 150
          },
          {
            key: "creatorName",
            align: "center",
            title: "导入人",
            minWidth: 80
          },
          {
            key: "auditor",
            align: "center",
            title: "审核人",
            minWidth: 80
          },
          {
            key: "auditStatusDesc",
            align: "center",
            title: "状态",
            minWidth: 80
          },
          {
            title: "操作",
            align: "center",
            minWidth: 150,
            fixed: 'right',
            render: (h, data) => {
              return h("div", [
                h(
                  "span",
                  {
                    style: {
                      display: data.row.auditorId === this.userId ? 'inline-block' : 'none',
                      marginRight: "8px",
                      color: "blue",
                      textDecoration: "underline",
                      cursor: "pointer"
                    },
                    on: {
                      click: () => {
                        this.$router.push({ name: 'goldRefundDetail', params: { applyId: data.row.refundApplyId }, query: { type: 'check' } });
                      }
                    }
                  },
                  "审核"
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
                        this.$router.push({ name: 'goldRefundDetail', params: { applyId: data.row.refundApplyId } });
                      }
                    }
                  },
                  "查看"
                )
              ]);
            }
          }
        ],
        refundList: [],
        total: 0,

        // 支付类型
        payTypes: [],

        // 时间类型
        timeTypes: [
          {
            value: 0,
            label: "到账时间"
          },
          {
            value: 1,
            label: "导入时间"
          }
        ],

        // 状态
        status: [
          {
            value: 0,
            label: "待审核"
          },
          {
            value: 1,
            label: "已审核"
          },
          {
            value: 2,
            label: "驳回"
          }
        ],
        userId: ''
      }
    },
    created(){
      this.dateArr = [this.currentMonthFirstDay, this.currentMonthLastDay];
      this._initDatas();
    },

    mounted() {
      setTimeout(() => {
        const userPhoneInfo = JSON.parse(window.localStorage.getItem('userPhoneInfo'));
        if (userPhoneInfo) {
          this.userId = userPhoneInfo.ids;
//          console.log(typeof this.userId);
        }
      }, 2000);
    },

    computed: {
      // 本月第一天
      currentMonthFirstDay() {
        const date = new Date();
        const month = date.getMonth();
        const monthFirstDay = new Date(date.getFullYear(), month, 1);
        return new Date(monthFirstDay);
      },

      // 本月最后一天
      currentMonthLastDay() {
        const date = new Date();
        const nextMonth = date.getMonth() + 1;
        const nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
        const oneDay = 1000 * 60 * 60 * 24;
        return new Date(nextMonthFirstDay - oneDay);
      }
    },

    methods: {
      onSearch() {
        this.loading = true;
        this.formValue.pageNum = 1;
        this._getRefundList();
      },
      onPageSizeChange(pageSize){
        this.formValue.pageNum = 1;
        this.formValue.pageSize = pageSize;
        this.loading = true;
        this._getRefundList();
      },
      onPageChange(page){
        this.formValue.pageNum = page;
        this.loading = true;
        this._getRefundList();
      },

      onReset() {
        this.$refs['refund_form'].resetFields();
        this.formValue.totalAmoutMin = this.formValue.totalAmoutMax = '';
        this.dateArr = [];
        this.formValue.transferStartTime = this.formValue.transferEndTime = '';
      },

      _initDatas() {
        axios.all([this._getPayTypeList(), this._getRefundList(true)])
          .then(axios.spread((payTypes, refundList) => {
            this.payTypes = payTypes.response;
            this.total = refundList.response.total;
            this.refundList = refundList.response.list || [];
            this.loading = false;
          }));
      },
      _getPayTypeList() {
        return getSelectAllList({
          type: "PayTypeEnum",
          timestamp: +new Date()
        });
      },
      _getRefundList(isFirst = false) {
        if (!this.dateArr[0] || !this.dateArr[1]) {
          this.formValue.transferStartTime = this.formValue.transferEndTime = '';
        }else {
          this.formValue.transferStartTime = +this.dateArr[0];
          this.formValue.transferEndTime = this.dateArr[1].setHours(23, 59, 59, 999);
        }

        if (isFirst) {
          return getRefundList(this.formValue);
        }else {
          getRefundList(this.formValue).then(res => {
            this.total = res.response.total || 0;
            this.refundList = res.response.list || [];
            this.loading = false;
          });
        }
      }
    }
  };
</script>
