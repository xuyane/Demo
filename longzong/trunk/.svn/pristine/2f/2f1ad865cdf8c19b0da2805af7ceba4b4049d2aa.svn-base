<style lang="less" scoped>
</style>

<template>
  <Row>
    <Select v-model="model" filterable remote @on-query-change="remoteMethod" :loading="loading" @on-clear="clearModal" @on-change="changeModal" ref="selectRef"  @on- label-in-value>
      <Option v-for="(option, index) in itemList" :value="option.id" :key="index">{{option.text}}</Option>
    </Select>
  </Row>
</template>

<script>
import axios from "axios";
export default {
  name: "associateSearchColl",
  props: {
    dataUrl: String,
    extra: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      model: "",
      loading: false,
      itemList: []
    };
  },
  methods: {
    //从父组件传入的数据回显到输入框
    getData(data,id) {
      this.model = id
      this.$refs.selectRef.query = data
    },
    
    remoteMethod(query) {
      let that = this;
      if (query !== "") {
        that.loading = true;
        this.loading = false;
        let name = "";
        let params = new URLSearchParams();
        if (this.extra) {
          params.append("adminName", this.extra);
          params.append("searchName", query);
        } else {
          params.append("name", query);
        }
        axios({
          url: this.dataUrl,
          method: "post",
          data: params
        })
          .then(resp => {
            if (resp.data.status === "200") {
              that.itemList = resp.data.response;
            } else {
              that.$Message.warning("无数据");
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.itemList = [];
      }
    },
    changeModal(data) {
      this.$emit("query-list", data);
    },
    clearModal() {
      let clearData = {};
      clearData.label = "";
      clearData.value = "";
      this.$emit("query-list", clearData);
    }
  }
};
</script>

