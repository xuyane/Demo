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
      当前位置：数据中心&nbsp;&nbsp;>>&nbsp;&nbsp;成品油主营批发价指标
    </Row>
    </Col>
    <Col span="24" class-name="search-form">
    <Form :model="formItem" :label-width="100">
      <Row type="flex" justify="space-between">
        <Col span="7">
        <FormItem label="品种名称:">
          <Input v-model="formItem.varietiesName" class="search-input" placeholder="请输入品种名称"></Input>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="规格名称：">
          <Input v-model="formItem.specificationsName" class="search-input" placeholder="请输入规格名称"></Input>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="区域名称：">
          <Input v-model="formItem.regionName" class="search-input" placeholder="请输入区域名称"></Input>
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
          <Input v-model="formItem.mysteelCode" class="search-input" placeholder="请输入钢联ID"></Input>
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
              <Button type="primary" @click="search">查询</Button>
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
      <oil-page :total="total" :page-num="formItem.pageNum" :page-size="formItem.pageSize" @page-change="pageChange" :page-size-opts="pageSizeOpts" :show-sizer="showSizer"></oil-page>
    </Row>
    </Col>
    <!-- 新增 -->
    <Modal v-model="addModal" :title="modalTitle" width="650" @on-cancel="cancelbtn">
      <Form :label-width="180" ref="modalForm" :rules="addRoles" :model="modalForm">
        <Row>
          <FormItem label="品种名称：" prop="varietiesId" v-show="ftView">
            <associate-Search @query-list="breedFunction" :dataUrl="urlBreed" ref="breedRef" class="form-select"></associate-Search>
          </FormItem>
          <!-- 只查看显示 -->
          <FormItem label="品种名称" class="search-input" v-show="!ftView">
            <Input :readonly="!ftView" v-model="modalForm.varietiesName"></Input>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="规格名称："  v-show="ftView">
            <Select v-model="modalForm.specificationsId" :labelInValue="true" @on-change="specificationsVal" class="search-input" transfer>
              <Option v-for="(item, index) in specificationsList" :value="item.specificationsId" :key="item.value">{{item.specificationsName}}</Option>
            </Select>
          </FormItem>
          <!-- 只查看显示 -->
          <FormItem label="规格名称" class="search-input" v-show="!ftView">
            <Input :readonly="!ftView" v-model="modalForm.specificationsName"></Input>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="区域名称：" prop="regionId" v-show="ftView">
            <associate-Search @query-list="areaFunction" :dataUrl="urlArea" ref="areaRef" class="form-select"></associate-Search>
          </FormItem>
          <!-- 只查看显示 -->
          <FormItem label="区域名称" class="search-input" v-show="!ftView">
            <Input :readonly="!ftView" v-model="modalForm.regionName"></Input>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="自定义区域：" prop="customRegion" v-show="ftView">
            <Input type="text" class="search-input" placeholder="请输入自定义区域" v-model="modalForm.customRegion" />
          </FormItem>
          <!-- 只查看显示 -->
          <FormItem label="自定义区域" class="search-input" v-show="!ftView">
            <Input :readonly="!ftView" v-model="modalForm.customRegion"></Input>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="市场名称：" prop="marketName" v-show="ftView">
            <Input type="text" class="search-input" placeholder="请输入市场名称" v-model="modalForm.marketName" />
          </FormItem>
          <!-- 只查看显示 -->
          <FormItem label="市场名称" class="search-input" v-show="!ftView">
            <Input :readonly="!ftView" v-model="modalForm.marketName"></Input>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="计价单位：" prop="unitValuationType" v-show="ftView">
            <Select v-model="modalForm.unitValuationType" :labelInValue="true" @on-change="unitValuationVal" class="search-input" transfer>
              <Option v-for="(item, index) in unitValuationList" :value="item.value" :key="item.value">{{item.desc}}</Option>
            </Select>
          </FormItem>
          <!-- 只查看显示 -->
          <FormItem label="计价单位" class="search-input" v-show="!ftView">
            <Input :readonly="!ftView" v-model="modalForm.unitValuationName"></Input>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="钢联数据中心CODE：" prop="isMysteel">
            <RadioGroup v-model="modalForm.isMysteel">
              <Radio :disabled="!ftView" label="0">是</Radio>
              <Radio :disabled="!ftView" label="1">否</Radio>
            </RadioGroup>
            <!-- <ul v-if="modalForm.isMysteel==1 ? false:true"> -->
            <ul>
              <li>
                <Row>
                  <Col span="6">
                  <span style="display:inline-block;">中石油:</span>
                  </Col>
                  <Col span="12">
                  <FormItem prop="oilDayCode" v-show="ftView">
                    <Input v-model="modalForm.oilDayCode" placeholder="请输入钢联CODE" type="text" class="search-input search-input-li" />
                  </FormItem>
                  <!-- 只查看显示 -->
                  <FormItem class="search-input" v-show="!ftView">
                    <Input :readonly="!ftView" v-model="modalForm.oilDayCode"></Input>
                  </FormItem>
                  </Col>
                </Row>
              </li>
              <li>
                <Row>
                  <Col span="6">
                  <span style="display:inline-block; ">中石化:</span>
                  </Col>
                  <Col span="12">
                  <FormItem prop="petrifiedDayCode" v-show="ftView">
                    <Input v-model="modalForm.petrifiedDayCode" placeholder="请输入钢联CODE" type="text" class="search-input search-input-li" />
                  </FormItem>
                  <!-- 只查看显示 -->
                  <FormItem class="search-input" v-show="!ftView">
                    <Input :readonly="!ftView" v-model="modalForm.petrifiedDayCode"></Input>
                  </FormItem>
                  </Col>
                </Row>
              </li>
            </ul>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="检查涨跌幅：" prop="checkUpsAndDown" v-show="ftView">
            <InputNumber :max="100" v-model="modalForm.checkUpsAndDown" :formatter="value => `${value}%`" :parser="value => value.replace('%', '')" class="search-input">
            </InputNumber>
          </FormItem>
          <!-- 只查看显示 -->
          <FormItem label="检查涨跌幅" class="search-input" v-show="!ftView">
            <InputNumber :readonly="!ftView" :max="1000" v-model="modalForm.checkUpsAndDown" :formatter="value => `${value}%`" :parser="value => value.replace('%', '')" class="search-input">
            </InputNumber>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="标准：" prop="standard" v-show="ftView">
            <Input type="text" class="search-input" placeholder="请输入标准" v-model="modalForm.standard" />
          </FormItem>
          <!-- 只查看显示 -->
          <FormItem label="标准" class="search-input" v-show="!ftView">
            <Input :readonly="!ftView" v-model="modalForm.standard"></Input>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="是否显示：">
            <RadioGroup v-model="modalForm.isShow">
              <Radio :disabled="!ftView" label="0">是</Radio>
              <Radio :disabled="!ftView" label="1">否</Radio>
            </RadioGroup>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="定价基准：">
            <RadioGroup v-model="modalForm.isBenchmarkPrice">
              <Radio :disabled="!ftView" label="0">是</Radio>
              <Radio :disabled="!ftView" label="1">否</Radio>
            </RadioGroup>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="显示中石油：">
            <RadioGroup v-model="modalForm.isOilPrice">
              <Radio :disabled="!ftView" label="0">是</Radio>
              <Radio :disabled="!ftView" label="1">否</Radio>
            </RadioGroup>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="显示中石化：">
            <RadioGroup v-model="modalForm.isPetrifiedPrice">
              <Radio :disabled="!ftView" label="0">是</Radio>
              <Radio :disabled="!ftView" label="1">否</Radio>
            </RadioGroup>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="发改委批发限价：">
            <RadioGroup v-model="modalForm.isDrcPrice">
              <Radio :disabled="!ftView" label="0">是</Radio>
              <Radio :disabled="!ftView" label="1">否</Radio>
            </RadioGroup>
          </FormItem>
        </Row>
      </Form>
      <div slot="footer" v-show="ftView">
        <i-button type="primary" @click="savebtn">保存</i-button>
        <i-button type="default" @click="cancelbtn">取消</i-button>
      </div>
    </Modal>
  </Row>
</template>
<script>
import {
  dcpriceoiltradeList,
  getSelectDataCenter,
  dcpriceoiltradeInfo,
  saveDcpriceoiltrade,
  updateDcpriceoiltrade,
  getSpecList,
  dataCenterCodeUniq,
  dcpriceoiltradeUpdatestatus
} from "../../components/axios/dataCenter.js";
import oilPage from "../../components/page/page.vue";
import { formatTime2, formData } from "../../../assets/js/common.js";
import associateSearch from "../../components/associateSearch/associateSearchDataCenter.vue";
export default {
  name: "oilProductTradePrice",
  components: {
    oilPage,
    associateSearch
  },
  data() {
    const validateVarietiesId = (rule, value, callback) => {
      var varietiesId = this.modalForm.varietiesId;
      if (!varietiesId) {
        callback("品种名称不能为空");
      } else {
        callback();
      }
    };
    const validateRegionId = (rule, value, callback) => {
      var regionId = this.modalForm.regionId;
      if (!regionId) {
        callback("区域名称不能为空");
      } else {
        callback();
      }
    };
    // const validateSpecificationsId = (rule, value, callback) => {
    //   let specificationsId = this.modalForm.specificationsId;
    //   let templateTypeName =
    //     this.modalForm.templateTypeName == undefined
    //       ? ""
    //       : this.modalForm.templateTypeName;
    //   if (!specificationsId || templateTypeName.indexOf("规格") > -1) {
    //     callback("规格名称不能为空");
    //   } else {
    //     callback();
    //   }
    // };
    //输入code框失去焦点事件 验证code唯一性
    const onBlurCode = (rule, value, callback) => {
      let code = "";
      if (rule.field == "oilDayCode") {
        code = this.modalForm.oilDayCode;
      }
      if (rule.field == "petrifiedDayCode") {
        code = this.modalForm.petrifiedDayCode;
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
    return {
      addModal: false,
      btnType: null,
      tableData: [],
      total: 0,
      editId: null,
      showSizer: true,
      pageSizeOpts: [5, 10, 20, 30],
      unitValuationList: [],
      specificationsList: [],
      modalTitle: "",
      urlBreed: "/datacenter/dataCenter/breedList",
      urlArea: "/datacenter/dataCenter/areaList",
      //loading: false,
      ftView: false,
      formItem: {
        id:"",
        varietiesName: "",
        specificationsName: "",
        regionName: "",
        id: "",
        mysteelCode: "",
        standard:'',
        pageSize: 10,
        pageNum: 1
      },
      addRoles: {
        varietiesId: [
          {
            required: true,
            validator: validateVarietiesId,
            trigger: "change"
          }
        ],
        // specificationsId: [
        //   {
        //     required: true,
        //     validator: validateSpecificationsId,
        //     trigger: "change"
        //   }
        // ],
        regionId: [
          {
            required: true,
            validator: validateRegionId,
            trigger: "change"
          }
        ],
        customRegion: [
          {
            type: "string",
            max: 30,
            message: "自定义区域不能超过30个字符",
            trigger: "change"
          }
        ],
        marketName: [
          {
            required: true,
            message: "市场名称不能为空",
            trigger: "change"
          }
        ],
        unitValuationType: [
          {
            required: true,
            message: "计价单位不能为空",
            trigger: "change"
          }
        ],
        isMysteel: [
          {
            required: true,
            message: "钢联数据中心CODE不能为空",
            trigger: "change"
          },
          {
            type: "string",
            max: 30,
            message: "自定义区域不能超过30个字符",
            trigger: "change"
          }
        ],
        oilDayCode: [
          {
            required: true,
            validator: onBlurCode,
            trigger: "blur"
          }
        ],
        petrifiedDayCode: [
          {
            required: true,
            validator: onBlurCode,
            trigger: "blur"
          }
        ],
        
        checkUpsAndDown: [
          {
            required: true,
            message: "检查涨跌幅不能为空",
            type: "number",
            trigger: "change"
          }
        ],
        standard: [
          {
            required: true,
            message: "标准不能为空",
            trigger: "change"
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
      modalForm: {
        varietiesId: null,
        varietiesName: "",
        specificationsId: null,
        specificationsName: "",
        regionId: null,
        regionName: "",
        customRegion: "",
        oilDayCode: "",
        petrifiedDayCode: "",
        marketName: "",
        unitValuationType: null,
        unitValuationName: "",
        isMysteel: 0,
        checkUpsAndDown: 0,
        standard: "",
        isShow: "1",
        isBenchmarkPrice: "1",
        isOilPrice: "1",
        isPetrifiedPrice: "1",
        isDrcPrice: "1",
        lowDayCode: "",
        highDayCode: "",
        marketDayCode: ""
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
          key: "oilDayCode",
          align: "center",
          title: "中石油",
          minWidth: 140
        },
        {
          key: "petrifiedDayCode",
          align: "center",
          title: "中石化",
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
            let label =
              data.row.isMysteel === 0
                ? "是"
                : data.row.isMysteel === 1
                  ? "否"
                  : "";

            return h(
              "span",
              {
                props: {
                  type: "text",
                  size: "small"
                }
              },
              label
            );
          }
        },
        {
          key: "checkUpsAndDown",
          align: "center",
          title: "检查涨跌幅",
          minWidth: 90,
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
          title: "显示产品",
          minWidth: 70,
          render: (h, data) => {
            let label =
              data.row.isShow === 0 ? "是" : data.row.isShow === 1 ? "否" : "";

            return h(
              "span",
              {
                props: {
                  type: "text",
                  size: "small"
                }
              },
              label
            );
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
                "span",
                {
                  style: {
                    marginRight: "5px",
                    color: "blue",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.viewModal(data.row.id);
                    }
                  }
                },
                "查看"
              ),
              h(
                "span",
                {
                  style: {
                    marginRight: "5px",
                    color: "blue",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.btnType = 2;
                      this.editDetails(data.row.id);
                    }
                  }
                },
                "编辑"
              ),
              h(
                "span",
                {
                  style: {
                    color: "blue",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.btnType = 3;
                      this.editDetails(data.row.id);
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
    this.getList();
  },
  methods: {
    search() {
      this.formItem.pageNum = 1;
      this.formItem.pageSize = 10;
      this.getList();
    },
    //获取列表
    getList() {
      if(this.formItem.id==''){
        this.formItem.id = this.formItem.id
      }else{
        this.formItem.id = Number(this.formItem.id)
      }
      dcpriceoiltradeList(this.formItem).then(res => {
        if (res.response) {
          this.tableData = res.response.list;
          this.total = res.response.total;
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    //下拉选择类型
    selectType(type) {
      let that = this;
      let params = {
        type: type
      };
      getSelectDataCenter(params).then(res => {
        if (res.response) {
          if (type == "UnitValuationTypeEnum") {
            that.unitValuationList = res.response;
          }
        } else {
          that.$Message.error(res.message);
        }
      });
    },
     //让Input组件只能输入数字
    idBtn(){ 
      if(typeof(this.formItem.id)=='number'){
        this.formItem.id = this.formItem.id
      }else if(this.formItem.id==''){
        this.formItem.id=''
      }else{
        this.formItem.id = this.formItem.id.replace(/[^0-9]+/g,'')
      }
    },
    //编辑
    editDetails(id) {
      let that = this;
      this.addModal = true;
      this.ftView = true;
      if (this.btnType == 2) {
        that.modalTitle = "编辑";
        that.editId = id;
      }
      if (this.btnType == 3) {
        that.modalTitle = "复制";
      }
      this.selectType("UnitValuationTypeEnum");
      let params = {
        id: id
      };
      dcpriceoiltradeInfo(params).then(res => {
        if (res.response) {
          that.modalForm = res.response;
          that.showSpec(that.modalForm.varietiesId);
          that.modalForm.unitValuationType =
            that.modalForm.unitValuationType + "";
          that.modalForm.isShow = that.modalForm.isShow + "";
          that.modalForm.isBenchmarkPrice =
            that.modalForm.isBenchmarkPrice + "";
          that.modalForm.isOilPrice = that.modalForm.isOilPrice + "";
          that.modalForm.isPetrifiedPrice =
            that.modalForm.isPetrifiedPrice + "";
          that.modalForm.isDrcPrice = that.modalForm.isDrcPrice + "";
          that.modalForm.isMysteel = that.modalForm.isMysteel + "";
          that.modalForm.checkUpsAndDown = parseInt(
            that.modalForm.checkUpsAndDown
          );
          that.$nextTick(() => {
            that.$refs.breedRef.getBreedData(
              that.modalForm.varietiesName
            );
            that.$refs.areaRef.getData(
              that.modalForm.regionId,
              that.modalForm.regionName
            );
          });
        } else {
          that.$Message.error(res.message);
        }
      });
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
        dcpriceoiltradeUpdatestatus(formData(form)).then(res => {
          this.getList();
          this.$Message.success("OK！");
        })
    },
    //查看
    viewModal(id) {
      this.addModal = true;
      this.editDetails(id);
      this.modalTitle = "查看";
      this.ftView = false;
    },
    //获取规格参数的数据
    specificationsVal(data) {
      if (data) {
        this.modalForm.specificationsId = data.value;
        this.modalForm.specificationsName = data.label;
      }
    },
    //获取计价单位的数据
    unitValuationVal(data) {
      if (data) {
        this.modalForm.unitValuationType = data.value;
        this.modalForm.unitValuationName = data.label;
      }
    },
    //获取品种模板类型
    templateTypeVal(data) {
      if (data) {
        this.modalForm.templateType = data.value;
        this.modalForm.templateTypeName = data.label;
      }
    },
    // 重置
    reset() {
      this.formItem = {
        id:"",
        varietiesName: "",
        specificationsName: "",
        regionName: "",
        id: "",
        mysteelCode: "",
        pageSize: 10,
        pageNum: 1
      };
      this.getList();
    },
    //取消按钮
    cancelbtn() {
      this.addModal = false;
      this.modalForm.memberAbbreviation = "";
      this.modalForm.isShow = "1";
      this.modalForm.isBenchmarkPrice = "1";
      this.modalForm.isOilPrice = "1";
      this.modalForm.isPetrifiedPrice = "1";
      this.modalForm.isDrcPrice = "1";
      this.$refs.breedRef.model = "";
      this.$refs.areaRef.model = "";
      this.$refs.modalForm.resetFields();
    },
    //打开新增窗口
    addbtn() {
      this.addModal = true;
      this.btnType = 1;
      this.ftView = true;
      this.modalForm.isMysteel = "0";
      this.modalTitle = "新增";
      this.selectType("UnitValuationTypeEnum");
    },
    //新增，复制，修改
    savebtn() {
      let that = this;
      let btnType = this.btnType;
      this.$refs.modalForm.validate(valid => {
        if (valid) {
          if (btnType == 1 || btnType == 3) {
            saveDcpriceoiltrade(this.modalForm).then(res => {
              this.addModal = false;
              if (res.status == 200) {
                that.$Message.success("添加成功！");
                //that.loading = false;
                that.cancelbtn();
                that.getList();
              } else {
                that.$Message.error(res.message);
              }
              setTimeout(() => {
                that.loading = false;
              }, 1000);
            });
          }
          if (btnType == 2) {
            updateDcpriceoiltrade(this.modalForm).then(res => {
              this.addModal = false;
              if (res.status == 200) {
                that.$Message.success("编辑成功！");
                //  that.loading = false;
                that.cancelbtn();
                that.getList();
              } else {
                that.$Message.error(res.message);
                //that.loading = false;
              }
              setTimeout(() => {
                //that.loading = false;
              }, 1000);
            });
          }
        } else {
          //that.loading = false;
        }
      });
    },
    breedFunction(data) {
      if (data) {
        this.modalForm.varietiesId = data.value;
        this.modalForm.varietiesName = data.label;
        this.showRelavantSpec(data.value);
      }
    },
    // 获取品种关联下拉列表
    showSpec(id) {
      let params = {
        breedId: id
      };
      getSpecList(formData(params)).then(res => {
        if (res.status == 200) {
          let obj = {};
          this.specificationsList = [];
          let arrList = res.response;
          for (let i = 0; i < arrList.length; i++) {
            let obj = {};
            obj.specificationsId = arrList[i].specId;
            obj.specificationsName = arrList[i].specName;
            this.specificationsList.push(obj);
          }
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    // 获取品种关联规格
    showRelavantSpec(id) {
      let params = {
        breedId: id
      };
      this.modalForm.specificationsId = "";
      this.modalForm.specificationsName = "";
      getSpecList(formData(params)).then(res => {
        if (res.status == 200) {
          let obj = {};
          this.specificationsList = [];
          let arrList = res.response;
          for (let i = 0; i < arrList.length; i++) {
            let obj = {};
            obj.specificationsId = arrList[i].specId;
            obj.specificationsName = arrList[i].specName;
            this.specificationsList.push(obj);
           // this.modalForm.specificationsId = obj.specificationsId;
           // this.modalForm.specificationsName = obj.specificationsName;
          }
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    areaFunction(data) {
      if (data) {
        this.modalForm.regionId = data.value;
        this.modalForm.regionName = data.label;
      }
    },
    pageChange(page, pageSize) {
      if (page) {
        this.formItem.pageNum = page;
      }
      if (pageSize) {
        this.formItem.pageSize = pageSize;
      }
      this.getList();
    }
  }
};
</script>
