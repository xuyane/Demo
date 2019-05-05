<template lang="html">
  <div class="list">
    <!-- 相关信息单元弹窗 -->
    <Modal v-model="relavantModalVisible" title="相关信息单元" class-name="verModal"> 
      <div class="warp" >
        <div class="unit_title">
          <span>信息单元</span>
        </div>         
        <div class="unit_content">
          <div class="unit_content_left">
              <div class="unit_s_left">信息单元编码：</div>
              <div class="unit_s_right">{{unitCode}}</div>
          </div>
          <div class="unit_content_left no_line">
              <div class="unit_s_left">信息单元名称：</div>
              <div class="unit_s_right no-right-border">{{unitName}}</div>
          </div>
        </div>
      </div>         
      <div class="warp" >
        <div class="unit_title">
          <span>相关信息单元</span>
        </div>
        <Table class="tableCommon"  style='border-top: none;' :columns="tableColumns" :data="tableData"></Table>
      </div>
      <div slot="footer">
        <Button type="primary" @click="hideModal">返回</Button>
      </div> 
    </Modal>
  </div>
</template>

<script>
import { relavantModal } from "../../unitmangement/api/infoDiffusion";
import { formData } from "../../../../assets/js/common.js";
export default {
  data() {
    return {
      relavantModalVisible: false,
      unitCode: "",
      unitName: "",
      tableData: [],
      tableColumns: [
        {
          title: "序号",
          key: "sortNumber"
        },
        {
          title: "信息单元名称",
          key: "relationName"
        },
        {
          title: "信息大类",
          key: "relationBigTypeName"
        }
      ]
    };
  },
  methods: {
    showModal() {
      this.relavantModalVisible = true;
    },
    showRelavantInfo(row) {
      var that = this;
      that.unitCode = row.informationUnitCode;
      that.unitName = row.informationUnitName;
      this.showData(row);
    },
    showData(row) {
      let that = this;
      let params = {
        informationUnitId: row.informationUnitId,
        taskId: row.taskId
      };
      relavantModal(formData(params)).then(res => {
        that.tableData = res.response.taskRelationVOList;
      });
    },
    hideModal() {
      this.relavantModalVisible = false;
    }
  }
};
</script>

<style scoped>
.warp .unit_title span {
  height: 43px;
  width: 100%;
  padding-left: 10px;
  background: #ebf2fe;
  border: 1px solid #bbbbbb;
  display: block;
  color: #000000;
  font-size: 18px;
  line-height: 43px;
}
.unit_content {
  height: 59px;
  line-height: 59px;
  margin-bottom: 20px;
  border-left: 1px solid #bbbbbb;
  border-right: 1px solid #bbbbbb;
  border-bottom: 1px solid #bbbbbb;
}
.unit_content .unit_content_left {
  height: 59px;
  float: left;
  width: 50%;
}
.unit_content .no_line {
  border-right: none;
}
.unit_content .unit_s_left,
.unit_content .unit_s_right {
  font-size: 14px;
  width: 38%;
  color: #000000;
  height: 58px;
  line-height: 59px;
  text-align: center;
  border-right: 1px solid #bbbbbb;
  float: left;
  background: #e9eaef;
}
.unit_content .unit_s_right {
  width: 62%;
}
.unit_content .no-right-border {
  border-right: 0;
}
</style>
