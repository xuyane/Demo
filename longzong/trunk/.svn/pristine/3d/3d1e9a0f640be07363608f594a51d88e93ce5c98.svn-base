<style lang="less" scoped>
.text-container {
  display: flex;
  padding: 0 200px;
  .flex-text {
    flex: 1;
    line-height: 52px;
    vertical-align: middle;
    .title {
      font-size: 14px;
      color: #000;
    }
    .number {
      font-size: 14px;
      color: #4280e8;
    }
    .ivu-icon-md-people{
      font-size: 20px;
      margin-top:-4px;
    }
    .ivu-icon-md-person-add{
      font-size: 16px;
      margin-top:-3px;
    }
  }
}
</style>
<template>
  <Row>
    <Col span="24" class="text-center">
      <div class="text-container">
        <div class="flex-text">
          <span class="title">总分配数:</span>
          <span class="number">{{this.maxLength}}</span>
        </div>
        <div class="flex-text">
          <Icon type="md-people" />
          <span class="title">已分配数:</span>
          <span class="number">{{this.allocat}}</span>
        </div>
        <div class="flex-text">
          <Icon type="md-person-add" />
          <span class="title">待分配数:</span>
          <span class="number">{{(this.maxLength)-(this.allocat) < 0 ? '已超过最大分配数' : (this.maxLength)-(this.allocat)}}</span>
        </div>
        <div class="flex-text"><Button type="primary" @click="openShow">确认分配</Button><Button class="search-btn" style="margin-left:8px !important;" @click="goBack">返回</Button></div>
      </div>
    </Col>
    <Col span="24" class="mar-t-20 text-center">
      <Table class="tableCommon"
        :data="tableData"
        :columns="columns"
        ref="dragTable"
        :stripe="true"
        :border="true">
      </Table>
    </Col>
    <!-- <Modal
    v-model="showModals"
    title="确定分配"
    width="420">
    <Row>
      <Col span="24" style="font-size:16px">是否分配?</Col>
    </Row>
    <div slot="footer">
        <Button type="primary" class="search-btn" @click="distribute()">确定</Button>
        <Button class="search-btn" @click="cancelShow">返回</Button>
      </div>
  </Modal> -->
  </Row>
</template>
<script>
import { formData, formatStamp, formatTime } from "../../../../assets/js/common.js"
import {getMoreDestribute} from "../../../components/axios/crm.js"
export default {
   props: {
    dataList: Array
  },
  data () {
    return {
      showModals:false,
      numbers:0,
      tableData: [],
      maxLength:window.localStorage.getItem("longZhongCrmUserId").split(',').length,
      allocat:0,
      adminIds:[],
      nums:[],
      columns: [
        {
          key: 'departmentName',
          title: '部门',
          minWidth: 100
        },
        {
          key: 'adminName',
          title: '业务员',
          minWidth: 100,
          render: (h, data) => {
            let str =  `${data.row.adminName}(用户数:${data.row.allotRecords},用户上限:${data.row.maxAllotUserNum === null ? '用户无上限' : data.row.maxAllotUserNum})`
            return h('div', {}, str)
          }
        },
        {
          key: 'todayAllotRecords',
          title: '今日已分配数',
          minWidth: 100
        },
        {
          key: 'sign',
          title: '新分配数',
          minWidth: 100,
          render: (h, data) => {
              return h('div', [
                  h('InputNumber', {
                      props: {
                          value: 0,
                          max: this.maxLength,
                          min: 0
                      },
                     on: {
                       "on-change": (event) => {
                          if(data.row.maxAllotUserNum !== null){
                            // console.log(event)
                            if(event === null){
                              return
                            } else if(data.row.maxAllotUserNum === 0){
                              this.$Message.warning('用户上限为0,不能分配')
                              return
                            }else if(event > (data.row.maxAllotUserNum - data.row.allotRecords)){
                              this.$Message.warning('用户已达上限'+data.row.maxAllotUserNum)
                              return
                            }else{
                              this.tableData[data.index].numbers = event
                              this.getValue()
                            } 
                          }else{
                            this.tableData[data.index].numbers = event
                              this.getValue()
                          }
                       }
                     }
                  })
              ]);
          }
        }
      ]
    }
  },
  methods: {
    // 返回
    goBack(){
      if (window.localStorage.getItem("longZhongCrmIsUserAllot") == 1) {
        this.$router.push({
          name: "userDistribute"
        });
      }else if (window.localStorage.getItem("longZhongCrmIsUserAllot") == 2) {
        this.$router.push({
          name: "commonResource"
        });
      }
    },
    //批量确定分配
    distribute(){
      let num = 0;
      this.nums = [];
      this.adminIds = [];
      this.tableData.map(item =>{
        this.nums.push(item.numbers);
        this.adminIds.push(item.adminId)
        num += item.numbers
      })
      let params = {
         adminIds: this.adminIds,
         nums: this.nums,
         isUserAllot: window.localStorage.getItem("longZhongCrmIsUserAllot"),
         userIds: window.localStorage.getItem("longZhongCrmUserId").split(',')
      }
      this.numbers = num
      if(this.numbers > this.maxLength){
        this.$Message.warning('已超过最大可分配数，请重新分配')
      }else{
        getMoreDestribute(formData(params)).then(res =>{
          this.$Message.success('您已分配成功!')
           if (window.localStorage.getItem("longZhongCrmIsUserAllot") == 1) {
              this.$router.push({
                name: "userDistribute"
              });
            }else if (window.localStorage.getItem("longZhongCrmIsUserAllot") == 2) {
              this.$router.push({
                name: "commonResource"
              });
            }
        })
      }
    },
    // 打开分配弹窗
    openShow(){
      if(this.allocat > this.maxLength){
        this.$Message.warning('已超过最大可分配数，请重新分配')
      }else if(this.allocat === 0){
           this.$Message.warning('您还未分配!')
      }else{
        // this.showModals = true
        this.$Modal.confirm({
        title: "分配用户",
        content: "<p>是否分配此用户？</p>",
        onOk: () => {
          this.distribute();
        }
      })
      }
    },
    getValue(){
      let num = 0
      this.tableData.map(item =>{
        num += item.numbers
      })
      this.numbers = num
      this.allocat = this.numbers
    }
  },
  watch: {
    dataList(newVal, oldVal) {
      this.tableData = newVal
    }
  }
}
</script>
