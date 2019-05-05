<style lang="less">
@import "../myagreement/myagreement.less";
.navbox {
  margin-bottom: 20px;
}
</style>
<template >
  <Row>
    <Col span="24" class="grid-table">
      <Card>
        <Row class="">
          <div class="table-title">合同编号</div>
          <table width="100%" border="0" cellspacing="0" class="tablewrap">
            <Row>
              <Col span="12" class="row" >
                <th class="th">合同编号：</th>
                <td class="td agreeaction ">{{agreement.contractCode}}</td>
                <!-- <a @click="agreementdetial">客户合同</a>  -->
              </Col>
              <Col span="12" class="row">
                <th class="th">创建时间：</th>
                <td class="td ">{{refundAgreement.createTime}}</td>
              </Col>
              <Col span="12" class="row" >
                <th class="th ">合同状态：</th>
                <td class="td blueword1">{{refundAgreement.auditStatus}}</td>
              </Col>
              <Col span="12" class="row">
                <th class="th">业务员</th>
                <td class="td blueword1">{{refundAgreement.creatorName}}</td>
              </Col>
            </Row>
          </table>
        </Row>
        <Row class="">
          <div class="table-title">基本信息</div>
          <table width="100%" border="0" cellspacing="0" class="tablewrap">
            <Row>
              <Col span="12" class="row" >
                <th class="th">甲方：</th>
                <td class="td blueword1">{{agreement.partA}}</td>
              </Col>
              <Col span="12" class="row">
                <th class="th">乙方：</th>
                <td class="td blueword1">{{agreement.partB}}</td>
              </Col>
              <Col span="12" class="row" >
                <th class="th ">用户名：</th>
                <td class="td blueword1">{{agreement.userName}}</td>
              </Col>
              <Col span="12" class="row">
                <th class="th">法定代表人或授权人</th>
                <td class="td">{{agreement.delegateB}}</td>
              </Col>
              <Col span="12" class="row" >
                <th class="th">法定代表人或授权人</th>
                <td class="td">{{agreement.delegateA}}</td>
              </Col>
              <Col span="12" class="row">
                <th class="th">联系电话</th>
                <td class="td">{{agreement.phoneB}}</td>
              </Col>
              <Col span="12" class="row" >
                <th class="th">联系电话</th>
                <td class="td">{{agreement.phoneA}}</td>
              </Col>
              <Col span="12" class="row" >
                <th class="th"></th>
                <td class="td"></td>
              </Col>
            </Row>
          </table>
        </Row>
        <Row>
          <div class="table-title" ><span > 退款详情</span> </div>
          <Table class="tableCommon" :columns="columns1" :data="producelist"></Table>
          <Row >
            <Col class="explain"> 合同说明：{{contractDescription}}</Col>
            <Col class="discount" > 总价<span class="redword">{{realAmount}}{{unit}} </span><span></span> </Col>
          </Row>
        </Row>
        <Row>
          <div class="table-title" >开通方式</div>
          <div class="openexplain">说明：默认“认账后开通”，如果您的用户不能及时打款，可以选择 "立即开通" 便于及时使用产品！</div>
          <RadioGroup v-model="agreement.effectiveType" >
            <Radio label="1" disabled>认账后开通</Radio>
            <Radio label="2" disabled>立即开通</Radio>
          </RadioGroup>
        </Row>
        <Row>
          <div class="table-title isinvoice" >需要发票</div>
          <RadioGroup v-model="agreement.isNeedInvoice">
            <Radio label="1"  disabled>是</Radio>
            <Radio label="0" disabled>否</Radio>
          </RadioGroup>
        </Row>
        <Row >
          <div class="table-title checkstep" >审核信息</div>
          
          <div style="margin-bottom: 10px">
            <Steps :current="length">
                <Step title="退款申请" :content="formCustomApply.start"></Step>
                <Step title="退款审核" :content="formCustomApply.user1"></Step>
                <Step title="财务退款" :content="formCustomApply.user2"></Step>
                <Step title="退款成功" content="系统自动"></Step>
            </Steps>
        </div>
        
          <Table class="tableCommon" :columns="columns2" :data="resulttable"></Table>
          
        </Row>
       
        <Row class="actionwrap">
            
            <div v-if="step=='3'">
              <Button type="primary" class="search-btn" @click="showchangemodel">上传合同</Button>
              <Button type="error" class="search-btn" style="margin-left: 8px">驳回</Button>
              <Button type="error" class="search-btn" style="margin-left: 8px" @click="closeagreement">作废</Button>

              <Button type="primary" class="search-btn" style="margin-left: 8px">返回</Button>
            </div>
            <div v-else-if="step=='5'">
              <Button type="error" class="search-btn" style="margin-left: 8px">驳回</Button>
              <Button type="error" class="search-btn" style="margin-left: 8px" @click="closeagreement">作废</Button>
              <Button type="primary" class="search-btn" style="margin-left: 8px">返回</Button>
            </div>
            <div v-else-if="step=='8'">
            
              <Button type="primary" class="search-btn" >返回</Button>

              <!-- <Button  style="margin-left: 8px" class="search-btn">取消</Button> -->
            </div>
            <div v-else>
              <Button type="primary" class="search-btn" style="margin-left: 8px" @click="back">返回</Button>
             
            </div>
        </Row>
      </Card>
    </Col>
    <Modal
        v-model="confirmmodal"
        title="上传合同"
        @on-cancel="changecancel" width='400'>
        <Row>
          <Col span='8'>是否需要合同：</Col>
          <Col span='16'class='navbox'>
            <RadioGroup v-model="IsNeed">
              <Radio label="0" >否</Radio>
              <Radio label="1" >是</Radio>
            </RadioGroup>
          </Col>
          <Col v-if='IsNeed=="1"'>
            <Input v-model="value8" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="主要变更条款说明" class='navbox' />
              <Upload
            :before-upload = "handleUpload"
            :data = "form"
            :default-file-list = "productForm.attachList"
            :on-success = "uploadSuccess"
            :on-preview = "getUrl"
            :on-remove = "removeUrl"
            :max-size = 20*1024
            :action="filepath">
            <Button style="width:190px">
              <b class="icon-add2">+</b>
              <span>点击上传</span>
            </Button>
          </Upload>
          </Col>
        </Row>
        <div slot="footer">
          <Button @click="changecancel" style="margin-right:8px;">取消</Button>
          <Button type="primary" @click="changeconfirm" style="margin-right:8px;"> 确定</Button>
          <Button type="primary" @click="changeconfirmafter"  > 先认账后上传合同</Button>
        </div>
    </Modal>
    <Spin size="large" fix v-if="spinShow"></Spin>
  </Row>
</template>
<script>
import axios from "axios";
import {
  contractChangeapplyWorkflow,
  contractChangeapplyInfoAll,
  contractChangeapplyInfoContractApplyAudit,
  getMsgByContractCode,
  getProductInfo,
  uploadContractChange, //审核页面客户上传合同,变更流程
  getContractAuditDetail, //审批详情
  closeContract, //作废
  getContractAuditResult //通过
} from "../../components/axios/crm.js";
import timeStampChange from "../../../assets/js/timestamp_change.js";
import {
  formData,
  formatStamp,
  formatTime
} from "../../../assets/js/common.js";
export default {
  name: "waittingCheck",
  components: {},
  data() {
    return {
      spinShow:false,
      productForm: {
        tips: "",
        attachList: []
      },
      value8: "",
      filepath: "/crm/contract-info/upload_attach", //文件上传地址
      fileroad: "",

      form: {
        file: ""
      },
      confirmmodal: false,
      IsNeed: "0",
      accountAmout: "",
      realAmount: "",
      contractCode: "",
      suggestion: "",
      isinvoice: "1",
      agreementstatus: "0",
      step: 1,
      productIds: "",
      isopen: "1",
      id: -1,
      length: 1,
      formCustomApply: {},
      onsale: "-500",
      contractDescription: "",
      showselectProduceModal: false,
      selectproduct: true,
      formCustom: {},
      agreement: {},
      refundAgreement: {},
      todoTaskDTO: {},
      gridColumns: {},
      columns1: [
        {
          title: "序号",
          type: "index",
          width: 60
        },
        {
          title: "产品名称",
          key: "productNameCn",
          minWidth: 150,
          className: "colorbluer"
        },
        {
          title: "产品分类",
          key: "productCategoryCode",
          minWidth: 150
        },
        {
          title: "单价",
          key: "standardPrice",
          minWidth: 180,
          render: (h, data) => {
            return h(
              "div",
              data.row.price +
                this.getunit(data.row.unit) +
                "/" +
                this.gettimeunit(data.row.period)
            );
          }
        },
        // {
        //   title: "参会人数",
        //   key: "personnum",
        //   minWidth: 83
        // },
        {
          title: "产品计数",
          key: "number",
          minWidth: 200,
          render: (h, data) => {
            if (
              data.row.productCategoryCode.slice(0, 3) == "001" ||
              data.row.productCategoryCode.slice(0, 3) == "003" ||
              data.row.productCategoryCode.slice(0, 3) == "006" ||
              data.row.productCategoryCode.slice(0, 3) == "007" ||
              data.row.productCategoryCode.slice(0, 3) == "004" ||
              data.row.productCategoryCode.slice(0, 3) == "008" ||
              data.row.productCategoryCode.slice(0, 3) == "009" ||
              data.row.productCategoryCode.slice(0, 3) == "010" ||
              data.row.productCategoryCode.slice(0, 3) == "011"
            ) {
              return h(
                "div",
                "服务期限" + data.row.number + this.gettimeunit(data.row.period)
              );
            } else if (
              data.row.productCategoryCodeName == "地图" ||
              data.row.productCategoryCode.slice(0, 3) == "005"
            ) {
              var a = "";
              if (data.row.productCategoryCode.slice(0, 3) == "005") {
                a = "增值数量";
              } else if (data.row.productCategoryCodeName == "地图") {
                a = "地图数量";
              }
              return h("div", a + data.row.number + this.gettimeunit(data.row.period));
            } else if (data.row.productCategoryCode.slice(0, 3) == "002") {
              var telspan = "";
              if (data.row.ubList.length > 0) {
                for (var i = 0; i < data.row.ubList.length; i++) {
                  telspan +=
                    "<p style='margin-right:10px'>" +
                    data.row.ubList[i].realName +
                    "(" +
                    data.row.ubList[i].mobile +
                    ")" +
                    "</p>";
                }
              }

              return h("div", [
                h("div", {
                  domProps: {
                    innerHTML: telspan
                  },
                  props: {
                    value: data.row.ubList.length
                  }
                }),
                h(
                  "div",
                  "服务期限" +
                    data.row.number +
                    this.gettimeunit(data.row.period)
                )
              ]);
            }
          }
        },
        {
          title: "生效日期",
          key: "startTime",
          minWidth: 150,
          render: (h, data) => {
            return h("div", [
              h("p", timeStampChange.format(data.row.startTime))
            ]);
          }
        },
        // {
        //   title: "原合同到期日",
        //   key: "endTime",
        //   minWidth: 150,
        //   render: (h, data) => {
        //     return h("div", [h("p", timeStampChange.format(data.row.endTime))]);
        //   }
        // },
        {
          title: "小计",
          key: "subtotalStandardPrice",
          minWidth: 120,
          render: (h, data) => {
            return h("div", [
              h(
                "p",
                data.row.subtotalStandardPrice + this.getunit(data.row.unit)
              )
              // h(
              //   "p",
              //   {
              //     style: {
              //       color: "red"
              //     }
              //   },
              //   "已优惠：" + data.row.isonsale + "元/次"
              // )
            ]);
          }
        },
        {
          title: "洽谈价格",
          key: "subtotalPrice",
          minWidth: 150,
          render: (h, data) => {
            return h("div", [
              h("p", data.row.subtotalPrice + this.getunit(data.row.unit))
              // h(
              //   "p",
              //   {
              //     style: {
              //       color: "red"
              //     }
              //   },
              //   "已优惠：" + data.row.isonsale + "元/次"
              // )
            ]);
          }
        },
        {
          title: "价格说明",
          key: "description",
          minWidth: 250,
           render:(h,data)=>{
            return h("div", [
              h(
                "Tooltip",
                {
                  props: {
                    placement: "top",
                    maxWidth: 600
                  },
                  style: {
                    marginLeft: "5px",
                    color: "#2d8cf0",
                    cursor: "pointer"
                  }
                },
                [
                  h(
                    "span",
                    {
                      on: {
                        click: () => {
                          // this.copyText(list);
                        }
                      }
                    },
                    data.row.description.length > 5 ? data.row.description.substring(0,5)+'...' : ""
                  ),
                  h("div", {
                    slot: "content",
                    style: {
                      maxHeight: "400px",
                      overflow: "auto"
                    },
                    domProps: {
                      innerHTML:data.row.description
                    }
                  })
                ]
              )
            ]);
          }
        }
      ],
      producelist: [],
      columns2: [
        {
          title: "审批时间",
          key: "lastAccess",
          minWidth: 200,
          render: (h, data) => {
            return h("div", [
              h("span", timeStampChange.format(data.row.lastAccess))
            ]);
          }
        },
        {
          title: "审批人",
          key: "auditor",
          minWidth: 150
        },
        {
          title: "操作内容",
          key: "isPass",
          minWidth: 250,
          render: (h, data) => {
            let isPass = "";
            if (data.row.isPass === 0) {
              isPass = "驳回";
            } else {
              isPass = "通过";
            }
            return h("span", {}, isPass);
          }
        },
        {
          title: "审批意见",
          key: "note",
          minWidth: 500
        }
      ],
      resulttable: [],
      unit: ""
    };
  },
  methods: {
    //通过
    passagree(data) {
      let countent = "通过";
      if (data === 0) {
        countent = "驳回";
      }
      this.$Modal.confirm({
        title: "提示",
        content: "<p>是否" + countent + "该退款合同？</p>",
        onOk: () => {
          var that = this;
          let status = data;
          let msg = {
            bussinessId: that.todoTaskDTO.businessId,
            message: this.suggestion,
            pass: status,
            taskId: that.todoTaskDTO.id
          };
         this.spinShow=true;
          contractChangeapplyInfoContractApplyAudit(formData(msg)).then(
            resp => {
              that.spinShow=false;
              that.$Message.info(resp.message);
              that.$router.push({
                name: "refundAudit"
              });
            }
          );
        },
        onCancel: () => {
          // this.$Message.info('Clicked cancel');
        }
      });
    },
    //作废
    closeagreement() {
      this.$Modal.confirm({
        title: "提示",
        content: "<p>是否作废该合同？</p>",
        onOk: () => {
          var that = this;
          let msg = {
            contractId: this.$route.query.bussinessId,
            message: this.suggestion
          };
          this.spinShow=true;
          closeContract(msg).then(resp => {
            that.spinShow=false;
            that.$Message.info(resp.message);
            // that.$router.go(0)
          });
        },
        onCancel: () => {
          // this.$Message.info('Clicked cancel');
        }
      });
    },
    sendmsg(data) {
      var that = this;
      this.spinShow=true;
      let msg = {
        isNeed: this.IsNeed,
        effectiveType: data,
        filePath: this.fileroad,
        contractDescription: this.value8,
        contractCode: this.$route.query.contractCode
      };
      uploadContractChange(msg).then(resp => {
        that.spinShow=false;
        // that.$router.go(0)
      });
    },
    //点击上传合同
    showchangemodel() {
      this.confirmmodal = true;
    },
    //先认账后上传
    changeconfirmafter() {
      if (this.IsNeed == "1") {
        if (this.fileroad == "") {
          this.$Message.warning("请上传文件");
          return;
        }
      }
      this.sendmsg(0);
    },
    //变更确定
    changeconfirm() {
      // this.confirmmodal = false;
      if (this.IsNeed == "1") {
        if (this.fileroad == "") {
          this.$Message.warning("请上传文件");
          return;
        }
      }
      this.sendmsg(1);
    },
    // 变更取消
    changecancel() {
      this.confirmmodal = false;
    },
    //上传成功后调用
    uploadSuccess(resp) {
      this.fileroad = resp.response;
      // this.productForm.attachList.push(uploadMes)
    },
    //上传文件
    handleUpload(file) {
      // file.isModify= 1;
      // file.page=0;
      if (!this.fileroad) {
        this.form.file = file;
      } else {
        this.$Message.warning("只能上传一个文件");
        return false;
      }
    },
    //点击上传成功后的文件地址
    getUrl(data) {},
    //点击删除文件地址
    removeUrl(file, fileList) {
      this.fileroad = "";
    },
    // 预览
    preview() {
      window.location.href = "/crm/contract-info/download/" + this.contractCode;
    },
    //下载
    download() {
      window.location.href = "/crm/contract-info/download/" + this.contractCode;
      var that = this;

      // axios
      //   .get("/crm/contract-info/download/" + this.contractCode)
      //   .then(function(response) {
      //     if (response.data.status == "200") {

      //     }
      //   })
      //   .catch(function(error) {});
    },
    downloadfile(data) {
      if (!data) {
        return;
      }
      let url = window.URL.createObjectURL(new Blob([data]));
      let link = document.createElement("a");
      link.style.display = "none";
      link.href = url;
      link.setAttribute("download", "excel.xlsx");

      document.body.appendChild(link);
      link.click();
    },
    agreementdetial() {},
    // 获取合同基本信息
    getMsg() {
      var that = this;
      this.id = this.$route.query.id;
      let id = this.$route.query.id;
      this.spinShow=true;
      let params = {
        id: id
      };
      contractChangeapplyInfoAll(params).then(resp => {
       that.spinShow=false;
        if (resp.status == 200) {
          resp.response.contractChangeApplyVO.createTime = timeStampChange.format(
            resp.response.contractChangeApplyVO.createTime
          );
          resp.response.contractChangeApplyVO.auditStatus = that.getStatus(
            resp.response.contractChangeApplyVO.auditStatus
          );
          that.refundAgreement = resp.response.contractChangeApplyVO;
          that.realAmount = resp.response.contractChangeApplyVO.adjustAmount;
          that.agreement = resp.response.contractBaseInfoVO;
          
          that.agreement.isNeedInvoice = that.agreement.isNeedInvoice.toString(
            10
          );
          if (
            resp.response.contractBaseVO.effectiveType == 0 ||
            resp.response.contractBaseVO.effectiveType == 1
          ) {
            that.agreement.effectiveType = "1";
          } else {
            that.agreement.effectiveType = "2";
          }
          that.contractDescription=resp.response.contractBaseInfoVO.description||'略'
          that.todoTaskDTO = resp.response.todoTaskDTO;
          that.resulttable = resp.response.contractApplyAuditLogVOs;
          that.producelist =
            resp.response.contractChangeApplyVO.contractChangeProductVOs;
          that.unit = that.getunit(that.producelist[0].unit);
        }
      });
    },
    // 获取选购产品信息
    getProduct() {
      let data = {
        contractCode: this.$route.query.contractCode
      };
      this.spinShow=true;
      let that = this;
      getProductInfo(data).then(resp => {
        that.spinShow=false;

        that.producelist = resp.response.list;
        that.unit = that.getunit(that.producelist[0].unit);
        that.realAmount = resp.response.realAmount;
        that.accountAmout = resp.response.accountAmout;
      });
    },
    // 获取审批信息列表
    gettablemsg() {
      var msg = {
        bussinessId: this.$route.query.bussinessId,
        taskId: ""
      };
      this.spinShow=true;
      let that = this;
      getContractAuditDetail(msg).then(resp => {
        that.spinShow=false;
        that.resulttable = resp.response.list;
      });
    },
    contractChangeapplyWorkflowVue() {
      this.id = this.$route.query.id;
      var msg = {
        id: this.$route.query.id
      };
      this.spinShow=true;
      let that = this;
      contractChangeapplyWorkflow(msg).then(resp => {
        that.spinShow=false;
        let msg = resp.response.taskMap;
        that.formCustomApply.start = msg.start.admin;
        that.formCustomApply.user1 = msg.user1.admin;
        that.formCustomApply.user2 = msg.user2.admin;
        if (msg.user2.audited === true) {
          that.length = 4;
        } else if (msg.user1.audited === true) {
          that.length = 2;
        } else {
          that.length = 1;
        }
      });
    },
    // 状态
    getStatus(a) {
      switch (a) {
        case 0:
          a = "待审核";
          break;
        case 1:
          a = "审批通过";
          break;
        case 2:
          a = "已驳回";
          break;
        case 99:
          a = "其他";
          break;
      }
      return a;
    },
    getunit(a) {
      switch (Number(a)) {
        case 0:
          a = "人民币";
          break;
        case 1:
          a = "美元";
          break;
        case 2:
          a = "欧元";
          break;
      }
      return a;
    },
    gettimeunit(a) {
      switch (Number(a)) {
        case 0:
          a = "次";
          break;
        case 1:
          a = "月";
          break;
        case 2:
          a = "年";
          break;
        case 3:
          a = "张";
          break;
      }
      return a;
    },
    // 返回
    back() {
      this.$router.push({
        name: "myRefundAudit"
      });
    }
  },
  created() {
    this.getMsg();
    this.contractChangeapplyWorkflowVue();
    //    this.getProduct();
    //   this.gettablemsg();
  }
};
</script>
