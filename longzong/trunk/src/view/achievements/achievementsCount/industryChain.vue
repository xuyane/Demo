<template>
  <Row>
    <Col span="24">
    <Row class-name="current-position">
      当前位置：绩效管理&nbsp;&nbsp;>>&nbsp;&nbsp;业绩统计&nbsp;&nbsp;>>&nbsp;&nbsp;产业链
    </Row>
    </Col>
    <Col span="24" class-name="search-form">
    <Row>
      <div class="tab" style="margin-bottom:30px;">
        <div class="tab-flex" @click="changeTab1" :class="tab === 1 ? 'tab-active' : ''">营销</div>
        <div class="tab-flex" @click="changeTab2" :class="tab === 2 ? 'tab-active' : ''">产业链</div>
      </div>
    </Row>
    <Form ref="form" :model="formCYL" :label-width="82">
      <Row type="flex" justify="space-between">
        <Col span="6">
        <FormItem label="统计月份：">
          <DatePicker type="month" placeholder="请选择考核月份" class="search-input" v-model="formCYL.indexTime"></DatePicker>
        </FormItem>
        </Col>
        <Col span="6">
        <FormItem label="部门：">
          <bu-men @data-list="departDatas" :emptyModel='formCYL.orgIds' v-model="formCYL.orgIds"></bu-men>
        </FormItem>
        </Col>
        <Col span="6" class="text-right">
        <Button type="primary" @click="onSearch">查询</Button>
        <Button @click="reset" style="margin-left: 8px">重置</Button>
        </Col>
      </Row>
    </Form>
    </Col>
    <Col span="24" class="table-con">
    <Row>
      <Col span="12">
      <div style="margin-bottom:20px;">
        <Button type="primary" @click="exportData">导出</Button>
      </div>
      </Col>
      <Col span="12" class="text-right" style="font-size: 16px;">
      <span>累计目标：
        <b class="em">{{this.totalData.cumulativeTarget}}</b>&nbsp;&nbsp;</span>
      <span>累计达成：
        <b class="em">{{this.totalData.accumulativeAchievement}}</b>&nbsp;&nbsp;</span>
      <span>目标完成率：
        <b class="em">{{this.totalData.targetCompletionRate}}</b>&nbsp;&nbsp;</span>
      </Col>
    </Row>
    <Table class="tableCommon" :data="tableData" :columns="columns" :stripe="true" :border="true">
      <div class="page" slot="footer">
        <Page :total="dataCount" show-elevator show-total :show-sizer="showSizer" :page-size="formPage.pageSize" :page-size-opts="pageSizeOpt1"
          @on-change="changePageNum" @on-page-size-change="changePageSize" />
      </div>
    </Table>
    <!-- <oil-page
        :total="total"
        :page-size="pageSize"
        @page-change="pageChange"
        :page-size-opts="pageSizeOpts"
        :show-sizer="showSizer">
      </oil-page> -->
    </Col>
    <!-- 查看明细modal -->
    <Modal v-model="readModal" title="查看明细" width="1000">
      <Row>
        <Form :model="formCYLItem" style="overflow: hidden;">
          <Col span="8">
          <FormItem label="合同编号 ：" :label-width="87">
            <Input type="text" v-model="formCYLItem.contractCode" class="search-input" />
          </FormItem>
          </Col>
          <Col span="8" class="text-right">
          <Button type="primary" @click="showSearch">查询</Button>
          <Button @click="resetItem('form')" style="margin-left: 8px">重置</Button>
          </Col>
        </Form>
        <Table class="tableCommon" :data="tableData2" :columns="columns2" :stripe="true" :border="true">
          <div class="page" slot="footer">
            <Page :total="total2" show-elevator show-total :show-sizer="showSizer2" :page-size="formMain.pageSize" :page-size-opts="pageSizeOpts2"
              @on-change="changePageNum2" @on-page-size-change="changePageSize2" />
          </div>
        </Table>
        <!-- <oil-page
          :total="total2"
          :page-size="pageSize2"
          @page-change="pageChange2"
          :page-size-opts="pageSizeOpts2"
          :show-sizer="showSizer2">
        </oil-page> -->
      </Row>
      <div slot="footer">
        <i-button type="primary" @click="readModal=false">返回</i-button>
      </div>
    </Modal>
  </Row>
</template>

<script>
  import OilPage from "../../components/page/page.vue";
  import { cylListPage, cylListItemPage, cylListTotal, cylExport } from '../../components/axios/performanceManagement.js';
  import { formData, format } from "../../../assets/js/common.js";
  import buMen from '../../components/jiXiao/buMen.vue';
  export default {
    name: 'industryChain',
    components: {
      OilPage,
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
        assessmentCycle: [{
          value: 'all',
          label: '2018年1月~2018年06月'
        }],
        totalData: [
          {
            cumulativeTarget: "",
            accumulativeAchievement: "",
            targetCompletionRate: ""
          }
        ],
        //      departData: [],
        readModal: false,
        tab: 2,
        form: {},
        mouthList: [],
        nameList: [],
        departmentList: [],
        formCYL: {
          indexTime: "",
          orgIds: []
        },
        formCYLItem: {
          indexTime: "",
          contractCode: "",
          orgId: ""
        },
        tableData: [
          {}
        ],
        tableData2: [{}],
        columns: [
          {
            key: "orgName",
            title: "产业链",
            align: 'center',
            width: 260
          },
          {
            key: "departmentName",
            title: "部门",
            align: 'center',
            minWidth: 180,
          },
          {
            key: "indexTime",
            title: "统计月份",
            align: 'center',
            width: 200
          },
          {
            key: "targetAmount",
            title: "目标金额",
            align: 'center',
            width: 200
          },
          {
            key: "amount",
            title: "实际金额",
            align: 'center',
            width: 200
          },
          {
            key: "tartgetRat",
            title: "目标完成率(%)",
            align: 'center',
            width: 200,

          },
          {
            key: "operate",
            title: "操作",
            align: "center",
            width: 200,
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
                      this.formCYLItem.indexTime = time;
                      this.formCYLItem.orgId = data.row.orgId
                      this.readModal = true;
                      this.formCYLItem.contractCode = data.row.contractCode;
                      this.getModelItemList();
                    }
                  }
                }, '查看明细  '),
              ])
            }
          },
        ],
        columns2: [
          {
            key: "breedName",
            title: "品种",
            align: 'center',
            width: 90
          },
          {
            key: "orgName",
            title: "所属产业链",
            align: 'center',
            width: 120
          },
          {
            key: "productId",
            title: "合同产品ID",
            align: 'center',
            width: 100
          },
          {
            key: "productNameCn",
            title: "产品名称",
            align: 'center',
            width: 120
          },
          {
            key: "productVersion",
            title: "产品版本",
            align: 'center',
            width: 120
          },
          {
            key: "contractCode",
            title: "所属合同",
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
            width: 150
          },
          {
            key: "rate",
            title: "品种分成占比",
            align: 'center',
            width: 150
          },
          {
            key: "breedAmount",
            title: "品种金额（核算）",
            align: 'center',
            width: 150
          },
        ]
      }
    },
    created() {
      this.getModelList();
      this.departDatas();
    },
    methods: {
      reset() {
        this.formCYL = {
          indexTime: '',
          orgIds: []
        }
        //      this.departData = null,
        this.formPage = {
          pageNum: 1,
          pageSize: 10
        }
      },
      resetItem() {
        this.formCYLItem = {
          contractCode: '',
          orgId: ""
        }

      },
      // 部门下拉列表
      departDatas(deptLabel, deptId, deptCode) {
        //        this.departData = deptId ? deptId : null;
        this.formCYL.orgIds = deptId || [];
      },
      changeTab1() {
        this.$router.push({ name: 'achievementsCount' })
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
      changeTab2() {

      },
      pageChange() {

      },
      pageChange2() {

      },
      showSearch() {
        this.formMain.pageNum = 1;
        this.formMain.pageSize = 10;
        this.getModelItemList();
      },
      onSearch() {
        this.formPage.pageNum = 1;
        this.formPage.pageSize = 10;
        this.getModelList();
      },
      getModelList() {
        this.$Spin.show();
        //let orgIds = null
        // if(this.departData.length == 0){
        //   orgIds = null
        // }else {
        //   orgIds = this.departData
        // }
        let form = {
          indexTime: new Date(this.formCYL.indexTime).getTime(),
          orgIds: this.formCYL.orgIds,
          pageNum: this.formPage.pageNum,
          pageSize: this.formPage.pageSize
        }
        cylListPage(form).then(res => {
          this.tableData = res.response.list || []
          this.dataCount = res.response.total
          

        })
        cylListTotal(form).then(res => {
          this.totalData.cumulativeTarget = res.response.cumulativeTarget;
          this.totalData.accumulativeAchievement = res.response.accumulativeAchievement;
          this.totalData.targetCompletionRate = res.response.targetCompletionRate;
          this.$Spin.hide();
        })
      },
      getModelItemList() {
        this.$Spin.show();
        let form = {
          indexTime: this.formCYLItem.indexTime,
          contractCode: this.formCYLItem.contractCode,
          orgId: this.formCYLItem.orgId,
          pageNum: this.formMain.pageNum,
          pageSize: this.formMain.pageSize
        }
        cylListItemPage(form).then(res => {
          if (res.response.list == null || res.response.list == '') {
            this.tableData2 = []
          } else {
            this.tableData2 = res.response.list
          }
          this.total2 = res.response.total
          this.$Spin.hide();
        })
      },
      // 报表导出
      exportData() {
        if (this.dataCount >= 10000) {
          this.$Message.warning({
            content: '数据超过1万条，请分批导出',
            duration: 2
          });
        } else if (this.dataCount <= 0) {
          this.$Message.warning({
            content: '无数据',
            duration: 2
          })
        } else {
          window.location.href = "/report/PfAccountDetailScorg/export?orgIds=" + this.formCYL.orgIds + "&indexTime=" + +this.formCYL.indexTime;
        }
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

  .page {
    margin: 10px 0;
    text-align: right;
    padding-right: 18px;
  }
</style>
