<style lang="less">
  .table-down-one .ivu-table-header .ivu-checkbox-input{
      display: none !important;
  }
  .table-down-one .ivu-table-header .ivu-checkbox-inner{
      display: none !important;
  }
  .table-down-one .ivu-table-header .ivu-table-cell-with-selection::before{
    content:'选择'
  }
</style>

<template>
  <Row>
    <Col span="24"></Col>
    <Col span="24" class-name="search-form">
      <Form :model="form" :label-width="120">
        <Row type="flex" justify="space-between">
          <Col span="7">
            <FormItem label="指标类型:" :label-width="100">
              <Select v-model="form.indexType" @on-change="changePrice(form.indexType)">
                <Option
                  v-for="item in indexTypeList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="品种名称:" :label-width="100">
              <Input type="text" v-model="form.varietiesName" class="search-input"></Input>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="价格类型:" :label-width="100">
              <!-- <Select v-model="form.priceType" placeholder="全部">
                <Option
                  v-for="item in priceTypeList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.desc }}</Option>
              </Select> -->
              <Select v-model="form.priceType" label-in-value filterable clearable remote @on-query-change="remoteMethodPriceTypeName" :loading="loadingPriceTypeName" @on-open-change="clearQueryPriceTypeName"
                ref="cropName" placeholder="请输入价格类型" @on-change="queryPriceTypeName">
                <Option v-for="(option, index) in priceTypeNameList" :value="option.priceTypeCode" :key="index">{{option.priceTypeName}}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="space-between">
          <Col span="7">
            <FormItem label="规格名称:" :label-width="100">
              <Input type="text" v-model="form.specificationsName" class="search-input"></Input>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="区域名称:" :label-width="100">
              <Input type="text" v-model="form.likeRegionName" class="search-input"></Input>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="生产企业:" :label-width="100">
              <Input type="text" v-model="form.memberName" class="search-input"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="space-between">
          <Col span="7">
            <FormItem label="ID:" :label-width="100">
              <Input type="text" v-model="form.id" class="search-input" @on-keyup="idBtn"></Input>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="钢联ID:" :label-width="100">
              <Input type="text" v-model="form.mysteelCode" class="search-input"></Input>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="选择时间:" :label-width="100">
              <DatePicker
                v-model="queryContractTime"
                format="yyyy-MM-dd"
                type="daterange"
                class="search-input"
                @on-change="changeContractTime"
              ></DatePicker>
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="space-between">
          <Col span="7">
            <FormItem label="启用禁用:" :label-width="100">
              <Select v-model="form.isStart" class="search-input" placeholder="全部">
                <Option
                  v-for="item in isStartList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="标准:" :label-width="100">
              <Input type="text" v-model="form.standard" class="search-input"></Input>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="排除时间:" :label-width="100">
              <Checkbox v-model="isWeekT">周末</Checkbox>
              <Checkbox v-model="isHolidayT">节假日</Checkbox>
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="space-between">
          <Col span="7">
            <FormItem label="是否显示:" :label-width="100">
              <Select v-model="form.isShow" class="search-input" placeholder="全部">
                <Option
                  v-for="item in isShowList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="市场名称:" :label-width="100">
              <Input type="text" v-model="form.likeMarketName" class="search-input"></Input>
              <!-- <Select v-model="form.likeMarketName" filterable clearable remote @on-query-change="remoteMethodMarketTypeName" :loading="loadingMarketTypeName" @on-open-change="clearQueryMarketTypeName"
                ref="cropNameMarketTypeName" placeholder="请输入市场名称">
                <Option v-for="(option, index) in priceMarketTypeNameList" :value="option.marketCode" :key="index">{{option.marketName}}</Option>
              </Select> -->
            </FormItem>
          </Col>
          <Col span="7" class="text-right">
            <Button type="primary" @click="search">查询</Button>
            <Button style="margin-left: 8px" @click="reset">重置</Button>
            <Button
              type="success"
              style="margin-left: 8px"
              @click="dataImport"
              v-if="showImprotButton"
            >数据导入</Button>
            <Button
              type="success"
              style="margin-left: 8px"
              @click="clickDownPop"
              v-if="showDownButton"
            >数据下载({{hasSelectNone}})</Button>
          </Col>
        </Row>
      </Form>
    </Col>
    <Col span="24" class="table-con table-down-one">
      <Table :columns="columns[form.indexType]" :data="dataTable" @on-select="handleSelect" @on-select-cancel="handleSelectCancel"></Table>
      <div class="page-con">
        <oil-page
          :total="total"
          :page-num="form.pageNum"
          :page-size="form.pageSize"
          @page-change="pageChange"
          :page-size-opts="pageSizeOpts"
          :show-sizer="showSizer"
        ></oil-page>
      </div>
      <Spin fix v-if="loading"></Spin>
    </Col>
     <!-- 下载弹窗开始 -->
      <download-pop :clickDown.sync = "clickDown" @queryData="queryData"></download-pop>
      <!-- 下载弹窗结束 -->
  </Row>
 
</template>
<script>
import {
  getSelectDataCenter,
  dataManagerList,
  importPermission,
  checkurlpermission,
  listPriceTypeName,
  listMarketTypeName
} from '../../components/axios/dataCenter.js'
import { getLastMonth, formatTime, formatStamp, formData } from '../../../assets/js/common.js'
import oilPage from '../../components/page/page.vue'
import DownloadPop from "./downloadPop.vue";
export default {
  components: {
    oilPage,
    DownloadPop
  },
  data () {
    return {
      loading: false,
      loadingPriceTypeName:false,
      priceTypeNameList:[],
      loadingMarketTypeName:false,
      priceMarketTypeNameList:[],
      hasSelectNone:'',
      clickDown:false,
      indexTypeList: [
        {
          value: 1,
          label: '国际原油'
        },
        {
          value: 2,
          label: '企业出厂价'
        },
        {
          value: 3,
          label: '国内市场价'
        },
        {
          value: 4,
          label: '国际市场价'
        },
        {
          value: 5,
          label: '主营批发价'
        },
        {
          value: 6,
          label: '主营零售价'
        },
        {
          value: 7,
          label: '基准价'
        }
      ],
      dataTable: [],
      pageSizeOpts: [10, 20, 50, 100, 200],
      showSizer: true,
      total: 0,
      priceTypeList: [{
        value: -1,
        desc: '全部'
      }],
      columns: {
        1: [
          {
              type: 'selection',
              title: '#',
              width: 60,
              align: 'center'
          },
          {
            key: 'id',
            title: 'ID',
            align: 'center',
            minWidth: 70
          },
          {
            key: 'varietiesName',
            align: 'center',
            title: '品种名称',
            minWidth: 80
          },
          {
            key: 'specificationsName',
            align: 'center',
            title: '规格名称',
            minWidth: 120
          },
          {
            key: 'marketTypeName',
            align: 'center',
            title: '期/现货/OPEC',
            minWidth: 100
          },
          {
            key: 'unitValuationName',
            align: 'center',
            title: '计价单位',
            minWidth: 80,
            ellipsis: true
          },
          {
            key: 'standard',
            align: 'center',
            title: '标准',
            minWidth: 100
          },
          {
            key: 'dayCode',
            align: 'center',
            title: '价格',
            minWidth: 120
          },
          {
            key: 'isMissing',
            align: 'center',
            title: '是否缺失',
            minWidth: 100,
            render: (h, data) => {
              let label =
                data.row.isMissing === 1
                  ? '缺' : ''
              let color =
                data.row.isMissing === 1
                  ? 'red' : ''
              return h(
                'span',
                {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  style: {
                    color: color
                  }
                },
                label
              )
            }
          },
          {
            title: '操作',
            align: 'center',
            minWidth: 115,
            render: (h, data) => {
              return h('div', [
                h(
                  'a',
                  {
                    props: {
                      type: 'text',
                      size: 'small'
                    },
                    style: {
                      marginRight: '10px'
                    },
                    on: {
                      click: () => {
                        this.histortData(data.row, 1)
                      }
                    }
                  },
                  data.row.isMissing === 1 ? '补缺' : ''
                ),
                h(
                  'a',
                  {
                    props: {
                      type: 'text',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        this.histortData(data.row, 2)
                      }
                    }
                  },
                  '历史数据'
                )
              ])
            }

          }
        ],
        2: [
          {
              type: 'selection',
              title: '#',
              width: 60,
              align: 'center'
          },
          {
            title: 'ID',
            key: 'id',
            minWidth: 70,
            align: 'center'
          },
          {
            title: '品种名称',
            minWidth: 80,
            key: 'varietiesName',
            align: 'center'
          },
          {
            key: 'specificationsName',
            align: 'center',
            title: '规格名称',
            minWidth: 70
          },
          {
            title: '区域名称',
            minWidth: 80,
            key: 'regionName'
          },
          {
            title: '生产企业名称',
            minWidth: 100,
            key: 'memberAbbreviation',
            align: 'center'
          },
          {
            title: '销售公司',
            minWidth: 100,
            key: 'salesCompanyName',
            align: 'center'
          },
          {
            title: '计价单位',
            minWidth: 80,
            key: 'unitValuationName',
            align: 'center'
          },
          {
            key: 'standard',
            align: 'center',
            title: '标准',
            minWidth: 60
          },
          {
            key: 'dayCode',
            align: 'center',
            title: '价格',
            minWidth: 100
          },
          {
            key: 'isMissing',
            align: 'center',
            title: '是否缺失',
            minWidth: 100,
            render: (h, data) => {
              let label =
                data.row.isMissing === 1
                  ? '缺' : ''
              let color =
                data.row.isMissing === 1
                  ? 'red' : ''
              return h(
                'span',
                {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  style: {
                    color: color
                  }
                },
                label
              )
            }
          },
          {
            title: '操作',
            align: 'center',
            minWidth: 115,
            render: (h, data) => {
              return h('div', [
                h(
                  'a',
                  {
                    props: {
                      type: 'text',
                      size: 'small'
                    },
                    style: {
                      marginRight: '10px'
                    },
                    on: {
                      click: () => {
                        this.histortData(data.row, 1)
                      }
                    }
                  },
                  data.row.isMissing === 1 ? '补缺' : ''
                ),
                h(
                  'a',
                  {
                    props: {
                      type: 'text',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        this.histortData(data.row, 2)
                      }
                    }
                  },
                  '历史数据'
                )
              ])
            }
          }
        ],
        3: [
          {
              type: 'selection',
              title: '#',
              width: 60,
              align: 'center'
          },
          {
            key: 'id',
            title: 'ID',
            align: 'center',
            minWidth: 70
          },
          {
            key: 'varietiesName',
            align: 'center',
            title: '品种名称',
            minWidth: 80
          },
          {
            key: 'specificationsName',
            align: 'center',
            title: '规格名称',
            minWidth: 70
          },
          {
            key: 'regionName',
            align: 'center',
            title: '区域名称',
            minWidth: 80
          },
          {
            key: 'memberAbbreviation',
            align: 'center',
            title: '生产企业名称',
            minWidth: 100
          },
          {
            key: 'internalMarketName',
            align: 'center',
            title: '市场名称',
            minWidth: 100
          },
          {
            key: 'unitValuationName',
            align: 'center',
            title: '计价单位',
            minWidth: 80
          },
          {
            key: 'standard',
            align: 'center',
            title: '标准',
            minWidth: 60
          },
          {
            key: 'lowDayCode',
            align: 'center',
            title: '低端价',
            minWidth: 140
          },
          {
            key: 'highDayCode',
            align: 'center',
            title: '高端价',
            minWidth: 140
          },
          {
            key: 'marketDayCode',
            align: 'center',
            title: '市场价',
            minWidth: 140
          },
          {
            key: 'isMissing',
            align: 'center',
            title: '是否缺失',
            minWidth: 100,
            render: (h, data) => {
              let label =
                data.row.isMissing === 1
                  ? '缺' : ''
              let color =
                data.row.isMissing === 1
                  ? 'red' : ''
              return h(
                'span',
                {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  style: {
                    color: color
                  }
                },
                label
              )
            }
          },
          {
            title: '操作',
            align: 'center',
            minWidth: 115,
            render: (h, data) => {
              return h('div', [
                h(
                  'a',
                  {
                    props: {
                      type: 'text',
                      size: 'small'
                    },
                    style: {
                      marginRight: '10px'
                    },
                    on: {
                      click: () => {
                        this.histortData(data.row, 1)
                      }
                    }
                  },
                  data.row.isMissing === 1 ? '补缺' : ''
                ),
                h(
                  'a',
                  {
                    props: {
                      type: 'text',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        this.histortData(data.row, 2)
                      }
                    }
                  },
                  '历史数据'
                )
              ])
            }

          }
        ],
        4: [
          {
              type: 'selection',
              title: '#',
              width: 60,
              align: 'center'
          },
          {
            key: 'id',
            title: 'ID',
            align: 'center',
            minWidth: 70
          },
          {
            key: 'varietiesName',
            align: 'center',
            title: '品种名称',
            minWidth: 80
          },
          {
            key: 'specificationsName',
            align: 'center',
            title: '规格名称',
            minWidth: 70
          },
          {
            key: 'regionName',
            align: 'center',
            title: '区域名称',
            minWidth: 80
          },
          {
            key: 'priceTypeName',
            align: 'center',
            title: '价格类型',
            minWidth: 80
          },
          {
            key: 'unitValuationName',
            align: 'center',
            title: '计价单位',
            minWidth: 80
          },
          {
            key: 'standard',
            align: 'center',
            title: '标准',
            minWidth: 60
          },
          {
            key: 'lowDayCode',
            align: 'center',
            title: '低端价',
            minWidth: 140
          },
          {
            key: 'highDayCode',
            align: 'center',
            title: '高端价',
            minWidth: 140
          },
          {
            key: 'middleDayCode',
            align: 'center',
            title: '中间价',
            minWidth: 140
          },
          {
            key: 'rmbDayCode',
            align: 'center',
            title: '人民币价',
            minWidth: 140
          },
          {
            key: 'isMissing',
            align: 'center',
            title: '是否缺失',
            minWidth: 100,
            render: (h, data) => {
              let label =
                data.row.isMissing === 1
                  ? '缺' : ''
              let color =
                data.row.isMissing === 1
                  ? 'red' : ''
              return h(
                'span',
                {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  style: {
                    color: color
                  }
                },
                label
              )
            }
          },
          {
            title: '操作',
            align: 'center',
            minWidth: 115,
            render: (h, data) => {
              return h('div', [
                h(
                  'a',
                  {
                    props: {
                      type: 'text',
                      size: 'small'
                    },
                    style: {
                      marginRight: '10px'
                    },
                    on: {
                      click: () => {
                        this.histortData(data.row, 1)
                      }
                    }
                  },
                  data.row.isMissing === 1 ? '补缺' : ''
                ),
                h(
                  'a',
                  {
                    props: {
                      type: 'text',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        this.histortData(data.row, 2)
                      }
                    }
                  },
                  '历史数据'
                )
              ])
            }
          }
        ],
        5: [
          {
              type: 'selection',
              title: '#',
              width: 60,
              align: 'center'
          },
          {
            key: 'id',
            title: 'ID',
            align: 'center',
            minWidth: 70
          },
          {
            key: 'varietiesName',
            align: 'center',
            title: '品种名称',
            minWidth: 80
          },
          {
            key: 'specificationsName',
            align: 'center',
            title: '规格名称',
            minWidth: 70
          },
          {
            key: 'regionName',
            align: 'center',
            title: '区域名称',
            minWidth: 80
          },
          {
            key: 'marketName',
            align: 'center',
            title: '市场名称',
            minWidth: 100
          },
          {
            key: 'unitValuationName',
            align: 'center',
            title: '计价单位',
            minWidth: 80
          },
          {
            key: 'standard',
            align: 'center',
            title: '标准',
            minWidth: 60
          },
          {
            key: 'oilDayCode',
            align: 'center',
            title: '中石油',
            minWidth: 140
          },
          {
            key: 'petrifiedDayCode',
            align: 'center',
            title: '中石化',
            minWidth: 140
          },
          {
            key: 'isMissing',
            align: 'center',
            title: '是否缺失',
            minWidth: 100,
            render: (h, data) => {
              let label =
                data.row.isMissing === 1
                  ? '缺' : ''
              let color =
                data.row.isMissing === 1
                  ? 'red' : ''
              return h(
                'span',
                {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  style: {
                    color: color
                  }
                },
                label
              )
            }
          },
          {
            title: '操作',
            align: 'center',
            minWidth: 115,
            render: (h, data) => {
              return h('div', [
                h(
                  'a',
                  {
                    props: {
                      type: 'text',
                      size: 'small'
                    },
                    style: {
                      marginRight: '10px'
                    },
                    on: {
                      click: () => {
                        this.histortData(data.row, 1)
                      }
                    }
                  },
                  data.row.isMissing === 1 ? '补缺' : ''
                ),
                h(
                  'a',
                  {
                    props: {
                      type: 'text',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        this.histortData(data.row, 2)
                      }
                    }
                  },
                  '历史数据'
                )
              ])
            }

          }
        ],
        6: [
          {
              type: 'selection',
              title: '#',
              width: 60,
              align: 'center'
          },
          {
            key: 'id',
            title: 'ID',
            align: 'center',
            minWidth: 70
          },
          {
            key: 'varietiesName',
            align: 'center',
            title: '品种名称',
            minWidth: 80
          },
          {
            key: 'specificationsName',
            align: 'center',
            title: '规格名称',
            minWidth: 70
          },
          {
            key: 'regionName',
            align: 'center',
            title: '区域名称',
            minWidth: 80
          },
          {
            key: 'marketName',
            align: 'center',
            title: '市场名称',
            minWidth: 80
          },
          {
            key: 'unitValuationName',
            align: 'center',
            title: '计价单位',
            minWidth: 80
          },
          {
            key: 'standard',
            align: 'center',
            title: '标准',
            minWidth: 60
          },
          {
            key: 'riseDayCode',
            align: 'center',
            title: '最高零售价(元/升)',
            minWidth: 140
          },
          {
            key: 'tonDayCode',
            align: 'center',
            title: '最高零售价(元/吨)',
            minWidth: 140
          },
          {
            key: 'isMissing',
            align: 'center',
            title: '是否缺失',
            minWidth: 100,
            render: (h, data) => {
              let label =
                data.row.isMissing === 1
                  ? '缺' : ''
              let color =
                data.row.isMissing === 1
                  ? 'red' : ''
              return h(
                'span',
                {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  style: {
                    color: color
                  }
                },
                label
              )
            }
          },
          {
            title: '操作',
            align: 'center',
            minWidth: 115,
            render: (h, data) => {
              return h('div', [
                h(
                  'a',
                  {
                    props: {
                      type: 'text',
                      size: 'small'
                    },
                    style: {
                      marginRight: '10px'
                    },
                    on: {
                      click: () => {
                        this.histortData(data.row, 1)
                      }
                    }
                  },
                  data.row.isMissing === 1 ? '补缺' : ''
                ),
                h(
                  'a',
                  {
                    props: {
                      type: 'text',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        this.histortData(data.row, 2)
                      }
                    }
                  },
                  '历史数据'
                )
              ])
            }

          }
        ],
        7: [
          {
              type: 'selection',
              title: '#',
              width: 60,
              align: 'center'
          },
          {
            key: 'id',
            title: 'ID',
            align: 'center',
            minWidth: 70
          },
          {
            key: 'varietiesName',
            align: 'center',
            title: '品种名称',
            minWidth: 80
          },
          {
            key: 'specificationsName',
            align: 'center',
            title: '规格名称',
            minWidth: 80
          },
          {
            key: 'regionName',
            align: 'center',
            title: '区域名称',
            minWidth: 80
          },
          {
            key: 'unitValuationName',
            align: 'center',
            title: '计价单位',
            minWidth: 80
          },
          {
            key: 'dayCode',
            align: 'center',
            title: '价格',
            minWidth: 140
          },
          {
            key: 'accountNo',
            align: 'center',
            title: '最后报价',
            minWidth: 100
          },
          {
            key: 'isMissing',
            align: 'center',
            title: '是否缺失',
            minWidth: 100,
            render: (h, data) => {
              let label =
                data.row.isMissing === 1
                  ? '缺' : ''
              let color =
                data.row.isMissing === 1
                  ? 'red' : ''
              return h(
                'span',
                {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  style: {
                    color: color
                  }
                },
                label
              )
            }
          },
          {
            title: '操作',
            align: 'center',
            minWidth: 115,
            render: (h, data) => {
              return h('div', [
                h(
                  'a',
                  {
                    props: {
                      type: 'text',
                      size: 'small'
                    },
                    style: {
                      marginRight: '10px'
                    },
                    on: {
                      click: () => {
                        this.histortData(data.row, 1)
                      }
                    }
                  },
                  data.row.isMissing === 1 ? '补缺' : ''
                ),
                h(
                  'a',
                  {
                    props: {
                      type: 'text',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        this.histortData(data.row, 2)
                      }
                    }
                  },
                  '历史数据'
                )
              ])
            }

          }
        ]
      },
      isStartList: [
        {
          label: '全部',
          value: -1
        },
        {
          label: '启用',
          value: 0
        },
        {
          label: '禁用',
          value: 1
        }
      ],
      isShowList: [
        {
          label: '全部',
          value: -1
        },
        {
          label: '是',
          value: 0
        },
        {
          label: '否',
          value: 1
        }
      ],
      queryContractTime: [],
      isWeekT: false,
      isHolidayT: false,
      form: {
        pageSize: 10,
        pageNum: 1,
        id: '',
        isShow: -1,
        priceType: -1,
        priceTypeName:'',
        isStart: -1,
        isWeek: 0,
        isHoliday: 0,
        indexType: 1,
        varietiesName: '',
        specificationsName: '',
        memberName: '',
        mysteelCode: '',
        standard: '',
        startTime: '',
        endTime: '',
        likeMarketName: '',
        likeRegionName: ''
      },
      showImprotButton: false,
      showDownButton:false
    }
  },
  created () {
    const session = JSON.parse(
      window.sessionStorage.getItem("form")
    );
    if (session) {
      this.form = session;
      this.pageChange(session.pageNum);
      this.remoteMethodPriceTypeName(session.priceTypeName);
      // console.log(session);
      // this.isWeekT = session.isWeekT;
      // this.isHolidayT = session.isHolidayT;
      if(session.isWeekT == 1){
        this.isWeekT = true;
      }else{
        this.isWeekT = false;
      }
      if(session.isHolidayT == 1){
        this.isHolidayT = true;
      }else{
        this.isHolidayT = false;
      }
    }
    this.priceTypeFunction()
    this.initTime()
    this.queryData()
    this.getShowImportButton()
    this.getShowDownButton()
  },
  methods: {
    // 初始化时间
    initTime () {
      let startInitTime = getLastMonth()
      let endINitTime = new Date()

      this.form.startTime = formatTime(startInitTime)
      this.form.endTime = formatTime(endINitTime)

      this.queryContractTime = [this.form.startTime, this.form.endTime]
    },
    changePrice (val) {
      this.form.priceType = -1

      let params = val == 4 ? 'InternatPriceTypeEnum' : 'PriceTypeEnum'
      this.priceTypeFunction(params);
      this.queryData();

    },
    remoteMethodMarketTypeName(query){
      const self = this
        if (query !== '') {
          this.loadingMarketTypeName = true;
          setTimeout(() => {
            this.loadingMarketTypeName = false;
            let form = {
              marketName: query
            }
            listMarketTypeName(formData(form)).then(res => {
              self.priceMarketTypeNameList = res.response
            })
          }, 50);
        } else {
          this.priceMarketTypeNameList = [];
          this.form.likeMarketName = '';
        }
    },
    remoteMethodPriceTypeName(query){
      const self = this
        if (query !== '') {
          this.loadingPriceTypeName = true;
          setTimeout(() => {
            this.loadingPriceTypeName = false;
            let form = {
              priceTypeName: query
            }
            listPriceTypeName(formData(form)).then(res => {
              self.priceTypeNameList = res.response
            })
          }, 50);
        } else {
          this.priceTypeNameList = [];
          this.form.priceType = '';
        }
    },
      clearQueryPriceTypeName(data) {
        if (!data) {
          if (!this.form.priceType || this.form.priceType  == '') {
            this.$refs.cropName.query = ''
          }
        }
      },
      queryPriceTypeName(data){
        // console.log('data',data);
        if(data){
          this.form.priceTypeName = data.label;
        }
      },
      clearQueryMarketTypeName(data){
        if (!data) {
          if (!this.form.likeMarketName || this.form.likeMarketName  == '') {
            this.$refs.cropNameMarketTypeName.query = ''
          }
        }
      },
    // 价格类型
    priceTypeFunction (type) {
      let params = {
        type: type || 'PriceTypeEnum'
      }

      getSelectDataCenter(params).then(res => {
        this.priceTypeList = res.response.map(item => {
          return {
            value: item.value,
            desc: item.desc
          }
        })
      })
    },
    // 获取时间
    changeContractTime (data) {
      this.form.startTime = data[0]
      this.form.endTime = data[1]
    },
    clickDownPop(){
      this.clickDown = true;
    },
    // 查询
    search () {
      this.form.pageNum = 1
      this.form.pageSize = 10
      this.queryData()
    },
    // 让Input组件只能输入数字
    idBtn () {
      this.form.id = this.form.id.replace(/[^0-9]+/g, '')
    },
    // 历史数据
    histortData (data, stype) {
      this.$router.push({
        name: stype === 1 ? 'fillVacancy' : 'historyData',
        query: {
          id: data.id,
          type: this.form.indexType,
          indexCode: data.dayCode,
          indexType: this.form.indexType,
          startTime: formatStamp(this.form.startTime),
          endTime: formatStamp(this.form.endTime)
        }
      })
    },
    // 数据列表
    queryData () {
      console.log('123');
      this.loading = true;
      this.form.isWeek = +this.isWeekT;
      this.form.isHoliday = +this.isHolidayT;

      dataManagerList(this.form).then(res => {
        this.loading = false
        // this.dataTable = res.response.list
        this.dataTable = this.showSessionList(res.response.list)
        this.total = res.response.total
      })
    },
    // 默认回显session中的数据 再session中的数据只需要添加上_checked=true
    showSessionList(list) {
      let prev = [];
      let session = sessionStorage.getItem('paramsDown');
      if (session) {
        prev = JSON.parse(session);
      }
      this.hasSelectNone = prev.length;
      return list.map((item) => {
        // console.log('item',item);
        const bussinessType = this.form.indexType;
        const { id, varietiesId} = item;
        const curKey = `${bussinessType}-${varietiesId}-${id}`;
        const hasData = prev.some((sub) => `${sub.bussinessType}-${sub.varietiesId}-${sub.id}` === curKey);
        item['_checked'] = hasData;
        return item;
      })
    },
    // 分页
    pageChange (page, pageSize) {
      if (page) {
        this.form.pageNum = page
      }
      if (pageSize) {
        this.form.pageSize = pageSize
      }
      this.queryData()
    },
    // 重置
    reset () {
      this.isWeekT = false
      this.isHolidayT = false

      this.form.priceType = -1
      this.form.isShow = -1
      this.form.indexType = 1
      this.form.id = ''
      this.form.varietiesName = ''
      this.form.specificationsName = ''
      this.form.likeRegionName = ''
      this.form.memberName = ''
      this.form.mysteelCode = ''
      ths.form.likeMarketName = ''
      this.form.isStart = ''
      this.form.standard = ''

      this.initTime();
       window.sessionStorage.removeItem('form');
    },
    dataImport () {
      this.$router.push({ name: 'dataImport' })
    },
    getShowImportButton () {
      importPermission().then(res => {
        this.showImprotButton = res.response
      })
    },
    getShowDownButton () {
      let params = {
        urlPath:'/dataManager/downloaddata'
      }
      checkurlpermission(formData(params)).then(res => {
        this.showDownButton = res.response
      })
    },
    // 选择操作-只添加
    handleSelect(allRow, row){
        // console.log('row',row);
        // let that = this;
        // let sessionData = sessionStorage.getItem('paramsDown');
        // if(sessionData){
        //   let nextDataLenght = JSON.parse(sessionData);
        //   console.log('nextDataLenght',nextDataLenght,nextDataLenght.length);
        //   if(nextDataLenght.length > 2){
        //     console.log('row',row);
        //     that.$Message.info("单次下载最多选择50条指标数据");
        //     row['_checked'] = false;
        //   }else{
            
        //   }
        // }else{
        //   that.transformSession(row, 'add');
        // }

        // if(this.hasSelectNone > 2){
        //   return this.total()
        // }
        this.transformSession(row, 'add');
    },
    // total(){
    //   that.$Message.info("单次下载最多选择50条指标数据");
    // },
    // 反选的操作-只删除
    handleSelectCancel(allRow, row){
      this.transformSession(row, 'del')
    },
    // 生成新的sessionStorage
    transformSession(data,type){
      const { varietiesId, id } = data;
      // console.log('123',data);
      const bussinessType = this.form.indexType;
      let nextData = [];
      let session = sessionStorage.getItem('paramsDown');
      
      if (session) {
        nextData = JSON.parse(session);
      }

      if (type === 'add') {
        // const nextObj = Object.assign({}, data, { bussinessType })
        const nextObj = {
          bussinessType:bussinessType,
          varietiesId:data.varietiesId,
          id:data.id
        }
        nextData.push(nextObj);
      }

      if (type === 'del') {
        nextData = nextData.filter((item) => {
          return !(
            item.bussinessType == bussinessType &&
            item.id == id &&
            item.varietiesId == varietiesId
          )
        })
        console.log('del',nextData)
      }
      sessionStorage.setItem('paramsDown', JSON.stringify(nextData));
      this.hasSelectNone = nextData.length;
    },
    setHistorySession (cb) {
      const form = {
        ...this.form,
        isWeekT:this.isWeekT ? 1:0,
        isHolidayT:this.isHolidayT ? 1:0
      };
      window.sessionStorage.setItem(
        "form",
        JSON.stringify(form)
      );
      if (cb) cb();
    }
  },
  beforeRouteLeave (to, from, next) {
    this.setHistorySession(function () {
      next();
    });
  }
}
</script>
