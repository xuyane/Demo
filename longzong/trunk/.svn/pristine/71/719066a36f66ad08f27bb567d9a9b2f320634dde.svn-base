<style lang="less" scoped>
.mar-top-20 {
  margin-top: 20px;
}

.page {
  margin: 10px 0;
  text-align: right;
  padding-right: 18px;
}

.bor {
  width: 100%;
  height: 36px;
  border-color: #5b5b5b;
  border-radius: 0;
}

.star {
  position: relative;
}

.star:before {
  position: absolute;
  content: "*";
  display: inline-block;
  margin-right: 4px;
  line-height: 1;
  font-family: SimSun;
  font-size: 12px;
  color: #ed4014;
  left: 22px;
  top: 10px;
}
</style>
<template>
	<Row>

		<i-col span="24">
			<Row class-name="current-position">
				当前位置：绩效管理&nbsp;&nbsp;>>&nbsp;&nbsp;提成比例维护
			</Row>
		</i-col>

		<Col span='24'>
		<Form class="search-form">
			<Row>
				<Col span="6">
				<FormItem label="产品分类 ： " :label-width="120">
					<Cascader v-model="productClassify" :data="protectList" class="search-input" placeholder="请选择产品分类"></Cascader>
				</FormItem>
				</Col>
				<Col span="6">
				<FormItem label="续入类型 ： " :label-width="120">
					<Cascader v-model="continuationClassify" :data="typeList" class="search-input" placeholder="请选择续入类型"></Cascader>
				</FormItem>
				</Col>
				<Col span="6" class="text-right">
				<Button type="primary" style="margin-right:20px" @click="onSearch()">查询</Button>
				<Button @click="reset()">重置</Button>
				</Col>

			</Row>
		</Form>
		</Col>
		<Col span='24' class="mar-top-20">
		<Row class-name="table-con">
			<Row class="mar-b">
				<Button type="primary" @click="addData">添加</Button>
				<Button type="primary" @click="delData">删除</Button>
			</Row>
			<Table class="tableCommon mar-top-20" :data="tableData1" :columns="columns1" ref="dragTable" :stripe="true" :border="true"
			 @on-selection-change="selectChange1">
				
			</Table>

			<!-- 添加窗口 -->
			<Modal v-model="addModel" title="添加" width='600'>
				<Form class="search-form" :rules="ruleValidate">
					<Row>
						<Col span="20">
						<FormItem label="续入类型 ： " :label-width="120" prop="continuationClassify1">
							<Cascader v-model="continuationClassify1" :data="typeList" class="search-input" placeholder="请选择产品分类"></Cascader>
						</FormItem>
						</Col>
					</Row>
					<Row>
						<Col span="20">
						<FormItem label="产品分类 ： " :label-width="120" prop="productClassify1">
							<Cascader v-model="productClassify1" :data="protectList" class="search-input" placeholder="请选择产品分类"></Cascader>
						</FormItem>
						</Col>
					</Row>
					<Row>
						<Col span="20">
						<FormItem label="提成比例 ： " :label-width="120" class="star">
							<Input v-model.number="percentageRate1" element-id="input1" @on-keyup="keyUp1" placeholder="请输入提成比例" class="search-input"/>
							
							<!-- <InputNumber :max="1" :min="0" v-model="percentageRate1" @on-blur="addPercentageRate" placeholder="请输入提成比例" class="bor" ></InputNumber> -->
						</FormItem>
						</Col>
					</Row>
					<Row>
						<Col span="20">
						<FormItem label="奖金比例 ： " :label-width="120" class="star">
							<Input v-model.number="bonusRate1" element-id="input2" @on-keyup="keyUp2" placeholder="请输入奖金比例" class="search-input"/>
							
							<!-- <InputNumber  :max="1" :min="0" v-model="bonusRate1" placeholder="请输入奖金比例" class="bor"></InputNumber> -->
						</FormItem>
						</Col>
					</Row>
				</Form>
				<div slot="footer">
					<i-button type="primary" @click="sureAdd()">确定</i-button>
					<i-button @click="back()">返回</i-button>
				</div>
			</Modal>

			<!-- 修改窗口 -->
			<Modal v-model="updateModel" title="修改" width='600'>
				<Form class="search-form" :rules="upRuleValidate">
					<Row>
						<Col span="20">
						<FormItem label="续入类型 ： " :label-width="120" prop="continuationClassify2">
							<Cascader v-model="continuationClassify2" :data="typeList" class="search-input" placeholder="请选择产品分类"></Cascader>
						</FormItem>
						</Col>
					</Row>
					<Row>
						<Col span="20">
						<FormItem label="产品分类 ： " :label-width="120" prop="productClassify2">
							<Cascader v-model="productClassify2" :data="protectList" class="search-input" placeholder="请选择产品分类"></Cascader>
						</FormItem>
						</Col>
					</Row>
					<Row>
						<Col span="20">
						<FormItem label="提成比例 ： " :label-width="120" class="star">
							<Input v-model.number="percentageRate2" element-id="input3" @on-keyup="keyUp3" placeholder="请输入提成比例" class="search-input"/>
							
							<!-- <InputNumber  :max="1" :min="0" v-model="percentageRate2" placeholder="请输入提成比例" class="bor" ></InputNumber> -->
						</FormItem>
						</Col>
					</Row>
					<Row>
						<Col span="20">
						<FormItem label="奖金比例 ： " :label-width="120" class="star">
							<Input v-model.number="bonusRate2" element-id="input4" @on-keyup="keyUp4" placeholder="请输入奖金比例" class="search-input"/>
							
							<!-- <InputNumber  :max="1" :min="0" v-model="bonusRate2" placeholder="请输入奖金比例" class="bor"></InputNumber> -->
						</FormItem>
						</Col>
					</Row>
				</Form>
				<div slot="footer">
					<i-button type="primary" @click="sureUpdate()">确定</i-button>
					<i-button @click="updateModel=false">返回</i-button>
				</div>
			</Modal>
		</Row>
		</Col>
	</Row>
</template>
<script>
import axios from "axios";
import { formData } from "../../../assets/js/common.js";
// import {
//   getProductTreeList,
//   proCategoryList
// } from "../../components/axios/productCenter.js";
import {
  pfRateList,
  pfAddRate,
  pfDelRate,
  pfEditDetail,
  pfEditRate,
  proCategoryList
} from "../../components/axios/performanceManagement.js";
export default {
  name: "proportional",

  data() {
    return {
      percentageRate1: null,
      bonusRate1: null,
      continuationClassify1: [],
      productClassify1: [],
      percentageRate2: null,
      bonusRate2: null,
      continuationClassify2: [],
      productClassify2: [],
      id2: null,
      ids: [],
      addModel: false,
      updateModel: false,
      continuationClassify: [],
      productClassify: [],
      protectList: [],
      typeList: [
        { value: "1", label: "新入" },
        { value: "2", label: "续入" },
        { value: "3", label: "会议" }
      ],
      columns1: [
        {
          type: "selection",
          title: "选择",
          align: "center",
          minwidth: 100
        },
        {
          title: "续入类型",
          key: "typeDesc",
          width: 300
        },
        {
          title: "产品分类",
          key: "productCategoryName",
          width: 300
        },
        {
          title: "提成比例",
          key: "percentageR",
          width: 300
        },
        {
          title: "奖金比例",
          key: "bonusR",
          width: 300
        },
        {
          title: "操作",
          width: 280,
          render: (h, data) => {
            return h("div", [
              h(
                "a",
                {
                  on: {
                    click: () => {
                      this.updateData(data);
                    }
                  }
                },
                "修改"
              )
            ]);
          }
        }
      ],
      tableData1: [],
      ruleValidate: {
        productClassify1: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        continuationClassify1: [
          { required: true, message: "不能为空", trigger: "blur" }
        ]
      },
      upRuleValidate: {
        productClassify2: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        continuationClassify2: [
          { required: true, message: "不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getCategoryList();
    this.getList();
  },

  methods: {
    keyUp1() {
      let typeInput = typeof this.percentageRate1;
      if (typeInput != "number") {
        this.percentageRate1 = this.percentageRate1.replace(/[^\d]/g, "");
      } else {
        if (this.percentageRate1 > 1) {
          this.percentageRate1 = 1;
        }else{
			let data=String(this.percentageRate1)
			if(data.length>=7){
				this.percentageRate1=Number(this.percentageRate1.toFixed(4));
				   $("#input1").blur();
			}
		}
      }
    },
  keyUp2() {
      let typeInput = typeof this.bonusRate1;
      if (typeInput != "number") {
        this.bonusRate1 = this.bonusRate1.replace(/[^\d]/g, "");
      } else {
        if (this.bonusRate1 > 1) {
          this.bonusRate1 = 1;
        }else{
			let data=String(this.bonusRate1)
			if(data.length>=7){
				this.bonusRate1=Number(this.bonusRate1.toFixed(4));
				   $("#input2").blur();
			}
		}
      }
	},
	keyUp3() {
      let typeInput = typeof this.percentageRate2;
      if (typeInput != "number") {
        this.percentageRate2 = this.percentageRate2.replace(/[^\d]/g, "");
      } else {
        if (this.percentageRate2 > 1) {
          this.percentageRate2 = 1;
        }else{
			let data=String(this.percentageRate2)
			if(data.length>=7){
				this.percentageRate2=Number(this.percentageRate2.toFixed(4));
				   $("#input3").blur();
			}
		}
      }
    },
  keyUp4() {
      let typeInput = typeof this.bonusRate2;
      if (typeInput != "number") {
        this.bonusRate2 = this.bonusRate2.replace(/[^\d]/g, "");
      } else {
        if (this.bonusRate2 > 1) {
          this.bonusRate2 = 1;
        }else{
			let data=String(this.bonusRate2)
			if(data.length>=7){
				this.bonusRate2=Number(this.bonusRate2.toFixed(4));
				   $("#input4").blur();
			}
		}
      }
    },
    //返回
    back() {
      this.addModel = false;
      this.percentageRate1 = null;
      this.bonusRate1 = null;
      this.continuationClassify1 = [];
      this.productClassify1 = [];
    },
    //列表查询
    getList() {
      let form = {
        bonusRate: "",
        id: "",
        percentageRate: "",
        productCategoryCode: this.productClassify[
          this.productClassify.length - 1
        ],
        productCategoryName: "",
        sign: "",
        type: this.continuationClassify[0],
        typeDesc: ""
      };
      form.time = Math.random() * 1000;
      pfRateList(form).then(res => {
        this.tableData1 = res.response;
        for (let i = 0; i < this.tableData1.length; i++) {
          this.tableData1[i].bonusR =
            (this.tableData1[i].bonusRate * 100).toFixed(2) + "%";
          this.tableData1[i].percentageR =
            (this.tableData1[i].percentageRate * 100).toFixed(2) + "%";
        }
      });
    },

    // 获取产品分类列表
    getCategoryList() {
      proCategoryList({ v: Math.random() * 1000 }).then(res => {
        this.protectList = this.productDigui(res.response);
      });
    },

    productDigui(data) {
      let dgData = data.map(item => {
        if (item.children.length > 0) {
          return {
            label: item.productCategoryName,
            value: item.productCategoryCode,
            children: this.productDigui(item.children)
          };
        } else {
          return {
            label: item.productCategoryName,
            value: item.productCategoryCode
          };
        }
      });
      return dgData;
    },
    //查询
    onSearch() {
      this.getList();
    },
    //重置
    reset() {
      this.continuationClassify = [];
      this.productClassify = [];
    },
    //勾选数据
    selectChange1(selection) {
      this.ids = [];
      selection.map(item => {
        this.ids.push(item.id);
      });
    },

    //修改弹框
    updateData(data) {
      this.continuationClassify2 = [];
      this.productClassify2 = [];
      let form = {
        percentagerateId: data.row.id
      };
      form.time = Math.random() * 1000;
      pfEditDetail(formData(form)).then(res => {
        if (res.response.productCategoryCode.length == 3) {
          this.productClassify2.push(res.response.productCategoryCode);
        } else {
          this.productClassify2.push(
            res.response.productCategoryCode.slice(0, 3)
          );
          this.productClassify2.push(res.response.productCategoryCode);
        }
        let type = String(res.response.type);
        this.continuationClassify2.push(type);
        this.percentageRate2 = res.response.percentageRate;
        this.bonusRate2 = res.response.bonusRate;
        this.id2 = res.response.id;
      });
      this.updateModel = true;
    },
    //修改
    sureUpdate() {
      if (
        this.bonusRate2 == null ||
        this.percentageRate2 == null ||
        this.productClassify2.length == 0 ||
        this.continuationClassify2.length == 0
      ) {
        this.$Message.error("请填写完整信息");
      } else {
        let form = {
          bonusRate: this.bonusRate2,
          id: this.id2,
          percentageRate: this.percentageRate2,
          productCategoryCode: this.productClassify2[
            this.productClassify2.length - 1
          ],
          productCategoryName: "",
          sign: "",
          type: this.continuationClassify2[0],
          typeDesc: ""
        };
        form.time = Math.random() * 1000;
        pfEditRate(form).then(res => {
          this.$Message.success("修改成功！");
          this.updateModel = false;
          this.getList();
        });
      }
    },
    //添加弹框
    addData() {
      this.addModel = true;
    },
    //添加
    sureAdd() {
      if (
        this.bonusRate1 == null ||
        this.percentageRate1 == null ||
        this.productClassify1.length == 0 ||
        this.continuationClassify1.length == 0
      ) {
        this.$Message.error("请填写完整信息");
        this.addModel = true;
      } else {
        let form = {
          bonusRate: this.bonusRate1,
          id: "",
          percentageRate: this.percentageRate1,
          productCategoryCode: this.productClassify1[
            this.productClassify1.length - 1
          ],
          productCategoryName: "",
          sign: "",
          type: this.continuationClassify1[0],
          typeDesc: ""
        };
        form.time = Math.random() * 1000;
        pfAddRate(form).then(res => {
          this.$Message.success("添加成功！");
          this.addModel = false;
          this.getList();
        });
      }
    },
    //删除
    delData() {
      if (this.ids.length == 0) {
        this.$Message.error("请勾选数据");
      } else {
        this.$Modal.confirm({
          title: "删除提示",
          content: "<p>请确定是否删除？</p>",
          onOk: () => {
            let form = {
              ids: this.ids
            };
            form.time = Math.random() * 1000;
            pfDelRate(formData(form)).then(res => {
              this.$Message.success("删除成功！");
              this.getList();
              this.ids = [];
            });
          },
          onCancel: () => {}
        });
      }
    }
  }
};
</script>