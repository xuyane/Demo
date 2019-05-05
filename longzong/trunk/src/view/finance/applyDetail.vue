<style lang="less" scoped>
.upload-btn {
  width: 100%;
  height: 36px;
  line-height: 36px;
  background: #4280e8;
  color: #fff;
  text-align: center;
  cursor: pointer;
}

.search-btn-Hex {
  min-width: 80px;
  margin-left: 16px !important;
  text-align: center;
}
</style>
<template>
  <Row>
    <Col span="24">
    <Row class-name="current-position">
      当前位置：财务管理&nbsp;&nbsp;>>票据管理&nbsp;&nbsp;>>开票申请&nbsp;&nbsp;>>详情&nbsp;&nbsp;
    </Row>
    </Col>
    <Col span="24" class="card-container">
    <div class="table-title">基本信息</div>
    <grid-table :grid-columns="gridColumns" :grid-data="gridData"></grid-table>
    </Col>
    <Col span="24" class="card-container">
    <div class="table-title">合同明细</div>
    <div class="btn-container mar-t-10">
      <Button type="primary" class="search-btn-Hex" @click="addContract">添加合同</Button>
      <Button type="primary" class="search-btn" @click="clearContract">清空合同</Button>
    </div>
    <Table class="tableCommon" :columns="columns" :data="tableData" :border="true" :stripe="true">
    </Table>
    </Col>
    <Col span="24" class="card-container">
    <div class="table-title">开票要求</div>
    <Col span="24">
    <Form ref="formItem" :model="invoiceForm" :rules="ruleValidate" :label-width="100">
      <Row type="flex" justify="space-between">
        <Col span="7">
        <FormItem label="开票金额:">
          {{invoiceAllAmount}}
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="期望开票时间:">
          <DatePicker v-model="invoiceForm.dateTime" type="date" placeholder="请选择日期" class="search-input" @on-change="getDate"></DatePicker>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="开票类型:" prop="type">
          <Select v-model="invoiceForm.type" class="form-select" @on-change="changeType">
            <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.desc }}</Option>
          </Select>
        </FormItem>
        </Col>
      </Row>
      <Row type="flex" justify="space-between">
        <Col span="7">
        <FormItem label="提前开票:">
          <span v-show="advanced == 0">否</span>
          <span v-show="advanced == 1">是</span>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="收件人:" prop="person">
          <Input v-model="invoiceForm.person" class="search-input" placeholder="请输入收件人姓名"></Input>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="收件人地址:" prop="address">
          <Input v-model="invoiceForm.address" class="search-input" placeholder="请输入收件人地址"></Input>
        </FormItem>
        </Col>
      </Row>
      <Row type="flex" justify="space-between">
        <Col span="7">
        <FormItem label="收件人电话:" prop="phone">
          <Input v-model="invoiceForm.phone" class="search-input" placeholder="请输入收件人电话"></Input>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="收件人邮箱:" prop="email">
          <Input v-model="invoiceForm.email" class="search-input" placeholder="请输入收件人邮箱"></Input>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="开票抬头:" prop="member">
          <Select v-model="invoiceForm.member" class="search-input">
            <Option v-for="item in invoiceIssuingList" :value="item" :key="item">{{ item }}</Option>
          </Select>
          <!--<Input v-model="invoiceForm.member" class="search-input" placeholder="请输入开票抬头" readonly></Input>-->
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="授权附件:" v-show="false">
          <Upload :before-upload="handleUpload" :data="uploadForm" :on-success="uploadSuccess" :on-remove="removeUrl" action="/finance/common/upLoadImageFile">
            <Button type="primary">点击上传</Button>
          </Upload>
        </FormItem>
        </Col>
      </Row>
      <Row span="24" class="mar-b-20">
        <div class="table-title">发票明细</div>
        <Table class="tableCommon" :columns="columns1" :data="inValueData"></Table>
      </Row>
      <Col span="16">
      <FormItem label="开票备注:" prop="tips">
        <Input type="textarea" :rows="6" v-model="invoiceForm.tips" style="width: 870px" placeholder="请输入开票备注"></Input>
      </FormItem>
      </Col>
      <Col span="24" style="text-align: center">
      <FormItem>
        <Button type="primary" @click="validateData('formItem')">开票</Button>
        <Button @click="back">取消</Button>
      </FormItem>
      </Col>
    </Form>
    </Col>

    </Col>
    <add-modal ref="addModal" :showModal="showModal" @hide-modal="hideModal" @addData="addData" :tableCodes="tableCodes"></add-modal>
  </Row>
</template>
<script>
import AddModal from "./addContractModal.vue";
import GridTable from "../components/table/gridTable.vue";
import {
  invoiceapplyDetails,
  invoiceapplyProductList,
  getSelectAllList,
  saveInvoiceapply
} from "../components/axios/finance.js";
import { formatStamp, formatThousandPrice } from "../../assets/js/common.js";
import axios from "axios";

export default {
  data() {
    return {
      inValueData: [
        {
          invoiceContentId: "",
          note: "",
          spec: "",
          projectUnitNum: 1,
          projectNum: "",
          contentAmount: ""
        }
      ],
      columns1: [
        {
          title: "开票内容(服务名称)",
          key: "invoiceContentId",
          renderHeader: (h, data) => {
            return h("div", [
              h("span", {}, "开票内容(服务名称)"),
              h(
                "span",
                {
                  style: {
                    color: "#ff0000"
                  }
                },
                " *"
              )
            ]);
          },
          render: (h, data) => {
            return h(
              "Select",
              {
                style: {
                  textAlign: "left"
                },
                props: {
                  labelInValue: true,
                  value: data.row.invoiceContentId
                },
                on: {
                  "on-blur": event => {
                    this.inValueData[data.index].invoiceContentId = event.value;
                  },
                  "on-change": event => {
                    this.inValueData[data.index].invoiceContentId = event.value;
                  }
                }
              },
              [
                this.invoiceContentList.map(item => {
                  return h(
                    "Option",
                    {
                      style: {
                        textAlign: "left"
                      },
                      props: {
                        value: item.value,
                        label: item.desc
                      }
                    },
                    item.desc
                  );
                })
              ]
            );
          }
        },
        {
          title: "规格型号",
          key: "spec",
          render: (h, data) => {
            return h("Input", {
              props: {
                value: data.row.spec,
                maxlength: 20
              },
              on: {
                "on-blur": event => {
                  this.inValueData[data.index].spec = event.target.value;
                }
                // 'on-change': event => {
                //   this.inValueData[data.index].spec = event.target.value
                // }
              }
            });
          }
        },
        {
          title: "单位",
          key: "projectUnitNum",
          width: 150,
          renderHeader: (h, data) => {
            return h("div", [
              h("span", {}, "单位"),
              h(
                "span",
                {
                  style: {
                    color: "#ff0000"
                  }
                },
                " *"
              )
            ]);
          },
          render: (h, data) => {
            return h(
              "Select",
              {
                style: {
                  textAlign: "left"
                },
                props: {
                  labelInValue: true,
                  value: data.row.projectUnitNum ? data.row.projectUnitNum : 1
                },
                on: {
                  "on-change": event => {
                    this.inValueData[data.index].projectUnitNum = event.value;
                  }
                }
              },
              [
                this.projectUnitNumList.map(item => {
                  return h(
                    "Option",
                    {
                      style: {
                        textAlign: "left"
                      },
                      props: {
                        value: item.value,
                        label: item.label
                      }
                    },
                    item.label
                  );
                })
              ]
            );
          }
        },
        {
          title: "数量",
          key: "projectNum",
          renderHeader: (h, data) => {
            return h("div", [
              h("span", {}, "数量"),
              h(
                "span",
                {
                  style: {
                    color: "#ff0000"
                  }
                },
                " *"
              )
            ]);
          },
          render: (h, data) => {
            return h("Input", {
              props: {
                value: data.row.projectNum,
                maxlength: 13
              },
              on: {
                "on-blur": event => {
                  this.inValueData[data.index].projectNum = event.target.value;
                }
                // 'on-change': event => {
                //   this.inValueData[data.index].projectNum = event.target.value
                // }
              }
            });
          }
        },
        {
          title: "明细金额(含税)",
          key: "contentAmount",
          renderHeader: (h, data) => {
            return h("div", [
              h("span", {}, "明细金额(含税)"),
              h(
                "span",
                {
                  style: {
                    color: "#ff0000"
                  }
                },
                " *"
              )
            ]);
          },
          render: (h, data) => {
            return h("Input", {
              props: {
                // value: data.row.contentAmount,
                value: this.invoiceAllAmount,
                maxlength: 13
              },
              on: {
                "on-blur": event => {
                  this.inValueData[data.index].contentAmount =
                    event.target.value;
                }
                // this.invoiceAllAmount
                // 'on-change': event => {
                //   this.inValueData[data.index].contentAmount = event.target.value
                // }
              }
            });
          }
        },
        {
          title: "操作",
          key: "done",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.addTables(params.index + 1);
                    }
                  }
                },
                "添加 +"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.removeTables(params.index);
                    }
                  }
                },
                "删除 -"
              )
            ]);
          }
        }
      ],
      advanced: 0,
      advanced1: 0,
      id: this.$route.query.id,
      invoiceContentList: [],
      projectUnitNumList: [
        {
          value: 1,
          label: "次"
        },
        {
          value: 2,
          label: "个"
        },
        {
          value: 3,
          label: "套"
        }
      ],
      showModal: false,
      invoiceForm: {
        dateTime: "",
        date: "",
        type: "",
        person: "",
        address: "",
        phone: "",
        email: "",
        title: "",
        updataUrl: "",
        updataName: "",
        tips: ""
      },
      invoiceIssuingList: [],
      typeList: [],
      columns: [
        {
          key: "contractCode",
          title: "合同编号",
          align: "center",
          minWidth: 150,
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
          align: "center",
          minWidth: 160
        },
        {
          key: "isNeedInvoice",
          title: "是否要票",
          align: "center",
          minWidth: 80
        },
        {
          key: "productNameCn",
          title: "产品名称",
          align: "center",
          minWidth: 120
        },
        {
          key: "productVersion",
          title: "产品版本",
          align: "center",
          minWidth: 90
        },
        {
          key: "subtotalPrice",
          title: "产品金额",
          align: "center",
          minWidth: 100,
          render: (h, data) => {
            return h(
              "span",
              {
                style: {}
              },
              formatThousandPrice(data.row.subtotalPrice)
            );
          }
        },
        {
          key: "invoicedAmount",
          title: "已开票金额",
          align: "center",
          minWidth: 100,
          render: (h, data) => {
            return h(
              "span",
              {
                style: {}
              },
              formatThousandPrice(data.row.invoicedAmount)
            );
          }
        },
        {
          key: "applyAmout",
          title: "申请中金额",
          align: "center",
          minWidth: 100,
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
          key: "openingInvoiceAmout",
          title: "可开票金额",
          align: "center",
          minWidth: 100,
          render: (h, data) => {
            return h(
              "span",
              {
                style: {}
              },
              formatThousandPrice(data.row.openingInvoiceAmout)
            );
          }
        },
        {
          key: "creatorName",
          title: "业务员",
          align: "center",
          minWidth: 100
        },
        {
          title: "本次开票金额",
          align: "center",
          minWidth: 100,
          render: (h, data) => {
            return h("InputNumber", {
              props: {
                value: data.row.invoiceAmount,
                max: data.row.openingInvoiceAmout,
                min: 0,
                "active-change": false
              },
              on: {
                "on-change": event => {
                  this.tableData[data.row._index].invoiceAmount = event;
                }
              }
            });
          }
        },
        {
          title: "操作",
          align: "center",
          minWidth: 100,
          render: (h, data) => {
            return h(
              "span",
              {
                style: {
                  color: "red",
                  cursor: "pointer"
                },
                on: {
                  click: () => {
                    this.delete(data);
                  }
                }
              },
              "移除"
            );
          }
        }
      ],
      gridColumns: [
        {
          key: "member",
          title: "名称"
        },
        {
          key: "payTaxNo",
          title: "纳税人识别号"
        },
        {
          key: "postAddressTel",
          title: "地址、电话"
        },
        {
          key: "payBankNo",
          title: "开户行及账号"
        },
        {
          key: "postName",
          title: "收件人"
        },
        {
          key: "postPhone",
          title: "联系电话"
        },
        {
          key: "postAddress",
          title: "邮寄地址"
        },
        {
          key: "postMail",
          title: "收件人邮箱"
        }
      ],
      gridData: {
        member: "",
        memberId: "",
        payBank: "",
        payTaxNo: "",
        invoiceEmail: "",
        payBankNo: "",
        postName: "",
        postPhone: "",
        postAddress: "",
        postAddressTel: "",
        postMail: ""
      },
      tableData: [],
      tableCodes: [],
      tableCodes1: [],
      ruleValidate: {
        person: [
          {
            required: true,
            message: "请输入收件人",
            trigger: "blur"
          },
          {
            type: "string",
            message: "不超过20个字符",
            max: 20,
            trigger: "blur"
          }
        ],
        type: [
          {
            required: true,
            message: "请选择开票类型",
            trigger: "change"
          }
        ],
        address: [
          {
            required: true,
            message: "请输入收件人地址",
            trigger: "blur"
          },
          {
            type: "string",
            message: "不超过50个字符",
            max: 50,
            trigger: "blur"
          }
        ],
        phone: [
          {
            required: true,
            message: "请输入收件人电话",
            trigger: "blur"
          },
          {
            pattern: /^1[34578]\d{9}$/,
            message: "请输入正确的电话号码",
            trigger: "blur"
          }
        ],
        member: [
          { required: true, message: "请选择开票抬头", trigger: "change" }
        ],
        email: [
          { type: "email", message: "请输入正确的邮箱格式", trigger: "blur" }
        ],
        tips: [
          {
            type: "string",
            message: "不超过100个字符",
            max: 100,
            trigger: "blur"
          }
        ]
      },
      uploadForm: {
        multipartFile: ""
      },
      attUrlList: [],
      advancedArr: [], //弹框添加的合同记录
      advancedSum: 0
    };
  },
  created() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
    this.invoiceForm.dateTime = year + "-" + month + "-" + day;
    // this.invoiceForm.dateTime = "",
    this.getDataList();
    this.getInvoiceContentEnum();
  },

  /* watch: {
      'invoiceForm.member'(newVal) {
        console.log('newVal', newVal);
      }
    },*/

  computed: {
    invoiceAllAmount() {
      let amountArr = this.tableData.map(item => {
        return item.invoiceAmount;
      });
      let sum = 0;
      if (amountArr.length > 0) {
        for (let i in amountArr) {
          sum += amountArr[i];
        }
      } else {
        sum = 0;
      }
      sum = sum.toFixed(2);
      this.inValueData[0].contentAmount = sum;
      return sum;
    }
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
    changeType() {
      if (this.invoiceForm.type == "128003") {
        this.ruleValidate.email = [
          {
            required: true,
            message: "请输入收件人邮箱",
            trigger: "blur"
          },
          { type: "email", message: "请输入正确的邮箱格式", trigger: "blur" }
        ];
      } else {
        this.ruleValidate.email = [
          {
            required: false,
            message: "请输入收件人邮箱",
            trigger: "blur"
          },
          { type: "email", message: "请输入正确的邮箱格式", trigger: "blur" }
        ];
        this.$refs.formItem.validateField("email");
        // if(this.ruleValidate.email){
        //   delete this.ruleValidate.email
        //   this.$refs.formCustom.validateField('email');
        // }
      }
    },
    //addTables
    addTables(res) {
      let inValue = {
        invoiceContentId: "",
        note: "",
        spec: "",
        projectUnitNum: 1,
        projectNum: "",
        contentAmount: ""
      };
      this.inValueData.push(inValue);
    },
    //时间戳
    getDate(data) {
      this.invoiceForm.date = formatStamp(data);
    },
    //开票内容(服务名称)列表
    getInvoiceContentEnum() {
      let type = {
        type: "InvoiceContentEnum"
      };
      getSelectAllList(type).then(res => {
        this.invoiceContentList = res.response;
        //  this.invoiceContentList = res.response.filter(item => item !== 128003);
      });
      let InvoiceTypeEnum = {
        type: "InvoiceTypeEnum"
      };
      getSelectAllList(InvoiceTypeEnum).then(res => {
        // this.typeList = res.response;
        this.typeList = res.response.filter(item => item.value != 128003);
      });
    },
    //removeTables
    removeTables(tab) {
      this.inValueData.splice(tab, 1);
      this.data1;
    },
    //获取详情
    getDataList() {
      invoiceapplyDetails({
        contratcId: this.id
      }).then(res => {
        this.gridData.member = res.response.member;
        this.gridData.memberId = res.response.memberId;
        this.gridData.payBank = res.response.payBank;
        this.gridData.invoiceEmail = res.response.invoiceEmail;
        this.gridData.payTaxNo = res.response.payTaxNo;
        this.gridData.postAddress = res.response.postAddress;
        this.gridData.payBankNo = res.response.payBankNo;
        this.gridData.postName = res.response.postName;
        this.gridData.postPhone = res.response.postPhone;
        this.gridData.postAddressTel = res.response.invoiceAddressPhone;
        this.gridData.postMail = res.response.invoiceEmail;
        this.tableData = res.response.invoiceApplyContractProductVOList
          ? res.response.invoiceApplyContractProductVOList
          : [];
        this.invoiceForm.person = res.response.postName;
        this.invoiceForm.address = res.response.postAddress;
        this.invoiceForm.email = res.response.invoiceEmail;
        this.invoiceForm.phone = res.response.postPhone;
        this.invoiceForm.member = res.response.member;
        this.advanced = res.response.advanced;
        this.advanced1 = res.response.advanced;
        this.getTableCodes();
        this.tableCodes1 = this.tableCodes;

        if (res.response.invoiceIssuing) {
          this.invoiceIssuingList = res.response.invoiceIssuing
            .replace(/,$/gi, "")
            .split(",");
          if (this.invoiceIssuingList.length === 1) {
            this.invoiceForm.member = this.invoiceIssuingList[0];
          }
        }
      });
    },
    getTableCodes() {
      //每次获取新的合同明细表时，记录它所有的合同编号并去重，用于实现 1、点击添加合同弹框时，传入已有的合同编号 2、移除时被移除的编号匹配去除它的已认账金额
      this.tableCodes = [];
      for (var i = 0; i < this.tableData.length; i++) {
        let val = this.tableData[i].contractCode;
        if (this.tableCodes.indexOf(val) === -1) {
          this.tableCodes.push(val);
        }
      }
    },
    getBreedIds(list) {
      let arr = [];
      for (let i = 0; i < list.length; i++) {
        arr.push(list[i].id);
      }
      return arr;
    },
    //添加合同
    addData(data, sum) {
      if (sum) {
        this.advanced = 1;
        this.advancedSum = (
          parseFloat(this.advancedSum) + parseFloat(sum)
        ).toFixed(2);
      }
      for (var i = 0; i < data.length; i++) {
        let isData = false;
        for (var j = 0; j < this.advancedArr.length; j++) {
          if (data[i].code == this.advancedArr[j].code) {
            isData = true;
          }
        }
        if (!isData) {
          this.advancedArr.push(data[i]);
        }
      }
      let ids = data.map(item => {
        return item.id;
      });
      invoiceapplyProductList({
        contratcIdList: ids.join(",")
      }).then(res => {
        if (res.status === "200") {
          let addSuccess = false;
          let invoiceArrList = res.response.invoiceApplyContractProductVOList;
          if (this.tableData.length > 0) {
            let arr = this.getBreedIds(this.tableData);
            if (invoiceArrList) {
              for (let i = 0; i < invoiceArrList.length; i++) {
                if (
                  arr.indexOf(invoiceArrList[i].id) === -1 &&
                  invoiceArrList[i].id
                ) {
                  this.tableData.push(invoiceArrList[i]);
                  addSuccess = true;
                } else {
                  continue;
                }
              }
            }
          } else {
            addSuccess = true;
            this.tableData = invoiceArrList ? invoiceArrList : [];
          }
          this.$Message.success("添加成功");
          //this.tableData = this.tableData.concat(res.response.invoiceApplyContractProductVOList)
          this.getTableCodes();
        } else {
          this.$Message.warning(res.message);
        }
      });
    },
    //删除合同
    delete(data) {
      let code = data.row.contractCode;
      this.tableData.splice(data.index, 1);
      let hasCode = false;
      for (var i = 0; i < this.tableData.length; i++) {
        if (code === this.tableData[i].contractCode) {
          hasCode = true;
        }
      }
      if (!hasCode) {
        for (var i = 0; i < this.tableCodes.length; i++) {
          if (this.tableCodes[i] === code) {
            this.tableCodes.splice(i, 1);
          }
        }
        for (var i = 0; i < this.tableCodes1.length; i++) {
          if (this.tableCodes1[i] === code) {
            this.tableCodes1.splice(i, 1);
          }
        }
        if (this.advancedArr.length == 0) {
          if (this.tableCodes1.length > 0) {
            this.advanced = this.advanced1;
          } else {
            this.advanced = 0;
          }
          this.advancedSum = 0;
        }
        let advancedArrIndex = 0;
        for (var j = 0; j < this.advancedArr.length; j++) {
          if (this.advancedArr[j].code === code) {
            this.advancedSum = (
              parseFloat(this.advancedSum) -
              parseFloat(this.advancedArr[j].amount)
            ).toFixed(2);
            advancedArrIndex = j;
            if (this.advancedSum > 0) {
              this.advanced = 1;
            } else {
              if (this.tableCodes1.length > 0) {
                this.advanced = this.advanced1;
              } else {
                this.advanced = 0;
              }
            }
          }
        }
        this.advancedArr.splice(advancedArrIndex, 1);
      }
    },
    // 添加合同
    addContract() {
      this.showModal = true;
    },
    // 清空合同
    clearContract() {
      this.tableData = [];
      this.tableCodes = [];
      this.tableCodes1 = [];
      this.advancedArr = [];
      this.advanced = 0;
      this.advancedSum = 0;
    },
    // 开票
    validateData(name) {
      //        console.log('inValueData', this.inValueData);
      this.$refs[name].validate(valid => {
        if (valid) {
          if (!this.invoiceForm.member) {
            this.$Message.error("开票抬头已更改，请上传相关附件！");
          } else {
            let tableValid = true;
            for (var i = 0; i < this.inValueData.length; i++) {
              if (
                this.inValueData[i].invoiceContentId == "" ||
                this.inValueData[i].projectUnitNum == "" ||
                this.inValueData[i].projectNum == "" ||
                this.inValueData[i].contentAmount == ""
              ) {
                this.$Message.error("请补充表格带*号的必填内容！");
                tableValid = false;
                return false;
              }
            }
            if (tableValid) {
              if (this.invoiceAllAmount <= 0) {
                this.$Message.error("开票金额必须大于零");
                return false;
              }
              let sum = 0;
              for (var i = 0; i < this.inValueData.length; i++) {
                sum += this.inValueData[i].contentAmount
                  ? parseFloat(this.inValueData[i].contentAmount)
                  : 0;
              }
              if (sum == this.invoiceAllAmount) {
                this.$Spin.show();
                let params = {
                  advanced: this.advanced,
                  applyType: 0,
                  attUrlList: this.attUrlList,
                  invoiceAddressPhone:
                    this.invoiceForm.address + "," + this.invoiceForm.phone,
                  invoiceAmount: this.invoiceAllAmount,
                  invoiceApplyContractProductVOList: this.tableData,
                  invoiceContentSaveReqVO: this.inValueData,
                  invoiceEmail: this.invoiceForm.email,
                  // invoiceNo: [],
                  invoiceType: Number(this.invoiceForm.type),
                  member: this.gridData.member,
                  // member: this.invoiceForm.member,
                  memberId: this.gridData.memberId,
                  note: this.invoiceForm.tips,
                  payBank: this.gridData.payBank,
                  payBankNo: this.gridData.payBankNo,
                  payTaxNo: this.gridData.payTaxNo,
                  postAddress: this.invoiceForm.address,
                  postCode: 333000,
                  postName: this.invoiceForm.person,
                  postPhone: this.invoiceForm.phone,
                  requireTime: this.invoiceForm.date,
                  title: this.invoiceForm.member
                };
                saveInvoiceapply(params).then(() => {
                  this.$Message.success("开票成功");
                  this.back();
                });
              } else {
                this.$Message.error("明细金额的总和不等于开票金额");
              }
            }
          }
        }
      });
    },
    hideModal() {
      this.showModal = false;
    },
    back() {
      this.$router.push({
        name: "billManager"
      });
    },
    //上传文件
    handleUpload(file) {
      this.uploadForm.multipartFile = file;
    },
    //上传成功后调用
    uploadSuccess(response) {
      this.attUrlList.push({
        attUrl: response.response,
        attName: this.uploadForm.multipartFile.name
      });
    },
    //点击删除文件地址
    removeUrl(file, fileList) {
      let attachArr = [];
      if (fileList.length > 0) {
        for (let i = 0; i < fileList.length; i++) {
          attachArr.push(fileList[i].response.response);
        }
        this.attUrlList = attachArr;
      } else {
        this.attUrlList = [];
      }
    }
  },
  components: {
    AddModal,
    GridTable
  }
};
</script>
