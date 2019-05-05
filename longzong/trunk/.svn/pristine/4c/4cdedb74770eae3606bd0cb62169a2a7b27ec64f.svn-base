<style lang="less" scoped>
</style>
<template>
  <Row>
    <Col span="24">
      <Row class-name="current-position">
        当前位置：用户关系管理&nbsp;&nbsp;>>&nbsp;&nbsp;我的用户
      </Row>
    </Col>
    <tab-header :tab-index="7"></tab-header>
    <Col span="24" class-name="search-form">
      <Form :model="formItem" :label-width="100">
        <Row type="flex" justify="space-between">
          <Col span="7">
            <FormItem label="合同编号:">
              <Input v-model="formItem.contractCode" class="search-input" placeholder="请输入合同编号"></Input>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="归档编号:">
              <Input v-model="formItem.archivalNo" class="search-input" placeholder="请输入归档编号"></Input>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="合同状态:">
              <Select v-model="formItem.status"  class="search-input">
                <Option v-for='(item,index) in contractStatus' :key='index' :value="item.value">{{item.desc}}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="space-between">
          <Col span='7' >
            <FormItem label="合同审核状态:"  :label-width="100">
              <Select v-model="formItem.auditStatus" clearable  class="search-input">
                <Option v-for='(item,index) in contractAuditStatus' :key='index' :value="item.value">{{item.desc}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="14" class="text-right">
            <FormItem>
              <Button type="primary" @click="findlist">查询</Button>
              <Button style="margin-left: 8px" @click="reset">重置</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Col>
    <Col span="24">
      <Row class-name="table-con">
        <div class="btn-container">
          <Button type="primary" class="search-btn" @click="createContract">创建合同</Button>
        </div>
        <Table class="tableCommon mar-t-20"
          :data="tableData"
          :columns="columns"
          ref="dragTable"
          :stripe="true"
          :border="true">
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
    <invoice-info-modal :showInvoiceInfo='showInvoiceInfo' @hide-invoice-info='hideInvoiceInfo' :invoiceInfoMsg='invoiceInfoMsg'></invoice-info-modal>
    
  </Row>   
</template>
<script>
import TabHeader from "./tabHeader";
import OilPage from "../../../components/page/page.vue";
import dial from '@/assets/js/linkDial.js';
import {
  getContractInfoList,
  getStatus,
  getContractAuditStatus,
  getContractStatus
} from "../../../components/axios/crm.js";
import {
  formData,
  formatTime,
  formatTime2
} from "../../../../assets/js/common.js";
import InvoiceInfoModal from "./invoiceInfoModal.vue";
export default {
   name: "contractInfo",

  data() {
    return {
      invoiceInfoMsg:{},
      showInvoiceInfo:false,
      total: 0,
      pageSize: 10,
      pageNum: 1,
      showSizer: true,
      pageSizeOpts: [5, 10, 20, 30],
      tableData: [],
      formItem: {
        // contractCode: "",
        // archivalNo: "",
        // contractStatus: "",
        memberId: window.localStorage.getItem("lzMemberId")
      },
      statusType: [],
      columns: [
        {
          key: "memberName",
          title: "公司名称",
          minWidth: 120,
          render: (h, data) => {
            // return h('span',{
            //   style: {
            //     color: '#2066dc',
            //     cursor: 'pointer'
            //   },
            //   on: {
            //     click: () => {
            //       this.showBasicInfo(data)
            //     }
            //   }
            // }, data.row.memberName)
            return h(
              "Tooltip",
              {
                props: {
                  placement: "top",
                  maxWidth: 400
                },
                style: {
                  display: "block",
                  color: "#2d8cf0",
                  cursor: "pointer",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap"
                }
              },
              [
                h(
                  "span",
                  {
                    on: {
                      click: () => {
                        this.showBasicInfo(data);
                      }
                    }
                  },
                  data.row.memberName
                ),
                h("div", {
                  slot: "content",
                  domProps: {
                    innerHTML: data.row.memberName
                  }
                })
              ]
            );
          }
        },
        {
          key: "userName",
          title: "用户名",
          minWidth: 100
        },
        {
          key: "contractCode",
          title: "合同编号",
          minWidth: 160
        },
        {
          key: "contractStatus",
          title: "合同状态",
          minWidth: 120,
          render: (h, data) => {
            let statustext = "";
            if (data.row.status == 0) {
              statustext = this.getNameContractStatus(data.row.status);
            } else {
              statustext =
                this.getNameContractStatus(data.row.status) +
                "(" +
                this.getNameContractAuditStatus(data.row.auditStatus) +
                ")";
            }
           
            return h("span", {}, statustext);
          }
        },
        {
          key: "totalAmount",
          title: "洽谈金额",
          minWidth: 80
        },
        {
          key: "createTime",
          title: "创建时间",
          minWidth: 160,
          render: (h, data) => {
            return h(
              "span",
              data.row.createTime ? formatTime2(data.row.createTime) : ""
            );
          }
        },
        {
          key: "period",
          title: "服务期限",
          minWidth: 100,
          render: (h, data) => {
            let list = []
            if(data.row.cpList && data.row.cpList.length > 0) {
              data.row.cpList.map(item => {
                let str = `${item.productNameCn}(${formatTime(item.startTime)} 至 ${formatTime(item.endTime)})`
                list.push(str)
              })
            }
            return h('div', [
              h('Tooltip', {
                props: {
                  placement: 'top',
                  maxWidth: 600
                },
                style: {
                  marginLeft: '5px',
                  color: '#2d8cf0',
                  cursor: 'pointer'
                },
              }, [list && list.length > 0 ? '详情' : '', h('div', {
                  slot: 'content',
                  domProps: {
                    innerHTML: list.join('<br />')
                  }
                })
              ])
            ])
          }
        },
        // {
        //   key: "accountTime",
        //   title: "到账日期",
        //   minWidth: 100,
        //   render: (h, data) => {
        //     return h(
        //       "span",
        //       data.row.accountTime ? formatTime2(data.row.accountTime) : ""
        //     );
        //   }
        // },
        {
          key: "checkTime",
          title: "认账日期",
          minWidth: 120,
          render: (h, data) => {
            return h("span",
              data.row.checkTime ? formatTime(data.row.checkTime) : ""
            );
          }
        },
        {
          key: "adminName",
          title: "业务员",
          minWidth: 80
        },
        {
          key: "mobile",
          title: "业务员电话",
          minWidth: 120,
          render: (h, data) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    color: "#2d8cf0",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.onDial(data.row.mobile);
                    }
                  }
                },
                data.row.mobile
              )
            ]);
          }
        },
        {
          title: "操作",
          minWidth: 200,
          fixed: "right",
          render: (h, data) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    marginRight: "8px",
                    color: "#2066dc",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.check(data);
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
                    color: "#2066dc",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                        this.$router.push({name:'confirmContractDetail',query: {contractBaseId: data.row.id}})
                    }
                  }
                },
                "认账"
              ),
              h(
                "span",
                {
                  style: {
                    color: "#2066dc",
                    cursor: "pointer",
                    marginRight: "8px"
                  },
                  on: {
                    click: () => {
                     this.$router.push({name:'applyDetail',query: {id: data.row.id}})
                    }
                  }
                },
                "开票"
              ),
              h(
                "span",
                {
                  style: {
                    color: "#2066dc",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.showInvoiceInfo=true;
                      this.invoiceInfoMsg={
                        contractCode:data.row.contractCode
                      }
                    }
                  }
                },
                "查看发票信息"
              )
            ]);
          }
        }
      ],
      contractAuditStatus:[],
      contractStatus:[],
    };
  },
  components: {
    TabHeader,
    OilPage,
    InvoiceInfoModal
  },
  created() {
    this.getListPage();
    this.getStatus();
    this.getContractAuditStatusVue();
    this.getContractStatusVue();
  },
  methods: {
    // 合同状态
    getContractAuditStatusVue() {
      let that = this;
      getContractAuditStatus().then(resp => {
        if (resp.status == 200) {
          that.contractAuditStatus = resp.response;
        }
      });
    },
    // 合同状态
    getContractStatusVue() {
      let that = this;
      getContractStatus().then(resp => {
        if (resp.status == 200) {
          that.contractStatus = resp.response;
        }
      });
    },
    getNameContractStatus(value) {
      let temt = "无";
      for (let i = 0; i < this.contractStatus.length; i++) {
        if (this.contractStatus[i].value === value) {
          temt = this.contractStatus[i].desc;
          break;
        }
      }
      return temt;
    },
        // 通过id获取name
    getNameContractAuditStatus(value) {
      let temt = "无";
      for (let i = 0; i < this.contractAuditStatus.length; i++) {
        if (this.contractAuditStatus[i].value === value) {
          temt = this.contractAuditStatus[i].desc;
          break;
        }
      }
      return temt;
    },
    hideInvoiceInfo(){
      this.showInvoiceInfo=false;
    },
    // 获取列表数据
    getListPage() {
      this.$Spin.show();
      let params=this.formItem;
      params.status=this.formItem.status===undefined?'':this.formItem.status;
      params.auditStatus=this.formItem.auditStatus===undefined?'':this.formItem.auditStatus
       params.pageSize= this.pageSize;
        params.pageNum=this.pageNum;
        
      getContractInfoList(formData(params)).then(res => {
        this.tableData = res.response.list;
        this.total = res.response.total;
        this.$Spin.hide();
      });
    },
    // 获取合同状态下拉
    getStatus() {
      getStatus().then(res => {
        console.log("qqq", res);
        this.statusType = res.response;
      });
    },
    findlist(){
      this.pageSize= 10;
      this.pageNum=1;
      this.getListPage();
    },
    // 重置
    reset() {
      this.formItem = {
            // contractCode: "",
            // archivalNo: "",
            // contractStatus: "",
            memberId: window.localStorage.getItem("lzMemberId")
          }
    },
    // 点击公司名称
    showBasicInfo(data) {},
    // 创建合同
    createContract() {
      this.$router.push({
        name: "creatAgreement",
        query: {
          memberId: window.localStorage.getItem('lzMemberId'),
          // memberName: window.localStorage.getItem('lzMemberName'),
          userId: window.localStorage.getItem('lzUserId'),
          // userName: window.localStorage.getItem('lzUserName'),
          // realName: window.localStorage.getItem('lzRealName'),
          // mobile: window.localStorage.getItem('lzMobile')
        }
      });
    },
    // 查看
    check(data) {
      this.$router.push({
        name: "checkContact",
        query: {
          contractCode: data.row.contractCode,
          bussinessId: data.row.id
        }
      });
    },
    // 呼出
    onDial(phone) {
      dial(phone, res => {
        this.$Notice.success({title: '呼叫成功：' + phone})
      });
    },
    // 监听分页
    pageChange(page, pageSize) {
      if (page) {
        this.pageNum = page;
      }
      if (pageSize) {
        this.pageSize = pageSize;
      }
      this.getListPage();
    }
  }
};
</script>
