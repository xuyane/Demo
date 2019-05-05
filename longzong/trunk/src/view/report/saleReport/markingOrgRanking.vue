<style lang="less" scoped>
.titleRank{
    font-size: 16px;
    font-weight: 300;
    margin-bottom: 15px;
}
.contentRank{
  // width:533px;
  display:inline-block;
}
.rankAll{
  overflow:auto; 
  // width: max-content;
  margin-right: 0px!important;
  background: #fff;
}
</style>

<template >
  <Row class='varietybox' style='padding: 10px 0 0 50px;background:#fff !important'>
    <Col span="24" class-name="search-form">
        <Form  :label-width="120">
            <Row type="flex" justify="space-between">
                <Col span='7'>
                <FormItem label="日期:" :label-width="100">
                  <DatePicker v-model="form.dateRange" @on-change="dateChange" type="daterange" :clearable = "false" split-panels class="search-input" placement="bottom-end" placeholder="选择统计时间范围" ></DatePicker>
                </FormItem>
                </Col>
                <Col span='7'>
                <FormItem label="部门:" :label-width="100">
                  <Input type="text" v-model="form.modelName" class="search-input" readonly @on-focus="getBranchDataValue" placeholder="请选择部门"></Input>
                </FormItem>
                </Col>
                <Col span="7" class="text-right">
                    <Button type="primary" @click="search">查询</Button>
                    <Button style="margin-left: 8px" @click="reset">重置</Button>
                </Col>
            </Row>
             <!-- 产业链树 -->
            <Modal v-model="BranchModel" @on-cancel="cancel" @on-ok="onOk">
              <div style="max-height: 300px;overflow: auto;">
                <Tree
                  :data="BranchDataTree" ref="branchRef" :load-data="loadBranchData" show-checkbox  @on-check-change="onCheckChange"
                ></Tree>
              </div>
            </Modal>
        </Form>
    </Col>
    <Col span="24" style="min-width:100px">
      <Row class="rankAll" :gutter="16" >
        <Col span="8" class="contentRank aNone">
                <div class="titleRank">任务完成率排行（新入）</div>
                <Row>
                    <Table  height="655" border :columns="columns1" :data="tableData1" ></Table>        
                    <div class="page-con">
                        <oil-page :total="total1" :page-num="pageNum1" :page-size="pageSize1" @page-change="pageChange1" :show-elevator="showElevator"></oil-page>
                    </div>
                </Row>
        
        </Col>
        <Col span="8" class="contentRank aNone">
      
                <div class="titleRank">任务完成率排行（续入）</div>
                <Row>
                    <Table class="tableCommon" height="655"   border :columns="columns2" :data="tableData2"></Table>        
                    <div class="page-con">
                        <oil-page :total="total2" :page-num="pageNum2" :page-size="pageSize2" @page-change="pageChange2" :show-elevator="showElevator"></oil-page>
                    </div>
                </Row>
 
        </Col>
        <Col span="8" class="contentRank aNone">
     
                <div class="titleRank">客户管理排行</div>
                <Row>
                    <Table class="tableCommon" height="655" border :columns="columns3" :data="tableData3"></Table>        
                    <div class="page-con">
                        <oil-page :total="total3" :page-num="pageNum3" :page-size="pageSize3" @page-change="pageChange3" :show-elevator="showElevator"></oil-page>
                    </div>
                </Row>
      
        </Col>
      </Row>
    </Col>
  </Row>
</template>
<script>
import axios from "axios";
import oilPage from "../productReport/page/page.vue";
import {
  listOrgCustomerRank,listOrgNewRank,listOrgOldRank
} from "../../components/axios/produceReport.js";
import { formData } from "../../../assets/js/common.js";
export default {
  name: "industrialChainRanking",
  components: {
    oilPage
  },
  data() { 
    return {
      showSizer: true,
      showElevator: false,
      pageSize1: 10,
      pageNum1: 1,
      total1: 0,
      pageSize2: 10,
      pageNum2: 1,
      total2: 0,
      pageSize3: 10,
      pageNum3: 1,
      total3: 0,
      BranchDataTree:[],
      treeData: [],
      branchIds : [],
      branchcodes:[],
      branchTitle : [],
      BranchModel: false,
      form: {
        userId: "",
        type: "",
        dateRange: [],
        endTime: '',
        startTime: '',
        modelName: "",
      },
      queryTime:[],
      
      columns1: [
        {
          title: "排名",
          align: "center",
          width: 50,
          render: (h,data) => {
            let showIndex = data.index+((this.pageNum1-1)*this.pageSize1)+1;
            return h('span',showIndex);
          }
        },
        {
          title: "上级部门",
          key: "parentOrgName",
          width: 125
        },
        {
          title: "部门",
          key: "orgName",
          align: "center",
          width: 100
        },
        {
            key: "orgAmount",
            title: "已完成任务",
            width: 125,
            align: "center"
          }, {
            key: "orgRate",
            title: "完成率",
            width: 115,
            align: "center",
            render:(h,data)=>{
                return h("span",{},Number(data.row.orgRate) + '%')
            }
          }
      ],
      columns2: [
        {
          title: "排名",
          align: "center",
          minWidth: 50,
          render: (h,data) => {
            let showIndex = data.index+((this.pageNum2-1)*this.pageSize2)+1;
            return h('span',showIndex);
          }
        },
        {
          title: "上级部门",
          key: "parentOrgName",
          minWidth: 100
        },
        {
          title: "部门",
          key: "orgName",
          align: "center",
          minWidth: 100
        },
        {
            key: "orgAmount",
            title: "已完成任务",
            minWidth: 100,
            align: "center"
          }, {
            key: "orgRate",
            title: "完成率",
            minWidth: 100,
            align: "center",
            render:(h,data)=>{
                return h("span",{},Number(data.row.orgRate) + '%')
            }
          }
      ],
      columns3: [
        {
          title: "排名",
          align: "center",
          minWidth: 50,
          render: (h,data) => {
            let showIndex = data.index+((this.pageNum3-1)*this.pageSize3)+1;
            return h('span',showIndex);
          }
        },
        {
          title: "上级部门",
          key: "parentOrgName",
          minWidth: 80
        },
        {
          title: "部门",
          key: "orgName",
          align: "center",
          minWidth: 100
        },
        {
            key: "alreadyCount",
            title: "成单客户数",
            minWidth: 100,
            align: "center"
          }, {
            key: "newCount",
            title: "新开发客户数",
            minWidth: 80,
            align: "center"
          }, {
            key: "trialCount",
            title: "试用用户数",
            minWidth: 80,
            align: "center",
          }
      ],
      tableData1: [],
      tableData2: [],
      tableData3: []
    }
  },
  created() {
    this.initDateRange();
    this.search();
  },
  methods: {
    //获取时间
    changeTime(data) {
      let data1 = new Date(data[0]);
      let data2 = new Date(data[1]);
      this.startTime = data1.getTime();
      this.endTime = data2.getTime();
    },
    //查询功能
    search() {
      this.pageNum1 = 1;
      this.pageSize1 = 10;
      this.pageNum2 = 1;
      this.pageSize2 = 10;
      this.pageNum3 = 1;
      this.pageSize3 = 10;
      this.queryData1();
      this.queryData2();
      this.queryData3();
    },
    //重置
    reset() {
        this.form.dateRange = [];
        this.form.startTime = "";
        this.form.endTime = "";
        this.form.modelName = "";
        this.initDateRange();
        this.branchIds = [];
        this.search();
    },
    //数据列表
    queryData1() {
    var that = this;
     var params = {
        pageNum: that.pageNum1,
        pageSize: that.pageSize1,
    //传日期
      indexTimeStart: that.form.startTime,
      indexTimeEnd: that.form.endTime,
      //传id
      orgIds:that.branchIds,
      //传code
      orgCodes:that.branchcodes,
      };
      this.$Spin.show();
      listOrgNewRank(params)
        .then(res => {
          that.tableData1 = res.response.list;
          that.total1 = res.response.total;
        })
    },
    queryData2() {
    var that = this;
     var params = {
        pageNum: that.pageNum2,
        pageSize: that.pageSize2,
    //传日期
      indexTimeStart: that.form.startTime,
      indexTimeEnd: that.form.endTime,
      //传id
      orgIds:that.branchIds,
      //传code
      orgCodes:that.branchcodes,
      };
      this.$Spin.show();
      listOrgOldRank(params)
        .then(res => {
          that.tableData2 = res.response.list;
          that.total2 = res.response.total;
        })
    },
    queryData3() {
    var that = this;
     var params = {
        pageNum: that.pageNum3,
        pageSize: that.pageSize3,
    //传日期
      indexTimeStart: that.form.startTime,
      indexTimeEnd: that.form.endTime,
      //传id
      orgIds:that.branchIds,
      //传code
      orgCodes:that.branchcodes,
      };
      this.$Spin.show();
      listOrgCustomerRank(params)
        .then(res => {
          that.tableData3 = res.response.list;
          that.total3 = res.response.total;
        })
    },
    //分页1
    pageChange1(page, pageSize) {
      if (page) {
        this.pageNum1 = page;
      }
      if (pageSize) {
        this.pageSize1 = pageSize;
      }
      this.queryData1();
    },
    //分页2
    pageChange2(page, pageSize) {
      if (page) {
        this.pageNum2 = page;
      }
      if (pageSize) {
        this.pageSize2 = pageSize;
      }
      this.queryData2();
    },
    //分页3
    pageChange3(page, pageSize) {
      if (page) {
        this.pageNum3 = page;
      }
      if (pageSize) {
        this.pageSize3 = pageSize;
      }
      this.queryData3();
    },
   //部门树复选框选中
     onCheckChange(param) {
      this.treeData = param;
    },
    //部门树点击确定
    onOk() {
      this.form.modelName = '';
      this.branchTitle = [];
      this.branchIds = [];
      this.branchcodes=[];
      let branchList = this.$refs.branchRef.getCheckedNodes();
      console.log(branchList)
          for (let i = 0; i < branchList.length; i++) {
            
           this.branchTitle.push(branchList[i].title)
            
            this.branchIds.push(branchList[i].id)
            this.branchcodes.push(branchList[i].code)

            }
          
        this.form.modelName = this.branchTitle.join();
    },
    //点击取消
    cancel(){
       this.form.modelName = "";
       this.BranchModel = false;
    },
    loadBranchData(){

    },
    //产业链（部门树）获取焦点
    getBranchDataValue(){
       this.BranchModel = true;
       this.getBranchData()
    },
     // 获取部门信息
      getBranchData() {
        let that = this;
        this.$Spin.show();
        let form = {
          type: 2
        }
        axios({
          url:'/report/PfCommonTree/orgTree?type=1',
          type:'get',
        }).then(function (res) {
          let dataValue = JSON.parse(res.data.response);
          that.BranchDataTree = that.branch(dataValue);
        })
        
      },
      //判断分支
        branch(data){
         let dataDb = data.map(item => {
         if (item.children && item.children.length > 0) {
          return {
            title: item.label,
            disableCheckbox: false,
            id: item.id,
            code:item.value,
            children: this.branch(item.children)
          };
        } else {
          return {
            title: item.label,
            id: item.id,
            code:item.value,
            disableCheckbox: false
          };
        }
      });
      return dataDb;
    },
    //初始化时间
    initDateRange() {
            let currentDate = new Date();
            let lastMonth = currentDate.getMonth()-1;
            let currentMonthFirstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
            let lastMonthFirstDay = new Date(currentDate.getFullYear(), lastMonth, 1);
            let lastMonthlastDay = new Date(currentMonthFirstDay-1);
          //  let currentMonthLastDay = new Date(nextMonthFirstDay - 1);
            this.form.dateRange = [lastMonthFirstDay, lastMonthlastDay];
            this.form.startTime = new Date(this.form.dateRange[0]).getTime();
            this.form.endTime = new Date(this.form.dateRange[1]).getTime();
        }, 
     // 监听选择日期
        dateChange (date) {
            this.form.startTime = new Date(date[0]).getTime() - 8 * 1000 * 60 * 60
            this.form.endTime = new Date(date[1]).getTime() + 16 * 1000 * 60 * 60 - 1000
        },
        
    //导出
    // exportReport(){

    // }
  },
  
  mounted(){
     // this.initDateRange();

    }
};

</script>
