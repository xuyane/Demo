<style scoped>
</style>
<template>
    <Select v-model="model" @on-change="changeData">
        <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.desc }}</Option>
    </Select>
</template>

<script>
import axios from "axios";
export default {
  name: "statusSelect",
  data() {
    return {
      model: "",
      //状态下拉列表
      statusList: []
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
        url: "/basedata/enum/query-all-breedType-status",
        method: "get",
        data: {}
      }).then(function(resp) {
        if (resp.data.status == 200) {
          that.statusList = resp.data.response;
        } else {
          that.$Message.warning(res.data.message);
        }
      });
    },
    //选中数据获取相应的value值,并且传到父组件里面去
    changeData(data){
      this.$emit("statusSelect", data);
    }
  }
};
</script>

