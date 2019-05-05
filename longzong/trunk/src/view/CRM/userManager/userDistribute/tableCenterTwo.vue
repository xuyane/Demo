<style lang="less" scoped>
.text-container {
  display: flex;
  padding: 0 200px;
  .flex-text {
    flex: 1;
    vertical-align: middle;
    .title {
      font-size: 16px;
      color: #000;
    }
    .number {
      font-size: 20px;
      color: #4280e8;
    }
  }
}
</style>
<template>
  <Row>
    <Col span="24" class="text-left">
      <Button type="primary" class="search-btn" @click="goBack">返回</Button>
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
    v-model="showsModal"
    title="确定分配"
    width="420">
    <Row>
      <Col span="24" style="font-size:16px">是否分配？</Col>
    </Row>
    <div slot="footer">
        <Button type="primary" class="search-btn" @click="distribute()">确定</Button>
        <Button class="search-btn" @click="setCancel">返回</Button>
      </div>
  </Modal> -->
  </Row>
</template>
<script>
import {
  formData,
  formatStamp,
  formatTime
} from "../../../../assets/js/common.js";
import { getOneDestribute, queryMax } from "../../../components/axios/crm.js";
export default {
  props: {
    dataList: Array
  },
  data() {
    return {
      datas:{},
      showsModal:false,
      tableData: [],
      columns: [
        {
          key: "departmentName",
          title: "部门",
          minWidth: 100
        },
        {
          key: "adminName",
          title: "业务员",
          minWidth: 100
        },
        {
          key: "todayAllotRecords",
          title: "今日已分配数",
          minWidth: 100
        },
        {
          key: "",
          title: "操作",
          minWidth: 100,
          render: (h, data) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.ok(data);
                    }
                  }
                },
                "确定分配"
              )
            ]);
          }
        }
      ]
    };
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
    // 关闭确定分配框
    setCancel (){
      this.showsModal = false
    },
    // 打开确定分配框
    ok (data){
      this.datas = data.row
      this.$Modal.confirm({
        title: "分配用户",
        content: "<p>是否分配此用户？</p>",
        onOk: () => {
          this.distribute();
        }
      })
    },
    //单个确定分配
    distribute() {
      queryMax(this.datas.adminId).then(res => {
        if (res.response.ableNum < 1&&res.response.ableNum !==null) {
          this.$Message.success(
            "您的可分配数已达上限" + res.response.maxNum + ""
          );
        } else {
          let params = {
            adminId: this.datas.adminId,
            isUserAllot: window.localStorage.getItem("longZhongCrmIsUserAllot"),
            userId: window.localStorage.getItem("longZhongCrmUserId")
          };
          getOneDestribute(formData(params)).then(res => {
            this.$Message.success('您已分配成功!');
            if (window.localStorage.getItem("longZhongCrmIsUserAllot") == 1) {
              this.$router.push({
                name: "userDistribute"
              });
            } else if (
              window.localStorage.getItem("longZhongCrmIsUserAllot") == 2
            ) {
              this.$router.push({
                name: "commonResource"
              });
            }
          });
        }
      });
    }
  },
  watch: {
    dataList(newVal, oldVal) {
      this.tableData = newVal;
    }
  }
};
</script>
