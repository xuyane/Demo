<template>
  <Row>
    <Col span="24">
      <Row class-name="current-position">
        当前位置：
        <router-link to="/plantIndex" class="link-css">信息发布管理</router-link>&nbsp;&nbsp;>>&nbsp;&nbsp;
        <router-link to="/myInformationUnit" class="link-css">我的信息单元</router-link>
      </Row>
    </Col>
    <Col span="24" class-name="search-form">
      <Form :model="searchForm" :label-width="100">
        <Col>
          <Row type="flex" justify="space-between">
            <Col span="7">
              <FormItem label="信息单元编码:">
                <Input v-model="informationUnitCode" class="search-input" placeholder="请输入信息单元编码"></Input>
              </FormItem>
            </Col>
            <Col span="7">
              <FormItem label="信息单元名称:">
                <Input v-model="informationUnitName" class="search-input" placeholder="请输入信息单元名称"></Input>
              </FormItem>
            </Col>
            <Col span="7">
              <FormItem label="区域:">
                <associate-Search
                  @query-list="areaFunction"
                  :dataUrl="urlArea"
                  :modelVal="area"
                  :modelLabel="arealabel"
                  ref="areaRef"
                  class="search-input"
                ></associate-Search>
              </FormItem>
            </Col>
          </Row>
        </Col>
        <Col span="24">
          <Row type="flex" justify="space-between">
            <Col span="7">
              <FormItem label="企业:">
                <associate-Search
                  @query-list="enterpeiseFunction"
                  :dataUrl="urlEnterpeise"
                  :modelVal="enterprise"
                  :modelLabel="enterpriselabel"
                  ref="enterpeiseRef"
                  class="search-input"
                ></associate-Search>
              </FormItem>
            </Col>
            <Col span="7">
              <FormItem label="频率:">
                <Select v-model="times" class="search-input">
                  <Option
                    v-for="item in boolList"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.desc }}</Option>
                </Select>
              </FormItem>
            </Col>

            <Col span="7">
              <FormItem label="当日任务情况:">
                <Select v-model="processId" class="search-input" ref="processIdRef">
                  <Option
                    v-for="item in processList"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.label }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="7"></Col>
          </Row>
        </Col>
        <Col span="24">
          <Row type="flex" justify="space-between">
            <Col span="24" class="text-right mar-b-10">
              <Button type="primary" @click="queryData()">查询</Button>
              <Button style="margin-left: 8px" @click="reset">重置</Button>
            </Col>
          </Row>
        </Col>
      </Form>
    </Col>

    <Col span="24">
      <Row class-name="table-con">
        <div class="btn-container mar20 bordergray">
          <div class="grayTitle">品种</div>
          <div class="gratMain">
            <Button
              class="search-btn iconQuery"
              v-for="(item,index) in btnDataBreeds"
              :type="item.cheched ? 'warning':'primary'"
              :data="btnDataBreeds"
              :key="index"
              @click="querykeyWordDatasBreed(item.id,index)"
              style="margin-bottom: 10px"
            >
              {{item.name}}
              <Icon type="md-checkmark" class="iconConfirm" v-if="item.cheched==true"/>
            </Button>
          </div>
        </div>
        <div class="btn-container mar20 bordergray">
          <div class="grayTitle">信息</div>
          <div class="gratMain">
            <Button
              class="search-btn iconQuery"
              v-for="(item,index) in btnDatas"
              :type="item.cheched?'warning':'primary'"
              :data="btnDatas"
              :key="index"
              @click="queryByKewords(item.id,index)"
              style="margin-bottom: 10px"
            >
              {{item.name}}
              <Icon type="md-checkmark" class="iconConfirm" v-if="item.cheched==true"/>
            </Button>
          </div>
        </div>
        <div style="text-align:right;margin-bottom:5px;">
          <span>记录数:</span>
          <span>{{total}}</span>
        </div>
        <Table
          :loading="loading"
          :data="tableData"
          style="width: 100%"
          :columns="columns"
          :stripe="true"
          :border="true"
        ></Table>
      </Row>
    </Col>

    <Modal v-model="delegateTaskModel" title="人员选择">
      <Form :label-width="120">
        <Row>
          <Col span="24">
            <span class="xingX">*</span>
            <FormItem label="姓名 ：">
              <associate-Search
                @query-list="delegatePerson"
                :dataUrl="urlDelegatePerson"
                style="width: 70%;"
                :extra="extraPerson"
                ref="delegateTaskInfo"
                class="search-input"
              ></associate-Search>
            </FormItem>
          </Col>
          <Col span="24">
            <span class="xingX2">*</span>
            <FormItem label="生效日期 ：">
              <DatePicker
                v-model="selectStartTime"
                type="date"
                style="width: 70%;"
                class="search-input"
                :options="options3"
                placeholder="请选择日期"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col span="24">
            <span class="xingX2">*</span>
            <FormItem label="结束日期 ：">
              <DatePicker
                v-model="selectEndTime"
                type="date"
                style="width: 70%;"
                class="search-input"
                :options="options4"
                placeholder="请选择日期"
              ></DatePicker>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <i-button type="primary" @click="cancelDelegateTask">取消</i-button>
        <i-button type="primary" @click="confirmDelegateTask">确定</i-button>
      </div>
    </Modal>
    <edit-index-modal @hide-modal="hideAddModal" ref="editIndexRef"></edit-index-modal>
  </Row>
</template>
<script>
import axios from "axios";
import associateSearch from "../../components/associateSearch/associateSearch.vue";
import editIndexModal from "./editIndex.vue";
import {
  getUserInfo,
  getBreed,
  getArea,
  getentErpeise,
  site,
  getEmployee
} from "../unitmangement/api/unitManageMent";
import {
  myInformationList,
  keyWordDatasBreed,
  keyWordDatas,
  selectTaskCycle,
  delegateTask,
  cancelDelegate,
  queryPageByKeyWord
} from "../unitmangement/api/infoDiffusion";
import {
  singleTaskDelegate,
  singleCancelTaskDelegate
} from "../unitmangement/api/taskplant.js";
import { formData } from "../../../assets/js/common.js";
import timeStampChange from "../../../assets/js/timestamp_change_date.js";
import flashModalVue from "./modalList/flashModal.vue";
export default {
  name: "myInformationUnit",
  components: {
    associateSearch,
    editIndexModal
  },
  data() {
    return {
      delegateTaskModel: false,
      pageSize: 10,
      pageNum: 1,
      webSiteList: [],
      text: "高级搜索",
      loading: false,
      urlArea: "/information/select/all_area",
      urlEnterpeise: "/information/select/enterpeise_name",
      urlDelegatePerson: "/information/select/employee_dis_name_enable",
      informationUnitCode: "",
      informationUnitName: "",
      breedId: "",
      total: "",
      informationTypeId: "",
      extraId: "",
      area: "",
      arealabel: "",
      enterprise: "",
      enterpriselabel: "",
      times: "",
      processId: -1,
      form: {},
      searchForm: {},
      addRules: [],
      options1: [],
      options2: [],
      options3: [],
      options4: {},
      btnDatas: [],
      processList: [
        { value: -1, label: "全部" },
        // { value: 2, label: "无任务" },
        { value: 1, label: "未完成" },
        { value: 0, label: "已完成" }
      ],
      boolList: [],
      isFree: [{ value: 1, label: "是" }, { value: 0, label: "否" }],
      isState: [{ value: 1, label: "是" }, { value: 0, label: "否" }],
      personLiables: [{ value: 1, label: "是" }, { value: 0, label: "否" }],
      date: [
        { value: 1, label: "年" },
        { value: 2, label: "月" },
        { value: 3, label: "日" }
      ],
      btnDataBreeds: [],
      columns: [
        {
          key: "informationUnitId",
          title: "信息单元ID",
          width: 120,
          align: "center"
        },
        {
          key: "informationUnitCode",
          title: "信息单元编码",
          width: 150,
          align: "center"
        },
        {
          key: "informationUnitName",
          title: "信息单元名称",
          width: 300,
          align: "center"
        },
        {
          key: "todayTaskState",
          title: "当日任务情况",
          width: 120,
          align: "center",
          render: (h, data) => {
            let color = "";
            if (data.row.todayTaskState.substring(0, 3) === "已完成") {
              color = "#9ecd3f";
            } else if (data.row.todayTaskState.substring(0, 3) === "未完成") {
              color = "red";
            } else {
              color = "#666";
            }

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
              data.row.todayTaskState
            );
          }
        },
        {
          key: "counts",
          title: "频率",
          width: 200,
          align: "center",
          render: (h, params) => {
            let texts = "";
            texts = this.formatFrequency(
              params.row.taskCycle,
              params.row.executionNumber,
              params.row.cycleSupplyInfo
            );
            return h(
              "div",
              {
                props: {}
              },
              texts
            );
          }
        },
        {
          key: "checkTime",
          title: "最晚发布时间",
          width: 150,
          align: "center"
        },
        {
          key: "executorName",
          title: "责任人",
          width: 150,
          align: "center"
        },
        {
          key: "departmenName",
          title: "所属部门",
          width: 150,
          align: "center"
        },
        {
          key: "isDelegate",
          title: "是否委派",
          width: 150,
          align: "center"
        },
        {
          key: "entrustedName",
          title: "受派人",
          width: 150,
          align: "center"
        },
        {
          key: "operate",
          title: "操作",
          width: 350,
          align: "center",
          fixed: "right",
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
                      let query = {
                        breedId: this.breedId,
                        informationTypeId: this.informationTypeId
                      };

                      this.setHistorySession(() => {
                        this.$router.push({
                          name: "formStyle",
                          query: {
                            item: JSON.stringify(Object.assign(data.row, query))
                          }
                        });
                      });
                    }
                  }
                },
                "发布信息"
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
                      this.showIndexFunction(data.row);
                    }
                  }
                },
                "编辑指标"
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
                      let displayType = data.row.displayType,
                        arr = [1, 2, 3],
                        query = {
                          breedId: this.breedId,
                          informationTypeId: this.informationTypeId
                        };

                      if (arr.indexOf(displayType) > -1) {
                        this.setHistorySession(() => {
                          this.$router.push({
                            name: "publishList",
                            query: {
                              item: JSON.stringify(
                                Object.assign(data.row, query)
                              )
                            }
                          });
                        });
                      } else {
                        this.$Message.info("该信息单元未关联模板");
                      }
                    }
                  }
                },
                "发布列表"
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
                      this.delegateTaskFunction(data.row);
                    }
                  }
                },
                "任务委派"
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
                      this.cancelDelegateFunction(data.row.taskId);
                    }
                  }
                },
                data.row.showCancel == 1 ? "" : "取消委派"
              )
            ]);
          }
        }
      ],
      tableData: [],
      taskId: "",
      selectPersonItem: "",
      extraPerson: "",
      selectStartTime: "",
      selectEndTime: "",
      options3: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 86400000;
        }
      }
    };
  },
  mounted() {
    let that = this;
    const session = JSON.parse(
      window.sessionStorage.getItem("myInformationUnitList")
    );
    if (session) {
      this.informationUnitCode = session.informationUnitCode;
      this.informationUnitName = session.informationUnitName;

      this.area = session.area;
      this.arealabel = session.arealabel;
      this.enterprise = session.enterprise;
      this.enterpriselabel = session.enterpriselabel;
      this.times = session.times;
      this.processId = session.processId;

      that.$nextTick(() => {
        that.processId = Number(session.processId);
      });
    }
    if (this.$route.query.taskCycle) {
      this.times = this.$route.query.taskCycle;
    }

    let rowList = this.$route.query.item
      ? JSON.parse(this.$route.query.item)
      : {};
    this.breedId = rowList.breedId || "";
    this.informationTypeId = rowList.informationTypeId || "";

    this.queryData();
    this.querykeyWordBreed();
    this.queryKeywords();
    this.querySite();
    this.queryTaskCycle();
  },
  methods: {
    pageChange(page, pageSize) {
      if (page) {
        this.pageNum = page;
      }
      if (pageSize) {
        this.pageSize = pageSize;
      }
      this.queryData();
    },
    querykeyWordBreed() {
      let params = {};
      keyWordDatasBreed(formData(params)).then(res => {
        res.response.map(item => {
          item.cheched = this.breedId == item.id ? true : false;
        });
        this.btnDataBreeds = res.response;
      });
    },
    queryKeywords() {
      let params = {};
      keyWordDatas(formData(params)).then(res => {
        res.response.map(item => {
          item.cheched = this.informationTypeId == item.id ? true : false;
        });
        this.btnDatas = res.response;
      });
    },
    querySite() {
      let params = {};
      site(formData(params)).then(res => {
        this.webSiteList = res.response;
        this.webSiteList.unshift({ id: -1, text: "全部" });
      });
    },
    queryTaskCycle() {
      let params = {};
      selectTaskCycle(formData(params)).then(res => {
        this.boolList = res.response;
        this.boolList.unshift({ value: -1, desc: "全部" });
      });
    },
    querykeyWordDatasBreed(id, datas) {
      if (this.btnDataBreeds[datas].cheched) {
        this.btnDataBreeds[datas].cheched = false;
        this.breedId = "";
        this.breedIndex = "";
      } else {
        this.btnDataBreeds.map(item => {
          item.cheched = false;
        });
        this.breedId = id;
        this.btnDataBreeds[datas].cheched = true;
      }
      this.tableData = [];
      this.loading = true;

      let params = {
        informationUnitCode:
          this.informationUnitCode == undefined ? "" : this.informationUnitCode,
        informationUnitName:
          this.informationUnitName == undefined ? "" : this.informationUnitName,
        areaId: this.area == undefined ? "" : this.area,
        enterpriseId: this.enterprise == undefined ? "" : this.enterprise,
        taskCycle: this.times == undefined ? "" : this.times,
        publishStatus: this.processId == undefined ? "" : this.processId,
        pageNum: 1,
        pageSize: 10,
        breedId: this.breedId == undefined ? "" : this.breedId,
        informationTypeId:
          this.informationTypeId == undefined ? "" : this.informationTypeId
      };
      myInformationList(formData(params))
        .then(res => {
          this.loading = false;
          this.total = res.response.length;
          this.tableData = res.response;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    queryByKewords(id, datas) {
      var that = this;
      if (that.btnDatas[datas].cheched) {
        that.btnDatas[datas].cheched = false;
        that.informationTypeId = "";
      } else {
        that.btnDatas.map(item => {
          item.cheched = false;
          that.informationTypeId = id;
        });
        that.btnDatas[datas].cheched = true;
      }

      that.tableData = [];
      that.loading = true;
      let params = {};
      params = {
        informationUnitCode:
          that.informationUnitCode == undefined ? "" : that.informationUnitCode,
        informationUnitName:
          that.informationUnitName == undefined ? "" : that.informationUnitName,
        areaId: that.area == undefined ? "" : that.area,
        enterpriseId: that.enterprise == undefined ? "" : that.enterprise,
        taskCycle: that.times == undefined ? "" : that.times,
        publishStatus: that.processId == undefined ? "" : that.processId,
        pageNum: 1,
        pageSize: 10,
        breedId: that.breedId == undefined ? "" : that.breedId,
        informationTypeId:
          that.informationTypeId == undefined ? "" : that.informationTypeId
      };
      myInformationList(formData(params))
        .then(res => {
          that.loading = false;
          that.total = res.response.length;
          that.tableData = res.response;
        })
        .catch(() => {
          that.loading = false;
        });
    },
    reset() {
      this.informationUnitCode = "";
      this.informationUnitName = "";
      this.area = "";
      this.enterprise = "";
      this.arealabel = "";
      this.enterpriselabel = "";
      this.times = "";
      this.processId = -1;
      if (window.sessionStorage.getItem("myInformationUnitList")) {
        window.sessionStorage.removeItem("myInformationUnitList");
      }
      this.$refs.areaRef.$refs.select.clearSingleSelect();
      this.$refs.enterpeiseRef.$refs.select.clearSingleSelect();
      this.$refs.areaRef.$refs.select.query = "";
      this.$refs.enterpeiseRef.$refs.select.query = "";
      this.queryData();
    },
    queryData() {
      var that = this;
      that.loading = true;
      let params = {
        informationUnitCode:
          that.informationUnitCode == undefined ? "" : that.informationUnitCode,
        informationUnitName:
          that.informationUnitName == undefined ? "" : that.informationUnitName,
        areaId: that.area == undefined ? "" : that.area,
        enterpriseId: that.enterprise == undefined ? "" : that.enterprise,
        taskCycle: that.times == undefined ? "" : that.times,
        publishStatus: that.processId == undefined ? "" : that.processId,
        pageNum: that.pageNum,
        pageSize: that.pageSize,
        breedId: that.breedId == undefined ? "" : that.breedId,
        informationTypeId:
          that.informationTypeId == undefined ? "" : that.informationTypeId
      };
      myInformationList(formData(params))
        .then(res => {
          that.loading = false;
          that.total = res.response.length;
          that.tableData = res.response;
        })
        .catch(() => {
          that.loading = false;
        });
    },
    showIndexFunction(data) {
      if (data.havaBackModel == "0") {
        this.$refs.editIndexRef.showEditQuotaPageFunction(data);
      } else {
        this.$Modal.info({
          title: "提示",
          content: "该信息单元尚未关联模板，请联系总编室关联模板"
        });
      }
    },
    hideAddModal() {
      this.$refs.editIndexRef.hideIndexModel();
    },
    delegateTaskFunction(row) {
      this.taskId = row.taskId;
      this.delegateTaskModel = true;
      this.extraPerson = row.executorName;
      this.extraId = row.executorId;
    },
    cancelDelegateFunction(id) {
      let that = this;
      that.$Modal.confirm({
        title: "提示信息",
        content: "您确认要取消委派吗?",
        onOk: () => {
          let params = new URLSearchParams();
          params.append("taskId", id);
          cancelDelegate(params).then(res => {
            that.$Message.info({
              content: "取消成功",
              duration: 3
            });
            that.queryData();
          });
        },
        onCancel: () => {
          this.$Message.info("取消操作");
        }
      });
    },
    confirmDelegateTask() {
      if (this.selectPersonItem && this.selectStartTime && this.selectEndTime) {
        var that = this;
        let startTime =
          new Date(timeStampChange.format(that.selectStartTime)).getTime() +
          1000;
        let endTime =
          new Date(timeStampChange.format(that.selectEndTime)).getTime() + 1000;
        let vTime = startTime + 86400000 - 1000;
        if (vTime > endTime) {
          this.$Message.info("请输入生效日期不能大于或者等于结束日期");
          return;
        }
        let form = {
          delegaterId: that.extraId,
          delegaterName: that.extraPerson,
          entrustedId: that.selectPersonItem.value,
          entrustedName: that.selectPersonItem.label,
          startTime: startTime,
          endTime: endTime,
          taskId: that.taskId
        };
        singleTaskDelegate(form).then(res => {
          that.$Message.success("委派成功");
          that.delegateTaskModel = false;
          that.selectPersonItem = "";
          that.selectStartTime = "";
          that.selectEndTime = "";
          that.queryData();
        });
      } else if (!this.selectStartTime) {
        this.$Message.info("请输入生效日期");
      } else if (!this.selectEndTime) {
        this.$Message.info("请输入结束日期");
      } else {
        this.$Message.info("请输入人员姓名");
      }
      this.$refs.delegateTaskInfo.model = "";
    },
    //委派任务返回按钮
    cancelDelegateTask() {
      this.delegateTaskModel = false;
      this.selectStartTime = "";
      this.selectEndTime = "";
      this.$refs.delegateTaskInfo.model = "";
    },

    //获取从区域传过来的子组件
    areaFunction(areaData) {
      if (areaData) {
        this.area = areaData.value;
        this.arealabel = areaData.label;
      }
    },
    //获取从企业传过来的子组件
    enterpeiseFunction(enterpeiseData) {
      if (enterpeiseData) {
        this.enterprise = enterpeiseData.value;
        this.enterpriselabel = enterpeiseData.label;
      }
    },

    delegatePerson(person) {
      this.selectPersonItem = person;
    },

    formatFrequency(task_cycle, execution_number, cycle_supply_info) {
      var textStr = "";
      switch (task_cycle) {
        case 0:
          textStr = execution_number + "次/日";
          break;
        case 1:
          textStr =
            execution_number +
            "次/周" +
            "    截止" +
            this.formatWeekTask(cycle_supply_info);
          break;
        case 2:
          textStr =
            execution_number +
            "次/月" +
            "    截止" +
            this.formatMonthTask(cycle_supply_info);
          break;
        case 3:
          textStr =
            execution_number +
            "次/季" +
            "    截止" +
            this.formatMonthTask(cycle_supply_info);
          break;
        case 4:
          textStr =
            execution_number +
            "次/年" +
            "    截止" +
            this.formatYearTask(cycle_supply_info);
          break;
        case 99:
          textStr = "一次性任务";
          break;
        default:
          break;
      }
      return textStr;
    },
    formatWeekTask(cycle_supply_info) {
      switch (cycle_supply_info) {
        case 1:
          return "星期一";
          break;
        case 2:
          return "星期二";
          break;
        case 3:
          return "星期三";
          break;
        case 4:
          return "星期四";
          break;
        case 5:
          return "星期五";
          break;
        case 6:
          return "星期六";
          break;
        case 7:
          return "星期日";
          break;
        default:
          break;
      }
    },
    formatMonthTask(cycle_supply_info) {
      if (cycle_supply_info == 0) {
        return "月底";
      } else {
        return cycle_supply_info + "日";
      }
    },
    timestampToTime(timestamp) {
      var date = new Date(timestamp);
      var Y = date.getFullYear() + "年";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "月";
      var D = date.getDate() + "日";
      return M + D;
    },
    formatYearTask(cycle_supply_info) {
      return this.timestampToTime(cycle_supply_info);
    },
    setHistorySession(cb) {
      const myInformationUnitList = {
        informationUnitCode: this.informationUnitCode,
        informationUnitName: this.informationUnitName,
        area: this.area,
        arealabel: this.arealabel,
        enterprise: this.enterprise,
        enterpriselabel: this.enterpriselabel,
        times: this.times,
        processId: this.processId
      };
      window.sessionStorage.setItem(
        "myInformationUnitList",
        JSON.stringify(myInformationUnitList)
      );
      if (cb) cb();
    }
  }
};
</script>
<style lang="less" scoped>
.take-up {
  color: #2d8cf0;
  margin-right: 10px;
  cursor: pointer;
}
.iconQuery {
  position: relative;
  margin-top: 10px;
  min-width: 100px;
  border-radius: 0;
}
.iconConfirm {
  background: #2d8cf0;
  position: absolute;
  right: -5px;
  border-radius: 15px;
  padding: 2px;
  top: -5px;
}
.mar20 {
  margin: 30px auto;
  padding: 20px 0 10px;
  position: relative;
}
.grayTitle {
  position: absolute;
  color: #000;
  background-color: #d7d7d7;
  border: 1px solid #000;
  width: 80px;
  display: block;
  text-align: center;
  font-size: 15px;
  line-height: 30px;
  top: -15px;
  left: 15px;
  font-weight: bold;
  z-index: 10;
}
.gratMain {
  height: 100px;
  overflow-y: scroll;
}
.xingX {
  position: absolute;
  color: red;
  left: 45px;
  top: 5px;
  font-size: 20px;
}
.xingX2 {
  position: absolute;
  color: red;
  left: 18px;
  top: 5px;
  font-size: 20px;
}
.bordergray {
  border: 1px solid #ccc;
}
</style>