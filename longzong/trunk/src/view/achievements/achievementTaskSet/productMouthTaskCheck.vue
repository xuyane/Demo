<style lang="less" scoped>

</style>
<template>
  <Row>
    <Col span="24">
      <Row class-name="current-position">
        当前位置：绩效管理&nbsp;&nbsp;>>&nbsp;&nbsp;任务设定&nbsp;&nbsp;>>&nbsp;&nbsp;产品任务&nbsp;&nbsp;>>&nbsp;&nbsp;月分摊
      </Row>
    </Col>
    <Col span="24" class="table-con">
      <Row>
        <span style="font-size:20px;"><b>部门：{{mainData.orgName}}</b></span>
      </Row>
      <Row type="flex" justify="space-between" style="margin: 15px 0; font-size:16px;">
        <span>目标金额（万元）：{{mainData.targetAmount}}</span>
        <span>已分派金额（万元）：{{mainData.alreadyAmount}}</span>
        <span>剩余分派金额（万元）：{{mainData.surplusAmount}}</span>
      </Row>
      <Row style="font-size:16px;">
        <span>目标类型：{{mainData.targetType}}</span>
      </Row>
      <Table class="tableCommon"
        :data="tableData"
        :columns="columns"
        :stripe="true"
        :border="true"
        style="margin-top:20px;">
      </Table>
      <div class-name="table-con" style="text-align:center;margin-top:20px;">
        <!-- <Button type="primary" class="search-btn" @click="saveData">保存</Button> -->
        <Button type="default" class="search-btn" @click="returnPro">返回</Button>
      </div>
     
    </Col>
  </Row>
</template>

<script>
import { listOrgProductMonth,saveOrgProductMonth } from "../../components/axios/performanceManagement.js";
import { formData } from "../../../assets/js/common.js";
export default {
  name:'productMouthTaskSet',
  components: {},
  data(){
    return {
      modal:false,
      orgId:this.$route.query.orgId,
      selectYear:this.$route.query.selectYear,
      mainData:{
        orgId:'',
        orgName:'',
        selectYear:'',
        targetAmount:'',
        targetType:'',
        alreadyAmount:'',
        surplusAmount:'',
      },
      tableData:[],
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
                    
                  },data.row.targetAmount1)
                ])
              }
            }
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
                    
                  },data.row.targetAmount2)
                ])
              }
            }
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
                    
                  },data.row.targetAmount3)
                ])
              }
            }
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
                    
                  },data.row.targetAmount4)
                ])
              }
            }
          ]
        }        
      ]
    }
  },
  created (){
    this.getListOrgProductMonth()
  },
  methods:{
    //列表数据
    getListOrgProductMonth(){
      this.$Spin.show()
      let form = {
        orgId: this.orgId,
        selectYear: this.selectYear
      }
      listOrgProductMonth(form).then(res => {
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
    //返回
    returnPro(){
      this.$router.push({name:"productTaskSet"})
    },
    //保存
    saveData(){
      if (this.validateData()) {
        this.$Spin.show()
        let items = []
        this.tableData.map(item => {
          items.push({
            id: item.id1,
            configMonth: item.configMonth1,
            targetAmount: item.targetAmount1
          })
          items.push({
            id: item.id2,
            configMonth: item.configMonth2,
            targetAmount: item.targetAmount2
          })
          items.push({
            id: item.id3,
            configMonth: item.configMonth3,
            targetAmount: item.targetAmount3
          })
          items.push({
            id: item.id4,
            configMonth: item.configMonth4,
            targetAmount: item.targetAmount4
          })
        })
        let form = {
          orgId: this.mainData.orgId,
          selectYear: this.mainData.selectYear,
          pfObjectOrgMonthSaveVOs: items
        }
        saveOrgProductMonth(form).then(res => {
          this.$router.push({name:'productTaskSet'})
          this.$Spin.hide()
        })
      }      
    },
    //设置输入框的值
    changeAmount(data, e, num){
      let value = e.target.value
      if (value == '') {
        value = 0
      }
      if (num == 1) {
        this.tableData[data.index].targetAmount1 = Number(Number(value).toFixed(2))
      } else if (num == 2) {
        this.tableData[data.index].targetAmount2 = Number(Number(value).toFixed(2))
      } else if (num == 3) {
        this.tableData[data.index].targetAmount3 = Number(Number(value).toFixed(2))
      } else if (num == 4) {
        this.tableData[data.index].targetAmount4 = Number(Number(value).toFixed(2))
      }
    },
    //校验数据
    validateData(){
      let totalAmount = Number(0)
      for (let i = 0; i < this.tableData.length; i++) {
        totalAmount = Number((totalAmount + Number(this.tableData[i].targetAmount1)).toFixed(2))
        totalAmount = Number((totalAmount + Number(this.tableData[i].targetAmount2)).toFixed(2))
        totalAmount = Number((totalAmount + Number(this.tableData[i].targetAmount3)).toFixed(2))
        totalAmount = Number((totalAmount + Number(this.tableData[i].targetAmount4)).toFixed(2))
      }
      if (totalAmount != Number(this.mainData.targetAmount)) {
        this.$Message.error("月分摊总金额不等于目标金额")
        return false
      }
      return true
    }
  }
}
</script>
