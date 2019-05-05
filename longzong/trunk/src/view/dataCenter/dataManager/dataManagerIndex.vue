<style>

</style>
<template>
    <Row>
        <Col span="24">
        </Col>
        <Col span="24" class-name="search-form">
            <Form :model="form" :label-width="120">
                <Row type="flex" justify="space-between">
                    <Col span='7'>
                        <FormItem label="指标类型:" :label-width="100">
                            <Select v-model="form.indexType" @on-change="changePrice(form.indexType)">
                                <Option v-for="item in indexTypeList" :value="item.value" :key="item.value" >{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span='7'>
                        <FormItem label="品种名称:" :label-width="100">
                            <Input type="text" v-model="form.varietiesName" class="search-input"></Input>
                        </FormItem>
                    </Col>
                    <Col span='7'>
                        <FormItem label="价格类型:" :label-width="100">
                            <Select v-model="form.priceType" placeholder="全部">
                                <Option v-for="item in priceTypeList" :value="item.value" :key="item.value">{{ item.desc }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex" justify="space-between">
                    <Col span='7'>
                        <FormItem label="规格名称:" :label-width="100">
                            <Input type="text" v-model="form.specificationsName" class="search-input"></Input>
                        </FormItem>
                    </Col>
                    <Col span='7'>
                        <FormItem label="区域名称:" :label-width="100">
                            <Input type="text" v-model="form.likeRegionName" class="search-input"></Input>
                        </FormItem>
                    </Col>
                    <Col span='7'>
                        <FormItem label="生产企业:" :label-width="100">
                            <Input type="text" v-model="form.memberName" class="search-input"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex" justify="space-between">
                    <Col span='7'>
                        <FormItem label="ID:" :label-width="100">
                            <Input type="text" v-model="form.id" class="search-input" @on-keyup="idBtn"></Input>
                        </FormItem>
                    </Col>
                     <Col span='7'>
                        <FormItem label="钢联ID:" :label-width="100">
                            <Input type="text" v-model="form.mysteelCode" class="search-input"></Input>
                        </FormItem>
                    </Col>
                    <Col span='7'>
                        <FormItem label="选择时间:" :label-width="100">
                            <DatePicker v-model="queryContractTime"  format="yyyy-MM-dd" type="daterange"  class="search-input" @on-change="changeContractTime"></DatePicker>
                      </FormItem>
                    </Col>
                </Row>
                <Row type="flex" justify="space-between">
                    <Col span='7'>
                        <FormItem label="启用禁用:" :label-width="100">
                            <Select v-model="form.isStart" class="search-input" placeholder="全部">
                                <Option v-for="item in isStartList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                     <Col span='7'>
                        <FormItem label="标准:" :label-width="100">
                            <Input type="text" v-model="form.standard" class="search-input"></Input>
                        </FormItem>
                    </Col>
                    <Col span='7'>
                        <FormItem label="排除时间:" :label-width="100">
                          <Checkbox v-model="isWeekT">周末</Checkbox>
                          <Checkbox v-model="isHolidayT">节假日</Checkbox>
                        </FormItem>
                    </Col>
                </Row>
                 <Row type="flex" justify="space-between">
                    <Col span='7'>
                        <FormItem label="是否显示:" :label-width="100">
                            <Select v-model="form.isShow" class="search-input" placeholder="全部">
                                <Option v-for="item in isShowList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                     <Col span='7'>
                        <FormItem label="市场名称:" :label-width="100">
                            <Input type="text" v-model="form.likeMarketName" class="search-input"></Input>
                        </FormItem>
                    </Col>
                    <Col span="7" class="text-right">
                        <Button type="primary" @click="search">查询</Button>
                        <Button style="margin-left: 8px" @click="reset">重置</Button>
                    </Col>
                </Row>
            </Form>
        </Col>
        <Col span="24">
             <Table :columns="columns1" :data="dataTable1" v-show="isVShow1"></Table>
            <Table :columns="columns2" :data="dataTable2" v-show="isVShow2"></Table>
            <Table :columns="columns3" :data="dataTable3" v-show="isVShow3"></Table>
            <Table :columns="columns4" :data="dataTable4" v-show="isVShow4"></Table>
            <Table :columns="columns5" :data="dataTable5" v-show="isVShow5"></Table>
            <Table :columns="columns6" :data="dataTable6" v-show="isVShow6"></Table>
            <Table :columns="columns7" :data="dataTable7" v-show="isVShow7"></Table>
            <div class="page-con">
                <oil-page :total="total" :page-num="pageNum" :page-size="pageSize" @page-change="pageChange" :page-size-opts="pageSizeOpts" :show-sizer="showSizer"></oil-page>
            </div>
        </Col>
    </Row>
</template>
<script>
import {
    getSelectDataCenter,dataManagerList
} from "../../components/axios/dataCenter.js";
import { getLastMonth,formatTime,formatStamp  } from "../../../assets/js/common.js";
import oilPage from "../../components/page/page.vue";
import { dePentSave } from '../../components/axios/performanceManagement.js';
import { deletePriceConfig } from '../../components/axios/apiManagement.js';
export default {
    components: {
        oilPage
    },
   data() {
       return{
        indexTypeList:[
            {
                value:1,
                label:"国际原油"
            },
            {
                value:2,
                label:"企业出厂价"
            },
            {
                value:3,
                label:"国内市场价"
            },
            {
                value:4,
                label:"国际市场价"
            },
            {
                value:5,
                label:"主营批发价"
            },
            {
                value:6,
                label:"主营零售价"
            },
            {
                value:7,
                label:"基准价"
            }
        ],
        pageSizeOpts: [10, 20, 50, 100, 200],
        showSizer: true,
        pageSize: 10,
        pageNum: 1,
        total: 0,
        priceTypeList:[],
        isVShow1: false,
        isVShow2: false,
        isVShow3: false,
        isVShow4: false,
        isVShow5: false,
        isVShow6: false,
        isVShow7: false,
       columns1: [
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
          minWidth: 100
        },
        {
          key: "dayCode",
          align: "center",
          title: "价格",
          minWidth: 100
        },
        {
          key: "isMissing",
          align: "center",
          title: "是否缺失",
          minWidth: 100,
          render: (h, data) => {
            let label =
              data.row.isMissing === 1
                ? "缺" : "";
            let color =
              data.row.isMissing === 1
                ? "red" : "";
            return h(
              "span",
              {
                props: {
                  type: "text",
                  size: "small"
                },
                style: {
                  color: color
                }
              },
              label
            );
          }
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
                props: {
                  type: "text",
                  size: "small"
                },
                style:{
                  marginRight: "10px",
                },
                on: {
                  click: () => {
                    this.histortData(data.row.id, data.row.dayCode,1);
                  }
                }
              },
              data.row.isMissing == 1 ? "补缺" : ""
            ),
            h(
              "a",
              {
                props: {
                  type: "text",
                  size: "small"
                },
                on: {
                  click: () => {
                    this.histortData(data.row.id, data.row.dayCode,2);
                  }
                }
              },
              "历史数据"
            )
          ]);
        }
        
        }
      ],
       columns2: [
        {
          title: "ID",
          key: "id",
          minWidth: 70,
          align: "center"
        },
        {
          title: "品种名称",
          minWidth: 80,
          key: "varietiesName",
          align: "center"
        },
        {
          key: "specificationsName",
          align: "center",
          title: "规格名称",
          minWidth: 70
        },
        {
          title: "区域名称",
          minWidth: 80,
          key: "regionName"
        },
        {
          title: "生产企业名称",
          minWidth: 100,
          key: "memberAbbreviation",
          align: "center"
        },
        {
          title: "销售公司",
          minWidth: 100,
          key: "salesCompanyName",
          align: "center"
        },
        {
          title: "计价单位",
          minWidth: 80,
          key: "unitValuationName",
          align: "center"
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
          key: "isMissing",
          align: "center",
          title: "是否缺失",
          minWidth: 100,
          render: (h, data) => {
            let label =
              data.row.isMissing === 1
                ? "缺" : "";
            let color =
              data.row.isMissing === 1
                ? "red" : "";
            return h(
              "span",
              {
                props: {
                  type: "text",
                  size: "small"
                },
                style: {
                  color: color
                }
              },
              label
            );
          }
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
                props: {
                  type: "text",
                  size: "small"
                },
                style:{
                  marginRight: "10px",
                },
                on: {
                  click: () => {
                    this.histortData(data.row.id, data.row.dayCode,1);
                  }
                }
              },
              data.row.isMissing == 1 ? "补缺" : ""
            ),
            h(
              "a",
              {
                props: {
                  type: "text",
                  size: "small"
                },
                on: {
                  click: () => {
                    this.histortData(data.row.id, data.row.dayCode,2);
                  }
                }
              },
              "历史数据"
            )
          ]);
        }
        
        }
      ],
      columns3: [
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
          minWidth: 80
        },
        {
          key: "memberAbbreviation",
          align: "center",
          title: "生产企业名称",
          minWidth: 100
        },
        {
          key: "internalMarketName",
          align: "center",
          title: "市场名称",
          minWidth: 100
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
          key: "isMissing",
          align: "center",
          title: "是否缺失",
          minWidth: 100,
          render: (h, data) => {
            let label =
              data.row.isMissing === 1
                ? "缺" : "";
            let color =
              data.row.isMissing === 1
                ? "red" : "";
            return h(
              "span",
              {
                props: {
                  type: "text",
                  size: "small"
                },
                style: {
                  color: color
                }
              },
              label
            );
          }
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
                props: {
                  type: "text",
                  size: "small"
                },
                style:{
                  marginRight: "10px",
                },
                on: {
                  click: () => {
                    this.histortData(data.row.id, data.row.dayCode,1);
                  }
                }
              },
              data.row.isMissing == 1 ? "补缺" : ""
            ),
            h(
              "a",
              {
                props: {
                  type: "text",
                  size: "small"
                },
                on: {
                  click: () => {
                    this.histortData(data.row.id, data.row.dayCode,2);
                  }
                }
              },
              "历史数据"
            )
          ]);
        }
        
        }
      ],
      columns4: [
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
          minWidth: 80
        },
        {
          key: "priceTypeName",
          align: "center",
          title: "价格类型",
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
          key: "middleDayCode",
          align: "center",
          title: "中间价",
          minWidth: 140
        },
        {
          key: "rmbDayCode",
          align: "center",
          title: "人民币价",
          minWidth: 140
        },
        {
          key: "isMissing",
          align: "center",
          title: "是否缺失",
          minWidth: 100,
          render: (h, data) => {
            let label =
              data.row.isMissing === 1
                ? "缺" : "";
            let color =
              data.row.isMissing === 1
                ? "red" : "";
            return h(
              "span",
              {
                props: {
                  type: "text",
                  size: "small"
                },
                style: {
                  color: color
                }
              },
              label
            );
          }
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
                props: {
                  type: "text",
                  size: "small"
                },
                style:{
                  marginRight: "10px",
                },
                on: {
                  click: () => {
                    this.histortData(data.row.id, data.row.dayCode,1);
                  }
                }
              },
              data.row.isMissing == 1 ? "补缺" : ""
            ),
            h(
              "a",
              {
                props: {
                  type: "text",
                  size: "small"
                },
                on: {
                  click: () => {
                    this.histortData(data.row.id, data.row.dayCode,2);
                  }
                }
              },
              "历史数据"
            )
          ]);
        }  
        }
      ],
        columns5: [
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
          minWidth: 80
        },
        {
          key: "marketName",
          align: "center",
          title: "市场名称",
          minWidth: 100
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
          key: "isMissing",
          align: "center",
          title: "是否缺失",
          minWidth: 100,
          render: (h, data) => {
            let label =
              data.row.isMissing === 1
                ? "缺" : "";
            let color =
              data.row.isMissing === 1
                ? "red" : "";
            return h(
              "span",
              {
                props: {
                  type: "text",
                  size: "small"
                },
                style: {
                  color: color
                }
              },
              label
            );
          }
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
                props: {
                  type: "text",
                  size: "small"
                },
                style:{
                  marginRight: "10px",
                },
                on: {
                  click: () => {
                    this.histortData(data.row.id, data.row.dayCode,1);
                  }
                }
              },
              data.row.isMissing == 1 ? "补缺" : ""
            ),
            h(
              "a",
              {
                props: {
                  type: "text",
                  size: "small"
                },
                on: {
                  click: () => {
                    this.histortData(data.row.id, data.row.dayCode,2);
                  }
                }
              },
              "历史数据"
            )
          ]);
        }
        
        }
      ],
        columns6: [
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
          minWidth: 80
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
          key: "isMissing",
          align: "center",
          title: "是否缺失",
          minWidth: 100,
          render: (h, data) => {
            let label =
              data.row.isMissing === 1
                ? "缺" : "";
            let color =
              data.row.isMissing === 1
                ? "red" : "";
            return h(
              "span",
              {
                props: {
                  type: "text",
                  size: "small"
                },
                style: {
                  color: color
                }
              },
              label
            );
          }
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
                props: {
                  type: "text",
                  size: "small"
                },
                style:{
                  marginRight: "10px",
                },
                on: {
                  click: () => {
                    this.histortData(data.row.id, data.row.dayCode,1);
                  }
                }
              },
              data.row.isMissing == 1 ? "补缺" : ""
            ),
            h(
              "a",
              {
                props: {
                  type: "text",
                  size: "small"
                },
                on: {
                  click: () => {
                    this.histortData(data.row.id, data.row.dayCode,2);
                  }
                }
              },
              "历史数据"
            )
          ]);
        }
        
        }
      ],
         columns7: [
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
          minWidth: 80
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
          key: "accountNo",
          align: "center",
          title: "最后报价",
          minWidth: 100
        },
        {
          key: "isMissing",
          align: "center",
          title: "是否缺失",
          minWidth: 100,
          render: (h, data) => {
            let label =
              data.row.isMissing === 1
                ? "缺" : "";
            let color =
              data.row.isMissing === 1
                ? "red" : "";
            return h(
              "span",
              {
                props: {
                  type: "text",
                  size: "small"
                },
                style: {
                  color: color
                }
              },
              label
            );
          }
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
                props: {
                  type: "text",
                  size: "small"
                },
                style:{
                  marginRight: "10px",
                },
                on: {
                  click: () => {
                    this.histortData(data.row.id, data.row.dayCode,1);
                  }
                }
              },
              data.row.isMissing == 1 ? "补缺" : ""
            ),
            h(
              "a",
              {
                props: {
                  type: "text",
                  size: "small"
                },
                on: {
                  click: () => {
                    this.histortData(data.row.id, data.row.dayCode,2);
                  }
                }
              },
              "历史数据"
            )
          ]);
        }
        
        }
      ],
            weekList:[
                {
                label:"节假日",
                value: 0
                },
                {
                label:"周末",
                value: 0
                }
            ],
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
        isShowList:[
            {
            label:"全部",
            value: -1
            },
            {
            label:"是",
            value: 0
            },
            {
            label:"否",
            value: 1
            }
        ],
            dataTable1:[],
            dataTable2:[],
            dataTable3:[],
            dataTable4:[],
            dataTable5:[],
            dataTable6:[],
            dataTable7:[],
            queryContractTime:[],
            isWeekT:false,
            isHolidayT:false,
            form:{
                indexType:1,
                priceType:-1,
                varietiesName:"",
                specificationsName:"",
                areaName:"",
                memberName:"",
                id:"",
                mysteelCode:"",
                isStart:-1,
                standard:"",
                washoutTime:"",
                startTime:"",
                endTime:"",
                isWeek:0,
                isHoliday:0,
                isShow:-1,
                likeMarketName:"",
                likeRegionName:""
            } 
        }
        },
    created() {
      this.priceTypeFunction();
      this.queryData();
      this.initTime();
    },
    methods: {
        //初始化时间
        initTime(){
          let endINitTime = new Date();
          let startInitTime =getLastMonth(this.form.endINitTime);
          this.form.startTime = formatTime(formatStamp(startInitTime));
          this.form.endTime = formatTime(formatStamp(endINitTime));
          this.queryContractTime =  [formatTime(startInitTime),formatTime(endINitTime)]
        },
        changePrice(val){
          this.form.priceType = -1;
          if(val==4){
            this.priceTypeFunction("InternatPriceTypeEnum")
          }else{
            this.priceTypeFunction("PriceTypeEnum")
          }
        },
        //价格类型
        priceTypeFunction(type){
          
            let params={
                type : type||"PriceTypeEnum"
            }
           
            this.priceTypeList.push({
                value : -1,
                desc: "全部" 
            })
            getSelectDataCenter(params).then(res=>{
                this.priceTypeList = res.response.map(item => {
                    return{
                        value:item.value,
                        desc:item.desc
                    }
                })
            })
        },
        //获取时间
        changeContractTime(data) {
            let data1 = new Date(data[0]);
            let data2 = new Date(data[1]);
            this.form.startTime = data1.getTime();
            this.form.endTime = data2.getTime();
        },
        //查询
        search(){
            this.pageNum =1;
            this.pageSize =10;
            this.queryData();
        },
        //让Input组件只能输入数字
        idBtn(){ 
          if(typeof(this.form.id)=='number'){
            this.form.id = this.form.id
          }else if(this.form.id==''){
            this.form.id=''
          }else{
            this.form.id = this.form.id.replace(/[^0-9]+/g,'')
          }
        },
        //重置
        reset(){
          this.form.indexType = 1;
          this.form.priceType = -1;
          this.form.varietiesName = "";
          this.form.specificationsName = "";
          this.form.likeRegionName = "";
          this.form.memberName = "";
          this.form.id = "";
          this.form.mysteelCode = "";
          this.form.isShow = -1;
          this.form.likeMarketName = "";

          this.form.isStart = "";
          this.form.standard = "";
          this.isWeekT = false;
          this.isHolidayT = false;
            this.initTime();
        },
        //"历史数据"
        histortData(id,code,stype){
          if(stype==1){
             this.$router.push({
                    name: "fillVacancy",
                    query: {
                      id: id,
                      indexType: this.form.indexType,
                      startTime: formatStamp(this.form.startTime),
                      endTime: formatStamp(this.form.endTime)
                    }
          });
          }
          if(stype==2){
             this.$router.push({
                    name: "historyData",
                    query: {
                      id: id,
                      type: this.form.indexType,
                      indexCode: code,
                      startTime: formatStamp(this.form.startTime),
                      endTime: formatStamp(this.form.endTime)
                    }
          });
          }

         
        },
        //数据列表
        queryData() {
        var that = this;
        this.form.pageNum = this.pageNum;
        this.form.pageSize = this.pageSize;
        if(this.isWeekT){
          this.form.isWeek = 1;
        }else{
           this.form.isWeek = 0;
        }
        if(this.isHolidayT){
          this.form.isHoliday = 1;
        }else{
           this.form.isHoliday = 0;
        }
        if(!this.form.priceType){
          this.form.priceType = -1
        } 
        this.form.startTime = formatTime(this.form.startTime);
        this.form.endTime = formatTime(this.form.endTime);
        if(that.form.indexType == 1){
              that.isVShow1 = true;
              that.isVShow2 = false;
              that.isVShow3 = false;
              that.isVShow4 = false;
              that.isVShow5 = false;
              that.isVShow6 = false;
              that.isVShow7 = false;

            }else if(that.form.indexType==2){
              that.isVShow1 = false;
              that.isVShow2 = true;
              that.isVShow3 = false;
              that.isVShow4 = false;
              that.isVShow5 = false;
              that.isVShow6 = false;
              that.isVShow7 = false;
            }else if(that.form.indexType==3){
              that.isVShow1 = false;
              that.isVShow2 = false;
              that.isVShow3 = true;
              that.isVShow4 = false;
              that.isVShow5 = false;
              that.isVShow6 = false;
              that.isVShow7 = false;
            }else if(that.form.indexType==4){
              that.isVShow1 = false;
              that.isVShow2 = false;
              that.isVShow3 = false;
              that.isVShow4 = true;
              that.isVShow5 = false;
              that.isVShow6 = false;
              that.isVShow7 = false;
            }else if(that.form.indexType==5){
              that.isVShow1 = false;
              that.isVShow2 = false;
              that.isVShow3 = false;
              that.isVShow4 = false;
              that.isVShow5 = true;
              that.isVShow6 = false;
              that.isVShow7 = false;
            }else if(that.form.indexType==6){
             that.isVShow1 = false;
              that.isVShow2 = false;
              that.isVShow3 = false;
              that.isVShow4 = false;
              that.isVShow5 = false;
              that.isVShow6 = true;
              that.isVShow7 = false;
            }else if(that.form.indexType==7){
              that.isVShow1 = false;
              that.isVShow2 = false;
              that.isVShow3 = false;
              that.isVShow4 = false;
              that.isVShow5 = false;
              that.isVShow6 = false;
              that.isVShow7 = true;
            }

        dataManagerList(this.form).then(res => {
            if(that.form.indexType == 1){
              that.isVShow1 = true;
                that.dataTable1 = res.response.list;
            }else if(that.form.indexType==2){
              that.isVShow2 = true;
                that.dataTable2 = res.response.list;
            }else if(that.form.indexType==3){
                that.dataTable3 = res.response.list;
            }else if(that.form.indexType==4){
                that.dataTable4 = res.response.list;
            }else if(that.form.indexType==5){
                that.dataTable5 = res.response.list;
            }else if(that.form.indexType==6){
                that.dataTable6 = res.response.list;
            }else if(that.form.indexType==7){
                that.dataTable7 = res.response.list;
            }
            
            that.total = res.response.total;
            });
        },
        //分页
        pageChange(page, pageSize) {
            if (page) {
                this.pageNum = page;
            }
            if (pageSize) {
                this.pageSize = pageSize;
            }
            this.queryData();
        }
    }
    
}

</script>


