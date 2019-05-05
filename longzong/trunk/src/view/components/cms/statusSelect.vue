<style scoped>
</style>
<template>
  <Select
    v-model="model"
    @on-change="changeData"
  >
    <Option
      v-for="item in statusList"
      :value="item.value"
      :key="item.value"
    >{{ item.desc }}</Option>
  </Select>
</template>

<script>
import axios from "axios";
export default {
  name: "statusSelect",
  props: {
    statusType: ""
  },
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
      let dataType = this.statusType;
      let dataUrl = "";
      if (dataType == "breedTypeStatus") {
        //品种类别
        dataUrl = "/basedata/enum/query-all-breedType-status";
      } else {
        dataUrl = "/basedata/enum/query-all-breedType-status";
      }
      var that = this;
      axios({
        url: dataUrl,
        method: "get",
        data: {}
      }).then(function(resp) {
        if (resp.data.status == 200) {
          let obj = {
            value: -1,
            desc: "全部"
          };
          that.statusList.push(obj);
          let list = resp.data.response;
          for (let i = 0; i < list.length; i++) {
            let objList = {};
            objList.value = list[i].value;
            objList.desc = list[i].desc;
            that.statusList.push(objList);
          }
        } else {
          that.$Message.warning(res.data.message);
        }
      });
    },
    //选中数据获取相应的value值,并且传到父组件里面去
    changeData(data) {
      this.$emit("statusSelect", data);
    }
  }
};
</script>

