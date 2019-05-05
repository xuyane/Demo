<style lang="less" scoped>
.tab {
  padding: 20px 50px 0 50px ;
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
                <Col span='6'>
										<FormItem label="日期:" :label-width="120">
											<DatePicker v-model="form.dateRange" @on-change="dateChange" type="daterange" :clearable = "false" split-panels class="search-input" placement="bottom-end" placeholder="选择统计时间范围" ></DatePicker>
							    	</FormItem>
                </Col>
                <Col span='6'>
									<FormItem label="产业链:" :label-width="120">
										<Input type="text" v-model="form.modelName" class="search-input" readonly @on-focus="getBranchDataValue" placeholder="请选择部门"></Input>
									</FormItem>
                </Col>
								<Col span='6'>
                  <FormItem label="姓名:" :label-width="120">
                     <associatereport-Search @query-list="adminFunction" :dataUrl="urlAdmin" :orgIdList="branchIds" ref="adminRef" class="form-select"></associatereport-Search>
                  </FormItem>
                </Col>
                <Col span="6" class="text-right">
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
					通话目标总时长（分钟）: <span class="font-c-blue">{{accountForm.mbzsc}}</span>
				</Col>
				<Col span="7">
					通话总时长（分钟）: <span class="font-c-blue">{{accountForm.sjzsc}}</span>
				</Col>
				<Col span="7">
					通话有效时长（分钟）: <span class="font-c-blue">{{accountForm.yxzsc}}</span>	
				</Col>
			</Row>
			<Row class="font-14 mrb-20 ">
				<Col span="7">
					通话总次数: <span class="font-c-blue">{{accountForm.zcs}}</span>
				</Col>	
				<Col span="7">
					通话有效次数: <span class="font-c-blue">{{accountForm.yxzcs}}</span>
				</Col>
			</Row>
			<Col span="24 ">
				<Table class="tableCommon" border :columns="columns" :data="tableData"></Table>
			</Col>
            
            <div class="page-con">
                <oil-page :total="total" :page-num="pageNum" :page-size="pageSize" @page-change="pageChange" :page-size-opts="pageSizeOpts" :show-sizer="showSizer"></oil-page>
            </div>
        </Row>
    </Col>
  </Row>
</template>
<script>
import axios from "axios";
import oilPage from "../../components/page/page.vue";
import { querySinglMsgCollect,singleCjExcept} from "../../components/axios/produceReport.js";
import { formData,formatTime } from "../../../assets/js/common.js";
import associatereportSearch from "../../components/associateSearch/associateReportSearch.vue";
export default {
  name: "infoPersonCollectionReport",
  components: {
    oilPage,
    associatereportSearch
  },
  data() { 
    return {
		pageSizeOpts: [10, 20, 50, 100, 200],
		showSizer: true,
		pageSize: 10,
		pageNum: 1,
		total: 0,
		urlAdmin:"/report/zxbjxxfb/queryEmpByOrgId",
		BranchDataTree:[],
		treeData: [],
		branchIds : [],
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
			mbzsc: 0,
			sjzsc: 0,
			yxzcs: 0,
			yxzsc: 0,
			zcs: 0
		},
		tableData: [],
		columns: [
			{
				key:"empName",
				title: "姓名",
				align: "center",
			},
			{
				key:"orgName",
				title: "所属产业链",
				align: "center",
			},
			{	
				key:"jobTime",
				title: "入职时间",
				align: "center",
				render(h,data){
					return h("span",{},formatTime(data.row.jobTime))
				}
			},
		{	
				key:"zcs",
				title: "通话总次数",
				align: "center",
				render: (h, data) => {
					return h("span",{},	data.row.zcs || 0	)
				}
			},
			{
				key:"yxzcs",
				title: "有效通话总次数",
				align: "center",
				render: (h, data) => {
					return h("span",{},	data.row.yxzcs || 0	)
				}
			},
			{	
				key:"mbzsc",
				title: "目标总时长（秒）",
				align: "center",
				render: (h, data) => {
					return h("span",{},	data.row.mbzsc || 0	)
				}
			},
			{
				key:"sjzsc",
				title: "实际总时长（秒）",
				align: "center",
				render: (h, data) => {
					return h("span",{},	data.row.sjzsc || 0	)
				}
			},
			{
				key:"yxzsc",
				title: "有效总时长（秒）",
				align: "center",
				render: (h, data) => {
					return h("span",{},	data.row.yxzsc || 0	)
				}
			},
			{	
				key:"wcl",
				title: "完成率",
				align: "center",
				render: (h, data) => {
					return h("span",{},Number(data.row.wcl) == 0 ? 0 + '%' : (data.row.wcl * 100).toFixed(2) + '%');
				}
			},
			{
				key: "hgl",
				title: "合格率",
				align: "center",
				render: (h, data) => {
					return h("span",{},Number(data.row.hgl) == 0 ? 0 + '%' : (data.row.hgl * 100).toFixed(2) + '%');
				}
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
				this.$refs.adminRef.$refs.select.clearSingleSelect();
        this.form.userId = "";
				this.form.userName = "";
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
			startTime: that.form.startTime,
			endTime: that.form.endTime,
			//传id
			orgIdList:that.branchIds,
			userId:that.form.userId
		};
		this.$Spin.show();
		querySinglMsgCollect(params).then(res => {
			if(res.response.reportXxcjVOList.list&&res.response.reportXxcjVOList.list.length>0){
				that.tableData = res.response.reportXxcjVOList.list;
				that.total = res.response.reportXxcjVOList.total;
			}else{
				that.tableData = [];
				that.total = 0;
			}
			if(res.response.reportSumXxcjVOList&&res.response.reportSumXxcjVOList.length>0){
				that.accountForm = res.response.reportSumXxcjVOList[0];
			}else{
				that.accountForm.mbzsc = 0;
				that.accountForm.sjzsc = 0;
				that.accountForm.yxzcs = 0;
				that.accountForm.yxzsc = 0;
				that.accountForm.zcs = 0;
			}
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
			this.$refs.adminRef.$refs.select.clearSingleSelect();
      this.form.userId = "";
      this.form.userName = "";
      let branchList = this.$refs.branchRef.getCheckedNodes();
          for (let i = 0; i < branchList.length; i++) {
            
           this.branchTitle.push(branchList[i].title)
            
            this.branchIds.push(branchList[i].id)
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
        let form = {
          type: 2
        }
        axios({
          url:'/report/PfCommonTree/orgTree?type=2',
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
            children: this.branch(item.children)
          };
        } else {
          return {
            title: item.label,
            id: item.id,
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
			//获取从姓名传过来的值
			adminFunction(data) {
				if(data){
					this.form.userId = data.value;
					this.form.userName = data.label;
				}
			},
    //导出
    exportReport(){
      let that = this;
      let params ={
        startTime: this.form.startTime,
        endTime: this.form.endTime,
        orgIdList:this.branchIds,
        userId:this.form.userId
      }
      this.$Spin.show();
      singleCjExcept(formData(params)).then(res=>{ 
        if(res.status==200){
          window.location.href = res.response; 
        }else{
          that.$Message.warning(res.message);
        }
      })
    }
  },
  
  mounted(){
     // this.initDateRange();

    }
};

</script>
