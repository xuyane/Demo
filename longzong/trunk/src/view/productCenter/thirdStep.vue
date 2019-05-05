<style lang="less" scoped>
.apply-table {
  border-top: 1px solid #bbb;
  border-right: 1px solid #bbb;
  border-spacing: 0;
  th {
    height: 40px;
    line-height: 40px;
    background: #ebf2fe;
    border-left: 1px solid #bbb;
    border-bottom: 1px solid #bbb;
  }
  td {
    border-left: 1px solid #bbb;
    border-bottom: 1px solid #bbb;
  }
}
</style>
<template>
  <Row>
    <Col span="24">
      <Form ref="fixPriceForm" :model="fixPriceForm" :rules="formRoles" :label-width="100">
        <Row>
          <Col span="12">
            <FormItem label="系统销售价:" prop="productPrice">
              <Input
                number
                v-model="fixPriceForm.productPrice"
                type="text"
                class="search-input"
                style="width: 200px"
                placeholder="请输入系统销售价"
              ></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="折后优惠比例:" prop="discount"  :label-width="110">
              <Input
                number
                v-model="fixPriceForm.discount"
                :min="0"
                class="search-input"
                style="width: 120px"
                placeholder="请输入折后优惠比例"
              ></Input>%
            </FormItem>
          </Col>
        </Row>
        <Row class="mar-t-15">
          <Col span="12">
            <FormItem label="市场销售价:" prop="discountPrice">
              <div>{{discountPrice}}</div>
            </FormItem>
          </Col>
          <Col span="12" style="display:flex;">
            <FormItem label="单位:">
              <span style="font-size:14px;">人民币</span>
            </FormItem>
            <span style="margin: 10px">/</span>
            <FormItem prop="buyPeriod" style="margin-left: -100px">
              <Select
                v-model="fixPriceForm.buyPeriod"
                style="width:120px;height:36px;"
                placeholder="请选择"
              >
                <Option
                  v-for="buyPeriod in monthList"
                  :value="buyPeriod"
                  :key="buyPeriod"
                >{{ buyPeriod }}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row class="mar-t-15">
          <Col span="12">
            <FormItem label="业务归属品种及分成比例" class="tips ivu-form-item-label" :label-width="180">
              <!-- <span class="mar-r-20"></span> -->
              <Button type="primary" style="width: 200px" @click="typeModal = true">请选择</Button>
            </FormItem>
          </Col>
        </Row>
        <Row class="mar-t-15">
          <table class="apply-table" width="750">
            <Col span="24">
              <th width="70">序号</th>
              <th width="500">业务归属品种</th>
              <th width="300">分成比例（总和100%）</th>
              <tbody>
                <tr v-for="(item, index) in selectBreeds" :key="item.breedId">
                  <td style="padding: 0 30px" class="text-center">{{index+1}}</td>
                  <td>
                    <p style="width: 400px;max-width: 100%;text-align: left;margin-left: 20px">
                      <span>{{item.route}}</span>
                      <b class="icon-delete pull-right" @click="deleteBreed(index)"></b>
                    </p>
                  </td>
                  <td>
                    <InputNumber
                      :max="100"
                      v-model="item.percent"
                      :formatter="value => `${value}%`"
                      :parser="value => value.replace('%', '')"
                      class="search-input"
                      style="width: 260px"
                    ></InputNumber>
                  </td>
                </tr>
              </tbody>
            </Col>
          </table>
          <div style="color: red">{{rateMsg}}</div>
        </Row>
        <Row class="mar-t-15">
          <Col span="24" style="text-align: center">
            <FormItem>
              <Button type="primary" @click="preStep">上一步</Button>
              <Button
                type="primary"
                style="margin-left: 20px"
                @click="validateData('fixPriceForm')"
              >下一步</Button>
              <Button style="width: 68px; margin-left: 20px" @click="cancelNext">取消</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Col>
    <Modal v-model="typeModal" title="品种选择" @on-ok="ok" @on-cancel="cancel">
      <p class="text-right">
        <span class="pointer" @click="clearInfo">
          <i class="icon-remove"></i>
          <span class="mar-r-20">清空所选</span>
        </span>
        <span class="pointer" @click="getBreedDataList">
          <i class="icon-frash"></i>
          <span class="mar-r-20">重新加载</span>
        </span>
      </p>
      <Tree
        :data="breedList"
        :load-data="loadBreedDataList"
        @on-check-change="checkedBreedChange"
        show-checkbox
        ref="breedRef"
      ></Tree>
    </Modal>
  </Row>
</template>
<script>
import {
  getProductTreeList,
  breedTypeList
} from "../components/axios/productCenter.js";
import {
  loadBreedData,
  breedMap,
  arrQC
} from "../components/productCenter/productCenter.js";
import bus from "../../store/bus/eventBus.js";
export default {
  props: ["breeds", "listData"],
  data() {
    const validateNumber = (rule, value, callback) => {
      // 模拟异步验证效果
      if (!Number.isInteger(+value)) {
        callback(new Error("请输入数字"));
      } else if (value == "" || value == 0) {
        callback(new Error("请输入系统销售价"));
      } else {
        callback();
      }
    };
    const validateDiscount = (rule, value, callback) => {
      let res = /([0-9]+\.[0-9]{3})[0-9]*/;
      if (res.test(value)) {
        callback(new Error("请输入最多两位小数数字"));
      } else if (value == "" || value == 0) {
        callback(new Error("请输入优惠折扣"));
      } else {
        callback();
      }
    };

    return {
      clearAll: false,
      breedModel: "",
      productData: "",
      breedList: [],
      selectBreeds: [],
      typeModal: false,
      loading: false,
      // moneyList: ['人民币'],
      monthList: ["次", "月", "年"],
      fixPriceForm: {
        productPrice: 0,
        discount: 0,
        discountPrice: 0,
        // unit: '人民币',
        unit: 0,
        buyPeriod: "年",
        rate: []
      },
      selectedBreedList: [],
      cityList: [
        {
          value: "1",
          label: "选项1"
        }
      ],
      formRoles: {
        productPrice: [
          {
            required: true,
            validator: validateNumber,
            trigger: "blur"
          }
        ],
        discount: [
          {
            required: true,
            validator: validateDiscount,
            trigger: "blur"
          }
        ],
        unit: [
          {
            required: true,
            message: "请选择单位",
            trigger: "change"
          }
        ],
        buyPeriod: [
          {
            required: true,
            message: "请选择单位",
            trigger: "change"
          }
        ]
      }
    };
  },
  computed: {
    discountPrice() {
      this.fixPriceForm.discountPrice = (
        this.fixPriceForm.productPrice *
        this.fixPriceForm.discount *
        0.01
      ).toFixed(2);
      return (
        this.fixPriceForm.productPrice *
        this.fixPriceForm.discount *
        0.01
      ).toFixed(2);
    },
    rateMsg() {
      //品种比例校验
      if (this.selectBreeds.length > 0) {
        let rate = this.selectBreeds;
        let sum = 0;
        if (rate.length > 0) {
          for (let i in rate) {
            sum += rate[i].percent;
          }
          if (sum !== 100) {
            return "分成比例总和必须为100%";
          }
        } else {
          return "分成比例不能为空";
        }
      }
    }
  },
  created() {
    this.getBreedDataList();
  },
  mounted() {
    bus.$on("breeds", res => {
      this.selectBreeds = res.map(item => {
        return {
          breedId: item.breedId,
          breedName: item.breedName,
          route: item.route,
          percent: Number((item.percent * 100).toFixed(2))
        };
      });
    });
  },
  watch: {
    listData(newVal, oldVal) {
      this.productData = newVal;
      this.fixPriceForm.productPrice = this.productData.productPrice;
      this.fixPriceForm.discount = Number(
        (this.productData.specialDiscount * 100).toFixed(2)
      );
      this.fixPriceForm.discountPrice = this.productData.afterDiscountPrice;
      this.fixPriceForm.unit = this.productData.unitDes;
      this.fixPriceForm.buyPeriod = this.productData.buyPeriodDes;
    }
  },
  methods: {
    getBreedIds(list) {
      let arr = [];
      for (let i = 0; i < list.length; i++) {
        arr.push(list[i].breedId);
      }
      return arr;
    },
    ok() {
      let breedArr = [];
      let breedIdArr = [];
      for (let i = 0; i < this.$refs.breedRef.getCheckedNodes().length; i++) {
        if (this.$refs.breedRef.getCheckedNodes()[i].breedId) {
          breedArr.push(this.$refs.breedRef.getCheckedNodes()[i]);
        } else {
          breedIdArr.push(this.$refs.breedRef.getCheckedNodes()[i].nodeId);
        }
      }
      breedTypeList({
        breedTypeIdList: breedIdArr
      }).then(res => {
        let BreedNameList = res.response.map(item => {
          return {
            checked: false,
            breedId: item.nodeId,
            nodeCode: item.nodeCode,
            type: item.type,
            title: item.nodeName,
            route: item.nodeName,
            breedName: item.nodeName,
            percent: 0
          };
        });
        let concatArr = breedArr.concat(BreedNameList);
        let concatArray = concatArr.concat(this.selectBreeds);
        this.selectBreeds = arrQC(concatArray);
      });
      if (this.clearAll) {
        this.selectBreeds = [];
      }
    },

    formatRate() {
      let rate = this.fixPriceForm.rate;
      this.selectBreeds = this.selectBreeds.map((item, index) => {
        return {
          breedId: item.breedId,
          route: item.route,
          breedName: item.breedName,
          percent: item.percent
        };
      });
    },
    // 删除某个品类
    deleteBreed(index) {
      this.selectBreeds.splice(index, 1);
    },
    cancel() {
      this.getBreedDataList();
    },
    // 获取品种树
    loadBreedDataList(item, callback) {
      loadBreedData(item, callback, this.selectBreeds);
    },
    getBreedDataList() {
      let form = {
        breedCode: ""
      };
      getProductTreeList(form).then(res => {
        this.breedList = breedMap(res.response);
      });
      this.clearAll = false;
    },
    // 品种选择触发事件
    checkedBreedChange(data) {
      this.selectedBreedList = data;
    },
    // 校验数据
    validateData(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.selectBreeds.length > 0) {
            let rate = this.selectBreeds;
            let sum = 0;
            if (rate.length > 0) {
              for (let i in rate) {
                sum += rate[i].percent;
              }
              if (sum !== 100) {
                alert("分成比例总和必须为100%");
              } else {
                this.$emit("step", 4);
              }
            } else {
              alert("分成比例不能为空");
            }
            this.formatRate();
          } else {
            this.$emit("step", 4);
          }
        } else {
          this.$Message.warning("请填写必填项");
        }
      });
    },
    // 上一步
    preStep() {
      this.$emit("step", 2);
    },
    // 清空所选
    clearInfo() {
      this.getBreedDataList();
      this.clearAll = true;
    },
    childrenOne(data) {
      data.forEach(list => {
        list.checked = false;
      });
    },
    // 取消，返回产品管理页面
    cancelNext() {
      this.$router.push({
        name: "productManager"
      });
    }
  }
};
</script>
