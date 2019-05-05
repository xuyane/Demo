<style lang="less" scoped>
</style>

<template>
  <Row>
    <Col span="24">
    <Row class-name="current-position">
      当前位置：财务管理&nbsp;&nbsp;>>&nbsp;&nbsp;产品开通&nbsp;&nbsp;>>&nbsp;&nbsp;详情
    </Row>
    </Col>
    <Col span="24" class="product-opening-detail-out">
    <Row>
      <Col span="24" class="font-s18">合同信息</Col>
      <Col span="24" class="mar-t-20">
      <Table class="tableCommon" :data="tableData1" :columns="columns1" ref="dragTable" :stripe="true" :border="true"></Table>
      </Col>
      <Col span="24" class="font-s18 mar-t-20">产品信息</Col>
      <Col span="24" class="mar-t-20">
      <Table class="tableCommon" :data="tableData2" :columns="columns2" ref="dragTable" :stripe="true" :border="true" @on-selection-change="selection"></Table>
      </Col>
      <Col span="24" class="mar-t-20 ivu-modal-footer">
      <Button type="primary" @click="opening" v-show="show">申请开通</Button>
      <Button @click="goBack">返回</Button>
      </Col>
    </Row>
    </Col>
  </Row>
</template>

<script>
import axios from 'axios';
import oilPage from '../../components/page/page.vue';
import { formatThousandPrice } from '../../../assets/js/common.js'
export default {
  name: 'blackList',
  components: {
    oilPage
  },
  data() {
    return {
      id: this.$route.query.id,
      openStatus: this.$route.query.openStatus,
      show: true,
      columns1: [{
        key: 'contractNo',
        align: 'center',
        title: '合同编号',
        minWidth: 140,
        render: (h, data) => {
          return h("div", [
            h(
              "span",
              {
                style: {
                  marginRight: "8px",
                  color: "blue",
                  textDecoration: "underline",
                  cursor: "pointer"
                },
                on: {
                  click: () => {
                    this.goheCode(data.row.contractNo);
                  }
                }
              },
              data.row.contractNo
            )
          ]);
        }
      }, {
        key: 'name',
        align: 'center',
        title: '合同名称',
        minWidth: 100
      }, {
        key: 'partA',
        align: 'center',
        title: '客户名称',
        minWidth: 100
      }, {
        key: 'contractTotalAmount',
        align: 'center',
        title: '合同总金额',
        minWidth: 100,
        render: (h, data) => {
            return h('span',{
                style: {}
            },formatThousandPrice(data.row.contractTotalAmount))
        }
      }, {
        key: 'ackTotalAmount',
        align: 'center',
        title: '已认账金额',
        minWidth: 100,
        render: (h, data) => {
            return h('span',{
                style: {}
            },formatThousandPrice(data.row.ackTotalAmount))
        }
      }, {
        key: 'readyAckTotalAmount',
        align: 'center',
        title: '待认账金额',
        minWidth: 100,
        render: (h, data) => {
            return h('span',{
                style: {}
            },formatThousandPrice(data.row.readyAckTotalAmount))
        }
      }, {
        key: 'creatorName',
        align: 'center',
        title: '业务员',
        minWidth: 100
      }, {
        key: 'deptName',
        align: 'center',
        title: '所在部门',
        minWidth: 100
      }],
      selectionId: [],
      tableData1: [],
      columns2: [{
        type: 'selection',
        minWidth: 60,
        align: 'center'
      }, {
        key: 'productNameCn',
        align: 'center',
        title: '产品名称',
        minWidth: 180
      }, {
        key: 'serviceTime',
        align: 'center',
        title: '服务时段',
        minWidth: 180
      }, {
        key: 'standardPrice',
        align: 'center',
        title: '标准定价',
        minWidth: 100,
        render: (h, data) => {
            return h('span',{
                style: {}
            },formatThousandPrice(data.row.standardPrice))
        }
      }, {
        key: 'price',
        align: 'center',
        title: '实际定价',
        minWidth: 100,
        render: (h, data) => {
            return h('span',{
                style: {}
            },formatThousandPrice(data.row.price))
        }
      }, {
        key: 'number',
        align: 'center',
        title: '数量',
        minWidth: 100
      }, {
        key: 'productPrice',
        align: 'center',
        title: '产品金额',
        minWidth: 100,
        render: (h, data) => {
            return h('span',{
                style: {}
            },formatThousandPrice(data.row.productPrice))
        }
      }, {
        key: 'status',
        align: 'center',
        title: '开通状态',
        minWidth: 100
      }],
      tableData2: [],
    }
  },
  created() {
    this.getMessage()
    this.tableData2.map((item) => {
      if (item.openState == '未开通') {
        item['_checked'] = false;
        item['_disabled'] = false;
      } else {
        item['_checked'] = true;
        item['_disabled'] = true;
      }
    })
    if (this.openStatus == "全部开通") this.show = false;
    else this.show = true;
  },
  methods: {
    goheCode(contractNo) {
      let routeData = this.$router.resolve({
        name: "checkContact",
        query: {
          contractCode: contractNo
        }
      });
      window.open(routeData.href, '_blank');
    },
    getMessage() {//根据跳转#id查询数据
      let that = this;
      this.$Spin.show();
      axios({
        url: '/finance/contractOpen/notice',
        method: 'get',
        params: {
          id: this.id,
          timestamp: new Date().getTime()
        }
      }).then(function (res) {
        if (res.status === 200) {
          that.tableData1 = res.data.response.list;
          that.tableData2 = res.data.response.list[0].productRepVO;
          that.tableData2.map((item) => {
            console.log(item)
            if (item.status == '未开通') {
              item['_checked'] = false;
              item['_disabled'] = false;
            } else {
              that.selectionId.push(item.id)
              item['_checked'] = true;
              item['_disabled'] = true;
            }
          })
        };
        that.$Spin.hide();
      }).catch(err => {
        console.log(err)
        that.$Spin.hide();
      });
    },
    selection(selection) {
      this.selectionId = [];
      selection.map((item) => {
        this.selectionId.push(item.id)
      });
    },
    opening() {//点击开通
      if (this.selectionId == "" || this.selectionId == []) {
        this.$Message.info('请先勾选产品！');
      } else {
        let that = this;
        this.$Spin.show();
        let form = "ids=" + this.selectionId;
        axios({
          url: '/finance/contractOpen/update',
          method: 'post',
          data: form
        }).then(function (res) {
          if (res.data.status == 200) {
            that.$Spin.hide();
            if (res.data.message == "OK") {
              that.$Message.success("开通成功！");
              setTimeout(function () {
                that.$router.push({
                  name: 'productOpening'
                })
              }, 2000)
            } else {
              that.$Message.success(res.data.message);
            }
          } else {
            that.$Message.success(res.data.message);
          }
        });
      }
    },
    goBack() {//返回
      this.$router.push({
        name: 'productOpening'
      })
    }
  }
}
</script>
