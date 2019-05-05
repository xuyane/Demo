<style lang="less" scoped>
  @import "../../information/taskplant/taskplant.less";
  .unit {
    border-top: 1px solid #ccc;
  }

  .back-btn {
    padding-top: 30px;
    text-align: center;
  }

  .page {
    margin: 10px 0;
    text-align: right;
    padding-right: 18px;
  }

  .new_unit {
    width: 100%;
    border-color: #bbb;
  }

  .singular_td{
    font-size: 14px;
    color: #000;
    background: #e9eaef;
    width: 15%;
    text-align: center;
    padding: 10px;
  }

  .dobule_td {
    width: 35%;
    text-align: center;
    padding: 10px;
  }
</style>
<template>
  <Row>

    <i-col span="24">
      <Row class-name="current-position">
        当前位置：绩效管理&nbsp;&nbsp;>>&nbsp;&nbsp;考核模板&nbsp;&nbsp;>>&nbsp;&nbsp;指标配置
      </Row>
    </i-col>

    <Col span='24'>
    <Card style="margin-bottom:20px;">
      <table class="new_unit" cellpadding="0" cellspacing="0" border="1" rules="all">
        <tr>
          <td class="singular_td">模版名称</td>
          <td class="dobule_td"> {{PfModelInfo.modelName}}</td>
          <td class="singular_td">模版描述</td>
          <td class="dobule_td">{{PfModelInfo.modelDesc}}</td>
        </tr>
        <tr>
          <td class="singular_td">创建时间</td>
          <td class="dobule_td">{{PfModelInfo.createrTimeDesc}}</td>
          <td class="singular_td">考核周期</td>
          <td class="dobule_td">{{PfModelInfo.indexTimeDesc}}</td>
        </tr>
        <tr>
          <td class="singular_td">状态</td>
          <td class="dobule_td">{{PfModelInfo.statusDesc}}</td>
          <td class="singular_td"></td>
          <td class="dobule_td"></td>
        </tr>
      </table>
    </Card>
    </Col>

    <Col span='24' class="table-con">
    <p style="margin-bottom:15px;">考核指标</p>
    <i-button type="primary" @click="addIModal" style="margin-bottom:15px;">新增指标</i-button>
    <Table class="tableCommon" :columns="columns1" :data="tableData1"></Table>
    <div class="back-btn">
      <i-button @click="backtoCheckTemplate">返回</i-button>
    </div>
    </Col>

    <!-- 添加指标弹窗开始 -->
    <Modal v-model="addIndexModal" title="添加指标" width='1000'>
      <Form style="overflow: hidden;" ref="form" :model="indexListForm">
        <Col span='8'>
        <FormItem label="指标编号 ： " :label-width="90" width='300'>
          <Input type="text" v-model="indexListForm.indexNumber" class="search-input" />
        </FormItem>
        </Col>
        <Col span='8'>
        <FormItem label="指标名称 ： " :label-width="120" width='300'>
          <Input type="text" v-model="indexListForm.indexName" class="search-input" />
        </FormItem>
        </Col>
        <Col span='8'>
        <FormItem label="统计频率 ： " :label-width="120">
          <Select v-model="indexListForm.gradePlan">
            <Option value="1">月度</Option>
            <Option value="2">年度</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="24" class="text-right" style="margin-bottom:20px;">
        <Button type="primary" style="margin-right:20px" @click="getPfModelindexListPage()">查询</Button>
        <Button @click="clearPfModelindexListPage()">重置</Button>
        </Col>
      </Form>
      <Table class="tableCommon" :data="tableData2" :columns="columns2" ref="dragTable" :stripe="true" :border="true" @on-selection-change="selectChange1">
        <div class="page" slot="footer">
          <Page :page-size="pageSize" :current="pageNum" :total="total" show-elevator show-total show-sizer @on-change="onPageChange"
            @on-page-size-change="onPageSizeChange" />
        </div>
      </Table>
      <!-- <oil-page :total="total" :page-size="pageSize" @page-change="pageChange" :page-size-opts="pageSizeOpts" :show-sizer="showSizer">
      </oil-page>-->


      <!-- <Page :total="total" size="small" show-elevator show-sizer /> -->
      <div slot="footer">
        <i-button type="primary" @click="addIndexModal=false">返回</i-button>
      </div>
    </Modal>
    <!-- 添加指标弹窗结束 -->

    <!-- 配置弹窗开始 -->
    <Modal v-model="configModal" title="配置" width='1050'>
      <Table class="tableCommon" :columns="columns3" :data="tableData3"></Table>
      <div slot="footer">
        <i-button type="primary" @click="insertIndexOperateItem()">确定</i-button>
        <i-button @click="configModal=false">取消</i-button>
      </div>
    </Modal>
    <!-- 配置弹窗结束 -->

    <!-- 删除弹窗开始 -->
    <Modal v-model="deleteModal" title="提示信息">
      <div style="text-align:center;">
        <p>您确定要删除？</p>
      </div>
      <div slot="footer">
        <i-button type="primary" @click="deleteIndexAndItemSubmit()">确定</i-button>
        <i-button @click="deleteModal=false">取消</i-button>
      </div>
    </Modal>
    <!-- 删除弹窗结束 -->

  </Row>
</template>
<script>
  import axios from "axios";
  import {
    PfModelGetById,
    PfModelindexListPage,
    PfModelInsertIndexOperate,
    PfModelDetailIndexList,
    PfModelDeleteIndexAndItem,
    PfModelInsertIndexOperateItem,
    PfModelIndexList
  } from "../../components/axios/performanceManagement.js";
  import OilPage from "../../components/page/page.vue";
  export default {
    name: "indexConfig",
    components: {
      OilPage
    },
    data() {
      return {
        oneData: 0,
        totalData: 0,
        modelId: 0,
        PfModelInfo: {
          modelId: "",
          modelName: "",
          modelDesc: "",
          createrTimeDesc: "",
          indexTimeDesc: "",
          statusDesc: ""
        },
        indexListForm: {
          gradePlan: "",
          indexName: "",
          indexNumber: ""
        },
        insertIndexOperateForm: [],
        insertIndexOperateItemForm: [
          {
            level: "",
            score: "",
            targetMaxRange: "",
            targetMinRange: ""
          }
        ],
        total: 0,
        pageNum: 1,
        pageSize: 10,
        pageSizeOpts: [5, 10, 20, 30],
        showSizer: true,
        addIndexModal: false,
        configModal: false,
        deleteModal: false,
        StatisticsFrequency: [
          {
            value: "month",
            label: "月"
          },
          {
            value: "day",
            label: "日"
          },
          {
            value: "year",
            label: "年"
          }
        ],
        cycle: [
          {
            value: "1",
            label: "月度"
          },
          {
            value: "2",
            label: "年度"
          }
        ],
        columns1: [
          {
            title: "指标名称",
            key: "indexName",
            align: "center"
          },
          {
            title: "统计周期",
            key: "indexTimeDesc",
            align: "center"
          },
          {
            title: "分级方案",
            key: "gradePlanDesc",
            align: "center"
          },
          {
            title: "指标权重(%)",
            key: "indexW",
            align: "center"
          },
          {
            title: "操作",
            key: "opration",
            align: "center",
            render: (h, params) => {
              return h("div", [
                h(
                  "a",
                  {
                    style: {
                      marginRight: "20px"
                    },
                    on: {
                      click: () => {
                        this.deleteIndexAndItemBtn(params.row.pfModelIndexId);
                      }
                    }
                  },
                  "删除"
                ),
                h(
                  "a",
                  {
                    on: {
                      click: () => {
                        this.gradePlanDesc = params.row.gradePlanDesc;
                        this.insertIndexOperateItemBtn(params.row);
                      }
                    }
                  },
                  "配置"
                )
              ]);
            }
          }
        ],
        tableData1: [
          {
            indexName: "",
            indexTimeDesc: "",
            gradePlanDesc: "",
            indexWeight: "",
            indexW: ""
          }
        ],
        columns2: [
          {
            title: "指标编号",
            key: "indexNumber",
            align: "center",
            width: 200
          },
          {
            title: "指标名称",
            key: "indexName",
            align: "center",
            width: 120
          },
          {
            title: "统计频率",
            key: "indexTimeDesc",
            align: "center",
            width: 80
          },
          {
            title: "分级方案",
            key: "gradePlanDesc",
            align: "center",
            width: 80
          },
          {
            title: "指标说明",
            key: "indexDesc",
            align: "center",
            width: 150
          },
          {
            title: "权重指标(%)",
            key: "indexWeight",
            align: "center",
            render: (h, params) => {
              return h("div", [
                h("i-input", {
                  //                props: {
                  //                  value: params.row.indexWeight
                  //                },
                  on: {
                    "on-blur": ev => {
                      this.oneData = ev.target.value;
                      this.insertIndexOperateForm[params.row.id] = ev.target.value / 100;
                    }
                  }
                })
              ]);
            }
          },
          {
            title: "操作",
            key: "operation",
            align: "center",
            width: 80,
            render: (h, data) => {
              return h(
                "a",
                {
                  on: {
                    click: () => {
                      this.insertIndexOperate(
                        data.row.gradePlan,
                        data.row.indexDesc,
                        data.row.id,
                        data.row.indexName,
                        data.row.indexNumber,
                        data.row.indexTime
                      );
                    }
                  }
                },
                "添加"
              );
            }
          }
        ],
        gradePlanDesc: '',
        //        maxGradePlanDesc:'',
        tableData2: [
          {
            indexNumber: "",
            indexName: "",
            indexTimeDesc: "",
            gradePlanDesc: "",
            indexDesc: ""
          }
        ],
        hasOverlap: false,
        columns3: [
          {
            title: "序号",
            //key: "index",
            type: "index",
            align: "center",
            width: 50
          },
          {
            title: "级别",
            key: "level",
            align: "center",
            width: 200,
            render: (h, params) => {
              return h("i-input", {
                props: {
                  value: params.row.level,
                  disabled: params.row.add === undefined
                },
                on: {
                  "on-blur": ev => {
                    this.tableData3[params.row._index].level = ev.target.value;
                  }
                }
              });
            }
          },
          {
            title: "分值",
            key: "score",
            align: "center",
            width: 200,
            render: (h, params) => {
              return h("i-input", {
                props: {
                  value: params.row.score,
                  disabled: params.row.add === undefined
                },
                on: {
                  "on-blur": ev => {
                    var reg = new RegExp("^[0-9]*$");
                    if (!reg.test(ev.target.value)) {
                      this.$Message.error("请输入数字")
                      ev.target.value = params.row.score;
                    } else {
                      this.tableData3[params.row._index].score = ev.target.value;
                    }
                  }
                }
              });
            }
          },
          {
            title: "目标最小范围",
            key: "targetMinRange",
            align: "center",
            width: 200,
            render: (h, params) => {
              //              this.minGradePlanDesc=params.row.gradePlanDesc
              return h("i-input", {
                props: {
                  value: params.row.targetMinRange,
                  disabled: params.row.add === undefined
                },
                on: {
                  "on-blur": ev => {
                    console.log('value', ev.target.value);
                    if (isNaN(Number(ev.target.value))) {
                      //                      this.$Message.error("请输入数字");
                      //                      ev.target.value = params.row.targetMinRange;
                      ev.target.value = 0;
                    } else {
                      this.tableData3[params.index].targetMinRange = Number(ev.target.value);
                      this.hasOverlap = false;
                      const restTable = this.tableData3.slice(0, -1);
                      const lastData = this.tableData3[params.index];

                      for (let a = 0; a < restTable.length; a++) {
                        const item = restTable[a];
                        this.hasOverlap = !(lastData.targetMaxRange < item.targetMinRange || lastData.targetMinRange > item.targetMaxRange);
                        if (this.hasOverlap) break;
                      }
                    }
                  }

                }
              }, );
            },
            renderHeader: h => {
              if (this.gradePlanDesc === "固定值") {
                return h('div', [
                  h("span", {}, "目标最小值")
                ])
              } else {
                return h('div', [
                  h("span", {}, "目标最小范围(%)")
                ])
              }

            },
          },
          {
            title: "目标最大范围",
            key: "targetMaxRange",
            align: "center",
            width: 200,
            render: (h, params) => {
              //              this.maxGradePlanDesc=params.row.gradePlanDesc
              return h("i-input", {
                props: {
                  value: params.row.targetMaxRange,
                  disabled: params.row.add === undefined
                },
                on: {
                  "on-blur": ev => {

                    if (isNaN(Number(ev.target.value))) {
                      //                      this.$Message.error("请输入数字");
                      //                      ev.target.value = params.row.targetMaxRange;
                      ev.target.value = 0;
                    } else {
                      this.tableData3[params.index].targetMaxRange = Number(ev.target.value);

                      this.hasOverlap = false;
                      const restTable = this.tableData3.slice(0, -1);
                      const lastData = this.tableData3[params.index];

                      for (let a = 0; a < restTable.length; a++) {
                        const item = restTable[a];
                        this.hasOverlap = !(lastData.targetMaxRange < item.targetMinRange || lastData.targetMinRange > item.targetMaxRange);
                        if (this.hasOverlap) break;
                      }
                    }

                  }

                }
              });
            },
            renderHeader: h => {
              if (this.gradePlanDesc === "固定值") {
                return h('div', [
                  h("span", {}, "目标最大值")
                ])
              } else {
                return h('div', [
                  h("span", {}, "目标最大范围(%)")
                ])
              }

            },
          },
          {
            key: "isDisplay",
            title: "操作",
            align: "center",
            render: (h, params) => {
              return h("div", [
                h("Button", {
                  props: {
                    type: 'primary',
                    size: 'small',
                    icon: 'ios-add',
                    disabled: params.row.add === undefined
                  },
                  style: {
                    marginRight: '8px'
                  },
                  on: {
                    click: () => {
                      this.hasOverlap = false;
                      const restTable = this.tableData3.slice(0, -1);
                      const lastData = this.tableData3[params.index];
                      if (lastData.targetMaxRange <= lastData.targetMinRange) {
                        this.$Message.error({
                          content: '最大范围必须大于最小范围',
                          duration: 3
                        });
                        return;
                      }

                      for (let a = 0; a < restTable.length; a++) {
                        const item = restTable[a];
                        this.hasOverlap = !(lastData.targetMaxRange < item.targetMinRange || lastData.targetMinRange > item.targetMaxRange);
                        if (this.hasOverlap) break;
                      }


                      if (this.hasOverlap) {
                        this.$Message.error({
                          content: '范围区间不能重叠，请重新输入',
                          duration: 3
                        });
                      } else {
                        this.tableData3.push({
                          level: "",
                          score: '',
                          targetMaxRange: '',
                          targetMinRange: '',
                          add: true
                        });
                      }
                    }
                  }
                }, '增加'),
                h("Button", {
                  props: {
                    type: 'error',
                    size: 'small',
                    icon: 'ios-remove',
                    disabled: params.row.add === undefined
                  },
                  on: {
                    click: () => {
                      this.tableData3.splice(params.index, 1);
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        tableData3: [
          /* {
             level: 0,
             score: 0,
             targetMaxRange: 0,
             targetMinRange: 0
           }*/
        ],
        // 新增的指标
        //        newTargets: [],
        classList: []
      };
    },
    created() {
      // 模块信息信息
      this.modelId = this.$route.query.id;
      this.getModelInfo();
      this.getPfModelindexListPage();
      this.getPfModelDetailIndexList();
    },
    methods: {


      //新增指标
      addIModal() {
        this.totalData = 0;
        this.tableData1.map(item => {
          this.totalData = this.totalData + item.indexW;
        });
        if (this.totalData >= 100) {
          this.$Message.error("权重比例不能大于100%，不能添加");
        } else {
          this.getPfModelindexListPage()
          this.addIndexModal = true;
        }
      },
      // 头部模板信息
      getModelInfo() {
        PfModelGetById({
          modelId: this.modelId,
          v: Math.random() * 1000
        }).then(res => {
          this.PfModelInfo.modelId = res.response.modelId;
          this.PfModelInfo.modelName = res.response.modelName;
          this.PfModelInfo.modelDesc = res.response.modelDesc;
          this.PfModelInfo.indexTimeDesc = res.response.indexTimeDesc;
          this.PfModelInfo.createrTimeDesc = res.response.createrTimeDesc;
          this.PfModelInfo.statusDesc = res.response.statusDesc;
        });
      },
      // 添加指标时指标分页
      getPfModelindexListPage() {
        let form = {
          gradePlan: this.indexListForm.gradePlan,
          indexName: this.indexListForm.indexName,
          indexNumber: this.indexListForm.indexNumber,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          v: Math.random() * 1000
        };
        PfModelindexListPage(form).then(res => {
          this.tableData2 = res.response.list;
          this.total = res.response.total;
        });
      },
      //
      clearPfModelindexListPage() {
        this.indexListForm.gradePlan = "",
          this.indexListForm.indexName = "",
          this.indexListForm.indexNumber = "",
          this.pageNum = 1;
        this.pageSize = 10;
        this.getPfModelindexListPage();
        //        this.pageChange(this.pageNum,this.pageSize)

        // (this.indexListForm.gradePlan = ""),
        //   (this.indexListForm.indexName = ""),
        //   (this.indexListForm.indexNumber = "");
      },
      // 监听分页
      /*pageChange(page, pageSize) {
        if (page) {
          this.pageNum = page;
        }
        if (pageSize) {
          this.pageSize = pageSize;
        }
        this.getPfModelindexListPage();
      },*/


      onPageChange(page) {
        this.pageNum = page;
        this.getPfModelindexListPage();
      },

      onPageSizeChange(pageSize) {
        this.pageNum = 1;
        this.pageSize = pageSize;
        this.getPfModelindexListPage();
      },

      //该模块下添加指标
      insertIndexOperate(
        gradePlan,
        indexDesc,
        indexId,
        indexName,
        indexNumber,
        indexTime
      ) {
        const indexWeight = this.insertIndexOperateForm[indexId];
        if (!indexWeight) {
          this.$Message.error("请输入权重");
          return;
        }
        const data = Number(this.totalData) + Number(this.oneData);
        if (data > 100) {
          this.$Message.error("权重比例不能大于100%，不能添加");
        } else {
          PfModelInsertIndexOperate({
            modelId: this.modelId,
            gradePlan,
            indexDesc,
            indexId,
            indexName,
            indexNumber,
            indexTime,
            indexWeight
          }).then(() => {
            this.$Message.success("添加成功！");
            this.$Spin.hide();
            this.addIndexModal = false;
            this.getPfModelDetailIndexList();
          });
        }


      },

      // 该模板下所有考核指标集合
      getPfModelDetailIndexList() {
        PfModelDetailIndexList({ modelId: this.modelId, v: Math.random() * 1000 }).then(res => {
          this.tableData1 = res.response.voList;
          this.tableData1.map(item => {
            item.indexW = item.indexWeight * 100;
          });
        });
      },
      // 删除指标配置以及分级方案弹窗
      deleteIndexAndItemBtn(pfModelIndexId) {
        this.pfModelIndexId = pfModelIndexId;
        this.deleteModal = true;
      },
      // 删除指标配置以及分级方案保存
      deleteIndexAndItemSubmit() {

        PfModelDeleteIndexAndItem({
          pfModelIndexId: this.pfModelIndexId
        }).then(() => {
          this.$Message.success("删除成功！");
          this.$Spin.hide();
          this.deleteModal = false;
          this.getPfModelDetailIndexList();
        });
      },
      //该模块的指标下添加分级方案弹窗
      insertIndexOperateItemBtn(data) {
        let pfModelIndexId = data.pfModelIndexId;
        this.pfModelIndexId = pfModelIndexId;
        PfModelIndexList({ pfModelIndexId, v: Math.random() * 1000 }).then(res => {
          this.tableData3 = res.response.concat({
            level: '',
            score: '',
            targetMaxRange: '',
            targetMinRange: '',
            //            gradePlanDesc: data.gradePlanDesc,
            add: true
          });
          //          console.log("this.tableData3",this.tableData3);
          if (this.gradePlanDesc === '百分比') {
            this.tableData3.map(item => {
              item.targetMaxRange = item.targetMaxRange * 100;
              item.targetMinRange = item.targetMinRange * 100;
            })
          }
          this.configModal = true;
        });
      },
      //该模块的指标下添加分级方案
      insertIndexOperateItem() {
        if (this.hasOverlap) {
          this.$Message.error({
            content: '范围区间不能重叠，请重新输入',
            duration: 3
          });
          return;
        }

        const pfModelIndexOperateItemReqVOList = this.tableData3.filter(item => item.add);
        for (var i = 0; i < pfModelIndexOperateItemReqVOList.length; i++) {
          if (!pfModelIndexOperateItemReqVOList[i].level) {
            this.$Message.warning("请输入级别！");
            return;
          }
          if (!pfModelIndexOperateItemReqVOList[i].score) {
            this.$Message.warning("请输入分值！");
            return;
          }
          if (!pfModelIndexOperateItemReqVOList[i].targetMinRange && pfModelIndexOperateItemReqVOList[i].targetMinRange !== 0) {
            this.$Message.warning("请输入目标最小范围！");
            return;
          }
          if (!pfModelIndexOperateItemReqVOList[i].targetMaxRange && pfModelIndexOperateItemReqVOList[i].targetMaxRange !== 0) {
            this.$Message.warning("请输入目标最大范围！");
            return;
          }
          if (pfModelIndexOperateItemReqVOList[i].targetMaxRange <= pfModelIndexOperateItemReqVOList[i].targetMinRange) {
            this.$Message.warning("最大范围必须大于最小范围！");
            return;
          }
        }
        // if(pfModelIndexOperateItemReqVOList.gradePlanDesc)

        pfModelIndexOperateItemReqVOList.map(item => {
          if (this.gradePlanDesc === "百分比") {
            item.targetMaxRange = item.targetMaxRange / 100;
            item.targetMinRange = item.targetMinRange / 100
          }
        });

        PfModelInsertIndexOperateItem({
          pfModelIndexId: this.pfModelIndexId,
          pfModelIndexOperateItemReqVOList
        }).then(() => {
          this.$Message.success("添加成功！");
          this.$Spin.hide();
          this.configModal = false;
          this.getPfModelDetailIndexList();
        });
      },

      selectChange1() { },
      // 返回
      backtoCheckTemplate() {
        this.$router.push({ name: "checkTemplate" });
      }
    }
  };
</script>