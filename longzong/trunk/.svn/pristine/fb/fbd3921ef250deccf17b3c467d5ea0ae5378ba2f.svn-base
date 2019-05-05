<style lang="less" scoped>
.tab {
  padding: 20px 50px 20px 50px ;
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
</style>

<template >
  <Row class='varietybox'>
    <Col span="24" class-name="search-form">
        <Form ref="form" :model="form" :label-width="120">
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
    <Col span="24">
        <Row class-name="table-con tab">
			<Col span="24 mrb-20 ">
				<Button type="primary" @click="exportReport">导出</Button>
			</Col>	
			<br>
			<Row class="font-14 mrb-20"> 
				<Col span="7">	
					累计通话时长（分钟）: <span class="font-c-blue">{{accountForm.callTimeLength || 0}}</span>
				</Col>
				<Col span="7">
					累计有效通话时长（分钟）: <span class="font-c-blue">{{accountForm.effectiveTimeLength || 0}}</span>
				</Col>
				<Col span="7">
					合格率: <span class="font-c-blue">{{accountForm.timeLengthPassRate}}</span>	
				</Col>
			</Row>
			<Row class="font-14 mrb-20 ">
				<Col span="7">
					累计通话次数: <span class="font-c-blue">{{accountForm.callTimes}}</span>
				</Col>	
				<Col span="7">
					累计有效通话次数: <span class="font-c-blue">{{accountForm.effectiveTimes}}</span>
				</Col>
        <Col span="7">
					合格率: <span class="font-c-blue">{{accountForm.timesPassRate}}</span>
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
import { orgCall,exportOrgCall} from "../../components/axios/produceReport.js";
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
    form: {
      userId: "",
      type: "",
      dateRange: [],
      endTime: '',
      startTime: '',
      modelName: ""
    },
		accountForm:{
			callTimeLength: 0,
      callTimes: 0,
      effectiveTimeLength: 0,
      effectiveTimes: 0,
      timeLengthPassRate:"" ,
      timesPassRate: ""
		},
		tableData: [],
		columns: [
			{
				key:"orgName",
				title: "部门",
				align: "center",
			},
			{
				key:"leaderName",
				title: "负责人",
				align: "center",
			},
			{	
				title: "电话量统计",
				align: "center",
				children:[
          {
            title: "通话时长(分钟)",
            align: "center",
            children:[
              {
                key:"callTimeLength",
                title: "累计时长",
                align: "center",
                render:(h,params) => {
                  return h("span",{},params.row.callTimeLength || 0)
                }
              },
              {
                key:"effectiveTimeLength",
                title: "有效时长",
                align: "center",
                render:(h,params) => {
                  return h("span",{},params.row.effectiveTimeLength || 0)
                }
              },
              {
                key:"timeLengthPassRate",
                title: "合格率",
                align: "center",
              },
            ],
          },
          {
            title: "通话次数",
            align: "center",
             children:[
              {
                key:"callTimes",
                title: "累计次数",
                align: "center",
              },
              {
                key:"effectiveTimes",
                title: "有效次数",
                align: "center",
              },
              {
                key:"timesPassRate",
                title: "合格率",
                align: "center",
              },
            ],
          },
        ],
			}
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
      //传code
      orgCodes:that.branchcodes
    };
     this.$Spin.show();
		orgCall(params).then(res => {
			that.tableData = res.response.callOrgVOs;
			that.accountForm = res.response.callSumVO;
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
    exportReport(){
      let that = this;
      let params ={
        //传日期
        indexTimeStart: that.form.startTime,
        indexTimeEnd: that.form.endTime,
        //传id
        orgIds:that.branchIds,
        //传code
        orgCodes:that.branchcodes
      }
      this.$Spin.show();
      exportOrgCall(params).then(res=>{ 
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
