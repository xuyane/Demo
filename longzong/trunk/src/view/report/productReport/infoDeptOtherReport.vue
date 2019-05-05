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
                  <FormItem label="产业链:" :label-width="100">
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
				<Col span="4">	
          定制报告
				</Col>
				<Col span="7">


					报告数: <span class="font-c-blue">{{accountForm.dzbgs}}</span>
				</Col>
				<Col span="7">
					累计贡献度: <span class="font-c-blue">{{accountForm.dzljgxd === null ? 0+"%": ((accountForm.dzljgxd)*100).toFixed(2) + '%'}}</span>	
				</Col>
			</Row>
			<Row class="font-14 mrb-20 ">
				<Col span="4">	
          调研报告
				</Col>
				<Col span="7">
					报告数: <span class="font-c-blue">{{accountForm.dybgs}}</span>
				</Col>
				<Col span="7">
					累计贡献度: <span class="font-c-blue">{{accountForm.dyljgxd === null?0+"%" : ((accountForm.dyljgxd)*100).toFixed(2) + '%'}}</span>	
				</Col>
			</Row>
			<Col span="24 ">
				<Table class="tableCommon" border :columns="columns" :data="tableData"></Table>
			</Col>
        </Row>
    </Col>
    <!-- 调研报告贡献度弹窗开始 -->
	<Modal v-model="ljgxdValueModal" title=" "  width="1320">
		<Table class="tableCommon" border :columns="columns1" :data="tableData1"></Table>
		<div class="page-con">
			<oil-page :total="total1" :page-num="pageNum1" :page-size="pageSize1" @page-change="pageChange1" :page-size-opts="pageSizeOpts1" :show-sizer="showSizer1"></oil-page>
		</div>
		<div slot="footer">
			<i-button type="primary" @click="ljgxdValueModal=false">返回</i-button>
		</div>
	</Modal>
  <!-- 调研报告贡献度弹窗结束 -->
  </Row>
</template>
<script>
import axios from "axios";
import oilPage from "../../components/page/page.vue";
import { queryOrgMsgOthers, orgQtExcept, list_page_org_bg} from "../../components/axios/produceReport.js";
import { formData,formatTime } from "../../../assets/js/common.js";
export default {
  name: "infoPersonCollectionReport",
  components: {
    oilPage
  },
  data() { 
    return {
    total1: 0,
    ljgxdValueModal:false,
    pageSizeOpts1: [10, 20, 50, 100, 200],
		showSizer1: true,
		pageSize1: 10,
    pageNum1: 1,
    tableData1:[],
		pageSizeOpts: [10, 20, 50, 100, 200],
		showSizer: true,
		pageSize: 10,
    pageNum: 1,
		BranchDataTree:[],
    treeData: [],
    branchIds : [],
    branchTitle : [],
    BranchModel: false,
    rId:"",
    form: {
      userId: "",
      type: "",
      dateRange: [],
      endTime: '',
      startTime: '',
      modelName: ""
    },
		accountForm:{
			dzbgs: 0,
			dzljgxd: 0,
			dybgs: 0,
			dyljgxd: 0,
		},
    tableData: [],
    columns1:[
				{ 
          key:"reportCode",
          title: "报告编号",
          width:100,
					align: "center"
				},
				{
					key:"companyName",
					title: "企业名称",
					align: "center",
					width:300,
				},
				{
					key:"type",
					title: "报告类型",
					align: "center",
					width:150,
				},
				{
					key:"reportTime",
					title: "报告日期",
					width:150,
					align: "center",
					render:(h,data) =>{
						return h('span',{},formatTime(data.row.reportTime))
					}
				},
				{
					key:"employeeName",
					title: "负责业务",
					width:150,
					align: "center",
				},
				{
					key:"publisherName",
					title: "编辑人员",
					align: "center",
					width:150,
        },
        {
					key:"orgName",
					title: "编辑所在部门",
					align: "center",
					width:150,
        },
        {
					key:"dePecent",
					title: "贡献比例",
					align: "center",
          width:150,
          render: (h, data) => {
            return h("span",{},Number(data.row.dePecent) == 0 ? 0 + '%' : (data.row.dePecent * 100).toFixed(1) + '%');
          }
				},
			],
		columns: [
				{
				key:"orgName",
				title: "产业链",
        align: "center",
        width:100,
        fixed: "left"
			},
			{
				key:"leaderOrgName",
				title: "所属部门",
        align: "center",
        width:100,
        fixed: "left"
			},
			{	
				key:"leaderName",
				title: "产业链负责人",
        align: "center",
        width:100,
        fixed: "left",
			},
      {
				title: "定制报告",
        align: "center",
        children:[
          {		
            key:"dzbgs",
            title: "报告数",
            align: "center",
            render: (h, data) => {
              return h("span",{},data.row.dzbgs || 0);
            }
          },
           {
            key:"dzljgxd",
            title: "累计贡献度",
            align: "center",
            render: (h, data) => {
              return h("a",{
                on:{
                  click:() =>{
                    if(Number(data.row.dzljgxd) === 0){
                        this.$Message.warning('贡献度为0')
                    }else{
                      this.ljgxdValueModal = true;
                      this.rId = data.row.orgId;
                      this.rType = 0;
                      this.pageNum1 = 1;
                      this.pageSize1 = 10;
                      this.contributionList(this.rId,this.rType);
                     }
                  }
                }
              },data.row.dzljgxd === null?0+"%":((data.row.dzljgxd)*100).toFixed(2)+'%');
            }
          },
        ]
      },
      {
				title: "调研报告",
        align: "center",
        children:[
          {
            key:"dybgs",
            title: "报告数",
            align: "center",
            render: (h, data) => {
              return h("span",{},data.row.dybgs || 0);
            }
          },
           {
            key:"dyljgxd",
            title: "累计贡献度",
            align: "center",
            render: (h, data) => {
              return h("a",{
                on:{
                  click:() =>{
                    if(Number(data.row.dyljgxd) === 0){
                        this.$Message.warning('贡献度为0')
                    }else{
                      this.ljgxdValueModal = true;
                      this.rId = data.row.orgId;
                      this.rType = 1;
                      this.pageNum1 = 1;
                      this.pageSize1 = 10;
                      this.contributionList(this.rId,this.rType);
                     }
                  }
                }
              },data.row.dyljgxd === null ? 0 + "%" :((data.row.dyljgxd)*100).toFixed(2)+'%');
            }
          },
        ]
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
      startTime: that.form.startTime,
      endTime: that.form.endTime,
      //传id
      orgIdList:that.branchIds
    };
    this.$Spin.show();
		queryOrgMsgOthers(params).then(res => {
			that.tableData = res.response.reportXxqtVOList;
			that.accountForm = res.response.reportSumXxqtVOList[0];
			that.loading = false;
		}).catch(() => {that.loading = false;});
    },
    //率
    // countRate(val1, val2) {
    //   if (val1 == 0) {
    //     return "0%";
    //   } else if (val2 == 0) {
    //     return "100%";
    //   } else {
    //     return ((val1 / val2) * 100).toFixed(2) + "%";
    //   }
    // },
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
        this.$Spin.show();
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
        //贡献度列表获取
	    contributionList(data,typeId) {
        let that =this;
        let from ={
          checkTimeS: that.form.startTime,
          checkTimeE: that.form.endTime,
          pageNum:that.pageNum1,
          pageSize:that.pageSize1,
          orgId:data,
          type:typeId
        };
        list_page_org_bg(from).then(res =>{
          if(res.response.list){
            that.tableData1 = res.response.list;
            that.total1 = res.response.total
          }
        })
		},
		//贡献度分页
		pageChange1(page, pageSize) {
		if (page) {
			this.pageNum1 = page;
		}
		if (pageSize) {
			this.pageSize1 = pageSize;
		}
		this.contributionList(this.rId,this.rType);
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
      orgQtExcept(formData(params)).then(res=>{ 
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
