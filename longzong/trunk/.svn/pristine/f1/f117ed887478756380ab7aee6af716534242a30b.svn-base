<style lang="less" scoped>
  .tab {
    width: 400px;
    display: flex;
    background: #fff;
    color: #2D8CF0;
  }

  .tab .tab-flex {
    width: 200px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    font-size: 14px;
    cursor: pointer;
    border: 1px solid #2D8CF0;
  }

  .tab-flex.tab-active {
    background: #2D8CF0;
    color: #fff;
    border: none
  }
</style>
<template>
  <!--  -->
  <Row>
    <Col span="24">
    <Row class-name="current-position">
      当前位置：绩效管理&nbsp;&nbsp;>>&nbsp;&nbsp;任务设定&nbsp;&nbsp;>>&nbsp;&nbsp;生产部&nbsp;&nbsp;>>&nbsp;&nbsp;个人分摊
    </Row>
    </Col>

    <Col span="24" class-name="search-form">
    <Row>
      <div class="tab" style="margin-bottom:30px;">
        <div class="tab-flex" @click="changeTab1" :class="tab === 1 ? 'tab-active' : ''">部门任务</div>
        <div class="tab-flex" @click="changeTab2" :class="tab === 2 ? 'tab-active' : ''">个人分摊</div>
      </div>
    </Row>
    <Form ref="form" :model="formItem">
      <Row type="flex" justify="space-between">
        <Col span="6">
        <FormItem label="部门名称：" :label-width="82">
          <Select v-model="formItem.orgId" filterable class="search-input" placeholder="请输入部门" @on-query-change="getDepartments">
            <Option v-for="item in departmentList" :value="item.key" :key="item.key">{{ item.value }}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="6">
        <FormItem label="时间：" :label-width="100">
          <!-- <Select v-model="formItem.selectYear" placeholder="请选择时间">
                <Option v-for="item in timeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select> -->
          <DatePicker v-model="formItem.selectYear" type="year" format='yyyy' placeholder="请选择" class="search-input"></DatePicker>
        </FormItem>
        </Col>
        <Col span="6">
        <FormItem label="业绩类型：" :label-width="120">
          <Select v-model="formItem.type" placeholder="请选择业绩类型">
            <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="6" class="text-right">
        <Button type="primary" @click="findData">查询</Button>
        </Col>
      </Row>
    </Form>
    </Col>
    <Col span="24" class="table-con" v-show="showData">
    <div style="margin-bottom:20px;">
      <Button type="primary" style="margin-right:8px" @click="editData">编辑</Button>
      <Button type="primary" @click="saveData">保存</Button>
      <!-- <Button type="default" style="margin:0 8px;" @click="getListAdminProductMonth">重置</Button> -->
      <Button type="default" style="margin:0 8px;" @click="resetData">重置</Button>

      <Button type="primary" @click="rapidDispatch">快速分派</Button>
    </div>
    <Table class="tableCommon" :data="tableData" :columns="columns" :stripe="true" :border="true">
    </Table>
    </Col>
  </Row>
</template>
<script>
  import { listAdminProductMonth, pfDeptSelect, saveAdminProductMonth } from "../../components/axios/performanceManagement.js";
  import { formData } from "../../../assets/js/common.js";
  export default {
    name: 'personalProTaskSet',
    components: {},
    data() {
      return {
        indexNum: 0,
        allData: [],
        choseI: 0,
        nowYear: '',
        nowMonth: '',
        tab: 2,
        showData: false,
        formItem: {
          orgId: '15',
          selectYear: '',
          type: ''
        },
        departmentList: [],
        // timeList: [
        //   { value: 2018, label: 2018 },
        //   { value: 2017, label: 2017 },
        //   { value: 2016, label: 2016 },
        // ],
        typeList: [
          { value: 0, label: '收入业绩' }
        ],
        orgTargetAmountList: {
          janTarget: '',
          febTarget: '',
          marTarget: '',
          aprTarget: '',
          mayTarget: '',
          junTarget: '',
          julTarget: '',
          augTarget: '',
          septTarget: '',
          octTarget: '',
          novTarget: '',
          decTarget: '',
          orgId: '',
          orgName: '',
          selectYear: '',
          targetType: ''
        },
        tableData: [
          {
            entTime: '',
            isInput1: false,
            isInput2: false,
            isInput3: false,
            isInput4: false,
            isInput5: false,
            isInput6: false,
            isInput7: false,
            isInput8: false,
            isInput9: false,
            isInput10: false,
            isInput11: false,
            isInput12: false,
          }
        ],
        columns: [
          {
            title: "月份",
            align: "center",
            minWidth: 240,
            children: [
              {
                title: "部门总目标",
                align: "center",
                className: "column0",
                minWidth: 240,
                children: [
                  {
                    title: "剩余待分配",
                    className: "column1",
                    align: "center",
                    minWidth: 240,
                    children: [
                      {
                        key: "adminName",
                        title: "人员",
                        align: "center",
                        minWidth: 120,
                      },
                      {
                        key: "entTime",
                        title: "入职时间",
                        align: "center",
                        minWidth: 120,
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            title: '1月',
            type: 'index',
            align: "center",
            className: "jan",
            renderHeader: (h, data) => {
              return h('div',{
                'class': {
                  inputCss: true
                },
              }, [
                h("Input", {
                  style: {
                    width: "15px",
                   background:'transparent'
                  },
                  props: {
                    type: 'checkbox'
                  },
                  on: {
                    'on-input-change': (e) => {
                      this.choseMonth(data, e, 1)
                    }
                  }
                }),
                h("span", {}, "1月")
              ])
            },
            children: [
              {
                title: "100",
                align: "center",
                width: 110,
                children: [
                  {
                    key: "janTarget",
                    title: " ",
                    align: "center",
                    width: 110,
                    children: [
                      {
                        key: "adminJanTarget",
                        title: "比例（%）",
                        align: "center",
                        width: 110,
                        render: (h, data) => {
                          if (data.row.isInput1) {
                            return h('div', [
                              h('i-input', {
                                props: {
                                  value: Number((Number(data.row.adminJanTarget) * Number(100)).toFixed(2)),
                                  size: 'small'
                                },
                                on: {
                                  'on-blur': (e) => {
                                    this.changeAmount(data, e, 1)
                                  }
                                }
                              })
                            ])
                          } else {
                            return h('div', [
                              h('span', {

                              }, Number((Number(data.row.adminJanTarget) * Number(100)).toFixed(2)))
                            ])
                          }
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            title: "2月",
            align: "center",
            className: "orgFeb",            
            renderHeader: (h, data) => {
              return h('div',{
                'class': {
                  inputCss: true
                },
              }, [
                h("Input", {
                  style: {
                    width: "15px",
                   background:'transparent'
                    
                  },
                  props: {
                    type: 'checkbox'
                  },
                  on: {
                    'on-input-change': (e) => {
                      this.choseMonth(data, e, 2)
                    }
                  }
                }),
                h("span", {}, "2月")
              ])
            },
            children: [
              {
                title: "100",
                align: "center",
                width: 110,
                children: [
                  {
                    key: "orgFebTarget",
                    title: " ",
                    align: "center",
                    width: 110,
                    children: [
                      {
                        key: "adminFebTarget",
                        title: "比例（%）",
                        align: "center",
                        width: 110,
                        render: (h, data) => {
                          if (data.row.isInput2) {
                            return h('div', [
                              h('i-input', {
                                props: {
                                  value: Number((Number(data.row.adminFebTarget) * Number(100)).toFixed(2)),
                                  size: 'small'
                                },
                                on: {
                                  'on-blur': (e) => {
                                    this.changeAmount(data, e, 2)
                                  }
                                }
                              })
                            ])
                          } else {
                            return h('div', [
                              h('span', {
                              }, Number((Number(data.row.adminFebTarget) * Number(100)).toFixed(2)))
                            ])
                          }
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            title: "3月",
            align: "center",
            className: "Mar",            
            renderHeader: (h, data) => {
              return h('div',{
                'class': {
                  inputCss: true
                },
              }, [
                h("Input", {
                  style: {
                    width: "15px",
                   background:'transparent'
                    
                  },
                  props: {
                    type: 'checkbox'
                  },
                  on: {
                    'on-input-change': (e) => {
                      this.choseMonth(data, e, 3)
                    }
                  }
                }),
                h("span", {}, "3月")
              ])
            },
            children: [
              {
                title: "100",
                align: "center",
                width: 110,
                children: [
                  {
                    key: "orgMarTarget",
                    title: " ",
                    align: "center",
                    width: 110,
                    children: [
                      {
                        key: "adminMarTarget",
                        title: "比例（%）",
                        align: "center",
                        width: 110,
                        render: (h, data) => {
                          if (data.row.isInput3) {
                            return h('div', [
                              h('i-input', {
                                props: {
                                  // type: 'number',
                                  value: Number((Number(data.row.adminMarTarget) * Number(100)).toFixed(2)),
                                  size: 'small'
                                },
                                on: {
                                  'on-blur': (e) => {
                                    this.changeAmount(data, e, 3)
                                  }
                                }
                              })
                            ])
                          } else {
                            return h('div', [
                              h('span', {

                              }, Number((Number(data.row.adminMarTarget) * Number(100)).toFixed(2)))
                            ])
                          }
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            title: "4月",
            align: "center",
            className: "orgApr",            
            renderHeader: (h, data) => {
              return h('div',{
                'class': {
                  inputCss: true
                },
              }, [
                h("Input", {
                  style: {
                    width: "15px",
                   background:'transparent'
                    
                  },
                  props: {
                    type: 'checkbox'
                  },
                  on: {
                    'on-input-change': (e) => {
                      this.choseMonth(data, e, 4)
                    }
                  }
                }),
                h("span", {}, "4月")
              ])
            },
            children: [
              {
                title: "100",
                align: "center",
                width: 110,
                children: [
                  {
                    key: "orgAprTarget",
                    title: " ",
                    align: "center",
                    width: 110,
                    children: [
                      {
                        key: "adminAprTarget",
                        title: "比例（%）",
                        align: "center",
                        width: 110,
                        render: (h, data) => {
                          if (data.row.isInput4) {
                            return h('div', [
                              h('i-input', {
                                props: {
                                  // type: 'number',
                                  value: Number((Number(data.row.adminAprTarget) * Number(100)).toFixed(2)),
                                  size: 'small'
                                },
                                on: {
                                  'on-blur': (e) => {
                                    this.changeAmount(data, e, 4)
                                  }
                                }
                              })
                            ])
                          } else {
                            return h('div', [
                              h('span', {

                              }, Number((Number(data.row.adminAprTarget) * Number(100)).toFixed(2)))
                            ])
                          }
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            title: "5月",
            align: "center",
            className: "orgMay",            
            renderHeader: (h, data) => {
              return h('div', {
                'class': {
                  inputCss: true
                },
              },[
                h("Input", {
                  style: {
                    width: "15px",
                   background:'transparent'
                    
                  },
                  props: {
                    type: 'checkbox'
                  },
                  on: {
                    'on-input-change': (e) => {
                      this.choseMonth(data, e, 5)
                    }
                  }
                }),
                h("span", {}, "5月")
              ])
            },
            children: [
              {
                title: "100",
                align: "center",
                width: 110,
                children: [
                  {
                    key: "orgMayTarget",
                    title: " ",
                    align: "center",
                    width: 110,
                    children: [
                      {
                        key: "adminMayTarget",
                        title: "比例（%）",
                        align: "center",
                        width: 110,
                        render: (h, data) => {
                          if (data.row.isInput5) {
                            return h('div', [
                              h('i-input', {
                                props: {
                                  // type: 'number',
                                  value: Number((Number(data.row.adminMayTarget) * Number(100)).toFixed(2)),
                                  size: 'small'
                                },
                                on: {
                                  'on-blur': (e) => {
                                    this.changeAmount(data, e, 5)
                                  }
                                }
                              })
                            ])
                          } else {
                            return h('div', [
                              h('span', {

                              }, Number((Number(data.row.adminMayTarget) * Number(100)).toFixed(2)))
                            ])
                          }
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            title: "6月",
            align: "center",
            className: "orgJun",            
            renderHeader: (h, data) => {
              return h('div',{
                'class': {
                  inputCss: true
                },
              }, [
                h("Input", {
                  style: {
                    width: "15px",
                   background:'transparent'
                    
                  },
                  props: {
                    type: 'checkbox'
                  },
                  on: {
                    'on-input-change': (e) => {
                      this.choseMonth(data, e, 6)
                    }
                  }
                }),
                h("span", {}, "6月")
              ])
            },
            children: [
              {
                title: "100",
                align: "center",
                width: 110,
                children: [
                  {
                    key: "orgJunTarget",
                    title: " ",
                    align: "center",
                    width: 110,
                    children: [
                      {
                        key: "adminJunTarget",
                        title: "比例（%）",
                        align: "center",
                        width: 110,
                        render: (h, data) => {
                          if (data.row.isInput6) {
                            return h('div', [
                              h('i-input', {
                                props: {
                                  // type: 'number',
                                  value: Number((Number(data.row.adminJunTarget) * Number(100)).toFixed(2)),
                                  size: 'small'
                                },
                                on: {
                                  'on-blur': (e) => {
                                    this.changeAmount(data, e, 6)
                                  }
                                }
                              })
                            ])
                          } else {
                            return h('div', [
                              h('span', {

                              }, Number((Number(data.row.adminJunTarget) * Number(100)).toFixed(2)))
                            ])
                          }
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            title: "7月",
            align: "center",
            className: "orgJul",            
            renderHeader: (h, data) => {
              return h('div',{
                'class': {
                  inputCss: true
                },
              }, [
                h("Input", {
                  style: {
                    width: "15px",
                   background:'transparent'
                    
                  },
                  props: {
                    type: 'checkbox'
                  },
                  on: {
                    'on-input-change': (e) => {
                      this.choseMonth(data, e, 7)
                    }
                  }
                }),
                h("span", {}, "7月")
              ])
            },
            children: [
              {
                title: "100",
                align: "center",
                width: 110,
                children: [
                  {
                    key: "orgJulTarget",
                    title: " ",
                    align: "center",
                    width: 110,
                    children: [
                      {
                        key: "adminJulTarget",
                        title: "比例（%）",
                        align: "center",
                        width: 110,
                        render: (h, data) => {
                          if (data.row.isInput7) {
                            return h('div', [
                              h('i-input', {
                                props: {
                                  // type: 'number',
                                  value: Number((Number(data.row.adminJulTarget) * Number(100)).toFixed(2)),
                                  size: 'small'
                                },
                                on: {
                                  'on-blur': (e) => {
                                    this.changeAmount(data, e, 7)
                                  }
                                }
                              })
                            ])
                          } else {
                            return h('div', [
                              h('span', {

                              }, Number((Number(data.row.adminJulTarget) * Number(100)).toFixed(2)))
                            ])
                          }
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            title: "8月",
            align: "center",
            className: "orgAug",            
            renderHeader: (h, data) => {
              return h('div', {
                'class': {
                  inputCss: true
                },
              },[
                h("Input", {
                  style: {
                    width: "15px",
                   background:'transparent'
                    
                  },
                  props: {
                    type: 'checkbox'
                  },
                  on: {
                    'on-input-change': (e) => {
                      this.choseMonth(data, e, 8)
                    }
                  }
                }),
                h("span", {}, "8月")
              ])
            },
            children: [
              {
                title: "100",
                align: "center",
                width: 110,
                children: [
                  {
                    key: "orgAugTarget",
                    title: " ",
                    align: "center",
                    width: 110,
                    children: [
                      {
                        key: "adminAugTarget",
                        title: "比例（%）",
                        align: "center",
                        width: 110,
                        render: (h, data) => {
                          if (data.row.isInput8) {
                            return h('div', [
                              h('i-input', {
                                props: {
                                  // type: 'number',
                                  value: Number((Number(data.row.adminAugTarget) * Number(100)).toFixed(2)),
                                  size: 'small'
                                },
                                on: {
                                  'on-blur': (e) => {
                                    this.changeAmount(data, e, 8)
                                  }
                                }
                              })
                            ])
                          } else {
                            return h('div', [
                              h('span', {

                              }, Number((Number(data.row.adminAugTarget) * Number(100)).toFixed(2)))
                            ])
                          }
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            title: "9月",
            align: "center",
            className: "orgSept",            
            renderHeader: (h, data) => {
              return h('div',{
                'class': {
                  inputCss: true
                },
              }, [
                h("Input", {
                  style: {
                    width: "15px",
                   background:'transparent'
                    
                  },
                  props: {
                    type: 'checkbox'
                  },
                  on: {
                    'on-input-change': (e) => {
                      this.choseMonth(data, e, 9)
                    }
                  }
                }),
                h("span", {}, "9月")
              ])
            },
            children: [
              {
                title: "100",
                align: "center",
                width: 110,
                children: [
                  {
                    key: "orgSeptTarget",
                    title: " ",
                    align: "center",
                    width: 110,
                    children: [
                      {
                        key: "adminSeptTarget",
                        title: "比例（%）",
                        align: "center",
                        width: 110,
                        render: (h, data) => {
                          if (data.row.isInput9) {
                            return h('div', [
                              h('i-input', {
                                props: {
                                  // type: 'number',
                                  value: Number((Number(data.row.adminSeptTarget) * Number(100)).toFixed(2)),
                                  size: 'small'
                                },
                                on: {
                                  'on-blur': (e) => {
                                    this.changeAmount(data, e, 9)
                                  }
                                }
                              })
                            ])
                          } else {
                            return h('div', [
                              h('span', {

                              }, Number((Number(data.row.adminSeptTarget) * Number(100)).toFixed(2)))
                            ])
                          }
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            title: "10月",
            align: "center",
            className: "orgOct",            
            renderHeader: (h, data) => {
              return h('div',{
                'class': {
                  inputCss: true
                },
              }, [
                h("Input", {
                  style: {
                    width: "15px",
                   background:'transparent'
                    
                  },
                  props: {
                    type: 'checkbox'
                  },
                  on: {
                    'on-input-change': (e) => {
                      this.choseMonth(data, e, 10)
                    }
                  }
                }),
                h("span", {}, "10月")
              ])
            },
            children: [
              {
                title: "100",
                align: "center",
                width: 110,
                children: [
                  {
                    key: "orgOctTarget",
                    title: " ",
                    align: "center",
                    width: 110,
                    children: [
                      {
                        key: "adminOctTarget",
                        title: "比例（%）",
                        align: "center",
                        width: 110,
                        render: (h, data) => {
                          if (data.row.isInput10) {
                            return h('div', [
                              h('i-input', {
                                props: {
                                  // type: 'number',
                                  value: Number((Number(data.row.adminOctTarget) * Number(100)).toFixed(2)),
                                  size: 'small'
                                },
                                on: {
                                  'on-blur': (e) => {
                                    this.changeAmount(data, e, 10)
                                  }
                                }
                              })
                            ])
                          } else {
                            return h('div', [
                              h('span', {

                              }, Number((Number(data.row.adminOctTarget) * Number(100)).toFixed(2)))
                            ])
                          }
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            title: "11月",
            align: "center",
            className: "orgNov",            
            renderHeader: (h, data) => {
              return h('div', {
                'class': {
                  inputCss: true
                },
              },[
                h("Input", {
                  style: {
                    width: "15px",
                   background:'transparent'
                    
                  },
                  props: {
                    type: 'checkbox'
                  },
                  on: {
                    'on-input-change': (e) => {
                      this.choseMonth(data, e, 11)
                    }
                  }
                }),
                h("span", {}, "11月")
              ])
            },
            children: [
              {
                title: "100",
                align: "center",
                width: 110,
                children: [
                  {
                    key: "orgNovTarget",
                    title: " ",
                    align: "center",
                    width: 110,
                    children: [
                      {
                        key: "adminNovTarget",
                        title: "比例（%）",
                        align: "center",
                        width: 110,
                        render: (h, data) => {
                          if (data.row.isInput11) {
                            return h('div', [
                              h('i-input', {
                                props: {
                                  // type: 'number',
                                  value: Number((Number(data.row.adminNovTarget) * Number(100)).toFixed(2)),
                                  size: 'small'
                                },
                                on: {
                                  'on-blur': (e) => {
                                    this.changeAmount(data, e, 11)
                                  }
                                }
                              })
                            ])
                          } else {
                            return h('div', [
                              h('span', {

                              }, Number((Number(data.row.adminNovTarget) * Number(100)).toFixed(2)))
                            ])
                          }
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            title: "12月",
            align: "center",
            className: "orgDec",            
            renderHeader: (h, data) => {
              return h('div', {
                'class': {
                  inputCss: true
                },
              },[
                h("Input", {
                  style: {
                    width: "15px",
                   background:'transparent'
                    
                  },
                  props: {
                    type: 'checkbox'
                  },
                  on: {
                    'on-input-change': (e) => {
                      this.choseMonth(data, e, 12)
                    }
                  }
                }),
                h("span", {}, "12月")
              ])
            },
            children: [
              {
                title: "100",
                align: "center",
                width: 110,
                children: [
                  {
                    key: "orgDecTarget",
                    title: " ",
                    align: "center",
                    width: 110,
                    children: [
                      {
                        key: "adminDecTarget",
                        title: "比例（%）",
                        align: "center",
                        width: 110,
                        render: (h, data) => {
                          if (data.row.isInput12) {
                            return h('div', [
                              h('i-input', {
                                props: {
                                  // type: 'number',
                                  value: Number((Number(data.row.adminDecTarget) * Number(100)).toFixed(2)),
                                  size: 'small'
                                },
                                on: {
                                  'on-blur': (e) => {
                                    this.changeAmount(data, e, 12)
                                  }
                                }
                              })
                            ])
                          } else {
                            return h('div', [
                              h('span', {

                              }, Number((Number(data.row.adminDecTarget) * Number(100)).toFixed(2)))
                            ])
                          }
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    },
    created() {
      this.getDepeartmentList();
      let date = new Date();
      this.formItem.selectYear = String(date.getFullYear());
      this.formItem.type = 0;
      this.getListAdminProductMonth();
      let data = new Date();
      this.nowYear = data.getFullYear();
      this.nowMonth = data.getMonth() + 1;
    },

    methods: {
      // 时间格式
      addZero(m) {
        return m < 10 ? '0' + m : m
      },
      // 列表
      getListAdminProductMonth() {
        this.$Spin.show()
        let form = {
          orgId: this.formItem.orgId,
          selectYear: this.formItem.selectYear,
          type: this.formItem.type
        }
                form.time=new Date().getTime();

        listAdminProductMonth(form).then(res => {
          let that = this;
          this.orgTargetAmountList.janTarget = res.response.orgJanTarget;
          this.orgTargetAmountList.febTarget = res.response.orgFebTarget;
          this.orgTargetAmountList.marTarget = res.response.orgMarTarget;
          this.orgTargetAmountList.aprTarget = res.response.orgAprTarget;
          this.orgTargetAmountList.mayTarget = res.response.orgMayTarget;
          this.orgTargetAmountList.junTarget = res.response.orgJunTarget;
          this.orgTargetAmountList.julTarget = res.response.orgJulTarget;
          this.orgTargetAmountList.augTarget = res.response.orgAugTarget;
          this.orgTargetAmountList.septTarget = res.response.orgSeptTarget;
          this.orgTargetAmountList.octTarget = res.response.orgOctTarget;
          this.orgTargetAmountList.novTarget = res.response.orgNovTarget;
          this.orgTargetAmountList.decTarget = res.response.orgDecTarget;
          this.orgTargetAmountList.orgId = res.response.orgId;
          this.orgTargetAmountList.orgName = res.response.orgName;
          this.orgTargetAmountList.selectYear = res.response.selectYear;
          this.orgTargetAmountList.targetType = res.response.targetType;
          this.tableData = res.response.pfObjectAdminMonthSaveVOs;
          if (this.tableData != null) {
            for (let i = 0; i < this.tableData.length; i++) {
              this.tableData[i].isInput1 = false;
              this.tableData[i].isInput2 = false;
              this.tableData[i].isInput3 = false;
              this.tableData[i].isInput4 = false;
              this.tableData[i].isInput5 = false;
              this.tableData[i].isInput6 = false;
              this.tableData[i].isInput7 = false;
              this.tableData[i].isInput8 = false;
              this.tableData[i].isInput9 = false;
              this.tableData[i].isInput10 = false;
              this.tableData[i].isInput11 = false;
              this.tableData[i].isInput12 = false;
            }
          }
          let residualAssignment1 = 0;
          let residualAssignment2 = 0;
          let residualAssignment3 = 0;
          let residualAssignment4 = 0;
          let residualAssignment5 = 0;
          let residualAssignment6 = 0;
          let residualAssignment7 = 0;
          let residualAssignment8 = 0;
          let residualAssignment9 = 0;
          let residualAssignment10 = 0;
          let residualAssignment11 = 0;
          let residualAssignment12 = 0;
          this.tableData.map(item => {

            var year = new Date(item.entryTime).getFullYear();
            var month = new Date(item.entryTime).getMonth() + 1;
            var date = new Date(item.entryTime).getDate();
            let data = year + '-' + that.addZero(month) + '-' + that.addZero(date);
            item.entTime = data;
            residualAssignment1 = residualAssignment1 + item.adminJanTarget
            residualAssignment2 = residualAssignment2 + item.adminFebTarget
            residualAssignment3 = residualAssignment3 + item.adminMarTarget
            residualAssignment4 = residualAssignment4 + item.adminAprTarget
            residualAssignment5 = residualAssignment5 + item.adminMayTarget
            residualAssignment6 = residualAssignment6 + item.adminJunTarget
            residualAssignment7 = residualAssignment7 + item.adminJulTarget
            residualAssignment8 = residualAssignment8 + item.adminAugTarget
            residualAssignment9 = residualAssignment9 + item.adminSeptTarget
            residualAssignment10 = residualAssignment10 + item.adminOctTarget
            residualAssignment11 = residualAssignment11 + item.adminNovTarget
            residualAssignment12 = residualAssignment12 + item.adminDecTarget
          })

          $(".column0").parent().find("th").eq(1).find("span").text(String(this.orgTargetAmountList.janTarget))
          $(".column0").parent().find("th").eq(2).find("span").text(String(this.orgTargetAmountList.febTarget))
          $(".column0").parent().find("th").eq(3).find("span").text(String(this.orgTargetAmountList.marTarget))
          $(".column0").parent().find("th").eq(4).find("span").text(String(this.orgTargetAmountList.aprTarget))
          $(".column0").parent().find("th").eq(5).find("span").text(String(this.orgTargetAmountList.mayTarget))
          $(".column0").parent().find("th").eq(6).find("span").text(String(this.orgTargetAmountList.junTarget))
          $(".column0").parent().find("th").eq(7).find("span").text(String(this.orgTargetAmountList.julTarget))
          $(".column0").parent().find("th").eq(8).find("span").text(String(this.orgTargetAmountList.augTarget))
          $(".column0").parent().find("th").eq(9).find("span").text(String(this.orgTargetAmountList.septTarget))
          $(".column0").parent().find("th").eq(10).find("span").text(String(this.orgTargetAmountList.octTarget))
          $(".column0").parent().find("th").eq(11).find("span").text(String(this.orgTargetAmountList.novTarget))
          $(".column0").parent().find("th").eq(12).find("span").text(String(this.orgTargetAmountList.decTarget))

          $(".column1").parent().find("th").eq(1).find("span").text(String(100 - (Number(residualAssignment1) * Number(100)).toFixed(0)) + '%')
          $(".column1").parent().find("th").eq(2).find("span").text(String(100 - (Number(residualAssignment2) * Number(100)).toFixed(0)) + '%')
          $(".column1").parent().find("th").eq(3).find("span").text(String(100 - (Number(residualAssignment3) * Number(100)).toFixed(0)) + '%')
          $(".column1").parent().find("th").eq(4).find("span").text(String(100 - (Number(residualAssignment4) * Number(100)).toFixed(0)) + '%')
          $(".column1").parent().find("th").eq(5).find("span").text(String(100 - (Number(residualAssignment5) * Number(100)).toFixed(0)) + '%')
          $(".column1").parent().find("th").eq(6).find("span").text(String(100 - (Number(residualAssignment6) * Number(100)).toFixed(0)) + '%')
          $(".column1").parent().find("th").eq(7).find("span").text(String(100 - (Number(residualAssignment7) * Number(100)).toFixed(0)) + '%')
          $(".column1").parent().find("th").eq(8).find("span").text(String(100 - (Number(residualAssignment8) * Number(100)).toFixed(0)) + '%')
          $(".column1").parent().find("th").eq(9).find("span").text(String(100 - (Number(residualAssignment9) * Number(100)).toFixed(0)) + '%')
          $(".column1").parent().find("th").eq(10).find("span").text(String(100 - (Number(residualAssignment10) * Number(100)).toFixed(0)) + '%')
          $(".column1").parent().find("th").eq(11).find("span").text(String(100 - (Number(residualAssignment11) * Number(100)).toFixed(0)) + '%')
          $(".column1").parent().find("th").eq(12).find("span").text(String(100 - (Number(residualAssignment12) * Number(100)).toFixed(0)) + '%')

          this.showData = true;

          this.$Spin.hide();
        })
      },
      changeTab1() {
        this.$router.push({ name: 'productTaskSet' })
      },
      changeTab2() {
        this.getListAdminProductMonth()
      },
      // 部门
      getDepeartmentList(name) {
        let form = {
          name: name ? name : ' ',
          type: 2
        }
        pfDeptSelect(form).then(res => {
          this.departmentList = res.response
        })
      },
      getDepartments(data) {
        this.getDepeartmentList(data)
      },
      //查询
      findData() {
        if (this.formItem.selectYear != '') {
          var d = new Date(this.formItem.selectYear);
          let year = d.getFullYear();
          this.formItem.selectYear = String(year);
        }
                this.monthtest();

        this.getListAdminProductMonth();
      },
      //保存
      saveData() {
        this.$Modal.confirm({
          title: '保存提示',
          content: '<p>请确定是保存数据？</p>',
          onOk: () => {
            if (this.validateData()) {
              this.$Spin.show()
              let items = []
              this.tableData.map(item => {
                items.push({
                  adminId: item.adminId,
                  adminName: item.adminName,
                  adminJanTarget: item.adminJanTarget,
                  adminJanTime: item.adminJanTime,
                  entryTime: item.entryTime,
                  adminFebTarget: item.adminFebTarget,
                  adminFebTime: item.adminFebTime,
                  adminMarTarget: item.adminMarTarget,
                  adminMarTime: item.adminMarTime,
                  adminAprTarget: item.adminAprTarget,
                  adminAprTime: item.adminAprTime,
                  adminMayTarget: item.adminMayTarget,
                  adminMayTime: item.adminMayTime,
                  adminJunTarget: item.adminJunTarget,
                  adminJunTime: item.adminJunTime,
                  adminJulTarget: item.adminJulTarget,
                  adminJulTime: item.adminJulTime,
                  adminAugTarget: item.adminAugTarget,
                  adminAugTime: item.adminAugTime,
                  adminSeptTarget: item.adminSeptTarget,
                  adminSeptTime: item.adminSeptTime,
                  adminOctTarget: item.adminOctTarget,
                  adminOctTime: item.adminOctTime,
                  adminNovTarget: item.adminNovTarget,
                  adminNovTime: item.adminNovTime,
                  adminDecTarget: item.adminDecTarget,
                  adminDecTime: item.adminDecTime
                })
              })
              let form = {
                orgId: this.orgTargetAmountList.orgId,
                orgName: this.orgTargetAmountList.orgName,
                selectYear: this.orgTargetAmountList.selectYear,
                targetType: this.orgTargetAmountList.targetType,
                pfObjectAdminMonthSaveVOs: items
              }
              saveAdminProductMonth(form).then(res => {
                this.tableData.map(item => {
                  item.isInput1 = false;
                  item.isInput2 = false;
                  item.isInput3 = false;
                  item.isInput4 = false;
                  item.isInput5 = false;
                  item.isInput6 = false;
                  item.isInput7 = false;
                  item.isInput8 = false;
                  item.isInput9 = false;
                  item.isInput10 = false;
                  item.isInput11 = false;
                  item.isInput12 = false;
                  this.monthtest();
                })
                const arr = new Array(...this.tableData);
                this.tableData = arr;
                // this.getListAdminProductMonth()
              })
            }
          },
          onCancel: () => {
          }
        });

      },
      //编辑
      editData() {
        var d = new Date(this.formItem.selectYear);
        let year = d.getFullYear();
        this.formItem.selectYear = String(year);


        if (this.nowYear < this.formItem.selectYear) {

          this.tableData.map(item => {
            item.isInput1 = true;
            item.isInput2 = true;
            item.isInput3 = true;
            item.isInput4 = true;
            item.isInput5 = true;
            item.isInput6 = true;
            item.isInput7 = true;
            item.isInput8 = true;
            item.isInput9 = true;
            item.isInput10 = true;
            item.isInput11 = true;
            item.isInput12 = true;
          })
          const arr = new Array(...this.tableData);
          this.tableData = arr;
        } else if (this.nowYear > this.formItem.selectYear) {
          this.$Message.error("不能编辑")
          this.tableData.map(item => {
            item.isInput1 = false;
            item.isInput2 = false;
            item.isInput3 = false;
            item.isInput4 = false;
            item.isInput5 = false;
            item.isInput6 = false;
            item.isInput7 = false;
            item.isInput8 = false;
            item.isInput9 = false;
            item.isInput10 = false;
            item.isInput11 = false;
            item.isInput12 = false;
          })
          const arr = new Array(...this.tableData);
          this.tableData = arr;
        } else if (this.nowMonth == 1) {
          this.tableData.map(item => {
            item.isInput1 = true;
            item.isInput2 = true;
            item.isInput3 = true;
            item.isInput4 = true;
            item.isInput5 = true;
            item.isInput6 = true;
            item.isInput7 = true;
            item.isInput8 = true;
            item.isInput9 = true;
            item.isInput10 = true;
            item.isInput11 = true;
            item.isInput12 = true;
          })
          const arr = new Array(...this.tableData);
          this.tableData = arr;
        } else if (this.nowMonth == 2) {
          this.tableData.map(item => {
            item.isInput1 = false;
            item.isInput2 = true;
            item.isInput3 = true;
            item.isInput4 = true;
            item.isInput5 = true;
            item.isInput6 = true;
            item.isInput7 = true;
            item.isInput8 = true;
            item.isInput9 = true;
            item.isInput10 = true;
            item.isInput11 = true;
            item.isInput12 = true;
          })
          const arr = new Array(...this.tableData);
          this.tableData = arr;
        } else if (this.nowMonth == 3) {
          this.tableData.map(item => {
            item.isInput1 = false;
            item.isInput2 = false;
            item.isInput3 = true;
            item.isInput4 = true;
            item.isInput5 = true;
            item.isInput6 = true;
            item.isInput7 = true;
            item.isInput8 = true;
            item.isInput9 = true;
            item.isInput10 = true;
            item.isInput11 = true;
            item.isInput12 = true;
          })
          const arr = new Array(...this.tableData);
          this.tableData = arr;
        } else if (this.nowMonth == 4) {
          this.tableData.map(item => {
            item.isInput1 = false;
            item.isInput2 = false;
            item.isInput3 = false;
            item.isInput4 = true;
            item.isInput5 = true;
            item.isInput6 = true;
            item.isInput7 = true;
            item.isInput8 = true;
            item.isInput9 = true;
            item.isInput10 = true;
            item.isInput11 = true;
            item.isInput12 = true;
          })
          const arr = new Array(...this.tableData);
          this.tableData = arr;
        } else if (this.nowMonth == 5) {
          this.tableData.map(item => {
            item.isInput1 = false;
            item.isInput2 = false;
            item.isInput3 = false;
            item.isInput4 = false;
            item.isInput5 = true;
            item.isInput6 = true;
            item.isInput7 = true;
            item.isInput8 = true;
            item.isInput9 = true;
            item.isInput10 = true;
            item.isInput11 = true;
            item.isInput12 = true;
          })
          const arr = new Array(...this.tableData);
          this.tableData = arr;
        } else if (this.nowMonth == 6) {
          this.tableData.map(item => {
            item.isInput1 = false;
            item.isInput2 = false;
            item.isInput3 = false;
            item.isInput4 = false;
            item.isInput5 = false;
            item.isInput6 = true;
            item.isInput7 = true;
            item.isInput8 = true;
            item.isInput9 = true;
            item.isInput10 = true;
            item.isInput11 = true;
            item.isInput12 = true;
          })
          const arr = new Array(...this.tableData);
          this.tableData = arr;
        } else if (this.nowMonth == 7) {
          this.tableData.map(item => {
            item.isInput1 = false;
            item.isInput2 = false;
            item.isInput3 = false;
            item.isInput4 = false;
            item.isInput5 = false;
            item.isInput6 = false;
            item.isInput7 = true;
            item.isInput8 = true;
            item.isInput9 = true;
            item.isInput10 = true;
            item.isInput11 = true;
            item.isInput12 = true;
          })
          const arr = new Array(...this.tableData);
          this.tableData = arr;
        } else if (this.nowMonth == 8) {
          this.tableData.map(item => {
            item.isInput1 = false;
            item.isInput2 = false;
            item.isInput3 = false;
            item.isInput4 = false;
            item.isInput5 = false;
            item.isInput6 = false;
            item.isInput7 = false;
            item.isInput8 = true;
            item.isInput9 = true;
            item.isInput10 = true;
            item.isInput11 = true;
            item.isInput12 = true;
          })
          const arr = new Array(...this.tableData);
          this.tableData = arr;
        } else if (this.nowMonth == 9) {
          this.tableData.map(item => {
            item.isInput1 = false;
            item.isInput2 = false;
            item.isInput3 = false;
            item.isInput4 = false;
            item.isInput5 = false;
            item.isInput6 = false;
            item.isInput7 = false;
            item.isInput8 = false;
            item.isInput9 = true;
            item.isInput10 = true;
            item.isInput11 = true;
            item.isInput12 = true;
          })
          const arr = new Array(...this.tableData);
          this.tableData = arr;
        } else if (this.nowMonth == 10) {
          this.tableData.map(item => {
            item.isInput1 = false;
            item.isInput2 = false;
            item.isInput3 = false;
            item.isInput4 = false;
            item.isInput5 = false;
            item.isInput6 = false;
            item.isInput7 = false;
            item.isInput8 = false;
            item.isInput9 = false;
            item.isInput10 = true;
            item.isInput11 = true;
            item.isInput12 = true;
          })
          const arr = new Array(...this.tableData);
          this.tableData = arr;
        } else if (this.nowMonth == 11) {
          this.tableData.map(item => {
            item.isInput1 = false;
            item.isInput2 = false;
            item.isInput3 = false;
            item.isInput4 = false;
            item.isInput5 = false;
            item.isInput6 = false;
            item.isInput7 = false;
            item.isInput8 = false;
            item.isInput9 = false;
            item.isInput10 = false;
            item.isInput11 = true;
            item.isInput12 = true;
          })
          const arr = new Array(...this.tableData);
          this.tableData = arr;
        } else if (this.nowMonth == 12) {
          this.tableData.map(item => {
            item.isInput1 = false;
            item.isInput2 = false;
            item.isInput3 = false;
            item.isInput4 = false;
            item.isInput5 = false;
            item.isInput6 = false;
            item.isInput7 = false;
            item.isInput8 = false;
            item.isInput9 = false;
            item.isInput10 = false;
            item.isInput11 = false;
            item.isInput12 = true;
          })
          const arr = new Array(...this.tableData);
          this.tableData = arr;
        }





      },


      //重置
      resetData() {
        this.$Modal.confirm({
          title: '重置提示',
          content: '<p>请确定是否重置？</p>',
          onOk: () => {
            this.findData();
          },
          onCancel: () => {
          }
        });
      },
      // 清空所选
      monthtest() {
        $(".jan").find("input")[0].checked = false;
        $(".orgFeb").find("input")[0].checked = false;
        $(".Mar").find("input")[0].checked = false;
        $(".orgApr").find("input")[0].checked = false;
        $(".orgMay").find("input")[0].checked = false;
        $(".orgJun").find("input")[0].checked = false;
        $(".orgJul").find("input")[0].checked = false;
        $(".orgAug").find("input")[0].checked = false;
        $(".orgSept").find("input")[0].checked = false;
        $(".orgOct").find("input")[0].checked = false;
        $(".orgNov").find("input")[0].checked = false;
        $(".orgDec").find("input")[0].checked = false;
        
        this.indexNum = 0;
      },
      //勾选月份
      choseMonth(data, e, num) {
        if (e.target.checked) {
          this.indexNum = this.indexNum + 1;
        } else {
          this.indexNum = this.indexNum - 1;
        
        }
        if (this.indexNum > 1) {
          this.$Message.error("勾选不能大于1,请重新选择");
          this.monthtest();
          return false;
        } else {
          var d = new Date(this.formItem.selectYear);
          let year = d.getFullYear();
          this.formItem.selectYear = String(year);
          this.allData = [];
          if (num == 1) {
            this.tableData.map(item => {
              this.allData.push(item.adminJanTarget)
            })
          } else if (num == 2) {
            this.tableData.map(item => {
              this.allData.push(item.adminFebTarget)
            })
          } else if (num == 3) {
            this.tableData.map(item => {
              this.allData.push(item.adminMarTarget)
            })
          } else if (num == 4) {
            this.tableData.map(item => {
              this.allData.push(item.adminAprTarget)
            })
          } else if (num == 5) {
            this.tableData.map(item => {
              this.allData.push(item.adminMayTarget)
            })
          } else if (num == 6) {
            this.tableData.map(item => {
              this.allData.push(item.adminJunTarget)
            })
          } else if (num == 7) {
            this.tableData.map(item => {
              this.allData.push(item.adminJulTarget)
            })
          } else if (num == 8) {
            this.tableData.map(item => {
              this.allData.push(item.adminAugTarget)
            })
          } else if (num == 9) {
            this.tableData.map(item => {
              this.allData.push(item.adminSeptTarget)
            })
          } else if (num == 10) {
            this.tableData.map(item => {
              this.allData.push(item.adminOctTarget)
            })
          } else if (num == 11) {
            this.tableData.map(item => {
              this.allData.push(item.adminNovTarget)
            })
          } else if (num == 12) {
            this.tableData.map(item => {
              this.allData.push(item.adminDecTarget)
            })
          }
          if (e.target.checked) {
            if (this.formItem.selectYear > this.nowYear) {
              this.choseI = num
            } else if (this.formItem.selectYear == this.nowYear && this.nowMonth >= num) {
              this.choseI = this.nowMonth
            } else if (this.formItem.selectYear == this.nowYear && this.nowMonth < num) {
              this.choseI = num
            }
          } else {
            this.choseI = 0;
          }
        }



      },

      //快速分派
      rapidDispatch() {
        let index = false;
        if (this.tableData[0].isInput1 || this.tableData[0].isInput2 || this.tableData[0].isInput3 || this.tableData[0].isInput4 ||
          this.tableData[0].isInput5 || this.tableData[0].isInput6 || this.tableData[0].isInput7 || this.tableData[0].isInput8 ||
          this.tableData[0].isInput9 || this.tableData[0].isInput10 || this.tableData[0].isInput11 || this.tableData[0].isInput12) {
          index = true;
        } else {
          index = false
        }
        let show = false;
        
        if (index && this.indexNum != 0) {
          show = true;
        } else {
          show = false;
        }
        if (!show) {
          this.$Message.error("请确保是否点击编辑并正确勾选月份")
        } else {
          this.$Modal.confirm({
            title: '快速分派提示',
            content: '<p>请确定是否快速分派?分派后点击保存按钮</p>',
            onOk: () => {
              if (this.choseI == 1) {

                for (let i = 0; i < this.tableData.length; i++) {
                  this.tableData[i].adminJanTarget = this.allData[i];
                  this.tableData[i].adminFebTarget = this.allData[i];
                  this.tableData[i].adminMarTarget = this.allData[i];
                  this.tableData[i].adminAprTarget = this.allData[i];
                  this.tableData[i].adminMayTarget = this.allData[i];
                  this.tableData[i].adminJunTarget = this.allData[i];
                  this.tableData[i].adminJulTarget = this.allData[i];
                  this.tableData[i].adminAugTarget = this.allData[i];
                  this.tableData[i].adminSeptTarget = this.allData[i];
                  this.tableData[i].adminOctTarget = this.allData[i];
                  this.tableData[i].adminNovTarget = this.allData[i];
                  this.tableData[i].adminDecTarget = this.allData[i];
                }
              } else if (this.choseI == 2) {

                for (let i = 0; i < this.tableData.length; i++) {
                  this.tableData[i].adminFebTarget = this.allData[i];
                  this.tableData[i].adminMarTarget = this.allData[i];
                  this.tableData[i].adminAprTarget = this.allData[i];
                  this.tableData[i].adminMayTarget = this.allData[i];
                  this.tableData[i].adminJunTarget = this.allData[i];
                  this.tableData[i].adminJulTarget = this.allData[i];
                  this.tableData[i].adminAugTarget = this.allData[i];
                  this.tableData[i].adminSeptTarget = this.allData[i];
                  this.tableData[i].adminOctTarget = this.allData[i];
                  this.tableData[i].adminNovTarget = this.allData[i];
                  this.tableData[i].adminDecTarget = this.allData[i];
                }
              } else if (this.choseI == 3) {

                for (let i = 0; i < this.tableData.length; i++) {
                  this.tableData[i].adminMarTarget = this.allData[i];
                  this.tableData[i].adminAprTarget = this.allData[i];
                  this.tableData[i].adminMayTarget = this.allData[i];
                  this.tableData[i].adminJunTarget = this.allData[i];
                  this.tableData[i].adminJulTarget = this.allData[i];
                  this.tableData[i].adminAugTarget = this.allData[i];
                  this.tableData[i].adminSeptTarget = this.allData[i];
                  this.tableData[i].adminOctTarget = this.allData[i];
                  this.tableData[i].adminNovTarget = this.allData[i];
                  this.tableData[i].adminDecTarget = this.allData[i];
                }
              } else if (this.choseI == 4) {

                for (let i = 0; i < this.tableData.length; i++) {
                  this.tableData[i].adminAprTarget = this.allData[i];
                  this.tableData[i].adminMayTarget = this.allData[i];
                  this.tableData[i].adminJunTarget = this.allData[i];
                  this.tableData[i].adminJulTarget = this.allData[i];
                  this.tableData[i].adminAugTarget = this.allData[i];
                  this.tableData[i].adminSeptTarget = this.allData[i];
                  this.tableData[i].adminOctTarget = this.allData[i];
                  this.tableData[i].adminNovTarget = this.allData[i];
                  this.tableData[i].adminDecTarget = this.allData[i];
                }
              } else if (this.choseI == 5) {

                for (let i = 0; i < this.tableData.length; i++) {
                  this.tableData[i].adminMayTarget = this.allData[i];
                  this.tableData[i].adminJunTarget = this.allData[i];
                  this.tableData[i].adminJulTarget = this.allData[i];
                  this.tableData[i].adminAugTarget = this.allData[i];
                  this.tableData[i].adminSeptTarget = this.allData[i];
                  this.tableData[i].adminOctTarget = this.allData[i];
                  this.tableData[i].adminNovTarget = this.allData[i];
                  this.tableData[i].adminDecTarget = this.allData[i];
                }
              } else if (this.choseI == 6) {

                for (let i = 0; i < this.tableData.length; i++) {
                  this.tableData[i].adminJunTarget = this.allData[i];
                  this.tableData[i].adminJulTarget = this.allData[i];
                  this.tableData[i].adminAugTarget = this.allData[i];
                  this.tableData[i].adminSeptTarget = this.allData[i];
                  this.tableData[i].adminOctTarget = this.allData[i];
                  this.tableData[i].adminNovTarget = this.allData[i];
                  this.tableData[i].adminDecTarget = this.allData[i];
                }
              } else if (this.choseI == 7) {

                for (let i = 0; i < this.tableData.length; i++) {
                  this.tableData[i].adminJulTarget = this.allData[i];
                  this.tableData[i].adminAugTarget = this.allData[i];
                  this.tableData[i].adminSeptTarget = this.allData[i];
                  this.tableData[i].adminOctTarget = this.allData[i];
                  this.tableData[i].adminNovTarget = this.allData[i];
                  this.tableData[i].adminDecTarget = this.allData[i];
                }
              } else if (this.choseI == 8) {

                for (let i = 0; i < this.tableData.length; i++) {
                  this.tableData[i].adminAugTarget = this.allData[i];
                  this.tableData[i].adminSeptTarget = this.allData[i];
                  this.tableData[i].adminOctTarget = this.allData[i];
                  this.tableData[i].adminNovTarget = this.allData[i];
                  this.tableData[i].adminDecTarget = this.allData[i];
                }
              } else if (this.choseI == 9) {

                for (let i = 0; i < this.tableData.length; i++) {
                  this.tableData[i].adminSeptTarget = this.allData[i];
                  this.tableData[i].adminOctTarget = this.allData[i];
                  this.tableData[i].adminNovTarget = this.allData[i];
                  this.tableData[i].adminDecTarget = this.allData[i];
                }
              } else if (this.choseI == 10) {

                for (let i = 0; i < this.tableData.length; i++) {
                  this.tableData[i].adminOctTarget = this.allData[i];
                  this.tableData[i].adminNovTarget = this.allData[i];
                  this.tableData[i].adminDecTarget = this.allData[i];
                }
              } else if (this.choseI == 11) {

                for (let i = 0; i < this.tableData.length; i++) {
                  this.tableData[i].adminNovTarget = this.allData[i];
                  this.tableData[i].adminDecTarget = this.allData[i];
                }
              } else if (this.choseI == 12) {

                for (let i = 0; i < this.tableData.length; i++) {
                  this.tableData[i].adminDecTarget = this.allData[i];
                }
              }


              const arr = new Array(...this.tableData);
              this.tableData = arr;

            },
            onCancel: () => {
            }
          });
        }


      },
      //设置输入框的值
      changeAmount(data, e, num) {
        let value = e.target.value
        this.monthtest();        
        if (value == '') {
          value = 0
        }
        if (num == 1) {
          this.tableData[data.index].adminJanTarget = Number((Number(value) / Number(100)).toFixed(4))
        } else if (num == 2) {
          this.tableData[data.index].adminFebTarget = Number((Number(value) / Number(100)).toFixed(4))
        } else if (num == 3) {
          this.tableData[data.index].adminMarTarget = Number((Number(value) / Number(100)).toFixed(4))
        } else if (num == 4) {
          this.tableData[data.index].adminAprTarget = Number((Number(value) / Number(100)).toFixed(4))
        } else if (num == 5) {
          this.tableData[data.index].adminMayTarget = Number((Number(value) / Number(100)).toFixed(4))
        } else if (num == 6) {
          this.tableData[data.index].adminJunTarget = Number((Number(value) / Number(100)).toFixed(4))
        } else if (num == 7) {
          this.tableData[data.index].adminJulTarget = Number((Number(value) / Number(100)).toFixed(4))
        } else if (num == 8) {
          this.tableData[data.index].adminAugTarget = Number((Number(value) / Number(100)).toFixed(4))
        } else if (num == 9) {
          this.tableData[data.index].adminSeptTarget = Number((Number(value) / Number(100)).toFixed(4))
        } else if (num == 10) {
          this.tableData[data.index].adminOctTarget = Number((Number(value) / Number(100)).toFixed(4))
        } else if (num == 11) {
          this.tableData[data.index].adminNovTarget = Number((Number(value) / Number(100)).toFixed(4))
        } else if (num == 12) {
          this.tableData[data.index].adminDecTarget = Number((Number(value) / Number(100)).toFixed(4))
        }
      },
      //校验数据
      validateData() {
        let totalJan = Number(0)
        let totalFeb = Number(0)
        let totalMar = Number(0)
        let totalApr = Number(0)
        let totalMay = Number(0)
        let totalJun = Number(0)
        let totalJul = Number(0)
        let totalAug = Number(0)
        let totalSept = Number(0)
        let totalOct = Number(0)
        let totalNov = Number(0)
        let totalDec = Number(0)
        for (let i = 0; i < this.tableData.length; i++) {
          totalJan = Number((totalJan + Number(this.tableData[i].adminJanTarget)).toFixed(2))
          totalFeb = Number((totalFeb + Number(this.tableData[i].adminFebTarget)).toFixed(2))
          totalMar = Number((totalMar + Number(this.tableData[i].adminMarTarget)).toFixed(2))
          totalApr = Number((totalApr + Number(this.tableData[i].adminAprTarget)).toFixed(2))
          totalMay = Number((totalMay + Number(this.tableData[i].adminMayTarget)).toFixed(2))
          totalJun = Number((totalJun + Number(this.tableData[i].adminJunTarget)).toFixed(2))
          totalJul = Number((totalJul + Number(this.tableData[i].adminJulTarget)).toFixed(2))
          totalAug = Number((totalAug + Number(this.tableData[i].adminAugTarget)).toFixed(2))
          totalSept = Number((totalSept + Number(this.tableData[i].adminSeptTarget)).toFixed(2))
          totalOct = Number((totalOct + Number(this.tableData[i].adminOctTarget)).toFixed(2))
          totalNov = Number((totalNov + Number(this.tableData[i].adminNovTarget)).toFixed(2))
          totalDec = Number((totalDec + Number(this.tableData[i].adminDecTarget)).toFixed(2))
        }
        if (totalJan != Number(1) || totalFeb != Number(1) || totalMar != Number(1) || totalApr != Number(1) || totalMay != Number(1) || totalJun != Number(1) || totalJul != Number(1) || totalAug != Number(1) || totalSept != Number(1) || totalOct != Number(1) || totalNov != Number(1) || totalDec != Number(1)) {
          this.$Message.error("月度比例未完全分派")
          return false
        }
        return true
      }
    }
  }
</script>