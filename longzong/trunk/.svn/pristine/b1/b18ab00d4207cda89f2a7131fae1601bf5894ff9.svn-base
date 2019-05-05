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
                <td v-if='isshow' class="td blueword1 memberA">
                  <span>{{formCustom.partA}}</span>
                </td>
                <td class="td blueword1 memberA" v-else>
                  <associate-Search  @query-list="companyTypeFunction" :dataUrl="url" :parameterName='name' class='companyipt smallipt' ></associate-Search>
                </td>
                
              </Col>
              <Col span="12" class="row">
                <th class="th">乙方：</th>
                <td class="td blueword1">{{gridColumns.data_b}}</td>
                
              </Col>
              <Col span="12" class="row" >
                <th class="th ">用户名：</th>
                <td v-if='isshow' class="td blueword1">{{userA.name}}</td>
                <td class="td blueword1" v-else>
                  <Select class="companyipt "
                    v-model="model13"
                    filterable
                    size="small"
                    remote
                    ref='breedDataRef'
                    :remote-method="remoteMethod1"
                    @on-change='selectAusername'
                    :label-in-value='true'
                    :loading="loading1">
                    <Option v-for="(option, index) in options1" :value="option.value" :key="index">{{option.label}}</Option>
                  </Select>
                </td>
              </Col>
              <Col span="12" class="row">
                <th class="th">法定代表人或授权人</th>
                <td class="td">{{gridColumns.Representative_b}}</td>
              </Col>
              <Col span="12" class="row" >
                <th class="th">法定代表人或授权人</th>
                <td class="td"><Input v-model="gridColumns.Representative_a" class="iptbox" size="small" placeholder="请输入法定代表人或授权人" /></td>
              </Col>
              <Col span="12" class="row">
                <th class="th">联系电话</th>
                <td class="td">{{gridColumns.tel_b}}</td>
              </Col>
              <Col span="12" class="row" >
                <th class="th">联系电话</th>
                <td class="td"><Input v-model="gridColumns.tel_a" class="iptbox" size="small"  placeholder="请输入联系电话" /></td>
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
                <Button type="primary" class="search-btn" @click="copyFormalProduct">复制正式权限到产品</Button>
                <Button type="primary" class="search-btn" @click="deleteallselect">批量删除</Button>
              </div>
            </Col>
            <Col span='14' style="text-align:right">
              <div class="recommendproducts"><span>推荐产品：</span> <a v-for="(item,index) in recommendproducts" :key='index'>{{item.name}}</a> </div>
            </Col>
          </Row>
          <Table class="tableCommon" ref="selection" :columns="columns1" :data="productList" @on-selection-change='selectedproduce' @on-select-cancel='cancelone' @on-select-all-cancel='cancelall'></Table>
          <Row >
            <Row class="discountwrap">
              <div class="salelist"><Button type="primary" @click="discountbtn">优惠活动</Button></div>
              <div v-if='discountdetial.ob.strategyName'>
                <Col span='2' class="bleft">优惠折扣</Col>
                <Col span='10' ><a @click="showDetail">{{discountdetial.ob.strategyName}}</a></Col>
                <Col span='10' class="wordcenter">{{discountdetial.ob.gift1}}</Col>
                <Col span='2' class="wordcenter"><a class="redword" @click="delatediscount">删除</a></Col>
              </div>
            </Row>
            <Col span='16'> 
              <div class="agreementexplain"><Input v-model="description" placeholder="合同说明：" class="textarea" type="textarea" style="height:52px" ></Input></div>
            </Col>
            <Col span='8'>
              <div class="discount" > 总价<span class="redword">{{totalAmount}}</span><input v-model="changemoneyvalue" style="display:inline-block;width:100px;" class="ivu-input ivu-input-default" />{{unit}} {{discount}} </div>
            </Col>


            <!-- (已优惠：{{discount}}{{unit}}) -->
          </Row>
        </Row>
        <Row>
          <div class="table-title" >开通方式</div>
          <div class="openexplain">说明：默认“认账后开通”，如果您的用户不能及时打款，可以选择 "立即开通" 便于及时使用产品！</div>
          <RadioGroup v-model="effectiveType">
            <Radio label="-1" >认账后开通</Radio>
            <Radio label="2" >立即开通</Radio>
            <Radio label="3" >预付合同</Radio>
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
          <RadioGroup v-model="isNeedInvoice">
            <Radio label="1" >是</Radio>
            <Radio label="0" >否</Radio>
          </RadioGroup>
        </Row>
        <Row class="btnwrap">
          <Button type="primary" class="search-btn" v-if='haskeepcode==""' @click="keepsave">保存草稿</Button>
          <Button type="primary" class="search-btn" style="margin-left: 8px" @click="sendcontact">提交</Button>
          <Button  style="margin-left: 8px" class="search-btn"  @click="goback">取消</Button>
        </Row>
      </Card>
    </Col>
    <select-discount-modal :showselectDiscountModal='showselectDiscountModal' :onSale='onSale'  @hide-discount-modal='hideselectDiscountModal' @discount-list='discountitem' ></select-discount-modal>

    <select-produce-modal :showselectProduceModal='showselectProduceModal' @hide-select-modal='hideselectProduceModal' @child-list='child' ></select-produce-modal>
    <meal-produce-modal :showmealProduceModal='showmealProduceModal' :produceId='produceId' @hide-meal-modal='hidemealProduceModal' @child-meal-list='mealchild' ></meal-produce-modal>

    <Modal v-model="telmodal" width="600" title="关联号码"  @on-cancel="telcancel">
        <Table class="tableCommon" border ref="selection" :columns="columns4" :data="tellist" @on-selection-change='telselected' height="400"></Table>
        <div slot="footer">
          <i-button @click="telcancel" class="search-btn">取消</i-button>
          <i-button type="primary" @click="telconfirm" class="search-btn"> 确定</i-button>
        </div>
    </Modal>
    <Modal
        v-model="confirmmodal"
        title="提示信息"
        @on-cancel="changecancel" width='400'>
        <Row>
          <Col span='8'>是否变更合同条款：</Col>
          <Col span='16'class='navbox'>
            <RadioGroup v-model="ischange">
              <Radio label="0" >否</Radio>
              <Radio label="1" >是</Radio>
            </RadioGroup>
          </Col>
          <Col v-if='ischange=="1"'>
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
          <i-button @click="changecancel" class="search-btn">取消</i-button>
          <i-button type="primary" @click="changeconfirm" class="search-btn"> 确定</i-button>
        </div>
    </Modal>
    <Spin size="large" fix v-if="spinShow"></Spin>
  </Row>
</template>
<script>
import axios from "axios";
import associateSearch from "../../components/associateSearch/getAssociateSearch.vue";
import {
  getContractAudiQueryPartbInfo,
  relationPhone,
  queryUserList,
  saveAgreement,
  contractInfoCommit,
  userSelectList,
  queryPartaInfo,
  copyProductList,
  copyFormalProductList,
  contractSaleStrategy //优惠策略
} from "../../components/axios/crm.js";
import SelectProduceModal from "./selectProduct.vue";
import MealProduceModal from "./mealProduct.vue";
import SelectDiscountModal from "./discountItem.vue";
import {
  formData,
  formatStamp,
  formatTime
} from "../../../assets/js/common.js";
export default {
  name: "creatAgreement",
  components: {
    SelectProduceModal,
    SelectDiscountModal,
    associateSearch,
    MealProduceModal
  },
  data() {
    return {
      changemoneyvalue: 0,
      spinShow: false,
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
      isNeedInvoice: "1",
      effectiveType: "-1",
      discount: "",
      description: "",
      showselectProduceModal: false,
      showselectDiscountModal: false,
      selectproduct: true,
      formCustom: {},
      gridColumns: {
        data_a: "山东隆众信息技术有限公司",
        data_b: "山东隆众信息技术有限公司yi",
        username: "北京三聚绿能（正式会员）",
        Representative_b: "张三",
        Representative_a: "",
        tel_b: "13111111111",
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
              if (this.productList[data.index].ubList.length > 0) {
                for (
                  var i = 0;
                  i < this.productList[data.index].ubList.length;
                  i++
                ) {
                  telspan +=
                    "<p >" +
                    this.productList[data.index].ubList[i].realName +
                    "(" +
                    this.productList[data.index].ubList[i].mobile +
                    ")" +
                    "</p>";
                }
                this.productList[data.index].number =
                  this.productList[data.index].number || 1;
                if (
                  this.productList[data.index].subtotalPrice ==
                  this.productList[data.index].subtotalStandardPrice
                ) {
                  this.productList[data.index].subtotalPrice =
                    this.productList[data.index].afterDiscountPrice *
                    100 *
                    this.productList[data.index].number *
                    this.productList[data.index].ubList.length /
                    100;
                  data.row.subtotalPrice = this.productList[
                    data.index
                  ].subtotalPrice;
                } else {
                  this.productList[data.index].subtotalPrice = this.productList[
                    data.index
                  ].subtotalPrice;
                  data.row.subtotalPrice = this.productList[
                    data.index
                  ].subtotalPrice;
                }
                this.productList[data.index].subtotalStandardPrice =
                  this.productList[data.index].afterDiscountPrice *
                  100 *
                  this.productList[data.index].number *
                  this.productList[data.index].ubList.length /
                  100;
                data.row = this.productList[data.index];
                // this.getsum();
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
                      display:
                        this.productList[data.index].ubList.length > 0
                          ? "block"
                          : "none"
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
                        value: this.productList[data.index].number,
                        precision: 0,
                        activeChange: false
                      },
                      on: {
                        "on-blur": () => {
                          this.getlost(data);
                        },
                        "on-change": num => {
                          this.productList[data.index] = data.row;
                          var reg = /^([0-9]{1,})$/;
                          if (!reg.test(num)) {
                            this.$Message.warning("请不要输入小数");
                            return;
                          }
                          this.ubList = num;
                          this.productList[data.index].number = num;
                          this.productList[data.index].subtotalStandardPrice = (
                            data.row.afterDiscountPrice.toFixed(2) *
                            100 *
                            this.productList[data.index].ubList.length *
                            num /
                            100
                          ).toFixed(2);
                          data.row.subtotalStandardPrice = this.productList[
                            data.index
                          ].subtotalStandardPrice;
                          this.productList[data.index].subtotalPrice = (
                            data.row.afterDiscountPrice.toFixed(2) *
                            100 *
                            this.productList[data.index].ubList.length *
                            num /
                            100
                          ).toFixed(2);
                          this.productList[data.index] = this.productList[
                            data.index
                          ];
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
                Number(
                  this.productList[data.index].subtotalStandardPrice
                ).toFixed(2) + this.getunit(data.row.unit)
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
            var a = Number(this.productList[data.index].subtotalPrice).toFixed(
              2
            );
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
                    // value: Number(
                    //   this.productList[data.index].subtotalPrice
                    // ).toFixed(2)
                    value: Number(this.productList[data.index].subtotalPrice).toFixed(2)
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
                      var value = ele.target.value;
                    },
                    "on-change": ele => {
                      // dom=ele.target
                      ele.target.style.color = "red";
                      var value = ele.target.value;
                      var reg = /^\d+(\.\d{0,2})?$/;
                      var resu = reg.test(value);
                      if (resu) {
                        var a = value;
                        data.row.subtotalPrice = a;
                        this.productList[data.index] = data.row;

                        this.getsum();
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
                value: this.productList[data.index].description
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
      time: ""
    };
  },
  methods: {
    //批量更改服务期限
    changeServicetime(data) {
      let list = JSON.parse(JSON.stringify(this.productList));
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
          list.map(item => {
            if (
              item.productCategoryCode == data.row.productCategoryCode &&
              item.buyPeriod == data.row.buyPeriod
            ) {
              item.number = ar;
            }
          });
          // this.$forceUpdate();
          // this.getsum()
          this.productList = list;
          this.child(this.productList, 1); //1 :来源于批量修改年限
        }
      });
    },
    // 优惠策略跳转
    // 查看详情
    showDetail() {
      let routeData = this.$router.resolve({
        name: "strategyDetail",
        query: {
          strategyId: this.discountdetial.ob.salesStrategyId
        }
      });
      window.open(routeData.href, "_blank");
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
    //用户名
    selectAusername(data) {
      this.userA.name = data.label;
      this.userA.id = data.value;
    },
    //删除优惠
    delatediscount() {
      this.discountdetial = {
        ob: {
          strategyName: "",
          gift1: ""
        }
      };
      this.getsum();
    },
    goback() {
      this.$router.go(-1);
    },
    //根据公司名称模糊匹配下拉选择列表
    companyTypeFunction(companyData) {
      // this.companyData = companyData;
      if (companyData) {
        this.formCustom.memberId = companyData.value;
        this.formCustom.partA = companyData.label;
        this.options1 = [];
        //  this.$refs.breedDataRef.model = "";
        this.model13 = "";
        this.productList = [];
        this.userA.name = "";
        this.userA.id = "";
        this.$refs.breedDataRef.query = "";
        this.discountdetial = {
          ob: {
            strategyName: "",
            gift1: ""
          }
        };
        this.getsum();
        //  this.$refs.breedDataRef.clearSingleSelect();
      }
    },
    remoteMethod1(query) {
      if (this.formCustom.memberId) {
        if (query !== "") {
          this.loading1 = true;
          setTimeout(() => {
            let data = {
              memberId: this.formCustom.memberId,
              userName: query
            };
            let that = this;
            userSelectList(data).then(resp => {
              this.loading1 = false;
              const list = resp.response.map(item => {
                return {
                  value: item.id,
                  label: item.name
                };
              });
              this.options1 = list.filter(
                item =>
                  item.label.toLowerCase().indexOf(query.toLowerCase()) > -1
              );
            });
          }, 200);
        } else {
          this.options1 = [];
        }
      } else {
        this.$Message.info("请先选择甲方公司名称");
      }
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
      this.spinShow = true;
      queryUserList(data).then(resp => {
        that.spinShow = false;
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

        that.telmodal = false;

        that.productList[that.indextr].ubList = that.selectedtel;
        that.productList[that.indextr].number =
          that.productList[that.indextr].number || 1;
        if (
          that.productList[that.indextr].subtotalPrice ==
          that.productList[that.indextr].subtotalStandardPrice
        ) {
          that.productList[that.indextr].subtotalPrice =
            that.productList[that.indextr].afterDiscountPrice *
            100 *
            that.productList[that.indextr].number *
            that.productList[that.indextr].ubList.length /
            100;
        } else {
          that.productList[that.indextr].subtotalPrice = this.productList[
            that.indextr
          ].subtotalPrice;
        }
        that.productList[that.indextr].subtotalStandardPrice =
          that.productList[that.indextr].afterDiscountPrice *
          100 *
          that.productList[that.indextr].number *
          that.productList[that.indextr].ubList.length /
          100;
        this.ubList = that.selectedtel;
        this.getsum();
        // });
      }
    },
    discountitem(item) {
      this.totalAmount = this.totalAmount2;
      let type = item.id.split("-")[2];
      let a = "";
      let gift = [];
      if (type == 3) {
        gift = item.ob.productVOs.map(option => {
          return option.productNameCn + "*1";
        });
      } else {
        gift = [];
      }
      switch (Number(type)) {
        case 1:
          a = "优惠折扣：" + item.ob.minRebate + "折";
          break;
        case 2:
          a = "打包价格：" + item.ob.packPriceAfter + this.unit;
          break;
        case 3:
          a = "赠送产品：" + gift.join(",");
          break;
        case 4:
          a = "赠送期限:" + item.ob.maxTime + this.gettimeunit(1);
          break;
        case 5:
          a = "赠送礼品:" + item.ob.gift;
          break;
      }
      this.discountdetial = item;
      this.discountdetial.ob.gift1 = a;
      if (type == 1) {
        let zhj = this.totalAmount * item.ob.minRebate;
        this.totalAmount = zhj.toFixed(2);
      } else if (type == 2) {
        // let allselect = 0;
        // for (var i = 0; i < this.productList.length; i++) {
        //   for (var j = 0; j < item.ob.productIds.length; j++)
        //     if (this.productList[i].id == Object.keys(item.ob.productIds[j])[0]) {
        //       allselect += Number(this.productList[i].subtotalPrice); //送的产品洽谈总价
        //     }
        // }
        this.totalAmount = this.discountdetial.ob.packPriceTotalAfter;
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
         unit = allpro[0].unit
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
        memberId: this.$route.query.memberId
        // memberId: 728535
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
    // 正式产品
    copyFormalProduct() {
      if (this.productList.length) {
        this.$Modal.confirm({
          title: "提示",
          content: "<p>复制成功后，当前已选产品需要重新选择，是否继续？</p>",
          onOk: () => {
            this.copyFormallist();
          },
          onCancel: () => {}
        });
      } else {
        this.copyFormallist();
      }
    },
    copyFormallist() {
      let msg = {
        memberId: this.$route.query.memberId
        // memberId: 728535
      };
      let that = this;
      copyFormalProductList(formData(msg)).then(res => {
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
    //删除操作
    delatehadselect(data) {
      this.productList.splice(data.index, 1);
      this.getsum();
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
    // 总价
    getsum() {
      // data.row.productPrice - data.row.afterDiscountPrice
      var sum = 0,
        sum1 = 0,
        onsale = 0,
        value = 0;
      for (var i = 0; i < this.productList.length; i++) {
        sum1 += Number(this.productList[i].subtotalStandardPrice); //小计总数
        sum += Number(this.productList[i].subtotalPrice); //洽谈价格总数
        // value =
        //   (this.productList[i].productPrice -
        //     this.productList[i].afterDiscountPrice) *
        //   this.productList[i].number;
        // onsale += value;
      }
      onsale = sum - sum1;
      this.count = onsale.toFixed(2);
      this.reallysum = sum1;
      this.totalAmount = sum.toFixed(2);
      this.changemoneyvalue = this.totalAmount;
      this.totalAmount2 = sum.toFixed(2);
      if (onsale.toFixed(2) > 0) {
        this.discount = "(已加价" + onsale.toFixed(2) + this.unit + ")";
      } else {
        this.discount =
          "(已优惠" + Math.abs(onsale.toFixed(2)) + this.unit + ")";
      }
      if (this.productList.length > 0) {
        this.getdiscount();
      } else {
        this.discountdetial = {
          ob: {
            strategyName: "",
            gift1: ""
          }
        };
      }

      // this.discount = onsale.toFixed(2);
    },
    // 优惠活动按钮
    discountbtn() {
      if (this.productList.length == 0) {
        this.$Message.info("请先选购产品");
      } else if (JSON.stringify(this.discountresult) == "{}") {
        this.$Message.info("没有匹配的优惠活动");
      } else {
        this.showselectDiscountModal = true;
        this.onSale = this.discountresult;
      }
    },
    getdiscount() {
      let list = this.productList.map(item => {
        // if (
        //   item.productCategoryCodeName == "资讯" ||
        //   item.productCategoryCodeName == "广告"
        // ) {
        return {
          amount: item.subtotalPrice,
          num: item.number,
          period: item.buyPeriod,
          productId: item.id,
          label: item.name,
          productVersion: item.proVer,
          productCategoryCode: item.productCategoryCode,
          productNum: item.ubList ? item.ubList.length : 1
        };
        // } else if (item.productCategoryCodeName == "地图") {
        //   return {
        //     amount: item.subtotalPrice,
        //     num: item.number,
        //     period: item.buyPeriod,
        //     productId: item.id,
        //     label: item.name,
        //     productVersion: item.proVer
        //   };
        // } else {
        //   return {
        //     amount: item.subtotalPrice,
        //     num: item.number,
        //     period: item.buyPeriod,
        //     productId: item.id,
        //     label: item.name,
        //     productVersion: item.proVer
        //   };
        // }
      });
      var that = this;
      that.discountresult = {};
      this.discountdetial = {
        ob: {
          strategyName: "",
          gift1: ""
        }
      };
      contractSaleStrategy(list).then(resp => {
        if (
          resp.response.expandTimeVOs == null &&
          resp.response.giftProductVOs == null &&
          resp.response.giftVOs == null &&
          resp.response.packPriceVOs == null &&
          resp.response.rebateVOs == null
        ) {
          // this.$Message.info("没有匹配的优惠活动");
        } else if (
          resp.response.expandTimeVOs.length == 0 &&
          resp.response.giftProductVOs.length == 0 &&
          resp.response.giftVOs.length == 0 &&
          resp.response.packPriceVOs.length == 0 &&
          resp.response.rebateVOs == null
        ) {
        } else {
          that.discountresult = resp.response;
        }
      });
    },
    // 保存合同
    keepsave() {
      if (this.isLack()) {
        // this.isproduceluck();
        this.contractStatus = "0";
        this.ischange = "0";
        this.savrorsendcontact("", 0);
      }
    },
    // 提交
    keepsend() {
      if (this.isLack()) {
        // this.isproduceluck();
        this.contractStatus = "1";
        let a = this.ischange == 1 ? 1 : "";
        this.savrorsendcontact(a, 1);
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
    savrorsendcontact(a, b) {
      if (a) {
        a = this.fileroad;
      } else {
        a = "";
      }
      var discountId = "";
      if (this.discountdetial.id) {
        discountId = this.discountdetial.id.split("-")[2];
      } else {
        discountId = "";
      }
      let effectiveType = this.effectiveType;
      let effectiveTime = 0;
      if (this.effectiveType == 3) {
        // effectiveType = 1;
        if (this.time == "") {
          this.$Message.warning("请指定预付合同生效时间！");
          return false;
        }
        effectiveTime = formatStamp(this.time);
      }
      this.chageproduceword();
      let data = {
        contractSaleStrategyVO: {
          description:
            this.discountdetial.ob.packPriceTotalAfter ||
            this.discountdetial.ob.maxTime ||
            this.discountdetial.ob.minRebate ||
            this.discountdetial.ob.gift ||
            "",
          packPriceTotalBefor:
            this.discountdetial.ob.packPriceTotalBefor || "0",
          packPriceAfter: this.discountdetial.ob.packPriceAfter || "",
          packPriceTotalAfter:
            this.discountdetial.ob.packPriceTotalAfter || "0",
          packPriceBefor: this.discountdetial.ob.packPriceBefor || "0",
          productIds: this.discountdetial.ob.giftProductIds || [],
          triggerProLists:
            discountId == 3 ? [] : this.discountdetial.ob.productIds || [],
          surplusProductIds: this.discountdetial.ob.surplusProductIds || [],
          saleStrategyId: this.discountdetial.ob.salesStrategyId || "",
          saleStrategyName: this.discountdetial.ob.strategyName || "",
          type: discountId
        },
        description: this.description, //合同说明
        contractStatus: this.contractStatus, //保存0提交1
        delegateA: this.gridColumns.Representative_a, //甲方法人
        effectiveType: effectiveType,
        effectiveTime: effectiveTime,
        isModify: this.ischange, //是否变更条款
        isNeedInvoice: this.isNeedInvoice,
        memberId: this.formCustom.memberId, //甲方公司
        originalAmount: this.reallysum, //小计总价
        partA: this.formCustom.partA, //甲方公司名称
        phoneA: this.gridColumns.tel_a,
        productList: this.changelist,
        saleStrategyId: this.discountdetial.ob.saleStrategyId || 0,
        totalAmountPrice: this.totalAmount, //洽谈总价（+优惠）
        totalAmount: this.changemoneyvalue,
        userId: this.userA.id, //用户名id
        userName: this.userA.name, //用户名
        filePath: a, //上传文件路径
        page: 0, //创建0审核1
        contractDescription: this.value8 // 合同变更条款说明
      };
      var that = this;
      if (this.haskeepcode != "") {
        data.id = this.haskeepcode;
        // contractInfoCommit
        this.spinShow = true;
        contractInfoCommit(data).then(resp => {
          that.spinShow = false;
          that.$Message.success(resp.message);
          that.$router.go(-1);
        });
        return;
      }
      this.spinShow = true;
      saveAgreement(data).then(resp => {
        that.spinShow = false;
        that.$Message.success(resp.message);
        if (b == 0) {
          that.haskeepcode = resp.response;
          // that.$router.go(-1);
          this.$router.push({ name: "myAgreement" });
        } else {
          that.$router.go(-1);
        }
      });
    },
    //合同确定
    sendcontact() {
      this.confirmmodal = true;
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
    },
    getContractAudiQueryPartbInfoVue() {
      this.spinShow = true;
      var that = this;
      getContractAudiQueryPartbInfo().then(resp => {
        that.spinShow = false;
        that.gridColumns.data_b = resp.response.partB;
        that.gridColumns.Representative_b = resp.response.delegateB;
        that.gridColumns.tel_b = resp.response.phoneB;
      });
    },
    getqueryPartaInfo() {
      this.formCustom.memberId = this.$route.query.memberId;
      this.isshow = this.$route.query.memberId;
      this.userA.id = this.$route.query.userId;
      let that = this;
      let data = {
        memberId: this.$route.query.memberId,
        userId: this.$route.query.userId
      };
      queryPartaInfo(data).then(resp => {
        that.userA.name = resp.response.userName;
        that.formCustom.partA = resp.response.partA;
        that.gridColumns.Representative_a = resp.response.delegateA || "";
        that.gridColumns.tel_a = resp.response.phoneA || "";
      });
    }
  },
  watch: {
    changemoneyvalue(newval, oldval) {
      var reg = /^\d+(\.\d{0,2})?$/;
      var resu = reg.test(newval);
      if (resu) {
      } else {
        this.changemoneyvalue = oldval;
      }
    }
  },
  created() {
    // this.getlist()
    if (this.$route.query.memberId) {
      this.getqueryPartaInfo();
    }
    this.getContractAudiQueryPartbInfoVue();
  }
};
</script>
