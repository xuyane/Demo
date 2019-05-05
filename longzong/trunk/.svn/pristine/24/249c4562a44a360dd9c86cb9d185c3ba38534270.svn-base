<style lang="less" scoped>
.yuan {
  line-height: 36px;
  margin-left: 10px;
}
.search-input-li {
  width: 80% !important;
}
</style>
<template>
  <Row>
    <Col span="24">
    <Row class-name="current-position">
      当前位置：数据中心&nbsp;&nbsp;>>&nbsp;&nbsp;主营零售价指标
    </Row>
    </Col>
    <!-- <tab-header-rank :tab-index="4"></tab-header-rank> -->
    <Col span="24" class-name="search-form">
    <Form :model="formItem" :label-width="100">
      <Row type="flex" justify="space-between">
        <Col span="7">
        <FormItem label="品种名称:">
          <Input type="text" class="search-input" placeholder="请输入品种名称" v-model="formItem.varietiesName" />
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="规格名称：">
          <Input type="text" class="search-input" placeholder="请输入规格名称" v-model="formItem.specificationsName" />
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="区域名称：">
          <Input type="text" class="search-input" placeholder="请输入区域名称" v-model="formItem.regionName" />
        </FormItem>
        </Col>
      </Row>
      <Row type="flex" justify="space-between">
        <Col span="7">
        <FormItem label="ID:">
          <Input v-model="formItem.id" @on-keyup="idBtn" class="search-input" placeholder="请输入ID"></Input>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="钢联ID:">
          <Input class="search-input" v-model="formItem.mysteelCode" placeholder="请输入钢联ID"></Input>
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
        <Col span="24" class="text-right">
          <Col span="7">
            <FormItem label="标准:">
              <Input class="search-input" placeholder="请输入标准" v-model="formItem.standard"></Input>
            </FormItem>
          </Col>
          <Col span="17">
            <FormItem>
              <Button type="primary" @click="searchBtn">查询</Button>
              <Button style="margin-left: 8px" @click="reset">重置</Button>
            </FormItem>
          </Col>
        </Col>
      </Row>
    </Form>
    </Col>
    <Col span="24">
    <Row class-name="table-con">
      <Button type="primary" @click="addbtn">添加</Button>
      <Table class="tableCommon mar-t-20" :data="tableData" :columns="columns" ref="dragTable" :stripe="true" :border="true">
      </Table>
      <oil-page 
      :total="total" 
      :page-num="formItem.pageNum" 
      :page-size="formItem.pageSize"
       @page-change="pageChange" 
       :page-size-opts="pageSizeOpts" 
       :show-sizer="showSizer">
      </oil-page>
    </Row>
    </Col>
    <!-- 新增/编辑/查看/复制 -->
    <Modal v-model="modal3" :title="titleName" width="750" :styles="{top: '20px'}">
      <Form :label-width="180" ref="formItems" :rules="addRoles" :model="formItems">
        <Row>
          <FormItem label="品种名称：" prop="varietiesName">
            <Select v-model="formItems.varietiesId" ref="input1" @on-query-change="emptyQuery2" class="search-input" filterable remote transfer label-in-value @on-change="change1" :remote-method="remoteMethod1" :loading="loading">
              <Option v-for="(option, index) in varietiesNameList" :value="option.id" :key="index">{{option.text}}</Option>
              </Option>
            </Select>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="规格名称：">
            <Select v-model="formItems.specificationsId" ref="input2" label-in-value @on-change="specificationsVal" class="search-input" transfer>
              <Option v-for="(item, index) in specificationsList" :value="item.specId" :key="item.index">{{item.specName}}</Option>
            </Select>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="区域名称：" prop="regionName">
            <Select v-model="formItems.regionId" ref="input3" @on-query-change="emptyQuery3" class="search-input" filterable remote transfer label-in-value @on-change="change2" :remote-method="remoteMethod2" :loading="loading">
              <Option v-for="(option, index) in regionNameList" :value="option.id" :key="index">{{option.text}}</Option>
              </Option>
            </Select>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="自定义区域：" prop="customRegion">
            <Input type="text" class="search-input" placeholder="请输入自定义区域" v-model="formItems.customRegion" />
          </FormItem>
        </Row>
        <Row>
          <FormItem label="市场名称：" prop="marketName">
            <Input type="text" class="search-input" placeholder="请输入市场名称" v-model="formItems.marketName" />
          </FormItem>
        </Row>
        <Row>
          <FormItem label="计价单位：" prop="unitValuationName">
            <Select v-model="formItems.unitValuationType" :labelInValue="true" @on-change="unitValuationVal" ref="input4" class="search-input" transfer>
              <Option v-for="(item, index) in unitValuationList" :value="item.value" :key="item.index">{{item.desc}}</Option>
            </Select>
          </FormItem>
        </Row>
        <Row>
          <Col span="24">
          <FormItem label="钢联数据中心CODE：">
            <RadioGroup v-model="formItems.isMysteel">
              <Radio label="0">是</Radio>
              <Radio label="1">否</Radio>
            </RadioGroup>
            <!-- <Row v-if="formItems.isMysteel==0 ? true:false"> -->
            <Row>
              <Row>
                <Col span="18">
                <Row style="display:flex">
                  <FormItem :label-width="150" label="最高零售价(元/升)：" prop="riseDayCode" style="display:flex">
                    <Input type="text" placeholder="输入钢联CODE" v-model="formItems.riseDayCode" />
                  </FormItem>
                </Row>
                </Col>
              </Row>
              <Row>
                <Col span="18">
                <Row style="display:flex">
                  <FormItem :label-width="150" label="最高零售价(元/吨)：" prop="tonDayCode" style="display:flex">
                    <Input type="text" placeholder="输入钢联CODE" v-model="formItems.tonDayCode" />
                  </FormItem>
                </Row>
                </Col>
              </Row>
            </Row>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <FormItem label="检查涨跌幅：" prop="checkUpsAndDown">
            <InputNumber :max="100" v-model="formItems.checkUpsAndDown" :formatter="value => `${value}%`" :parser="value => value.replace('%', '')" class="search-input">
            </InputNumber>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="标准（用途）：" prop="standard">
            <Input type="text" class="search-input" placeholder="请输入标准" v-model="formItems.standard" />
          </FormItem>
        </Row>
        <Row>
          <FormItem label="显示产品：">
            <RadioGroup v-model="formItems.isShow">
              <Radio label="0">是</Radio>
              <Radio label="1">否</Radio>
            </RadioGroup>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="定价基准：">
            <RadioGroup v-model="formItems.isBenchmarkPrice">
              <Radio label="0">是</Radio>
              <Radio label="1">否</Radio>
            </RadioGroup>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="显示市场价：">
            <RadioGroup v-model="formItems.isMarket">
              <Radio label="0">是</Radio>
              <Radio label="1">否</Radio>
            </RadioGroup>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="最高零售价（元/升）：">
            <RadioGroup v-model="formItems.isRisePrice">
              <Radio label="0">是</Radio>
              <Radio label="1">否</Radio>
            </RadioGroup>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="最高零售价（元/吨）：">
            <RadioGroup v-model="formItems.isTonPrice">
              <Radio label="0">是</Radio>
              <Radio label="1">否</Radio>
            </RadioGroup>
          </FormItem>
        </Row>
      </Form>
      <div slot="footer">
        <i-button type="primary" @click="asyncOK">确定</i-button>
        <i-button @click="modal3=false" class="search-btn">取消</i-button>
      </div>
    </Modal>
    <!-- 查看 -->
    <Modal v-model="detailModal" title="查看" width="750" :styles="{top: '20px'}">
      <Form :label-width="180" :model="detail">
        <Row>
          <FormItem label="品种名称：">
            <Input type="text" v-model="detail.varietiesName" readonly />
          </FormItem>
        </Row>
        <Row>
          <FormItem label="规格名称：">
            <Input type="text" v-model="detail.specificationsName" readonly />
          </FormItem>
        </Row>
        <Row>
          <FormItem label="区域名称：">
            <Input type="text" v-model="detail.regionName" readonly />
          </FormItem>
        </Row>
        <Row>
          <FormItem label="自定义区域：">
            <Input type="text" v-model="detail.customRegion" readonly />
          </FormItem>
        </Row>
        <Row>
          <FormItem label="市场名称：">
            <Input type="text" v-model="detail.marketName" readonly />
          </FormItem>
        </Row>
        <Row>
          <FormItem label="计价单位：">
            <Input type="text" v-model="detail.unitValuationName" readonly />
          </FormItem>
        </Row>
        <Row>
          <Col span="24">
          <FormItem label="钢联数据中心CODE：">
            <RadioGroup v-model="detail.isMysteel" disabled>
              <Radio label="0" disabled>是</Radio>
              <Radio label="1" disabled>否</Radio>
            </RadioGroup>
            <Row v-if="detail.isMysteel==0 ? true:false">
              <Row>
                <Col span="5" style="display: flex;flex-direction: column">
                <span>最高零售价(元/升)：</span>
                </Col>
                <Col span="18">
                <Row style="display:flex">
                  <FormItem :label-width="60" prop="riseDayCode" style="display:flex">
                    <Input type="text" v-model="detail.riseDayCode" readonly />
                  </FormItem>
                </Row>
                </Col>
              </Row>
              <Row>
                <Col span="5" style="display: flex;flex-direction: column">
                <span>最高零售价(元/吨)：</span>
                </Col>
                <Col span="18">
                <Row style="display:flex">
                  <FormItem :label-width="60" prop="tonDayCode" style="display:flex">
                    <Input type="text" v-model="detail.tonDayCode" readonly />
                  </FormItem>
                </Row>
                </Col>
              </Row>
            </Row>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <FormItem label="检查涨跌幅：">
            <!-- <Input type="text" v-model="detail.checkUpsAndDown" readonly /> -->
            <InputNumber :readonly="!ftView" :max="1000" v-model="detail.checkUpsAndDown" :formatter="value => `${value}%`" :parser="value => value.replace('%', '')" class="search-input">
            </InputNumber>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="标准（用途）：">
            <Input type="text" v-model="detail.standard" readonly />
          </FormItem>
        </Row>
        <Row>
          <FormItem label="显示产品：">
            <RadioGroup v-model="detail.isShow">
              <Radio label="0" disabled>是</Radio>
              <Radio label="1" disabled>否</Radio>
            </RadioGroup>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="定价基准：">
            <RadioGroup v-model="detail.isBenchmarkPrice">
              <Radio label="0" disabled>是</Radio>
              <Radio label="1" disabled>否</Radio>
            </RadioGroup>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="显示市场价：">
            <RadioGroup v-model="detail.isMarket">
              <Radio label="0" disabled>是</Radio>
              <Radio label="1" disabled>否</Radio>
            </RadioGroup>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="最高零售价（元/升）：">
            <RadioGroup v-model="detail.isRisePrice">
              <Radio label="0" disabled>是</Radio>
              <Radio label="1" disabled>否</Radio>
            </RadioGroup>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="最高零售价（元/吨）：">
            <RadioGroup v-model="detail.isTonPrice">
              <Radio label="0" disabled>是</Radio>
              <Radio label="1" disabled>否</Radio>
            </RadioGroup>
          </FormItem>
        </Row>
      </Form>
      <div slot="footer">
        <!-- <i-button type="primary" @click="asyncOK" class="search-btn" v-if="this.titleName=='查看' ? false:true">确定</i-button> -->
        <i-button @click="detailModal=false" class="search-btn">返回</i-button>
      </div>
    </Modal>
  </Row>
</template>
<script>
import OilPage from "../../components/page/page.vue";
import {
  dcpriceoilretailist,
  dcpriceoilretaiInfo,
  getDataCenterBreedList, //查询品种
  getSpecList, //查询规格
  getAreaList, //查询区域
  getSelectDataCenter,
  dcpriceoilretaiSave,
  dcpriceoilretaiUpdate,
  dataCenterCodeUniq,
  dcpriceoilretailUpdatestatus
} from "../../components/axios/dataCenter.js";
import { formData, formatTime } from "../../../assets/js/common.js";
import associateSearch from "../../components/associateSearch/associateSearchColl.vue";
export default {
  name: "oilProductRetailPrice",
  components: {
    OilPage,
    associateSearch
  },
  watch: {
    modal3(newVal, oldVal) {
      if (newVal == true) {
        this.$refs["formItems"].resetFields();
      }
    }
  },
  data() {
    const validateVarietiesName = (rule, value, callback) => {
      var varietiesId = this.formItems.varietiesId;
      if (!varietiesId) {
        callback(new Error("品种不能为空"));
      } else {
        callback();
      }
    };
    const validateRegionName = (rule, value, callback) => {
      var regionName = this.formItems.regionName;
      if (!regionName) {
        callback(new Error("区域名称不能为空"));
      } else {
        callback();
      }
    };
    const validateCheckup = (rule, value, callback) => {
      var checkUpsAndDown = this.formItems.checkUpsAndDown;
      if (!checkUpsAndDown) {
        callback(new Error("检查涨跌幅不能为空"));
      } else {
        callback();
      }
    };
    const validateDayCode1 = (rule, value, callback) => {
      let code = "";
      if (rule.field == "riseDayCode") {
        code = this.formItems.riseDayCode;
      }
      if (rule.field == "tonDayCode") {
        code = this.formItems.tonDayCode;
      }
      let id = this.editId == undefined ? "" : this.editId;
      if (!code) {
        callback("code不能为空");
      }
      if (this.formItems.riseDayCode === this.formItems.tonDayCode) {
        callback("钢联code不能重复");
      }
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
    return {
      titleName: "查看",
      cancel: "取消",
      ftView: true,
      detailModal: false,
      loading: false,
      varietiesNameList: [],
      regionNameList: [],
      codeFocus: false,
      submitAdd: true,
      unitPriceType: [],
      priceList: {},
      modal3: false,
      tableData: [],
      breedList: [],
      specList: [],
      areaList: [],
      totalAmount: 1000,
      total: 0,
      pageSize: 5,
      pageNum: 1,
      addForm: "",
      editId: "",
      detail: {},
      showSizer: true,
      varietiesId: "",
      formItems: {
        varietiesName: "",
        varietiesId: "",
        specificationsName: "",
        specificationsId: "",
        regionName: "",
        regionId: "",
        customRegion: "",
        marketName: "",
        unitValuationType: "",
        checkUpsAndDown: 0,
        standard: "",
        isMysteel: "0",
        riseDayCode: "",
        tonDayCode: "",
        isShow: "1",
        isBenchmarkPrice: "1",
        isMarket: "1",
        isRisePrice: "1",
        isTonPrice: "1"
      },
      specificationsList: [],
      unitValuationNameList: [],
      unitValuationList: [],
      pageSizeOpts: [5, 10, 20, 30],
      addRoles: {
        varietiesName: [
          {
            required: true,
            validator: validateVarietiesName,
            trigger: "change"
          }
        ],
        // specificationsName:[
        //   // {required: true, validator: validateSpecName, trigger: "change"},
        // {
        //     required: true,
        //     type: "string",
        //     max: 30,
        //     message: "规格名称不能超过30个字符",
        //     trigger: "blur"
        //   }],
        regionName: [
          { required: true, validator: validateRegionName, trigger: "change" }
        ],
        marketName: [
          { required: true, message: "市场名称不能为空", trigger: "blur" }
        ],
        unitValuationName: [
          { required: true, message: "计价单位名称不能为空", trigger: "change" }
        ],
        riseDayCode: [
          { required: true, validator: validateDayCode1, trigger: "blur" },
          {
            type: "string",
            max: 20,
            message: "Code不能超过20个字符",
            trigger: "blur"
          }
        ],
        tonDayCode: [
          { required: true, validator: validateDayCode1, trigger: "blur" },
          {
            type: "string",
            max: 20,
            message: "Code不能超过20个字符",
            trigger: "blur"
          }
        ],
        standard: [
          { required: true, message: "标准不能为空", trigger: "blur" }
        ],
        checkUpsAndDown: [
          {
            required: true,
            validator: validateCheckup,
            trigger: "blur",
            type: "number"
          }
        ]
      },
        isStartList:[
        {
          label:"全部",
          value: -1
        },
        {
          label:"启用",
          value: 0
        },
        {
          label:"禁用",
          value: 1
        }
      ],
      formItem: {
        pageNum: 1,
        pageSize: 10,
        varietiesName:'',
        specificationsName:'',
        regionName:'',
        id:'',
        standard:'',
        mysteelCode:'',
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
          minWidth: 70
        },
        {
          key: "regionName",
          align: "center",
          title: "区域名称",
          minWidth: 80,
          render: (h, data) => {
            let label = data.row.regionName;
            if (data.row.customRegion) {
              label = label + "(" + data.row.customRegion + ")";
            }
            return h("div", [h("span", label)]);
          }
        },
        {
          key: "marketName",
          align: "center",
          title: "市场名称",
          minWidth: 80
        },
        {
          key: "unitValuationName",
          align: "center",
          title: "计价单位",
          minWidth: 80
        },
        {
          key: "standard",
          align: "center",
          title: "标准",
          minWidth: 60
        },
        {
          key: "riseDayCode",
          align: "center",
          title: "最高零售价(元/升)",
          minWidth: 140
        },
        {
          key: "tonDayCode",
          align: "center",
          title: "最高零售价(元/吨)",
          minWidth: 140
        },
        {
          key: "isShow",
          title: "产品显示",
          width: 120, 
          align:"center",
          render: (h,data) =>{
            return h('div',{},data.row.isShow == "0" ? "是" : "否")
          }
        },
        {
          key: "isMysteel",
          align: "center",
          title: "是否传入钢联",
          width: 95,
          render: (h, data) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    color: "#222"
                  },
                  on: {}
                },
                data.row.isMysteel == "0" ? "是" : "否"
              )
            ]);
          }
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
        {
          key: "isShow",
          align: "center",
          title: "显示市场价",
          minWidth: 80,
          render: (h, data) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    color: "#222"
                  },
                  on: {}
                },
                data.row.isShow == "0" ? "是" : "否"
              )
            ]);
          }
        },
        // {
        //   key: "lastAccessDes",
        //   align: "center",
        //   title: "修改日期",
        //   minWidth: 100
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
                //loading: data.row.isShow == 0 ? true : false,
              },
              style:{
                
              },
              'class':data.row.isShow == 0 ? 'ivu-switch-checked':'',
              on: {
                'on-change' : (event)=> {       
                  if(data.row.isShow==0){
                    this.$Message.info('该指标为显示状态，不允许禁用！');
                    return
                  }      
                  this.modifyDisabled(data,event)
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
                innerHTML: data.row.isShow == 0 ? '启用':'禁用'                               
                }                                               
              })                                                
            ]
          )}
        },
        {
          title: "操作",
          align: "center",
          minWidth: 115,
          render: (h, data) => {
            return h("div", [
              h(
                "a",
                {
                  style: {
                    marginRight: "5px",
                    textDecoration: "none"
                  },
                  on: {
                    click: () => {
                      this.detailModal = true;
                      this.lookClick(data.row.id);
                    }
                  }
                },
                "查看"
              ),
              h(
                "a",
                {
                  style: {
                    marginRight: "5px",
                    textDecoration: "none"
                  },
                  on: {
                    click: () => {
                      this.modal3 = true;
                      this.titleName = "编辑";
                      this.editId = data.row.id;
                      this.lookClick(data.row.id);
                    }
                  }
                },
                "编辑"
              ),
              h(
                "a",
                {
                  style: {
                    textDecoration: "none"
                  },
                  on: {
                    click: () => {
                      this.modal3 = true;
                      this.titleName = "复制";
                      this.lookClick(data.row.id);
                    }
                  }
                },
                "复制"
              )
            ]);
          }
        }
      ]
    };
  },
  created() {
    this.getListPage();
    this.getPublicPrice();
    this.remoteMethod1();
    // this.chang1();
    // this.change2()
  },
  methods: {
    // 获取品种列表
    remoteMethod1(query) {
      if (query !== "") {
        this.loading = false;
        let params = {
          name: query
        };
        //console.log(''+ query)
        setTimeout(() => {
          this.loading = false;
          getDataCenterBreedList(formData(params)).then(res => {
            this.varietiesNameList = res.response;
          });
        }, 200);
      } else {
        this.options1 = [];
      }
    },
    // 获取区域列表
    remoteMethod2(query) {
      if (query !== "") {
        this.loading = false;
        let params = {
          name: query
        };
        setTimeout(() => {
          this.loading = false;
          getAreaList(formData(params)).then(res => {
            this.regionNameList = res.response;
            // console.log(this.regionNameList)
          });
        }, 200);
      } else {
        this.options1 = [];
      }
    },
    change1(option) {
      this.formItems.varietiesId = option.value;
      this.formItems.varietiesName = option.label;
      this.getVarieties();
    },
    change2(option) {
      this.formItems.regionId = option.value;
      this.formItems.regionName = option.label;
    },
    // 获取品种/规格
    getVarieties() {
      getSpecList(formData({ breedId: this.formItems.varietiesId })).then(
        res => {
          if (res.status == 200) {
            this.specificationsList = res.response;
          } else {
            this.$Message.error(res.message);
          }
          // console.log(res)
        }
      );
    },
    // 清空
    emptyQuery2(query) {
      if (query == "") {
        this.$refs.input1.query = "";
        this.formItems.varietiesId = "";
      }
    },
    // 清空
    emptyQuery3(query) {
      if (query == "") {
        this.$refs.input3.query = "";
        this.formItems.regionId = "";
      }
    },
    idBtn(){ 
      if(typeof(this.formItem.id)=='number'){
        this.formItem.id = this.formItem.id
      }else if(this.formItem.id==''){
        this.formItem.id=''
      }else{
        this.formItem.id = this.formItem.id.replace(/[^0-9]+/g,'')
      }
    },
    // 启用禁用
    modifyDisabled(data,event){
        let disabled = '';
        console.log(event)
        if(data.row.isShow == 0 && data.row.isStart == 0){
          return false;
        }else if(data.row.isShow == 1 && data.row.isStart == 1){
          disabled = 0;
        }else{
          disabled = 1;
        }
        let form = {
          id: data.row.id,
          isStart: disabled
        }
        dcpriceoilretailUpdatestatus(formData(form)).then(res => {
          this.getListPage();
          this.$Message.success("OK！");
        })
    },
    // 获取规格数据
    specificationsVal(option) {
      this.formItems.specificationsId = option.value;
      this.formItems.specificationsName = option.label;
      // console.log(option)
    },
    //获取计价单位的数据
    unitValuationVal(data) {
      if (data) {
        this.formItems.unitValuationType = data.value;
        this.formItems.unitValuationName = data.label;
      }

      // console.log(this.formItems.unitValuationType, this.formItems.unitValuationName )
    },
    // 获取计价单位数据
    getPublicPrice() {
      getSelectDataCenter({ type: "UnitValuationTypeEnum" }).then(res => {
        if (res.status == "200") {
          if(res.response.checkUpsAndDown){
            res.response.checkUpsAndDown = parseInt(res.response.checkUpsAndDown)
          }else{
            res.response.checkUpsAndDown = 0
          }
          this.unitValuationList = res.response;
          // console.log(res)
        }
      });
    },
    lookClick(data) {
      dcpriceoilretaiInfo({ id: data }).then(rps => {

        //console.log(rps);
        this.formItems = rps.response;
        console.log(this.formItems)
        let data = rps.response;
        this.detail = rps.response;
        this.formItems.isMysteel = data.isMysteel == 0 ? "0" : "1";
        this.formItems.isShow = data.isShow == 0 ? "0" : "1";
        this.formItems.isBenchmarkPrice =
          data.isBenchmarkPrice == 0 ? "0" : "1";
        this.formItems.isMarket = data.isMarket == 0 ? "0" : "1";
        this.formItems.isRisePrice = data.isRisePrice == 0 ? "0" : "1";
        this.formItems.isTonPrice = data.isTonPrice == 0 ? "0" : "1";
        this.formItems.unitValuationType = data.unitValuationType + "";
        this.formItems.varietiesId = data.varietiesId + "";
        this.regionNameList = [
          {
            id: data.regionId,
            text: data.regionName
          }
        ];
        this.varietiesNameList = [
          {
            id: data.varietiesId,
            text: data.varietiesName
          }
        ];
        // this.specificationsList = [
        //   {
        //     specId: data.specificationsId,
        //     specName: data.specificationsName
        //   }
        // ];
        this.formItems.checkUpsAndDown = parseInt(rps.response.checkUpsAndDown);
      
      });
    //console.log(this.formItems)
    },
    addbtn() {
      this.modal3 = true;
      this.titleName = "新增";
      this.ftView = false;
      this.formItems = {
        varietiesName: "",
        varietiesId: "",
        specificationsName: "",
        specificationsId: "",
        regionName: "",
        regionId: "",
        customRegion: "",
        marketName: "",
        unitValuationType: "",
        checkUpsAndDown: 0,
        standard: "",
        isMysteel: "0",
        riseDayCode: null,
        tonDayCode: null,
        isShow: "1",
        isBenchmarkPrice: "1",
        isMarket: "1",
        isRisePrice: "1",
        isTonPrice: "1"
      };
    },
    // 获取列表
    getListPage() {
      var formItems = {
        varietiesName: this.formItem.varietiesName,
        specificationsName: this.formItem.specificationsName,
        regionName: this.formItem.regionName,
        pageNum: this.formItem.pageNum,
        pageSize: this.formItem.pageSize,
        mysteelCode: this.formItem.mysteelCode,
        isStart: this.formItem.isStart,
        standard:this.formItem.standard,
        id: this.formItem.id ? Number(this.formItem.id) : null
      };
      //调用接口list_page
      dcpriceoilretailist(formItems).then(resp => {
        if (resp.status == "200") {
          this.tableData = resp.response.list || [];
          this.total = resp.response.total;
        }
      });
    },
    searchBtn(){
      this.formItem.pageNum=1;
      this.formItem.pageSize=10;
      this.getListPage();
    },
    // 重置
    reset() {
      this.formItem = {
        varietiesName: "",
        specificationsName: "",
        regionName: "",
        id: "",
        mysteelCode: "",
        pageNum: 1,
        pageSize: 10
      }
      this.getListPage();
    },
    pageChange(page, pageSize) {
      if (page) {
        this.formItem.pageNum = page;
      }
      if (pageSize) {
        this.formItem.pageSize = pageSize;
      }
      this.getListPage();
    },
    // 新增/编辑/查看/复制
    asyncOK() {
      let _this = this;
      this.$refs.formItems.validate(valid => {
        if (valid) {
          if (this.submitAdd) {
            this.submitAdd = false;
            // console.log(valid);
            let formObj = this.formItems;
            formObj.varietiesName = this.$refs.input1.values[0].label;
            // formObj.unitValuationType = Number(
            //   _this.formItems.unitValuationType
            // );
            // formObj.isShow = Number(formObj.isShow);
            // formObj.isMysteel = Number(formObj.isMysteel);
            // formObj.isMarket = Number(formObj.isMarket);
            // formObj.isRisePrice = Number(formObj.isRisePrice);
            // formObj.isTonPrice = Number(formObj.isTonPrice);
            // formObj.isBenchmarkPrice = Number(formObj.isBenchmarkPrice);
            let newObj = {
              checkUpsAndDown: formObj.checkUpsAndDown,
              customRegion: formObj.customRegion,
              id: formObj.id,
              isBenchmarkPrice: formObj.isBenchmarkPrice,
              isMarket: formObj.isMarket,
              isMysteel: formObj.isMysteel,
              isRisePrice: formObj.isRisePrice,
              isShow: formObj.isShow,
              isTonPrice: formObj.isTonPrice,
              marketName: formObj.marketName,
              regionId: formObj.regionId,
              regionName: formObj.regionName,
              riseDayCode: formObj.riseDayCode,
              sign: formObj.sign,
              specificationsId: formObj.specificationsId,
              specificationsName: formObj.specificationsName,
              standard: formObj.standard,
              tonDayCode: formObj.tonDayCode,
              unitValuationName: formObj.unitValuationName,
              unitValuationType: formObj.unitValuationType,
              varietiesId: formObj.varietiesId,
              varietiesName: formObj.varietiesName
            };

            if (this.titleName == "新增" || this.titleName == "复制") {
              if(newObj.id){
                newObj.id="";
              }
              dcpriceoilretaiSave(newObj).then(res => {
                this.modal3 = false;
                if (res.status == "200") {
                  this.$Message.success("添加成功！");
                  this.getListPage();
                }
              });
            } else if (this.titleName == "编辑") {
              //调用修改接口
              dcpriceoilretaiUpdate(newObj).then(res => {
                this.modal3 = false;
                if (res.status == "200") {
                  this.$Message.success("编辑成功！");
                  this.getListPage();
                }
              });
            } else {
              this.$Message.error(res.message);
            }
            this.submitAdd = true;
          }
        }
      });
    },
    
  }
};
</script>
