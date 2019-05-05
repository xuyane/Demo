<template>
  <Row>
    <Col span="24">
    <Row class-name="current-position">
      当前位置：绩效管理&nbsp;&nbsp;>>&nbsp;&nbsp;业绩统计&nbsp;&nbsp;>>&nbsp;&nbsp;营销收入
    </Row>
    </Col>
    <Col span="24" class-name="search-form">
    <Row>
      <div class="tab" style="margin-bottom:30px;">
        <div class="tab-flex" @click="changeTab1" :class="tab === 1 ? 'tab-active' : ''">营销</div>
        <div class="tab-flex" @click="changeTab2" :class="tab === 2 ? 'tab-active' : ''">产业链</div>
      </div>
    </Row>
    <Form ref="form" :model="YXForm" :label-width="82">
      <Row type="flex" justify="space-between">
        <Col span="6">
        <FormItem label="统计月份：">
          <DatePicker type="month" placeholder="请选择考核月份" class="search-input" v-model="YXForm.indexTime"></DatePicker>
        </FormItem>
        </Col>
        <Col span="6">
        <FormItem label="姓名：">
          <Select v-model="YXForm.adminId" filterable class="search-input" placeholder="请选择人员" @on-query-change="getEmployee">
            <Option v-for="item in employees" :value="item.key" :key="item.key">{{ item.value }}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="6">
        <FormItem label="部门：">
          <bu-men @data-list="departDatas" :emptyModel='YXForm.orgIds' v-model="YXForm.orgIds"></bu-men>
        </FormItem>
        </Col>
        <Col span="6" class="text-right">
        <Button type="primary" @click="onSearch()">查询</Button>
        <Button @click="reset()" style="margin-left: 8px">重置</Button>
        </Col>
      </Row>
    </Form>
    </Col>
    <Col span="24" class="table-con">
    <Row>
      <Col span="24" class="text-right" style="font-size: 16px;">
      <span>累计目标：
        <b class="em">{{this.totalData.targetSum}}</b>&nbsp;&nbsp;</span>
      <span>累计达成：
        <b class="em">{{this.totalData.completeSum}}</b>&nbsp;&nbsp;</span>
      <span>目标完成率：
        <b class="em">{{this.totalData.targetCompleteSumRate}}%</b>&nbsp;&nbsp;</span>
      </Col>
    </Row>
    <Row>
      <Col span="24" class="text-right" style="font-size: 16px;">
      <span>新入目标：
        <b class="em">{{this.totalData.targetNewAmount}}</b>&nbsp;&nbsp;</span>
      <span>累计达成：
        <b class="em">{{this.totalData.newAmount}}</b>&nbsp;&nbsp;</span>
      <span>目标完成率：
        <b class="em">{{this.totalData.targetCompleteNewRate}}%</b>&nbsp;&nbsp;</span>
      </Col>
    </Row>
    <Row>
      <Col span="12">
      <div style="margin-bottom:20px;">
        <Button type="primary" @click="exportData">导出</Button>
      </div>
      </Col>
      <Col span="12" class="text-right" style="font-size: 16px;">
      <span>续入目标：
        <b class="em">{{this.totalData.targetOldAmount}}</b>&nbsp;&nbsp;</span>
      <span>累计达成：
        <b class="em">{{this.totalData.oldAmount}}</b>&nbsp;&nbsp;</span>
      <span>目标完成率：
        <b class="em">{{this.totalData.targetCompleteOldRate}}%</b>&nbsp;&nbsp;</span>
      </Col>
    </Row>
    <Table class="tableCommon" :data="tableData" :columns="columns" :stripe="true" :border="true">
      <div class="page" slot="footer">
        <Page :total="dataCount" show-elevator show-total :show-sizer="showSizer" :page-size="formPage.pageSize" :page-size-opts="pageSizeOpt1"
          @on-change="changePageNum" @on-page-size-change="changePageSize" />
      </div>
    </Table>
    </Col>
    <!-- 查看明细modal -->
    <Modal v-model="readModal" title="查看明细" width="900" @on-visible-change="onVisibleChange">
      <Row>
        <Form :model="itemForm">
          <Col span="7">
          <FormItem label="合同编号 ：" :label-width="87">
            <Input v-model="itemForm.contractCode" class="search-input" />
          </FormItem>
          </Col>
          <Col span="11">
          <FormItem label="会员名称 ：" :label-width="100">
            <Select v-model="itemForm.memberId" filterable remote @on-query-change="remoteMethod1" :loading="loading" placeholder="请选择会员">
              <Option v-for="item in companyList" :value="item.id" :key="item.id">{{item.name}}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="6" class="text-right">
          <Button type="primary" @click="showSearch()">查询</Button>
          <Button @click="resetItem()" style="margin-left: 8px">重置</Button>
          </Col>
        </Form>

        <Table class="tableCommon  margin-top" :data="tableData2" :columns="columns2" :stripe="true" :border="true">
          <div class="page" slot="footer">
            <Page :total="total2" show-elevator show-total :show-sizer="showSizer2" :page-size="formMain.pageSize" :page-size-opts="pageSizeOpts2"
              @on-change="changePageNum2" @on-page-size-change="changePageSize2" />
          </div>
        </Table>
      </Row>
      <div slot="footer">
        <i-button type="primary" @click="readModal=false">返回</i-button>
      </div>
    </Modal>
  </Row>
</template>

<script>
  import { employeeSelect, listPage, listItemPage, listTotalPage, selectMember } from '../../components/axios/performanceManagement.js';
  import { formData, format } from "../../../assets/js/common.js";
  import buMen from '../../components/jiXiao/buMen.vue';
  export default {
    name: 'achievementsCount',
    components: {
      buMen
    },
    data() {
      return {
        formPage: {
          pageNum: 1,
          pageSize: 10
        },
        dataCount: 0,
        pageSizeOpt1: [10, 20, 50],
        showSizer: true,
        formMain: {
          pageNum: 1,
          pageSize: 10
        },
        total2: 0,
        pageSizeOpts2: [10, 20, 50],
        showSizer2: true,
        totalData: [
          {
            targetSum: "",
            completeSum: "",
            targetCompleteSumRate: "",
            targetNewAmount: "",
            newAmount: "",
            targetCompleteNewRate: "",
            targetOldAmount: "",
            oldAmount: "",
            targetCompleteOldRate: ""
          }
        ],
        companyList: [],
        loading: false,
//        departData: [],
        employees: [],
        readModal: false,
        tab: 1,
        form: {},
        itemForm: {
          indexTime: '',
          contractCode: "",
          adminId: "",
          memberId: "",
        },
        YXForm: {
          adminId: "",
          orgIds: [],
          indexTime: ""
        },
        mouthList: [],
        nameList: [],
        departmentList: [],
        tableData: [

        ],
        tableData2: [

        ],
        columns: [
          {
            key: "adminName",
            title: "姓名",
            align: 'center',
            width: 120
          },
          {
            key: "orgName",
            title: "所在部门",
            align: 'center',
            width: 200
          },
          {
            key: "indexTime",
            title: "统计月份",
            align: 'center',
            width: 150
          },
          {
            key: "targetNewAmount",
            title: "新入金额（目标）",
            align: 'center',
            width: 150,
            render: (h, params) => {
              params.row.targetNewAmount = Number(params.row.targetNewAmount).toFixed(2);
              return h('div', {}, params.row.targetNewAmount)
            }
          },
          {
            key: "newAmount",
            title: "新入金额（实际）",
            align: 'center',
            width: 150,
            render: (h, params) => {
              params.row.newAmount = Number(params.row.newAmount).toFixed(2);
              return h('div', {}, params.row.newAmount)
            }
          },
          {
            key: "newRate",
            title: "新入完成率（%）",
            align: 'center',
            width: 150,
            render: (h, params) => {
              params.row.newRate = Number(params.row.newRate).toFixed(2);
              return h('div', {}, params.row.newRate)
            }
          },
          {
            key: "targetOldAmount",
            title: "续入金额（目标）",
            align: 'center',
            width: 150,
            render: (h, params) => {
              params.row.targetOldAmount = Number(params.row.targetOldAmount).toFixed(2);
              return h('div', {}, params.row.targetOldAmount)
            }
          },
          {
            key: "oldAmount",
            title: "续入金额（实际）",
            align: 'center',
            width: 150,
            render: (h, params) => {
              params.row.oldAmount = Number(params.row.oldAmount).toFixed(2);
              return h('div', {}, params.row.oldAmount)
            }
          },
          {
            key: "oldRate",
            title: "续入完成率（%）",
            align: 'center',
            width: 150,
            render: (h, params) => {
              params.row.oldRate = Number(params.row.oldRate).toFixed(2);
              return h('div', {}, params.row.oldRate)
            }
          },
          {
            key: "confAmount",
            title: "会议金额（核算）",
            align: 'center',
            width: 150,
            render: (h, params) => {
              params.row.confAmount = Number(params.row.confAmount).toFixed(2);
              return h('div', {}, params.row.confAmount)
            }
          },
          {
            key: "operate",
            title: "操作",
            align: "center",
            fixed: "right",
            minWidth: 80,
            render: (h, data) => {
              return h('div', [
                h('a', {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      let time = new Date(data.row.indexTime).setHours(0, 0, 0, 0)
                      this.itemForm.indexTime = time;
                      this.itemForm.adminId = data.row.adminId;
                      this.readModal = true;

                      this.getModelItemList();
                    }
                  }
                }, '查看明细  '),
              ])
            }
          }
        ],
        columns2: [
          {
            key: "pfContractProductId",
            title: "合同产品ID",
            align: 'center',
            minWidth: 90
          },
          {
            key: "productName",
            title: "产品名称",
            align: 'center',
            width: 120
          },
          {
            key: "productVersion",
            title: "产品版本",
            align: 'center',
            width: 100
          },
          {
            key: "contractCode",
            title: "所属合同",
            align: 'center',
            width: 120
          },
          {
            key: "memberName",
            title: "所属会员",
            align: 'center',
            width: 120
          },
          {
            key: "subtotalAmount",
            title: "产品总金额",
            align: 'center',
            width: 120
          },
          {
            key: "ackAmount",
            title: "产品金额（已认账）",
            align: 'center',
            width: 120
          },
          {
            key: "startTime",
            title: "服务开始时间",
            align: 'center',
            width: 120
          },
          {
            key: "endTime",
            title: "服务结束时间",
            align: 'center',
            width: 150
          },
          {
            key: "newAmount",
            title: "新入金额（核算）",
            align: 'center',
            width: 150
          },
          {
            key: "oldAmount",
            title: "续入金额（核算）",
            align: 'center',
            width: 150
          },
        ]
      }
    },
    created() {
      this.departDatas();
      this.getModelList();
    },
    methods: {
      remoteMethod1(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            let form = {
              name: query
            }
            selectMember(form).then(res => {
              this.companyList = res.response
            })
          }, 50);
        } else {
          this.companyList = [];
        }
      },
      // 部门下拉列表
      departDatas(deptLabel, deptId, deptCode) {
        this.departData = deptId ? deptId : null;
        this.YXForm.orgIds=deptId ? deptId : [];
      },
      // departDatas(deptLabel, deptId, deptCode) {
      //   this.departData = deptId ? deptId : null;
      // },
      exportData() {
        if (this.dataCount >= 10000) {
          this.$Message.warning({
            content: '数据超过1万条，请分批导出',
            duration: 2
          });
        }else if (this.dataCount <= 0) {
          this.$Message.warning({
            content: '无数据',
            duration: 2
          })
        }else {
//          console.log(this.YXForm);
          window.location.href = "/report/PfAccountDetailAdmin/yxsr_export?orgIds=" + this.YXForm.orgIds + "&indexTime=" + +this.YXForm.indexTime + "&adminId=" + this.YXForm.adminId;
        }
      },
      resetItem() {
        this.itemForm = {
          adminId: this.itemForm.adminId,
          contractCode: "",
          memberId: "",
          indexTime: ""
        }
        this.formMain = {
          pageNum: 1,
          pageSize: 10
        }
      },

      onVisibleChange(state) {
        if (!state) {
          this.resetItem();
        }
      },


      reset() {
//        this.departData = null,
          this.YXForm = {
            indexTime: '',
            adminId: '',
            orgIds: []
          }

        this.formPage = {
          pageNum: 1,
          pageSize: 10
        }
      },
      onSearch() { //列表查询
        this.formPage.pageNum = 1;
        this.formPage.pageSize = 10;
        this.getModelList();
      },
      showSearch() {  //查看明细查询
        this.formMain.pageNum = 1;
        this.formMain.pageSize = 10;
        this.getModelItemList();
      },
      //确认明细列表
      getModelList() {
        this.$Spin.show();
        let form = {
          indexTime: new Date(this.YXForm.indexTime).getTime(),
          adminId: this.YXForm.adminId,
          orgIds: this.YXForm.orgIds,
          pageNum: this.formPage.pageNum,
          pageSize: this.formPage.pageSize,
          v: Math.random() * 1000
        }
        listPage(form).then(res => {
          this.tableData = res.response.list ? res.response.list : [];
          this.dataCount = res.response.total
        })
        listTotalPage(form).then(res => {
          this.totalData.targetSum = res.response.targetSum;
          this.totalData.completeSum = res.response.completeSum;
          this.totalData.targetCompleteSumRate = res.response.targetCompleteSumRate;
          this.totalData.targetNewAmount = res.response.targetNewAmount;
          this.totalData.newAmount = res.response.newAmount;
          this.totalData.targetCompleteNewRate = res.response.targetCompleteNewRate;
          this.totalData.targetOldAmount = res.response.targetOldAmount;
          this.totalData.oldAmount = res.response.oldAmount;
          this.totalData.targetCompleteOldRate = res.response.targetCompleteOldRate;
          this.$Spin.hide();
        })
      },
      getModelItemList() {
        this.$Spin.show();
        let form = {
          indexTime: this.itemForm.indexTime,
          contractCode: this.itemForm.contractCode,
          adminId: this.itemForm.adminId,
          memberId: this.itemForm.memberId,
          pageNum: this.formMain.pageNum,
          pageSize: this.formMain.pageSize
        }
        listItemPage(form).then(res => {
          this.tableData2 = res.response.list ? res.response.list : [];
          this.total2 = res.response.total
          this.$Spin.hide();
        })
      },

      //员工下拉列表
      getEmployeeData(name) {
        let form = {
          name: name ? name : ' '
        }
        employeeSelect(form).then(res => {
          this.employees = res.response
        })
      },
      getEmployee(data) {
        this.getEmployeeData(data)
      },
      changeTab2() {
        this.$router.push({ name: 'industryChain' })
      },
      changePageNum(current) {
        this.formPage.pageNum = current;
        this.getModelList();
      },
      // 监听修改显示条数
      changePageSize(size) {
        this.formPage.pageSize = size;
        this.getModelList();
      },
      changePageNum2(current) {
        this.formMain.pageNum = current;
        this.getModelItemList();
      },
      // 监听修改显示条数
      changePageSize2(size) {
        this.formMain.pageSize = size;
        this.getModelItemList();
      },
      changeTab1() {

      },
      pageChange() {

      },
      pageChange2() {

      }
    }
  }
</script>

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

  .margin-top {
    margin-top: 60px;
  }

  .page {
    margin: 10px 0;
    text-align: right;
    padding-right: 18px;
  }
</style>
