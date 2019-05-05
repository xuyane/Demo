<style lang="less" scoped>
@import "./taskplant.less";

/*
任务分配与委派子页面详情
*/
</style>
<template>
  <Row>
    <Col span="24">
    <Row class-name="current-position">
      当前位置：
      <router-link to="/plantIndex" class="link-css"> 信息发布管理</router-link>
      &nbsp;&nbsp;>>&nbsp;&nbsp; 
       <a @click="goto" class="link-css"> 任务分配与委派</a>
     
    </Row>
    </Col>
    <Col span="24">
    <Row :gutter="24">
      <!--左侧部分start -->
      <Col span="6">
      <div class="plant-title">
        <p>任务分配与委派</p>
      </div>
      <Row class="plant-content">
        <Tree :data="treeData" :load-data="findSon" @on-select-change='findlist'></Tree>
      </Row>
      </Col>
      <!--左侧部分end -->
      <!--右侧部分start-->
      <Col span="18" class="plant-content">
      <!-- 信息单元开始 -->
      <div class="unit">
        <div class="unit_title">
          <span>人员信息</span>
        </div>
        <div class="unit_content">
          <div class="unit_content_left">
            <div class="unit_s_left">姓名</div>
            <div class="unit_s_right">{{name}}</div>
          </div>
          <div class="unit_content_left no_line">
            <div class="unit_s_left">性别</div>
            <div class="unit_s_right no-right-border">{{sex}}</div>
          </div>
        </div>
        <div class="unit_content">
          <div class="unit_content_left">
            <div class="unit_s_left">部门</div>
            <div class="unit_s_right">{{dept}}</div>
          </div>
          <div class="unit_content_left no_line">
            <div class="unit_s_left">联系电话</div>
            <div class="unit_s_right no-right-border">{{phone}}</div>
          </div>
        </div>
      </div>
      <!-- 信息单元结束 -->
      <!--底部part start-->
      <Row class="down-part unit">
        <Col span="24" class="height-50 text-align-center font-size1">任务分配及委派</Col>
        <Col span="24">
        <Button class="margin-right10" type="primary" @click="moreDistribution(3)">批量分配</Button>
        <Button class="margin-right10" type="primary" @click="moreDistribution(4)">批量委派</Button>
        <Button class="margin-right10" type="primary" @click="cancelDelegate">批量取消委派</Button>
        <Button class="margin-right10" type="primary" @click="back">返回</Button>
        </Col>
        <Col span="24">
        <br>
        <br>
        <div>
          <Table class="tableCommon" border ref="selection" :columns="columns" :data="tableData" @on-selection-change="handleRowChange"></Table>
          <oil-page :total="total" :page-num="pageNum" :page-size="pageSize" @page-change="pageChange" :page-size-opts="pageSizeOpts"
            :show-sizer="showSizer"></oil-page>
        </div>

        </Col>
      </Row>
      <!--底部part end-->
      </Col>
      <!--右侧部分end-->

      <!-- 批量分配弹窗 start -->
      <Modal v-model="pointModel" title="人员选择" width="417px" @on-cancel="cancel(1)">
        <Form ref="distributionRef" :model="form" :rules="pointRules" :label-width="120">
          <Row>
            <Col span="24">
            <FormItem label="姓名 : " prop='personLiableId'>
              <associate-Search @query-list="personLiableFunction" :dataUrl="urlPersonLiable" :extra="extraPerson" ref="personLiableRef1"
                class="search-input"></associate-Search>
            </FormItem>
            </Col>
            <Col span="24">
            <FormItem label="生效日期 ：" prop='checkTime'>
              <DatePicker v-model="form.checkTime" format="yyyy-MM-dd" type="date" :options="optionsData" placeholder="请选择日期" style="width: 200px"></DatePicker>
            </FormItem>
            </Col>
          </Row>
        </Form>
        <div slot="footer">
          <i-button :loading="loading" type="primary" @click="confirmModal">确定</i-button>
          <i-button @click="cancel(1)">取消</i-button>
        </div>
      </Modal>
      <!-- 批量委派弹窗 start -->
      <Modal v-model="delegateModel" title="人员选择" width="417px" @on-cancel="cancel(2)">
        <Form ref="delegateRef" :model="form" :rules="distributionRules" :label-width="120">
          <Row>
            <Col span="24">
            <FormItem label="姓名 : " prop='personLiableId'>
              <associate-Search @query-list="personLiableFunction" :dataUrl="urlPersonLiable" :extra="extraPerson" ref="personLiableRef2"
                class="search-input"></associate-Search>
            </FormItem>
            </Col>
            <Col span="24">
            <FormItem label="生效日期 ：" prop='checkTime'>
              <DatePicker v-model="form.checkTime" format="yyyy-MM-dd" type="date" :options="optionsData" placeholder="请选择日期" style="width: 200px"></DatePicker>
            </FormItem>
            <Col span="24">
            <FormItem label="截止日期 ：" prop='endTime'>
              <DatePicker v-model="form.endTime" format="yyyy-MM-dd" type="date" :options="optionsData" placeholder="请选择日期" style="width: 200px"></DatePicker>
            </FormItem>
            </Col>
            </Col>

          </Row>
        </Form>
        <div slot="footer">
          <i-button :loading="loading" type="primary" @click="confirmModal">确定</i-button>
          <i-button @click="cancel(2)">取消</i-button>
        </div>
      </Modal>
      <!-- 批量分配弹窗 end -->
      <!-- 取消委派弹窗 start -->
      <Modal v-model="cancelModal" title="提示信息" @on-cancel="cancel">
        <p style="text-align: center;font-size: 16px">是否确定要取消委派?</p>
      </Modal>
      <!-- 取消委派弹窗 start -->
    </Row>
    </Col>
  </Row>
</template>
<script>
import oilPage from "../../components/page/page.vue";
import {
  departmentTree,
  departmentAndEmployeeInfo
} from "../unitmangement/api/telDurationSet.js";
import associateSearch from "../../components/associateSearch/associateSearch.vue";
import {
  taskList,
  singleTaskDelegate,
  singleTaskDistribution,
  singleCancelTaskDelegate,
  batchTaskDistribution,
  batchTaskDelegate,
  batchCancelTaskDelegate,
  delegateDetail
} from "../unitmangement/api/taskplant.js";
import { formData } from "../../../assets/js/common.js";
import { transferBatch } from "../../components/axios/crm";
export default {
  name: "taskplantDetail",
  components: {
    oilPage,
    associateSearch
  },
  data() {
    const validatePassPersonLiable = (rule, value, callback) => {
      var personLiableId = this.personLiableId;
      if (!personLiableId) {
        callback("姓名不能为空");
      } else {
        callback();
      }
    };
    return {
      form: {
        checkTime: ""
      },
      optionsData: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 86400000;
        }
      },
      cType: null,
      delegateModel: false,
      ids: [],
      selectRow: [],
      loading: false,
      startTime: "",
      pointModel: false,
      cancelModal: false,
      pageSizeOpts: [10, 20, 50, 100, 200],
      showSizer: true,
      pageSize: 10,
      total: 0,
      pageNum: 1,
      extraPerson: "",
      name: "",
      dept: "",
      sex: "",
      phone: "",
      personLiableId: "",
      entrustedName: "",
      isEndDate: false,
      taskId: null,
      urlPersonLiable: "/information/select/employee_dis_name_enable",
      pointRules: {
        personLiableId: [
          {
            required: true,
            validator: validatePassPersonLiable,
            trigger: "blur"
          }
        ],
        checkTime: [
          {
            required: true,
            type: "date",
            message: "请选择日期",
            trigger: "blur"
          }
        ]
      },
      distributionRules: {
        personLiableId: [
          {
            required: true,
            validator: validatePassPersonLiable,
            trigger: "blur"
          }
        ],
        checkTime: [
          {
            required: true,
            type: "date",
            message: "请选择日期",
            trigger: "blur"
          }
        ],
        endTime: [
          {
            required: true,
            type: "date",
            message: "请选择日期",
            trigger: "blur"
          }
        ]
      },
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "信息单元",
          key: "name",
          align: "center"
        },
        {
          title: "频率",
          key: "frequency",
          align: "center",
          render: (h, data) => {
            let label =
              data.row.executionNumber + "次" + "/" + data.row.taskCycleStr;
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
          title: "最晚发布时间",
          key: "checkTime",
          align: "center"
          // width: 160,
          // render: (h, params) => {
          //   return h("TimePicker", {
          //     style: {
          //       float: "left"
          //     },
          //     props: {
          //       type: "time",
          //       format: "HH:mm",
          //       value: params.row.checkTime
          //     },
          //     on: {
          //       input: val => {
          //         this.datetime = val;
          //       },
          //       "on-change": event =>{
          //         params.row.checkTime = event;
          //       }
          //     },

          //   });
          // }
        },
        {
          title: "是否委派",
          key: "isDelegate",
          align: "center",
          width: 130
        },
        {
          title: "受派人",
          key: "entrustedName",
          align: "center",
          width: 130
        },
        {
          key: "operate",
          align: "center",
          title: "操作",
          render: (h, data) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    marginRight: "8px",
                    color: "#145edb",
                    textDecoration: "underline",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.distributionFcuntion(data.row.id, 1);
                    }
                  }
                },
                "分配"
              ),
              h(
                "span",
                {
                  style: {
                    marginRight: "8px",
                    color: "#145edb",
                    textDecoration: "underline",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.distributionFcuntion(data.row.id, 2);
                    }
                  }
                },
                "委派"
              ),
              h(
                "span",
                {
                  style: {
                    marginRight: "8px",
                    color: "#145edb",
                    textDecoration: "underline",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.cancelDistribution(data.row.delegaterTableId);
                      //this.cancelModal = true;
                    }
                  }
                },
                //"取消委派"
                data.row.isDelegate == "是" ? "取消委派" : ""
              )
            ]);
          }
        }
      ],
      tableData: [],
      treeData: [],
      selectCondition: {
        treeCode: "",
        treeName: "",
        order: "asc",
        pageNum: 1,
        pageSize: 10,
        parentCode: "",
        parentId: "",
        sort: "",
        status: ""
      }
    };
  },
  created() {
    this.init();
    this.initTree();
    this.getlist();
  },
  methods: {
    goto() {
      window.reload();
    },
    init() {
      let that = this;
      let id = this.$route.query.id;
      let deptId = this.$route.query.deptId;
      var params = {
        employId: id,
        departmentId: deptId
      };

      departmentAndEmployeeInfo(formData(params)).then(res => {
        that.name = that.extraPerson = res.response.name;
        that.dept = res.response.depatmentName;
        let sex = res.response.sex;
        if (sex == 0) {
          this.sex = "女";
        } else if (sex == 1) {
          this.sex = "男";
        } else {
        }
        that.phone = res.response.mobile;
      });
    },
    //初始化树的数据
    initTree() {
      let that = this;
      // var params = {
      //   code: ""
      // };
      departmentTree().then(res => {
        that.treeData = res.response;
        //   let resultdata = res.response;
        //   for (var i = 0; i < resultdata.length; i++) {
        //     resultdata[i].title = res.response[i].name;
        //     resultdata[i].id = res.response[i].id;
        //     if (resultdata[i].isLeaf == 0) {
        //       resultdata[i].loading = false;
        //       resultdata[i].children = [];
        //     }
        //   }
        //   that.treeData = resultdata;
        //   console.log("treeData", that.treeData);
      });
    },
    //获取树的数据
    findSon(item, callback) {
      var that = this;
      let params = {
        code: item.code
      };
      departmentTree(formData(params)).then(res => {
        let resultdata = res.response;
        for (var i = 0; i < resultdata.length; i++) {
          resultdata[i].title = res.response[i].name;
          resultdata[i].id = res.response[i].id;
          if (resultdata[i].isLeaf == 0) {
            resultdata[i].loading = false;
            resultdata[i].children = [];
          }
        }
        callback(resultdata);
      });
    },

    //通过点击树的数据获取相应的表格
    findlist(data) {
      this.selectCondition = data[0];
      data[0].selected = !data[0].selected;
      this.getlist();
    },
    //获取分页数据
    pageChange(page, pageSize) {
      if (page) {
        this.selectCondition.pageNum = page;
        this.pageNum = page;
      }
      if (pageSize) {
        this.selectCondition.pageSize = pageSize;
        this.pageSize = pageSize;
      }
      this.getlist(this.selectCondition);
    },
    //获取列表数据
    getlist() {
      let that = this;
      let id = this.$route.query.id;
      var params = {
        pageSize: that.pageSize,
        pageNum: that.pageNum,
        executorId: id
      };
      taskList(formData(params)).then(res => {
        that.tableData = res.response.list;
        that.total = res.response.total;
      });
    },
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status);
    },

    //分配和委派
    distributionFcuntion(id, type) {
      if (type == 1) {
        this.pointModel = true;
      }
      if (type == 2) {
        this.delegateModel = true;
      }

      this.cType = type;
      this.taskId = id;
    },
    //批量分配与委派
    moreDistribution(type) {
      if (this.selectRow.length === 0) {
        this.$Message.warning("请勾选分配的数据");
      } else {
        if (type == 3) {
          this.pointModel = true;
        }
        if (type == 4) {
          this.delegateModel = true;
        }
        this.cType = type;
      }
    },
    //责任人传过来的子组件
    personLiableFunction(personLiableData) {
      if (personLiableData) {
        this.personLiableId = personLiableData.value;
        this.personLiableName = personLiableData.label;
      }
    },
    moreDelegate() {
      this.pointModel = true;
    },
    //获取单行
    handleRowChange(row) {
      this.selectRow = row;
    },
    //批量取消任务委派
    cancelDelegate() {
      let that = this;
      if (this.selectRow.length === 0) {
        this.$Message.warning("请勾选取消委派的数据");
      } else {
        var arr = this.selectRow;

        for (var i = 0; i < arr.length; i++) {
          if (arr[i].isDelegate == "否") {
            this.$Message.warning("存在未委派的数据");
            return;
          } else {
          }
        }
        let ids = arr.map(item => {
          return item.delegaterTableId;
        });

        that.$Modal.confirm({
          title: "提示信息",
          content: "是否要取消委派?",
          onOk: () => {
            batchCancelTaskDelegate(ids).then(res => {
              that.$Message.info({
                content: "取消成功",
                duration: 3
              });
              that.getlist();
            });
          },
          onCancel: () => {
            this.$Message.info("取消操作");
          }
        });
      }
    },
    //回退
    back() {
      window.history.back(-1);
    },
    //取消任务委派
    cancelDistribution(id) {
      let that = this;
      that.$Modal.confirm({
        title: "提示信息",
        content: "是否要取消委派?",
        onOk: () => {
          let params = {
            id: id
          };
          singleCancelTaskDelegate(formData(params)).then(res => {
            that.$Message.info({
              content: "取消成功",
              duration: 3
            });
            that.getlist();
          });
        },
        onCancel: () => {
          this.$Message.info("取消操作");
        }
      });
    },
    //点击确定进行委派或分配
    confirmModal() {
      var that = this;
      var startTime = new Date(this.form.checkTime).getTime() + 1000;
      var type = this.cType;
      var endTime = "";
      if (type == 2 || type == 4) {
        endTime = new Date(this.form.endTime).getTime() + 1000;
        let vTime = startTime + 86400000 - 1000;
        if (vTime > endTime) {
          that.$Message.error("开始时间不能大于结束时间");
          return;
        }
      }
      var personLiableId = this.personLiableId;

      this.loading = true;
      let params = {};
      let data = [];
      if (type == 1 || type == 2) {
        params = {
          delegaterId: that.$route.query.id,
          delegaterName: that.name,
          entrustedId: personLiableId,
          entrustedName: that.personLiableName,
          startTime: startTime,
          taskId: that.taskId
        };
      }
      if (type == 3 || type == 4) {
        data = [];
        for (var i = 0; i < that.selectRow.length; i++) {
          let json = {};
          json.delegaterId = that.selectRow[i].executorId;
          json.delegaterName = that.selectRow[i].executorName;
          json.entrustedId = that.personLiableId;
          json.entrustedName = that.personLiableName;
          json.startTime = startTime;
          json.taskId = that.selectRow[i].id;
          if (type == 4) {
            json.endTime = endTime;
          }
          data.push(json);
        }
      }
      if (type == 1 || type == 3) {
        this.$refs.distributionRef.validate(valid => {
          if (valid) {
            if (type == 1) {
              singleTaskDistribution(params).then(res => {
                that.$Message.success("分配成功");
                that.cancel(1);
                that.getlist();
              });
            }
            if (type == 3) {
              batchTaskDistribution(data).then(res => {
                that.$Message.success("批量分配成功");
                that.cancel(1);
                that.getlist();
              });
            }
          }
        });
      }
      if (type == 2 || type == 4) {
        this.$refs.delegateRef.validate(valid => {
          if (valid) {
            if (type == 2) {
              params.endTime = endTime;
              singleTaskDelegate(params).then(res => {
                that.$Message.success("委派成功");
                that.cancel(2);
                that.getlist();
              });
            }

            if (type == 4) {
              batchTaskDelegate(data).then(res => {
                that.$Message.success("批量委派成功");
                that.cancel(2);
                that.getlist();
              });
            }
          } else {
            that.cancel();
          }
        });
      }
    },

    //点击弹窗的取消按钮
    cancel(type) {
      if (type == 1) {
        this.$refs.personLiableRef1.model = "";
        this.pointModel = false;
      }
      if (type == 2) {
        this.$refs.personLiableRef2.model = "";
        this.delegateModel = false;
        this.form.endTime = "";
      }

      this.form.checkTime = "";
      this.$refs.distributionRef.resetFields();
      this.loading = false;
    }
  }
};
</script>