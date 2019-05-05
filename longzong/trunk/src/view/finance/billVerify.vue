<style lang="less" scoped>
  .td-hex {
    border: 1px solid #ccc;
    height: 50px;
    text-align: center;
    width: 38%;
  }

  .bottom-right-border-none {
    border-bottom: none !important;
    border-right: none !important;
  }

  .bottom-border-none {
    border-bottom: none !important;
  }

  .th-hex {
    width: 12%;
    border: 1px solid #ccc;
    height: 50px;
    background: #ebf2fe;
    text-align: center;
    width: 120px;
  }

  .tab-hex .th-hex:first-of-type {
    width: 11%;
  }

  .tab-hex .th-hex:last-of-type {
    width: 13%;
  }

  .tab-hex {
    width: 100%;
  }
</style>
<template>
  <Row>
    <Col span="24" class-name="search-form">
    <Form :model="formItem" :label-width="100">
      <Row type="flex" justify="space-between">
        <Col span="7">
        <FormItem label="开票申请时间:">
          <DatePicker v-model="time1" @on-change="dateChange1" type="daterange" format="yyyy-MM-dd" split-panels placeholder="选择时间"
            class="search-input"></DatePicker>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="业务员:">
          <Input v-model="formItem.adminName" class="search-input" placeholder="请输入业务员"></Input>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="所在部门:">
          <select-department @data-list="getDepData" :emptyModel='formItem.adminDeptIdList'></select-department>
        </FormItem>
        </Col>
      </Row>
      <Row type="flex" justify="space-between">
        <Col span="7">
        <FormItem label="发票类型:">
          <Select v-model="formItem.invoiceType" class="form-select">
            <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.desc }}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="申请类型:">
          <Select v-model="formItem.applyType" class="form-select">
            <Option v-for="item in applyList" :value="item.value" :key="item.value">{{ item.desc }}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="审核状态:">
          <Select v-model="formItem.applyStatus" class="form-select">
            <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.desc }}</Option>
          </Select>
        </FormItem>
        </Col>
      </Row>
      <Row type="flex" justify="space-between">
        <Col span="7">
        <FormItem label="发票抬头:">
          <Input v-model="formItem.title" class="search-input" placeholder="请输入发票抬头"></Input>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="会员名称:">
          <Select v-model="formItem.memberId" filterable class="search-input" @on-query-change="getCustom">
            <Option v-for="item in customList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="期望开票日期:">
          <DatePicker v-model="time2" @on-change="dateChange2" type="daterange" format="yyyy-MM-dd" placement="bottom-end" split-panels
            placeholder="选择日期" class="search-input"></DatePicker>
        </FormItem>
        </Col>
      </Row>
      <Row type="flex" justify="space-between">
        <Col span="7">
        <FormItem label="合同编号:">
          <Input v-model="formItem.contractCode" class="search-input" placeholder="请输入合同编号"></Input>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="开票金额:">
          <Col span="11">
          <Input v-model="formItem.startInvoiceAmount" class="search-input" placeholder="请输入金额" @on-keyup="numberInput(formItem.startInvoiceAmount,'min')"></Input>
          </Col>
          <Col span="2" class="text-center">--</Col>
          <Col span="11">
          <Input v-model="formItem.endInvoiceAmount" class="search-input" placeholder="请输入金额" @on-keyup="numberInput(formItem.endInvoiceAmount,'max')"></Input>
          </Col>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="票号:">
          <Input v-model="formItem.invoiceNo" class="search-input" placeholder="请输入票号"></Input>
        </FormItem>
        </Col>
      </Row>
      <Row type="flex" justify="space-between">
        <Col span="24" class="text-right">
        <Button type="primary" @click="search">查询</Button>
        <Button style="margin-left: 8px" @click="reset">重置</Button>
        </Col>
      </Row>
    </Form>
    </Col>
    <Col span="24">
    <Row class-name="table-con">
      <div class="btn-container">
        <Button type="success" class="search-btn" @click="lotPass">批量通过</Button>
        <Button type="error" class="search-btn" @click="lotReject">批量驳回</Button>
        <Button type="primary" class="search-btn" @click="write">填写票号</Button>
      </div>
      <Table class="tableCommon" :data="tableData" :columns="columns" ref="dragTable" :stripe="true" :border="true" @on-selection-change="selectChange">
      </Table>
      <oil-page :total="total" :page-size="pageSize" @page-change="pageChange" :page-size-opts="pageSizeOpts" :show-sizer="showSizer">
      </oil-page>
    </Row>
    </Col>
    <Modal v-model="modal1" title="请输入通过理由" @on-ok="onPass" @on-cancel="cancel">
      <Input v-model="inputReason" type="textarea" :rows="3" placeholder="请输入通过理由"></Input>
    </Modal>
    <Modal v-model="modal2" title="请输入驳回理由" :footer-hide="true">
      <Row>
        <Col span="24">
        <Input v-model="inputReason" type="textarea" :rows="3" placeholder="请输入驳回理由"></Input>
        </Col>
        <Col span="24" class="text-center mar-t-20">
        <Button @click="offClick" class="search-btn">取消</Button>
        <Button type="primary" class="search-btn" @click="onReject">提交</Button>
        </Col>
      </Row>
    </Modal>
    <Modal v-model="modal3" title="填写票号" @on-ok="onWrite" @on-cancel="cancel" fullscreen>
      <Table class="tableCommon table-hex" :data="tableData2" :columns="columns2" :stripe="true" :border="true"></Table>
    </Modal>
    <Modal v-model="modal5" :footer-hide="true" title="关联合同产品信息" @on-ok="onOkCom" @on-cancel="cancel" width="1000">
      <Table class="tableCommon" :data="tableDataCom" :columns="columnsCom" :stripe="true" :border="true"></Table>
    </Modal>
    <!-- <Modal
       class="modal"
       v-model="modal4"
       title="开票基本信息"
       @on-ok="onWrite"
       width="800"
       @on-cancel="cancel"
     >
       <Row>
         <Col span="24">
         <table
           border="0"
           class="tab-hex"
           cellspacing="0"
           cellpadding="0"
         >
           <tr>
             <th class="th-hex bottom-right-border-none">名称</th>
             <td class="td-hex bottom-right-border-none">
               <input
                 @click="copyText"
                 style="width:100%;border:0;text-align:center;"
                 :value="modal4Table.partA"
               />
             </td>
             <th class="th-hex bottom-right-border-none">纳税人识别号</th>
             <td class="td-hex bottom-border-none">
               <input
                 @click="copyText"
                 style="width:100%;border:0;text-align:center;"
                 :value="modal4Table.payTaxNo"
               >
             </td>
           </tr>
           <tr>
             <th class="th-hex no-right-border">地址、电话</th>
             <td class="td-hex no-right-border">
               <input
                 @click="copyText"
                 style="width:100%;border:0;text-align:center;"
                 :value="modal4Table.invoiceAddressPhone"
               >
             </td>
             <th class="th-hex no-right-border">开户行及账号</th>
             <td class="td-hex">
               <input
                 @click="copyText"
                 style="width:100%;border:0;text-align:center;"
                 :value="modal4Table.payBankNameAndNo"
               >
             </td>
           </tr>
         </table>
         </Col>
       </Row>
       <div slot="footer"></div>
     </Modal>-->
  </Row>
</template>
<script>
  import axios from "axios";
  import { Message } from "iview";
  import { getInvoiceAudit } from "../components/axios/http.js";
  import {
    writeTicketDataList,
    ticketDetailData,
    getSelectAllList,
    getLoginData,
    iskpzy
  } from "../components/axios/finance.js";
  import {
    formData,
    formatTime,
    formatStamp,
    formatThousandPrice
  } from "../../assets/js/common.js";
  import { workbenchLoginInfo } from "../CMS/CMSWorkBench/components/api/api.js";
  import OilPage from "../components/page/page.vue";
  import SelectDepartment from "../components/finance/selectDepartment.vue";
  export default {
    data() {
      return {
        userInfo: {},
        time1: "",
        time2: "",
        passData: [
          {
            invoiceApplyId: [],
            opinion: null,
            result: null,
            sign: null
          }
        ],
        modal5: false,
        tableDataCom: [],
        columnsCom: [
          {
            key: "contractCode",
            title: "合同编号",
            align: "center",
            render: (h, data) => {
              return h(
                "span",
                {
                  style: {
                    color: "#145edb",
                    cursor: "pointer",
                    textDecoration: "underline"
                  },
                  on: {
                    click: () => {
                      this.goheCode(data.row.contractCode);
                    }
                  }
                },
                data.row.contractCode
              );
            }
          },
          {
            key: "contractName",
            title: "合同名称",
            align: "center"
          },
          {
            key: "contractName",
            title: "会员名称",
            align: "center"
          },
          {
            key: "productName",
            title: "产品名称",
            align: "center"
          },
          {
            key: "productPrice",
            title: "产品金额",
            align: "center",
            render: (h, data) => {
              return h(
                "span",
                {
                  style: {}
                },
                formatThousandPrice(data.row.productPrice)
              );
            }
          },
          {
            key: "invoice",
            title: "开票申请金额",
            align: "center",
            render: (h, data) => {
              return h(
                "span",
                {
                  style: {}
                },
                formatThousandPrice(data.row.invoice)
              );
            }
          }
        ],
        columnsAlert: [
          {
            key: "",
            title: "名称",
            align: "",
            minWidth: 100
          },
          {
            key: "",
            title: "地址、电话",
            align: "",
            minWidth: 100
          },
          {
            key: "",
            title: "纳税人识别号",
            minWidth: 160
          },
          {
            key: "",
            title: "开户行及账号",
            minWidth: 160
          }
        ],
        total: 0,
        pageSize: 10,
        pageNum: 1,
        showSizer: true,
        pageSizeOpts: [10, 15, 20, 40, 50, 100],
        modal1: false,
        modal2: false,
        modal3: false,
        modal4: false,
        inputReason: "",
        selection: [],
        departData: [],
        typeList: [],
        applyList: [],
        statusList: [],
        formItem: {
          adminDeptIdList: null,
          adminName: null,
          applyStatus: '0',
          applyType: null,
          contractCode: null,
          endApplyTime: null,
          endInvoiceAmount: null,
          endRequireTime: null,
          invoiceNo: null,
          invoiceType: null,
          loginId: null,
          memberId: null,
          pageNum: 1,
          pageSize: 10,
          startApplyTime: null,
          startInvoiceAmount: null,
          stratRequireTime: null,
          title: null
        },
        columns: [
          {
            type: "selection",
            minWidth: 60,
            align: "center"
          },
          {
            key: "applyTypeDesc",
            title: "申请类型",
            align: "center",
            minWidth: 120
          },
          {
            key: "invoiceNo",
            title: "发票号码",
            align: "center",
            minWidth: 180
          },
          {
            key: "invoiceCode",
            title: "发票代码",
            align: "center",
            minWidth: 180
          },
          {
            key: "partA",
            title: "客户名称",
            align: "center",
            minWidth: 200
          },
          {
            key: "title",
            title: "开票抬头",
            align: "center",
            minWidth: 200
          },
          {
            key: "invoiceTypeDesc",
            title: "发票类型",
            align: "center",
            minWidth: 160
          },
          {
            key: "requireTimeDesc",
            title: "期望开票日期",
            align: "center",
            minWidth: 100
          },
          {
            key: "contractCode",
            title: "开票产品信息",
            align: "center",
            minWidth: 100,
            render: (h, data) => {
              return h(
                "span",
                {
                  style: {
                    color: "#145edb",
                    textDecoration: "underline",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      //查看信息
                      this.modal5 = true;
                      this.getCompanyMes(data.row);
                    }
                  }
                },
                "查看"
              );
            }
          },
          {
            key: "totalAmout",
            title: "产品总金额",
            align: "center",
            minWidth: 120,
            render: (h, data) => {
              return h(
                "span",
                {
                  style: {}
                },
                formatThousandPrice(data.row.totalAmout)
              );
            }
          },
          {
            key: "applyAmout",
            title: "本次申请金额",
            align: "center",
            minWidth: 120,
            render: (h, data) => {
              return h(
                "span",
                {
                  style: {}
                },
                formatThousandPrice(data.row.applyAmout)
              );
            }
          },
          {
            key: "invoiceContentIdDesc",
            title: "开票内容",
            align: "center",
            minWidth: 180,
            render: (h, params) => {
              return h(
                "Tooltip",
                {
                  props: { placement: "top" }
                },
                [
                  params.row.invoiceContentIdDesc.length > 11
                    ? params.row.invoiceContentIdDesc.slice(0, 11) + "..."
                    : params.row.invoiceContentIdDesc,
                  h(
                    "span",
                    {
                      slot: "content",
                      style: { whiteSpace: "normal", wordBreak: "break-all" }
                    },
                    params.row.invoiceContentIdDesc
                  )
                ]
              );
            }
          },
          {
            key: "note",
            title: "申请备注",
            align: "center",
            minWidth: 200,
            render: (h, params) => {
              return h(
                "Tooltip",
                {
                  props: { placement: "top" }
                },
                [
                  params.row.note.length > 11
                    ? params.row.note.slice(0, 11) + "..."
                    : params.row.note,
                  h(
                    "span",
                    {
                      slot: "content",
                      style: { whiteSpace: "normal", wordBreak: "break-all" }
                    },
                    params.row.note
                  )
                ]
              );
            }
          },
          {
            key: "advancedDesc",
            title: "是否提前开票",
            align: "center",
            minWidth: 120
          },
          {
            key: "adminName",
            title: "申请人",
            align: "center",
            minWidth: 120
          },
          {
            key: "adminDeptName",
            title: "申请人所在部门",
            align: "center",
            minWidth: 170
          },
          {
            key: "applyTimeDesc",
            title: "申请时间",
            align: "center",
            minWidth: 160
          },
          {
            key: "auditor",
            title: "当前审核人",
            align: "center",
            minWidth: 100
          },
          {
            key: "applyStatusDesc",
            title: "审核状态",
            align: "center",
            minWidth: 100
          },
          {
            title: "操作",
            align: "center",
            minWidth: 150,
            fixed: "right",
            render: (h, data) => {

              if (
                data.row.applyStatusDesc == "审核通过" ||
                data.row.applyStatusDesc == "已驳回" ||
                this.userInfo.loginName != data.row.auditor
              ) {
                return h("div", [
                  h(
                    "span",
                    {
                      style: {
                        color: "#145edb",
                        cursor: "pointer"
                      },
                      on: {
                        click: () => {
                          this.$router.push({
                            name: "billDetail",
                            query: {
                              id: data.row.invoiceApplyId || data.row.ticketId
                            }
                          });
                        }
                      }
                    },
                    "查看"
                  )
                ]);
              }

              return h("div", [
                h(
                  "span",
                  {
                    style: {
                      marginRight: "8px",
                      color: "#145edb",
                      cursor: "pointer"
                    },
                    on: {
                      click: () => {
                        this.$router.push({
                          name: "billDetail",
                          query: {
                            id: data.row.invoiceApplyId || data.row.ticketId
                          }
                        });
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
                      color: "#145edb",
                      cursor: "pointer"
                    },
                    on: {
                      click: () => {
                        this.modal1 = true;
                        this.inputReason = "";
                        this.passData[0].invoiceApplyId[0] =
                          data.row.invoiceApplyId;
                        this.passData[0].result = 1;
                      }
                    }
                  },
                  data.row.applyStatusDesc == "审核通过" ? "" : "通过"
                ),
                h(
                  "span",
                  {
                    style: {

                      marginRight: "8px",
                      color: "#145edb",
                      cursor: "pointer"
                    },
                    on: {
                      click: () => {
                        this.modal2 = true;
                        this.inputReason = "";
                        this.passData[0].invoiceApplyId[0] =
                          data.row.invoiceApplyId;
                        this.passData[0].result = 0;
                      }
                    }
                  },
                  data.row.applyStatusDesc == "审核通过" ? "" : "驳回"
                )
              ]);
            }
          }
        ],
        columns2: [
          {
            key: "applyId",
            title: "申请ID",
            align: "center",
            minWidth: 70
          },
          {
            key: "title",
            title: "开票抬头",
            align: "center",
            minWidth: 150,
            render: (h, data) => {
              return h('div', {
                on: {
                  click: event => {
                    this.copyText(event);
                  }
                }
              }, [
                  h('textarea', {
                    // attrs: {
                    //   value: data.row.title
                    // },
                    style: {
                      height:"80px",
                      paddingTop:'20px',
                      border: 'none',
                      color: '#145edb',
                      'text-indent': '15px'
                    }
                  },data.row.title)
                ]);
            }
          },
          {
            key: "payTaxNo",
            title: "纳税人识别号",
            align: "center",
            minWidth: 180,
            render: (h, data) => {
              return h('div', {

                on: {
                  click: event => {
                    this.copyText(event);
                  }
                }
              }, [
                  h('textarea', {
                    style: {
                      paddingTop:'20px',
                      height:"80px",
                      border: 'none',
                      color: '#145edb'
                    }
                  }, data.row.payTaxNo)
                ]);
            }
          },

          {
            key: "payBankNameAndNo",
            title: "开户行及账号",
            align: "center",
            minWidth: 250,
            render: (h, data) => {
              return h('div', {
                on: {
                  click: event => {
                    this.copyText(event);
                  }
                }
              }, [
                  h('textarea', {
                    style: {
                      width: '100%',
                      height:"80px",
                      paddingTop:'20px',
                      border: 'none',
                      color: '#145edb'
                    }
                  }, data.row.payBankNameAndNo)
                ]);
            }
          },

          {
            key: "invoiceAddressPhone",
            title: "地址、电话",
            align: "center",
            minWidth: 250,
            render: (h, data) => {
              return h('div', {
                on: {
                  click: event => {
                    this.copyText(event);
                  }
                }
              }, [
                  h('textarea', {
                    style: {
                      width: '100%',
                      paddingTop:'20px',
                      height:"80px",
                      border: 'none',
                      color: '#145edb'
                    }
                  }, data.row.invoiceAddressPhone)
                ]);
            }
          },
          {
            key: "invoiceTypeDesc",
            title: "票据类型",
            align: "center",
            minWidth: 160
          },
          {
            key: "invoiceContentIdDesc",
            title: "开票内容",
            align: "center",
            minWidth: 200
          },
          {
            key: "invoiceAmout",
            title: "开票金额",
            align: "center",
            minWidth: 100,
            render: (h, data) => {
              return h(
                "span",
                {
                  style: {}
                },
                formatThousandPrice(data.row.invoiceAmout)
              );
            }
          },
          {
            key: "adminName",
            title: "申请人",
            align: "center",
            minWidth: 100
          },
          {
            key: "invoiceNo",
            title: "发票号码",
            align: "center",
            minWidth: 150,
            render: (h, data) => {
              let that = this;
              return h('Input', {
                props: {
                  value: data.row.invoiceNo,
                  maxlength: 8
                },
                on: {
                  'on-blur': event => {
                    let val = event.target.value;
                    if (isNaN(val)) {
                      Message.warning('不是合法数字号码');
                      val = '';
                    } else if (data.row.invoiceCode && !val) {
                      Message.warning("此处发票号码不能为空！");
                      val = '';
                    } else if (val.length !== 8) {
                      Message.warning("发票号码为8位数字！");
                      let val1 = val.substring(0, 8);
                      event.target.value = val1;
                    }
                    that.upData[data.index].applyId = data.row.applyId;
                    that.upData[data.index].invoiceNo = val;
                    data.row.invoiceNo = event.target.value;
                  }
                }
              }, )
            }
          },
          {
            key: 'invoiceCode',
            title: '发票代码',
            minWidth: 150,
            align: 'center',
            render: (h, data) => {
              let that = this;
              return h('div', [
                h('Input', {
                  props: {
                    value: data.row.invoiceCode,
                    maxlength: 50
                  },
                  on: {
                    'on-blur': event => {
                      let val = event.target.value;
                      if (isNaN(val)) {
                        Message.warning('不是数字号码');
                        event.target.value = "";
                      } else if (!data.row.invoiceNo) {
                        Message.warning("请先填写发票号码");
//                        event.target.value = "";
                      }
                      data.row.invoiceCode = event.target.value;
                      that.upData[data.index].invoiceCode = event.target.value;
                      that.upData[data.index].invoiceTime = formatStamp(formatTime(new Date()));
                    }
                  }
                }, )
              ]);
            }
          },
          {
            key: "invoiceTime",
            title: "开票日期",
            align: "center",
            minWidth: 150,
            render: (h, data) => {
              let that = this;
              return h("DatePicker", {
                style: {
                  width: "100%"
                },
                props: {
                  type: "date",
                  value: new Date()
                },
                on: {
                  "on-change": e => {
                    that.upData[data.index].invoiceTime = formatStamp(e);
                  }
                }
              });
            }
          },
          {
            title: "开票备注",
            align: "center",
            minWidth: 150,
            render: (h, data) => {
              let that = this;
              return h('Input', {
                style: {
                  margin: '5px 0'
                },
                props: {
                  type: 'textarea',
                  value: ''
                },
                on: {
                  'on-blur': event => {
                    let val = event.target.value;
                    data.row.invoiceNote = val;
                    that.upData[data.index].invoiceNote = val;
                  }
                }
              })
            }
          },
          {
            key: "note",
            title: "申请备注",
            align: "center",
            minWidth: 160,
            render: (h, params) => {
              return h(
                "Tooltip",
                {
                  props: { placement: "top" }
                },
                [
                  params.row.note.length > 11
                    ? params.row.note.slice(0, 11) + "..."
                    : params.row.note,
                  h(
                    "span",
                    {
                      slot: "content",
                      style: { whiteSpace: "normal", wordBreak: "break-all" }
                    },
                    params.row.note
                  )
                ]
              );
            }
          }
        ],
        upData: [],
        tableData: [],
        //      modal4Table: {},
        customList: [],
        tableData2: [],
        iskpzy: false,
      };
    },
    components: {
      OilPage,
      SelectDepartment
    },
    created() {
      //    this.getCommonSelect();
      this.iskpzyFn();
      //    this.getDataList();
    },
    methods: {
      goheCode(contractNo) {
        let routeData = this.$router.resolve({
          name: "checkContact",
          query: {
            contractCode: contractNo
          }
        });
        window.open(routeData.href, "_blank");
      },
      //金额只允许输入数字
      numberInput(value, type) {
        if (value != "") {
          if (type == "min") {
            this.formItem.startInvoiceAmount = value.replace(/[^\d.]/g, "");
          }
          if (type == "max") {
            this.formItem.endInvoiceAmount = value.replace(/[^\d.]/g, "");
          }
        }
      },
      getCommonSelect() {
        // getLoginData().then(res => {
        //   this.userInfo = res.response;
        // })
        const userPhoneInfo = JSON.parse(
          window.localStorage.getItem("userPhoneInfo")
        );
        if (userPhoneInfo) {
          this.userInfo = userPhoneInfo;
          // this.name=this.userPhoneInfo.loginName；
        }
        getSelectAllList({ type: "InvoiceTypeEnum" }).then(res => {
          this.typeList = res.response;
        });
        getSelectAllList({ type: "InvoiceApplyTypeEnum" }).then(res => {
          this.applyList = res.response;
        });
        getSelectAllList({ type: "InvoiceApplyStatusEnum" }).then(res => {
          this.statusList = res.response;
        });
      },

      iskpzyFn() {
        iskpzy().then(res => {
          if (res.response) {
            this.formItem.applyType = '0';
            this.formItem.applyStatus = '1';
          }

          this.getCommonSelect();
          this.getDataList();
        });
      },


      //获取客户列表
      getCustom(st) {
        var that = this;
        axios({
          url: "/finance/common/selectMember",
          method: "get",
          params: {
            memberName: st ? st : ""
          }
        })
          .then(function (res) {
            if (res.data.status == 200) {
              that.customList = res.data.response;
            }
            that.$Spin.hide();
          })
          .catch(err => {
            that.$Spin.hide();
          });
      },
      dateChange1(date) {
        this.formItem.startApplyTime =
          this.formatToSecond(date[0]) - 8 * 1000 * 60 * 60;
        this.formItem.endApplyTime =
          this.formatToSecond(date[1]) + 16 * 1000 * 60 * 60 - 1000;
      },
      dateChange2(date) {
        this.formItem.stratRequireTime =
          this.formatToSecond(date[0]) - 8 * 1000 * 60 * 60;
        this.formItem.endRequireTime =
          this.formatToSecond(date[1]) + 16 * 1000 * 60 * 60 - 1000;
      },
      // 转时间戳
      formatToSecond(date) {
        return new Date(date).getTime();
      },
      //获取list列表数据
      getDataList() {
        this.formItem.contractCode = this.formItem.contractCode
          ? this.formItem.contractCode.replace(/\s/g, "")
          : "";
        this.formItem.invoiceNo = this.formItem.invoiceNo
          ? this.formItem.invoiceNo.replace(/\s/g, "")
          : "";
        this.formItem.pageNum = this.pageNum;
        this.formItem.pageSize = this.pageSize;
        this.formItem.times = new Date().getTime();
        getInvoiceAudit(this.formItem).then(res => {
          this.tableData = res.response.list ? res.response.list : [];
          this.total = res.response.total;
        });
      },
      //获取所在部门
      getDepData(deptLabel, deptId, deptCode) {
        this.formItem.adminDeptIdList = deptId.length < 1 ? null : deptId;
      },
      search() {
        this.pageNum = 1;
        this.pageSize = 10;
        this.getDataList();
      },
      // 重置
      reset() {
        this.formItem = {
          adminDeptIdList: [],
          adminName: null,
          applyStatus: null,
          applyType: null,
          contractCode: null,
          endApplyTime: null,
          endInvoiceAmount: null,
          endRequireTime: null,
          invoiceNo: null,
          invoiceType: null,
          loginId: null,
          memberId: null,
          pageNum: 1,
          pageSize: 10,
          startApplyTime: null,
          startInvoiceAmount: null,
          stratRequireTime: null,
          title: null
        };
        this.time1 = "";
        this.time2 = "";
        this.pageNum = 1;
        this.pageSize = 10;
      },
      // 批量通过
      lotPass() {
        if (this.selection.length > 0) {
          for (var i = 0; i < this.selection.length; i++) {
            if (this.selection[i].applyStatusDesc != "审核中") {
              this.$Message.error("只有审核中状态才可执行通过操作！");
              return false;
            }
          }
          this.modal1 = true;
          this.passData[0].result = 1;
        } else {
          this.$Message.warning("请先勾选数据");
        }
      },
      // 批量驳回
      lotReject() {
        if (this.selection.length > 0) {
          for (var i = 0; i < this.selection.length; i++) {
            if (this.selection[i].applyStatusDesc != "审核中") {
              this.$Message.error("只有审核中状态才可执行通过操作！");
              return false;
            }
          }
          this.modal2 = true;
          this.passData[0].result = 0;
        } else {
          this.$Message.warning("请先勾选数据");
        }
      },
      //获取每个applyId的详情数据
      /*   getTicketMes(ids) {
           let that = this;
           //获取票据审核详情数据ajax
           ticketDetailData(formData({ applyId: ids })).then(res => {
             if (res.status == "200") {
               that.modal4 = true;
               that.modal4Table = res.response;
               //  that.$Message.success(res.message);
             } else {
               // that.$Message.warning(res.message);
             }
           });
         },*/
      updateTable(data) {
        this.tableData[data.index] = data.row;
      },
      // 填写票号
      write() {
        let that = this;
        if (this.selection.length > 0) {
          for (var i = 0; i < this.selection.length; i++) {
            if (
              this.selection[i].applyStatusDesc != "审核通过" ||
              this.selection[i].applyTypeDesc != "开票申请"
            ) {
              this.$Message.error("只有开票申请的审核通过状态才可填写票号！");
              return false;
            }
          }
          var dataArr = this.selection.map(function (e, v) {
            /*that.upData[v] = {
              invoiceNo: null,
              invoiceCode: null,
              invoiceTime: null,
              applyId: null,
              invoiceNote: null
            };*/
            return e.invoiceApplyId;
          });

          var myObj = {
            "applyIds[]": dataArr.join(",")
          };
          //填写票号列表数据 Ajax
          writeTicketDataList(formData(myObj)).then(res => {
            this.modal3 = true;
            that.tableData2 = [];
            that.upData = [];
            res.response.forEach(function (e, v) {
            that.upData[v] = {
              invoiceNo: e.invoiceNo,
              invoiceCode: e.invoiceCode,
              invoiceTime: e.invoiceTime,
              applyId: e.applyId,
              invoiceNote: e.invoiceNote
            };
              if (e.invoiceNo == "") {
                that.tableData2.push(e);
//                that.upData.push(e);
              }
            });
//            console.log('upData', that.upData);
//            console.log('tableData2', that.tableData2);
          });
        } else {
          this.$Message.warning("请先勾选数据");
        }
      },
      //页码更新事件
      pageChange(page, pageSize) {
        if (page) {
          this.pageNum = page;
        }
        if (pageSize) {
          this.pageSize = pageSize;
        }
        this.getDataList();
      },
      selectChange(selection) {
        //小方块全选 和 部分选中 事件
        this.selection = selection;
        this.passData[0].invoiceApplyId = selection.map(resp => {
          return resp.invoiceApplyId;
        });
      },
      //通过与驳回api Ajax
      getOffOn(obj) {
        let that = this;
        axios({
          url: "/finance/finance/invoiceAudit/auditInvoiceApply",
          method: "post",
          data: {
            auditInvoiceReqVOList: obj
          }
        }).then(res => {
          if (res.data.status == "200") {
            that.inputReason = "";
            that.$Message.success(res.data.message);
            that.pageChange(1);
          } else {
            that.inputReason = "";
            that.$Message.warning(res.data.message);
          }
        });
      },
      // 弹出框 通过按钮事件
      onPass() {
        this.passData[0].sign = "";
        if (this.passData.length == 1) {
          this.passData[0].opinion = this.inputReason;
          this.getOffOn(this.passData);
        }
      },
      // 模态框批量驳回
      onReject() {
        if (this.passData.length == 1) {
          if (this.inputReason.length < 1) {
            this.$Message.warning("请输入驳回的理由！");
            return false;
          } else {
            this.modal2 = false;
            this.passData[0].opinion = this.inputReason;
            this.getOffOn(this.passData);
          }
        }
      },
      // 模态框填写票号
      onWrite() {
        let that = this;
        for (let a = 0; a < this.upData.length; a++) {
          if (this.upData[a].invoiceNo.length !== 8) {
            Message.warning("发票号码为8位数字");
            return;
          }

          if (!this.upData[a].invoiceCode) {
            Message.warning("发票代码不能为空");
            return;
          }
        }

//        console.log('upData', this.upData);
       /* let newUp = this.upData.filter(function (e, v, arr) {
          return e.invoiceNo != null && e.invoiceCode != null;
        });*/
         axios({
           url: "finance/finance/invoiceAudit/saveInvoiceNoList",
           method: "post",
           data: {
             invoiceNoListReqListVO: this.upData
           }
         }).then(res => {
           that.$Message.success(res.data.message);
           if (res.data.status == "200") {
             that.getDataList();
           }
         });
      },
      //关闭模态弹框
      offClick() {
        this.modal2 = false;
        this.inputReason = "";
      },
      //模态框点击确定ok
      onOkCom() {
        this.modal5 = false;
      },
      // 模态框取消
      cancel() {
        this.inputReason = "";
      },
      //模态窗口查看开票产品信息
      getCompanyMes(data) {
        let that = this;
        axios({
          url: "/finance/finance/invoiceAudit/contractInfoListPage",
          method: "post",
          data: {
            invoiceApplyId: data.invoiceApplyId,
            pageNum: 1,
            pageSize: 10
          }
        }).then(res => {
          if (res.data.status == 200 && res.data.response.list.length > 0) {
            that.tableDataCom = res.data.response.list;
          }
        });
      },
      //点击复制文本到粘贴板
      copyText(event) {
        var Url2 = event.target;
        Url2.select(); // 选择对象
        document.execCommand("Copy"); // 执行浏览器复制命令
        this.$Message.success("复制成功！");
      }
    }
  };
</script>
