<style lang="less" scoped>
.yuan {
  line-height: 36px;
  margin-left: 10px;
}
.search-input-li {
  width: 80% !important;
}
// .ivu-switch-loading:before{
//   display: none!important;
//   // left: 0!important;
// }
// .ivu-switch-checked:before{
// left: 0!important;
// }
</style>
<template>
  <Row>
    <Col span="24">
    <Row class-name="current-position">
      当前位置：数据中心&nbsp;&nbsp;>>&nbsp;&nbsp;国内市场价指标
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
        <FormItem label="价格类型:">
          <Select v-model="formItem.priceType" class="search-input" placeholder="全部">
            <Option v-for="item in priceTypeList" :value="item.value" :key="item.value">{{ item.desc }}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="规格名称:">
          <Input v-model="formItem.specificationsName" class="search-input" placeholder="请输入规格名称"></Input>
        </FormItem>
        </Col>
      </Row>
      <Row type="flex" justify="space-between">
        <Col span="7">
        <FormItem label="区域名称:">
          <Input v-model="formItem.regionName" class="search-input" placeholder="请输入区域名称"></Input>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="生产企业:">
          <Input v-model="formItem.memberName" class="search-input" placeholder="请输入生产企业"></Input>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="ID:" >
          <Input v-model="formItem.id" class="search-input" placeholder="请输入ID" @on-keyup="idBtn"></Input>
        </FormItem>
        </Col>
      </Row>
      <Row type="flex" justify="space-between">
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
      <Button type="primary" @click="addModal">添加</Button>
      <Table class="tableCommon mar-t-20" :data="tableData" :columns="columns" ref="dragTable" :stripe="true" :border="true">
      </Table>
      <oil-page :total="total" :page-num="formItem.pageNum" :page-size="formItem.pageSize" @page-change="pageChange" :page-size-opts="pageSizeOpts" :show-sizer="showSizer"></oil-page>
    </Row>
    </Col>

    <Modal v-model="modalVisible" :title="modalTitle" width="650" @on-cancel="cancelModal">
      <Form :label-width="180" ref="modalForm" :rules="addRoles" :model="modalForm">
        <Row>
          <FormItem label="品种名称" prop="varietiesId" v-show="ftView">
            <associate-Search @query-list="breedFunction" :dataUrl="urlBreed" ref="breedRef" class="form-select"></associate-Search>
          </FormItem>
          <!-- 只查看显示 -->
          <FormItem label="品种名称" class="search-input" v-show="!ftView">
            <Input :readonly="!ftView" v-model="modalForm.varietiesName"></Input>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="规格名称"  v-show="ftView">
            <Select v-model="modalForm.specificationsId" :labelInValue="true" @on-change="specificationsVal" class="search-input" transfer>
              <Option v-for="item in specificationsList" :value="item.specificationsId" :key="item.value">{{item.specificationsName}}</Option>
            </Select>
          </FormItem>
          <!-- 只查看显示 -->
          <FormItem label="规格名称" class="search-input" v-show="!ftView">
            <Input :readonly="!ftView" v-model="modalForm.specificationsName"></Input>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="区域名称" prop="regionId" v-show="ftView">
            <associate-Search @query-list="areaFunction" :dataUrl="urlArea" ref="areaRef" class="form-select"></associate-Search>
          </FormItem>
          <!-- 只查看显示 -->
          <FormItem label="区域名称" class="search-input" v-show="!ftView">
            <Input :readonly="!ftView" v-model="modalForm.regionName"></Input>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="自定义区域" prop="customRegion" v-show="ftView">
            <Input type="text" class="search-input" placeholder="请输入自定义区域" v-model="modalForm.customRegion" />
          </FormItem>
          <!-- 只查看显示 -->
          <FormItem label="自定义区域" class="search-input" v-show="!ftView">
            <Input :readonly="!ftView" v-model="modalForm.customRegion"></Input>
          </FormItem>
        </Row>
        <Row>
          <Col span="18">
          <FormItem label="生产企业名称"  v-show="ftView">
            <associate-Search @query-list="memberFunction" :dataUrl="urlMember" ref="memberRef" class="form-select"></associate-Search>
          </FormItem>
          <!-- <label style="max-width:33%;overflow:hidden;">{{modalForm.memberAbbreviation}}</label> -->
          <!-- 只查看显示 -->
          <FormItem label="生产企业名称" class="search-input" v-show="!ftView">
            <Input :readonly="!ftView" v-model="modalForm.memberName"></Input>
          </FormItem>
          </Col>
          <Col span="6">
          <div style="margin:10px 0px 0px 10px;" v-html="modalForm.memberAbbreviation"></div>
          </Col>
        </Row>
        <Row>
          <FormItem label="生产国家" prop="productState" v-show="ftView">
            <Input type="text" class="search-input" placeholder="请输入生产国家" v-model="modalForm.productState" />
          </FormItem>
          <!-- 只查看显示 -->
          <FormItem label="生产国家" class="search-input" v-show="!ftView">
            <Input :readonly="!ftView" v-model="modalForm.productState"></Input>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="市场名称" prop="internalMarketName" v-show="ftView">
            <Input type="text" class="search-input" placeholder="请输入市场名称" v-model="modalForm.internalMarketName" />
          </FormItem>
          <!-- 只查看显示 -->
          <FormItem label="市场名称" class="search-input" v-show="!ftView">
            <Input :readonly="!ftView" v-model="modalForm.internalMarketName"></Input>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="计价单位" prop="unitValuationType" v-show="ftView">
            <Select v-model="modalForm.unitValuationType" :labelInValue="true" @on-change="unitValuationVal" class="search-input" transfer>
              <Option v-for="item in unitValuationList" :value="item.value" :key="item.value">{{item.desc}}</Option>
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
                  <span style="display:inline-block"> 低端价: </span>
                  </Col>
                  <Col span="12">
                  <FormItem prop="lowDayCode" v-show="ftView">
                    <Input v-model="modalForm.lowDayCode" placeholder="请输入钢联CODE" type="text" class="search-input search-input-li" />
                  </FormItem>
                  <!-- 只查看显示 -->
                  <FormItem class="search-input" v-show="!ftView">
                    <Input :readonly="!ftView" v-model="modalForm.lowDayCode"></Input>
                  </FormItem>
                  </Col>
                </Row>
              </li>
              <li>
                <Row>
                  <Col span="6">
                  <span style="display:inline-block"> 高端价: </span>
                  </Col>
                  <Col span="12">
                  <FormItem prop="highDayCode" v-show="ftView">
                    <Input v-model="modalForm.highDayCode" placeholder="请输入钢联CODE" type="text" class="search-input search-input-li" />
                  </FormItem>
                  <!-- 只查看显示 -->
                  <FormItem class="search-input" v-show="!ftView">
                    <Input :readonly="!ftView" v-model="modalForm.highDayCode"></Input>
                  </FormItem>
                  </Col>
                </Row>
              </li>
              <li>
                <Row>
                  <Col span="6">
                  <span style="display:inline-block"> 市场价: </span>
                  </Col>
                  <Col span="12">
                  <FormItem prop="marketDayCode" v-show="ftView">
                    <Input v-model="modalForm.marketDayCode" placeholder="请输入钢联CODE" type="text" class="search-input search-input-li" />
                  </FormItem>
                  <!-- 只查看显示 -->
                  <FormItem class="search-input" v-show="!ftView">
                    <Input :readonly="!ftView" v-model="modalForm.marketDayCode"></Input>
                  </FormItem>
                  </Col>
                </Row>
              </li>
            </ul>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="检查涨跌幅：" prop="checkUpsAndDown" v-show="ftView">
            <InputNumber :max="1000" v-model="modalForm.checkUpsAndDown" :formatter="value => `${value}%`" :parser="value => value.replace('%', '')" class="search-input">
            </InputNumber>
          </FormItem>
          <!-- 只查看显示 -->
          <FormItem label="检查涨跌幅" class="search-input" v-show="!ftView">
            <InputNumber :readonly="!ftView" :max="1000" v-model="modalForm.checkUpsAndDown" :formatter="value => `${value}%`" :parser="value => value.replace('%', '')" class="search-input">
            </InputNumber>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="标准" prop="standard" v-show="ftView">
            <Input type="text" class="search-input" placeholder="请输入标准" v-model="modalForm.standard" />
          </FormItem>
          <!-- 只查看显示 -->
          <FormItem label="标准" class="search-input" v-show="!ftView">
            <Input :readonly="!ftView" v-model="modalForm.standard"></Input>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="价格类型" prop="priceType" v-show="ftView">
            <Select v-model="modalForm.priceType" :labelInValue="true" @on-change="priceTypeVal" class="search-input" transfer>
              <Option v-for="item in priceTypeList" :value="item.value" :key="item.value">{{item.desc}}</Option>
            </Select>
          </FormItem>
          <!-- 只查看显示 -->
          <FormItem label="价格类型" class="search-input" v-show="!ftView">
            <Input :readonly="!ftView" v-model="modalForm.priceTypeName"></Input>
          </FormItem>
        </Row>
        <Row>
          <Col span="19">
          <FormItem label="品种模板类型：" prop="templateType" v-show="ftView">
            <Select v-model="modalForm.templateType" :disabled="isDisable" :labelInValue="true" @on-change="templateTypeVal" class="search-input" transfer>
              <Option v-for="item in templateTypeList" :value="item.value" :key="item.value">{{item.desc}}</Option>
            </Select>
          </FormItem>
          <!-- 只查看显示 -->
          <FormItem label="品种模板类型" class="search-input" v-show="!ftView">
            <Input :readonly="!ftView" v-model="modalForm.templateTypeName"></Input>
          </FormItem>
          </Col>
          <Col span="4" style="margin-left:5px" v-show="isDisableBtn">
          <Button type="primary" @click="showselect">修改</Button>
          </Col>
        </Row>
        <Row>
          <FormItem label="显示产品">
            <RadioGroup v-model="modalForm.isShow">
              <Radio :disabled="!ftView" label="0">是</Radio>
              <Radio :disabled="!ftView" label="1">否</Radio>
            </RadioGroup>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="定价基准">
            <RadioGroup v-model="modalForm.isBenchmarkPrice">
              <Radio :disabled="!ftView" label="0">是</Radio>
              <Radio :disabled="!ftView" label="1">否</Radio>
            </RadioGroup>
          </FormItem>

        </Row>
        <Row>
          <FormItem label="显示低端价">
            <RadioGroup v-model="modalForm.isLowPrice">
              <Radio :disabled="!ftView" label="0">是</Radio>
              <Radio :disabled="!ftView" label="1">否</Radio>
            </RadioGroup>
          </FormItem>

        </Row>
        <Row>
          <FormItem label="显示高端价">
            <RadioGroup v-model="modalForm.isMiddlePrice">
              <Radio :disabled="!ftView" label="0">是</Radio>
              <Radio :disabled="!ftView" label="1">否</Radio>
            </RadioGroup>
          </FormItem>

        </Row>
        <Row>
          <FormItem label="显示市场价">
            <RadioGroup v-model="modalForm.isMarketPrice">
              <Radio :disabled="!ftView" label="0">是</Radio>
              <Radio :disabled="!ftView" label="1">否</Radio>
            </RadioGroup>
          </FormItem>
        </Row>
      </Form>
      <div slot="footer" v-show="ftView">
        <i-button type="primary" @click="saveModal">保存</i-button>
        <i-button type="default" @click="cancelModal">取消</i-button>
      </div>
    </Modal>
  </Row>
</template>
<script>
import {
  getDcpricedomesticList,
  getSelectDataCenter,
  getDetal,
  saveDcpricedomestic,
  upadateDcpricedomestic,
  getSpecList,
  dataCenterCodeUniq,
  showRelavantmodel,
  dcpricedomesticUpdatestatus
} from "../../components/axios/dataCenter.js";
import oilPage from "../../components/page/page.vue";
import { formatTime2, formData } from "../../../assets/js/common.js";
import associateSearch from "../../components/associateSearch/associateSearchDataCenter.vue";
export default {
  components: {
    associateSearch,
    oilPage
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

    // const validateSpecificationsId = (rule, value, callback) => {
    //   let specificationsId = this.modalForm.specificationsId;
    //   let templateTypeName =
    //     this.modalForm.templateTypeName == undefined
    //       ? ""
    //       : this.modalForm.templateTypeName;
    //   if (!specificationsId && templateTypeName.indexOf("规格") > -1) {
    //     callback("规格名称不能为空");
    //   } else {
    //     callback();
    //   }
    // };

    const validateRegionId = (rule, value, callback) => {
      var regionId = this.modalForm.regionId;
      if (!regionId) {
        callback("区域名称不能为空");
      } else {
        callback();
      }
    };
    // const validateMemberId = (rule, value, callback) => {
    //   var memberId = this.modalForm.memberId;
    //   if (!memberId) {
    //     callback("企业名称不能为空");
    //   } else {
    //     callback();
    //   }
    // };
    const validateTemplateTypeId = (rule, value, callback) => {
      var templateTypeId = this.modalForm.templateType;
      if (!templateTypeId) {
        callback("模板类型不能为空");
      } else {
        callback();
      }
    };

    //输入code框失去焦点事件 验证code唯一性
    const onBlurCode = (rule, value, callback) => {
      let code = "";
      if (rule.field == "lowDayCode") {
        code = this.modalForm.lowDayCode;
      }
      if (rule.field == "highDayCode") {
        code = this.modalForm.highDayCode;
      }
      if (rule.field == "marketDayCode") {
        code = this.modalForm.marketDayCode;
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
      modalVisible: false,
      // loading: false,
      treeModel: false,
      isDisable: false,
      isDisableBtn: false,
      ftView: true,
      modalTitle: "",
      btnType: 1,
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
        //     required: false,
        //     validator: validateSpecificationsId,
        //     trigger: "blur"
        //   }
        // ],
        regionId: [
          {
            required: true,
            validator: validateRegionId,
            trigger: "change"
          }
        ],
        // memberId: [
        //   {
        //     required: true,
        //     validator: validateMemberId,
        //     trigger: "change"
        //   }
        // ],
        internalMarketName: [
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
          }
        ],
        lowDayCode: [
          {
            required: true,
            validator: onBlurCode,
            trigger: "blur"
          }
        ],
        highDayCode: [
          {
            required: true,
            validator: onBlurCode,
            trigger: "blur"
          }
        ],
        marketDayCode: [
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
        ],
        priceType: [
          {
            required: true,
            message: "价格类型不能为空",
            trigger: "change"
          }
        ],
        templateType: [
          {
            required: true,
            validator: validateTemplateTypeId,
            trigger: "change"
          }
        ]
      },
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
      modalForm: {
        varietiesId: null,
        varietiesName: "",
        specificationsId: null,
        specificationsName: "",
        regionId: null,
        regionName: "",
        productState: "",
        customRegion: "",
        memberId: null,
        memberName: "",
        memberAbbreviation: "",
        internalMarketName: "",
        unitValuationType: null,
        unitValuationName: "",
        isMysteel: 0,
        checkUpsAndDown: 0,
        priceType: null,
        priceTypeName: "",
        templateTypeName: "",
        isShow: "1",
        isBenchmarkPrice: "1",
        isLowPrice: "1",
        isMiddlePrice: "1",
        isMarketPrice: "1",
        lowDayCode: "",
        highDayCode: "",
        marketDayCode: ""
      },
      editId: "",
      priceTypeList: [],
      templateTypeList: [],
      unitValuationList: [],
      specificationsList: [],
      urlBreed: "/datacenter/dataCenter/breedList",
      urlMember: "/datacenter/dataCenter/memberList",
      urlArea: "/datacenter/dataCenter/areaList",
      formItemId:'', //正则替换
      formItem: {
        id:"",
        varietiesName: "",
        priceType: null,
        specificationsName: "",
        regionName: "",
        memberName: "",
        mysteelCode: "",
        standard:'',
        pageSize: 10,
        pageNum: 1
      },
      tableData: [],
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
          minWidth: 140
        },
        {
          key: "specificationsName",
          align: "center",
          title: "规格名称",
          minWidth: 140
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
          key: "memberAbbreviation",
          align: "center",
          title: "生产企业名称",
          minWidth: 140
        },
        {
          key: "internalMarketName",
          align: "center",
          title: "市场名称",
          minWidth: 140
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
          key: "lowDayCode",
          align: "center",
          title: "低端价",
          minWidth: 140
        },
        {
          key: "highDayCode",
          align: "center",
          title: "高端价",
          minWidth: 140
        },
        {
          key: "marketDayCode",
          align: "center",
          title: "市场价",
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
          width: 100,
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
        // {
        //   key: "lastAccess",
        //   align: "center",
        //   title: "修改日期",
        //   minWidth: 100,
        //   render: function(h, params) {
        //     return h("div", formatTime2(params.row.lastAccess));
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
                // loading: data.row.isShow == 0 ? true : false,
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
                      this.showModal(data.row.id);
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
                      this.showModal(data.row.id);
                    }
                  }
                },
                "复制"
              )
            ]);
          }
        }
      ],
      total: 0,
      pageSize: 10,
      pageNum: 1,
      showSizer: true,
      pageSizeOpts: [5, 10, 20, 30]
    };
  },
  created() {
    this.getList();
    this.selectType("PriceTypeEnum");
  },
  methods: {
    idBtn(){ //让Input组件只能输入数字
      if(typeof(this.formItem.id)=='number'){
        this.formItem.id = this.formItem.id
      }else if(this.formItem.id==''){
        this.formItem.id=''
      }else{
        this.formItem.id = this.formItem.id.replace(/[^0-9]+/g,'')
      }
    },
    search() {
      this.formItem.pageNum = 1;
      this.formItem.pageSize = 10;
      this.getList();
    },
    getList() {
      if(this.formItem.id==''){
        this.formItem.id = this.formItem.id
      }else{
        this.formItem.id = Number(this.formItem.id)
      }
      getDcpricedomesticList(this.formItem).then(res => {
        if (res.response) {
          this.tableData = res.response.list;
          this.total = res.response.total;
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    selectType(type) {
      let that = this;
      let params = {
        type: type
      };
      getSelectDataCenter(params).then(res => {
        if (res.response) {
          if (type == "PriceTypeEnum") {
            that.priceTypeList = res.response;
          }
          if (type == "UnitValuationTypeEnum") {
            that.unitValuationList = res.response;
          }
          if (type == "MarketPriceTemplateTypeEnum") {
            that.templateTypeList = res.response;
          }
        } else {
          that.$Message.error(res.message);
        }
      });
    },
    addModal() {
      this.btnType = 1;
      this.modalTitle = "新增";
      this.modalVisible = true;
      this.isDisableBtn = false;
      this.modalForm.isMysteel = "0";
      this.ftView = true;
      this.selectType("UnitValuationTypeEnum");
      this.selectType("PriceTypeEnum");
      this.selectType("MarketPriceTemplateTypeEnum");
    },
    viewModal(id) {
      this.modalVisible = true;
      this.showModal(id);
      this.modalTitle = "查看";
      this.isDisableBtn = false;
      this.ftView = false;
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
        dcpricedomesticUpdatestatus(formData(form)).then(res => {
          this.getList();
          this.$Message.success("OK！");
        })
    },
    //点击修改
    showselect() {
      this.isDisable = false;
    },
    showModal(id) {
      let that = this;
      that.isDisable = true;
      if (this.btnType == 2) {
        that.modalTitle = "编辑";
        that.isDisableBtn = true;
        that.editId = id;
      }
      if (this.btnType == 3) {
        that.modalTitle = "复制";
        that.isDisableBtn = false;
      }
      that.modalVisible = true;

      this.ftView = true;

      // 获取品种名称
      that.selectType("UnitValuationTypeEnum");
      that.selectType("PriceTypeEnum");
      that.selectType("MarketPriceTemplateTypeEnum");
      let params = {
        id: id
      };
      getDetal(params).then(res => {
        if (res.response) {
          that.modalForm = res.response;
          that.showSpec(that.modalForm.varietiesId);
          that.modalForm.priceType = that.modalForm.priceType + "";
          that.modalForm.templateType = that.modalForm.templateType + "";
          that.modalForm.unitValuationType =
            that.modalForm.unitValuationType + "";
          that.modalForm.isShow = that.modalForm.isShow + "";
          that.modalForm.isBenchmarkPrice =
            that.modalForm.isBenchmarkPrice + "";
          that.modalForm.isLowPrice = that.modalForm.isLowPrice + "";
          that.modalForm.isMiddlePrice = that.modalForm.isMiddlePrice + "";
          that.modalForm.isMarketPrice = that.modalForm.isMarketPrice + "";
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
            that.$refs.memberRef.getData(
              that.modalForm.memberId,
              that.modalForm.memberName
            );
          });
        } else {
          that.$Message.error(res.message);
        }
      });
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
    //获取价格类型的数据
    priceTypeVal(data) {
      if (data) {
        this.modalForm.priceType = data.value;
        this.modalForm.priceTypeName = data.label;
      }
    },
    //获取品种模板类型
    templateTypeVal(data) {
      if (data) {
        this.modalForm.templateType = data.value;
        this.modalForm.templateTypeName = data.label;
      }
    },
    reset() {
      this.formItem = {
        id:"",
        varietiesName: "",
        priceType: null,
        specificationsName: "",
        regionName: "",
        memberName: "",
        mysteelCode: "",
        pageSize: 10,
        pageNum: 1
      };
      this.getList();
    },
    cancelModal() {
      this.modalVisible = false;
      // this.modalForm = {};
      this.modalForm.memberAbbreviation = "";
      this.modalForm.isShow = "1";
      this.modalForm.isBenchmarkPrice = "1";
      this.modalForm.isLowPrice = "1";
      this.modalForm.isMiddlePrice = "1";
      this.modalForm.isMarketPrice = "1";
      this.modalForm.memberAbbreviation = "";
      this.$refs.breedRef.model = "";
      this.$refs.areaRef.model = "";
      this.$refs.memberRef.model = "";
      this.$refs.modalForm.resetFields();
    },
    saveModal() {
      let that = this;
      //that.loading = false;
      // if (
      //   this.modalForm.templateTypeName.indexOf("国家") &&
      //   !this.modalForm.productState
      // ) {
      //   that.$Message.warning("请输入生产国家");
      // }
      that.$refs.modalForm.validate(valid => {
        if (valid) {
          if (that.btnType == 1 || that.btnType == 3) {
            saveDcpricedomestic(this.modalForm).then(res => {
              that.modalVisible = false;
              if (res.status == 200) {
                that.$Message.success("添加成功！");
                that.cancelModal();
                //that.loading = false;
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
          if (that.btnType == 2) {
            upadateDcpricedomestic(this.modalForm).then(res => {
              that.modalVisible = false;
              if (res.status == 200) {
                that.$Message.success("编辑成功！");
                that.cancelModal();
                //that.loading = false;
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
    // 获取品种
    breedFunction(data) {
      if (data) {
        this.modalForm.varietiesId = data.value;
        this.modalForm.varietiesName = data.label;
        this.showRelavantSpec(data.value);
        this.showRelavantmodel(data.value);
      }
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
            //this.modalForm.specificationsId = obj.specificationsId;
            //this.modalForm.specificationsName = obj.specificationsName;
          }
        } else {
          this.$Message.error(res.message);
        }
      });
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
    // 获取品种关联模板
    showRelavantmodel(id) {
      let params = {
        varietiesId: id
      };
      showRelavantmodel(formData(params)).then(res => {
        if (res.status == 200) {
          if (res.response.status == 1) {
            this.isDisable = true;
            this.modalForm.templateType = res.response.templateType + "";
            this.modalForm.templateTypeName = res.response.templateTypeName;
            //this.$refs.modalForm.validateField("templateType");
          } else {
            this.isDisable = false;
          }
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    memberFunction(data) {
      if (data) {
        this.modalForm.memberId = data.value;
        let memberName = data.label;
        if (memberName) {
          let memberArr = memberName.split("-");
          this.modalForm.memberName = memberArr[0];
          this.modalForm.memberAbbreviation = memberArr[1];
        }
      }
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
