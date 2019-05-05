<style lang="less" scoped>
.mrb-10 {
    margin-bottom: 10px;
}
.font-14 {
    font-size: 14px;
}
.font-c-blue {
    color: #145edb;
}
.tab {
    padding: 20px 50px 40px;
}
.font-w {
    font-weight: 600;
}
</style>

<template>
    <Row class="my-saleList-out">
        <Col span="24" class="search-form">
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
                <Col span="24 mrb-10">
                    <Button type="primary" @click="exportReport">导出</Button>
                </Col>
                <Col span="24">
                    <Row class="font-14">
                        <Col span="3  mrb-10" v-for="item in accountForm" :key="item.index">{{item.categoryName}}: <span class="font-c-blue">{{item.categoryAmount}}</span> </Col>
                    </Row>
                </Col>
                <Col span="24" v-if="totalColumns.length>0">
                    <Table class="TableCommon" :data="totalTableData" :columns="totalColumns" ref="dragTable" :loading="loading1"></Table>
                </Col>
            </Row>
        </Col>
    </Row>
</template>

<script>
import axios from 'axios'
import { formatThousandPrice, formData } from "../../../assets/js/common.js";
import { listOrgCategory, sumCategory,proCategoryList,exportOrgCategory} from "../../components/axios/produceReport.js";
import { pfCommonTreeDeptTree,reportICAProductCategoryList} from "@/view/components/axios/report.js"
export default {
    name: "editExtractReport",
    components: {
        
    },
    data() {
        return {
            accountForm:[],
           params: {
                orgIds: [],
                indexTimeEnd: '',
                indexTimeStart: ''
            },
            // deptName: '',
            // dateRange:[],
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
            // showDept: false,
            // deptIdList: [],
            loading1: false,
            totalTableData: [],
            totalColumns: [],
            totalIncome:0
        }
    },
    created() {
        this.initDateRange();
    },
    methods: {
              //查询功能
            search() {
            this.totalTableData = [];
            this.totalColumns = [];
             this.getTitleList();
            },
            //重置
            reset() {
                this.form.dateRange = [];
                this.form.startTime = "";
                this.form.endTime = "";
                this.form.modelName = "";
                this.params = {
                    orgIds: [],
                    indexTimeEnd: '',
                    indexTimeStart: ''
                };
                this.initDateRange();
                this.branchIds = [];
            },
   
        //列表
        getTitleList() {
            var that = this;
           
            proCategoryList().then(res => {
                let arr1 =[];
                arr1.push({
                    key:"orgName",
                    title:"部门",
                    width:100
                },{
                    key:"leaderName",
                    title:"负责人",
                    width:100
                });
                let categoryArr = {};
                categoryArr.title = "产品分类"
                categoryArr.children = [];
                categoryArr.children.push({
                    key:"totalAmount",
                    title:"总收益",
                    width:100
                })
                if (res.status == 200) {
                    
                    let arr = res.response;
                    for(let i=0; i<arr.length; i++){
                      let obj={};
                      obj.key = arr[i].productCategoryCode;
                      obj.title = arr[i].productCategoryName;
                      obj.width = 100;
                      let arrchild =arr[i].children;
                      if(arrchild.length>0){
                         obj.children = [];
                        for(let j=0; j<arrchild.length; j++){
                            let obj1 = {};
                            obj1.key = arrchild[j].productCategoryCode
                            obj1.title = arrchild[j].productCategoryName;
                            obj1.width = 100;
                            obj.children.push(obj1);
                        }
                      }
                      categoryArr.children.push(obj);
                    }
                    arr1.push(categoryArr);
                    console.log("arr1",arr1);
                    this.totalColumns = arr1;
                    
                    this.getSumList();
                } else {
                    this.$Message.warning(res.message);
                }
            }).catch(
			err=>{
			console.log(err);
			});
        },
         getSumList() {
              let params = {
                //传日期
                indexTimeStart: this.form.startTime,
                indexTimeEnd: this.form.endTime,
                //传id
                orgIds:this.branchIds,
                //传code
                orgCodes:this.branchcodes,
                };
            this.$Spin.show();
            listOrgCategory(params).then(res => {
                if (res.status == 200) {
                  let arr = res.response ? res.response : [];
                  const data = [];
                  for(let i=0; i<arr.length; i++){
                    let obj = {};
                    obj.orgName = arr[i].orgName;
                    obj.leaderName = arr[i].leaderName;
                    obj.totalAmount =  arr[i].totalAmount;
                    Object.assign(obj,arr[i].categoryAmounts);
                   // obj.width=100;
                    data.push(obj);
                  }
                  this.totalTableData = data;
                } else {
                    this.$Message.warning(res.message);
                }
            });
            sumCategory(params).then(res=>{
                let that = this;
                if(res.status == 200){
                    that.accountForm = res.response;
                }else {
                    this.$Message.warning(res.message);
                }
            })
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
      let params = {
            //传日期
            indexTimeStart: this.form.startTime,
            indexTimeEnd: this.form.endTime,
            //传id
            orgIds:this.branchIds,
            //传code
            orgCodes:this.branchcodes
        };
      this.$Spin.show();
      exportOrgCategory(params).then(res=>{ 
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
        this.getTitleList();
    }

}
</script>


