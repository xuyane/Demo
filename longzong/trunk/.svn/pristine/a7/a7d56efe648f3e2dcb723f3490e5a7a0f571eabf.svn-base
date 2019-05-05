<style lang="less">
</style>

<template>
  <div>
    <Input v-model="deptVal" class="search-input" clearable readonly @on-focus="getSelectList" placeholder="请选择所在部门"></Input>
    <Modal
      v-model="model"
      title="请选择所在部门"
      @on-cancel="cancel">
      <div style="max-height: 300px;overflow-x: hidden;">
        <Tree ref="tree" :data="deptIdList"></Tree>
      </div>
      <div slot="footer">
        <Button type="primary" @click="ok">确定</Button>
        <Button @click="cancel">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { orgTree } from "../axios/crm.js";
export default {
  name: "SelectMember",
  props: ["emptyModel"],
  data() {
    return {
      model: false,
      deptVal: "",
      deptIdList: []
    };
  },
  created() {
    // this.getSelectList ()
  },
  methods: {
    cancel() {
      this.model = false;
    },
    ok() {
      this.model = false;
      let dataList = this.$refs.tree.getSelectedNodes();
      let deptLabel = [];
      let deptId = [];
      let deptCode = [];
      dataList.map(item => {
        deptLabel.push(item.title);
        deptId.push(item.id);
        deptCode.push(item.code);
      });
      this.deptVal = deptLabel.join("/");
      this.$emit("data-list", deptLabel, deptId[0], deptCode);
    },
    getSelectList() {
      let that = this;
      this.model = true;
      orgTree().then(resp => {
        var a = JSON.parse(resp.response);
        that.deptIdList = this.breedDigui(a);
      });
    },
    breedDigui(data) {
      let dgData = data.map(item => {
        if (item.children && item.children.length > 0) {
          return {
            title: item.label,
            disableCheckbox: false,
            id: item.id,
            children: this.breedDigui(item.children)
          };
        } else {
          return {
            title: item.label,
            id: item.id,
            disableCheckbox: false
          };
        }
      });
      return dgData;
    }
  },
  watch: {
    emptyModel(newVal, oldVal) {
      if (newVal.length < 1) {
        this.deptVal = "";
      }
    },
    deptVal(newVal, oldVal) {
      if (newVal == "") {
        this.$emit("data-list", [], "", "");
      }
    }
  }
};
</script>

