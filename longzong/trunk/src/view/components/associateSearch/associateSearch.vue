<style lang="less" scoped>
</style>

<template>
  <Row>
    <!--@on-query-change="queryChange"-->
    <Select v-model="model" clearable ref="select" filterable remote :remote-method="remoteMethod" :loading="loading" @on-clear="clearModal" @on-change="changeModal" label-in-value>
      <Option v-for="(option, index) in itemList" :value="option.value" :key="index">{{option.label}}</Option>
    </Select>
  </Row>
</template>

<script>
import axios from "axios";
export default {
  name: "associateSearch",
  props: {
    dataUrl: String,
    extra: {
      type: String,
      required: false
    },
    modelVal: "",
    modelLabel:""
  },
  data() {
    return {
      model: "",
      loading: false,
      itemList: [],
      sessionzhi:''
    };
  },
  methods: {
    //从父组件传入的数据回显到输入框
    getData(data) {
      let that = this;
      let name = "";
      let params = new URLSearchParams();
      params.append("name", data);
      axios({
        url: this.dataUrl,
        method: "post",
        data: params
      })
        .then(resp => {
          if (resp.data.status === "200") {
            const list = resp.data.response.map(item => {
              return {
                value: item.id,
                label: item.text
              };
            });
            that.itemList = list;
            that.model = list[0].value;
          } else {
            that.$Message.warning("无数据");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //清空组件里面的值
    queryChange(val) {
      if (!val) {
        this.model = null;
      }
    },
    remoteMethod(query) {
      // console.log('query',query);
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
              const list = resp.data.response.map(item => {
                return {
                  value: item.id,
                  label: item.text
                };
              });
              that.itemList = list;
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
      console.log('query-list', data);
      this.$emit("query-list", data);
    },
    clearModal() {
      let clearData = {};
      clearData.label = "";
      clearData.value = "";
      this.$emit("query-list", clearData);
    }
  },
  watch:{
       modelVal(newVal){
         this.model = newVal;
       },
       modelLabel(newVal){
         this.remoteMethod(newVal);
       }
  }
};
</script>

