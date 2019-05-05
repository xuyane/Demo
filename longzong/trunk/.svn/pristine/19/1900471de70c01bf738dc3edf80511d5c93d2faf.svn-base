<style lang="less" scoped>
.tab {
  padding: 20px 50px 40px;
}
.text-right {
  text-align: right;
}
.my-account-conter {
  background: #fff;
}
.font-14 {
  font-size: 14px;
}
.font-c-blue {
  color: #145edb;
}
.mrb-20 {
  margin-bottom: 20px;
}
.mrl-56 {
  margin-left: 56px;
}
.font-w{
  font-weight: 600;
}
</style>

<template>
  <Row class='varietybox'>
    <Col span="24" class-name="search-form">
        <Form ref="form" :model="form" :label-width="120">
            <Row type="flex" justify="space-between">
              <Col span="7">
                  <Row type="flex" justify="end">
                    <Col span='6'>
                      <Select v-model="form.timeType">
                        <Option v-for="item in timeList" :value="item.value" :key="item.value">{{ item.desc }}</Option>
                      </Select>
                    </Col>
                    <Col span='16'>
                        <DatePicker v-model="form.dateRange" @on-change="dateChange" type="daterange" :clearable = "false" split-panels class="search-input" placement="bottom-end" placeholder="选择统计时间范围" ></DatePicker>
                    </Col>
                  </Row>
                </Col>
  
                <Col span="7">
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
    <Col span="24">
        <Row class-name="table-con tab">
			<Col span="24 mrb-20 ">
				<Button type="primary" @click="exportReport">导出</Button>
			</Col>
			<br>
			<Row class="font-14 mrb-20"> 
				<Col span="2 font-w">	
          新入
				</Col>
				<Col span="6">
					累计任务目标: <span class="font-c-blue">{{accountForm.newGoal}}</span>
				</Col>
				<Col span="6">
					已完成任务: <span class="font-c-blue">{{accountForm.newAmount}}</span>	
				</Col>
        <Col span="6">
					任务完成率: <span class="font-c-blue">{{accountForm.newRate === null?'':accountForm.newRate+'%'}}</span>	
				</Col>
			</Row>
			<Row class="font-14 mrb-20"> 
				<Col span="2 font-w">	
          续入
				</Col>
				<Col span="6">
					累计任务目标: <span class="font-c-blue">{{accountForm.oldGoal}}</span>
				</Col>
				<Col span="6">
					已完成任务: <span class="font-c-blue">{{accountForm.oldAmount}}</span>	
				</Col>
        <Col span="6">
					任务完成率: <span class="font-c-blue">{{accountForm.oldRate === null?'':accountForm.oldRate+'%'}}</span>	
				</Col>
			</Row>
      	<Row class="font-14 mrb-20 "> 
				<Col span="2 font-w">	
          会议
				</Col>
				<Col span="6">
					累计任务目标: <span class="font-c-blue">/</span>
				</Col>
				<Col span="6">
					已完成任务: <span class="font-c-blue">{{accountForm.confAmount}}</span>	
				</Col>
        <Col span="6">
					任务完成率: <span class="font-c-blue">/</span>	
				</Col>
			</Row>
			<Col span="24 ">
				<Table class="tableCommon" border :columns="columns" :data="tableData"></Table>
			</Col>
        </Row>
    </Col>
  </Row>
</template>
<script>
import axios from "axios";
import oilPage from "../../components/page/page.vue";
import { listOrgPerformance , sumOrgPerformance,exportOrgPerformance} from "../../components/axios/produceReport.js";
import { formData,formatTime } from "../../../assets/js/common.js";
export default {
  name: "infoPersonCollectionReport",
  components: {
    oilPage
  },
  data() { 
    return {
		pageSizeOpts: [10, 20, 50, 100, 200],
		showSizer: true,
		pageSize: 10,
		pageNum: 1,
    BranchDataTree:[],
    treeData: [],
    branchIds : [],
    branchcodes:[],
    branchTitle : [],
    BranchModel: false,
    timeList:[
        {
          value:1,
          desc:"到账时间"
          
        },
        {
          value:0,
          desc:"认账时间"
        }
      ],
    form: {
      userId: "",
      type: "",
      dateRange: [],
      endTime: '',
      startTime: '',
      modelName: "", 
      timeType:1
    },
		accountForm:{
      confAmount: 0,
      newAmount: 0,
      newGoal: 0,
      newRate: 0,
      oldAmount: 0,
      oldGoal: 0,
      oldRate: 0
		},
		tableData: [],
		columns: [
				{
				key:"orgName",
				title: "部门",
        align: "center",
        minWidth:100,
        fixed: "left"
			},
			{
				key:"leaderName",
				title: "负责人",
        align: "center",
        minWidth:100,
        fixed: "left",
        render:(h,data) =>{
          return h("span",{},data.row.leaderName || '/')
        }
			},
      {
				title: "业绩统计",
        align: "center",
        children:[
          {		
            key:"totalAmount",
            title: "总业绩",
            align: "center",
            minWidth:120
          },
           {
            title: "任务(新入)",
            align: "center",
            children:[
              {
                key:"newGoal",
                title: "任务目标(新入)",
                align: "center",
                minWidth:120,
                render: (h, data) => {
                  return h("span",{},data.row.newGoal || 0);
                }
              },
              {
                key:"newAmount",
                title: "已完成任务(新入)",
                align: "center",
                minWidth:120
              },
              {
                key:"newRate",
                title: "目标完成率(新入)",
                align: "center",
                minWidth:120,
                 render: (h, data) => {
                  return h("span",{},data.row.newRate === null?'':data.row.newRate+'%');
                }
              },
            ]
          },
            {
            title: "任务(续入)",
            align: "center",
            children:[
              {
                key:"oldGoal",
                title: "任务目标(续入)",
                align: "center",
                minWidth:120,
                render: (h, data) => {
                  return h("span",{},data.row.oldGoal || 0);
                }
              },
              {
                key:"oldAmount",
                title: "已完成任务总值(续入)",
                align: "center",
                minWidth:150
              },
              {
                key:"oldRate",
                title: "目标完成率(续入)",
                align: "center",
                minWidth:120,
                render: (h, data) => {
                  return h("span",{},data.row.oldRate ===null? "":data.row.oldRate+'%');
                }
              },
            ]
          },
            {
            title: "任务(会议)",
            align: "center",
            children:[
              {
                title: "任务目标(会议)",
                align: "center",
                minWidth:120,
                render: (h, data) => {
                  return h("span",{},"/");
                }
              },
              {
                key:"confAmount",
                title: "已完成任务总值(会议)",
                align: "center",
                minWidth:150,
              },
              {
                title: "目标完成率(会议)",
                align: "center",
                minWidth:120,
                render: (h, data) => {
                  return h("span",{},"/");
                }
              },
            ]
          },
        ]
      },
		],
    
    }
  },
  created() {
    this.initDateRange();
    this.queryData();
  },
  methods: {
    //查询功能
    search() {
      this.pageNum = 1;
      this.pageSize = 10;
      this.queryData();
    },
    //重置
    reset() {
        this.pageNum = 1;
        this.pageSize = 10;
        this.form.dateRange = [];
        this.form.startTime = "";
        this.form.endTime = "";
        this.form.modelName = "";
        this.form.timeType =1;
        this.initDateRange();
        this.branchIds = [];
    },
    //数据列表
    queryData() {
		var that = this;
		var params = {
			pageNum: that.pageNum,
      pageSize: that.pageSize,
      //传日期
      indexTimeStart: that.form.startTime,
      indexTimeEnd: that.form.endTime,
      //传id
      orgIds:that.branchIds,
      //传时间类型
      timeType:that.form.timeType,
      //传code
      orgCodes:that.branchcodes,
    };
    this.$Spin.show();
		listOrgPerformance(params).then(res => {
			that.tableData = res.response;
			that.loading = false;
    }).catch(() => {that.loading = false;});
    sumOrgPerformance(params).then(res => {
			that.accountForm = res.response;
			that.loading = false;
		}).catch(() => {that.loading = false;});
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
          url:'/report/PfCommonTree/deptTree?type=2',
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
            disableCheckbox: false,
            code:item.value,
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
    exportReport(){
      let that = this;
      let params ={
        //传日期
        indexTimeStart: that.form.startTime,
        indexTimeEnd: that.form.endTime,
        //传id
        orgIds:that.branchIds,
        //传时间类型
        timeType:that.form.timeType,
        //传code
        orgCodes:that.branchcodes,
      }
      this.$Spin.show();
      exportOrgPerformance(params).then(res=>{ 
        if(res.status==200){
          window.location.href = res.response; 
        }else{
          that.$Message.warning(res.message);
        }
      })
    }
  },
  
  mounted(){
      //this.initDateRange();

    }
};

</script>
