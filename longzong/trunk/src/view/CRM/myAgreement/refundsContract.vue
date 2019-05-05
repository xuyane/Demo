<style lang="less">
@import "./myagreement.less";
</style>
<template >
  <Row>
    <Col span="24" class="grid-table">
      <Card>
        <!-- <Row class="tablebox">
          <div class="table-title">合同编号</div>
          <table width="100%" border="0" cellspacing="0" class="tablewrap">
            <Row>
              <Col span="12" class="row" >
                <th class="th">合同编号：</th>
                <td class="td agreeaction ">{{agreement.contractCode}} <a @click="preview">预览</a><a @click="download">下载</a></td>
              </Col>
              <Col span="12" class="row">
                <th class="th">创建时间：</th>
                <td class="td ">{{agreement.createTime}}</td>
              </Col>
              <Col span="12" class="row" >
                <th class="th ">合同状态：</th>
                <td class="td blueword1">{{agreement.contractStatus}}</td>
              </Col>
              <Col span="12" class="row">
                <th class="th">业务员</th>
                <td class="td blueword1">{{agreement.adminName}}</td>
              </Col>
            </Row>
          </table>
        </Row> -->
        <Row class="tablebox">
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
          <div class="table-title" ><span > 选购产品</span> </div>
          <Table class="tableCommon" :columns="columns1" :data="producelist" @on-selection-change='hasselectproduce'></Table>
          <Row class="discountwrap" v-if='discountdetial.type==3||discountdetial.type==4'>
                <Col span='1' class="bleft" style="max-width:61px;text-align:center"><Checkbox v-model="single" @on-change='selectonsale'></Checkbox></Col>
                <Col span='2' class="bleft">优惠折扣</Col>
                <Col span='10' ><a>{{discountdetial.saleStrategyName}}</a></Col>
                <Col span='11' class="wordcenter">{{discountdetial.gift}}</Col>
          </Row>
          <Row >
            <Col class="explain"> 合同说明：{{contractDescription}}</Col>
            <Col class="discount" > 退款<span class="redword">{{gobackmoney}}</span>{{unit}} <span >(原合同价{{realAmount}}{{unit}})</span></Col>
          </Row>
          <Row v-if='discountproduce.length>0'>
            <div class="table-title" ><span > 优惠产品</span> </div>
            <Table class="tableCommon" :columns="columns3" :data="discountproduce" @on-selection-change='hassaleproduce'></Table>
          </Row>
        </Row>
        <Row class="actionwrap">
            
            <div>
                <Button type="primary" class="search-btn" @click='confirm'>确定</Button>

              <Button type="primary" class="search-btn" style="margin-left: 8px" @click="back">返回</Button>
            </div>
        </Row>
      </Card>
    </Col>
    <Spin size="large" fix v-if="spinShow"></Spin>
  </Row>
</template>
<script>
import axios from "axios";
import {
  getMsgByContractCode,
  getProductInfo,
  contractchangeapplySave, //退款
  querySaleStrategy
} from "../../components/axios/crm.js";
import timeStampChange from "../../../assets/js/timestamp_change.js";
export default {
  name: "waittingCheck",
  components: {},
  data() {
    return {
      spinShow:false,
      discountproduce: [],
      single: false,
      discountdetial: {},
      contractId: "",
      producelist2: [],
      gobackmoney: 0,
      unit: "",
      add: "",
      accountAmout: "",
      realAmount: "",
      contractCode: "",
      suggestion: "",
      isinvoice: "1",
      agreementstatus: "0",
      step: 1,
      productIds: "",
      isopen: "1",
      onsale: "-500",
      contractDescription: "",
      showselectProduceModal: false,
      selectproduct: true,
      formCustom: {},
      agreement: {},
      gridColumns: {},
      columns1: [
        {
          type: "selection",
          width: 60,
          key: "checked",
          align: "center"
        },
        {
          title: "产品名称",
          key: "productNameCn",
          minWidth: 150,
          className: "colorbluer"
        },
        {
          title: "产品分类",
          key: "productCategoryCodeName",
          minWidth: 150
        },
        // {
        //   title: "单价",
        //   key: "price",
        //   minWidth: 180,
        //   render: (h, data) => {
        //     return h("div", [
        //       h("p", data.row.price + this.getunit(data.row.unit))
        //       // h(
        //       //   "p",
        //       //   {
        //       //     style: {
        //       //       color: "red"
        //       //     }
        //       //   },
        //       //   "已优惠：" + data.row.onsale + "元"
        //       // )
        //     ]);
        //   }
        // },
        {
          title: "单价",
          key: "price",
          minWidth: 180,
          render: (h, data) => {
            var value = 0;
            if (Number(data.row.price) < Number(data.row.standardPrice)) {
              value = Number(data.row.standardPrice) - Number(data.row.price);
              return h("div", [
                h(
                  "div",
                  data.row.price +
                    this.getunit(data.row.unit) +
                    "/" +
                    this.gettimeunit(data.row.period)
                ),
                h(
                  "div",
                  {
                    style: {
                      color: "red"
                    }
                  },
                  "已优惠：" + value.toFixed(2) + this.getunit(data.row.unit)
                )
              ]);
            } else if (
              Number(data.row.price) > Number(data.row.standardPrice)
            ) {
              value = Number(data.row.price) - Number(data.row.standardPrice);
              return h("div", [
                h(
                  "div",
                  data.row.price +
                    this.getunit(data.row.unit) +
                    "/" +
                    this.gettimeunit(data.row.period)
                ),
                h(
                  "div",
                  {
                    style: {
                      color: "red"
                    }
                  },
                  "已加价：" + value.toFixed(2) + this.getunit(data.row.unit)
                )
              ]);
            } else {
              return h(
                "span",
                data.row.price +
                  this.getunit(data.row.unit) +
                  "/" +
                  this.gettimeunit(data.row.period)
              );
            }
          }
        },
        {
          title: "产品计数",
          key: "number",
          minWidth: 250,
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
              return h("div", [
                h(
                  "span",
                  {
                    style: {
                      marginRight: "8px"
                    }
                  },
                  "服务期限"
                ),
                h("InputNumber", {
                  props: {
                    max: this.producelist2[data.index].number,
                    min: 1,
                    value: data.row.number,
                    precision: 0,
                  activeChange: false
                  },
                  on: {
                    "on-blur": () => {
                      // this.getlost(data);
                    },
                    "on-change": num => {
                      data.row.number = num;
                      // data.row.subtotalStandardPrice =
                      //   data.row.standardPrice * num;
                      data.row.subtotalPrice = data.row.price * num;
                      this.producelist[data.index] = data.row;
                      this.getsame(data.row);
                      this.getsum();
                    }
                  }
                }),
                h("span", this.gettimeunit(data.row.period))
              ]);
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
              return h("div", [
                h(
                  "span",
                  {
                    style: {
                      marginRight: "8px"
                    }
                  },
                  a
                ),
                h("InputNumber", {
                  props: {
                    max: this.producelist2[data.index].number,
                    min: 1,
                    value: data.row.number,
                    precision: 0,
                  activeChange: false
                  },
                  on: {
                    "on-blur": () => {
                      // this.getlost(data);
                    },
                    "on-change": num => {
                      data.row.number = num;
                      // data.row.subtotalStandardPrice =
                      //   data.row.standardPrice * num;
                      data.row.subtotalPrice = data.row.price * num;
                      this.producelist[data.index] = data.row;
                      this.getsame(data.row);
                      this.getsum();
                    }
                  }
                }),
                h("span", this.gettimeunit(data.row.period))
              ]);
            } else if (data.row.productCategoryCode.slice(0, 3) == "002") {
              var telspan = "";
              if (data.row.ubList.length > 0) {
                for (var i = 0; i < data.row.ubList.length; i++) {
                  telspan +=
                    "<p ><span style='margin-right:10px'>" +
                    data.row.ubList[i].realName +
                    "(" +
                    data.row.ubList[i].mobile +
                    ")" +
                    "</span></p>";
                    // <a class='delateicon' id='delate_" +
                    // i +
                    // "'>×</a>
                }
                return h("div", [
                  h("div", {
                    domProps: {
                      innerHTML: telspan
                    },
                    props: {
                      value: 1
                    },
                    on: {
                      click: event => {
                        if (event.target.className == "delateicon") {
                          let uli = Number(event.target.id.split("_")[1]);
                          this.producelist[data.index].ubList.splice(uli, 1);
                          // this.producelist[data.index].subtotalStandardPrice =
                          //   this.producelist[data.index].standardPrice *
                          //   this.producelist[data.index].number*this.producelist[data.index].ubList.length;
                          this.producelist[data.index].subtotalPrice =
                            this.producelist[data.index].price *
                            this.producelist[data.index].number*this.producelist[data.index].ubList.length;
                          this.getsame(this.producelist[data.index]);
                          this.getsum();
                        }
                      }
                    }
                  }),
                h('div',[
                  h('span','服务期限'),
                  h("InputNumber", {
                  props: {
                    max: this.producelist2[data.index].number,
                    min: 1,
                    value: data.row.number,
                    precision: 0,
                  activeChange: false
                  },
                  on: {
                    "on-blur": () => {
                      // this.getlost(data);
                    },
                    "on-change": num => {
                      this.producelist[data.index].number = num;
                      // this.producelist[data.index].subtotalStandardPrice =
                      //   this.producelist[data.index].standardPrice * num*this.producelist[data.index].ubList.length;
                      this.producelist[data.index].subtotalPrice = this.producelist[data.index].price * num*this.producelist[data.index].ubList.length;
                      // this.producelist[data.index] = data.row;
                      this.getsame(this.producelist[data.index]);
                      this.getsum();
                    }
                  }
                }),
                h('span',this.gettimeunit(data.row.period))
                ])
                ]);
              }
            }
          }
        },
        {
          title: "小计",
          key: " subtotalStandardPrice",
          minWidth: 120,
          render: (h, data) => {
            return h(
              "span",
              data.row.subtotalStandardPrice + this.getunit(data.row.unit)
            );
          }
        },
        {
          title: "洽谈价格",
          key: "subtotalPrice",
          minWidth: 150,
          render: (h, data) => {
            let maxValue = Number(data.row.price)*Number(data.row.number)*Number(data.row.ubList.length);
            // return h("div", [
            //   h("span", data.row.subtotalPrice + this.getunit(data.row.unit)),
            //   // h(
            //   //   "p",
            //   //   {
            //   //     style: {
            //   //       color: "red"
            //   //     }
            //   //   },
            //   //   "已优惠：" + data.row.isonsale + "元/次"
            //   // )
            // ]);
            return h("div", [
              h("InputNumber", {
                props: {
                  max: Number(maxValue),
                  min: 0,
                  value: Number(data.row.subtotalPrice),
                  step:1.20,
                  precision: 2,
                },
                on: {
                  "on-blur": () => {},
                  "on-change": num => {
                    data.row.subtotalPrice = num.toFixed(2);
                    this.producelist[data.index] = data.row;
                    this.getsame(this.producelist[data.index]);
                    this.getsum();
                  }
                }
              }),
              h("span", this.getunit(data.row.unit))
            ]);
          }
        },
        {
          title: "价格说明",
          key: "description",
          minWidth: 250
        }
        // {
        //   title: "操作",
        //   key: "action",
        //   minWidth: 100,
        //   render: (h, data) => {
        //     return h(
        //       "a",
        //       {
        //         style: {
        //           color: "red"
        //         },
        //         on: {
        //           click: () => {
        //             this.delatehadselect(data);
        //           }
        //         }
        //       },
        //       "删除"
        //     );
        //   }
        // }
      ],
      columns3: [
        {
          type: "selection",
          width: 60,
          key: "checked",
          align: "center"
        },
        {
          title: "产品名称",
          key: "productNameCn",
          minWidth: 150,
          className: "colorbluer"
        },
        {
          title: "产品分类",
          key: "productCategoryCodeName",
          minWidth: 150
        },
        {
          title: "单价",
          key: "price",
          minWidth: 180,
          render: (h, data) => {
            var value = 0;
            if (Number(data.row.price) < Number(data.row.standardPrice)) {
              value = Number(data.row.standardPrice) - Number(data.row.price);
              return h("div", [
                h(
                  "div",
                  data.row.price +
                    this.getunit(data.row.unit) +
                    "/" +
                    this.gettimeunit(data.row.period)
                ),
                h(
                  "div",
                  {
                    style: {
                      color: "red"
                    }
                  },
                  "已优惠：" + value.toFixed(2) + this.getunit(data.row.unit)
                )
              ]);
            } else if (
              Number(data.row.price) > Number(data.row.standardPrice)
            ) {
              value = Number(data.row.price) - Number(data.row.standardPrice);
              return h("div", [
                h(
                  "div",
                  data.row.price +
                    this.getunit(data.row.unit) +
                    "/" +
                    this.gettimeunit(data.row.period)
                ),
                h(
                  "div",
                  {
                    style: {
                      color: "red"
                    }
                  },
                  "已加价：" + value.toFixed(2) + this.getunit(data.row.unit)
                )
              ]);
            } else {
              return h(
                "span",
                data.row.price +
                  this.getunit(data.row.unit) +
                  "/" +
                  this.gettimeunit(data.row.period)
              );
            }
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
          minWidth: 150,
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
              if (data.row.ubList) {
                if (data.row.ubList.length > 0) {
                  for (var i = 0; i < data.row.ubList.length; i++) {
                    telspan +=
                      "<p >" +
                      data.row.ubList[i].realName +
                      "(" +
                      data.row.ubList[i].mobile +
                      ")" +
                      "</p>";
                  }
                }
              }

              return h("div", [
                h("div", {
                  domProps: {
                    innerHTML: telspan
                  },
                  props: {
                    value: 1
                  }
                })
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
          minWidth: 250
        }
      ],
      producelist: [],
      columns2: [
        {
          title: "审批时间",
          key: "checktime",
          minWidth: 200
        },
        {
          title: "审批人",
          key: "person",
          minWidth: 150
        },
        {
          title: "操作内容",
          key: "action",
          minWidth: 250
        },
        {
          title: "审批意见",
          key: "suggest",
          minWidth: 500
        }
      ],
      resulttable: [],
      hasselist: [],
      saleproduct:[],
    };
  },
  methods: {
    // 勾选优惠产品
    hassaleproduce(data){
      this.saleproduct=data;
    },
    // 勾选优惠折扣
    selectonsale(value){
      if(value){

      }
    },
    getsaleproduct() {
      let msg = {
         contractCode: this.$route.query.contractCode
      };
      let that = this;
      querySaleStrategy(msg).then(resp => {
        that.discountdetial = resp.response.ContractSaleStrategyDTO;
        var a = "";
        switch (that.discountdetial.type) {
          case 1:
            a = "优惠折扣：" + that.discountdetial.description + "折";
            break;
          case 2:
            a = "打包价格：" + that.discountdetial.description + this.unit;
            break;
          case 3:
            a = "赠送产品：" + that.discountdetial.description;
            break;
          case 4:
            a = "赠送期限:" + that.discountdetial.description + "月";
            break;
          case 5:
            a = "赠送礼品:" + that.discountdetial.description;
            break;
        }
        that.discountdetial.gift = a;
        that.discountproduce = resp.response.giftProductDTOs;
      });
    },
    //是否存在0
    iszero() {
      for (var i = 0; i < this.hasselist.length; i++) {
        if (this.hasselist[i].productCategoryCode.slice(0, 3) == "002") {
          if (this.hasselist[i].ubList.length == 0) {
            this.$Message.info({
              content: "存在短信类产品的退款金额为0，请不要勾选该产品",
              duration: 3
            });
            return false;
          }
        }
        return true;
      }
    },

    //退款contractchangeapplySave
    confirm() {
      if (this.hasselist.length == 0) {
        this.$Message.warning("请勾选产品");
      } else {
        if (this.iszero()) {
          this.$Modal.confirm({
            title: "提示",
            content: "<p>是否确认退款？</p>",
            onOk: () => {
              let arr = [];
              const list = this.hasselist.map(item => {
                if (item.productCategoryCode.slice(0, 3) == "002") {
                  item.ubList.map(option => {
                    let option1 = {
                      id: item.id,
                      number: item.number,
                      productCategoryCode: item.productCategoryCode,
                      productId: item.productId,
                      contractCode: this.$route.query.contractCode,
                      userId: option.id,
                      subtotalPrice:
                        Number(item.subtotalPrice) /
                        item.ubList.length.toFixed(2),
                      period: item.period
                    };
                    arr.push(option1);
                  });
                } else {
                  let option2 = {
                    id: item.id,
                    number: item.number,
                    subtotalPrice: item.subtotalPrice,
                    period: item.period
                  };
                  arr.push(option2);
                }
              });
              this.saleproduct.map(item=>{
                let salepro= {
                  id:item.id,
                  type:1
                }
                 arr.push(salepro);
              });
              
              if(this.single){
                let onsale= {
                   id:this.discountdetial.id,
                   type:1
                 } 

                arr.push(onsale);
              }
              let data = {
                contractId: this.contractId,
                contractChangeProductVOs: arr,
                adjustAmount: this.gobackmoney
              };
              let that = this;
              this.spinShow=true;
              contractchangeapplySave(data).then(resp => {
                that.spinShow=false;
                this.$router.push({
                  name: "myAgreement"
                });
              });
            },
            onCancel: () => {}
          });
        }
      }
    },
    getsame(data) {
      for (var i = 0; i < this.hasselist.length; i++) {
        if (this.hasselist[i].id == data.id) {
          this.hasselist[i] = data;
        }
      }
    },
    // 勾选
    hasselectproduce(data) {
      this.hasselist = data;
      this.getsum();
    },
    agreementdetial() {},
    // 获取合同基本信息
    getMsg() {
      var that = this;
      this.contractCode = this.$route.query.contractCode;
      this.spinShow=true;
      axios
        .get("/crm/contract-info/contract-info/" + this.contractCode)
        .then(function(response) {
          that.spinShow=false;

          if (response.data.status == "200") {
            response.data.response.createTime = timeStampChange.format(
              response.data.response.createTime
            );
            response.data.response.contractStatus = that.getStatus(
              response.data.response.contractStatus
            );

            that.contractId = response.data.response.id;
            that.agreement = response.data.response;
            that.contractDescription = response.data.response.description || "略";
          }
        })
        .catch(function(error) {
          // this.spinShow=false;
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
        this.producelist2 = JSON.parse(JSON.stringify(that.producelist));
        this.unit = this.getunit(that.producelist[0].unit);
        that.realAmount = resp.response.realAmount;
        
        that.accountAmout = Math.abs(resp.response.accountAmout);
        if (resp.response.accountAmout < 0) {
          this.add = true;
        } else {
          this.add = false;
        }
      });
    },
    //总价
    getsum() {
      // data.row.productPrice - data.row.afterDiscountPrice
      var sum = 0,
        sum1 = 0,
        onsale = 0,
        value = 0;
      for (var i = 0; i < this.hasselist.length; i++) {
       // sum1 += Number(this.hasselist[i].subtotalStandardPrice); //小计总数
        sum += Number(this.hasselist[i].subtotalPrice); //洽谈价格总数
        // value =
        //   (this.productList[i].productPrice -
        //     this.productList[i].afterDiscountPrice) *
        //   this.productList[i].number;
        // onsale += value;
      }
      onsale = sum - sum1;
      this.gobackmoney = sum.toFixed(2);
      this.reallysum = sum1;
      this.totalAmount = sum.toFixed(2);
      if (onsale.toFixed(2) > 0) {
        // this.discount = "(已加价" + onsale.toFixed(2) + this.unit + ")";
      } else {
        // this.discount = "(已优惠" +Math.abs(onsale.toFixed(2)) + this.unit + ")";
      }

      // this.discount = onsale.toFixed(2);
    },

    // 获取审批信息列表
    gettablemsg() {},
    // 状态
    getStatus(a) {
      switch (a) {
        case "0":
          a = "待审核";
          break;
        case "1":
          a = "已生效";
          break;
        case "2":
          a = "已驳回";
          break;
        case "3":
          a = "已作废";
          break;
        case "4":
          a = "待归档";
          break;
        case "5":
          a = "已归档";
          break;
        case "6":
          a = "待认账";
          break;
        case "99":
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
        name: "myAgreement"
      });
    }
  },
  created() {
    this.getMsg();
    this.getProduct();
    this.getsaleproduct();
  }
};
</script>
