<style lang="less" scoped>
.yuan {
  line-height: 36px;
  margin-left: 10px;
}
</style>
<template>
  <Row>
    <Col span="24">
      <Row class-name="current-position">当前位置：数据中心&nbsp;&nbsp;>>&nbsp;&nbsp;国际原油价指标</Row>
    </Col>
    <Col span="24" class-name="search-form">
      <Form :model="formItem" :label-width="100">
        <Row type="flex" justify="space-between">
          <Col span="7">
            <FormItem label="品种名称:">
              <Input class="search-input" placeholder="请输入品种" v-model="formItem.varietiesName"></Input>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="市场类型：">
              <Select
                v-model="formItem.marketType"
                placeholder="请选择市场类型"
                style="width:100%;"
                clearable
              >
                <Option
                  v-for="item in priceTypeList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.desc }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="ID:">
              <Input
                v-model.trim.number="formItem.id"
                class="search-input"
                placeholder="请输入ID"
                @on-keyup="idBtn"
              ></Input>
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="space-between">
          <Col span="7">
            <FormItem label="钢联ID:">
              <Input class="search-input" placeholder="请输入钢联ID" v-model.trim.number="formItem.code"></Input>
            </FormItem>
          </Col>
          <Col span="7">
          <FormItem label="启用禁用:">
            <Select v-model="formItem.isStart" class="search-input" placeholder="全部">
              <Option
                v-for="item in isStartList"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="7">
          <FormItem label="标准:">
            <Input class="search-input" placeholder="请输入标准" v-model="formItem.standard"></Input>
          </FormItem>
        </Col>
          <Col span="24" class="text-right">
            <FormItem>
              <Button type="primary" @click="search">查询</Button>
              <Button style="margin-left: 8px" @click="reset">重置</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Col>
    <Col span="24">
      <Row class-name="table-con">
        <Button type="primary" @click="addbtn">添加</Button>
        <Table
          class="tableCommon mar-t-20"
          :data="tableData"
          :columns="columns"
          ref="dragTable"
          :stripe="true"
          :border="true"
        ></Table>
        <oil-page
          :total="total"
          :page-num="formItem.pageNum"
          :page-size="formItem.pageSize"
          @page-change="pageChange"
          :page-size-opts="pageSizeOpts"
          :show-sizer="showSizer"
        ></oil-page>
      </Row>
    </Col>
    <!-- 新增 -->
    <Modal v-model="addModal" :title="titleName" width="650" :styles="{top: '20px'}">
      <Row>
        <Form
          :label-width="146"
          class="search-form"
          ref="addForm"
          :rules="addRoles"
          :model="addForm"
        >
          <Col span="24">
            <FormItem label="品种名称" prop="pzName" v-show="ftView">
              <Select
                @on-change="getPubliceGuiGe"
                v-model="addForm.varietiesId"
                class="search-input"
                ref="breedRef"
                filterable
                :labelInValue="true"
              >
                <Option v-for="item in breedList" :value="item.id" :key="item.id">{{ item.text }}</Option>
              </Select>
            </FormItem>
            <!-- 只查看显示 -->
            <FormItem label="品种名称" class="search-input" v-show="!ftView">
              <Input :readonly="!ftView" v-model="addForm.varietiesName"></Input>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="规格名称" v-show="ftView">
              <Select
                @on-change="getSpecName"
                filterable
                class="search-input"
                v-model="addForm.specificationsId"
                :labelInValue="true"
              >
                <Option
                  v-for="item in specList"
                  :value="item.specId"
                  :key="item.specId"
                >{{ item.specName }}</Option>
              </Select>
            </FormItem>
            <!-- 只查看显示 -->
            <FormItem label="规格名称" class="search-input" v-show="!ftView">
              <Input :readonly="!ftView" v-model="addForm.specificationsName"></Input>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="区域名称" prop="qyName" v-show="ftView">
              <Select
                @on-query-change="searchKeyCity"
                @on-change="getCityName"
                v-model="addForm.regionId"
                filterable
                class="search-input"
                :labelInValue="true"
              >
                <Option v-for="item in areaList" :value="item.id" :key="item.id">{{ item.text }}</Option>
              </Select>
            </FormItem>
            <!-- 只查看显示 -->
            <FormItem label="区域名称" class="search-input" v-show="!ftView">
              <Input :readonly="!ftView" v-model="addForm.regionName"></Input>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="自定义区域">
              <Input
                :readonly="!ftView"
                class="search-input"
                placeholder="请输入自定义区域"
                v-model="addForm.customRegion"
              />
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="市场类型" prop="mkName" v-show="ftView">
              <Select
                @on-change="getMarketName"
                v-model="addForm.marketType"
                :labelInValue="true"
                style="width:100%;"
              >
                <Option
                  v-for="item in priceTypeList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.desc }}</Option>
              </Select>
            </FormItem>
            <!-- 只查看显示 -->
            <FormItem label="市场类型" v-show="!ftView">
              <Input :readonly="!ftView" class="search-input" v-model="addForm.marketTypeName"></Input>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="钢联数据中心CODE" prop="codeName" @on-change="radioChange" v-show="ftView">
              <RadioGroup v-model="addForm.isMysteel">
                <Radio :disabled="titleName=='查看'? true:false" label="0">是</Radio>
                <Radio :disabled="titleName=='查看'? true:false" label="1">否</Radio>
              </RadioGroup>
            </FormItem>

            <FormItem label="钢联数据中心CODE" v-show="!ftView">
              <RadioGroup v-model="addForm.isMysteel">
                <Radio :disabled="titleName=='查看'? true:false" label="0">是</Radio>
                <Radio :disabled="titleName=='查看'? true:false" label="1">否</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col span="24" v-if="addForm.isMysteel==0 ? true:false"><!--&#x3C;-->
            <FormItem v-show="ftView" class="search-input" label="价格" prop="dataDayName">
              <Input
                type="text"
                style="width:66%;"
                placeholder="输入钢联CODE"
                :autofocus="codeFocus"
                v-model="addForm.dayCode"
              ></Input>
            </FormItem>
            <!-- 只查看显示 -->
            <FormItem label="价格" v-show="!ftView">
              <Input
                class="search-input"
                :readonly="!ftView"
                v-model="addForm.dayCode"
                style="width:66%"
              ></Input>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="检查涨跌幅" prop="checkUpName">
              <InputNumber
                :readonly="!ftView"
                :min="0"
                :max="100"
                v-model="addForm.checkUpsAndDown"
                :formatter="value => `${value}%`"
                :parser="value => value.replace('%', '')"
                class="search-input" :sh="typeof(addForm.checkUpsAndDown)"
              ></InputNumber>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="计价单位" prop="jjName" v-show="ftView">
              <Select
                @on-change="getUnitName"
                v-model="addForm.unitValuationType"
                :labelInValue="true"
                class="search-input"
              >
                <Option
                  v-for="item in unitPriceType"
                  :value="item.value"
                  :key="item.value"
                >{{item.desc}}</Option>
              </Select>
            </FormItem>
            <!-- 只查看显示 -->
            <FormItem label="计价单位" class="search-input" v-show="!ftView">
              <Input :readonly="!ftView" v-model="addForm.unitValuationName"></Input>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="标准（用途）" prop="bzName">
              <Input
                type="text"
                class="search-input"
                placeholder="请输入标准（用途）"
                v-model="addForm.standard"
              />
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="是否显示">
              <RadioGroup v-model="addForm.isShow">
                <Radio :disabled="titleName=='查看'? true:false" label="0">是</Radio>
                <Radio :disabled="titleName=='查看'? true:false" label="1">否</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
        </Form>
      </Row>
      <div slot="footer" v-show="ftView">
        <i-button type="primary" @click="saveData">保存</i-button>
        <i-button type="default" @click="addModal=false">取消</i-button>
      </div>
    </Modal>
  </Row>
</template>
<script>
import OilPage from "../../components/page/page.vue";
import {
  formatTime,
  formData,
  formatStamp
} from "../../../assets/js/common.js";
import timeStampChange from "../../../assets/js/timestamp_change.js";
import {
  getAreaList,
  getSpecList,
  getDataCenterBreedList,
  dataCenterCodeUniq,
  getSelectDataCenter,
  updateOilTableMessage,
  saveOilTableMess,
  getOilInfo,
  getOilTableList,
  dcpriceinternationaloilUpdatestatus
} from "../../components/axios/dataCenter.js";
export default {
  name: "internationalOil",
  components: {
    OilPage
  },
  data() {
    const ratepayingPz = (rule, value, callback) => {
      console.log(rule, value);
      if (this.addForm.varietiesId) {
        callback();
      } else {
        callback(new Error(rule.message));
      }
    };
    // const ratepayingGg = (rule, value, callback) => {
    //   console.log(rule, value);
    //   let specificationsId = this.addForm.specificationsId;
    //   if (this.addForm.specificationsId) {
    //     callback();
    //   } else {
    //     callback(new Error(rule.message));
    //   }
    // };
    const ratepayingMk = (rule, value, callback) => {
      console.log(rule, value);
      if (this.addForm.marketType) {
        callback();
      } else {
        callback(new Error(rule.message));
      }
    };
    const ratepayingCn = (rule, value, callback) => {
      console.log(rule, value);
      if (this.addForm.isMysteel) {
        callback();
      } else {
        callback(new Error(rule.message));
      }
    };
    const ratepayingQy = (rule, value, callback) => {
      console.log(rule, value);
      if (this.addForm.regionId) {
        callback();
      } else {
        callback(new Error(rule.message));
      }
    };
    const ratepayingJj = (rule, value, callback) => {
      console.log(rule, value);
      if (this.addForm.unitValuationType) {
        callback();
      } else {
        callback(new Error(rule.message));
      }
    };
    // const ratepayingDc = (rule, value, callback) => {
    //   let vals = this.addForm.dayCode;
    //   let ids = this.addForm.id;
    //   console.log(this.addForm.dayCode);
    //   if (this.addForm.dayCode) {
    //     callback(this.onBlurCode(vals, ids));
    //   } else {
    //     callback(new Error(rule.message));
    //   }
    // };
    const ratepayingDc = (rule, value, callback) => {
      let code = "";
      if (rule.field == "dataDayName") {
        code = this.addForm.dayCode;
      }
      let id = this.editId == undefined ? "" : this.editId;
      if (!code) {
        callback("code不能为空");
      }
      //调用code验证唯一性api
      dataCenterCodeUniq(formData({ code: code, id: id })).then(res => {
        if (res.status == "200" && res.response == 0) {
          callback();
        } else if (res.status == "200" && res.response == 1) {
          callback("code已存在请重填！");
          let that = this;
          setTimeout(function() {
            that.codeFocus = true;
          }, 1500);
        }
      });
    };
    const ratepayingCk = (rule, value, callback) => {
      console.log(rule, value);
      if (this.addForm.checkUpsAndDown) {
        callback();
      } else {
        callback(new Error(rule.message));
      }
    };
    const ratepayingBz = (rule, value, callback) => {
      if (this.addForm.standard) {
        callback();
      } else {
        callback(new Error(rule.message));
      }
    };
    return {
      addRoles: {
        pzName: [
          {
            required: true,
            validator: ratepayingPz,
            message: "品种名称不能为空",
            trigger: "change"
          }
        ],
        // ggName: [
        //   {
        //     required: true,
        //     validator: ratepayingGg,
        //     message: "规格名称不能为空",
        //     trigger: "blur"
        //   }
        // ],
        mkName: [
          {
            required: true,
            validator: ratepayingMk,
            message: "市场类型不能为空",
            trigger: "change"
          }
        ],
        codeName: [
          {
            required: true,
            validator: ratepayingCn,
            message: "是，否 选择一个",
            trigger: "change"
          }
        ],
        qyName: [
          {
            required: true,
            validator: ratepayingQy,
            message: "区域名称不能为空",
            trigger: "change"
          }
        ],
        jjName: [
          {
            required: true,
            validator: ratepayingJj,
            message: "计价单位不能为空",
            trigger: "change"
          }
        ],
        dataDayName: [
          {
            required: true,
            validator: ratepayingDc,
            trigger: "blur"
          }
        ],
        checkUpName: [
          {
            required: true,
            validator: ratepayingCk,
            message: "涨跌幅不能为空",
            trigger: "blur"
          }
        ],
        bzName: [
          {
            required: true,
            validator: ratepayingBz,
            message: "标准不能为空",
            trigger: "blur"
          }
        ]
      },
      ftView: false,
      addModal: false,
      tableData: [],
      totalAmount: 1000,
      total: 0,
      editId: null,
      addForm: {
        checkUpsAndDown: 0,
        createTime: 0,
        creatorId: 0,
        creatorName: "",
        customRegion: "",
        dayCode: "",
        id: 0,
        isMysteel: "0",
        isShow: "1",
        lastAccess: 0,
        marketType: 0,
        marketTypeName: "",
        monthCode: "",
        operatorId: 0,
        operatorName: "",
        regionId: 0,
        regionName: "",
        sign: "",
        specificationsId: 0,
        specificationsName: "",
        standard: "",
        unitValuationName: "美元/桶",
        unitValuationType: 13,
        varietiesId: 0,
        varietiesName: "",
        version: 0,
        weekCode: "",
        yearCode: ""
      },
      showSizer: true,
      isStartList: [
        {
          label: "全部",
          value: -1
        },
        {
          label: "启用",
          value: 0
        },
        {
          label: "禁用",
          value: 1
        }
      ],
      pageSizeOpts: [5, 10, 20, 30],
      titleName: "查看",
      formItem: {
        code: "",
        id: null,
        marketType: null,
        marketTypeName: "",
        pageNum: 1,
        pageSize: 10,
        regionId: null,
        regionName: "",
        sign: "",
        standard:'',
        specificationsId: null,
        specificationsName: "",
        varietiesId: null,
        varietiesName: ""
      },
      columns: [
        {
          key: "id",
          title: "ID",
          align: "center",
          minWidth: 70
        },
        {
          key: "varietiesName",
          align: "center",
          title: "品种名称",
          minWidth: 80
        },
        {
          key: "specificationsName",
          align: "center",
          title: "规格名称",
          minWidth: 100
        },
        {
          key: "marketTypeName",
          align: "center",
          title: "期/现货/OPEC",
          minWidth: 100
        },
        {
          key: "unitValuationName",
          align: "center",
          title: "计价单位",
          minWidth: 80,
          ellipsis: true
        },
        {
          key: "standard",
          align: "center",
          title: "标准",
          minWidth: 60
        },
        {
          key: "dayCode",
          align: "center",
          title: "价格",
          minWidth: 100
        },
        {
          key: "isShowDesc",
          align: "center",
          title: "产品显示",
          minWidth: 80
        },
        {
          key: "isMysteelDesc",
          align: "center",
          title: "是否传入钢联",
          width: 98
        },
        {
          key: "checkUpsAndDown",
          align: "center",
          title: "检查涨跌幅",
          minWidth: 80,
          render: (h, data) => {
            let label = "";
            if(data.row.checkUpsAndDown){
                  label= data.row.checkUpsAndDown  + "%"
                }else{
                  label= 0  + "%"
                }
            return h("div", [
              h(
                "span",
                {
                  style: {
                    color: "#222"
                  },
                  on: {}
                },
                label
              )
            ]);
          }
        },
        // {
        //   key: "lastAccess",
        //   align: "center",
        //   title: "修改日期",
        //   minWidth: 100,
        //   render: (h, data) => {
        //     return h("div", [
        //       h(
        //         "span",
        //         {
        //           style: {}
        //         },
        //         //formatTime(data.row.lastAccess)
        //         // formatDate(new Date(params.row.addTime),'yyyy-MM-dd hh:mm')
        //         timeStampChange.format(data.row.createTime)
        //       )
        //     ]);
        //   }
        // },
        {
          key: "isStart",
          align: "center",
          title: "禁用/启用",
          minWidth: 100,
          render: (h, data) => {
            // 重点
            let _this = this;
            return h("i-switch", {
              props: {
                size:'large',
                value: data.row.isStart == 0 ? true : false,
                //loading: data.row.isShow == 0 ? true : false
              },
              style: {},
              'class':data.row.isShow == 0 ? 'ivu-switch-checked':'',
              on: {
                'on-change' : event => {
                  if(data.row.isShow==0){
                    this.$Message.info('该指标为显示状态，不允许禁用！');
                    return
                  } 
                  this.modifyDisabled(data, event);
                }
              }
            },
            [                                 
              h('span', {                                       
                slot: 'open',                                   
                domProps: {                                     
                innerHTML: '启用'                               
              }                                               
            }),                                               
              h('span', {                                       
                slot: 'close',                                  
                domProps: {                                     
                innerHTML: data.row.isShow == 0 ?'启用':'禁用'                               
                }                                               
              })                                                
            ]
          )}
        },
        {
          title: "操作",
          align: "center",
          minWidth: 120,
          render: (h, data) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    marginRight: "8px",
                    cursor: "pointer",
                    color: "blue"
                  },
                  on: {
                    click: () => {
                      this.titleName = "查看";
                      this.ftView = false;
                      this.addModal = true;
                      this.getSomeOilMes(data.row.id);
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
                    cursor: "pointer",
                    color: "blue"
                  },
                  on: {
                    click: () => {
                      this.$refs.addForm.resetFields();
                      this.titleName = "编辑";
                      this.addModal = true;
                      this.ftView = true;
                      this.getSomeOilMes(data.row.id);
                    }
                  }
                },
                "编辑"
              ),
              h(
                "span",
                {
                  style: {
                    marginRight: "8px",
                    cursor: "pointer",
                    color: "blue"
                  },
                  on: {
                    click: () => {
                      this.$refs.addForm.resetFields();
                      this.titleName = "复制";
                      this.addModal = true;
                      this.ftView = true;
                      this.getSomeOilMes(data.row.id);
                    }
                  }
                },
                "复制"
              )
            ]);
          }
        }
      ],
      codeFocus: false,
      breedList: [],
      riseList: [],
      specList: [],
      areaList: [],
      unitPriceType: [],
      priceTypeList: []
    };
  },
  created() {
    this.getPublicePrice();
    this.getListPage();
    this.getPublicType();
  },
  methods: {
    search() {
      this.formItem.pageNum = 1;
      this.formItem.pageSize = 10;
      this.getListPage();
    },
    //验证raodio 是与否
    radioChange(radio) {
      console.log(radio);
      let requiredPrice = this.addRoles.jjName[0].required;
      if (radio == 0) {
        requiredPrice = true;
      } else {
        requiredPrice = false;
      }
      console.log(requiredPrice);
    },
    //输入code框失去焦点事件 验证code唯一性
    onBlurCode(val, ids) {
      console.log(val);
      let id = ids ? ids : "";
      let vals = val;
      if (this.titleName == "编辑" || this.titleName == "查看") {
        if (this.titleName == "编辑") {
          //调用code验证唯一性api
          dataCenterCodeUniq(formData({ code: vals, id: id })).then(res => {
            if (res.status == "200" && res.response == 0) {
              //this.$Message.success("此code可以使用！");
            } else if (res.status == "200" && res.response == 1) {
              this.$Message.warning("code已存在请重填！");
              let that = this;
              setTimeout(function() {
                that.codeFocus = true;
              }, 1500);
            }
          });
        } else {
          return false;
        }
      } else {
        //调用code验证唯一性api
        dataCenterCodeUniq(formData({ code: vals, id: id })).then(res => {
          if (res.status == "200" && res.response == 0) {
            //this.$Message.success("此code可以使用！");
          } else if (res.status == "200" && res.response == 1) {
            this.$Message.warning("code已存在请重填！");
            let that = this;
            setTimeout(function() {
              that.codeFocus = true;
            }, 1500);
          }
        });
      }
    },
    // 启用禁用
    modifyDisabled(data, event) {
      let disabled = "";
      console.log(event);
      if (data.row.isShow == 0 && data.row.isStart == 0) {
        return false;
      } else if (data.row.isShow == 1 && data.row.isStart == 1) {
        disabled = 0;
      } else {
        disabled = 1;
      }
      let form = {
        id: data.row.id,
        isStart: disabled
      };
      dcpriceinternationaloilUpdatestatus(formData(form)).then(res => {
        this.getListPage();
        this.$Message.success("OK！");
      });
    },
    //关键字查询地区
    searchKeyCity(str) {
      console.log(str);
      getAreaList(formData({ name: str })).then(res => {
        res.response.map((ar, v, arr) => {
          arr[v].value = Number(ar.value);
          return arr;
        });
        this.areaList = res.response;
      });
    },
    //获取市场类型name
    getMarketName(mar) {
      this.addForm.marketTypeName = mar.label;
    },
    //规格名称name
    getSpecName(pn) {
      console.log(pn);
      this.addForm.specificationsName = pn.label;
    },
    //计价单位name
    getUnitName(un) {
      this.addForm.unitValuationName = un.label;
    },
    //获取选中区域的name值
    getCityName(na) {
      this.addForm.regionName = na.label;
    },
    //品种下拉框选中事件 可获取name值
    getPubliceGuiGe(dt) {
      //调用公共接口  规格
      console.log(dt);
      this.addForm.varietiesName = dt.label;
      console.log(dt.value);
      getSpecList(formData({ breedId: dt.value })).then(res => {
        if (res.status == "200") {
          res.response.map((ar, v, arr) => {
            arr[v].value = Number(ar.value);
            return arr;
          });
          if (res.response.length > 0) {
            this.specList = res.response;
          } else {
            this.specList = [];
            this.addForm.specificationsId = null;
          }
        }
      });
    },
    //让Input组件只能输入数字
    idBtn() {
      if (typeof this.formItem.id == "number") {
        this.formItem.id = this.formItem.id;
      } else if (this.formItem.id == "") {
        this.formItem.id = "";
      } else {
        this.formItem.id = this.formItem.id.replace(/[^0-9]+/g, "");
      }
    },
    //品种下拉框选中事件 可获取name值
    getSpecList(dt) {
      debugger
      //调用公共接口  规格
      console.log(dt); 
      this.addForm.varietiesName = dt.label;
      console.log(dt.value);
      getSpecList(formData({ breedId: dt.value })).then(res => {
        if (res.status == "200") {
          res.response.map((ar, v, arr) => {
            arr[v].value = Number(ar.value);
            return arr;
          });
          this.specList = res.response;
        }
      });
    },
    //通过id去获取info
    getSomeOilMes(dt) {
      let obj = {
        id: dt
      };
      this.editId = dt;
      getOilInfo(obj).then(rps => {
        console.log(rps)
        if(rps.response.checkUpsAndDown){
          rps.response.checkUpsAndDown = parseInt(rps.response.checkUpsAndDown)
        }else{
          rps.response.checkUpsAndDown = 0
        }
        if (rps.status == "200") {
          getSpecList(formData({ breedId: rps.response.varietiesId })).then(
            res => {
              if (res.status == "200") {
                res.response.map((ar, v, arr) => {
                  arr[v].value = Number(ar.value);
                  return arr;
                });
                this.specList = res.response;
              }
            }
          );
          if (rps.response.isMysteel == 0) {
            rps.response.isMysteel = "0";
          } else {
            rps.response.isMysteel = "1";
          }

          if (rps.response.isShow == "0") {
            rps.response.isShow = "0";
          } else {
            rps.response.isShow = "1";
          }
          this.areaList = [
            {
              id: rps.response.regionId,
              text: rps.response.regionName
            }
          ];
          // this.specList = [
          //   {
          //     specId: rps.response.specificationsId,
          //     specName: rps.response.specificationsName
          //   }
          // ];
          this.addForm = rps.response;
        }
      });
    },
    //调用公共接口下拉框数据  价格类型
    getPublicePrice() {
      //调用公共接口 涨跌幅枚举
      getSelectDataCenter({ type: "RiseAndFallEnum" }).then(res => {
        if (res.status == "200") {
          res.response.map((ar, v, arr) => {
            arr[v].value = Number(ar.value);
            return arr;
          });
          this.riseList = res.response;
        }
        //console.log(res);
      });
      //公共接口 计价单位类型
      getSelectDataCenter({ type: "UnitValuationTypeEnum" }).then(res => {
        console.log(res);
        if (res.status == "200") {
          res.response.map((ar, v, arr) => {
            arr[v].value = Number(ar.value);
            return arr;
          });
          this.unitPriceType = res.response;
        }
      });
      //市场类型 公共接口
      getSelectDataCenter({ type: "MarketTypeEnum" }).then(res => {
        res.response.map((ar, v, arr) => {
          arr[v].value = Number(ar.value);
          return arr;
        });
        this.priceTypeList = res.response;
      });
    },
    //品种名称 公共接口
    getPublicType(str) {
      //调用品种接口
      if (str) {
      } else {
        str = " ";
      }
      //调用公共接口 获取品种
      getDataCenterBreedList(formData({ name: str })).then(res => {
        if (res.status == "200") {
          res.response.map((ar, v, arr) => {
            arr[v].value = Number(ar.value);
            return arr;
          });
          this.breedList = res.response;
        }
      });
    },
    //获取list列表数据
    getListPage() {
      let obj = {
        code: this.formItem.code,
        id: this.formItem.id ? Number(this.formItem.id) : null,
        pageNum: this.formItem.pageNum,
        pageSize: this.formItem.pageSize,
        regionId: null,
        regionName: "",
        marketType: this.formItem.marketType ? this.formItem.marketType : null,
        marketTypeName: this.formItem.marketTypeName,
        sign: "",
        specificationsId: null,
        specificationsName: "",
        varietiesId: null,
        standard: this.formItem.standard,
        varietiesName: this.formItem.varietiesName,
        isStart: this.formItem.isStart,
      };
      getOilTableList(obj).then(res => {
        if (res.status == "200") {
          this.tableData = res.response.list;
        }
        this.total = res.response.total;
        console.log(res);
      });
    },
    //添加与新增
    addbtn() {
      this.addModal = true;
      this.titleName = "新增";
      this.$refs.addForm.resetFields();
      this.ftView = true;
      this.addForm = {
        checkUpsAndDown: 0,
        createTime: 0,
        creatorId: 0,
        creatorName: "",
        customRegion: "",
        dayCode: "",
        isMysteel: "0",
        isShow: "1",
        lastAccess: 0,
        marketType: 0,
        marketTypeName: "",
        monthCode: "",
        operatorId: 0,
        operatorName: "",
        regionId: 0,
        regionName: "",
        sign: "",
        specificationsId: 0,
        specificationsName: "",
        standard: "",
        unitValuationName: "美元/桶",
        unitValuationType: 13,
        varietiesId: 0,
        varietiesName: "",
        version: 0,
        weekCode: "",
        yearCode: ""
      };
    },
    //弹窗中的确定 按钮 事件
    saveData() {
      this.$refs.addForm.validate(valid => {
        console.log(valid);
        if (valid) {
          if (this.titleName == "新增" || this.titleName == "复制") {
            let objData = {
              checkUpsAndDown: this.addForm.checkUpsAndDown,
              createTime: this.addForm.createTime,
              creatorId: this.addForm.creatorId,
              creatorName: this.addForm.creatorName,
              customRegion: this.addForm.customRegion,
              dayCode: this.addForm.dayCode,
              isMysteel: this.addForm.isMysteel,
              isShow: this.addForm.isShow,
              lastAccess: this.addForm.lastAccess,
              marketType: this.addForm.marketType,
              marketTypeName: this.addForm.marketTypeName,
              monthCode: this.addForm.monthCode,
              operatorId: this.addForm.operatorId,
              operatorName: this.addForm.operatorName,
              regionId: this.addForm.regionId,
              regionName: this.addForm.regionName,
              sign: "",
              specificationsId: this.addForm.specificationsId,
              specificationsName: this.addForm.specificationsName,
              standard: this.addForm.standard,
              unitValuationName: this.addForm.unitValuationName,
              unitValuationType: this.addForm.unitValuationType,
              varietiesId: this.addForm.varietiesId,
              varietiesName: this.addForm.varietiesName,
              weekCode: "",
              yearCode: ""
            };
            //调用保存数据api
            saveOilTableMess(objData).then(res => {
              if (res.status == "200") {
                this.$Message.success("新增成功");
                this.addModal = false;
                this.getListPage();
              } else {
                this.$Message.warning(res.message);
              }
            });
          } else {
            //调用修改数据api
            updateOilTableMessage(this.addForm).then(resp => {
              if (resp.status == "200") {
                this.$Message.success("修改成功");
                this.addModal = false;
                this.getListPage();
              } else {
                this.$Message.warning(resp.message);
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    // 重置
    reset() {
      this.formItem = {
        code: "",
        id: "",
        marketType: "",
        pageNum: 1,
        pageSize: 10,
        regionId: "",
        regionName: "",
        sign: "",
        specificationsId: "",
        specificationsName: "",
        varietiesId: "",
        varietiesName: ""
      };
      this.getListPage();
    },
    //页码变动事件
    pageChange(page, pageSize) {
      if (page) {
        this.formItem.pageNum = page;
      }
      if (pageSize) {
        this.formItem.pageSize = pageSize;
      }
      this.getListPage();
    }
  }
};
</script>
