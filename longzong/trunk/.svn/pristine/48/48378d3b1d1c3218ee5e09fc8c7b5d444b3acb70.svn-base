<style lang="less" scoped>
  .prelabeltext {
    font-size: 14px;
    margin-bottom: 8px;
  }

  .mar-top-20 {
    margin-top: 20px;
  }

  .page {
    margin: 10px 0;
    text-align: right;
    padding-right: 18px;
  }

  .time {
    width: 48% !important;
  }
</style>
<template>
  <Row>
    <Col span="24">
    <Row class-name="current-position">
      当前位置：绩效管理&nbsp;&nbsp;>>&nbsp;&nbsp;报告贡献度上报
    </Row>
    </Col>
    <Col span='24' class-name="search-form">
    <Form ref="formItem" :label-width="120">
      <Row type="flex" justify="space-between">
        <Col span="7">
        <FormItem label="报告编号：">
          <Input type="text" v-model="formDatas.reportCode" class="search-input" placeholder="请输入报告编号" />
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="报告名称：">
          <Input type="text" v-model="formDatas.reportName" class="search-input" placeholder="请输入报告名称" />
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="报告类型：">
          <Select v-model="formDatas.type">
            <Option v-for="item in reportTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        </Col>
      </Row>
      <Row type="flex" justify="space-between">
        <Col span="7">
        <FormItem label="业务员：">
          <Select v-model="formDatas.employeeId" :filterable="true" :clearable="true" :remote-method="keyWordQuery">
            <Option v-for="item in queryData" :value="item.key" :key="item.key">{{ item.value }}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="业务员部门：">
          <bu-men @data-list="getDepData" :emptyModel='formDatas.orgIds'></bu-men>
        </FormItem>
        </Col>
        <!-- <Col span="7">
        <FormItem label="考核周期：">
          <DatePicker format="yyyy-MM" v-model="cycleDates" type="daterange" placement="bottom-end" placeholder="请选择周期" class="search-input"></DatePicker>
        </FormItem>
        </Col> -->
        <Col span="7">
        <FormItem label="考核周期：">
          <DatePicker type="month" format="yyyy/MM" v-model="startTime" placement="bottom" @on-change="getStartDates" placeholder="请选择开始周期"
            class="time search-input "></DatePicker>
          <span>-</span>
          <DatePicker type="month" format="yyyy/MM" v-model="endTime" placement="bottom" @on-change="getEndDates" placeholder="请选择结束周期"
            class="time search-input"></DatePicker>
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24" class="text-right">
        <Button type="primary" @click="queryGo()">查询</Button>
        <Button style="margin-left: 8px" @click="reset">重置</Button>
        </Col>
      </Row>
    </Form>
    </Col>
    <Col span="24" class="mar-top-20">
    <Row class-name="table-con">
      <div style="margin-bottom:20px;">
        <Button type="primary" style="margin-right:8px" @click="moreAdd">批量添加</Button>
        <Button type="primary" @click="exportClick">明细导出</Button>
      </div>
      <Table class="tableCommon" :data="tableData" :columns="columns" :stripe="true" :border="true">
        <div class="page" slot="footer">
          <Page :total="dataCount" show-elevator show-total show-sizer :page-size="formDatas.pageSize" :page-size-opts="pageSizeOpt"
            @on-change="changePageNum" @on-page-size-change="changePageSize" />
        </div>
      </Table>
    </Row>
    </Col>
    <!-- 批量添加弹窗start -->
    <Modal v-model="moreAddModal" title="批量添加" width="1000" @on-visible-change="onVisibleChange">
      <Row>
        <Col span="10">
        <Form style="border:0;">
          <FormItem label="考核月份 ： " :label-width="100" class="search-input">
            <DatePicker v-model="slectTimes" type="month" placeholder="选择时间" class="search-input" @on-change="getMonth"></DatePicker>
          </FormItem>
        </Form>
        </Col>
        <Col span="24">
        <Table class="tableCommon" :data="tableData2" :columns="columns2" :stripe="true" :border="true">
        </Table>
        </Col>
      </Row>
      <div slot="footer">
        <i-button type="primary" @click="saveBatch">保存</i-button>
        <i-button type="default" @click="moreAddModal=false">返回</i-button>
      </div>
    </Modal>
    <!-- 批量添加弹窗end -->
    <!-- 编辑弹窗 -->
    <Modal v-model="editModal" title="编辑" width="800">
      <Row>
        <Form :label-width="120" :model="formEdit" :rules="ruleValidate">
          <Row>
            <Col span="12">
            <FormItem label="报告编号：" :label-width="120" prop="reportCode">
              <span v-html="formEdit.reportCode"></span>
            </FormItem>
            </Col>
            <Col span="12">
            <FormItem label="报告名称：" :label-width="110" prop="reportName">
              <Input type="text" v-model="formEdit.reportName" class="search-input" placeholder="请输入报告名称" />
            </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
            <FormItem label="报告类型：" :label-width="120" prop="type">
              <Select v-model="formEdit.type" filterable>
                <Option v-for="item in reportTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
            </Col>
            <Col span="12">
            <FormItem label="报告日期：" :label-width="110" prop="reportTime">
              <DatePicker format="yyyy/MM/dd" @on-change="changeDate" :value="formEdit.reportTime" type="date" class="search-input" placeholder="请选择日期"></DatePicker>
            </FormItem>
            </Col>

          </Row>
          <Row>
            <Col span="12">
            <FormItem label="考核周期：" prop="indexTime">
              <DatePicker format="yyyy-MM" :value="formEdit.indexTime" @on-change="changeDate1" type="date" class="search-input" placement="bottom-end"
                placeholder="请选择日期"></DatePicker>
            </FormItem>
            </Col>
            <Col span="12">
            <FormItem label="合同编号：" :label-width="110" prop="contractNo">
              <Input type="text" v-model="formEdit.contractNo" class="search-input" @on-blur="changeContractNo" />
              <!-- @change="changeContractNo" -->
            </FormItem>
            </Col>

          </Row>
          <Row>
            <Col span="12">
            <FormItem label="业务员：" :label-width="120" prop="employeeName">
              <span v-html="formEdit.employeeName"></span>
            </FormItem>
            </Col>
            <Col span="12">
            <FormItem label="业务员部门：" :label-width="110" prop="orgWname">
              <span v-html="formEdit.orgWname"></span>
            </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
            <FormItem label="报告金额：" :label-width="120" prop="reportAmount">
              <Input v-model="formEdit.reportAmount" class="search-input" :maxlength="maxlength" @on-blur="changeReportAmount()" />
            </FormItem>
            </Col>
            <Col span="12">
            <FormItem label="报告成本：" :label-width="110" prop="costAmount">
              <Input v-model="formEdit.costAmount" class="search-input" :maxlength="maxlength" @on-blur="changeCostAmount()" />
            </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
            <FormItem label="分配编辑金额：" prop="productAmount">
              <Input v-model="formEdit.productAmount" class="search-input" :maxlength="maxlength" @on-blur="changeProductAmount()" />
            </FormItem>
            </Col>
            <Col>
            <label>&nbsp;</label>
            </Col>
          </Row>
        </Form>
      </Row>
      <div slot="footer">
        <i-button type="primary" @click="okEdit">确认</i-button>
        <i-button type="default" @click="cancelEdit">取消</i-button>
      </div>
    </Modal>
    <!-- 弹窗end -->
    <!-- 比例配置弹窗start -->
    <Modal v-model="configModal" title="比例配置" width="800">
      <Form ref="formPart" :model="formPart" :label-width="160">
        <Row>
          <Col span="12" class="prelabeltext">
          <label>报告编号：</label>
          <span v-html="formPart.reportCode"></span>
          </Col>
          <Col span="12" class="prelabeltext">
          <label>报告名称：</label>
          <span v-html="formPart.reportName">山东淄博原油化工走势图</span>
          </Col>
        </Row>
        <Row>
          <Col span="12">
          <FormItem label="编辑可分配金额：">
            <span v-html="formPart.productAmount">0</span>
          </FormItem>
          </Col>
          <Col span="12" class="prelabeltext">
          <label>贡献百分比：</label>
          <span>100% (注：总合为100%)</span>
          </Col>
        </Row>
      </Form>
      <Row>
        <Table class="tableCommon" :data="tableData3" :columns="columns3" :stripe="true" :border="true"></Table>
      </Row>
      <div slot="footer">
        <i-button type="primary" @click="getSendMes">确认</i-button>
        <i-button type="default" @click="configModal=false">取消</i-button>
      </div>
    </Modal>
    <!-- 比例配置弹窗end -->

  </Row>
</template>

<script>
  import {
    formatStamp,
    formatTime,
    formData,
    getLastMonth,
    formatThousandPrice
  } from "../../../assets/js/common.js";
  import buMen from "../../components/jiXiao/buMen.vue";
  import {
    getPartDatas,
    addBatchIn,
    autoArr,
    powerUp,
    employeeSelect,
    autoDeptId,
    getReportEdit,
    saveEditUp,
    delReportUp,
    exportDetails,
    dePentSave
  } from "../../components/axios/performanceManagement";
  import Vue from "vue";

  export default {
    name: "contributeReport",
    components: {
      buMen
    },
    data() {
      return {
        nameListArr: [],
        hasContractNo: false,
        maxlength: 16,
        ruleValidate: {
          reportCode: [{ required: true, message: "报告编号不能为空" }],
          reportName: [{ required: true, message: "报告名称不能为空" }],
          type: [{ required: true, message: "报告类型不能为空" }],
          reportTime: [{ required: true, message: "报告日期不能为空" }],
          indexTime: [{ required: true, message: "考核周期不能为空" }],
          contractNo: [{ required: true, message: "合同编号不能为空" }],
          reportAmount: [
            { required: true, message: "请输入正确的报告金额", trigger: "blur" }
          ],
          productAmount: [
            { required: true, message: "分配金额不能为空", trigger: "blur" }
          ],
          costAmount: [
            { required: true, message: "报告成本不能为空", trigger: "blur" }
          ],
          employeeName: [{ required: true, message: "业务员不能为空" }],
          orgWname: [{ required: true, message: "业务员部门不能为空" }]
        },
        formDatas: {
          page: 1,
          pageSize: 10,
          employeeId: "",
          indexTimeEnd: "",
          indexTimeStart: "",
          slectTimes: "",
          orgIds: [],
          reportCode: "",
          reportName: "",
          sign: "",
          type: ""
        },
        formPart: {
          reportCode: "DZ20180801001",
          reportName: "山东淄博原油化工走势图",
          productAmount: 260.0
        },
        reportTypeList: [
          {
            label: "全部报告",
            value: ""
          },
          {
            label: "定制报告",
            value: 0
          },
          {
            label: "调研报告",
            value: 1
          }
        ],
        indexTimes: 0,
        queryData: [],
        moreAddModal: false,
        editModal: false,
        removeModal: false,
        configModal: false,
        dataCount: 0,
        showSizer: true,
        pageSizeOpt: [10, 20, 50],
        form: [],
        forms: {},
        // cycleDates: [],
        startTime: "",
        endTime: "",
        formEdit: {
          contractNo: null,
          costAmount: null,
          employeeName: null,
          id: null,
          indexTime: null,
          orgWname: null,
          productAmount: null,
          reportAmount: null,
          reportCode: null,
          reportName: null,
          reportTime: null,
          sign: null,
          type: null
        },
        tableData: [],
        columns: [
          {
            key: "reportCode",
            title: "报告编号",
            align: "center",
            minWidth: 200
          },
          {
            key: "reportName",
            title: "报告名称",
            align: "center",
            minWidth: 200
          },
          {
            key: "typeDesc",
            align: "center",
            title: "报告类型",
            minWidth: 120
          },
          {
            key: "reportTime",
            align: "center",
            title: "报告日期",
            minWidth: 130
          },
          {
            key: "indexTime",
            align: "center",
            title: "考核周期",
            minWidth: 120
          },
          {
            key: "employeeName",
            align: "center",
            title: "业务员",
            minWidth: 130
          },
          {
            key: "orgWname",
            align: "center",
            title: "业务员所属部门",
            minWidth: 180
          },
          {
            key: "reportAmount",
            align: "center",
            title: "报告金额",
            minWidth: 100
          },
          {
            key: "productAmount",
            align: "center",
            title: "分配编辑金额",
            minWidth: 100
          },
          {
            key: "sign",
            align: "center",
            title: "操作",
            fixed: "right",
            minWidth: 160,
            render: (h, data) => {
              return h("div", [
                h(
                  "a",
                  {
                    props: {
                      type: "text",
                      size: "small"
                    },
                    style: {
                      marginRight: "10px"
                    },
                    on: {
                      click: () => {
                        this.editModal = true;
                        this.getEditData(data.row);
                      }
                    }
                  },
                  "编辑"
                ),
                h(
                  "a",
                  {
                    props: {
                      type: "text",
                      size: "small"
                    },
                    style: {
                      marginRight: "10px"
                    },
                    on: {
                      click: () => {
                        this.confirm(data.row.id);
                      }
                    }
                  },
                  "删除"
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
                        this.configModal = true;
                        this.editPart(data.row);
                      }
                    }
                  },
                  "比例配置"
                )
              ]);
            }
          }
        ],
        indexTime: [],
        columns2: [
          // 批量添加弹窗table
          {
            title: "报告编号",
            key: "reportCode",
            align: "center",
            minWidth: 200,
            render: (h, data) => {
              return h("div", [
                h("i-input", {
                  props: {
                    type: "text",
                    size: "small",
                    value: data.row.reportCode,
                    maxlength: 50
                  },
                  on: {
                    "on-blur": res => {
                      this.tableData2[data.row._index].reportCode =
                        res.target.value;
                    }
                  }
                })
              ]);
            }
          },
          {
            title: "报告名称",
            key: "reportName",
            align: "center",
            minWidth: 200,
            render: (h, data) => {
              return h("div", [
                h("i-input", {
                  props: {
                    type: "text",
                    value: data.row.reportName,
                    size: "small",
                    maxlength: 50
                  },
                  on: {
                    "on-blur": res => {
                      this.tableData2[data.row._index].reportName =
                        res.target.value;
                    }
                  }
                })
              ]);
            }
          },
          {
            title: "报告类型",
            key: "type",
            align: "center",
            minWidth: 150,
            render: (h, data) => {
              return h(
                "Select",
                {
                  props: {
                    value: data.row.type,
                    labelInValue: true
                  },
                  on: {
                    "on-change": event => {
                      this.tableData2[data.row._index].type = event.value;
                    }
                  }
                },
                [
                  h(
                    "Option",
                    {
                      props: {
                        value: "0"
                      }
                    },
                    "定制报告"
                  ),
                  h(
                    "Option",
                    {
                      props: {
                        value: "1"
                      }
                    },
                    "调研报告"
                  )
                ]
              );
            }
          },
          {
            title: "报告日期",
            key: "reportTime",
            align: "center",
            minWidth: 180,
            render: (h, data) => {
              return h("DatePicker", {
                props: {
                  type: "datetime",
                  format: "yyyy-MM-dd",
                  value: data.row.reportTime
                },
                on: {
                  "on-change": val => {
                    this.tableData2[data.row._index].reportTime = val;
                  }
                }
              });
            }
          },
          {
            title: "报告金额",
            key: "reportAmount",
            align: "center",
            minWidth: 180,
            render: (h, data) => {
              return h("div", [
                h("i-input", {
                  props: {
                    type: "text",
                    size: "small",
                    maxlength: 16,
                    value: data.row.reportAmount
                    //                    value: formatThousandPrice(data.row.reportAmount)
                  },
                  on: {
                    "on-blur": res => {
                      this.tableData2[data.row._index].reportAmount = Number(
                        res.target.value
                      );
                    }
                  }
                })
              ]);
            }
          },
          {
            title: "报告成本",
            key: "costAmount",
            align: "center",
            minWidth: 180,
            maxlength: 16,
            render: (h, data) => {
              return h("div", [
                h("i-input", {
                  props: {
                    type: "text",
                    size: "small",
                    value: data.row.costAmount,
                    maxlength: 16
                  },
                  on: {
                    "on-blur": res => {
                      this.tableData2[data.row._index].costAmount =
                        res.target.value;
                    }
                  }
                })
              ]);
            }
          },
          {
            title: "合同编号",
            key: "contractNo",
            align: "center",
            minWidth: 180,
            render: (h, data) => {
              return h("div", [
                h("i-input", {
                  props: {
                    type: "text",
                    value: data.row.contractNo,
                    size: "small",
                    maxlength: 30
                  },
                  on: {
                    "on-blur": res => {
                      this.tableData2[data.index].contractNo = res.target.value;
                      autoArr({ contractNo: res.target.value }).then(res => {
                        const response = res.response;
                        if (
                          !response.employeeName ||
                          !response.memberName ||
                          !response.orgWname
                        ) {
                          this.hasContractNo = false;
                        } else {
                          this.tableData2[data.index].memberName =
                            response.memberName;
                          this.tableData2[data.index].employeeName =
                            response.employeeName;
                          this.tableData2[data.index].orgWname =
                            response.orgWname;
                          this.hasContractNo = true;
                        }
                      });
                    }
                  }
                })
              ]);
            }
          },
          {
            title: "会员名称",
            key: "memberName",
            align: "center",
            minWidth: 180
          },
          {
            title: "业务员",
            key: "employeeName",
            align: "center",
            minWidth: 160
          },
          {
            title: "所属部门",
            key: "orgWname",
            align: "center",
            minWidth: 200
          },
          {
            key: "operate",
            title: "操作",
            align: "center",
            minWidth: 160,
            render: (h, data) => {
              return h("div", [
                h("span", {
                  class: "icon-plus2 icon",
                  style: {
                    float: "left",
                    marginTop: "4px"
                  }
                }),
                h(
                  "div",
                  {
                    style: {
                      marginRight: "8px",
                      cursor: "pointer",
                      color: "#84AF2C",
                      float: "left"
                    },
                    on: {
                      click: () => {
                        if (!this.hasContractNo) {
                          this.$Message.warning({
                            content: "未查到合同信息",
                            duration: 2
                          });
                        } else {
                          this.addTables(data.index);
                        }
                      }
                    }
                  },
                  "增加"
                ),
                h("span", {
                  class: "icon-remove2",
                  style: {
                    float: "left",
                    marginTop: "4px"
                  }
                }),
                h(
                  "div",
                  {
                    style: {
                      marginRight: "8px",
                      cursor: "pointer",
                      color: "#F42C2C",
                      float: "left"
                    },
                    on: {
                      click: () => {
                        this.removeTables(data.row._index);
                      }
                    }
                  },
                  "删除"
                )
              ]);
            }
          }
        ],
        tableData2: [
          {
            contractNo: "",
            costAmount: "",
            reportAmount: "",
            reportCode: "",
            reportName: "",
            reportTime: "",
            orgWname: "",
            memberName: "",
            employeeName: "",
            sign: "",
            type: 0 //0表示定制报告,1调研报告
          }
        ],
        tableData3: [
          /*{
                dePecent: null,
                employeeId: null,
                orgWname: null,
                sign: ''
              }*/
        ],
        zxBjbgId: null,
        nameLists: [],
        columns3: [
          {
            type: "index",
            title: "序号",
            align: "center",
            minWidth: 40
          },
          {
            title: "编辑人名",
            key: "employeeName",
            align: "center",
            minWidth: 130,
            render: (h, data) => {
              return h(
                "Select",
                {
                  props: {
                    filterable: true,
                    value: String(data.row.employeeId),
                    labelInValue: true
                  },
                  on: {
                    "on-change": vals => {
                      autoDeptId({ employeeId: vals.value }).then(res => {
                        if (res.status == "200") {
                          this.tableData3[data.index].employeeId = vals.value;
                          this.tableData3[data.index].employeeName = vals.label;
                          this.tableData3[data.index].orgWname = res.response;
                        }
                      });
                    },
                    "on-query-change": res => {
                      this.keyWordQuery2(res, data.index);
                    }
                  },
                  ref: 'mySelect',
                  refInFor: true
                },

                this.nameListArr[data.index] && this.nameListArr[data.index].map(res => {
                  return h("Option",
                    {
                      props: {
                        value: res.key,
                        label: res.value,
                        key: res.key
                      }
                    }, res.value);
                })
              );
            }
          },
          {
            key: "orgWname",
            title: "所属部门",
            align: "center",
            minWidth: 200
          },
          {
            title: "贡献度",
            key: "dePecent",
            align: "center",
            minWidth: 90,
            render: (h, data) => {
              return h("div", [
                h(
                  "i-input",
                  {
                    props: {
                      // type: 'date',
                      size: "small",
                      textAlign: "cewnter",
                      value: data.row.dePecent
                    },
                    on: {
                      "on-blur": v => {
                        var reg = /^[0-9]+.?[0-9]*$/;
                        if (v.target.value != "") {
                          if (!reg.test(v.target.value)) {
                            v.target.value = this.tableData3[data.index].dePecent;
                            this.$Message.error("贡献度请输入数字");
                            return false;
                          } else {
                            this.tableData3[data.index].dePecent = v.target.value;
                            let num = 0;
                            this.tableData3.forEach((r, v, arr) => {
                              num += r.dePecent * 1;
                            });
                            if (num > 100) {
                              this.$Message.warning("百分比之和不能大于100%");
                            }
                          }
                        }
                      }
                    }
                  },
                  data.row.dePecent
                )
              ]);
            }
          },
          {
            key: "operate",
            title: "操作",
            align: "center",
            minWidth: 130,
            render: (h, data) => {
              return h("div", [
                h("p", {
                  class: "icon-plus2 icon",
                  style: {
                    float: "left",
                    marginTop: "4px"
                  }
                }),
                h(
                  "div",
                  {
                    style: {
                      marginRight: "8px",
                      cursor: "pointer",
                      color: "#84AF2C",
                      float: "left"
                    },
                    on: {
                      click: () => {
                        this.addList(data.index + 1);
                      }
                    }
                  },
                  "增加"
                ),
                h("span", {
                  class: "icon-remove2",
                  style: {
                    float: "left",
                    marginTop: "4px"
                  }
                }),
                h(
                  "div",
                  {
                    style: {
                      marginRight: "8px",
                      cursor: "pointer",
                      color: "#F42C2C",
                      float: "left"
                    },
                    on: {
                      click: () => {
                        this.removeList(data.index);
                      }
                    }
                  },
                  "删除"
                )
              ]);
            }
          }
        ],
        nameListArr: []
      };
    },
    created() {
      this.slectTimes = getLastMonth();
      //      this.indexTimes = formatStamp(getLastMonth() + "-01 00:00:00")
      this.indexTimes = new Date(getLastMonth()).setHours(0, 0, 0, 0);
      this.listSearch();
    },
    methods: {
      keyWordQuery2(vals, index) {
        if (!vals) return;
        //调用人员接口
        employeeSelect({ name: vals }).then(res => {
          if (res.status = "200") {
            this.nameLists[index] = res.response;
            this.nameListArr = [...this.nameLists];
          }
        })
      },
      changeReportAmount() {
        this.formEdit.reportAmount = Number(this.formEdit.reportAmount).toFixed(
          2
        );
      },
      changeCostAmount() {
        this.formEdit.costAmount = Number(this.formEdit.costAmount).toFixed(2);
      },
      changeProductAmount() {
        this.formEdit.productAmount = Number(this.formEdit.productAmount).toFixed(
          2
        );
      },
      onVisibleChange(visib) {
        if (!visib) {
          this.tableData2 = [
            {
              contractNo: "",
              costAmount: "",
              reportAmount: "",
              reportCode: "",
              reportName: "",
              reportTime: "",
              orgWname: "",
              memberName: "",
              employeeName: "",
              sign: "",
              type: 0
            }
          ];
        }
      },
      //开始周期
      getStartDates(val) {
        this.formDatas.indexTimeStart = val ? formatStamp(val) : null;
      },
      //结束周期
      getEndDates(val) {
        this.formDatas.indexTimeEnd = val ? formatStamp(val) : null;
      },
      //合同编号
      changeContractNo(data) {
        let that = this;
        autoArr({ contractNo: data.target.value }).then(res => {
          if (res.status == "200") {
            that.formEdit.employeeName = res.response.employeeName;
            that.formEdit.orgWname = res.response.orgWname;
          }
        });
      },
      // //获取人员名list
      getNameLists(val, index) {
        const that = this;
        employeeSelect({ name: "" }).then(res => {
          if (res.status == "200") {
            that.nameLists = res.response;
          }
        });

      },

      //导出按钮export
      exportClick() {
        if (this.dataCount >= 10000) {
          this.$Message.warning({
            content: "数据超过1万条，请分批导出",
            duration: 2
          });
        } else if (this.dataCount <= 0) {
          this.$Message.warning({
            content: "无数据",
            duration: 2
          });
        } else {
          let formDa = {
            employeeId: this.formDatas.employeeId
              ? this.formDatas.employeeId
              : "",
            indexTimeEnd: this.formDatas.indexTimeEnd
              ? this.formDatas.indexTimeEnd
              : "",
            indexTimeStart: this.formDatas.indexTimeStart
              ? this.formDatas.indexTimeStart
              : "",
            orgIds: this.formDatas.orgIds,
            //            "pageNum": 1,
            //            "pageSize": 10,
            reportCode: this.formDatas.reportCode,
            reportName: this.formDatas.reportName,
            sign: "",
            type: this.formDatas.type ? this.formDatas.type : ""
          };

          exportDetails(formDa)
            .then(res => { })
            .catch(err => {
              if (err.status !== "100053") {
                this.$Message.destroy();
                window.location.href =
                  "/report/zxBjbg/export?" + formData(formDa);
              }
            });
        }
      },

      //点击操作 - 比例配置 四个字
      editPart(rows) {
        const that = this;
        this.zxBjbgId = rows.id;
        getReportEdit({ zxBjbgId: rows.id, v: Math.random() * 1000 }).then(
          res => {
            if (res.status == "200") {
              that.formPart = res.response;
            }
          }
        );
        //发起请求比例配置数据
        getPartDatas({ zxBjbgId: rows.id, v: Math.random() * 1000  }).then(re => {
          if (re.response.length > 0) {
            re.response.map((querys, v, arr) => {
              // delete arr[v].employeeName;
              arr[v].dePecent = querys.dePecent * 100;
              return arr;
            });
            that.tableData3 = re.response;
            for (let i = 0; i < that.tableData3.length; i++) {
              that.getName(that.tableData3[i].employeeName, i)
            }
          } else {
            that.tableData3 = [
              {
                dePecent: null,
                employeeId: null,
                employeeName: null,
                orgWname: null,
                sign: ""
              }
            ];
          }
        });
      },
      getName(val, index) {
        const that = this;
        $.ajax({
          url: '/report/PfCommonTree/employeeSelect',//url路径
          type: 'get', //GET
          async: false,    //或false,是否异步
          data: {
            name: val,
            v: Math.random() * 1000
          },
          timeout: 5000,    //超时时间
          dataType: 'json',    //返回的数据格式：
          success: function (data, textStatus, jqXHR) {
            that.nameLists[index] = data.response;
            that.nameListArr = [...that.nameLists];
          },

        })
      },
      //比例配置 弹窗中的确认 按钮
      getSendMes() {
        const that = this;

        const tempTableData = [];

        for (let a = 0; a < this.tableData3.length; a++) {
          const item = this.tableData3[a];
          if (!item.employeeId || item.dePecent <= 0) {
            that.$Message.success({
              content: "人员姓名或贡献值不能为空",
              duration: 3
            });
            return;
          }

          tempTableData.push({
            employeeId: item.employeeId,
            orgWname: item.orgWname,
            sign: item.sign,
            dePecent: (item.dePecent / 100).toFixed(2)
          });
        }

        let forSend = {
          addDetails: tempTableData,
          sign: "",
          zxBjbgId: this.zxBjbgId
        };
        dePentSave(forSend).then(res => {
          if (res.status == "200") {
            that.configModal = false;
            that.$Message.success(res.message);
          }
        });
      },
      //日期改变
      changeDate(current) {
        this.formEdit.reportTime = current;
      },
      changeDate1(current) {
        this.formEdit.indexTime = current;
      },
      //编辑弹窗取消
      cancelEdit() {
        this.editModal = false;
      },
      //编辑弹窗的确定事件
      okEdit() {
        const that = this;
        let formEd = { ...this.formEdit };
        formEd.reportCode = this.formEdit.reportCode;
        formEd.contractNo = this.formEdit.contractNo;
        var reportTime = new Date(formEd.reportTime);
        formEd.reportTime = String(reportTime.setHours(0, 0, 0, 0))
        var indexTime = new Date(formEd.indexTime);
        formEd.indexTime = String(indexTime.setHours(0, 0, 0, 0))
        if (formEd.indexTime == "NaN" || formEd.reportTime == "NaN"){
          this.$Message.error("请填写信息完整")
        }else{
           // 调用编辑完保存接口
           saveEditUp(formEd).then(res => {
            if ((res.status = "200")) {
              that.listSearch();
              that.$Message.success(res.message);
              that.editModal = false;
            }
          });
        }
         
      },
      //点击编辑事件
      getEditData(dat) {
        const that = this;
        getReportEdit({ zxBjbgId: dat.id, v: Math.random() * 1000 }).then(res => {
          res.response.indexTime = formatTime(res.response.indexTime);
          res.response.reportTime = formatTime(res.response.reportTime);
          that.formEdit = res.response;
        });
      },
      //添加表格数据
      addTables(res) {
        let obj = {
          contractNo: "",
          costAmount: "",
          reportAmount: "",
          reportCode: "",
          reportName: "",
          reportTime: "",
          orgWname: "",
          memberName: "",
          employeeName: "",
          sign: "",
          type: 0 //0表示定制报告,1调研报告
        };
        this.tableData2.push(obj);
      },
      //移除表格
      removeTables(re) {
        this.tableData2.splice(re, 1);
      },
      //查询人员关键字公共接口
      keyWordQuery(vals) {
        let that = this;
        //调用人员接口
        employeeSelect({ name: vals }).then(res => {
          if ((res.status = "200")) {
            that.queryData = res.response;
          }
        });
      },
      //查询按钮
      queryGo() {
        this.pageNum = 1;
        // this.formDatas.indexTimeEnd = formatStamp(this.cycleDates[1]);
        // this.formDatas.indexTimeStart = formatStamp(this.cycleDates[0]);
        this.formDatas.indexTimeEnd = formatStamp(this.endTime);
        this.formDatas.indexTimeStart = formatStamp(this.startTime);
        this.listSearch(); //调用api函数
      },

      //addList增加一行
      addList(ind) {
        let obj = {
          dePecent: null,
          employeeId: null,
          employeeName: '',
          orgWname: null,
          sign: ""
        };
        this.tableData3.push(obj);
      },
      removeList(ind) {
        if (this.tableData3.length <= 1) {
          this.$Message.error("列表数据不能少于1");
        } else {
          this.tableData3.splice(ind, 1);
          this.nameListArr.splice(ind, 1);
        }
      },
      //重置按钮
      reset() {
        this.formDatas = {
          page: 1,
          pageSize: 10,
          employeeId: "",
          indexTimeEnd: "",
          indexTimeStart: "",
          orgIds: [],
          reportCode: "",
          reportName: "",
          sign: "",
          type: "",
          v: Math.random() * 1000
        };
        // this.cycleDates = [];
        this.startTime = "";
        this.endTime = "";
      },
      // 获取考核月份
      getMonth(date) {
        //        this.indexTimes = formatStamp(date);
        this.indexTimes = new Date(date).setHours(0, 0, 0, 0);
      },
      changePageNum(current) {
        this.formDatas.pageNum = current;
        this.listSearch();
      },
      // 监听修改显示条数
      changePageSize(size) {
        this.formDatas.pageSize = size;
        this.listSearch();
      },
      //页码更新事件
      // pageChange (page, pageSize) {
      //   if(page) {
      //     this.pageNum = page;
      //   }
      //   if(pageSize) {
      //     this.pageSize = pageSize;
      //   }
      //   this.listSearch();
      // },
      //获取列表数据
      listSearch() {
        let that = this;
        this.$Spin.show();
        powerUp(this.formDatas).then(res => {
          if ((res.status = "200" && res.response.list.length > 0)) {
            res.response.list.map((resp, v, arr) => {
              resp.reportTime = formatTime(resp.reportTime);
              resp.indexTime = formatTime(resp.indexTime).slice(0, 7);
              return arr;
            });
          }
          that.tableData = res.response.list || [];
          that.dataCount = res.response.total;
          this.$Spin.hide();
        });
      },
      //获取部门树
      getDepData(value, selectedData) {
        this.formDatas.orgIds = selectedData;
      },
      //是否删除（list表格）
      confirm(dt) {
        let that = this;
        this.$Modal.confirm({
          title: "删除提示：",
          content: "<p>你确定要删除？</p>",
          onOk: () => {
            delReportUp({ zxBjbgId: dt }).then(res => {
              if ((res.status = "200")) {
                this.$Message.success(res.message);
                that.listSearch();
              }
            });
          },
          onCancel: () => {
            this.$Message.info("取消删除");
          }
        });
      },
      //
      moreAdd() {
        this.moreAddModal = true;
        this.slectTimes = getLastMonth();

        let obj = {
          departName: "",
          departId: null,
          indexTime: null,
          msgType: null,
          desc: "",
          address: "",
          employeeId: null,
          employeeName: "",
          supportName: ""
        };
        this.tableData2 = [];
        this.tableData2.push(obj);
      },
      //批量添加  确定按钮 执行批量添加数据
      saveBatch() {
        if (!this.hasContractNo) {
          this.$Message.warning({
            content: "请填写合同编号",
            duration: 3
          });
          return;
        }
        const neArr = [];
        for (let a = 0; a < this.tableData2.length; a++) {
          const res = this.tableData2[a];
          if (!res.type) {
            this.$Message.warning({
              content: "请选择报告类型",
              duration: 3
            });
            return;
          }
          res.reportTime = new Date(res.reportTime).setHours(0, 0, 0, 0);
          neArr.push({
            contractNo: res.contractNo,
            costAmount: Number(res.costAmount),
            reportAmount: Number(res.reportAmount),
            reportCode: res.reportCode,
            reportName: res.reportName,
            reportTime: formatStamp(res.reportTime),
            sign: res.sign,
            type: res.type
          });
        }
        addBatchIn({
          addDetails: neArr,
          indexTime: this.indexTimes,
          sign: ""
        }).then(res => {
          if (res.status == "200") {
            this.queryGo();
            this.$Message.success(res.message);
            this.moreAddModal = false;
          }
        });
      }
    }
  };
</script>