<style lang="less" scoped>

</style>
<template>
  <Row>
    <Col span="24">
      <Row class-name="current-position">
        当前位置：绩效管理&nbsp;&nbsp;>>&nbsp;&nbsp;任务设定&nbsp;&nbsp;>>&nbsp;&nbsp;部门任务&nbsp;&nbsp;>>&nbsp;&nbsp;月分摊&nbsp;&nbsp;>>&nbsp;&nbsp;查看
      </Row>
    </Col>
    <Col span="24" class="table-con">
      <Row>
        <span style="font-size:20px;"><b>部门：{{mainData.orgName}}</b></span>
      </Row>
      <Row type="flex" justify="space-between" style="margin: 15px 0; font-size:14px;">
        <Col span="6">
          <span>目标金额（万元）：{{mainData.targetAmount}}</span>
        </Col>
        <Col span="6">
          <span>目标类型：{{mainData.targetType}}</span>
        </Col>
        <Col span="6">
          <span>已分派金额（万元）：{{mainData.alreadyAmount}}</span>
        </Col>
        <Col span="6">
          <span>剩余分派金额（万元）：{{mainData.surplusAmount}}</span>
        </Col>
      </Row>
      <Table class="tableCommon"
        :data="tableData"
        :columns="columns"
        :stripe="true"
        :border="true"
        style="margin-top:20px;">
      </Table>
      <div class-name="table-con" style="text-align:center;margin-top:20px;">
        <Button type="primary" class="search-btn" @click="saveBtn">返回</Button>
      </div>
    </Col>
  </Row>
</template>

<script>
import { listOrgNewSalesMonth} from "../../components/axios/performanceManagement.js";
import { formData } from "../../../assets/js/common.js";
export default {
  name:'mouthTaskSetCheck',
  data(){
    return {
      saveModal:false,
      orgId:'',
      selectYear:'',
      mainData:{
        orgId:'',
        orgName:'',
        selectYear:'',
        targetAmount:'',
        targetType:'',
        alreadyAmount:'',
        surplusAmount:'',
      },
      tableData:[
        {
          configMonth1:'',
          targetAmount1:'',
          configMonth2:'',
          targetAmount2:'',
          configMonth3:'',
          targetAmount3:'',
          configMonth4:'',
          targetAmount4:'',
        }
      ],
      columns:[
        {
          title: "第一季度目标",
          align: "center", 
          children: [
            {
              key: "configMonth1",
              title: "月份",
              align: "center",
            },
            {
              key: "targetAmount1",
              title: "目标值",
              align: "center",
              render: (h, data) => {
                return h('div', [
                    h('span', {
                    // props: {
                    //     type: 'number',
                    //     value:data.row.targetAmount1,
                    //     size: 'small'
                    // },
                    }, data.row.targetAmount1)
                ])
              }
            },
          ]
        },
        {
          title: "第二季度目标",
          align: "center", 
          children: [
            {
              key: "configMonth2",
              title: "月份",
              align: "center",
            },
            {
              key: "targetAmount2",
              title: "目标值",
              align: "center",
              render: (h, data) => {
                return h('div', [
                    h('span', {
                    // props: {
                    //     type: 'number',
                    //     size: 'small',
                    //     value:data.row.targetAmount2,
                    // },
                    }, data.row.targetAmount2)
                ])
              }
            },
          ]
        },
        {
          title: "第三季度目标",
          align: "center", 
          children: [
            {
              key: "configMonth3",
              title: "月份",
              align: "center",
            },
            {
              key: "targetAmount3",
              title: "目标值",
              align: "center",
              render: (h, data) => {
                return h('div', [
                    h('span', {
                    // props: {
                    //     type: 'number',
                    //     size: 'small',
                    //     value:data.row.targetAmount3,
                    // },
                    }, data.row.targetAmount3)
                ])
              }
            },
          ]
        },
        {
          title: "第四季度目标",
          align: "center", 
          children: [
            {
              key: "configMonth4",
              title: "月份",
              align: "center",
            },
            {
              key: "targetAmount4",
              title: "目标值",
              align: "center",
              render: (h, data) => {
                return h('div', [
                    h('span', {
                    // props: {
                    //     type: 'number',
                    //     size: 'small',
                    //     value:data.row.targetAmount4,
                    // },
                    }, data.row.targetAmount4)
                ])
              }
            },
          ]
        },       
      ]
    }
  },
  created () {
    //营销业绩：部门任务-新入月分摊列表
    let that = this;
    that.orgId = this.$route.query.orgId;
    that.selectYear = this.$route.query.selectYear;
    this.getListOrgNewSalesMonth()
  },
  methods:{
  
    ////营销业绩：部门任务-新入月分摊列表
    getListOrgNewSalesMonth(){
      let form = {
        orgId: this.orgId,
        selectYear: this.selectYear
      }
      listOrgNewSalesMonth(form).then(res => {
        this.mainData.orgId = res.response.orgId;
        this.mainData.orgName = res.response.orgName;
        this.mainData.selectYear = res.response.selectYear;
        this.mainData.targetAmount = res.response.targetAmount;
        this.mainData.targetType = res.response.targetType;
        this.mainData.alreadyAmount = res.response.alreadyAmount;
        this.mainData.surplusAmount = res.response.surplusAmount;
        this.tableData = res.response.pfObjectOrgMonthSeeVOs;
        this.tableData.map(item => {
            let data1=new Date(item.configMonth1).getMonth()+1;
            let data2=new Date(item.configMonth2).getMonth()+1;
            let data3=new Date(item.configMonth3).getMonth()+1;
            let data4=new Date(item.configMonth4).getMonth()+1;
            item.configMonth1=data1+'月';
            item.configMonth2=data2+'月'; 
            item.configMonth3=data3+'月';
            item.configMonth4=data4+'月';    
        })



        this.$Spin.hide();
      })
    },

    saveBtn(){
      this.$router.push({name:'marketingTaskSet'})
    },
  }
}
</script>
