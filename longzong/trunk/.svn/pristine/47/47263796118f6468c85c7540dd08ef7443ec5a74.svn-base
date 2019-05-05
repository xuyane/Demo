<style scoped>
</style>
<template>
    <Select v-model="model" @on-change="changeData" class="search-input">
        <Option v-for="item in enterpriseTypeList" :value="item.value" :key="item.value">{{ item.desc }}</Option>
    </Select>
</template>

<script>
import axios from "axios";
export default {
  name: "enterpriseNature",
  data() {
    return {
      model: "",
      //企业类型下拉列表
      enterpriseTypeList: []
    };
  },
  created() {
    this.changeModal();
  },
  methods: {
    //初始化状态的下拉框数据
    changeModal() {
      var that = this;
      axios({
        url: "/basedata/select/enterpeise_type",
        method: "post",
        data: {}
      }).then(function(resp) {
        if (resp.data.status == 200) {
          that.enterpriseTypeList = resp.data.response;
        } else {
          that.$Message.warning(res.data.message);
        }
      });
    },
    //选中数据获取相应的value值,并且传到父组件里面去
    changeData(data) {
      this.$emit("enterpriseTypeFunction", data);
    }
  }
};
</script>

