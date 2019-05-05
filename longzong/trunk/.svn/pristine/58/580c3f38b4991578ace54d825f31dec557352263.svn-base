<style lang="less" scoped>
.yuan {
  line-height: 36px;
  margin-left: 10px;
}
</style>
<template>
  <Row>
    <Col span="24">
    <Row class-name="current-position">
      当前位置：数据中心&nbsp;&nbsp;>>&nbsp;&nbsp;基准价指标
    </Row>
    </Col>
    <Col span="24" class-name="search-form">
    <Form :model="formItem" :label-width="100">
      <Row type="flex" justify="space-between">
        <Col span="7">
        <FormItem label="品种名称:">
          <Input placeholder="请输入品种名称" v-model="formItem.varietiesName" class="search-input"></Input>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="规格名称:">
          <Input placeholder="请输入规格名称" v-model="formItem.specificationsName" class="search-input"></Input>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="区域名称:">
          <!-- <Select @on-query-change="searchKeyCity" placeholder="请输入区域名称" v-model="formItem.regionId" filterable class="search-input" :labelInValue="true">
                  <Option v-for="item in areaList" :value="item.id" :key="item.id">{{ item.text }}</Option>
             </Select> -->
          <Input v-model="formItem.regionName" class="search-input" placeholder="请输入区域名称"></Input>
        </FormItem>
        </Col>
      </Row>
      <Row type="flex" justify="space-between">
        <Col span="7">
        <FormItem label="ID:">
         <Input v-model="formItem.id" class="search-input" placeholder="请输入ID" @on-keyup="idBtn"></Input>
        </FormItem>
        </Col>
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
        <Col span="24" class="text-right">
          <!-- <Col span="7">
            <FormItem label="标准:">
              <Input class="search-input" placeholder="请输入标准" v-model="formItem.standard"></Input>
            </FormItem>
          </Col> -->
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
      <Table class="tableCommon mar-t-20" :data="tableData" :columns="columns" ref="dragTable" :stripe="true" :border="true">
      </Table>
      <oil-page :total="total" :page-num="formItem.pageNum" :page-size="formItem.pageSize" @page-change="pageChange" :page-size-opts="pageSizeOpts" :show-sizer="showSizer">
      </oil-page>
    </Row>
    </Col>
    <!-- 新增 -->
    <Modal v-model="addModal" :title="titleName" width="650" :styles="{top: '20px'}">
      <Row>
        <Form :label-width="146" ref="addForm" :rules="addRoles" :model="addForm">
          <Col span="24">
          <FormItem label="品种名称" prop="pzName" v-show="ftView">
            <Select @on-change="specQueryKey" ref="breedRef" filterable class="search-input" v-model="addForm.varietiesId" :labelInValue="true" style="width:100%;">
              <Option v-for="item in breedList" :value="item.id" :key="item.id">{{ item.text }}</Option>
            </Select>
          </FormItem>
          <!-- 只查看显示 -->
          <FormItem label="品种名称" class="search-input" v-show="!ftView">
            <Input :readonly="!ftView" v-model="addForm.varietiesName"></Input>
          </FormItem>
          </Col>
          <Col span="24">
          <FormItem label="规格名称"  v-show="ftView">
            <Select @on-change="getSpecName" class="search-input" v-model="addForm.specificationsId" :labelInValue="true">
              <Option v-for="item in specList" :value="item.specId" :key="item.specId">{{ item.specName }}</Option>
            </Select>
          </FormItem>
          <!-- 只查看显示 -->
          <FormItem label="规格名称" class="search-input" v-show="!ftView">
            <Input :readonly="!ftView" v-model="addForm.specificationsName"></Input>
          </FormItem>
          </Col>
          <Col span="24">
          <FormItem label="区域名称" prop="qyName" v-show="ftView">
            <Select @on-query-change="searchKeyCity" @on-change="getCityName" v-model="addForm.regionId" filterable class="search-input" :labelInValue="true">
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
            <Input :readonly="!ftView" type="text" class="search-input" placeholder="请输入自定义区域" v-model="addForm.customRegion" />
          </FormItem>
          </Col>
          <Col span="24">
          <FormItem label="计价单位" prop="jjName" v-show="ftView">
            <Select :disabled="titleName=='查看'? true:false" @on-change="getUnitName" v-model="addForm.unitValuationType" :labelInValue="true" class="search-input">
              <Option v-for="item in unitPriceType" :value="item.value" :key="item.value">{{item.desc}}</Option>
            </Select>
          </FormItem>
          <!-- 只查看显示 -->
          <FormItem label="计价单位" class="search-input" v-show="!ftView">
            <Input :readonly="!ftView" v-model="addForm.unitValuationName"></Input>
          </FormItem>
          </Col>
          <Col span="24">
          <FormItem label="钢联数据中心CODE">
            <RadioGroup v-model="addForm.isMysteel" @on-change="radioChange">
              <Radio :disabled="titleName=='查看'? true:false" label="0">是</Radio>
              <Radio :disabled="titleName=='查看'? true:false" label="1">否</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem class="search-input" label="价格" v-show="ftView" prop="dataDayName">
            <Input type="text" style="width:66%;" placeholder="输入钢联CODE" :autofocus="codeFocus" :disabled="titleName=='查看'? true:false" v-model="addForm.dayCode"></Input>
          </FormItem>
          <!-- 只查看显示 -->
          <FormItem label="价格" v-show="!ftView" v-if="addForm.isMysteel==0 ? true:false">
            <Input class="search-input" :readonly="!ftView" v-model="addForm.dayCode" style="width:66%"></Input>
          </FormItem>
          </Col>
          <Col span="24">
          <FormItem label="检查涨跌幅" prop="checkUpName">
            <InputNumber :readonly="!ftView" :min="0" :max="100" v-model="addForm.checkUpsAndDown" :formatter="value => `${value}%`" :parser="value => value.replace('%', '')" class="search-input"></InputNumber>
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
        <Button type="primary" @click="saveForm">保存</Button>
        <Button type="default" @click="addModal=false">取消</Button>
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
import {
  getAreaList,
  getSpecList,
  getDataCenterBreedList,
  dataCenterCodeUniq,
  updateBasePriceTable,
  saveBasePriceTable,
  getBaseMes,
  basePriceList,
  getSelectDataCenter,
  dcpricebaseUpdatestatus
} from "../../components/axios/dataCenter.js";
export default {
  name: "benchmarkPriceIndex",
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
    //   if (this.addForm.specificationsId) {
    //     callback();
    //   } else {
    //     callback(new Error(rule.message));
    //   }
    // };
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
    //   console.log(rule, value);
    //   let vals = this.addForm.dayCode;
    //   let ids = this.addForm.id;
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
    const ratepayingDn = (rule, value, callback) => {
      console.log(rule, value);
      if (this.addForm.checkUpsAndDown) {
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
        //     trigger: "change"
        //   }
        // ],
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
            validator: ratepayingDn,
            message: "涨跌幅不能为空",
            trigger: "blur"
          }
        ]
      },
      codeFocus: false,
      options1: [
        {
          name: "name",
          id: "213"
        }
      ],
      ftView: true,
      titleName: "查看",
      addModal: false,
      unitPriceType: [],
      tableData: [],
      totalAmount: 1000,
      total: 0,
      pageSize: 10,
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
        monthCode: "",
        operatorId: 0,
        operatorName: "",
        regionId: 0,
        regionName: "",
        sign: "",
        specificationsId: 0,
        specificationsName: "",
        unitValuationName: "",
        unitValuationType: 0,
        varietiesId: 0,
        varietiesName: "",
        version: 0,
        weekCode: "",
        yearCode: ""
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
      priceList: [],
      showSizer: true,
      pageSizeOpts: [5, 10, 20, 30],
      formItem: {
        code: "",
        id: null,
        pageNum: 1,
        pageSize: 10,
        regionId: null,
        regionName: "",
        sign: "",
        //standard:'',
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
          minWidth: 80
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
          key: "unitValuationName",
          align: "center",
          title: "计价单位",
          minWidth: 80
        },
        {
          key: "dayCode",
          align: "center",
          title: "价格",
          minWidth: 140
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
          width: 95
        }, 
        {
          key: "checkUpsAndDown",
          align: "center",
          title: "检查涨跌幅",
          minWidth: 80,
          render: (h, data) => {
            let label = "";
            if(data.row.checkUpsAndDown){
                  label= data.row.checkUpsAndDown + "%"
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
          key: "accountNo",
          align: "center",
          title: "最后报价",
          minWidth: 100
        },
        // {
        //   key: "lastAccess",
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
                value: data.row.isStart == 0 ? true : false
              },
              style:{
                
              },
              'class':data.row.isShow == 0 ? 'ivu-switch-checked':'',
              on: {
                'on-change': (event)=> {     
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
                    cursor: "pointer",
                    color: "blue"
                  },
                  on: {
                    click: () => {
                      this.addModal = true;
                      this.titleName = "查看";
                      this.ftView = false;
                      this.getBaseMessage(data.row.id);
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
                    cursor: "pointer",
                    color: "blue"
                  },
                  on: {
                    click: () => {
                      this.addModal = true;
                      this.$refs.addForm.resetFields();
                      this.ftView = true;
                      this.titleName = "编辑";
                      this.getBaseMessage(data.row.id);
                    }
                  }
                },
                "编辑"
              ),
              h(
                "span",
                {
                  style: {
                    cursor: "pointer",
                    color: "blue"
                  },
                  on: {
                    click: () => {
                      this.addModal = true;
                      this.$refs.addForm.resetFields();
                      this.ftView = true;
                      this.titleName = "复制";
                      this.getBaseMessage(data.row.id);
                    }
                  }
                },
                "复制"
              )
            ]);
          }
        }
      ],
      breedList: [],
      specList: [],
      areaList: [],
      riseList: []
    };
  },
  created() {
    this.getList();
    this.publicTotalPrice();
    this.getPublicType();
  },
  methods: {
    search() {
      this.formItem.pageNum = 1;
      this.formItem.pageSize = 10;
      this.getList();
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
    //关键字查询地区
    searchKeyCity(str) {
      console.log(str);
      getAreaList(formData({ name: str })).then(res => {
        this.areaList = res.response;
      });
    },
    //规格名称name
    getSpecName(pn) {
      console.log(pn);
      this.addForm.specificationsName = pn.label;
    },
    //计价单位name
    getUnitName(un) {
      console.log(un);
      this.addForm.unitValuationName = un.label;
    },
    //获取选中区域的name值
    getCityName(na) {
      console.log(na);
      this.addForm.regionName = na.label;
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
    //规格列表 公共接口
    specQueryKey(vals) {
      this.addForm.varietiesName = vals.label;
      this.addForm.specificationsId = "";
      this.addForm.specificationsName = "";
      //通过breedId查询规格api数据
      getSpecList(formData({ breedId: vals.value })).then(resp => {
        if (resp.status == "200") {
          //number type
          this.specList = resp.response;
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
        dcpricebaseUpdatestatus(formData(form)).then(res => {
          this.getList();
          this.$Message.success("OK！");
        })
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
    //区域接口 公共接口
    queryKeyCode(vals) {
      getAreaList(formData({ name: vals })).then(res => {
        console.log(res);
        if (res.status == "200") {
          //number type
          this.areaList = res.response;
        }
      });
    },
    //公用数据 品种接口
    getPublicType(str) {
      let nameStr = str ? str : " ";
      getDataCenterBreedList(formData({ name: nameStr })).then(res => {
        if (res.status == "200") {
          this.breedList = res.response;
        }
      });
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
              //this.$Message.warning("code已存在请重填！");
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
        dataCenterCodeUniq(formData({ code: vals, id: "" })).then(res => {
          if (res.status == "200" && res.response == 0) {
            //this.$Message.success("此code可以使用！");
          } else if (res.status == "200" && res.response == 1) {
            //this.$Message.warning("code已存在请重填！");
            let that = this;
            setTimeout(function() {
              that.codeFocus = true;
            }, 1500);
          }
        });
      }
    },
    //save Form保存按钮
    saveForm() {
      this.addForm.varietiesName = this.$refs.breedRef.values[0].label;
      this.$refs.addForm.validate(valid => {
        console.log(valid);
        if (valid) {
          if (this.titleName == "编辑") {
            let formObj = {
              checkUpsAndDown: this.addForm.checkUpsAndDown,
              createTime: this.addForm.createTime,
              creatorId: this.addForm.creatorId,
              creatorName: this.addForm.creatorName,
              customRegion: this.addForm.customRegion,
              dayCode: this.addForm.dayCode,
              id: this.addForm.id,
              isMysteel: this.addForm.isMysteel,
              isShow: this.addForm.isShow,
              lastAccess: formatStamp(this.addForm.lastAccess),
              monthCode: null,
              operatorId: this.addForm.operatorId,
              operatorName: this.addForm.operatorName,
              regionId: this.addForm.regionId,
              regionName: this.addForm.regionName,
              sign: "",
              specificationsId: this.addForm.specificationsId,
              specificationsName: this.addForm.specificationsName,
              unitValuationName: this.addForm.unitValuationName,
              unitValuationType: this.addForm.unitValuationType,
              varietiesId: this.addForm.varietiesId,
              varietiesName: this.addForm.varietiesName,
              version: this.addForm.version,
              weekCode: "",
              yearCode: ""
            };
            //调用修改接口
            updateBasePriceTable(formObj).then(resp => {
              if (resp.status == "200" && resp.message == "OK") {
                this.$Message.success("编辑成功！");
                this.addModal = false;
                this.getList();
              } else {
                this.$Message.warning("编辑失败！");
              }
            });
          } else {
            let formObj = {
              checkUpsAndDown: this.addForm.checkUpsAndDown,
              createTime: this.addForm.createTime,
              creatorId: this.addForm.creatorId,
              creatorName: this.addForm.creatorName,
              customRegion: this.addForm.customRegion,
              dayCode: this.addForm.dayCode,
              isMysteel: this.addForm.isMysteel,
              isShow: this.addForm.isShow,
              lastAccess: formatStamp(this.addForm.lastAccess),
              monthCode: null,
              operatorId: this.addForm.operatorId,
              operatorName: this.addForm.operatorName,
              regionId: this.addForm.regionId,
              regionName: this.addForm.regionName,
              sign: "",
              specificationsId: this.addForm.specificationsId,
              specificationsName: this.addForm.specificationsName,
              unitValuationName: this.addForm.unitValuationName,
              unitValuationType: this.addForm.unitValuationType,
              varietiesId: this.addForm.varietiesId,
              varietiesName: this.addForm.varietiesName,
              weekCode: "",
              yearCode: ""
            };
            //调用新增接口
            saveBasePriceTable(formObj).then(resp => {
              if (resp.status == "200" && resp.message == "OK") {
                this.$Message.success("添加成功！");
                this.addModal = false;
                this.getList();
              } else {
                this.$Message.warning("添加失败！");
              }
            });
          }
        } else {
          return false;
        }
      });
      this.getList();
    },
    //公用接口 计价单位
    publicTotalPrice() {
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
      //调用计价单位 api
      getSelectDataCenter({ type: "UnitValuationTypeEnum" }).then(res => {
        console.log(res);
        if (res.status == "200") {
          res.response.map((ar, v, arr) => {
            arr[v].value = Number(ar.value);
            return arr;
          });
          this.priceList = res.response;
        }
      });
    },
    //通过id获取表信息
    getBaseMessage(dataID) {
      //根据id获取基准价指标表api
       this.addForm.specificationsId = "";
        this.editId = dataID;
      getBaseMes({ id: dataID }).then(res => {
        if(res.response.checkUpsAndDown){
          res.response.checkUpsAndDown = parseInt(res.response.checkUpsAndDown)
        }else{
          res.response.checkUpsAndDown = 0
        }
        console.log(res);
        if (res.status == "200") {
         let breedId = res.response.varietiesId;
         if(breedId){
          this.getSpec(breedId);
         }
          if (res.response.isMysteel == 0) {
            res.response.isMysteel = "0";
          } else {
            res.response.isMysteel = "1";
          }

          if (res.response.isShow == 0) {
            res.response.isShow = "0";
          } else {
            res.response.isShow = "1";
          }
          this.areaList = [
            {
              id: res.response.regionId,
              text: res.response.regionName
            }
          ];

          // this.specList = [
          //   {
          //     specId: res.response.specificationsId,
          //     specName: res.response.specificationsName
          //   }
          // ];
          this.addForm = res.response;
        }
      });
    },
    getSpec(breedId){
        getSpecList(formData({ breedId: breedId})).then(res => {
        if (res.status == "200") {
          res.response.map((ar, v, arr) => {
            arr[v].value = Number(ar.value);
            return arr;
          });
         if (res.response.length > 0) {
            this.specList = res.response;
          } else {
            this.specList = [];
          }
        }
      });
    },
    //新增按钮
    addbtn() {
      this.addModal = true;
      this.titleName = "新增";
      this.ftView = true;
      this.addForm = {
        checkUpsAndDown: "0",
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
        unitValuationName: "",
        unitValuationType: 0,
        varietiesId: 0,
        varietiesName: "",
        version: 0,
        weekCode: "",
        yearCode: ""
      };
      this.$refs.addForm.resetFields();
    },
    // 获取列表
    getList() {
      let obj = {
        code: this.formItem.code,
        id: this.formItem.id ? Number(this.formItem.id) : null,
        pageNum: this.formItem.pageNum,
        pageSize: this.formItem.pageSize,
        //"regionId": this.formItem.regionId,
        regionName: this.formItem.regionName,
        sign: "",
        //standard:this.formItem.standard,
        specificationsId: this.formItem.specificationsId,
        specificationsName: this.formItem.specificationsName,
        varietiesId: this.formItem.varietiesId,
        varietiesName: this.formItem.varietiesName,
        isStart: this.formItem.isStart
      };
      basePriceList(obj).then(res => {
        if ((res.status = "200")) {
          this.tableData = res.response.list;
          this.total = res.response.total;
        }
      });
    },
    // 重置
    reset() {
      this.formItem = {
        code: "",
        id: null,
        pageNum: 1,
        pageSize: 10,
        regionId: null,
        regionName: "",
        sign: "",
        specificationsId: null,
        specificationsName: "",
        varietiesId: null,
        varietiesName: ""
      };
      this.getList();
    },
    //翻页事件
    pageChange(page, pageSize) {
      if (page) {
        this.formItem.pageNum = page;
      }
      if (pageSize) {
        this.formItem.pageSize = pageSize;
      }
      this.getList();
    }
  },
  components: {
    OilPage
  }
};
</script>
