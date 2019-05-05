<style lang="less" scoped>

</style>
<template>
  <Row>
    <Col span="24">
      <Row class-name="current-position">
        当前位置：绩效管理&nbsp;&nbsp;>>&nbsp;&nbsp;任务设定&nbsp;&nbsp;>>&nbsp;&nbsp;产品任务&nbsp;&nbsp;>>&nbsp;&nbsp;续入月分摊
      </Row>
    </Col>
    <Col span="24" class="table-con">
      <Row>
        <span style="font-size:20px;"><b>部门：隆众-营销部-营销大客户部-营销大客户部第二团队</b></span>
      </Row>
      <Row type="flex" justify="space-between" style="margin: 15px 0; font-size:16px;">
        <span>目标金额（万元）：800.00</span>
        <span>已分派金额（万元）：400.00</span>
        <span>剩余分派金额（万元）：400.00</span>
      </Row>
      <Row style="font-size:16px;">
        <span>目标类型：收入业绩</span>
      </Row>
      <Table class="tableCommon"
        :data="tableData"
        :columns="columns"
        :stripe="true"
        :border="true"
        style="margin-top:20px;">
      </Table>
      <oil-page
        :total="total"
        :page-size="pageSize"
        @page-change="pageChange"
        :page-size-opts="pageSizeOpts"
        :show-sizer="showSizer">
      </oil-page>
      <div class-name="table-con" style="text-align:center;margin-top:20px;">
        <Button type="primary" class="search-btn" @click="">保存</Button>
        <Button type="default" class="search-btn" @click="returnPro">取消</Button>
      </div>
      <!-- 保存按钮弹窗 -->
      <Modal
        v-model="modal"
        title="提示信息"
        @on-ok="ok"
        @on-cancel="cancel">
        <p>请完成所有目标分配后再保存</p>
      </Modal>
    </Col>
  </Row>
</template>

<script>
import OilPage from "../../components/page/page.vue";
export default {
  name:'proContinueMouthTaskSet',
  components: {
    OilPage
  },
  data(){
    return {
      modal:false,
      total: 0,
      pageSize: 10,
      pageNum: 1,
      showSizer: true,
      pageSizeOpts: [5, 10, 20, 30],
      tableData:[
        {
          oneMouth:'1月',
          oneTarget:'100',
          twoMouth:'2月',
          twoTarget:'100',
          threeMouth:'7月',
          threeTarget:'100',
          fourMouth:'10月',
          fourTarget:'100',
        }
      ],
      columns:[
        {
          title: "第一季度目标",
          align: "center", 
          children: [
            {
              key: "oneMouth",
              title: "月份",
              align: "center",
            },
            {
              key: "oneTarget",
              title: "目标值",
              align: "center",
              render: (h, data) => {
                return h('div', [
                    h('i-input', {
                    props: {
                        type: 'number',
                        value:100,
                        size: 'small'
                    },
                    }, )
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
              key: "twoMouth",
              title: "月份",
              align: "center",
            },
            {
              key: "twoTarget",
              title: "目标值",
              align: "center",
              render: (h, data) => {
                return h('div', [
                    h('i-input', {
                    props: {
                        type: 'number',
                        size: 'small',
                        value:100,
                    },
                    }, )
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
              key: "threeMouth",
              title: "月份",
              align: "center",
            },
            {
              key: "threeTarget",
              title: "目标值",
              align: "center",
              render: (h, data) => {
                return h('div', [
                    h('i-input', {
                    props: {
                        type: 'number',
                        size: 'small',
                        value:100,
                    },
                    }, )
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
              key: "fourMouth",
              title: "月份",
              align: "center",
            },
            {
              key: "fourTarget",
              title: "目标值",
              align: "center",
              render: (h, data) => {
                return h('div', [
                    h('i-input', {
                    props: {
                        type: 'number',
                        size: 'small',
                        value:100,
                    },
                    }, )
                ])
              }
            },
          ]
        },         
      ]
    }
  },
  methods:{
    returnPro(){
      this.$router.push({name:"productTaskSet"})
    }
  }
}
</script>
