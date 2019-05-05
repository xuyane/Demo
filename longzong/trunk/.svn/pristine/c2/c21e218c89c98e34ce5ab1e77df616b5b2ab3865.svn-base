<style lang="less" >
@import "./myagreement.less";
.navbox {
  margin-bottom: 20px;
}
.companyipt {
  width: 60%;
  margin: auto;
}
.memberA {
  overflow: inherit !important;
}
.agreementexplain {
  height: 64px;
}
// .agreementexplain .ivu-input {
//   // height: 64px;
//   // max-height: 64px;
// }

.tablewrap .ivu-input {
  border: 1px solid #605f5f;
}
</style>
<template >
  <Row>
    <Col span="24" class="grid-table">
      <Card>
        <Row class="tablebox">
          <div class="table-title">基本信息</div>
          <table width="100%" border="0" cellspacing="0" class="tablewrap">
            <Row>
              <Col span="12" class="row" >
                <th class="th">甲方：</th>
                <td  class="td blueword1 memberA">
                  <span>{{formCustom.partA}}</span>
                </td>
            
                
              </Col>
              <Col span="12" class="row">
                <th class="th">乙方：</th>
                <td class="td blueword1">{{formCustom.partB}}</td>
                
              </Col>
              <Col span="12" class="row" >
                <th class="th ">用户名：</th>
                <td  class="td blueword1">{{userA.name}}</td>
              </Col>
              <Col span="12" class="row">
                <th class="th">法定代表人或授权人</th>
                <td class="td">{{gridColumns.Representative_b}}</td>
              </Col>
              <Col span="12" class="row" >
                <th class="th">法定代表人或授权人</th>
                <td class="td"><span>{{gridColumns.Representative_a}}</span></td>
              </Col>
              <Col span="12" class="row">
                <th class="th">联系电话</th>
                <td class="td">{{gridColumns.tel_b}}</td>
              </Col>
              <Col span="12" class="row" >
                <th class="th">联系电话</th>
                <td class="td"><span>{{gridColumns.tel_a}}</span></td>
              </Col>
              <Col span="12" class="row" >
                <th class="th"></th>
                <td class="td"></td>
              </Col>
            </Row>
          </table>
        </Row>
        <Row>
          <div class="table-title" ><span  > 选购产品</span> </div>
          <Row>
            <Col span="10">
              <div class="btn-container">
                <Button type="primary" class="search-btn" @click="showslelectmodal">选购产品</Button>
                <Button type="primary" class="search-btn" @click="copyProduct">复制试用权限到产品</Button>
                <Button type="primary" class="search-btn" @click="deleteallselect">批量删除</Button>
              </div>
            </Col>
            <Col span='14' style="text-align:right">
              <div class="recommendproducts"><span>推荐产品：</span> <a v-for="(item,index) in recommendproducts" :key='index'>{{item.name}}</a> </div>
            </Col>
          </Row>
          <Table class="tableCommon" ref="selection" :columns="columns1" :data="productList" @on-selection-change='selectedproduce' @on-select-cancel='cancelone' @on-select-all-cancel='cancelall'></Table>
          <Row >
            <Col span='16'> 
              <div class="agreementexplain"><Input v-model="description" placeholder="合同说明：" class="textarea" type="textarea" style="height:52px" ></Input></div>
            </Col>
            <Col span='8'>
              <div class="discount" > 总价<span class="redword">{{totalAmount}}</span><input v-model="changemoneyvalue" disabled style="display:inline-block;width:100px;" class="ivu-input ivu-input-default" />{{unit}} </div>
            </Col>
          </Row>
        </Row>
        <Row>
          <div class="table-title" >开通方式</div>
          <div class="openexplain">说明：默认“认账后开通”，如果您的用户不能及时打款，可以选择 "立即开通" 便于及时使用产品！</div>
          <RadioGroup v-model="effectiveType" >
            <Radio label="-1" disabled>认账后开通</Radio>
            <Radio label="2" disabled>立即开通</Radio>
            <Radio label="3" disabled>预付合同</Radio>
            <Radio label="4" >补充合同</Radio>
          </RadioGroup>
          <DatePicker
            v-model="time"
            v-show="effectiveType == 3"
            :options="disabledOptions"
            type="datetime"
            placeholder="请选择指定时间"
            style="width: 200px"
            class="mar-l-20">
          </DatePicker>
        </Row>
        <Row>
          <div class="table-title isinvoice" >需要发票</div>
          <RadioGroup v-model="isNeedInvoice" >
            <Radio label="1" disabled>是</Radio>
            <Radio label="0" >否</Radio>
          </RadioGroup>
        </Row>
        <Row class="btnwrap">
          <Button type="primary" class="search-btn" style="margin-left: 8px" @click="keepsend">提交</Button>
          <Button  style="margin-left: 8px" class="search-btn"  @click="goback">取消</Button>
        </Row>
      </Card>
    </Col>
    <select-produce-modal :showselectProduceModal='showselectProduceModal' @hide-select-modal='hideselectProduceModal' @child-list='child' ></select-produce-modal>
    <meal-produce-modal :showmealProduceModal='showmealProduceModal' :produceId='produceId' @hide-meal-modal='hidemealProduceModal' @child-meal-list='mealchild' ></meal-produce-modal>

    <Modal v-model="telmodal" width="600" title="关联号码"  @on-cancel="telcancel">
        <Table class="tableCommon" border ref="selection" :columns="columns4" :data="tellist" @on-selection-change='telselected' height="400"></Table>
        <div slot="footer">
          <i-button @click="telcancel" class="search-btn">取消</i-button>
          <i-button type="primary" @click="telconfirm" class="search-btn"> 确定</i-button>
        </div>
    </Modal>
  </Row>
</template>
<script>
import axios from "axios";
import associateSearch from "../../components/associateSearch/getAssociateSearch.vue";
import { formData, formatStamp } from "../../../assets/js/common.js";
import {
  getContractAudiQueryPartbInfo,
  relationPhone,
  queryUserList,
  saveAgreement,
  contractInfoCommit,
  userSelectList,
  queryPartaInfo,
  getProductInfo,
  copyProductList,
  contractSaleStrategy //优惠策略
} from "../../components/axios/crm.js";
import { formatTime, formatTime2 } from "../../../assets/js/common.js";
import SelectProduceModal from "./selectProduct.vue";
import MealProduceModal from "./mealProduct.vue";
export default {
  name: "supplementaryContract",
  components: {
    SelectProduceModal,
    MealProduceModal
  },
  data() {
    return {
      changemoneyvalue: 0,
      time: "",
      ubListname: "",
      produceId: "",
      showmealProduceModal: false,
      haskeepcode: "",
      isshow: "",
      disabledOptions: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now();
        }
      },
      changelist: [],
      fileroad: "",
      productForm: {
        tips: "",
        attachList: []
      },
      form: {
        file: ""
      },
      value8: "",
      userA: {},
      contractStatus: "",
      discountdetial: {
        ob: {
          strategyName: "",
          gift1: ""
        }
      },
      onSale: {},
      filepath: "/crm/contract-info/upload_attach", //文件上传地址
      model13: "",
      loading1: false,
      options1: [],
      name: "memberName",
      url: "/crm/common/query-member-select-list", //根据会员名称模糊匹配下拉选择列表
      ischange: "0",
      confirmmodal: false,
      unit: "",
      color: "#666",
      totalAmount: 0,
      totalAmount2: 0,
      telmodal: false,
      productIds: "",
      isNeedInvoice: "0",
      effectiveType: "4",
      discount: "",
      description: "",
      showselectProduceModal: false,
      showselectDiscountModal: false,
      selectproduct: true,
      formCustom: {},
      gridColumns: {
        data_a: "",
        data_b: "",
        username: "",
        Representative_b: "",
        Representative_a: "",
        tel_b: "",
        tel_a: ""
      },
      tel: [],
      findsource: "",
      recommendproducts: [
        {
          name: "能源网",
          url: ""
        },
        {
          name: "塑料网",
          url: ""
        },
        {
          name: "化工网",
          url: ""
        },
        {
          name: "橡胶网",
          url: ""
        },
        {
          name: "化纤",
          url: ""
        },
        {
          name: "2018年能源青岛会议",
          url: ""
        }
      ],
      columns1: [
        {
          type: "selection",
          minWidth: 60,
          align: "center"
        },
        {
          title: "序号",
          type: "index",
          minWidth: 100
        },
        {
          title: "产品名称",
          key: "productNameCn",
          minWidth: 150,
          render: (h, data) => {
            let ubList = this.ubListname;
            if (data.row.detailSize) {
              return h("div", [
                h("span", data.row.productNameCn),
                h(
                  "a",
                  {
                    style: {
                      marginLeft: "5px"
                    },
                    on: {
                      click: () => {
                        this.showmealProduceModal = true;
                        this.findsource = data.index;
                        this.produceId =
                          this.productList[data.index].id +
                          "-" +
                          this.productList[data.index].proVerId;
                      }
                    }
                  },
                  this.productList[data.index].sourcelength +
                    "/" +
                    data.row.detailSize
                )
              ]);
            } else {
              return h("span", data.row.productNameCn);
            }
          }
        },
        {
          title: "产品分类",
          key: "productCategoryCodeName",
          minWidth: 150
        },
        {
          title: "单价",
          key: "afterDiscountPrice",
          minWidth: 180,
          render: (h, data) => {
            if (data.row.afterDiscountPrice < data.row.productPrice) {
              var value = data.row.productPrice - data.row.afterDiscountPrice;
              return h("div", [
                h(
                  "div",
                  data.row.afterDiscountPrice +
                    this.getunit(data.row.unit) +
                    "/" +
                    this.gettimeunit(data.row.buyPeriod)
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
            } else {
              return h(
                "span",
                data.row.afterDiscountPrice +
                  this.getunit(data.row.unit) +
                  "/" +
                  this.gettimeunit(data.row.buyPeriod)
              );
            }
          }
        },
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
              return h("div", [
                h(
                  "span",
                  {
                    style: {
                      marginRight: "8px",
                      cursor: "pointer"
                    },
                    on: {
                      click: () => {
                        this.changeServicetime(data);
                      }
                    }
                  },
                  "服务期限"
                ),
                h("InputNumber", {
                  props: {
                    max: 100,
                    min: 1,
                    value: data.row.number,
                    precision: 0,
                    activeChange: false
                  },
                  on: {
                    "on-blur": () => {
                      this.getlost(data);
                    },
                    "on-change": num => {
                      var reg = /^([0-9]{1,})$/;
                      if (!reg.test(num)) {
                        this.$Message.warning("请不要输入小数");
                        return;
                      }
                      data.row.number = num;
                      data.row.subtotalStandardPrice =
                        data.row.afterDiscountPrice * 100 * num / 100;
                      data.row.subtotalPrice =
                        data.row.afterDiscountPrice * 100 * num / 100;
                      this.productList[data.index] = data.row;
                      this.ubList = num;
                      this.getsum();
                    }
                  }
                }),
                h("span", this.gettimeunit(data.row.buyPeriod))
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
                      marginRight: "8px",
                      cursor: "pointer"
                    },
                    on: {
                      click: () => {
                        this.changeServicetime(data);
                      }
                    }
                  },
                  a
                ),
                h("InputNumber", {
                  props: {
                    max: 100,
                    min: 1,
                    value: data.row.number,
                    precision: 0,
                    activeChange: false
                  },
                  on: {
                    "on-blur": () => {
                      this.getlost(data);
                    },
                    "on-change": num => {
                      var reg = /^([0-9]{1,})$/;
                      if (!reg.test(num)) {
                        this.$Message.warning("请不要输入小数");
                        return;
                      }
                      data.row.number = num;
                      data.row.subtotalStandardPrice =
                        data.row.afterDiscountPrice * 100 * num / 100;
                      data.row.subtotalPrice =
                        data.row.afterDiscountPrice * 100 * num / 100;
                      this.productList[data.index] = data.row;
                      this.ubList = num;
                      this.getsum();
                    }
                  }
                }),
                h("span", this.gettimeunit(data.row.buyPeriod))
              ]);
            } else if (data.row.productCategoryCode.slice(0, 3) == "002") {
              var telspan = "";
              let ubList = this.ubList;
              data.row = this.productList[data.index];
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
                data.row.number = data.row.number || 1;
                if (data.row.subtotalPrice == data.row.subtotalStandardPrice) {
                  data.row.subtotalPrice =
                    data.row.afterDiscountPrice *
                    100 *
                    data.row.number *
                    data.row.ubList.length /
                    100;
                } else {
                  data.row.subtotalPrice = this.productList[
                    data.index
                  ].subtotalPrice;
                }
                data.row.subtotalStandardPrice =
                  data.row.afterDiscountPrice *
                  100 *
                  data.row.number *
                  data.row.ubList.length /
                  100;
                this.productList[data.index] = data.row;
                this.getsum();
              }

              return h("div", [
                h("div", {
                  domProps: {
                    innerHTML: telspan
                  },
                  props: {
                    value: 1
                  }
                }),
                h(
                  "a",
                  {
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        window.localStorage.setItem(
                          "lzMemberId",
                          this.formCustom.memberId
                        );
                        let routeData = this.$router.resolve({
                          name: "userInfo"
                        });
                        window.open(routeData.href, "_blank");
                      }
                    }
                  },
                  "新增号码"
                ),
                h(
                  "a",
                  {
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.showtel(data);
                      }
                    }
                  },
                  "关联号码"
                ),
                h(
                  "div",
                  {
                    style: {
                      display: data.row.ubList.length > 0 ? "block" : "none"
                    }
                  },
                  [
                    h(
                      "span",
                      {
                        style: {
                          marginRight: "8px",
                          cursor: "pointer"
                        },
                        on: {
                          click: () => {
                            this.changeServicetime(data);
                          }
                        }
                      },
                      "服务期限"
                    ),
                    h("InputNumber", {
                      props: {
                        max: 100,
                        min: 1,
                        value: data.row.number,
                        precision: 0,
                        activeChange: false
                      },
                      on: {
                        "on-blur": () => {
                          this.getlost(data);
                        },
                        "on-change": num => {
                          var reg = /^([0-9]{1,})$/;
                          if (!reg.test(num)) {
                            this.$Message.warning("请不要输入小数");
                            return;
                          }
                          this.ubList = num;
                          data.row.number = num;
                          data.row.subtotalStandardPrice = (
                            data.row.afterDiscountPrice.toFixed(2) *
                            100 *
                            data.row.ubList.length *
                            num /
                            100
                          ).toFixed(2);
                          data.row.subtotalPrice = (
                            data.row.afterDiscountPrice.toFixed(2) *
                            100 *
                            data.row.ubList.length *
                            num /
                            100
                          ).toFixed(2);
                          this.productList[data.index] = data.row;
                          this.getsum();
                        }
                      }
                    }),
                    h("span", this.gettimeunit(data.row.buyPeriod))
                  ]
                )
              ]);
            }
          }
        },
        {
          title: "小计",
          key: "subtotalStandardPrice",
          minWidth: 120,
          render: (h, data) => {
            if (data.row.productCategoryCode.slice(0, 3) == "002") {
              let ubList = this.ubList;
              return h(
                "span",
                this.productList[data.index].subtotalStandardPrice.toFixed(2) +
                  this.getunit(data.row.unit)
              );
            } else {
              return h(
                "span",
                data.row.subtotalStandardPrice.toFixed(2) +
                  this.getunit(data.row.unit)
              );
            }
          }
        },
        {
          title: "洽谈价格",
          key: "subtotalPrice",
          minWidth: 150,
          render: (h, data) => {
            let ubList = this.ubList;
            var dom;
            return h(
              "div",
              {
                style: {
                  textAlign: "left"
                }
              },
              [
                h("Input", {
                  props: {
                    // value: this.productList[data.index].subtotalPrice
                    value: Number(
                      this.productList[data.index].subtotalPrice
                    ).toFixed(2)
                  },
                  style: {
                    marginRight: "5px",
                    display: "inline-block",
                    width: "65%",
                    color: "#666"
                  },
                  on: {
                    "on-blur": ele => {
                      ele.target.value = this.productList[
                        data.index
                      ].subtotalPrice;
                    },
                    "on-change": ele => {
                      // dom=ele.target
                      ele.target.style.color = "red";
                      var value = ele.target.value;
                      var reg = /^\d+(\.\d{0,2})?$/;
                      var resu = reg.test(value);
                      if (resu) {
                        data.row.subtotalPrice = Number(value);
                        this.productList[data.index] = data.row;
                        this.getsum();
                        //ele.focus();
                      } else {
                        // this.productList[data.index].subtotalPrice=data.row.subtotalPrice
                        this.$Message.error("请输入带2位小数的数字");
                        // ele.target.value=this.productList[data.index].subtotalPrice;
                      }
                      // this.focus();
                      // this.productList[data.index].subtotalPrice = num;
                      // this.getsum();
                      // dom.style.color = "red";
                    }
                  }
                }),
                h("span", this.getunit(data.row.unit))
              ]
            );
          }
        },
        {
          title: "价格说明",
          key: "description",
          minWidth: 250,
          render: (h, data) => {
            return h("Input", {
              props: {
                value: data.row.description
              },
              on: {
                "on-change": event => {
                  var value = event.target.value;
                  data.row.description = value;
                  this.productList[data.index] = data.row;
                }
              }
            });
          }
        },
        {
          title: "操作",
          key: "action",
          minWidth: 100,
          render: (h, data) => {
            return h(
              "a",
              {
                style: {
                  color: "red"
                },
                on: {
                  click: () => {
                    this.delatehadselect(data);
                  }
                }
              },
              "删除"
            );
          }
        }
      ],
      columns4: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "姓名",
          key: "realName",
          minWidth: 100
        },
        {
          title: "用户名",
          key: "username",
          minWidth: 100
        },
        {
          title: "用户类型",
          key: "type",
          minWidth: 100,
          render: (h, data) => {
            return h("span", this.getusertype(data.row.type));
          }
        },
        {
          title: "手机号",
          key: "mobile",
          minWidth: 120
        }
      ],
      productList: [
        // {
        //   productCategoryCodeName :"会议",
        //   afterDiscountPrice:100,
        //   subtotalStandardPrice: 0,
        //   number:1
        // }
      ],
      hadselected: [],
      tellist: [
        {
          name: 1
        }
      ],
      selectedtel: [],
      memberId: "",
      actionproduce: {},
      indextr: "",
      userIds: [],
      count: 0,
      reallysum: 0,
      discountresult: {},
      ubList: [],
      firstPartName: "",
      isclick: true
    };
  },
  methods: {
    copyProduct() {
      if (this.productList.length) {
        this.$Modal.confirm({
          title: "提示",
          content: "<p>复制成功后，当前已选产品需要重新选择，是否继续？</p>",
          onOk: () => {
            this.copylist();
          },
          onCancel: () => {}
        });
      } else {
        this.copylist();
      }
    },
    copylist() {
      let msg = {
        memberId: this.formCustom.memberId
      };
      let that = this;
      copyProductList(formData(msg)).then(res => {
        if (res.response) {
          let list = res.response;
          list.map(item => {
            if (item.productCategoryCode.slice(0, 3) == "002") {
              item.ubList = item.messageProductUserList || [];
              item.number = item.number || 1;
              // if (item.subtotalPrice == item.subtotalStandardPrice) {
              item.subtotalPrice =
                item.afterDiscountPrice *
                100 *
                item.number *
                item.ubList.length /
                100;
              // } else {
              //   item.subtotalPrice = this.productList[
              //     that.indextr
              //   ].subtotalPrice;
              // }
              item.subtotalStandardPrice =
                item.afterDiscountPrice *
                100 *
                item.number *
                item.ubList.length /
                100;
            }
          });
          that.productList = [];
          that.child(list);
        }
      });
    },
    //选购产品
    showslelectmodal() {
      if (this.formCustom.memberId) {
        this.showselectProduceModal = true;
      } else {
        this.$Message.error("请先选择甲方公司");
      }
    },
    //批量删除
    deleteallselect() {
      if (this.hadselected.length == 0) {
        this.$Message.info("请先勾选产品");
      } else {
      var ids = this.hadselected;
      for (var i = 0; i < ids.length; i++) {
        const index = this.productList.findIndex(item => item.id === ids[i].id);
        if(index > -1){
          this.productList.splice(index, 1);
        }
      }
      this.getsum();
      this.hadselected = [];
      }
    },
    cancelall(data,row){
      this.hadselected=this.test(this.hadselected,this.productList);
    },
    test(arr1, arr2) {
      var arr3 = [];
      for (var i = 0; i < arr1.length; i++) {
        var flag = true;
        for (var j = 0; j < arr2.length; j++) {
          if (arr1[i].id == arr2[j].id) flag = false;
        }
        if (flag) {
          arr3.push(arr1[i]);
        }
      }
      return arr3;
    },
    cancelone(data,row){
      var a;
      this.hadselected.map((item,index)=>{
        if(item.id==row.id){
          a=index
        }
      })
      this.hadselected.splice(a,1);
    },
    // 勾选产品
    selectedproduce(data) {
      if(this.hadselected==[]){
        this.hadselected=data
      }else{
        this.hadselected=this.mergeArray(this.hadselected,data)
      }
    },
    //数组合并去重
    mergeArray(arr1, arr2) {
      var _arr = new Array();
      for (var i = 0; i < arr1.length; i++) {
        _arr.push(arr1[i]);
      }
      for (var i = 0; i < arr2.length; i++) {
        var flag = true;
        for (var j = 0; j < arr1.length; j++) {
          if (arr2[i].id == arr1[j].id) {
            flag = false;
            break;
          }
        }
        if (flag) {
          _arr.push(arr2[i]);
        }
      }
      return _arr;
    },
    //批量更改服务期限
    changeServicetime(data) {
      // console.log()
      let ar = data.row.number;
      let text = "服务期限";
      this.$Modal.confirm({
        title: "批量更新" + text,
        render: h => {
          return h("div", [
            h(
              "p",
              "将批量更新产品类型为" +
                data.row.productCategoryCodeName +
                "的产品的" +
                text +
                "。"
            ),
            h("div", [
              h("span", text + "："),
              h("InputNumber", {
                props: {
                  value: data.row.number,
                  min: 1,
                  max: 100,
                  autofocus: true,
                  placeholder: "",
                  precision: 0,
                  activeChange: false
                },
                on: {
                  "on-change": val => {
                    ar = val;
                  }
                }
              })
            ])
          ]);
        },
        onOk: () => {
          this.productList.map(item => {
            if (
              item.productCategoryCode == data.row.productCategoryCode &&
              item.buyPeriod == data.row.buyPeriod
            ) {
              item.number = ar;
            }
          });
          this.child(this.productList, 1); //1 :来源于批量修改年限
        }
      });
    },
    //清空公司名称时显示模糊搜索
    gsblur() {
      if (this.firstPartName == "") {
        this.isclick = false;
      }
    },
    // 获取合同基本信息
    getMsg() {
      var that = this;
      this.contractCode = this.$route.query.contractCode;
      this.$Spin.show();
      axios
        .get(
          "/crm/contract-info/contract-info/" +
            this.contractCode +
            "?time=" +
            new Date().getTime()
        )
        .then(function(response) {
          that.formCustom.partA = response.data.response.partA;
          that.formCustom.partB = response.data.response.partB;
          // that.$refs.firstPart.getData(response.data.response.partA);
          that.formCustom.memberId = response.data.response.memberId;
          that.firstPartName = response.data.response.partA;

          that.userA.id = response.data.response.userId;
          that.userA.name = response.data.response.userName;
          that.gridColumns.Representative_a = response.data.response.delegateA;
          that.gridColumns.tel_a = response.data.response.phoneA;
          that.gridColumns.Representative_b = response.data.response.delegateB;
          that.gridColumns.tel_b = response.data.response.phoneB;
        })
        .catch(function(error) {
          that.$Spin.hide();
        });
    },
    // 获取选购产品信息
    getProduct() {
      let data = {
        contractCode: this.$route.query.contractCode
      };
      let that = this;
      getProductInfo(data).then(resp => {
        // that.unit = "(已优惠：";
        that.discount = resp.response.accountAmout;
        that.totalAmount = resp.response.realAmount;

        let arrProductlist = resp.response.list;
        arrProductlist.map(item => {
          // "productNameCn":item.productNameCn,
          // "productCategoryCodeName":item.productCategoryCodeName,
          // "afterDiscountPrice":item.price,
          item.id = item.productId;
          item.proVer = item.productVersion;
          item.proVerId = item.productVersionId;
          item.productPrice = item.price;
          item.buyPeriod = item.period;
          item.afterDiscountPrice = item.standardPrice;
          item.subtotalPrice = Number(item.subtotalPrice);
          item.subtotalStandardPrice = Number(item.subtotalStandardPrice);
        });
        that.child(arrProductlist);
        // this.productList = arrProductlist;
      });
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
    goback() {
      this.$router.go(-1);
    },
    // 关联号码
    showtel(data) {
      this.actionproduce = data.row;
      this.indextr = data.index;
      let that = this;
      this.ubList = [];
      var data = {
        memberId: this.formCustom.memberId
      };
      that.$Spin.show();
      queryUserList(data).then(resp => {
        that.$Spin.hide();
        that.tellist = resp.response;
        that.telmodal = true;
      });
    },
    // 关联号码确定
    telconfirm() {
      if (this.selectedtel.length == 0) {
        this.$Message.info("请勾选号码");
      } else {
        this.userIds = this.selectedtel.map(item => {
          return item.id;
        });
        var msg = {
          productId: this.actionproduce.id,
          productVersion: this.actionproduce.proVer,
          productVersionId: this.actionproduce.proVerId,
          userIds: this.userIds.join(",")
        };
        var that = this;
        // relationPhone(msg).then(resp => {
        // that.$Message.info(resp.message);
        that.telmodal = false;
        // that.actionproduce.tel = that.selectedtel;
        that.productList[that.indextr].ubList = that.selectedtel;
        this.ubList = that.selectedtel;
        this.$forceUpdate();
        // });
      }
    },
    //关联号码列表选择
    telselected(data) {
      this.selectedtel = data;
    },
    // 关联号码取消
    telcancel() {
      this.telmodal = false;
    },
    cancel() {},
    confirm() {},
    hideselectProduceModal() {
      this.showselectProduceModal = false;
    },
    hidemealProduceModal() {
      this.showmealProduceModal = false;
    },
    hideselectDiscountModal() {
      this.showselectDiscountModal = false;
    },
    mealchild(sourceList) {
      if (sourceList.length == this.productList[this.findsource].detailSize) {
        this.$Message.error("该套餐产品不能取消所有子套餐。");
        return;
      } else {
        this.showmealProduceModal = false;
        this.productList[this.findsource].sourceList = sourceList.map(item => {
          return item.id;
        });
        let a =
          Number(this.productList[this.findsource].detailSize) -
          Number(sourceList.length);
        this.productList[this.findsource].sourcelength = a;
        this.ubListname = sourceList.length;
      }
    },
    child(childList, timechangesource) {
      var pro = this.productList;
      var allpro = this.mergeArray(pro, childList);
      var unit = "";
      if(unit != null && unit !=""){
         unit = allpro[0].unit;
      }
      var result = allpro.every(function(item) {
        if (item.unit != unit) {
          return false;
        }
        return true;
      });
      if (result) {
        this.showselectProduceModal = false;
        this.productList = allpro.map(item => {
          item.description = item.description || "";
          if (item.productCategoryCode.slice(0, 3) == "002") {
            item.ubList = item.ubList || [];
            item.number = item.number || 0;
            item.subtotalPrice = timechangesource
              ? item.afterDiscountPrice *
                100 *
                item.number *
                item.ubList.length /
                100
              : item.subtotalPrice ||
                item.afterDiscountPrice *
                  100 *
                  item.number *
                  item.ubList.length /
                  100;

            item.subtotalStandardPrice =
              item.afterDiscountPrice *
              100 *
              item.number *
              item.ubList.length /
              100;
          } else {
            item.number = item.number || 1;
            item.subtotalStandardPrice = item.afterDiscountPrice * item.number;
            item.subtotalPrice = timechangesource
              ? item.subtotalStandardPrice
              : item.subtotalPrice || item.afterDiscountPrice * item.number;
          }
          if (item.detailSize) {
            item.sourcelength = item.sourcelength || item.detailSize;
          }
          return item;
        });
        this.getsum();
        if(unit != null && unit != ""){
          this.unit = this.getunit(unit);
        }
      } else {
        this.$Message.error("请勾选币种相同的产品");
      }
    },
    // 会议数字框失去焦点
    getlost(data) {},

    //选购产品
    showslelectmodal() {
      if (this.formCustom.memberId) {
        this.showselectProduceModal = true;
      } else {
        this.$Message.error("请先选择甲方公司");
      }
    },
    //删除操作
    delatehadselect(data) {
      this.productList.splice(data.index, 1);
      this.getsum();
    },
    // 总价
    getsum() {
      var sum = 0,
        sum1 = 0,
        onsale = 0,
        value = 0;
      for (var i = 0; i < this.productList.length; i++) {
        sum1 += Number(this.productList[i].subtotalStandardPrice); //小计总数
        sum += Number(this.productList[i].subtotalPrice); //洽谈价格总数
      }
      onsale = sum - sum1;
      this.count = onsale.toFixed(2);
      this.reallysum = sum1;
      this.totalAmount = sum.toFixed(2);
      this.changemoneyvalue = 0;
      this.totalAmount2 = sum.toFixed(2);
    },
    // 提交
    keepsend() {
      if (this.isLack()) {
        this.savrorsendcontact();
      }
    },
    //是否缺少对象
    isLack() {
      var regexp = /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/;
      if (!this.formCustom.memberId) {
        this.$Message.warning("请选择甲方公司");
        return false;
      } else if (!this.userA.id) {
        this.$Message.warning("请选择甲方用户名");
        return false;
      } else if (!this.gridColumns.Representative_a) {
        this.$Message.warning("请选择甲方法定代表人或授权人");
        return false;
      } else if (!this.gridColumns.tel_a) {
        this.$Message.warning("请输入甲方联系电话");
        return false;
      } else if (!regexp.test(this.gridColumns.tel_a)) {
        this.$Message.warning("甲方联系电话格式不正确");
        return false;
      } else if (this.productList.length == 0) {
        this.$Message.warning("请勾选产品");
        return false;
      } else {
        if (this.productList.length > 0) {
          for (var i = 0; i < this.productList.length; i++) {
            if (this.productList[i].number == 0) {
              this.$Message.warning("短信产品请关联至少一个号码");
              return false;
            }
          }
        }
        return true;
      }
    },
    //产品参数转化
    chageproduceword() {
      var list = JSON.parse(JSON.stringify(this.productList));
      for (var i = 0; i < list.length; i++) {
        list[i].productId = list[i].id;
        list[i].productVersion = list[i].proVer;
        list[i].productVersionId = list[i].proVerId;
        list[i].price = list[i].productPrice;
        list[i].period = list[i].buyPeriod;
        list[i].standardPrice = list[i].afterDiscountPrice;
      }
      this.changelist = list;
    },
    // 保存或者上传
    savrorsendcontact() {
      let effectiveType = this.effectiveType;
      this.chageproduceword();
      let data = {
        description: this.description, //合同说明
        contractStatus: 1, //保存0提交1
        delegateA: this.gridColumns.Representative_a, //甲方法人
        effectiveType: effectiveType,
        isModify: this.ischange, //是否变更条款
        isNeedInvoice: this.isNeedInvoice,
        memberId: this.formCustom.memberId, //甲方公司
        originalAmount: this.reallysum, //小计总价
        partA: this.formCustom.partA, //甲方公司名称
        phoneA: this.gridColumns.tel_a,
        productList: this.changelist,
        totalAmountPrice: this.totalAmount, //洽谈总价（+优惠）
        totalAmount: this.changemoneyvalue,
        userId: this.userA.id, //用户名id
        userName: this.userA.name, //用户名
        saleStrategyId: 0,
        page: 0, //创建0审核1
        type: this.$route.query.contractCode,
        contractDescription: this.value8 // 合同变更条款说明
      };
      var that = this;
      this.$Spin.show();
      saveAgreement(data).then(resp => {
        that.$Spin.hide();
        that.$Message.success(resp.message);
        that.$router.go(-1);
      });
    },
    //合同确定
    sendcontact() {
      //   this.confirmmodal = true;
    },
    //变更确定
    changeconfirm() {
      this.confirmmodal = false;
      this.keepsend();
    },
    // 变更取消
    changecancel() {
      this.confirmmodal = false;
    },
    //数组合并去重
    mergeArray(arr1, arr2) {
      var _arr = new Array();
      for (var i = 0; i < arr1.length; i++) {
        _arr.push(arr1[i]);
      }
      for (var i = 0; i < arr2.length; i++) {
        var flag = true;
        for (var j = 0; j < arr1.length; j++) {
          if (arr2[i].id == arr1[j].id) {
            flag = false;
            break;
          }
        }
        if (flag) {
          _arr.push(arr2[i]);
        }
      }
      return _arr;
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
    getusertype(a) {
      switch (Number(a)) {
        case 0:
          a = "免费用户";
          break;
        case 1:
          a = "试用用户";
          break;
        case 2:
          a = "正式用户";
          break;
      }
      return a;
    }
  },
  created() {
    this.getMsg();
    // this.getProduct();
    // this.getsum();
  }
};
</script>
